// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('proto_repl_charts.graph');
goog.require('cljs.core');
goog.require('clojure.string');
/**
 * Throws an exception containing a message joined from the msg-parts.
 */
proto_repl_charts.graph.error = (function proto_repl_charts$graph$error(var_args){
var args__9109__auto__ = [];
var len__9102__auto___9284 = arguments.length;
var i__9103__auto___9285 = (0);
while(true){
if((i__9103__auto___9285 < len__9102__auto___9284)){
args__9109__auto__.push((arguments[i__9103__auto___9285]));

var G__9286 = (i__9103__auto___9285 + (1));
i__9103__auto___9285 = G__9286;
continue;
} else {
}
break;
}

var argseq__9110__auto__ = ((((0) < args__9109__auto__.length))?(new cljs.core.IndexedSeq(args__9109__auto__.slice((0)),(0))):null);
return proto_repl_charts.graph.error.cljs$core$IFn$_invoke$arity$variadic(argseq__9110__auto__);
});

proto_repl_charts.graph.error.cljs$core$IFn$_invoke$arity$variadic = (function (msg_parts){
var msg = clojure.string.join.call(null," ",msg_parts);
var ex = Error(msg);
throw ex;
});

proto_repl_charts.graph.error.cljs$lang$maxFixedArity = (0);

proto_repl_charts.graph.error.cljs$lang$applyTo = (function (seq9283){
return proto_repl_charts.graph.error.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq9283));
});
proto_repl_charts.graph.expected_msg = [cljs.core.str("Expecting loom graph or a map containing :nodes and :edges. Nodes can be "),cljs.core.str("strings or maps with any of the fields here: "),cljs.core.str("http://visjs.org/docs/network/nodes.html Edges can be 2 item sequences "),cljs.core.str("or maps containing any of the fields described here: "),cljs.core.str("http://visjs.org/docs/network/edges.html.")].join('');
/**
 * Converts a sequence of nodes into nodes for display.
 */
proto_repl_charts.graph.nodes__GT_display_data = (function proto_repl_charts$graph$nodes__GT_display_data(nodes){
if((cljs.core.set_QMARK_.call(null,nodes)) || (cljs.core.sequential_QMARK_.call(null,nodes))){
} else {
proto_repl_charts.graph.error.call(null,"Expected sequence of nodes.",proto_repl_charts.graph.expected_msg);
}

if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,nodes))){
return nodes;
} else {
return cljs.core.mapv.call(null,(function (p1__9287_SHARP_){
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"label","label",1718410804)],[p1__9287_SHARP_,p1__9287_SHARP_]);
}),nodes);
}
});
/**
 * Converts a sequence of edges into edges for display.
 */
proto_repl_charts.graph.edges__GT_display_data = (function proto_repl_charts$graph$edges__GT_display_data(edges){
if((cljs.core.set_QMARK_.call(null,edges)) || (cljs.core.sequential_QMARK_.call(null,edges))){
} else {
proto_repl_charts.graph.error.call(null,"Expected sequence of edges.",proto_repl_charts.graph.expected_msg);
}

if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,edges))){
return edges;
} else {
if(cljs.core.sequential_QMARK_.call(null,cljs.core.first.call(null,edges))){
return cljs.core.mapv.call(null,(function (p1__9288_SHARP_){
return cljs.core.PersistentHashMap.fromArrays([new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"to","to",192099007)],[cljs.core.first.call(null,p1__9288_SHARP_),cljs.core.second.call(null,p1__9288_SHARP_)]);
}),edges);
} else {
return proto_repl_charts.graph.error.call(null,"Unexpected type for edges.",cljs.core.type.call(null,cljs.core.first.call(null,edges)),proto_repl_charts.graph.expected_msg);

}
}
});
/**
 * Converts a graph passed in as a map to a display graph.
 */
proto_repl_charts.graph.map_graph__GT_display_graph = (function proto_repl_charts$graph$map_graph__GT_display_graph(mg){
if(cljs.core.contains_QMARK_.call(null,mg,new cljs.core.Keyword(null,"nodes","nodes",-2099585805))){
} else {
proto_repl_charts.graph.error.call(null,"Missing key :nodes.",proto_repl_charts.graph.expected_msg);
}

if(cljs.core.contains_QMARK_.call(null,mg,new cljs.core.Keyword(null,"edges","edges",-694791395))){
} else {
proto_repl_charts.graph.error.call(null,"Missing key :edges.",proto_repl_charts.graph.expected_msg);
}

var map__9291 = mg;
var map__9291__$1 = ((((!((map__9291 == null)))?((((map__9291.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9291.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9291):map__9291);
var nodes = cljs.core.get.call(null,map__9291__$1,new cljs.core.Keyword(null,"nodes","nodes",-2099585805));
var edges = cljs.core.get.call(null,map__9291__$1,new cljs.core.Keyword(null,"edges","edges",-694791395));
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"nodes","nodes",-2099585805),proto_repl_charts.graph.nodes__GT_display_data.call(null,nodes),new cljs.core.Keyword(null,"edges","edges",-694791395),proto_repl_charts.graph.edges__GT_display_data.call(null,edges)], null);
});
proto_repl_charts.graph.loom_graph__GT_display_graph = (function proto_repl_charts$graph$loom_graph__GT_display_graph(g){
return g;
});
proto_repl_charts.graph.loom_graph_QMARK_ = (function proto_repl_charts$graph$loom_graph_QMARK_(graph_data){
return false;
});
/**
 * Converts graph data into data for display by vis.js.
 */
proto_repl_charts.graph.convert_graph_data_for_display = (function proto_repl_charts$graph$convert_graph_data_for_display(graph_data,options){
if(cljs.core.truth_(proto_repl_charts.graph.loom_graph_QMARK_.call(null,graph_data))){
return cljs.core.assoc.call(null,proto_repl_charts.graph.loom_graph__GT_display_graph.call(null,graph_data),new cljs.core.Keyword(null,"options","options",99638489),options);
} else {
if(cljs.core.map_QMARK_.call(null,graph_data)){
return cljs.core.assoc.call(null,proto_repl_charts.graph.map_graph__GT_display_graph.call(null,graph_data),new cljs.core.Keyword(null,"options","options",99638489),options);
} else {
return proto_repl_charts.graph.error.call(null,"Unexpected graph data for display of type",cljs.core.type.call(null,graph_data),proto_repl_charts.graph.expected_msg);

}
}
});

//# sourceMappingURL=graph.js.map