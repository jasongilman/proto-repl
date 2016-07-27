(defproject proto-no-proj "0.1.0-SNAPSHOT"
  :description "A default leiningen project to use when there is no project."
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [proto-repl-charts "0.3.1"]
                 [proto-repl "0.3.1"]]

  :profiles
  {:dev {:source-paths ["dev" "src"]}})
