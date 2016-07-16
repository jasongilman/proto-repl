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
var args10199 = [];
var len__9102__auto___10202 = arguments.length;
var i__9103__auto___10203 = (0);
while(true){
if((i__9103__auto___10203 < len__9102__auto___10202)){
args10199.push((arguments[i__9103__auto___10203]));

var G__10204 = (i__9103__auto___10203 + (1));
i__9103__auto___10203 = G__10204;
continue;
} else {
}
break;
}

var G__10201 = args10199.length;
switch (G__10201) {
case 2:
return proto_repl.edn_reader.display.fit_value_to_width.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return proto_repl.edn_reader.display.fit_value_to_width.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10199.length)].join('')));

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
var trimmed_str = (function (p1__10206_SHARP_){
return proto_repl.edn_reader.display.fit_value_to_width.call(null,proto_repl.edn_reader.display.max_table_width,cljs.core.pr_str.call(null,p1__10206_SHARP_),false);
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
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__8816__auto__ = (function proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__10215(s__10216){
return (new cljs.core.LazySeq(null,(function (){
var s__10216__$1 = s__10216;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10216__$1);
if(temp__4657__auto__){
var s__10216__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10216__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10216__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10218 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10217 = (0);
while(true){
if((i__10217 < size__8815__auto__)){
var vec__10221 = cljs.core._nth.call(null,c__8814__auto__,i__10217);
var k = cljs.core.nth.call(null,vec__10221,(0),null);
var v = cljs.core.nth.call(null,vec__10221,(1),null);
cljs.core.chunk_append.call(null,b__10218,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.pr_str.call(null,v)], null));

var G__10223 = (i__10217 + (1));
i__10217 = G__10223;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10218),proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__10215.call(null,cljs.core.chunk_rest.call(null,s__10216__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10218),null);
}
} else {
var vec__10222 = cljs.core.first.call(null,s__10216__$2);
var k = cljs.core.nth.call(null,vec__10222,(0),null);
var v = cljs.core.nth.call(null,vec__10222,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.pr_str.call(null,v)], null),proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__10215.call(null,cljs.core.rest.call(null,s__10216__$2)));
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
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__8816__auto__ = (function proto_repl$edn_reader$display$max_value_widths_$_iter__10232(s__10233){
return (new cljs.core.LazySeq(null,(function (){
var s__10233__$1 = s__10233;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10233__$1);
if(temp__4657__auto__){
var s__10233__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10233__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10233__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10235 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10234 = (0);
while(true){
if((i__10234 < size__8815__auto__)){
var vec__10238 = cljs.core._nth.call(null,c__8814__auto__,i__10234);
var k = cljs.core.nth.call(null,vec__10238,(0),null);
var max_width = cljs.core.nth.call(null,vec__10238,(1),null);
var width = cljs.core.count.call(null,cljs.core.get.call(null,vm,k,""));
cljs.core.chunk_append.call(null,b__10235,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var x__8375__auto__ = max_width;
var y__8376__auto__ = width;
return ((x__8375__auto__ > y__8376__auto__) ? x__8375__auto__ : y__8376__auto__);
})()], null));

var G__10240 = (i__10234 + (1));
i__10234 = G__10240;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10235),proto_repl$edn_reader$display$max_value_widths_$_iter__10232.call(null,cljs.core.chunk_rest.call(null,s__10233__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10235),null);
}
} else {
var vec__10239 = cljs.core.first.call(null,s__10233__$2);
var k = cljs.core.nth.call(null,vec__10239,(0),null);
var max_width = cljs.core.nth.call(null,vec__10239,(1),null);
var width = cljs.core.count.call(null,cljs.core.get.call(null,vm,k,""));
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var x__8375__auto__ = max_width;
var y__8376__auto__ = width;
return ((x__8375__auto__ > y__8376__auto__) ? x__8375__auto__ : y__8376__auto__);
})()], null),proto_repl$edn_reader$display$max_value_widths_$_iter__10232.call(null,cljs.core.rest.call(null,s__10233__$2)));
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
return (function proto_repl$edn_reader$display$calculate_columns_widths_$_iter__10251(s__10252){
return (new cljs.core.LazySeq(null,((function (widths,amount_to_shrink__$1,num_recursions,num_cols,table_width,amount_to_shrink){
return (function (){
var s__10252__$1 = s__10252;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10252__$1);
if(temp__4657__auto__){
var s__10252__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10252__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10252__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10254 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10253 = (0);
while(true){
if((i__10253 < size__8815__auto__)){
var vec__10257 = cljs.core._nth.call(null,c__8814__auto__,i__10253);
var k = cljs.core.nth.call(null,vec__10257,(0),null);
var width = cljs.core.nth.call(null,vec__10257,(1),null);
if((width > proto_repl.edn_reader.display.min_column_width)){
cljs.core.chunk_append.call(null,b__10254,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,width], null));

var G__10259 = (i__10253 + (1));
i__10253 = G__10259;
continue;
} else {
var G__10260 = (i__10253 + (1));
i__10253 = G__10260;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10254),proto_repl$edn_reader$display$calculate_columns_widths_$_iter__10251.call(null,cljs.core.chunk_rest.call(null,s__10252__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10254),null);
}
} else {
var vec__10258 = cljs.core.first.call(null,s__10252__$2);
var k = cljs.core.nth.call(null,vec__10258,(0),null);
var width = cljs.core.nth.call(null,vec__10258,(1),null);
if((width > proto_repl.edn_reader.display.min_column_width)){
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,width], null),proto_repl$edn_reader$display$calculate_columns_widths_$_iter__10251.call(null,cljs.core.rest.call(null,s__10252__$2)));
} else {
var G__10261 = cljs.core.rest.call(null,s__10252__$2);
s__10252__$1 = G__10261;
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
var vec__10250 = cljs.core.first.call(null,shrinkable_cols__$1);
var col_to_shrink = cljs.core.nth.call(null,vec__10250,(0),null);
var size = cljs.core.nth.call(null,vec__10250,(1),null);
var col_amt_to_shrink = cljs.core.long$.call(null,Math.ceil(((size / shrinkable_col_size) * amount_to_shrink__$1)));
var new_widths = cljs.core.assoc.call(null,widths,col_to_shrink,(size - col_amt_to_shrink));
if((proto_repl.edn_reader.display.col_widths__GT_table_width.call(null,new_widths) > proto_repl.edn_reader.display.max_table_width)){
var G__10262 = new_widths;
var G__10263 = (amount_to_shrink__$1 - col_amt_to_shrink);
var G__10264 = (num_recursions + (1));
widths = G__10262;
amount_to_shrink__$1 = G__10263;
num_recursions = G__10264;
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
var value_strs = (function (){var iter__8816__auto__ = (function proto_repl$edn_reader$display$row__GT_str_$_iter__10269(s__10270){
return (new cljs.core.LazySeq(null,(function (){
var s__10270__$1 = s__10270;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10270__$1);
if(temp__4657__auto__){
var s__10270__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10270__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10270__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10272 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10271 = (0);
while(true){
if((i__10271 < size__8815__auto__)){
var k = cljs.core._nth.call(null,c__8814__auto__,i__10271);
cljs.core.chunk_append.call(null,b__10272,proto_repl.edn_reader.display.fit_value_to_width.call(null,col_widths.call(null,k),cljs.core.get.call(null,value_map,k)));

var G__10273 = (i__10271 + (1));
i__10271 = G__10273;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10272),proto_repl$edn_reader$display$row__GT_str_$_iter__10269.call(null,cljs.core.chunk_rest.call(null,s__10270__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10272),null);
}
} else {
var k = cljs.core.first.call(null,s__10270__$2);
return cljs.core.cons.call(null,proto_repl.edn_reader.display.fit_value_to_width.call(null,col_widths.call(null,k),cljs.core.get.call(null,value_map,k)),proto_repl$edn_reader$display$row__GT_str_$_iter__10269.call(null,cljs.core.rest.call(null,s__10270__$2)));
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
return (function (p1__10274_SHARP_){
return proto_repl.edn_reader.display.row__GT_str.call(null,key_order,p1__10274_SHARP_,col_widths);
});})(printable_maps,key_printable_map,printable_maps__$1,max_widths,col_widths,key_order,keys,min_table_width))
,printable_maps__$1);
} else {
return null;
}
});
/**
 * Takes a map of variable names and values and converts it into a displayable
 * tree of values.
 */
proto_repl.edn_reader.display.value_map__GT_display_tree_values = (function proto_repl$edn_reader$display$value_map__GT_display_tree_values(value_map){
var iter__8816__auto__ = (function proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__10284(s__10285){
return (new cljs.core.LazySeq(null,(function (){
var s__10285__$1 = s__10285;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10285__$1);
if(temp__4657__auto__){
var s__10285__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10285__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10285__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10287 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10286 = (0);
while(true){
if((i__10286 < size__8815__auto__)){
var vec__10290 = cljs.core._nth.call(null,c__8814__auto__,i__10286);
var var_name = cljs.core.nth.call(null,vec__10290,(0),null);
var value = cljs.core.nth.call(null,vec__10290,(1),null);
var val_display_tree = proto_repl.edn_reader.display.to_display_tree_STAR_.call(null,value);
cljs.core.chunk_append.call(null,b__10287,cljs.core.update_in.call(null,val_display_tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),((function (i__10286,val_display_tree,vec__10290,var_name,value,c__8814__auto__,size__8815__auto__,b__10287,s__10285__$2,temp__4657__auto__){
return (function (p1__10275_SHARP_){
return [cljs.core.str(var_name),cljs.core.str(": "),cljs.core.str(p1__10275_SHARP_)].join('');
});})(i__10286,val_display_tree,vec__10290,var_name,value,c__8814__auto__,size__8815__auto__,b__10287,s__10285__$2,temp__4657__auto__))
));

var G__10292 = (i__10286 + (1));
i__10286 = G__10292;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10287),proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__10284.call(null,cljs.core.chunk_rest.call(null,s__10285__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10287),null);
}
} else {
var vec__10291 = cljs.core.first.call(null,s__10285__$2);
var var_name = cljs.core.nth.call(null,vec__10291,(0),null);
var value = cljs.core.nth.call(null,vec__10291,(1),null);
var val_display_tree = proto_repl.edn_reader.display.to_display_tree_STAR_.call(null,value);
return cljs.core.cons.call(null,cljs.core.update_in.call(null,val_display_tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),((function (val_display_tree,vec__10291,var_name,value,s__10285__$2,temp__4657__auto__){
return (function (p1__10275_SHARP_){
return [cljs.core.str(var_name),cljs.core.str(": "),cljs.core.str(p1__10275_SHARP_)].join('');
});})(val_display_tree,vec__10291,var_name,value,s__10285__$2,temp__4657__auto__))
),proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__10284.call(null,cljs.core.rest.call(null,s__10285__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__8816__auto__.call(null,value_map);
});
/**
 * A simpler display for value maps when they won't fit into a table
 */
proto_repl.edn_reader.display.saved_value_maps__GT_display_tree = (function proto_repl$edn_reader$display$saved_value_maps__GT_display_tree(value_maps){
var vec__10294 = value_maps;
var first_map = cljs.core.nth.call(null,vec__10294,(0),null);
var others = cljs.core.nthnext.call(null,vec__10294,(1));
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Saved values",cljs.core.PersistentArrayMap.EMPTY], null),proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,first_map),cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Previous Values",cljs.core.PersistentArrayMap.EMPTY], null),cljs.core.map_indexed.call(null,((function (vec__10294,first_map,others){
return (function (i,value_map){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str((i + (1)))].join(''),cljs.core.PersistentArrayMap.EMPTY], null),proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,value_map));
});})(vec__10294,first_map,others))
,others)));
});
/**
 * TODO
 */
proto_repl.edn_reader.display.display_error = (function proto_repl$edn_reader$display$display_error(message){
return atom.notifications.addError(message,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"detail","detail",-1545345025),message,new cljs.core.Keyword(null,"dismissable","dismissable",31036366),true], null));
});
/**
 * TODO
 */
proto_repl.edn_reader.display.display_warn = (function proto_repl$edn_reader$display$display_warn(message){
return atom.notifications.addWarning(message,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"dismissable","dismissable",31036366),true], null));
});
/**
 * TODO
 */
proto_repl.edn_reader.display.execute_code = (function proto_repl$edn_reader$display$execute_code(code){
var code_str = cljs.core.pr_str.call(null,code);
var options = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"displayInRepl","displayInRepl",157291271),false,new cljs.core.Keyword(null,"resultHandler","resultHandler",-641220735),((function (code_str){
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
});})(code_str))
], null);
return protoRepl.executeCode(code_str,options);
});
proto_repl.edn_reader.display.def_button = (function proto_repl$edn_reader$display$def_button(id){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"button_text","button_text",-1852470939),"def",new cljs.core.Keyword(null,"button_fn","button_fn",-1938503192),(function (){
return proto_repl.edn_reader.display.execute_code.call(null,cljs.core.sequence.call(null,cljs.core.seq.call(null,cljs.core.concat.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,new cljs.core.Symbol("proto","def-by-id","proto/def-by-id",1690726392,null)),cljs.core._conj.call(null,cljs.core.List.EMPTY,id)))));
})], null);
});
/**
 * Takes a list of maps of variable names to values and converts it into a table
 * of each map showing the values. Each row can be expanded to show more details
 * of the values in the event any of them had to be truncated.
 */
proto_repl.edn_reader.display.saved_values__GT_display_tree_table = (function proto_repl$edn_reader$display$saved_values__GT_display_tree_table(saved_values){
var temp__4655__auto__ = proto_repl.edn_reader.display.value_maps__GT_table_rows.call(null,cljs.core.map.call(null,new cljs.core.Keyword(null,"values","values",372645556),saved_values));
if(cljs.core.truth_(temp__4655__auto__)){
var vec__10296 = temp__4655__auto__;
var header = cljs.core.nth.call(null,vec__10296,(0),null);
var rows = cljs.core.nthnext.call(null,vec__10296,(1));
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str("  "),cljs.core.str(header)].join(''),cljs.core.PersistentArrayMap.EMPTY], null),cljs.core.map.call(null,((function (vec__10296,header,rows,temp__4655__auto__){
return (function (row,vm){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [row,proto_repl.edn_reader.display.def_button.call(null,new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(vm))], null),proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,new cljs.core.Keyword(null,"values","values",372645556).cljs$core$IFn$_invoke$arity$1(vm)));
});})(vec__10296,header,rows,temp__4655__auto__))
,rows,saved_values));
} else {
return proto_repl.edn_reader.display.saved_value_maps__GT_display_tree.call(null,saved_values);
}
});

//# sourceMappingURL=display.js.map