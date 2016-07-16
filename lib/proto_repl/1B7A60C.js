goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__11703__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__11703 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__11704__i = 0, G__11704__a = new Array(arguments.length -  0);
while (G__11704__i < G__11704__a.length) {G__11704__a[G__11704__i] = arguments[G__11704__i + 0]; ++G__11704__i;}
  args = new cljs.core.IndexedSeq(G__11704__a,0);
} 
return G__11703__delegate.call(this,args);};
G__11703.cljs$lang$maxFixedArity = 0;
G__11703.cljs$lang$applyTo = (function (arglist__11705){
var args = cljs.core.seq(arglist__11705);
return G__11703__delegate(args);
});
G__11703.cljs$core$IFn$_invoke$arity$variadic = G__11703__delegate;
return G__11703;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__11706__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__11706 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__11707__i = 0, G__11707__a = new Array(arguments.length -  0);
while (G__11707__i < G__11707__a.length) {G__11707__a[G__11707__i] = arguments[G__11707__i + 0]; ++G__11707__i;}
  args = new cljs.core.IndexedSeq(G__11707__a,0);
} 
return G__11706__delegate.call(this,args);};
G__11706.cljs$lang$maxFixedArity = 0;
G__11706.cljs$lang$applyTo = (function (arglist__11708){
var args = cljs.core.seq(arglist__11708);
return G__11706__delegate(args);
});
G__11706.cljs$core$IFn$_invoke$arity$variadic = G__11706__delegate;
return G__11706;
})()
;

return null;
});
