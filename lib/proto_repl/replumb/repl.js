// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('replumb.repl');
goog.require('cljs.core');
goog.require('cljs.tools.reader.impl.commons');
goog.require('cljs.js');
goog.require('replumb.load');
goog.require('cljs.tools.reader');
goog.require('cljs.tagged_literals');
goog.require('cljs.tools.reader.reader_types');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('replumb.cache');
goog.require('replumb.browser');
goog.require('replumb.doc_maps');
goog.require('cljs.pprint');
goog.require('replumb.ast');
goog.require('replumb.nodejs');
goog.require('clojure.string');
goog.require('replumb.common');
goog.require('cljs.repl');
if(typeof replumb.repl.st !== 'undefined'){
} else {
replumb.repl.st = cljs.js.empty_state.call(null);
}
if(typeof replumb.repl.app_env !== 'undefined'){
} else {
replumb.repl.app_env = cljs.core.atom.call(null,new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"current-ns","current-ns",1661653428),new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null),new cljs.core.Keyword(null,"last-eval-warning","last-eval-warning",-478360530),null,new cljs.core.Keyword(null,"initializing?","initializing?",111659212),false,new cljs.core.Keyword(null,"needs-init?","needs-init?",1016438963),true,new cljs.core.Keyword(null,"previous-init-opts","previous-init-opts",974753543),cljs.core.PersistentArrayMap.EMPTY], null));
}
/**
 * The ex-info data for this file
 */
replumb.repl.ex_info_data = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Keyword("replumb.repl","error","replumb.repl/error",-144284746)], null);
/**
 * Return the current namespace, as a symbol.
 */
replumb.repl.current_ns = (function replumb$repl$current_ns(){
return new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env));
});
/**
 * Given a Google Closure provide / Clojure require (e.g. goog.string),
 *   returns the path to the actual file (without extension).
 */
replumb.repl.get_goog_path = (function replumb$repl$get_goog_path(provide){
return cljs.core.get_in.call(null,cljs.core.deref.call(null,replumb.repl.app_env),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"goog-provide->path","goog-provide->path",-1147669071),provide], null));
});
replumb.repl.empty_analyzer_env = (function replumb$repl$empty_analyzer_env(){
return cljs.core.assoc.call(null,cljs.analyzer.empty_env.call(null),new cljs.core.Keyword(null,"ns","ns",441598760),replumb.ast.namespace.call(null,cljs.core.deref.call(null,replumb.repl.st),new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env))),new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291));
});
replumb.repl.map_keys = (function replumb$repl$map_keys(f,m){
return cljs.core.reduce_kv.call(null,(function (r,k,v){
return cljs.core.assoc.call(null,r,f.call(null,k),v);
}),cljs.core.PersistentArrayMap.EMPTY,m);
});
/**
 * Reading forms from a reader (see clojure.tools.reader.reader-types
 *   for reader implementations). This function throws if a valid form
 *   cannot be found.
 */
replumb.repl.read = (function replumb$repl$read(opts,rdr){
var _STAR_cljs_ns_STAR_13395 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_compiler_STAR_13396 = cljs.env._STAR_compiler_STAR_;
var _STAR_data_readers_STAR_13397 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol13398 = cljs.tools.reader.resolve_symbol;
cljs.analyzer._STAR_cljs_ns_STAR_ = new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env));

cljs.env._STAR_compiler_STAR_ = replumb.repl.st;

cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

cljs.tools.reader.resolve_symbol = cljs.analyzer.resolve_symbol;

try{return cljs.tools.reader.read.call(null,opts,rdr);
}finally {cljs.tools.reader.resolve_symbol = resolve_symbol13398;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_13397;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_13396;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_13395;
}});
/**
 * Reading forms from a string. This function throws if a valid one
 *   cannot be found.
 */
replumb.repl.read_string = (function replumb$repl$read_string(opts,s){
var _STAR_cljs_ns_STAR_13403 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_compiler_STAR_13404 = cljs.env._STAR_compiler_STAR_;
var _STAR_data_readers_STAR_13405 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol13406 = cljs.tools.reader.resolve_symbol;
cljs.analyzer._STAR_cljs_ns_STAR_ = new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env));

cljs.env._STAR_compiler_STAR_ = replumb.repl.st;

cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

cljs.tools.reader.resolve_symbol = cljs.analyzer.resolve_symbol;

try{return cljs.tools.reader.read_string.call(null,opts,s);
}finally {cljs.tools.reader.resolve_symbol = resolve_symbol13406;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_13405;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_13404;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_13403;
}});
replumb.repl.ns_form_QMARK_ = (function replumb$repl$ns_form_QMARK_(form){
return (cljs.core.seq_QMARK_.call(null,form)) && (cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"ns","ns",2082130287,null),cljs.core.first.call(null,form)));
});
/**
 * Is the input analyzer var (from either cljs.analyzer/resolve-var or
 *   cljs.analyzer/resolve-macro-var) a macro?
 */
replumb.repl.macro_QMARK_ = (function replumb$repl$macro_QMARK_(var$){
return new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(var$);
});
/**
 * From cljs.analyzer.api.clj. Given an analysis environment resolve a
 *   var. Analogous to clojure.core/resolve
 */
replumb.repl.resolve = (function replumb$repl$resolve(opts,env,sym){
if(cljs.core.map_QMARK_.call(null,env)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"map?","map?",-1780568534,null),new cljs.core.Symbol(null,"env","env",-175281708,null))))].join('')));
}

if((sym instanceof cljs.core.Symbol)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"symbol?","symbol?",1820680511,null),new cljs.core.Symbol(null,"sym","sym",195671222,null))))].join('')));
}

var macro_var = cljs.analyzer.resolve_macro_var.call(null,env,sym);
var var$ = cljs.analyzer.resolve_var.call(null,env,sym,cljs.analyzer.confirm_var_exist_warning);
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.call(null,"cljs.analyzer/resolve-macro-var returned",(function (){var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13411_13415 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13412_13416 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13411_13415,_STAR_print_fn_STAR_13412_13416,sb__7671__auto__,macro_var,var$){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_13411_13415,_STAR_print_fn_STAR_13412_13416,sb__7671__auto__,macro_var,var$))
;

try{cljs.pprint.pprint.call(null,macro_var);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13412_13416;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13411_13415;
}
return [cljs.core.str(sb__7671__auto__)].join('');
})());

replumb.common.debug_prn.call(null,"cljs.analyzer/resolve-var returned",(function (){var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13413_13417 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13414_13418 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13413_13417,_STAR_print_fn_STAR_13414_13418,sb__7671__auto__,macro_var,var$){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_13413_13417,_STAR_print_fn_STAR_13414_13418,sb__7671__auto__,macro_var,var$))
;

try{cljs.pprint.pprint.call(null,var$);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13414_13418;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13413_13417;
}
return [cljs.core.str(sb__7671__auto__)].join('');
})());
} else {
}

return cljs.core.merge.call(null,macro_var,var$);
});
replumb.repl.get_var = (function replumb$repl$get_var(opts,env,sym){
var var$ = (function (){var env__8404__auto__ = replumb.repl.st;
var env__8404__auto____$1 = ((cljs.core.map_QMARK_.call(null,env__8404__auto__))?cljs.core.atom.call(null,env__8404__auto__):((((env__8404__auto__ instanceof cljs.core.Atom)) && (cljs.core.map_QMARK_.call(null,cljs.core.deref.call(null,env__8404__auto__))))?env__8404__auto__:(function(){throw (new Error([cljs.core.str("Compiler environment must be a map or atom containing a map, not "),cljs.core.str(cljs.core.type.call(null,env__8404__auto__))].join('')))})()
));
var _STAR_compiler_STAR_13421 = cljs.env._STAR_compiler_STAR_;
cljs.env._STAR_compiler_STAR_ = env__8404__auto____$1;

try{return replumb.repl.resolve.call(null,opts,env,sym);
}finally {cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_13421;
}})();
if(cljs.core._EQ_.call(null,cljs.core.namespace.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(var$)),[cljs.core.str(new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(var$))].join(''))){
return cljs.core.update.call(null,var$,new cljs.core.Keyword(null,"name","name",1843675177),((function (var$){
return (function (p1__13419_SHARP_){
return cljs.core.symbol.call(null,cljs.core.name.call(null,p1__13419_SHARP_));
});})(var$))
);
} else {
return var$;
}
});
replumb.repl.replumb_repl_special_set = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 11, [new cljs.core.Symbol(null,"doc","doc",-741138878,null),null,new cljs.core.Symbol(null,"import","import",241030818,null),null,new cljs.core.Symbol(null,"find-doc","find-doc",-1096800949,null),null,new cljs.core.Symbol(null,"dir","dir",-919681108,null),null,new cljs.core.Symbol(null,"pst","pst",-1996688947,null),null,new cljs.core.Symbol(null,"in-ns","in-ns",-2089468466,null),null,new cljs.core.Symbol(null,"require","require",1172530194,null),null,new cljs.core.Symbol(null,"source","source",1206599988,null),null,new cljs.core.Symbol(null,"load-file","load-file",1215944857,null),null,new cljs.core.Symbol(null,"require-macros","require-macros",-1946488353,null),null,new cljs.core.Symbol(null,"apropos","apropos",-1511857537,null),null], null), null);
replumb.repl.repl_special_QMARK_ = (function replumb$repl$repl_special_QMARK_(form){
var and__6685__auto__ = cljs.core.seq_QMARK_.call(null,form);
if(and__6685__auto__){
return replumb.repl.replumb_repl_special_set.call(null,cljs.core.first.call(null,form));
} else {
return and__6685__auto__;
}
});
/**
 * Makes an eval function that will be used to eval JavaScript code. It returns
 *   a cljs.js-compatible *eval-fn*. Expects a map of user options, specifically:
 * 
 *   * :cache - a map containing an optional :path key which indicates the path
 *   in which write the cached files. If not empty, the function will first write
 *   the cached files and then eval the source, otherwise only the latter
 *   * write-file-fn! - a synchronous 2-arity function which expects the path and
 *   data to write.
 */
replumb.repl.make_js_eval_fn = (function replumb$repl$make_js_eval_fn(opts){
return (function (p__13427){
var map__13428 = p__13427;
var map__13428__$1 = ((((!((map__13428 == null)))?((((map__13428.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13428.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13428):map__13428);
var path = cljs.core.get.call(null,map__13428__$1,new cljs.core.Keyword(null,"path","path",-188191168));
var name = cljs.core.get.call(null,map__13428__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var source = cljs.core.get.call(null,map__13428__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var cache = cljs.core.get.call(null,map__13428__$1,new cljs.core.Keyword(null,"cache","cache",-1237023054));
var verbose = new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts);
var write_file_fn_BANG_ = new cljs.core.Keyword(null,"write-file-fn!","write-file-fn!",-535483541).cljs$core$IFn$_invoke$arity$1(opts);
var cache_path = cljs.core.get_in.call(null,opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"cache","cache",-1237023054),new cljs.core.Keyword(null,"path","path",-188191168)], null));
if(cljs.core.truth_((function (){var and__6685__auto__ = path;
if(cljs.core.truth_(and__6685__auto__)){
var and__6685__auto____$1 = source;
if(cljs.core.truth_(and__6685__auto____$1)){
var and__6685__auto____$2 = cache;
if(cljs.core.truth_(and__6685__auto____$2)){
return cache_path;
} else {
return and__6685__auto____$2;
}
} else {
return and__6685__auto____$1;
}
} else {
return and__6685__auto__;
}
})())){
if(cljs.core.truth_(write_file_fn_BANG_)){
var cache_prefix_for_path_13431 = replumb.cache.cache_prefix_for_path.call(null,cache_path,path,replumb.cache.is_macros_QMARK_.call(null,cache));
var vec__13430_13432 = cljs.core.map.call(null,((function (cache_prefix_for_path_13431,verbose,write_file_fn_BANG_,cache_path,map__13428,map__13428__$1,path,name,source,cache){
return (function (p1__13422_SHARP_){
return [cljs.core.str(cache_prefix_for_path_13431),cljs.core.str(p1__13422_SHARP_)].join('');
});})(cache_prefix_for_path_13431,verbose,write_file_fn_BANG_,cache_path,map__13428,map__13428__$1,path,name,source,cache))
,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [".js",".cache.json"], null));
var js_path_13433 = cljs.core.nth.call(null,vec__13430_13432,(0),null);
var json_path_13434 = cljs.core.nth.call(null,vec__13430_13432,(1),null);
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.call(null,"Attempting to write",js_path_13433,"...");
} else {
}

write_file_fn_BANG_.call(null,js_path_13433,[cljs.core.str(replumb.cache.compiled_by_string.call(null)),cljs.core.str("\n"),cljs.core.str(source)].join(''));

if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.call(null,"Attempting to write",json_path_13434,"...");
} else {
}

write_file_fn_BANG_.call(null,json_path_13434,replumb.cache.cljs__GT_transit_json.call(null,cache));
} else {
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.call(null,"Invalid :write-file-fn!. No cache will be written.");
} else {
}
}
} else {
}

return eval(source);
});
});
/**
 * Gets the base set of evaluation options. The 1-arity function
 *   specifies opts that override default. No check here if opts are
 *   valid.
 */
replumb.repl.base_eval_opts_BANG_ = (function replumb$repl$base_eval_opts_BANG_(var_args){
var args13435 = [];
var len__7755__auto___13438 = arguments.length;
var i__7756__auto___13439 = (0);
while(true){
if((i__7756__auto___13439 < len__7755__auto___13438)){
args13435.push((arguments[i__7756__auto___13439]));

var G__13440 = (i__7756__auto___13439 + (1));
i__7756__auto___13439 = G__13440;
continue;
} else {
}
break;
}

var G__13437 = args13435.length;
switch (G__13437) {
case 0:
return replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13435.length)].join('')));

}
});

replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$0 = (function (){
return replumb.repl.base_eval_opts_BANG_.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

replumb.repl.base_eval_opts_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (opts){
return new cljs.core.PersistentArrayMap(null, 8, [new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env)),new cljs.core.Keyword(null,"context","context",-830191113),(function (){var or__6697__auto__ = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return new cljs.core.Keyword(null,"expr","expr",745722291);
}
})(),new cljs.core.Keyword(null,"source-map","source-map",1706252311),false,new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320),true,new cljs.core.Keyword(null,"load","load",-1318641184),new cljs.core.Keyword(null,"load-fn!","load-fn!",-896695751).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"eval","eval",-1103567905),replumb.repl.make_js_eval_fn.call(null,opts),new cljs.core.Keyword(null,"verbose","verbose",1694226060),(function (){var or__6697__auto__ = new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return false;
}
})(),new cljs.core.Keyword(null,"static-fns","static-fns",-501950748),false], null);
});

replumb.repl.base_eval_opts_BANG_.cljs$lang$maxFixedArity = 1;
replumb.repl.load_eval_opts_BANG_ = (function replumb$repl$load_eval_opts_BANG_(opts,file_name){
return cljs.core.assoc.call(null,cljs.core.dissoc.call(null,replumb.repl.base_eval_opts_BANG_.call(null,opts),new cljs.core.Keyword(null,"context","context",-830191113)),new cljs.core.Keyword(null,"file-name","file-name",-1654217259),file_name);
});
replumb.repl.self_require_QMARK_ = (function replumb$repl$self_require_QMARK_(specs){
return cljs.core.some.call(null,(function (quoted_spec_or_kw){
var and__6685__auto__ = !((quoted_spec_or_kw instanceof cljs.core.Keyword));
if(and__6685__auto__){
var spec = cljs.core.second.call(null,quoted_spec_or_kw);
var ns = ((cljs.core.sequential_QMARK_.call(null,spec))?cljs.core.first.call(null,spec):spec);
return cljs.core._EQ_.call(null,ns,cljs.core.deref.call(null,replumb.repl.current_ns));
} else {
return and__6685__auto__;
}
}),specs);
});
replumb.repl.canonicalize_specs = (function replumb$repl$canonicalize_specs(specs){
var canonicalize = (function replumb$repl$canonicalize_specs_$_canonicalize(quoted_spec_or_kw){
if((quoted_spec_or_kw instanceof cljs.core.Keyword)){
return quoted_spec_or_kw;
} else {
var spec = cljs.core.second.call(null,quoted_spec_or_kw);
if(cljs.core.vector_QMARK_.call(null,spec)){
return spec;
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec], null);
}
}
});
return cljs.core.map.call(null,canonicalize,specs);
});
replumb.repl.purge_ns_BANG_ = (function replumb$repl$purge_ns_BANG_(st,ns){
cljs.core.swap_BANG_.call(null,st,replumb.ast.dissoc_ns,ns);

return cljs.core.swap_BANG_.call(null,cljs.js._STAR_loaded_STAR_,cljs.core.disj,ns);
});
replumb.repl.process_reloads_BANG_ = (function replumb$repl$process_reloads_BANG_(specs){
var temp__4655__auto__ = cljs.core.some.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"reload","reload",863702807),null,new cljs.core.Keyword(null,"reload-all","reload-all",761570200),null], null), null),specs);
if(cljs.core.truth_(temp__4655__auto__)){
var k = temp__4655__auto__;
var specs__$1 = cljs.core.remove.call(null,cljs.core.PersistentHashSet.fromArray([k], true),specs);
if(cljs.core._EQ_.call(null,k,new cljs.core.Keyword(null,"reload-all","reload-all",761570200))){
var seq__13450_13458 = cljs.core.seq.call(null,cljs.core.deref.call(null,cljs.js._STAR_loaded_STAR_));
var chunk__13451_13459 = null;
var count__13452_13460 = (0);
var i__13453_13461 = (0);
while(true){
if((i__13453_13461 < count__13452_13460)){
var ns_13462 = cljs.core._nth.call(null,chunk__13451_13459,i__13453_13461);
replumb.repl.purge_ns_BANG_.call(null,replumb.repl.st,ns_13462);

var G__13463 = seq__13450_13458;
var G__13464 = chunk__13451_13459;
var G__13465 = count__13452_13460;
var G__13466 = (i__13453_13461 + (1));
seq__13450_13458 = G__13463;
chunk__13451_13459 = G__13464;
count__13452_13460 = G__13465;
i__13453_13461 = G__13466;
continue;
} else {
var temp__4657__auto___13467 = cljs.core.seq.call(null,seq__13450_13458);
if(temp__4657__auto___13467){
var seq__13450_13468__$1 = temp__4657__auto___13467;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13450_13468__$1)){
var c__7500__auto___13469 = cljs.core.chunk_first.call(null,seq__13450_13468__$1);
var G__13470 = cljs.core.chunk_rest.call(null,seq__13450_13468__$1);
var G__13471 = c__7500__auto___13469;
var G__13472 = cljs.core.count.call(null,c__7500__auto___13469);
var G__13473 = (0);
seq__13450_13458 = G__13470;
chunk__13451_13459 = G__13471;
count__13452_13460 = G__13472;
i__13453_13461 = G__13473;
continue;
} else {
var ns_13474 = cljs.core.first.call(null,seq__13450_13468__$1);
replumb.repl.purge_ns_BANG_.call(null,replumb.repl.st,ns_13474);

var G__13475 = cljs.core.next.call(null,seq__13450_13468__$1);
var G__13476 = null;
var G__13477 = (0);
var G__13478 = (0);
seq__13450_13458 = G__13475;
chunk__13451_13459 = G__13476;
count__13452_13460 = G__13477;
i__13453_13461 = G__13478;
continue;
}
} else {
}
}
break;
}
} else {
var seq__13454_13479 = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.core.first,specs__$1));
var chunk__13455_13480 = null;
var count__13456_13481 = (0);
var i__13457_13482 = (0);
while(true){
if((i__13457_13482 < count__13456_13481)){
var ns_13483 = cljs.core._nth.call(null,chunk__13455_13480,i__13457_13482);
replumb.repl.purge_ns_BANG_.call(null,replumb.repl.st,ns_13483);

var G__13484 = seq__13454_13479;
var G__13485 = chunk__13455_13480;
var G__13486 = count__13456_13481;
var G__13487 = (i__13457_13482 + (1));
seq__13454_13479 = G__13484;
chunk__13455_13480 = G__13485;
count__13456_13481 = G__13486;
i__13457_13482 = G__13487;
continue;
} else {
var temp__4657__auto___13488 = cljs.core.seq.call(null,seq__13454_13479);
if(temp__4657__auto___13488){
var seq__13454_13489__$1 = temp__4657__auto___13488;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13454_13489__$1)){
var c__7500__auto___13490 = cljs.core.chunk_first.call(null,seq__13454_13489__$1);
var G__13491 = cljs.core.chunk_rest.call(null,seq__13454_13489__$1);
var G__13492 = c__7500__auto___13490;
var G__13493 = cljs.core.count.call(null,c__7500__auto___13490);
var G__13494 = (0);
seq__13454_13479 = G__13491;
chunk__13455_13480 = G__13492;
count__13456_13481 = G__13493;
i__13457_13482 = G__13494;
continue;
} else {
var ns_13495 = cljs.core.first.call(null,seq__13454_13489__$1);
replumb.repl.purge_ns_BANG_.call(null,replumb.repl.st,ns_13495);

var G__13496 = cljs.core.next.call(null,seq__13454_13489__$1);
var G__13497 = null;
var G__13498 = (0);
var G__13499 = (0);
seq__13454_13479 = G__13496;
chunk__13455_13480 = G__13497;
count__13456_13481 = G__13498;
i__13457_13482 = G__13499;
continue;
}
} else {
}
}
break;
}
}

return specs__$1;
} else {
return specs;
}
});
replumb.repl.make_ns_form = (function replumb$repl$make_ns_form(kind,specs,target_ns){
if(cljs.core._EQ_.call(null,kind,new cljs.core.Keyword(null,"import","import",-1399500709))){
return cljs.core.with_meta.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ns","ns",2082130287,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,target_ns),cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,kind),cljs.core.map.call(null,(function (quoted_spec_or_kw){
if((quoted_spec_or_kw instanceof cljs.core.Keyword)){
return quoted_spec_or_kw;
} else {
return cljs.core.second.call(null,quoted_spec_or_kw);
}
}),specs)))))))),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"merge","merge",-1804319409),true,new cljs.core.Keyword(null,"line","line",212345235),(1),new cljs.core.Keyword(null,"column","column",2078222095),(1)], null));
} else {
return cljs.core.with_meta.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ns","ns",2082130287,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,target_ns),cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,kind),replumb.repl.process_reloads_BANG_.call(null,replumb.repl.canonicalize_specs.call(null,specs))))))))),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"merge","merge",-1804319409),true,new cljs.core.Keyword(null,"line","line",212345235),(1),new cljs.core.Keyword(null,"column","column",2078222095),(1)], null));
}
});
/**
 * Given the content of goog/deps.js file, create a map
 *   provide->path (without extension) of Google dependencies.
 * 
 *   Adapted from planck:
 *   https://github.com/mfikes/planck/blob/master/planck-cljs/src/planck/repl.cljs#L438-L451
 */
replumb.repl.goog_deps_map = (function replumb$repl$goog_deps_map(deps_js_content){
var paths_to_provides = cljs.core.map.call(null,(function (p__13510){
var vec__13511 = p__13510;
var _ = cljs.core.nth.call(null,vec__13511,(0),null);
var path = cljs.core.nth.call(null,vec__13511,(1),null);
var provides = cljs.core.nth.call(null,vec__13511,(2),null);
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [path,cljs.core.map.call(null,cljs.core.second,cljs.core.re_seq.call(null,/'(.*?)'/,provides))], null);
}),cljs.core.re_seq.call(null,/\ngoog\.addDependency\('(.*)', \[(.*?)\].*/,deps_js_content));
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7469__auto__ = ((function (paths_to_provides){
return (function replumb$repl$goog_deps_map_$_iter__13512(s__13513){
return (new cljs.core.LazySeq(null,((function (paths_to_provides){
return (function (){
var s__13513__$1 = s__13513;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__13513__$1);
if(temp__4657__auto__){
var xs__5205__auto__ = temp__4657__auto__;
var vec__13519 = cljs.core.first.call(null,xs__5205__auto__);
var path = cljs.core.nth.call(null,vec__13519,(0),null);
var provides = cljs.core.nth.call(null,vec__13519,(1),null);
var iterys__7465__auto__ = ((function (s__13513__$1,vec__13519,path,provides,xs__5205__auto__,temp__4657__auto__,paths_to_provides){
return (function replumb$repl$goog_deps_map_$_iter__13512_$_iter__13514(s__13515){
return (new cljs.core.LazySeq(null,((function (s__13513__$1,vec__13519,path,provides,xs__5205__auto__,temp__4657__auto__,paths_to_provides){
return (function (){
var s__13515__$1 = s__13515;
while(true){
var temp__4657__auto____$1 = cljs.core.seq.call(null,s__13515__$1);
if(temp__4657__auto____$1){
var s__13515__$2 = temp__4657__auto____$1;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13515__$2)){
var c__7467__auto__ = cljs.core.chunk_first.call(null,s__13515__$2);
var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);
var b__13517 = cljs.core.chunk_buffer.call(null,size__7468__auto__);
if((function (){var i__13516 = (0);
while(true){
if((i__13516 < size__7468__auto__)){
var provide = cljs.core._nth.call(null,c__7467__auto__,i__13516);
cljs.core.chunk_append.call(null,b__13517,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.call(null,provide),[cljs.core.str("goog/"),cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,/(.*)\.js$/,path)))].join('')], null));

var G__13520 = (i__13516 + (1));
i__13516 = G__13520;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13517),replumb$repl$goog_deps_map_$_iter__13512_$_iter__13514.call(null,cljs.core.chunk_rest.call(null,s__13515__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13517),null);
}
} else {
var provide = cljs.core.first.call(null,s__13515__$2);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.symbol.call(null,provide),[cljs.core.str("goog/"),cljs.core.str(cljs.core.second.call(null,cljs.core.re_find.call(null,/(.*)\.js$/,path)))].join('')], null),replumb$repl$goog_deps_map_$_iter__13512_$_iter__13514.call(null,cljs.core.rest.call(null,s__13515__$2)));
}
} else {
return null;
}
break;
}
});})(s__13513__$1,vec__13519,path,provides,xs__5205__auto__,temp__4657__auto__,paths_to_provides))
,null,null));
});})(s__13513__$1,vec__13519,path,provides,xs__5205__auto__,temp__4657__auto__,paths_to_provides))
;
var fs__7466__auto__ = cljs.core.seq.call(null,iterys__7465__auto__.call(null,provides));
if(fs__7466__auto__){
return cljs.core.concat.call(null,fs__7466__auto__,replumb$repl$goog_deps_map_$_iter__13512.call(null,cljs.core.rest.call(null,s__13513__$1)));
} else {
var G__13521 = cljs.core.rest.call(null,s__13513__$1);
s__13513__$1 = G__13521;
continue;
}
} else {
return null;
}
break;
}
});})(paths_to_provides))
,null,null));
});})(paths_to_provides))
;
return iter__7469__auto__.call(null,paths_to_provides);
})());
});
/**
 * Retrives the path for a file from (.-dependencies_.nameToPath js/goog). If
 *   not found will returns nil.
 */
replumb.repl.file_path_from_goog_dependencies = (function replumb$repl$file_path_from_goog_dependencies(name){
var temp__4657__auto__ = (goog.dependencies_.nameToPath[[cljs.core.str(name)].join('')]);
if(cljs.core.truth_(temp__4657__auto__)){
var path = temp__4657__auto__;
return cljs.core.apply.call(null,cljs.core.str,cljs.core.drop_last.call(null,(3),cljs.core.drop.call(null,(3),path)));
} else {
return null;
}
});
/**
 * Retrieves the path for a file from the user provided :foreign-libs option.
 *   If not found, returns nil.
 */
replumb.repl.file_path_from_foreign_libs = (function replumb$repl$file_path_from_foreign_libs(name,foreign_libs){
var temp__4657__auto__ = cljs.core.seq.call(null,cljs.core.filter.call(null,(function (p1__13522_SHARP_){
return cljs.core._EQ_.call(null,name,cljs.core.first.call(null,new cljs.core.Keyword(null,"provides","provides",-1634397992).cljs$core$IFn$_invoke$arity$1(p1__13522_SHARP_)));
}),foreign_libs));
if(temp__4657__auto__){
var foreign_libs__$1 = temp__4657__auto__;
return cljs.core.apply.call(null,cljs.core.str,cljs.core.drop_last.call(null,(3),new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(cljs.core.first.call(null,foreign_libs__$1))));
} else {
return null;
}
});
/**
 * Makes a load function that will read from a sequence of src-paths
 *   using a supplied read-file-fn!. It returns a cljs.js-compatible
 *   *load-fn*. Both src-paths and read-file-fn! are values in the options map
 *   passed as parameter.
 * 
 *   Read-file-fn! is an async 2-arity function with signature [file-path
 *   src-cb] where src-cb is itself a function (fn [source] ...) that needs
 *   to be called with the full source of the library (as string).
 * 
 *   If additionally the user map contains the :cache map the loading process
 *   will consider cached files as follow: if :path is present, it will try to load
 *   the cached files from the given path. If :src-paths-lookup? is present, it
 *   will try to load the cached files from src-paths.
 */
replumb.repl.make_load_fn = (function replumb$repl$make_load_fn(p__13523){
var map__13530 = p__13523;
var map__13530__$1 = ((((!((map__13530 == null)))?((((map__13530.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13530.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13530):map__13530);
var verbose = cljs.core.get.call(null,map__13530__$1,new cljs.core.Keyword(null,"verbose","verbose",1694226060));
var src_paths = cljs.core.get.call(null,map__13530__$1,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603));
var read_file_fn_BANG_ = cljs.core.get.call(null,map__13530__$1,new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191));
var cache = cljs.core.get.call(null,map__13530__$1,new cljs.core.Keyword(null,"cache","cache",-1237023054));
var foreign_libs = cljs.core.get.call(null,map__13530__$1,new cljs.core.Keyword(null,"foreign-libs","foreign-libs",805847831));
var as = cljs.core.get.call(null,map__13530__$1,new cljs.core.Keyword(null,"as","as",1148689641));
var user_opts = cljs.core.get.call(null,map__13530__$1,new cljs.core.Keyword(null,"user-opts","user-opts",-949672032));
if(cljs.core.truth_((function (){var and__6685__auto__ = read_file_fn_BANG_;
if(cljs.core.truth_(and__6685__auto__)){
return (cljs.core.sequential_QMARK_.call(null,src_paths)) && (cljs.core.every_QMARK_.call(null,cljs.core.string_QMARK_,src_paths));
} else {
return and__6685__auto__;
}
})())){
return ((function (map__13530,map__13530__$1,verbose,src_paths,read_file_fn_BANG_,cache,foreign_libs,as,user_opts){
return (function (p__13532,cb){
var map__13533 = p__13532;
var map__13533__$1 = ((((!((map__13533 == null)))?((((map__13533.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13533.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13533):map__13533);
var load_map = map__13533__$1;
var name = cljs.core.get.call(null,map__13533__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var macros = cljs.core.get.call(null,map__13533__$1,new cljs.core.Keyword(null,"macros","macros",811339431));
var path = cljs.core.get.call(null,map__13533__$1,new cljs.core.Keyword(null,"path","path",-188191168));
if(cljs.core.truth_(replumb.load.skip_load_QMARK_.call(null,load_map))){
return replumb.load.fake_load_fn_BANG_.call(null,load_map,cb);
} else {
if(cljs.core.truth_(cljs.core.re_matches.call(null,/^goog\/.*/,path))){
var temp__4655__auto__ = replumb.repl.get_goog_path.call(null,name);
if(cljs.core.truth_(temp__4655__auto__)){
var goog_path = temp__4655__auto__;
return replumb.load.read_files_and_callback_BANG_.call(null,verbose,replumb.load.file_paths_for_closure.call(null,src_paths,goog_path),read_file_fn_BANG_,cb);
} else {
return cb.call(null,null);
}
} else {
var path__$1 = (function (){var or__6697__auto__ = (cljs.core.truth_(goog.DEPENDENCIES_ENABLED)?replumb.repl.file_path_from_goog_dependencies.call(null,[cljs.core.str(name)].join('')):null);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
var or__6697__auto____$1 = replumb.repl.file_path_from_foreign_libs.call(null,[cljs.core.str(name)].join(''),foreign_libs);
if(cljs.core.truth_(or__6697__auto____$1)){
return or__6697__auto____$1;
} else {
return path;
}
}
})();
var args = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [verbose,replumb.load.file_paths_for_load_fn.call(null,src_paths,macros,path__$1),read_file_fn_BANG_,cb], null);
var cache_path = new cljs.core.Keyword(null,"path","path",-188191168).cljs$core$IFn$_invoke$arity$1(cache);
var src_paths_lookup_QMARK_ = new cljs.core.Keyword(null,"src-paths-lookup?","src-paths-lookup?",-917471209).cljs$core$IFn$_invoke$arity$1(cache);
if(cljs.core.truth_((function (){var or__6697__auto__ = cache_path;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return src_paths_lookup_QMARK_;
}
})())){
var cache_paths = (function (){var G__13535 = cljs.core.PersistentVector.EMPTY;
var G__13535__$1 = (cljs.core.truth_(cache_path)?cljs.core.into.call(null,G__13535,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cache_path], null)):G__13535);
if(cljs.core.truth_(src_paths_lookup_QMARK_)){
return cljs.core.into.call(null,G__13535__$1,src_paths);
} else {
return G__13535__$1;
}
})();
var cached_file_paths = replumb.load.cache_file_paths_for_load_fn.call(null,cache_paths,macros,path__$1);
return cljs.core.apply.call(null,replumb.load.read_files_from_cache_and_callback_BANG_,cljs.core.conj.call(null,args,cached_file_paths));
} else {
return cljs.core.apply.call(null,replumb.load.read_files_and_callback_BANG_,args);
}

}
}
});
;})(map__13530,map__13530__$1,verbose,src_paths,read_file_fn_BANG_,cache,foreign_libs,as,user_opts))
} else {
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.call(null,"Invalid :read-file-fn! or :src-paths (is it sequential? Are all paths strings?). No *load-fn* will be passed to cljs.js.");
} else {
}

return null;
}
});
/**
 * Set of valid option used for external input validation.
 */
replumb.repl.valid_opts_set = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 12, [new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191),null,new cljs.core.Keyword(null,"write-file-fn!","write-file-fn!",-535483541),null,new cljs.core.Keyword(null,"verbose","verbose",1694226060),null,new cljs.core.Keyword(null,"cache","cache",-1237023054),null,new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),null,new cljs.core.Keyword(null,"warning-as-error","warning-as-error",1347418166),null,new cljs.core.Keyword(null,"context","context",-830191113),null,new cljs.core.Keyword(null,"foreign-libs","foreign-libs",805847831),null,new cljs.core.Keyword(null,"load-fn!","load-fn!",-896695751),null,new cljs.core.Keyword(null,"target","target",253001721),null,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603),null,new cljs.core.Keyword(null,"init-fn!","init-fn!",-986163042),null], null), null);
/**
 * Validate the input user options. Returns a new map without invalid
 *   ones according to valid-opts-set.
 */
replumb.repl.valid_opts = (function replumb$repl$valid_opts(user_opts){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.call(null,cljs.core.comp.call(null,replumb.repl.valid_opts_set,cljs.core.first),user_opts));
});
/**
 * Given user provided options, conjoins the default option map for
 *   its :target (string or keyword). Defaults to conjoining :default (browser,
 *   aka :js target).
 */
replumb.repl.add_default_opts = (function replumb$repl$add_default_opts(opts,user_opts){
return cljs.core.merge.call(null,opts,(function (){var pred__13539 = cljs.core._EQ_;
var expr__13540 = cljs.core.keyword.call(null,new cljs.core.Keyword(null,"target","target",253001721).cljs$core$IFn$_invoke$arity$1(user_opts));
if(cljs.core.truth_(pred__13539.call(null,new cljs.core.Keyword(null,"nodejs","nodejs",321212524),expr__13540))){
return replumb.nodejs.default_opts;
} else {
return replumb.browser.default_opts;
}
})());
});
/**
 * Given current and user options, if :load-fn! is present in user-opts,
 *   conjoins it. Try to create and conjoin one from :src-paths
 *   and :read-file-fn! otherwise. Conjoins nil if it cannot.
 */
replumb.repl.add_load_fn = (function replumb$repl$add_load_fn(opts,user_opts){
return cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"load-fn!","load-fn!",-896695751),(function (){var or__6697__auto__ = new cljs.core.Keyword(null,"load-fn!","load-fn!",-896695751).cljs$core$IFn$_invoke$arity$1(user_opts);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return replumb.repl.make_load_fn.call(null,user_opts);
}
})());
});
/**
 * Given current and user options, returns a map containing a
 *   valid :init-fns,conjoining with the one in current if necessary.
 */
replumb.repl.add_init_fns = (function replumb$repl$add_init_fns(opts,user_opts){
return cljs.core.update_in.call(null,opts,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"init-fns","init-fns",1169633539)], null),(function (init_fns){
var temp__4655__auto__ = new cljs.core.Keyword(null,"init-fn!","init-fn!",-986163042).cljs$core$IFn$_invoke$arity$1(user_opts);
if(cljs.core.truth_(temp__4655__auto__)){
var fn = temp__4655__auto__;
return cljs.core.conj.call(null,init_fns,fn);
} else {
return init_fns;
}
}));
});
/**
 * Process the user options. Returns the map that can be fed to
 *   read-eval-call.
 */
replumb.repl.normalize_opts = (function replumb$repl$normalize_opts(user_opts){
var vld_opts = replumb.repl.valid_opts.call(null,user_opts);
return replumb.repl.add_init_fns.call(null,replumb.repl.add_load_fn.call(null,replumb.repl.add_default_opts.call(null,vld_opts,vld_opts),vld_opts),vld_opts);
});
/**
 * Builds the map to return when the evaluation returned success.
 *   Supports the following options:
 * 
 *   * :no-pr-str-on-value avoids wrapping value in pr-str.
 */
replumb.repl.success_map = (function replumb$repl$success_map(opts,form,warning,value){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"success?","success?",-122854052),true,new cljs.core.Keyword(null,"form","form",-1624062471),form,new cljs.core.Keyword(null,"warning","warning",-1685650671),warning,new cljs.core.Keyword(null,"value","value",305978217),((cljs.core.not.call(null,new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546).cljs$core$IFn$_invoke$arity$1(opts)))?cljs.core.pr_str.call(null,value):value)], null);
});
/**
 * Builds the map to return when the evaluation returned error.
 */
replumb.repl.error_map = (function replumb$repl$error_map(opts,form,warning,error){
return new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"success?","success?",-122854052),false,new cljs.core.Keyword(null,"form","form",-1624062471),form,new cljs.core.Keyword(null,"warning","warning",-1685650671),warning,new cljs.core.Keyword(null,"error","error",-978969032),error], null);
});
replumb.repl.reset_last_warning_BANG_ = (function replumb$repl$reset_last_warning_BANG_(){
return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"last-eval-warning","last-eval-warning",-478360530),null);
});
/**
 * Handles the case when the evaluation returns a warning and can be
 *   passed as a warning handler when partially applied. At the moment it
 *   treats warnings as errors.
 */
replumb.repl.custom_warning_handler = (function replumb$repl$custom_warning_handler(opts,cb,warning_type,env,extra){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.call(null,[cljs.core.str("Handling warning:\n"),cljs.core.str((function (){var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13544_13546 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13545_13547 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13544_13546,_STAR_print_fn_STAR_13545_13547,sb__7671__auto__){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_13544_13546,_STAR_print_fn_STAR_13545_13547,sb__7671__auto__))
;

try{cljs.pprint.pprint.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"warning-type","warning-type",1711103595),warning_type,new cljs.core.Keyword(null,"env","env",-1815813235),env,new cljs.core.Keyword(null,"extra","extra",1612569067),extra], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13545_13547;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13544_13546;
}
return [cljs.core.str(sb__7671__auto__)].join('');
})())].join(''));
} else {
}

if(cljs.core.truth_(warning_type.call(null,cljs.analyzer._STAR_cljs_warnings_STAR_))){
var temp__4657__auto__ = cljs.analyzer.error_message.call(null,warning_type,extra);
if(cljs.core.truth_(temp__4657__auto__)){
var s = temp__4657__auto__;
return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"last-eval-warning","last-eval-warning",-478360530),cljs.analyzer.message.call(null,env,s));
} else {
return null;
}
} else {
return null;
}
});
replumb.repl.validated_call_back_BANG_ = (function replumb$repl$validated_call_back_BANG_(opts,cb,res){
if(cljs.core.map_QMARK_.call(null,res)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"map?","map?",-1780568534,null),new cljs.core.Symbol(null,"res","res",245523648,null))))].join('')));
}

if(cljs.core.truth_(cljs.core.find.call(null,res,new cljs.core.Keyword(null,"form","form",-1624062471)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"form","form",-1624062471))))].join('')));
}

if(cljs.core.truth_((function (){var or__6697__auto__ = cljs.core.find.call(null,res,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core.find.call(null,res,new cljs.core.Keyword(null,"value","value",305978217));
}
})())){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"error","error",-978969032)),cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"value","value",305978217)))))].join('')));
}

if(cljs.core.truth_((function (){var or__6697__auto__ = (function (){var and__6685__auto__ = cljs.core.find.call(null,res,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.truth_(and__6685__auto__)){
return cljs.core.get.call(null,res,new cljs.core.Keyword(null,"success?","success?",-122854052));
} else {
return and__6685__auto__;
}
})();
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
var and__6685__auto__ = cljs.core.find.call(null,res,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(and__6685__auto__)){
return cljs.core.not.call(null,cljs.core.get.call(null,res,new cljs.core.Keyword(null,"success?","success?",-122854052)));
} else {
return and__6685__auto__;
}
}
})())){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"value","value",305978217)),cljs.core.list(new cljs.core.Symbol(null,"get","get",-971253014,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"success?","success?",-122854052))),cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"error","error",-978969032)),cljs.core.list(new cljs.core.Symbol(null,"not","not",1044554643,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-971253014,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"success?","success?",-122854052)))))))].join('')));
}

if(cljs.core.truth_((function (){var or__6697__auto__ = (function (){var and__6685__auto__ = cljs.core.find.call(null,res,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.truth_(and__6685__auto__)){
var or__6697__auto__ = (cljs.core.not.call(null,new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546).cljs$core$IFn$_invoke$arity$1(opts))) && (typeof cljs.core.get.call(null,res,new cljs.core.Keyword(null,"value","value",305978217)) === 'string');
if(or__6697__auto__){
return or__6697__auto__;
} else {
var and__6685__auto____$1 = new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(and__6685__auto____$1)){
return !((res == null));
} else {
return and__6685__auto____$1;
}
}
} else {
return and__6685__auto__;
}
})();
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
var and__6685__auto__ = cljs.core.find.call(null,res,new cljs.core.Keyword(null,"error","error",-978969032));
if(cljs.core.truth_(and__6685__auto__)){
return (cljs.core.get.call(null,res,new cljs.core.Keyword(null,"error","error",-978969032)) instanceof Error);
} else {
return and__6685__auto__;
}
}
})())){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"value","value",305978217)),cljs.core.list(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Symbol(null,"not","not",1044554643,null),cljs.core.list(new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),new cljs.core.Symbol(null,"opts","opts",1795607228,null))),cljs.core.list(new cljs.core.Symbol(null,"string?","string?",-1129175764,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-971253014,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"value","value",305978217)))),cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),new cljs.core.Symbol(null,"opts","opts",1795607228,null)),cljs.core.list(new cljs.core.Symbol(null,"not","not",1044554643,null),cljs.core.list(new cljs.core.Symbol(null,"nil?","nil?",1612038930,null),new cljs.core.Symbol(null,"res","res",245523648,null)))))),cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"error","error",-978969032)),cljs.core.list(new cljs.core.Symbol(null,"instance?","instance?",1075939923,null),new cljs.core.Symbol("js","Error","js/Error",-1692659266,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-971253014,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"error","error",-978969032)))))))].join('')));
}

if(cljs.core.truth_((function (){var or__6697__auto__ = cljs.core.not.call(null,cljs.core.find.call(null,res,new cljs.core.Keyword(null,"warning","warning",-1685650671)));
if(or__6697__auto__){
return or__6697__auto__;
} else {
var or__6697__auto____$1 = cljs.core.find.call(null,res,new cljs.core.Keyword(null,"warning","warning",-1685650671));
if(cljs.core.truth_(or__6697__auto____$1)){
return or__6697__auto____$1;
} else {
return typeof cljs.core.get.call(null,res,new cljs.core.Keyword(null,"warning","warning",-1685650671)) === 'string';
}
}
})())){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"or","or",1876275696,null),cljs.core.list(new cljs.core.Symbol(null,"not","not",1044554643,null),cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"warning","warning",-1685650671))),cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"warning","warning",-1685650671))),cljs.core.list(new cljs.core.Symbol(null,"string?","string?",-1129175764,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-971253014,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"warning","warning",-1685650671))))))].join('')));
}

return cb.call(null,res);
});
replumb.repl.validated_init_fn_BANG_ = (function replumb$repl$validated_init_fn_BANG_(init_fn_BANG_,res){
if(cljs.core.map_QMARK_.call(null,res)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"map?","map?",-1780568534,null),new cljs.core.Symbol(null,"res","res",245523648,null))))].join('')));
}

if(cljs.core.truth_(cljs.core.find.call(null,res,new cljs.core.Keyword(null,"form","form",-1624062471)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"form","form",-1624062471))))].join('')));
}

if(cljs.core.truth_(cljs.core.find.call(null,res,new cljs.core.Keyword(null,"ns","ns",441598760)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"find","find",2136810983,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"ns","ns",441598760))))].join('')));
}

if(cljs.core._EQ_.call(null,cljs.core._STAR_target_STAR_,cljs.core.get.call(null,res,new cljs.core.Keyword(null,"target","target",253001721)))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"=","=",-1501502141,null),new cljs.core.Symbol(null,"*target*","*target*",-1336537940,null),cljs.core.list(new cljs.core.Symbol(null,"get","get",-971253014,null),new cljs.core.Symbol(null,"res","res",245523648,null),new cljs.core.Keyword(null,"target","target",253001721)))))].join('')));
}

return init_fn_BANG_.call(null,res);
});
/**
 * Execute the correct side effecting function from data.
 *   Handles :side-effect-fn!, :on-error-fn! and on-success-fn!.
 */
replumb.repl.call_side_effect_BANG_ = (function replumb$repl$call_side_effect_BANG_(data,p__13548){
var map__13551 = p__13548;
var map__13551__$1 = ((((!((map__13551 == null)))?((((map__13551.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13551.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13551):map__13551);
var value = cljs.core.get.call(null,map__13551__$1,new cljs.core.Keyword(null,"value","value",305978217));
var error = cljs.core.get.call(null,map__13551__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var temp__4655__auto__ = new cljs.core.Keyword(null,"side-effect-fn!","side-effect-fn!",-1977898773).cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(temp__4655__auto__)){
var f_BANG_ = temp__4655__auto__;
return f_BANG_.call(null);
} else {
if(cljs.core.not.call(null,error)){
var temp__4657__auto__ = new cljs.core.Keyword(null,"on-success-fn!","on-success-fn!",461991357).cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(temp__4657__auto__)){
var s_BANG_ = temp__4657__auto__;
return s_BANG_.call(null);
} else {
return null;
}
} else {
var temp__4657__auto__ = new cljs.core.Keyword(null,"on-error-fn!","on-error-fn!",-1787514690).cljs$core$IFn$_invoke$arity$1(data);
if(cljs.core.truth_(temp__4657__auto__)){
var e_BANG_ = temp__4657__auto__;
return e_BANG_.call(null);
} else {
return null;
}
}
}
});
/**
 * Checks if there has been a warning and if so will return a new result
 *   map instead of the input one, potentially with a :warning key
 *   containing the warning message in it.
 * 
 *   The code paths are the following:
 * 
 *   - if the input map was already an :error, there will be no warning,
 *   the original :error is returned.
 *   - if the input map was a :value:
 *  - if (:warning-as-error opts) is truey, the new map will always
 *    contain it as :error, overriding the original.
 *  - if (:warning-as-error opts) is falsey, the new map will contain
 *    the warning as :warning along with the original :value
 */
replumb.repl.warning_error_map_BANG_ = (function replumb$repl$warning_error_map_BANG_(opts,p__13553){
var map__13556 = p__13553;
var map__13556__$1 = ((((!((map__13556 == null)))?((((map__13556.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13556.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13556):map__13556);
var orig = map__13556__$1;
var error = cljs.core.get.call(null,map__13556__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var temp__4655__auto__ = new cljs.core.Keyword(null,"last-eval-warning","last-eval-warning",-478360530).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env));
if(cljs.core.truth_(temp__4655__auto__)){
var warning_msg = temp__4655__auto__;
if(cljs.core.not.call(null,error)){
if(cljs.core.not.call(null,new cljs.core.Keyword(null,"warning-as-error","warning-as-error",1347418166).cljs$core$IFn$_invoke$arity$1(opts))){
return cljs.core.assoc.call(null,orig,new cljs.core.Keyword(null,"warning","warning",-1685650671),warning_msg);
} else {
var warning_error = cljs.core.ex_info.call(null,warning_msg,replumb.repl.ex_info_data);
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.call(null,"Erroring on last warning: ",warning_msg);
} else {
}

return replumb.common.wrap_error.call(null,warning_error);
}
} else {
return orig;
}
} else {
return orig;
}
});
/**
 * Handles the evaluation result, calling the callback in the right way,
 *   based on the success or error of the evaluation. The res parameter
 *   expects the same map as ClojureScript's cljs.js callback,
 *   :value if success and :error if not. The data parameter might contain
 *   additional stuff:
 * 
 *   * :form the source form that has been eval-ed
 *   * :on-success-fn! 0-arity function that will be executed on success
 *   * :on-error-fn! 0-arity function that will be executed on error
 *   * :side-effect-fn! 0-arity function that if present will be executed
 *   for both success and error, effectively disabling the individual
 *   on-success-fn! and on-error-fn!
 * 
 *   Call-back! supports the following opts:
 * 
 *   * :verbose will enable the evaluation logging, defaults to false.
 *   * :no-pr-str-on-value avoids wrapping successful value in a pr-str
 *   * :warning-as-error will consider a warning like an error
 * 
 *   Notes:
 *   1. The opts map passed here overrides the environment options.
 *   2. This function will also clear the :last-eval-warning flag in
 *   app-env.
 *   3. It will execute (:side-effect-fn!) or (on-success-fn!)
 *   and (on-error-fn!)  *before* the callback is called.
 * 
 *   ** Every function in this namespace should call call-back! as
 *   single point of exit. **
 */
replumb.repl.call_back_BANG_ = (function replumb$repl$call_back_BANG_(var_args){
var args13558 = [];
var len__7755__auto___13565 = arguments.length;
var i__7756__auto___13566 = (0);
while(true){
if((i__7756__auto___13566 < len__7755__auto___13565)){
args13558.push((arguments[i__7756__auto___13566]));

var G__13567 = (i__7756__auto___13566 + (1));
i__7756__auto___13566 = G__13567;
continue;
} else {
}
break;
}

var G__13560 = args13558.length;
switch (G__13560) {
case 3:
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13558.length)].join('')));

}
});

replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (opts,cb,res){
return replumb.repl.call_back_BANG_.call(null,opts,cb,cljs.core.PersistentArrayMap.EMPTY,res);
});

replumb.repl.call_back_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (opts,cb,data,res){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.call(null,"Calling back!\n",(function (){var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13561_13569 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13562_13570 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13561_13569,_STAR_print_fn_STAR_13562_13570,sb__7671__auto__){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_13561_13569,_STAR_print_fn_STAR_13562_13570,sb__7671__auto__))
;

try{cljs.pprint.pprint.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"opts","opts",155075701),replumb.common.filter_fn_keys.call(null,opts),new cljs.core.Keyword(null,"data","data",-232669377),replumb.common.filter_fn_keys.call(null,data),new cljs.core.Keyword(null,"res","res",-1395007879),res], null));
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13562_13570;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13561_13569;
}
return [cljs.core.str(sb__7671__auto__)].join('');
})());
} else {
}

var new_map = replumb.repl.warning_error_map_BANG_.call(null,opts,res);
var map__13563 = new_map;
var map__13563__$1 = ((((!((map__13563 == null)))?((((map__13563.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13563.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13563):map__13563);
var value = cljs.core.get.call(null,map__13563__$1,new cljs.core.Keyword(null,"value","value",305978217));
var error = cljs.core.get.call(null,map__13563__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var warning = cljs.core.get.call(null,map__13563__$1,new cljs.core.Keyword(null,"warning","warning",-1685650671));
replumb.repl.call_side_effect_BANG_.call(null,data,new_map);

replumb.repl.reset_last_warning_BANG_.call(null);

if(cljs.core.not.call(null,error)){
cljs.core._STAR_e = null;

return cb.call(null,replumb.repl.success_map.call(null,opts,new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(data),warning,value));
} else {
cljs.core._STAR_e = error;

return cb.call(null,replumb.repl.error_map.call(null,opts,new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(data),warning,error));
}
});

replumb.repl.call_back_BANG_.cljs$lang$maxFixedArity = 4;
replumb.repl.process_1_2_3 = (function replumb$repl$process_1_2_3(data,expression_form,value){
if(cljs.core.truth_((function (){var or__6697__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Symbol(null,"*2","*2",1728229926,null),null,new cljs.core.Symbol(null,"*1","*1",2110258092,null),null,new cljs.core.Symbol(null,"*e","*e",329170866,null),null,new cljs.core.Symbol(null,"*3","*3",105062009,null),null], null), null).call(null,expression_form);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return replumb.repl.ns_form_QMARK_.call(null,expression_form);
}
})())){
return null;
} else {
cljs.core._STAR_3 = cljs.core._STAR_2;

cljs.core._STAR_2 = cljs.core._STAR_1;

return cljs.core._STAR_1 = value;
}
});
/**
 * Custom version of cljs.js/eval-str. The only difference is in the
 *   spitting of eval-opts, which is the map which the actual
 *   cljs.js/eval-str needs and usually built by base-eval-opts!, and
 *   user-opts, passed through read-eval-call (same keys supported).
 * 
 *   Additionally, eval-opts might contain:
 * 
 *   * :file-name In case of file loading, indicates its name
 *   * :on-success-fn! 1-arity function that will be executed on success,
 *   the input is the evaluation result
 *   * :on-error-fn! 1-arity function that will be executed on error, the
 *   input is the evaluation result
 *   * :side-effect-fn! 1-arity function that if present will be executed
 *   for both success and error, effectively disabling the individual
 *   on-success-fn! and on-error-fn!. The input is the evaluation result
 */
replumb.repl.eval_str_STAR_ = (function replumb$repl$eval_str_STAR_(eval_opts,user_opts,cb,data,source){
var map__13574 = eval_opts;
var map__13574__$1 = ((((!((map__13574 == null)))?((((map__13574.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13574.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13574):map__13574);
var file_name = cljs.core.get.call(null,map__13574__$1,new cljs.core.Keyword(null,"file-name","file-name",-1654217259));
var on_success_fn_BANG_ = cljs.core.get.call(null,map__13574__$1,new cljs.core.Keyword(null,"on-success-fn!","on-success-fn!",461991357));
var on_error_fn_BANG_ = cljs.core.get.call(null,map__13574__$1,new cljs.core.Keyword(null,"on-error-fn!","on-error-fn!",-1787514690));
var side_effect_fn_BANG_ = cljs.core.get.call(null,map__13574__$1,new cljs.core.Keyword(null,"side-effect-fn!","side-effect-fn!",-1977898773));
return cljs.js.eval_str.call(null,replumb.repl.st,source,(cljs.core.truth_(file_name)?file_name:source),eval_opts,((function (map__13574,map__13574__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_){
return (function (res){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(user_opts))){
replumb.common.debug_prn.call(null,"Evaluation returned: ",res);
} else {
}

return replumb.repl.call_back_BANG_.call(null,user_opts,cb,(function (){var G__13576 = data;
var G__13576__$1 = (cljs.core.truth_(on_success_fn_BANG_)?cljs.core.assoc.call(null,G__13576,new cljs.core.Keyword(null,"on-success-fn!","on-success-fn!",461991357),((function (G__13576,map__13574,map__13574__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_){
return (function (){
return on_success_fn_BANG_.call(null,res);
});})(G__13576,map__13574,map__13574__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_))
):G__13576);
var G__13576__$2 = (cljs.core.truth_(on_error_fn_BANG_)?cljs.core.assoc.call(null,G__13576__$1,new cljs.core.Keyword(null,"on-error-fn!","on-error-fn!",-1787514690),((function (G__13576,G__13576__$1,map__13574,map__13574__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_){
return (function (){
return on_error_fn_BANG_.call(null,res);
});})(G__13576,G__13576__$1,map__13574,map__13574__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_))
):G__13576__$1);
if(cljs.core.truth_(side_effect_fn_BANG_)){
return cljs.core.assoc.call(null,G__13576__$2,new cljs.core.Keyword(null,"side-effect-fn!","side-effect-fn!",-1977898773),((function (G__13576,G__13576__$1,G__13576__$2,map__13574,map__13574__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_){
return (function (){
return side_effect_fn_BANG_.call(null,res);
});})(G__13576,G__13576__$1,G__13576__$2,map__13574,map__13574__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_))
);
} else {
return G__13576__$2;
}
})(),res);
});})(map__13574,map__13574__$1,file_name,on_success_fn_BANG_,on_error_fn_BANG_,side_effect_fn_BANG_))
);
});
replumb.repl.process_require = (function replumb$repl$process_require(opts,cb,data,kind,specs){
if(!(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.ffirst.call(null,specs)))){
return replumb.repl.call_back_BANG_.call(null,opts,cb,data,replumb.common.error_argument_must_be_symbol.call(null,"require",replumb.repl.ex_info_data));
} else {
var is_self_require_QMARK_ = (function (){var and__6685__auto__ = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"kind","kind",-717265803),new cljs.core.Keyword(null,"require","require",-468001333));
if(and__6685__auto__){
return replumb.repl.self_require_QMARK_.call(null,specs);
} else {
return and__6685__auto__;
}
})();
var vec__13581 = ((cljs.core.not.call(null,is_self_require_QMARK_))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env)),null], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"cljs.user","cljs.user",877795071,null),new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env))], null));
var target_ns = cljs.core.nth.call(null,vec__13581,(0),null);
var restore_ns = cljs.core.nth.call(null,vec__13581,(1),null);
var ns_form = replumb.repl.make_ns_form.call(null,kind,specs,target_ns);
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.call(null,"Processing",kind,"via",cljs.core.pr_str.call(null,ns_form));
} else {
}

return cljs.js.eval.call(null,replumb.repl.st,ns_form,replumb.repl.base_eval_opts_BANG_.call(null,opts),((function (is_self_require_QMARK_,vec__13581,target_ns,restore_ns,ns_form){
return (function (p__13582){
var map__13583 = p__13582;
var map__13583__$1 = ((((!((map__13583 == null)))?((((map__13583.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13583.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13583):map__13583);
var error = cljs.core.get.call(null,map__13583__$1,new cljs.core.Keyword(null,"error","error",-978969032));
return replumb.repl.call_back_BANG_.call(null,opts,cb,cljs.core.merge.call(null,data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"side-effect-fn!","side-effect-fn!",-1977898773),((function (map__13583,map__13583__$1,error,is_self_require_QMARK_,vec__13581,target_ns,restore_ns,ns_form){
return (function (){
if(cljs.core.truth_(is_self_require_QMARK_)){
return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"current-ns","current-ns",1661653428),restore_ns);
} else {
return null;
}
});})(map__13583,map__13583__$1,error,is_self_require_QMARK_,vec__13581,target_ns,restore_ns,ns_form))
], null)),(cljs.core.truth_(error)?replumb.common.wrap_error.call(null,error):replumb.common.wrap_success.call(null,null)));
});})(is_self_require_QMARK_,vec__13581,target_ns,restore_ns,ns_form))
);
}
});
replumb.repl.doc_map_special_symbols = (function replumb$repl$doc_map_special_symbols(sym){
return cljs.core.get.call(null,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Symbol(null,"&","&",-2144855648,null),new cljs.core.Symbol(null,"fn","fn",465265323,null),new cljs.core.Symbol(null,"catch","catch",-1616370245,null),new cljs.core.Symbol(null,"try","try",-1273693247,null),new cljs.core.Symbol(null,"finally","finally",-1065347064,null),new cljs.core.Symbol(null,"try","try",-1273693247,null)], null),sym,sym);
});
replumb.repl.process_doc = (function replumb$repl$process_doc(opts,cb,data,sym){
return replumb.repl.call_back_BANG_.call(null,cljs.core.merge.call(null,opts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),true], null)),cb,data,replumb.common.wrap_success.call(null,(function (){var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13587_13589 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13588_13590 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13587_13589,_STAR_print_fn_STAR_13588_13590,sb__7671__auto__){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_13587_13589,_STAR_print_fn_STAR_13588_13590,sb__7671__auto__))
;

try{var sym_13591__$1 = replumb.repl.doc_map_special_symbols.call(null,sym);
if(cljs.core.truth_(replumb.doc_maps.special_doc_map.call(null,sym_13591__$1))){
cljs.repl.print_doc.call(null,replumb.doc_maps.special_doc.call(null,sym_13591__$1));
} else {
if(cljs.core.truth_(replumb.doc_maps.repl_special_doc_map.call(null,sym_13591__$1))){
cljs.repl.print_doc.call(null,replumb.doc_maps.repl_special_doc.call(null,sym_13591__$1));
} else {
if(cljs.core.truth_(replumb.ast.namespace.call(null,cljs.core.deref.call(null,replumb.repl.st),sym_13591__$1))){
cljs.repl.print_doc.call(null,cljs.core.select_keys.call(null,replumb.ast.namespace.call(null,cljs.core.deref.call(null,replumb.repl.st),sym_13591__$1),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"doc","doc",1913296891)], null)));
} else {
cljs.repl.print_doc.call(null,replumb.repl.get_var.call(null,opts,replumb.repl.empty_analyzer_env.call(null),sym_13591__$1));

}
}
}
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13588_13590;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13587_13589;
}
return [cljs.core.str(sb__7671__auto__)].join('');
})()));
});
replumb.repl.process_pst = (function replumb$repl$process_pst(opts,cb,data,expr){
var temp__4655__auto__ = (function (){var or__6697__auto__ = expr;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return new cljs.core.Symbol(null,"*e","*e",329170866,null);
}
})();
if(cljs.core.truth_(temp__4655__auto__)){
var expr__$1 = temp__4655__auto__;
return cljs.js.eval.call(null,replumb.repl.st,expr__$1,replumb.repl.base_eval_opts_BANG_.call(null,opts),((function (expr__$1,temp__4655__auto__){
return (function (p__13595){
var map__13596 = p__13595;
var map__13596__$1 = ((((!((map__13596 == null)))?((((map__13596.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13596.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13596):map__13596);
var value = cljs.core.get.call(null,map__13596__$1,new cljs.core.Keyword(null,"value","value",305978217));
var msg = (cljs.core.truth_(value)?replumb.common.extract_message.call(null,value,true,true):"nil");
return replumb.repl.call_back_BANG_.call(null,cljs.core.assoc.call(null,opts,new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),true),cb,data,replumb.common.wrap_success.call(null,msg));
});})(expr__$1,temp__4655__auto__))
);
} else {
return replumb.repl.call_back_BANG_.call(null,opts,cb,data,replumb.common.wrap_success.call(null,null));
}
});
replumb.repl.process_in_ns = (function replumb$repl$process_in_ns(opts,cb,data,ns_string){
return cljs.js.eval.call(null,replumb.repl.st,ns_string,replumb.repl.base_eval_opts_BANG_.call(null,opts),(function (p__13601){
var map__13602 = p__13601;
var map__13602__$1 = ((((!((map__13602 == null)))?((((map__13602.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13602.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13602):map__13602);
var result = map__13602__$1;
var error = cljs.core.get.call(null,map__13602__$1,new cljs.core.Keyword(null,"error","error",-978969032));
var value = cljs.core.get.call(null,map__13602__$1,new cljs.core.Keyword(null,"value","value",305978217));
if(cljs.core.truth_(error)){
return replumb.repl.call_back_BANG_.call(null,opts,cb,data,result);
} else {
var ns_symbol = value;
if(!((ns_symbol instanceof cljs.core.Symbol))){
return replumb.repl.call_back_BANG_.call(null,opts,cb,data,replumb.common.error_argument_must_be_symbol.call(null,"in-ns",replumb.repl.ex_info_data));
} else {
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.partial.call(null,cljs.core._EQ_,ns_symbol),replumb.ast.known_namespaces.call(null,cljs.core.deref.call(null,replumb.repl.st))))){
return replumb.repl.call_back_BANG_.call(null,opts,cb,cljs.core.merge.call(null,data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"side-effect-fn!","side-effect-fn!",-1977898773),((function (ns_symbol,map__13602,map__13602__$1,result,error,value){
return (function (){
return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"current-ns","current-ns",1661653428),ns_symbol);
});})(ns_symbol,map__13602,map__13602__$1,result,error,value))
], null)),replumb.common.wrap_success.call(null,null));
} else {
var ns_form = cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"ns","ns",2082130287,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,ns_symbol))));
return cljs.js.eval.call(null,replumb.repl.st,ns_form,replumb.repl.base_eval_opts_BANG_.call(null,opts),cljs.core.partial.call(null,replumb.repl.call_back_BANG_,opts,cb,cljs.core.merge.call(null,data,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"on-success-fn!","on-success-fn!",461991357),((function (ns_form,ns_symbol,map__13602,map__13602__$1,result,error,value){
return (function (){
return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"current-ns","current-ns",1661653428),ns_symbol);
});})(ns_form,ns_symbol,map__13602,map__13602__$1,result,error,value))
], null))));
}
}
}
}));
});
replumb.repl.fetch_source = (function replumb$repl$fetch_source(p__13604,var$,paths_to_try,cb){
var map__13611 = p__13604;
var map__13611__$1 = ((((!((map__13611 == null)))?((((map__13611.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13611.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13611):map__13611);
var verbose = cljs.core.get.call(null,map__13611__$1,new cljs.core.Keyword(null,"verbose","verbose",1694226060));
var read_file_fn_BANG_ = cljs.core.get.call(null,map__13611__$1,new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191));
if(cljs.core.truth_(read_file_fn_BANG_)){
return replumb.load.read_files_and_callback_BANG_.call(null,verbose,paths_to_try,read_file_fn_BANG_,((function (map__13611,map__13611__$1,verbose,read_file_fn_BANG_){
return (function (result){
if(cljs.core.truth_(result)){
var _STAR_cljs_ns_STAR_13613 = cljs.analyzer._STAR_cljs_ns_STAR_;
var _STAR_compiler_STAR_13614 = cljs.env._STAR_compiler_STAR_;
var _STAR_data_readers_STAR_13615 = cljs.tools.reader._STAR_data_readers_STAR_;
var resolve_symbol13616 = cljs.tools.reader.resolve_symbol;
cljs.analyzer._STAR_cljs_ns_STAR_ = new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env));

cljs.env._STAR_compiler_STAR_ = replumb.repl.st;

cljs.tools.reader._STAR_data_readers_STAR_ = cljs.tagged_literals._STAR_cljs_data_readers_STAR_;

cljs.tools.reader.resolve_symbol = cljs.analyzer.resolve_symbol;

try{var source = new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(result);
var rdr = cljs.tools.reader.reader_types.source_logging_push_back_reader.call(null,source);
var n__7600__auto___13617 = (new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(var$) - (1));
var __13618 = (0);
while(true){
if((__13618 < n__7600__auto___13617)){
cljs.tools.reader.impl.commons.skip_line.call(null,rdr);

var G__13619 = (__13618 + (1));
__13618 = G__13619;
continue;
} else {
}
break;
}

return cb.call(null,replumb.common.wrap_success.call(null,new cljs.core.Keyword(null,"source","source",-433931539).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,replumb.repl.read.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-cond","read-cond",1056899244),new cljs.core.Keyword(null,"allow","allow",-1857325745),new cljs.core.Keyword(null,"features","features",-1146962336),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs","cljs",1492417629),null], null), null)], null),rdr)))));
}finally {cljs.tools.reader.resolve_symbol = resolve_symbol13616;

cljs.tools.reader._STAR_data_readers_STAR_ = _STAR_data_readers_STAR_13615;

cljs.env._STAR_compiler_STAR_ = _STAR_compiler_STAR_13614;

cljs.analyzer._STAR_cljs_ns_STAR_ = _STAR_cljs_ns_STAR_13613;
}} else {
return cb.call(null,replumb.common.wrap_success.call(null,"nil"));
}
});})(map__13611,map__13611__$1,verbose,read_file_fn_BANG_))
);
} else {
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.call(null,"No :read-file-fn! provided, skipping source fetching...");
} else {
}

return cb.call(null,replumb.common.wrap_success.call(null,"nil"));
}
});
replumb.repl.process_source = (function replumb$repl$process_source(opts,cb,data,sym){
var var$ = replumb.repl.get_var.call(null,opts,replumb.repl.empty_analyzer_env.call(null),sym);
var call_back = cljs.core.partial.call(null,replumb.repl.call_back_BANG_,cljs.core.merge.call(null,opts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),true], null)),cb,data);
var temp__4655__auto__ = (function (){var or__6697__auto__ = new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(var$);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"meta","meta",1499536964).cljs$core$IFn$_invoke$arity$1(var$));
}
})();
if(cljs.core.truth_(temp__4655__auto__)){
var full_path_or_ns = temp__4655__auto__;
var paths_to_try = ((!((full_path_or_ns instanceof cljs.core.Symbol)))?replumb.load.file_paths.call(null,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603).cljs$core$IFn$_invoke$arity$1(opts),full_path_or_ns):replumb.load.file_paths_for_load_fn.call(null,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603).cljs$core$IFn$_invoke$arity$1(opts),replumb.repl.macro_QMARK_.call(null,var$),cljs.js.ns__GT_relpath.call(null,full_path_or_ns)));
return replumb.repl.fetch_source.call(null,opts,var$,paths_to_try,call_back);
} else {
return call_back.call(null,replumb.common.wrap_success.call(null,"nil"));
}
});
replumb.repl.process_dir = (function replumb$repl$process_dir(opts,cb,data,sym){
var vars = cljs.core.sort.call(null,cljs.core.keys.call(null,replumb.ast.ns_publics.call(null,cljs.core.deref.call(null,replumb.repl.st),sym)));
var call_back = cljs.core.partial.call(null,replumb.repl.call_back_BANG_,cljs.core.merge.call(null,opts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),true], null)),cb,data);
if(cljs.core.seq.call(null,vars)){
return call_back.call(null,replumb.common.wrap_success.call(null,clojure.string.join.call(null,"\n",vars)));
} else {
return call_back.call(null,replumb.common.wrap_success.call(null,"nil"));
}
});
replumb.repl.process_apropos = (function replumb$repl$process_apropos(opts,cb,data,str_or_pattern){
var matches_QMARK_ = (((str_or_pattern instanceof RegExp))?(function (p1__13620_SHARP_){
return cljs.core.re_find.call(null,str_or_pattern,[cljs.core.str(p1__13620_SHARP_)].join(''));
}):(function (p1__13621_SHARP_){
return ((-1) < [cljs.core.str(p1__13621_SHARP_)].join('').indexOf([cljs.core.str(str_or_pattern)].join('')));
}));
var defs = cljs.core.sort.call(null,cljs.core.mapcat.call(null,((function (matches_QMARK_){
return (function (ns){
var ns_name = [cljs.core.str(ns)].join('');
return cljs.core.map.call(null,((function (ns_name,matches_QMARK_){
return (function (p1__13622_SHARP_){
return cljs.core.symbol.call(null,ns_name,[cljs.core.str(p1__13622_SHARP_)].join(''));
});})(ns_name,matches_QMARK_))
,cljs.core.filter.call(null,matches_QMARK_,cljs.core.keys.call(null,replumb.ast.ns_publics.call(null,cljs.core.deref.call(null,replumb.repl.st),ns))));
});})(matches_QMARK_))
,replumb.ast.known_namespaces.call(null,cljs.core.deref.call(null,replumb.repl.st))));
return replumb.repl.call_back_BANG_.call(null,opts,cb,data,replumb.common.wrap_success.call(null,cljs.core.seq.call(null,defs)));
});
replumb.repl.process_find_doc = (function replumb$repl$process_find_doc(opts,cb,data,re_string_or_pattern){
var re = cljs.core.re_pattern.call(null,re_string_or_pattern);
var ms = cljs.core.concat.call(null,cljs.core.mapcat.call(null,((function (re){
return (function (ns){
return cljs.core.map.call(null,((function (re){
return (function (m){
return cljs.core.update_in.call(null,cljs.core.select_keys.call(null,m,new cljs.core.PersistentVector(null, 7, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"doc","doc",1913296891),new cljs.core.Keyword(null,"forms","forms",2045992350),new cljs.core.Keyword(null,"arglists","arglists",1661989754),new cljs.core.Keyword(null,"macro","macro",-867863404),new cljs.core.Keyword(null,"url","url",276297046)], null)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177)], null),((function (re){
return (function (p1__13623_SHARP_){
if(!((p1__13623_SHARP_ == null))){
return cljs.core.name.call(null,p1__13623_SHARP_);
} else {
return p1__13623_SHARP_;
}
});})(re))
);
});})(re))
,cljs.core.sort_by.call(null,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.vals.call(null,replumb.ast.ns_interns.call(null,cljs.core.deref.call(null,replumb.repl.st),ns))));
});})(re))
,replumb.ast.known_namespaces.call(null,cljs.core.deref.call(null,replumb.repl.st))),cljs.core.map.call(null,((function (re){
return (function (p1__13624_SHARP_){
return cljs.core.select_keys.call(null,replumb.ast.namespace.call(null,cljs.core.deref.call(null,replumb.repl.st),p1__13624_SHARP_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"doc","doc",1913296891)], null));
});})(re))
,replumb.ast.known_namespaces.call(null,cljs.core.deref.call(null,replumb.repl.st))),cljs.core.map.call(null,replumb.doc_maps.special_doc,cljs.core.keys.call(null,replumb.doc_maps.special_doc_map)));
var ms__$1 = (function (){var iter__7469__auto__ = ((function (re,ms){
return (function replumb$repl$process_find_doc_$_iter__13632(s__13633){
return (new cljs.core.LazySeq(null,((function (re,ms){
return (function (){
var s__13633__$1 = s__13633;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__13633__$1);
if(temp__4657__auto__){
var s__13633__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__13633__$2)){
var c__7467__auto__ = cljs.core.chunk_first.call(null,s__13633__$2);
var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);
var b__13635 = cljs.core.chunk_buffer.call(null,size__7468__auto__);
if((function (){var i__13634 = (0);
while(true){
if((i__13634 < size__7468__auto__)){
var m = cljs.core._nth.call(null,c__7467__auto__,i__13634);
if(cljs.core.truth_((function (){var and__6685__auto__ = new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(and__6685__auto__)){
var or__6697__auto__ = cljs.core.re_find.call(null,re,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core.re_find.call(null,re,[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
return and__6685__auto__;
}
})())){
cljs.core.chunk_append.call(null,b__13635,m);

var G__13638 = (i__13634 + (1));
i__13634 = G__13638;
continue;
} else {
var G__13639 = (i__13634 + (1));
i__13634 = G__13639;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13635),replumb$repl$process_find_doc_$_iter__13632.call(null,cljs.core.chunk_rest.call(null,s__13633__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__13635),null);
}
} else {
var m = cljs.core.first.call(null,s__13633__$2);
if(cljs.core.truth_((function (){var and__6685__auto__ = new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(and__6685__auto__)){
var or__6697__auto__ = cljs.core.re_find.call(null,re,new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core.re_find.call(null,re,[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
return and__6685__auto__;
}
})())){
return cljs.core.cons.call(null,m,replumb$repl$process_find_doc_$_iter__13632.call(null,cljs.core.rest.call(null,s__13633__$2)));
} else {
var G__13640 = cljs.core.rest.call(null,s__13633__$2);
s__13633__$1 = G__13640;
continue;
}
}
} else {
return null;
}
break;
}
});})(re,ms))
,null,null));
});})(re,ms))
;
return iter__7469__auto__.call(null,ms);
})();
var call_back = cljs.core.partial.call(null,replumb.repl.call_back_BANG_,cljs.core.merge.call(null,opts,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"no-pr-str-on-value","no-pr-str-on-value",1045962546),true], null)),cb,data);
if(cljs.core.seq.call(null,ms__$1)){
return call_back.call(null,replumb.common.wrap_success.call(null,clojure.string.join.call(null,cljs.core.map.call(null,((function (re,ms,ms__$1,call_back){
return (function (p1__13625_SHARP_){
var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13636_13641 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13637_13642 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13636_13641,_STAR_print_fn_STAR_13637_13642,sb__7671__auto__,re,ms,ms__$1,call_back){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_13636_13641,_STAR_print_fn_STAR_13637_13642,sb__7671__auto__,re,ms,ms__$1,call_back))
;

try{cljs.repl.print_doc.call(null,p1__13625_SHARP_);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13637_13642;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13636_13641;
}
return [cljs.core.str(sb__7671__auto__)].join('');
});})(re,ms,ms__$1,call_back))
,ms__$1))));
} else {
return call_back.call(null,replumb.common.wrap_success.call(null,"nil"));
}
});
replumb.repl.last_form = (function replumb$repl$last_form(source){
var rdr = cljs.tools.reader.reader_types.string_push_back_reader.call(null,source);
var eof = {};
var read = ((function (rdr,eof){
return (function (){
return replumb.repl.read.call(null,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"eof","eof",-489063237),eof], null),rdr);
});})(rdr,eof))
;
var first_form = read.call(null);
var second_form = read.call(null);
while(true){
if((eof === second_form)){
return first_form;
} else {
var G__13647 = second_form;
var G__13648 = read.call(null);
first_form = G__13647;
second_form = G__13648;
continue;
}
break;
}
});
replumb.repl.process_load_file = (function replumb$repl$process_load_file(p__13649,cb,data,file_name){
var map__13655 = p__13649;
var map__13655__$1 = ((((!((map__13655 == null)))?((((map__13655.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13655.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13655):map__13655);
var opts = map__13655__$1;
var verbose = cljs.core.get.call(null,map__13655__$1,new cljs.core.Keyword(null,"verbose","verbose",1694226060));
var read_file_fn_BANG_ = cljs.core.get.call(null,map__13655__$1,new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191));
var src_paths = cljs.core.get.call(null,map__13655__$1,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603));
var call_back = cljs.core.partial.call(null,replumb.repl.call_back_BANG_,opts,cb,data);
if(cljs.core.truth_(read_file_fn_BANG_)){
return replumb.load.read_files_and_callback_BANG_.call(null,verbose,replumb.load.file_paths.call(null,src_paths,file_name),read_file_fn_BANG_,((function (call_back,map__13655,map__13655__$1,opts,verbose,read_file_fn_BANG_,src_paths){
return (function (p__13657){
var map__13658 = p__13657;
var map__13658__$1 = ((((!((map__13658 == null)))?((((map__13658.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13658.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13658):map__13658);
var result = map__13658__$1;
var source = cljs.core.get.call(null,map__13658__$1,new cljs.core.Keyword(null,"source","source",-433931539));
if(cljs.core.truth_(result)){
return replumb.repl.eval_str_STAR_.call(null,cljs.core.assoc.call(null,replumb.repl.load_eval_opts_BANG_.call(null,opts,file_name),new cljs.core.Keyword(null,"on-success-fn!","on-success-fn!",461991357),((function (map__13658,map__13658__$1,result,source,call_back,map__13655,map__13655__$1,opts,verbose,read_file_fn_BANG_,src_paths){
return (function (eval_res){
return replumb.repl.process_1_2_3.call(null,data,replumb.repl.last_form.call(null,source),new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(eval_res));
});})(map__13658,map__13658__$1,result,source,call_back,map__13655,map__13655__$1,opts,verbose,read_file_fn_BANG_,src_paths))
),opts,cb,data,source);
} else {
return call_back.call(null,replumb.common.wrap_error.call(null,cljs.core.ex_info.call(null,[cljs.core.str("Could not load file "),cljs.core.str(file_name)].join(''),replumb.repl.ex_info_data)));
}
});})(call_back,map__13655,map__13655__$1,opts,verbose,read_file_fn_BANG_,src_paths))
);
} else {
if(cljs.core.truth_(verbose)){
replumb.common.debug_prn.call(null,"No :read-file-fn! provided, skipping file loading...");
} else {
}

return call_back.call(null,replumb.common.wrap_success.call(null,null));
}
});
replumb.repl.process_repl_special = (function replumb$repl$process_repl_special(opts,cb,data,expression_form){
var argument = cljs.core.second.call(null,expression_form);
var G__13661 = cljs.core.first.call(null,expression_form);
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"find-doc","find-doc",-1096800949,null),G__13661)){
return replumb.repl.process_find_doc.call(null,opts,cb,data,argument);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"dir","dir",-919681108,null),G__13661)){
return replumb.repl.process_dir.call(null,opts,cb,data,argument);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"import","import",241030818,null),G__13661)){
return replumb.repl.process_require.call(null,opts,cb,data,new cljs.core.Keyword(null,"import","import",-1399500709),cljs.core.rest.call(null,expression_form));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"require-macros","require-macros",-1946488353,null),G__13661)){
return replumb.repl.process_require.call(null,opts,cb,data,new cljs.core.Keyword(null,"require-macros","require-macros",707947416),cljs.core.rest.call(null,expression_form));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"pst","pst",-1996688947,null),G__13661)){
return replumb.repl.process_pst.call(null,opts,cb,data,argument);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"load-file","load-file",1215944857,null),G__13661)){
return replumb.repl.process_load_file.call(null,opts,cb,data,argument);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"source","source",1206599988,null),G__13661)){
return replumb.repl.process_source.call(null,opts,cb,data,argument);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"doc","doc",-741138878,null),G__13661)){
return replumb.repl.process_doc.call(null,opts,cb,data,argument);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"in-ns","in-ns",-2089468466,null),G__13661)){
return replumb.repl.process_in_ns.call(null,opts,cb,data,argument);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"require","require",1172530194,null),G__13661)){
return replumb.repl.process_require.call(null,opts,cb,data,new cljs.core.Keyword(null,"require","require",-468001333),cljs.core.rest.call(null,expression_form));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"apropos","apropos",-1511857537,null),G__13661)){
return replumb.repl.process_apropos.call(null,opts,cb,data,argument);
} else {
throw (new Error([cljs.core.str("No matching clause: "),cljs.core.str(cljs.core.first.call(null,expression_form))].join('')));

}
}
}
}
}
}
}
}
}
}
}
});
replumb.repl.init_option_set = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603),null,new cljs.core.Keyword(null,"init-fn!","init-fn!",-986163042),null], null), null);
/**
 * If we are not already :initializing? and :needs-init? is true, then
 *   move to the "Initializing" state, signaling that the init is in
 *   progress.
 */
replumb.repl.initializing_state = (function replumb$repl$initializing_state(old_app_env){
if(cljs.core.truth_((function (){var and__6685__auto__ = cljs.core.not.call(null,new cljs.core.Keyword(null,"initializing?","initializing?",111659212).cljs$core$IFn$_invoke$arity$1(old_app_env));
if(and__6685__auto__){
return new cljs.core.Keyword(null,"needs-init?","needs-init?",1016438963).cljs$core$IFn$_invoke$arity$1(old_app_env);
} else {
return and__6685__auto__;
}
})())){
return cljs.core.assoc.call(null,old_app_env,new cljs.core.Keyword(null,"initializing?","initializing?",111659212),true);
} else {
return cljs.core.assoc.call(null,old_app_env,new cljs.core.Keyword(null,"needs-init?","needs-init?",1016438963),false);
}
});
/**
 * Move the state to "Initialized", signaling that the init is not in
 *   progress and done.
 */
replumb.repl.initialized_state = (function replumb$repl$initialized_state(old_app_env){
if(cljs.core.truth_(new cljs.core.Keyword(null,"needs-init?","needs-init?",1016438963).cljs$core$IFn$_invoke$arity$1(old_app_env))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Keyword(null,"needs-init?","needs-init?",1016438963),new cljs.core.Symbol(null,"old-app-env","old-app-env",-1736369236,null))))].join('')));
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"initializing?","initializing?",111659212).cljs$core$IFn$_invoke$arity$1(old_app_env))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Keyword(null,"initializing?","initializing?",111659212),new cljs.core.Symbol(null,"old-app-env","old-app-env",-1736369236,null))))].join('')));
}

return cljs.core.merge.call(null,old_app_env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"initializing?","initializing?",111659212),false,new cljs.core.Keyword(null,"needs-init?","needs-init?",1016438963),false], null));
});
/**
 * Just assoc the options to persist to the input map.
 */
replumb.repl.auto_init_opts = (function replumb$repl$auto_init_opts(opts){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.filter.call(null,(function (p1__13662_SHARP_){
return replumb.repl.init_option_set.call(null,cljs.core.first.call(null,p1__13662_SHARP_));
}),opts));
});
/**
 * Reset the initialization state, moving to "Needs Init", signaling
 *   that the we need to initialize the app.
 */
replumb.repl.needs_init_state = (function replumb$repl$needs_init_state(old_app_env){
return cljs.core.merge.call(null,old_app_env,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"initializing?","initializing?",111659212),false,new cljs.core.Keyword(null,"needs-init?","needs-init?",1016438963),true], null));
});
/**
 * Update the :previous-auto-init-opts and, if necessary, also
 *   turns :needs-init? to true, concretely deciding whether when need to
 *   initialise again. Move the state to "Needs Init".
 */
replumb.repl.needs_init_from_opts_state = (function replumb$repl$needs_init_from_opts_state(old_app_env,new_opts){
if(!(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"previous-init-opts","previous-init-opts",974753543).cljs$core$IFn$_invoke$arity$1(old_app_env),replumb.repl.auto_init_opts.call(null,new_opts)))){
return replumb.repl.needs_init_state.call(null,old_app_env);
} else {
return old_app_env;
}
});
/**
 * Force the initialization at the next read-eval-call. Use this every
 *   time an option that needs to be read at initialization time changes,
 *   e.g. :source-path. In the future this will be automated.
 */
replumb.repl.force_init_BANG_ = (function replumb$repl$force_init_BANG_(){
return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,replumb.repl.needs_init_state);
});
/**
 * Persist the options necessary to the initialization FSM to work.
 */
replumb.repl.persist_init_opts_BANG_ = (function replumb$repl$persist_init_opts_BANG_(opts){
return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"previous-init-opts","previous-init-opts",974753543),replumb.repl.auto_init_opts.call(null,opts));
});
/**
 * Reset the initialization persisted options.
 */
replumb.repl.reset_init_opts_BANG_ = (function replumb$repl$reset_init_opts_BANG_(){
return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"previous-init-opts","previous-init-opts",974753543),cljs.core.PersistentArrayMap.EMPTY);
});
/**
 * Create and swap in app-env a map from Google Closure provide string
 *   to their respective path (without extension).  It merges with the
 *   current map if many deps.js are on the source path, precedence to the
 *   last (as per merge).
 */
replumb.repl.init_closure_index_BANG_ = (function replumb$repl$init_closure_index_BANG_(opts){
var verbose_QMARK_ = new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts);
var read_file_BANG_ = new cljs.core.Keyword(null,"read-file-fn!","read-file-fn!",-492428191).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(read_file_BANG_)){
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.call(null,"Discovering goog/deps.js in",new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603).cljs$core$IFn$_invoke$arity$1(opts));
} else {
}

var seq__13667 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"src-paths","src-paths",-1052057603).cljs$core$IFn$_invoke$arity$1(opts));
var chunk__13668 = null;
var count__13669 = (0);
var i__13670 = (0);
while(true){
if((i__13670 < count__13669)){
var path = cljs.core._nth.call(null,chunk__13668,i__13670);
var goog_deps_path_13671 = [cljs.core.str(replumb.common.normalize_path.call(null,path)),cljs.core.str("goog/deps.js")].join('');
read_file_BANG_.call(null,goog_deps_path_13671,((function (seq__13667,chunk__13668,count__13669,i__13670,goog_deps_path_13671,path,verbose_QMARK_,read_file_BANG_){
return (function (content){
if(cljs.core.truth_(content)){
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.call(null,"Found valid",goog_deps_path_13671);
} else {
}

return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.update,new cljs.core.Keyword(null,"goog-provide->path","goog-provide->path",-1147669071),cljs.core.merge,replumb.repl.goog_deps_map.call(null,content));
} else {
return null;
}
});})(seq__13667,chunk__13668,count__13669,i__13670,goog_deps_path_13671,path,verbose_QMARK_,read_file_BANG_))
);

var G__13672 = seq__13667;
var G__13673 = chunk__13668;
var G__13674 = count__13669;
var G__13675 = (i__13670 + (1));
seq__13667 = G__13672;
chunk__13668 = G__13673;
count__13669 = G__13674;
i__13670 = G__13675;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13667);
if(temp__4657__auto__){
var seq__13667__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13667__$1)){
var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__13667__$1);
var G__13676 = cljs.core.chunk_rest.call(null,seq__13667__$1);
var G__13677 = c__7500__auto__;
var G__13678 = cljs.core.count.call(null,c__7500__auto__);
var G__13679 = (0);
seq__13667 = G__13676;
chunk__13668 = G__13677;
count__13669 = G__13678;
i__13670 = G__13679;
continue;
} else {
var path = cljs.core.first.call(null,seq__13667__$1);
var goog_deps_path_13680 = [cljs.core.str(replumb.common.normalize_path.call(null,path)),cljs.core.str("goog/deps.js")].join('');
read_file_BANG_.call(null,goog_deps_path_13680,((function (seq__13667,chunk__13668,count__13669,i__13670,goog_deps_path_13680,path,seq__13667__$1,temp__4657__auto__,verbose_QMARK_,read_file_BANG_){
return (function (content){
if(cljs.core.truth_(content)){
if(cljs.core.truth_(verbose_QMARK_)){
replumb.common.debug_prn.call(null,"Found valid",goog_deps_path_13680);
} else {
}

return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.update,new cljs.core.Keyword(null,"goog-provide->path","goog-provide->path",-1147669071),cljs.core.merge,replumb.repl.goog_deps_map.call(null,content));
} else {
return null;
}
});})(seq__13667,chunk__13668,count__13669,i__13670,goog_deps_path_13680,path,seq__13667__$1,temp__4657__auto__,verbose_QMARK_,read_file_BANG_))
);

var G__13681 = cljs.core.next.call(null,seq__13667__$1);
var G__13682 = null;
var G__13683 = (0);
var G__13684 = (0);
seq__13667 = G__13681;
chunk__13668 = G__13682;
count__13669 = G__13683;
i__13670 = G__13684;
continue;
}
} else {
return null;
}
}
break;
}
} else {
if(cljs.core.truth_(verbose_QMARK_)){
return replumb.common.debug_prn.call(null,"No :read-file-fn! provided, skipping goog/deps.js discovering...");
} else {
return null;
}
}
});
/**
 * The init-repl function. It uses the following opts keys:
 * 
 *   * :init-fns initialization function vector, it will be executed in
 *   order
 * 
 *   Data is passed from outside and will be forwarded to :init-fn!.
 */
replumb.repl.init_repl_BANG_ = (function replumb$repl$init_repl_BANG_(opts,data){
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.call(null,"Initializing REPL environment with data",(function (){var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_13691_13697 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_13692_13698 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_13691_13697,_STAR_print_fn_STAR_13692_13698,sb__7671__auto__){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_13691_13697,_STAR_print_fn_STAR_13692_13698,sb__7671__auto__))
;

try{cljs.pprint.pprint.call(null,data);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_13692_13698;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_13691_13697;
}
return [cljs.core.str(sb__7671__auto__)].join('');
})());
} else {
}

var init_fns_13699 = new cljs.core.Keyword(null,"init-fns","init-fns",1169633539).cljs$core$IFn$_invoke$arity$1(opts);
if((cljs.core.count.call(null,init_fns_13699) > (0))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,">",">",1085014381,null),cljs.core.list(new cljs.core.Symbol(null,"count","count",-514511684,null),new cljs.core.Symbol(null,"init-fns","init-fns",-1484802230,null)),(0))))].join('')));
}

var seq__13693_13700 = cljs.core.seq.call(null,init_fns_13699);
var chunk__13694_13701 = null;
var count__13695_13702 = (0);
var i__13696_13703 = (0);
while(true){
if((i__13696_13703 < count__13695_13702)){
var init_fn_BANG__13704 = cljs.core._nth.call(null,chunk__13694_13701,i__13696_13703);
init_fn_BANG__13704.call(null,data);

var G__13705 = seq__13693_13700;
var G__13706 = chunk__13694_13701;
var G__13707 = count__13695_13702;
var G__13708 = (i__13696_13703 + (1));
seq__13693_13700 = G__13705;
chunk__13694_13701 = G__13706;
count__13695_13702 = G__13707;
i__13696_13703 = G__13708;
continue;
} else {
var temp__4657__auto___13709 = cljs.core.seq.call(null,seq__13693_13700);
if(temp__4657__auto___13709){
var seq__13693_13710__$1 = temp__4657__auto___13709;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13693_13710__$1)){
var c__7500__auto___13711 = cljs.core.chunk_first.call(null,seq__13693_13710__$1);
var G__13712 = cljs.core.chunk_rest.call(null,seq__13693_13710__$1);
var G__13713 = c__7500__auto___13711;
var G__13714 = cljs.core.count.call(null,c__7500__auto___13711);
var G__13715 = (0);
seq__13693_13700 = G__13712;
chunk__13694_13701 = G__13713;
count__13695_13702 = G__13714;
i__13696_13703 = G__13715;
continue;
} else {
var init_fn_BANG__13716 = cljs.core.first.call(null,seq__13693_13710__$1);
init_fn_BANG__13716.call(null,data);

var G__13717 = cljs.core.next.call(null,seq__13693_13710__$1);
var G__13718 = null;
var G__13719 = (0);
var G__13720 = (0);
seq__13693_13700 = G__13717;
chunk__13694_13701 = G__13718;
count__13695_13702 = G__13719;
i__13696_13703 = G__13720;
continue;
}
} else {
}
}
break;
}

replumb.repl.init_closure_index_BANG_.call(null,opts);

return replumb.repl.persist_init_opts_BANG_.call(null,opts);
});
replumb.repl.init_repl_if_necessary_BANG_ = (function replumb$repl$init_repl_if_necessary_BANG_(opts,data){
if(cljs.core.truth_(new cljs.core.Keyword(null,"needs-init?","needs-init?",1016438963).cljs$core$IFn$_invoke$arity$1(cljs.core.swap_BANG_.call(null,replumb.repl.app_env,(function (p1__13721_SHARP_){
return replumb.repl.initializing_state.call(null,replumb.repl.needs_init_from_opts_state.call(null,p1__13721_SHARP_,opts));
}))))){
replumb.repl.init_repl_BANG_.call(null,opts,data);

return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,replumb.repl.initialized_state);
} else {
return null;
}
});
/**
 * Reads, evaluates and calls back with the evaluation result.
 * 
 *   The first parameter is a map of configuration options, currently
 *   supporting:
 * 
 *   * :verbose - will enable the evaluation logging, defaults to false.
 *   To customize how to print, use (set! *print-fn* (fn [& args] ...)
 * 
 *   * :warning-as-error - will consider a compiler warning as error
 *   * :target - :nodejs and :browser supported, the latter is used if
 *   missing
 *   * :init-fn! - user provided initialization function, it will be passed
 *   a map of data currently containing:
 * 
 *    :form   ;; the form to evaluate, as data, past the reader step
 *    :ns     ;; the current namespace, as symbol
 *    :target ;; *target* as keyword, :default is the default
 * 
 *   * :load-fn! - will override replumb's default cljs.js/*load-fn*.
 *   It rules out :read-file-fn!, losing any perk of using replumb.load
 *   helpers. Use it if you know what you are doing.
 * 
 *   * :read-file-fn! an asynchronous 2-arity function with signature
 *   [file-path src-cb] where src-cb is itself a function (fn [source] ...)
 *   that needs to be called with the file content as string (nil if no
 *   file is found). It is mutually exclusive with :load-fn! and will be
 *   ignored in case both are present
 * 
 *   * :write-file-fn! a synchronous 2-arity function with signature
 *   [file-path data] that accepts a file-path and data to write.
 * 
 *   * :src-paths - a vector of paths containing source files
 * 
 *   * :cache - a map containing two optional values: the first, :path, indicates
 *   the path of the cached files. The second, :src-paths-lookup?, indicates
 *   if look for cached files in :src-paths. If both present, :path will have
 *   the priority but both will be inspected.
 * 
 *   * :no-pr-str-on-value - in case of :success? avoid converting the
 *   result map :value to string
 * 
 *   * :context - indicates the evaluation context that will be passed to
 *   cljs/eval-str. Defaults to :expr.
 * 
 *   * :foreign-libs - a way to include foreign libraries. The format is analogous
 *   to the compiler option. For more info visit https://github.com/clojure/clojurescript/wiki/Compiler-Options#foreign-libs
 * 
 *   The second parameter cb, is a 1-arity function which receives the
 *   result map.
 * 
 *   Therefore, given cb (fn [result-map] ...), the main map keys are:
 * 
 *   :success? - a boolean indicating if everything went right
 *   :value    - (if (:success? result)), this key contains the yielded value as
 *            string, unless :no-pr-str-on-value is true, in which case it
 *            returns the bare value.
 *   :error    - (if-not (:success? result)) will contain a js/Error
 *   :warning  - in case a warning was thrown and :warning-as-error is falsey
 *   :form     - the evaluated form as data structure (not a string)
 * 
 *   The third parameter is the source string to be read and evaluated.
 * 
 *   It initializes the repl harness either on first execution or if an
 *   option in #{:src-paths :init-fn!} changes from the previous
 *   read-eval-call.
 */
replumb.repl.read_eval_call = (function replumb$repl$read_eval_call(opts,cb,source){
try{var expression_form = replumb.repl.read_string.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"read-cond","read-cond",1056899244),new cljs.core.Keyword(null,"allow","allow",-1857325745),new cljs.core.Keyword(null,"features","features",-1146962336),new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs","cljs",1492417629),null], null), null)], null),source);
var opts__$1 = replumb.repl.normalize_opts.call(null,opts);
var data = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"form","form",-1624062471),expression_form,new cljs.core.Keyword(null,"ns","ns",441598760),new cljs.core.Keyword(null,"current-ns","current-ns",1661653428).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,replumb.repl.app_env)),new cljs.core.Keyword(null,"target","target",253001721),cljs.core.keyword.call(null,cljs.core._STAR_target_STAR_)], null);
replumb.repl.init_repl_if_necessary_BANG_.call(null,opts__$1,data);

if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts__$1))){
replumb.common.debug_prn.call(null,"Calling eval-str on",expression_form,"with options",replumb.common.filter_fn_keys.call(null,opts__$1));
} else {
}

var _STAR_cljs_warning_handlers_STAR_13725 = cljs.analyzer._STAR_cljs_warning_handlers_STAR_;
cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.partial.call(null,replumb.repl.custom_warning_handler,opts__$1,cb)], null);

try{if(cljs.core.truth_(replumb.repl.repl_special_QMARK_.call(null,expression_form))){
return replumb.repl.process_repl_special.call(null,opts__$1,cb,data,expression_form);
} else {
return replumb.repl.eval_str_STAR_.call(null,cljs.core.assoc.call(null,replumb.repl.base_eval_opts_BANG_.call(null,opts__$1),new cljs.core.Keyword(null,"on-success-fn!","on-success-fn!",461991357),((function (_STAR_cljs_warning_handlers_STAR_13725,expression_form,opts__$1,data){
return (function (eval_res){
replumb.repl.process_1_2_3.call(null,data,expression_form,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(eval_res));

return cljs.core.swap_BANG_.call(null,replumb.repl.app_env,cljs.core.assoc,new cljs.core.Keyword(null,"current-ns","current-ns",1661653428),new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(eval_res));
});})(_STAR_cljs_warning_handlers_STAR_13725,expression_form,opts__$1,data))
),opts__$1,cb,data,source);
}
}finally {cljs.analyzer._STAR_cljs_warning_handlers_STAR_ = _STAR_cljs_warning_handlers_STAR_13725;
}}catch (e13724){var e = e13724;
if(cljs.core.truth_(new cljs.core.Keyword(null,"verbose","verbose",1694226060).cljs$core$IFn$_invoke$arity$1(opts))){
replumb.common.debug_prn.call(null,"Exception caught in read-eval-call: ",e.stack);
} else {
}

return replumb.repl.call_back_BANG_.call(null,opts,cb,cljs.core.PersistentArrayMap.EMPTY,replumb.common.wrap_error.call(null,e));
}});
/**
 * It does the following (in order):
 * 
 *   1. in-ns to cljs.user
 *   2. remove the input namespaces from the compiler environment
 *   3. reset the last warning
 *   4. set *e to nil
 * 
 *   It accepts a sequence of symbols or strings.
 */
replumb.repl.reset_env_BANG_ = (function replumb$repl$reset_env_BANG_(var_args){
var args13726 = [];
var len__7755__auto___13733 = arguments.length;
var i__7756__auto___13734 = (0);
while(true){
if((i__7756__auto___13734 < len__7755__auto___13733)){
args13726.push((arguments[i__7756__auto___13734]));

var G__13735 = (i__7756__auto___13734 + (1));
i__7756__auto___13734 = G__13735;
continue;
} else {
}
break;
}

var G__13728 = args13726.length;
switch (G__13728) {
case 0:
return replumb.repl.reset_env_BANG_.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return replumb.repl.reset_env_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.repl.reset_env_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args13726.length)].join('')));

}
});

replumb.repl.reset_env_BANG_.cljs$core$IFn$_invoke$arity$0 = (function (){
return replumb.repl.reset_env_BANG_.call(null,null);
});

replumb.repl.reset_env_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (opts){
return replumb.repl.reset_env_BANG_.call(null,opts,null);
});

replumb.repl.reset_env_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (opts,namespaces){
replumb.repl.read_eval_call.call(null,opts,cljs.core.identity,"(in-ns 'cljs.user)");

var seq__13729_13737 = cljs.core.seq.call(null,namespaces);
var chunk__13730_13738 = null;
var count__13731_13739 = (0);
var i__13732_13740 = (0);
while(true){
if((i__13732_13740 < count__13731_13739)){
var ns_13741 = cljs.core._nth.call(null,chunk__13730_13738,i__13732_13740);
replumb.repl.purge_ns_BANG_.call(null,replumb.repl.st,cljs.core.symbol.call(null,ns_13741));

replumb.repl.purge_ns_BANG_.call(null,replumb.repl.st,cljs.core.symbol.call(null,[cljs.core.str(ns_13741),cljs.core.str("$macros")].join('')));

var G__13742 = seq__13729_13737;
var G__13743 = chunk__13730_13738;
var G__13744 = count__13731_13739;
var G__13745 = (i__13732_13740 + (1));
seq__13729_13737 = G__13742;
chunk__13730_13738 = G__13743;
count__13731_13739 = G__13744;
i__13732_13740 = G__13745;
continue;
} else {
var temp__4657__auto___13746 = cljs.core.seq.call(null,seq__13729_13737);
if(temp__4657__auto___13746){
var seq__13729_13747__$1 = temp__4657__auto___13746;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13729_13747__$1)){
var c__7500__auto___13748 = cljs.core.chunk_first.call(null,seq__13729_13747__$1);
var G__13749 = cljs.core.chunk_rest.call(null,seq__13729_13747__$1);
var G__13750 = c__7500__auto___13748;
var G__13751 = cljs.core.count.call(null,c__7500__auto___13748);
var G__13752 = (0);
seq__13729_13737 = G__13749;
chunk__13730_13738 = G__13750;
count__13731_13739 = G__13751;
i__13732_13740 = G__13752;
continue;
} else {
var ns_13753 = cljs.core.first.call(null,seq__13729_13747__$1);
replumb.repl.purge_ns_BANG_.call(null,replumb.repl.st,cljs.core.symbol.call(null,ns_13753));

replumb.repl.purge_ns_BANG_.call(null,replumb.repl.st,cljs.core.symbol.call(null,[cljs.core.str(ns_13753),cljs.core.str("$macros")].join('')));

var G__13754 = cljs.core.next.call(null,seq__13729_13747__$1);
var G__13755 = null;
var G__13756 = (0);
var G__13757 = (0);
seq__13729_13737 = G__13754;
chunk__13730_13738 = G__13755;
count__13731_13739 = G__13756;
i__13732_13740 = G__13757;
continue;
}
} else {
}
}
break;
}

if(cljs.core.seq.call(null,cljs.core.deref.call(null,cljs.js._STAR_loaded_STAR_))){
throw cljs.core.ex_info.call(null,[cljs.core.str("The cljs.js/*loaded* atom still contains "),cljs.core.str(cljs.core.deref.call(null,cljs.js._STAR_loaded_STAR_)),cljs.core.str(" - make sure you purge dependent namespaces.")].join(''),replumb.repl.ex_info_data);
} else {
}

replumb.repl.reset_last_warning_BANG_.call(null);

replumb.repl.read_eval_call.call(null,opts,cljs.core.identity,"(set! *e nil)");

return replumb.repl.reset_init_opts_BANG_.call(null);
});

replumb.repl.reset_env_BANG_.cljs$lang$maxFixedArity = 2;

//# sourceMappingURL=repl.js.map