(defproject proto-no-proj "0.1.0-SNAPSHOT"
  :description "A default leiningen project to use when there is no project."
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/tools.namespace "0.2.11"]]

  :profiles
  {:dev {:source-paths ["dev" "src"]}})
         
