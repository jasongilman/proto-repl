(ns proto-test
  (:require [clojure.test :refer :all]
            [proto]))

;; Clear saved values
(use-fixtures :each (fn [f]
                      (proto/clear-saved-values!)
                      (f)
                      (proto/clear-saved-values!)))

(deftest initial-state-test
  (is (= {} (proto/saved-values))))

(defn guid-replacement
  []
  (let [a (atom 0)]
    (fn [] (swap! a inc))))

(deftest save-some-values-test
  (with-redefs [proto/guid (guid-replacement)]
    (let [a 1
          b 2]
      (testing "first save"
        (proto/save 1)
        (is (= '{"(proto/save 1)" [{:id 1 :values {a 1 b 2}}]}
               (proto/saved-values))))

      (testing "subsequent save with no changes"
        (proto/save 1)
        (is (= '{"(proto/save 1)" [{:id 1 :values {a 1 b 2}}
                                   {:id 2 :values {a 1 b 2}}]}
               (proto/saved-values))))

      (testing "Save with a different value"
        (let [a 3]
          (proto/save 1)
          (is (= '{"(proto/save 1)" [{:id 1 :values {a 1 b 2}}
                                     {:id 2 :values {a 1 b 2}}
                                     {:id 3 :values {a 3 b 2}}]}
                 (proto/saved-values)))))

      (testing "Save with a different id"
        (let [a 4]
          (proto/save 2)
          (is (= '{"(proto/save 1)" [{:id 1 :values {a 1 b 2}}
                                     {:id 2 :values {a 1 b 2}}
                                     {:id 3 :values {a 3 b 2}}]
                   "(proto/save 2)" [{:id 4 :values {a 4 b 2}}]}
                 (proto/saved-values))))))
    (testing "Save outside of scope of previous binding"
      (proto/save 1)
      (is (= '{"(proto/save 1)" [{:id 1 :values {a 1 b 2}}
                                 {:id 2 :values {a 1 b 2}}
                                 {:id 3 :values {a 3 b 2}}
                                 {:id 5 :values {}}]
               "(proto/save 2)" [{:id 4 :values {a 4 b 2}}]}
             (proto/saved-values))))))

(deftest save-specific-values
  (with-redefs [proto/guid (guid-replacement)]
    (let [a 1
          b 2
          c 3]
      (proto/save 1 a b)
      (is (= '{"(proto/save 1 a b)" [{:id 1 :values {a 1 b 2}}]}
             (proto/saved-values))))))

(deftest max-saved-values-test
  (with-redefs [proto/guid (guid-replacement)]
    (dotimes [n (inc (inc proto/max-number-saved-values))]
      (proto/save :id))
    (let [saved-maps (get (proto/saved-values) "(proto/save :id)")]
      ;; Only save max-number-saved-values values
      (is (= proto/max-number-saved-values
             (count saved-maps)))
      ;; The first one we saved should be 2. 1 and 0 were dropped.
      (is (= 2
             (-> saved-maps first :values (get 'n)))))))
