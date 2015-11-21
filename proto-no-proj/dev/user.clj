(ns user
  (:require clojure.tools.namespace.repl
            clojure.test))

(defn reset []
  (clojure.tools.namespace.repl/refresh))

(println "Default Proto REPL Leiningen project started")
