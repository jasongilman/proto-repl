// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cljs.repl');
goog.require('cljs.core');
cljs.repl.print_doc = (function cljs$repl$print_doc(m){
cljs.core.println.call(null,"-------------------------");

cljs.core.println.call(null,[cljs.core.str((function (){var temp__4657__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__4657__auto__)){
var ns = temp__4657__auto__;
return [cljs.core.str(ns),cljs.core.str("/")].join('');
} else {
return null;
}
})()),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Protocol");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__13333_13347 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__13334_13348 = null;
var count__13335_13349 = (0);
var i__13336_13350 = (0);
while(true){
if((i__13336_13350 < count__13335_13349)){
var f_13351 = cljs.core._nth.call(null,chunk__13334_13348,i__13336_13350);
cljs.core.println.call(null,"  ",f_13351);

var G__13352 = seq__13333_13347;
var G__13353 = chunk__13334_13348;
var G__13354 = count__13335_13349;
var G__13355 = (i__13336_13350 + (1));
seq__13333_13347 = G__13352;
chunk__13334_13348 = G__13353;
count__13335_13349 = G__13354;
i__13336_13350 = G__13355;
continue;
} else {
var temp__4657__auto___13356 = cljs.core.seq.call(null,seq__13333_13347);
if(temp__4657__auto___13356){
var seq__13333_13357__$1 = temp__4657__auto___13356;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13333_13357__$1)){
var c__7500__auto___13358 = cljs.core.chunk_first.call(null,seq__13333_13357__$1);
var G__13359 = cljs.core.chunk_rest.call(null,seq__13333_13357__$1);
var G__13360 = c__7500__auto___13358;
var G__13361 = cljs.core.count.call(null,c__7500__auto___13358);
var G__13362 = (0);
seq__13333_13347 = G__13359;
chunk__13334_13348 = G__13360;
count__13335_13349 = G__13361;
i__13336_13350 = G__13362;
continue;
} else {
var f_13363 = cljs.core.first.call(null,seq__13333_13357__$1);
cljs.core.println.call(null,"  ",f_13363);

var G__13364 = cljs.core.next.call(null,seq__13333_13357__$1);
var G__13365 = null;
var G__13366 = (0);
var G__13367 = (0);
seq__13333_13347 = G__13364;
chunk__13334_13348 = G__13365;
count__13335_13349 = G__13366;
i__13336_13350 = G__13367;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_13368 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__6697__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__6697__auto__)){
return or__6697__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.call(null,arglists_13368);
} else {
cljs.core.prn.call(null,((cljs.core._EQ_.call(null,new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first.call(null,arglists_13368)))?cljs.core.second.call(null,arglists_13368):arglists_13368));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Special Form");

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.contains_QMARK_.call(null,m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/"),cljs.core.str(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join(''));
} else {
return null;
}
} else {
return cljs.core.println.call(null,[cljs.core.str("\n  Please see http://clojure.org/special_forms#"),cljs.core.str(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join(''));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"Macro");
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.call(null,"REPL Special Function");
} else {
}

cljs.core.println.call(null," ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__13337 = cljs.core.seq.call(null,new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__13338 = null;
var count__13339 = (0);
var i__13340 = (0);
while(true){
if((i__13340 < count__13339)){
var vec__13341 = cljs.core._nth.call(null,chunk__13338,i__13340);
var name = cljs.core.nth.call(null,vec__13341,(0),null);
var map__13342 = cljs.core.nth.call(null,vec__13341,(1),null);
var map__13342__$1 = ((((!((map__13342 == null)))?((((map__13342.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13342.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13342):map__13342);
var doc = cljs.core.get.call(null,map__13342__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__13342__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__13369 = seq__13337;
var G__13370 = chunk__13338;
var G__13371 = count__13339;
var G__13372 = (i__13340 + (1));
seq__13337 = G__13369;
chunk__13338 = G__13370;
count__13339 = G__13371;
i__13340 = G__13372;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__13337);
if(temp__4657__auto__){
var seq__13337__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__13337__$1)){
var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__13337__$1);
var G__13373 = cljs.core.chunk_rest.call(null,seq__13337__$1);
var G__13374 = c__7500__auto__;
var G__13375 = cljs.core.count.call(null,c__7500__auto__);
var G__13376 = (0);
seq__13337 = G__13373;
chunk__13338 = G__13374;
count__13339 = G__13375;
i__13340 = G__13376;
continue;
} else {
var vec__13344 = cljs.core.first.call(null,seq__13337__$1);
var name = cljs.core.nth.call(null,vec__13344,(0),null);
var map__13345 = cljs.core.nth.call(null,vec__13344,(1),null);
var map__13345__$1 = ((((!((map__13345 == null)))?((((map__13345.cljs$lang$protocol_mask$partition0$ & (64))) || (map__13345.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__13345):map__13345);
var doc = cljs.core.get.call(null,map__13345__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists = cljs.core.get.call(null,map__13345__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println.call(null);

cljs.core.println.call(null," ",name);

cljs.core.println.call(null," ",arglists);

if(cljs.core.truth_(doc)){
cljs.core.println.call(null," ",doc);
} else {
}

var G__13377 = cljs.core.next.call(null,seq__13337__$1);
var G__13378 = null;
var G__13379 = (0);
var G__13380 = (0);
seq__13337 = G__13377;
chunk__13338 = G__13378;
count__13339 = G__13379;
i__13340 = G__13380;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
}
});

//# sourceMappingURL=repl.js.map