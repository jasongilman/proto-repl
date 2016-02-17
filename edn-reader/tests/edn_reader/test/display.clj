(ns edn-reader.test.display
    "This tests the edn-reader.display namespace"
    (:require [clojure.test :refer :all]
              [clojure.string :as str]
              [edn-reader.display :as d]))



(deftest saved-value-map-to-display-tree-table-test
  (testing "simple"
    (is (= ["  a |" ["4 |" ["a: 4"]]]
           (d/saved-value-maps->display-tree-table
            '[{a 4}])))))

(deftest calculate-columns-widths-test
  (is (= {:c 36, :b 8, :a 8}
         (d/calculate-columns-widths
          {:a 8, :b 8, :c 1091}))))
