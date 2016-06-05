(defproject proto-no-proj "0.1.0-SNAPSHOT"
  :description "A default leiningen project to use when there is no project."
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/tools.namespace "0.2.11"]
                 [proto-repl-charts "0.2.0"]
                 ;; TODO update this to latest
                 [proto-repl "0.2.0-SNAPSHOT"]]

  :profiles
  {:dev {:source-paths ["dev" "src"]}})
