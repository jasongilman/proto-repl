(ns user
  (:require clojure.tools.namespace.repl
            [clojure.repl :refer :all]
            [proto-repl.extension-comm]))


(defn reset []
  (clojure.tools.namespace.repl/refresh))

(println "Proto REPL Leiningen project started")
