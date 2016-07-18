goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__10383__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__10383 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10384__i = 0, G__10384__a = new Array(arguments.length -  0);
while (G__10384__i < G__10384__a.length) {G__10384__a[G__10384__i] = arguments[G__10384__i + 0]; ++G__10384__i;}
  args = new cljs.core.IndexedSeq(G__10384__a,0);
} 
return G__10383__delegate.call(this,args);};
G__10383.cljs$lang$maxFixedArity = 0;
G__10383.cljs$lang$applyTo = (function (arglist__10385){
var args = cljs.core.seq(arglist__10385);
return G__10383__delegate(args);
});
G__10383.cljs$core$IFn$_invoke$arity$variadic = G__10383__delegate;
return G__10383;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__10386__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__10386 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10387__i = 0, G__10387__a = new Array(arguments.length -  0);
while (G__10387__i < G__10387__a.length) {G__10387__a[G__10387__i] = arguments[G__10387__i + 0]; ++G__10387__i;}
  args = new cljs.core.IndexedSeq(G__10387__a,0);
} 
return G__10386__delegate.call(this,args);};
G__10386.cljs$lang$maxFixedArity = 0;
G__10386.cljs$lang$applyTo = (function (arglist__10388){
var args = cljs.core.seq(arglist__10388);
return G__10386__delegate(args);
});
G__10386.cljs$core$IFn$_invoke$arity$variadic = G__10386__delegate;
return G__10386;
})()
;

return null;
});
