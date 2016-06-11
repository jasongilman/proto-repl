(ns proto-repl.extension-comm
  "Provides a mechanism for communication between Proto REPL running in Atom and
   extensions running in the JVM."
  (require [clojure.core.async :as a]
           [clojure.edn :as edn]))

(def read-timeout
  "The timeout in milliseconds when reading from a channel."
  10000)

(defn- request-message
  "Creates a message to the proto repl extension with the given name. data is
  contains the data to send to the extension. If wait-for-response? is true then
  the message indicates that the caller wants to receive a response from the call."
  [extension-name data wait-for-response?]
  {:id (str (java.util.UUID/randomUUID))
   :extension-name extension-name
   :data data
   :response-chan (when wait-for-response?
                    (a/chan))
   :requires-response wait-for-response?})

(defn create-extension-comm-state
  "Creates the state that keeps track of the communication."
  []
  {;; A map of message ids to core.async channels that are waiting for a response.
   :requests-waiting-for-response (atom {})
   ;; A channel containing messages that need to be processed by extensions
   ;; running in Atom
   :request-chan (a/chan 10)})

(def global-ext-state
  "Global mutable state (the best kind) that tracks requests to extensions
   running in Atom. This is kept in a var instead due to the limitations from
   where it's called in Atom. Functions in this namespace allow passing in the
   the extension communication state but that's mainly for testing."
  (create-extension-comm-state))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Atom Side functions
;; These support Proto REPL code in Atom retrieving the requests that are pending
;; and processing them.

(defn- read-within
  "Attempts to read a message from the channel within timeout ms. Returns
  ::timeout if a timeout occurs"
  [c timeout-ms]
  (a/alt!!
   c ([v] v)
   (a/timeout timeout-ms) ::timeout))

(defn read-request
  "Reads the next message that was sent to an extension in Atom."
  [ext-state]
  (let [{:keys [requests-waiting-for-response]} ext-state
        msg (read-within (:request-chan ext-state) read-timeout)]
    (if (= msg ::timeout)
      msg
      (if-let [response-chan (:response-chan msg)]
        (do
         (swap! requests-waiting-for-response assoc (:id msg) response-chan)
         msg)
        msg))))

(defn- wait-for-response
  "Waits for a response to the given message for up to timeout-ms."
  [ext-state msg timeout-ms]
  (let [{:keys [requests-waiting-for-response]} ext-state
        {:keys [response-chan id]} msg
        resp (read-within response-chan (or timeout-ms read-timeout))]
    (if (= resp ::timeout)
      (throw (Exception.
              (format "Timed out after %s ms while waiting for a response"
                      timeout-ms)))
      (try
        (edn/read-string resp)
        (catch Exception _
          resp)))))

(defn respond-to
  "Responds to a message with the id given with the response data. response
   should be a string of parseable edn data."
  [ext-state id response]
  (let [{:keys [requests-waiting-for-response]} ext-state
        response-chan (-> requests-waiting-for-response
                          deref
                          (get id))]
    (swap! requests-waiting-for-response dissoc id)
    (a/>!! response-chan response)))

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
;; Requestor side (JVM and Clojure code)

(defn send-command
  "Allows code from the Clojure side of an extension to make requests to the
   extension code running in Atom.
   Arguments:
   * extension-name - Name of the extension as registered in Proto REPL.
   * data - Data to send to the extension. This will be converted to EDN and then
    parsed into JSON.
   * options
     * wait-for-response? - true to wait for a response to the command. Should be
       set to true if some data from Atom is needed from this request.
     * timeout-ms - the number of milliseconds to wait before timing out. Defaults
       to 10000 milliseconds."
  ([extension-name data]
   (send-command extension-name data {:timeout-ms read-timeout}))
  ([extension-name data options]
   (send-command global-ext-state extension-name data options))
  ([ext-state extension-name data {:keys [timeout-ms wait-for-response?]}]
   (let [{:keys [request-chan]} ext-state
         msg (request-message extension-name data wait-for-response?)
         ;; Put message on request queue
         _ (a/>!! request-chan msg)]
     (when wait-for-response?
       (wait-for-response ext-state msg timeout-ms)))))
