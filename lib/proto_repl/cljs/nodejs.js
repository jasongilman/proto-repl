// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__14197__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__14197 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14198__i = 0, G__14198__a = new Array(arguments.length -  0);
while (G__14198__i < G__14198__a.length) {G__14198__a[G__14198__i] = arguments[G__14198__i + 0]; ++G__14198__i;}
  args = new cljs.core.IndexedSeq(G__14198__a,0);
} 
return G__14197__delegate.call(this,args);};
G__14197.cljs$lang$maxFixedArity = 0;
G__14197.cljs$lang$applyTo = (function (arglist__14199){
var args = cljs.core.seq(arglist__14199);
return G__14197__delegate(args);
});
G__14197.cljs$core$IFn$_invoke$arity$variadic = G__14197__delegate;
return G__14197;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__14200__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__14200 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14201__i = 0, G__14201__a = new Array(arguments.length -  0);
while (G__14201__i < G__14201__a.length) {G__14201__a[G__14201__i] = arguments[G__14201__i + 0]; ++G__14201__i;}
  args = new cljs.core.IndexedSeq(G__14201__a,0);
} 
return G__14200__delegate.call(this,args);};
G__14200.cljs$lang$maxFixedArity = 0;
G__14200.cljs$lang$applyTo = (function (arglist__14202){
var args = cljs.core.seq(arglist__14202);
return G__14200__delegate(args);
});
G__14200.cljs$core$IFn$_invoke$arity$variadic = G__14200__delegate;
return G__14200;
})()
;

return null;
});

//# sourceMappingURL=nodejs.js.map