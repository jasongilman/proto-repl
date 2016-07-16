// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('prc');
goog.require('cljs.core');
goog.require('proto_repl_charts.graph');
prc.error = (function prc$error(msg){
return Error(msg);
});
/**
 * Converts table input into a sequence of sequences. Assumes table input is
 *   either already a sequence a sequences or a sequence of maps. Throws an exception
 *   otherwise.
 */
prc.table_input__GT_matrix = (function prc$table_input__GT_matrix(table_input){
if(cljs.core.sequential_QMARK_.call(null,table_input)){
if(cljs.core.map_QMARK_.call(null,cljs.core.first.call(null,table_input))){
var cols = cljs.core.keys.call(null,cljs.core.first.call(null,table_input));
return cljs.core.cons.call(null,cols,cljs.core.map.call(null,((function (cols){
return (function (p1__9295_SHARP_){
return cljs.core.map.call(null,p1__9295_SHARP_,cols);
});})(cols))
,table_input));
} else {
return table_input;
}
} else {
throw prc.error.call(null,"Table input must be a sequence of sequences or a sequence of maps.");
}
});
/**
 * Takes graph data representing nodes and edges and displays it in Atom using
 * vis.js. (http://http://visjs.org/).
 * Arguments:
 * * name - The name to put in the tab title. Will replace an existing tag with
 *   the same name.
 * * graph-data - Can be a loom graph or a map containing a sequence of nodes and
 *   edges. Nodes can be a sequence of identifiers (strings, numbers, keys) or
 *   can be a map containing data matching description here:
 *   http://visjs.org/docs/network/nodes.html. Edges can be a sequence of 2 item
 *   sequences or maps containing any of the fields described here:
 *   http://visjs.org/docs/network/edges.html
 * * options - Optional map of visjs network options. See http://visjs.org/docs/network/
 */
prc.graph = (function prc$graph(var_args){
var args9296 = [];
var len__9102__auto___9299 = arguments.length;
var i__9103__auto___9300 = (0);
while(true){
if((i__9103__auto___9300 < len__9102__auto___9299)){
args9296.push((arguments[i__9103__auto___9300]));

var G__9301 = (i__9103__auto___9300 + (1));
i__9103__auto___9300 = G__9301;
continue;
} else {
}
break;
}

var G__9298 = args9296.length;
switch (G__9298) {
case 2:
return prc.graph.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return prc.graph.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9296.length)].join('')));

}
});

prc.graph.cljs$core$IFn$_invoke$arity$2 = (function (name,graph_data){
return prc.graph.call(null,name,graph_data,null);
});

prc.graph.cljs$core$IFn$_invoke$arity$3 = (function (name,graph_data,options){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"proto-repl-code-execution-extension","proto-repl-code-execution-extension",1021909451),"proto-repl-charts",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"graph",new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"data","data",-232669377),proto_repl_charts.graph.convert_graph_data_for_display.call(null,graph_data,options)], null)], null);
});

prc.graph.cljs$lang$maxFixedArity = 3;
/**
 * Displays the data in a table in a tab with the given name. rows can either be
 *   a sequence of sequences or a sequence of maps.
 */
prc.table = (function prc$table(name,rows){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"proto-repl-code-execution-extension","proto-repl-code-execution-extension",1021909451),"proto-repl-charts",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"table",new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"data","data",-232669377),prc.table_input__GT_matrix.call(null,rows)], null)], null);
});
/**
 * Displays a custom chart in a tab with the given name. [C3](http://c3js.org/)
 *   is the charting library used. The chart config will be converted from Clojure
 *   to a JavaScript object and passed to C3. It can be any configuration data C3
 *   supports.
 */
prc.custom_chart = (function prc$custom_chart(name,chart_config){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"proto-repl-code-execution-extension","proto-repl-code-execution-extension",1021909451),"proto-repl-charts",new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"type","type",1174270348),"chart",new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"data","data",-232669377),chart_config], null)], null);
});
/**
 * Processes the options modifying the chart as necessary.
 */
prc.process_options = (function prc$process_options(chart,options){
if(cljs.core.truth_(new cljs.core.Keyword(null,"labels","labels",-626734591).cljs$core$IFn$_invoke$arity$1(options))){
return cljs.core.assoc_in.call(null,chart,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(2),new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"axis","axis",-1215390822),new cljs.core.Keyword(null,"x","x",2099068185)], null),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"type","type",1174270348),"category",new cljs.core.Keyword(null,"categories","categories",178386610),new cljs.core.Keyword(null,"labels","labels",-626734591).cljs$core$IFn$_invoke$arity$1(options)], null));
} else {
return chart;
}
});
/**
 * Displays a line chart in a tab with the given name.
 * 
 *   series-map is a map of series names to the values for the series. For example
 *   the following map would display two lines named 'alpha' and 'beta' on the
 *   same graph.
 * 
 *    {:alpha [1 2 3 4] :beta [10 20 30 40]}
 * 
 *   Options can be any of the following:
 *   * labels - a list of labels to give each value. The index of the label in the
 *   list corresponds to the index of the values in the series.
 */
prc.line_chart = (function prc$line_chart(var_args){
var args9303 = [];
var len__9102__auto___9306 = arguments.length;
var i__9103__auto___9307 = (0);
while(true){
if((i__9103__auto___9307 < len__9102__auto___9306)){
args9303.push((arguments[i__9103__auto___9307]));

var G__9308 = (i__9103__auto___9307 + (1));
i__9103__auto___9307 = G__9308;
continue;
} else {
}
break;
}

var G__9305 = args9303.length;
switch (G__9305) {
case 2:
return prc.line_chart.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return prc.line_chart.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9303.length)].join('')));

}
});

prc.line_chart.cljs$core$IFn$_invoke$arity$2 = (function (name,series_map){
return prc.line_chart.call(null,name,series_map,null);
});

prc.line_chart.cljs$core$IFn$_invoke$arity$3 = (function (name,series_map,options){
return prc.process_options.call(null,prc.custom_chart.call(null,name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"json","json",1279968570),series_map], null)], null)),options);
});

prc.line_chart.cljs$lang$maxFixedArity = 3;
/**
 * Displays a bar chart in a tab with the given name.
 * 
 *   series-map is a map of series names to the values for the series. For example
 *   the following map would display two sets of bars named 'alpha' and 'beta'.
 * 
 *   {:alpha [1 2 3 4] :beta [10 20 30 40]}
 * 
 *   Options can be any of the following:
 *   * labels - a list of labels to give each value. The index of the label in the
 *   list corresponds to the index of the values in the series.
 */
prc.bar_chart = (function prc$bar_chart(var_args){
var args9310 = [];
var len__9102__auto___9313 = arguments.length;
var i__9103__auto___9314 = (0);
while(true){
if((i__9103__auto___9314 < len__9102__auto___9313)){
args9310.push((arguments[i__9103__auto___9314]));

var G__9315 = (i__9103__auto___9314 + (1));
i__9103__auto___9314 = G__9315;
continue;
} else {
}
break;
}

var G__9312 = args9310.length;
switch (G__9312) {
case 2:
return prc.bar_chart.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return prc.bar_chart.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9310.length)].join('')));

}
});

prc.bar_chart.cljs$core$IFn$_invoke$arity$2 = (function (name,series_map){
return prc.bar_chart.call(null,name,series_map,null);
});

prc.bar_chart.cljs$core$IFn$_invoke$arity$3 = (function (name,series_map,options){
return prc.process_options.call(null,prc.custom_chart.call(null,name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"json","json",1279968570),series_map,new cljs.core.Keyword(null,"type","type",1174270348),"bar"], null)], null)),options);
});

prc.bar_chart.cljs$lang$maxFixedArity = 3;
/**
 * Displays a scatter chart in a tab with the given name.
 * 
 *   series-map is a map of series names to the values for the series. For example
 *   the following map would display two sets of points named 'alpha' and 'beta'.
 * 
 *   {:alpha [1 2 3 4] :beta [10 20 30 40]}
 * 
 *   Options can be any of the following:
 *   * labels - a list of labels to give each value. The index of the label in the
 *   list corresponds to the index of the values in the series.
 */
prc.scatter_chart = (function prc$scatter_chart(var_args){
var args9317 = [];
var len__9102__auto___9320 = arguments.length;
var i__9103__auto___9321 = (0);
while(true){
if((i__9103__auto___9321 < len__9102__auto___9320)){
args9317.push((arguments[i__9103__auto___9321]));

var G__9322 = (i__9103__auto___9321 + (1));
i__9103__auto___9321 = G__9322;
continue;
} else {
}
break;
}

var G__9319 = args9317.length;
switch (G__9319) {
case 2:
return prc.scatter_chart.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return prc.scatter_chart.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9317.length)].join('')));

}
});

prc.scatter_chart.cljs$core$IFn$_invoke$arity$2 = (function (name,series){
return prc.scatter_chart.call(null,name,series,null);
});

prc.scatter_chart.cljs$core$IFn$_invoke$arity$3 = (function (name,series,options){
return prc.process_options.call(null,prc.custom_chart.call(null,name,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"json","json",1279968570),series,new cljs.core.Keyword(null,"type","type",1174270348),"scatter"], null)], null)),options);
});

prc.scatter_chart.cljs$lang$maxFixedArity = 3;

//# sourceMappingURL=prc.js.map