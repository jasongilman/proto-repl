// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('clojure.core.rrb_vector.protocols');
goog.require('cljs.core');

/**
 * @interface
 */
clojure.core.rrb_vector.protocols.PSpliceableVector = function(){};

clojure.core.rrb_vector.protocols._splicev = (function clojure$core$rrb_vector$protocols$_splicev(v1,v2){
if((!((v1 == null))) && (!((v1.clojure$core$rrb_vector$protocols$PSpliceableVector$_splicev$arity$2 == null)))){
return v1.clojure$core$rrb_vector$protocols$PSpliceableVector$_splicev$arity$2(v1,v2);
} else {
var x__7352__auto__ = (((v1 == null))?null:v1);
var m__7353__auto__ = (clojure.core.rrb_vector.protocols._splicev[goog.typeOf(x__7352__auto__)]);
if(!((m__7353__auto__ == null))){
return m__7353__auto__.call(null,v1,v2);
} else {
var m__7353__auto____$1 = (clojure.core.rrb_vector.protocols._splicev["_"]);
if(!((m__7353__auto____$1 == null))){
return m__7353__auto____$1.call(null,v1,v2);
} else {
throw cljs.core.missing_protocol.call(null,"PSpliceableVector.-splicev",v1);
}
}
}
});


/**
 * @interface
 */
clojure.core.rrb_vector.protocols.PSliceableVector = function(){};

clojure.core.rrb_vector.protocols._slicev = (function clojure$core$rrb_vector$protocols$_slicev(v,start,end){
if((!((v == null))) && (!((v.clojure$core$rrb_vector$protocols$PSliceableVector$_slicev$arity$3 == null)))){
return v.clojure$core$rrb_vector$protocols$PSliceableVector$_slicev$arity$3(v,start,end);
} else {
var x__7352__auto__ = (((v == null))?null:v);
var m__7353__auto__ = (clojure.core.rrb_vector.protocols._slicev[goog.typeOf(x__7352__auto__)]);
if(!((m__7353__auto__ == null))){
return m__7353__auto__.call(null,v,start,end);
} else {
var m__7353__auto____$1 = (clojure.core.rrb_vector.protocols._slicev["_"]);
if(!((m__7353__auto____$1 == null))){
return m__7353__auto____$1.call(null,v,start,end);
} else {
throw cljs.core.missing_protocol.call(null,"PSliceableVector.-slicev",v);
}
}
}
});


//# sourceMappingURL=protocols.js.map