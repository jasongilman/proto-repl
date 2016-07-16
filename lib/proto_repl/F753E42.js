goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__10358__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__10358 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10359__i = 0, G__10359__a = new Array(arguments.length -  0);
while (G__10359__i < G__10359__a.length) {G__10359__a[G__10359__i] = arguments[G__10359__i + 0]; ++G__10359__i;}
  args = new cljs.core.IndexedSeq(G__10359__a,0);
} 
return G__10358__delegate.call(this,args);};
G__10358.cljs$lang$maxFixedArity = 0;
G__10358.cljs$lang$applyTo = (function (arglist__10360){
var args = cljs.core.seq(arglist__10360);
return G__10358__delegate(args);
});
G__10358.cljs$core$IFn$_invoke$arity$variadic = G__10358__delegate;
return G__10358;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__10361__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__10361 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10362__i = 0, G__10362__a = new Array(arguments.length -  0);
while (G__10362__i < G__10362__a.length) {G__10362__a[G__10362__i] = arguments[G__10362__i + 0]; ++G__10362__i;}
  args = new cljs.core.IndexedSeq(G__10362__a,0);
} 
return G__10361__delegate.call(this,args);};
G__10361.cljs$lang$maxFixedArity = 0;
G__10361.cljs$lang$applyTo = (function (arglist__10363){
var args = cljs.core.seq(arglist__10363);
return G__10361__delegate(args);
});
G__10361.cljs$core$IFn$_invoke$arity$variadic = G__10361__delegate;
return G__10361;
})()
;

return null;
});
