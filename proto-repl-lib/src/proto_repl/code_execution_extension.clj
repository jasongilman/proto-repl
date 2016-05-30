(ns proto-repl.code-execution-extension
  "TODO"
  (:import [java.util.concurrent
            ArrayBlockingQueue
            TimeUnit]))

;; TODO prevent this namespace from being reloaded

(def communication-queue
  "This is a queue that will allow code executed in a running REPL process to
   communicate back to the Proto REPL code in Atom."
  (ArrayBlockingQueue. 10))

(def timeout-write-secs
  "The number of seconds to wait before timing out writing the code execution
   extension data."
  10)

(defn send-data
  "TODO"
  [code-execution-ext-name data]
  (when-not (.offer communication-queue
                    [code-execution-ext-name data]
                    timeout-write-secs
                    TimeUnit/SECONDS)
    (throw (Exception.
            (str "Timed out trying to send Proto REPL code execution extension"
                 " data after " timeout-write-secs " seconds.")))))

(defn receive-data
  "Returns a vector any waiting code execution extension data. The vector will
   contain tuples where the first element is the code execution extension name
   and the second item is the data. Returns nil if no data is available after
   waiting."
  ([]
   (receive-data 10 10))
  ([wait-time-secs max-items]
   (when-let [first-item (.poll communication-queue
                                wait-time-secs
                                TimeUnit/SECONDS)]
     (loop [items (transient [first-item])]
       (if-let [next-item (.poll communication-queue)]
         (let [items (conj! items next-item)]
           (if (>= (count items) max-items)
             ;; Retrieved max items. Return.
             (persistent! items)
             ;; Try for more.
             (recur items)))
         ;; No more items available.
         (persistent! items))))))


(comment
 (send-data "foo" 1)
 (send-data "foo" 2)
 (send-data "foo" 3)

 (receive-data))
