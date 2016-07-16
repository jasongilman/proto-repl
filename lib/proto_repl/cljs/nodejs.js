// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__14154__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__14154 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14155__i = 0, G__14155__a = new Array(arguments.length -  0);
while (G__14155__i < G__14155__a.length) {G__14155__a[G__14155__i] = arguments[G__14155__i + 0]; ++G__14155__i;}
  args = new cljs.core.IndexedSeq(G__14155__a,0);
} 
return G__14154__delegate.call(this,args);};
G__14154.cljs$lang$maxFixedArity = 0;
G__14154.cljs$lang$applyTo = (function (arglist__14156){
var args = cljs.core.seq(arglist__14156);
return G__14154__delegate(args);
});
G__14154.cljs$core$IFn$_invoke$arity$variadic = G__14154__delegate;
return G__14154;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__14157__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__14157 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__14158__i = 0, G__14158__a = new Array(arguments.length -  0);
while (G__14158__i < G__14158__a.length) {G__14158__a[G__14158__i] = arguments[G__14158__i + 0]; ++G__14158__i;}
  args = new cljs.core.IndexedSeq(G__14158__a,0);
} 
return G__14157__delegate.call(this,args);};
G__14157.cljs$lang$maxFixedArity = 0;
G__14157.cljs$lang$applyTo = (function (arglist__14159){
var args = cljs.core.seq(arglist__14159);
return G__14157__delegate(args);
});
G__14157.cljs$core$IFn$_invoke$arity$variadic = G__14157__delegate;
return G__14157;
})()
;

return null;
});

//# sourceMappingURL=nodejs.js.map