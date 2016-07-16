goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__9215__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__9215 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9216__i = 0, G__9216__a = new Array(arguments.length -  0);
while (G__9216__i < G__9216__a.length) {G__9216__a[G__9216__i] = arguments[G__9216__i + 0]; ++G__9216__i;}
  args = new cljs.core.IndexedSeq(G__9216__a,0);
} 
return G__9215__delegate.call(this,args);};
G__9215.cljs$lang$maxFixedArity = 0;
G__9215.cljs$lang$applyTo = (function (arglist__9217){
var args = cljs.core.seq(arglist__9217);
return G__9215__delegate(args);
});
G__9215.cljs$core$IFn$_invoke$arity$variadic = G__9215__delegate;
return G__9215;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__9218__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__9218 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__9219__i = 0, G__9219__a = new Array(arguments.length -  0);
while (G__9219__i < G__9219__a.length) {G__9219__a[G__9219__i] = arguments[G__9219__i + 0]; ++G__9219__i;}
  args = new cljs.core.IndexedSeq(G__9219__a,0);
} 
return G__9218__delegate.call(this,args);};
G__9218.cljs$lang$maxFixedArity = 0;
G__9218.cljs$lang$applyTo = (function (arglist__9220){
var args = cljs.core.seq(arglist__9220);
return G__9218__delegate(args);
});
G__9218.cljs$core$IFn$_invoke$arity$variadic = G__9218__delegate;
return G__9218;
})()
;

return null;
});
