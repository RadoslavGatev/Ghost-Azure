(window.webpackJsonp_ember_auto_import_=window.webpackJsonp_ember_auto_import_||[]).push([[3],{604:function(t,e,n){"use strict"
n.r(e),n.d(e,"Integrations",(function(){return i})),n.d(e,"BrowserTracing",(function(){return Y})),n.d(e,"Span",(function(){return W.a})),n.d(e,"Transaction",(function(){return J.a})),n.d(e,"registerRequestInstrumentation",(function(){return B})),n.d(e,"defaultRequestInstrumentationOptions",(function(){return L})),n.d(e,"SpanStatus",(function(){return y.a})),n.d(e,"IdleTransaction",(function(){return _.b})),n.d(e,"startIdleTransaction",(function(){return a.b})),n.d(e,"addExtensionMethods",(function(){return a.a})),n.d(e,"extractTraceparentData",(function(){return O.b})),n.d(e,"getActiveTransaction",(function(){return O.c})),n.d(e,"hasTracingEnabled",(function(){return O.d})),n.d(e,"stripUrlQueryAndFragment",(function(){return G.i})),n.d(e,"TRACEPARENT_REGEXP",(function(){return O.a}))
var i={}
n.r(i),n.d(i,"Express",(function(){return o})),n.d(i,"Postgres",(function(){return m})),n.d(i,"Mysql",(function(){return h})),n.d(i,"Mongo",(function(){return g})),n.d(i,"BrowserTracing",(function(){return Y}))
var a=n(608),r=n(0),s=n(19),o=function(){function t(e){void 0===e&&(e={}),this.name=t.id,this._router=e.router||e.app,this._methods=(Array.isArray(e.methods)?e.methods:[]).concat("use")}return t.prototype.setupOnce=function(){this._router?function(t,e){void 0===e&&(e=[]),e.forEach((function(e){return function(t,e){var n=t[e]
return t[e]=function(){for(var t=[],i=0;i<arguments.length;i++)t[i]=arguments[i]
return n.call.apply(n,Object(r.e)([this],u(t,e)))},t}(t,e)}))}(this._router,this._methods):s.b.error("ExpressIntegration is missing an Express instance")},t.id="Express",t}()
function c(t,e){var n=t.length
switch(n){case 2:return function(n,i){var a=i.__sentry_transaction
if(a){var r=a.startChild({description:t.name,op:"express.middleware."+e})
i.once("finish",(function(){r.finish()}))}return t.call(this,n,i)}
case 3:return function(n,i,a){var s,o=null===(s=i.__sentry_transaction)||void 0===s?void 0:s.startChild({description:t.name,op:"express.middleware."+e})
t.call(this,n,i,(function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n]
null===(t=o)||void 0===t||t.finish(),a.call.apply(a,Object(r.e)([this],e))}))}
case 4:return function(n,i,a,s){var o,c=null===(o=a.__sentry_transaction)||void 0===o?void 0:o.startChild({description:t.name,op:"express.middleware."+e})
t.call(this,n,i,a,(function(){for(var t,e=[],n=0;n<arguments.length;n++)e[n]=arguments[n]
null===(t=c)||void 0===t||t.finish(),s.call.apply(s,Object(r.e)([this],e))}))}
default:throw new Error("Express middleware takes 2-4 arguments. Got: "+n)}}function u(t,e){return t.map((function(t){return"function"==typeof t?c(t,e):Array.isArray(t)?t.map((function(t){return"function"==typeof t?c(t,e):t})):t}))}var d=n(18),p=n(7),l=n(4),m=function(){function t(e){void 0===e&&(e={}),this.name=t.id,this._usePgNative=!!e.usePgNative}return t.prototype.setupOnce=function(t,e){var n,i=Object(d.c)("pg")
if(i)if(!this._usePgNative||(null===(n=i.native)||void 0===n?void 0:n.Client)){var a=(this._usePgNative?i.native:i).Client
Object(p.c)(a.prototype,"query",(function(t){return function(n,i,a){var r,s,o,c=null===(s=null===(r=e().getScope())||void 0===r?void 0:r.getSpan())||void 0===s?void 0:s.startChild({description:"string"==typeof n?n:n.text,op:"db"})
if("function"==typeof a)return t.call(this,n,i,(function(t,e){var n
null===(n=c)||void 0===n||n.finish(),a(t,e)}))
if("function"==typeof i)return t.call(this,n,(function(t,e){var n
null===(n=c)||void 0===n||n.finish(),i(t,e)}))
var u=void 0!==i?t.call(this,n,i):t.call(this,n)
return Object(l.m)(u)?u.then((function(t){var e
return null===(e=c)||void 0===e||e.finish(),t})):(null===(o=c)||void 0===o||o.finish(),u)}}))}else s.b.error("Postgres Integration was unable to access 'pg-native' bindings.")
else s.b.error("Postgres Integration was unable to require `pg` package.")},t.id="Postgres",t}(),h=function(){function t(){this.name=t.id}return t.prototype.setupOnce=function(t,e){var n=Object(d.c)("mysql/lib/Connection.js")
n?Object(p.c)(n,"createQuery",(function(t){return function(n,i,a){var r,s,o=null===(s=null===(r=e().getScope())||void 0===r?void 0:r.getSpan())||void 0===s?void 0:s.startChild({description:"string"==typeof n?n:n.sql,op:"db"})
return"function"==typeof a?t.call(this,n,i,(function(t,e,n){var i
null===(i=o)||void 0===i||i.finish(),a(t,e,n)})):"function"==typeof i?t.call(this,n,(function(t,e,n){var a
null===(a=o)||void 0===a||a.finish(),i(t,e,n)})):t.call(this,n,i,a)}})):s.b.error("Mysql Integration was unable to require `mysql` package.")},t.id="Mysql",t}(),f=["aggregate","bulkWrite","countDocuments","createIndex","createIndexes","deleteMany","deleteOne","distinct","drop","dropIndex","dropIndexes","estimatedDocumentCount","find","findOne","findOneAndDelete","findOneAndReplace","findOneAndUpdate","indexes","indexExists","indexInformation","initializeOrderedBulkOp","insertMany","insertOne","isCapped","mapReduce","options","parallelCollectionScan","rename","replaceOne","stats","updateMany","updateOne"],v={bulkWrite:["operations"],countDocuments:["query"],createIndex:["fieldOrSpec"],createIndexes:["indexSpecs"],deleteMany:["filter"],deleteOne:["filter"],distinct:["key","query"],dropIndex:["indexName"],find:["query"],findOne:["query"],findOneAndDelete:["filter"],findOneAndReplace:["filter","replacement"],findOneAndUpdate:["filter","update"],indexExists:["indexes"],insertMany:["docs"],insertOne:["doc"],mapReduce:["map","reduce"],rename:["newName"],replaceOne:["filter","doc"],updateMany:["filter","update"],updateOne:["filter","update"]},g=function(){function t(e){void 0===e&&(e={}),this.name=t.id,this._operations=Array.isArray(e.operations)?e.operations:f,this._describeOperations=!("describeOperations"in e)||e.describeOperations,this._useMongoose=!!e.useMongoose}return t.prototype.setupOnce=function(t,e){var n=this._useMongoose?"mongoose":"mongodb",i=Object(d.c)(n)
i?this._instrumentOperations(i.Collection,this._operations,e):s.b.error("Mongo Integration was unable to require `"+n+"` package.")},t.prototype._instrumentOperations=function(t,e,n){var i=this
e.forEach((function(e){return i._patchOperation(t,e,n)}))},t.prototype._patchOperation=function(t,e,n){if(e in t.prototype){var i=this._getSpanContextFromOperationArguments.bind(this)
Object(p.c)(t.prototype,e,(function(t){return function(){for(var a,s,o,c,u=[],d=0;d<arguments.length;d++)u[d]=arguments[d]
var p=u[u.length-1],m=n().getScope(),h=null===(a=m)||void 0===a?void 0:a.getSpan()
if("function"!=typeof p||"mapReduce"===e&&2===u.length){var f=null===(s=h)||void 0===s?void 0:s.startChild(i(this,e,u)),v=t.call.apply(t,Object(r.e)([this],u))
return Object(l.m)(v)?v.then((function(t){var e
return null===(e=f)||void 0===e||e.finish(),t})):(null===(o=f)||void 0===o||o.finish(),v)}var g=null===(c=h)||void 0===c?void 0:c.startChild(i(this,e,u.slice(0,-1)))
return t.call.apply(t,Object(r.e)([this],u.slice(0,-1),[function(t,e){var n
null===(n=g)||void 0===n||n.finish(),p(t,e)}]))}}))}},t.prototype._getSpanContextFromOperationArguments=function(t,e,n){var i={collectionName:t.collectionName,dbName:t.dbName,namespace:t.namespace},a={op:"db",description:e,data:i},s=v[e],o=Array.isArray(this._describeOperations)?this._describeOperations.includes(e):this._describeOperations
if(!s||!o)return a
try{if("mapReduce"===e){var c=Object(r.c)(n,2),u=c[0],d=c[1]
i[s[0]]="string"==typeof u?u:u.name||"<anonymous>",i[s[1]]="string"==typeof d?d:d.name||"<anonymous>"}else for(var p=0;p<s.length;p++)i[s[p]]=JSON.stringify(n[p])}catch(t){}return a},t.id="Mongo",t}(),b=n(5),_=n(609),y=n(607),O=n(606),T=n(613),j=Object(b.a)(),S=n(80),E=n(31),x=function(t,e,n){var i
return function(a){e.value>=0&&(a||n)&&(e.delta=e.value-(i||0),(e.delta||void 0===i)&&(i=e.value,t(e)))}},I=function(t,e){return{name:t,value:null!=e?e:-1,delta:0,entries:[],id:"v2-"+Date.now()+"-"+(Math.floor(8999999999999*Math.random())+1e12)}},C=function(t,e){try{if(PerformanceObserver.supportedEntryTypes.includes(t)){if("first-input"===t&&!("PerformanceEventTiming"in self))return
var n=new PerformanceObserver((function(t){return t.getEntries().map(e)}))
return n.observe({type:t,buffered:!0}),n}}catch(t){}},k=function(t,e){var n=function(i){"pagehide"!==i.type&&"hidden"!==Object(b.a)().document.visibilityState||(t(i),e&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))}
addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)},w=-1,R=function(){return w<0&&(w="hidden"===Object(b.a)().document.visibilityState?0:1/0,k((function(t){var e=t.timeStamp
w=e}),!0)),{get firstHiddenTime(){return w}}},A={},M=Object(b.a)(),N=function(){function t(t){var e,n
void 0===t&&(t=!1),this._reportAllChanges=t,this._measurements={},this._performanceCursor=0,!Object(d.b)()&&(null===(e=M)||void 0===e?void 0:e.performance)&&(null===(n=M)||void 0===n?void 0:n.document)&&(M.performance.mark&&M.performance.mark("sentry-tracing-init"),this._trackCLS(),this._trackLCP(),this._trackFID())}return t.prototype.addPerformanceEntries=function(t){var e=this
if(M&&M.performance&&M.performance.getEntries&&S.b){s.b.log("[Tracing] Adding & adjusting spans using Performance API")
var n,i,a,r,o,c=Object(O.e)(S.b)
if(M.document&&M.document.scripts)for(var u=0;u<M.document.scripts.length;u++)if("true"===M.document.scripts[u].dataset.entry){n=M.document.scripts[u].src
break}if(M.performance.getEntries().slice(this._performanceCursor).forEach((function(u){var d=Object(O.e)(u.startTime),p=Object(O.e)(u.duration)
if(!("navigation"===t.op&&c+d<t.startTimestamp))switch(u.entryType){case"navigation":!function(t,e,n){D({transaction:t,entry:e,event:"unloadEvent",timeOrigin:n}),D({transaction:t,entry:e,event:"redirect",timeOrigin:n}),D({transaction:t,entry:e,event:"domContentLoadedEvent",timeOrigin:n}),D({transaction:t,entry:e,event:"loadEvent",timeOrigin:n}),D({transaction:t,entry:e,event:"connect",timeOrigin:n}),D({transaction:t,entry:e,event:"secureConnection",timeOrigin:n,eventEnd:"connectEnd",description:"TLS/SSL"}),D({transaction:t,entry:e,event:"fetch",timeOrigin:n,eventEnd:"domainLookupStart",description:"cache"}),D({transaction:t,entry:e,event:"domainLookup",timeOrigin:n,description:"DNS"}),function(t,e,n){q(t,{op:"browser",description:"request",startTimestamp:n+Object(O.e)(e.requestStart),endTimestamp:n+Object(O.e)(e.responseEnd)}),q(t,{op:"browser",description:"response",startTimestamp:n+Object(O.e)(e.responseStart),endTimestamp:n+Object(O.e)(e.responseEnd)})}(t,e,n)}(t,u,c),r=c+Object(O.e)(u.responseStart),o=c+Object(O.e)(u.requestStart)
break
case"mark":case"paint":case"measure":var l=function(t,e,n,i,a){var r=a+n,s=r+i
return q(t,{description:e.name,endTimestamp:s,op:e.entryType,startTimestamp:r}),r}(t,u,d,p,c)
void 0===a&&"sentry-tracing-init"===u.name&&(a=l)
var m=R(),h=u.startTime<m.firstHiddenTime
"first-paint"===u.name&&h&&(s.b.log("[Measurements] Adding FP"),e._measurements.fp={value:u.startTime},e._measurements["mark.fp"]={value:l}),"first-contentful-paint"===u.name&&h&&(s.b.log("[Measurements] Adding FCP"),e._measurements.fcp={value:u.startTime},e._measurements["mark.fcp"]={value:l})
break
case"resource":var f=u.name.replace(M.location.origin,""),v=function(t,e,n,i,a,r){if("xmlhttprequest"!==e.initiatorType&&"fetch"!==e.initiatorType){var s={}
"transferSize"in e&&(s["Transfer Size"]=e.transferSize),"encodedBodySize"in e&&(s["Encoded Body Size"]=e.encodedBodySize),"decodedBodySize"in e&&(s["Decoded Body Size"]=e.decodedBodySize)
var o=r+i,c=o+a
return q(t,{description:n,endTimestamp:c,op:e.initiatorType?"resource."+e.initiatorType:"resource",startTimestamp:o,data:s}),c}}(t,u,f,d,p,c)
void 0===i&&(n||"").indexOf(f)>-1&&(i=v)}})),void 0!==i&&void 0!==a&&q(t,{description:"evaluation",endTimestamp:a,op:"script",startTimestamp:i}),this._performanceCursor=Math.max(performance.getEntries().length-1,0),this._trackNavigator(t),"pageload"===t.op){var d=Object(O.e)(S.b)
"number"==typeof r&&(s.b.log("[Measurements] Adding TTFB"),this._measurements.ttfb={value:1e3*(r-t.startTimestamp)},"number"==typeof o&&o<=r&&(this._measurements["ttfb.requestTime"]={value:1e3*(r-o)})),["fcp","fp","lcp"].forEach((function(n){if(e._measurements[n]&&!(d>=t.startTimestamp)){var i=e._measurements[n].value,a=d+Object(O.e)(i),r=Math.abs(1e3*(a-t.startTimestamp)),o=r-i
s.b.log("[Measurements] Normalized "+n+" from "+i+" to "+r+" ("+o+")"),e._measurements[n].value=r}})),this._measurements["mark.fid"]&&this._measurements.fid&&q(t,{description:"first input delay",endTimestamp:this._measurements["mark.fid"].value+Object(O.e)(this._measurements.fid.value),op:"web.vitals",startTimestamp:this._measurements["mark.fid"].value}),"fcp"in this._measurements||delete this._measurements.cls,t.setMeasurements(this._measurements),this._tagMetricInfo(t),t.setTag("sentry_reportAllChanges",this._reportAllChanges)}}},t.prototype._tagMetricInfo=function(t){this._lcpEntry&&(s.b.log("[Measurements] Adding LCP Data"),this._lcpEntry.element&&t.setTag("lcp.element",Object(E.b)(this._lcpEntry.element)),this._lcpEntry.id&&t.setTag("lcp.id",this._lcpEntry.id),this._lcpEntry.url&&t.setTag("lcp.url",this._lcpEntry.url.trim().slice(0,200)),t.setTag("lcp.size",this._lcpEntry.size)),this._clsEntry&&this._clsEntry.sources&&(s.b.log("[Measurements] Adding CLS Data"),this._clsEntry.sources.forEach((function(e,n){return t.setTag("cls.source."+(n+1),Object(E.b)(e.node))})))},t.prototype._trackCLS=function(){var t=this
!function(t,e){var n,i=I("CLS",0),a=0,r=[],s=function(t){if(t&&!t.hadRecentInput){var e=r[0],s=r[r.length-1]
a&&0!==r.length&&t.startTime-s.startTime<1e3&&t.startTime-e.startTime<5e3?(a+=t.value,r.push(t)):(a=t.value,r=[t]),a>i.value&&(i.value=a,i.entries=r,n&&n())}},o=C("layout-shift",s)
o&&(n=x(t,i,void 0),k((function(){o.takeRecords().map(s),n(!0)})))}((function(e){var n=e.entries.pop()
n&&(s.b.log("[Measurements] Adding CLS"),t._measurements.cls={value:e.value},t._clsEntry=n)}))},t.prototype._trackNavigator=function(t){var e=M.navigator
if(e){var n=e.connection
n&&(n.effectiveType&&t.setTag("effectiveConnectionType",n.effectiveType),n.type&&t.setTag("connectionType",n.type),P(n.rtt)&&(this._measurements["connection.rtt"]={value:n.rtt}),P(n.downlink)&&(this._measurements["connection.downlink"]={value:n.downlink})),P(e.deviceMemory)&&t.setTag("deviceMemory",String(e.deviceMemory)),P(e.hardwareConcurrency)&&t.setTag("hardwareConcurrency",String(e.hardwareConcurrency))}},t.prototype._trackLCP=function(){var t=this
!function(t,e){var n,i=R(),a=I("LCP"),r=function(t){var e=t.startTime
e<i.firstHiddenTime&&(a.value=e,a.entries.push(t)),n&&n()},s=C("largest-contentful-paint",r)
if(s){n=x(t,a,e)
var o=function(){A[a.id]||(s.takeRecords().map(r),s.disconnect(),A[a.id]=!0,n(!0))};["keydown","click"].forEach((function(t){addEventListener(t,o,{once:!0,capture:!0})})),k(o,!0)}}((function(e){var n=e.entries.pop()
if(n){var i=Object(O.e)(S.b),a=Object(O.e)(n.startTime)
s.b.log("[Measurements] Adding LCP"),t._measurements.lcp={value:e.value},t._measurements["mark.lcp"]={value:i+a},t._lcpEntry=n}}),this._reportAllChanges)},t.prototype._trackFID=function(){var t=this
!function(t,e){var n,i=R(),a=I("FID"),r=function(t){n&&t.startTime<i.firstHiddenTime&&(a.value=t.processingStart-t.startTime,a.entries.push(t),n(!0))},s=C("first-input",r)
s&&(n=x(t,a,void 0),k((function(){s.takeRecords().map(r),s.disconnect()}),!0))}((function(e){var n=e.entries.pop()
if(n){var i=Object(O.e)(S.b),a=Object(O.e)(n.startTime)
s.b.log("[Measurements] Adding FID"),t._measurements.fid={value:e.value},t._measurements["mark.fid"]={value:i+a}}}))},t}()
function D(t){var e=t.transaction,n=t.entry,i=t.event,a=t.timeOrigin,r=t.eventEnd,s=t.description,o=r?n[r]:n[i+"End"],c=n[i+"Start"]
c&&o&&q(e,{op:"browser",description:null!=s?s:i,startTimestamp:a+Object(O.e)(c),endTimestamp:a+Object(O.e)(o)})}function q(t,e){var n=e.startTimestamp,i=Object(r.d)(e,["startTimestamp"])
return n&&t.startTimestamp>n&&(t.startTimestamp=n),t.startChild(Object(r.a)({startTimestamp:n},i))}function P(t){return"number"==typeof t&&isFinite(t)}var F=n(13),H=n(89),L={traceFetch:!0,traceXHR:!0,tracingOrigins:["localhost",/^\//]}
function B(t){var e=Object(r.a)(Object(r.a)({},L),t),n=e.traceFetch,i=e.traceXHR,a=e.tracingOrigins,s=e.shouldCreateSpanForRequest,o={},c=function(t){if(o[t])return o[t]
var e=a
return o[t]=e.some((function(e){return Object(F.b)(t,e)}))&&!Object(F.b)(t,"sentry_key"),o[t]},u=c
"function"==typeof s&&(u=function(t){return c(t)&&s(t)})
var d={}
n&&Object(H.a)({callback:function(t){!function(t,e,n){if(Object(O.d)()&&t.fetchData&&e(t.fetchData.url))if(t.endTimestamp&&t.fetchData.__span)(a=n[t.fetchData.__span])&&(t.response?a.setHttpStatus(t.response.status):t.error&&a.setStatus(y.a.InternalError),a.finish(),delete n[t.fetchData.__span])
else{var i=Object(O.c)()
if(i){var a=i.startChild({data:Object(r.a)(Object(r.a)({},t.fetchData),{type:"fetch"}),description:t.fetchData.method+" "+t.fetchData.url,op:"http.client"})
t.fetchData.__span=a.spanId,n[a.spanId]=a
var s=t.args[0]=t.args[0],o=t.args[1]=t.args[1]||{},c=o.headers
Object(l.g)(s,Request)&&(c=s.headers),c?"function"==typeof c.append?c.append("sentry-trace",a.toTraceparent()):c=Array.isArray(c)?Object(r.e)(c,[["sentry-trace",a.toTraceparent()]]):Object(r.a)(Object(r.a)({},c),{"sentry-trace":a.toTraceparent()}):c={"sentry-trace":a.toTraceparent()},o.headers=c}}}(t,u,d)},type:"fetch"}),i&&Object(H.a)({callback:function(t){!function(t,e,n){var i,a
if(Object(O.d)()&&!(null===(i=t.xhr)||void 0===i?void 0:i.__sentry_own_request__)&&(null===(a=t.xhr)||void 0===a?void 0:a.__sentry_xhr__)&&e(t.xhr.__sentry_xhr__.url)){var s=t.xhr.__sentry_xhr__
if(t.endTimestamp&&t.xhr.__sentry_xhr_span_id__)(c=n[t.xhr.__sentry_xhr_span_id__])&&(c.setHttpStatus(s.status_code),c.finish(),delete n[t.xhr.__sentry_xhr_span_id__])
else{var o=Object(O.c)()
if(o){var c=o.startChild({data:Object(r.a)(Object(r.a)({},s.data),{type:"xhr",method:s.method,url:s.url}),description:s.method+" "+s.url,op:"http.client"})
if(t.xhr.__sentry_xhr_span_id__=c.spanId,n[t.xhr.__sentry_xhr_span_id__]=c,t.xhr.setRequestHeader)try{t.xhr.setRequestHeader("sentry-trace",c.toTraceparent())}catch(t){}}}}}(t,u,d)},type:"xhr"})}var z=Object(b.a)(),U=Object(r.a)({idleTimeout:_.a,markBackgroundTransactions:!0,maxTransactionDuration:600,routingInstrumentation:function(t,e,n){if(void 0===e&&(e=!0),void 0===n&&(n=!0),z&&z.location){var i,a=z.location.href
e&&(i=t({name:z.location.pathname,op:"pageload"})),n&&Object(H.a)({callback:function(e){var n=e.to,r=e.from
void 0===r&&a&&-1!==a.indexOf(n)?a=void 0:r!==n&&(a=void 0,i&&(s.b.log("[Tracing] Finishing current transaction with op: "+i.op),i.finish()),i=t({name:z.location.pathname,op:"navigation"}))},type:"history"})}else s.b.warn("Could not initialize routing instrumentation due to invalid location")},startTransactionOnLocationChange:!0,startTransactionOnPageLoad:!0},L),Y=function(){function t(e){this.name=t.id,this._emitOptionsWarning=!1,this._configuredIdleTimeout=void 0
var n=L.tracingOrigins
e&&(this._configuredIdleTimeout=e.idleTimeout,e.tracingOrigins&&Array.isArray(e.tracingOrigins)&&0!==e.tracingOrigins.length?n=e.tracingOrigins:this._emitOptionsWarning=!0),this.options=Object(r.a)(Object(r.a)(Object(r.a)({},U),e),{tracingOrigins:n})
var i=this.options._metricOptions
this._metrics=new N(i&&i._reportAllChanges)}return t.prototype.setupOnce=function(t,e){var n=this
this._getCurrentHub=e,this._emitOptionsWarning&&(s.b.warn("[Tracing] You need to define `tracingOrigins` in the options. Set an array of urls or patterns to trace."),s.b.warn("[Tracing] We added a reasonable default for you: "+L.tracingOrigins))
var i=this.options,a=i.routingInstrumentation,r=i.startTransactionOnLocationChange,o=i.startTransactionOnPageLoad,c=i.markBackgroundTransactions,u=i.traceFetch,d=i.traceXHR,p=i.tracingOrigins,l=i.shouldCreateSpanForRequest
a((function(t){return n._createRouteTransaction(t)}),o,r),c&&(j&&j.document?j.document.addEventListener("visibilitychange",(function(){var t=Object(O.c)()
j.document.hidden&&t&&(s.b.log("[Tracing] Transaction: "+y.a.Cancelled+" -> since tab moved to the background, op: "+t.op),t.status||t.setStatus(y.a.Cancelled),t.setTag("visibilitychange","document.hidden"),t.setTag(T.a,T.b[2]),t.finish())})):s.b.warn("[Tracing] Could not set up background tab detection due to lack of global document")),B({traceFetch:u,traceXHR:d,tracingOrigins:p,shouldCreateSpanForRequest:l})},t.prototype._createRouteTransaction=function(t){var e=this
if(this._getCurrentHub){var n=this.options,i=n.beforeNavigate,o=n.idleTimeout,c=n.maxTransactionDuration,u="pageload"===t.op?function(){var t,e=("sentry-trace",(t=Object(b.a)().document.querySelector("meta[name=sentry-trace]"))?t.getAttribute("content"):null)
if(e)return Object(O.b)(e)}():void 0,d=Object(r.a)(Object(r.a)(Object(r.a)({},t),u),{trimEnd:!0}),p="function"==typeof i?i(d):d,l=void 0===p?Object(r.a)(Object(r.a)({},d),{sampled:!1}):p
!1===l.sampled&&s.b.log("[Tracing] Will not send "+l.op+" transaction because of beforeNavigate."),s.b.log("[Tracing] Starting "+l.op+" transaction on scope")
var m=this._getCurrentHub(),h=Object(b.a)().location,f=Object(a.b)(m,l,o,!0,{location:h})
return f.registerBeforeFinishCallback((function(t,n){e._metrics.addPerformanceEntries(t),function(t,e,n){var i=n-e.startTimestamp
n&&(i>t||i<0)&&(e.setStatus(y.a.DeadlineExceeded),e.setTag("maxTransactionDurationExceeded","true"))}(Object(O.f)(c),t,n)})),f.setTag("idleTimeout",this._configuredIdleTimeout),f}s.b.warn("[Tracing] Did not create "+t.op+" transaction because _getCurrentHub is invalid.")},t.id="BrowserTracing",t}(),W=n(610),J=n(611),G=n(82)
Object(a.a)()},606:function(t,e,n){"use strict"
n.d(e,"a",(function(){return a})),n.d(e,"d",(function(){return r})),n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"e",(function(){return c})),n.d(e,"f",(function(){return u}))
var i=n(605),a=new RegExp("^[ \\t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \\t]*$")
function r(t){var e
return void 0===t&&(t=null===(e=Object(i.b)().getClient())||void 0===e?void 0:e.getOptions()),!!t&&("tracesSampleRate"in t||"tracesSampler"in t)}function s(t){var e=t.match(a)
if(e){var n=void 0
return"1"===e[3]?n=!0:"0"===e[3]&&(n=!1),{traceId:e[1],parentSampled:n,parentSpanId:e[2]}}}function o(t){var e,n
return void 0===t&&(t=Object(i.b)()),null===(n=null===(e=t)||void 0===e?void 0:e.getScope())||void 0===n?void 0:n.getTransaction()}function c(t){return t/1e3}function u(t){return 1e3*t}},607:function(t,e,n){"use strict"
var i
n.d(e,"a",(function(){return i})),function(t){t.Ok="ok",t.DeadlineExceeded="deadline_exceeded",t.Unauthenticated="unauthenticated",t.PermissionDenied="permission_denied",t.NotFound="not_found",t.ResourceExhausted="resource_exhausted",t.InvalidArgument="invalid_argument",t.Unimplemented="unimplemented",t.Unavailable="unavailable",t.InternalError="internal_error",t.UnknownError="unknown_error",t.Cancelled="cancelled",t.AlreadyExists="already_exists",t.FailedPrecondition="failed_precondition",t.Aborted="aborted",t.OutOfRange="out_of_range",t.DataLoss="data_loss"}(i||(i={})),function(t){t.fromHttpCode=function(e){if(e<400&&e>=100)return t.Ok
if(e>=400&&e<500)switch(e){case 401:return t.Unauthenticated
case 403:return t.PermissionDenied
case 404:return t.NotFound
case 409:return t.AlreadyExists
case 413:return t.FailedPrecondition
case 429:return t.ResourceExhausted
default:return t.InvalidArgument}if(e>=500&&e<600)switch(e){case 501:return t.Unimplemented
case 503:return t.Unavailable
case 504:return t.DeadlineExceeded
default:return t.InternalError}return t.UnknownError}}(i||(i={}))},608:function(t,e,n){"use strict";(function(t){n.d(e,"b",(function(){return f})),n.d(e,"a",(function(){return v}))
var i=n(0),a=n(605),r=n(90),s=n(19),o=n(18),c=n(614),u=n(609),d=n(611),p=n(606)
function l(){var t=this.getScope()
if(t){var e=t.getSpan()
if(e)return{"sentry-trace":e.toTraceparent()}}return{}}function m(t,e,n){return Object(p.d)(e)?void 0!==t.sampled?(t.setMetadata({transactionSampling:{method:r.a.Explicit}}),t):("function"==typeof e.tracesSampler?(i=e.tracesSampler(n),t.setMetadata({transactionSampling:{method:r.a.Sampler,rate:Number(i)}})):void 0!==n.parentSampled?(i=n.parentSampled,t.setMetadata({transactionSampling:{method:r.a.Inheritance}})):(i=e.tracesSampleRate,t.setMetadata({transactionSampling:{method:r.a.Rate,rate:Number(i)}})),function(t){return isNaN(t)||"number"!=typeof t&&"boolean"!=typeof t?(s.b.warn("[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got "+JSON.stringify(t)+" of type "+JSON.stringify(typeof t)+"."),!1):!(t<0||t>1)||(s.b.warn("[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got "+t+"."),!1)}(i)?i?(t.sampled=Math.random()<i,t.sampled?(s.b.log("[Tracing] starting "+t.op+" transaction - "+t.name),t):(s.b.log("[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = "+Number(i)+")"),t)):(s.b.log("[Tracing] Discarding transaction because "+("function"==typeof e.tracesSampler?"tracesSampler returned 0 or false":"a negative sampling decision was inherited or tracesSampleRate is set to 0")),t.sampled=!1,t):(s.b.warn("[Tracing] Discarding transaction because of invalid sample rate."),t.sampled=!1,t)):(t.sampled=!1,t)
var i}function h(t,e){var n,a,r=(null===(n=this.getClient())||void 0===n?void 0:n.getOptions())||{},s=new d.a(t,this)
return(s=m(s,r,Object(i.a)({parentSampled:t.parentSampled,transactionContext:t},e))).sampled&&s.initSpanRecorder(null===(a=r._experiments)||void 0===a?void 0:a.maxSpans),s}function f(t,e,n,a,r){var s,o,c=(null===(s=t.getClient())||void 0===s?void 0:s.getOptions())||{},d=new u.b(e,t,n,a)
return(d=m(d,c,Object(i.a)({parentSampled:e.parentSampled,transactionContext:e},r))).sampled&&d.initSpanRecorder(null===(o=c._experiments)||void 0===o?void 0:o.maxSpans),d}function v(){var e;(e=Object(a.d)()).__SENTRY__&&(e.__SENTRY__.extensions=e.__SENTRY__.extensions||{},e.__SENTRY__.extensions.startTransaction||(e.__SENTRY__.extensions.startTransaction=h),e.__SENTRY__.extensions.traceHeaders||(e.__SENTRY__.extensions.traceHeaders=l)),Object(o.b)()&&function(){var e=Object(a.d)()
if(e.__SENTRY__){var n={mongodb:function(){return new(Object(o.a)(t,"./integrations/node/mongo").Mongo)},mongoose:function(){return new(Object(o.a)(t,"./integrations/node/mongo").Mongo)({mongoose:!0})},mysql:function(){return new(Object(o.a)(t,"./integrations/node/mysql").Mysql)},pg:function(){return new(Object(o.a)(t,"./integrations/node/postgres").Postgres)}},r=Object.keys(n).filter((function(t){return!!Object(o.c)(t)})).map((function(t){try{return n[t]()}catch(t){return}})).filter((function(t){return t}))
r.length>0&&(e.__SENTRY__.integrations=Object(i.e)(e.__SENTRY__.integrations||[],r))}}(),Object(c.a)()}}).call(this,n(46)(t))},609:function(t,e,n){"use strict"
n.d(e,"a",(function(){return d})),n.d(e,"b",(function(){return l}))
var i=n(0),a=n(80),r=n(19),s=n(613),o=n(610),c=n(607),u=n(611),d=1e3,p=function(t){function e(e,n,i,a){void 0===i&&(i="")
var r=t.call(this,a)||this
return r._pushActivity=e,r._popActivity=n,r.transactionSpanId=i,r}return Object(i.b)(e,t),e.prototype.add=function(e){var n=this
e.spanId!==this.transactionSpanId&&(e.finish=function(t){e.endTimestamp="number"==typeof t?t:Object(a.e)(),n._popActivity(e.spanId)},void 0===e.endTimestamp&&this._pushActivity(e.spanId)),t.prototype.add.call(this,e)},e}(o.b),l=function(t){function e(e,n,i,a){void 0===i&&(i=d),void 0===a&&(a=!1)
var s=t.call(this,e,n)||this
return s._idleHub=n,s._idleTimeout=i,s._onScope=a,s.activities={},s._heartbeatCounter=0,s._finished=!1,s._beforeFinishCallbacks=[],n&&a&&(m(n),r.b.log("Setting idle transaction on scope. Span ID: "+s.spanId),n.configureScope((function(t){return t.setSpan(s)}))),s._initTimeout=setTimeout((function(){s._finished||s.finish()}),s._idleTimeout),s}return Object(i.b)(e,t),e.prototype.finish=function(e){var n,s,o=this
if(void 0===e&&(e=Object(a.e)()),this._finished=!0,this.activities={},this.spanRecorder){r.b.log("[Tracing] finishing IdleTransaction",new Date(1e3*e).toISOString(),this.op)
try{for(var u=Object(i.f)(this._beforeFinishCallbacks),d=u.next();!d.done;d=u.next())(0,d.value)(this,e)}catch(t){n={error:t}}finally{try{d&&!d.done&&(s=u.return)&&s.call(u)}finally{if(n)throw n.error}}this.spanRecorder.spans=this.spanRecorder.spans.filter((function(t){if(t.spanId===o.spanId)return!0
t.endTimestamp||(t.endTimestamp=e,t.setStatus(c.a.Cancelled),r.b.log("[Tracing] cancelling span since transaction ended early",JSON.stringify(t,void 0,2)))
var n=t.startTimestamp<e
return n||r.b.log("[Tracing] discarding Span since it happened after Transaction was finished",JSON.stringify(t,void 0,2)),n})),r.b.log("[Tracing] flushing IdleTransaction")}else r.b.log("[Tracing] No active IdleTransaction")
return this._onScope&&m(this._idleHub),t.prototype.finish.call(this,e)},e.prototype.registerBeforeFinishCallback=function(t){this._beforeFinishCallbacks.push(t)},e.prototype.initSpanRecorder=function(t){var e=this
this.spanRecorder||(this.spanRecorder=new p((function(t){e._finished||e._pushActivity(t)}),(function(t){e._finished||e._popActivity(t)}),this.spanId,t),r.b.log("Starting heartbeat"),this._pingHeartbeat()),this.spanRecorder.add(this)},e.prototype._pushActivity=function(t){this._initTimeout&&(clearTimeout(this._initTimeout),this._initTimeout=void 0),r.b.log("[Tracing] pushActivity: "+t),this.activities[t]=!0,r.b.log("[Tracing] new activities count",Object.keys(this.activities).length)},e.prototype._popActivity=function(t){var e=this
if(this.activities[t]&&(r.b.log("[Tracing] popActivity "+t),delete this.activities[t],r.b.log("[Tracing] new activities count",Object.keys(this.activities).length)),0===Object.keys(this.activities).length){var n=this._idleTimeout,i=Object(a.e)()+n/1e3
setTimeout((function(){e._finished||(e.setTag(s.a,s.b[1]),e.finish(i))}),n)}},e.prototype._beat=function(){if(!this._finished){var t=Object.keys(this.activities).join("")
t===this._prevHeartbeatString?this._heartbeatCounter+=1:this._heartbeatCounter=1,this._prevHeartbeatString=t,this._heartbeatCounter>=3?(r.b.log("[Tracing] Transaction finished because of no change for 3 heart beats"),this.setStatus(c.a.DeadlineExceeded),this.setTag(s.a,s.b[0]),this.finish()):this._pingHeartbeat()}},e.prototype._pingHeartbeat=function(){var t=this
r.b.log("pinging Heartbeat -> current counter: "+this._heartbeatCounter),setTimeout((function(){t._beat()}),5e3)},e}(u.a)
function m(t){if(t){var e=t.getScope()
e&&e.getTransaction()&&e.setSpan(void 0)}}},610:function(t,e,n){"use strict"
n.d(e,"b",(function(){return c})),n.d(e,"a",(function(){return u}))
var i=n(0),a=n(82),r=n(80),s=n(7),o=n(607),c=function(){function t(t){void 0===t&&(t=1e3),this.spans=[],this._maxlen=t}return t.prototype.add=function(t){this.spans.length>this._maxlen?t.spanRecorder=void 0:this.spans.push(t)},t}(),u=function(){function t(t){if(this.traceId=Object(a.j)(),this.spanId=Object(a.j)().substring(16),this.startTimestamp=Object(r.e)(),this.tags={},this.data={},!t)return this
t.traceId&&(this.traceId=t.traceId),t.spanId&&(this.spanId=t.spanId),t.parentSpanId&&(this.parentSpanId=t.parentSpanId),"sampled"in t&&(this.sampled=t.sampled),t.op&&(this.op=t.op),t.description&&(this.description=t.description),t.data&&(this.data=t.data),t.tags&&(this.tags=t.tags),t.status&&(this.status=t.status),t.startTimestamp&&(this.startTimestamp=t.startTimestamp),t.endTimestamp&&(this.endTimestamp=t.endTimestamp)}return t.prototype.child=function(t){return this.startChild(t)},t.prototype.startChild=function(e){var n=new t(Object(i.a)(Object(i.a)({},e),{parentSpanId:this.spanId,sampled:this.sampled,traceId:this.traceId}))
return n.spanRecorder=this.spanRecorder,n.spanRecorder&&n.spanRecorder.add(n),n.transaction=this.transaction,n},t.prototype.setTag=function(t,e){var n
return this.tags=Object(i.a)(Object(i.a)({},this.tags),((n={})[t]=e,n)),this},t.prototype.setData=function(t,e){var n
return this.data=Object(i.a)(Object(i.a)({},this.data),((n={})[t]=e,n)),this},t.prototype.setStatus=function(t){return this.status=t,this},t.prototype.setHttpStatus=function(t){this.setTag("http.status_code",String(t))
var e=o.a.fromHttpCode(t)
return e!==o.a.UnknownError&&this.setStatus(e),this},t.prototype.isSuccess=function(){return this.status===o.a.Ok},t.prototype.finish=function(t){this.endTimestamp="number"==typeof t?t:Object(r.e)()},t.prototype.toTraceparent=function(){var t=""
return void 0!==this.sampled&&(t=this.sampled?"-1":"-0"),this.traceId+"-"+this.spanId+t},t.prototype.toContext=function(){return Object(s.a)({data:this.data,description:this.description,endTimestamp:this.endTimestamp,op:this.op,parentSpanId:this.parentSpanId,sampled:this.sampled,spanId:this.spanId,startTimestamp:this.startTimestamp,status:this.status,tags:this.tags,traceId:this.traceId})},t.prototype.updateWithContext=function(t){var e,n,i,a,r
return this.data=null!=(e=t.data)?e:{},this.description=t.description,this.endTimestamp=t.endTimestamp,this.op=t.op,this.parentSpanId=t.parentSpanId,this.sampled=t.sampled,this.spanId=null!=(n=t.spanId)?n:this.spanId,this.startTimestamp=null!=(i=t.startTimestamp)?i:this.startTimestamp,this.status=t.status,this.tags=null!=(a=t.tags)?a:{},this.traceId=null!=(r=t.traceId)?r:this.traceId,this},t.prototype.getTraceContext=function(){return Object(s.a)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,trace_id:this.traceId})},t.prototype.toJSON=function(){return Object(s.a)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,start_timestamp:this.startTimestamp,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,timestamp:this.endTimestamp,trace_id:this.traceId})},t}()},611:function(t,e,n){"use strict"
n.d(e,"a",(function(){return d}))
var i=n(0),a=n(605),r=n(86),s=n(4),o=n(19),c=n(7),u=n(610),d=function(t){function e(e,n){var i=t.call(this,e)||this
return i._measurements={},i._hub=Object(a.b)(),Object(s.g)(n,a.a)&&(i._hub=n),i.name=e.name||"",i.metadata=e.metadata||{},i._trimEnd=e.trimEnd,i.transaction=i,i}return Object(i.b)(e,t),e.prototype.setName=function(t){this.name=t},e.prototype.initSpanRecorder=function(t){void 0===t&&(t=1e3),this.spanRecorder||(this.spanRecorder=new u.b(t)),this.spanRecorder.add(this)},e.prototype.setMeasurements=function(t){this._measurements=Object(i.a)({},t)},e.prototype.setMetadata=function(t){this.metadata=Object(i.a)(Object(i.a)({},this.metadata),t)},e.prototype.finish=function(e){var n,i,a,s,c,u=this
if(void 0===this.endTimestamp){if(this.name||(o.b.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),this.name="<unlabeled transaction>"),t.prototype.finish.call(this,e),!0!==this.sampled)return o.b.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled."),void(null===(c=null===(a=null===(n=this._hub.getClient())||void 0===n?void 0:(i=n).getTransport)||void 0===a?void 0:(s=a.call(i)).recordLostEvent)||void 0===c||c.call(s,r.a.SampleRate,"transaction"))
var d=this.spanRecorder?this.spanRecorder.spans.filter((function(t){return t!==u&&t.endTimestamp})):[]
this._trimEnd&&d.length>0&&(this.endTimestamp=d.reduce((function(t,e){return t.endTimestamp&&e.endTimestamp?t.endTimestamp>e.endTimestamp?t:e:t})).endTimestamp)
var p={contexts:{trace:this.getTraceContext()},spans:d,start_timestamp:this.startTimestamp,tags:this.tags,timestamp:this.endTimestamp,transaction:this.name,type:"transaction",debug_meta:this.metadata}
return Object.keys(this._measurements).length>0&&(o.b.log("[Measurements] Adding measurements to transaction",JSON.stringify(this._measurements,void 0,2)),p.measurements=this._measurements),o.b.log("[Tracing] Finishing "+this.op+" transaction: "+this.name+"."),this._hub.captureEvent(p)}},e.prototype.toContext=function(){var e=t.prototype.toContext.call(this)
return Object(c.a)(Object(i.a)(Object(i.a)({},e),{name:this.name,trimEnd:this._trimEnd}))},e.prototype.updateWithContext=function(e){var n
return t.prototype.updateWithContext.call(this,e),this.name=null!=(n=e.name)?n:"",this._trimEnd=e.trimEnd,this},e}(u.a)},613:function(t,e,n){"use strict"
n.d(e,"a",(function(){return i})),n.d(e,"b",(function(){return a}))
var i="finishReason",a=["heartbeatFailed","idleTimeout","documentHidden"]},614:function(t,e,n){"use strict"
n.d(e,"a",(function(){return o}))
var i=n(89),a=n(19),r=n(607),s=n(606)
function o(){Object(i.a)({callback:c,type:"error"}),Object(i.a)({callback:c,type:"unhandledrejection"})}function c(){var t=Object(s.c)()
t&&(a.b.log("[Tracing] Transaction: "+r.a.InternalError+" -> Global error occured"),t.setStatus(r.a.InternalError))}}}])

//# sourceMappingURL=chunk.3.4906cf0b01d6d8e33374.map