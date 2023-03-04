"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[79],{12058:(t,e,n)=>{n.d(e,{z:()=>s})
var i=n(8651)
function s(t){if("boolean"==typeof __SENTRY_TRACING__&&!__SENTRY_TRACING__)return!1
const e=(0,i.Gd)().getClient(),n=t||e&&e.getOptions()
return!!n&&(n.enableTracing||"tracesSampleRate"in n||"tracesSampler"in n)}},38285:(t,e,n)=>{n.d(e,{ro:()=>f,lb:()=>m})
var i=n(12058),s=n(8651),a=n(88521),r=n(16140),o=n(30180),c=n(8142),_=n(48206)
function d(){const t=(0,_.x1)()
if(t){const e="internal_error";("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`[Tracing] Transaction: ${e} -> Global error occured`),t.setStatus(e)}}var l=n(27448),p=n(21535)
function u(){const t=this.getScope()
if(t){const e=t.getSpan()
if(e)return{"sentry-trace":e.toTraceparent()}}return{}}function h(t,e,n){if(!(0,i.z)(e))return t.sampled=!1,t
if(void 0!==t.sampled)return t.setMetadata({sampleRate:Number(t.sampled)}),t
let s
return"function"==typeof e.tracesSampler?(s=e.tracesSampler(n),t.setMetadata({sampleRate:Number(s)})):void 0!==n.parentSampled?s=n.parentSampled:void 0!==e.tracesSampleRate?(s=e.tracesSampleRate,t.setMetadata({sampleRate:Number(s)})):(s=1,t.setMetadata({sampleRate:s})),o=s,((0,r.i2)(o)||"number"!=typeof o&&"boolean"!=typeof o?(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.warn(`[Tracing] Given sample rate is invalid. Sample rate must be a boolean or a number between 0 and 1. Got ${JSON.stringify(o)} of type ${JSON.stringify(typeof o)}.`),0):!(o<0||o>1)||(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.warn(`[Tracing] Given sample rate is invalid. Sample rate must be between 0 and 1. Got ${o}.`),0))?s?(t.sampled=Math.random()<s,t.sampled?(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`[Tracing] starting ${t.op} transaction - ${t.name}`),t):(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log(`[Tracing] Discarding transaction because it's not included in the random sample (sampling rate = ${Number(s)})`),t)):(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.log("[Tracing] Discarding transaction because "+("function"==typeof e.tracesSampler?"tracesSampler returned 0 or false":"a negative sampling decision was inherited or tracesSampleRate is set to 0")),t.sampled=!1,t):(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.warn("[Tracing] Discarding transaction because of invalid sample rate."),t.sampled=!1,t)
var o}function g(t,e){const n=this.getClient(),i=n&&n.getOptions()||{},s=i.instrumenter||"sentry",r=t.instrumenter||"sentry"
s!==r&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&a.kg.error(`A transaction was started with instrumenter=\`${r}\`, but the SDK is configured with the \`${s}\` instrumenter.\nThe transaction will not be sampled. Please use the ${s} instrumentation to start transactions.`),t.sampled=!1)
let o=new p.Y(t,this)
return o=h(o,i,{parentSampled:t.parentSampled,transactionContext:t,...e}),o.sampled&&o.initSpanRecorder(i._experiments&&i._experiments.maxSpans),o}function m(t,e,n,i,s,a,r){const o=t.getClient(),c=o&&o.getOptions()||{}
let _=new l.io(e,t,n,i,r,s)
return _=h(_,c,{parentSampled:e.parentSampled,transactionContext:e,...a}),_.sampled&&_.initSpanRecorder(c._experiments&&c._experiments.maxSpans),_}function f(){!function(){const t=(0,s.cu)()
t.__SENTRY__&&(t.__SENTRY__.extensions=t.__SENTRY__.extensions||{},t.__SENTRY__.extensions.startTransaction||(t.__SENTRY__.extensions.startTransaction=g),t.__SENTRY__.extensions.traceHeaders||(t.__SENTRY__.extensions.traceHeaders=u))}(),(0,o.KV)()&&function(){const e=(0,s.cu)()
if(!e.__SENTRY__)return
const n={mongodb:()=>new((0,o.l$)(t,"./integrations/node/mongo").Mongo),mongoose:()=>new((0,o.l$)(t,"./integrations/node/mongo").Mongo)({mongoose:!0}),mysql:()=>new((0,o.l$)(t,"./integrations/node/mysql").Mysql),pg:()=>new((0,o.l$)(t,"./integrations/node/postgres").Postgres)},i=Object.keys(n).filter((t=>!!(0,o.$y)(t))).map((t=>{try{return n[t]()}catch(t){return}})).filter((t=>t))
i.length>0&&(e.__SENTRY__.integrations=[...e.__SENTRY__.integrations||[],...i])}(),(0,c.o)("error",d),(0,c.o)("unhandledrejection",d)}t=n.hmd(t)},27448:(t,e,n)=>{n.d(e,{hd:()=>_,io:()=>l,mg:()=>c,nT:()=>o})
var i=n(88468),s=n(88521),a=n(20484),r=n(21535)
const o=1e3,c=3e4,_=5e3
class d extends a.gB{constructor(t,e,n,i){super(i),this._pushActivity=t,this._popActivity=e,this.transactionSpanId=n}add(t){t.spanId!==this.transactionSpanId&&(t.finish=e=>{t.endTimestamp="number"==typeof e?e:(0,i._I)(),this._popActivity(t.spanId)},void 0===t.endTimestamp&&this._pushActivity(t.spanId)),super.add(t)}}class l extends r.Y{__init(){this.activities={}}__init2(){this._heartbeatCounter=0}__init3(){this._finished=!1}__init4(){this._beforeFinishCallbacks=[]}constructor(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:o,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:c,a=arguments.length>4&&void 0!==arguments[4]?arguments[4]:_,r=arguments.length>5&&void 0!==arguments[5]&&arguments[5]
super(t,e),this._idleHub=e,this._idleTimeout=n,this._finalTimeout=i,this._heartbeatInterval=a,this._onScope=r,l.prototype.__init.call(this),l.prototype.__init2.call(this),l.prototype.__init3.call(this),l.prototype.__init4.call(this),r&&(p(e),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log(`Setting idle transaction on scope. Span ID: ${this.spanId}`),e.configureScope((t=>t.setSpan(this)))),this._startIdleTimeout(),setTimeout((()=>{this._finished||(this.setStatus("deadline_exceeded"),this.finish())}),this._finalTimeout)}finish(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:(0,i._I)()
if(this._finished=!0,this.activities={},this.spanRecorder){("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] finishing IdleTransaction",new Date(1e3*t).toISOString(),this.op)
for(const e of this._beforeFinishCallbacks)e(this,t)
this.spanRecorder.spans=this.spanRecorder.spans.filter((e=>{if(e.spanId===this.spanId)return!0
e.endTimestamp||(e.endTimestamp=t,e.setStatus("cancelled"),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] cancelling span since transaction ended early",JSON.stringify(e,void 0,2)))
const n=e.startTimestamp<t
return n||("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] discarding Span since it happened after Transaction was finished",JSON.stringify(e,void 0,2)),n})),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] flushing IdleTransaction")}else("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] No active IdleTransaction")
return this._onScope&&p(this._idleHub),super.finish(t)}registerBeforeFinishCallback(t){this._beforeFinishCallbacks.push(t)}initSpanRecorder(t){if(!this.spanRecorder){const e=t=>{this._finished||this._pushActivity(t)},n=t=>{this._finished||this._popActivity(t)}
this.spanRecorder=new d(e,n,this.spanId,t),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("Starting heartbeat"),this._pingHeartbeat()}this.spanRecorder.add(this)}_cancelIdleTimeout(){this._idleTimeoutID&&(clearTimeout(this._idleTimeoutID),this._idleTimeoutID=void 0)}_startIdleTimeout(t){this._cancelIdleTimeout(),this._idleTimeoutID=setTimeout((()=>{this._finished||0!==Object.keys(this.activities).length||this.finish(t)}),this._idleTimeout)}_pushActivity(t){this._cancelIdleTimeout(),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log(`[Tracing] pushActivity: ${t}`),this.activities[t]=!0,("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] new activities count",Object.keys(this.activities).length)}_popActivity(t){if(this.activities[t]&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log(`[Tracing] popActivity ${t}`),delete this.activities[t],("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] new activities count",Object.keys(this.activities).length)),0===Object.keys(this.activities).length){const t=(0,i._I)()+this._idleTimeout/1e3
this._startIdleTimeout(t)}}_beat(){if(this._finished)return
const t=Object.keys(this.activities).join("")
t===this._prevHeartbeatString?this._heartbeatCounter++:this._heartbeatCounter=1,this._prevHeartbeatString=t,this._heartbeatCounter>=3?(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] Transaction finished because of no change for 3 heart beats"),this.setStatus("deadline_exceeded"),this.finish()):this._pingHeartbeat()}_pingHeartbeat(){("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log(`pinging Heartbeat -> current counter: ${this._heartbeatCounter}`),setTimeout((()=>{this._beat()}),this._heartbeatInterval)}}function p(t){const e=t.getScope()
e&&e.getTransaction()&&e.setSpan(void 0)}},98079:(t,e,n)=>{n.r(e),n.d(e,{BROWSER_TRACING_INTEGRATION_ID:()=>nt,BrowserTracing:()=>st,IdleTransaction:()=>B.io,Integrations:()=>i,Span:()=>ot.Dr,SpanStatus:()=>rt,TRACEPARENT_REGEXP:()=>b.K,Transaction:()=>ct.Y,addExtensionMethods:()=>s.ro,defaultRequestInstrumentationOptions:()=>tt,extractTraceparentData:()=>b.q,getActiveTransaction:()=>G.x1,hasTracingEnabled:()=>G.zu,instrumentOutgoingRequests:()=>et,spanStatusfromHttpCode:()=>ot.Zd,startIdleTransaction:()=>s.lb,stripUrlQueryAndFragment:()=>o.rt})
var i={}
n.r(i),n.d(i,{Apollo:()=>R,BrowserTracing:()=>st,Express:()=>l,GraphQL:()=>y,Mongo:()=>E,Mysql:()=>m,Postgres:()=>g,Prisma:()=>S})
var s=n(38285)
function a(t){let e,n=t[0],i=1
for(;i<t.length;){const s=t[i],a=t[i+1]
if(i+=2,("optionalAccess"===s||"optionalCall"===s)&&null==n)return
"access"===s||"optionalAccess"===s?(e=n,n=a(n)):"call"!==s&&"optionalCall"!==s||(n=a((function(){for(var t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s]
return n.call(e,...i)})),e=void 0)}return n}var r=n(88521),o=n(72702),c=n(14205),_=n(16140)
function d(t){const e=a([t,"call",t=>t(),"access",t=>t.getClient,"call",t=>t(),"optionalAccess",t=>t.getOptions,"call",t=>t()])
return"sentry"!==(a([e,"optionalAccess",t=>t.instrumenter])||"sentry")}class l{static __initStatic(){this.id="Express"}__init(){this.name=l.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
l.prototype.__init.call(this),this._router=t.router||t.app,this._methods=(Array.isArray(t.methods)?t.methods:[]).concat("use")}setupOnce(t,e){this._router?d(e)?("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("Express Integration is skipped because of instrumenter configuration."):(function(t){(arguments.length>1&&void 0!==arguments[1]?arguments[1]:[]).forEach((e=>function(t,e){const n=t[e]
return t[e]=function(){for(var t=arguments.length,i=new Array(t),s=0;s<t;s++)i[s]=arguments[s]
return n.call(this,...function(t,e){return t.map((t=>"function"==typeof t?p(t,e):Array.isArray(t)?t.map((t=>"function"==typeof t?p(t,e):t)):t))}(i,e))},t}(t,e)))}(this._router,this._methods),function(t){const e="settings"in t
e&&void 0===t._router&&t.lazyrouter&&t.lazyrouter()
const n=e?t._router:t
if(!n)return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.debug("Cannot instrument router for URL Parameterization (did not find a valid router)."),void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.debug("Routing instrumentation is currently only supported in Express 4."))
const i=Object.getPrototypeOf(n),s=i.process_params
i.process_params=function(t,e,n,i,r){n._reconstructedRoute||(n._reconstructedRoute="")
const{layerRoutePath:d,isRegex:l,isArray:p,numExtraSegments:u}=function(t){const e=a([t,"access",t=>t.route,"optionalAccess",t=>t.path]),n=(0,_.Kj)(e),i=Array.isArray(e)
if(!e)return{isRegex:n,isArray:i,numExtraSegments:0}
const s=i?Math.max(e.reduce(((t,e)=>t+(0,o.$A)(e.toString())),0)-(0,o.$A)(t.path||""),0):0,r=function(t,e){return t?e.map((t=>t.toString())).join(","):e&&e.toString()}(i,e)
return{layerRoutePath:r,isRegex:n,isArray:i,numExtraSegments:s}}(t);(d||l||p)&&(n._hasParameters=!0)
const h=(d||t.path||"").split("/").filter((t=>t.length>0&&(l||p||!t.includes("*")))).join("/")
if(h&&h.length>0&&(n._reconstructedRoute+=`/${h}${l?"/":""}`),(0,o.$A)(n.originalUrl||"")+u===(0,o.$A)(n._reconstructedRoute)){n._hasParameters||n._reconstructedRoute!==n.originalUrl&&(n._reconstructedRoute=n.originalUrl)
const t=i.__sentry_transaction
if(t&&"custom"!==t.metadata.source){const e=n._reconstructedRoute||"/"
t.setName(...(0,c.oA)(n,{path:!0,method:!0,customRoute:e}))}}return s.call(this,t,e,n,i,r)}}(this._router)):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("ExpressIntegration is missing an Express instance")}}function p(t,e){const n=t.length
switch(n){case 2:return function(n,i){const s=i.__sentry_transaction
if(s){const n=s.startChild({description:t.name,op:`middleware.express.${e}`})
i.once("finish",(()=>{n.finish()}))}return t.call(this,n,i)}
case 3:return function(n,i,s){const r=a([i.__sentry_transaction,"optionalAccess",t=>t.startChild,"call",n=>n({description:t.name,op:`middleware.express.${e}`})])
t.call(this,n,i,(function(){a([r,"optionalAccess",t=>t.finish,"call",t=>t()])
for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n]
s.call(this,...e)}))}
case 4:return function(n,i,s,r){const o=a([s.__sentry_transaction,"optionalAccess",t=>t.startChild,"call",n=>n({description:t.name,op:`middleware.express.${e}`})])
t.call(this,n,i,s,(function(){a([o,"optionalAccess",t=>t.finish,"call",t=>t()])
for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n]
r.call(this,...e)}))}
default:throw new Error(`Express middleware takes 2-4 arguments. Got: ${n}`)}}l.__initStatic()
var u=n(30180),h=n(15834)
class g{static __initStatic(){this.id="Postgres"}__init(){this.name=g.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
g.prototype.__init.call(this),this._usePgNative=!!t.usePgNative}setupOnce(t,e){if(d(e))return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("Postgres Integration is skipped because of instrumenter configuration."))
const n=(0,u.$y)("pg")
if(!n)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("Postgres Integration was unable to require `pg` package."))
if(this._usePgNative&&!a([n,"access",t=>t.native,"optionalAccess",t=>t.Client]))return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("Postgres Integration was unable to access 'pg-native' bindings."))
const{Client:i}=this._usePgNative?n.native:n;(0,h.hl)(i.prototype,"query",(function(t){return function(n,i,s){const r=a([e().getScope(),"optionalAccess",t=>t.getSpan,"call",t=>t()]),o=a([r,"optionalAccess",t=>t.startChild,"call",t=>t({description:"string"==typeof n?n:n.text,op:"db"})])
if("function"==typeof s)return t.call(this,n,i,(function(t,e){a([o,"optionalAccess",t=>t.finish,"call",t=>t()]),s(t,e)}))
if("function"==typeof i)return t.call(this,n,(function(t,e){a([o,"optionalAccess",t=>t.finish,"call",t=>t()]),i(t,e)}))
const c=void 0!==i?t.call(this,n,i):t.call(this,n)
return(0,_.J8)(c)?c.then((t=>(a([o,"optionalAccess",t=>t.finish,"call",t=>t()]),t))):(a([o,"optionalAccess",t=>t.finish,"call",t=>t()]),c)}}))}}g.__initStatic()
class m{constructor(){m.prototype.__init.call(this)}static __initStatic(){this.id="Mysql"}__init(){this.name=m.id}setupOnce(t,e){if(d(e))return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("Mysql Integration is skipped because of instrumenter configuration."))
const n=(0,u.$y)("mysql/lib/Connection.js")
n?(0,h.hl)(n,"createQuery",(function(t){return function(n,i,s){const r=a([e().getScope(),"optionalAccess",t=>t.getSpan,"call",t=>t()]),o=a([r,"optionalAccess",t=>t.startChild,"call",t=>t({description:"string"==typeof n?n:n.sql,op:"db"})])
return"function"==typeof s?t.call(this,n,i,(function(t,e,n){a([o,"optionalAccess",t=>t.finish,"call",t=>t()]),s(t,e,n)})):"function"==typeof i?t.call(this,n,(function(t,e,n){a([o,"optionalAccess",t=>t.finish,"call",t=>t()]),i(t,e,n)})):t.call(this,n,i,s)}})):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("Mysql Integration was unable to require `mysql` package.")}}m.__initStatic()
const f=["aggregate","bulkWrite","countDocuments","createIndex","createIndexes","deleteMany","deleteOne","distinct","drop","dropIndex","dropIndexes","estimatedDocumentCount","find","findOne","findOneAndDelete","findOneAndReplace","findOneAndUpdate","indexes","indexExists","indexInformation","initializeOrderedBulkOp","insertMany","insertOne","isCapped","mapReduce","options","parallelCollectionScan","rename","replaceOne","stats","updateMany","updateOne"],T={bulkWrite:["operations"],countDocuments:["query"],createIndex:["fieldOrSpec"],createIndexes:["indexSpecs"],deleteMany:["filter"],deleteOne:["filter"],distinct:["key","query"],dropIndex:["indexName"],find:["query"],findOne:["query"],findOneAndDelete:["filter"],findOneAndReplace:["filter","replacement"],findOneAndUpdate:["filter","update"],indexExists:["indexes"],insertMany:["docs"],insertOne:["doc"],mapReduce:["map","reduce"],rename:["newName"],replaceOne:["filter","doc"],updateMany:["filter","update"],updateOne:["filter","update"]}
class E{static __initStatic(){this.id="Mongo"}__init(){this.name=E.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
E.prototype.__init.call(this),this._operations=Array.isArray(t.operations)?t.operations:f,this._describeOperations=!("describeOperations"in t)||t.describeOperations,this._useMongoose=!!t.useMongoose}setupOnce(t,e){if(d(e))return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("Mongo Integration is skipped because of instrumenter configuration."))
const n=this._useMongoose?"mongoose":"mongodb",i=(0,u.$y)(n)
i?this._instrumentOperations(i.Collection,this._operations,e):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error(`Mongo Integration was unable to require \`${n}\` package.`)}_instrumentOperations(t,e,n){e.forEach((e=>this._patchOperation(t,e,n)))}_patchOperation(t,e,n){if(!(e in t.prototype))return
const i=this._getSpanContextFromOperationArguments.bind(this);(0,h.hl)(t.prototype,e,(function(t){return function(){for(var s=arguments.length,r=new Array(s),o=0;o<s;o++)r[o]=arguments[o]
const c=r[r.length-1],d=a([n().getScope(),"optionalAccess",t=>t.getSpan,"call",t=>t()])
if("function"!=typeof c||"mapReduce"===e&&2===r.length){const n=a([d,"optionalAccess",t=>t.startChild,"call",t=>t(i(this,e,r))]),s=t.call(this,...r)
if((0,_.J8)(s))return s.then((t=>(a([n,"optionalAccess",t=>t.finish,"call",t=>t()]),t)))
if((l=s)&&"object"==typeof l&&l.once&&"function"==typeof l.once){const e=s
try{e.once("close",(()=>{a([n,"optionalAccess",t=>t.finish,"call",t=>t()])}))}catch(t){a([n,"optionalAccess",t=>t.finish,"call",t=>t()])}return e}return a([n,"optionalAccess",t=>t.finish,"call",t=>t()]),s}var l
const p=a([d,"optionalAccess",t=>t.startChild,"call",t=>t(i(this,e,r.slice(0,-1)))])
return t.call(this,...r.slice(0,-1),(function(t,e){a([p,"optionalAccess",t=>t.finish,"call",t=>t()]),c(t,e)}))}}))}_getSpanContextFromOperationArguments(t,e,n){const i={collectionName:t.collectionName,dbName:t.dbName,namespace:t.namespace},s={op:"db",description:e,data:i},a=T[e],r=Array.isArray(this._describeOperations)?this._describeOperations.includes(e):this._describeOperations
if(!a||!r)return s
try{if("mapReduce"===e){const[t,e]=n
i[a[0]]="string"==typeof t?t:t.name||"<anonymous>",i[a[1]]="string"==typeof e?e:e.name||"<anonymous>"}else for(let t=0;t<a.length;t++)i[a[t]]=JSON.stringify(n[t])}catch(t){}return s}}E.__initStatic()
class S{static __initStatic(){this.id="Prisma"}__init(){this.name=S.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
var e
S.prototype.__init.call(this),(e=t.client)&&e.$use?this._client=t.client:("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn(`Unsupported Prisma client provided to PrismaIntegration. Provided client: ${JSON.stringify(t.client)}`)}setupOnce(t,e){this._client?d(e)?("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("Prisma Integration is skipped because of instrumenter configuration."):this._client.$use(((t,n)=>{const i=a([e().getScope(),"optionalAccess",t=>t.getSpan,"call",t=>t()]),s=t.action,r=t.model,o=a([i,"optionalAccess",t=>t.startChild,"call",t=>t({description:r?`${r} ${s}`:s,op:"db.sql.prisma"})]),c=n(t)
return(0,_.J8)(c)?c.then((t=>(a([o,"optionalAccess",t=>t.finish,"call",t=>t()]),t))):(a([o,"optionalAccess",t=>t.finish,"call",t=>t()]),c)})):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("PrismaIntegration is missing a Prisma Client Instance")}}S.__initStatic()
class y{constructor(){y.prototype.__init.call(this)}static __initStatic(){this.id="GraphQL"}__init(){this.name=y.id}setupOnce(t,e){if(d(e))return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("GraphQL Integration is skipped because of instrumenter configuration."))
const n=(0,u.$y)("graphql/execution/execute.js")
n?(0,h.hl)(n,"execute",(function(t){return function(){const n=e().getScope(),i=a([n,"optionalAccess",t=>t.getSpan,"call",t=>t()]),s=a([i,"optionalAccess",t=>t.startChild,"call",t=>t({description:"execute",op:"graphql.execute"})])
a([n,"optionalAccess",t=>t.setSpan,"call",t=>t(s)])
for(var r=arguments.length,o=new Array(r),c=0;c<r;c++)o[c]=arguments[c]
const d=t.call(this,...o)
return(0,_.J8)(d)?d.then((t=>(a([s,"optionalAccess",t=>t.finish,"call",t=>t()]),a([n,"optionalAccess",t=>t.setSpan,"call",t=>t(i)]),t))):(a([s,"optionalAccess",t=>t.finish,"call",t=>t()]),a([n,"optionalAccess",t=>t.setSpan,"call",t=>t(i)]),d)}})):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("GraphQL Integration was unable to require graphql/execution package.")}}y.__initStatic()
var v=n(7209)
class R{static __initStatic(){this.id="Apollo"}__init(){this.name=R.id}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{useNestjs:!1}
R.prototype.__init.call(this),this._useNest=!!t.useNestjs}setupOnce(t,e){if(d(e))("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("Apollo Integration is skipped because of instrumenter configuration.")
else if(this._useNest){const t=(0,u.$y)("@nestjs/graphql")
if(!t)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("Apollo-NestJS Integration was unable to require @nestjs/graphql package."));(0,h.hl)(t.GraphQLFactory.prototype,"mergeWithSchema",(function(t){return function(){(0,h.hl)(this.resolversExplorerService,"explore",(function(t){return function(){return N((0,v.lE)(t.call(this)),e)}}))
for(var n=arguments.length,i=new Array(n),s=0;s<n;s++)i[s]=arguments[s]
return t.call(this,...i)}}))}else{const t=(0,u.$y)("apollo-server-core")
if(!t)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.error("Apollo Integration was unable to require apollo-server-core package."));(0,h.hl)(t.ApolloServerBase.prototype,"constructSchema",(function(t){return function(){if(!this.config.resolvers)return("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&(this.config.schema?(r.kg.warn("Apollo integration is not able to trace `ApolloServer` instances constructed via `schema` property.If you are using NestJS with Apollo, please use `Sentry.Integrations.Apollo({ useNestjs: true })` instead."),r.kg.warn()):this.config.modules&&r.kg.warn("Apollo integration is not able to trace `ApolloServer` instances constructed via `modules` property."),r.kg.error("Skipping tracing as no resolvers found on the `ApolloServer` instance.")),t.call(this)
const n=(0,v.lE)(this.config.resolvers)
return this.config.resolvers=N(n,e),t.call(this)}}))}}}function N(t,e){return t.map((t=>(Object.keys(t).forEach((n=>{Object.keys(t[n]).forEach((i=>{"function"==typeof t[n][i]&&function(t,e,n,i){(0,h.hl)(t[e],n,(function(t){return function(){const s=a([i().getScope(),"optionalAccess",t=>t.getSpan,"call",t=>t()]),r=a([s,"optionalAccess",t=>t.startChild,"call",t=>t({description:`${e}.${n}`,op:"graphql.resolve"})])
for(var o=arguments.length,c=new Array(o),d=0;d<o;d++)c[d]=arguments[d]
const l=t.call(this,...c)
return(0,_.J8)(l)?l.then((t=>(a([r,"optionalAccess",t=>t.finish,"call",t=>t()]),t))):(a([r,"optionalAccess",t=>t.finish,"call",t=>t()]),l)}}))}(t,n,i,e)}))})),t)))}R.__initStatic()
var b=n(75492),D=n(22850),k=n(68256),B=n(27448),G=n(48206)
const Y=n(27083).n2
var U=n(88468)
const x=(t,e,n)=>{let i,s
return a=>{e.value>=0&&(a||n)&&(s=e.value-(i||0),(s||void 0===i)&&(i=e.value,e.delta=s,t(e)))}},I=()=>Y.__WEB_VITALS_POLYFILL__?Y.performance&&(performance.getEntriesByType&&performance.getEntriesByType("navigation")[0]||(()=>{const t=Y.performance.timing,e=Y.performance.navigation.type,n={entryType:"navigation",startTime:0,type:2==e?"back_forward":1===e?"reload":"navigate"}
for(const i in t)"navigationStart"!==i&&"toJSON"!==i&&(n[i]=Math.max(t[i]-t.navigationStart,0))
return n})()):Y.performance&&performance.getEntriesByType&&performance.getEntriesByType("navigation")[0],A=()=>{const t=I()
return t&&t.activationStart||0},C=(t,e)=>{const n=I()
let i="navigate"
return n&&(i=Y.document.prerendering||A()>0?"prerender":n.type.replace(/_/g,"-")),{name:t,value:void 0===e?-1:e,rating:"good",delta:0,entries:[],id:`v3-${Date.now()}-${Math.floor(8999999999999*Math.random())+1e12}`,navigationType:i}},O=(t,e,n)=>{try{if(PerformanceObserver.supportedEntryTypes.includes(t)){const i=new PerformanceObserver((t=>{e(t.getEntries())}))
return i.observe(Object.assign({type:t,buffered:!0},n||{})),i}}catch(t){}},w=(t,e)=>{const n=i=>{"pagehide"!==i.type&&"hidden"!==Y.document.visibilityState||(t(i),e&&(removeEventListener("visibilitychange",n,!0),removeEventListener("pagehide",n,!0)))}
addEventListener("visibilitychange",n,!0),addEventListener("pagehide",n,!0)}
let $=-1
const L=()=>($<0&&($="hidden"!==Y.document.visibilityState||Y.document.prerendering?1/0:0,w((t=>{let{timeStamp:e}=t
$=e}),!0)),{get firstHiddenTime(){return $}}),M={}
function P(t){return"number"==typeof t&&isFinite(t)}function q(t,e){let{startTimestamp:n,...i}=e
return n&&t.startTimestamp>n&&(t.startTimestamp=n),t.startChild({startTimestamp:n,...i})}function H(){return Y&&Y.addEventListener&&Y.performance}let j,F,z=0,X={}
function J(t,e,n,i,s,a){const r=a?e[a]:e[`${n}End`],o=e[`${n}Start`]
o&&r&&q(t,{op:"browser",description:s||n,startTimestamp:i+(0,G.XL)(o),endTimestamp:i+(0,G.XL)(r)})}var Q=n(12058),W=n(8651),Z=n(8142),K=n(98902)
const V=["localhost",/^\//],tt={traceFetch:!0,traceXHR:!0,tracingOrigins:V,tracePropagationTargets:V}
function et(t){const{traceFetch:e,traceXHR:n,tracePropagationTargets:i,tracingOrigins:s,shouldCreateSpanForRequest:a}={traceFetch:tt.traceFetch,traceXHR:tt.traceXHR,...t},r="function"==typeof a?a:t=>!0,o=t=>function(t,e){return(0,K.U0)(t,e||V)}(t,i||s),c={}
e&&(0,Z.o)("fetch",(t=>{!function(t,e,n,i){if(!(0,Q.z)()||!t.fetchData||!e(t.fetchData.url))return
if(t.endTimestamp){const e=t.fetchData.__span
if(!e)return
const n=i[e]
return void(n&&(t.response?n.setHttpStatus(t.response.status):t.error&&n.setStatus("internal_error"),n.finish(),delete i[e]))}const s=(0,W.Gd)().getScope(),a=s&&s.getSpan(),r=a&&a.transaction
if(a&&r){const e=a.startChild({data:{...t.fetchData,type:"fetch"},description:`${t.fetchData.method} ${t.fetchData.url}`,op:"http.client"})
t.fetchData.__span=e.spanId,i[e.spanId]=e
const s=t.args[0]
t.args[1]=t.args[1]||{}
const o=t.args[1]
n(t.fetchData.url)&&(o.headers=function(t,e,n,i){const s=(0,D.IQ)(e),a=n.toTraceparent(),r="undefined"!=typeof Request&&(0,_.V9)(t,Request)?t.headers:i.headers
if(r){if("undefined"!=typeof Headers&&(0,_.V9)(r,Headers)){const t=new Headers(r)
return t.append("sentry-trace",a),s&&t.append(D.bU,s),t}if(Array.isArray(r)){const t=[...r,["sentry-trace",a]]
return s&&t.push([D.bU,s]),t}{const t="baggage"in r?r.baggage:void 0,e=[]
return Array.isArray(t)?e.push(...t):t&&e.push(t),s&&e.push(s),{...r,"sentry-trace":a,baggage:e.length>0?e.join(","):void 0}}}return{"sentry-trace":a,baggage:s}}(s,r.getDynamicSamplingContext(),e,o))}}(t,r,o,c)})),n&&(0,Z.o)("xhr",(t=>{!function(t,e,n,i){if(!(0,Q.z)()||t.xhr&&t.xhr.__sentry_own_request__||!(t.xhr&&t.xhr.__sentry_xhr__&&e(t.xhr.__sentry_xhr__.url)))return
const s=t.xhr.__sentry_xhr__
if(t.endTimestamp){const e=t.xhr.__sentry_xhr_span_id__
if(!e)return
const n=i[e]
return void(n&&(n.setHttpStatus(s.status_code),n.finish(),delete i[e]))}const a=(0,W.Gd)().getScope(),r=a&&a.getSpan(),o=r&&r.transaction
if(r&&o){const e=r.startChild({data:{...s.data,type:"xhr",method:s.method,url:s.url},description:`${s.method} ${s.url}`,op:"http.client"})
if(t.xhr.__sentry_xhr_span_id__=e.spanId,i[t.xhr.__sentry_xhr_span_id__]=e,t.xhr.setRequestHeader&&n(t.xhr.__sentry_xhr__.url))try{t.xhr.setRequestHeader("sentry-trace",e.toTraceparent())
const n=o.getDynamicSamplingContext(),i=(0,D.IQ)(n)
i&&t.xhr.setRequestHeader(D.bU,i)}catch(t){}}}(t,r,o,c)}))}const nt="BrowserTracing",it={idleTimeout:B.nT,finalTimeout:B.mg,heartbeatInterval:B.hd,markBackgroundTransactions:!0,routingInstrumentation:function(t){let e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],n=!(arguments.length>2&&void 0!==arguments[2])||arguments[2]
if(!Y||!Y.location)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn("Could not initialize routing instrumentation due to invalid location"))
let i,s=Y.location.href
e&&(i=t({name:Y.location.pathname,op:"pageload",metadata:{source:"url"}})),n&&(0,Z.o)("history",(e=>{let{to:n,from:a}=e
void 0===a&&s&&-1!==s.indexOf(n)?s=void 0:a!==n&&(s=void 0,i&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Tracing] Finishing current transaction with op: ${i.op}`),i.finish()),i=t({name:Y.location.pathname,op:"navigation",metadata:{source:"url"}}))}))},startTransactionOnLocationChange:!0,startTransactionOnPageLoad:!0,enableLongTask:!0,_experiments:{},...tt}
class st{__init(){this.name=nt}constructor(t){st.prototype.__init.call(this),this.options={...it,...t},void 0!==this.options._experiments.enableLongTask&&(this.options.enableLongTask=this.options._experiments.enableLongTask),t&&!t.tracePropagationTargets&&t.tracingOrigins&&(this.options.tracePropagationTargets=t.tracingOrigins),function(){const t=H()
t&&U.Z1&&(t.mark&&Y.performance.mark("sentry-tracing-init"),(t=>{const e=C("CLS",0)
let n,i=0,s=[]
const a=t=>{t.forEach((t=>{if(!t.hadRecentInput){const a=s[0],r=s[s.length-1]
i&&0!==s.length&&t.startTime-r.startTime<1e3&&t.startTime-a.startTime<5e3?(i+=t.value,s.push(t)):(i=t.value,s=[t]),i>e.value&&(e.value=i,e.entries=s,n&&n())}}))},r=O("layout-shift",a)
r&&(n=x(t,e),w((()=>{a(r.takeRecords()),n(!0)})))})((t=>{const e=t.entries.pop()
e&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding CLS"),X.cls={value:t.value,unit:""},F=e)})),(t=>{const e=L(),n=C("LCP")
let i
const s=t=>{const s=t[t.length-1]
if(s){const t=Math.max(s.startTime-A(),0)
t<e.firstHiddenTime&&(n.value=t,n.entries=[s],i())}},a=O("largest-contentful-paint",s)
if(a){i=x(t,n)
const e=()=>{M[n.id]||(s(a.takeRecords()),a.disconnect(),M[n.id]=!0,i(!0))};["keydown","click"].forEach((t=>{addEventListener(t,e,{once:!0,capture:!0})})),w(e,!0)}})((t=>{const e=t.entries.pop()
e&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding LCP"),X.lcp={value:t.value,unit:"millisecond"},j=e)})),(t=>{const e=L(),n=C("FID")
let i
const s=t=>{t.startTime<e.firstHiddenTime&&(n.value=t.processingStart-t.startTime,n.entries.push(t),i(!0))},a=t=>{t.forEach(s)},r=O("first-input",a)
i=x(t,n),r&&w((()=>{a(r.takeRecords()),r.disconnect()}),!0)})((t=>{const e=t.entries.pop()
if(!e)return
const n=(0,G.XL)(U.Z1),i=(0,G.XL)(e.startTime);("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding FID"),X.fid={value:t.value,unit:"millisecond"},X["mark.fid"]={value:n+i,unit:"second"}})))}(),this.options.enableLongTask&&O("longtask",(t=>{for(const e of t){const t=(0,G.x1)()
if(!t)return
const n=(0,G.XL)(U.Z1+e.startTime),i=(0,G.XL)(e.duration)
t.startChild({description:"Main UI thread blocked",op:"ui.long-task",startTimestamp:n,endTimestamp:n+i})}}))}setupOnce(t,e){this._getCurrentHub=e
const{routingInstrumentation:n,startTransactionOnLocationChange:i,startTransactionOnPageLoad:s,markBackgroundTransactions:a,traceFetch:o,traceXHR:c,tracePropagationTargets:_,shouldCreateSpanForRequest:d,_experiments:l}=this.options
n((t=>this._createRouteTransaction(t)),s,i),a&&(Y&&Y.document?Y.document.addEventListener("visibilitychange",(()=>{const t=(0,G.x1)()
if(Y.document.hidden&&t){const e="cancelled";("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Tracing] Transaction: ${e} -> since tab moved to the background, op: ${t.op}`),t.status||t.setStatus(e),t.setTag("visibilitychange","document.hidden"),t.finish()}})):("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn("[Tracing] Could not set up background tab detection due to lack of global document")),l.enableInteractions&&this._registerInteractionListener(),et({traceFetch:o,traceXHR:c,tracePropagationTargets:_,shouldCreateSpanForRequest:d})}_createRouteTransaction(t){if(!this._getCurrentHub)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn(`[Tracing] Did not create ${t.op} transaction because _getCurrentHub is invalid.`))
const{beforeNavigate:e,idleTimeout:n,finalTimeout:i,heartbeatInterval:a}=this.options,o="pageload"===t.op,c=o?at("sentry-trace"):null,_=o?at("baggage"):null,d=c?(0,b.q)(c):void 0,l=_?(0,D.EN)(_):void 0,p={...t,...d,metadata:{...t.metadata,dynamicSamplingContext:d&&!l?{}:l},trimEnd:!0},u="function"==typeof e?e(p):p,h=void 0===u?{...p,sampled:!1}:u
h.metadata=h.name!==p.name?{...h.metadata,source:"custom"}:h.metadata,this._latestRouteName=h.name,this._latestRouteSource=h.metadata&&h.metadata.source,!1===h.sampled&&("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Tracing] Will not send ${h.op} transaction because of beforeNavigate.`),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Tracing] Starting ${h.op} transaction on scope`)
const g=this._getCurrentHub(),{location:m}=Y,f=(0,s.lb)(g,h,n,i,!0,{location:m},a)
return f.registerBeforeFinishCallback((t=>{!function(t){const e=H()
if(!e||!Y.performance.getEntries||!U.Z1)return;("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Tracing] Adding & adjusting spans using Performance API")
const n=(0,G.XL)(U.Z1),i=e.getEntries()
let s,a
if(i.slice(z).forEach((e=>{const i=(0,G.XL)(e.startTime),o=(0,G.XL)(e.duration)
if(!("navigation"===t.op&&n+i<t.startTimestamp))switch(e.entryType){case"navigation":!function(t,e,n){["unloadEvent","redirect","domContentLoadedEvent","loadEvent","connect"].forEach((i=>{J(t,e,i,n)})),J(t,e,"secureConnection",n,"TLS/SSL","connectEnd"),J(t,e,"fetch",n,"cache","domainLookupStart"),J(t,e,"domainLookup",n,"DNS"),function(t,e,n){q(t,{op:"browser",description:"request",startTimestamp:n+(0,G.XL)(e.requestStart),endTimestamp:n+(0,G.XL)(e.responseEnd)}),q(t,{op:"browser",description:"response",startTimestamp:n+(0,G.XL)(e.responseStart),endTimestamp:n+(0,G.XL)(e.responseEnd)})}(t,e,n)}(t,e,n),s=n+(0,G.XL)(e.responseStart),a=n+(0,G.XL)(e.requestStart)
break
case"mark":case"paint":case"measure":{!function(t,e,n,i,s){const a=s+n,r=a+i
q(t,{description:e.name,endTimestamp:r,op:e.entryType,startTimestamp:a})}(t,e,i,o,n)
const s=L(),a=e.startTime<s.firstHiddenTime
"first-paint"===e.name&&a&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding FP"),X.fp={value:e.startTime,unit:"millisecond"}),"first-contentful-paint"===e.name&&a&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding FCP"),X.fcp={value:e.startTime,unit:"millisecond"})
break}case"resource":{const s=e.name.replace(Y.location.origin,"")
!function(t,e,n,i,s,a){if("xmlhttprequest"===e.initiatorType||"fetch"===e.initiatorType)return
const r={}
"transferSize"in e&&(r["Transfer Size"]=e.transferSize),"encodedBodySize"in e&&(r["Encoded Body Size"]=e.encodedBodySize),"decodedBodySize"in e&&(r["Decoded Body Size"]=e.decodedBodySize),"renderBlockingStatus"in e&&(r["resource.render_blocking_status"]=e.renderBlockingStatus)
const o=a+i
q(t,{description:n,endTimestamp:o+s,op:e.initiatorType?`resource.${e.initiatorType}`:"resource.other",startTimestamp:o,data:r})}(t,e,s,i,o,n)
break}}})),z=Math.max(i.length-1,0),function(t){const e=Y.navigator
if(!e)return
const n=e.connection
n&&(n.effectiveType&&t.setTag("effectiveConnectionType",n.effectiveType),n.type&&t.setTag("connectionType",n.type),P(n.rtt)&&(X["connection.rtt"]={value:n.rtt,unit:"millisecond"})),P(e.deviceMemory)&&t.setTag("deviceMemory",`${e.deviceMemory} GB`),P(e.hardwareConcurrency)&&t.setTag("hardwareConcurrency",String(e.hardwareConcurrency))}(t),"pageload"===t.op){"number"==typeof s&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding TTFB"),X.ttfb={value:1e3*(s-t.startTimestamp),unit:"millisecond"},"number"==typeof a&&a<=s&&(X["ttfb.requestTime"]={value:1e3*(s-a),unit:"millisecond"})),["fcp","fp","lcp"].forEach((e=>{if(!X[e]||n>=t.startTimestamp)return
const i=X[e].value,s=n+(0,G.XL)(i),a=Math.abs(1e3*(s-t.startTimestamp)),o=a-i;("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log(`[Measurements] Normalized ${e} from ${i} to ${a} (${o})`),X[e].value=a}))
const e=X["mark.fid"]
e&&X.fid&&(q(t,{description:"first input delay",endTimestamp:e.value+(0,G.XL)(X.fid.value),op:"ui.action",startTimestamp:e.value}),delete X["mark.fid"]),"fcp"in X||delete X.cls,Object.keys(X).forEach((e=>{t.setMeasurement(e,X[e].value,X[e].unit)})),function(t){j&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding LCP Data"),j.element&&t.setTag("lcp.element",(0,k.Rt)(j.element)),j.id&&t.setTag("lcp.id",j.id),j.url&&t.setTag("lcp.url",j.url.trim().slice(0,200)),t.setTag("lcp.size",j.size)),F&&F.sources&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.log("[Measurements] Adding CLS Data"),F.sources.forEach(((e,n)=>t.setTag(`cls.source.${n+1}`,(0,k.Rt)(e.node)))))}(t)}j=void 0,F=void 0,X={}}(t)})),f}_registerInteractionListener(){let t
const e=()=>{const{idleTimeout:e,finalTimeout:n,heartbeatInterval:i}=this.options,a="ui.action.click"
if(t&&(t.finish(),t=void 0),!this._getCurrentHub)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn(`[Tracing] Did not create ${a} transaction because _getCurrentHub is invalid.`))
if(!this._latestRouteName)return void(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&r.kg.warn(`[Tracing] Did not create ${a} transaction because _latestRouteName is missing.`))
const o=this._getCurrentHub(),{location:c}=Y,_={name:this._latestRouteName,op:a,trimEnd:!0,metadata:{source:this._latestRouteSource||"url"}}
t=(0,s.lb)(o,_,e,n,!0,{location:c},i)};["click"].forEach((t=>{addEventListener(t,e,{once:!1,capture:!0})}))}}function at(t){const e=(0,k.qT)(`meta[name=${t}]`)
return e?e.getAttribute("content"):null}var rt,ot=n(20484)
!function(t){t.Ok="ok",t.DeadlineExceeded="deadline_exceeded",t.Unauthenticated="unauthenticated",t.PermissionDenied="permission_denied",t.NotFound="not_found",t.ResourceExhausted="resource_exhausted",t.InvalidArgument="invalid_argument",t.Unimplemented="unimplemented",t.Unavailable="unavailable",t.InternalError="internal_error",t.UnknownError="unknown_error",t.Cancelled="cancelled",t.AlreadyExists="already_exists",t.FailedPrecondition="failed_precondition",t.Aborted="aborted",t.OutOfRange="out_of_range",t.DataLoss="data_loss"}(rt||(rt={}))
var ct=n(21535);("undefined"==typeof __SENTRY_TRACING__||__SENTRY_TRACING__)&&(0,s.ro)()},20484:(t,e,n)=>{n.d(e,{Dr:()=>c,Zd:()=>_,gB:()=>o})
var i=n(7209),s=n(88468),a=n(88521),r=n(15834)
class o{__init(){this.spans=[]}constructor(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3
o.prototype.__init.call(this),this._maxlen=t}add(t){this.spans.length>this._maxlen?t.spanRecorder=void 0:this.spans.push(t)}}class c{__init2(){this.traceId=(0,i.DM)()}__init3(){this.spanId=(0,i.DM)().substring(16)}__init4(){this.startTimestamp=(0,s._I)()}__init5(){this.tags={}}__init6(){this.data={}}__init7(){this.instrumenter="sentry"}constructor(t){if(c.prototype.__init2.call(this),c.prototype.__init3.call(this),c.prototype.__init4.call(this),c.prototype.__init5.call(this),c.prototype.__init6.call(this),c.prototype.__init7.call(this),!t)return this
t.traceId&&(this.traceId=t.traceId),t.spanId&&(this.spanId=t.spanId),t.parentSpanId&&(this.parentSpanId=t.parentSpanId),"sampled"in t&&(this.sampled=t.sampled),t.op&&(this.op=t.op),t.description&&(this.description=t.description),t.data&&(this.data=t.data),t.tags&&(this.tags=t.tags),t.status&&(this.status=t.status),t.startTimestamp&&(this.startTimestamp=t.startTimestamp),t.endTimestamp&&(this.endTimestamp=t.endTimestamp),t.instrumenter&&(this.instrumenter=t.instrumenter)}startChild(t){const e=new c({...t,parentSpanId:this.spanId,sampled:this.sampled,traceId:this.traceId})
if(e.spanRecorder=this.spanRecorder,e.spanRecorder&&e.spanRecorder.add(e),e.transaction=this.transaction,("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&e.transaction){const n=`[Tracing] Starting '${t&&t.op||"< unknown op >"}' span on transaction '${e.transaction.name||"< unknown name >"}' (${e.transaction.spanId}).`
e.transaction.metadata.spanMetadata[e.spanId]={logMessage:n},a.kg.log(n)}return e}setTag(t,e){return this.tags={...this.tags,[t]:e},this}setData(t,e){return this.data={...this.data,[t]:e},this}setStatus(t){return this.status=t,this}setHttpStatus(t){this.setTag("http.status_code",String(t))
const e=_(t)
return"unknown_error"!==e&&this.setStatus(e),this}isSuccess(){return"ok"===this.status}finish(t){if(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&this.transaction&&this.transaction.spanId!==this.spanId){const{logMessage:t}=this.transaction.metadata.spanMetadata[this.spanId]
t&&a.kg.log(t.replace("Starting","Finishing"))}this.endTimestamp="number"==typeof t?t:(0,s._I)()}toTraceparent(){let t=""
return void 0!==this.sampled&&(t=this.sampled?"-1":"-0"),`${this.traceId}-${this.spanId}${t}`}toContext(){return(0,r.Jr)({data:this.data,description:this.description,endTimestamp:this.endTimestamp,op:this.op,parentSpanId:this.parentSpanId,sampled:this.sampled,spanId:this.spanId,startTimestamp:this.startTimestamp,status:this.status,tags:this.tags,traceId:this.traceId})}updateWithContext(t){return this.data=t.data||{},this.description=t.description,this.endTimestamp=t.endTimestamp,this.op=t.op,this.parentSpanId=t.parentSpanId,this.sampled=t.sampled,this.spanId=t.spanId||this.spanId,this.startTimestamp=t.startTimestamp||this.startTimestamp,this.status=t.status,this.tags=t.tags||{},this.traceId=t.traceId||this.traceId,this}getTraceContext(){return(0,r.Jr)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,trace_id:this.traceId})}toJSON(){return(0,r.Jr)({data:Object.keys(this.data).length>0?this.data:void 0,description:this.description,op:this.op,parent_span_id:this.parentSpanId,span_id:this.spanId,start_timestamp:this.startTimestamp,status:this.status,tags:Object.keys(this.tags).length>0?this.tags:void 0,timestamp:this.endTimestamp,trace_id:this.traceId})}}function _(t){if(t<400&&t>=100)return"ok"
if(t>=400&&t<500)switch(t){case 401:return"unauthenticated"
case 403:return"permission_denied"
case 404:return"not_found"
case 409:return"already_exists"
case 413:return"failed_precondition"
case 429:return"resource_exhausted"
default:return"invalid_argument"}if(t>=500&&t<600)switch(t){case 501:return"unimplemented"
case 503:return"unavailable"
case 504:return"deadline_exceeded"
default:return"internal_error"}return"unknown_error"}},21535:(t,e,n)=>{n.d(e,{Y:()=>o})
var i=n(8651),s=n(88521),a=n(15834),r=n(20484)
class o extends r.Dr{__init(){this._measurements={}}__init2(){this._contexts={}}__init3(){this._frozenDynamicSamplingContext=void 0}constructor(t,e){super(t),o.prototype.__init.call(this),o.prototype.__init2.call(this),o.prototype.__init3.call(this),this._hub=e||(0,i.Gd)(),this._name=t.name||"",this.metadata={source:"custom",...t.metadata,spanMetadata:{}},this._trimEnd=t.trimEnd,this.transaction=this
const n=this.metadata.dynamicSamplingContext
n&&(this._frozenDynamicSamplingContext={...n})}get name(){return this._name}set name(t){this.setName(t)}setName(t){let e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"custom"
this._name=t,this.metadata.source=e}initSpanRecorder(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e3
this.spanRecorder||(this.spanRecorder=new r.gB(t)),this.spanRecorder.add(this)}setContext(t,e){null===e?delete this._contexts[t]:this._contexts[t]=e}setMeasurement(t,e){let n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:""
this._measurements[t]={value:e,unit:n}}setMetadata(t){this.metadata={...this.metadata,...t}}finish(t){if(void 0!==this.endTimestamp)return
if(this.name||(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.warn("Transaction has no name, falling back to `<unlabeled transaction>`."),this.name="<unlabeled transaction>"),super.finish(t),!0!==this.sampled){("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Tracing] Discarding transaction because its trace was not chosen to be sampled.")
const t=this._hub.getClient()
return void(t&&t.recordDroppedEvent("sample_rate","transaction"))}const e=this.spanRecorder?this.spanRecorder.spans.filter((t=>t!==this&&t.endTimestamp)):[]
this._trimEnd&&e.length>0&&(this.endTimestamp=e.reduce(((t,e)=>t.endTimestamp&&e.endTimestamp?t.endTimestamp>e.endTimestamp?t:e:t)).endTimestamp)
const n=this.metadata,i={contexts:{...this._contexts,trace:this.getTraceContext()},spans:e,start_timestamp:this.startTimestamp,tags:this.tags,timestamp:this.endTimestamp,transaction:this.name,type:"transaction",sdkProcessingMetadata:{...n,dynamicSamplingContext:this.getDynamicSamplingContext()},...n.source&&{transaction_info:{source:n.source}}}
return Object.keys(this._measurements).length>0&&(("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log("[Measurements] Adding measurements to transaction",JSON.stringify(this._measurements,void 0,2)),i.measurements=this._measurements),("undefined"==typeof __SENTRY_DEBUG__||__SENTRY_DEBUG__)&&s.kg.log(`[Tracing] Finishing ${this.op} transaction: ${this.name}.`),this._hub.captureEvent(i)}toContext(){const t=super.toContext()
return(0,a.Jr)({...t,name:this.name,trimEnd:this._trimEnd})}updateWithContext(t){return super.updateWithContext(t),this.name=t.name||"",this._trimEnd=t.trimEnd,this}getDynamicSamplingContext(){if(this._frozenDynamicSamplingContext)return this._frozenDynamicSamplingContext
const t=this._hub||(0,i.Gd)(),e=t&&t.getClient()
if(!e)return{}
const{environment:n,release:s}=e.getOptions()||{},{publicKey:r}=e.getDsn()||{},o=this.metadata.sampleRate,c=void 0!==o?o.toString():void 0,_=t.getScope(),{segment:d}=_&&_.getUser()||{},l=this.metadata.source,p=l&&"url"!==l?this.name:void 0
return(0,a.Jr)({environment:n,release:s,transaction:p,user_segment:d,public_key:r,trace_id:this.traceId,sample_rate:c})}}},48206:(t,e,n)=>{n.d(e,{XL:()=>o,x1:()=>r,zu:()=>a})
var i=n(12058),s=n(8651)
function a(t){return(0,i.z)(t)}function r(t){const e=(t||(0,s.Gd)()).getScope()
return e&&e.getTransaction()}function o(t){return t/1e3}}}])

//# sourceMappingURL=chunk.79.4a959c324df25480b90e.map