// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cljs.source_map');
goog.require('cljs.core');
goog.require('goog.object');
goog.require('clojure.string');
goog.require('clojure.set');
goog.require('cljs.source_map.base64_vlq');
/**
 * Take a seq of source file names and return a map from
 * file number to integer index. For reverse source maps.
 */
cljs.source_map.indexed_sources = (function cljs$source_map$indexed_sources(sources){
return cljs.core.reduce.call(null,(function (m,p__9153){
var vec__9154 = p__9153;
var i = cljs.core.nth.call(null,vec__9154,(0),null);
var v = cljs.core.nth.call(null,vec__9154,(1),null);
return cljs.core.assoc.call(null,m,v,i);
}),cljs.core.PersistentArrayMap.EMPTY,cljs.core.map_indexed.call(null,(function (a,b){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [a,b], null);
}),sources));
});
/**
 * Take a seq of source file names and return a comparator
 * that can be used to construct a sorted map. For reverse
 * source maps.
 */
cljs.source_map.source_compare = (function cljs$source_map$source_compare(sources){
var sources__$1 = cljs.source_map.indexed_sources.call(null,sources);
return ((function (sources__$1){
return (function (a,b){
return cljs.core.compare.call(null,sources__$1.call(null,a),sources__$1.call(null,b));
});
;})(sources__$1))
});
/**
 * Take a source map segment represented as a vector
 * and return a map.
 */
cljs.source_map.seg__GT_map = (function cljs$source_map$seg__GT_map(seg,source_map){
var vec__9156 = seg;
var gcol = cljs.core.nth.call(null,vec__9156,(0),null);
var source = cljs.core.nth.call(null,vec__9156,(1),null);
var line = cljs.core.nth.call(null,vec__9156,(2),null);
var col = cljs.core.nth.call(null,vec__9156,(3),null);
var name = cljs.core.nth.call(null,vec__9156,(4),null);
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol,new cljs.core.Keyword(null,"source","source",-433931539),(goog.object.get(source_map,"sources")[source]),new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"name","name",1843675177),(function (){var temp__4657__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(cljs.core.meta.call(null,seg));
if(cljs.core.truth_(temp__4657__auto__)){
var name__$1 = temp__4657__auto__;
return (goog.object.get(source_map,"names")[name__$1]);
} else {
return null;
}
})()], null);
});
/**
 * Combine a source map segment vector and a relative
 * source map segment vector and combine them to get
 * an absolute segment posititon information as a vector.
 */
cljs.source_map.seg_combine = (function cljs$source_map$seg_combine(seg,relseg){
var vec__9159 = seg;
var gcol = cljs.core.nth.call(null,vec__9159,(0),null);
var source = cljs.core.nth.call(null,vec__9159,(1),null);
var line = cljs.core.nth.call(null,vec__9159,(2),null);
var col = cljs.core.nth.call(null,vec__9159,(3),null);
var name = cljs.core.nth.call(null,vec__9159,(4),null);
var vec__9160 = relseg;
var rgcol = cljs.core.nth.call(null,vec__9160,(0),null);
var rsource = cljs.core.nth.call(null,vec__9160,(1),null);
var rline = cljs.core.nth.call(null,vec__9160,(2),null);
var rcol = cljs.core.nth.call(null,vec__9160,(3),null);
var rname = cljs.core.nth.call(null,vec__9160,(4),null);
var nseg = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(gcol + rgcol),((function (){var or__6697__auto__ = source;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return (0);
}
})() + rsource),((function (){var or__6697__auto__ = line;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return (0);
}
})() + rline),((function (){var or__6697__auto__ = col;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return (0);
}
})() + rcol),((function (){var or__6697__auto__ = name;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return (0);
}
})() + rname)], null);
if(cljs.core.truth_(name)){
return cljs.core.with_meta.call(null,nseg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),(name + rname)], null));
} else {
return nseg;
}
});
/**
 * Helper for decode-reverse. Take a reverse source map and
 *   update it with a segment map.
 */
cljs.source_map.update_reverse_result = (function cljs$source_map$update_reverse_result(result,segmap,gline){
var map__9163 = segmap;
var map__9163__$1 = ((((!((map__9163 == null)))?((((map__9163.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9163.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9163):map__9163);
var gcol = cljs.core.get.call(null,map__9163__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__9163__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__9163__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__9163__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__9163__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"gline","gline",-1086242431),gline,new cljs.core.Keyword(null,"gcol","gcol",309250807),gcol], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [source], null),cljs.core.fnil.call(null,((function (map__9163,map__9163__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [line], null),cljs.core.fnil.call(null,((function (map__9163,map__9163__$1,gcol,source,line,col,name,d,d__$1){
return (function (m__$1){
return cljs.core.update_in.call(null,m__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [col], null),cljs.core.fnil.call(null,((function (map__9163,map__9163__$1,gcol,source,line,col,name,d,d__$1){
return (function (v){
return cljs.core.conj.call(null,v,d__$1);
});})(map__9163,map__9163__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__9163,map__9163__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});})(map__9163,map__9163__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a reverse source map
 *   mapping original ClojureScript source locations to the generated
 *   JavaScript.
 */
cljs.source_map.decode_reverse = (function cljs$source_map$decode_reverse(var_args){
var args9165 = [];
var len__7755__auto___9169 = arguments.length;
var i__7756__auto___9170 = (0);
while(true){
if((i__7756__auto___9170 < len__7755__auto___9169)){
args9165.push((arguments[i__7756__auto___9170]));

var G__9171 = (i__7756__auto___9170 + (1));
i__7756__auto___9170 = G__9171;
continue;
} else {
}
break;
}

var G__9167 = args9165.length;
switch (G__9167) {
case 1:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9165.length)].join('')));

}
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode_reverse.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode_reverse.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.sorted_map_by.call(null,cljs.source_map.source_compare.call(null,sources));
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__9168 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__9173 = cljs.core.next.call(null,segs__$1);
var G__9174 = nrelseg;
var G__9175 = cljs.source_map.update_reverse_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__9173;
relseg__$1 = G__9174;
result__$1 = G__9175;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__9168,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__9168,(1),null);
var G__9176 = (gline + (1));
var G__9177 = cljs.core.next.call(null,lines__$1);
var G__9178 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__9179 = result__$1;
gline = G__9176;
lines__$1 = G__9177;
relseg = G__9178;
result = G__9179;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode_reverse.cljs$lang$maxFixedArity = 2;
/**
 * Helper for decode. Take a source map and update it based on a
 *   segment map.
 */
cljs.source_map.update_result = (function cljs$source_map$update_result(result,segmap,gline){
var map__9183 = segmap;
var map__9183__$1 = ((((!((map__9183 == null)))?((((map__9183.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9183.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9183):map__9183);
var gcol = cljs.core.get.call(null,map__9183__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var source = cljs.core.get.call(null,map__9183__$1,new cljs.core.Keyword(null,"source","source",-433931539));
var line = cljs.core.get.call(null,map__9183__$1,new cljs.core.Keyword(null,"line","line",212345235));
var col = cljs.core.get.call(null,map__9183__$1,new cljs.core.Keyword(null,"col","col",-1959363084));
var name = cljs.core.get.call(null,map__9183__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var d = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line,new cljs.core.Keyword(null,"col","col",-1959363084),col,new cljs.core.Keyword(null,"source","source",-433931539),source], null);
var d__$1 = (cljs.core.truth_(name)?cljs.core.assoc.call(null,d,new cljs.core.Keyword(null,"name","name",1843675177),name):d);
return cljs.core.update_in.call(null,result,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline], null),cljs.core.fnil.call(null,((function (map__9183,map__9183__$1,gcol,source,line,col,name,d,d__$1){
return (function (m){
return cljs.core.update_in.call(null,m,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol], null),cljs.core.fnil.call(null,((function (map__9183,map__9183__$1,gcol,source,line,col,name,d,d__$1){
return (function (p1__9180_SHARP_){
return cljs.core.conj.call(null,p1__9180_SHARP_,d__$1);
});})(map__9183,map__9183__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.PersistentVector.EMPTY));
});})(map__9183,map__9183__$1,gcol,source,line,col,name,d,d__$1))
,cljs.core.sorted_map.call(null)));
});
/**
 * Convert a v3 source map JSON object into a source map mapping
 *   generated JavaScript source locations to the original
 *   ClojureScript.
 */
cljs.source_map.decode = (function cljs$source_map$decode(var_args){
var args9185 = [];
var len__7755__auto___9189 = arguments.length;
var i__7756__auto___9190 = (0);
while(true){
if((i__7756__auto___9190 < len__7755__auto___9189)){
args9185.push((arguments[i__7756__auto___9190]));

var G__9191 = (i__7756__auto___9190 + (1));
i__7756__auto___9190 = G__9191;
continue;
} else {
}
break;
}

var G__9187 = args9185.length;
switch (G__9187) {
case 1:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9185.length)].join('')));

}
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$1 = (function (source_map){
return cljs.source_map.decode.call(null,goog.object.get(source_map,"mappings"),source_map);
});

cljs.source_map.decode.cljs$core$IFn$_invoke$arity$2 = (function (mappings,source_map){
var sources = goog.object.get(source_map,"sources");
var relseg_init = new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null);
var lines = cljs.core.seq.call(null,clojure.string.split.call(null,mappings,/;/));
var gline = (0);
var lines__$1 = lines;
var relseg = relseg_init;
var result = cljs.core.PersistentArrayMap.EMPTY;
while(true){
if(lines__$1){
var line = cljs.core.first.call(null,lines__$1);
var vec__9188 = ((clojure.string.blank_QMARK_.call(null,line))?new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result,relseg], null):(function (){var segs = cljs.core.seq.call(null,clojure.string.split.call(null,line,/,/));
var segs__$1 = segs;
var relseg__$1 = relseg;
var result__$1 = result;
while(true){
if(segs__$1){
var seg = cljs.core.first.call(null,segs__$1);
var nrelseg = cljs.source_map.seg_combine.call(null,cljs.source_map.base64_vlq.decode.call(null,seg),relseg__$1);
var G__9193 = cljs.core.next.call(null,segs__$1);
var G__9194 = nrelseg;
var G__9195 = cljs.source_map.update_result.call(null,result__$1,cljs.source_map.seg__GT_map.call(null,nrelseg,source_map),gline);
segs__$1 = G__9193;
relseg__$1 = G__9194;
result__$1 = G__9195;
continue;
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [result__$1,relseg__$1], null);
}
break;
}
})());
var result__$1 = cljs.core.nth.call(null,vec__9188,(0),null);
var relseg__$1 = cljs.core.nth.call(null,vec__9188,(1),null);
var G__9196 = (gline + (1));
var G__9197 = cljs.core.next.call(null,lines__$1);
var G__9198 = cljs.core.assoc.call(null,relseg__$1,(0),(0));
var G__9199 = result__$1;
gline = G__9196;
lines__$1 = G__9197;
relseg = G__9198;
result = G__9199;
continue;
} else {
return result;
}
break;
}
});

cljs.source_map.decode.cljs$lang$maxFixedArity = 2;
/**
 * Take a nested sorted map encoding line and column information
 * for a file and return a vector of vectors of encoded segments.
 * Each vector represents a line, and the internal vectors are segments
 * representing the contents of the line.
 */
cljs.source_map.lines__GT_segs = (function cljs$source_map$lines__GT_segs(lines){
var relseg = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),(0),(0),(0),(0)], null));
return cljs.core.reduce.call(null,((function (relseg){
return (function (segs,cols){
cljs.core.swap_BANG_.call(null,relseg,((function (relseg){
return (function (p__9206){
var vec__9207 = p__9206;
var _ = cljs.core.nth.call(null,vec__9207,(0),null);
var source = cljs.core.nth.call(null,vec__9207,(1),null);
var line = cljs.core.nth.call(null,vec__9207,(2),null);
var col = cljs.core.nth.call(null,vec__9207,(3),null);
var name = cljs.core.nth.call(null,vec__9207,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [(0),source,line,col,name], null);
});})(relseg))
);

return cljs.core.conj.call(null,segs,cljs.core.reduce.call(null,((function (relseg){
return (function (cols__$1,p__9208){
var vec__9209 = p__9208;
var gcol = cljs.core.nth.call(null,vec__9209,(0),null);
var sidx = cljs.core.nth.call(null,vec__9209,(1),null);
var line = cljs.core.nth.call(null,vec__9209,(2),null);
var col = cljs.core.nth.call(null,vec__9209,(3),null);
var name = cljs.core.nth.call(null,vec__9209,(4),null);
var seg = vec__9209;
var offset = cljs.core.map.call(null,cljs.core._,seg,cljs.core.deref.call(null,relseg));
cljs.core.swap_BANG_.call(null,relseg,((function (offset,vec__9209,gcol,sidx,line,col,name,seg,relseg){
return (function (p__9210){
var vec__9211 = p__9210;
var _ = cljs.core.nth.call(null,vec__9211,(0),null);
var ___$1 = cljs.core.nth.call(null,vec__9211,(1),null);
var ___$2 = cljs.core.nth.call(null,vec__9211,(2),null);
var ___$3 = cljs.core.nth.call(null,vec__9211,(3),null);
var lname = cljs.core.nth.call(null,vec__9211,(4),null);
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [gcol,sidx,line,col,(function (){var or__6697__auto__ = name;
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return lname;
}
})()], null);
});})(offset,vec__9209,gcol,sidx,line,col,name,seg,relseg))
);

return cljs.core.conj.call(null,cols__$1,cljs.source_map.base64_vlq.encode.call(null,offset));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,cols));
});})(relseg))
,cljs.core.PersistentVector.EMPTY,lines);
});
/**
 * Take an internal source map representation represented as nested
 * sorted maps of file, line, column and return a source map v3 JSON
 * string.
 */
cljs.source_map.encode = (function cljs$source_map$encode(m,opts){
var lines = cljs.core.atom.call(null,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.PersistentVector.EMPTY], null));
var names__GT_idx = cljs.core.atom.call(null,cljs.core.PersistentArrayMap.EMPTY);
var name_idx = cljs.core.atom.call(null,(0));
var preamble_lines = cljs.core.take.call(null,(function (){var or__6697__auto__ = new cljs.core.Keyword(null,"preamble-line-count","preamble-line-count",-659949744).cljs$core$IFn$_invoke$arity$1(opts);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return (0);
}
})(),cljs.core.repeat.call(null,cljs.core.PersistentVector.EMPTY));
var info__GT_segv = ((function (lines,names__GT_idx,name_idx,preamble_lines){
return (function (info,source_idx,line,col){
var segv = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"gcol","gcol",309250807).cljs$core$IFn$_invoke$arity$1(info),source_idx,line,col], null);
var temp__4655__auto__ = new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(info);
if(cljs.core.truth_(temp__4655__auto__)){
var name = temp__4655__auto__;
var idx = (function (){var temp__4655__auto____$1 = cljs.core.get.call(null,cljs.core.deref.call(null,names__GT_idx),name);
if(cljs.core.truth_(temp__4655__auto____$1)){
var idx = temp__4655__auto____$1;
return idx;
} else {
var cidx = cljs.core.deref.call(null,name_idx);
cljs.core.swap_BANG_.call(null,names__GT_idx,cljs.core.assoc,name,cidx);

cljs.core.swap_BANG_.call(null,name_idx,cljs.core.inc);

return cidx;
}
})();
return cljs.core.conj.call(null,segv,idx);
} else {
return segv;
}
});})(lines,names__GT_idx,name_idx,preamble_lines))
;
var encode_cols = ((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (infos,source_idx,line,col){
var seq__9265 = cljs.core.seq.call(null,infos);
var chunk__9266 = null;
var count__9267 = (0);
var i__9268 = (0);
while(true){
if((i__9268 < count__9267)){
var info = cljs.core._nth.call(null,chunk__9266,i__9268);
var segv_9315 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_9316 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_9317 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_9316 > (lc_9317 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__9265,chunk__9266,count__9267,i__9268,segv_9315,gline_9316,lc_9317,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_9316 - (lc_9317 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_9315], null));
});})(seq__9265,chunk__9266,count__9267,i__9268,segv_9315,gline_9316,lc_9317,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__9265,chunk__9266,count__9267,i__9268,segv_9315,gline_9316,lc_9317,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9316], null),cljs.core.conj,segv_9315);
});})(seq__9265,chunk__9266,count__9267,i__9268,segv_9315,gline_9316,lc_9317,info,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__9318 = seq__9265;
var G__9319 = chunk__9266;
var G__9320 = count__9267;
var G__9321 = (i__9268 + (1));
seq__9265 = G__9318;
chunk__9266 = G__9319;
count__9267 = G__9320;
i__9268 = G__9321;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__9265);
if(temp__4657__auto__){
var seq__9265__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9265__$1)){
var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__9265__$1);
var G__9322 = cljs.core.chunk_rest.call(null,seq__9265__$1);
var G__9323 = c__7500__auto__;
var G__9324 = cljs.core.count.call(null,c__7500__auto__);
var G__9325 = (0);
seq__9265 = G__9322;
chunk__9266 = G__9323;
count__9267 = G__9324;
i__9268 = G__9325;
continue;
} else {
var info = cljs.core.first.call(null,seq__9265__$1);
var segv_9326 = info__GT_segv.call(null,info,source_idx,line,col);
var gline_9327 = new cljs.core.Keyword(null,"gline","gline",-1086242431).cljs$core$IFn$_invoke$arity$1(info);
var lc_9328 = cljs.core.count.call(null,cljs.core.deref.call(null,lines));
if((gline_9327 > (lc_9328 - (1)))){
cljs.core.swap_BANG_.call(null,lines,((function (seq__9265,chunk__9266,count__9267,i__9268,segv_9326,gline_9327,lc_9328,info,seq__9265__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.conj.call(null,cljs.core.into.call(null,lines__$1,cljs.core.repeat.call(null,((gline_9327 - (lc_9328 - (1))) - (1)),cljs.core.PersistentVector.EMPTY)),new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [segv_9326], null));
});})(seq__9265,chunk__9266,count__9267,i__9268,segv_9326,gline_9327,lc_9328,info,seq__9265__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
} else {
cljs.core.swap_BANG_.call(null,lines,((function (seq__9265,chunk__9266,count__9267,i__9268,segv_9326,gline_9327,lc_9328,info,seq__9265__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv){
return (function (lines__$1){
return cljs.core.update_in.call(null,lines__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9327], null),cljs.core.conj,segv_9326);
});})(seq__9265,chunk__9266,count__9267,i__9268,segv_9326,gline_9327,lc_9328,info,seq__9265__$1,temp__4657__auto__,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
);
}

var G__9329 = cljs.core.next.call(null,seq__9265__$1);
var G__9330 = null;
var G__9331 = (0);
var G__9332 = (0);
seq__9265 = G__9329;
chunk__9266 = G__9330;
count__9267 = G__9331;
i__9268 = G__9332;
continue;
}
} else {
return null;
}
}
break;
}
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv))
;
var seq__9269_9333 = cljs.core.seq.call(null,cljs.core.map_indexed.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (i,v){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [i,v], null);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,m));
var chunk__9270_9334 = null;
var count__9271_9335 = (0);
var i__9272_9336 = (0);
while(true){
if((i__9272_9336 < count__9271_9335)){
var vec__9273_9337 = cljs.core._nth.call(null,chunk__9270_9334,i__9272_9336);
var source_idx_9338 = cljs.core.nth.call(null,vec__9273_9337,(0),null);
var vec__9274_9339 = cljs.core.nth.call(null,vec__9273_9337,(1),null);
var __9340 = cljs.core.nth.call(null,vec__9274_9339,(0),null);
var lines_9341__$1 = cljs.core.nth.call(null,vec__9274_9339,(1),null);
var seq__9275_9342 = cljs.core.seq.call(null,lines_9341__$1);
var chunk__9276_9343 = null;
var count__9277_9344 = (0);
var i__9278_9345 = (0);
while(true){
if((i__9278_9345 < count__9277_9344)){
var vec__9279_9346 = cljs.core._nth.call(null,chunk__9276_9343,i__9278_9345);
var line_9347 = cljs.core.nth.call(null,vec__9279_9346,(0),null);
var cols_9348 = cljs.core.nth.call(null,vec__9279_9346,(1),null);
var seq__9280_9349 = cljs.core.seq.call(null,cols_9348);
var chunk__9281_9350 = null;
var count__9282_9351 = (0);
var i__9283_9352 = (0);
while(true){
if((i__9283_9352 < count__9282_9351)){
var vec__9284_9353 = cljs.core._nth.call(null,chunk__9281_9350,i__9283_9352);
var col_9354 = cljs.core.nth.call(null,vec__9284_9353,(0),null);
var infos_9355 = cljs.core.nth.call(null,vec__9284_9353,(1),null);
encode_cols.call(null,infos_9355,source_idx_9338,line_9347,col_9354);

var G__9356 = seq__9280_9349;
var G__9357 = chunk__9281_9350;
var G__9358 = count__9282_9351;
var G__9359 = (i__9283_9352 + (1));
seq__9280_9349 = G__9356;
chunk__9281_9350 = G__9357;
count__9282_9351 = G__9358;
i__9283_9352 = G__9359;
continue;
} else {
var temp__4657__auto___9360 = cljs.core.seq.call(null,seq__9280_9349);
if(temp__4657__auto___9360){
var seq__9280_9361__$1 = temp__4657__auto___9360;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9280_9361__$1)){
var c__7500__auto___9362 = cljs.core.chunk_first.call(null,seq__9280_9361__$1);
var G__9363 = cljs.core.chunk_rest.call(null,seq__9280_9361__$1);
var G__9364 = c__7500__auto___9362;
var G__9365 = cljs.core.count.call(null,c__7500__auto___9362);
var G__9366 = (0);
seq__9280_9349 = G__9363;
chunk__9281_9350 = G__9364;
count__9282_9351 = G__9365;
i__9283_9352 = G__9366;
continue;
} else {
var vec__9285_9367 = cljs.core.first.call(null,seq__9280_9361__$1);
var col_9368 = cljs.core.nth.call(null,vec__9285_9367,(0),null);
var infos_9369 = cljs.core.nth.call(null,vec__9285_9367,(1),null);
encode_cols.call(null,infos_9369,source_idx_9338,line_9347,col_9368);

var G__9370 = cljs.core.next.call(null,seq__9280_9361__$1);
var G__9371 = null;
var G__9372 = (0);
var G__9373 = (0);
seq__9280_9349 = G__9370;
chunk__9281_9350 = G__9371;
count__9282_9351 = G__9372;
i__9283_9352 = G__9373;
continue;
}
} else {
}
}
break;
}

var G__9374 = seq__9275_9342;
var G__9375 = chunk__9276_9343;
var G__9376 = count__9277_9344;
var G__9377 = (i__9278_9345 + (1));
seq__9275_9342 = G__9374;
chunk__9276_9343 = G__9375;
count__9277_9344 = G__9376;
i__9278_9345 = G__9377;
continue;
} else {
var temp__4657__auto___9378 = cljs.core.seq.call(null,seq__9275_9342);
if(temp__4657__auto___9378){
var seq__9275_9379__$1 = temp__4657__auto___9378;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9275_9379__$1)){
var c__7500__auto___9380 = cljs.core.chunk_first.call(null,seq__9275_9379__$1);
var G__9381 = cljs.core.chunk_rest.call(null,seq__9275_9379__$1);
var G__9382 = c__7500__auto___9380;
var G__9383 = cljs.core.count.call(null,c__7500__auto___9380);
var G__9384 = (0);
seq__9275_9342 = G__9381;
chunk__9276_9343 = G__9382;
count__9277_9344 = G__9383;
i__9278_9345 = G__9384;
continue;
} else {
var vec__9286_9385 = cljs.core.first.call(null,seq__9275_9379__$1);
var line_9386 = cljs.core.nth.call(null,vec__9286_9385,(0),null);
var cols_9387 = cljs.core.nth.call(null,vec__9286_9385,(1),null);
var seq__9287_9388 = cljs.core.seq.call(null,cols_9387);
var chunk__9288_9389 = null;
var count__9289_9390 = (0);
var i__9290_9391 = (0);
while(true){
if((i__9290_9391 < count__9289_9390)){
var vec__9291_9392 = cljs.core._nth.call(null,chunk__9288_9389,i__9290_9391);
var col_9393 = cljs.core.nth.call(null,vec__9291_9392,(0),null);
var infos_9394 = cljs.core.nth.call(null,vec__9291_9392,(1),null);
encode_cols.call(null,infos_9394,source_idx_9338,line_9386,col_9393);

var G__9395 = seq__9287_9388;
var G__9396 = chunk__9288_9389;
var G__9397 = count__9289_9390;
var G__9398 = (i__9290_9391 + (1));
seq__9287_9388 = G__9395;
chunk__9288_9389 = G__9396;
count__9289_9390 = G__9397;
i__9290_9391 = G__9398;
continue;
} else {
var temp__4657__auto___9399__$1 = cljs.core.seq.call(null,seq__9287_9388);
if(temp__4657__auto___9399__$1){
var seq__9287_9400__$1 = temp__4657__auto___9399__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9287_9400__$1)){
var c__7500__auto___9401 = cljs.core.chunk_first.call(null,seq__9287_9400__$1);
var G__9402 = cljs.core.chunk_rest.call(null,seq__9287_9400__$1);
var G__9403 = c__7500__auto___9401;
var G__9404 = cljs.core.count.call(null,c__7500__auto___9401);
var G__9405 = (0);
seq__9287_9388 = G__9402;
chunk__9288_9389 = G__9403;
count__9289_9390 = G__9404;
i__9290_9391 = G__9405;
continue;
} else {
var vec__9292_9406 = cljs.core.first.call(null,seq__9287_9400__$1);
var col_9407 = cljs.core.nth.call(null,vec__9292_9406,(0),null);
var infos_9408 = cljs.core.nth.call(null,vec__9292_9406,(1),null);
encode_cols.call(null,infos_9408,source_idx_9338,line_9386,col_9407);

var G__9409 = cljs.core.next.call(null,seq__9287_9400__$1);
var G__9410 = null;
var G__9411 = (0);
var G__9412 = (0);
seq__9287_9388 = G__9409;
chunk__9288_9389 = G__9410;
count__9289_9390 = G__9411;
i__9290_9391 = G__9412;
continue;
}
} else {
}
}
break;
}

var G__9413 = cljs.core.next.call(null,seq__9275_9379__$1);
var G__9414 = null;
var G__9415 = (0);
var G__9416 = (0);
seq__9275_9342 = G__9413;
chunk__9276_9343 = G__9414;
count__9277_9344 = G__9415;
i__9278_9345 = G__9416;
continue;
}
} else {
}
}
break;
}

var G__9417 = seq__9269_9333;
var G__9418 = chunk__9270_9334;
var G__9419 = count__9271_9335;
var G__9420 = (i__9272_9336 + (1));
seq__9269_9333 = G__9417;
chunk__9270_9334 = G__9418;
count__9271_9335 = G__9419;
i__9272_9336 = G__9420;
continue;
} else {
var temp__4657__auto___9421 = cljs.core.seq.call(null,seq__9269_9333);
if(temp__4657__auto___9421){
var seq__9269_9422__$1 = temp__4657__auto___9421;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9269_9422__$1)){
var c__7500__auto___9423 = cljs.core.chunk_first.call(null,seq__9269_9422__$1);
var G__9424 = cljs.core.chunk_rest.call(null,seq__9269_9422__$1);
var G__9425 = c__7500__auto___9423;
var G__9426 = cljs.core.count.call(null,c__7500__auto___9423);
var G__9427 = (0);
seq__9269_9333 = G__9424;
chunk__9270_9334 = G__9425;
count__9271_9335 = G__9426;
i__9272_9336 = G__9427;
continue;
} else {
var vec__9293_9428 = cljs.core.first.call(null,seq__9269_9422__$1);
var source_idx_9429 = cljs.core.nth.call(null,vec__9293_9428,(0),null);
var vec__9294_9430 = cljs.core.nth.call(null,vec__9293_9428,(1),null);
var __9431 = cljs.core.nth.call(null,vec__9294_9430,(0),null);
var lines_9432__$1 = cljs.core.nth.call(null,vec__9294_9430,(1),null);
var seq__9295_9433 = cljs.core.seq.call(null,lines_9432__$1);
var chunk__9296_9434 = null;
var count__9297_9435 = (0);
var i__9298_9436 = (0);
while(true){
if((i__9298_9436 < count__9297_9435)){
var vec__9299_9437 = cljs.core._nth.call(null,chunk__9296_9434,i__9298_9436);
var line_9438 = cljs.core.nth.call(null,vec__9299_9437,(0),null);
var cols_9439 = cljs.core.nth.call(null,vec__9299_9437,(1),null);
var seq__9300_9440 = cljs.core.seq.call(null,cols_9439);
var chunk__9301_9441 = null;
var count__9302_9442 = (0);
var i__9303_9443 = (0);
while(true){
if((i__9303_9443 < count__9302_9442)){
var vec__9304_9444 = cljs.core._nth.call(null,chunk__9301_9441,i__9303_9443);
var col_9445 = cljs.core.nth.call(null,vec__9304_9444,(0),null);
var infos_9446 = cljs.core.nth.call(null,vec__9304_9444,(1),null);
encode_cols.call(null,infos_9446,source_idx_9429,line_9438,col_9445);

var G__9447 = seq__9300_9440;
var G__9448 = chunk__9301_9441;
var G__9449 = count__9302_9442;
var G__9450 = (i__9303_9443 + (1));
seq__9300_9440 = G__9447;
chunk__9301_9441 = G__9448;
count__9302_9442 = G__9449;
i__9303_9443 = G__9450;
continue;
} else {
var temp__4657__auto___9451__$1 = cljs.core.seq.call(null,seq__9300_9440);
if(temp__4657__auto___9451__$1){
var seq__9300_9452__$1 = temp__4657__auto___9451__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9300_9452__$1)){
var c__7500__auto___9453 = cljs.core.chunk_first.call(null,seq__9300_9452__$1);
var G__9454 = cljs.core.chunk_rest.call(null,seq__9300_9452__$1);
var G__9455 = c__7500__auto___9453;
var G__9456 = cljs.core.count.call(null,c__7500__auto___9453);
var G__9457 = (0);
seq__9300_9440 = G__9454;
chunk__9301_9441 = G__9455;
count__9302_9442 = G__9456;
i__9303_9443 = G__9457;
continue;
} else {
var vec__9305_9458 = cljs.core.first.call(null,seq__9300_9452__$1);
var col_9459 = cljs.core.nth.call(null,vec__9305_9458,(0),null);
var infos_9460 = cljs.core.nth.call(null,vec__9305_9458,(1),null);
encode_cols.call(null,infos_9460,source_idx_9429,line_9438,col_9459);

var G__9461 = cljs.core.next.call(null,seq__9300_9452__$1);
var G__9462 = null;
var G__9463 = (0);
var G__9464 = (0);
seq__9300_9440 = G__9461;
chunk__9301_9441 = G__9462;
count__9302_9442 = G__9463;
i__9303_9443 = G__9464;
continue;
}
} else {
}
}
break;
}

var G__9465 = seq__9295_9433;
var G__9466 = chunk__9296_9434;
var G__9467 = count__9297_9435;
var G__9468 = (i__9298_9436 + (1));
seq__9295_9433 = G__9465;
chunk__9296_9434 = G__9466;
count__9297_9435 = G__9467;
i__9298_9436 = G__9468;
continue;
} else {
var temp__4657__auto___9469__$1 = cljs.core.seq.call(null,seq__9295_9433);
if(temp__4657__auto___9469__$1){
var seq__9295_9470__$1 = temp__4657__auto___9469__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9295_9470__$1)){
var c__7500__auto___9471 = cljs.core.chunk_first.call(null,seq__9295_9470__$1);
var G__9472 = cljs.core.chunk_rest.call(null,seq__9295_9470__$1);
var G__9473 = c__7500__auto___9471;
var G__9474 = cljs.core.count.call(null,c__7500__auto___9471);
var G__9475 = (0);
seq__9295_9433 = G__9472;
chunk__9296_9434 = G__9473;
count__9297_9435 = G__9474;
i__9298_9436 = G__9475;
continue;
} else {
var vec__9306_9476 = cljs.core.first.call(null,seq__9295_9470__$1);
var line_9477 = cljs.core.nth.call(null,vec__9306_9476,(0),null);
var cols_9478 = cljs.core.nth.call(null,vec__9306_9476,(1),null);
var seq__9307_9479 = cljs.core.seq.call(null,cols_9478);
var chunk__9308_9480 = null;
var count__9309_9481 = (0);
var i__9310_9482 = (0);
while(true){
if((i__9310_9482 < count__9309_9481)){
var vec__9311_9483 = cljs.core._nth.call(null,chunk__9308_9480,i__9310_9482);
var col_9484 = cljs.core.nth.call(null,vec__9311_9483,(0),null);
var infos_9485 = cljs.core.nth.call(null,vec__9311_9483,(1),null);
encode_cols.call(null,infos_9485,source_idx_9429,line_9477,col_9484);

var G__9486 = seq__9307_9479;
var G__9487 = chunk__9308_9480;
var G__9488 = count__9309_9481;
var G__9489 = (i__9310_9482 + (1));
seq__9307_9479 = G__9486;
chunk__9308_9480 = G__9487;
count__9309_9481 = G__9488;
i__9310_9482 = G__9489;
continue;
} else {
var temp__4657__auto___9490__$2 = cljs.core.seq.call(null,seq__9307_9479);
if(temp__4657__auto___9490__$2){
var seq__9307_9491__$1 = temp__4657__auto___9490__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9307_9491__$1)){
var c__7500__auto___9492 = cljs.core.chunk_first.call(null,seq__9307_9491__$1);
var G__9493 = cljs.core.chunk_rest.call(null,seq__9307_9491__$1);
var G__9494 = c__7500__auto___9492;
var G__9495 = cljs.core.count.call(null,c__7500__auto___9492);
var G__9496 = (0);
seq__9307_9479 = G__9493;
chunk__9308_9480 = G__9494;
count__9309_9481 = G__9495;
i__9310_9482 = G__9496;
continue;
} else {
var vec__9312_9497 = cljs.core.first.call(null,seq__9307_9491__$1);
var col_9498 = cljs.core.nth.call(null,vec__9312_9497,(0),null);
var infos_9499 = cljs.core.nth.call(null,vec__9312_9497,(1),null);
encode_cols.call(null,infos_9499,source_idx_9429,line_9477,col_9498);

var G__9500 = cljs.core.next.call(null,seq__9307_9491__$1);
var G__9501 = null;
var G__9502 = (0);
var G__9503 = (0);
seq__9307_9479 = G__9500;
chunk__9308_9480 = G__9501;
count__9309_9481 = G__9502;
i__9310_9482 = G__9503;
continue;
}
} else {
}
}
break;
}

var G__9504 = cljs.core.next.call(null,seq__9295_9470__$1);
var G__9505 = null;
var G__9506 = (0);
var G__9507 = (0);
seq__9295_9433 = G__9504;
chunk__9296_9434 = G__9505;
count__9297_9435 = G__9506;
i__9298_9436 = G__9507;
continue;
}
} else {
}
}
break;
}

var G__9508 = cljs.core.next.call(null,seq__9269_9422__$1);
var G__9509 = null;
var G__9510 = (0);
var G__9511 = (0);
seq__9269_9333 = G__9508;
chunk__9270_9334 = G__9509;
count__9271_9335 = G__9510;
i__9272_9336 = G__9511;
continue;
}
} else {
}
}
break;
}

var source_map_file_contents = (function (){var G__9313 = {"version": (3), "file": new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(opts), "sources": (function (){var paths = cljs.core.keys.call(null,m);
var f = cljs.core.comp.call(null,((new cljs.core.Keyword(null,"source-map-timestamp","source-map-timestamp",1973015633).cljs$core$IFn$_invoke$arity$1(opts) === true)?((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__9212_SHARP_){
return [cljs.core.str(p1__9212_SHARP_),cljs.core.str("?rel="),cljs.core.str((new Date()).valueOf())].join('');
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
:cljs.core.identity),((function (paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__9213_SHARP_){
return cljs.core.last.call(null,clojure.string.split.call(null,p1__9213_SHARP_,/\//));
});})(paths,lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
);
return cljs.core.into_array.call(null,cljs.core.map.call(null,f,paths));
})(), "lineCount": new cljs.core.Keyword(null,"lines","lines",-700165781).cljs$core$IFn$_invoke$arity$1(opts), "mappings": clojure.string.join.call(null,";",cljs.core.map.call(null,((function (lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols){
return (function (p1__9214_SHARP_){
return clojure.string.join.call(null,",",p1__9214_SHARP_);
});})(lines,names__GT_idx,name_idx,preamble_lines,info__GT_segv,encode_cols))
,cljs.source_map.lines__GT_segs.call(null,cljs.core.concat.call(null,preamble_lines,cljs.core.deref.call(null,lines))))), "names": cljs.core.into_array.call(null,cljs.core.map.call(null,clojure.set.map_invert.call(null,cljs.core.deref.call(null,names__GT_idx)),cljs.core.range.call(null,cljs.core.count.call(null,cljs.core.deref.call(null,names__GT_idx)))))};
if(cljs.core.truth_(new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts))){
var G__9314 = G__9313;
goog.object.set(G__9314,"sourcesContent",cljs.core.into_array.call(null,new cljs.core.Keyword(null,"sources-content","sources-content",1729970239).cljs$core$IFn$_invoke$arity$1(opts)));

return G__9314;
} else {
return G__9313;
}
})();
return JSON.stringify(source_map_file_contents);
});
/**
 * Merge an internal source map representation of a single
 * ClojureScript file mapping original to generated with a
 * second source map mapping original JS to generated JS.
 * The is to support source maps that work through multiple
 * compilation steps like Google Closure optimization passes.
 */
cljs.source_map.merge_source_maps = (function cljs$source_map$merge_source_maps(cljs_map,js_map){
var line_map_seq = cljs.core.seq.call(null,cljs_map);
var new_lines = cljs.core.sorted_map.call(null);
while(true){
if(line_map_seq){
var vec__9517 = cljs.core.first.call(null,line_map_seq);
var line = cljs.core.nth.call(null,vec__9517,(0),null);
var col_map = cljs.core.nth.call(null,vec__9517,(1),null);
var new_cols = (function (){var col_map_seq = cljs.core.seq.call(null,col_map);
var new_cols = cljs.core.sorted_map.call(null);
while(true){
if(col_map_seq){
var vec__9518 = cljs.core.first.call(null,col_map_seq);
var col = cljs.core.nth.call(null,vec__9518,(0),null);
var infos = cljs.core.nth.call(null,vec__9518,(1),null);
var G__9522 = cljs.core.next.call(null,col_map_seq);
var G__9523 = cljs.core.assoc.call(null,new_cols,col,cljs.core.reduce.call(null,((function (col_map_seq,new_cols,line_map_seq,new_lines,vec__9518,col,infos,vec__9517,line,col_map){
return (function (v,p__9519){
var map__9520 = p__9519;
var map__9520__$1 = ((((!((map__9520 == null)))?((((map__9520.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9520.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9520):map__9520);
var gline = cljs.core.get.call(null,map__9520__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol = cljs.core.get.call(null,map__9520__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
return cljs.core.into.call(null,v,cljs.core.get_in.call(null,js_map,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline,gcol], null)));
});})(col_map_seq,new_cols,line_map_seq,new_lines,vec__9518,col,infos,vec__9517,line,col_map))
,cljs.core.PersistentVector.EMPTY,infos));
col_map_seq = G__9522;
new_cols = G__9523;
continue;
} else {
return new_cols;
}
break;
}
})();
var G__9524 = cljs.core.next.call(null,line_map_seq);
var G__9525 = cljs.core.assoc.call(null,new_lines,line,new_cols);
line_map_seq = G__9524;
new_lines = G__9525;
continue;
} else {
return new_lines;
}
break;
}
});
/**
 * Given a ClojureScript to JavaScript source map, invert it. Useful when
 * mapping JavaScript stack traces when environment support is unavailable.
 */
cljs.source_map.invert_reverse_map = (function cljs$source_map$invert_reverse_map(reverse_map){
var inverted = cljs.core.atom.call(null,cljs.core.sorted_map.call(null));
var seq__9576_9626 = cljs.core.seq.call(null,reverse_map);
var chunk__9577_9627 = null;
var count__9578_9628 = (0);
var i__9579_9629 = (0);
while(true){
if((i__9579_9629 < count__9578_9628)){
var vec__9580_9630 = cljs.core._nth.call(null,chunk__9577_9627,i__9579_9629);
var line_9631 = cljs.core.nth.call(null,vec__9580_9630,(0),null);
var columns_9632 = cljs.core.nth.call(null,vec__9580_9630,(1),null);
var seq__9581_9633 = cljs.core.seq.call(null,columns_9632);
var chunk__9582_9634 = null;
var count__9583_9635 = (0);
var i__9584_9636 = (0);
while(true){
if((i__9584_9636 < count__9583_9635)){
var vec__9585_9637 = cljs.core._nth.call(null,chunk__9582_9634,i__9584_9636);
var column_9638 = cljs.core.nth.call(null,vec__9585_9637,(0),null);
var column_info_9639 = cljs.core.nth.call(null,vec__9585_9637,(1),null);
var seq__9586_9640 = cljs.core.seq.call(null,column_info_9639);
var chunk__9587_9641 = null;
var count__9588_9642 = (0);
var i__9589_9643 = (0);
while(true){
if((i__9589_9643 < count__9588_9642)){
var map__9590_9644 = cljs.core._nth.call(null,chunk__9587_9641,i__9589_9643);
var map__9590_9645__$1 = ((((!((map__9590_9644 == null)))?((((map__9590_9644.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9590_9644.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9590_9644):map__9590_9644);
var gline_9646 = cljs.core.get.call(null,map__9590_9645__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9647 = cljs.core.get.call(null,map__9590_9645__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9648 = cljs.core.get.call(null,map__9590_9645__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9646], null),cljs.core.fnil.call(null,((function (seq__9586_9640,chunk__9587_9641,count__9588_9642,i__9589_9643,seq__9581_9633,chunk__9582_9634,count__9583_9635,i__9584_9636,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9590_9644,map__9590_9645__$1,gline_9646,gcol_9647,name_9648,vec__9585_9637,column_9638,column_info_9639,vec__9580_9630,line_9631,columns_9632,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9638], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9631,new cljs.core.Keyword(null,"col","col",-1959363084),column_9638,new cljs.core.Keyword(null,"name","name",1843675177),name_9648], null));
});})(seq__9586_9640,chunk__9587_9641,count__9588_9642,i__9589_9643,seq__9581_9633,chunk__9582_9634,count__9583_9635,i__9584_9636,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9590_9644,map__9590_9645__$1,gline_9646,gcol_9647,name_9648,vec__9585_9637,column_9638,column_info_9639,vec__9580_9630,line_9631,columns_9632,inverted))
,cljs.core.sorted_map.call(null)));

var G__9649 = seq__9586_9640;
var G__9650 = chunk__9587_9641;
var G__9651 = count__9588_9642;
var G__9652 = (i__9589_9643 + (1));
seq__9586_9640 = G__9649;
chunk__9587_9641 = G__9650;
count__9588_9642 = G__9651;
i__9589_9643 = G__9652;
continue;
} else {
var temp__4657__auto___9653 = cljs.core.seq.call(null,seq__9586_9640);
if(temp__4657__auto___9653){
var seq__9586_9654__$1 = temp__4657__auto___9653;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9586_9654__$1)){
var c__7500__auto___9655 = cljs.core.chunk_first.call(null,seq__9586_9654__$1);
var G__9656 = cljs.core.chunk_rest.call(null,seq__9586_9654__$1);
var G__9657 = c__7500__auto___9655;
var G__9658 = cljs.core.count.call(null,c__7500__auto___9655);
var G__9659 = (0);
seq__9586_9640 = G__9656;
chunk__9587_9641 = G__9657;
count__9588_9642 = G__9658;
i__9589_9643 = G__9659;
continue;
} else {
var map__9592_9660 = cljs.core.first.call(null,seq__9586_9654__$1);
var map__9592_9661__$1 = ((((!((map__9592_9660 == null)))?((((map__9592_9660.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9592_9660.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9592_9660):map__9592_9660);
var gline_9662 = cljs.core.get.call(null,map__9592_9661__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9663 = cljs.core.get.call(null,map__9592_9661__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9664 = cljs.core.get.call(null,map__9592_9661__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9662], null),cljs.core.fnil.call(null,((function (seq__9586_9640,chunk__9587_9641,count__9588_9642,i__9589_9643,seq__9581_9633,chunk__9582_9634,count__9583_9635,i__9584_9636,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9592_9660,map__9592_9661__$1,gline_9662,gcol_9663,name_9664,seq__9586_9654__$1,temp__4657__auto___9653,vec__9585_9637,column_9638,column_info_9639,vec__9580_9630,line_9631,columns_9632,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9638], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9631,new cljs.core.Keyword(null,"col","col",-1959363084),column_9638,new cljs.core.Keyword(null,"name","name",1843675177),name_9664], null));
});})(seq__9586_9640,chunk__9587_9641,count__9588_9642,i__9589_9643,seq__9581_9633,chunk__9582_9634,count__9583_9635,i__9584_9636,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9592_9660,map__9592_9661__$1,gline_9662,gcol_9663,name_9664,seq__9586_9654__$1,temp__4657__auto___9653,vec__9585_9637,column_9638,column_info_9639,vec__9580_9630,line_9631,columns_9632,inverted))
,cljs.core.sorted_map.call(null)));

var G__9665 = cljs.core.next.call(null,seq__9586_9654__$1);
var G__9666 = null;
var G__9667 = (0);
var G__9668 = (0);
seq__9586_9640 = G__9665;
chunk__9587_9641 = G__9666;
count__9588_9642 = G__9667;
i__9589_9643 = G__9668;
continue;
}
} else {
}
}
break;
}

var G__9669 = seq__9581_9633;
var G__9670 = chunk__9582_9634;
var G__9671 = count__9583_9635;
var G__9672 = (i__9584_9636 + (1));
seq__9581_9633 = G__9669;
chunk__9582_9634 = G__9670;
count__9583_9635 = G__9671;
i__9584_9636 = G__9672;
continue;
} else {
var temp__4657__auto___9673 = cljs.core.seq.call(null,seq__9581_9633);
if(temp__4657__auto___9673){
var seq__9581_9674__$1 = temp__4657__auto___9673;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9581_9674__$1)){
var c__7500__auto___9675 = cljs.core.chunk_first.call(null,seq__9581_9674__$1);
var G__9676 = cljs.core.chunk_rest.call(null,seq__9581_9674__$1);
var G__9677 = c__7500__auto___9675;
var G__9678 = cljs.core.count.call(null,c__7500__auto___9675);
var G__9679 = (0);
seq__9581_9633 = G__9676;
chunk__9582_9634 = G__9677;
count__9583_9635 = G__9678;
i__9584_9636 = G__9679;
continue;
} else {
var vec__9594_9680 = cljs.core.first.call(null,seq__9581_9674__$1);
var column_9681 = cljs.core.nth.call(null,vec__9594_9680,(0),null);
var column_info_9682 = cljs.core.nth.call(null,vec__9594_9680,(1),null);
var seq__9595_9683 = cljs.core.seq.call(null,column_info_9682);
var chunk__9596_9684 = null;
var count__9597_9685 = (0);
var i__9598_9686 = (0);
while(true){
if((i__9598_9686 < count__9597_9685)){
var map__9599_9687 = cljs.core._nth.call(null,chunk__9596_9684,i__9598_9686);
var map__9599_9688__$1 = ((((!((map__9599_9687 == null)))?((((map__9599_9687.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9599_9687.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9599_9687):map__9599_9687);
var gline_9689 = cljs.core.get.call(null,map__9599_9688__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9690 = cljs.core.get.call(null,map__9599_9688__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9691 = cljs.core.get.call(null,map__9599_9688__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9689], null),cljs.core.fnil.call(null,((function (seq__9595_9683,chunk__9596_9684,count__9597_9685,i__9598_9686,seq__9581_9633,chunk__9582_9634,count__9583_9635,i__9584_9636,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9599_9687,map__9599_9688__$1,gline_9689,gcol_9690,name_9691,vec__9594_9680,column_9681,column_info_9682,seq__9581_9674__$1,temp__4657__auto___9673,vec__9580_9630,line_9631,columns_9632,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9681], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9631,new cljs.core.Keyword(null,"col","col",-1959363084),column_9681,new cljs.core.Keyword(null,"name","name",1843675177),name_9691], null));
});})(seq__9595_9683,chunk__9596_9684,count__9597_9685,i__9598_9686,seq__9581_9633,chunk__9582_9634,count__9583_9635,i__9584_9636,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9599_9687,map__9599_9688__$1,gline_9689,gcol_9690,name_9691,vec__9594_9680,column_9681,column_info_9682,seq__9581_9674__$1,temp__4657__auto___9673,vec__9580_9630,line_9631,columns_9632,inverted))
,cljs.core.sorted_map.call(null)));

var G__9692 = seq__9595_9683;
var G__9693 = chunk__9596_9684;
var G__9694 = count__9597_9685;
var G__9695 = (i__9598_9686 + (1));
seq__9595_9683 = G__9692;
chunk__9596_9684 = G__9693;
count__9597_9685 = G__9694;
i__9598_9686 = G__9695;
continue;
} else {
var temp__4657__auto___9696__$1 = cljs.core.seq.call(null,seq__9595_9683);
if(temp__4657__auto___9696__$1){
var seq__9595_9697__$1 = temp__4657__auto___9696__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9595_9697__$1)){
var c__7500__auto___9698 = cljs.core.chunk_first.call(null,seq__9595_9697__$1);
var G__9699 = cljs.core.chunk_rest.call(null,seq__9595_9697__$1);
var G__9700 = c__7500__auto___9698;
var G__9701 = cljs.core.count.call(null,c__7500__auto___9698);
var G__9702 = (0);
seq__9595_9683 = G__9699;
chunk__9596_9684 = G__9700;
count__9597_9685 = G__9701;
i__9598_9686 = G__9702;
continue;
} else {
var map__9601_9703 = cljs.core.first.call(null,seq__9595_9697__$1);
var map__9601_9704__$1 = ((((!((map__9601_9703 == null)))?((((map__9601_9703.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9601_9703.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9601_9703):map__9601_9703);
var gline_9705 = cljs.core.get.call(null,map__9601_9704__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9706 = cljs.core.get.call(null,map__9601_9704__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9707 = cljs.core.get.call(null,map__9601_9704__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9705], null),cljs.core.fnil.call(null,((function (seq__9595_9683,chunk__9596_9684,count__9597_9685,i__9598_9686,seq__9581_9633,chunk__9582_9634,count__9583_9635,i__9584_9636,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9601_9703,map__9601_9704__$1,gline_9705,gcol_9706,name_9707,seq__9595_9697__$1,temp__4657__auto___9696__$1,vec__9594_9680,column_9681,column_info_9682,seq__9581_9674__$1,temp__4657__auto___9673,vec__9580_9630,line_9631,columns_9632,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9681], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9631,new cljs.core.Keyword(null,"col","col",-1959363084),column_9681,new cljs.core.Keyword(null,"name","name",1843675177),name_9707], null));
});})(seq__9595_9683,chunk__9596_9684,count__9597_9685,i__9598_9686,seq__9581_9633,chunk__9582_9634,count__9583_9635,i__9584_9636,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9601_9703,map__9601_9704__$1,gline_9705,gcol_9706,name_9707,seq__9595_9697__$1,temp__4657__auto___9696__$1,vec__9594_9680,column_9681,column_info_9682,seq__9581_9674__$1,temp__4657__auto___9673,vec__9580_9630,line_9631,columns_9632,inverted))
,cljs.core.sorted_map.call(null)));

var G__9708 = cljs.core.next.call(null,seq__9595_9697__$1);
var G__9709 = null;
var G__9710 = (0);
var G__9711 = (0);
seq__9595_9683 = G__9708;
chunk__9596_9684 = G__9709;
count__9597_9685 = G__9710;
i__9598_9686 = G__9711;
continue;
}
} else {
}
}
break;
}

var G__9712 = cljs.core.next.call(null,seq__9581_9674__$1);
var G__9713 = null;
var G__9714 = (0);
var G__9715 = (0);
seq__9581_9633 = G__9712;
chunk__9582_9634 = G__9713;
count__9583_9635 = G__9714;
i__9584_9636 = G__9715;
continue;
}
} else {
}
}
break;
}

var G__9716 = seq__9576_9626;
var G__9717 = chunk__9577_9627;
var G__9718 = count__9578_9628;
var G__9719 = (i__9579_9629 + (1));
seq__9576_9626 = G__9716;
chunk__9577_9627 = G__9717;
count__9578_9628 = G__9718;
i__9579_9629 = G__9719;
continue;
} else {
var temp__4657__auto___9720 = cljs.core.seq.call(null,seq__9576_9626);
if(temp__4657__auto___9720){
var seq__9576_9721__$1 = temp__4657__auto___9720;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9576_9721__$1)){
var c__7500__auto___9722 = cljs.core.chunk_first.call(null,seq__9576_9721__$1);
var G__9723 = cljs.core.chunk_rest.call(null,seq__9576_9721__$1);
var G__9724 = c__7500__auto___9722;
var G__9725 = cljs.core.count.call(null,c__7500__auto___9722);
var G__9726 = (0);
seq__9576_9626 = G__9723;
chunk__9577_9627 = G__9724;
count__9578_9628 = G__9725;
i__9579_9629 = G__9726;
continue;
} else {
var vec__9603_9727 = cljs.core.first.call(null,seq__9576_9721__$1);
var line_9728 = cljs.core.nth.call(null,vec__9603_9727,(0),null);
var columns_9729 = cljs.core.nth.call(null,vec__9603_9727,(1),null);
var seq__9604_9730 = cljs.core.seq.call(null,columns_9729);
var chunk__9605_9731 = null;
var count__9606_9732 = (0);
var i__9607_9733 = (0);
while(true){
if((i__9607_9733 < count__9606_9732)){
var vec__9608_9734 = cljs.core._nth.call(null,chunk__9605_9731,i__9607_9733);
var column_9735 = cljs.core.nth.call(null,vec__9608_9734,(0),null);
var column_info_9736 = cljs.core.nth.call(null,vec__9608_9734,(1),null);
var seq__9609_9737 = cljs.core.seq.call(null,column_info_9736);
var chunk__9610_9738 = null;
var count__9611_9739 = (0);
var i__9612_9740 = (0);
while(true){
if((i__9612_9740 < count__9611_9739)){
var map__9613_9741 = cljs.core._nth.call(null,chunk__9610_9738,i__9612_9740);
var map__9613_9742__$1 = ((((!((map__9613_9741 == null)))?((((map__9613_9741.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9613_9741.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9613_9741):map__9613_9741);
var gline_9743 = cljs.core.get.call(null,map__9613_9742__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9744 = cljs.core.get.call(null,map__9613_9742__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9745 = cljs.core.get.call(null,map__9613_9742__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9743], null),cljs.core.fnil.call(null,((function (seq__9609_9737,chunk__9610_9738,count__9611_9739,i__9612_9740,seq__9604_9730,chunk__9605_9731,count__9606_9732,i__9607_9733,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9613_9741,map__9613_9742__$1,gline_9743,gcol_9744,name_9745,vec__9608_9734,column_9735,column_info_9736,vec__9603_9727,line_9728,columns_9729,seq__9576_9721__$1,temp__4657__auto___9720,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9735], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9728,new cljs.core.Keyword(null,"col","col",-1959363084),column_9735,new cljs.core.Keyword(null,"name","name",1843675177),name_9745], null));
});})(seq__9609_9737,chunk__9610_9738,count__9611_9739,i__9612_9740,seq__9604_9730,chunk__9605_9731,count__9606_9732,i__9607_9733,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9613_9741,map__9613_9742__$1,gline_9743,gcol_9744,name_9745,vec__9608_9734,column_9735,column_info_9736,vec__9603_9727,line_9728,columns_9729,seq__9576_9721__$1,temp__4657__auto___9720,inverted))
,cljs.core.sorted_map.call(null)));

var G__9746 = seq__9609_9737;
var G__9747 = chunk__9610_9738;
var G__9748 = count__9611_9739;
var G__9749 = (i__9612_9740 + (1));
seq__9609_9737 = G__9746;
chunk__9610_9738 = G__9747;
count__9611_9739 = G__9748;
i__9612_9740 = G__9749;
continue;
} else {
var temp__4657__auto___9750__$1 = cljs.core.seq.call(null,seq__9609_9737);
if(temp__4657__auto___9750__$1){
var seq__9609_9751__$1 = temp__4657__auto___9750__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9609_9751__$1)){
var c__7500__auto___9752 = cljs.core.chunk_first.call(null,seq__9609_9751__$1);
var G__9753 = cljs.core.chunk_rest.call(null,seq__9609_9751__$1);
var G__9754 = c__7500__auto___9752;
var G__9755 = cljs.core.count.call(null,c__7500__auto___9752);
var G__9756 = (0);
seq__9609_9737 = G__9753;
chunk__9610_9738 = G__9754;
count__9611_9739 = G__9755;
i__9612_9740 = G__9756;
continue;
} else {
var map__9615_9757 = cljs.core.first.call(null,seq__9609_9751__$1);
var map__9615_9758__$1 = ((((!((map__9615_9757 == null)))?((((map__9615_9757.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9615_9757.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9615_9757):map__9615_9757);
var gline_9759 = cljs.core.get.call(null,map__9615_9758__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9760 = cljs.core.get.call(null,map__9615_9758__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9761 = cljs.core.get.call(null,map__9615_9758__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9759], null),cljs.core.fnil.call(null,((function (seq__9609_9737,chunk__9610_9738,count__9611_9739,i__9612_9740,seq__9604_9730,chunk__9605_9731,count__9606_9732,i__9607_9733,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9615_9757,map__9615_9758__$1,gline_9759,gcol_9760,name_9761,seq__9609_9751__$1,temp__4657__auto___9750__$1,vec__9608_9734,column_9735,column_info_9736,vec__9603_9727,line_9728,columns_9729,seq__9576_9721__$1,temp__4657__auto___9720,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9735], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9728,new cljs.core.Keyword(null,"col","col",-1959363084),column_9735,new cljs.core.Keyword(null,"name","name",1843675177),name_9761], null));
});})(seq__9609_9737,chunk__9610_9738,count__9611_9739,i__9612_9740,seq__9604_9730,chunk__9605_9731,count__9606_9732,i__9607_9733,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9615_9757,map__9615_9758__$1,gline_9759,gcol_9760,name_9761,seq__9609_9751__$1,temp__4657__auto___9750__$1,vec__9608_9734,column_9735,column_info_9736,vec__9603_9727,line_9728,columns_9729,seq__9576_9721__$1,temp__4657__auto___9720,inverted))
,cljs.core.sorted_map.call(null)));

var G__9762 = cljs.core.next.call(null,seq__9609_9751__$1);
var G__9763 = null;
var G__9764 = (0);
var G__9765 = (0);
seq__9609_9737 = G__9762;
chunk__9610_9738 = G__9763;
count__9611_9739 = G__9764;
i__9612_9740 = G__9765;
continue;
}
} else {
}
}
break;
}

var G__9766 = seq__9604_9730;
var G__9767 = chunk__9605_9731;
var G__9768 = count__9606_9732;
var G__9769 = (i__9607_9733 + (1));
seq__9604_9730 = G__9766;
chunk__9605_9731 = G__9767;
count__9606_9732 = G__9768;
i__9607_9733 = G__9769;
continue;
} else {
var temp__4657__auto___9770__$1 = cljs.core.seq.call(null,seq__9604_9730);
if(temp__4657__auto___9770__$1){
var seq__9604_9771__$1 = temp__4657__auto___9770__$1;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9604_9771__$1)){
var c__7500__auto___9772 = cljs.core.chunk_first.call(null,seq__9604_9771__$1);
var G__9773 = cljs.core.chunk_rest.call(null,seq__9604_9771__$1);
var G__9774 = c__7500__auto___9772;
var G__9775 = cljs.core.count.call(null,c__7500__auto___9772);
var G__9776 = (0);
seq__9604_9730 = G__9773;
chunk__9605_9731 = G__9774;
count__9606_9732 = G__9775;
i__9607_9733 = G__9776;
continue;
} else {
var vec__9617_9777 = cljs.core.first.call(null,seq__9604_9771__$1);
var column_9778 = cljs.core.nth.call(null,vec__9617_9777,(0),null);
var column_info_9779 = cljs.core.nth.call(null,vec__9617_9777,(1),null);
var seq__9618_9780 = cljs.core.seq.call(null,column_info_9779);
var chunk__9619_9781 = null;
var count__9620_9782 = (0);
var i__9621_9783 = (0);
while(true){
if((i__9621_9783 < count__9620_9782)){
var map__9622_9784 = cljs.core._nth.call(null,chunk__9619_9781,i__9621_9783);
var map__9622_9785__$1 = ((((!((map__9622_9784 == null)))?((((map__9622_9784.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9622_9784.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9622_9784):map__9622_9784);
var gline_9786 = cljs.core.get.call(null,map__9622_9785__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9787 = cljs.core.get.call(null,map__9622_9785__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9788 = cljs.core.get.call(null,map__9622_9785__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9786], null),cljs.core.fnil.call(null,((function (seq__9618_9780,chunk__9619_9781,count__9620_9782,i__9621_9783,seq__9604_9730,chunk__9605_9731,count__9606_9732,i__9607_9733,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9622_9784,map__9622_9785__$1,gline_9786,gcol_9787,name_9788,vec__9617_9777,column_9778,column_info_9779,seq__9604_9771__$1,temp__4657__auto___9770__$1,vec__9603_9727,line_9728,columns_9729,seq__9576_9721__$1,temp__4657__auto___9720,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9778], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9728,new cljs.core.Keyword(null,"col","col",-1959363084),column_9778,new cljs.core.Keyword(null,"name","name",1843675177),name_9788], null));
});})(seq__9618_9780,chunk__9619_9781,count__9620_9782,i__9621_9783,seq__9604_9730,chunk__9605_9731,count__9606_9732,i__9607_9733,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9622_9784,map__9622_9785__$1,gline_9786,gcol_9787,name_9788,vec__9617_9777,column_9778,column_info_9779,seq__9604_9771__$1,temp__4657__auto___9770__$1,vec__9603_9727,line_9728,columns_9729,seq__9576_9721__$1,temp__4657__auto___9720,inverted))
,cljs.core.sorted_map.call(null)));

var G__9789 = seq__9618_9780;
var G__9790 = chunk__9619_9781;
var G__9791 = count__9620_9782;
var G__9792 = (i__9621_9783 + (1));
seq__9618_9780 = G__9789;
chunk__9619_9781 = G__9790;
count__9620_9782 = G__9791;
i__9621_9783 = G__9792;
continue;
} else {
var temp__4657__auto___9793__$2 = cljs.core.seq.call(null,seq__9618_9780);
if(temp__4657__auto___9793__$2){
var seq__9618_9794__$1 = temp__4657__auto___9793__$2;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__9618_9794__$1)){
var c__7500__auto___9795 = cljs.core.chunk_first.call(null,seq__9618_9794__$1);
var G__9796 = cljs.core.chunk_rest.call(null,seq__9618_9794__$1);
var G__9797 = c__7500__auto___9795;
var G__9798 = cljs.core.count.call(null,c__7500__auto___9795);
var G__9799 = (0);
seq__9618_9780 = G__9796;
chunk__9619_9781 = G__9797;
count__9620_9782 = G__9798;
i__9621_9783 = G__9799;
continue;
} else {
var map__9624_9800 = cljs.core.first.call(null,seq__9618_9794__$1);
var map__9624_9801__$1 = ((((!((map__9624_9800 == null)))?((((map__9624_9800.cljs$lang$protocol_mask$partition0$ & (64))) || (map__9624_9800.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__9624_9800):map__9624_9800);
var gline_9802 = cljs.core.get.call(null,map__9624_9801__$1,new cljs.core.Keyword(null,"gline","gline",-1086242431));
var gcol_9803 = cljs.core.get.call(null,map__9624_9801__$1,new cljs.core.Keyword(null,"gcol","gcol",309250807));
var name_9804 = cljs.core.get.call(null,map__9624_9801__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.swap_BANG_.call(null,inverted,cljs.core.update_in,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [gline_9802], null),cljs.core.fnil.call(null,((function (seq__9618_9780,chunk__9619_9781,count__9620_9782,i__9621_9783,seq__9604_9730,chunk__9605_9731,count__9606_9732,i__9607_9733,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9624_9800,map__9624_9801__$1,gline_9802,gcol_9803,name_9804,seq__9618_9794__$1,temp__4657__auto___9793__$2,vec__9617_9777,column_9778,column_info_9779,seq__9604_9771__$1,temp__4657__auto___9770__$1,vec__9603_9727,line_9728,columns_9729,seq__9576_9721__$1,temp__4657__auto___9720,inverted){
return (function (columns__$1){
return cljs.core.update_in.call(null,columns__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [column_9778], null),cljs.core.fnil.call(null,cljs.core.conj,cljs.core.PersistentVector.EMPTY),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"line","line",212345235),line_9728,new cljs.core.Keyword(null,"col","col",-1959363084),column_9778,new cljs.core.Keyword(null,"name","name",1843675177),name_9804], null));
});})(seq__9618_9780,chunk__9619_9781,count__9620_9782,i__9621_9783,seq__9604_9730,chunk__9605_9731,count__9606_9732,i__9607_9733,seq__9576_9626,chunk__9577_9627,count__9578_9628,i__9579_9629,map__9624_9800,map__9624_9801__$1,gline_9802,gcol_9803,name_9804,seq__9618_9794__$1,temp__4657__auto___9793__$2,vec__9617_9777,column_9778,column_info_9779,seq__9604_9771__$1,temp__4657__auto___9770__$1,vec__9603_9727,line_9728,columns_9729,seq__9576_9721__$1,temp__4657__auto___9720,inverted))
,cljs.core.sorted_map.call(null)));

var G__9805 = cljs.core.next.call(null,seq__9618_9794__$1);
var G__9806 = null;
var G__9807 = (0);
var G__9808 = (0);
seq__9618_9780 = G__9805;
chunk__9619_9781 = G__9806;
count__9620_9782 = G__9807;
i__9621_9783 = G__9808;
continue;
}
} else {
}
}
break;
}

var G__9809 = cljs.core.next.call(null,seq__9604_9771__$1);
var G__9810 = null;
var G__9811 = (0);
var G__9812 = (0);
seq__9604_9730 = G__9809;
chunk__9605_9731 = G__9810;
count__9606_9732 = G__9811;
i__9607_9733 = G__9812;
continue;
}
} else {
}
}
break;
}

var G__9813 = cljs.core.next.call(null,seq__9576_9721__$1);
var G__9814 = null;
var G__9815 = (0);
var G__9816 = (0);
seq__9576_9626 = G__9813;
chunk__9577_9627 = G__9814;
count__9578_9628 = G__9815;
i__9579_9629 = G__9816;
continue;
}
} else {
}
}
break;
}

return cljs.core.deref.call(null,inverted);
});

//# sourceMappingURL=source_map.js.map