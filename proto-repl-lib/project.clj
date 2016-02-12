(defproject proto-repl "0.1.0"
  :description "A set of helper functions for projects used in Proto REPL"
  :license {:name "MIT"
            :url "https://opensource.org/licenses/MIT"}
  :dependencies [[org.clojure/clojure "1.8.0"]]

  :profiles
  {:dev {:dependencies [[org.clojure/tools.namespace "0.2.11"]]
         :source-paths ["dev" "src" "test"]}})
