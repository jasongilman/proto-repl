(ns proto
  "The main namespace for access Proto REPL helper functions")

(def max-number-saved-values
  "The maximum number of saved values that will be saved per id"
  20)

(def ^:private saved-values-atom
  "A map of save call unique ids to a map of var names and values"
  (atom {}))

(defn saved-values
  "Fetches the latest map of saved values. The oldest value map is the first element
  in the list."
  []
  (deref saved-values-atom))

(defn clear-saved-values!
  "Clears all the saved values."
  []
  (reset! saved-values-atom {}))

(defn guid
  "Generates a guid"
  []
  (.toString (java.util.UUID/randomUUID)))

;; Each set of saved values could be given a unique version number. This would
;; allow the GUI to more efficiently fetch and display only the changes.
(defn save*
  "Swaps in the map of var values"
  [uniq-id current-ns var-values-map]
  (let [saved-values {:id (guid)
                      :the-ns (symbol (str *ns*))
                      :values var-values-map}]
    (swap! saved-values-atom update uniq-id
           (fn [cur-values]
             (let [new-values (conj (or cur-values []) saved-values)]
               (if (> (count new-values) max-number-saved-values)
                 (subvec new-values 1)
                 new-values))))))

(defn- gensym-var?
  "Returns true if the symbol represents a gensym var."
  [sym]
  (let [sym-name (name sym)]
    (some? (or (re-matches #".+__\d+" sym-name)
               (re-matches #".+__\d+__auto__" (name sym))))))

(defmacro save
  "Saves all the values of local bindings. Either saves all or saves the specified
   set of bindings"
  [uniq-id & locals]
  ;; TODO capture the name of the current namespace when this runs as well.
  (let [locals (or (seq locals)
                   (remove gensym-var? (keys &env)))

        form-id (pr-str &form)
        locals-map (into {} (for [local locals]
                             [`'~local local]))]
    `(save* ~form-id ~*ns* ~locals-map)))


(some->> (saved-values)
         vals
         (apply concat))

(defn def-by-id
  "TODO"
  [id]
  (if-let [{:keys [the-ns values]} (some->> (saved-values)
                                            vals
                                            (apply concat)
                                            (filter #(= id (:id %)))
                                            first)]
    (do
     (doseq [[var-name value] values]
       (intern the-ns var-name value))
     (println "Values set for" (pr-str (keys values)))
     true)
    false))




;; TODO add a function for defing values
;; Takes
;; - unique id
;; - index
;; Figures out the namespace
;; Gets the values and the var names.
;; Creates defs and executes them in the namespace.

;;
;;(intern 'user 'foo "value")
