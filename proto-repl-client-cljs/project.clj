(defproject proto-repl-client-cljs "0.0.1-SNAPSHOT"
  :description "Implementations of portions of Proto REPL in clojurescript."
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.clojure/clojurescript "1.7.228"]
                 [fipp "0.6.4"]
                 [replumb "0.1.5-3"]
                 [proto-repl-charts "0.3.2"]]
  :plugins [[lein-cljsbuild "1.1.2"]]
  :cljsbuild {:builds [{:source-paths ["src-cljs" "src"]
                        :compiler {:output-to "../lib/proto_repl/edn_reader.js"
                                   :main proto-repl.edn-reader
                                   :optimizations :simple
                                   :output-wrapper true
                                   :target :nodejs}}
                       {:source-paths ["src-cljs" "src"]
                        :compiler {:output-to "../lib/proto_repl/self_hosted.js"
                                   :main proto-repl.self-hosted
                                   :optimizations :simple
                                   :output-wrapper true
                                   :target :nodejs}}]}

  :profiles
  {:dev {:dependencies [[org.clojure/tools.namespace "0.2.11"]
                        [pjstadig/humane-test-output "0.7.1"]
                        [proto-repl "0.3.1"]]
         :injections [(require 'pjstadig.humane-test-output)
                      (pjstadig.humane-test-output/activate!)]
         :source-paths ["dev" "src" "tests"]}})
