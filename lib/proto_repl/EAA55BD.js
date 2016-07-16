goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__10362__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__10362 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10363__i = 0, G__10363__a = new Array(arguments.length -  0);
while (G__10363__i < G__10363__a.length) {G__10363__a[G__10363__i] = arguments[G__10363__i + 0]; ++G__10363__i;}
  args = new cljs.core.IndexedSeq(G__10363__a,0);
} 
return G__10362__delegate.call(this,args);};
G__10362.cljs$lang$maxFixedArity = 0;
G__10362.cljs$lang$applyTo = (function (arglist__10364){
var args = cljs.core.seq(arglist__10364);
return G__10362__delegate(args);
});
G__10362.cljs$core$IFn$_invoke$arity$variadic = G__10362__delegate;
return G__10362;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__10365__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__10365 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10366__i = 0, G__10366__a = new Array(arguments.length -  0);
while (G__10366__i < G__10366__a.length) {G__10366__a[G__10366__i] = arguments[G__10366__i + 0]; ++G__10366__i;}
  args = new cljs.core.IndexedSeq(G__10366__a,0);
} 
return G__10365__delegate.call(this,args);};
G__10365.cljs$lang$maxFixedArity = 0;
G__10365.cljs$lang$applyTo = (function (arglist__10367){
var args = cljs.core.seq(arglist__10367);
return G__10365__delegate(args);
});
G__10365.cljs$core$IFn$_invoke$arity$variadic = G__10365__delegate;
return G__10365;
})()
;

return null;
});
