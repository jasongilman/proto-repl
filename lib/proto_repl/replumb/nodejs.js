// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('replumb.nodejs');
goog.require('cljs.core');
replumb.nodejs.init_fn_BANG_ = (function replumb$nodejs$init_fn_BANG_(){
global.cljs.user = {};

goog.isProvided_ = function(x) { return false; };;

goog.require = (function (name){
return CLOSURE_IMPORT_SCRIPT((goog.dependencies_.nameToPath[name]));
});

cljs.core._STAR_loaded_libs_STAR_ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["cljs.core",null], null), null);

return goog.require = (function (name,reload){
if(cljs.core.truth_((function (){var or__6697__auto__ = !(cljs.core.contains_QMARK_.call(null,cljs.core._STAR_loaded_libs_STAR_,name));
if(or__6697__auto__){
return or__6697__auto__;
} else {
return reload;
}
})())){
cljs.core._STAR_loaded_libs_STAR_ = cljs.core.conj.call(null,(function (){var or__6697__auto__ = cljs.core._STAR_loaded_libs_STAR_;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core.PersistentHashSet.EMPTY;
}
})(),name);

return CLOSURE_IMPORT_SCRIPT((goog.dependencies_.nameToPath[name]));
} else {
return null;
}
});
});
/**
 * Node.js default set of options for read-eval-call.
 *   It is intentionally missing :load-fn! that will need to be added
 *   before calling read-eval-call. See nodejs-opts.
 */
replumb.nodejs.default_opts = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"target","target",253001721),new cljs.core.Keyword(null,"nodejs","nodejs",321212524),new cljs.core.Keyword(null,"init-fns","init-fns",1169633539),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [replumb.nodejs.init_fn_BANG_], null)], null);

//# sourceMappingURL=nodejs.js.map