(ns replumb.browser)

(defn init-fn!
  []
  (set! (.. js/window -cljs -user) #js {})
  ;; AR - mimicking clojurescript/src/main/cljs/clojure/browser/repl.cljs
  (set! (.-require__ js/goog) js/goog.require)
  ;; repl.cljs - suppress useless Google Closure error about duplicate provides
  (set! (.-isProvided_ js/goog) (fn [name] false))
  ;; repl.cljs - provide cljs.user
  (goog/constructNamespace_ "cljs.user"))

(def default-opts
  "Browser default set of options for read-eval-call."
  {:target :default
   :init-fns [init-fn!]})
