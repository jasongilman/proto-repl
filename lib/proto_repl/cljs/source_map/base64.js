// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('cljs.source_map.base64');
goog.require('cljs.core');
cljs.source_map.base64.chars64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
cljs.source_map.base64.char__GT_int = cljs.core.zipmap.call(null,cljs.source_map.base64.chars64,cljs.core.range.call(null,(0),(64)));
cljs.source_map.base64.int__GT_char = cljs.core.zipmap.call(null,cljs.core.range.call(null,(0),(64)),cljs.source_map.base64.chars64);
cljs.source_map.base64.encode = (function cljs$source_map$base64$encode(n){
var e = cljs.core.find.call(null,cljs.source_map.base64.int__GT_char,n);
if(cljs.core.truth_(e)){
return cljs.core.second.call(null,e);
} else {
throw (new Error([cljs.core.str("Must be between 0 and 63: "),cljs.core.str(n)].join('')));
}
});
cljs.source_map.base64.decode = (function cljs$source_map$base64$decode(c){
var e = cljs.core.find.call(null,cljs.source_map.base64.char__GT_int,c);
if(cljs.core.truth_(e)){
return cljs.core.second.call(null,e);
} else {
throw (new Error([cljs.core.str("Not a valid base 64 digit: "),cljs.core.str(c)].join('')));
}
});

//# sourceMappingURL=base64.js.map