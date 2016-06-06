(ns proto-repl.extension-comm
  ;; TODO rename this namespace
  "TODO"
  (require [clojure.core.async :as a]
           [clojure.edn :as edn]))

;; TODO prevent refresh

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def requests-waiting-for-response
  "TODO"
  (atom {}))

(defn- add-request
  "TODO"
  [msg]
  (swap! requests-waiting-for-response
         assoc
         (:id msg)
         msg))

(defn- clear-request
  "TODO"
  [id]
  (let [v (get @requests-waiting-for-response id)]
    (swap! requests-waiting-for-response dissoc id)
    v))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

(def request-channel
  (a/chan 10))

(defn- request-message
  "TODO"
  [extension-name data wait-for-response?]
  {:id (str (java.util.UUID/randomUUID))
   :extension-name extension-name
   :data data
   :response-chan (when wait-for-response?
                    (a/chan))})

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Requestor side

;; TODO come up with better names for these.

(defn request
  "TODO"
  [extension-name data]
  (a/>!! request-channel (request-message extension-name data false)))

(def read-timeout
  "TODO"
  10000)

;; TODO need better name for how to get results back.
(defn request-and-wait
  "TODO"
  [extension-name data]
  (let [{:keys [response-chan] :as msg} (request-message
                                         extension-name data true)
        ;; Put message on request queue
        _ (a/>!! request-channel msg)
        ;; Wait for a response or until we timeout.
        resp (a/alt!!
              response-chan ([v] v)
              (a/timeout read-timeout) ::timeout)]
    (if (= resp ::timeout)
      (throw (Exception.
              (format "Timed out after %s ms sending data to %s extension."
                      read-timeout extension-name)))
      (try
        (edn/read-string resp)
        (catch Exception _
          resp)))))


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Handler side

(defn read-request
  "TODO"
  []
  (let [msg (a/alt!!
             request-channel ([v] v)
             (a/timeout read-timeout) ::timeout)]
    (if (= msg ::timeout)
      msg
      (if-let [response-chan (:response-chan msg)]
        (do
         (swap! requests-waiting-for-response assoc (:id msg) msg)
         (assoc msg :requires-response true))
        (assoc msg :requires-response false)))))

(defn respond-to
  "TODO"
  [id response]
  (let [{:keys [response-chan]} (clear-request id)]
    (a/>!! response-chan response)))

(comment
 (def r (future
         (request-and-wait "foo" [:command])))

 (def requested (read-request))

 (respond-to (:id requested) :this-is-my-response)

 (deref r))
