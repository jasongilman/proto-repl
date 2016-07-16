goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__10335__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__10335 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10336__i = 0, G__10336__a = new Array(arguments.length -  0);
while (G__10336__i < G__10336__a.length) {G__10336__a[G__10336__i] = arguments[G__10336__i + 0]; ++G__10336__i;}
  args = new cljs.core.IndexedSeq(G__10336__a,0);
} 
return G__10335__delegate.call(this,args);};
G__10335.cljs$lang$maxFixedArity = 0;
G__10335.cljs$lang$applyTo = (function (arglist__10337){
var args = cljs.core.seq(arglist__10337);
return G__10335__delegate(args);
});
G__10335.cljs$core$IFn$_invoke$arity$variadic = G__10335__delegate;
return G__10335;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__10338__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__10338 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10339__i = 0, G__10339__a = new Array(arguments.length -  0);
while (G__10339__i < G__10339__a.length) {G__10339__a[G__10339__i] = arguments[G__10339__i + 0]; ++G__10339__i;}
  args = new cljs.core.IndexedSeq(G__10339__a,0);
} 
return G__10338__delegate.call(this,args);};
G__10338.cljs$lang$maxFixedArity = 0;
G__10338.cljs$lang$applyTo = (function (arglist__10340){
var args = cljs.core.seq(arglist__10340);
return G__10338__delegate(args);
});
G__10338.cljs$core$IFn$_invoke$arity$variadic = G__10338__delegate;
return G__10338;
})()
;

return null;
});
