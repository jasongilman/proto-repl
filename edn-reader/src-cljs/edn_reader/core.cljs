(ns edn-reader.core
  "Defines a single function parse for parsing EDN."
  (:require [cljs.reader :as r]
            [cljs.nodejs :as nodejs]))

(nodejs/enable-util-print!)

(defn ^:export parse [s]
  (let [data (r/read-string s)]
    (clj->js data)))

(defn -main [& args])

(set! *main-cli-fn* -main)
