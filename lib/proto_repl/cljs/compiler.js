// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cljs.compiler');
goog.require('cljs.core');
goog.require('goog.string');
goog.require('cljs.tools.reader');
goog.require('cljs.env');
goog.require('cljs.analyzer');
goog.require('cljs.source_map');
goog.require('goog.string.StringBuffer');
goog.require('clojure.string');
cljs.compiler.js_reserved = cljs.analyzer.js_reserved;
cljs.compiler._STAR_recompiled_STAR_ = null;
cljs.compiler._STAR_inputs_STAR_ = null;
cljs.compiler._STAR_source_map_data_STAR_ = null;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.PersistentArrayMap.EMPTY;
cljs.compiler.cljs_reserved_file_names = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 1, ["deps.cljs",null], null), null);
cljs.compiler.ns_first_segments = (function cljs$compiler$ns_first_segments(){
var get_first_ns_segment = (function cljs$compiler$ns_first_segments_$_get_first_ns_segment(ns){
return cljs.core.first.call(null,clojure.string.split.call(null,[cljs.core.str(ns)].join(''),/\./));
});
return cljs.core.map.call(null,get_first_ns_segment,cljs.core.keys.call(null,new cljs.core.Keyword("cljs.analyzer","namespaces","cljs.analyzer/namespaces",-260788927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))));
});
cljs.compiler.shadow_depth = (function cljs$compiler$shadow_depth(s){
var map__9843 = s;
var map__9843__$1 = ((((!((map__9843 == null)))?((((map__9843.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9843.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9843):map__9843);
var name = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__9843__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var d = (0);
var G__9846 = info;
var map__9847 = G__9846;
var map__9847__$1 = ((((!((map__9847 == null)))?((((map__9847.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9847.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9847):map__9847);
var shadow = cljs.core.get.call(null,map__9847__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
var d__$1 = d;
var G__9846__$1 = G__9846;
while(true){
var d__$2 = d__$1;
var map__9849 = G__9846__$1;
var map__9849__$1 = ((((!((map__9849 == null)))?((((map__9849.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9849.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9849):map__9849);
var shadow__$1 = cljs.core.get.call(null,map__9849__$1,new cljs.core.Keyword(null,"shadow","shadow",873231803));
if(cljs.core.truth_(shadow__$1)){
var G__9851 = (d__$2 + (1));
var G__9852 = shadow__$1;
d__$1 = G__9851;
G__9846__$1 = G__9852;
continue;
} else {
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([[cljs.core.str(name)].join('')], true),cljs.compiler.ns_first_segments.call(null)))){
return (d__$2 + (1));
} else {
return d__$2;

}
}
break;
}
});
cljs.compiler.hash_scope = (function cljs$compiler$hash_scope(s){
return cljs.core.hash_combine.call(null,cljs.core._hash.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(s)),cljs.compiler.shadow_depth.call(null,s));
});
cljs.compiler.fn_self_name = (function cljs$compiler$fn_self_name(p__9853){
var map__9858 = p__9853;
var map__9858__$1 = ((((!((map__9858 == null)))?((((map__9858.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9858.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9858):map__9858);
var name_var = map__9858__$1;
var name = cljs.core.get.call(null,map__9858__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var info = cljs.core.get.call(null,map__9858__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var name__$1 = clojure.string.replace.call(null,[cljs.core.str(name)].join(''),"..","_DOT__DOT_");
var map__9860 = info;
var map__9860__$1 = ((((!((map__9860 == null)))?((((map__9860.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9860.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9860):map__9860);
var ns = cljs.core.get.call(null,map__9860__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var fn_scope = cljs.core.get.call(null,map__9860__$1,new cljs.core.Keyword(null,"fn-scope","fn-scope",-865664859));
var scoped_name = cljs.core.apply.call(null,cljs.core.str,cljs.core.interpose.call(null,"_$_",cljs.core.concat.call(null,cljs.core.map.call(null,cljs.core.comp.call(null,cljs.core.str,new cljs.core.Keyword(null,"name","name",1843675177)),fn_scope),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [name__$1], null))));
return cljs.core.symbol.call(null,cljs.compiler.munge.call(null,[cljs.core.str(clojure.string.replace.call(null,[cljs.core.str(ns)].join(''),".","$")),cljs.core.str("$"),cljs.core.str(scoped_name)].join('')));
});
cljs.compiler.munge_reserved = (function cljs$compiler$munge_reserved(reserved){
return (function (s){
if(!((cljs.core.get.call(null,reserved,s) == null))){
return [cljs.core.str(s),cljs.core.str("$")].join('');
} else {
return s;
}
});
});
cljs.compiler.munge = (function cljs$compiler$munge(var_args){
var args9862 = [];
var len__7755__auto___9865 = arguments.length;
var i__7756__auto___9866 = (0);
while(true){
if((i__7756__auto___9866 < len__7755__auto___9865)){
args9862.push((arguments[i__7756__auto___9866]));

var G__9867 = (i__7756__auto___9866 + (1));
i__7756__auto___9866 = G__9867;
continue;
} else {
}
break;
}

var G__9864 = args9862.length;
switch (G__9864) {
case 1:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9862.length)].join('')));

}
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$1 = (function (s){
return cljs.compiler.munge.call(null,s,cljs.compiler.js_reserved);
});

cljs.compiler.munge.cljs$core$IFn$_invoke$arity$2 = (function (s,reserved){
if(cljs.analyzer.cljs_map_QMARK_.call(null,s)){
var name_var = s;
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(name_var);
var field = new cljs.core.Keyword(null,"field","field",-1302436500).cljs$core$IFn$_invoke$arity$1(name_var);
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(name_var);
if(!((new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531).cljs$core$IFn$_invoke$arity$1(info) == null))){
return cljs.compiler.fn_self_name.call(null,s);
} else {
var depth = cljs.compiler.shadow_depth.call(null,s);
var code = cljs.compiler.hash_scope.call(null,s);
var renamed = cljs.core.get.call(null,cljs.compiler._STAR_lexical_renames_STAR_,code);
var name__$1 = ((field === true)?[cljs.core.str("self__."),cljs.core.str(name)].join(''):((!((renamed == null)))?renamed:name
));
var munged_name = cljs.compiler.munge.call(null,name__$1,reserved);
if((field === true) || ((depth === (0)))){
return munged_name;
} else {
return cljs.core.symbol.call(null,[cljs.core.str(munged_name),cljs.core.str("__$"),cljs.core.str(depth)].join(''));
}
}
} else {
var ss = clojure.string.replace.call(null,[cljs.core.str(s)].join(''),"..","_DOT__DOT_");
var ss__$1 = clojure.string.replace.call(null,ss,(new RegExp("\\/(.)")),".$1");
var rf = cljs.compiler.munge_reserved.call(null,reserved);
var ss__$2 = cljs.core.map.call(null,rf,clojure.string.split.call(null,ss__$1,/\./));
var ss__$3 = clojure.string.join.call(null,".",ss__$2);
var ms = cljs.core.munge.call(null,ss__$3);
if((s instanceof cljs.core.Symbol)){
return cljs.core.symbol.call(null,ms);
} else {
return ms;
}
}
});

cljs.compiler.munge.cljs$lang$maxFixedArity = 2;
cljs.compiler.comma_sep = (function cljs$compiler$comma_sep(xs){
return cljs.core.interpose.call(null,",",xs);
});
cljs.compiler.escape_char = (function cljs$compiler$escape_char(c){
var cp = goog.string.hashCode(c);
var G__9870 = cp;
switch (G__9870) {
case (34):
return "\\\"";

break;
case (92):
return "\\\\";

break;
case (8):
return "\\b";

break;
case (12):
return "\\f";

break;
case (10):
return "\\n";

break;
case (13):
return "\\r";

break;
case (9):
return "\\t";

break;
default:
if((((31) < cp)) && ((cp < (127)))){
return c;
} else {
return [cljs.core.str("\\u"),cljs.core.str(cp.toString((16)))].join('');
}

}
});
cljs.compiler.escape_string = (function cljs$compiler$escape_string(s){
var sb = (new goog.string.StringBuffer());
var seq__9876_9880 = cljs.core.seq.call(null,s);
var chunk__9877_9881 = null;
var count__9878_9882 = (0);
var i__9879_9883 = (0);
while(true){
if((i__9879_9883 < count__9878_9882)){
var c_9884 = cljs.core._nth.call(null,chunk__9877_9881,i__9879_9883);
sb.append(cljs.compiler.escape_char.call(null,c_9884));

var G__9885 = seq__9876_9880;
var G__9886 = chunk__9877_9881;
var G__9887 = count__9878_9882;
var G__9888 = (i__9879_9883 + (1));
seq__9876_9880 = G__9885;
chunk__9877_9881 = G__9886;
count__9878_9882 = G__9887;
i__9879_9883 = G__9888;
continue;
} else {
var temp__4657__auto___9889 = cljs.core.seq.call(null,seq__9876_9880);
if(temp__4657__auto___9889){
var seq__9876_9890__$1 = temp__4657__auto___9889;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9876_9890__$1)){
var c__7500__auto___9891 = cljs.core.chunk_first.call(null,seq__9876_9890__$1);
var G__9892 = cljs.core.chunk_rest.call(null,seq__9876_9890__$1);
var G__9893 = c__7500__auto___9891;
var G__9894 = cljs.core.count.call(null,c__7500__auto___9891);
var G__9895 = (0);
seq__9876_9880 = G__9892;
chunk__9877_9881 = G__9893;
count__9878_9882 = G__9894;
i__9879_9883 = G__9895;
continue;
} else {
var c_9896 = cljs.core.first.call(null,seq__9876_9890__$1);
sb.append(cljs.compiler.escape_char.call(null,c_9896));

var G__9897 = cljs.core.next.call(null,seq__9876_9890__$1);
var G__9898 = null;
var G__9899 = (0);
var G__9900 = (0);
seq__9876_9880 = G__9897;
chunk__9877_9881 = G__9898;
count__9878_9882 = G__9899;
i__9879_9883 = G__9900;
continue;
}
} else {
}
}
break;
}

return sb.toString();
});
cljs.compiler.wrap_in_double_quotes = (function cljs$compiler$wrap_in_double_quotes(x){
return [cljs.core.str("\""),cljs.core.str(x),cljs.core.str("\"")].join('');
});
if(typeof cljs.compiler.emit_STAR_ !== 'undefined'){
} else {
cljs.compiler.emit_STAR_ = (function (){var method_table__7610__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7611__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7612__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7614__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit*"),new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7614__auto__,method_table__7610__auto__,prefer_table__7611__auto__,method_cache__7612__auto__,cached_hierarchy__7613__auto__));
})();
}
cljs.compiler.emit = (function cljs$compiler$emit(ast){
var val__8410__auto__ = cljs.env._STAR_compiler_STAR_;
if((val__8410__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = cljs.env.default_compiler_env.call(null);
} else {
}

try{if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
var map__9906_9911 = ast;
var map__9906_9912__$1 = ((((!((map__9906_9911 == null)))?((((map__9906_9911.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9906_9911.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9906_9911):map__9906_9911);
var env_9913 = cljs.core.get.call(null,map__9906_9912__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core.truth_(new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(env_9913))){
var map__9908_9914 = env_9913;
var map__9908_9915__$1 = ((((!((map__9908_9914 == null)))?((((map__9908_9914.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9908_9914.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9908_9914):map__9908_9914);
var line_9916 = cljs.core.get.call(null,map__9908_9915__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_9917 = cljs.core.get.call(null,map__9908_9915__$1,new cljs.core.Keyword(null,"column","column",2078222095));
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,((function (map__9908_9914,map__9908_9915__$1,line_9916,column_9917,map__9906_9911,map__9906_9912__$1,env_9913,val__8410__auto__){
return (function (m){
var minfo = (function (){var G__9910 = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gcol","gcol",309250807),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303).cljs$core$IFn$_invoke$arity$1(m),new cljs.core.Keyword(null,"gline","gline",-1086242431),new cljs.core.Keyword(null,"gen-line","gen-line",589592125).cljs$core$IFn$_invoke$arity$1(m)], null);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(ast),new cljs.core.Keyword(null,"var","var",-769682797))){
return cljs.core.assoc.call(null,G__9910,new cljs.core.Keyword(null,"name","name",1843675177),[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(ast)))].join(''));
} else {
return G__9910;
}
})();
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"source-map","source-map",1706252311),(line_9916 - (1))], null),cljs.core.fnil.call(null,((function (minfo,map__9908_9914,map__9908_9915__$1,line_9916,column_9917,map__9906_9911,map__9906_9912__$1,env_9913,val__8410__auto__){
return (function (line__$1){
return cljs.core.update_in.call(null,line__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [(cljs.core.truth_(column_9917)?(column_9917 - (1)):(0))], null),cljs.core.fnil.call(null,((function (minfo,map__9908_9914,map__9908_9915__$1,line_9916,column_9917,map__9906_9911,map__9906_9912__$1,env_9913,val__8410__auto__){
return (function (column__$1){
return cljs.core.conj.call(null,column__$1,minfo);
});})(minfo,map__9908_9914,map__9908_9915__$1,line_9916,column_9917,map__9906_9911,map__9906_9912__$1,env_9913,val__8410__auto__))
,cljs.core.PersistentVector.EMPTY));
});})(minfo,map__9908_9914,map__9908_9915__$1,line_9916,column_9917,map__9906_9911,map__9906_9912__$1,env_9913,val__8410__auto__))
,cljs.core.sorted_map.call(null)));
});})(map__9908_9914,map__9908_9915__$1,line_9916,column_9917,map__9906_9911,map__9906_9912__$1,env_9913,val__8410__auto__))
);
} else {
}
} else {
}

return cljs.compiler.emit_STAR_.call(null,ast);
}finally {if((val__8410__auto__ == null)){
cljs.env._STAR_compiler_STAR_ = null;
} else {
}
}});
cljs.compiler.emits = (function cljs$compiler$emits(var_args){
var args__7762__auto__ = [];
var len__7755__auto___9924 = arguments.length;
var i__7756__auto___9925 = (0);
while(true){
if((i__7756__auto___9925 < len__7755__auto___9924)){
args__7762__auto__.push((arguments[i__7756__auto___9925]));

var G__9926 = (i__7756__auto___9925 + (1));
i__7756__auto___9925 = G__9926;
continue;
} else {
}
break;
}

var argseq__7763__auto__ = ((((0) < args__7762__auto__.length))?(new cljs.core.IndexedSeq(args__7762__auto__.slice((0)),(0))):null);
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(argseq__7763__auto__);
});

cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
var seq__9920_9927 = cljs.core.seq.call(null,xs);
var chunk__9921_9928 = null;
var count__9922_9929 = (0);
var i__9923_9930 = (0);
while(true){
if((i__9923_9930 < count__9922_9929)){
var x_9931 = cljs.core._nth.call(null,chunk__9921_9928,i__9923_9930);
if((x_9931 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x_9931)){
cljs.compiler.emit.call(null,x_9931);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x_9931)){
cljs.core.apply.call(null,cljs.compiler.emits,x_9931);
} else {
if(goog.isFunction(x_9931)){
x_9931.call(null);
} else {
var s_9932 = cljs.core.print_str.call(null,x_9931);
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__9920_9927,chunk__9921_9928,count__9922_9929,i__9923_9930,s_9932,x_9931){
return (function (p1__9918_SHARP_){
return (p1__9918_SHARP_ + cljs.core.count.call(null,s_9932));
});})(seq__9920_9927,chunk__9921_9928,count__9922_9929,i__9923_9930,s_9932,x_9931))
);
}

cljs.core.print.call(null,s_9932);

}
}
}
}

var G__9933 = seq__9920_9927;
var G__9934 = chunk__9921_9928;
var G__9935 = count__9922_9929;
var G__9936 = (i__9923_9930 + (1));
seq__9920_9927 = G__9933;
chunk__9921_9928 = G__9934;
count__9922_9929 = G__9935;
i__9923_9930 = G__9936;
continue;
} else {
var temp__4657__auto___9937 = cljs.core.seq.call(null,seq__9920_9927);
if(temp__4657__auto___9937){
var seq__9920_9938__$1 = temp__4657__auto___9937;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9920_9938__$1)){
var c__7500__auto___9939 = cljs.core.chunk_first.call(null,seq__9920_9938__$1);
var G__9940 = cljs.core.chunk_rest.call(null,seq__9920_9938__$1);
var G__9941 = c__7500__auto___9939;
var G__9942 = cljs.core.count.call(null,c__7500__auto___9939);
var G__9943 = (0);
seq__9920_9927 = G__9940;
chunk__9921_9928 = G__9941;
count__9922_9929 = G__9942;
i__9923_9930 = G__9943;
continue;
} else {
var x_9944 = cljs.core.first.call(null,seq__9920_9938__$1);
if((x_9944 == null)){
} else {
if(cljs.analyzer.cljs_map_QMARK_.call(null,x_9944)){
cljs.compiler.emit.call(null,x_9944);
} else {
if(cljs.analyzer.cljs_seq_QMARK_.call(null,x_9944)){
cljs.core.apply.call(null,cljs.compiler.emits,x_9944);
} else {
if(goog.isFunction(x_9944)){
x_9944.call(null);
} else {
var s_9945 = cljs.core.print_str.call(null,x_9944);
if((cljs.compiler._STAR_source_map_data_STAR_ == null)){
} else {
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gen-col","gen-col",1901918303)], null),((function (seq__9920_9927,chunk__9921_9928,count__9922_9929,i__9923_9930,s_9945,x_9944,seq__9920_9938__$1,temp__4657__auto___9937){
return (function (p1__9918_SHARP_){
return (p1__9918_SHARP_ + cljs.core.count.call(null,s_9945));
});})(seq__9920_9927,chunk__9921_9928,count__9922_9929,i__9923_9930,s_9945,x_9944,seq__9920_9938__$1,temp__4657__auto___9937))
);
}

cljs.core.print.call(null,s_9945);

}
}
}
}

var G__9946 = cljs.core.next.call(null,seq__9920_9938__$1);
var G__9947 = null;
var G__9948 = (0);
var G__9949 = (0);
seq__9920_9927 = G__9946;
chunk__9921_9928 = G__9947;
count__9922_9929 = G__9948;
i__9923_9930 = G__9949;
continue;
}
} else {
}
}
break;
}

return null;
});

cljs.compiler.emits.cljs$lang$maxFixedArity = (0);

cljs.compiler.emits.cljs$lang$applyTo = (function (seq9919){
return cljs.compiler.emits.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq9919));
});
cljs.compiler.emitln = (function cljs$compiler$emitln(var_args){
var args__7762__auto__ = [];
var len__7755__auto___9954 = arguments.length;
var i__7756__auto___9955 = (0);
while(true){
if((i__7756__auto___9955 < len__7755__auto___9954)){
args__7762__auto__.push((arguments[i__7756__auto___9955]));

var G__9956 = (i__7756__auto___9955 + (1));
i__7756__auto___9955 = G__9956;
continue;
} else {
}
break;
}

var argseq__7763__auto__ = ((((0) < args__7762__auto__.length))?(new cljs.core.IndexedSeq(args__7762__auto__.slice((0)),(0))):null);
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(argseq__7763__auto__);
});

cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic = (function (xs){
cljs.core.apply.call(null,cljs.compiler.emits,xs);

cljs.core.println.call(null);

if(cljs.core.truth_(cljs.compiler._STAR_source_map_data_STAR_)){
cljs.core.swap_BANG_.call(null,cljs.compiler._STAR_source_map_data_STAR_,(function (p__9951){
var map__9952 = p__9951;
var map__9952__$1 = ((((!((map__9952 == null)))?((((map__9952.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9952.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9952):map__9952);
var m = map__9952__$1;
var gen_line = cljs.core.get.call(null,map__9952__$1,new cljs.core.Keyword(null,"gen-line","gen-line",589592125));
return cljs.core.assoc.call(null,m,new cljs.core.Keyword(null,"gen-line","gen-line",589592125),(gen_line + (1)),new cljs.core.Keyword(null,"gen-col","gen-col",1901918303),(0));
}));
} else {
}

return null;
});

cljs.compiler.emitln.cljs$lang$maxFixedArity = (0);

cljs.compiler.emitln.cljs$lang$applyTo = (function (seq9950){
return cljs.compiler.emitln.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq.call(null,seq9950));
});
cljs.compiler.emit_str = (function cljs$compiler$emit_str(expr){
var sb__7671__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR_9959_9961 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR_9960_9962 = cljs.core._STAR_print_fn_STAR_;
cljs.core._STAR_print_newline_STAR_ = true;

cljs.core._STAR_print_fn_STAR_ = ((function (_STAR_print_newline_STAR_9959_9961,_STAR_print_fn_STAR_9960_9962,sb__7671__auto__){
return (function (x__7672__auto__){
return sb__7671__auto__.append(x__7672__auto__);
});})(_STAR_print_newline_STAR_9959_9961,_STAR_print_fn_STAR_9960_9962,sb__7671__auto__))
;

try{cljs.compiler.emit.call(null,expr);
}finally {cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR_9960_9962;

cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR_9959_9961;
}
return [cljs.core.str(sb__7671__auto__)].join('');
});
if(typeof cljs.compiler.emit_constant !== 'undefined'){
} else {
cljs.compiler.emit_constant = (function (){var method_table__7610__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var prefer_table__7611__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var method_cache__7612__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var cached_hierarchy__7613__auto__ = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var hierarchy__7614__auto__ = cljs.core.get.call(null,cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"hierarchy","hierarchy",-1053470341),cljs.core.get_global_hierarchy.call(null));
return (new cljs.core.MultiFn(cljs.core.symbol.call(null,"cljs.compiler","emit-constant"),cljs.core.type,new cljs.core.Keyword(null,"default","default",-1987822328),hierarchy__7614__auto__,method_table__7610__auto__,prefer_table__7611__auto__,method_cache__7612__auto__,cached_hierarchy__7613__auto__));
})();
}
cljs.core._add_method.call(null,cljs.compiler.emit_constant,null,(function (x){
return cljs.compiler.emits.call(null,"null");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,Number,(function (x){
return cljs.compiler.emits.call(null,"(",x,")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,String,(function (x){
return cljs.compiler.emits.call(null,cljs.compiler.wrap_in_double_quotes.call(null,cljs.compiler.escape_string.call(null,x)));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,Boolean,(function (x){
return cljs.compiler.emits.call(null,(cljs.core.truth_(x)?"true":"false"));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,RegExp,(function (x){
if(cljs.core._EQ_.call(null,"",[cljs.core.str(x)].join(''))){
return cljs.compiler.emits.call(null,"(new RegExp(\"\"))");
} else {
var vec__9963 = cljs.core.re_find.call(null,/^(?:\(\?([idmsux]*)\))?(.*)/,[cljs.core.str(x)].join(''));
var _ = cljs.core.nth.call(null,vec__9963,(0),null);
var flags = cljs.core.nth.call(null,vec__9963,(1),null);
var pattern = cljs.core.nth.call(null,vec__9963,(2),null);
return cljs.compiler.emits.call(null,pattern);
}
}));
cljs.compiler.emits_keyword = (function cljs$compiler$emits_keyword(kw){
var ns = cljs.core.namespace.call(null,kw);
var name = cljs.core.name.call(null,kw);
cljs.compiler.emits.call(null,"new cljs.core.Keyword(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,(cljs.core.truth_(ns)?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,kw));

return cljs.compiler.emits.call(null,")");
});
cljs.compiler.emits_symbol = (function cljs$compiler$emits_symbol(sym){
var ns = cljs.core.namespace.call(null,sym);
var name = cljs.core.name.call(null,sym);
var symstr = ((!((ns == null)))?[cljs.core.str(ns),cljs.core.str("/"),cljs.core.str(name)].join(''):name);
cljs.compiler.emits.call(null,"new cljs.core.Symbol(");

cljs.compiler.emit_constant.call(null,ns);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,name);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,symstr);

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,cljs.core.hash.call(null,sym));

cljs.compiler.emits.call(null,",");

cljs.compiler.emit_constant.call(null,null);

return cljs.compiler.emits.call(null,")");
});
cljs.core._add_method.call(null,cljs.compiler.emit_constant,cljs.core.Keyword,(function (x){
if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))))){
var value = x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_keyword.call(null,x);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,cljs.core.Symbol,(function (x){
if(cljs.core.truth_(new cljs.core.Keyword(null,"emit-constants","emit-constants",-476585410).cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"options","options",99638489).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_))))){
var value = x.call(null,new cljs.core.Keyword("cljs.analyzer","constant-table","cljs.analyzer/constant-table",-114131889).cljs$core$IFn$_invoke$arity$1(cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_)));
return cljs.compiler.emits.call(null,"cljs.core.",value);
} else {
return cljs.compiler.emits_symbol.call(null,x);
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,Date,(function (date){
return cljs.compiler.emits.call(null,"new Date(",date.getTime(),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_constant,cljs.core.UUID,(function (uuid){
var uuid_str = uuid.toString();
return cljs.compiler.emits.call(null,"new cljs.core.UUID(\"",uuid_str,"\", ",cljs.core.hash.call(null,uuid_str),")");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"no-op","no-op",-93046065),(function (m){
return null;
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var","var",-769682797),(function (p__9965){
var map__9966 = p__9965;
var map__9966__$1 = ((((!((map__9966 == null)))?((((map__9966.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9966.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9966):map__9966);
var arg = map__9966__$1;
var info = cljs.core.get.call(null,map__9966__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var env = cljs.core.get.call(null,map__9966__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var form = cljs.core.get.call(null,map__9966__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var var_name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
var info__$1 = ((cljs.core._EQ_.call(null,cljs.core.namespace.call(null,var_name),"js"))?(function (){var js_module_name = cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"js-module-index","js-module-index",2072061931),cljs.core.name.call(null,var_name)], null));
var or__6697__auto__ = js_module_name;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core.name.call(null,var_name);
}
})():info);
if(cljs.core.truth_(new cljs.core.Keyword(null,"binding-form?","binding-form?",1728940169).cljs$core$IFn$_invoke$arity$1(arg))){
return cljs.compiler.emits.call(null,cljs.compiler.munge.call(null,arg));
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,(function (){var G__9968 = info__$1;
if(cljs.core.not_EQ_.call(null,form,new cljs.core.Symbol("js","-Infinity","js/-Infinity",958706333,null))){
return cljs.compiler.munge.call(null,G__9968);
} else {
return G__9968;
}
})());

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"var-special","var-special",1131576802),(function (p__9969){
var map__9970 = p__9969;
var map__9970__$1 = ((((!((map__9970 == null)))?((((map__9970.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9970.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9970):map__9970);
var arg = map__9970__$1;
var env = cljs.core.get.call(null,map__9970__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var var$ = cljs.core.get.call(null,map__9970__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var sym = cljs.core.get.call(null,map__9970__$1,new cljs.core.Keyword(null,"sym","sym",-1444860305));
var meta = cljs.core.get.call(null,map__9970__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
if(cljs.analyzer.ast_QMARK_.call(null,sym)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol("ana","ast?","ana/ast?",1470128118,null),new cljs.core.Symbol(null,"sym","sym",195671222,null))))].join('')));
}

if(cljs.analyzer.ast_QMARK_.call(null,meta)){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol("ana","ast?","ana/ast?",1470128118,null),new cljs.core.Symbol(null,"meta","meta",-1154898805,null))))].join('')));
}

var map__9972 = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(var$);
var map__9972__$1 = ((((!((map__9972 == null)))?((((map__9972.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9972.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9972):map__9972);
var name = cljs.core.get.call(null,map__9972__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"new cljs.core.Var(function(){return ",cljs.compiler.munge.call(null,name),";},",sym,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"meta","meta",1499536964),(function (p__9974){
var map__9975 = p__9974;
var map__9975__$1 = ((((!((map__9975 == null)))?((((map__9975.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9975.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9975):map__9975);
var expr = cljs.core.get.call(null,map__9975__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var meta = cljs.core.get.call(null,map__9975__$1,new cljs.core.Keyword(null,"meta","meta",1499536964));
var env = cljs.core.get.call(null,map__9975__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"cljs.core.with_meta(",expr,",",meta,")");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.array_map_threshold = (8);
cljs.compiler.distinct_keys_QMARK_ = (function cljs$compiler$distinct_keys_QMARK_(keys){
return (cljs.core.every_QMARK_.call(null,(function (p1__9977_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__9977_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),keys)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,keys)),cljs.core.count.call(null,keys)));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"map","map",1371690461),(function (p__9978){
var map__9979 = p__9978;
var map__9979__$1 = ((((!((map__9979 == null)))?((((map__9979.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9979.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9979):map__9979);
var env = cljs.core.get.call(null,map__9979__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var keys = cljs.core.get.call(null,map__9979__$1,new cljs.core.Keyword(null,"keys","keys",1068423698));
var vals = cljs.core.get.call(null,map__9979__$1,new cljs.core.Keyword(null,"vals","vals",768058733));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if((cljs.core.count.call(null,keys) === (0))){
cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.EMPTY");
} else {
if((cljs.core.count.call(null,keys) <= cljs.compiler.array_map_threshold)){
if(cljs.core.truth_(cljs.compiler.distinct_keys_QMARK_.call(null,keys))){
cljs.compiler.emits.call(null,"new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,keys),", [",cljs.compiler.comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"], null)");
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentArrayMap.fromArray([",cljs.compiler.comma_sep.call(null,cljs.core.interleave.call(null,keys,vals)),"], true, false)");
}
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentHashMap.fromArrays([",cljs.compiler.comma_sep.call(null,keys),"],[",cljs.compiler.comma_sep.call(null,vals),"])");

}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"list","list",765357683),(function (p__9981){
var map__9982 = p__9981;
var map__9982__$1 = ((((!((map__9982 == null)))?((((map__9982.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9982.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9982):map__9982);
var items = cljs.core.get.call(null,map__9982__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__9982__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.empty_QMARK_.call(null,items)){
cljs.compiler.emits.call(null,"cljs.core.List.EMPTY");
} else {
cljs.compiler.emits.call(null,"cljs.core.list(",cljs.compiler.comma_sep.call(null,items),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"vector","vector",1902966158),(function (p__9984){
var map__9985 = p__9984;
var map__9985__$1 = ((((!((map__9985 == null)))?((((map__9985.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9985.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9985):map__9985);
var items = cljs.core.get.call(null,map__9985__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__9985__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.empty_QMARK_.call(null,items)){
cljs.compiler.emits.call(null,"cljs.core.PersistentVector.EMPTY");
} else {
var cnt_9987 = cljs.core.count.call(null,items);
if((cnt_9987 < (32))){
cljs.compiler.emits.call(null,"new cljs.core.PersistentVector(null, ",cnt_9987,", 5, cljs.core.PersistentVector.EMPTY_NODE, [",cljs.compiler.comma_sep.call(null,items),"], null)");
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentVector.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.distinct_constants_QMARK_ = (function cljs$compiler$distinct_constants_QMARK_(items){
return (cljs.core.every_QMARK_.call(null,(function (p1__9988_SHARP_){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(p1__9988_SHARP_),new cljs.core.Keyword(null,"constant","constant",-379609303));
}),items)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,items)),cljs.core.count.call(null,items)));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set","set",304602554),(function (p__9989){
var map__9990 = p__9989;
var map__9990__$1 = ((((!((map__9990 == null)))?((((map__9990.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9990.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9990):map__9990);
var items = cljs.core.get.call(null,map__9990__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var env = cljs.core.get.call(null,map__9990__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.empty_QMARK_.call(null,items)){
cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.EMPTY");
} else {
if(cljs.core.truth_(cljs.compiler.distinct_constants_QMARK_.call(null,items))){
cljs.compiler.emits.call(null,"new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, ",cljs.core.count.call(null,items),", [",cljs.compiler.comma_sep.call(null,cljs.core.interleave.call(null,items,cljs.core.repeat.call(null,"null"))),"], null), null)");
} else {
cljs.compiler.emits.call(null,"cljs.core.PersistentHashSet.fromArray([",cljs.compiler.comma_sep.call(null,items),"], true)");

}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js-value","js-value",-758336661),(function (p__9992){
var map__9993 = p__9992;
var map__9993__$1 = ((((!((map__9993 == null)))?((((map__9993.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9993.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9993):map__9993);
var items = cljs.core.get.call(null,map__9993__$1,new cljs.core.Keyword(null,"items","items",1031954938));
var js_type = cljs.core.get.call(null,map__9993__$1,new cljs.core.Keyword(null,"js-type","js-type",539386702));
var env = cljs.core.get.call(null,map__9993__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core._EQ_.call(null,js_type,new cljs.core.Keyword(null,"object","object",1474613949))){
cljs.compiler.emits.call(null,"{");

var temp__4657__auto___10003 = cljs.core.seq.call(null,items);
if(temp__4657__auto___10003){
var items_10004__$1 = temp__4657__auto___10003;
var vec__9995_10005 = items_10004__$1;
var vec__9996_10006 = cljs.core.nth.call(null,vec__9995_10005,(0),null);
var k_10007 = cljs.core.nth.call(null,vec__9996_10006,(0),null);
var v_10008 = cljs.core.nth.call(null,vec__9996_10006,(1),null);
var r_10009 = cljs.core.nthnext.call(null,vec__9995_10005,(1));
cljs.compiler.emits.call(null,"\"",cljs.core.name.call(null,k_10007),"\": ",v_10008);

var seq__9997_10010 = cljs.core.seq.call(null,r_10009);
var chunk__9998_10011 = null;
var count__9999_10012 = (0);
var i__10000_10013 = (0);
while(true){
if((i__10000_10013 < count__9999_10012)){
var vec__10001_10014 = cljs.core._nth.call(null,chunk__9998_10011,i__10000_10013);
var k_10015__$1 = cljs.core.nth.call(null,vec__10001_10014,(0),null);
var v_10016__$1 = cljs.core.nth.call(null,vec__10001_10014,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_10015__$1),"\": ",v_10016__$1);

var G__10017 = seq__9997_10010;
var G__10018 = chunk__9998_10011;
var G__10019 = count__9999_10012;
var G__10020 = (i__10000_10013 + (1));
seq__9997_10010 = G__10017;
chunk__9998_10011 = G__10018;
count__9999_10012 = G__10019;
i__10000_10013 = G__10020;
continue;
} else {
var temp__4657__auto___10021__$1 = cljs.core.seq.call(null,seq__9997_10010);
if(temp__4657__auto___10021__$1){
var seq__9997_10022__$1 = temp__4657__auto___10021__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9997_10022__$1)){
var c__7500__auto___10023 = cljs.core.chunk_first.call(null,seq__9997_10022__$1);
var G__10024 = cljs.core.chunk_rest.call(null,seq__9997_10022__$1);
var G__10025 = c__7500__auto___10023;
var G__10026 = cljs.core.count.call(null,c__7500__auto___10023);
var G__10027 = (0);
seq__9997_10010 = G__10024;
chunk__9998_10011 = G__10025;
count__9999_10012 = G__10026;
i__10000_10013 = G__10027;
continue;
} else {
var vec__10002_10028 = cljs.core.first.call(null,seq__9997_10022__$1);
var k_10029__$1 = cljs.core.nth.call(null,vec__10002_10028,(0),null);
var v_10030__$1 = cljs.core.nth.call(null,vec__10002_10028,(1),null);
cljs.compiler.emits.call(null,", \"",cljs.core.name.call(null,k_10029__$1),"\": ",v_10030__$1);

var G__10031 = cljs.core.next.call(null,seq__9997_10022__$1);
var G__10032 = null;
var G__10033 = (0);
var G__10034 = (0);
seq__9997_10010 = G__10031;
chunk__9998_10011 = G__10032;
count__9999_10012 = G__10033;
i__10000_10013 = G__10034;
continue;
}
} else {
}
}
break;
}
} else {
}

cljs.compiler.emits.call(null,"}");
} else {
cljs.compiler.emits.call(null,"[",cljs.compiler.comma_sep.call(null,items),"]");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"constant","constant",-379609303),(function (p__10035){
var map__10036 = p__10035;
var map__10036__$1 = ((((!((map__10036 == null)))?((((map__10036.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10036.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10036):map__10036);
var form = cljs.core.get.call(null,map__10036__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var env = cljs.core.get.call(null,map__10036__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emit_constant.call(null,form);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.truthy_constant_QMARK_ = (function cljs$compiler$truthy_constant_QMARK_(p__10038){
var map__10041 = p__10038;
var map__10041__$1 = ((((!((map__10041 == null)))?((((map__10041.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10041.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10041):map__10041);
var op = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__10041__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var and__6685__auto__ = cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"constant","constant",-379609303));
if(and__6685__auto__){
var and__6685__auto____$1 = form;
if(cljs.core.truth_(and__6685__auto____$1)){
return !(((typeof form === 'string') && (cljs.core._EQ_.call(null,form,""))) || ((typeof form === 'number') && ((form === (0)))));
} else {
return and__6685__auto____$1;
}
} else {
return and__6685__auto__;
}
});
cljs.compiler.falsey_constant_QMARK_ = (function cljs$compiler$falsey_constant_QMARK_(p__10043){
var map__10046 = p__10043;
var map__10046__$1 = ((((!((map__10046 == null)))?((((map__10046.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10046.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10046):map__10046);
var op = cljs.core.get.call(null,map__10046__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var form = cljs.core.get.call(null,map__10046__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
return (cljs.core._EQ_.call(null,op,new cljs.core.Keyword(null,"constant","constant",-379609303))) && ((form === false) || ((form == null)));
});
cljs.compiler.safe_test_QMARK_ = (function cljs$compiler$safe_test_QMARK_(env,e){
var tag = cljs.analyzer.infer_tag.call(null,env,e);
var or__6697__auto__ = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Symbol(null,"seq","seq",-177272256,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null], null), null).call(null,tag);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.compiler.truthy_constant_QMARK_.call(null,e);
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"if","if",-458814265),(function (p__10048){
var map__10049 = p__10048;
var map__10049__$1 = ((((!((map__10049 == null)))?((((map__10049.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10049.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10049):map__10049);
var test = cljs.core.get.call(null,map__10049__$1,new cljs.core.Keyword(null,"test","test",577538877));
var then = cljs.core.get.call(null,map__10049__$1,new cljs.core.Keyword(null,"then","then",460598070));
var else$ = cljs.core.get.call(null,map__10049__$1,new cljs.core.Keyword(null,"else","else",-1508377146));
var env = cljs.core.get.call(null,map__10049__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var unchecked = cljs.core.get.call(null,map__10049__$1,new cljs.core.Keyword(null,"unchecked","unchecked",924418378));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
var checked = cljs.core.not.call(null,(function (){var or__6697__auto__ = unchecked;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.compiler.safe_test_QMARK_.call(null,env,test);
}
})());
if(cljs.core.truth_(cljs.compiler.truthy_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,then);
} else {
if(cljs.core.truth_(cljs.compiler.falsey_constant_QMARK_.call(null,test))){
return cljs.compiler.emitln.call(null,else$);
} else {
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"(",((checked)?"cljs.core.truth_":null),"(",test,")?",then,":",else$,")");
} else {
if(checked){
cljs.compiler.emitln.call(null,"if(cljs.core.truth_(",test,")){");
} else {
cljs.compiler.emitln.call(null,"if(",test,"){");
}

cljs.compiler.emitln.call(null,then,"} else {");

return cljs.compiler.emitln.call(null,else$,"}");
}

}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"case*","case*",716180697),(function (p__10051){
var map__10052 = p__10051;
var map__10052__$1 = ((((!((map__10052 == null)))?((((map__10052.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10052.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10052):map__10052);
var v = cljs.core.get.call(null,map__10052__$1,new cljs.core.Keyword(null,"v","v",21465059));
var tests = cljs.core.get.call(null,map__10052__$1,new cljs.core.Keyword(null,"tests","tests",-1041085625));
var thens = cljs.core.get.call(null,map__10052__$1,new cljs.core.Keyword(null,"thens","thens",226631442));
var default$ = cljs.core.get.call(null,map__10052__$1,new cljs.core.Keyword(null,"default","default",-1987822328));
var env = cljs.core.get.call(null,map__10052__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env),new cljs.core.Keyword(null,"expr","expr",745722291))){
cljs.compiler.emitln.call(null,"(function(){");
} else {
}

var gs = cljs.core.gensym.call(null,"caseval__");
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"var ",gs,";");
} else {
}

cljs.compiler.emitln.call(null,"switch (",v,") {");

var seq__10054_10068 = cljs.core.seq.call(null,cljs.core.partition.call(null,(2),cljs.core.interleave.call(null,tests,thens)));
var chunk__10055_10069 = null;
var count__10056_10070 = (0);
var i__10057_10071 = (0);
while(true){
if((i__10057_10071 < count__10056_10070)){
var vec__10058_10072 = cljs.core._nth.call(null,chunk__10055_10069,i__10057_10071);
var ts_10073 = cljs.core.nth.call(null,vec__10058_10072,(0),null);
var then_10074 = cljs.core.nth.call(null,vec__10058_10072,(1),null);
var seq__10059_10075 = cljs.core.seq.call(null,ts_10073);
var chunk__10060_10076 = null;
var count__10061_10077 = (0);
var i__10062_10078 = (0);
while(true){
if((i__10062_10078 < count__10061_10077)){
var test_10079 = cljs.core._nth.call(null,chunk__10060_10076,i__10062_10078);
cljs.compiler.emitln.call(null,"case ",test_10079,":");

var G__10080 = seq__10059_10075;
var G__10081 = chunk__10060_10076;
var G__10082 = count__10061_10077;
var G__10083 = (i__10062_10078 + (1));
seq__10059_10075 = G__10080;
chunk__10060_10076 = G__10081;
count__10061_10077 = G__10082;
i__10062_10078 = G__10083;
continue;
} else {
var temp__4657__auto___10084 = cljs.core.seq.call(null,seq__10059_10075);
if(temp__4657__auto___10084){
var seq__10059_10085__$1 = temp__4657__auto___10084;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10059_10085__$1)){
var c__7500__auto___10086 = cljs.core.chunk_first.call(null,seq__10059_10085__$1);
var G__10087 = cljs.core.chunk_rest.call(null,seq__10059_10085__$1);
var G__10088 = c__7500__auto___10086;
var G__10089 = cljs.core.count.call(null,c__7500__auto___10086);
var G__10090 = (0);
seq__10059_10075 = G__10087;
chunk__10060_10076 = G__10088;
count__10061_10077 = G__10089;
i__10062_10078 = G__10090;
continue;
} else {
var test_10091 = cljs.core.first.call(null,seq__10059_10085__$1);
cljs.compiler.emitln.call(null,"case ",test_10091,":");

var G__10092 = cljs.core.next.call(null,seq__10059_10085__$1);
var G__10093 = null;
var G__10094 = (0);
var G__10095 = (0);
seq__10059_10075 = G__10092;
chunk__10060_10076 = G__10093;
count__10061_10077 = G__10094;
i__10062_10078 = G__10095;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_10074);
} else {
cljs.compiler.emitln.call(null,then_10074);
}

cljs.compiler.emitln.call(null,"break;");

var G__10096 = seq__10054_10068;
var G__10097 = chunk__10055_10069;
var G__10098 = count__10056_10070;
var G__10099 = (i__10057_10071 + (1));
seq__10054_10068 = G__10096;
chunk__10055_10069 = G__10097;
count__10056_10070 = G__10098;
i__10057_10071 = G__10099;
continue;
} else {
var temp__4657__auto___10100 = cljs.core.seq.call(null,seq__10054_10068);
if(temp__4657__auto___10100){
var seq__10054_10101__$1 = temp__4657__auto___10100;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10054_10101__$1)){
var c__7500__auto___10102 = cljs.core.chunk_first.call(null,seq__10054_10101__$1);
var G__10103 = cljs.core.chunk_rest.call(null,seq__10054_10101__$1);
var G__10104 = c__7500__auto___10102;
var G__10105 = cljs.core.count.call(null,c__7500__auto___10102);
var G__10106 = (0);
seq__10054_10068 = G__10103;
chunk__10055_10069 = G__10104;
count__10056_10070 = G__10105;
i__10057_10071 = G__10106;
continue;
} else {
var vec__10063_10107 = cljs.core.first.call(null,seq__10054_10101__$1);
var ts_10108 = cljs.core.nth.call(null,vec__10063_10107,(0),null);
var then_10109 = cljs.core.nth.call(null,vec__10063_10107,(1),null);
var seq__10064_10110 = cljs.core.seq.call(null,ts_10108);
var chunk__10065_10111 = null;
var count__10066_10112 = (0);
var i__10067_10113 = (0);
while(true){
if((i__10067_10113 < count__10066_10112)){
var test_10114 = cljs.core._nth.call(null,chunk__10065_10111,i__10067_10113);
cljs.compiler.emitln.call(null,"case ",test_10114,":");

var G__10115 = seq__10064_10110;
var G__10116 = chunk__10065_10111;
var G__10117 = count__10066_10112;
var G__10118 = (i__10067_10113 + (1));
seq__10064_10110 = G__10115;
chunk__10065_10111 = G__10116;
count__10066_10112 = G__10117;
i__10067_10113 = G__10118;
continue;
} else {
var temp__4657__auto___10119__$1 = cljs.core.seq.call(null,seq__10064_10110);
if(temp__4657__auto___10119__$1){
var seq__10064_10120__$1 = temp__4657__auto___10119__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10064_10120__$1)){
var c__7500__auto___10121 = cljs.core.chunk_first.call(null,seq__10064_10120__$1);
var G__10122 = cljs.core.chunk_rest.call(null,seq__10064_10120__$1);
var G__10123 = c__7500__auto___10121;
var G__10124 = cljs.core.count.call(null,c__7500__auto___10121);
var G__10125 = (0);
seq__10064_10110 = G__10122;
chunk__10065_10111 = G__10123;
count__10066_10112 = G__10124;
i__10067_10113 = G__10125;
continue;
} else {
var test_10126 = cljs.core.first.call(null,seq__10064_10120__$1);
cljs.compiler.emitln.call(null,"case ",test_10126,":");

var G__10127 = cljs.core.next.call(null,seq__10064_10120__$1);
var G__10128 = null;
var G__10129 = (0);
var G__10130 = (0);
seq__10064_10110 = G__10127;
chunk__10065_10111 = G__10128;
count__10066_10112 = G__10129;
i__10067_10113 = G__10130;
continue;
}
} else {
}
}
break;
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",then_10109);
} else {
cljs.compiler.emitln.call(null,then_10109);
}

cljs.compiler.emitln.call(null,"break;");

var G__10131 = cljs.core.next.call(null,seq__10054_10101__$1);
var G__10132 = null;
var G__10133 = (0);
var G__10134 = (0);
seq__10054_10068 = G__10131;
chunk__10055_10069 = G__10132;
count__10056_10070 = G__10133;
i__10057_10071 = G__10134;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(default$)){
cljs.compiler.emitln.call(null,"default:");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,gs,"=",default$);
} else {
cljs.compiler.emitln.call(null,default$);
}
} else {
}

cljs.compiler.emitln.call(null,"}");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emitln.call(null,"return ",gs,";})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"throw","throw",-1044625833),(function (p__10135){
var map__10136 = p__10135;
var map__10136__$1 = ((((!((map__10136 == null)))?((((map__10136.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10136.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10136):map__10136);
var throw$ = cljs.core.get.call(null,map__10136__$1,new cljs.core.Keyword(null,"throw","throw",-1044625833));
var env = cljs.core.get.call(null,map__10136__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return cljs.compiler.emits.call(null,"(function(){throw ",throw$,"})()");
} else {
return cljs.compiler.emitln.call(null,"throw ",throw$,";");
}
}));
cljs.compiler.base_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 15, ["boolean",null,"object",null,"*",null,"string",null,"Object",null,"Number",null,"null",null,"Date",null,"number",null,"String",null,"RegExp",null,"...*",null,"Array",null,"array",null,"Boolean",null], null), null);
cljs.compiler.mapped_types = new cljs.core.PersistentArrayMap(null, 1, ["nil","null"], null);
cljs.compiler.resolve_type = (function cljs$compiler$resolve_type(env,t){
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.base_types,t))){
return t;
} else {
if(cljs.core.truth_(cljs.core.get.call(null,cljs.compiler.mapped_types,t))){
return cljs.core.get.call(null,cljs.compiler.mapped_types,t);
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"!"))){
return [cljs.core.str("!"),cljs.core.str(cljs$compiler$resolve_type.call(null,env,cljs.core.subs.call(null,t,(1))))].join('');
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"{"))){
return t;
} else {
if(cljs.core.truth_(goog.string.startsWith(t,"function"))){
var idx = t.lastIndexOf(":");
var vec__10141 = ((!(((-1) === idx)))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.subs.call(null,t,(0),idx),cljs.core.subs.call(null,t,(idx + (1)),cljs.core.count.call(null,t))], null):new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [t,null], null));
var fstr = cljs.core.nth.call(null,vec__10141,(0),null);
var rstr = cljs.core.nth.call(null,vec__10141,(1),null);
var ret_t = (cljs.core.truth_(rstr)?cljs$compiler$resolve_type.call(null,env,rstr):null);
var axstr = cljs.core.subs.call(null,fstr,(9),(cljs.core.count.call(null,fstr) - (1)));
var args_ts = ((clojure.string.blank_QMARK_.call(null,axstr))?null:cljs.core.map.call(null,cljs.core.comp.call(null,((function (idx,vec__10141,fstr,rstr,ret_t,axstr){
return (function (p1__10138_SHARP_){
return cljs$compiler$resolve_type.call(null,env,p1__10138_SHARP_);
});})(idx,vec__10141,fstr,rstr,ret_t,axstr))
,clojure.string.trim),clojure.string.split.call(null,axstr,/,/)));
var G__10142 = [cljs.core.str("function("),cljs.core.str(clojure.string.join.call(null,",",args_ts)),cljs.core.str(")")].join('');
if(cljs.core.truth_(ret_t)){
return [cljs.core.str(G__10142),cljs.core.str(":"),cljs.core.str(ret_t)].join('');
} else {
return G__10142;
}
} else {
if(cljs.core.truth_(goog.string.endsWith(t,"="))){
return [cljs.core.str(cljs$compiler$resolve_type.call(null,env,cljs.core.subs.call(null,t,(0),(cljs.core.count.call(null,t) - (1))))),cljs.core.str("=")].join('');
} else {
return cljs.compiler.munge.call(null,[cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_var.call(null,env,cljs.core.symbol.call(null,t))))].join(''));

}
}
}
}
}
}
});
cljs.compiler.resolve_types = (function cljs$compiler$resolve_types(env,ts){
var ts__$1 = cljs.core.subs.call(null,clojure.string.trim.call(null,ts),(1),(cljs.core.count.call(null,ts) - (1)));
var xs = clojure.string.split.call(null,ts__$1,/\|/);
return [cljs.core.str("{"),cljs.core.str(clojure.string.join.call(null,"|",cljs.core.map.call(null,((function (ts__$1,xs){
return (function (p1__10143_SHARP_){
return cljs.compiler.resolve_type.call(null,env,p1__10143_SHARP_);
});})(ts__$1,xs))
,xs))),cljs.core.str("}")].join('');
});
cljs.compiler.munge_param_return = (function cljs$compiler$munge_param_return(env,line){
if(cljs.core.truth_(cljs.core.re_find.call(null,/@param/,line))){
var vec__10146 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var p = cljs.core.nth.call(null,vec__10146,(0),null);
var ts = cljs.core.nth.call(null,vec__10146,(1),null);
var n = cljs.core.nth.call(null,vec__10146,(2),null);
var xs = cljs.core.nthnext.call(null,vec__10146,(3));
if(cljs.core.truth_((function (){var and__6685__auto__ = cljs.core._EQ_.call(null,"@param",p);
if(and__6685__auto__){
var and__6685__auto____$1 = ts;
if(cljs.core.truth_(and__6685__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__6685__auto____$1;
}
} else {
return and__6685__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts),cljs.compiler.munge.call(null,n)], null),xs));
} else {
return line;
}
} else {
if(cljs.core.truth_(cljs.core.re_find.call(null,/@return/,line))){
var vec__10147 = cljs.core.map.call(null,clojure.string.trim,clojure.string.split.call(null,clojure.string.trim.call(null,line),/ /));
var p = cljs.core.nth.call(null,vec__10147,(0),null);
var ts = cljs.core.nth.call(null,vec__10147,(1),null);
var xs = cljs.core.nthnext.call(null,vec__10147,(2));
if(cljs.core.truth_((function (){var and__6685__auto__ = cljs.core._EQ_.call(null,"@return",p);
if(and__6685__auto__){
var and__6685__auto____$1 = ts;
if(cljs.core.truth_(and__6685__auto____$1)){
return goog.string.startsWith(ts,"{");
} else {
return and__6685__auto____$1;
}
} else {
return and__6685__auto__;
}
})())){
return clojure.string.join.call(null," ",cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p,cljs.compiler.resolve_types.call(null,env,ts)], null),xs));
} else {
return line;
}
} else {
return line;

}
}
});
cljs.compiler.checking_types_QMARK_ = (function cljs$compiler$checking_types_QMARK_(){
return new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"warn","warn",-436710552),null,new cljs.core.Keyword(null,"error","error",-978969032),null], null), null).call(null,cljs.core.get_in.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"options","options",99638489),new cljs.core.Keyword(null,"closure-warnings","closure-warnings",1362834211),new cljs.core.Keyword(null,"check-types","check-types",-833794607)], null)));
});
/**
 * Emit a nicely formatted comment string.
 */
cljs.compiler.emit_comment = (function cljs$compiler$emit_comment(var_args){
var args10149 = [];
var len__7755__auto___10176 = arguments.length;
var i__7756__auto___10177 = (0);
while(true){
if((i__7756__auto___10177 < len__7755__auto___10176)){
args10149.push((arguments[i__7756__auto___10177]));

var G__10178 = (i__7756__auto___10177 + (1));
i__7756__auto___10177 = G__10178;
continue;
} else {
}
break;
}

var G__10151 = args10149.length;
switch (G__10151) {
case 2:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args10149.length)].join('')));

}
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$2 = (function (doc,jsdoc){
return cljs.compiler.emit_comment.call(null,null,doc,jsdoc);
});

cljs.compiler.emit_comment.cljs$core$IFn$_invoke$arity$3 = (function (env,doc,jsdoc){
var docs = (cljs.core.truth_(doc)?new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [doc], null):null);
var docs__$1 = (cljs.core.truth_(jsdoc)?cljs.core.concat.call(null,docs,jsdoc):docs);
var docs__$2 = cljs.core.remove.call(null,cljs.core.nil_QMARK_,docs__$1);
var print_comment_lines = ((function (docs,docs__$1,docs__$2){
return (function cljs$compiler$print_comment_lines(e){
var vec__10167 = cljs.core.map.call(null,((function (docs,docs__$1,docs__$2){
return (function (p1__10148_SHARP_){
if(cljs.core.truth_(cljs.compiler.checking_types_QMARK_.call(null))){
return cljs.compiler.munge_param_return.call(null,env,p1__10148_SHARP_);
} else {
return p1__10148_SHARP_;
}
});})(docs,docs__$1,docs__$2))
,clojure.string.split_lines.call(null,e));
var x = cljs.core.nth.call(null,vec__10167,(0),null);
var ys = cljs.core.nthnext.call(null,vec__10167,(1));
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,x,"*/","* /"));

var seq__10168 = cljs.core.seq.call(null,ys);
var chunk__10169 = null;
var count__10170 = (0);
var i__10171 = (0);
while(true){
if((i__10171 < count__10170)){
var next_line = cljs.core._nth.call(null,chunk__10169,i__10171);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));

var G__10180 = seq__10168;
var G__10181 = chunk__10169;
var G__10182 = count__10170;
var G__10183 = (i__10171 + (1));
seq__10168 = G__10180;
chunk__10169 = G__10181;
count__10170 = G__10182;
i__10171 = G__10183;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__10168);
if(temp__4657__auto__){
var seq__10168__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10168__$1)){
var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__10168__$1);
var G__10184 = cljs.core.chunk_rest.call(null,seq__10168__$1);
var G__10185 = c__7500__auto__;
var G__10186 = cljs.core.count.call(null,c__7500__auto__);
var G__10187 = (0);
seq__10168 = G__10184;
chunk__10169 = G__10185;
count__10170 = G__10186;
i__10171 = G__10187;
continue;
} else {
var next_line = cljs.core.first.call(null,seq__10168__$1);
cljs.compiler.emitln.call(null," * ",clojure.string.replace.call(null,clojure.string.replace.call(null,next_line,/^   /,""),"*/","* /"));

var G__10188 = cljs.core.next.call(null,seq__10168__$1);
var G__10189 = null;
var G__10190 = (0);
var G__10191 = (0);
seq__10168 = G__10188;
chunk__10169 = G__10189;
count__10170 = G__10190;
i__10171 = G__10191;
continue;
}
} else {
return null;
}
}
break;
}
});})(docs,docs__$1,docs__$2))
;
if(cljs.core.seq.call(null,docs__$2)){
cljs.compiler.emitln.call(null,"/**");

var seq__10172_10192 = cljs.core.seq.call(null,docs__$2);
var chunk__10173_10193 = null;
var count__10174_10194 = (0);
var i__10175_10195 = (0);
while(true){
if((i__10175_10195 < count__10174_10194)){
var e_10196 = cljs.core._nth.call(null,chunk__10173_10193,i__10175_10195);
if(cljs.core.truth_(e_10196)){
print_comment_lines.call(null,e_10196);
} else {
}

var G__10197 = seq__10172_10192;
var G__10198 = chunk__10173_10193;
var G__10199 = count__10174_10194;
var G__10200 = (i__10175_10195 + (1));
seq__10172_10192 = G__10197;
chunk__10173_10193 = G__10198;
count__10174_10194 = G__10199;
i__10175_10195 = G__10200;
continue;
} else {
var temp__4657__auto___10201 = cljs.core.seq.call(null,seq__10172_10192);
if(temp__4657__auto___10201){
var seq__10172_10202__$1 = temp__4657__auto___10201;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10172_10202__$1)){
var c__7500__auto___10203 = cljs.core.chunk_first.call(null,seq__10172_10202__$1);
var G__10204 = cljs.core.chunk_rest.call(null,seq__10172_10202__$1);
var G__10205 = c__7500__auto___10203;
var G__10206 = cljs.core.count.call(null,c__7500__auto___10203);
var G__10207 = (0);
seq__10172_10192 = G__10204;
chunk__10173_10193 = G__10205;
count__10174_10194 = G__10206;
i__10175_10195 = G__10207;
continue;
} else {
var e_10208 = cljs.core.first.call(null,seq__10172_10202__$1);
if(cljs.core.truth_(e_10208)){
print_comment_lines.call(null,e_10208);
} else {
}

var G__10209 = cljs.core.next.call(null,seq__10172_10202__$1);
var G__10210 = null;
var G__10211 = (0);
var G__10212 = (0);
seq__10172_10192 = G__10209;
chunk__10173_10193 = G__10210;
count__10174_10194 = G__10211;
i__10175_10195 = G__10212;
continue;
}
} else {
}
}
break;
}

return cljs.compiler.emitln.call(null," */");
} else {
return null;
}
});

cljs.compiler.emit_comment.cljs$lang$maxFixedArity = 3;
cljs.compiler.valid_define_value_QMARK_ = (function cljs$compiler$valid_define_value_QMARK_(x){
return (typeof x === 'string') || (x === true) || (x === false) || (typeof x === 'number');
});
cljs.compiler.get_define = (function cljs$compiler$get_define(mname,jsdoc){
var opts = cljs.core.get.call(null,cljs.core.deref.call(null,cljs.env._STAR_compiler_STAR_),new cljs.core.Keyword(null,"options","options",99638489));
var and__6685__auto__ = cljs.core.some.call(null,((function (opts){
return (function (p1__10214_SHARP_){
return goog.string.startsWith(p1__10214_SHARP_,"@define");
});})(opts))
,jsdoc);
if(cljs.core.truth_(and__6685__auto__)){
var and__6685__auto____$1 = opts;
if(cljs.core.truth_(and__6685__auto____$1)){
var and__6685__auto____$2 = cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"optimizations","optimizations",-2047476854).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"none","none",1333468478));
if(and__6685__auto____$2){
var define = cljs.core.get_in.call(null,opts,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"closure-defines","closure-defines",-1213856476),[cljs.core.str(mname)].join('')], null));
if(cljs.core.truth_(cljs.compiler.valid_define_value_QMARK_.call(null,define))){
return cljs.core.pr_str.call(null,define);
} else {
return null;
}
} else {
return and__6685__auto____$2;
}
} else {
return and__6685__auto____$1;
}
} else {
return and__6685__auto__;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"def","def",-1043430536),(function (p__10215){
var map__10216 = p__10215;
var map__10216__$1 = ((((!((map__10216 == null)))?((((map__10216.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10216.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10216):map__10216);
var name = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var var$ = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"var","var",-769682797));
var init = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
var env = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var doc = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var jsdoc = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516));
var export$ = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"export","export",214356590));
var test = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"test","test",577538877));
var var_ast = cljs.core.get.call(null,map__10216__$1,new cljs.core.Keyword(null,"var-ast","var-ast",1200379319));
if(cljs.core.truth_((function (){var or__6697__auto__ = init;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env);
}
})())){
var mname = cljs.compiler.munge.call(null,name);
cljs.compiler.emit_comment.call(null,env,doc,cljs.core.concat.call(null,jsdoc,new cljs.core.Keyword(null,"jsdoc","jsdoc",1745183516).cljs$core$IFn$_invoke$arity$1(init)));

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"return (");
} else {
}

cljs.compiler.emitln.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,var$);

if(cljs.core.truth_(init)){
cljs.compiler.emits.call(null," = ",(function (){var temp__4655__auto__ = cljs.compiler.get_define.call(null,mname,jsdoc);
if(cljs.core.truth_(temp__4655__auto__)){
var define = temp__4655__auto__;
return define;
} else {
return init;
}
})());
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"def-emits-var","def-emits-var",-1551927320).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,"; return (");

cljs.compiler.emits.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"var-special","var-special",1131576802),new cljs.core.Keyword(null,"env","env",-1815813235),cljs.core.assoc.call(null,env,new cljs.core.Keyword(null,"context","context",-830191113),new cljs.core.Keyword(null,"expr","expr",745722291))], null),var_ast));

cljs.compiler.emitln.call(null,");})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,")");
} else {
}
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emitln.call(null,";");
}

if(cljs.core.truth_(export$)){
cljs.compiler.emitln.call(null,"goog.exportSymbol('",cljs.compiler.munge.call(null,export$),"', ",mname,");");
} else {
}

if(cljs.core.truth_((function (){var and__6685__auto__ = cljs.analyzer._STAR_load_tests_STAR_;
if(cljs.core.truth_(and__6685__auto__)){
return test;
} else {
return and__6685__auto__;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emitln.call(null,";");
} else {
}

return cljs.compiler.emitln.call(null,var$,".cljs$lang$test = ",test,";");
} else {
return null;
}
} else {
return null;
}
}));
cljs.compiler.emit_apply_to = (function cljs$compiler$emit_apply_to(p__10218){
var map__10235 = p__10218;
var map__10235__$1 = ((((!((map__10235 == null)))?((((map__10235.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10235.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10235):map__10235);
var name = cljs.core.get.call(null,map__10235__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.call(null,map__10235__$1,new cljs.core.Keyword(null,"params","params",710516235));
var env = cljs.core.get.call(null,map__10235__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var arglist = cljs.core.gensym.call(null,"arglist__");
var delegate_name = [cljs.core.str(cljs.compiler.munge.call(null,name)),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function (",arglist,"){");

var seq__10237_10251 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,cljs.core.vector,cljs.core.drop_last.call(null,(2),params)));
var chunk__10238_10252 = null;
var count__10239_10253 = (0);
var i__10240_10254 = (0);
while(true){
if((i__10240_10254 < count__10239_10253)){
var vec__10241_10255 = cljs.core._nth.call(null,chunk__10238_10252,i__10240_10254);
var i_10256 = cljs.core.nth.call(null,vec__10241_10255,(0),null);
var param_10257 = cljs.core.nth.call(null,vec__10241_10255,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_10257);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");

var G__10258 = seq__10237_10251;
var G__10259 = chunk__10238_10252;
var G__10260 = count__10239_10253;
var G__10261 = (i__10240_10254 + (1));
seq__10237_10251 = G__10258;
chunk__10238_10252 = G__10259;
count__10239_10253 = G__10260;
i__10240_10254 = G__10261;
continue;
} else {
var temp__4657__auto___10262 = cljs.core.seq.call(null,seq__10237_10251);
if(temp__4657__auto___10262){
var seq__10237_10263__$1 = temp__4657__auto___10262;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10237_10263__$1)){
var c__7500__auto___10264 = cljs.core.chunk_first.call(null,seq__10237_10263__$1);
var G__10265 = cljs.core.chunk_rest.call(null,seq__10237_10263__$1);
var G__10266 = c__7500__auto___10264;
var G__10267 = cljs.core.count.call(null,c__7500__auto___10264);
var G__10268 = (0);
seq__10237_10251 = G__10265;
chunk__10238_10252 = G__10266;
count__10239_10253 = G__10267;
i__10240_10254 = G__10268;
continue;
} else {
var vec__10242_10269 = cljs.core.first.call(null,seq__10237_10263__$1);
var i_10270 = cljs.core.nth.call(null,vec__10242_10269,(0),null);
var param_10271 = cljs.core.nth.call(null,vec__10242_10269,(1),null);
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,param_10271);

cljs.compiler.emits.call(null," = cljs.core.first(");

cljs.compiler.emitln.call(null,arglist,");");

cljs.compiler.emitln.call(null,arglist," = cljs.core.next(",arglist,");");

var G__10272 = cljs.core.next.call(null,seq__10237_10263__$1);
var G__10273 = null;
var G__10274 = (0);
var G__10275 = (0);
seq__10237_10251 = G__10272;
chunk__10238_10252 = G__10273;
count__10239_10253 = G__10274;
i__10240_10254 = G__10275;
continue;
}
} else {
}
}
break;
}

if(((1) < cljs.core.count.call(null,params))){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,cljs.core.butlast.call(null,params)));

cljs.compiler.emitln.call(null," = cljs.core.first(",arglist,");");

cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.rest(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__10243_10276 = cljs.core.seq.call(null,params);
var chunk__10244_10277 = null;
var count__10245_10278 = (0);
var i__10246_10279 = (0);
while(true){
if((i__10246_10279 < count__10245_10278)){
var param_10280 = cljs.core._nth.call(null,chunk__10244_10277,i__10246_10279);
cljs.compiler.emit.call(null,param_10280);

if(cljs.core._EQ_.call(null,param_10280,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10281 = seq__10243_10276;
var G__10282 = chunk__10244_10277;
var G__10283 = count__10245_10278;
var G__10284 = (i__10246_10279 + (1));
seq__10243_10276 = G__10281;
chunk__10244_10277 = G__10282;
count__10245_10278 = G__10283;
i__10246_10279 = G__10284;
continue;
} else {
var temp__4657__auto___10285 = cljs.core.seq.call(null,seq__10243_10276);
if(temp__4657__auto___10285){
var seq__10243_10286__$1 = temp__4657__auto___10285;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10243_10286__$1)){
var c__7500__auto___10287 = cljs.core.chunk_first.call(null,seq__10243_10286__$1);
var G__10288 = cljs.core.chunk_rest.call(null,seq__10243_10286__$1);
var G__10289 = c__7500__auto___10287;
var G__10290 = cljs.core.count.call(null,c__7500__auto___10287);
var G__10291 = (0);
seq__10243_10276 = G__10288;
chunk__10244_10277 = G__10289;
count__10245_10278 = G__10290;
i__10246_10279 = G__10291;
continue;
} else {
var param_10292 = cljs.core.first.call(null,seq__10243_10286__$1);
cljs.compiler.emit.call(null,param_10292);

if(cljs.core._EQ_.call(null,param_10292,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10293 = cljs.core.next.call(null,seq__10243_10286__$1);
var G__10294 = null;
var G__10295 = (0);
var G__10296 = (0);
seq__10243_10276 = G__10293;
chunk__10244_10277 = G__10294;
count__10245_10278 = G__10295;
i__10246_10279 = G__10296;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
} else {
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = cljs.core.seq(",arglist,");");

cljs.compiler.emits.call(null,"return ",delegate_name,"(");

var seq__10247_10297 = cljs.core.seq.call(null,params);
var chunk__10248_10298 = null;
var count__10249_10299 = (0);
var i__10250_10300 = (0);
while(true){
if((i__10250_10300 < count__10249_10299)){
var param_10301 = cljs.core._nth.call(null,chunk__10248_10298,i__10250_10300);
cljs.compiler.emit.call(null,param_10301);

if(cljs.core._EQ_.call(null,param_10301,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10302 = seq__10247_10297;
var G__10303 = chunk__10248_10298;
var G__10304 = count__10249_10299;
var G__10305 = (i__10250_10300 + (1));
seq__10247_10297 = G__10302;
chunk__10248_10298 = G__10303;
count__10249_10299 = G__10304;
i__10250_10300 = G__10305;
continue;
} else {
var temp__4657__auto___10306 = cljs.core.seq.call(null,seq__10247_10297);
if(temp__4657__auto___10306){
var seq__10247_10307__$1 = temp__4657__auto___10306;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10247_10307__$1)){
var c__7500__auto___10308 = cljs.core.chunk_first.call(null,seq__10247_10307__$1);
var G__10309 = cljs.core.chunk_rest.call(null,seq__10247_10307__$1);
var G__10310 = c__7500__auto___10308;
var G__10311 = cljs.core.count.call(null,c__7500__auto___10308);
var G__10312 = (0);
seq__10247_10297 = G__10309;
chunk__10248_10298 = G__10310;
count__10249_10299 = G__10311;
i__10250_10300 = G__10312;
continue;
} else {
var param_10313 = cljs.core.first.call(null,seq__10247_10307__$1);
cljs.compiler.emit.call(null,param_10313);

if(cljs.core._EQ_.call(null,param_10313,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10314 = cljs.core.next.call(null,seq__10247_10307__$1);
var G__10315 = null;
var G__10316 = (0);
var G__10317 = (0);
seq__10247_10297 = G__10314;
chunk__10248_10298 = G__10315;
count__10249_10299 = G__10316;
i__10250_10300 = G__10317;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,");");
}

return cljs.compiler.emits.call(null,"})");
});
cljs.compiler.emit_fn_params = (function cljs$compiler$emit_fn_params(params){
var seq__10322 = cljs.core.seq.call(null,params);
var chunk__10323 = null;
var count__10324 = (0);
var i__10325 = (0);
while(true){
if((i__10325 < count__10324)){
var param = cljs.core._nth.call(null,chunk__10323,i__10325);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10326 = seq__10322;
var G__10327 = chunk__10323;
var G__10328 = count__10324;
var G__10329 = (i__10325 + (1));
seq__10322 = G__10326;
chunk__10323 = G__10327;
count__10324 = G__10328;
i__10325 = G__10329;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__10322);
if(temp__4657__auto__){
var seq__10322__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10322__$1)){
var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__10322__$1);
var G__10330 = cljs.core.chunk_rest.call(null,seq__10322__$1);
var G__10331 = c__7500__auto__;
var G__10332 = cljs.core.count.call(null,c__7500__auto__);
var G__10333 = (0);
seq__10322 = G__10330;
chunk__10323 = G__10331;
count__10324 = G__10332;
i__10325 = G__10333;
continue;
} else {
var param = cljs.core.first.call(null,seq__10322__$1);
cljs.compiler.emit.call(null,param);

if(cljs.core._EQ_.call(null,param,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10334 = cljs.core.next.call(null,seq__10322__$1);
var G__10335 = null;
var G__10336 = (0);
var G__10337 = (0);
seq__10322 = G__10334;
chunk__10323 = G__10335;
count__10324 = G__10336;
i__10325 = G__10337;
continue;
}
} else {
return null;
}
}
break;
}
});
cljs.compiler.emit_fn_method = (function cljs$compiler$emit_fn_method(p__10338){
var map__10341 = p__10338;
var map__10341__$1 = ((((!((map__10341 == null)))?((((map__10341.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10341.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10341):map__10341);
var type = cljs.core.get.call(null,map__10341__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__10341__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.call(null,map__10341__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.call(null,map__10341__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.call(null,map__10341__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__10341__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__10341__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.call(null,map__10341__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(function ",cljs.compiler.munge.call(null,name),"(");

cljs.compiler.emit_fn_params.call(null,params);

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emits.call(null,"})");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
/**
 * Emit code that copies function arguments into an array starting at an index.
 *   Returns name of var holding the array.
 */
cljs.compiler.emit_arguments_to_array = (function cljs$compiler$emit_arguments_to_array(startslice){
if(((startslice >= (0))) && (cljs.core.integer_QMARK_.call(null,startslice))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"and","and",668631710,null),cljs.core.list(new cljs.core.Symbol(null,">=",">=",1016916022,null),new cljs.core.Symbol(null,"startslice","startslice",1404029423,null),(0)),cljs.core.list(new cljs.core.Symbol(null,"integer?","integer?",1303791671,null),new cljs.core.Symbol(null,"startslice","startslice",1404029423,null)))))].join('')));
}

var mname = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
var i = [cljs.core.str(mname),cljs.core.str("__i")].join('');
var a = [cljs.core.str(mname),cljs.core.str("__a")].join('');
cljs.compiler.emitln.call(null,"var ",i," = 0, ",a," = new Array(arguments.length -  ",startslice,");");

cljs.compiler.emitln.call(null,"while (",i," < ",a,".length) {",a,"[",i,"] = arguments[",i," + ",startslice,"]; ++",i,";}");

return a;
});
cljs.compiler.emit_variadic_fn_method = (function cljs$compiler$emit_variadic_fn_method(p__10343){
var map__10354 = p__10343;
var map__10354__$1 = ((((!((map__10354 == null)))?((((map__10354.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10354.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10354):map__10354);
var f = map__10354__$1;
var type = cljs.core.get.call(null,map__10354__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var name = cljs.core.get.call(null,map__10354__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var variadic = cljs.core.get.call(null,map__10354__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var params = cljs.core.get.call(null,map__10354__$1,new cljs.core.Keyword(null,"params","params",710516235));
var expr = cljs.core.get.call(null,map__10354__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__10354__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var recurs = cljs.core.get.call(null,map__10354__$1,new cljs.core.Keyword(null,"recurs","recurs",-1959309309));
var max_fixed_arity = cljs.core.get.call(null,map__10354__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

var name_10364__$1 = (function (){var or__6697__auto__ = name;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_10365 = cljs.compiler.munge.call(null,name_10364__$1);
var delegate_name_10366 = [cljs.core.str(mname_10365),cljs.core.str("__delegate")].join('');
cljs.compiler.emitln.call(null,"(function() { ");

cljs.compiler.emits.call(null,"var ",delegate_name_10366," = function (");

var seq__10356_10367 = cljs.core.seq.call(null,params);
var chunk__10357_10368 = null;
var count__10358_10369 = (0);
var i__10359_10370 = (0);
while(true){
if((i__10359_10370 < count__10358_10369)){
var param_10371 = cljs.core._nth.call(null,chunk__10357_10368,i__10359_10370);
cljs.compiler.emit.call(null,param_10371);

if(cljs.core._EQ_.call(null,param_10371,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10372 = seq__10356_10367;
var G__10373 = chunk__10357_10368;
var G__10374 = count__10358_10369;
var G__10375 = (i__10359_10370 + (1));
seq__10356_10367 = G__10372;
chunk__10357_10368 = G__10373;
count__10358_10369 = G__10374;
i__10359_10370 = G__10375;
continue;
} else {
var temp__4657__auto___10376 = cljs.core.seq.call(null,seq__10356_10367);
if(temp__4657__auto___10376){
var seq__10356_10377__$1 = temp__4657__auto___10376;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10356_10377__$1)){
var c__7500__auto___10378 = cljs.core.chunk_first.call(null,seq__10356_10377__$1);
var G__10379 = cljs.core.chunk_rest.call(null,seq__10356_10377__$1);
var G__10380 = c__7500__auto___10378;
var G__10381 = cljs.core.count.call(null,c__7500__auto___10378);
var G__10382 = (0);
seq__10356_10367 = G__10379;
chunk__10357_10368 = G__10380;
count__10358_10369 = G__10381;
i__10359_10370 = G__10382;
continue;
} else {
var param_10383 = cljs.core.first.call(null,seq__10356_10377__$1);
cljs.compiler.emit.call(null,param_10383);

if(cljs.core._EQ_.call(null,param_10383,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10384 = cljs.core.next.call(null,seq__10356_10377__$1);
var G__10385 = null;
var G__10386 = (0);
var G__10387 = (0);
seq__10356_10367 = G__10384;
chunk__10357_10368 = G__10385;
count__10358_10369 = G__10386;
i__10359_10370 = G__10387;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"){");

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(recurs)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,"var ",mname_10365," = function (",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,params),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):params)),"){");

if(cljs.core.truth_(type)){
cljs.compiler.emitln.call(null,"var self__ = this;");
} else {
}

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,params));

cljs.compiler.emitln.call(null," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",(cljs.core.count.call(null,params) - (1)),") {");

var a_10388 = cljs.compiler.emit_arguments_to_array.call(null,(cljs.core.count.call(null,params) - (1)));
cljs.compiler.emitln.call(null,"  ",cljs.core.last.call(null,params)," = new cljs.core.IndexedSeq(",a_10388,",0);");

cljs.compiler.emitln.call(null,"} ");
} else {
}

cljs.compiler.emits.call(null,"return ",delegate_name_10366,".call(this,");

var seq__10360_10389 = cljs.core.seq.call(null,params);
var chunk__10361_10390 = null;
var count__10362_10391 = (0);
var i__10363_10392 = (0);
while(true){
if((i__10363_10392 < count__10362_10391)){
var param_10393 = cljs.core._nth.call(null,chunk__10361_10390,i__10363_10392);
cljs.compiler.emit.call(null,param_10393);

if(cljs.core._EQ_.call(null,param_10393,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10394 = seq__10360_10389;
var G__10395 = chunk__10361_10390;
var G__10396 = count__10362_10391;
var G__10397 = (i__10363_10392 + (1));
seq__10360_10389 = G__10394;
chunk__10361_10390 = G__10395;
count__10362_10391 = G__10396;
i__10363_10392 = G__10397;
continue;
} else {
var temp__4657__auto___10398 = cljs.core.seq.call(null,seq__10360_10389);
if(temp__4657__auto___10398){
var seq__10360_10399__$1 = temp__4657__auto___10398;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10360_10399__$1)){
var c__7500__auto___10400 = cljs.core.chunk_first.call(null,seq__10360_10399__$1);
var G__10401 = cljs.core.chunk_rest.call(null,seq__10360_10399__$1);
var G__10402 = c__7500__auto___10400;
var G__10403 = cljs.core.count.call(null,c__7500__auto___10400);
var G__10404 = (0);
seq__10360_10389 = G__10401;
chunk__10361_10390 = G__10402;
count__10362_10391 = G__10403;
i__10363_10392 = G__10404;
continue;
} else {
var param_10405 = cljs.core.first.call(null,seq__10360_10399__$1);
cljs.compiler.emit.call(null,param_10405);

if(cljs.core._EQ_.call(null,param_10405,cljs.core.last.call(null,params))){
} else {
cljs.compiler.emits.call(null,",");
}

var G__10406 = cljs.core.next.call(null,seq__10360_10399__$1);
var G__10407 = null;
var G__10408 = (0);
var G__10409 = (0);
seq__10360_10389 = G__10406;
chunk__10361_10390 = G__10407;
count__10362_10391 = G__10408;
i__10363_10392 = G__10409;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,");");

cljs.compiler.emitln.call(null,"};");

cljs.compiler.emitln.call(null,mname_10365,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emits.call(null,mname_10365,".cljs$lang$applyTo = ");

cljs.compiler.emit_apply_to.call(null,cljs.core.assoc.call(null,f,new cljs.core.Keyword(null,"name","name",1843675177),name_10364__$1));

cljs.compiler.emitln.call(null,";");

cljs.compiler.emitln.call(null,mname_10365,".cljs$core$IFn$_invoke$arity$variadic = ",delegate_name_10366,";");

cljs.compiler.emitln.call(null,"return ",mname_10365,";");

cljs.compiler.emitln.call(null,"})()");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"fn","fn",-1175266204),(function (p__10413){
var map__10414 = p__10413;
var map__10414__$1 = ((((!((map__10414 == null)))?((((map__10414.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10414.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10414):map__10414);
var name = cljs.core.get.call(null,map__10414__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var env = cljs.core.get.call(null,map__10414__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var methods$ = cljs.core.get.call(null,map__10414__$1,new cljs.core.Keyword(null,"methods","methods",453930866));
var max_fixed_arity = cljs.core.get.call(null,map__10414__$1,new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543));
var variadic = cljs.core.get.call(null,map__10414__$1,new cljs.core.Keyword(null,"variadic","variadic",882626057));
var recur_frames = cljs.core.get.call(null,map__10414__$1,new cljs.core.Keyword(null,"recur-frames","recur-frames",-307205196));
var loop_lets = cljs.core.get.call(null,map__10414__$1,new cljs.core.Keyword(null,"loop-lets","loop-lets",2036794185));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
return null;
} else {
var loop_locals = cljs.core.seq.call(null,cljs.core.map.call(null,cljs.compiler.munge,cljs.core.concat.call(null,cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),cljs.core.filter.call(null,((function (map__10414,map__10414__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__10410_SHARP_){
var and__6685__auto__ = p1__10410_SHARP_;
if(cljs.core.truth_(and__6685__auto__)){
return cljs.core.deref.call(null,new cljs.core.Keyword(null,"flag","flag",1088647881).cljs$core$IFn$_invoke$arity$1(p1__10410_SHARP_));
} else {
return and__6685__auto__;
}
});})(map__10414,map__10414__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,recur_frames)),cljs.core.mapcat.call(null,new cljs.core.Keyword(null,"params","params",710516235),loop_lets))));
if(loop_locals){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"((function (",cljs.compiler.comma_sep.call(null,cljs.core.map.call(null,cljs.compiler.munge,loop_locals)),"){");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
} else {
cljs.compiler.emits.call(null,"return ");
}
} else {
}

if(cljs.core._EQ_.call(null,(1),cljs.core.count.call(null,methods$))){
if(cljs.core.truth_(variadic)){
cljs.compiler.emit_variadic_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
} else {
cljs.compiler.emit_fn_method.call(null,cljs.core.assoc.call(null,cljs.core.first.call(null,methods$),new cljs.core.Keyword(null,"name","name",1843675177),name));
}
} else {
var name_10435__$1 = (function (){var or__6697__auto__ = name;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core.gensym.call(null);
}
})();
var mname_10436 = cljs.compiler.munge.call(null,name_10435__$1);
var maxparams_10437 = cljs.core.apply.call(null,cljs.core.max_key,cljs.core.count,cljs.core.map.call(null,new cljs.core.Keyword(null,"params","params",710516235),methods$));
var mmap_10438 = cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,cljs.core.map.call(null,((function (name_10435__$1,mname_10436,maxparams_10437,loop_locals,map__10414,map__10414__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (method){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.compiler.munge.call(null,cljs.core.symbol.call(null,[cljs.core.str(mname_10436),cljs.core.str("__"),cljs.core.str(cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(method)))].join(''))),method], null);
});})(name_10435__$1,mname_10436,maxparams_10437,loop_locals,map__10414,map__10414__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,methods$));
var ms_10439 = cljs.core.sort_by.call(null,((function (name_10435__$1,mname_10436,maxparams_10437,mmap_10438,loop_locals,map__10414,map__10414__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__10411_SHARP_){
return cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(cljs.core.second.call(null,p1__10411_SHARP_)));
});})(name_10435__$1,mname_10436,maxparams_10437,mmap_10438,loop_locals,map__10414,map__10414__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,cljs.core.seq.call(null,mmap_10438));
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emitln.call(null,"(function() {");

cljs.compiler.emitln.call(null,"var ",mname_10436," = null;");

var seq__10416_10440 = cljs.core.seq.call(null,ms_10439);
var chunk__10417_10441 = null;
var count__10418_10442 = (0);
var i__10419_10443 = (0);
while(true){
if((i__10419_10443 < count__10418_10442)){
var vec__10420_10444 = cljs.core._nth.call(null,chunk__10417_10441,i__10419_10443);
var n_10445 = cljs.core.nth.call(null,vec__10420_10444,(0),null);
var meth_10446 = cljs.core.nth.call(null,vec__10420_10444,(1),null);
cljs.compiler.emits.call(null,"var ",n_10445," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10446))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_10446);
} else {
cljs.compiler.emit_fn_method.call(null,meth_10446);
}

cljs.compiler.emitln.call(null,";");

var G__10447 = seq__10416_10440;
var G__10448 = chunk__10417_10441;
var G__10449 = count__10418_10442;
var G__10450 = (i__10419_10443 + (1));
seq__10416_10440 = G__10447;
chunk__10417_10441 = G__10448;
count__10418_10442 = G__10449;
i__10419_10443 = G__10450;
continue;
} else {
var temp__4657__auto___10451 = cljs.core.seq.call(null,seq__10416_10440);
if(temp__4657__auto___10451){
var seq__10416_10452__$1 = temp__4657__auto___10451;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10416_10452__$1)){
var c__7500__auto___10453 = cljs.core.chunk_first.call(null,seq__10416_10452__$1);
var G__10454 = cljs.core.chunk_rest.call(null,seq__10416_10452__$1);
var G__10455 = c__7500__auto___10453;
var G__10456 = cljs.core.count.call(null,c__7500__auto___10453);
var G__10457 = (0);
seq__10416_10440 = G__10454;
chunk__10417_10441 = G__10455;
count__10418_10442 = G__10456;
i__10419_10443 = G__10457;
continue;
} else {
var vec__10421_10458 = cljs.core.first.call(null,seq__10416_10452__$1);
var n_10459 = cljs.core.nth.call(null,vec__10421_10458,(0),null);
var meth_10460 = cljs.core.nth.call(null,vec__10421_10458,(1),null);
cljs.compiler.emits.call(null,"var ",n_10459," = ");

if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10460))){
cljs.compiler.emit_variadic_fn_method.call(null,meth_10460);
} else {
cljs.compiler.emit_fn_method.call(null,meth_10460);
}

cljs.compiler.emitln.call(null,";");

var G__10461 = cljs.core.next.call(null,seq__10416_10452__$1);
var G__10462 = null;
var G__10463 = (0);
var G__10464 = (0);
seq__10416_10440 = G__10461;
chunk__10417_10441 = G__10462;
count__10418_10442 = G__10463;
i__10419_10443 = G__10464;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,mname_10436," = function(",cljs.compiler.comma_sep.call(null,(cljs.core.truth_(variadic)?cljs.core.concat.call(null,cljs.core.butlast.call(null,maxparams_10437),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"var_args","var_args",1214280389,null)], null)):maxparams_10437)),"){");

if(cljs.core.truth_(variadic)){
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,cljs.core.last.call(null,maxparams_10437));

cljs.compiler.emitln.call(null," = var_args;");
} else {
}

cljs.compiler.emitln.call(null,"switch(arguments.length){");

var seq__10422_10465 = cljs.core.seq.call(null,ms_10439);
var chunk__10423_10466 = null;
var count__10424_10467 = (0);
var i__10425_10468 = (0);
while(true){
if((i__10425_10468 < count__10424_10467)){
var vec__10426_10469 = cljs.core._nth.call(null,chunk__10423_10466,i__10425_10468);
var n_10470 = cljs.core.nth.call(null,vec__10426_10469,(0),null);
var meth_10471 = cljs.core.nth.call(null,vec__10426_10469,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10471))){
cljs.compiler.emitln.call(null,"default:");

var restarg_10472 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_10472," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_10473 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_10472," = new cljs.core.IndexedSeq(",a_10473,",0);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_10470,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_10437)),(((cljs.core.count.call(null,maxparams_10437) > (1)))?", ":null),restarg_10472,");");
} else {
var pcnt_10474 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_10471));
cljs.compiler.emitln.call(null,"case ",pcnt_10474,":");

cljs.compiler.emitln.call(null,"return ",n_10470,".call(this",(((pcnt_10474 === (0)))?null:cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_10474,maxparams_10437))),",")),");");
}

var G__10475 = seq__10422_10465;
var G__10476 = chunk__10423_10466;
var G__10477 = count__10424_10467;
var G__10478 = (i__10425_10468 + (1));
seq__10422_10465 = G__10475;
chunk__10423_10466 = G__10476;
count__10424_10467 = G__10477;
i__10425_10468 = G__10478;
continue;
} else {
var temp__4657__auto___10479 = cljs.core.seq.call(null,seq__10422_10465);
if(temp__4657__auto___10479){
var seq__10422_10480__$1 = temp__4657__auto___10479;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10422_10480__$1)){
var c__7500__auto___10481 = cljs.core.chunk_first.call(null,seq__10422_10480__$1);
var G__10482 = cljs.core.chunk_rest.call(null,seq__10422_10480__$1);
var G__10483 = c__7500__auto___10481;
var G__10484 = cljs.core.count.call(null,c__7500__auto___10481);
var G__10485 = (0);
seq__10422_10465 = G__10482;
chunk__10423_10466 = G__10483;
count__10424_10467 = G__10484;
i__10425_10468 = G__10485;
continue;
} else {
var vec__10427_10486 = cljs.core.first.call(null,seq__10422_10480__$1);
var n_10487 = cljs.core.nth.call(null,vec__10427_10486,(0),null);
var meth_10488 = cljs.core.nth.call(null,vec__10427_10486,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10488))){
cljs.compiler.emitln.call(null,"default:");

var restarg_10489 = cljs.compiler.munge.call(null,cljs.core.gensym.call(null));
cljs.compiler.emitln.call(null,"var ",restarg_10489," = null;");

cljs.compiler.emitln.call(null,"if (arguments.length > ",max_fixed_arity,") {");

var a_10490 = cljs.compiler.emit_arguments_to_array.call(null,max_fixed_arity);
cljs.compiler.emitln.call(null,restarg_10489," = new cljs.core.IndexedSeq(",a_10490,",0);");

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"return ",n_10487,".cljs$core$IFn$_invoke$arity$variadic(",cljs.compiler.comma_sep.call(null,cljs.core.butlast.call(null,maxparams_10437)),(((cljs.core.count.call(null,maxparams_10437) > (1)))?", ":null),restarg_10489,");");
} else {
var pcnt_10491 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_10488));
cljs.compiler.emitln.call(null,"case ",pcnt_10491,":");

cljs.compiler.emitln.call(null,"return ",n_10487,".call(this",(((pcnt_10491 === (0)))?null:cljs.core._conj.call(null,cljs.core._conj.call(null,cljs.core.List.EMPTY,cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,pcnt_10491,maxparams_10437))),",")),");");
}

var G__10492 = cljs.core.next.call(null,seq__10422_10480__$1);
var G__10493 = null;
var G__10494 = (0);
var G__10495 = (0);
seq__10422_10465 = G__10492;
chunk__10423_10466 = G__10493;
count__10424_10467 = G__10494;
i__10425_10468 = G__10495;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"}");

cljs.compiler.emitln.call(null,"throw(new Error('Invalid arity: ' + arguments.length));");

cljs.compiler.emitln.call(null,"};");

if(cljs.core.truth_(variadic)){
cljs.compiler.emitln.call(null,mname_10436,".cljs$lang$maxFixedArity = ",max_fixed_arity,";");

cljs.compiler.emitln.call(null,mname_10436,".cljs$lang$applyTo = ",cljs.core.some.call(null,((function (name_10435__$1,mname_10436,maxparams_10437,mmap_10438,ms_10439,loop_locals,map__10414,map__10414__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets){
return (function (p1__10412_SHARP_){
var vec__10428 = p1__10412_SHARP_;
var n = cljs.core.nth.call(null,vec__10428,(0),null);
var m = cljs.core.nth.call(null,vec__10428,(1),null);
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(m))){
return n;
} else {
return null;
}
});})(name_10435__$1,mname_10436,maxparams_10437,mmap_10438,ms_10439,loop_locals,map__10414,map__10414__$1,name,env,methods$,max_fixed_arity,variadic,recur_frames,loop_lets))
,ms_10439),".cljs$lang$applyTo;");
} else {
}

var seq__10429_10496 = cljs.core.seq.call(null,ms_10439);
var chunk__10430_10497 = null;
var count__10431_10498 = (0);
var i__10432_10499 = (0);
while(true){
if((i__10432_10499 < count__10431_10498)){
var vec__10433_10500 = cljs.core._nth.call(null,chunk__10430_10497,i__10432_10499);
var n_10501 = cljs.core.nth.call(null,vec__10433_10500,(0),null);
var meth_10502 = cljs.core.nth.call(null,vec__10433_10500,(1),null);
var c_10503 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_10502));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10502))){
cljs.compiler.emitln.call(null,mname_10436,".cljs$core$IFn$_invoke$arity$variadic = ",n_10501,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_10436,".cljs$core$IFn$_invoke$arity$",c_10503," = ",n_10501,";");
}

var G__10504 = seq__10429_10496;
var G__10505 = chunk__10430_10497;
var G__10506 = count__10431_10498;
var G__10507 = (i__10432_10499 + (1));
seq__10429_10496 = G__10504;
chunk__10430_10497 = G__10505;
count__10431_10498 = G__10506;
i__10432_10499 = G__10507;
continue;
} else {
var temp__4657__auto___10508 = cljs.core.seq.call(null,seq__10429_10496);
if(temp__4657__auto___10508){
var seq__10429_10509__$1 = temp__4657__auto___10508;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10429_10509__$1)){
var c__7500__auto___10510 = cljs.core.chunk_first.call(null,seq__10429_10509__$1);
var G__10511 = cljs.core.chunk_rest.call(null,seq__10429_10509__$1);
var G__10512 = c__7500__auto___10510;
var G__10513 = cljs.core.count.call(null,c__7500__auto___10510);
var G__10514 = (0);
seq__10429_10496 = G__10511;
chunk__10430_10497 = G__10512;
count__10431_10498 = G__10513;
i__10432_10499 = G__10514;
continue;
} else {
var vec__10434_10515 = cljs.core.first.call(null,seq__10429_10509__$1);
var n_10516 = cljs.core.nth.call(null,vec__10434_10515,(0),null);
var meth_10517 = cljs.core.nth.call(null,vec__10434_10515,(1),null);
var c_10518 = cljs.core.count.call(null,new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(meth_10517));
if(cljs.core.truth_(new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(meth_10517))){
cljs.compiler.emitln.call(null,mname_10436,".cljs$core$IFn$_invoke$arity$variadic = ",n_10516,".cljs$core$IFn$_invoke$arity$variadic;");
} else {
cljs.compiler.emitln.call(null,mname_10436,".cljs$core$IFn$_invoke$arity$",c_10518," = ",n_10516,";");
}

var G__10519 = cljs.core.next.call(null,seq__10429_10509__$1);
var G__10520 = null;
var G__10521 = (0);
var G__10522 = (0);
seq__10429_10496 = G__10519;
chunk__10430_10497 = G__10520;
count__10431_10498 = G__10521;
i__10432_10499 = G__10522;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"return ",mname_10436,";");

cljs.compiler.emitln.call(null,"})()");
}

if(loop_locals){
return cljs.compiler.emitln.call(null,";})(",cljs.compiler.comma_sep.call(null,loop_locals),"))");
} else {
return null;
}
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"do","do",46310725),(function (p__10523){
var map__10524 = p__10523;
var map__10524__$1 = ((((!((map__10524 == null)))?((((map__10524.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10524.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10524):map__10524);
var statements = cljs.core.get.call(null,map__10524__$1,new cljs.core.Keyword(null,"statements","statements",600349855));
var ret = cljs.core.get.call(null,map__10524__$1,new cljs.core.Keyword(null,"ret","ret",-468222814));
var env = cljs.core.get.call(null,map__10524__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var and__6685__auto__ = statements;
if(cljs.core.truth_(and__6685__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context);
} else {
return and__6685__auto__;
}
})())){
cljs.compiler.emitln.call(null,"(function (){");
} else {
}

var seq__10526_10530 = cljs.core.seq.call(null,statements);
var chunk__10527_10531 = null;
var count__10528_10532 = (0);
var i__10529_10533 = (0);
while(true){
if((i__10529_10533 < count__10528_10532)){
var s_10534 = cljs.core._nth.call(null,chunk__10527_10531,i__10529_10533);
cljs.compiler.emitln.call(null,s_10534);

var G__10535 = seq__10526_10530;
var G__10536 = chunk__10527_10531;
var G__10537 = count__10528_10532;
var G__10538 = (i__10529_10533 + (1));
seq__10526_10530 = G__10535;
chunk__10527_10531 = G__10536;
count__10528_10532 = G__10537;
i__10529_10533 = G__10538;
continue;
} else {
var temp__4657__auto___10539 = cljs.core.seq.call(null,seq__10526_10530);
if(temp__4657__auto___10539){
var seq__10526_10540__$1 = temp__4657__auto___10539;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10526_10540__$1)){
var c__7500__auto___10541 = cljs.core.chunk_first.call(null,seq__10526_10540__$1);
var G__10542 = cljs.core.chunk_rest.call(null,seq__10526_10540__$1);
var G__10543 = c__7500__auto___10541;
var G__10544 = cljs.core.count.call(null,c__7500__auto___10541);
var G__10545 = (0);
seq__10526_10530 = G__10542;
chunk__10527_10531 = G__10543;
count__10528_10532 = G__10544;
i__10529_10533 = G__10545;
continue;
} else {
var s_10546 = cljs.core.first.call(null,seq__10526_10540__$1);
cljs.compiler.emitln.call(null,s_10546);

var G__10547 = cljs.core.next.call(null,seq__10526_10540__$1);
var G__10548 = null;
var G__10549 = (0);
var G__10550 = (0);
seq__10526_10530 = G__10547;
chunk__10527_10531 = G__10548;
count__10528_10532 = G__10549;
i__10529_10533 = G__10550;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emit.call(null,ret);

if(cljs.core.truth_((function (){var and__6685__auto__ = statements;
if(cljs.core.truth_(and__6685__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context);
} else {
return and__6685__auto__;
}
})())){
return cljs.compiler.emitln.call(null,"})()");
} else {
return null;
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"try","try",1380742522),(function (p__10551){
var map__10552 = p__10551;
var map__10552__$1 = ((((!((map__10552 == null)))?((((map__10552.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10552.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10552):map__10552);
var env = cljs.core.get.call(null,map__10552__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var try$ = cljs.core.get.call(null,map__10552__$1,new cljs.core.Keyword(null,"try","try",1380742522));
var catch$ = cljs.core.get.call(null,map__10552__$1,new cljs.core.Keyword(null,"catch","catch",1038065524));
var name = cljs.core.get.call(null,map__10552__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var finally$ = cljs.core.get.call(null,map__10552__$1,new cljs.core.Keyword(null,"finally","finally",1589088705));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core.truth_((function (){var or__6697__auto__ = name;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return finally$;
}
})())){
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

cljs.compiler.emits.call(null,"try{",try$,"}");

if(cljs.core.truth_(name)){
cljs.compiler.emits.call(null,"catch (",cljs.compiler.munge.call(null,name),"){",catch$,"}");
} else {
}

if(cljs.core.truth_(finally$)){
if(cljs.core.not_EQ_.call(null,new cljs.core.Keyword(null,"constant","constant",-379609303),new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(finally$))){
} else {
throw (new Error([cljs.core.str("Assert failed: "),cljs.core.str("finally block cannot contain constant"),cljs.core.str("\n"),cljs.core.str(cljs.core.pr_str.call(null,cljs.core.list(new cljs.core.Symbol(null,"not=","not=",1466536204,null),new cljs.core.Keyword(null,"constant","constant",-379609303),cljs.core.list(new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Symbol(null,"finally","finally",-1065347064,null)))))].join('')));
}

cljs.compiler.emits.call(null,"finally {",finally$,"}");
} else {
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
} else {
return cljs.compiler.emits.call(null,try$);
}
}));
cljs.compiler.emit_let = (function cljs$compiler$emit_let(p__10554,is_loop){
var map__10566 = p__10554;
var map__10566__$1 = ((((!((map__10566 == null)))?((((map__10566.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10566.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10566):map__10566);
var bindings = cljs.core.get.call(null,map__10566__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.call(null,map__10566__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__10566__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var _STAR_lexical_renames_STAR_10568_10577 = cljs.compiler._STAR_lexical_renames_STAR_;
cljs.compiler._STAR_lexical_renames_STAR_ = cljs.core.into.call(null,cljs.compiler._STAR_lexical_renames_STAR_,((cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"statement","statement",-32780863),context))?cljs.core.map.call(null,((function (_STAR_lexical_renames_STAR_10568_10577,context,map__10566,map__10566__$1,bindings,expr,env){
return (function (binding){
var name = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(binding);
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[cljs.compiler.hash_scope.call(null,binding),cljs.core.gensym.call(null,[cljs.core.str(name),cljs.core.str("-")].join(''))],null));
});})(_STAR_lexical_renames_STAR_10568_10577,context,map__10566,map__10566__$1,bindings,expr,env))
,bindings):null));

try{var seq__10569_10578 = cljs.core.seq.call(null,bindings);
var chunk__10570_10579 = null;
var count__10571_10580 = (0);
var i__10572_10581 = (0);
while(true){
if((i__10572_10581 < count__10571_10580)){
var map__10573_10582 = cljs.core._nth.call(null,chunk__10570_10579,i__10572_10581);
var map__10573_10583__$1 = ((((!((map__10573_10582 == null)))?((((map__10573_10582.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10573_10582.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10573_10582):map__10573_10582);
var binding_10584 = map__10573_10583__$1;
var init_10585 = cljs.core.get.call(null,map__10573_10583__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_10584);

cljs.compiler.emitln.call(null," = ",init_10585,";");

var G__10586 = seq__10569_10578;
var G__10587 = chunk__10570_10579;
var G__10588 = count__10571_10580;
var G__10589 = (i__10572_10581 + (1));
seq__10569_10578 = G__10586;
chunk__10570_10579 = G__10587;
count__10571_10580 = G__10588;
i__10572_10581 = G__10589;
continue;
} else {
var temp__4657__auto___10590 = cljs.core.seq.call(null,seq__10569_10578);
if(temp__4657__auto___10590){
var seq__10569_10591__$1 = temp__4657__auto___10590;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10569_10591__$1)){
var c__7500__auto___10592 = cljs.core.chunk_first.call(null,seq__10569_10591__$1);
var G__10593 = cljs.core.chunk_rest.call(null,seq__10569_10591__$1);
var G__10594 = c__7500__auto___10592;
var G__10595 = cljs.core.count.call(null,c__7500__auto___10592);
var G__10596 = (0);
seq__10569_10578 = G__10593;
chunk__10570_10579 = G__10594;
count__10571_10580 = G__10595;
i__10572_10581 = G__10596;
continue;
} else {
var map__10575_10597 = cljs.core.first.call(null,seq__10569_10591__$1);
var map__10575_10598__$1 = ((((!((map__10575_10597 == null)))?((((map__10575_10597.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10575_10597.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10575_10597):map__10575_10597);
var binding_10599 = map__10575_10598__$1;
var init_10600 = cljs.core.get.call(null,map__10575_10598__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emits.call(null,"var ");

cljs.compiler.emit.call(null,binding_10599);

cljs.compiler.emitln.call(null," = ",init_10600,";");

var G__10601 = cljs.core.next.call(null,seq__10569_10591__$1);
var G__10602 = null;
var G__10603 = (0);
var G__10604 = (0);
seq__10569_10578 = G__10601;
chunk__10570_10579 = G__10602;
count__10571_10580 = G__10603;
i__10572_10581 = G__10604;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"while(true){");
} else {
}

cljs.compiler.emits.call(null,expr);

if(cljs.core.truth_(is_loop)){
cljs.compiler.emitln.call(null,"break;");

cljs.compiler.emitln.call(null,"}");
} else {
}
}finally {cljs.compiler._STAR_lexical_renames_STAR_ = _STAR_lexical_renames_STAR_10568_10577;
}
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"let","let",-1282412701),(function (ast){
return cljs.compiler.emit_let.call(null,ast,false);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"loop","loop",-395552849),(function (ast){
return cljs.compiler.emit_let.call(null,ast,true);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"recur","recur",-437573268),(function (p__10605){
var map__10606 = p__10605;
var map__10606__$1 = ((((!((map__10606 == null)))?((((map__10606.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10606.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10606):map__10606);
var frame = cljs.core.get.call(null,map__10606__$1,new cljs.core.Keyword(null,"frame","frame",-1711082588));
var exprs = cljs.core.get.call(null,map__10606__$1,new cljs.core.Keyword(null,"exprs","exprs",1795829094));
var env = cljs.core.get.call(null,map__10606__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var temps = cljs.core.vec.call(null,cljs.core.take.call(null,cljs.core.count.call(null,exprs),cljs.core.repeatedly.call(null,cljs.core.gensym)));
var params = new cljs.core.Keyword(null,"params","params",710516235).cljs$core$IFn$_invoke$arity$1(frame);
var n__7600__auto___10608 = cljs.core.count.call(null,exprs);
var i_10609 = (0);
while(true){
if((i_10609 < n__7600__auto___10608)){
cljs.compiler.emitln.call(null,"var ",temps.call(null,i_10609)," = ",exprs.call(null,i_10609),";");

var G__10610 = (i_10609 + (1));
i_10609 = G__10610;
continue;
} else {
}
break;
}

var n__7600__auto___10611 = cljs.core.count.call(null,exprs);
var i_10612 = (0);
while(true){
if((i_10612 < n__7600__auto___10611)){
cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,params.call(null,i_10612))," = ",temps.call(null,i_10612),";");

var G__10613 = (i_10612 + (1));
i_10612 = G__10613;
continue;
} else {
}
break;
}

return cljs.compiler.emitln.call(null,"continue;");
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"letfn","letfn",-2121022354),(function (p__10614){
var map__10615 = p__10614;
var map__10615__$1 = ((((!((map__10615 == null)))?((((map__10615.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10615.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10615):map__10615);
var bindings = cljs.core.get.call(null,map__10615__$1,new cljs.core.Keyword(null,"bindings","bindings",1271397192));
var expr = cljs.core.get.call(null,map__10615__$1,new cljs.core.Keyword(null,"expr","expr",745722291));
var env = cljs.core.get.call(null,map__10615__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var context = new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env);
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
cljs.compiler.emits.call(null,"(function (){");
} else {
}

var seq__10617_10625 = cljs.core.seq.call(null,bindings);
var chunk__10618_10626 = null;
var count__10619_10627 = (0);
var i__10620_10628 = (0);
while(true){
if((i__10620_10628 < count__10619_10627)){
var map__10621_10629 = cljs.core._nth.call(null,chunk__10618_10626,i__10620_10628);
var map__10621_10630__$1 = ((((!((map__10621_10629 == null)))?((((map__10621_10629.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10621_10629.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10621_10629):map__10621_10629);
var binding_10631 = map__10621_10630__$1;
var init_10632 = cljs.core.get.call(null,map__10621_10630__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_10631)," = ",init_10632,";");

var G__10633 = seq__10617_10625;
var G__10634 = chunk__10618_10626;
var G__10635 = count__10619_10627;
var G__10636 = (i__10620_10628 + (1));
seq__10617_10625 = G__10633;
chunk__10618_10626 = G__10634;
count__10619_10627 = G__10635;
i__10620_10628 = G__10636;
continue;
} else {
var temp__4657__auto___10637 = cljs.core.seq.call(null,seq__10617_10625);
if(temp__4657__auto___10637){
var seq__10617_10638__$1 = temp__4657__auto___10637;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10617_10638__$1)){
var c__7500__auto___10639 = cljs.core.chunk_first.call(null,seq__10617_10638__$1);
var G__10640 = cljs.core.chunk_rest.call(null,seq__10617_10638__$1);
var G__10641 = c__7500__auto___10639;
var G__10642 = cljs.core.count.call(null,c__7500__auto___10639);
var G__10643 = (0);
seq__10617_10625 = G__10640;
chunk__10618_10626 = G__10641;
count__10619_10627 = G__10642;
i__10620_10628 = G__10643;
continue;
} else {
var map__10623_10644 = cljs.core.first.call(null,seq__10617_10638__$1);
var map__10623_10645__$1 = ((((!((map__10623_10644 == null)))?((((map__10623_10644.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10623_10644.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10623_10644):map__10623_10644);
var binding_10646 = map__10623_10645__$1;
var init_10647 = cljs.core.get.call(null,map__10623_10645__$1,new cljs.core.Keyword(null,"init","init",-1875481434));
cljs.compiler.emitln.call(null,"var ",cljs.compiler.munge.call(null,binding_10646)," = ",init_10647,";");

var G__10648 = cljs.core.next.call(null,seq__10617_10638__$1);
var G__10649 = null;
var G__10650 = (0);
var G__10651 = (0);
seq__10617_10625 = G__10648;
chunk__10618_10626 = G__10649;
count__10619_10627 = G__10650;
i__10620_10628 = G__10651;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emits.call(null,expr);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),context)){
return cljs.compiler.emits.call(null,"})()");
} else {
return null;
}
}));
cljs.compiler.protocol_prefix = (function cljs$compiler$protocol_prefix(psym){
return cljs.core.symbol.call(null,[cljs.core.str([cljs.core.str(psym)].join('').replace((new RegExp("\\.","g")),"$").replace("/","$")),cljs.core.str("$")].join(''));
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"invoke","invoke",1145927159),(function (p__10654){
var map__10655 = p__10654;
var map__10655__$1 = ((((!((map__10655 == null)))?((((map__10655.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10655.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10655):map__10655);
var expr = map__10655__$1;
var f = cljs.core.get.call(null,map__10655__$1,new cljs.core.Keyword(null,"f","f",-1597136552));
var args = cljs.core.get.call(null,map__10655__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__10655__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var info = new cljs.core.Keyword(null,"info","info",-317069002).cljs$core$IFn$_invoke$arity$1(f);
var fn_QMARK_ = (function (){var and__6685__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__6685__auto__)){
var and__6685__auto____$1 = cljs.core.not.call(null,new cljs.core.Keyword(null,"dynamic","dynamic",704819571).cljs$core$IFn$_invoke$arity$1(info));
if(and__6685__auto____$1){
return new cljs.core.Keyword(null,"fn-var","fn-var",1086204730).cljs$core$IFn$_invoke$arity$1(info);
} else {
return and__6685__auto____$1;
}
} else {
return and__6685__auto__;
}
})();
var protocol = new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(info);
var tag = cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr)));
var proto_QMARK_ = (function (){var and__6685__auto__ = protocol;
if(cljs.core.truth_(and__6685__auto__)){
var and__6685__auto____$1 = tag;
if(cljs.core.truth_(and__6685__auto____$1)){
var or__6697__auto__ = (function (){var and__6685__auto____$2 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__6685__auto____$2)){
var and__6685__auto____$3 = protocol;
if(cljs.core.truth_(and__6685__auto____$3)){
return cljs.core._EQ_.call(null,tag,new cljs.core.Symbol(null,"not-native","not-native",-236392494,null));
} else {
return and__6685__auto____$3;
}
} else {
return and__6685__auto____$2;
}
})();
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
var and__6685__auto____$2 = (function (){var or__6697__auto____$1 = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(or__6697__auto____$1)){
return or__6697__auto____$1;
} else {
return new cljs.core.Keyword(null,"protocol-inline","protocol-inline",1550487556).cljs$core$IFn$_invoke$arity$1(env);
}
})();
if(cljs.core.truth_(and__6685__auto____$2)){
var or__6697__auto____$1 = cljs.core._EQ_.call(null,protocol,tag);
if(or__6697__auto____$1){
return or__6697__auto____$1;
} else {
var and__6685__auto____$3 = !(cljs.core.set_QMARK_.call(null,tag));
if(and__6685__auto____$3){
var and__6685__auto____$4 = cljs.core.not.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 10, [new cljs.core.Symbol(null,"clj","clj",980036099,null),null,new cljs.core.Symbol(null,"boolean","boolean",-278886877,null),null,new cljs.core.Symbol(null,"object","object",-1179821820,null),null,new cljs.core.Symbol(null,"any","any",-948528346,null),null,new cljs.core.Symbol(null,"number","number",-1084057331,null),null,new cljs.core.Symbol(null,"clj-or-nil","clj-or-nil",-2008798668,null),null,new cljs.core.Symbol(null,"array","array",-440182315,null),null,new cljs.core.Symbol(null,"string","string",-349010059,null),null,new cljs.core.Symbol(null,"function","function",-486723946,null),null,new cljs.core.Symbol(null,"clj-nil","clj-nil",1321798654,null),null], null), null).call(null,tag));
if(and__6685__auto____$4){
var temp__4657__auto__ = new cljs.core.Keyword(null,"protocols","protocols",-5615896).cljs$core$IFn$_invoke$arity$1(cljs.analyzer.resolve_existing_var.call(null,cljs.core.dissoc.call(null,env,new cljs.core.Keyword(null,"locals","locals",535295783)),tag));
if(cljs.core.truth_(temp__4657__auto__)){
var ps = temp__4657__auto__;
return ps.call(null,protocol);
} else {
return null;
}
} else {
return and__6685__auto____$4;
}
} else {
return and__6685__auto____$3;
}
}
} else {
return and__6685__auto____$2;
}
}
} else {
return and__6685__auto____$1;
}
} else {
return and__6685__auto__;
}
})();
var opt_not_QMARK_ = (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info),new cljs.core.Symbol("cljs.core","not","cljs.core/not",100665144,null))) && (cljs.core._EQ_.call(null,cljs.analyzer.infer_tag.call(null,env,cljs.core.first.call(null,new cljs.core.Keyword(null,"args","args",1315556576).cljs$core$IFn$_invoke$arity$1(expr))),new cljs.core.Symbol(null,"boolean","boolean",-278886877,null)));
var ns = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(info);
var js_QMARK_ = (cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"js","js",-886355190,null))) || (cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"Math","Math",2033287572,null)));
var goog_QMARK_ = (cljs.core.truth_(ns)?(function (){var or__6697__auto__ = cljs.core._EQ_.call(null,ns,new cljs.core.Symbol(null,"goog","goog",-70603925,null));
if(or__6697__auto__){
return or__6697__auto__;
} else {
var temp__4657__auto__ = [cljs.core.str(ns)].join('');
if(cljs.core.truth_(temp__4657__auto__)){
var ns_str = temp__4657__auto__;
return cljs.core._EQ_.call(null,cljs.core.get.call(null,clojure.string.split.call(null,ns_str,/\./),(0),null),"goog");
} else {
return null;
}
}
})():null);
var keyword_QMARK_ = (cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f),new cljs.core.Keyword(null,"constant","constant",-379609303))) && ((new cljs.core.Keyword(null,"form","form",-1624062471).cljs$core$IFn$_invoke$arity$1(f) instanceof cljs.core.Keyword));
var vec__10657 = (cljs.core.truth_(fn_QMARK_)?(function (){var arity = cljs.core.count.call(null,args);
var variadic_QMARK_ = new cljs.core.Keyword(null,"variadic","variadic",882626057).cljs$core$IFn$_invoke$arity$1(info);
var mps = new cljs.core.Keyword(null,"method-params","method-params",-980792179).cljs$core$IFn$_invoke$arity$1(info);
var mfa = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(info);
if((cljs.core.not.call(null,variadic_QMARK_)) && (cljs.core._EQ_.call(null,cljs.core.count.call(null,mps),(1)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
} else {
if(cljs.core.truth_((function (){var and__6685__auto__ = variadic_QMARK_;
if(cljs.core.truth_(and__6685__auto__)){
return (arity > mfa);
} else {
return and__6685__auto__;
}
})())){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10655,map__10655__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$variadic")].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10655,map__10655__$1,expr,f,args,env){
return (function (p1__10652_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__10652_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10655,map__10655__$1,expr,f,args,env))
);
});})(arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10655,map__10655__$1,expr,f,args,env))
),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543),mfa], null)], null);
} else {
var arities = cljs.core.map.call(null,cljs.core.count,mps);
if(cljs.core.truth_(cljs.core.some.call(null,cljs.core.PersistentHashSet.fromArray([arity], true),arities))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.update_in.call(null,f,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10655,map__10655__$1,expr,f,args,env){
return (function (info__$1){
return cljs.core.update_in.call(null,cljs.core.assoc.call(null,info__$1,new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.symbol.call(null,[cljs.core.str(cljs.compiler.munge.call(null,info__$1)),cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(arity)].join(''))),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002)], null),((function (arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10655,map__10655__$1,expr,f,args,env){
return (function (p1__10653_SHARP_){
return cljs.core.dissoc.call(null,cljs.core.dissoc.call(null,p1__10653_SHARP_,new cljs.core.Keyword(null,"shadow","shadow",873231803)),new cljs.core.Keyword(null,"fn-self-name","fn-self-name",1461143531));
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10655,map__10655__$1,expr,f,args,env))
);
});})(arities,arity,variadic_QMARK_,mps,mfa,info,fn_QMARK_,protocol,tag,proto_QMARK_,opt_not_QMARK_,ns,js_QMARK_,goog_QMARK_,keyword_QMARK_,map__10655,map__10655__$1,expr,f,args,env))
),null], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null);
}

}
}
})():new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [f,null], null));
var f__$1 = cljs.core.nth.call(null,vec__10657,(0),null);
var variadic_invoke = cljs.core.nth.call(null,vec__10657,(1),null);
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(opt_not_QMARK_){
cljs.compiler.emits.call(null,"!(",cljs.core.first.call(null,args),")");
} else {
if(cljs.core.truth_(proto_QMARK_)){
var pimpl_10658 = [cljs.core.str(cljs.compiler.munge.call(null,cljs.compiler.protocol_prefix.call(null,protocol))),cljs.core.str(cljs.compiler.munge.call(null,cljs.core.name.call(null,new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info)))),cljs.core.str("$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,cljs.core.first.call(null,args),".",pimpl_10658,"(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",cljs.core.rest.call(null,args))),")");
} else {
if(keyword_QMARK_){
cljs.compiler.emits.call(null,f__$1,".cljs$core$IFn$_invoke$arity$",cljs.core.count.call(null,args),"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_(variadic_invoke)){
var mfa_10659 = new cljs.core.Keyword(null,"max-fixed-arity","max-fixed-arity",-690205543).cljs$core$IFn$_invoke$arity$1(variadic_invoke);
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,cljs.core.take.call(null,mfa_10659,args)),(((mfa_10659 === (0)))?null:","),"cljs.core.array_seq([",cljs.compiler.comma_sep.call(null,cljs.core.drop.call(null,mfa_10659,args)),"], 0))");
} else {
if(cljs.core.truth_((function (){var or__6697__auto__ = fn_QMARK_;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
var or__6697__auto____$1 = js_QMARK_;
if(or__6697__auto____$1){
return or__6697__auto____$1;
} else {
return goog_QMARK_;
}
}
})())){
cljs.compiler.emits.call(null,f__$1,"(",cljs.compiler.comma_sep.call(null,args),")");
} else {
if(cljs.core.truth_((function (){var and__6685__auto__ = cljs.analyzer._STAR_cljs_static_fns_STAR_;
if(cljs.core.truth_(and__6685__auto__)){
return cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"op","op",-1882987955).cljs$core$IFn$_invoke$arity$1(f__$1),new cljs.core.Keyword(null,"var","var",-769682797));
} else {
return and__6685__auto__;
}
})())){
var fprop_10660 = [cljs.core.str(".cljs$core$IFn$_invoke$arity$"),cljs.core.str(cljs.core.count.call(null,args))].join('');
cljs.compiler.emits.call(null,"(",f__$1,fprop_10660," ? ",f__$1,fprop_10660,"(",cljs.compiler.comma_sep.call(null,args),") : ",f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),"))");
} else {
cljs.compiler.emits.call(null,f__$1,".call(",cljs.compiler.comma_sep.call(null,cljs.core.cons.call(null,"null",args)),")");
}

}
}
}
}
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"new","new",-2085437848),(function (p__10661){
var map__10662 = p__10661;
var map__10662__$1 = ((((!((map__10662 == null)))?((((map__10662.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10662.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10662):map__10662);
var ctor = cljs.core.get.call(null,map__10662__$1,new cljs.core.Keyword(null,"ctor","ctor",1750864802));
var args = cljs.core.get.call(null,map__10662__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__10662__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,"(new ",ctor,"(",cljs.compiler.comma_sep.call(null,args),"))");

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"set!","set!",-1389817006),(function (p__10664){
var map__10665 = p__10664;
var map__10665__$1 = ((((!((map__10665 == null)))?((((map__10665.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10665.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10665):map__10665);
var target = cljs.core.get.call(null,map__10665__$1,new cljs.core.Keyword(null,"target","target",253001721));
var val = cljs.core.get.call(null,map__10665__$1,new cljs.core.Keyword(null,"val","val",128701612));
var env = cljs.core.get.call(null,map__10665__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

cljs.compiler.emits.call(null,target," = ",val);

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.compiler.load_libs = (function cljs$compiler$load_libs(libs,seen,reloads){
var loaded_libs = cljs.compiler.munge.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null));
var loaded_libs_temp = cljs.compiler.munge.call(null,cljs.core.gensym.call(null,new cljs.core.Symbol(null,"cljs.core.*loaded-libs*","cljs.core.*loaded-libs*",-1847086525,null)));
if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs_temp," = ",loaded_libs," || cljs.core.set();");

cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.set();");
} else {
}

var seq__10671_10675 = cljs.core.seq.call(null,cljs.core.remove.call(null,cljs.core.set.call(null,cljs.core.vals.call(null,seen)),cljs.core.distinct.call(null,cljs.core.vals.call(null,libs))));
var chunk__10672_10676 = null;
var count__10673_10677 = (0);
var i__10674_10678 = (0);
while(true){
if((i__10674_10678 < count__10673_10677)){
var lib_10679 = cljs.core._nth.call(null,chunk__10672_10676,i__10674_10678);
if(cljs.core.truth_((function (){var or__6697__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_10679),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10679),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__6697__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_10679),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10679),"', 'reload-all');");
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10679),"');");

}
}

var G__10680 = seq__10671_10675;
var G__10681 = chunk__10672_10676;
var G__10682 = count__10673_10677;
var G__10683 = (i__10674_10678 + (1));
seq__10671_10675 = G__10680;
chunk__10672_10676 = G__10681;
count__10673_10677 = G__10682;
i__10674_10678 = G__10683;
continue;
} else {
var temp__4657__auto___10684 = cljs.core.seq.call(null,seq__10671_10675);
if(temp__4657__auto___10684){
var seq__10671_10685__$1 = temp__4657__auto___10684;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10671_10685__$1)){
var c__7500__auto___10686 = cljs.core.chunk_first.call(null,seq__10671_10685__$1);
var G__10687 = cljs.core.chunk_rest.call(null,seq__10671_10685__$1);
var G__10688 = c__7500__auto___10686;
var G__10689 = cljs.core.count.call(null,c__7500__auto___10686);
var G__10690 = (0);
seq__10671_10675 = G__10687;
chunk__10672_10676 = G__10688;
count__10673_10677 = G__10689;
i__10674_10678 = G__10690;
continue;
} else {
var lib_10691 = cljs.core.first.call(null,seq__10671_10685__$1);
if(cljs.core.truth_((function (){var or__6697__auto__ = new cljs.core.Keyword(null,"reload","reload",863702807).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_10691),new cljs.core.Keyword(null,"reload","reload",863702807));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10691),"', 'reload');");
} else {
if(cljs.core.truth_((function (){var or__6697__auto__ = new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs));
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return cljs.core._EQ_.call(null,cljs.core.get.call(null,reloads,lib_10691),new cljs.core.Keyword(null,"reload-all","reload-all",761570200));
}
})())){
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10691),"', 'reload-all');");
} else {
cljs.compiler.emitln.call(null,"goog.require('",cljs.compiler.munge.call(null,lib_10691),"');");

}
}

var G__10692 = cljs.core.next.call(null,seq__10671_10685__$1);
var G__10693 = null;
var G__10694 = (0);
var G__10695 = (0);
seq__10671_10675 = G__10692;
chunk__10672_10676 = G__10693;
count__10673_10677 = G__10694;
i__10674_10678 = G__10695;
continue;
}
} else {
}
}
break;
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"reload-all","reload-all",761570200).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,libs)))){
return cljs.compiler.emitln.call(null,"if(!COMPILED) ",loaded_libs," = cljs.core.into(",loaded_libs_temp,", ",loaded_libs,");");
} else {
return null;
}
});
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"ns","ns",441598760),(function (p__10696){
var map__10697 = p__10696;
var map__10697__$1 = ((((!((map__10697 == null)))?((((map__10697.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10697.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10697):map__10697);
var name = cljs.core.get.call(null,map__10697__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var requires = cljs.core.get.call(null,map__10697__$1,new cljs.core.Keyword(null,"requires","requires",-1201390927));
var uses = cljs.core.get.call(null,map__10697__$1,new cljs.core.Keyword(null,"uses","uses",232664692));
var require_macros = cljs.core.get.call(null,map__10697__$1,new cljs.core.Keyword(null,"require-macros","require-macros",707947416));
var reloads = cljs.core.get.call(null,map__10697__$1,new cljs.core.Keyword(null,"reloads","reloads",610698522));
var env = cljs.core.get.call(null,map__10697__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
cljs.compiler.emitln.call(null,"goog.provide('",cljs.compiler.munge.call(null,name),"');");

if(cljs.core._EQ_.call(null,name,new cljs.core.Symbol(null,"cljs.core","cljs.core",770546058,null))){
} else {
cljs.compiler.emitln.call(null,"goog.require('cljs.core');");
}

cljs.compiler.load_libs.call(null,requires,null,new cljs.core.Keyword(null,"require","require",-468001333).cljs$core$IFn$_invoke$arity$1(reloads));

return cljs.compiler.load_libs.call(null,uses,requires,new cljs.core.Keyword(null,"use","use",-1846382424).cljs$core$IFn$_invoke$arity$1(reloads));
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"deftype*","deftype*",-677871637),(function (p__10699){
var map__10700 = p__10699;
var map__10700__$1 = ((((!((map__10700 == null)))?((((map__10700.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10700.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10700):map__10700);
var t = cljs.core.get.call(null,map__10700__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__10700__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__10700__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__10700__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__10700__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.map.call(null,cljs.compiler.munge,fields);
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__10702_10716 = cljs.core.seq.call(null,protocols);
var chunk__10703_10717 = null;
var count__10704_10718 = (0);
var i__10705_10719 = (0);
while(true){
if((i__10705_10719 < count__10704_10718)){
var protocol_10720 = cljs.core._nth.call(null,chunk__10703_10717,i__10705_10719);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_10720)].join('')),"}");

var G__10721 = seq__10702_10716;
var G__10722 = chunk__10703_10717;
var G__10723 = count__10704_10718;
var G__10724 = (i__10705_10719 + (1));
seq__10702_10716 = G__10721;
chunk__10703_10717 = G__10722;
count__10704_10718 = G__10723;
i__10705_10719 = G__10724;
continue;
} else {
var temp__4657__auto___10725 = cljs.core.seq.call(null,seq__10702_10716);
if(temp__4657__auto___10725){
var seq__10702_10726__$1 = temp__4657__auto___10725;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10702_10726__$1)){
var c__7500__auto___10727 = cljs.core.chunk_first.call(null,seq__10702_10726__$1);
var G__10728 = cljs.core.chunk_rest.call(null,seq__10702_10726__$1);
var G__10729 = c__7500__auto___10727;
var G__10730 = cljs.core.count.call(null,c__7500__auto___10727);
var G__10731 = (0);
seq__10702_10716 = G__10728;
chunk__10703_10717 = G__10729;
count__10704_10718 = G__10730;
i__10705_10719 = G__10731;
continue;
} else {
var protocol_10732 = cljs.core.first.call(null,seq__10702_10726__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_10732)].join('')),"}");

var G__10733 = cljs.core.next.call(null,seq__10702_10726__$1);
var G__10734 = null;
var G__10735 = (0);
var G__10736 = (0);
seq__10702_10716 = G__10733;
chunk__10703_10717 = G__10734;
count__10704_10718 = G__10735;
i__10705_10719 = G__10736;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__10706_10737 = cljs.core.seq.call(null,fields__$1);
var chunk__10707_10738 = null;
var count__10708_10739 = (0);
var i__10709_10740 = (0);
while(true){
if((i__10709_10740 < count__10708_10739)){
var fld_10741 = cljs.core._nth.call(null,chunk__10707_10738,i__10709_10740);
cljs.compiler.emitln.call(null,"this.",fld_10741," = ",fld_10741,";");

var G__10742 = seq__10706_10737;
var G__10743 = chunk__10707_10738;
var G__10744 = count__10708_10739;
var G__10745 = (i__10709_10740 + (1));
seq__10706_10737 = G__10742;
chunk__10707_10738 = G__10743;
count__10708_10739 = G__10744;
i__10709_10740 = G__10745;
continue;
} else {
var temp__4657__auto___10746 = cljs.core.seq.call(null,seq__10706_10737);
if(temp__4657__auto___10746){
var seq__10706_10747__$1 = temp__4657__auto___10746;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10706_10747__$1)){
var c__7500__auto___10748 = cljs.core.chunk_first.call(null,seq__10706_10747__$1);
var G__10749 = cljs.core.chunk_rest.call(null,seq__10706_10747__$1);
var G__10750 = c__7500__auto___10748;
var G__10751 = cljs.core.count.call(null,c__7500__auto___10748);
var G__10752 = (0);
seq__10706_10737 = G__10749;
chunk__10707_10738 = G__10750;
count__10708_10739 = G__10751;
i__10709_10740 = G__10752;
continue;
} else {
var fld_10753 = cljs.core.first.call(null,seq__10706_10747__$1);
cljs.compiler.emitln.call(null,"this.",fld_10753," = ",fld_10753,";");

var G__10754 = cljs.core.next.call(null,seq__10706_10747__$1);
var G__10755 = null;
var G__10756 = (0);
var G__10757 = (0);
seq__10706_10737 = G__10754;
chunk__10707_10738 = G__10755;
count__10708_10739 = G__10756;
i__10709_10740 = G__10757;
continue;
}
} else {
}
}
break;
}

var seq__10710_10758 = cljs.core.seq.call(null,pmasks);
var chunk__10711_10759 = null;
var count__10712_10760 = (0);
var i__10713_10761 = (0);
while(true){
if((i__10713_10761 < count__10712_10760)){
var vec__10714_10762 = cljs.core._nth.call(null,chunk__10711_10759,i__10713_10761);
var pno_10763 = cljs.core.nth.call(null,vec__10714_10762,(0),null);
var pmask_10764 = cljs.core.nth.call(null,vec__10714_10762,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_10763,"$ = ",pmask_10764,";");

var G__10765 = seq__10710_10758;
var G__10766 = chunk__10711_10759;
var G__10767 = count__10712_10760;
var G__10768 = (i__10713_10761 + (1));
seq__10710_10758 = G__10765;
chunk__10711_10759 = G__10766;
count__10712_10760 = G__10767;
i__10713_10761 = G__10768;
continue;
} else {
var temp__4657__auto___10769 = cljs.core.seq.call(null,seq__10710_10758);
if(temp__4657__auto___10769){
var seq__10710_10770__$1 = temp__4657__auto___10769;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10710_10770__$1)){
var c__7500__auto___10771 = cljs.core.chunk_first.call(null,seq__10710_10770__$1);
var G__10772 = cljs.core.chunk_rest.call(null,seq__10710_10770__$1);
var G__10773 = c__7500__auto___10771;
var G__10774 = cljs.core.count.call(null,c__7500__auto___10771);
var G__10775 = (0);
seq__10710_10758 = G__10772;
chunk__10711_10759 = G__10773;
count__10712_10760 = G__10774;
i__10713_10761 = G__10775;
continue;
} else {
var vec__10715_10776 = cljs.core.first.call(null,seq__10710_10770__$1);
var pno_10777 = cljs.core.nth.call(null,vec__10715_10776,(0),null);
var pmask_10778 = cljs.core.nth.call(null,vec__10715_10776,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_10777,"$ = ",pmask_10778,";");

var G__10779 = cljs.core.next.call(null,seq__10710_10770__$1);
var G__10780 = null;
var G__10781 = (0);
var G__10782 = (0);
seq__10710_10758 = G__10779;
chunk__10711_10759 = G__10780;
count__10712_10760 = G__10781;
i__10713_10761 = G__10782;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"})");

return cljs.compiler.emit.call(null,body);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"defrecord*","defrecord*",718069562),(function (p__10783){
var map__10784 = p__10783;
var map__10784__$1 = ((((!((map__10784 == null)))?((((map__10784.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10784.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10784):map__10784);
var t = cljs.core.get.call(null,map__10784__$1,new cljs.core.Keyword(null,"t","t",-1397832519));
var fields = cljs.core.get.call(null,map__10784__$1,new cljs.core.Keyword(null,"fields","fields",-1932066230));
var pmasks = cljs.core.get.call(null,map__10784__$1,new cljs.core.Keyword(null,"pmasks","pmasks",-871416698));
var body = cljs.core.get.call(null,map__10784__$1,new cljs.core.Keyword(null,"body","body",-2049205669));
var protocols = cljs.core.get.call(null,map__10784__$1,new cljs.core.Keyword(null,"protocols","protocols",-5615896));
var fields__$1 = cljs.core.concat.call(null,cljs.core.map.call(null,cljs.compiler.munge,fields),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"__meta","__meta",-946752628,null),new cljs.core.Symbol(null,"__extmap","__extmap",-1435580931,null),new cljs.core.Symbol(null,"__hash","__hash",-1328796629,null)], null));
cljs.compiler.emitln.call(null,"");

cljs.compiler.emitln.call(null,"/**");

cljs.compiler.emitln.call(null,"* @constructor");

var seq__10786_10800 = cljs.core.seq.call(null,protocols);
var chunk__10787_10801 = null;
var count__10788_10802 = (0);
var i__10789_10803 = (0);
while(true){
if((i__10789_10803 < count__10788_10802)){
var protocol_10804 = cljs.core._nth.call(null,chunk__10787_10801,i__10789_10803);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_10804)].join('')),"}");

var G__10805 = seq__10786_10800;
var G__10806 = chunk__10787_10801;
var G__10807 = count__10788_10802;
var G__10808 = (i__10789_10803 + (1));
seq__10786_10800 = G__10805;
chunk__10787_10801 = G__10806;
count__10788_10802 = G__10807;
i__10789_10803 = G__10808;
continue;
} else {
var temp__4657__auto___10809 = cljs.core.seq.call(null,seq__10786_10800);
if(temp__4657__auto___10809){
var seq__10786_10810__$1 = temp__4657__auto___10809;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10786_10810__$1)){
var c__7500__auto___10811 = cljs.core.chunk_first.call(null,seq__10786_10810__$1);
var G__10812 = cljs.core.chunk_rest.call(null,seq__10786_10810__$1);
var G__10813 = c__7500__auto___10811;
var G__10814 = cljs.core.count.call(null,c__7500__auto___10811);
var G__10815 = (0);
seq__10786_10800 = G__10812;
chunk__10787_10801 = G__10813;
count__10788_10802 = G__10814;
i__10789_10803 = G__10815;
continue;
} else {
var protocol_10816 = cljs.core.first.call(null,seq__10786_10810__$1);
cljs.compiler.emitln.call(null," * @implements {",cljs.compiler.munge.call(null,[cljs.core.str(protocol_10816)].join('')),"}");

var G__10817 = cljs.core.next.call(null,seq__10786_10810__$1);
var G__10818 = null;
var G__10819 = (0);
var G__10820 = (0);
seq__10786_10800 = G__10817;
chunk__10787_10801 = G__10818;
count__10788_10802 = G__10819;
i__10789_10803 = G__10820;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"*/");

cljs.compiler.emitln.call(null,cljs.compiler.munge.call(null,t)," = (function (",cljs.compiler.comma_sep.call(null,fields__$1),"){");

var seq__10790_10821 = cljs.core.seq.call(null,fields__$1);
var chunk__10791_10822 = null;
var count__10792_10823 = (0);
var i__10793_10824 = (0);
while(true){
if((i__10793_10824 < count__10792_10823)){
var fld_10825 = cljs.core._nth.call(null,chunk__10791_10822,i__10793_10824);
cljs.compiler.emitln.call(null,"this.",fld_10825," = ",fld_10825,";");

var G__10826 = seq__10790_10821;
var G__10827 = chunk__10791_10822;
var G__10828 = count__10792_10823;
var G__10829 = (i__10793_10824 + (1));
seq__10790_10821 = G__10826;
chunk__10791_10822 = G__10827;
count__10792_10823 = G__10828;
i__10793_10824 = G__10829;
continue;
} else {
var temp__4657__auto___10830 = cljs.core.seq.call(null,seq__10790_10821);
if(temp__4657__auto___10830){
var seq__10790_10831__$1 = temp__4657__auto___10830;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10790_10831__$1)){
var c__7500__auto___10832 = cljs.core.chunk_first.call(null,seq__10790_10831__$1);
var G__10833 = cljs.core.chunk_rest.call(null,seq__10790_10831__$1);
var G__10834 = c__7500__auto___10832;
var G__10835 = cljs.core.count.call(null,c__7500__auto___10832);
var G__10836 = (0);
seq__10790_10821 = G__10833;
chunk__10791_10822 = G__10834;
count__10792_10823 = G__10835;
i__10793_10824 = G__10836;
continue;
} else {
var fld_10837 = cljs.core.first.call(null,seq__10790_10831__$1);
cljs.compiler.emitln.call(null,"this.",fld_10837," = ",fld_10837,";");

var G__10838 = cljs.core.next.call(null,seq__10790_10831__$1);
var G__10839 = null;
var G__10840 = (0);
var G__10841 = (0);
seq__10790_10821 = G__10838;
chunk__10791_10822 = G__10839;
count__10792_10823 = G__10840;
i__10793_10824 = G__10841;
continue;
}
} else {
}
}
break;
}

var seq__10794_10842 = cljs.core.seq.call(null,pmasks);
var chunk__10795_10843 = null;
var count__10796_10844 = (0);
var i__10797_10845 = (0);
while(true){
if((i__10797_10845 < count__10796_10844)){
var vec__10798_10846 = cljs.core._nth.call(null,chunk__10795_10843,i__10797_10845);
var pno_10847 = cljs.core.nth.call(null,vec__10798_10846,(0),null);
var pmask_10848 = cljs.core.nth.call(null,vec__10798_10846,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_10847,"$ = ",pmask_10848,";");

var G__10849 = seq__10794_10842;
var G__10850 = chunk__10795_10843;
var G__10851 = count__10796_10844;
var G__10852 = (i__10797_10845 + (1));
seq__10794_10842 = G__10849;
chunk__10795_10843 = G__10850;
count__10796_10844 = G__10851;
i__10797_10845 = G__10852;
continue;
} else {
var temp__4657__auto___10853 = cljs.core.seq.call(null,seq__10794_10842);
if(temp__4657__auto___10853){
var seq__10794_10854__$1 = temp__4657__auto___10853;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10794_10854__$1)){
var c__7500__auto___10855 = cljs.core.chunk_first.call(null,seq__10794_10854__$1);
var G__10856 = cljs.core.chunk_rest.call(null,seq__10794_10854__$1);
var G__10857 = c__7500__auto___10855;
var G__10858 = cljs.core.count.call(null,c__7500__auto___10855);
var G__10859 = (0);
seq__10794_10842 = G__10856;
chunk__10795_10843 = G__10857;
count__10796_10844 = G__10858;
i__10797_10845 = G__10859;
continue;
} else {
var vec__10799_10860 = cljs.core.first.call(null,seq__10794_10854__$1);
var pno_10861 = cljs.core.nth.call(null,vec__10799_10860,(0),null);
var pmask_10862 = cljs.core.nth.call(null,vec__10799_10860,(1),null);
cljs.compiler.emitln.call(null,"this.cljs$lang$protocol_mask$partition",pno_10861,"$ = ",pmask_10862,";");

var G__10863 = cljs.core.next.call(null,seq__10794_10854__$1);
var G__10864 = null;
var G__10865 = (0);
var G__10866 = (0);
seq__10794_10842 = G__10863;
chunk__10795_10843 = G__10864;
count__10796_10844 = G__10865;
i__10797_10845 = G__10866;
continue;
}
} else {
}
}
break;
}

cljs.compiler.emitln.call(null,"})");

return cljs.compiler.emit.call(null,body);
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"dot","dot",1442709401),(function (p__10867){
var map__10868 = p__10867;
var map__10868__$1 = ((((!((map__10868 == null)))?((((map__10868.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10868.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10868):map__10868);
var target = cljs.core.get.call(null,map__10868__$1,new cljs.core.Keyword(null,"target","target",253001721));
var field = cljs.core.get.call(null,map__10868__$1,new cljs.core.Keyword(null,"field","field",-1302436500));
var method = cljs.core.get.call(null,map__10868__$1,new cljs.core.Keyword(null,"method","method",55703592));
var args = cljs.core.get.call(null,map__10868__$1,new cljs.core.Keyword(null,"args","args",1315556576));
var env = cljs.core.get.call(null,map__10868__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(field)){
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,field,cljs.core.PersistentHashSet.EMPTY));
} else {
cljs.compiler.emits.call(null,target,".",cljs.compiler.munge.call(null,method,cljs.core.PersistentHashSet.EMPTY),"(",cljs.compiler.comma_sep.call(null,args),")");
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}));
cljs.core._add_method.call(null,cljs.compiler.emit_STAR_,new cljs.core.Keyword(null,"js","js",1768080579),(function (p__10870){
var map__10871 = p__10870;
var map__10871__$1 = ((((!((map__10871 == null)))?((((map__10871.cljs$lang$protocol_mask$partition0$ & (64))) || (map__10871.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__10871):map__10871);
var op = cljs.core.get.call(null,map__10871__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var env = cljs.core.get.call(null,map__10871__$1,new cljs.core.Keyword(null,"env","env",-1815813235));
var code = cljs.core.get.call(null,map__10871__$1,new cljs.core.Keyword(null,"code","code",1586293142));
var segs = cljs.core.get.call(null,map__10871__$1,new cljs.core.Keyword(null,"segs","segs",-1940299576));
var args = cljs.core.get.call(null,map__10871__$1,new cljs.core.Keyword(null,"args","args",1315556576));
if(cljs.core.truth_((function (){var and__6685__auto__ = code;
if(cljs.core.truth_(and__6685__auto__)){
return goog.string.startsWith(clojure.string.trim.call(null,code),"/*");
} else {
return and__6685__auto__;
}
})())){
return cljs.compiler.emits.call(null,code);
} else {
var env__9827__auto__ = env;
if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"return","return",-1891502105),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
cljs.compiler.emits.call(null,"return ");
} else {
}

if(cljs.core.truth_(code)){
cljs.compiler.emits.call(null,code);
} else {
cljs.compiler.emits.call(null,cljs.core.interleave.call(null,cljs.core.concat.call(null,segs,cljs.core.repeat.call(null,null)),cljs.core.concat.call(null,args,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [null], null))));
}

if(cljs.core._EQ_.call(null,new cljs.core.Keyword(null,"expr","expr",745722291),new cljs.core.Keyword(null,"context","context",-830191113).cljs$core$IFn$_invoke$arity$1(env__9827__auto__))){
return null;
} else {
return cljs.compiler.emitln.call(null,";");
}
}
}));
cljs.compiler.build_affecting_options = (function cljs$compiler$build_affecting_options(opts){
return cljs.core.select_keys.call(null,opts,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"static-fns","static-fns",-501950748),new cljs.core.Keyword(null,"optimize-constants","optimize-constants",232704518),new cljs.core.Keyword(null,"elide-asserts","elide-asserts",537063272),new cljs.core.Keyword(null,"target","target",253001721)], null));
});
cljs.compiler.emit_constants_table = (function cljs$compiler$emit_constants_table(table){
var seq__10881 = cljs.core.seq.call(null,table);
var chunk__10882 = null;
var count__10883 = (0);
var i__10884 = (0);
while(true){
if((i__10884 < count__10883)){
var vec__10885 = cljs.core._nth.call(null,chunk__10882,i__10884);
var sym = cljs.core.nth.call(null,vec__10885,(0),null);
var value = cljs.core.nth.call(null,vec__10885,(1),null);
var ns_10887 = cljs.core.namespace.call(null,sym);
var name_10888 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,[cljs.core.str("Cannot emit constant for type "),cljs.core.str(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.call(null,";\n");

var G__10889 = seq__10881;
var G__10890 = chunk__10882;
var G__10891 = count__10883;
var G__10892 = (i__10884 + (1));
seq__10881 = G__10889;
chunk__10882 = G__10890;
count__10883 = G__10891;
i__10884 = G__10892;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__10881);
if(temp__4657__auto__){
var seq__10881__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__10881__$1)){
var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__10881__$1);
var G__10893 = cljs.core.chunk_rest.call(null,seq__10881__$1);
var G__10894 = c__7500__auto__;
var G__10895 = cljs.core.count.call(null,c__7500__auto__);
var G__10896 = (0);
seq__10881 = G__10893;
chunk__10882 = G__10894;
count__10883 = G__10895;
i__10884 = G__10896;
continue;
} else {
var vec__10886 = cljs.core.first.call(null,seq__10881__$1);
var sym = cljs.core.nth.call(null,vec__10886,(0),null);
var value = cljs.core.nth.call(null,vec__10886,(1),null);
var ns_10897 = cljs.core.namespace.call(null,sym);
var name_10898 = cljs.core.name.call(null,sym);
cljs.compiler.emits.call(null,"cljs.core.",value," = ");

if((sym instanceof cljs.core.Keyword)){
cljs.compiler.emits_keyword.call(null,sym);
} else {
if((sym instanceof cljs.core.Symbol)){
cljs.compiler.emits_symbol.call(null,sym);
} else {
throw cljs.core.ex_info.call(null,[cljs.core.str("Cannot emit constant for type "),cljs.core.str(cljs.core.type.call(null,sym))].join(''),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"error","error",-978969032),new cljs.core.Keyword(null,"invalid-constant-type","invalid-constant-type",1294847471)], null));

}
}

cljs.compiler.emits.call(null,";\n");

var G__10899 = cljs.core.next.call(null,seq__10881__$1);
var G__10900 = null;
var G__10901 = (0);
var G__10902 = (0);
seq__10881 = G__10899;
chunk__10882 = G__10900;
count__10883 = G__10901;
i__10884 = G__10902;
continue;
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=compiler.js.map