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
var args15554 = [];
var len__7755__auto___15557 = arguments.length;
var i__7756__auto___15558 = (0);
while(true){
if((i__7756__auto___15558 < len__7755__auto___15557)){
args15554.push((arguments[i__7756__auto___15558]));

var G__15559 = (i__7756__auto___15558 + (1));
i__7756__auto___15558 = G__15559;
continue;
} else {
}
break;
}

var G__15556 = args15554.length;
switch (G__15556) {
case 2:
return proto_repl.edn_reader.display.fit_value_to_width.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return proto_repl.edn_reader.display.fit_value_to_width.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args15554.length)].join('')));

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
var trimmed_str = (function (p1__15561_SHARP_){
return proto_repl.edn_reader.display.fit_value_to_width.call(null,proto_repl.edn_reader.display.max_table_width,cljs.core.pr_str.call(null,p1__15561_SHARP_),false);
});
if(cljs.core.map_QMARK_.call(null,v)){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [trimmed_str.call(null,v)], null),cljs.core.map.call(null,((function (trimmed_str){
return (function (entry){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [trimmed_str.call(null,entry),proto_repl$edn_reader$display$to_display_tree_STAR_.call(null,cljs.core.second.call(null,entry))], null);
});})(trimmed_str))
,v));
} else {
if((cljs.core.sequential_QMARK_.call(null,v)) || (cljs.core.set_QMARK_.call(null,v))){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [trimmed_str.call(null,v)], null),cljs.core.map.call(null,proto_repl$edn_reader$display$to_display_tree_STAR_,v));
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
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7469__auto__ = (function proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__15570(s__15571){
return (new cljs.core.LazySeq(null,(function (){
var s__15571__$1 = s__15571;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15571__$1);
if(temp__4657__auto__){
var s__15571__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15571__$2)){
var c__7467__auto__ = cljs.core.chunk_first.call(null,s__15571__$2);
var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);
var b__15573 = cljs.core.chunk_buffer.call(null,size__7468__auto__);
if((function (){var i__15572 = (0);
while(true){
if((i__15572 < size__7468__auto__)){
var vec__15576 = cljs.core._nth.call(null,c__7467__auto__,i__15572);
var k = cljs.core.nth.call(null,vec__15576,(0),null);
var v = cljs.core.nth.call(null,vec__15576,(1),null);
cljs.core.chunk_append.call(null,b__15573,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.pr_str.call(null,v)], null));

var G__15578 = (i__15572 + (1));
i__15572 = G__15578;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15573),proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__15570.call(null,cljs.core.chunk_rest.call(null,s__15571__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15573),null);
}
} else {
var vec__15577 = cljs.core.first.call(null,s__15571__$2);
var k = cljs.core.nth.call(null,vec__15577,(0),null);
var v = cljs.core.nth.call(null,vec__15577,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,cljs.core.pr_str.call(null,v)], null),proto_repl$edn_reader$display$value_map__GT_printable_map_$_iter__15570.call(null,cljs.core.rest.call(null,s__15571__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7469__auto__.call(null,vm);
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
return cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,(function (){var iter__7469__auto__ = (function proto_repl$edn_reader$display$max_value_widths_$_iter__15587(s__15588){
return (new cljs.core.LazySeq(null,(function (){
var s__15588__$1 = s__15588;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15588__$1);
if(temp__4657__auto__){
var s__15588__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15588__$2)){
var c__7467__auto__ = cljs.core.chunk_first.call(null,s__15588__$2);
var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);
var b__15590 = cljs.core.chunk_buffer.call(null,size__7468__auto__);
if((function (){var i__15589 = (0);
while(true){
if((i__15589 < size__7468__auto__)){
var vec__15593 = cljs.core._nth.call(null,c__7467__auto__,i__15589);
var k = cljs.core.nth.call(null,vec__15593,(0),null);
var max_width = cljs.core.nth.call(null,vec__15593,(1),null);
var width = cljs.core.count.call(null,cljs.core.get.call(null,vm,k,""));
cljs.core.chunk_append.call(null,b__15590,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var x__7028__auto__ = max_width;
var y__7029__auto__ = width;
return ((x__7028__auto__ > y__7029__auto__) ? x__7028__auto__ : y__7029__auto__);
})()], null));

var G__15595 = (i__15589 + (1));
i__15589 = G__15595;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15590),proto_repl$edn_reader$display$max_value_widths_$_iter__15587.call(null,cljs.core.chunk_rest.call(null,s__15588__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15590),null);
}
} else {
var vec__15594 = cljs.core.first.call(null,s__15588__$2);
var k = cljs.core.nth.call(null,vec__15594,(0),null);
var max_width = cljs.core.nth.call(null,vec__15594,(1),null);
var width = cljs.core.count.call(null,cljs.core.get.call(null,vm,k,""));
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,(function (){var x__7028__auto__ = max_width;
var y__7029__auto__ = width;
return ((x__7028__auto__ > y__7029__auto__) ? x__7028__auto__ : y__7029__auto__);
})()], null),proto_repl$edn_reader$display$max_value_widths_$_iter__15587.call(null,cljs.core.rest.call(null,s__15588__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7469__auto__.call(null,max_width_map);
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

var shrinkable_cols = (function (){var iter__7469__auto__ = ((function (widths,amount_to_shrink__$1,num_recursions,num_cols,table_width,amount_to_shrink){
return (function proto_repl$edn_reader$display$calculate_columns_widths_$_iter__15606(s__15607){
return (new cljs.core.LazySeq(null,((function (widths,amount_to_shrink__$1,num_recursions,num_cols,table_width,amount_to_shrink){
return (function (){
var s__15607__$1 = s__15607;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15607__$1);
if(temp__4657__auto__){
var s__15607__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15607__$2)){
var c__7467__auto__ = cljs.core.chunk_first.call(null,s__15607__$2);
var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);
var b__15609 = cljs.core.chunk_buffer.call(null,size__7468__auto__);
if((function (){var i__15608 = (0);
while(true){
if((i__15608 < size__7468__auto__)){
var vec__15612 = cljs.core._nth.call(null,c__7467__auto__,i__15608);
var k = cljs.core.nth.call(null,vec__15612,(0),null);
var width = cljs.core.nth.call(null,vec__15612,(1),null);
if((width > proto_repl.edn_reader.display.min_column_width)){
cljs.core.chunk_append.call(null,b__15609,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,width], null));

var G__15614 = (i__15608 + (1));
i__15608 = G__15614;
continue;
} else {
var G__15615 = (i__15608 + (1));
i__15608 = G__15615;
continue;
}
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15609),proto_repl$edn_reader$display$calculate_columns_widths_$_iter__15606.call(null,cljs.core.chunk_rest.call(null,s__15607__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15609),null);
}
} else {
var vec__15613 = cljs.core.first.call(null,s__15607__$2);
var k = cljs.core.nth.call(null,vec__15613,(0),null);
var width = cljs.core.nth.call(null,vec__15613,(1),null);
if((width > proto_repl.edn_reader.display.min_column_width)){
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [k,width], null),proto_repl$edn_reader$display$calculate_columns_widths_$_iter__15606.call(null,cljs.core.rest.call(null,s__15607__$2)));
} else {
var G__15616 = cljs.core.rest.call(null,s__15607__$2);
s__15607__$1 = G__15616;
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
return iter__7469__auto__.call(null,widths);
})();
var shrinkable_cols__$1 = cljs.core.reverse.call(null,cljs.core.sort_by.call(null,cljs.core.second,shrinkable_cols));
var shrinkable_col_size = cljs.core.apply.call(null,cljs.core._PLUS_,cljs.core.map.call(null,cljs.core.second,shrinkable_cols__$1));
var vec__15605 = cljs.core.first.call(null,shrinkable_cols__$1);
var col_to_shrink = cljs.core.nth.call(null,vec__15605,(0),null);
var size = cljs.core.nth.call(null,vec__15605,(1),null);
var col_amt_to_shrink = cljs.core.long$.call(null,Math.ceil(((size / shrinkable_col_size) * amount_to_shrink__$1)));
var new_widths = cljs.core.assoc.call(null,widths,col_to_shrink,(size - col_amt_to_shrink));
if((proto_repl.edn_reader.display.col_widths__GT_table_width.call(null,new_widths) > proto_repl.edn_reader.display.max_table_width)){
var G__15617 = new_widths;
var G__15618 = (amount_to_shrink__$1 - col_amt_to_shrink);
var G__15619 = (num_recursions + (1));
widths = G__15617;
amount_to_shrink__$1 = G__15618;
num_recursions = G__15619;
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
var value_strs = (function (){var iter__7469__auto__ = (function proto_repl$edn_reader$display$row__GT_str_$_iter__15624(s__15625){
return (new cljs.core.LazySeq(null,(function (){
var s__15625__$1 = s__15625;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15625__$1);
if(temp__4657__auto__){
var s__15625__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15625__$2)){
var c__7467__auto__ = cljs.core.chunk_first.call(null,s__15625__$2);
var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);
var b__15627 = cljs.core.chunk_buffer.call(null,size__7468__auto__);
if((function (){var i__15626 = (0);
while(true){
if((i__15626 < size__7468__auto__)){
var k = cljs.core._nth.call(null,c__7467__auto__,i__15626);
cljs.core.chunk_append.call(null,b__15627,proto_repl.edn_reader.display.fit_value_to_width.call(null,col_widths.call(null,k),cljs.core.get.call(null,value_map,k)));

var G__15628 = (i__15626 + (1));
i__15626 = G__15628;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15627),proto_repl$edn_reader$display$row__GT_str_$_iter__15624.call(null,cljs.core.chunk_rest.call(null,s__15625__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15627),null);
}
} else {
var k = cljs.core.first.call(null,s__15625__$2);
return cljs.core.cons.call(null,proto_repl.edn_reader.display.fit_value_to_width.call(null,col_widths.call(null,k),cljs.core.get.call(null,value_map,k)),proto_repl$edn_reader$display$row__GT_str_$_iter__15624.call(null,cljs.core.rest.call(null,s__15625__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7469__auto__.call(null,key_order);
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
return (function (p1__15629_SHARP_){
return proto_repl.edn_reader.display.row__GT_str.call(null,key_order,p1__15629_SHARP_,col_widths);
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
var iter__7469__auto__ = (function proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__15639(s__15640){
return (new cljs.core.LazySeq(null,(function (){
var s__15640__$1 = s__15640;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15640__$1);
if(temp__4657__auto__){
var s__15640__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15640__$2)){
var c__7467__auto__ = cljs.core.chunk_first.call(null,s__15640__$2);
var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);
var b__15642 = cljs.core.chunk_buffer.call(null,size__7468__auto__);
if((function (){var i__15641 = (0);
while(true){
if((i__15641 < size__7468__auto__)){
var vec__15645 = cljs.core._nth.call(null,c__7467__auto__,i__15641);
var var_name = cljs.core.nth.call(null,vec__15645,(0),null);
var value = cljs.core.nth.call(null,vec__15645,(1),null);
var val_display_tree = proto_repl.edn_reader.display.to_display_tree_STAR_.call(null,value);
cljs.core.chunk_append.call(null,b__15642,cljs.core.update_in.call(null,val_display_tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),((function (i__15641,val_display_tree,vec__15645,var_name,value,c__7467__auto__,size__7468__auto__,b__15642,s__15640__$2,temp__4657__auto__){
return (function (p1__15630_SHARP_){
return [cljs.core.str(var_name),cljs.core.str(": "),cljs.core.str(p1__15630_SHARP_)].join('');
});})(i__15641,val_display_tree,vec__15645,var_name,value,c__7467__auto__,size__7468__auto__,b__15642,s__15640__$2,temp__4657__auto__))
));

var G__15647 = (i__15641 + (1));
i__15641 = G__15647;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15642),proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__15639.call(null,cljs.core.chunk_rest.call(null,s__15640__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15642),null);
}
} else {
var vec__15646 = cljs.core.first.call(null,s__15640__$2);
var var_name = cljs.core.nth.call(null,vec__15646,(0),null);
var value = cljs.core.nth.call(null,vec__15646,(1),null);
var val_display_tree = proto_repl.edn_reader.display.to_display_tree_STAR_.call(null,value);
return cljs.core.cons.call(null,cljs.core.update_in.call(null,val_display_tree,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0)], null),((function (val_display_tree,vec__15646,var_name,value,s__15640__$2,temp__4657__auto__){
return (function (p1__15630_SHARP_){
return [cljs.core.str(var_name),cljs.core.str(": "),cljs.core.str(p1__15630_SHARP_)].join('');
});})(val_display_tree,vec__15646,var_name,value,s__15640__$2,temp__4657__auto__))
),proto_repl$edn_reader$display$value_map__GT_display_tree_values_$_iter__15639.call(null,cljs.core.rest.call(null,s__15640__$2)));
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__7469__auto__.call(null,value_map);
});
/**
 * A simpler display for value maps when they won't fit into a table
 */
proto_repl.edn_reader.display.saved_value_maps__GT_display_tree = (function proto_repl$edn_reader$display$saved_value_maps__GT_display_tree(value_maps){
var vec__15649 = value_maps;
var first_map = cljs.core.nth.call(null,vec__15649,(0),null);
var others = cljs.core.nthnext.call(null,vec__15649,(1));
return cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, ["Saved values"], null),proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,first_map),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.cons.call(null,"Previous Values",cljs.core.map_indexed.call(null,((function (vec__15649,first_map,others){
return (function (i,value_map){
return cljs.core.into.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str((i + (1)))].join('')], null),proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,value_map));
});})(vec__15649,first_map,others))
,others))], null));
});
/**
 * Takes a list of maps of variable names to values and converts it into a table
 * of each map showing the values. Each row can be expanded to show more details
 * of the values in the event any of them had to be truncated.
 */
proto_repl.edn_reader.display.saved_value_maps__GT_display_tree_table = (function proto_repl$edn_reader$display$saved_value_maps__GT_display_tree_table(value_maps){
var temp__4655__auto__ = proto_repl.edn_reader.display.value_maps__GT_table_rows.call(null,value_maps);
if(cljs.core.truth_(temp__4655__auto__)){
var vec__15651 = temp__4655__auto__;
var header = cljs.core.nth.call(null,vec__15651,(0),null);
var rows = cljs.core.nthnext.call(null,vec__15651,(1));
return cljs.core.cons.call(null,[cljs.core.str("  "),cljs.core.str(header)].join(''),cljs.core.map.call(null,((function (vec__15651,header,rows,temp__4655__auto__){
return (function (row,vm){
return cljs.core.cons.call(null,row,proto_repl.edn_reader.display.value_map__GT_display_tree_values.call(null,vm));
});})(vec__15651,header,rows,temp__4655__auto__))
,rows,value_maps));
} else {
return proto_repl.edn_reader.display.saved_value_maps__GT_display_tree.call(null,value_maps);
}
});

//# sourceMappingURL=display.js.map