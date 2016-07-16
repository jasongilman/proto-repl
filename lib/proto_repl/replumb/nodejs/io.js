// Compiled by ClojureScript 1.7.228 {:target :nodejs}
goog.provide('replumb.nodejs.io');
goog.require('cljs.core');
goog.require('cljs.nodejs');
goog.require('replumb.common');
/**
 * Delay containing the call to "require fs". It returns the File
 *   System Node.js module object.
 */
replumb.nodejs.io.require_fs = (new cljs.core.Delay((function (){
return cljs.nodejs.require.call(null,"fs");
}),null));
/**
 * Accepts the fs module object, encoding or file options, file name to
 *   read and a callback. Upon success, invokes the callback with the
 *   source of the file. Otherwise invokes the callback with nil.
 * 
 *   The arity without explicit module will call require the first time
 *   only. The arity without encoding-or-opts will default to no file
 *   options and encoding "UTF-8".
 * 
 *   For encoding-or-opts, see
 *   https://nodejs.org/api/fs.html#fs_fs_readfile_file_options_callback.
 */
replumb.nodejs.io.read_file_BANG_ = (function replumb$nodejs$io$read_file_BANG_(var_args){
var args9289 = [];
var len__9102__auto___9293 = arguments.length;
var i__9103__auto___9294 = (0);
while(true){
if((i__9103__auto___9294 < len__9102__auto___9293)){
args9289.push((arguments[i__9103__auto___9294]));

var G__9295 = (i__9103__auto___9294 + (1));
i__9103__auto___9294 = G__9295;
continue;
} else {
}
break;
}

var G__9291 = args9289.length;
switch (G__9291) {
case 2:
return replumb.nodejs.io.read_file_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.nodejs.io.read_file_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return replumb.nodejs.io.read_file_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9289.length)].join('')));

}
});

replumb.nodejs.io.read_file_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (file_path,src_cb){
return replumb.nodejs.io.read_file_BANG_.call(null,cljs.core.force.call(null,replumb.nodejs.io.require_fs),"utf-8",file_path,src_cb);
});

replumb.nodejs.io.read_file_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (encoding_or_opts,file_path,src_cb){
return replumb.nodejs.io.read_file_BANG_.call(null,cljs.core.force.call(null,replumb.nodejs.io.require_fs),encoding_or_opts,file_path,src_cb);
});

replumb.nodejs.io.read_file_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (fs_module,encoding_or_opts,file_path,src_cb){
try{return src_cb.call(null,fs_module.readFileSync(file_path,encoding_or_opts));
}catch (e9292){var e = e9292;
return src_cb.call(null,null);
}});

replumb.nodejs.io.read_file_BANG_.cljs$lang$maxFixedArity = 4;
/**
 * Accepts the fs module object, encoding or file options, file name to
 *   write and a callback. Upon success, invokes the callback with the
 *   source of the file. Otherwise invokes the callback with nil.
 * 
 *   The arity without explicit module will call require the first time
 *   only. The arity without encoding-or-opts will default to no file
 *   options and encoding "UTF-8".
 * 
 *   It is synchronous and returns undefined as per Node.js doc.
 * 
 *   For encoding-or-opts, see
 *   https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback.
 */
replumb.nodejs.io.write_file_BANG_ = (function replumb$nodejs$io$write_file_BANG_(var_args){
var args9297 = [];
var len__9102__auto___9301 = arguments.length;
var i__9103__auto___9302 = (0);
while(true){
if((i__9103__auto___9302 < len__9102__auto___9301)){
args9297.push((arguments[i__9103__auto___9302]));

var G__9303 = (i__9103__auto___9302 + (1));
i__9103__auto___9302 = G__9303;
continue;
} else {
}
break;
}

var G__9299 = args9297.length;
switch (G__9299) {
case 2:
return replumb.nodejs.io.write_file_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.nodejs.io.write_file_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return replumb.nodejs.io.write_file_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9297.length)].join('')));

}
});

replumb.nodejs.io.write_file_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (file_path,data){
return replumb.nodejs.io.write_file_BANG_.call(null,"utf-8",file_path,data);
});

replumb.nodejs.io.write_file_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (encoding_or_opts,file_path,data){
return replumb.nodejs.io.write_file_BANG_.call(null,cljs.core.force.call(null,replumb.nodejs.io.require_fs),encoding_or_opts,file_path,data);
});

replumb.nodejs.io.write_file_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (fs_module,encoding_or_opts,file_path,data){
try{return fs_module.writeFileSync(file_path,data,encoding_or_opts);
}catch (e9300){var e = e9300;
return cljs.core.println.call(null,e.stack);
}});

replumb.nodejs.io.write_file_BANG_.cljs$lang$maxFixedArity = 4;
/**
 * Accepts the fs module object, encoding or file options, file name to
 *   write and a callback. Upon success, invokes the callback with the
 *   source of the file. Otherwise invokes the callback with nil.
 * 
 *   The arity without explicit module will call require the first time
 *   only. The arity without encoding-or-opts will default to no file
 *   options and encoding "UTF-8".
 * 
 *   It is synchronous and returns undefined as per Node.js doc.
 * 
 *   For encoding-or-opts, see
 *   https://nodejs.org/api/fs.html#fs_fs_writefile_file_data_options_callback.
 */
replumb.nodejs.io.delete_file_BANG_ = (function replumb$nodejs$io$delete_file_BANG_(var_args){
var args9305 = [];
var len__9102__auto___9309 = arguments.length;
var i__9103__auto___9310 = (0);
while(true){
if((i__9103__auto___9310 < len__9102__auto___9309)){
args9305.push((arguments[i__9103__auto___9310]));

var G__9311 = (i__9103__auto___9310 + (1));
i__9103__auto___9310 = G__9311;
continue;
} else {
}
break;
}

var G__9307 = args9305.length;
switch (G__9307) {
case 1:
return replumb.nodejs.io.delete_file_BANG_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.nodejs.io.delete_file_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9305.length)].join('')));

}
});

replumb.nodejs.io.delete_file_BANG_.cljs$core$IFn$_invoke$arity$1 = (function (file_path){
return replumb.nodejs.io.delete_file_BANG_.call(null,cljs.core.force.call(null,replumb.nodejs.io.require_fs),file_path);
});

replumb.nodejs.io.delete_file_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (fs_module,file_path){
try{return fs_module.unlinkSync(file_path);
}catch (e9308){var e = e9308;
return cljs.core.println.call(null,e.stack);
}});

replumb.nodejs.io.delete_file_BANG_.cljs$lang$maxFixedArity = 2;
/**
 * Check if the file on the given path exists. It is synchronous.
 */
replumb.nodejs.io.file_exists_QMARK_ = (function replumb$nodejs$io$file_exists_QMARK_(var_args){
var args9313 = [];
var len__9102__auto___9317 = arguments.length;
var i__9103__auto___9318 = (0);
while(true){
if((i__9103__auto___9318 < len__9102__auto___9317)){
args9313.push((arguments[i__9103__auto___9318]));

var G__9319 = (i__9103__auto___9318 + (1));
i__9103__auto___9318 = G__9319;
continue;
} else {
}
break;
}

var G__9315 = args9313.length;
switch (G__9315) {
case 1:
return replumb.nodejs.io.file_exists_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return replumb.nodejs.io.file_exists_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9313.length)].join('')));

}
});

replumb.nodejs.io.file_exists_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (path){
return replumb.nodejs.io.file_exists_QMARK_.call(null,cljs.core.force.call(null,replumb.nodejs.io.require_fs),path);
});

replumb.nodejs.io.file_exists_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (fs_module,path){
try{return !((fs_module.statSync(path) == null));
}catch (e9316){var e = e9316;
if(cljs.core.truth_(cljs.core.re_find.call(null,/ENOENT/,replumb.common.extract_message.call(null,e)))){
return false;
} else {
return cljs.core.println.call(null,e.stack);
}
}});

replumb.nodejs.io.file_exists_QMARK_.cljs$lang$maxFixedArity = 2;
/**
 * Before deleting, checks if the file exists.
 */
replumb.nodejs.io.safely_delete_BANG_ = (function replumb$nodejs$io$safely_delete_BANG_(path){
if(cljs.core.truth_(replumb.nodejs.io.file_exists_QMARK_.call(null,path))){
return replumb.nodejs.io.delete_file_BANG_.call(null,path);
} else {
return null;
}
});
/**
 * Renames synchronously a file.
 */
replumb.nodejs.io.rename_file_BANG_ = (function replumb$nodejs$io$rename_file_BANG_(var_args){
var args9321 = [];
var len__9102__auto___9324 = arguments.length;
var i__9103__auto___9325 = (0);
while(true){
if((i__9103__auto___9325 < len__9102__auto___9324)){
args9321.push((arguments[i__9103__auto___9325]));

var G__9326 = (i__9103__auto___9325 + (1));
i__9103__auto___9325 = G__9326;
continue;
} else {
}
break;
}

var G__9323 = args9321.length;
switch (G__9323) {
case 2:
return replumb.nodejs.io.rename_file_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return replumb.nodejs.io.rename_file_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error([cljs.core.str("Invalid arity: "),cljs.core.str(args9321.length)].join('')));

}
});

replumb.nodejs.io.rename_file_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (old_path,new_path){
return replumb.nodejs.io.rename_file_BANG_.call(null,cljs.core.force.call(null,replumb.nodejs.io.require_fs),old_path,new_path);
});

replumb.nodejs.io.rename_file_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (fs_module,old_path,new_path){
return fs_module.renameSync(old_path,new_path);
});

replumb.nodejs.io.rename_file_BANG_.cljs$lang$maxFixedArity = 3;
/**
 * Before renaming, checks if the file exists.
 */
replumb.nodejs.io.safely_rename_file_BANG_ = (function replumb$nodejs$io$safely_rename_file_BANG_(old_path,new_path){
if(cljs.core.truth_(replumb.nodejs.io.file_exists_QMARK_.call(null,old_path))){
return replumb.nodejs.io.rename_file_BANG_.call(null,old_path,new_path);
} else {
return null;
}
});

//# sourceMappingURL=io.js.map