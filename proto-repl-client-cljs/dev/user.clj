(ns user
  (:require clojure.tools.namespace.repl
            [clojure.repl :refer :all]
            [proto]))


(defn reset []
  (clojure.tools.namespace.repl/refresh))

(println "Proto REPL Client CLJS project started")
