(ns replumb.core
  (:require-macros [cljs.env.macros :refer [with-compiler-env]])
  (:require [cljs.js :as cljs]
            [replumb.repl :as repl]
            [replumb.common :as common]))

(defn ^:export read-eval-call
  "Reads, evaluates and calls back with the evaluation result.

  The first parameter is a map of configuration options, currently
  supporting:

  * `:verbose` will enable the the evaluation logging, defaults to false.
  To customize how to print, use `(set! *print-fn* (fn [& args] ...)`

  * `:warning-as-error` will consider a compiler warning as error
  * `:target` `:nodejs` and `:browser` supported, the latter is used if
  missing
  * `:init-fn!` user provided initialization function, it will be passed a
  map:

          :form   ;; the form to evaluate, as data
          :ns     ;; the current namespace, as symbol
          :target ;; the current target

  * `:load-fn!` will override replumb's default `cljs.js/*load-fn*`.
  It rules out `:read-file-fn!`, losing any perk of using `replumb.load`
  helpers. Use it if you know what you are doing and follow this
  protocol:

      ```
      Each runtime environment provides a different way to load a library.
      Whatever function `*load-fn*` is bound to will be passed two arguments
      - a map and a callback function: The map will have the following keys:

          :name   - the name of the library (a symbol)
          :macros - modifier signaling a macros namespace load
          :path   - munged relative library path (a string)

      The callback cb, upon resolution, will need to pass the same map:

          :lang       - the language, :clj or :js
          :source     - the source of the library (a string)
          :cache      - optional, if a :clj namespace has been precompiled to
                        :js, can give an analysis cache for faster loads.
          :source-map - optional, if a :clj namespace has been precompiled
                        to :js, can give a V3 source map JSON

      If the resource could not be resolved, the callback should be invoked with
      nil.
      ```

  * `:read-file-fn!` an asynchronous 2-arity function with signature
  `[file-path src-cb]` where src-cb is itself a function `(fn [source]
  ...)` that needs to be called with the file content as string (`nil`
  if no file is found). It is mutually exclusive with `:load-fn!` and
  will be ignored in case both are present

  * `:write-file-fn!` a synchronous 2-arity function with signature
  `[file-path data]` that accepts a file-path and data to write.

  * `:src-paths` - a vector of paths containing source files

  * `:cache` - a map containing two optional values: the first, `:path`,
  indicates the path of the cached files. The second, `:src-paths-lookup?`,
  indicates whether search the cached files in `:src-paths`. If both present,
  `:path` will have the priority but both will be inspected.

  * `:no-pr-str-on-value`  in case of `:success?` avoid converting the
  result map `:value` to string

  * `:context` - indicates the evaluation context that will be passed to
  `cljs/eval-str`. Defaults to `:expr`.

  * `:foreign-libs` - a way to include foreign libraries. The format is analogous
  to the compiler option. For more info visit https://github.com/clojure/clojurescript/wiki/Compiler-Options#foreign-libs

  The second parameter, `callback`, should be a 1-arity function which receives
  the result map, whose result keys will be:

  ```
  :success?  a boolean indicating if everything went alright
  :value     (if (:success? result)), this key contains the yielded value as
             string, unless :no-pr-str-on-value is true, in which case it
             returns the bare value.
  :error     (if-not (:success? result)) will contain a js/Error
  :warning   in case a warning was thrown and :warning-as-error is falsey
  :form      the evaluated form as data structure (not string)}
  ```

  The third parameter is the source string to be read and evaluated.

  It initializes the repl harness either on first execution or if an
  option in `#{:src-paths :init-fn!}` changes from the previous
  `read-eval-call`."
  ([callback source] (repl/read-eval-call {} callback source))
  ([opts callback source] (repl/read-eval-call opts callback source)))

(defn ^:export get-prompt
  "Retrieves the REPL prompt to display, according to the current
  namespace. Returns a string."
  []
  (str (repl/current-ns) "=> "))

(defn ^:export error->str
  "Return the message string of the input `js/Error`."
  ([error] (common/extract-message error))
  ([error print-stack?] (common/extract-message error print-stack?)))

(defn ^:export unwrap-result
  "Unwraps the result of an evaluation.

  It returns the content of `:value` in case of success and the content
  of `:error` (a `js/Error`) in case of failure.

  When `include-warning?` is true, then the value yields from, in order,
  `:error`, then `:warning` and then eventually `:value`."
  ([result-map]
   (unwrap-result result-map false))
  ([result-map include-warning?]
   (let [{:keys [error value warning]} result-map]
     (if error
       error
       (if (and include-warning? warning)
         warning
         value)))))

(defn ^:export success?
  "Given a `result-map`, tells whether the evaluation was successful."
  [result-map]
  (:success? result-map))

(defn ^:export result->string
  "Given a `result-map`, returns the result of the evaluation as string.

  - When `include-warning?` is true, then the string yields from, in
  order, `:error`, then `:warning` and then eventually `:value`.
  - When `print-stack?` is true, the error string will include the stack
  trace."
  ([result-map]
   (result->string result-map false false))
  ([result-map print-stack?]
   (result->string result-map print-stack? false))
  ([result-map print-stack? include-warning?]
   (let [{:keys [error value warning]} result-map]
     (if error
       (common/extract-message error false print-stack?)
       (if (and include-warning? warning)
         warning
         value)))))

(defn ^:export browser-options
  "Creates the browser option map for read-eval-call.

  The 1-arity function requires a `load-fn!` compatible with
  ClojureScript `cljs.js/*load-fn*`. Use it if you know what you are
  doing and follow this protocol:

      Each runtime environment provides a different way to load a library.
      Whatever function `*load-fn*` is bound to will be passed two arguments
      - a map and a callback function: The map will have the following keys:

          :name   - the name of the library (a symbol)
          :macros - modifier signaling a macros namespace load
          :path   - munged relative library path (a string)

      The callback cb, upon resolution, will need to pass the same map:

          :lang       - the language, :clj or :js
          :source     - the source of the library (a string)
          :cache      - optional, if a :clj namespace has been precompiled to
                        :js, can give an analysis cache for faster loads.
          :source-map - optional, if a :clj namespace has been precompiled
                        to :js, can give a V3 source map JSON

      If the resource could not be resolved, the callback should be invoked with
      nil.

  The 2-arity function accepts a sequence of source path strings and
  `read-file-fn!`, an asynchronous 2-arity function with signature
  `[file-path src-cb]` where src-cb is itself a function `(fn [source]
  ...)` that needs to be called with the file content as string (`nil`
  if no file is found).

  The 3-arity function receives additionally a third parameter `write-file-fn!`,
  a synchronous 2-arity function with signature `[file-path data]` that accepts
  a file-path and data to write."
  ([load-fn!]
   {:target :default
    :load-fn! load-fn!})
  ([src-paths read-file-fn!]
   (browser-options src-paths read-file-fn! nil))
  ([src-paths read-file-fn! write-file-fn!]
   {:target :default
    :read-file-fn! read-file-fn!
    :src-paths src-paths
    :write-file-fn! write-file-fn!}))

(defn ^:export nodejs-options
  "Creates the Node.js option map for read-eval-call.

  The 1-arity function requires a `load-fn!` compatible with
  ClojureScript `cljs.js/*load-fn*`. Use it if you know what you are
  doing and follow this protocol:

      Each runtime environment provides a different way to load a library.
      Whatever function `*load-fn*` is bound to will be passed two arguments
      - a map and a callback function: The map will have the following keys:

          :name   - the name of the library (a symbol)
          :macros - modifier signaling a macros namespace load
          :path   - munged relative library path (a string)

      The callback cb, upon resolution, will need to pass the same map:

          :lang       - the language, :clj or :js
          :source     - the source of the library (a string)
          :cache      - optional, if a :clj namespace has been precompiled to
                        :js, can give an analysis cache for faster loads.
          :source-map - optional, if a :clj namespace has been precompiled
                        to :js, can give a V3 source map JSON

      If the resource could not be resolved, the callback should be invoked with
      nil.

  The 2-arity function accepts a sequence of source path strings and
  `read-file-fn!`, an asynchronous 2-arity function with signature
  `[file-path src-cb]` where src-cb is itself a function `(fn [source]
  ...)` that needs to be called with the file content as string (`nil`
  if no file is found).

  The 3-arity function receives additionally a third parameter `write-file-fn!`,
  a synchronous 2-arity function with signature `[file-path data]` that accepts
  a file-path and data to write."
  ([load-fn!]
   {:target :nodejs
    :load-fn! load-fn!})
  ([src-paths read-file-fn!]
   (nodejs-options src-paths read-file-fn! nil))
  ([src-paths read-file-fn! write-file-fn!]
   {:target :nodejs
    :read-file-fn! read-file-fn!
    :src-paths src-paths
    :write-file-fn! write-file-fn!}))
