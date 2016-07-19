// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('proto_repl.edn_reader.display');
goog.require('cljs.core');
goog.require('clojure.string');
goog.require('clojure.set');
/**
 * Sets the maximum width of a table in characters when 
 */
proto_repl.edn_reader.display.max_table_width = (60);
/**
 * A single character ellipsis for truncating long values.
 * Unicode: U+2026, UTF-8: E2 80 A6
 */
proto_repl.edn_reader.display.ellipsis = "\u2026";
/**
 * The minimum size a column could be shrunk to is 1. That assumes 1 space for
 * data and 1 for an ellipsis. 'X…'
 */
proto_repl.edn_reader.display.min_column_width = (2);
/**
 * Takes a width and a string value and returns the string so that it exactly
 * fits the width given. The value is truncated if it is too long with an
 * ellipsis or has spaces prepended.
 */
proto_repl.edn_reader.display.fit_value_to_width = (function proto_repl$edn_reader$display$fit_value_to_width(var_args){
var args10203 = [];
var len__9102__auto___10206 = arguments.length;
var i__9103__auto___10207 = (0);
while(true){
if((i__9103__auto___10207 < len__9102__auto___10206)){
args10203.push((arguments[i__9103__auto___10207]));

var G__10208 = (i__9103__auto___10207 + (1));
i__9103__auto___10207 = G__10208;
continue;
} else {
}
break;
}

var G__10205 = args10203.length;
switch (G__10205) {
case 2:
return proto_repl.edn_reader.display.fit_value_to_width.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return proto_repl.edn_reader.display.fit_value_to_width.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10203.length)].join('')));

}
});

proto_repl.edn_reader.display.fit_value_to_width.cljs$core$IFn$_invoke$arity$2 = (function (width,value){
return proto_repl.edn_reader.display.fit_value_to_width.call(null,width,value,true);
});

proto_repl.edn_reader.display.fit_value_to_width.cljs$core$IFn$_invoke$arity$3 = (function (width,value,expand_QMARK_){
var length = cljs.core.count.call(null,value);
if((length > width)){
return [cljs.core.str(cljs.core.subs.call(null,value,(0),(width - (1)))),cljs.core.str(proto_repl.edn_reader.display.ellipsis)].join('');
} else {
if(cljs.core.truth_(expand_QMARK_)){
return [cljs.core.str(clojure.string.join.call(null,cljs.core.repeat.call(null,(width - length)," "))),cljs.core.str(value)].join('');
} else {
return value;

}
}
});

proto_repl.edn_reader.display.fit_value_to_width.cljs$lang$maxFixedArity = 3;
/**
 * Converts a value into a displayable tree. 
 */
proto_repl.edn_reader.display.to_display_tree_STAR_ = (function proto_repl$edn_reader$display$to_display_tree_STAR_(v){
var trimmed_str = (function (p1__10210_SHARP_){
return proto_repl.edn_reader.display.fit_value_to_width.call(null,proto_repl.edn_reader.display.max_table_width,cljs.core.pr_str.call(null,p1__10210_SHARP_),false);
});
if(cljs.core.map_QMARK_.call(null,v)){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [trimmed_str.call(null,v),cljs.core.PersistentArrayMap.EMPTY], null),cljs.core.map.call(null,((function (trimmed_str){
return (function (entry){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [trimmed_str.call(null,entry),cljs.core.PersistentArrayMap.EMPTY,proto_repl$edn_reader$display$to_display_tree_STAR_.call(null,cljs.core.second.call(null,entry))], null);
});})(trimmed_str))
,v));
} else {
if((cljs.core.sequential_QMARK_.call(null,v)) || (cljs.core.set_QMARK_.call(null,v))){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [trimmed_str.call(null,v),cljs.core.PersistentArrayMap.EMPTY], null),cljs.core.map.call(null,proto_repl$edn_reader$display$to_display_tree_STAR_,v));
} else {
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.pr_str.call(null,v)], null);

}
}
});
/**
 * Takes a map of var names to their values and returns the map with values
 * in a string format.
 */
proto_repl.edn_reader.display.value_map__GT_printable_map = (function proto_repl$edn_reader$display$value_map__GT_printable_map(vm){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__8816__auto__ = (function proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__10219(s__10220){
return (new cljs.core.LazySeq(null,(function (){
var s__10220__$1 = s__10220;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10220__$1);
if(temp__4657__auto__){
var s__10220__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10220__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10220__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10222 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10221 = (0);
while(true){
if((i__10221 < size__8815__auto__)){
var vec__10225 = cljs.core._nth.call(null,c__8814__auto__,i__10221);
var k = cljs.core.nth.call(null,vec__10225,(0),null);
var v = cljs.core.nth.call(null,vec__10225,(1),null);
cljs.core.chunk_append.call(null,b__10222,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.pr_str.call(null,v)], null));

var G__10227 = (i__10221 + (1));
i__10221 = G__10227;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10222),proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__10219.call(null,cljs.core.chunk_rest.call(null,s__10220__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10222),null);
}
} else {
var vec__10226 = cljs.core.first.call(null,s__10220__$2);
var k = cljs.core.nth.call(null,vec__10226,(0),null);
var v = cljs.core.nth.call(null,vec__10226,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.pr_str.call(null,v)], null),proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__10219.call(null,cljs.core.rest.call(null,s__10220__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__8816__auto__.call(null,vm);
})());
});
/**
 * Find the common set of keys in all of the maps
 */
proto_repl.edn_reader.display.common_keys = (function proto_repl$edn_reader$display$common_keys(maps){
return cljs.core.reduce.call(null,(function (common_keys__$1,m){
return clojure.set.union.call(null,common_keys__$1,cljs.core.set.call(null,cljs.core.keys.call(null,m)));
}),cljs.core.PersistentHashSet.EMPTY,maps);
});
/**
 * Returns a map of the max lengths of all the given keys in the maps. Assumes
 * values in maps are strings.
 */
proto_repl.edn_reader.display.max_value_widths = (function proto_repl$edn_reader$display$max_value_widths(keys,value_maps){
return cljs.core.reduce.call(null,(function (max_width_map,vm){
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__8816__auto__ = (function proto_repl$edn_reader$display$max_value_widths_$_iter__10236(s__10237){
return (new cljs.core.LazySeq(null,(function (){
var s__10237__$1 = s__10237;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10237__$1);
if(temp__4657__auto__){
var s__10237__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10237__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10237__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10239 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10238 = (0);
while(true){
if((i__10238 < size__8815__auto__)){
var vec__10242 = cljs.core._nth.call(null,c__8814__auto__,i__10238);
var k = cljs.core.nth.call(null,vec__10242,(0),null);
var max_width = cljs.core.nth.call(null,vec__10242,(1),null);
var width = cljs.core.count.call(null,cljs.core.get.call(null,vm,k,""));
cljs.core.chunk_append.call(null,b__10239,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var x__8375__auto__ = max_width;
var y__8376__auto__ = width;
return ((x__8375__auto__ > y__8376__auto__) ? x__8375__auto__ : y__8376__auto__);
})()], null));

var G__10244 = (i__10238 + (1));
i__10238 = G__10244;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10239),proto_repl$edn_reader$display$max_value_widths_$_iter__10236.call(null,cljs.core.chunk_rest.call(null,s__10237__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10239),null);
}
} else {
var vec__10243 = cljs.core.first.call(null,s__10237__$2);
var k = cljs.core.nth.call(null,vec__10243,(0),null);
var max_width = cljs.core.nth.call(null,vec__10243,(1),null);
var width = cljs.core.count.call(null,cljs.core.get.call(null,vm,k,""));
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var x__8375__auto__ = max_width;
var y__8376__auto__ = width;
return ((x__8375__auto__ > y__8376__auto__) ? x__8375__auto__ : y__8376__auto__);
})()], null),proto_repl$edn_reader$display$max_value_widths_$_iter__10236.call(null,cljs.core.rest.call(null,s__10237__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__8816__auto__.call(null,max_width_map);
})());
}),cljs.core.zipmap.call(null,keys,cljs.core.repeat.call(null,(0))),value_maps);
});
/**
 * Creates an exception with the given message
 */
proto_repl.edn_reader.display.exception = (function proto_repl$edn_reader$display$exception(message){
return (new Error(message));
});
/**
 * Returns the size of the table based on a map of column to sizes
 */
proto_repl.edn_reader.display.col_widths__GT_table_width = (function proto_repl$edn_reader$display$col_widths__GT_table_width(widths){
var num_cols = cljs.core.count.call(null,widths);
return ((cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.vals.call(null,widths)) + ((2) * num_cols)) + (num_cols - (1)));
});
/**
 * Takes a map of widths for each column and returns a new map of widths such
 * that the values will fit within the max-table-width. Assumes that the number
 * of columns is possible to fit within the table.
 */
proto_repl.edn_reader.display.calculate_columns_widths = (function proto_repl$edn_reader$display$calculate_columns_widths(max_widths){
var num_cols = cljs.core.count.call(null,max_widths);
var table_width = proto_repl.edn_reader.display.col_widths__GT_table_width.call(null,max_widths);
var amount_to_shrink = (table_width - proto_repl.edn_reader.display.max_table_width);
if((amount_to_shrink <= (0))){
return max_widths;
} else {
var widths = max_widths;
var amount_to_shrink__$1 = amount_to_shrink;
var num_recursions = (0);
while(true){
if((num_recursions > ((4) * num_cols))){
throw proto_repl.edn_reader.display.exception.call(null,[cljs.core.str("Number of recursions ["),cljs.core.str(num_recursions),cljs.core.str("] exceeded while calculating column widths")].join(''));
} else {
}

var shrinkable_cols = (function (){var iter__8816__auto__ = ((function (widths,amount_to_shrink__$1,num_recursions,num_cols,table_width,amount_to_shrink){
return (function proto_repl$edn_reader$display$calculate_columns_widths_$_iter__10255(s__10256){
return (new cljs.core.LazySeq(null,((function (widths,amount_to_shrink__$1,num_recursions,num_cols,table_width,amount_to_shrink){
return (function (){
var s__10256__$1 = s__10256;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10256__$1);
if(temp__4657__auto__){
var s__10256__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10256__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10256__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10258 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10257 = (0);
while(true){
if((i__10257 < size__8815__auto__)){
var vec__10261 = cljs.core._nth.call(null,c__8814__auto__,i__10257);
var k = cljs.core.nth.call(null,vec__10261,(0),null);
var width = cljs.core.nth.call(null,vec__10261,(1),null);
if((width > proto_repl.edn_reader.display.min_column_width)){
cljs.core.chunk_append.call(null,b__10258,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,width], null));

var G__10263 = (i__10257 + (1));
i__10257 = G__10263;
continue;
} else {
var G__10264 = (i__10257 + (1));
i__10257 = G__10264;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10258),proto_repl$edn_reader$display$calculate_columns_widths_$_iter__10255.call(null,cljs.core.chunk_rest.call(null,s__10256__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10258),null);
}
} else {
var vec__10262 = cljs.core.first.call(null,s__10256__$2);
var k = cljs.core.nth.call(null,vec__10262,(0),null);
var width = cljs.core.nth.call(null,vec__10262,(1),null);
if((width > proto_repl.edn_reader.display.min_column_width)){
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,width], null),proto_repl$edn_reader$display$calculate_columns_widths_$_iter__10255.call(null,cljs.core.rest.call(null,s__10256__$2)));
} else {
var G__10265 = cljs.core.rest.call(null,s__10256__$2);
s__10256__$1 = G__10265;
continue;
}
}
} else {
return null;
}
break;
}
});})(widths,amount_to_shrink__$1,num_recursions,num_cols,table_width,amount_to_shrink))
,null,null));
});})(widths,amount_to_shrink__$1,num_recursions,num_cols,table_width,amount_to_shrink))
;
return iter__8816__auto__.call(null,widths);
})();
var shrinkable_cols__$1 = cljs.core.reverse.call(null,cljs.core.sort_by.call(null,cljs.core.second,shrinkable_cols));
var shrinkable_col_size = cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.map.call(null,cljs.core.second,shrinkable_cols__$1));
var vec__10254 = cljs.core.first.call(null,shrinkable_cols__$1);
var col_to_shrink = cljs.core.nth.call(null,vec__10254,(0),null);
var size = cljs.core.nth.call(null,vec__10254,(1),null);
var col_amt_to_shrink = cljs.core.long$.call(null,Math.ceil(((size / shrinkable_col_size) * amount_to_shrink__$1)));
var new_widths = cljs.core.assoc.call(null,widths,col_to_shrink,(size - col_amt_to_shrink));
if((proto_repl.edn_reader.display.col_widths__GT_table_width.call(null,new_widths) > proto_repl.edn_reader.display.max_table_width)){
var G__10266 = new_widths;
var G__10267 = (amount_to_shrink__$1 - col_amt_to_shrink);
var G__10268 = (num_recursions + (1));
widths = G__10266;
amount_to_shrink__$1 = G__10267;
num_recursions = G__10268;
continue;
} else {
return new_widths;
}
break;
}
}
});
/**
 * Takes a list of keys ordered for the row, a map of values for the row, and
 * the available space for each column and returns a string row with columns
 * separated by a pipe character.
 */
proto_repl.edn_reader.display.row__GT_str = (function proto_repl$edn_reader$display$row__GT_str(key_order,value_map,col_widths){
var value_strs = (function (){var iter__8816__auto__ = (function proto_repl$edn_reader$display$row__GT_str_$_iter__10273(s__10274){
return (new cljs.core.LazySeq(null,(function (){
var s__10274__$1 = s__10274;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10274__$1);
if(temp__4657__auto__){
var s__10274__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10274__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10274__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10276 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10275 = (0);
while(true){
if((i__10275 < size__8815__auto__)){
var k = cljs.core._nth.call(null,c__8814__auto__,i__10275);
cljs.core.chunk_append.call(null,b__10276,proto_repl.edn_reader.display.fit_value_to_width.call(null,col_widths.call(null,k),cljs.core.get.call(null,value_map,k)));

var G__10277 = (i__10275 + (1));
i__10275 = G__10277;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10276),proto_repl$edn_reader$display$row__GT_str_$_iter__10273.call(null,cljs.core.chunk_rest.call(null,s__10274__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10276),null);
}
} else {
var k = cljs.core.first.call(null,s__10274__$2);
return cljs.core.cons.call(null,proto_repl.edn_reader.display.fit_value_to_width.call(null,col_widths.call(null,k),cljs.core.get.call(null,value_map,k)),proto_repl$edn_reader$display$row__GT_str_$_iter__10273.call(null,cljs.core.rest.call(null,s__10274__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__8816__auto__.call(null,key_order);
})();
return [cljs.core.str(clojure.string.join.call(null," | ",value_strs)),cljs.core.str(" |")].join('');
});
/**
 * Takes a set of maps containing variable names and values and returns a set
 * of string rows that will fit within the max-table-width. If the table has
 * too many columns to fit into the table it returns nil.
 */
proto_repl.edn_reader.display.value_maps__GT_table_rows = (function proto_repl$edn_reader$display$value_maps__GT_table_rows(value_maps){
var keys = proto_repl.edn_reader.display.common_keys.call(null,value_maps);
var min_table_width = (cljs.core.count.call(null,keys) * (proto_repl.edn_reader.display.min_column_width + (3)));
if((min_table_width <= proto_repl.edn_reader.display.max_table_width)){
var printable_maps = cljs.core.map.call(null,proto_repl.edn_reader.display.value_map__GT_printable_map,value_maps);
var key_printable_map = cljs.core.zipmap.call(null,keys,cljs.core.map.call(null,cljs.core.pr_str,keys));
var printable_maps__$1 = cljs.core.cons.call(null,key_printable_map,printable_maps);
var max_widths = proto_repl.edn_reader.display.max_value_widths.call(null,keys,printable_maps__$1);
var col_widths = proto_repl.edn_reader.display.calculate_columns_widths.call(null,max_widths);
var key_order = cljs.core.map.call(null,cljs.core.first,cljs.core.sort_by.call(null,cljs.core.second,col_widths));
return cljs.core.map.call(null,((function (printable_maps,key_printable_map,printable_maps__$1,max_widths,col_widths,key_order,keys,min_table_width){
return (function (p1__10278_SHARP_){
return proto_repl.edn_reader.display.row__GT_str.call(null,key_order,p1__10278_SHARP_,col_widths);
});})(printable_maps,key_printable_map,printable_maps__$1,max_widths,col_widths,key_order,keys,min_table_width))
,printable_maps__$1);
} else {
return null;
}
});
/**
 * Displays an error message in atom.
 */
proto_repl.edn_reader.display.display_error = (function proto_repl$edn_reader$display$display_error(message){
return atom.notifications.addError(message,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"detail","detail",-1545345025),message,new cljs.core.Keyword(null,"dismissable","dismissable",31036366),true], null));
});
/**
 * Displays an warning message in atom.
 */
proto_repl.edn_reader.display.display_warn = (function proto_repl$edn_reader$display$display_warn(message){
return atom.notifications.addWarning(message,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dismissable","dismissable",31036366),true], null));
});
/**
 * Executes code in proto repl to define vars that were captured with a specific
 * id and optionally a specific binding.
 */
proto_repl.edn_reader.display.define_vars_with_id = (function proto_repl$edn_reader$display$define_vars_with_id(var_args){
var args10279 = [];
var len__9102__auto___10282 = arguments.length;
var i__9103__auto___10283 = (0);
while(true){
if((i__9103__auto___10283 < len__9102__auto___10282)){
args10279.push((arguments[i__9103__auto___10283]));

var G__10284 = (i__9103__auto___10283 + (1));
i__9103__auto___10283 = G__10284;
continue;
} else {
}
break;
}

var G__10281 = args10279.length;
switch (G__10281) {
case 1:
return proto_repl.edn_reader.display.define_vars_with_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return proto_repl.edn_reader.display.define_vars_with_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10279.length)].join('')));

}
});

proto_repl.edn_reader.display.define_vars_with_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return proto_repl.edn_reader.display.define_vars_with_id.call(null,id,null);
});

proto_repl.edn_reader.display.define_vars_with_id.cljs$core$IFn$_invoke$arity$2 = (function (id,var_name){
var code = (cljs.core.truth_(var_name)?cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("proto-repl.saved-values","def-by-id","proto-repl.saved-values/def-by-id",423272998,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,id),cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol(null,"quote","quote",1377916282,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,var_name)))))))):cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("proto-repl.saved-values","def-by-id","proto-repl.saved-values/def-by-id",423272998,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,id)))));
var code_str = cljs.core.pr_str.call(null,code);
var options = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"displayInRepl","displayInRepl",157291271),false,new cljs.core.Keyword(null,"resultHandler","resultHandler",-641220735),((function (code,code_str){
return (function (result){
var result__$1 = cljs.core.js__GT_clj.call(null,result);
if(cljs.core.truth_(new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(result__$1))){
return proto_repl.edn_reader.display.display_error.call(null,new cljs.core.Keyword(null,"error","error",-978969032).cljs$core$IFn$_invoke$arity$1(result__$1));
} else {
if(cljs.core._EQ_.call(null,result.value,"false")){
return proto_repl.edn_reader.display.display_warn.call(null,"The values could not be defined. You may have captured more subsequent values which are not displayed yet.");
} else {
if(cljs.core.not_EQ_.call(null,result.value,"true")){
return proto_repl.edn_reader.display.display_error.call(null,[cljs.core.str("Unexpected result: "),cljs.core.str(cljs.core.pr_str.call(null,result__$1))].join(''));
} else {
return null;
}
}
}
});})(code,code_str))
], null);
return protoRepl.executeCode(code_str,options);
});

proto_repl.edn_reader.display.define_vars_with_id.cljs$lang$maxFixedArity = 2;
/**
 * Returns tree view button options to add a button for defining bindings that
 * were captured
 */
proto_repl.edn_reader.display.def_button = (function proto_repl$edn_reader$display$def_button(var_args){
var args10286 = [];
var len__9102__auto___10289 = arguments.length;
var i__9103__auto___10290 = (0);
while(true){
if((i__9103__auto___10290 < len__9102__auto___10289)){
args10286.push((arguments[i__9103__auto___10290]));

var G__10291 = (i__9103__auto___10290 + (1));
i__9103__auto___10290 = G__10291;
continue;
} else {
}
break;
}

var G__10288 = args10286.length;
switch (G__10288) {
case 1:
return proto_repl.edn_reader.display.def_button.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return proto_repl.edn_reader.display.def_button.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10286.length)].join('')));

}
});

proto_repl.edn_reader.display.def_button.cljs$core$IFn$_invoke$arity$1 = (function (id){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"button_text","button_text",-1852470939),"def",new cljs.core.Keyword(null,"button_class","button_class",-1730590466),new cljs.core.Keyword(null,"def-saved-vars","def-saved-vars",655582371),new cljs.core.Keyword(null,"button_fn","button_fn",-1938503192),(function (){
return proto_repl.edn_reader.display.define_vars_with_id.call(null,id);
})], null);
});

proto_repl.edn_reader.display.def_button.cljs$core$IFn$_invoke$arity$2 = (function (id,var_name){
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"button_text","button_text",-1852470939),"def",new cljs.core.Keyword(null,"button_class","button_class",-1730590466),new cljs.core.Keyword(null,"def-saved-var","def-saved-var",204753748),new cljs.core.Keyword(null,"button_fn","button_fn",-1938503192),(function (){
return proto_repl.edn_reader.display.define_vars_with_id.call(null,id,var_name);
})], null);
});

proto_repl.edn_reader.display.def_button.cljs$lang$maxFixedArity = 2;
/**
 * Takes a map of variable names and values and converts it into a displayable
 * tree of values.
 */
proto_repl.edn_reader.display.value_map__GT_display_tree_values = (function proto_repl$edn_reader$display$value_map__GT_display_tree_values(p__10294){
var map__10305 = p__10294;
var map__10305__$1 = ((((!((map__10305 == null)))?((((map__10305.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10305.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10305):map__10305);
var id = cljs.core.get.call(null,map__10305__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var values = cljs.core.get.call(null,map__10305__$1,new cljs.core.Keyword(null,"values","values",372645556));
var iter__8816__auto__ = ((function (map__10305,map__10305__$1,id,values){
return (function proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__10307(s__10308){
return (new cljs.core.LazySeq(null,((function (map__10305,map__10305__$1,id,values){
return (function (){
var s__10308__$1 = s__10308;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10308__$1);
if(temp__4657__auto__){
var s__10308__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10308__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10308__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10310 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10309 = (0);
while(true){
if((i__10309 < size__8815__auto__)){
var vec__10313 = cljs.core._nth.call(null,c__8814__auto__,i__10309);
var var_name = cljs.core.nth.call(null,vec__10313,(0),null);
var value = cljs.core.nth.call(null,vec__10313,(1),null);
var val_display_tree = proto_repl.edn_reader.display.to_display_tree_STAR_.call(null,value);
cljs.core.chunk_append.call(null,b__10310,cljs.core.assoc_in.call(null,cljs.core.update_in.call(null,val_display_tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),((function (i__10309,val_display_tree,vec__10313,var_name,value,c__8814__auto__,size__8815__auto__,b__10310,s__10308__$2,temp__4657__auto__,map__10305,map__10305__$1,id,values){
return (function (p1__10293_SHARP_){
return [cljs.core.str(var_name),cljs.core.str(": "),cljs.core.str(p1__10293_SHARP_)].join('');
});})(i__10309,val_display_tree,vec__10313,var_name,value,c__8814__auto__,size__8815__auto__,b__10310,s__10308__$2,temp__4657__auto__,map__10305,map__10305__$1,id,values))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1)], null),proto_repl.edn_reader.display.def_button.call(null,id,var_name)));

var G__10315 = (i__10309 + (1));
i__10309 = G__10315;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10310),proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__10307.call(null,cljs.core.chunk_rest.call(null,s__10308__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10310),null);
}
} else {
var vec__10314 = cljs.core.first.call(null,s__10308__$2);
var var_name = cljs.core.nth.call(null,vec__10314,(0),null);
var value = cljs.core.nth.call(null,vec__10314,(1),null);
var val_display_tree = proto_repl.edn_reader.display.to_display_tree_STAR_.call(null,value);
return cljs.core.cons.call(null,cljs.core.assoc_in.call(null,cljs.core.update_in.call(null,val_display_tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),((function (val_display_tree,vec__10314,var_name,value,s__10308__$2,temp__4657__auto__,map__10305,map__10305__$1,id,values){
return (function (p1__10293_SHARP_){
return [cljs.core.str(var_name),cljs.core.str(": "),cljs.core.str(p1__10293_SHARP_)].join('');
});})(val_display_tree,vec__10314,var_name,value,s__10308__$2,temp__4657__auto__,map__10305,map__10305__$1,id,values))
),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(1)], null),proto_repl.edn_reader.display.def_button.call(null,id,var_name)),proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__10307.call(null,cljs.core.rest.call(null,s__10308__$2)));
}
} else {
return null;
}
break;
}
});})(map__10305,map__10305__$1,id,values))
,null,null));
});})(map__10305,map__10305__$1,id,values))
;
return iter__8816__auto__.call(null,values);
});
/**
 * A simpler display for value maps when they won't fit into a table
 */
proto_repl.edn_reader.display.saved_value_maps__GT_display_tree = (function proto_repl$edn_reader$display$saved_value_maps__GT_display_tree(saved_value_set){
var vec__10317 = saved_value_set;
var first_map = cljs.core.nth.call(null,vec__10317,(0),null);
var others = cljs.core.nthnext.call(null,vec__10317,(1));
return cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Saved values",proto_repl.edn_reader.display.def_button.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(first_map))], null),proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,first_map),cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Previous Values",cljs.core.PersistentArrayMap.EMPTY], null),cljs.core.map_indexed.call(null,((function (vec__10317,first_map,others){
return (function (i,value_map){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str((i + (1)))].join(''),proto_repl.edn_reader.display.def_button.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(value_map))], null),proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,value_map));
});})(vec__10317,first_map,others))
,others)));
});
/**
 * Takes a list of maps of variable names to values and converts it into a table
 * of each map showing the values. Each row can be expanded to show more details
 * of the values in the event any of them had to be truncated.
 */
proto_repl.edn_reader.display.saved_values__GT_display_tree_table = (function proto_repl$edn_reader$display$saved_values__GT_display_tree_table(saved_value_set){
var temp__4655__auto__ = proto_repl.edn_reader.display.value_maps__GT_table_rows.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"values","values",372645556),saved_value_set));
if(cljs.core.truth_(temp__4655__auto__)){
var vec__10319 = temp__4655__auto__;
var header = cljs.core.nth.call(null,vec__10319,(0),null);
var rows = cljs.core.nthnext.call(null,vec__10319,(1));
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  "),cljs.core.str(header)].join(''),cljs.core.PersistentArrayMap.EMPTY], null),cljs.core.map.call(null,((function (vec__10319,header,rows,temp__4655__auto__){
return (function (row,saved_values){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [row,proto_repl.edn_reader.display.def_button.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(saved_values))], null),proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,saved_values));
});})(vec__10319,header,rows,temp__4655__auto__))
,rows,saved_value_set));
} else {
return proto_repl.edn_reader.display.saved_value_maps__GT_display_tree.call(null,saved_value_set);
}
});

//# sourceMappingURL=display.js.map