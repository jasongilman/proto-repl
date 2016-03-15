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
var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_15656_15658 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_15657_15659 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_15656_15658,_STAR_print_fn_STAR_15657_15659,sb__7671__auto__,data){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_15656_15658,_STAR_print_fn_STAR_15657_15659,sb__7671__auto__,data))
;

try{fipp.edn.pprint.call(null,data);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_15657_15659;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_15656_15658;
}
return [cljs.core.str(sb__7671__auto__)].join('');
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
return cljs.core.clj__GT_js.call(null,cljs.core.into.call(null,cljs.core.PersistentVector.EMPTY,(function (){var iter__7469__auto__ = ((function (uniq_ids_to_values){
return (function proto_repl$edn_reader$saved_values_to_display_trees_$_iter__15668(s__15669){
return (new cljs.core.LazySeq(null,((function (uniq_ids_to_values){
return (function (){
var s__15669__$1 = s__15669;
while(true){
var temp__4657__auto__ = cljs.core.seq.call(null,s__15669__$1);
if(temp__4657__auto__){
var s__15669__$2 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,s__15669__$2)){
var c__7467__auto__ = cljs.core.chunk_first.call(null,s__15669__$2);
var size__7468__auto__ = cljs.core.count.call(null,c__7467__auto__);
var b__15671 = cljs.core.chunk_buffer.call(null,size__7468__auto__);
if((function (){var i__15670 = (0);
while(true){
if((i__15670 < size__7468__auto__)){
var vec__15674 = cljs.core._nth.call(null,c__7467__auto__,i__15670);
var uniq_id = cljs.core.nth.call(null,vec__15674,(0),null);
var vals = cljs.core.nth.call(null,vec__15674,(1),null);
cljs.core.chunk_append.call(null,b__15671,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(uniq_id)].join(''),proto_repl.edn_reader.display.saved_value_maps__GT_display_tree_table.call(null,vals)], null));

var G__15676 = (i__15670 + (1));
i__15670 = G__15676;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15671),proto_repl$edn_reader$saved_values_to_display_trees_$_iter__15668.call(null,cljs.core.chunk_rest.call(null,s__15669__$2)));
} else {
return cljs.core.chunk_cons.call(null,cljs.core.chunk.call(null,b__15671),null);
}
} else {
var vec__15675 = cljs.core.first.call(null,s__15669__$2);
var uniq_id = cljs.core.nth.call(null,vec__15675,(0),null);
var vals = cljs.core.nth.call(null,vec__15675,(1),null);
return cljs.core.cons.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [[cljs.core.str(uniq_id)].join(''),proto_repl.edn_reader.display.saved_value_maps__GT_display_tree_table.call(null,vals)], null),proto_repl$edn_reader$saved_values_to_display_trees_$_iter__15668.call(null,cljs.core.rest.call(null,s__15669__$2)));
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
return iter__7469__auto__.call(null,uniq_ids_to_values);
})()));
});
goog.exportSymbol('proto_repl.edn_reader.saved_values_to_display_trees', proto_repl.edn_reader.saved_values_to_display_trees);
proto_repl.edn_reader._main = (function proto_repl$edn_reader$_main(var_args){
var args__7762__auto__ = [];
var len__7755__auto___15678 = arguments.length;
var i__7756__auto___15679 = (0);
while(true){
if((i__7756__auto___15679 < len__7755__auto___15678)){
args__7762__auto__.push((arguments[i__7756__auto___15679]));

var G__15680 = (i__7756__auto___15679 + (1));
i__7756__auto___15679 = G__15680;
continue;
} else {
}
break;
}

var argseq__7763__auto__ = ((((0) < args__7762__auto__.length))?(new cljs.core.IndexedSeq(args__7762__auto__.slice((0)),(0))):null);
return proto_repl.edn_reader._main.cljs$core$IFn$_invoke$arity$variadic(argseq__7763__auto__);
});

proto_repl.edn_reader._main.cljs$core$IFn$_invoke$arity$variadic = (function (args){
return null;
});

proto_repl.edn_reader._main.cljs$lang$maxFixedArity = (0);

proto_repl.edn_reader._main.cljs$lang$applyTo = (function (seq15677){
return proto_repl.edn_reader._main.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq15677));
});
cljs.core._STAR_main_cli_fn_STAR_ = proto_repl.edn_reader._main;
module.exports = {"parse": proto_repl.edn_reader.parse, "pretty_print": proto_repl.edn_reader.pretty_print, "js_to_edn": proto_repl.edn_reader.js_to_edn, "to_display_tree": proto_repl.edn_reader.to_display_tree, "saved_values_to_display_trees": proto_repl.edn_reader.saved_values_to_display_trees};

//# sourceMappingURL=edn_reader.js.map