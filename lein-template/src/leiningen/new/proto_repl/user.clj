(ns user
  (:require [clojure.tools.namespace.repl :as tnr]
            [proto-repl.saved-values]))

(defn start
  []
  (println "Start completed"))

(defn reset []
  (tnr/refresh :after 'user/start))

(println "{{ns-name}} dev/user.clj loaded.")
