(ns proto-repl.edn-reader
  "Defines a functions for working with EDN."
  (:require [cljs.reader :as r]
            [clojure.string :as str]
            [cljs.nodejs :as nodejs]
            [clojure.walk :as w]
            [fipp.edn :as fipp]
            [proto-repl.edn-reader.display :as d]))

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

(defn ^:export js-to-edn
  "Converts javascript data to EDN. keywordizes keys"
  [js-data]
  (pr-str (w/keywordize-keys (js->clj js-data))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; For converting into a displayable tree.

(defn ^:export to-display-tree
  "Converts the edn string into a displayable tree. A tree is a vector whose first
   element is a string of the root of the tree. The rest of the elements are branches
   off the root. Each branch is another tree. A leaf is represented by a vector
   of one element."
  [v]
  (-> v r/read-string d/to-display-tree* clj->js))

(defn ^:export saved-values-to-display-trees
  "Converts values saved using proto-repl-lib proto-repl/save into a displayable
   table for displaying inline."
  [uniq-ids-to-values-str]
  (let [uniq-ids-to-values (r/read-string uniq-ids-to-values-str)]
    (clj->js (into [] (for [[uniq-id vals] uniq-ids-to-values]
                        ;; TODO pass in uniq-id so that that can be used to do the def
                        ;; Add a function in proto-repl lib that takes the unique string
                        ;; and the index number and executes the def.
                        ;; One issue will be that we need to figure out which namespace
                        ;; to put it in. That's another tricky bit.
                        [(str uniq-id) (d/saved-values->display-tree-table vals)])))))

(defn -main [& args])

(set! *main-cli-fn* -main)

(set! (.-exports js/module)
      #js
      {:parse parse
       :pretty_print pretty-print
       :js_to_edn js-to-edn
       :to_display_tree to-display-tree
       :saved_values_to_display_trees saved-values-to-display-trees})
