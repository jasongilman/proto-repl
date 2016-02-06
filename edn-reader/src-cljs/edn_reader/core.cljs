(ns edn-reader.core
  "Defines a functions for working with EDN."
  (:require [cljs.reader :as r]
            [cljs.nodejs :as nodejs]
            [fipp.edn :as fipp]))

(nodejs/enable-util-print!)

; Register a default tag parser that just ignores parsing tags we don't recognize.
(r/register-default-tag-parser!
 (fn [tag data]
   data))

(defn ^:export parse
  "Parses EDN into a JavaScript data."
  [s]
  (let [data (r/read-string s)]
    (clj->js data)))

(defn ^:export pretty-print
  "Reads in EDN data and pretty prints it to a string."
  [s]
  (let [data (r/read-string s)]
    (with-out-str (fipp/pprint data))))

(defn to-ink*
  "Recursive form of conversion to Atom ink tree."
  [v]
  (cond
    (map? v)
    (for [[k val] v]
      (into [(str (pr-str k) " " (pr-str val))]
            (to-ink* val)))
    (sequential? v)
    (map to-ink* v)
    :else [v]))

(defn ^:export to-ink-tree
  "Parses an EDN style tree and converts it into the Atom ink style tree for display."
  [v]
  (let [v (r/read-string v)]
    (clj->js (into [(pr-str v)] (to-ink* v)))))

(defn -main [& args])

(set! *main-cli-fn* -main)
