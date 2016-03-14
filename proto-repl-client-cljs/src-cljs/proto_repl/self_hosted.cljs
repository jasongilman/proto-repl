(ns proto-repl.self-hosted
  "Provides functions for implementing a self hosted repl."
  (:require [cljs.reader :as r]
            [clojure.string :as str]
            [cljs.nodejs :as nodejs]
            [prc]
            [replumb.core :as replumb]
            [replumb.nodejs.io :as node-io]))

(nodejs/enable-util-print!)

; Register a default tag parser that just ignores parsing tags we don't recognize.
(r/register-default-tag-parser!
 (fn [tag data]
   data))

(def path-module
  (delay (nodejs/require "path")))

(def atom-project-path
  (delay
   (let [project-path (first (js->clj (js/atom.packages.getPackageDirPaths)))
         separator (.-sep (deref path-module))
         path (deref path-module)]
     (str/join separator [project-path "proto-repl" "lib" "proto_repl"]))))

(defn eval-str
  "Evaluates the clojure code using replumb and invokes the callback."
  [code callback]
  (replumb/read-eval-call
   ;; TODO provide source paths. eval-str should take the source paths.
   (replumb/nodejs-options [@atom-project-path] node-io/read-file!)
   (fn [res]
     (callback res))
   code))

(defn ^:export eval-for-js
  "Evaluates the clojure code for the javascript side. Converts the result to Javascript."
  [code callback]
  (eval-str code (fn [result] (callback (clj->js result)))))

(defn ^:export completions
  "Provides completions for self hosted code."
  [text callback-fn]
  (eval-str
   (str "(apropos \"" text "\" )")
   (fn [result]
     (if (:success? result)
       (->> (r/read-string (:value result))
            (mapv (fn [match]
                    (let [match (name match)]
                     {:candidate (if (str/starts-with? match "cljs.core/")
                                   (str/replace match "cljs.core/" "")
                                   match)
                      ;; TODO support documentation with completion.
                      :docs ""
                      :type "var"})))
            clj->js
            callback-fn)
       (callback-fn (clj->js result))))))

(set! (.-exports js/module)
      #js
      {:eval_str eval-for-js
       :completions completions})
