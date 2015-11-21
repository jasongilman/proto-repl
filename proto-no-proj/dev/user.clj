(ns user
  (:require clojure.tools.namespace.repl
            clojure.test))

(defn reset []
  (clojure.tools.namespace.repl/refresh))
