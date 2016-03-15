// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('proto_repl.self_hosted');
goog.require('cljs.core');
goog.require('replumb.core');
goog.require('replumb.nodejs.io');
goog.require('prc');
goog.require('cljs.reader');
goog.require('cljs.nodejs');
goog.require('clojure.string');
cljs.nodejs.enable_util_print_BANG_.call(null);
cljs.reader.register_default_tag_parser_BANG_.call(null,(function (tag,data){
return data;
}));
proto_repl.self_hosted.path_module = (new cljs.core.Delay((function (){
return cljs.nodejs.require.call(null,"path");
}),null));
proto_repl.self_hosted.atom_project_path = (new cljs.core.Delay((function (){
var project_path = cljs.core.first.call(null,cljs.core.js__GT_clj.call(null,atom.packages.getPackageDirPaths()));
var separator = cljs.core.deref.call(null,proto_repl.self_hosted.path_module).sep;
var path = cljs.core.deref.call(null,proto_repl.self_hosted.path_module);
return clojure.string.join.call(null,separator,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [project_path,"proto-repl","lib","proto_repl"], null));
}),null));
/**
 * Evaluates the clojure code using replumb and invokes the callback.
 */
proto_repl.self_hosted.eval_str = (function proto_repl$self_hosted$eval_str(code,callback){
return replumb.core.read_eval_call.call(null,replumb.core.nodejs_options.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref.call(null,proto_repl.self_hosted.atom_project_path)], null),replumb.nodejs.io.read_file_BANG_),(function (res){
return callback.call(null,res);
}),code);
});
/**
 * Evaluates the clojure code for the javascript side. Converts the result to Javascript.
 */
proto_repl.self_hosted.eval_for_js = (function proto_repl$self_hosted$eval_for_js(code,callback){
return proto_repl.self_hosted.eval_str.call(null,code,(function (result){
return callback.call(null,cljs.core.clj__GT_js.call(null,result));
}));
});
goog.exportSymbol('proto_repl.self_hosted.eval_for_js', proto_repl.self_hosted.eval_for_js);
/**
 * Provides completions for self hosted code.
 */
proto_repl.self_hosted.completions = (function proto_repl$self_hosted$completions(text,callback_fn){
return proto_repl.self_hosted.eval_str.call(null,[cljs.core.str("(apropos \""),cljs.core.str(text),cljs.core.str("\" )")].join(''),(function (result){
if(cljs.core.truth_(new cljs.core.Keyword(null,"success?","success?",-122854052).cljs$core$IFn$_invoke$arity$1(result))){
return callback_fn.call(null,cljs.core.clj__GT_js.call(null,cljs.core.mapv.call(null,(function (match){
var match__$1 = cljs.core.name.call(null,match);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"candidate","candidate",-940308314),((clojure.string.starts_with_QMARK_.call(null,match__$1,"cljs.core/"))?clojure.string.replace.call(null,match__$1,"cljs.core/",""):match__$1),new cljs.core.Keyword(null,"docs","docs",-1974280502),"",new cljs.core.Keyword(null,"type","type",1174270348),"var"], null);
}),cljs.reader.read_string.call(null,new cljs.core.Keyword(null,"value","value",305978217).cljs$core$IFn$_invoke$arity$1(result)))));
} else {
return callback_fn.call(null,cljs.core.clj__GT_js.call(null,result));
}
}));
});
goog.exportSymbol('proto_repl.self_hosted.completions', proto_repl.self_hosted.completions);
module.exports = {"eval_str": proto_repl.self_hosted.eval_for_js, "completions": proto_repl.self_hosted.completions};

//# sourceMappingURL=self_hosted.js.map