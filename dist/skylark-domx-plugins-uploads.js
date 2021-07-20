/**
 * skylark-domx-plugins-uploads - The file upload plugin library.
 * @author Hudaokeji Co.,Ltd
 * @version v0.9.1
 * @link www.skylarkjs.org
 * @license MIT
 */
!function(e,i){var s=i.define,require=i.require,t="function"==typeof s&&s.amd,n=!t&&"undefined"!=typeof exports;if(!t&&!s){var l={};s=i.define=function(e,i,s){"function"==typeof s?(l[e]={factory:s,deps:i.map(function(i){return function(e,i){if("."!==e[0])return e;var s=i.split("/"),t=e.split("/");s.pop();for(var n=0;n<t.length;n++)"."!=t[n]&&(".."==t[n]?s.pop():s.push(t[n]));return s.join("/")}(i,e)}),resolved:!1,exports:null},require(e)):l[e]={factory:null,resolved:!0,exports:s}},require=i.require=function(e){if(!l.hasOwnProperty(e))throw new Error("Module "+e+" has not been defined");var module=l[e];if(!module.resolved){var s=[];module.deps.forEach(function(e){s.push(require(e))}),module.exports=module.factory.apply(i,s)||null,module.resolved=!0}return module.exports}}if(!s)throw new Error("The module utility (ex: requirejs or skylark-utils) is not loaded!");if(function(e,require){e("skylark-domx-plugins-uploads/uploads",["skylark-domx-plugins-base/plugins","skylark-domx-files/dropzone","skylark-domx-files/pastezone","skylark-domx-files/picker"],function(e){var i=function(){return i};return e.uploads=i}),e("skylark-domx-plugins-uploads/single-uploader",["skylark-langx-emitter","skylark-langx-async/Deferred","skylark-domx-velm","skylark-domx-plugins-base","./uploads"],function(e,i,s,t,n){return n.SingleUploader=class extends t.Plugin{get klassName(){return"SingleUploader"}get pluginName(){return"lark.uploads.single"}get options(){return{selectors:{picker:".file-picker",dropzone:".file-dropzone",pastezone:".file-pastezone",startUploads:".start-uploads",cancelUploads:".cancel-uploads"}}}constructor(e,i){super(e,i),this._velm=s(this._elm),this._initFileHandlers()}_initFileHandlers(){var e=this,i=this.options.selectors,s=i.dropzone,t=i.pastezone,n=i.picker;s&&this._velm.$(s).dropzone({dropped:function(i){e._addFile(i[0])}}),t&&this._velm.$(t).pastezone({pasted:function(i){e._addFile(i[0])}}),n&&this._velm.$(n).picker({multiple:!0,picked:function(i){e._addFile(i[0])}})}_addFile(e){this.emit("added",e)}destroy(){}}}),e("skylark-domx-plugins-uploads/multi-uploader",["skylark-langx/skylark","skylark-langx/langx","skylark-domx-query","skylark-domx-velm","skylark-net-http/Upload","skylark-domx-plugins-base","./uploads"],function(e,i,s,t,n,l,a){var o=l.Plugin.inherit({klassName:"MultiUploader",pluginName:"lark.uploads.multi",options:{uploadUrl:"/upload",params:{formParamName:"file"},maxConnections:3,allowedExtensions:[],sizeLimit:0,minSizeLimit:0,autoUpload:!1,selectors:{fileList:".file-list",fileItem:".file-item",nodata:".file-list .no-data",picker:".file-picker",dropzone:".file-dropzone",pastezone:".file-pastezone",startUploads:".start-uploads",cancelUploads:".cancel-uploads"},template:'<div class="lark-multiuploader">    <h3 class="popover-title">Upload files</h3>    <div class="popover-content container-fluid" class="file-list file-dropzone file-pastezone">        <div class="no-data"><em>Add files.</em></div>    </div>    <footer>        <button class="btn btn-warning pull-right btn-sm" id="cancel-uploads-button"><i class="icon-cancel"></i>Cancel uploads</button>        <span class="btn btn-success fileinput-button btn-sm" id="fileinput-button">            <i class="icon-plus"></i>            <span>Add files...</span>            <input id="fileupload" type="file" name="files[]" multiple="multiple">        </span>        <button class="btn btn-primary btn-sm" id="start-uploads-button"><i class="icon-start"></i>Start uploads</button>    </footer></div>',dataType:"json",fileItem:{selectors:{name:".name",size:".size",cancel:".cancel",clear:".clear",progress:".progress",message:".message"},template:'<div class="file-item row">   <div class="col-md-6"><span class="name"></span></div>   <div class="col-md-3">    <span class="size"></span>    <div class="progress hidden">        <div class="progress-label"></div>        <div class="bar"></div>    </div>    <span class="message hidden"></span>   </div>   <div class="col-md-3">    <button class="btn btn-warning btn-xs cancel"><i class="icon-remove"></i>Cancel</button>    <button class="btn btn-xs clear hidden">Clear</button>   </div></div>'}},_construct:function(e,i){this.overrided(e,i),this._velm=t(this._elm),this._initEventHandler(),this._initFileHandlers(),this._initUpoadHandler(),this._updateFileList()},_initFileHandlers:function(){var e=this,i=this.options.selectors,s=i.dropzone,t=i.pastezone,n=i.picker;s&&this._velm.$(s).dropzone({dropped:function(i){e._addFiles(i)}}),t&&this._velm.$(t).pastezone({pasted:function(i){e._addFiles(i)}}),n&&this._velm.$(n).picker({multiple:!0,picked:function(i){e._addFiles(i)}})},_initUpoadHandler:function(){var e=this;this._handler=new n({url:this.options.uploadUrl,maxConnections:this.options.maxConnections,onProgress:function(i,s,t,n){e._onProgress(i,s,t,n)},onComplete:function(i,s,t){e._onComplete(i,s,t)},onCancel:function(i,s){e._onCancel(i,s)},onFailure:function(i,s,t){e._onFailure(i,s,t)}})},_initEventHandler:function(){var e=this,i=this.options.selectors,t=this.options.fileItem.selectors;this._listElement;this._velm.$(i.fileList).on("click",t.cancel,function(t){var n=s(this).closest(i.fileItem),l=n.data("fileId");e._handler.cancel(l),n.remove(),e._updateFileList()}),this._velm.$(i.fileList).on("click",t.clear,function(t){var n=s(this).closest(i.fileItem);n.data("fileId");n.remove(),e._updateFileList()}),this._velm.$(i.cancelUploads).click(function(){var t=e._velm.$(i.fileList).find(i.fileItem);t.forEach(function(i){var t=s(i),n=t.data("fileId");e._handler.cancel(n),t.remove()}),e._updateFileList()}),this._velm.$(i.startUploads).click(function(){var t=e._velm.$(i.fileList).find(i.fileItem);t.forEach(function(i){var t=s(i),n=t.data("fileId");t.data("status")||e._handler.send(n,e.options.params)})})},_onProgress:function(e,i,s,t){var n=this._getItemByFileId(e),l=parseInt(s/t*100,10),a=this._formatSize(s)+" of "+this._formatSize(t);n.data("status","running"),n.find(".progress").find(".bar").css("width",l+"%").parent().find(".progress-label").html(a),this._updateFile(n)},_onComplete:function(e,i,s){this._filesInProgress--;var t=this._getItemByFileId(e);t.data("status","done"),t.find(".message").html('<i class="icon-success"></i> '+(this.doneMsg||"Uploaded")),this._updateFile(t)},_onFailure:function(e,i,s){this._filesInProgress--;var t=this._getItemByFileId(e);t.data("status","error"),t.find(".message").html('<i class="icon-error"></i> '),this._updateFile(t)},_onCancel:function(e,i){this._filesInProgress--;var s=this._getItemByFileId(e);s.data("status","cancel"),this._updateFile(s)},_addToList:function(e,i){var i=this._handler.getName(e),t=this._handler.getSize(e),n=s(this.options.fileItem.template);n.data("fileId",e),n.find(this.options.fileItem.selectors.name).html(this._formatFileName(i)),n.find(this.options.fileItem.selectors.size).html(this._formatSize(t)),this._velm.$(this.options.selectors.fileList).append(n),this._updateFileList()},_updateFileList:function(){var e=this.options.selectors,i=(this.options.fileItem.selectors,this._velm.$(e.fileList).find(e.fileItem)),s=this._velm.$(e.cancelUploads+","+e.startUploads),t=this._velm.$(e.nodata);i.length>0?(s.removeClass("hidden"),t.addClass("hidden")):(s.addClass("hidden"),t.removeClass("hidden"))},_updateFile:function(e){var i=this.options.fileItem.selectors,s=e.find(i.size+","+i.cancel),t=e.find(i.progress+","+i.cancel),n=e.find(i.message+","+i.clear),l=e.data("status");"pending"==l?(t.add(n).addClass("hidden"),s.removeClass("hidden")):"running"==l?(s.add(n).addClass("hidden"),t.removeClass("hidden")):"done"!=l&&"error"!=l||(s.add(t).addClass("hidden"),n.removeClass("hidden"))},_getItemByFileId:function(e){for(var i,t=this.options.selectors,n=this._velm.$(t.fileList).find(t.fileItem),l=0;l<n.length;l++){var a=n[l];if(s(a).data("fileId")==e){i=a;break}}if(i)return s(i)},_addFiles:function(e){for(var i=0;i<e.length;i++)if(!this._validateFile(e[i]))return;for(var i=0;i<e.length;i++)this._addFile(e[i])},_addFile:function(e){var i=this._handler.add(e);this._filesInProgress++,this._addToList(i)},_validateFile:function(e){var i,s;return e.value?i=e.value.replace(/.*(\/|\\)/,""):(i=null!=e.fileName?e.fileName:e.name,s=null!=e.fileSize?e.fileSize:e.size),this._isAllowedExtension(i)?0===s?(this._error("emptyError",i),!1):s&&this.options.sizeLimit&&s>this.options.sizeLimit?(this._error("sizeError",i),!1):!(s&&s<this.options.minSizeLimit)||(this._error("minSizeError",i),!1):(this._error("typeError",i),!1)},_error:function(e,i){var s=this.options.messages[e];function t(e,i){s=s.replace(e,i)}t("{file}",this._formatFileName(i)),t("{extensions}",this.options.allowedExtensions.join(", ")),t("{sizeLimit}",this._formatSize(this.options.sizeLimit)),t("{minSizeLimit}",this._formatSize(this.options.minSizeLimit)),this.options.showMessage(s)},_formatFileName:function(e){return e.length>33&&(e=e.slice(0,19)+"..."+e.slice(-13)),e},_isAllowedExtension:function(e){var i=-1!==e.indexOf(".")?e.replace(/.*[.]/,"").toLowerCase():"",s=this.options.allowedExtensions;if(!s.length)return!0;for(var t=0;t<s.length;t++)if(s[t].toLowerCase()==i)return!0;return!1},_formatSize:function(e){var i=-1;do{e/=1024,i++}while(e>99);return Math.max(e,.1).toFixed(1)+["KB","MB","GB","TB","PB","EB"][i]}});return l.register(o),a.MultiUploader=o}),e("skylark-domx-plugins-uploads/main",["./uploads","./single-uploader","./multi-uploader"],function(e){return e}),e("skylark-domx-plugins-uploads",["skylark-domx-plugins-uploads/main"],function(e){return e})}(s),!t){var a=require("skylark-langx-ns");n?module.exports=a:i.skylarkjs=a}}(0,this);
//# sourceMappingURL=sourcemaps/skylark-domx-plugins-uploads.js.map
