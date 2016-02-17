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

(deftest save-some-values-test
  (let [a 1
        b 2]
    (testing "first save"
      (proto/save 1)
      (is (= '{"(proto/save 1)" [{a 1 b 2}]}
             (proto/saved-values))))

    (testing "subsequent save with no changes"
      (proto/save 1)
      (is (= '{"(proto/save 1)" [{a 1 b 2}
                                 {a 1 b 2}]}
             (proto/saved-values))))

    (testing "Save with a different value"
      (let [a 3]
        (proto/save 1)
        (is (= '{"(proto/save 1)" [{a 1 b 2}
                                   {a 1 b 2}
                                   {a 3 b 2}]}
               (proto/saved-values)))))

    (testing "Save with a different id"
      (let [a 4]
        (proto/save 2)
        (is (= '{"(proto/save 1)" [{a 1 b 2}
                                   {a 1 b 2}
                                   {a 3 b 2}]
                 "(proto/save 2)" [{a 4 b 2}]}
               (proto/saved-values))))))
  (testing "Save outside of scope of previous binding"
    (proto/save 1)
    (is (= '{"(proto/save 1)" [{a 1 b 2}
                               {a 1 b 2}
                               {a 3 b 2}
                               {}]
             "(proto/save 2)" [{a 4 b 2}]}
           (proto/saved-values)))))

(deftest save-specific-values
  (let [a 1
        b 2
        c 3]
    (proto/save 1 a b)
    (is (= '{"(proto/save 1 a b)" [{a 1 b 2}]}
           (proto/saved-values)))))


(deftest max-saved-values-test
  (dotimes [n (inc (inc proto/max-number-saved-values))]
    (proto/save :id))
  (let [saved-maps (get (proto/saved-values) "(proto/save :id)")]
    ;; Only save max-number-saved-values values
    (is (= proto/max-number-saved-values
           (count saved-maps)))
    ;; The first one we saved should be 2. 1 and 0 were dropped.
    (is (= 2
           (-> saved-maps first (get 'n))))))
