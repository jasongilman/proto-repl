(ns proto-repl.extension-comm-test
  (require [clojure.test :refer :all]
           [proto-repl.extension-comm :as e]))

(deftest request-and-response-test
  (testing "Success case"
    (let [ext-state (e/create-extension-comm-state)
          f (future
             (e/send-command ext-state "foo" [:command]
                             {:wait-for-response? true}))
          requested (e/read-requests ext-state 2)
          _ (is (= (count requested) 1))
          [requested] requested]

      (is (= {:extension-name "foo"
              :data [:command]}
             (select-keys requested [:extension-name :data])))
      (is (:id requested))

      (e/respond-to ext-state (:id requested) ":this-is-my-response")

      (is (= :this-is-my-response @f))))

  (testing "Multiple requests"
    (let [ext-state (e/create-extension-comm-state)
          _ (doseq [n (range 1 5)]
              (e/send-command ext-state "foo" (str "command" n) nil))
          requested (e/read-requests ext-state 3)]
      (is (= (count requested) 3))

      (is (= ["command1" "command2" "command3"]
             (map :data requested)))
      (testing "Read less than requested"
        (is (= ["command4"] (map :data (e/read-requests ext-state 2)))))))

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
          requested (first (e/read-requests ext-state 2))]
      (e/respond-to ext-state (:id requested) "[not-valid-edn")
      (is (= "[not-valid-edn" @f)))))
