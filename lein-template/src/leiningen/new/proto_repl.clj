(ns leiningen.new.proto-repl
  (:require [leiningen.new.templates :refer [renderer name-to-path sanitize-ns ->files year]]
            [leiningen.core.main :as main]))

(def render (renderer "proto-repl"))

(defn proto-repl
  "FIXME: write documentation"
  [name & args]
  (let [data {:name name
              :year (year)
              :ns-name (sanitize-ns name)
              :sanitized (name-to-path name)
              :include-prc (and args (= "+proto-repl-charts" (first args)))}]

    (main/info "Generating fresh 'lein new' proto-repl project.")

    (->files data
             [".gitignore" (render "gitignore")]
             ["README.md" (render "README.md" data)]
             ["project.clj" (render "project.clj" data)]
             ["test/{{sanitized}}/core_test.clj" (render "core_test.clj" data)]
             ["src/{{sanitized}}/core.clj" (render "core.clj" data)]
             ["dev/user.clj" (render "user.clj" data)])))
