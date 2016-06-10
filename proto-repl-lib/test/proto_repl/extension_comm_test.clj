(ns proto-repl.extension-comm-test
  (require [clojure.test :refer :all]
           [proto-repl.extension-comm :as e]))

(deftest request-and-wait-test
  (testing "Success case"
    (let [ext-state (e/create-extension-comm-state)
          f (future
             (e/send-command ext-state "foo" [:command]
                             {:wait-for-response? true}))
          requested (e/read-request ext-state)]

      (is (= {:extension-name "foo"
              :data [:command]}
             (select-keys requested [:extension-name :data])))
      (is (:id requested))

      (e/respond-to ext-state (:id requested) ":this-is-my-response")

      (is (= :this-is-my-response @f))))
  (testing "Timeout"
    (let [ext-state (e/create-extension-comm-state)]
      (is (thrown-with-msg?
           Exception #"Timed out .*"
           (e/send-command ext-state "foo" [:command]
                           {:timeout-ms 10 :wait-for-response? true})))))
  (testing "Bad EDN returns the string"
    (let [ext-state (e/create-extension-comm-state)
          f (future
             (e/send-command ext-state "foo" [:command]
                             {:wait-for-response? true}))
          requested (e/read-request ext-state)]
      (e/respond-to ext-state (:id requested) "[not-valid-edn")
      (is (= "[not-valid-edn" @f)))))
