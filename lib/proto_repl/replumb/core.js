// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('replumb.core');
goog.require('cljs.core');
goog.require('cljs.js');
goog.require('replumb.repl');
goog.require('replumb.common');
/**
 * Reads, evaluates and calls back with the evaluation result.
 * 
 *   The first parameter is a map of configuration options, currently
 *   supporting:
 * 
 *   * `:verbose` will enable the the evaluation logging, defaults to false.
 *   To customize how to print, use `(set! *print-fn* (fn [& args] ...)`
 * 
 *   * `:warning-as-error` will consider a compiler warning as error
 *   * `:target` `:nodejs` and `:browser` supported, the latter is used if
 *   missing
 *   * `:init-fn!` user provided initialization function, it will be passed a
 *   map:
 * 
 *        :form   ;; the form to evaluate, as data
 *        :ns     ;; the current namespace, as symbol
 *        :target ;; the current target
 * 
 *   * `:load-fn!` will override replumb's default `cljs.js/*load-fn*`.
 *   It rules out `:read-file-fn!`, losing any perk of using `replumb.load`
 *   helpers. Use it if you know what you are doing and follow this
 *   protocol:
 * 
 *    ```
 *    Each runtime environment provides a different way to load a library.
 *    Whatever function `*load-fn*` is bound to will be passed two arguments
 *    - a map and a callback function: The map will have the following keys:
 * 
 *        :name   - the name of the library (a symbol)
 *        :macros - modifier signaling a macros namespace load
 *        :path   - munged relative library path (a string)
 * 
 *    The callback cb, upon resolution, will need to pass the same map:
 * 
 *        :lang       - the language, :clj or :js
 *        :source     - the source of the library (a string)
 *        :cache      - optional, if a :clj namespace has been precompiled to
 *                      :js, can give an analysis cache for faster loads.
 *        :source-map - optional, if a :clj namespace has been precompiled
 *                      to :js, can give a V3 source map JSON
 * 
 *    If the resource could not be resolved, the callback should be invoked with
 *    nil.
 *    ```
 * 
 *   * `:read-file-fn!` an asynchronous 2-arity function with signature
 *   `[file-path src-cb]` where src-cb is itself a function `(fn [source]
 *   ...)` that needs to be called with the file content as string (`nil`
 *   if no file is found). It is mutually exclusive with `:load-fn!` and
 *   will be ignored in case both are present
 * 
 *   * `:write-file-fn!` a synchronous 2-arity function with signature
 *   `[file-path data]` that accepts a file-path and data to write.
 * 
 *   * `:src-paths` - a vector of paths containing source files
 * 
 *   * `:cache` - a map containing two optional values: the first, `:path`,
 *   indicates the path of the cached files. The second, `:src-paths-lookup?`,
 *   indicates whether search the cached files in `:src-paths`. If both present,
 *   `:path` will have the priority but both will be inspected.
 * 
 *   * `:no-pr-str-on-value`  in case of `:success?` avoid converting the
 *   result map `:value` to string
 * 
 *   * `:context` - indicates the evaluation context that will be passed to
 *   `cljs/eval-str`. Defaults to `:expr`.
 * 
 *   * `:foreign-libs` - a way to include foreign libraries. The format is analogous
 *   to the compiler option. For more info visit https://github.com/clojure/clojurescript/wiki/Compiler-Options#foreign-libs
 * 
 *   The second parameter, `callback`, should be a 1-arity function which receives
 *   the result map, whose result keys will be:
 * 
 *   ```
 *   :success?  a boolean indicating if everything went alright
 *   :value     (if (:success? result)), this key contains the yielded value as
 *           string, unless :no-pr-str-on-value is true, in which case it
 *           returns the bare value.
 *   :error     (if-not (:success? result)) will contain a js/Error
 *   :warning   in case a warning was thrown and :warning-as-error is falsey
 *   :form      the evaluated form as data structure (not string)}
 *   ```
 * 
 *   The third parameter is the source string to be read and evaluated.
 * 
 *   It initializes the repl harness either on first execution or if an
 *   option in `#{:src-paths :init-fn!}` changes from the previous
 *   `read-eval-call`.
 */
replumb.core.read_eval_call = (function replumb$core$read_eval_call(var_args){
var args14106 = [];
var len__7755__auto___14109 = arguments.length;
var i__7756__auto___14110 = (0);
while(true){
if((i__7756__auto___14110 < len__7755__auto___14109)){
args14106.push((arguments[i__7756__auto___14110]));

var G__14111 = (i__7756__auto___14110 + (1));
i__7756__auto___14110 = G__14111;
continue;
} else {
}
break;
}

var G__14108 = args14106.length;
switch (G__14108) {
case 2:
return replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14106.length)].join('')));

}
});
goog.exportSymbol('replumb.core.read_eval_call', replumb.core.read_eval_call);

replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$2 = (function (callback,source){
return replumb.repl.read_eval_call.call(null,cljs.core.PersistentArrayMap.EMPTY,callback,source);
});

replumb.core.read_eval_call.cljs$core$IFn$_invoke$arity$3 = (function (opts,callback,source){
return replumb.repl.read_eval_call.call(null,opts,callback,source);
});

replumb.core.read_eval_call.cljs$lang$maxFixedArity = 3;
/**
 * Retrieves the REPL prompt to display, according to the current
 *   namespace. Returns a string.
 */
replumb.core.get_prompt = (function replumb$core$get_prompt(){
return [cljs.core.str(replumb.repl.current_ns.call(null)),cljs.core.str("=> ")].join('');
});
goog.exportSymbol('replumb.core.get_prompt', replumb.core.get_prompt);
/**
 * Return the message string of the input `js/Error`.
 */
replumb.core.error__GT_str = (function replumb$core$error__GT_str(var_args){
var args14113 = [];
var len__7755__auto___14116 = arguments.length;
var i__7756__auto___14117 = (0);
while(true){
if((i__7756__auto___14117 < len__7755__auto___14116)){
args14113.push((arguments[i__7756__auto___14117]));

var G__14118 = (i__7756__auto___14117 + (1));
i__7756__auto___14117 = G__14118;
continue;
} else {
}
break;
}

var G__14115 = args14113.length;
switch (G__14115) {
case 1:
return replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14113.length)].join('')));

}
});
goog.exportSymbol('replumb.core.error__GT_str', replumb.core.error__GT_str);

replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$1 = (function (error){
return replumb.common.extract_message.call(null,error);
});

replumb.core.error__GT_str.cljs$core$IFn$_invoke$arity$2 = (function (error,print_stack_QMARK_){
return replumb.common.extract_message.call(null,error,print_stack_QMARK_);
});

replumb.core.error__GT_str.cljs$lang$maxFixedArity = 2;
/**
 * Unwraps the result of an evaluation.
 * 
 *   It returns the content of `:value` in case of success and the content
 *   of `:error` (a `js/Error`) in case of failure.
 * 
 *   When `include-warning?` is true, then the value yields from, in order,
 *   `:error`, then `:warning` and then eventually `:value`.
 */
replumb.core.unwrap_result = (function replumb$core$unwrap_result(var_args){
var args14120 = [];
var len__7755__auto___14125 = arguments.length;
var i__7756__auto___14126 = (0);
while(true){
if((i__7756__auto___14126 < len__7755__auto___14125)){
args14120.push((arguments[i__7756__auto___14126]));

var G__14127 = (i__7756__auto___14126 + (1));
i__7756__auto___14126 = G__14127;
continue;
} else {
}
break;
}

var G__14122 = args14120.length;
switch (G__14122) {
case 1:
return replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14120.length)].join('')));

}
});
goog.exportSymbol('replumb.core.unwrap_result', replumb.core.unwrap_result);

replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$1 = (function (result_map){
return replumb.core.unwrap_result.call(null,result_map,false);
});

replumb.core.unwrap_result.cljs$core$IFn$_invoke$arity$2 = (function (result_map,include_warning_QMARK_){
var map__14123 = result_map;
var map__14123__$1 = ((((!((map__14123 == null)))?((((map__14123.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14123.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14123):map__14123);
var error = cljs.core.get.call(null,map__14123__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.call(null,map__14123__$1,new cljs.core.Keyword(null,"value","value",305978217));
var warning = cljs.core.get.call(null,map__14123__$1,new cljs.core.Keyword(null,"warning","warning",-1685650671));
if(cljs.core.truth_(error)){
return error;
} else {
if(cljs.core.truth_((function (){var and__6685__auto__ = include_warning_QMARK_;
if(cljs.core.truth_(and__6685__auto__)){
return warning;
} else {
return and__6685__auto__;
}
})())){
return warning;
} else {
return value;
}
}
});

replumb.core.unwrap_result.cljs$lang$maxFixedArity = 2;
/**
 * Given a `result-map`, tells whether the evaluation was successful.
 */
replumb.core.success_QMARK_ = (function replumb$core$success_QMARK_(result_map){
return new cljs.core.Keyword(null,"success?","success?",-122854052).cljs$core$IFn$_invoke$arity$1(result_map);
});
goog.exportSymbol('replumb.core.success_QMARK_', replumb.core.success_QMARK_);
/**
 * Given a `result-map`, returns the result of the evaluation as string.
 * 
 *   - When `include-warning?` is true, then the string yields from, in
 *   order, `:error`, then `:warning` and then eventually `:value`.
 *   - When `print-stack?` is true, the error string will include the stack
 *   trace.
 */
replumb.core.result__GT_string = (function replumb$core$result__GT_string(var_args){
var args14129 = [];
var len__7755__auto___14134 = arguments.length;
var i__7756__auto___14135 = (0);
while(true){
if((i__7756__auto___14135 < len__7755__auto___14134)){
args14129.push((arguments[i__7756__auto___14135]));

var G__14136 = (i__7756__auto___14135 + (1));
i__7756__auto___14135 = G__14136;
continue;
} else {
}
break;
}

var G__14131 = args14129.length;
switch (G__14131) {
case 1:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14129.length)].join('')));

}
});
goog.exportSymbol('replumb.core.result__GT_string', replumb.core.result__GT_string);

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$1 = (function (result_map){
return replumb.core.result__GT_string.call(null,result_map,false,false);
});

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$2 = (function (result_map,print_stack_QMARK_){
return replumb.core.result__GT_string.call(null,result_map,print_stack_QMARK_,false);
});

replumb.core.result__GT_string.cljs$core$IFn$_invoke$arity$3 = (function (result_map,print_stack_QMARK_,include_warning_QMARK_){
var map__14132 = result_map;
var map__14132__$1 = ((((!((map__14132 == null)))?((((map__14132.cljs$lang$protocol_mask$partition0$ & (64))) || (map__14132.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__14132):map__14132);
var error = cljs.core.get.call(null,map__14132__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.call(null,map__14132__$1,new cljs.core.Keyword(null,"value","value",305978217));
var warning = cljs.core.get.call(null,map__14132__$1,new cljs.core.Keyword(null,"warning","warning",-1685650671));
if(cljs.core.truth_(error)){
return replumb.common.extract_message.call(null,error,false,print_stack_QMARK_);
} else {
if(cljs.core.truth_((function (){var and__6685__auto__ = include_warning_QMARK_;
if(cljs.core.truth_(and__6685__auto__)){
return warning;
} else {
return and__6685__auto__;
}
})())){
return warning;
} else {
return value;
}
}
});

replumb.core.result__GT_string.cljs$lang$maxFixedArity = 3;
/**
 * Creates the browser option map for read-eval-call.
 * 
 *   The 1-arity function requires a `load-fn!` compatible with
 *   ClojureScript `cljs.js/*load-fn*`. Use it if you know what you are
 *   doing and follow this protocol:
 * 
 *    Each runtime environment provides a different way to load a library.
 *    Whatever function `*load-fn*` is bound to will be passed two arguments
 *    - a map and a callback function: The map will have the following keys:
 * 
 *        :name   - the name of the library (a symbol)
 *        :macros - modifier signaling a macros namespace load
 *        :path   - munged relative library path (a string)
 * 
 *    The callback cb, upon resolution, will need to pass the same map:
 * 
 *        :lang       - the language, :clj or :js
 *        :source     - the source of the library (a string)
 *        :cache      - optional, if a :clj namespace has been precompiled to
 *                      :js, can give an analysis cache for faster loads.
 *        :source-map - optional, if a :clj namespace has been precompiled
 *                      to :js, can give a V3 source map JSON
 * 
 *    If the resource could not be resolved, the callback should be invoked with
 *    nil.
 * 
 *   The 2-arity function accepts a sequence of source path strings and
 *   `read-file-fn!`, an asynchronous 2-arity function with signature
 *   `[file-path src-cb]` where src-cb is itself a function `(fn [source]
 *   ...)` that needs to be called with the file content as string (`nil`
 *   if no file is found).
 * 
 *   The 3-arity function receives additionally a third parameter `write-file-fn!`,
 *   a synchronous 2-arity function with signature `[file-path data]` that accepts
 *   a file-path and data to write.
 */
replumb.core.browser_options = (function replumb$core$browser_options(var_args){
var args14138 = [];
var len__7755__auto___14141 = arguments.length;
var i__7756__auto___14142 = (0);
while(true){
if((i__7756__auto___14142 < len__7755__auto___14141)){
args14138.push((arguments[i__7756__auto___14142]));

var G__14143 = (i__7756__auto___14142 + (1));
i__7756__auto___14142 = G__14143;
continue;
} else {
}
break;
}

var G__14140 = args14138.length;
switch (G__14140) {
case 1:
return replumb.core.browser_options.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.browser_options.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.browser_options.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14138.length)].join('')));

}
});
goog.exportSymbol('replumb.core.browser_options', replumb.core.browser_options);

replumb.core.browser_options.cljs$core$IFn$_invoke$arity$1 = (function (load_fn_BANG_){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword(null,"load-fn!","load-fn!",-896695751),load_fn_BANG_], null);
});

replumb.core.browser_options.cljs$core$IFn$_invoke$arity$2 = (function (src_paths,read_file_fn_BANG_){
return replumb.core.browser_options.call(null,src_paths,read_file_fn_BANG_,null);
});

replumb.core.browser_options.cljs$core$IFn$_invoke$arity$3 = (function (src_paths,read_file_fn_BANG_,write_file_fn_BANG_){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"default","default",-1987822328),new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191),read_file_fn_BANG_,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603),src_paths,new cljs.core.Keyword(null,"write-file-fn!","write-file-fn!",-535483541),write_file_fn_BANG_], null);
});

replumb.core.browser_options.cljs$lang$maxFixedArity = 3;
/**
 * Creates the Node.js option map for read-eval-call.
 * 
 *   The 1-arity function requires a `load-fn!` compatible with
 *   ClojureScript `cljs.js/*load-fn*`. Use it if you know what you are
 *   doing and follow this protocol:
 * 
 *    Each runtime environment provides a different way to load a library.
 *    Whatever function `*load-fn*` is bound to will be passed two arguments
 *    - a map and a callback function: The map will have the following keys:
 * 
 *        :name   - the name of the library (a symbol)
 *        :macros - modifier signaling a macros namespace load
 *        :path   - munged relative library path (a string)
 * 
 *    The callback cb, upon resolution, will need to pass the same map:
 * 
 *        :lang       - the language, :clj or :js
 *        :source     - the source of the library (a string)
 *        :cache      - optional, if a :clj namespace has been precompiled to
 *                      :js, can give an analysis cache for faster loads.
 *        :source-map - optional, if a :clj namespace has been precompiled
 *                      to :js, can give a V3 source map JSON
 * 
 *    If the resource could not be resolved, the callback should be invoked with
 *    nil.
 * 
 *   The 2-arity function accepts a sequence of source path strings and
 *   `read-file-fn!`, an asynchronous 2-arity function with signature
 *   `[file-path src-cb]` where src-cb is itself a function `(fn [source]
 *   ...)` that needs to be called with the file content as string (`nil`
 *   if no file is found).
 * 
 *   The 3-arity function receives additionally a third parameter `write-file-fn!`,
 *   a synchronous 2-arity function with signature `[file-path data]` that accepts
 *   a file-path and data to write.
 */
replumb.core.nodejs_options = (function replumb$core$nodejs_options(var_args){
var args14145 = [];
var len__7755__auto___14148 = arguments.length;
var i__7756__auto___14149 = (0);
while(true){
if((i__7756__auto___14149 < len__7755__auto___14148)){
args14145.push((arguments[i__7756__auto___14149]));

var G__14150 = (i__7756__auto___14149 + (1));
i__7756__auto___14149 = G__14150;
continue;
} else {
}
break;
}

var G__14147 = args14145.length;
switch (G__14147) {
case 1:
return replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args14145.length)].join('')));

}
});
goog.exportSymbol('replumb.core.nodejs_options', replumb.core.nodejs_options);

replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$1 = (function (load_fn_BANG_){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"nodejs","nodejs",321212524),new cljs.core.Keyword(null,"load-fn!","load-fn!",-896695751),load_fn_BANG_], null);
});

replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$2 = (function (src_paths,read_file_fn_BANG_){
return replumb.core.nodejs_options.call(null,src_paths,read_file_fn_BANG_,null);
});

replumb.core.nodejs_options.cljs$core$IFn$_invoke$arity$3 = (function (src_paths,read_file_fn_BANG_,write_file_fn_BANG_){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"nodejs","nodejs",321212524),new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191),read_file_fn_BANG_,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603),src_paths,new cljs.core.Keyword(null,"write-file-fn!","write-file-fn!",-535483541),write_file_fn_BANG_], null);
});

replumb.core.nodejs_options.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=core.js.map