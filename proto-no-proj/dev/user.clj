(ns user
  (:require clojure.tools.namespace.repl
            clojure.test
            [clojure.repl :refer :all]
            prc))

(defn reset []
  (clojure.tools.namespace.repl/refresh))

(println "Default Proto REPL Leiningen project started")


(def saved-values
  "A map of uniq-id-form to a map of var names and values"
  (atom {}))

(defn clear-saved-values!
  []
  (reset! saved-values {}))

(defn save*
  [uniq-form var-values-map]
  (swap! saved-values update uniq-form conj var-values-map))
  ; (swap! saved-values
  ;        (fn [existing-map]
  ;          (update existing-map uniq-form
  ;                  (fn [existing-values]
  ;                    (conj existing-values var-values-map))))))


; TODO allow more than one var
; TODO no vars specified means everything
(defmacro save
  [uniq-id]
  (let [locals (keys &env)
        form-id (pr-str &form)
        _ (println "locals" (pr-str locals))
        locals-map (into {} (for [local locals]
                             [(name local) local]))]
    `(save* ~form-id ~locals-map)))

(comment
 (let [a 2
       b "foo2"]
   (save 1234))

 (deref saved-values))



(comment

 {'a a}


 (macroexpand '(save 1))

 (save 1)

 (let [b "d"]
   (save 1))


 (let [a 1]
   (save 1))

 (clojure.walk/macroexpand-all
  '(let [a 1]
    (save 1)))

 (let* [a 1] [nil "(save 1)"]))
