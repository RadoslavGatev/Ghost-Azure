(window.webpackJsonp_ember_auto_import_=window.webpackJsonp_ember_auto_import_||[]).push([[3],{426:function(t,e,n){"use strict"
n.r(e),n.d(e,"Integrations",(function(){return Q})),n.d(e,"Span",(function(){return G.a})),n.d(e,"Transaction",(function(){return X.a})),n.d(e,"registerRequestInstrumentation",(function(){return D})),n.d(e,"defaultRequestInstrumentationOptions",(function(){return M})),n.d(e,"SpanStatus",(function(){return p.a})),n.d(e,"IdleTransaction",(function(){return d.b})),n.d(e,"startIdleTransaction",(function(){return u.b})),n.d(e,"addExtensionMethods",(function(){return u.a})),n.d(e,"extractTraceparentData",(function(){return l.b})),n.d(e,"getActiveTransaction",(function(){return l.c})),n.d(e,"hasTracingEnabled",(function(){return l.d})),n.d(e,"stripUrlQueryAndFragment",(function(){return c.k})),n.d(e,"TRACEPARENT_REGEXP",(function(){return l.a}))
var i={}
n.r(i),n.d(i,"Express",(function(){return P})),n.d(i,"Postgres",(function(){return B})),n.d(i,"Mysql",(function(){return U})),n.d(i,"Mongo",(function(){return J}))
var a,r,s=n(0),o=n(11),c=n(5),u=n(430),d=n(431),p=n(429),l=n(428),m=Object(c.f)(),h=n(10),f=n(47),v=n(20),g=function(t,e,n,i){var a
return function(){n&&e.isFinal&&n.disconnect(),e.value>=0&&(i||e.isFinal||"hidden"===document.visibilityState)&&(e.delta=e.value-(a||0),(e.delta||e.isFinal||void 0===a)&&(t(e),a=e.value))}},b=function(t,e){return void 0===e&&(e=-1),{name:t,value:e,delta:0,entries:[],id:Date.now()+"-"+(Math.floor(8999999999999*Math.random())+1e12),isFinal:!1}},_=function(t,e){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){var n=new PerformanceObserver((function(t){return t.getEntries().map(e)}))
return n.observe({type:t,buffered:!0}),n}}catch(t){}},y=!1,O=!1,T=function(t){y=!t.persisted},S=function(t,e){void 0===e&&(e=!1),O||(addEventListener("pagehide",T),addEventListener("beforeunload",(function(){})),O=!0),addEventListener("visibilitychange",(function(e){var n=e.timeStamp
"hidden"===document.visibilityState&&t({timeStamp:n,isUnloading:y})}),{capture:!0,once:e})},j=function(){return void 0===a&&(a="hidden"===document.visibilityState?0:1/0,S((function(t){var e=t.timeStamp
return a=e}),!0)),{get timeStamp(){return a}}},x=Object(c.f)(),I=function(){function t(){var t
this._measurements={},this._performanceCursor=0,!Object(h.b)()&&(null===(t=x)||void 0===t?void 0:t.performance)&&(x.performance.mark&&x.performance.mark("sentry-tracing-init"),this._trackCLS(),this._trackLCP(),this._trackFID())}return t.prototype.addPerformanceEntries=function(t){var e=this
if(x&&x.performance&&x.performance.getEntries&&f.b){o.a.log("[Tracing] Adding & adjusting spans using Performance API")
var n,i,a,r,s,c=Object(l.e)(f.b)
if(x.document)for(var u=0;u<document.scripts.length;u++)if("true"===document.scripts[u].dataset.entry){n=document.scripts[u].src
break}if(x.performance.getEntries().slice(this._performanceCursor).forEach((function(u){var d=Object(l.e)(u.startTime),p=Object(l.e)(u.duration)
if(!("navigation"===t.op&&c+d<t.startTimestamp))switch(u.entryType){case"navigation":!function(t,e,n){E({transaction:t,entry:e,event:"unloadEvent",timeOrigin:n}),E({transaction:t,entry:e,event:"redirect",timeOrigin:n}),E({transaction:t,entry:e,event:"domContentLoadedEvent",timeOrigin:n}),E({transaction:t,entry:e,event:"loadEvent",timeOrigin:n}),E({transaction:t,entry:e,event:"connect",timeOrigin:n}),E({transaction:t,entry:e,event:"secureConnection",timeOrigin:n,eventEnd:"connectEnd",description:"TLS/SSL"}),E({transaction:t,entry:e,event:"fetch",timeOrigin:n,eventEnd:"domainLookupStart",description:"cache"}),E({transaction:t,entry:e,event:"domainLookup",timeOrigin:n,description:"DNS"}),function(t,e,n){w(t,{op:"browser",description:"request",startTimestamp:n+Object(l.e)(e.requestStart),endTimestamp:n+Object(l.e)(e.responseEnd)}),w(t,{op:"browser",description:"response",startTimestamp:n+Object(l.e)(e.responseStart),endTimestamp:n+Object(l.e)(e.responseEnd)})}(t,e,n)}(t,u,c),r=c+Object(l.e)(u.responseStart),s=c+Object(l.e)(u.requestStart)
break
case"mark":case"paint":case"measure":var m=function(t,e,n,i,a){var r=a+n,s=r+i
return w(t,{description:e.name,endTimestamp:s,op:e.entryType,startTimestamp:r}),r}(t,u,d,p,c)
void 0===a&&"sentry-tracing-init"===u.name&&(a=m)
var h=j(),f=u.startTime<h.timeStamp
"first-paint"===u.name&&f&&(o.a.log("[Measurements] Adding FP"),e._measurements.fp={value:u.startTime},e._measurements["mark.fp"]={value:m}),"first-contentful-paint"===u.name&&f&&(o.a.log("[Measurements] Adding FCP"),e._measurements.fcp={value:u.startTime},e._measurements["mark.fcp"]={value:m})
break
case"resource":var v=u.name.replace(window.location.origin,""),g=function(t,e,n,i,a,r){if("xmlhttprequest"!==e.initiatorType&&"fetch"!==e.initiatorType){var s={}
"transferSize"in e&&(s["Transfer Size"]=e.transferSize),"encodedBodySize"in e&&(s["Encoded Body Size"]=e.encodedBodySize),"decodedBodySize"in e&&(s["Decoded Body Size"]=e.decodedBodySize)
var o=r+i,c=o+a
return w(t,{description:n,endTimestamp:c,op:e.initiatorType?"resource."+e.initiatorType:"resource",startTimestamp:o,data:s}),c}}(t,u,v,d,p,c)
void 0===i&&(n||"").indexOf(v)>-1&&(i=g)}})),void 0!==i&&void 0!==a&&w(t,{description:"evaluation",endTimestamp:a,op:"script",startTimestamp:i}),this._performanceCursor=Math.max(performance.getEntries().length-1,0),this._trackNavigator(t),"pageload"===t.op){var d=Object(l.e)(f.b)
"number"==typeof r&&(o.a.log("[Measurements] Adding TTFB"),this._measurements.ttfb={value:1e3*(r-t.startTimestamp)},"number"==typeof s&&s<=r&&(this._measurements["ttfb.requestTime"]={value:1e3*(r-s)})),["fcp","fp","lcp"].forEach((function(n){if(e._measurements[n]&&!(d>=t.startTimestamp)){var i=e._measurements[n].value,a=d+Object(l.e)(i),r=Math.abs(1e3*(a-t.startTimestamp)),s=r-i
o.a.log("[Measurements] Normalized "+n+" from "+i+" to "+r+" ("+s+")"),e._measurements[n].value=r}})),this._measurements["mark.fid"]&&this._measurements.fid&&w(t,{description:"first input delay",endTimestamp:this._measurements["mark.fid"].value+Object(l.e)(this._measurements.fid.value),op:"web.vitals",startTimestamp:this._measurements["mark.fid"].value}),t.setMeasurements(this._measurements),this._lcpEntry&&(o.a.log("[Measurements] Adding LCP Data"),this._lcpEntry.element&&t.setTag("lcp.element",Object(v.a)(this._lcpEntry.element)),this._lcpEntry.id&&t.setTag("lcp.id",this._lcpEntry.id),this._lcpEntry.url&&t.setTag("lcp.url",this._lcpEntry.url.trim().slice(0,200)),t.setTag("lcp.size",this._lcpEntry.size))}}},t.prototype._trackCLS=function(){var t=this
!function(t,e){void 0===e&&(e=!1)
var n,i=b("CLS",0),a=function(t){t.hadRecentInput||(i.value+=t.value,i.entries.push(t),n())},r=_("layout-shift",a)
r&&(n=g(t,i,r,e),S((function(t){var e=t.isUnloading
r.takeRecords().map(a),e&&(i.isFinal=!0),n()})))}((function(e){e.entries.pop()&&(o.a.log("[Measurements] Adding CLS"),t._measurements.cls={value:e.value})}))},t.prototype._trackNavigator=function(t){var e=x.navigator
if(e){var n=e.connection
n&&(n.effectiveType&&t.setTag("effectiveConnectionType",n.effectiveType),n.type&&t.setTag("connectionType",n.type),C(n.rtt)&&(this._measurements["connection.rtt"]={value:n.rtt}),C(n.downlink)&&(this._measurements["connection.downlink"]={value:n.downlink})),C(e.deviceMemory)&&t.setTag("deviceMemory",String(e.deviceMemory)),C(e.hardwareConcurrency)&&t.setTag("hardwareConcurrency",String(e.hardwareConcurrency))}},t.prototype._trackLCP=function(){var t=this;(function(t,e){void 0===e&&(e=!1)
var n,i=b("LCP"),a=j(),s=function(t){var e=t.startTime
e<a.timeStamp?(i.value=e,i.entries.push(t)):i.isFinal=!0,n()},o=_("largest-contentful-paint",s)
if(o){n=g(t,i,o,e)
var c=function(){i.isFinal||(o.takeRecords().map(s),i.isFinal=!0,n())};(r||(r=new Promise((function(t){return["scroll","keydown","pointerdown"].map((function(e){addEventListener(e,t,{once:!0,passive:!0,capture:!0})}))}))),r).then(c),S(c,!0)}})((function(e){var n=e.entries.pop()
if(n){var i=Object(l.e)(f.b),a=Object(l.e)(n.startTime)
o.a.log("[Measurements] Adding LCP"),t._measurements.lcp={value:e.value},t._measurements["mark.lcp"]={value:i+a},t._lcpEntry=n}}))},t.prototype._trackFID=function(){var t=this
!function(t){var e=b("FID"),n=j(),i=function(t){t.startTime<n.timeStamp&&(e.value=t.processingStart-t.startTime,e.entries.push(t),e.isFinal=!0,r())},a=_("first-input",i),r=g(t,e,a)
a?S((function(){a.takeRecords().map(i),a.disconnect()}),!0):window.perfMetrics&&window.perfMetrics.onFirstInputDelay&&window.perfMetrics.onFirstInputDelay((function(t,i){i.timeStamp<n.timeStamp&&(e.value=t,e.isFinal=!0,e.entries=[{entryType:"first-input",name:i.type,target:i.target,cancelable:i.cancelable,startTime:i.timeStamp,processingStart:i.timeStamp+t}],r())}))}((function(e){var n=e.entries.pop()
if(n){var i=Object(l.e)(f.b),a=Object(l.e)(n.startTime)
o.a.log("[Measurements] Adding FID"),t._measurements.fid={value:e.value},t._measurements["mark.fid"]={value:i+a}}}))},t}()
function E(t){var e=t.transaction,n=t.entry,i=t.event,a=t.timeOrigin,r=t.eventEnd,s=t.description,o=r?n[r]:n[i+"End"],c=n[i+"Start"]
c&&o&&w(e,{op:"browser",description:null!=s?s:i,startTimestamp:a+Object(l.e)(c),endTimestamp:a+Object(l.e)(o)})}function w(t,e){var n=e.startTimestamp,i=Object(s.d)(e,["startTimestamp"])
return n&&t.startTimestamp>n&&(t.startTimestamp=n),t.startChild(Object(s.a)({startTimestamp:n},i))}function C(t){return"number"==typeof t&&isFinite(t)}var k=n(9),R=n(52),A=n(4),M={traceFetch:!0,traceXHR:!0,tracingOrigins:["localhost",/^\//]}
function D(t){var e=Object(s.a)(Object(s.a)({},M),t),n=e.traceFetch,i=e.traceXHR,a=e.tracingOrigins,r=e.shouldCreateSpanForRequest,o={},c=function(t){if(o[t])return o[t]
var e=a
return o[t]=e.some((function(e){return Object(k.a)(t,e)}))&&!Object(k.a)(t,"sentry_key"),o[t]},u=c
"function"==typeof r&&(u=function(t){return c(t)&&r(t)})
var d={}
n&&Object(R.a)({callback:function(t){!function(t,e,n){if(Object(l.d)()&&t.fetchData&&e(t.fetchData.url))if(t.endTimestamp&&t.fetchData.__span)(a=n[t.fetchData.__span])&&(t.response?a.setHttpStatus(t.response.status):t.error&&a.setStatus(p.a.InternalError),a.finish(),delete n[t.fetchData.__span])
else{var i=Object(l.c)()
if(i){var a=i.startChild({data:Object(s.a)(Object(s.a)({},t.fetchData),{type:"fetch"}),description:t.fetchData.method+" "+t.fetchData.url,op:"http"})
t.fetchData.__span=a.spanId,n[a.spanId]=a
var r=t.args[0]=t.args[0],o=t.args[1]=t.args[1]||{},c=o.headers
Object(A.g)(r,Request)&&(c=r.headers),c?"function"==typeof c.append?c.append("sentry-trace",a.toTraceparent()):c=Array.isArray(c)?Object(s.e)(c,[["sentry-trace",a.toTraceparent()]]):Object(s.a)(Object(s.a)({},c),{"sentry-trace":a.toTraceparent()}):c={"sentry-trace":a.toTraceparent()},o.headers=c}}}(t,u,d)},type:"fetch"}),i&&Object(R.a)({callback:function(t){!function(t,e,n){var i,a
if(Object(l.d)()&&!(null===(i=t.xhr)||void 0===i?void 0:i.__sentry_own_request__)&&(null===(a=t.xhr)||void 0===a?void 0:a.__sentry_xhr__)&&e(t.xhr.__sentry_xhr__.url)){var r=t.xhr.__sentry_xhr__
if(t.endTimestamp&&t.xhr.__sentry_xhr_span_id__)(c=n[t.xhr.__sentry_xhr_span_id__])&&(c.setHttpStatus(r.status_code),c.finish(),delete n[t.xhr.__sentry_xhr_span_id__])
else{var o=Object(l.c)()
if(o){var c=o.startChild({data:Object(s.a)(Object(s.a)({},r.data),{type:"xhr",method:r.method,url:r.url}),description:r.method+" "+r.url,op:"http"})
if(t.xhr.__sentry_xhr_span_id__=c.spanId,n[t.xhr.__sentry_xhr_span_id__]=c,t.xhr.setRequestHeader)try{t.xhr.setRequestHeader("sentry-trace",c.toTraceparent())}catch(t){}}}}}(t,u,d)},type:"xhr"})}var F=Object(c.f)(),N=Object(s.a)({idleTimeout:d.a,markBackgroundTransactions:!0,maxTransactionDuration:600,routingInstrumentation:function(t,e,n){if(void 0===e&&(e=!0),void 0===n&&(n=!0),F&&F.location){var i,a=F.location.href
e&&(i=t({name:F.location.pathname,op:"pageload"})),n&&Object(R.a)({callback:function(e){var n=e.to,r=e.from
void 0===r&&a&&-1!==a.indexOf(n)?a=void 0:r!==n&&(a=void 0,i&&(o.a.log("[Tracing] Finishing current transaction with op: "+i.op),i.finish()),i=t({name:F.location.pathname,op:"navigation"}))},type:"history"})}else o.a.warn("Could not initialize routing instrumentation due to invalid location")},startTransactionOnLocationChange:!0,startTransactionOnPageLoad:!0},M),q=function(){function t(e){this.name=t.id,this._metrics=new I,this._emitOptionsWarning=!1
var n=M.tracingOrigins
e&&e.tracingOrigins&&Array.isArray(e.tracingOrigins)&&0!==e.tracingOrigins.length?n=e.tracingOrigins:this._emitOptionsWarning=!0,this.options=Object(s.a)(Object(s.a)(Object(s.a)({},N),e),{tracingOrigins:n})}return t.prototype.setupOnce=function(t,e){var n=this
this._getCurrentHub=e,this._emitOptionsWarning&&(o.a.warn("[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace."),o.a.warn("[Tracing] We added a reasonable default for you: "+M.tracingOrigins))
var i=this.options,a=i.routingInstrumentation,r=i.startTransactionOnLocationChange,s=i.startTransactionOnPageLoad,c=i.markBackgroundTransactions,u=i.traceFetch,d=i.traceXHR,h=i.tracingOrigins,f=i.shouldCreateSpanForRequest
a((function(t){return n._createRouteTransaction(t)}),s,r),c&&(m&&m.document?m.document.addEventListener("visibilitychange",(function(){var t=Object(l.c)()
m.document.hidden&&t&&(o.a.log("[Tracing] Transaction: "+p.a.Cancelled+" -> since tab moved to the background, op: "+t.op),t.status||t.setStatus(p.a.Cancelled),t.setTag("visibilitychange","document.hidden"),t.finish())})):o.a.warn("[Tracing] Could not set up background tab detection due to lack of global document")),D({traceFetch:u,traceXHR:d,tracingOrigins:h,shouldCreateSpanForRequest:f})},t.prototype._createRouteTransaction=function(t){var e=this
if(this._getCurrentHub){var n=this.options,i=n.beforeNavigate,a=n.idleTimeout,r=n.maxTransactionDuration,d="pageload"===t.op?function(){var t,e=("sentry-trace",(t=document.querySelector("meta[name=sentry-trace]"))?t.getAttribute("content"):null)
if(e)return Object(l.b)(e)}():void 0,m=Object(s.a)(Object(s.a)(Object(s.a)({},t),d),{trimEnd:!0}),h="function"==typeof i?i(m):m,f=void 0===h?Object(s.a)(Object(s.a)({},m),{sampled:!1}):h
!1===f.sampled&&o.a.log("[Tracing] Will not send "+f.op+" transaction because of beforeNavigate."),o.a.log("[Tracing] Starting "+f.op+" transaction on scope")
var v=this._getCurrentHub(),g=Object(c.f)().location,b=Object(u.b)(v,f,a,!0,{location:g})
return b.registerBeforeFinishCallback((function(t,n){e._metrics.addPerformanceEntries(t),function(t,e,n){var i=n-e.startTimestamp
n&&(i>t||i<0)&&(e.setStatus(p.a.DeadlineExceeded),e.setTag("maxTransactionDurationExceeded","true"))}(Object(l.f)(r),t,n)})),b}o.a.warn("[Tracing] Did not create "+t.op+" transaction because _getCurrentHub is invalid.")},t.id="BrowserTracing",t}(),P=function(){function t(e){void 0===e&&(e={}),this.name=t.id,this._router=e.router||e.app,this._methods=(Array.isArray(e.methods)?e.methods:[]).concat("use")}return t.prototype.setupOnce=function(){this._router?function(t,e){void 0===e&&(e=[]),e.forEach((function(e){return function(t,e){var n=t[e]
return t[e]=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i]
return n.call.apply(n,Object(s.e)([this],L(t,e)))},t}(t,e)}))}(this._router,this._methods):o.a.error("ExpressIntegration is missing an Express instance")},t.id="Express",t}()
function H(t,e){var n=t.length
switch(n){case 2:return function(n,i){var a=i.__sentry_transaction
if(a){var r=a.startChild({description:t.name,op:"middleware."+e})
i.once("finish",(function(){r.finish()}))}return t.call(this,n,i)}
case 3:return function(n,i,a){var r,o=null===(r=i.__sentry_transaction)||void 0===r?void 0:r.startChild({description:t.name,op:"middleware."+e})
t.call(this,n,i,(function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n]
null===(t=o)||void 0===t||t.finish(),a.call.apply(a,Object(s.e)([this],e))}))}
case 4:return function(n,i,a,r){var o,c=null===(o=a.__sentry_transaction)||void 0===o?void 0:o.startChild({description:t.name,op:"middleware."+e})
t.call(this,n,i,a,(function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n]
null===(t=c)||void 0===t||t.finish(),r.call.apply(r,Object(s.e)([this],e))}))}
default:throw new Error("Express middleware takes 2-4 arguments. Got: "+n)}}function L(t,e){return t.map((function(t){return"function"==typeof t?H(t,e):Array.isArray(t)?t.map((function(t){return"function"==typeof t?H(t,e):t})):t}))}var z=n(6),B=function(){function t(){this.name=t.id}return t.prototype.setupOnce=function(t,e){var n=Object(h.c)("pg")
n?Object(z.c)(n.Client.prototype,"query",(function(t){return function(n,i,a){var r,s,o,c=null===(s=null===(r=e().getScope())||void 0===r?void 0:r.getSpan())||void 0===s?void 0:s.startChild({description:"string"==typeof n?n:n.text,op:"db"})
if("function"==typeof a)return t.call(this,n,i,(function(t,e){var n
null===(n=c)||void 0===n||n.finish(),a(t,e)}))
if("function"==typeof i)return t.call(this,n,(function(t,e){var n
null===(n=c)||void 0===n||n.finish(),i(t,e)}))
var u=void 0!==i?t.call(this,n,i):t.call(this,n)
return Object(A.m)(u)?u.then((function(t){var e
return null===(e=c)||void 0===e||e.finish(),t})):(null===(o=c)||void 0===o||o.finish(),u)}})):o.a.error("Postgres Integration was unable to require `pg` package.")},t.id="Postgres",t}(),U=function(){function t(){this.name=t.id}return t.prototype.setupOnce=function(t,e){var n=Object(h.c)("mysql/lib/Connection.js")
n?Object(z.c)(n,"createQuery",(function(t){return function(n,i,a){var r,s,o=null===(s=null===(r=e().getScope())||void 0===r?void 0:r.getSpan())||void 0===s?void 0:s.startChild({description:"string"==typeof n?n:n.sql,op:"db"})
return"function"==typeof a?t.call(this,n,i,(function(t,e,n){var i
null===(i=o)||void 0===i||i.finish(),a(t,e,n)})):"function"==typeof i?t.call(this,n,(function(t,e,n){var a
null===(a=o)||void 0===a||a.finish(),i(t,e,n)})):t.call(this,n,i,a)}})):o.a.error("Mysql Integration was unable to require `mysql` package.")},t.id="Mysql",t}(),Y=["aggregate","bulkWrite","countDocuments","createIndex","createIndexes","deleteMany","deleteOne","distinct","drop","dropIndex","dropIndexes","estimatedDocumentCount","find","findOne","findOneAndDelete","findOneAndReplace","findOneAndUpdate","indexes","indexExists","indexInformation","initializeOrderedBulkOp","insertMany","insertOne","isCapped","mapReduce","options","parallelCollectionScan","rename","replaceOne","stats","updateMany","updateOne"],W={bulkWrite:["operations"],countDocuments:["query"],createIndex:["fieldOrSpec"],createIndexes:["indexSpecs"],deleteMany:["filter"],deleteOne:["filter"],distinct:["key","query"],dropIndex:["indexName"],find:["query"],findOne:["query"],findOneAndDelete:["filter"],findOneAndReplace:["filter","replacement"],findOneAndUpdate:["filter","update"],indexExists:["indexes"],insertMany:["docs"],insertOne:["doc"],mapReduce:["map","reduce"],rename:["newName"],replaceOne:["filter","doc"],updateMany:["filter","update"],updateOne:["filter","update"]},J=function(){function t(e){void 0===e&&(e={}),this.name=t.id,this._operations=Array.isArray(e.operations)?e.operations:Y,this._describeOperations=!("describeOperations"in e)||e.describeOperations,this._useMongoose=!!e.useMongoose}return t.prototype.setupOnce=function(t,e){var n=this._useMongoose?"mongoose":"mongodb",i=Object(h.c)(n)
i?this._instrumentOperations(i.Collection,this._operations,e):o.a.error("Mongo Integration was unable to require `"+n+"` package.")},t.prototype._instrumentOperations=function(t,e,n){var i=this
e.forEach((function(e){return i._patchOperation(t,e,n)}))},t.prototype._patchOperation=function(t,e,n){if(e in t.prototype){var i=this._getSpanContextFromOperationArguments.bind(this)
Object(z.c)(t.prototype,e,(function(t){return function(){for(var a,r,o,c,u=[],d=0;d<arguments.length;d++)u[d]=arguments[d]
var p=u[u.length-1],l=n().getScope(),m=null===(a=l)||void 0===a?void 0:a.getSpan()
if("function"!=typeof p||"mapReduce"===e&&2===u.length){var h=null===(r=m)||void 0===r?void 0:r.startChild(i(this,e,u)),f=t.call.apply(t,Object(s.e)([this],u))
return Object(A.m)(f)?f.then((function(t){var e
return null===(e=h)||void 0===e||e.finish(),t})):(null===(o=h)||void 0===o||o.finish(),f)}var v=null===(c=m)||void 0===c?void 0:c.startChild(i(this,e,u.slice(0,-1)))
return t.call.apply(t,Object(s.e)([this],u.slice(0,-1),[function(t,e){var n
null===(n=v)||void 0===n||n.finish(),p(t,e)}]))}}))}},t.prototype._getSpanContextFromOperationArguments=function(t,e,n){var i={collectionName:t.collectionName,dbName:t.dbName,namespace:t.namespace},a={op:"db",description:e,data:i},r=W[e],o=Array.isArray(this._describeOperations)?this._describeOperations.includes(e):this._describeOperations
if(!r||!o)return a
try{if("mapReduce"===e){var c=Object(s.c)(n,2),u=c[0],d=c[1]
i[r[0]]="string"==typeof u?u:u.name||"<anonymous>",i[r[1]]="string"==typeof d?d:d.name||"<anonymous>"}else for(var p=0;p<r.length;p++)i[r[p]]=JSON.stringify(n[p])}catch(t){}return a},t.id="Mongo",t}(),G=n(432),X=n(433),Q=Object(s.a)(Object(s.a)({},i),{BrowserTracing:q})
Object(u.a)()},428:function(t,e,n){"use strict"
n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return r})),n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"e",(function(){return c})),n.d(e,"f",(function(){return u}))
var i=n(427),a=new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$")
function r(t){var e
return void 0===t&&(t=null===(e=Object(i.b)().getClient())||void 0===e?void 0:e.getOptions()),!!t&&("tracesSampleRate"in t||"tracesSampler"in t)}function s(t){var e=t.match(a)
if(e){var n=void 0
return"1"===e[3]?n=!0:"0"===e[3]&&(n=!1),{traceId:e[1],parentSampled:n,parentSpanId:e[2]}}}function o(t){var e,n
return void 0===t&&(t=Object(i.b)()),null===(n=null===(e=t)||void 0===e?void 0:e.getScope())||void 0===n?void 0:n.getTransaction()}function c(t){return t/1e3}function u(t){return 1e3*t}},429:function(t,e,n){"use strict"
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
default:return t.InternalError}return t.UnknownError}}(i||(i={}))},430:function(t,e,n){"use strict";(function(t){n.d(e,"b",(function(){return f})),n.d(e,"a",(function(){return v}))
var i=n(0),a=n(427),r=n(53),s=n(11),o=n(10),c=n(435),u=n(431),d=n(433),p=n(428)
function l(){var t=this.getScope()
if(t){var e=t.getSpan()
if(e)return{"sentry-trace":e.toTraceparent()}}return{}}function m(t,e,n){return Object(p.d)()?void 0!==t.sampled?(t.setMetadata({transactionSampling:{method:r.a.Explicit}}),t):("function"==typeof e.tracesSampler?(i=e.tracesSampler(n),t.setMetadata({transactionSampling:{method:r.a.Sampler,rate:Number(i)}})):void 0!==n.parentSampled?(i=n.parentSampled,t.setMetadata({transactionSampling:{method:r.a.Inheritance}})):(i=e.tracesSampleRate,t.setMetadata({transactionSampling:{method:r.a.Rate,rate:Number(i)}})),function(t){return isNaN(t)||"number"!=typeof t&&"boolean"!=typeof t?(s.a.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got "+JSON.stringify(t)+" of type "+JSON.stringify(typeof t)+"."),!1):!(t<0||t>1)||(s.a.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got "+t+"."),!1)}(i)?i?(t.sampled=Math.random()<i,t.sampled?(s.a.log("[Tracing] starting "+t.op+" transaction - "+t.name),t):(s.a.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = "+Number(i)+")"),t)):(s.a.log("[Tracing] Discarding transaction because "+("function"==typeof e.tracesSampler?"tracesSampler returned 0 or false":"a negative sampling decision was inherited or tracesSampleRate is set to 0")),t.sampled=!1,t):(s.a.warn("[Tracing] Discarding transaction because of invalid sample rate."),t.sampled=!1,t)):(t.sampled=!1,t)
var i}function h(t,e){var n,a,r=(null===(n=this.getClient())||void 0===n?void 0:n.getOptions())||{},s=new d.a(t,this)
return(s=m(s,r,Object(i.a)({parentSampled:t.parentSampled,transactionContext:t},e))).sampled&&s.initSpanRecorder(null===(a=r._experiments)||void 0===a?void 0:a.maxSpans),s}function f(t,e,n,a,r){var s,o,c=(null===(s=t.getClient())||void 0===s?void 0:s.getOptions())||{},d=new u.b(e,t,n,a)
return(d=m(d,c,Object(i.a)({parentSampled:e.parentSampled,transactionContext:e},r))).sampled&&d.initSpanRecorder(null===(o=c._experiments)||void 0===o?void 0:o.maxSpans),d}function v(){var e;(e=Object(a.d)()).__SENTRY__&&(e.__SENTRY__.extensions=e.__SENTRY__.extensions||{},e.__SENTRY__.extensions.startTransaction||(e.__SENTRY__.extensions.startTransaction=h),e.__SENTRY__.extensions.traceHeaders||(e.__SENTRY__.extensions.traceHeaders=l)),Object(o.b)()&&function(){var e=Object(a.d)()
if(e.__SENTRY__){var n={mongodb:function(){return new(Object(o.a)(t,"./integrations/mongo").Mongo)},mongoose:function(){return new(Object(o.a)(t,"./integrations/mongo").Mongo)({mongoose:!0})},mysql:function(){return new(Object(o.a)(t,"./integrations/mysql").Mysql)},pg:function(){return new(Object(o.a)(t,"./integrations/postgres").Postgres)}},r=Object.keys(n).filter((function(t){return!!Object(o.c)(t)})).map((function(t){try{return n[t]()}catch(t){return}})).filter((function(t){return t}))
r.length>0&&(e.__SENTRY__.integrations=Object(i.e)(e.__SENTRY__.integrations||[],r))}}(),Object(c.a)()}}).call(this,n(29)(t))},431:function(t,e,n){"use strict"
n.d(e,"a",(function(){return u})),n.d(e,"b",(function(){return p}))
var i=n(0),a=n(47),r=n(11),s=n(432),o=n(429),c=n(433),u=1e3,d=function(t){function e(e,n,i,a){void 0===i&&(i="")
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
e&&e.getTransaction()&&e.setSpan(void 0)}}},432:function(t,e,n){"use strict"
n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return u}))
var i=n(0),a=n(5),r=n(47),s=n(6),o=n(429),c=function(){function t(t){void 0===t&&(t=1e3),this.spans=[],this._maxlen=t}return t.prototype.add=function(t){this.spans.length>this._maxlen?t.spanRecorder=void 0:this.spans.push(t)},t}(),u=function(){function t(t){if(this.traceId=Object(a.l)(),this.spanId=Object(a.l)().substring(16),this.startTimestamp=Object(r.e)(),this.tags={},this.data={},!t)return this
t.traceId&&(this.traceId=t.traceId),t.spanId&&(this.spanId=t.spanId),t.parentSpanId&&(this.parentSpanId=t.parentSpanId),"sampled"in t&&(this.sampled=t.sampled),t.op&&(this.op=t.op),t.description&&(this.description=t.description),t.data&&(this.data=t.data),t.tags&&(this.tags=t.tags),t.status&&(this.status=t.status),t.startTimestamp&&(this.startTimestamp=t.startTimestamp),t.endTimestamp&&(this.endTimestamp=t.endTimestamp)}return t.prototype.child=function(t){return this.startChild(t)},t.prototype.startChild=function(e){var n=new t(Object(i.a)(Object(i.a)({},e),{parentSpanId:this.spanId,sampled:this.sampled,traceId:this.traceId}))
return n.spanRecorder=this.spanRecorder,n.spanRecorder&&n.spanRecorder.add(n),n.transaction=this.transaction,n},t.prototype.setTag=function(t,e){var n
return this.tags=Object(i.a)(Object(i.a)({},this.tags),((n={})[t]=e,n)),this},t.prototype.setData=function(t,e){var n
return this.data=Object(i.a)(Object(i.a)({},this.data),((n={})[t]=e,n)),this},t.prototype.setStatus=function(t){return this.status=t,this},t.prototype.setHttpStatus=function(t){this.setTag("http.status_code",String(t))
var e=o.a.fromHttpCode(t)
return e!==o.a.UnknownError&&this.setStatus(e),this},t.prototype.isSuccess=function(){return this.status===o.a.Ok},t.prototype.finish=function(t){this.endTimestamp="number"==typeof t?t:Object(r.e)()},t.prototype.toTraceparent=function(){var t=""
return void 0!==this.sampled&&(t=this.sampled?"-1":"-0"),this.traceId+"-"+this.spanId+t},t.prototype.toContext=function(){return Object(s.a)({data:this.data,description:this.description,endTimestamp:this.endTimestamp,op:this.op,parentSpanId:this.parentSpanId,sampled:this.sampled,spanId:this.spanId,startTimestamp:this.startTimestamp,status:this.status,tags:this.tags,traceId:this.traceId})},t.prototype.updateWithContext=function(t){var e,n,i,a,r
return this.data=null!=(e=t.data)?e:{},this.description=t.description,this.endTimestamp=t.endTimestamp,this.op=t.op,this.parentSpanId=t.parentSpanId,this.sampled=t.sampled,this.spanId=null!=(n=t.spanId)?n:this.spanId,this.startTimestamp=null!=(i=t.startTimestamp)?i:this.startTimestamp,this.status=t.status,this.tags=null!=(a=t.tags)?a:{},this.traceId=null!=(r=t.traceId)?r:this.traceId,this},t.prototype.getTraceContext=function(){return Object(s.a)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,trace_id:this.traceId})},t.prototype.toJSON=function(){return Object(s.a)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,start_timestamp:this.startTimestamp,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,timestamp:this.endTimestamp,trace_id:this.traceId})},t}()},433:function(t,e,n){"use strict"
n.d(e,"a",(function(){return u}))
var i=n(0),a=n(427),r=n(4),s=n(11),o=n(6),c=n(432),u=function(t){function e(e,n){var i=t.call(this,e)||this
return i._measurements={},i._hub=Object(a.b)(),Object(r.g)(n,a.a)&&(i._hub=n),i.name=e.name||"",i.metadata=e.metadata||{},i._trimEnd=e.trimEnd,i.transaction=i,i}return Object(i.b)(e,t),e.prototype.setName=function(t){this.name=t},e.prototype.initSpanRecorder=function(t){void 0===t&&(t=1e3),this.spanRecorder||(this.spanRecorder=new c.b(t)),this.spanRecorder.add(this)},e.prototype.setMeasurements=function(t){this._measurements=Object(i.a)({},t)},e.prototype.setMetadata=function(t){this.metadata=Object(i.a)(Object(i.a)({},this.metadata),t)},e.prototype.finish=function(e){var n=this
if(void 0===this.endTimestamp){if(this.name||(s.a.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),this.name="<unlabeled transaction>"),t.prototype.finish.call(this,e),!0===this.sampled){var i=this.spanRecorder?this.spanRecorder.spans.filter((function(t){return t!==n&&t.endTimestamp})):[]
this._trimEnd&&i.length>0&&(this.endTimestamp=i.reduce((function(t,e){return t.endTimestamp&&e.endTimestamp?t.endTimestamp>e.endTimestamp?t:e:t})).endTimestamp)
var a={contexts:{trace:this.getTraceContext()},spans:i,start_timestamp:this.startTimestamp,tags:this.tags,timestamp:this.endTimestamp,transaction:this.name,type:"transaction",debug_meta:this.metadata}
return Object.keys(this._measurements).length>0&&(s.a.log("[Measurements] Adding measurements to transaction",JSON.stringify(this._measurements,void 0,2)),a.measurements=this._measurements),s.a.log("[Tracing] Finishing "+this.op+" transaction: "+this.name+"."),this._hub.captureEvent(a)}s.a.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.")}},e.prototype.toContext=function(){var e=t.prototype.toContext.call(this)
return Object(o.a)(Object(i.a)(Object(i.a)({},e),{name:this.name,trimEnd:this._trimEnd}))},e.prototype.updateWithContext=function(e){var n
return t.prototype.updateWithContext.call(this,e),this.name=null!=(n=e.name)?n:"",this._trimEnd=e.trimEnd,this},e}(c.a)},435:function(t,e,n){"use strict"
n.d(e,"a",(function(){return o}))
var i=n(52),a=n(11),r=n(429),s=n(428)
function o(){Object(i.a)({callback:c,type:"error"}),Object(i.a)({callback:c,type:"unhandledrejection"})}function c(){var t=Object(s.c)()
t&&(a.a.log("[Tracing] Transaction: "+r.a.InternalError+" -> Global error occured"),t.setStatus(r.a.InternalError))}}}])

//# sourceMappingURL=chunk.3.d7dfbdfb494969a0bc46.map