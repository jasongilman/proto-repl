(ns replumb.common
  (:require [clojure.string :as string]))

;; js/Error tree representation
(defn error-branch?
  [error]
  (instance? js/Error error))

(defn error-children
  [error]
  [(.-cause error)])

(defn error-seq
  [error]
  (tree-seq error-branch? error-children error))

(defn extract-message
  "Iteratively extracts messages inside (nested #error objects), returns
  a string. If the boolean `exclude-error-msg?` is true, only the
  message marked with \"ERROR\" will be included in the final string. If
  the boolean `print-stack?` is true, the stack will be added to the
  final string. They both default to false.

  ** Be sure to pass a js/Error object here **"
  ([err]
   (extract-message err false false))
  ([err exclude-error-msg?]
   (extract-message err exclude-error-msg? false))
  ([err exclude-error-msg? print-stack?]
   (str (let [strings (cond->> (keep identity (error-seq err))
                           exclude-error-msg? (filter #(not= "ERROR" (.-message %1)))
                           true (map #(.-message %1))
                           true (filter (complement empty?)))]
          (if (seq strings)
            (string/join " - " strings)
            "Error"))
        (when print-stack?
          (str "\n" (.-stack err))))))

(defn echo-callback
  "Callback that just echoes the result map. It also asserts the correct
  result format in its post condition. Useful for debugging and
  testing."
  {:post [(map? %) (find % :success?) (or (find % :error) (find % :value))]} ;; TODO, use dire or schema
  [result-map]
  result-map)

(defn wrap-success
  "Wraps the message in a success map."
  [message]
  {:value message})

(defn wrap-error
  "Wraps the message in a error map."
  [message]
  {:error message})

(defn inline-newline?
  "Returns true if the string contains the newline \\\\n or \\\\r as
  characters."
  [s]
  (re-matches #"\\{2,}n|\\{2,}r" s))

(defn valid-eval-result?
  "Is the string returned from an evaluation valid?"
  ([result]
   (valid-eval-result? {} result))
  ([opts result]
   (or (and (not (:no-pr-str-on-value opts)) (string? result) (not (inline-newline? result)))
       (and (:no-pr-str-on-value opts) (not (nil? result))))))

(defn valid-eval-error?
  "Is the string returned from an evaluation valid?"
  [error]
  (instance? js/Error error))

(defn valid-eval-warning?
  "Is the string returned from an evaluation valid?"
  [warning]
  (string? warning))

(defn has-valid-warning?
  [result]
  (some-> (:warning result) valid-eval-warning?))

(defn error-keyword-not-supported
  "Yields a \"keyword not supported\" error map. Receives the
  symbol/keyword printed in the message and ex-info data."
  [keyword ex-info-data]
  (wrap-error (ex-info (str "The " keyword " keyword is not supported at the moment")
                       ex-info-data)))

(defn error-argument-must-be-symbol
  "Yields a \"Argument must a be a symbol\" error map. Receives the
  symbol/fn name printed in the message and ex-info data."
  [symbol ex-info-data]
  (wrap-error (ex-info (str "Argument to " symbol " must be a symbol") ex-info-data)))

(defn filter-fn-keys
  "Filter out the option map keys that have -fn in it."
  [opts]
  {:pre [(map? opts)]}
  (let [new-fn-entries (map #(assoc % 1 "<hidden function>") (filter #(re-find #"-fn" (name (first %))) (into [] opts)))]
    (into opts new-fn-entries)))

(defn debug-prn
  "The function used by replumb for logging. It simply calls println for
  now so you that client code can set *print-fn* to customize the
  behavior, for example the following marks traces as DEBUG:

  (set! *print-fn*
    (fn [& args]
      (.apply (.-debug js/console) js/console (into-array args))))"
  [& args]
  (apply println args))

(defn normalize-path
  "Adds a / if missing at the end of the path."
  [path]
  (str path (when-not (= "/" (last path)) "/")))
