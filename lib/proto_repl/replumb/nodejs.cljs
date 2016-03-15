(ns replumb.nodejs)

(defn init-fn!
  []
  (set! (.. js/global -cljs -user) #js {})
  ;; AR - mimicking clojurescript/src/main/clojure/cljs/repl/node.clj
  ;; This solves https://github.com/ScalaConsultants/replumb/issues/56
  ;; node.clj - monkey-patch goog.require, skip all the loaded checks
  (js* "goog.isProvided_ = function(x) { return false; };")
  ;; node.clj - load cljs.core, setup printing
  (set! (.-require js/goog)
        (fn [name]
          (js/CLOSURE_IMPORT_SCRIPT
           (aget (.. js/goog -dependencies_ -nameToPath) name))))
  ;; node.clj - load cljs.core, setup printing
  (do
    (set! *loaded-libs* #{"cljs.core"})
    (set! (.-require js/goog)
          (fn [name reload]
            (when (or (not (contains? *loaded-libs* name)) reload)
              (set! *loaded-libs* (conj (or *loaded-libs* #{}) name))
              (js/CLOSURE_IMPORT_SCRIPT
               (aget (.. js/goog -dependencies_ -nameToPath) name)))))))

(def default-opts
  "Node.js default set of options for read-eval-call.
  It is intentionally missing :load-fn! that will need to be added
  before calling read-eval-call. See nodejs-opts."
  {:target :nodejs
   :init-fns [init-fn!]})
