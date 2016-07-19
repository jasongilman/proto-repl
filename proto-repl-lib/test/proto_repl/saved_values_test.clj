(ns proto-repl.saved-values-test
  (:require [clojure.test :refer :all]
            [proto-repl.saved-values :as ps]))

;; Clear saved values
(use-fixtures :each (fn [f]
                      (ps/clear-saved-values!)
                      (f)
                      (ps/clear-saved-values!)))

(deftest initial-state-test
  (is (= {} (ps/saved-values))))

(defn guid-replacement
  []
  (let [a (atom 0)]
    (fn [] (swap! a inc))))

(defmacro value-map
  [id values]
  `{:id ~id
    :the-ns 'proto-repl.saved-values-test
    :values (quote ~values)})

(deftest save-some-values-test
  (with-redefs [ps/guid (guid-replacement)]
    (let [a 1
          b 2]
      (testing "first save"
        (ps/save 1)
        (is (= {"(ps/save 1)" [(value-map 1 {a 1 b 2})]}
               (ps/saved-values))))

      (testing "subsequent save with no changes"
        (ps/save 1)
        (is (= {"(ps/save 1)" [(value-map 1 {a 1 b 2})
                               (value-map 2 {a 1 b 2})]}
               (ps/saved-values))))

      (testing "Save with a different value"
        (let [a 3]
          (ps/save 1)
          (is (= {"(ps/save 1)" [(value-map 1 {a 1 b 2})
                                 (value-map 2 {a 1 b 2})
                                 (value-map 3 {a 3 b 2})]}
                 (ps/saved-values)))))

      (testing "Save with a different id"
        (let [a 4]
          (ps/save 2)
          (is (= {"(ps/save 1)" [(value-map 1 {a 1 b 2})
                                 (value-map 2 {a 1 b 2})
                                 (value-map 3 {a 3 b 2})]
                  "(ps/save 2)" [(value-map 4 {a 4 b 2})]}
                 (ps/saved-values))))))
    (testing "Save outside of scope of previous binding"
      (ps/save 1)
      (is (= {"(ps/save 1)" [(value-map 1 {a 1 b 2})
                             (value-map 2 {a 1 b 2})
                             (value-map 3 {a 3 b 2})
                             (value-map 5 {})]
              "(ps/save 2)" [(value-map 4 {a 4 b 2})]}
             (ps/saved-values))))))

(deftest save-specific-values
  (with-redefs [ps/guid (guid-replacement)]
    (let [a 1
          b 2
          c 3]
      (ps/save 1 a b)
      (is (= {"(ps/save 1 a b)" [(value-map 1 {a 1 b 2})]}
             (ps/saved-values))))))

(deftest max-saved-values-test
  (with-redefs [ps/guid (guid-replacement)]
    (dotimes [n (inc (inc ps/max-number-saved-values))]
      (ps/save :id))
    (let [saved-maps (get (ps/saved-values) "(ps/save :id)")]
      ;; Only save max-number-saved-values values
      (is (= ps/max-number-saved-values
             (count saved-maps)))
      ;; The first one we saved should be 2. 1 and 0 were dropped.
      (is (= 2
             (-> saved-maps first :values (get 'n)))))))
