goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__10376__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__10376 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10377__i = 0, G__10377__a = new Array(arguments.length -  0);
while (G__10377__i < G__10377__a.length) {G__10377__a[G__10377__i] = arguments[G__10377__i + 0]; ++G__10377__i;}
  args = new cljs.core.IndexedSeq(G__10377__a,0);
} 
return G__10376__delegate.call(this,args);};
G__10376.cljs$lang$maxFixedArity = 0;
G__10376.cljs$lang$applyTo = (function (arglist__10378){
var args = cljs.core.seq(arglist__10378);
return G__10376__delegate(args);
});
G__10376.cljs$core$IFn$_invoke$arity$variadic = G__10376__delegate;
return G__10376;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__10379__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__10379 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10380__i = 0, G__10380__a = new Array(arguments.length -  0);
while (G__10380__i < G__10380__a.length) {G__10380__a[G__10380__i] = arguments[G__10380__i + 0]; ++G__10380__i;}
  args = new cljs.core.IndexedSeq(G__10380__a,0);
} 
return G__10379__delegate.call(this,args);};
G__10379.cljs$lang$maxFixedArity = 0;
G__10379.cljs$lang$applyTo = (function (arglist__10381){
var args = cljs.core.seq(arglist__10381);
return G__10379__delegate(args);
});
G__10379.cljs$core$IFn$_invoke$arity$variadic = G__10379__delegate;
return G__10379;
})()
;

return null;
});
