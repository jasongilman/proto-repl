(ns edn-reader.test.display
    "This tests the edn-reader.display namespace"
    (:require [clojure.test :refer :all]
              [clojure.string :as str]
              [proto-repl.edn-reader.display :as d]
              [clojure.walk :as w]))

(deftest calculate-columns-widths-test
  (is (= {:c 36, :b 8, :a 8}
         (d/calculate-columns-widths
          {:a 8, :b 8, :c 1091}))))
