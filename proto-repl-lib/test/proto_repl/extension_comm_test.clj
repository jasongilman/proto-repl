(ns proto-repl.extension-comm-test
  (require [clojure.test :refer :all]
           [proto-repl.extension-comm :as e]))

;; TODO fix this test so it won't be stuck

(deftest request-and-wait-test
  (testing "Success case"
   (let [f (future
            (e/request-and-wait "foo" [:command]))
         requested (e/read-request)]

     (is (= {:extension-name "foo"
             :data [:command]}
            (select-keys requested [:extension-name :data])))
     (is (:id requested))

     (e/respond-to (:id requested) ":this-is-my-response")

     (is (= :this-is-my-response @f))))
  (testing "Timeout"
    (is (thrown-with-msg?
         Exception #"Timed out .*"
         (e/request-and-wait "foo" [:command] 10))))
  ;; TODO requires being able to pass in the system
  #_(testing "Bad EDN returns the string"
     (let [f (future
              (e/request-and-wait "foo" [:command]))
           requested (e/read-request)]
       (e/respond-to (:id requested) "[not-valid-edn")
       (is (= "[not-valid-edn" @f)))))
