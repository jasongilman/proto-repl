(defproject proto-repl "0.3.1"
  :description "A set of helper functions for projects used in Proto REPL"
  :license {:name "MIT"
            :url "https://opensource.org/licenses/MIT"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/core.async "0.2.374"]
                 [org.clojure/tools.namespace "0.2.11"]
                 ;; For completions
                 [compliment "0.2.7"]]

  :profiles
  {:dev {:dependencies [[pjstadig/humane-test-output "0.7.1"]]
         :injections [(require 'pjstadig.humane-test-output)
                      (pjstadig.humane-test-output/activate!)]
         :source-paths ["dev" "src" "test"]}})
