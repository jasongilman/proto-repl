(defproject edn-reader "0.0.1-SNAPSHOT"
  :description "Packages the ClojureScript EDN reader function so it can be used from JavaScript"
  :dependencies [[org.clojure/clojure "1.7.0"]
                 [org.clojure/clojurescript "1.7.170"]]
  :plugins [[lein-cljsbuild "1.1.2"]]
  :cljsbuild {
              :builds [{:source-paths ["src-cljs"]
                        :compiler {:output-to "../lib/edn-reader.js"
                                   :optimizations :advanced
                                   :target :nodejs
                                   :pretty-print true}}]})
