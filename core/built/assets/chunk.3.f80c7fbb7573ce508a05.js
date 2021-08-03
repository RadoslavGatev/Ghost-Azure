(window.webpackJsonp_ember_auto_import_=window.webpackJsonp_ember_auto_import_||[]).push([[3],{427:function(t,e,n){"use strict"
n.r(e),n.d(e,"Integrations",(function(){return J})),n.d(e,"Span",(function(){return Y.a})),n.d(e,"Transaction",(function(){return W.a})),n.d(e,"registerRequestInstrumentation",(function(){return R})),n.d(e,"defaultRequestInstrumentationOptions",(function(){return w})),n.d(e,"SpanStatus",(function(){return u.a})),n.d(e,"IdleTransaction",(function(){return c.b})),n.d(e,"startIdleTransaction",(function(){return o.b})),n.d(e,"addExtensionMethods",(function(){return o.a})),n.d(e,"extractTraceparentData",(function(){return d.b})),n.d(e,"getActiveTransaction",(function(){return d.c})),n.d(e,"hasTracingEnabled",(function(){return d.d})),n.d(e,"stripUrlQueryAndFragment",(function(){return s.k})),n.d(e,"TRACEPARENT_REGEXP",(function(){return d.a}))
var i={}
n.r(i),n.d(i,"Express",(function(){return N})),n.d(i,"Postgres",(function(){return L})),n.d(i,"Mysql",(function(){return P})),n.d(i,"Mongo",(function(){return U}))
var a=n(0),r=n(11),s=n(5),o=n(431),c=n(432),u=n(430),d=n(429),p=Object(s.f)(),l=n(10),m=n(47),h=n(20),f=function(t,e,n){var i
return function(a){e.value>=0&&(a||n)&&(e.delta=e.value-(i||0),(e.delta||void 0===i)&&(i=e.value,t(e)))}},v=function(t,e){return{name:t,value:null!=e?e:-1,delta:0,entries:[],id:"v2-"+Date.now()+"-"+(Math.floor(8999999999999*Math.random())+1e12)}},g=function(t,e){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){if("first-input"===t&&!("PerformanceEventTiming"in self))return
var n=new PerformanceObserver((function(t){return t.getEntries().map(e)}))
return n.observe({type:t,buffered:!0}),n}}catch(t){}},_=function(t,e){var n=function(i){"pagehide"!==i.type&&"hidden"!==document.visibilityState||(t(i),e&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))}
addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},b=-1,y=function(){return b<0&&(b="hidden"===document.visibilityState?0:1/0,_((function(t){var e=t.timeStamp
b=e}),!0)),{get firstHiddenTime(){return b}}},O={},T=Object(s.f)(),S=function(){function t(){var t
this._measurements={},this._performanceCursor=0,!Object(l.b)()&&(null===(t=T)||void 0===t?void 0:t.performance)&&(T.performance.mark&&T.performance.mark("sentry-tracing-init"),this._trackCLS(),this._trackLCP(),this._trackFID())}return t.prototype.addPerformanceEntries=function(t){var e=this
if(T&&T.performance&&T.performance.getEntries&&m.b){r.a.log("[Tracing] Adding & adjusting spans using Performance API")
var n,i,a,s,o,c=Object(d.e)(m.b)
if(T.document&&T.document.scripts)for(var u=0;u<T.document.scripts.length;u++)if("true"===T.document.scripts[u].dataset.entry){n=T.document.scripts[u].src
break}if(T.performance.getEntries().slice(this._performanceCursor).forEach((function(u){var p=Object(d.e)(u.startTime),l=Object(d.e)(u.duration)
if(!("navigation"===t.op&&c+p<t.startTimestamp))switch(u.entryType){case"navigation":!function(t,e,n){j({transaction:t,entry:e,event:"unloadEvent",timeOrigin:n}),j({transaction:t,entry:e,event:"redirect",timeOrigin:n}),j({transaction:t,entry:e,event:"domContentLoadedEvent",timeOrigin:n}),j({transaction:t,entry:e,event:"loadEvent",timeOrigin:n}),j({transaction:t,entry:e,event:"connect",timeOrigin:n}),j({transaction:t,entry:e,event:"secureConnection",timeOrigin:n,eventEnd:"connectEnd",description:"TLS/SSL"}),j({transaction:t,entry:e,event:"fetch",timeOrigin:n,eventEnd:"domainLookupStart",description:"cache"}),j({transaction:t,entry:e,event:"domainLookup",timeOrigin:n,description:"DNS"}),function(t,e,n){E(t,{op:"browser",description:"request",startTimestamp:n+Object(d.e)(e.requestStart),endTimestamp:n+Object(d.e)(e.responseEnd)}),E(t,{op:"browser",description:"response",startTimestamp:n+Object(d.e)(e.responseStart),endTimestamp:n+Object(d.e)(e.responseEnd)})}(t,e,n)}(t,u,c),s=c+Object(d.e)(u.responseStart),o=c+Object(d.e)(u.requestStart)
break
case"mark":case"paint":case"measure":var m=function(t,e,n,i,a){var r=a+n,s=r+i
return E(t,{description:e.name,endTimestamp:s,op:e.entryType,startTimestamp:r}),r}(t,u,p,l,c)
void 0===a&&"sentry-tracing-init"===u.name&&(a=m)
var h=y(),f=u.startTime<h.firstHiddenTime
"first-paint"===u.name&&f&&(r.a.log("[Measurements] Adding FP"),e._measurements.fp={value:u.startTime},e._measurements["mark.fp"]={value:m}),"first-contentful-paint"===u.name&&f&&(r.a.log("[Measurements] Adding FCP"),e._measurements.fcp={value:u.startTime},e._measurements["mark.fcp"]={value:m})
break
case"resource":var v=u.name.replace(window.location.origin,""),g=function(t,e,n,i,a,r){if("xmlhttprequest"!==e.initiatorType&&"fetch"!==e.initiatorType){var s={}
"transferSize"in e&&(s["Transfer Size"]=e.transferSize),"encodedBodySize"in e&&(s["Encoded Body Size"]=e.encodedBodySize),"decodedBodySize"in e&&(s["Decoded Body Size"]=e.decodedBodySize)
var o=r+i,c=o+a
return E(t,{description:n,endTimestamp:c,op:e.initiatorType?"resource."+e.initiatorType:"resource",startTimestamp:o,data:s}),c}}(t,u,v,p,l,c)
void 0===i&&(n||"").indexOf(v)>-1&&(i=g)}})),void 0!==i&&void 0!==a&&E(t,{description:"evaluation",endTimestamp:a,op:"script",startTimestamp:i}),this._performanceCursor=Math.max(performance.getEntries().length-1,0),this._trackNavigator(t),"pageload"===t.op){var p=Object(d.e)(m.b)
"number"==typeof s&&(r.a.log("[Measurements] Adding TTFB"),this._measurements.ttfb={value:1e3*(s-t.startTimestamp)},"number"==typeof o&&o<=s&&(this._measurements["ttfb.requestTime"]={value:1e3*(s-o)})),["fcp","fp","lcp"].forEach((function(n){if(e._measurements[n]&&!(p>=t.startTimestamp)){var i=e._measurements[n].value,a=p+Object(d.e)(i),s=Math.abs(1e3*(a-t.startTimestamp)),o=s-i
r.a.log("[Measurements] Normalized "+n+" from "+i+" to "+s+" ("+o+")"),e._measurements[n].value=s}})),this._measurements["mark.fid"]&&this._measurements.fid&&E(t,{description:"first input delay",endTimestamp:this._measurements["mark.fid"].value+Object(d.e)(this._measurements.fid.value),op:"web.vitals",startTimestamp:this._measurements["mark.fid"].value}),"fcp"in this._measurements||delete this._measurements.cls,t.setMeasurements(this._measurements),this._tagMetricInfo(t)}}},t.prototype._tagMetricInfo=function(t){this._lcpEntry&&(r.a.log("[Measurements] Adding LCP Data"),this._lcpEntry.element&&t.setTag("lcp.element",Object(h.a)(this._lcpEntry.element)),this._lcpEntry.id&&t.setTag("lcp.id",this._lcpEntry.id),this._lcpEntry.url&&t.setTag("lcp.url",this._lcpEntry.url.trim().slice(0,200)),t.setTag("lcp.size",this._lcpEntry.size)),this._clsEntry&&this._clsEntry.sources&&(r.a.log("[Measurements] Adding CLS Data"),this._clsEntry.sources.forEach((function(e,n){return t.setTag("cls.source."+(n+1),Object(h.a)(e.node))})))},t.prototype._trackCLS=function(){var t=this
!function(t,e){var n,i=v("CLS",0),a=0,r=[],s=function(t){if(t&&!t.hadRecentInput){var e=r[0],s=r[r.length-1]
a&&0!==r.length&&t.startTime-s.startTime<1e3&&t.startTime-e.startTime<5e3?(a+=t.value,r.push(t)):(a=t.value,r=[t]),a>i.value&&(i.value=a,i.entries=r,n&&n())}},o=g("layout-shift",s)
o&&(n=f(t,i,void 0),_((function(){o.takeRecords().map(s),n(!0)})))}((function(e){var n=e.entries.pop()
n&&(r.a.log("[Measurements] Adding CLS"),t._measurements.cls={value:e.value},t._clsEntry=n)}))},t.prototype._trackNavigator=function(t){var e=T.navigator
if(e){var n=e.connection
n&&(n.effectiveType&&t.setTag("effectiveConnectionType",n.effectiveType),n.type&&t.setTag("connectionType",n.type),x(n.rtt)&&(this._measurements["connection.rtt"]={value:n.rtt}),x(n.downlink)&&(this._measurements["connection.downlink"]={value:n.downlink})),x(e.deviceMemory)&&t.setTag("deviceMemory",String(e.deviceMemory)),x(e.hardwareConcurrency)&&t.setTag("hardwareConcurrency",String(e.hardwareConcurrency))}},t.prototype._trackLCP=function(){var t=this
!function(t,e){var n,i=y(),a=v("LCP"),r=function(t){var e=t.startTime
e<i.firstHiddenTime&&(a.value=e,a.entries.push(t)),n&&n()},s=g("largest-contentful-paint",r)
if(s){n=f(t,a,void 0)
var o=function(){O[a.id]||(s.takeRecords().map(r),s.disconnect(),O[a.id]=!0,n(!0))};["keydown","click"].forEach((function(t){addEventListener(t,o,{once:!0,capture:!0})})),_(o,!0)}}((function(e){var n=e.entries.pop()
if(n){var i=Object(d.e)(m.b),a=Object(d.e)(n.startTime)
r.a.log("[Measurements] Adding LCP"),t._measurements.lcp={value:e.value},t._measurements["mark.lcp"]={value:i+a},t._lcpEntry=n}}))},t.prototype._trackFID=function(){var t=this
!function(t,e){var n,i=y(),a=v("FID"),r=function(t){n&&t.startTime<i.firstHiddenTime&&(a.value=t.processingStart-t.startTime,a.entries.push(t),n(!0))},s=g("first-input",r)
s&&(n=f(t,a,void 0),_((function(){s.takeRecords().map(r),s.disconnect()}),!0))}((function(e){var n=e.entries.pop()
if(n){var i=Object(d.e)(m.b),a=Object(d.e)(n.startTime)
r.a.log("[Measurements] Adding FID"),t._measurements.fid={value:e.value},t._measurements["mark.fid"]={value:i+a}}}))},t}()
function j(t){var e=t.transaction,n=t.entry,i=t.event,a=t.timeOrigin,r=t.eventEnd,s=t.description,o=r?n[r]:n[i+"End"],c=n[i+"Start"]
c&&o&&E(e,{op:"browser",description:null!=s?s:i,startTimestamp:a+Object(d.e)(c),endTimestamp:a+Object(d.e)(o)})}function E(t,e){var n=e.startTimestamp,i=Object(a.d)(e,["startTimestamp"])
return n&&t.startTimestamp>n&&(t.startTimestamp=n),t.startChild(Object(a.a)({startTimestamp:n},i))}function x(t){return"number"==typeof t&&isFinite(t)}var I=n(9),C=n(52),k=n(4),w={traceFetch:!0,traceXHR:!0,tracingOrigins:["localhost",/^\//]}
function R(t){var e=Object(a.a)(Object(a.a)({},w),t),n=e.traceFetch,i=e.traceXHR,r=e.tracingOrigins,s=e.shouldCreateSpanForRequest,o={},c=function(t){if(o[t])return o[t]
var e=r
return o[t]=e.some((function(e){return Object(I.a)(t,e)}))&&!Object(I.a)(t,"sentry_key"),o[t]},p=c
"function"==typeof s&&(p=function(t){return c(t)&&s(t)})
var l={}
n&&Object(C.a)({callback:function(t){!function(t,e,n){if(Object(d.d)()&&t.fetchData&&e(t.fetchData.url))if(t.endTimestamp&&t.fetchData.__span)(r=n[t.fetchData.__span])&&(t.response?r.setHttpStatus(t.response.status):t.error&&r.setStatus(u.a.InternalError),r.finish(),delete n[t.fetchData.__span])
else{var i=Object(d.c)()
if(i){var r=i.startChild({data:Object(a.a)(Object(a.a)({},t.fetchData),{type:"fetch"}),description:t.fetchData.method+" "+t.fetchData.url,op:"http.client"})
t.fetchData.__span=r.spanId,n[r.spanId]=r
var s=t.args[0]=t.args[0],o=t.args[1]=t.args[1]||{},c=o.headers
Object(k.g)(s,Request)&&(c=s.headers),c?"function"==typeof c.append?c.append("sentry-trace",r.toTraceparent()):c=Array.isArray(c)?Object(a.e)(c,[["sentry-trace",r.toTraceparent()]]):Object(a.a)(Object(a.a)({},c),{"sentry-trace":r.toTraceparent()}):c={"sentry-trace":r.toTraceparent()},o.headers=c}}}(t,p,l)},type:"fetch"}),i&&Object(C.a)({callback:function(t){!function(t,e,n){var i,r
if(Object(d.d)()&&!(null===(i=t.xhr)||void 0===i?void 0:i.__sentry_own_request__)&&(null===(r=t.xhr)||void 0===r?void 0:r.__sentry_xhr__)&&e(t.xhr.__sentry_xhr__.url)){var s=t.xhr.__sentry_xhr__
if(t.endTimestamp&&t.xhr.__sentry_xhr_span_id__)(c=n[t.xhr.__sentry_xhr_span_id__])&&(c.setHttpStatus(s.status_code),c.finish(),delete n[t.xhr.__sentry_xhr_span_id__])
else{var o=Object(d.c)()
if(o){var c=o.startChild({data:Object(a.a)(Object(a.a)({},s.data),{type:"xhr",method:s.method,url:s.url}),description:s.method+" "+s.url,op:"http.client"})
if(t.xhr.__sentry_xhr_span_id__=c.spanId,n[t.xhr.__sentry_xhr_span_id__]=c,t.xhr.setRequestHeader)try{t.xhr.setRequestHeader("sentry-trace",c.toTraceparent())}catch(t){}}}}}(t,p,l)},type:"xhr"})}var A=Object(s.f)(),M=Object(a.a)({idleTimeout:c.a,markBackgroundTransactions:!0,maxTransactionDuration:600,routingInstrumentation:function(t,e,n){if(void 0===e&&(e=!0),void 0===n&&(n=!0),A&&A.location){var i,a=A.location.href
e&&(i=t({name:A.location.pathname,op:"pageload"})),n&&Object(C.a)({callback:function(e){var n=e.to,s=e.from
void 0===s&&a&&-1!==a.indexOf(n)?a=void 0:s!==n&&(a=void 0,i&&(r.a.log("[Tracing] Finishing current transaction with op: "+i.op),i.finish()),i=t({name:A.location.pathname,op:"navigation"}))},type:"history"})}else r.a.warn("Could not initialize routing instrumentation due to invalid location")},startTransactionOnLocationChange:!0,startTransactionOnPageLoad:!0},w),D=function(){function t(e){this.name=t.id,this._metrics=new S,this._emitOptionsWarning=!1
var n=w.tracingOrigins
e&&e.tracingOrigins&&Array.isArray(e.tracingOrigins)&&0!==e.tracingOrigins.length?n=e.tracingOrigins:this._emitOptionsWarning=!0,this.options=Object(a.a)(Object(a.a)(Object(a.a)({},M),e),{tracingOrigins:n})}return t.prototype.setupOnce=function(t,e){var n=this
this._getCurrentHub=e,this._emitOptionsWarning&&(r.a.warn("[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace."),r.a.warn("[Tracing] We added a reasonable default for you: "+w.tracingOrigins))
var i=this.options,a=i.routingInstrumentation,s=i.startTransactionOnLocationChange,o=i.startTransactionOnPageLoad,c=i.markBackgroundTransactions,l=i.traceFetch,m=i.traceXHR,h=i.tracingOrigins,f=i.shouldCreateSpanForRequest
a((function(t){return n._createRouteTransaction(t)}),o,s),c&&(p&&p.document?p.document.addEventListener("visibilitychange",(function(){var t=Object(d.c)()
p.document.hidden&&t&&(r.a.log("[Tracing] Transaction: "+u.a.Cancelled+" -> since tab moved to the background, op: "+t.op),t.status||t.setStatus(u.a.Cancelled),t.setTag("visibilitychange","document.hidden"),t.finish())})):r.a.warn("[Tracing] Could not set up background tab detection due to lack of global document")),R({traceFetch:l,traceXHR:m,tracingOrigins:h,shouldCreateSpanForRequest:f})},t.prototype._createRouteTransaction=function(t){var e=this
if(this._getCurrentHub){var n=this.options,i=n.beforeNavigate,c=n.idleTimeout,p=n.maxTransactionDuration,l="pageload"===t.op?function(){var t,e=("sentry-trace",(t=document.querySelector("meta[name=sentry-trace]"))?t.getAttribute("content"):null)
if(e)return Object(d.b)(e)}():void 0,m=Object(a.a)(Object(a.a)(Object(a.a)({},t),l),{trimEnd:!0}),h="function"==typeof i?i(m):m,f=void 0===h?Object(a.a)(Object(a.a)({},m),{sampled:!1}):h
!1===f.sampled&&r.a.log("[Tracing] Will not send "+f.op+" transaction because of beforeNavigate."),r.a.log("[Tracing] Starting "+f.op+" transaction on scope")
var v=this._getCurrentHub(),g=Object(s.f)().location,_=Object(o.b)(v,f,c,!0,{location:g})
return _.registerBeforeFinishCallback((function(t,n){e._metrics.addPerformanceEntries(t),function(t,e,n){var i=n-e.startTimestamp
n&&(i>t||i<0)&&(e.setStatus(u.a.DeadlineExceeded),e.setTag("maxTransactionDurationExceeded","true"))}(Object(d.f)(p),t,n)})),_}r.a.warn("[Tracing] Did not create "+t.op+" transaction because _getCurrentHub is invalid.")},t.id="BrowserTracing",t}(),N=function(){function t(e){void 0===e&&(e={}),this.name=t.id,this._router=e.router||e.app,this._methods=(Array.isArray(e.methods)?e.methods:[]).concat("use")}return t.prototype.setupOnce=function(){this._router?function(t,e){void 0===e&&(e=[]),e.forEach((function(e){return function(t,e){var n=t[e]
return t[e]=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i]
return n.call.apply(n,Object(a.e)([this],F(t,e)))},t}(t,e)}))}(this._router,this._methods):r.a.error("ExpressIntegration is missing an Express instance")},t.id="Express",t}()
function q(t,e){var n=t.length
switch(n){case 2:return function(n,i){var a=i.__sentry_transaction
if(a){var r=a.startChild({description:t.name,op:"middleware."+e})
i.once("finish",(function(){r.finish()}))}return t.call(this,n,i)}
case 3:return function(n,i,r){var s,o=null===(s=i.__sentry_transaction)||void 0===s?void 0:s.startChild({description:t.name,op:"middleware."+e})
t.call(this,n,i,(function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n]
null===(t=o)||void 0===t||t.finish(),r.call.apply(r,Object(a.e)([this],e))}))}
case 4:return function(n,i,r,s){var o,c=null===(o=r.__sentry_transaction)||void 0===o?void 0:o.startChild({description:t.name,op:"middleware."+e})
t.call(this,n,i,r,(function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n]
null===(t=c)||void 0===t||t.finish(),s.call.apply(s,Object(a.e)([this],e))}))}
default:throw new Error("Express middleware takes 2-4 arguments. Got: "+n)}}function F(t,e){return t.map((function(t){return"function"==typeof t?q(t,e):Array.isArray(t)?t.map((function(t){return"function"==typeof t?q(t,e):t})):t}))}var H=n(6),L=function(){function t(){this.name=t.id}return t.prototype.setupOnce=function(t,e){var n=Object(l.c)("pg")
n?Object(H.c)(n.Client.prototype,"query",(function(t){return function(n,i,a){var r,s,o,c=null===(s=null===(r=e().getScope())||void 0===r?void 0:r.getSpan())||void 0===s?void 0:s.startChild({description:"string"==typeof n?n:n.text,op:"db"})
if("function"==typeof a)return t.call(this,n,i,(function(t,e){var n
null===(n=c)||void 0===n||n.finish(),a(t,e)}))
if("function"==typeof i)return t.call(this,n,(function(t,e){var n
null===(n=c)||void 0===n||n.finish(),i(t,e)}))
var u=void 0!==i?t.call(this,n,i):t.call(this,n)
return Object(k.m)(u)?u.then((function(t){var e
return null===(e=c)||void 0===e||e.finish(),t})):(null===(o=c)||void 0===o||o.finish(),u)}})):r.a.error("Postgres Integration was unable to require `pg` package.")},t.id="Postgres",t}(),P=function(){function t(){this.name=t.id}return t.prototype.setupOnce=function(t,e){var n=Object(l.c)("mysql/lib/Connection.js")
n?Object(H.c)(n,"createQuery",(function(t){return function(n,i,a){var r,s,o=null===(s=null===(r=e().getScope())||void 0===r?void 0:r.getSpan())||void 0===s?void 0:s.startChild({description:"string"==typeof n?n:n.sql,op:"db"})
return"function"==typeof a?t.call(this,n,i,(function(t,e,n){var i
null===(i=o)||void 0===i||i.finish(),a(t,e,n)})):"function"==typeof i?t.call(this,n,(function(t,e,n){var a
null===(a=o)||void 0===a||a.finish(),i(t,e,n)})):t.call(this,n,i,a)}})):r.a.error("Mysql Integration was unable to require `mysql` package.")},t.id="Mysql",t}(),z=["aggregate","bulkWrite","countDocuments","createIndex","createIndexes","deleteMany","deleteOne","distinct","drop","dropIndex","dropIndexes","estimatedDocumentCount","find","findOne","findOneAndDelete","findOneAndReplace","findOneAndUpdate","indexes","indexExists","indexInformation","initializeOrderedBulkOp","insertMany","insertOne","isCapped","mapReduce","options","parallelCollectionScan","rename","replaceOne","stats","updateMany","updateOne"],B={bulkWrite:["operations"],countDocuments:["query"],createIndex:["fieldOrSpec"],createIndexes:["indexSpecs"],deleteMany:["filter"],deleteOne:["filter"],distinct:["key","query"],dropIndex:["indexName"],find:["query"],findOne:["query"],findOneAndDelete:["filter"],findOneAndReplace:["filter","replacement"],findOneAndUpdate:["filter","update"],indexExists:["indexes"],insertMany:["docs"],insertOne:["doc"],mapReduce:["map","reduce"],rename:["newName"],replaceOne:["filter","doc"],updateMany:["filter","update"],updateOne:["filter","update"]},U=function(){function t(e){void 0===e&&(e={}),this.name=t.id,this._operations=Array.isArray(e.operations)?e.operations:z,this._describeOperations=!("describeOperations"in e)||e.describeOperations,this._useMongoose=!!e.useMongoose}return t.prototype.setupOnce=function(t,e){var n=this._useMongoose?"mongoose":"mongodb",i=Object(l.c)(n)
i?this._instrumentOperations(i.Collection,this._operations,e):r.a.error("Mongo Integration was unable to require `"+n+"` package.")},t.prototype._instrumentOperations=function(t,e,n){var i=this
e.forEach((function(e){return i._patchOperation(t,e,n)}))},t.prototype._patchOperation=function(t,e,n){if(e in t.prototype){var i=this._getSpanContextFromOperationArguments.bind(this)
Object(H.c)(t.prototype,e,(function(t){return function(){for(var r,s,o,c,u=[],d=0;d<arguments.length;d++)u[d]=arguments[d]
var p=u[u.length-1],l=n().getScope(),m=null===(r=l)||void 0===r?void 0:r.getSpan()
if("function"!=typeof p||"mapReduce"===e&&2===u.length){var h=null===(s=m)||void 0===s?void 0:s.startChild(i(this,e,u)),f=t.call.apply(t,Object(a.e)([this],u))
return Object(k.m)(f)?f.then((function(t){var e
return null===(e=h)||void 0===e||e.finish(),t})):(null===(o=h)||void 0===o||o.finish(),f)}var v=null===(c=m)||void 0===c?void 0:c.startChild(i(this,e,u.slice(0,-1)))
return t.call.apply(t,Object(a.e)([this],u.slice(0,-1),[function(t,e){var n
null===(n=v)||void 0===n||n.finish(),p(t,e)}]))}}))}},t.prototype._getSpanContextFromOperationArguments=function(t,e,n){var i={collectionName:t.collectionName,dbName:t.dbName,namespace:t.namespace},r={op:"db",description:e,data:i},s=B[e],o=Array.isArray(this._describeOperations)?this._describeOperations.includes(e):this._describeOperations
if(!s||!o)return r
try{if("mapReduce"===e){var c=Object(a.c)(n,2),u=c[0],d=c[1]
i[s[0]]="string"==typeof u?u:u.name||"<anonymous>",i[s[1]]="string"==typeof d?d:d.name||"<anonymous>"}else for(var p=0;p<s.length;p++)i[s[p]]=JSON.stringify(n[p])}catch(t){}return r},t.id="Mongo",t}(),Y=n(433),W=n(434),J=Object(a.a)(Object(a.a)({},i),{BrowserTracing:D})
Object(o.a)()},429:function(t,e,n){"use strict"
n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return r})),n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"e",(function(){return c})),n.d(e,"f",(function(){return u}))
var i=n(428),a=new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$")
function r(t){var e
return void 0===t&&(t=null===(e=Object(i.b)().getClient())||void 0===e?void 0:e.getOptions()),!!t&&("tracesSampleRate"in t||"tracesSampler"in t)}function s(t){var e=t.match(a)
if(e){var n=void 0
return"1"===e[3]?n=!0:"0"===e[3]&&(n=!1),{traceId:e[1],parentSampled:n,parentSpanId:e[2]}}}function o(t){var e,n
return void 0===t&&(t=Object(i.b)()),null===(n=null===(e=t)||void 0===e?void 0:e.getScope())||void 0===n?void 0:n.getTransaction()}function c(t){return t/1e3}function u(t){return 1e3*t}},430:function(t,e,n){"use strict"
var i
n.d(e,"a",(function(){return i})),function(t){t.Ok="ok",t.DeadlineExceeded="deadline_exceeded",t.Unauthenticated="unauthenticated",t.PermissionDenied="permission_denied",t.NotFound="not_found",t.ResourceExhausted="resource_exhausted",t.InvalidArgument="invalid_argument",t.Unimplemented="unimplemented",t.Unavailable="unavailable",t.InternalError="internal_error",t.UnknownError="unknown_error",t.Cancelled="cancelled",t.AlreadyExists="already_exists",t.FailedPrecondition="failed_precondition",t.Aborted="aborted",t.OutOfRange="out_of_range",t.DataLoss="data_loss"}(i||(i={})),function(t){t.fromHttpCode=function(e){if(e<400)return t.Ok
if(e>=400&&e<500)switch(e){case 401:return t.Unauthenticated
case 403:return t.PermissionDenied
case 404:return t.NotFound
case 409:return t.AlreadyExists
case 413:return t.FailedPrecondition
case 429:return t.ResourceExhausted
default:return t.InvalidArgument}if(e>=500&&e<600)switch(e){case 501:return t.Unimplemented
case 503:return t.Unavailable
case 504:return t.DeadlineExceeded
default:return t.InternalError}return t.UnknownError}}(i||(i={}))},431:function(t,e,n){"use strict";(function(t){n.d(e,"b",(function(){return f})),n.d(e,"a",(function(){return v}))
var i=n(0),a=n(428),r=n(53),s=n(11),o=n(10),c=n(436),u=n(432),d=n(434),p=n(429)
function l(){var t=this.getScope()
if(t){var e=t.getSpan()
if(e)return{"sentry-trace":e.toTraceparent()}}return{}}function m(t,e,n){return Object(p.d)()?void 0!==t.sampled?(t.setMetadata({transactionSampling:{method:r.a.Explicit}}),t):("function"==typeof e.tracesSampler?(i=e.tracesSampler(n),t.setMetadata({transactionSampling:{method:r.a.Sampler,rate:Number(i)}})):void 0!==n.parentSampled?(i=n.parentSampled,t.setMetadata({transactionSampling:{method:r.a.Inheritance}})):(i=e.tracesSampleRate,t.setMetadata({transactionSampling:{method:r.a.Rate,rate:Number(i)}})),function(t){return isNaN(t)||"number"!=typeof t&&"boolean"!=typeof t?(s.a.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got "+JSON.stringify(t)+" of type "+JSON.stringify(typeof t)+"."),!1):!(t<0||t>1)||(s.a.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got "+t+"."),!1)}(i)?i?(t.sampled=Math.random()<i,t.sampled?(s.a.log("[Tracing] starting "+t.op+" transaction - "+t.name),t):(s.a.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = "+Number(i)+")"),t)):(s.a.log("[Tracing] Discarding transaction because "+("function"==typeof e.tracesSampler?"tracesSampler returned 0 or false":"a negative sampling decision was inherited or tracesSampleRate is set to 0")),t.sampled=!1,t):(s.a.warn("[Tracing] Discarding transaction because of invalid sample rate."),t.sampled=!1,t)):(t.sampled=!1,t)
var i}function h(t,e){var n,a,r=(null===(n=this.getClient())||void 0===n?void 0:n.getOptions())||{},s=new d.a(t,this)
return(s=m(s,r,Object(i.a)({parentSampled:t.parentSampled,transactionContext:t},e))).sampled&&s.initSpanRecorder(null===(a=r._experiments)||void 0===a?void 0:a.maxSpans),s}function f(t,e,n,a,r){var s,o,c=(null===(s=t.getClient())||void 0===s?void 0:s.getOptions())||{},d=new u.b(e,t,n,a)
return(d=m(d,c,Object(i.a)({parentSampled:e.parentSampled,transactionContext:e},r))).sampled&&d.initSpanRecorder(null===(o=c._experiments)||void 0===o?void 0:o.maxSpans),d}function v(){var e;(e=Object(a.d)()).__SENTRY__&&(e.__SENTRY__.extensions=e.__SENTRY__.extensions||{},e.__SENTRY__.extensions.startTransaction||(e.__SENTRY__.extensions.startTransaction=h),e.__SENTRY__.extensions.traceHeaders||(e.__SENTRY__.extensions.traceHeaders=l)),Object(o.b)()&&function(){var e=Object(a.d)()
if(e.__SENTRY__){var n={mongodb:function(){return new(Object(o.a)(t,"./integrations/mongo").Mongo)},mongoose:function(){return new(Object(o.a)(t,"./integrations/mongo").Mongo)({mongoose:!0})},mysql:function(){return new(Object(o.a)(t,"./integrations/mysql").Mysql)},pg:function(){return new(Object(o.a)(t,"./integrations/postgres").Postgres)}},r=Object.keys(n).filter((function(t){return!!Object(o.c)(t)})).map((function(t){try{return n[t]()}catch(t){return}})).filter((function(t){return t}))
r.length>0&&(e.__SENTRY__.integrations=Object(i.e)(e.__SENTRY__.integrations||[],r))}}(),Object(c.a)()}}).call(this,n(29)(t))},432:function(t,e,n){"use strict"
n.d(e,"a",(function(){return u})),n.d(e,"b",(function(){return p}))
var i=n(0),a=n(47),r=n(11),s=n(433),o=n(430),c=n(434),u=1e3,d=function(t){function e(e,n,i,a){void 0===i&&(i="")
var r=t.call(this,a)||this
return r._pushActivity=e,r._popActivity=n,r.transactionSpanId=i,r}return Object(i.b)(e,t),e.prototype.add=function(e){var n=this
e.spanId!==this.transactionSpanId&&(e.finish=function(t){e.endTimestamp="number"==typeof t?t:Object(a.e)(),n._popActivity(e.spanId)},void 0===e.endTimestamp&&this._pushActivity(e.spanId)),t.prototype.add.call(this,e)},e}(s.b),p=function(t){function e(e,n,i,a){void 0===i&&(i=u),void 0===a&&(a=!1)
var s=t.call(this,e,n)||this
return s._idleHub=n,s._idleTimeout=i,s._onScope=a,s.activities={},s._heartbeatTimer=0,s._heartbeatCounter=0,s._finished=!1,s._beforeFinishCallbacks=[],n&&a&&(l(n),r.a.log("Setting idle transaction on scope. Span ID: "+s.spanId),n.configureScope((function(t){return t.setSpan(s)}))),s._initTimeout=setTimeout((function(){s._finished||s.finish()}),s._idleTimeout),s}return Object(i.b)(e,t),e.prototype.finish=function(e){var n,s,c=this
if(void 0===e&&(e=Object(a.e)()),this._finished=!0,this.activities={},this.spanRecorder){r.a.log("[Tracing] finishing IdleTransaction",new Date(1e3*e).toISOString(),this.op)
try{for(var u=Object(i.f)(this._beforeFinishCallbacks),d=u.next();!d.done;d=u.next())(0,d.value)(this,e)}catch(t){n={error:t}}finally{try{d&&!d.done&&(s=u.return)&&s.call(u)}finally{if(n)throw n.error}}this.spanRecorder.spans=this.spanRecorder.spans.filter((function(t){if(t.spanId===c.spanId)return!0
t.endTimestamp||(t.endTimestamp=e,t.setStatus(o.a.Cancelled),r.a.log("[Tracing] cancelling span since transaction ended early",JSON.stringify(t,void 0,2)))
var n=t.startTimestamp<e
return n||r.a.log("[Tracing] discarding Span since it happened after Transaction was finished",JSON.stringify(t,void 0,2)),n})),r.a.log("[Tracing] flushing IdleTransaction")}else r.a.log("[Tracing] No active IdleTransaction")
return this._onScope&&l(this._idleHub),t.prototype.finish.call(this,e)},e.prototype.registerBeforeFinishCallback=function(t){this._beforeFinishCallbacks.push(t)},e.prototype.initSpanRecorder=function(t){var e=this
this.spanRecorder||(this.spanRecorder=new d((function(t){e._finished||e._pushActivity(t)}),(function(t){e._finished||e._popActivity(t)}),this.spanId,t),r.a.log("Starting heartbeat"),this._pingHeartbeat()),this.spanRecorder.add(this)},e.prototype._pushActivity=function(t){this._initTimeout&&(clearTimeout(this._initTimeout),this._initTimeout=void 0),r.a.log("[Tracing] pushActivity: "+t),this.activities[t]=!0,r.a.log("[Tracing] new activities count",Object.keys(this.activities).length)},e.prototype._popActivity=function(t){var e=this
if(this.activities[t]&&(r.a.log("[Tracing] popActivity "+t),delete this.activities[t],r.a.log("[Tracing] new activities count",Object.keys(this.activities).length)),0===Object.keys(this.activities).length){var n=this._idleTimeout,i=Object(a.e)()+n/1e3
setTimeout((function(){e._finished||e.finish(i)}),n)}},e.prototype._beat=function(){if(clearTimeout(this._heartbeatTimer),!this._finished){var t=Object.keys(this.activities),e=t.length?t.reduce((function(t,e){return t+e})):""
e===this._prevHeartbeatString?this._heartbeatCounter+=1:this._heartbeatCounter=1,this._prevHeartbeatString=e,this._heartbeatCounter>=3?(r.a.log("[Tracing] Transaction finished because of no change for 3 heart beats"),this.setStatus(o.a.DeadlineExceeded),this.setTag("heartbeat","failed"),this.finish()):this._pingHeartbeat()}},e.prototype._pingHeartbeat=function(){var t=this
r.a.log("pinging Heartbeat -> current counter: "+this._heartbeatCounter),this._heartbeatTimer=setTimeout((function(){t._beat()}),5e3)},e}(c.a)
function l(t){if(t){var e=t.getScope()
e&&e.getTransaction()&&e.setSpan(void 0)}}},433:function(t,e,n){"use strict"
n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return u}))
var i=n(0),a=n(5),r=n(47),s=n(6),o=n(430),c=function(){function t(t){void 0===t&&(t=1e3),this.spans=[],this._maxlen=t}return t.prototype.add=function(t){this.spans.length>this._maxlen?t.spanRecorder=void 0:this.spans.push(t)},t}(),u=function(){function t(t){if(this.traceId=Object(a.l)(),this.spanId=Object(a.l)().substring(16),this.startTimestamp=Object(r.e)(),this.tags={},this.data={},!t)return this
t.traceId&&(this.traceId=t.traceId),t.spanId&&(this.spanId=t.spanId),t.parentSpanId&&(this.parentSpanId=t.parentSpanId),"sampled"in t&&(this.sampled=t.sampled),t.op&&(this.op=t.op),t.description&&(this.description=t.description),t.data&&(this.data=t.data),t.tags&&(this.tags=t.tags),t.status&&(this.status=t.status),t.startTimestamp&&(this.startTimestamp=t.startTimestamp),t.endTimestamp&&(this.endTimestamp=t.endTimestamp)}return t.prototype.child=function(t){return this.startChild(t)},t.prototype.startChild=function(e){var n=new t(Object(i.a)(Object(i.a)({},e),{parentSpanId:this.spanId,sampled:this.sampled,traceId:this.traceId}))
return n.spanRecorder=this.spanRecorder,n.spanRecorder&&n.spanRecorder.add(n),n.transaction=this.transaction,n},t.prototype.setTag=function(t,e){var n
return this.tags=Object(i.a)(Object(i.a)({},this.tags),((n={})[t]=e,n)),this},t.prototype.setData=function(t,e){var n
return this.data=Object(i.a)(Object(i.a)({},this.data),((n={})[t]=e,n)),this},t.prototype.setStatus=function(t){return this.status=t,this},t.prototype.setHttpStatus=function(t){this.setTag("http.status_code",String(t))
var e=o.a.fromHttpCode(t)
return e!==o.a.UnknownError&&this.setStatus(e),this},t.prototype.isSuccess=function(){return this.status===o.a.Ok},t.prototype.finish=function(t){this.endTimestamp="number"==typeof t?t:Object(r.e)()},t.prototype.toTraceparent=function(){var t=""
return void 0!==this.sampled&&(t=this.sampled?"-1":"-0"),this.traceId+"-"+this.spanId+t},t.prototype.toContext=function(){return Object(s.a)({data:this.data,description:this.description,endTimestamp:this.endTimestamp,op:this.op,parentSpanId:this.parentSpanId,sampled:this.sampled,spanId:this.spanId,startTimestamp:this.startTimestamp,status:this.status,tags:this.tags,traceId:this.traceId})},t.prototype.updateWithContext=function(t){var e,n,i,a,r
return this.data=null!=(e=t.data)?e:{},this.description=t.description,this.endTimestamp=t.endTimestamp,this.op=t.op,this.parentSpanId=t.parentSpanId,this.sampled=t.sampled,this.spanId=null!=(n=t.spanId)?n:this.spanId,this.startTimestamp=null!=(i=t.startTimestamp)?i:this.startTimestamp,this.status=t.status,this.tags=null!=(a=t.tags)?a:{},this.traceId=null!=(r=t.traceId)?r:this.traceId,this},t.prototype.getTraceContext=function(){return Object(s.a)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,trace_id:this.traceId})},t.prototype.toJSON=function(){return Object(s.a)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,start_timestamp:this.startTimestamp,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,timestamp:this.endTimestamp,trace_id:this.traceId})},t}()},434:function(t,e,n){"use strict"
n.d(e,"a",(function(){return u}))
var i=n(0),a=n(428),r=n(4),s=n(11),o=n(6),c=n(433),u=function(t){function e(e,n){var i=t.call(this,e)||this
return i._measurements={},i._hub=Object(a.b)(),Object(r.g)(n,a.a)&&(i._hub=n),i.name=e.name||"",i.metadata=e.metadata||{},i._trimEnd=e.trimEnd,i.transaction=i,i}return Object(i.b)(e,t),e.prototype.setName=function(t){this.name=t},e.prototype.initSpanRecorder=function(t){void 0===t&&(t=1e3),this.spanRecorder||(this.spanRecorder=new c.b(t)),this.spanRecorder.add(this)},e.prototype.setMeasurements=function(t){this._measurements=Object(i.a)({},t)},e.prototype.setMetadata=function(t){this.metadata=Object(i.a)(Object(i.a)({},this.metadata),t)},e.prototype.finish=function(e){var n=this
if(void 0===this.endTimestamp){if(this.name||(s.a.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),this.name="<unlabeled transaction>"),t.prototype.finish.call(this,e),!0===this.sampled){var i=this.spanRecorder?this.spanRecorder.spans.filter((function(t){return t!==n&&t.endTimestamp})):[]
this._trimEnd&&i.length>0&&(this.endTimestamp=i.reduce((function(t,e){return t.endTimestamp&&e.endTimestamp?t.endTimestamp>e.endTimestamp?t:e:t})).endTimestamp)
var a={contexts:{trace:this.getTraceContext()},spans:i,start_timestamp:this.startTimestamp,tags:this.tags,timestamp:this.endTimestamp,transaction:this.name,type:"transaction",debug_meta:this.metadata}
return Object.keys(this._measurements).length>0&&(s.a.log("[Measurements] Adding measurements to transaction",JSON.stringify(this._measurements,void 0,2)),a.measurements=this._measurements),s.a.log("[Tracing] Finishing "+this.op+" transaction: "+this.name+"."),this._hub.captureEvent(a)}s.a.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.")}},e.prototype.toContext=function(){var e=t.prototype.toContext.call(this)
return Object(o.a)(Object(i.a)(Object(i.a)({},e),{name:this.name,trimEnd:this._trimEnd}))},e.prototype.updateWithContext=function(e){var n
return t.prototype.updateWithContext.call(this,e),this.name=null!=(n=e.name)?n:"",this._trimEnd=e.trimEnd,this},e}(c.a)},436:function(t,e,n){"use strict"
n.d(e,"a",(function(){return o}))
var i=n(52),a=n(11),r=n(430),s=n(429)
function o(){Object(i.a)({callback:c,type:"error"}),Object(i.a)({callback:c,type:"unhandledrejection"})}function c(){var t=Object(s.c)()
t&&(a.a.log("[Tracing] Transaction: "+r.a.InternalError+" -> Global error occured"),t.setStatus(r.a.InternalError))}}}])

//# sourceMappingURL=chunk.3.f80c7fbb7573ce508a05.map