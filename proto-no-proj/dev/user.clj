(ns user
  (:require clojure.tools.namespace.repl
            clojure.test
            [clojure.repl :refer :all]
            [proto]
            prc))

(defn reset []
  (clojure.tools.namespace.repl/refresh))

(println "Default Proto REPL Leiningen project started")
