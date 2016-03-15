// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('replumb.ast');
goog.require('cljs.core');
/**
 * Given a compiler state, return the seq of namespace symbols currently
 *   present in the AST.
 */
replumb.ast.known_namespaces = (function replumb$ast$known_namespaces(state){
return cljs.core.keys.call(null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(state));
});
/**
 * Given compiler state and namespace symbol return all the public vars
 *   in the AST. Analagous to clojure.core/ns-publics but returns var
 *   analysis maps not vars (beware, it can be a lot of data).
 */
replumb.ast.ns_publics = (function replumb$ast$ns_publics(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"symbol?","symbol?",1820680511,null),new cljs.core.Symbol(null,"ns","ns",2082130287,null))))].join('')));
}

return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.remove.call(null,(function (p__13385){
var vec__13386 = p__13385;
var k = cljs.core.nth.call(null,vec__13386,(0),null);
var v = cljs.core.nth.call(null,vec__13386,(1),null);
return new cljs.core.Keyword(null,"private","private",-558947994).cljs$core$IFn$_invoke$arity$1(v);
}),cljs.core.merge.call(null,cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),ns,new cljs.core.Keyword(null,"macros","macros",811339431)], null)),cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),ns,new cljs.core.Keyword(null,"defs","defs",1398449717)], null)))));
});
/**
 * Given compiler state and namespace symbol return all the vars in the
 *   AST. Analagous to clojure.core/ns-interns but returns var analysis
 *   maps not vars (beware, it can be a lot of data).
 */
replumb.ast.ns_interns = (function replumb$ast$ns_interns(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"symbol?","symbol?",1820680511,null),new cljs.core.Symbol(null,"ns","ns",2082130287,null))))].join('')));
}

return cljs.core.merge.call(null,cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),ns,new cljs.core.Keyword(null,"macros","macros",811339431)], null)),cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),ns,new cljs.core.Keyword(null,"defs","defs",1398449717)], null)));
});
/**
 * Given compiler state and namespace symbol, returns its AST :defs
 *   content (beware, it can be a lot of data)
 */
replumb.ast.ns_defs = (function replumb$ast$ns_defs(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"symbol?","symbol?",1820680511,null),new cljs.core.Symbol(null,"ns","ns",2082130287,null))))].join('')));
}

return cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),ns,new cljs.core.Keyword(null,"defs","defs",1398449717)], null));
});
/**
 * Given compiler state and namespace symbol, returns its whole AST
 *   content (beware, it can be a lot of data).
 */
replumb.ast.namespace = (function replumb$ast$namespace(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"symbol?","symbol?",1820680511,null),new cljs.core.Symbol(null,"ns","ns",2082130287,null))))].join('')));
}

return cljs.core.get_in.call(null,state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927),ns], null));
});
/**
 * Given compiler state and namespace symbol, dissoc the ns from the
 *   AST.
 *   This is commonly passed to swap! (e.g.: (swap! st dissoc-ns)).
 */
replumb.ast.dissoc_ns = (function replumb$ast$dissoc_ns(state,ns){
if((ns instanceof cljs.core.Symbol)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"symbol?","symbol?",1820680511,null),new cljs.core.Symbol(null,"ns","ns",2082130287,null))))].join('')));
}

return cljs.core.update_in.call(null,state,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927)], null),cljs.core.dissoc,ns);
});

//# sourceMappingURL=ast.js.map