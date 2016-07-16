// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('proto_repl.edn_reader');
goog.require('cljs.core');
goog.require('cljs.reader');
goog.require('fipp.edn');
goog.require('clojure.walk');
goog.require('cljs.nodejs');
goog.require('proto_repl.edn_reader.display');
goog.require('clojure.string');
cljs.nodejs.enable_util_print_BANG_.call(null);
cljs.reader.register_default_tag_parser_BANG_.call(null,(function (tag,data){
return data;
}));
/**
 * Parses EDN into a JavaScript data.
 */
proto_repl.edn_reader.parse = (function proto_repl$edn_reader$parse(s){
var data = cljs.reader.read_string.call(null,s);
return cljs.core.clj__GT_js.call(null,data);
});
goog.exportSymbol('proto_repl.edn_reader.parse', proto_repl.edn_reader.parse);
/**
 * Reads in EDN data and pretty prints it to a string.
 */
proto_repl.edn_reader.pretty_print = (function proto_repl$edn_reader$pretty_print(s){
var data = cljs.reader.read_string.call(null,s);
var sb__9018__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_10333_10335 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_10334_10336 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_10333_10335,_STAR_print_fn_STAR_10334_10336,sb__9018__auto__,data){
return (function (x__9019__auto__){
return sb__9018__auto__.append(x__9019__auto__);
});})(_STAR_print_newline_STAR_10333_10335,_STAR_print_fn_STAR_10334_10336,sb__9018__auto__,data))
;

try{fipp.edn.pprint.call(null,data);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_10334_10336;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_10333_10335;
}
return [cljs.core.str(sb__9018__auto__)].join('');
});
goog.exportSymbol('proto_repl.edn_reader.pretty_print', proto_repl.edn_reader.pretty_print);
/**
 * Converts javascript data to EDN. keywordizes keys
 */
proto_repl.edn_reader.js_to_edn = (function proto_repl$edn_reader$js_to_edn(js_data){
return cljs.core.pr_str.call(null,clojure.walk.keywordize_keys.call(null,cljs.core.js__GT_clj.call(null,js_data)));
});
goog.exportSymbol('proto_repl.edn_reader.js_to_edn', proto_repl.edn_reader.js_to_edn);
/**
 * Converts the edn string into a displayable tree. A tree is a vector whose first
 * element is a string of the root of the tree. The rest of the elements are branches
 * off the root. Each branch is another tree. A leaf is represented by a vector
 * of one element.
 */
proto_repl.edn_reader.to_display_tree = (function proto_repl$edn_reader$to_display_tree(v){
return cljs.core.clj__GT_js.call(null,proto_repl.edn_reader.display.to_display_tree_STAR_.call(null,cljs.reader.read_string.call(null,v)));
});
goog.exportSymbol('proto_repl.edn_reader.to_display_tree', proto_repl.edn_reader.to_display_tree);
/**
 * Converts values saved using proto-repl-lib proto-repl/save into a displayable
 * table for displaying inline.
 */
proto_repl.edn_reader.saved_values_to_display_trees = (function proto_repl$edn_reader$saved_values_to_display_trees(uniq_ids_to_values_str){
var uniq_ids_to_values = cljs.reader.read_string.call(null,uniq_ids_to_values_str);
return cljs.core.clj__GT_js.call(null,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,(function (){var iter__8816__auto__ = ((function (uniq_ids_to_values){
return (function proto_repl$edn_reader$saved_values_to_display_trees_$_iter__10345(s__10346){
return (new cljs.core.LazySeq(null,((function (uniq_ids_to_values){
return (function (){
var s__10346__$1 = s__10346;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__10346__$1);
if(temp__4657__auto__){
var s__10346__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__10346__$2)){
var c__8814__auto__ = cljs.core.chunk_first.call(null,s__10346__$2);
var size__8815__auto__ = cljs.core.count.call(null,c__8814__auto__);
var b__10348 = cljs.core.chunk_buffer.call(null,size__8815__auto__);
if((function (){var i__10347 = (0);
while(true){
if((i__10347 < size__8815__auto__)){
var vec__10351 = cljs.core._nth.call(null,c__8814__auto__,i__10347);
var uniq_id = cljs.core.nth.call(null,vec__10351,(0),null);
var vals = cljs.core.nth.call(null,vec__10351,(1),null);
cljs.core.chunk_append.call(null,b__10348,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(uniq_id)].join(''),proto_repl.edn_reader.display.saved_values__GT_display_tree_table.call(null,vals)], null));

var G__10353 = (i__10347 + (1));
i__10347 = G__10353;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10348),proto_repl$edn_reader$saved_values_to_display_trees_$_iter__10345.call(null,cljs.core.chunk_rest.call(null,s__10346__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__10348),null);
}
} else {
var vec__10352 = cljs.core.first.call(null,s__10346__$2);
var uniq_id = cljs.core.nth.call(null,vec__10352,(0),null);
var vals = cljs.core.nth.call(null,vec__10352,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(uniq_id)].join(''),proto_repl.edn_reader.display.saved_values__GT_display_tree_table.call(null,vals)], null),proto_repl$edn_reader$saved_values_to_display_trees_$_iter__10345.call(null,cljs.core.rest.call(null,s__10346__$2)));
}
} else {
return null;
}
break;
}
});})(uniq_ids_to_values))
,null,null));
});})(uniq_ids_to_values))
;
return iter__8816__auto__.call(null,uniq_ids_to_values);
})()));
});
goog.exportSymbol('proto_repl.edn_reader.saved_values_to_display_trees', proto_repl.edn_reader.saved_values_to_display_trees);
proto_repl.edn_reader._main = (function proto_repl$edn_reader$_main(var_args){
var args__9109__auto__ = [];
var len__9102__auto___10355 = arguments.length;
var i__9103__auto___10356 = (0);
while(true){
if((i__9103__auto___10356 < len__9102__auto___10355)){
args__9109__auto__.push((arguments[i__9103__auto___10356]));

var G__10357 = (i__9103__auto___10356 + (1));
i__9103__auto___10356 = G__10357;
continue;
} else {
}
break;
}

var argseq__9110__auto__ = ((((0) < args__9109__auto__.length))?(new cljs.core.IndexedSeq(args__9109__auto__.slice((0)),(0))):null);
return proto_repl.edn_reader._main.cljs$core$IFn$_invoke$arity$variadic(argseq__9110__auto__);
});

proto_repl.edn_reader._main.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return null;
});

proto_repl.edn_reader._main.cljs$lang$maxFixedArity = (0);

proto_repl.edn_reader._main.cljs$lang$applyTo = (function (seq10354){
return proto_repl.edn_reader._main.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq10354));
});
cljs.core._STAR_main_cli_fn_STAR_ = proto_repl.edn_reader._main;
module.exports = {"parse": proto_repl.edn_reader.parse, "pretty_print": proto_repl.edn_reader.pretty_print, "js_to_edn": proto_repl.edn_reader.js_to_edn, "to_display_tree": proto_repl.edn_reader.to_display_tree, "saved_values_to_display_trees": proto_repl.edn_reader.saved_values_to_display_trees};

//# sourceMappingURL=edn_reader.js.map