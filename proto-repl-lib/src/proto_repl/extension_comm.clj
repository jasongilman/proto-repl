(ns proto-repl.extension-comm
  "Provides a mechanism for communication between Proto REPL running in Atom and
   extensions running in the JVM."
  (require [clojure.core.async :as a]
           [clojure.edn :as edn]))

(def read-timeout
  "TODO"
  10000)

(defn create-extension-comm-state
  "Creates the state that keeps track of the communication."
  []
  {:requests-waiting-for-response (atom {})
   :request-chan (a/chan 10)})

(def saved-extension-comm-state
  "TODO"
  (create-extension-comm-state))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; TODO test these functions to make sure that the requests-waiting-for-response
;; is correct after each of these.

(defn read-request
  "TODO"
  [ext-state]
  (let [{:keys [requests-waiting-for-response]} ext-state
        msg (a/alt!!
             (:request-chan ext-state) ([v] v)
             (a/timeout read-timeout) ::timeout)]
    (if (= msg ::timeout)
      msg
      (if-let [response-chan (:response-chan msg)]
        (do
         (swap! requests-waiting-for-response assoc (:id msg) response-chan)
         (assoc msg :requires-response true))
        (assoc msg :requires-response false)))))

(defn- wait-for-response
  "TODO"
  [ext-state msg timeout-ms]
  (let [{:keys [requests-waiting-for-response]} ext-state
        {:keys [response-chan id]} msg
        resp (a/alt!!
              response-chan ([v] v)
              (a/timeout (or timeout-ms read-timeout)) ::timeout)]
    (if (= resp ::timeout)
      (throw (Exception.
              (format "Timed out after %s ms while waiting for a response"
                      timeout-ms)))
      (try
        (edn/read-string resp)
        (catch Exception _
          resp)))))

(defn respond-to
  "TODO"
  [ext-state id response]
  (let [{:keys [requests-waiting-for-response]} ext-state
        response-chan (-> requests-waiting-for-response
                          deref
                          (get id))]
    (swap! requests-waiting-for-response dissoc id)
    (a/>!! response-chan response)))

(defn- request-message
  "TODO"
  [extension-name data wait-for-response?]
  {:id (str (java.util.UUID/randomUUID))
   :extension-name extension-name
   :data data
   :response-chan (when wait-for-response?
                    (a/chan))})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Requestor side (JVM and Clojure code)

(defn send-command
  "TODO"
  ([ext-state extension-name data]
   (send-command ext-state extension-name data
                 {:timeout-ms read-timeout}))
  ([ext-state extension-name data {:keys [timeout-ms wait-for-response?]}]
   (let [{:keys [request-chan]} ext-state
         msg (request-message extension-name data wait-for-response?)
         ;; Put message on request queue
         _ (a/>!! request-chan msg)]
     (when wait-for-response?
       (wait-for-response ext-state msg timeout-ms)))))
