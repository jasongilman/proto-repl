(defproject edn-reader "0.0.1-SNAPSHOT"
  :description "Packages the ClojureScript EDN reader function so it can be used from JavaScript"
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.7.170"]
                 [fipp "0.6.4"]]
  :plugins [[lein-cljsbuild "1.1.2"]]
  :cljsbuild {:builds [{:source-paths ["src-cljs" "src"]
                        :compiler {:output-to "../lib/edn-reader.js"
                                   :optimizations :advanced
                                   :target :nodejs
                                   :pretty-print true}}]}

  :profiles
  {:dev {:dependencies [[org.clojure/tools.namespace "0.2.11"]
                        [pjstadig/humane-test-output "0.7.1"]
                        [proto-repl "0.1.2"]]
         :injections [(require 'pjstadig.humane-test-output)
                      (pjstadig.humane-test-output/activate!)]
         :source-paths ["dev" "src" "tests"]}})
