(ns replumb.cache
  (:require [cognitect.transit :as transit]
            [clojure.string :as s]))

(defn transit-json->cljs
  [json]
  (->> json (transit/read (transit/reader :json))))

(defn cljs->transit-json
  [source]
  (->> source (transit/write (transit/writer :json))))

(defn compiled-by-string
  ([] (compiled-by-string nil))
  ([eval-opts]
   (str "// Compiled by ClojureScript "
     *clojurescript-version*
     (when eval-opts
       (str " " (pr-str eval-opts))))))

(defn cache-prefix-for-path
  ([path macros]
   (str (munge path) (when macros "$macros")))
  ([cache-path path macros]
   (str cache-path  "/" (munge path) (when macros "$macros"))))

(defn is-macros?
  [cache]
  (s/ends-with? (str (:name cache)) "$macros"))

(defn clojurescript-compiler-version
  [js-source]
  (second (re-find #"// Compiled by ClojureScript (\S*)" js-source)))

(defn cached-js-valid?
  [js-source]
  (= *clojurescript-version* (clojurescript-compiler-version js-source)))
