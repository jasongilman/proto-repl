(ns proto-repl.edn-reader.display
    "Contains functions for converting EDN data structures into trees for display
     in Atom Ink"
    (:require [clojure.string :as str]
              [clojure.set :as set]))

(def max-table-width
  "Sets the maximum width of a table in characters when "
  60)

(def ellipsis
  "A single character ellipsis for truncating long values.
   Unicode: U+2026, UTF-8: E2 80 A6"
  "…")

(def min-column-width
  "The minimum size a column could be shrunk to is 1. That assumes 1 space for
   data and 1 for an ellipsis. 'X…'"
  2)

(defn fit-value-to-width
  "Takes a width and a string value and returns the string so that it exactly
   fits the width given. The value is truncated if it is too long with an
   ellipsis or has spaces prepended."
  ([width value]
   (fit-value-to-width width value true))
  ([width value expand?]
   (let [length (count value)]
     (cond
       (> length width)
       ;; Shrink the value
       (str (subs value 0 (dec width)) ellipsis)

       expand?
       (str (str/join (repeat (- width length) " ")) value)

       :else
       value))))

(defn to-display-tree*
  "Converts a value into a displayable tree. "
  [v]
  (let [; Defines a function that will print the value but not let it exceed
        ; the max table width. This is used for branch representations
        trimmed-str #(fit-value-to-width max-table-width (pr-str %) false)]
   (cond
     ;; Handles a map.
     (map? v)
     (into [(trimmed-str v) {}]
        ;; Loop over each map entry
        (map (fn [entry]
               [(trimmed-str entry)
                {}
                (to-display-tree* (second entry))])
             v))

     ;; Handles a sequence
     (or (sequential? v) (set? v))
     (into [(trimmed-str v) {}] (map to-display-tree* v))

     ;; Leaf
     :else [(pr-str v)])))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(defn value-map->printable-map
  "Takes a map of var names to their values and returns the map with values
   in a string format."
  [vm]
  (into {} (for [[k v] vm] [k (pr-str v)])))

(defn common-keys
  "Find the common set of keys in all of the maps"
  [maps]
  (reduce (fn [common-keys m]
            (set/union common-keys (set (keys m))))
          #{}
          maps))

(defn max-value-widths
  "Returns a map of the max lengths of all the given keys in the maps. Assumes
   values in maps are strings."
  [keys value-maps]
  (reduce (fn [max-width-map vm]
            (into {} (for [[k max-width] max-width-map
                           :let [width (count (get vm k ""))]]
                       [k (max max-width width)])))
          ;; initial max widths are 0
          (zipmap keys (repeat 0))
          value-maps))

(comment
 (max-value-widths
  [:a :b]
  [{:a "123" :b "1"}
   {:a "12" :b "1234"}]))

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

(defn calculate-columns-widths
  "Takes a map of widths for each column and returns a new map of widths such
   that the values will fit within the max-table-width. Assumes that the number
   of columns is possible to fit within the table."
  [max-widths]
  (let [num-cols (count max-widths)
        ;; Calculate the width of the table if nothing was shrunk
        table-width (col-widths->table-width max-widths)
        ;; This is the total amount we need to remove.
        amount-to-shrink (- table-width max-table-width)]
    (if (<= amount-to-shrink 0)
      ;; No shrinking required
      max-widths

      (loop [;; Keep track of the current set of width values, amount left to shrink
             widths max-widths
             amount-to-shrink amount-to-shrink
             num-recursions 0]
        ;; Guard against infinite loops due to logic problems
        (when (> num-recursions (* 4 num-cols))
          (throw (exception (str "Number of recursions [" num-recursions
                                 "] exceeded while calculating column widths"))))

        (let [;; Select out all the columns that can be shrunk
              shrinkable-cols (for [[k width] widths
                                    :when (> width min-column-width)]
                                [k width])
              shrinkable-cols (reverse (sort-by second shrinkable-cols))
              shrinkable-col-size (apply + (map second shrinkable-cols))
              [col-to-shrink size] (first shrinkable-cols)
              ;; Calculate the percentage to shrink based on the total width
              ;; of columns that can be shrunk
              col-amt-to-shrink (-> (/ size (double shrinkable-col-size))
                                    (* amount-to-shrink)
                                    Math/ceil
                                    long)
              ;; Shrink the column
              new-widths (assoc widths col-to-shrink (- size col-amt-to-shrink))]
          (if (> (col-widths->table-width new-widths) max-table-width)
            ;; If there are more columns to shrink keep recursing.
            (recur new-widths
                   (- amount-to-shrink col-amt-to-shrink)
                   (inc num-recursions))
            ;; We've shrunken all the columns proportionally.
            new-widths))))))


(comment
 (calculate-columns-widths
  {:a 8, :b 8, :s 1091})
 (calculate-columns-widths
  {:a 70 :b 70 :c 70}))

(defn row->str
  "Takes a list of keys ordered for the row, a map of values for the row, and
   the available space for each column and returns a string row with columns
   separated by a pipe character."
  [key-order value-map col-widths]
  (let [value-strs (for [k key-order]
                     (fit-value-to-width (col-widths k) (get value-map k)))]
    (str (str/join " | " value-strs) " |")))

(defn- value-maps->table-rows
  "Takes a set of maps containing variable names and values and returns a set
   of string rows that will fit within the max-table-width. If the table has
   too many columns to fit into the table it returns nil."
  [value-maps]
  (let [keys (common-keys value-maps)
        min-table-width (* (count keys) (+ min-column-width 3))]
    (when (<= min-table-width max-table-width)
     (let [printable-maps (map value-map->printable-map value-maps)
           key-printable-map (zipmap keys (map pr-str keys))
           printable-maps (cons key-printable-map printable-maps)
           max-widths (max-value-widths keys printable-maps)
           col-widths (calculate-columns-widths max-widths)
           key-order (map first (sort-by second col-widths))]
       (map #(row->str key-order % col-widths) printable-maps)))))

(comment
 (doseq [row (value-maps->table-rows
              [{:a [1 2 3 4 5 6 7] :b [1 2 3 4 5 6 7 8] :c 2 :d 5444}
               {:a [1 2 3 4 5 6 7] :b [1 2 3 4 5 6 7 8]}])]
   (println row)))

(defn display-error
  "Displays an error message in atom."
  [message]
  #?(:cljs
     (js/atom.notifications.addError
      message {:detail message :dismissable true})))

(defn display-warn
  "Displays an warning message in atom."
  [message]
  #?(:cljs
     (js/atom.notifications.addWarning
      message {:dismissable true})))

(defn define-vars-with-id
  "Executes code in proto repl to define vars that were captured with a specific
   id and optionally a specific binding."
  ([id]
   (define-vars-with-id id nil))
  ([id var-name]
   #?(:cljs
      (let [code (if var-name
                   `(proto-repl.saved-values/def-by-id ~id '~var-name)
                   `(proto-repl.saved-values/def-by-id ~id))
            code-str (pr-str code)
            options {:displayInRepl false
                     :resultHandler
                     (fn [result]
                       (let [result (js->clj result)]
                         (cond
                           (:error result)
                           (display-error (:error result))

                           (= result.value "false")
                           (display-warn
                            "The values could not be defined. You may have captured more subsequent values which are not displayed yet.")

                           (not= result.value "true")
                           (display-error (str "Unexpected result: " (pr-str result))))))}]
        (js/protoRepl.executeCode code-str options)))))

(defn def-button
  "Returns tree view button options to add a button for defining bindings that
   were captured"
  ([id]
   {:button_text "def"
    :button_class :def-saved-vars
    :button_fn #(define-vars-with-id id)})
  ([id var-name]
   {:button_text "def"
    :button_class :def-saved-var
    :button_fn #(define-vars-with-id id var-name)}))

(defn- value-map->display-tree-values
  "Takes a map of variable names and values and converts it into a displayable
   tree of values."
  [{:keys [id values]}]
  (for [[var-name value] values
        :let [val-display-tree (to-display-tree* value)]]
    (-> val-display-tree
        (update-in [0] #(str var-name ": " %))
        (assoc-in [1] (def-button id var-name)))))

(defn saved-value-maps->display-tree
  "A simpler display for value maps when they won't fit into a table"
  [saved-value-set]
  (let [[first-map & others] saved-value-set]
    (concat ["Saved values" (def-button (:id first-map))]
            (value-map->display-tree-values first-map)
            (into ["Previous Values" {}]
                  (map-indexed
                   (fn [i value-map]
                     (into [(str (inc i))
                            (def-button (:id value-map))]
                           (value-map->display-tree-values value-map)))
                   others)))))

(defn saved-values->display-tree-table
  "Takes a list of maps of variable names to values and converts it into a table
   of each map showing the values. Each row can be expanded to show more details
   of the values in the event any of them had to be truncated."
  [saved-value-set]
  (if-let [[header & rows] (value-maps->table-rows (map :values saved-value-set))]
    ;; Indent header by two spaces
    (into [(str "  " header) {}]
          (map (fn [row saved-values]
                 (into [row (def-button (:id saved-values))]
                       (value-map->display-tree-values saved-values)))
               rows
               saved-value-set))
    ;; There were too many columns to display in a table
    (saved-value-maps->display-tree saved-value-set)))


(comment
 ;; TODO update this or delete it
 (saved-value-maps->display-tree-table
  [{'a-normal 5
    'b-normal 4
    'super-long (range 300)}]))
