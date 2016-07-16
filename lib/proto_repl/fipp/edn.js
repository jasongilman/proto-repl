// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('fipp.edn');
goog.require('cljs.core');
goog.require('fipp.ednize');
goog.require('fipp.visit');
goog.require('fipp.engine');
fipp.edn.pretty_coll = (function fipp$edn$pretty_coll(p__11544,open,xs,sep,close,f){
var map__11548 = p__11544;
var map__11548__$1 = ((((!((map__11548 == null)))?((((map__11548.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11548.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11548):map__11548);
var printer = map__11548__$1;
var print_level = cljs.core.get.call(null,map__11548__$1,new cljs.core.Keyword(null,"print-level","print-level",-1825423733));
var print_length = cljs.core.get.call(null,map__11548__$1,new cljs.core.Keyword(null,"print-length","print-length",1931866356));
var printer__$1 = (function (){var G__11550 = printer;
if(cljs.core.truth_(print_level)){
return cljs.core.update.call(null,G__11550,new cljs.core.Keyword(null,"print-level","print-level",-1825423733),cljs.core.dec);
} else {
return G__11550;
}
})();
var xform = cljs.core.comp.call(null,(cljs.core.truth_(print_length)?cljs.core.take.call(null,print_length):cljs.core.identity),cljs.core.map.call(null,((function (printer__$1,map__11548,map__11548__$1,printer,print_level,print_length){
return (function (p1__11543_SHARP_){
return f.call(null,printer__$1,p1__11543_SHARP_);
});})(printer__$1,map__11548,map__11548__$1,printer,print_level,print_length))
),cljs.core.interpose.call(null,sep));
var ys = ((((function (){var or__8044__auto__ = print_level;
if(cljs.core.truth_(or__8044__auto__)){
return or__8044__auto__;
} else {
return (1);
}
})() > (0)))?cljs.core.sequence.call(null,xform,xs):"#");
var ellipsis = (cljs.core.truth_((function (){var and__8032__auto__ = print_length;
if(cljs.core.truth_(and__8032__auto__)){
return (print_length <= cljs.core.count.call(null,xs));
} else {
return and__8032__auto__;
}
})())?new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),sep,"..."], null):null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),open,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),ys,ellipsis], null),close], null);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {fipp.visit.IVisitor}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
fipp.edn.EdnPrinter = (function (symbols,print_meta,print_length,print_level,__meta,__extmap,__hash){
this.symbols = symbols;
this.print_meta = print_meta;
this.print_length = print_length;
this.print_level = print_level;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2229667594;
this.cljs$lang$protocol_mask$partition1$ = 8192;
})
fipp.edn.EdnPrinter.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__8658__auto__,k__8659__auto__){
var self__ = this;
var this__8658__auto____$1 = this;
return cljs.core._lookup.call(null,this__8658__auto____$1,k__8659__auto__,null);
});

fipp.edn.EdnPrinter.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__8660__auto__,k11552,else__8661__auto__){
var self__ = this;
var this__8660__auto____$1 = this;
var G__11554 = (((k11552 instanceof cljs.core.Keyword))?k11552.fqn:null);
switch (G__11554) {
case "symbols":
return self__.symbols;

break;
case "print-meta":
return self__.print_meta;

break;
case "print-length":
return self__.print_length;

break;
case "print-level":
return self__.print_level;

break;
default:
return cljs.core.get.call(null,self__.__extmap,k11552,else__8661__auto__);

}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__8672__auto__,writer__8673__auto__,opts__8674__auto__){
var self__ = this;
var this__8672__auto____$1 = this;
var pr_pair__8675__auto__ = ((function (this__8672__auto____$1){
return (function (keyval__8676__auto__){
return cljs.core.pr_sequential_writer.call(null,writer__8673__auto__,cljs.core.pr_writer,""," ","",opts__8674__auto__,keyval__8676__auto__);
});})(this__8672__auto____$1))
;
return cljs.core.pr_sequential_writer.call(null,writer__8673__auto__,pr_pair__8675__auto__,"#fipp.edn.EdnPrinter{",", ","}",opts__8674__auto__,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"symbols","symbols",1211743),self__.symbols],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),self__.print_meta],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-length","print-length",1931866356),self__.print_length],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-level","print-level",-1825423733),self__.print_level],null))], null),self__.__extmap));
});

fipp.edn.EdnPrinter.prototype.cljs$core$IIterable$ = true;

fipp.edn.EdnPrinter.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__11551){
var self__ = this;
var G__11551__$1 = this;
return (new cljs.core.RecordIter((0),G__11551__$1,4,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"symbols","symbols",1211743),new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),new cljs.core.Keyword(null,"print-length","print-length",1931866356),new cljs.core.Keyword(null,"print-level","print-level",-1825423733)], null),cljs.core._iterator.call(null,self__.__extmap)));
});

fipp.edn.EdnPrinter.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__8656__auto__){
var self__ = this;
var this__8656__auto____$1 = this;
return self__.__meta;
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__8652__auto__){
var self__ = this;
var this__8652__auto____$1 = this;
return (new fipp.edn.EdnPrinter(self__.symbols,self__.print_meta,self__.print_length,self__.print_level,self__.__meta,self__.__extmap,self__.__hash));
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__8662__auto__){
var self__ = this;
var this__8662__auto____$1 = this;
return (4 + cljs.core.count.call(null,self__.__extmap));
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$ = true;

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_record$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return fipp.visit.visit.call(null,this$__$1,fipp.ednize.record__GT_tagged.call(null,x));
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_meta$arity$3 = (function (this$,m,x){
var self__ = this;
var this$__$1 = this;
if(cljs.core.truth_(self__.print_meta)){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"align","align",1964212802),new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),"^",fipp.visit.visit.call(null,this$__$1,m)], null),new cljs.core.Keyword(null,"line","line",212345235),fipp.visit.visit_STAR_.call(null,this$__$1,x)], null);
} else {
return fipp.visit.visit_STAR_.call(null,this$__$1,x);
}
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_number$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.pr_str.call(null,x)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_pattern$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.pr_str.call(null,x)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_unknown$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return fipp.visit.visit.call(null,this$__$1,fipp.ednize.edn.call(null,x));
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_symbol$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_seq$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
var temp__4655__auto__ = self__.symbols.call(null,cljs.core.first.call(null,x));
if(cljs.core.truth_(temp__4655__auto__)){
var pretty = temp__4655__auto__;
return pretty.call(null,this$__$1,x);
} else {
return fipp.edn.pretty_coll.call(null,this$__$1,"(",x,new cljs.core.Keyword(null,"line","line",212345235),")",fipp.visit.visit);
}
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_boolean$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_tagged$arity$2 = (function (this$,p__11555){
var self__ = this;
var map__11556 = p__11555;
var map__11556__$1 = ((((!((map__11556 == null)))?((((map__11556.cljs$lang$protocol_mask$partition0$ & (64))) || (map__11556.cljs$core$ISeq$))?true:false):false))?cljs.core.apply.call(null,cljs.core.hash_map,map__11556):map__11556);
var tag = cljs.core.get.call(null,map__11556__$1,new cljs.core.Keyword(null,"tag","tag",-1290361223));
var form = cljs.core.get.call(null,map__11556__$1,new cljs.core.Keyword(null,"form","form",-1624062471));
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"group","group",582596132),"#",cljs.core.pr_str.call(null,tag),(cljs.core.truth_((function (){var or__8044__auto__ = (function (){var and__8032__auto__ = self__.print_meta;
if(cljs.core.truth_(and__8032__auto__)){
return cljs.core.meta.call(null,form);
} else {
return and__8032__auto__;
}
})();
if(cljs.core.truth_(or__8044__auto__)){
return or__8044__auto__;
} else {
return !(cljs.core.coll_QMARK_.call(null,form));
}
})())?" ":null),fipp.visit.visit.call(null,this$__$1,form)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_keyword$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_map$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return fipp.edn.pretty_coll.call(null,this$__$1,"{",x,new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),",",new cljs.core.Keyword(null,"line","line",212345235)], null),"}",((function (this$__$1){
return (function (printer,p__11558){
var vec__11559 = p__11558;
var k = cljs.core.nth.call(null,vec__11559,(0),null);
var v = cljs.core.nth.call(null,vec__11559,(1),null);
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"span","span",1394872991),fipp.visit.visit.call(null,printer,k)," ",fipp.visit.visit.call(null,printer,v)], null);
});})(this$__$1))
);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_nil$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),"nil"], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_character$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.pr_str.call(null,x)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_string$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),cljs.core.pr_str.call(null,x)], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_var$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"text","text",-1790561697),[cljs.core.str(x)].join('')], null);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_set$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return fipp.edn.pretty_coll.call(null,this$__$1,"#{",x,new cljs.core.Keyword(null,"line","line",212345235),"}",fipp.visit.visit);
});

fipp.edn.EdnPrinter.prototype.fipp$visit$IVisitor$visit_vector$arity$2 = (function (this$,x){
var self__ = this;
var this$__$1 = this;
return fipp.edn.pretty_coll.call(null,this$__$1,"[",x,new cljs.core.Keyword(null,"line","line",212345235),"]",fipp.visit.visit);
});

fipp.edn.EdnPrinter.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__8653__auto__){
var self__ = this;
var this__8653__auto____$1 = this;
var h__8479__auto__ = self__.__hash;
if(!((h__8479__auto__ == null))){
return h__8479__auto__;
} else {
var h__8479__auto____$1 = cljs.core.hash_imap.call(null,this__8653__auto____$1);
self__.__hash = h__8479__auto____$1;

return h__8479__auto____$1;
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this__8654__auto__,other__8655__auto__){
var self__ = this;
var this__8654__auto____$1 = this;
if(cljs.core.truth_((function (){var and__8032__auto__ = other__8655__auto__;
if(cljs.core.truth_(and__8032__auto__)){
var and__8032__auto____$1 = (this__8654__auto____$1.constructor === other__8655__auto__.constructor);
if(and__8032__auto____$1){
return cljs.core.equiv_map.call(null,this__8654__auto____$1,other__8655__auto__);
} else {
return and__8032__auto____$1;
}
} else {
return and__8032__auto__;
}
})())){
return true;
} else {
return false;
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__8667__auto__,k__8668__auto__){
var self__ = this;
var this__8667__auto____$1 = this;
if(cljs.core.contains_QMARK_.call(null,new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),null,new cljs.core.Keyword(null,"print-level","print-level",-1825423733),null,new cljs.core.Keyword(null,"print-length","print-length",1931866356),null,new cljs.core.Keyword(null,"symbols","symbols",1211743),null], null), null),k__8668__auto__)){
return cljs.core.dissoc.call(null,cljs.core.with_meta.call(null,cljs.core.into.call(null,cljs.core.PersistentArrayMap.EMPTY,this__8667__auto____$1),self__.__meta),k__8668__auto__);
} else {
return (new fipp.edn.EdnPrinter(self__.symbols,self__.print_meta,self__.print_length,self__.print_level,self__.__meta,cljs.core.not_empty.call(null,cljs.core.dissoc.call(null,self__.__extmap,k__8668__auto__)),null));
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__8665__auto__,k__8666__auto__,G__11551){
var self__ = this;
var this__8665__auto____$1 = this;
var pred__11560 = cljs.core.keyword_identical_QMARK_;
var expr__11561 = k__8666__auto__;
if(cljs.core.truth_(pred__11560.call(null,new cljs.core.Keyword(null,"symbols","symbols",1211743),expr__11561))){
return (new fipp.edn.EdnPrinter(G__11551,self__.print_meta,self__.print_length,self__.print_level,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__11560.call(null,new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),expr__11561))){
return (new fipp.edn.EdnPrinter(self__.symbols,G__11551,self__.print_length,self__.print_level,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__11560.call(null,new cljs.core.Keyword(null,"print-length","print-length",1931866356),expr__11561))){
return (new fipp.edn.EdnPrinter(self__.symbols,self__.print_meta,G__11551,self__.print_level,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_(pred__11560.call(null,new cljs.core.Keyword(null,"print-level","print-level",-1825423733),expr__11561))){
return (new fipp.edn.EdnPrinter(self__.symbols,self__.print_meta,self__.print_length,G__11551,self__.__meta,self__.__extmap,null));
} else {
return (new fipp.edn.EdnPrinter(self__.symbols,self__.print_meta,self__.print_length,self__.print_level,self__.__meta,cljs.core.assoc.call(null,self__.__extmap,k__8666__auto__,G__11551),null));
}
}
}
}
});

fipp.edn.EdnPrinter.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__8670__auto__){
var self__ = this;
var this__8670__auto____$1 = this;
return cljs.core.seq.call(null,cljs.core.concat.call(null,new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"symbols","symbols",1211743),self__.symbols],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),self__.print_meta],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-length","print-length",1931866356),self__.print_length],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"print-level","print-level",-1825423733),self__.print_level],null))], null),self__.__extmap));
});

fipp.edn.EdnPrinter.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__8657__auto__,G__11551){
var self__ = this;
var this__8657__auto____$1 = this;
return (new fipp.edn.EdnPrinter(self__.symbols,self__.print_meta,self__.print_length,self__.print_level,G__11551,self__.__extmap,self__.__hash));
});

fipp.edn.EdnPrinter.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__8663__auto__,entry__8664__auto__){
var self__ = this;
var this__8663__auto____$1 = this;
if(cljs.core.vector_QMARK_.call(null,entry__8664__auto__)){
return cljs.core._assoc.call(null,this__8663__auto____$1,cljs.core._nth.call(null,entry__8664__auto__,(0)),cljs.core._nth.call(null,entry__8664__auto__,(1)));
} else {
return cljs.core.reduce.call(null,cljs.core._conj,this__8663__auto____$1,entry__8664__auto__);
}
});

fipp.edn.EdnPrinter.getBasis = (function (){
return new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"symbols","symbols",1641743270,null),new cljs.core.Symbol(null,"print-meta","print-meta",-1620321171,null),new cljs.core.Symbol(null,"print-length","print-length",-722569413,null),new cljs.core.Symbol(null,"print-level","print-level",-184892206,null)], null);
});

fipp.edn.EdnPrinter.cljs$lang$type = true;

fipp.edn.EdnPrinter.cljs$lang$ctorPrSeq = (function (this__8692__auto__){
return cljs.core._conj.call(null,cljs.core.List.EMPTY,"fipp.edn/EdnPrinter");
});

fipp.edn.EdnPrinter.cljs$lang$ctorPrWriter = (function (this__8692__auto__,writer__8693__auto__){
return cljs.core._write.call(null,writer__8693__auto__,"fipp.edn/EdnPrinter");
});

fipp.edn.__GT_EdnPrinter = (function fipp$edn$__GT_EdnPrinter(symbols,print_meta,print_length,print_level){
return (new fipp.edn.EdnPrinter(symbols,print_meta,print_length,print_level,null,null,null));
});

fipp.edn.map__GT_EdnPrinter = (function fipp$edn$map__GT_EdnPrinter(G__11553){
return (new fipp.edn.EdnPrinter(new cljs.core.Keyword(null,"symbols","symbols",1211743).cljs$core$IFn$_invoke$arity$1(G__11553),new cljs.core.Keyword(null,"print-meta","print-meta",1034114598).cljs$core$IFn$_invoke$arity$1(G__11553),new cljs.core.Keyword(null,"print-length","print-length",1931866356).cljs$core$IFn$_invoke$arity$1(G__11553),new cljs.core.Keyword(null,"print-level","print-level",-1825423733).cljs$core$IFn$_invoke$arity$1(G__11553),null,cljs.core.dissoc.call(null,G__11553,new cljs.core.Keyword(null,"symbols","symbols",1211743),new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),new cljs.core.Keyword(null,"print-length","print-length",1931866356),new cljs.core.Keyword(null,"print-level","print-level",-1825423733)),null));
});

fipp.edn.pprint = (function fipp$edn$pprint(var_args){
var args11564 = [];
var len__9102__auto___11568 = arguments.length;
var i__9103__auto___11569 = (0);
while(true){
if((i__9103__auto___11569 < len__9102__auto___11568)){
args11564.push((arguments[i__9103__auto___11569]));

var G__11570 = (i__9103__auto___11569 + (1));
i__9103__auto___11569 = G__11570;
continue;
} else {
}
break;
}

var G__11566 = args11564.length;
switch (G__11566) {
case 1:
return fipp.edn.pprint.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return fipp.edn.pprint.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11564.length)].join('')));

}
});

fipp.edn.pprint.cljs$core$IFn$_invoke$arity$1 = (function (x){
return fipp.edn.pprint.call(null,x,cljs.core.PersistentArrayMap.EMPTY);
});

fipp.edn.pprint.cljs$core$IFn$_invoke$arity$2 = (function (x,options){
var defaults = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"symbols","symbols",1211743),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"print-length","print-length",1931866356),cljs.core._STAR_print_length_STAR_,new cljs.core.Keyword(null,"print-level","print-level",-1825423733),cljs.core._STAR_print_level_STAR_,new cljs.core.Keyword(null,"print-meta","print-meta",1034114598),cljs.core._STAR_print_meta_STAR_], null);
var printer = fipp.edn.map__GT_EdnPrinter.call(null,cljs.core.merge.call(null,defaults,options));
var _STAR_print_meta_STAR_11567 = cljs.core._STAR_print_meta_STAR_;
cljs.core._STAR_print_meta_STAR_ = false;

try{return fipp.engine.pprint_document.call(null,fipp.visit.visit.call(null,printer,x),options);
}finally {cljs.core._STAR_print_meta_STAR_ = _STAR_print_meta_STAR_11567;
}});

fipp.edn.pprint.cljs$lang$maxFixedArity = 2;

//# sourceMappingURL=edn.js.map