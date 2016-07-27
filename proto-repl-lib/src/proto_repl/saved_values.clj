(ns proto-repl.saved-values
  "Allows saving values captured during execution and displaying them in context.")

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

(defn save*
  "Swaps in the map of var values"
  [uniq-id current-ns var-values-map]
  (let [saved-values {:id (guid)
                      :the-ns current-ns
                      :values var-values-map}]
    (swap! saved-values-atom update uniq-id
           (fn [cur-values]
             (let [new-values (conj (or cur-values []) saved-values)]
               (if (> (count new-values) max-number-saved-values)
                 (subvec new-values 1)
                 new-values)))))
  nil)

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
                             [`'~local local]))
        current-ns (symbol (str *ns*))]
    `(save* ~form-id '~current-ns ~locals-map)))

(defn- saved-values-with-id
  "Returns the values that were saved with a specific id."
  [id]
  (some->> (saved-values)
           vals
           (apply concat)
           (filter #(= id (:id %)))
           first))

(defn def-by-id
  "Def vars for bindings captured with proto-repl.saved-values/save. Can define all the bindings
   or just a specific one."
  ([id]
   (when-let [{:keys [the-ns values]} (saved-values-with-id id)]
     (doseq [[var-name value] values]
       (intern the-ns var-name value))
     (println "Values set for" (pr-str (keys values)))
     true))
  ([id selected-var]
   (when-let [{:keys [the-ns values]} (saved-values-with-id id)]
     (when-let [value (get values selected-var)]
       (intern the-ns selected-var value)
       (println "Value set for" selected-var)
       true))))
