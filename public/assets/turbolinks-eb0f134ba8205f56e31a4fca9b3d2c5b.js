(function(){var CSRFToken,Click,ComponentUrl,Link,browserCompatibleDocumentParser,browserIsntBuggy,browserSupportsCustomEvents,browserSupportsPushState,browserSupportsTurbolinks,bypassOnLoadPopstate,cacheCurrentPage,cacheSize,changePage,constrainPageCacheTo,createDocument,currentState,enableTransitionCache,executeScriptTags,extractTitleAndBody,fetch,fetchHistory,fetchReplacement,historyStateIsDefined,initializeTurbolinks,installDocumentReadyPageEventTriggers,installHistoryChangeHandler,installJqueryAjaxSuccessPageUpdateTrigger,loadedAssets,pageCache,pageChangePrevented,pagesCached,popCookie,processResponse,recallScrollPosition,referer,reflectNewUrl,reflectRedirectedUrl,rememberCurrentState,rememberCurrentUrl,rememberReferer,removeNoscriptTags,requestMethodIsSafe,resetScrollPosition,transitionCacheEnabled,transitionCacheFor,triggerEvent,visit,xhr,_ref,__indexOf=[].indexOf||function(item){for(var i=0,l=this.length;l>i;i++)if(i in this&&this[i]===item)return i;return-1},__hasProp={}.hasOwnProperty,__extends=function(child,parent){function ctor(){this.constructor=child}for(var key in parent)__hasProp.call(parent,key)&&(child[key]=parent[key]);return ctor.prototype=parent.prototype,child.prototype=new ctor,child.__super__=parent.prototype,child},__slice=[].slice;pageCache={},cacheSize=10,transitionCacheEnabled=!1,currentState=null,loadedAssets=null,referer=null,createDocument=null,xhr=null,fetch=function(url){var cachedPage;return url=new ComponentUrl(url),rememberReferer(),cacheCurrentPage(),reflectNewUrl(url),transitionCacheEnabled&&(cachedPage=transitionCacheFor(url.absolute))?(fetchHistory(cachedPage),fetchReplacement(url)):fetchReplacement(url,resetScrollPosition)},transitionCacheFor=function(url){var cachedPage;return cachedPage=pageCache[url],cachedPage&&!cachedPage.transitionCacheDisabled?cachedPage:void 0},enableTransitionCache=function(enable){return null==enable&&(enable=!0),transitionCacheEnabled=enable},fetchReplacement=function(url,onLoadFunction){return null==onLoadFunction&&(onLoadFunction=function(){return function(){}}(this)),triggerEvent("page:fetch",{url:url.absolute}),null!=xhr&&xhr.abort(),xhr=new XMLHttpRequest,xhr.open("GET",url.withoutHashForIE10compatibility(),!0),xhr.setRequestHeader("Accept","text/html, application/xhtml+xml, application/xml"),xhr.setRequestHeader("X-XHR-Referer",referer),xhr.onload=function(){var doc;return triggerEvent("page:receive"),(doc=processResponse())?(changePage.apply(null,extractTitleAndBody(doc)),reflectRedirectedUrl(),onLoadFunction(),triggerEvent("page:load")):document.location.href=url.absolute},xhr.onloadend=function(){return xhr=null},xhr.onerror=function(){return document.location.href=url.absolute},xhr.send()},fetchHistory=function(cachedPage){return null!=xhr&&xhr.abort(),changePage(cachedPage.title,cachedPage.body),recallScrollPosition(cachedPage),triggerEvent("page:restore")},cacheCurrentPage=function(){var currentStateUrl;return currentStateUrl=new ComponentUrl(currentState.url),pageCache[currentStateUrl.absolute]={url:currentStateUrl.relative,body:document.body,title:document.title,positionY:window.pageYOffset,positionX:window.pageXOffset,cachedAt:(new Date).getTime(),transitionCacheDisabled:null!=document.querySelector("[data-no-transition-cache]")},constrainPageCacheTo(cacheSize)},pagesCached=function(size){return null==size&&(size=cacheSize),/^[\d]+$/.test(size)?cacheSize=parseInt(size):void 0},constrainPageCacheTo=function(limit){var cacheTimesRecentFirst,key,pageCacheKeys,_i,_len,_results;for(pageCacheKeys=Object.keys(pageCache),cacheTimesRecentFirst=pageCacheKeys.map(function(url){return pageCache[url].cachedAt}).sort(function(a,b){return b-a}),_results=[],_i=0,_len=pageCacheKeys.length;_len>_i;_i++)key=pageCacheKeys[_i],pageCache[key].cachedAt<=cacheTimesRecentFirst[limit]&&(triggerEvent("page:expire",pageCache[key]),_results.push(delete pageCache[key]));return _results},changePage=function(title,body,csrfToken,runScripts){return document.title=title,document.documentElement.replaceChild(body,document.body),null!=csrfToken&&CSRFToken.update(csrfToken),runScripts&&executeScriptTags(),currentState=window.history.state,triggerEvent("page:change"),triggerEvent("page:update")},executeScriptTags=function(){var attr,copy,nextSibling,parentNode,script,scripts,_i,_j,_len,_len1,_ref,_ref1;for(scripts=Array.prototype.slice.call(document.body.querySelectorAll('script:not([data-turbolinks-eval="false"])')),_i=0,_len=scripts.length;_len>_i;_i++)if(script=scripts[_i],""===(_ref=script.type)||"text/javascript"===_ref){for(copy=document.createElement("script"),_ref1=script.attributes,_j=0,_len1=_ref1.length;_len1>_j;_j++)attr=_ref1[_j],copy.setAttribute(attr.name,attr.value);copy.appendChild(document.createTextNode(script.innerHTML)),parentNode=script.parentNode,nextSibling=script.nextSibling,parentNode.removeChild(script),parentNode.insertBefore(copy,nextSibling)}},removeNoscriptTags=function(node){return node.innerHTML=node.innerHTML.replace(/<noscript[\S\s]*?<\/noscript>/gi,""),node},reflectNewUrl=function(url){return(url=new ComponentUrl(url)).absolute!==referer?window.history.pushState({turbolinks:!0,url:url.absolute},"",url.absolute):void 0},reflectRedirectedUrl=function(){var location,preservedHash;return(location=xhr.getResponseHeader("X-XHR-Redirected-To"))?(location=new ComponentUrl(location),preservedHash=location.hasNoHash()?document.location.hash:"",window.history.replaceState(currentState,"",location.href+preservedHash)):void 0},rememberReferer=function(){return referer=document.location.href},rememberCurrentUrl=function(){return window.history.replaceState({turbolinks:!0,url:document.location.href},"",document.location.href)},rememberCurrentState=function(){return currentState=window.history.state},recallScrollPosition=function(page){return window.scrollTo(page.positionX,page.positionY)},resetScrollPosition=function(){return document.location.hash?document.location.href=document.location.href:window.scrollTo(0,0)},popCookie=function(name){var value,_ref;return value=(null!=(_ref=document.cookie.match(new RegExp(name+"=(\\w+)")))?_ref[1].toUpperCase():void 0)||"",document.cookie=name+"=; expires=Thu, 01-Jan-70 00:00:01 GMT; path=/",value},triggerEvent=function(name,data){var event;return event=document.createEvent("Events"),data&&(event.data=data),event.initEvent(name,!0,!0),document.dispatchEvent(event)},pageChangePrevented=function(){return!triggerEvent("page:before-change")},processResponse=function(){var assetsChanged,clientOrServerError,doc,extractTrackAssets,intersection,validContent;return clientOrServerError=function(){var _ref;return 400<=(_ref=xhr.status)&&600>_ref},validContent=function(){return xhr.getResponseHeader("Content-Type").match(/^(?:text\/html|application\/xhtml\+xml|application\/xml)(?:;|$)/)},extractTrackAssets=function(doc){var node,_i,_len,_ref,_results;for(_ref=doc.head.childNodes,_results=[],_i=0,_len=_ref.length;_len>_i;_i++)node=_ref[_i],null!=("function"==typeof node.getAttribute?node.getAttribute("data-turbolinks-track"):void 0)&&_results.push(node.getAttribute("src")||node.getAttribute("href"));return _results},assetsChanged=function(doc){var fetchedAssets;return loadedAssets||(loadedAssets=extractTrackAssets(document)),fetchedAssets=extractTrackAssets(doc),fetchedAssets.length!==loadedAssets.length||intersection(fetchedAssets,loadedAssets).length!==loadedAssets.length},intersection=function(a,b){var value,_i,_len,_ref,_results;for(a.length>b.length&&(_ref=[b,a],a=_ref[0],b=_ref[1]),_results=[],_i=0,_len=a.length;_len>_i;_i++)value=a[_i],__indexOf.call(b,value)>=0&&_results.push(value);return _results},!clientOrServerError()&&validContent()&&(doc=createDocument(xhr.responseText),doc&&!assetsChanged(doc))?doc:void 0},extractTitleAndBody=function(doc){var title;return title=doc.querySelector("title"),[null!=title?title.textContent:void 0,removeNoscriptTags(doc.body),CSRFToken.get(doc).token,"runScripts"]},CSRFToken={get:function(doc){var tag;return null==doc&&(doc=document),{node:tag=doc.querySelector('meta[name="csrf-token"]'),token:null!=tag&&"function"==typeof tag.getAttribute?tag.getAttribute("content"):void 0}},update:function(latest){var current;return current=this.get(),null!=current.token&&null!=latest&&current.token!==latest?current.node.setAttribute("content",latest):void 0}},browserCompatibleDocumentParser=function(){var createDocumentUsingDOM,createDocumentUsingParser,createDocumentUsingWrite,e,testDoc,_ref;createDocumentUsingParser=function(html){return(new DOMParser).parseFromString(html,"text/html")},createDocumentUsingDOM=function(html){var doc;return doc=document.implementation.createHTMLDocument(""),doc.documentElement.innerHTML=html,doc},createDocumentUsingWrite=function(html){var doc;return doc=document.implementation.createHTMLDocument(""),doc.open("replace"),doc.write(html),doc.close(),doc};try{if(window.DOMParser)return testDoc=createDocumentUsingParser("<html><body><p>test"),createDocumentUsingParser}catch(_error){return e=_error,testDoc=createDocumentUsingDOM("<html><body><p>test"),createDocumentUsingDOM}finally{if(1!==(null!=testDoc&&null!=(_ref=testDoc.body)?_ref.childNodes.length:void 0))return createDocumentUsingWrite}},ComponentUrl=function(){function ComponentUrl(original){return this.original=null!=original?original:document.location.href,this.original.constructor===ComponentUrl?this.original:void this._parse()}return ComponentUrl.prototype.withoutHash=function(){return this.href.replace(this.hash,"")},ComponentUrl.prototype.withoutHashForIE10compatibility=function(){return this.withoutHash()},ComponentUrl.prototype.hasNoHash=function(){return 0===this.hash.length},ComponentUrl.prototype._parse=function(){var _ref;return(null!=this.link?this.link:this.link=document.createElement("a")).href=this.original,_ref=this.link,this.href=_ref.href,this.protocol=_ref.protocol,this.host=_ref.host,this.hostname=_ref.hostname,this.port=_ref.port,this.pathname=_ref.pathname,this.search=_ref.search,this.hash=_ref.hash,this.origin=[this.protocol,"//",this.hostname].join(""),0!==this.port.length&&(this.origin+=":"+this.port),this.relative=[this.pathname,this.search,this.hash].join(""),this.absolute=this.href},ComponentUrl}(),Link=function(_super){function Link(link){return this.link=link,this.link.constructor===Link?this.link:(this.original=this.link.href,void Link.__super__.constructor.apply(this,arguments))}return __extends(Link,_super),Link.HTML_EXTENSIONS=["html"],Link.allowExtensions=function(){var extension,extensions,_i,_len;for(extensions=1<=arguments.length?__slice.call(arguments,0):[],_i=0,_len=extensions.length;_len>_i;_i++)extension=extensions[_i],Link.HTML_EXTENSIONS.push(extension);return Link.HTML_EXTENSIONS},Link.prototype.shouldIgnore=function(){return this._crossOrigin()||this._anchored()||this._nonHtml()||this._optOut()||this._target()},Link.prototype._crossOrigin=function(){return this.origin!==(new ComponentUrl).origin},Link.prototype._anchored=function(){var current;return(this.hash&&this.withoutHash())===(current=new ComponentUrl).withoutHash()||this.href===current.href+"#"},Link.prototype._nonHtml=function(){return this.pathname.match(/\.[a-z]+$/g)&&!this.pathname.match(new RegExp("\\.(?:"+Link.HTML_EXTENSIONS.join("|")+")?$","g"))},Link.prototype._optOut=function(){var ignore,link;for(link=this.link;!ignore&&link!==document;)ignore=null!=link.getAttribute("data-no-turbolink"),link=link.parentNode;return ignore},Link.prototype._target=function(){return 0!==this.link.target.length},Link}(ComponentUrl),Click=function(){function Click(event){this.event=event,this.event.defaultPrevented||(this._extractLink(),this._validForTurbolinks()&&(pageChangePrevented()||visit(this.link.href),this.event.preventDefault()))}return Click.installHandlerLast=function(event){return event.defaultPrevented?void 0:(document.removeEventListener("click",Click.handle,!1),document.addEventListener("click",Click.handle,!1))},Click.handle=function(event){return new Click(event)},Click.prototype._extractLink=function(){var link;for(link=this.event.target;link.parentNode&&"A"!==link.nodeName;)link=link.parentNode;return"A"===link.nodeName&&0!==link.href.length?this.link=new Link(link):void 0},Click.prototype._validForTurbolinks=function(){return null!=this.link&&!(this.link.shouldIgnore()||this._nonStandardClick())},Click.prototype._nonStandardClick=function(){return this.event.which>1||this.event.metaKey||this.event.ctrlKey||this.event.shiftKey||this.event.altKey},Click}(),bypassOnLoadPopstate=function(fn){return setTimeout(fn,500)},installDocumentReadyPageEventTriggers=function(){return document.addEventListener("DOMContentLoaded",function(){return triggerEvent("page:change"),triggerEvent("page:update")},!0)},installJqueryAjaxSuccessPageUpdateTrigger=function(){return"undefined"!=typeof jQuery?jQuery(document).on("ajaxSuccess",function(event,xhr){return jQuery.trim(xhr.responseText)?triggerEvent("page:update"):void 0}):void 0},installHistoryChangeHandler=function(event){var cachedPage,_ref;return(null!=(_ref=event.state)?_ref.turbolinks:void 0)?(cachedPage=pageCache[new ComponentUrl(event.state.url).absolute])?(cacheCurrentPage(),fetchHistory(cachedPage)):visit(event.target.location.href):void 0},initializeTurbolinks=function(){return rememberCurrentUrl(),rememberCurrentState(),createDocument=browserCompatibleDocumentParser(),document.addEventListener("click",Click.installHandlerLast,!0),bypassOnLoadPopstate(function(){return window.addEventListener("popstate",installHistoryChangeHandler,!1)})},historyStateIsDefined=void 0!==window.history.state||navigator.userAgent.match(/Firefox\/2[6|7]/),browserSupportsPushState=window.history&&window.history.pushState&&window.history.replaceState&&historyStateIsDefined,browserIsntBuggy=!navigator.userAgent.match(/CriOS\//),requestMethodIsSafe="GET"===(_ref=popCookie("request_method"))||""===_ref,browserSupportsTurbolinks=browserSupportsPushState&&browserIsntBuggy&&requestMethodIsSafe,browserSupportsCustomEvents=document.addEventListener&&document.createEvent,browserSupportsCustomEvents&&(installDocumentReadyPageEventTriggers(),installJqueryAjaxSuccessPageUpdateTrigger()),browserSupportsTurbolinks?(visit=fetch,initializeTurbolinks()):visit=function(url){return document.location.href=url},this.Turbolinks={visit:visit,pagesCached:pagesCached,enableTransitionCache:enableTransitionCache,allowLinkExtensions:Link.allowExtensions,supported:browserSupportsTurbolinks}}).call(this);