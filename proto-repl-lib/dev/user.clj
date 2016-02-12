(ns user
  (:require clojure.tools.namespace.repl
            [clojure.repl :refer :all]))


(defn reset []
  (clojure.tools.namespace.repl/refresh))

(println "Proto REPL Leiningen project started")
