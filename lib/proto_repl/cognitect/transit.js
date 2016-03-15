// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cognitect.transit');
goog.require('cljs.core');
goog.require('com.cognitect.transit');
goog.require('com.cognitect.transit.types');
goog.require('com.cognitect.transit.eq');
goog.require('goog.math.Long');
cljs.core.UUID.prototype.cljs$core$IEquiv$ = true;

cljs.core.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
if((other instanceof cljs.core.UUID)){
return (this$__$1.uuid === other.uuid);
} else {
if((other instanceof com.cognitect.transit.types.UUID)){
return (this$__$1.uuid === other.toString());
} else {
return false;

}
}
});
cljs.core.UUID.prototype.cljs$core$IComparable$ = true;

cljs.core.UUID.prototype.cljs$core$IComparable$_compare$arity$2 = (function (this$,other){
var this$__$1 = this;
if(((other instanceof cljs.core.UUID)) || ((other instanceof com.cognitect.transit.types.UUID))){
return cljs.core.compare.call(null,this$__$1.toString(),other.toString());
} else {
throw (new Error([cljs.core.str("Cannot compare "),cljs.core.str(this$__$1),cljs.core.str(" to "),cljs.core.str(other)].join('')));
}
});

com.cognitect.transit.types.UUID.prototype.cljs$core$IComparable$ = true;

com.cognitect.transit.types.UUID.prototype.cljs$core$IComparable$_compare$arity$2 = (function (this$,other){
var this$__$1 = this;
if(((other instanceof cljs.core.UUID)) || ((other instanceof com.cognitect.transit.types.UUID))){
return cljs.core.compare.call(null,this$__$1.toString(),other.toString());
} else {
throw (new Error([cljs.core.str("Cannot compare "),cljs.core.str(this$__$1),cljs.core.str(" to "),cljs.core.str(other)].join('')));
}
});
goog.math.Long.prototype.cljs$core$IEquiv$ = true;

goog.math.Long.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
return this$__$1.equiv(other);
});

com.cognitect.transit.types.UUID.prototype.cljs$core$IEquiv$ = true;

com.cognitect.transit.types.UUID.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
if((other instanceof cljs.core.UUID)){
return cljs.core._equiv.call(null,other,this$__$1);
} else {
return this$__$1.equiv(other);
}
});

com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IEquiv$ = true;

com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this$,other){
var this$__$1 = this;
return this$__$1.equiv(other);
});
goog.math.Long.prototype.cljs$core$IHash$ = true;

goog.math.Long.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this$__$1 = this;
return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});

com.cognitect.transit.types.UUID.prototype.cljs$core$IHash$ = true;

com.cognitect.transit.types.UUID.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this$__$1 = this;
return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});

com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IHash$ = true;

com.cognitect.transit.types.TaggedValue.prototype.cljs$core$IHash$_hash$arity$1 = (function (this$){
var this$__$1 = this;
return com.cognitect.transit.eq.hashCode.call(null,this$__$1);
});
com.cognitect.transit.types.UUID.prototype.cljs$core$IPrintWithWriter$ = true;

com.cognitect.transit.types.UUID.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (uuid,writer,_){
var uuid__$1 = this;
return cljs.core._write.call(null,writer,[cljs.core.str("#uuid \""),cljs.core.str(uuid__$1.toString()),cljs.core.str("\"")].join(''));
});
cognitect.transit.opts_merge = (function cognitect$transit$opts_merge(a,b){
var seq__11254_11258 = cljs.core.seq.call(null,cljs.core.js_keys.call(null,b));
var chunk__11255_11259 = null;
var count__11256_11260 = (0);
var i__11257_11261 = (0);
while(true){
if((i__11257_11261 < count__11256_11260)){
var k_11262 = cljs.core._nth.call(null,chunk__11255_11259,i__11257_11261);
var v_11263 = (b[k_11262]);
(a[k_11262] = v_11263);

var G__11264 = seq__11254_11258;
var G__11265 = chunk__11255_11259;
var G__11266 = count__11256_11260;
var G__11267 = (i__11257_11261 + (1));
seq__11254_11258 = G__11264;
chunk__11255_11259 = G__11265;
count__11256_11260 = G__11266;
i__11257_11261 = G__11267;
continue;
} else {
var temp__4657__auto___11268 = cljs.core.seq.call(null,seq__11254_11258);
if(temp__4657__auto___11268){
var seq__11254_11269__$1 = temp__4657__auto___11268;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11254_11269__$1)){
var c__7500__auto___11270 = cljs.core.chunk_first.call(null,seq__11254_11269__$1);
var G__11271 = cljs.core.chunk_rest.call(null,seq__11254_11269__$1);
var G__11272 = c__7500__auto___11270;
var G__11273 = cljs.core.count.call(null,c__7500__auto___11270);
var G__11274 = (0);
seq__11254_11258 = G__11271;
chunk__11255_11259 = G__11272;
count__11256_11260 = G__11273;
i__11257_11261 = G__11274;
continue;
} else {
var k_11275 = cljs.core.first.call(null,seq__11254_11269__$1);
var v_11276 = (b[k_11275]);
(a[k_11275] = v_11276);

var G__11277 = cljs.core.next.call(null,seq__11254_11269__$1);
var G__11278 = null;
var G__11279 = (0);
var G__11280 = (0);
seq__11254_11258 = G__11277;
chunk__11255_11259 = G__11278;
count__11256_11260 = G__11279;
i__11257_11261 = G__11280;
continue;
}
} else {
}
}
break;
}

return a;
});

/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.MapBuilder = (function (){
})
cognitect.transit.MapBuilder.prototype.init = (function (node){
var self__ = this;
var _ = this;
return cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
});

cognitect.transit.MapBuilder.prototype.add = (function (m,k,v,node){
var self__ = this;
var _ = this;
return cljs.core.assoc_BANG_.call(null,m,k,v);
});

cognitect.transit.MapBuilder.prototype.finalize = (function (m,node){
var self__ = this;
var _ = this;
return cljs.core.persistent_BANG_.call(null,m);
});

cognitect.transit.MapBuilder.prototype.fromArray = (function (arr,node){
var self__ = this;
var _ = this;
return cljs.core.PersistentArrayMap.fromArray.call(null,arr,true,true);
});

cognitect.transit.MapBuilder.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.MapBuilder.cljs$lang$type = true;

cognitect.transit.MapBuilder.cljs$lang$ctorStr = "cognitect.transit/MapBuilder";

cognitect.transit.MapBuilder.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/MapBuilder");
});

cognitect.transit.__GT_MapBuilder = (function cognitect$transit$__GT_MapBuilder(){
return (new cognitect.transit.MapBuilder());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.VectorBuilder = (function (){
})
cognitect.transit.VectorBuilder.prototype.init = (function (node){
var self__ = this;
var _ = this;
return cljs.core.transient$.call(null,cljs.core.PersistentVector.EMPTY);
});

cognitect.transit.VectorBuilder.prototype.add = (function (v,x,node){
var self__ = this;
var _ = this;
return cljs.core.conj_BANG_.call(null,v,x);
});

cognitect.transit.VectorBuilder.prototype.finalize = (function (v,node){
var self__ = this;
var _ = this;
return cljs.core.persistent_BANG_.call(null,v);
});

cognitect.transit.VectorBuilder.prototype.fromArray = (function (arr,node){
var self__ = this;
var _ = this;
return cljs.core.PersistentVector.fromArray.call(null,arr,true);
});

cognitect.transit.VectorBuilder.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.VectorBuilder.cljs$lang$type = true;

cognitect.transit.VectorBuilder.cljs$lang$ctorStr = "cognitect.transit/VectorBuilder";

cognitect.transit.VectorBuilder.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/VectorBuilder");
});

cognitect.transit.__GT_VectorBuilder = (function cognitect$transit$__GT_VectorBuilder(){
return (new cognitect.transit.VectorBuilder());
});

/**
 * Return a transit reader. type may be either :json or :json-verbose.
 * opts may be a map optionally containing a :handlers entry. The value
 * of :handlers should be map from tag to a decoder function which returns
 * then in-memory representation of the semantic transit value.
 */
cognitect.transit.reader = (function cognitect$transit$reader(var_args){
var args11281 = [];
var len__7755__auto___11284 = arguments.length;
var i__7756__auto___11285 = (0);
while(true){
if((i__7756__auto___11285 < len__7755__auto___11284)){
args11281.push((arguments[i__7756__auto___11285]));

var G__11286 = (i__7756__auto___11285 + (1));
i__7756__auto___11285 = G__11286;
continue;
} else {
}
break;
}

var G__11283 = args11281.length;
switch (G__11283) {
case 1:
return cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cognitect.transit.reader.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11281.length)].join('')));

}
});

cognitect.transit.reader.cljs$core$IFn$_invoke$arity$1 = (function (type){
return cognitect.transit.reader.call(null,type,null);
});

cognitect.transit.reader.cljs$core$IFn$_invoke$arity$2 = (function (type,opts){
return com.cognitect.transit.reader.call(null,cljs.core.name.call(null,type),cognitect.transit.opts_merge.call(null,{"handlers": cljs.core.clj__GT_js.call(null,cljs.core.merge.call(null,new cljs.core.PersistentArrayMap(null, 5, ["$",(function (v){
return cljs.core.symbol.call(null,v);
}),":",(function (v){
return cljs.core.keyword.call(null,v);
}),"set",(function (v){
return cljs.core.into.call(null,cljs.core.PersistentHashSet.EMPTY,v);
}),"list",(function (v){
return cljs.core.into.call(null,cljs.core.List.EMPTY,v.reverse());
}),"cmap",(function (v){
var i = (0);
var ret = cljs.core.transient$.call(null,cljs.core.PersistentArrayMap.EMPTY);
while(true){
if((i < v.length)){
var G__11288 = (i + (2));
var G__11289 = cljs.core.assoc_BANG_.call(null,ret,(v[i]),(v[(i + (1))]));
i = G__11288;
ret = G__11289;
continue;
} else {
return cljs.core.persistent_BANG_.call(null,ret);
}
break;
}
})], null),new cljs.core.Keyword(null,"handlers","handlers",79528781).cljs$core$IFn$_invoke$arity$1(opts))), "mapBuilder": (new cognitect.transit.MapBuilder()), "arrayBuilder": (new cognitect.transit.VectorBuilder()), "prefersStrings": false},cljs.core.clj__GT_js.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"handlers","handlers",79528781)))));
});

cognitect.transit.reader.cljs$lang$maxFixedArity = 2;
/**
 * Read a transit encoded string into ClojureScript values given a 
 * transit reader.
 */
cognitect.transit.read = (function cognitect$transit$read(r,str){
return r.read(str);
});

/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.KeywordHandler = (function (){
})
cognitect.transit.KeywordHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return ":";
});

cognitect.transit.KeywordHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
return v.fqn;
});

cognitect.transit.KeywordHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return v.fqn;
});

cognitect.transit.KeywordHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.KeywordHandler.cljs$lang$type = true;

cognitect.transit.KeywordHandler.cljs$lang$ctorStr = "cognitect.transit/KeywordHandler";

cognitect.transit.KeywordHandler.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/KeywordHandler");
});

cognitect.transit.__GT_KeywordHandler = (function cognitect$transit$__GT_KeywordHandler(){
return (new cognitect.transit.KeywordHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.SymbolHandler = (function (){
})
cognitect.transit.SymbolHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "$";
});

cognitect.transit.SymbolHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
return v.str;
});

cognitect.transit.SymbolHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return v.str;
});

cognitect.transit.SymbolHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.SymbolHandler.cljs$lang$type = true;

cognitect.transit.SymbolHandler.cljs$lang$ctorStr = "cognitect.transit/SymbolHandler";

cognitect.transit.SymbolHandler.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/SymbolHandler");
});

cognitect.transit.__GT_SymbolHandler = (function cognitect$transit$__GT_SymbolHandler(){
return (new cognitect.transit.SymbolHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.ListHandler = (function (){
})
cognitect.transit.ListHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "list";
});

cognitect.transit.ListHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
var ret = [];
var seq__11290_11294 = cljs.core.seq.call(null,v);
var chunk__11291_11295 = null;
var count__11292_11296 = (0);
var i__11293_11297 = (0);
while(true){
if((i__11293_11297 < count__11292_11296)){
var x_11298 = cljs.core._nth.call(null,chunk__11291_11295,i__11293_11297);
ret.push(x_11298);

var G__11299 = seq__11290_11294;
var G__11300 = chunk__11291_11295;
var G__11301 = count__11292_11296;
var G__11302 = (i__11293_11297 + (1));
seq__11290_11294 = G__11299;
chunk__11291_11295 = G__11300;
count__11292_11296 = G__11301;
i__11293_11297 = G__11302;
continue;
} else {
var temp__4657__auto___11303 = cljs.core.seq.call(null,seq__11290_11294);
if(temp__4657__auto___11303){
var seq__11290_11304__$1 = temp__4657__auto___11303;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11290_11304__$1)){
var c__7500__auto___11305 = cljs.core.chunk_first.call(null,seq__11290_11304__$1);
var G__11306 = cljs.core.chunk_rest.call(null,seq__11290_11304__$1);
var G__11307 = c__7500__auto___11305;
var G__11308 = cljs.core.count.call(null,c__7500__auto___11305);
var G__11309 = (0);
seq__11290_11294 = G__11306;
chunk__11291_11295 = G__11307;
count__11292_11296 = G__11308;
i__11293_11297 = G__11309;
continue;
} else {
var x_11310 = cljs.core.first.call(null,seq__11290_11304__$1);
ret.push(x_11310);

var G__11311 = cljs.core.next.call(null,seq__11290_11304__$1);
var G__11312 = null;
var G__11313 = (0);
var G__11314 = (0);
seq__11290_11294 = G__11311;
chunk__11291_11295 = G__11312;
count__11292_11296 = G__11313;
i__11293_11297 = G__11314;
continue;
}
} else {
}
}
break;
}

return com.cognitect.transit.tagged.call(null,"array",ret);
});

cognitect.transit.ListHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return null;
});

cognitect.transit.ListHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.ListHandler.cljs$lang$type = true;

cognitect.transit.ListHandler.cljs$lang$ctorStr = "cognitect.transit/ListHandler";

cognitect.transit.ListHandler.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/ListHandler");
});

cognitect.transit.__GT_ListHandler = (function cognitect$transit$__GT_ListHandler(){
return (new cognitect.transit.ListHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.MapHandler = (function (){
})
cognitect.transit.MapHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "map";
});

cognitect.transit.MapHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
return v;
});

cognitect.transit.MapHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return null;
});

cognitect.transit.MapHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.MapHandler.cljs$lang$type = true;

cognitect.transit.MapHandler.cljs$lang$ctorStr = "cognitect.transit/MapHandler";

cognitect.transit.MapHandler.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/MapHandler");
});

cognitect.transit.__GT_MapHandler = (function cognitect$transit$__GT_MapHandler(){
return (new cognitect.transit.MapHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.SetHandler = (function (){
})
cognitect.transit.SetHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "set";
});

cognitect.transit.SetHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
var ret = [];
var seq__11315_11319 = cljs.core.seq.call(null,v);
var chunk__11316_11320 = null;
var count__11317_11321 = (0);
var i__11318_11322 = (0);
while(true){
if((i__11318_11322 < count__11317_11321)){
var x_11323 = cljs.core._nth.call(null,chunk__11316_11320,i__11318_11322);
ret.push(x_11323);

var G__11324 = seq__11315_11319;
var G__11325 = chunk__11316_11320;
var G__11326 = count__11317_11321;
var G__11327 = (i__11318_11322 + (1));
seq__11315_11319 = G__11324;
chunk__11316_11320 = G__11325;
count__11317_11321 = G__11326;
i__11318_11322 = G__11327;
continue;
} else {
var temp__4657__auto___11328 = cljs.core.seq.call(null,seq__11315_11319);
if(temp__4657__auto___11328){
var seq__11315_11329__$1 = temp__4657__auto___11328;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11315_11329__$1)){
var c__7500__auto___11330 = cljs.core.chunk_first.call(null,seq__11315_11329__$1);
var G__11331 = cljs.core.chunk_rest.call(null,seq__11315_11329__$1);
var G__11332 = c__7500__auto___11330;
var G__11333 = cljs.core.count.call(null,c__7500__auto___11330);
var G__11334 = (0);
seq__11315_11319 = G__11331;
chunk__11316_11320 = G__11332;
count__11317_11321 = G__11333;
i__11318_11322 = G__11334;
continue;
} else {
var x_11335 = cljs.core.first.call(null,seq__11315_11329__$1);
ret.push(x_11335);

var G__11336 = cljs.core.next.call(null,seq__11315_11329__$1);
var G__11337 = null;
var G__11338 = (0);
var G__11339 = (0);
seq__11315_11319 = G__11336;
chunk__11316_11320 = G__11337;
count__11317_11321 = G__11338;
i__11318_11322 = G__11339;
continue;
}
} else {
}
}
break;
}

return com.cognitect.transit.tagged.call(null,"array",ret);
});

cognitect.transit.SetHandler.prototype.stringRep = (function (){
var self__ = this;
var v = this;
return null;
});

cognitect.transit.SetHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.SetHandler.cljs$lang$type = true;

cognitect.transit.SetHandler.cljs$lang$ctorStr = "cognitect.transit/SetHandler";

cognitect.transit.SetHandler.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/SetHandler");
});

cognitect.transit.__GT_SetHandler = (function cognitect$transit$__GT_SetHandler(){
return (new cognitect.transit.SetHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.VectorHandler = (function (){
})
cognitect.transit.VectorHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "array";
});

cognitect.transit.VectorHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
var ret = [];
var seq__11340_11344 = cljs.core.seq.call(null,v);
var chunk__11341_11345 = null;
var count__11342_11346 = (0);
var i__11343_11347 = (0);
while(true){
if((i__11343_11347 < count__11342_11346)){
var x_11348 = cljs.core._nth.call(null,chunk__11341_11345,i__11343_11347);
ret.push(x_11348);

var G__11349 = seq__11340_11344;
var G__11350 = chunk__11341_11345;
var G__11351 = count__11342_11346;
var G__11352 = (i__11343_11347 + (1));
seq__11340_11344 = G__11349;
chunk__11341_11345 = G__11350;
count__11342_11346 = G__11351;
i__11343_11347 = G__11352;
continue;
} else {
var temp__4657__auto___11353 = cljs.core.seq.call(null,seq__11340_11344);
if(temp__4657__auto___11353){
var seq__11340_11354__$1 = temp__4657__auto___11353;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11340_11354__$1)){
var c__7500__auto___11355 = cljs.core.chunk_first.call(null,seq__11340_11354__$1);
var G__11356 = cljs.core.chunk_rest.call(null,seq__11340_11354__$1);
var G__11357 = c__7500__auto___11355;
var G__11358 = cljs.core.count.call(null,c__7500__auto___11355);
var G__11359 = (0);
seq__11340_11344 = G__11356;
chunk__11341_11345 = G__11357;
count__11342_11346 = G__11358;
i__11343_11347 = G__11359;
continue;
} else {
var x_11360 = cljs.core.first.call(null,seq__11340_11354__$1);
ret.push(x_11360);

var G__11361 = cljs.core.next.call(null,seq__11340_11354__$1);
var G__11362 = null;
var G__11363 = (0);
var G__11364 = (0);
seq__11340_11344 = G__11361;
chunk__11341_11345 = G__11362;
count__11342_11346 = G__11363;
i__11343_11347 = G__11364;
continue;
}
} else {
}
}
break;
}

return ret;
});

cognitect.transit.VectorHandler.prototype.stringRep = (function (v){
var self__ = this;
var _ = this;
return null;
});

cognitect.transit.VectorHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.VectorHandler.cljs$lang$type = true;

cognitect.transit.VectorHandler.cljs$lang$ctorStr = "cognitect.transit/VectorHandler";

cognitect.transit.VectorHandler.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/VectorHandler");
});

cognitect.transit.__GT_VectorHandler = (function cognitect$transit$__GT_VectorHandler(){
return (new cognitect.transit.VectorHandler());
});


/**
* @constructor
 * @implements {cognitect.transit.Object}
*/
cognitect.transit.UUIDHandler = (function (){
})
cognitect.transit.UUIDHandler.prototype.tag = (function (v){
var self__ = this;
var _ = this;
return "u";
});

cognitect.transit.UUIDHandler.prototype.rep = (function (v){
var self__ = this;
var _ = this;
return v.uuid;
});

cognitect.transit.UUIDHandler.prototype.stringRep = (function (v){
var self__ = this;
var this$ = this;
return this$.rep(v);
});

cognitect.transit.UUIDHandler.getBasis = (function (){
return cljs.core.PersistentVector.EMPTY;
});

cognitect.transit.UUIDHandler.cljs$lang$type = true;

cognitect.transit.UUIDHandler.cljs$lang$ctorStr = "cognitect.transit/UUIDHandler";

cognitect.transit.UUIDHandler.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/UUIDHandler");
});

cognitect.transit.__GT_UUIDHandler = (function cognitect$transit$__GT_UUIDHandler(){
return (new cognitect.transit.UUIDHandler());
});

/**
 * Return a transit writer. type maybe either :json or :json-verbose.
 *   opts is a map containing a :handlers entry. :handlers is a map of
 *   type constructors to handler instances.
 */
cognitect.transit.writer = (function cognitect$transit$writer(var_args){
var args11365 = [];
var len__7755__auto___11376 = arguments.length;
var i__7756__auto___11377 = (0);
while(true){
if((i__7756__auto___11377 < len__7755__auto___11376)){
args11365.push((arguments[i__7756__auto___11377]));

var G__11378 = (i__7756__auto___11377 + (1));
i__7756__auto___11377 = G__11378;
continue;
} else {
}
break;
}

var G__11367 = args11365.length;
switch (G__11367) {
case 1:
return cognitect.transit.writer.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cognitect.transit.writer.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11365.length)].join('')));

}
});

cognitect.transit.writer.cljs$core$IFn$_invoke$arity$1 = (function (type){
return cognitect.transit.writer.call(null,type,null);
});

cognitect.transit.writer.cljs$core$IFn$_invoke$arity$2 = (function (type,opts){
var keyword_handler = (new cognitect.transit.KeywordHandler());
var symbol_handler = (new cognitect.transit.SymbolHandler());
var list_handler = (new cognitect.transit.ListHandler());
var map_handler = (new cognitect.transit.MapHandler());
var set_handler = (new cognitect.transit.SetHandler());
var vector_handler = (new cognitect.transit.VectorHandler());
var uuid_handler = (new cognitect.transit.UUIDHandler());
var handlers = cljs.core.merge.call(null,cljs.core.PersistentHashMap.fromArrays([cljs.core.PersistentHashMap,cljs.core.Cons,cljs.core.PersistentArrayMap,cljs.core.NodeSeq,cljs.core.PersistentQueue,cljs.core.IndexedSeq,cljs.core.Keyword,cljs.core.EmptyList,cljs.core.LazySeq,cljs.core.Subvec,cljs.core.PersistentQueueSeq,cljs.core.ArrayNodeSeq,cljs.core.ValSeq,cljs.core.PersistentArrayMapSeq,cljs.core.PersistentVector,cljs.core.List,cljs.core.RSeq,cljs.core.PersistentHashSet,cljs.core.PersistentTreeMap,cljs.core.KeySeq,cljs.core.ChunkedSeq,cljs.core.PersistentTreeSet,cljs.core.ChunkedCons,cljs.core.Symbol,cljs.core.UUID,cljs.core.Range,cljs.core.PersistentTreeMapSeq],[map_handler,list_handler,map_handler,list_handler,list_handler,list_handler,keyword_handler,list_handler,list_handler,vector_handler,list_handler,list_handler,list_handler,list_handler,vector_handler,list_handler,list_handler,set_handler,map_handler,list_handler,list_handler,set_handler,list_handler,symbol_handler,uuid_handler,list_handler,list_handler]),new cljs.core.Keyword(null,"handlers","handlers",79528781).cljs$core$IFn$_invoke$arity$1(opts));
return com.cognitect.transit.writer.call(null,cljs.core.name.call(null,type),cognitect.transit.opts_merge.call(null,{"objectBuilder": ((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (m,kfn,vfn){
return cljs.core.reduce_kv.call(null,((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (obj,k,v){
var G__11368 = obj;
G__11368.push(kfn.call(null,k),vfn.call(null,v));

return G__11368;
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
,["^ "],m);
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
, "handlers": (function (){var x11369 = cljs.core.clone.call(null,handlers);
x11369.forEach = ((function (x11369,keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (f){
var coll = this;
var seq__11370 = cljs.core.seq.call(null,coll);
var chunk__11371 = null;
var count__11372 = (0);
var i__11373 = (0);
while(true){
if((i__11373 < count__11372)){
var vec__11374 = cljs.core._nth.call(null,chunk__11371,i__11373);
var k = cljs.core.nth.call(null,vec__11374,(0),null);
var v = cljs.core.nth.call(null,vec__11374,(1),null);
f.call(null,v,k);

var G__11380 = seq__11370;
var G__11381 = chunk__11371;
var G__11382 = count__11372;
var G__11383 = (i__11373 + (1));
seq__11370 = G__11380;
chunk__11371 = G__11381;
count__11372 = G__11382;
i__11373 = G__11383;
continue;
} else {
var temp__4657__auto__ = cljs.core.seq.call(null,seq__11370);
if(temp__4657__auto__){
var seq__11370__$1 = temp__4657__auto__;
if(cljs.core.chunked_seq_QMARK_.call(null,seq__11370__$1)){
var c__7500__auto__ = cljs.core.chunk_first.call(null,seq__11370__$1);
var G__11384 = cljs.core.chunk_rest.call(null,seq__11370__$1);
var G__11385 = c__7500__auto__;
var G__11386 = cljs.core.count.call(null,c__7500__auto__);
var G__11387 = (0);
seq__11370 = G__11384;
chunk__11371 = G__11385;
count__11372 = G__11386;
i__11373 = G__11387;
continue;
} else {
var vec__11375 = cljs.core.first.call(null,seq__11370__$1);
var k = cljs.core.nth.call(null,vec__11375,(0),null);
var v = cljs.core.nth.call(null,vec__11375,(1),null);
f.call(null,v,k);

var G__11388 = cljs.core.next.call(null,seq__11370__$1);
var G__11389 = null;
var G__11390 = (0);
var G__11391 = (0);
seq__11370 = G__11388;
chunk__11371 = G__11389;
count__11372 = G__11390;
i__11373 = G__11391;
continue;
}
} else {
return null;
}
}
break;
}
});})(x11369,keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
;

return x11369;
})(), "unpack": ((function (keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers){
return (function (x){
if((x instanceof cljs.core.PersistentArrayMap)){
return x.arr;
} else {
return false;
}
});})(keyword_handler,symbol_handler,list_handler,map_handler,set_handler,vector_handler,uuid_handler,handlers))
},cljs.core.clj__GT_js.call(null,cljs.core.dissoc.call(null,opts,new cljs.core.Keyword(null,"handlers","handlers",79528781)))));
});

cognitect.transit.writer.cljs$lang$maxFixedArity = 2;
/**
 * Encode an object into a transit string given a transit writer.
 */
cognitect.transit.write = (function cognitect$transit$write(w,o){
return w.write(o);
});
/**
 * Construct a read handler. Implemented as identity, exists primarily
 * for API compatiblity with transit-clj
 */
cognitect.transit.read_handler = (function cognitect$transit$read_handler(from_rep){
return from_rep;
});
/**
 * Creates a transit write handler whose tag, rep,
 * stringRep, and verboseWriteHandler methods
 * invoke the provided fns.
 */
cognitect.transit.write_handler = (function cognitect$transit$write_handler(var_args){
var args11392 = [];
var len__7755__auto___11398 = arguments.length;
var i__7756__auto___11399 = (0);
while(true){
if((i__7756__auto___11399 < len__7755__auto___11398)){
args11392.push((arguments[i__7756__auto___11399]));

var G__11400 = (i__7756__auto___11399 + (1));
i__7756__auto___11399 = G__11400;
continue;
} else {
}
break;
}

var G__11394 = args11392.length;
switch (G__11394) {
case 2:
return cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args11392.length)].join('')));

}
});

cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$2 = (function (tag_fn,rep_fn){
return cognitect.transit.write_handler.call(null,tag_fn,rep_fn,null,null);
});

cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$3 = (function (tag_fn,rep_fn,str_rep_fn){
return cognitect.transit.write_handler.call(null,tag_fn,rep_fn,str_rep_fn,null);
});

cognitect.transit.write_handler.cljs$core$IFn$_invoke$arity$4 = (function (tag_fn,rep_fn,str_rep_fn,verbose_handler_fn){
if(typeof cognitect.transit.t_cognitect$transit11395 !== 'undefined'){
} else {

/**
* @constructor
 * @implements {cognitect.transit.Object}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cognitect.transit.t_cognitect$transit11395 = (function (tag_fn,rep_fn,str_rep_fn,verbose_handler_fn,meta11396){
this.tag_fn = tag_fn;
this.rep_fn = rep_fn;
this.str_rep_fn = str_rep_fn;
this.verbose_handler_fn = verbose_handler_fn;
this.meta11396 = meta11396;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
})
cognitect.transit.t_cognitect$transit11395.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_11397,meta11396__$1){
var self__ = this;
var _11397__$1 = this;
return (new cognitect.transit.t_cognitect$transit11395(self__.tag_fn,self__.rep_fn,self__.str_rep_fn,self__.verbose_handler_fn,meta11396__$1));
});

cognitect.transit.t_cognitect$transit11395.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_11397){
var self__ = this;
var _11397__$1 = this;
return self__.meta11396;
});

cognitect.transit.t_cognitect$transit11395.prototype.tag = (function (o){
var self__ = this;
var _ = this;
return self__.tag_fn.call(null,o);
});

cognitect.transit.t_cognitect$transit11395.prototype.rep = (function (o){
var self__ = this;
var _ = this;
return self__.rep_fn.call(null,o);
});

cognitect.transit.t_cognitect$transit11395.prototype.stringRep = (function (o){
var self__ = this;
var _ = this;
if(cljs.core.truth_(self__.str_rep_fn)){
return self__.str_rep_fn.call(null,o);
} else {
return null;
}
});

cognitect.transit.t_cognitect$transit11395.prototype.getVerboseHandler = (function (){
var self__ = this;
var _ = this;
if(cljs.core.truth_(self__.verbose_handler_fn)){
return self__.verbose_handler_fn.call(null);
} else {
return null;
}
});

cognitect.transit.t_cognitect$transit11395.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"tag-fn","tag-fn",242055482,null),new cljs.core.Symbol(null,"rep-fn","rep-fn",-1724891035,null),new cljs.core.Symbol(null,"str-rep-fn","str-rep-fn",-1179615016,null),new cljs.core.Symbol(null,"verbose-handler-fn","verbose-handler-fn",547340594,null),new cljs.core.Symbol(null,"meta11396","meta11396",71090240,null)], null);
});

cognitect.transit.t_cognitect$transit11395.cljs$lang$type = true;

cognitect.transit.t_cognitect$transit11395.cljs$lang$ctorStr = "cognitect.transit/t_cognitect$transit11395";

cognitect.transit.t_cognitect$transit11395.cljs$lang$ctorPrWriter = (function (this__7295__auto__,writer__7296__auto__,opt__7297__auto__){
return cljs.core._write.call(null,writer__7296__auto__,"cognitect.transit/t_cognitect$transit11395");
});

cognitect.transit.__GT_t_cognitect$transit11395 = (function cognitect$transit$__GT_t_cognitect$transit11395(tag_fn__$1,rep_fn__$1,str_rep_fn__$1,verbose_handler_fn__$1,meta11396){
return (new cognitect.transit.t_cognitect$transit11395(tag_fn__$1,rep_fn__$1,str_rep_fn__$1,verbose_handler_fn__$1,meta11396));
});

}

return (new cognitect.transit.t_cognitect$transit11395(tag_fn,rep_fn,str_rep_fn,verbose_handler_fn,cljs.core.PersistentArrayMap.EMPTY));
});

cognitect.transit.write_handler.cljs$lang$maxFixedArity = 4;
/**
 * Construct a tagged value. tag must be a string and rep can
 * be any transit encodeable value.
 */
cognitect.transit.tagged_value = (function cognitect$transit$tagged_value(tag,rep){
return com.cognitect.transit.types.taggedValue.call(null,tag,rep);
});
/**
 * Returns true if x is a transit tagged value, false otherwise.
 */
cognitect.transit.tagged_value_QMARK_ = (function cognitect$transit$tagged_value_QMARK_(x){
return com.cognitect.transit.types.isTaggedValue.call(null,x);
});
/**
 * Construct a transit integer value. Returns JavaScript number if
 *   in the 53bit integer range, a goog.math.Long instance if above. s
 *   may be a string or a JavaScript number.
 */
cognitect.transit.integer = (function cognitect$transit$integer(s){
return com.cognitect.transit.types.intValue.call(null,s);
});
/**
 * Returns true if x is an integer value between the 53bit and 64bit
 *   range, false otherwise.
 */
cognitect.transit.integer_QMARK_ = (function cognitect$transit$integer_QMARK_(x){
return com.cognitect.transit.types.isInteger.call(null,x);
});
/**
 * Construct a big integer from a string.
 */
cognitect.transit.bigint = (function cognitect$transit$bigint(s){
return com.cognitect.transit.types.bigInteger.call(null,s);
});
/**
 * Returns true if x is a transit big integer value, false otherwise.
 */
cognitect.transit.bigint_QMARK_ = (function cognitect$transit$bigint_QMARK_(x){
return com.cognitect.transit.types.isBigInteger.call(null,x);
});
/**
 * Construct a big decimal from a string.
 */
cognitect.transit.bigdec = (function cognitect$transit$bigdec(s){
return com.cognitect.transit.types.bigDecimalValue.call(null,s);
});
/**
 * Returns true if x is a transit big decimal value, false otherwise.
 */
cognitect.transit.bigdec_QMARK_ = (function cognitect$transit$bigdec_QMARK_(x){
return com.cognitect.transit.types.isBigDecimal.call(null,x);
});
/**
 * Construct a URI from a string.
 */
cognitect.transit.uri = (function cognitect$transit$uri(s){
return com.cognitect.transit.types.uri.call(null,s);
});
/**
 * Returns true if x is a transit URI value, false otherwise.
 */
cognitect.transit.uri_QMARK_ = (function cognitect$transit$uri_QMARK_(x){
return com.cognitect.transit.types.isURI.call(null,x);
});
/**
 * Construct a UUID from a string.
 */
cognitect.transit.uuid = (function cognitect$transit$uuid(s){
return com.cognitect.transit.types.uuid.call(null,s);
});
/**
 * Returns true if x is a transit UUID value, false otherwise.
 */
cognitect.transit.uuid_QMARK_ = (function cognitect$transit$uuid_QMARK_(x){
return com.cognitect.transit.types.isUUID.call(null,x);
});
/**
 * Construct a transit binary value. s should be base64 encoded
 * string.
 */
cognitect.transit.binary = (function cognitect$transit$binary(s){
return com.cognitect.transit.types.binary.call(null,s);
});
/**
 * Returns true if x is a transit binary value, false otherwise.
 */
cognitect.transit.binary_QMARK_ = (function cognitect$transit$binary_QMARK_(x){
return com.cognitect.transit.types.isBinary.call(null,x);
});
/**
 * Construct a quoted transit value. x should be a transit
 * encodeable value.
 */
cognitect.transit.quoted = (function cognitect$transit$quoted(x){
return com.cognitect.transit.types.quoted.call(null,x);
});
/**
 * Returns true if x is a transit quoted value, false otherwise.
 */
cognitect.transit.quoted_QMARK_ = (function cognitect$transit$quoted_QMARK_(x){
return com.cognitect.transit.types.isQuoted.call(null,x);
});
/**
 * Construct a transit link value. x should be an IMap instance
 * containing at a minimum the following keys: :href, :rel. It
 * may optionall include :name, :render, and :prompt. :href must
 * be a transit URI, all other values are strings, and :render must
 * be either :image or :link.
 */
cognitect.transit.link = (function cognitect$transit$link(x){
return com.cognitect.transit.types.link.call(null,x);
});
/**
 * Returns true if x a transit link value, false if otherwise.
 */
cognitect.transit.link_QMARK_ = (function cognitect$transit$link_QMARK_(x){
return com.cognitect.transit.types.isLink.call(null,x);
});

//# sourceMappingURL=transit.js.map