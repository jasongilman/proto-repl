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

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; For converting into a displayable tree.

(defn to-display-tree*
  [v]
  (cond
    ;; Handles a map.
    (map? v)
    (into [(pr-str v)]
       ;; Loop over each map entry
       (map (fn [entry]
              [(pr-str entry)
               (to-display-tree* (second entry))])
            v))

    ;; Handles a sequence
    (or (sequential? v) (set? v))
    (into [(pr-str v)] (map to-display-tree* v))

    ;; Leaf
    :else [(pr-str v)]))


(defn ^:export to-display-tree
  "Converts the edn string into a displayable tree. A tree is a vector whose first
   element is a string of the root of the tree. The rest of the elements are branches
   off the root. Each branch is another tree. A leaf is represented by a vector
   of one element."
  [v]
  (-> v r/read-string to-display-tree* clj->js))


(defn -main [& args])

(set! *main-cli-fn* -main)
