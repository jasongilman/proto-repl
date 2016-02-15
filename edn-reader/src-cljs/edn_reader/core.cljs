(ns edn-reader.core
  "Defines a functions for working with EDN."
  (:require [cljs.reader :as r]
            [clojure.string :as str]
            [cljs.nodejs :as nodejs]
            [fipp.edn :as fipp]
            [edn-reader.display :as d]))

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

(defn ^:export to-display-tree
  "Converts the edn string into a displayable tree. A tree is a vector whose first
   element is a string of the root of the tree. The rest of the elements are branches
   off the root. Each branch is another tree. A leaf is represented by a vector
   of one element."
  [v]
  (-> v r/read-string d/to-display-tree* clj->js))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; TODO

; TODO document this
(defn ^:export saved-values-to-display-trees
  "TODO"
  [uniq-ids-to-values-str]
  (let [uniq-ids-to-values (r/read-string uniq-ids-to-values-str)]
    (clj->js (into [] (for [[uniq-id vals] uniq-ids-to-values]
                        [(str uniq-id) (d/saved-value-maps->display-tree-table vals)])))))

(defn -main [& args])

(set! *main-cli-fn* -main)
