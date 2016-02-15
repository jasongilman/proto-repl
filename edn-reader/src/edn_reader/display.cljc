(ns edn-reader.display
    (:require [clojure.string :as str]
              [clojure.set :as set]))

(defn to-display-tree*
  "Converts a value into a displayable tree. "
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


(def max-table-width
  "TODO determine an actual value and use that."
  100)

(def ellipsis
  "A single character ellipsis for truncating long values.
   Unicode: U+2026, UTF-8: E2 80 A6"
  "…")

(def min-column-width
  "The minimum size a column could be shrunk to is 1. That assumes 1 space for
   data and 1 for an ellipsis. 'X…'"
  2)


(defn value-map->printable-map
  "TODO"
  [vm]
  (into {} (for [[k v] vm] [k (pr-str v)])))

(comment
 (value-map->printable-map
  {:a {:foo :bar} :b 1}))

(defn common-keys
  "Find the common set of keys in all of the maps"
  [maps]
  (reduce (fn [common-keys m]
            (set/union common-keys (set (keys m))))
          #{}
          maps))

(defn printable-map-max-widths
  "TODO"
  [keys value-maps]
  (reduce (fn [max-width-map vm]
            (into {} (for [[k max-width] max-width-map
                           :let [width (count (get vm k ""))]]
                       [k (max max-width width)])))
          ;; initial max widths are 0
          (zipmap keys (repeat 0))
          value-maps))

(comment
 (printable-map-max-widths
  [:a :b]
  [{:a "123" :b "1"}
   {:a "12" :b "1234"}]))

;; TODO property based test test this along with the other functions

(defn exception
  "Creates an exception with the given message"
  [message]
  #?(:clj (Exception. message)
     :cljs (js/Error. message)))

(defn col-widths->table-width
  "Returns the size of the table based on a map of column to sizes"
  [widths]
  (let [num-cols (count widths)]
   ;; space for all the columns ...
   (+ (apply + (vals widths))
      ;; + " |" after each column
      (* 2 num-cols)
      ;; + space after pipe except on the last column
      (dec num-cols))))

;; TODO refactor this long function. We should be able to factor out either the

(defn calculate-columns-widths
  "TODO
   assumes that number of columns can be shrunken"
  [max-widths]
  (let [num-cols (count max-widths)
        ;; Calculate the width of the table if nothing was shrunk
        table-width (col-widths->table-width max-widths)
        ;; This is the total amount we need to remove.
        amount-to-shrink (- table-width max-table-width)]
    (if (<= amount-to-shrink 0)
      ;; No shrinking required
      max-widths
      ;; Select out all the columns that can be shrunk
      (let [shrinkable-cols (for [[k width] max-widths
                                  :when (> width min-column-width)]
                              [k width])]
        ;; Iterate through the shrinkable columns starting with the largest
        (loop [shrinkable-cols (reverse (sort-by second shrinkable-cols))
               ;; Keep track of the current set of width values, amount left to shrink
               widths max-widths
               amount-to-shrink amount-to-shrink
               num-recursions 0]
          ;; Guard against infinite loops due to logic problems
          (when (> num-recursions num-cols)
            (throw (exception (str "Number of recursions [" num-recursions
                                   "] exceeded while calculating column widths"))))

          (let [shrinkable-col-size (apply + (map second shrinkable-cols))
                [col-to-shrink size] (first shrinkable-cols)
                ;; Calculate the percentage to shrink based on the total width
                ;; of columns that can be shrunk
                col-amt-to-shrink (-> (/ size (double shrinkable-col-size))
                                      (* amount-to-shrink)
                                      Math/ceil
                                      long)
                ;; Shrink the column
                new-widths (assoc widths col-to-shrink (- size col-amt-to-shrink))]
            (if-let [other-cols-to-shrink (seq (rest shrinkable-cols))]
              ;; If there are more columns to shrink keep recursing.
              (recur other-cols-to-shrink
                     new-widths
                     (- amount-to-shrink col-amt-to-shrink)
                     (inc num-recursions))
              ;; We've shrunken all the columns proportionally.
              new-widths)))))))


(comment
 (calculate-columns-widths
  {:a 70 :b 70 :c 70}))

;; TODO requirements
;; - Set max table width as a constant
;; - Convert each vm row values to strings
;; - calculate max width for each key
;; Determine the min table width
;;   - space for each col  " |" = 2
;;   - additional space between cols " " (after |) = 1
;;   - sum of mins of all cols + num_cols * 2 + (num_cols - 1)
;;   - if min table width is greater than available bail to alternative display
;; Column order
;;   - if columns are specified in form use that otherwise smallest to largest
;; Determine actual table width to use
;;  - calculate how much to shorten = max_table_width - min_table_width
;;  - divide shrinking among columns proportional how long they are
;;  - start with longest and remove a percentage
;;    - percentage should be based on number of columns that _can_ be shrunk.
;;      If max column width = min column width on any column then it can't be
;;      shrunken.
;;  - Calculate how much is remaining and remove a percentage from the next
;;     smallest

(defn fit-value-to-width
  "TODO"
  [width value]
  (let [length (count value)]
    (if (> length width)
      (str (subs value 0 (dec width)) ellipsis)
      (str (str/join (repeat (- width length) " ")) value))))

(defn row->str
  "TODO"
  [key-order printable-map col-widths]
  (let [value-strs (for [k key-order]
                     (fit-value-to-width (col-widths k) (get printable-map k)))]
    (str (str/join " | " value-strs) " |")))

(defn value-maps->table-rows
  "TODO"
  [value-maps]
  (let [printable-maps (map value-map->printable-map value-maps)
        keys (common-keys printable-maps)
        key-printable-map (zipmap keys (map pr-str keys))
        printable-maps (cons key-printable-map printable-maps)
        ;; TODO bail out if min table width is > max table width
        max-widths (printable-map-max-widths keys printable-maps)
        col-widths (calculate-columns-widths max-widths)
        key-order (map first (sort-by second col-widths))]
    (map #(row->str key-order % col-widths) printable-maps)))

(comment
 (println "----")
 (doseq [row (value-maps->table-rows
              [{:a [1 2 3 4 5 6 7] :b [1 2 3 4 5 6 7 8] :c 2 :d 5444}
               {:a [1 2 3 4 5 6 7] :b [1 2 3 4 5 6 7 8]}])]
   (println row)))

(defn- value-map->display-tree-values
  [value-map]
  (for [[var-name value] value-map
        :let [val-display-tree (to-display-tree* value)]]
    (update-in val-display-tree [0] #(str var-name ": " %))))

(defn saved-value-maps->display-tree-table
  "TODO"
  [value-maps]
  (let [[header & rows] (value-maps->table-rows value-maps)]
    ; Indent header by two spaces
    (cons (str "  " header)
          (map (fn [row vm]
                 (cons row (value-map->display-tree-values vm)))
               rows
               value-maps))))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Original implementation



(defn saved-value-maps->display-tree
  "TODO"
  [value-maps]
  (let [[first-map & others] (reverse value-maps)]
    (concat [(str "Last Saved Values (" (str/join ", " (keys first-map)) ")")]
            (value-map->display-tree-values first-map)
            [(cons "Previous Values"
                   (map-indexed
                    (fn [i value-map]
                      (into [(str (inc i))] (value-map->display-tree-values value-map)))
                    others))])))
