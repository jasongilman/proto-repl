goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__10354__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__10354 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10355__i = 0, G__10355__a = new Array(arguments.length -  0);
while (G__10355__i < G__10355__a.length) {G__10355__a[G__10355__i] = arguments[G__10355__i + 0]; ++G__10355__i;}
  args = new cljs.core.IndexedSeq(G__10355__a,0);
} 
return G__10354__delegate.call(this,args);};
G__10354.cljs$lang$maxFixedArity = 0;
G__10354.cljs$lang$applyTo = (function (arglist__10356){
var args = cljs.core.seq(arglist__10356);
return G__10354__delegate(args);
});
G__10354.cljs$core$IFn$_invoke$arity$variadic = G__10354__delegate;
return G__10354;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__10357__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__10357 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10358__i = 0, G__10358__a = new Array(arguments.length -  0);
while (G__10358__i < G__10358__a.length) {G__10358__a[G__10358__i] = arguments[G__10358__i + 0]; ++G__10358__i;}
  args = new cljs.core.IndexedSeq(G__10358__a,0);
} 
return G__10357__delegate.call(this,args);};
G__10357.cljs$lang$maxFixedArity = 0;
G__10357.cljs$lang$applyTo = (function (arglist__10359){
var args = cljs.core.seq(arglist__10359);
return G__10357__delegate(args);
});
G__10357.cljs$core$IFn$_invoke$arity$variadic = G__10357__delegate;
return G__10357;
})()
;

return null;
});
