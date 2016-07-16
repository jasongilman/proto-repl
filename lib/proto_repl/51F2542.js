goog.provide('cljs.nodejs');
goog.require('cljs.core');
cljs.nodejs.require = require;
cljs.nodejs.process = process;
cljs.nodejs.enable_util_print_BANG_ = (function cljs$nodejs$enable_util_print_BANG_(){
cljs.core._STAR_print_newline_STAR_ = false;

cljs.core._STAR_print_fn_STAR_ = (function() { 
var G__10360__delegate = function (args){
return console.log.apply(console,cljs.core.into_array.call(null,args));
};
var G__10360 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10361__i = 0, G__10361__a = new Array(arguments.length -  0);
while (G__10361__i < G__10361__a.length) {G__10361__a[G__10361__i] = arguments[G__10361__i + 0]; ++G__10361__i;}
  args = new cljs.core.IndexedSeq(G__10361__a,0);
} 
return G__10360__delegate.call(this,args);};
G__10360.cljs$lang$maxFixedArity = 0;
G__10360.cljs$lang$applyTo = (function (arglist__10362){
var args = cljs.core.seq(arglist__10362);
return G__10360__delegate(args);
});
G__10360.cljs$core$IFn$_invoke$arity$variadic = G__10360__delegate;
return G__10360;
})()
;

cljs.core._STAR_print_err_fn_STAR_ = (function() { 
var G__10363__delegate = function (args){
return console.error.apply(console,cljs.core.into_array.call(null,args));
};
var G__10363 = function (var_args){
var args = null;
if (arguments.length > 0) {
var G__10364__i = 0, G__10364__a = new Array(arguments.length -  0);
while (G__10364__i < G__10364__a.length) {G__10364__a[G__10364__i] = arguments[G__10364__i + 0]; ++G__10364__i;}
  args = new cljs.core.IndexedSeq(G__10364__a,0);
} 
return G__10363__delegate.call(this,args);};
G__10363.cljs$lang$maxFixedArity = 0;
G__10363.cljs$lang$applyTo = (function (arglist__10365){
var args = cljs.core.seq(arglist__10365);
return G__10363__delegate(args);
});
G__10363.cljs$core$IFn$_invoke$arity$variadic = G__10363__delegate;
return G__10363;
})()
;

return null;
});
