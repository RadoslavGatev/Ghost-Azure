!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.CodeMirror=t()}(this,function(){"use strict"
function e(e){return new RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}function t(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild)
return e}function r(e,r){return t(e).appendChild(r)}function n(e,t,r,n){var i=document.createElement(e)
if(r&&(i.className=r),n&&(i.style.cssText=n),"string"==typeof t)i.appendChild(document.createTextNode(t))
else if(t)for(var o=0;o<t.length;++o)i.appendChild(t[o])
return i}function i(e,t,r,i){var o=n(e,t,r,i)
return o.setAttribute("role","presentation"),o}function o(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t)
do{if(11==t.nodeType&&(t=t.host),t==e)return!0}while(t=t.parentNode)}function a(){var e
try{e=document.activeElement}catch(t){e=document.body||null}for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement
return e}function l(t,r){var n=t.className
e(r).test(n)||(t.className+=(n?" ":"")+r)}function s(t,r){for(var n=t.split(" "),i=0;i<n.length;i++)n[i]&&!e(n[i]).test(r)&&(r+=" "+n[i])
return r}function u(e){var t=Array.prototype.slice.call(arguments,1)
return function(){return e.apply(null,t)}}function c(e,t,r){t||(t={})
for(var n in e)!e.hasOwnProperty(n)||!1===r&&t.hasOwnProperty(n)||(t[n]=e[n])
return t}function d(e,t,r,n,i){null==t&&-1==(t=e.search(/[^\s\u00a0]/))&&(t=e.length)
for(var o=n||0,a=i||0;;){var l=e.indexOf("\t",o)
if(l<0||l>=t)return a+(t-o)
a+=l-o,a+=r-a%r,o=l+1}}function f(e,t){for(var r=0;r<e.length;++r)if(e[r]==t)return r
return-1}function h(e,t,r){for(var n=0,i=0;;){var o=e.indexOf("\t",n);-1==o&&(o=e.length)
var a=o-n
if(o==e.length||i+a>=t)return n+Math.min(a,t-i)
if(i+=o-n,i+=r-i%r,n=o+1,i>=t)return n}}function p(e){for(;mo.length<=e;)mo.push(g(mo)+" ")
return mo[e]}function g(e){return e[e.length-1]}function m(e,t){for(var r=[],n=0;n<e.length;n++)r[n]=t(e[n],n)
return r}function v(){}function y(e,t){var r
return Object.create?r=Object.create(e):(v.prototype=e,r=new v),t&&c(t,r),r}function b(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||vo.test(e))}function w(e,t){return t?!!(t.source.indexOf("\\w")>-1&&b(e))||t.test(e):b(e)}function x(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1
return!0}function k(e){return e.charCodeAt(0)>=768&&yo.test(e)}function C(e,t,r){for(;(r<0?t>0:t<e.length)&&k(e.charAt(t));)t+=r
return t}function S(e,t,r){for(var n=t>r?-1:1;;){if(t==r)return t
var i=(t+r)/2,o=n<0?Math.ceil(i):Math.floor(i)
if(o==t)return e(o)?t:r
e(o)?r=o:t=o+n}}function L(e,t){if((t-=e.first)<0||t>=e.size)throw new Error("There is no line "+(t+e.first)+" in the document.")
for(var r=e;!r.lines;)for(var n=0;;++n){var i=r.children[n],o=i.chunkSize()
if(t<o){r=i
break}t-=o}return r.lines[t]}function T(e,t,r){var n=[],i=t.line
return e.iter(t.line,r.line+1,function(e){var o=e.text
i==r.line&&(o=o.slice(0,r.ch)),i==t.line&&(o=o.slice(t.ch)),n.push(o),++i}),n}function M(e,t,r){var n=[]
return e.iter(t,r,function(e){n.push(e.text)}),n}function N(e,t){var r=t-e.height
if(r)for(var n=e;n;n=n.parent)n.height+=r}function A(e){if(null==e.parent)return null
for(var t=e.parent,r=f(t.lines,e),n=t.parent;n;t=n,n=n.parent)for(var i=0;n.children[i]!=t;++i)r+=n.children[i].chunkSize()
return r+t.first}function O(e,t){var r=e.first
e:do{for(var n=0;n<e.children.length;++n){var i=e.children[n],o=i.height
if(t<o){e=i
continue e}t-=o,r+=i.chunkSize()}return r}while(!e.lines)
for(var a=0;a<e.lines.length;++a){var l=e.lines[a].height
if(t<l)break
t-=l}return r+a}function W(e,t){return t>=e.first&&t<e.first+e.size}function z(e,t){return String(e.lineNumberFormatter(t+e.firstLineNumber))}function D(e,t,r){if(void 0===r&&(r=null),!(this instanceof D))return new D(e,t,r)
this.line=e,this.ch=t,this.sticky=r}function P(e,t){return e.line-t.line||e.ch-t.ch}function H(e,t){return e.sticky==t.sticky&&0==P(e,t)}function E(e){return D(e.line,e.ch)}function I(e,t){return P(e,t)<0?t:e}function F(e,t){return P(e,t)<0?e:t}function R(e,t){return Math.max(e.first,Math.min(t,e.first+e.size-1))}function B(e,t){if(t.line<e.first)return D(e.first,0)
var r=e.first+e.size-1
return t.line>r?D(r,L(e,r).text.length):function(e,t){var r=e.ch
return null==r||r>t?D(e.line,t):r<0?D(e.line,0):e}(t,L(e,t.line).text.length)}function j(e,t){for(var r=[],n=0;n<t.length;n++)r[n]=B(e,t[n])
return r}function V(e,t,r){this.marker=e,this.from=t,this.to=r}function K(e,t){if(e)for(var r=0;r<e.length;++r){var n=e[r]
if(n.marker==t)return n}}function G(e,t){for(var r,n=0;n<e.length;++n)e[n]!=t&&(r||(r=[])).push(e[n])
return r}function U(e,t){if(t.full)return null
var r=W(e,t.from.line)&&L(e,t.from.line).markedSpans,n=W(e,t.to.line)&&L(e,t.to.line).markedSpans
if(!r&&!n)return null
var i=t.from.ch,o=t.to.ch,a=0==P(t.from,t.to),l=function(e,t,r){var n
if(e)for(var i=0;i<e.length;++i){var o=e[i],a=o.marker
if(null==o.from||(a.inclusiveLeft?o.from<=t:o.from<t)||o.from==t&&"bookmark"==a.type&&(!r||!o.marker.insertLeft)){var l=null==o.to||(a.inclusiveRight?o.to>=t:o.to>t);(n||(n=[])).push(new V(a,o.from,l?null:o.to))}}return n}(r,i,a),s=function(e,t,r){var n
if(e)for(var i=0;i<e.length;++i){var o=e[i],a=o.marker
if(null==o.to||(a.inclusiveRight?o.to>=t:o.to>t)||o.from==t&&"bookmark"==a.type&&(!r||o.marker.insertLeft)){var l=null==o.from||(a.inclusiveLeft?o.from<=t:o.from<t);(n||(n=[])).push(new V(a,l?null:o.from-t,null==o.to?null:o.to-t))}}return n}(n,o,a),u=1==t.text.length,c=g(t.text).length+(u?i:0)
if(l)for(var d=0;d<l.length;++d){var f=l[d]
if(null==f.to){var h=K(s,f.marker)
h?u&&(f.to=null==h.to?null:h.to+c):f.to=i}}if(s)for(var p=0;p<s.length;++p){var m=s[p]
null!=m.to&&(m.to+=c),null==m.from?K(l,m.marker)||(m.from=c,u&&(l||(l=[])).push(m)):(m.from+=c,u&&(l||(l=[])).push(m))}l&&(l=q(l)),s&&s!=l&&(s=q(s))
var v=[l]
if(!u){var y,b=t.text.length-2
if(b>0&&l)for(var w=0;w<l.length;++w)null==l[w].to&&(y||(y=[])).push(new V(l[w].marker,null,null))
for(var x=0;x<b;++x)v.push(y)
v.push(s)}return v}function q(e){for(var t=0;t<e.length;++t){var r=e[t]
null!=r.from&&r.from==r.to&&!1!==r.marker.clearWhenEmpty&&e.splice(t--,1)}return e.length?e:null}function $(e){var t=e.markedSpans
if(t){for(var r=0;r<t.length;++r)t[r].marker.detachLine(e)
e.markedSpans=null}}function _(e,t){if(t){for(var r=0;r<t.length;++r)t[r].marker.attachLine(e)
e.markedSpans=t}}function X(e){return e.inclusiveLeft?-1:0}function Y(e){return e.inclusiveRight?1:0}function Z(e,t){var r=e.lines.length-t.lines.length
if(0!=r)return r
var n=e.find(),i=t.find(),o=P(n.from,i.from)||X(e)-X(t)
if(o)return-o
return P(n.to,i.to)||Y(e)-Y(t)||t.id-e.id}function Q(e,t){var r,n=wo&&e.markedSpans
if(n)for(var i=void 0,o=0;o<n.length;++o)(i=n[o]).marker.collapsed&&null==(t?i.from:i.to)&&(!r||Z(r,i.marker)<0)&&(r=i.marker)
return r}function J(e){return Q(e,!0)}function ee(e){return Q(e,!1)}function te(e,t,r,n,i){var o=L(e,t),a=wo&&o.markedSpans
if(a)for(var l=0;l<a.length;++l){var s=a[l]
if(s.marker.collapsed){var u=s.marker.find(0),c=P(u.from,r)||X(s.marker)-X(i),d=P(u.to,n)||Y(s.marker)-Y(i)
if(!(c>=0&&d<=0||c<=0&&d>=0)&&(c<=0&&(s.marker.inclusiveRight&&i.inclusiveLeft?P(u.to,r)>=0:P(u.to,r)>0)||c>=0&&(s.marker.inclusiveRight&&i.inclusiveLeft?P(u.from,n)<=0:P(u.from,n)<0)))return!0}}}function re(e){for(var t;t=J(e);)e=t.find(-1,!0).line
return e}function ne(e,t){var r=L(e,t),n=re(r)
return r==n?t:A(n)}function ie(e,t){if(t>e.lastLine())return t
var r,n=L(e,t)
if(!oe(e,n))return t
for(;r=ee(n);)n=r.find(1,!0).line
return A(n)+1}function oe(e,t){var r=wo&&t.markedSpans
if(r)for(var n=void 0,i=0;i<r.length;++i)if((n=r[i]).marker.collapsed){if(null==n.from)return!0
if(!n.marker.widgetNode&&0==n.from&&n.marker.inclusiveLeft&&ae(e,t,n))return!0}}function ae(e,t,r){if(null==r.to){var n=r.marker.find(1,!0)
return ae(e,n.line,K(n.line.markedSpans,r.marker))}if(r.marker.inclusiveRight&&r.to==t.text.length)return!0
for(var i=void 0,o=0;o<t.markedSpans.length;++o)if((i=t.markedSpans[o]).marker.collapsed&&!i.marker.widgetNode&&i.from==r.to&&(null==i.to||i.to!=r.from)&&(i.marker.inclusiveLeft||r.marker.inclusiveRight)&&ae(e,t,i))return!0}function le(e){for(var t=0,r=(e=re(e)).parent,n=0;n<r.lines.length;++n){var i=r.lines[n]
if(i==e)break
t+=i.height}for(var o=r.parent;o;r=o,o=r.parent)for(var a=0;a<o.children.length;++a){var l=o.children[a]
if(l==r)break
t+=l.height}return t}function se(e){if(0==e.height)return 0
for(var t,r=e.text.length,n=e;t=J(n);){var i=t.find(0,!0)
n=i.from.line,r+=i.from.ch-i.to.ch}for(n=e;t=ee(n);){var o=t.find(0,!0)
r-=n.text.length-o.from.ch,r+=(n=o.to.line).text.length-o.to.ch}return r}function ue(e){var t=e.display,r=e.doc
t.maxLine=L(r,r.first),t.maxLineLength=se(t.maxLine),t.maxLineChanged=!0,r.iter(function(e){var r=se(e)
r>t.maxLineLength&&(t.maxLineLength=r,t.maxLine=e)})}function ce(e,t,r){var n
xo=null
for(var i=0;i<e.length;++i){var o=e[i]
if(o.from<t&&o.to>t)return i
o.to==t&&(o.from!=o.to&&"before"==r?n=i:xo=i),o.from==t&&(o.from!=o.to&&"before"!=r?n=i:xo=i)}return null!=n?n:xo}function de(e,t){var r=e.order
return null==r&&(r=e.order=ko(e.text,t)),r}function fe(e,t){return e._handlers&&e._handlers[t]||Co}function he(e,t,r){if(e.removeEventListener)e.removeEventListener(t,r,!1)
else if(e.detachEvent)e.detachEvent("on"+t,r)
else{var n=e._handlers,i=n&&n[t]
if(i){var o=f(i,r)
o>-1&&(n[t]=i.slice(0,o).concat(i.slice(o+1)))}}}function pe(e,t){var r=fe(e,t)
if(r.length)for(var n=Array.prototype.slice.call(arguments,2),i=0;i<r.length;++i)r[i].apply(null,n)}function ge(e,t,r){return"string"==typeof t&&(t={type:t,preventDefault:function(){this.defaultPrevented=!0}}),pe(e,r||t.type,e,t),xe(t)||t.codemirrorIgnore}function me(e){var t=e._handlers&&e._handlers.cursorActivity
if(t)for(var r=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),n=0;n<t.length;++n)-1==f(r,t[n])&&r.push(t[n])}function ve(e,t){return fe(e,t).length>0}function ye(e){e.prototype.on=function(e,t){So(this,e,t)},e.prototype.off=function(e,t){he(this,e,t)}}function be(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function we(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function xe(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function ke(e){be(e),we(e)}function Ce(e){return e.target||e.srcElement}function Se(e){var t=e.which
return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)),Qi&&e.ctrlKey&&1==t&&(t=3),t}function Le(e){if(null==so){var t=n("span","​")
r(e,n("span",[t,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(so=t.offsetWidth<=1&&t.offsetHeight>2&&!(Bi&&ji<8))}var i=so?n("span","​"):n("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px")
return i.setAttribute("cm-text",""),i}function Te(e){if(null!=uo)return uo
var n=r(e,document.createTextNode("AخA")),i=ro(n,0,1).getBoundingClientRect(),o=ro(n,1,2).getBoundingClientRect()
return t(e),!(!i||i.left==i.right)&&(uo=o.right-i.right<3)}function Me(e){if("string"==typeof e&&Wo.hasOwnProperty(e))e=Wo[e]
else if(e&&"string"==typeof e.name&&Wo.hasOwnProperty(e.name)){var t=Wo[e.name]
"string"==typeof t&&(t={name:t}),(e=y(t,e)).name=t.name}else{if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return Me("application/xml")
if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e))return Me("application/json")}return"string"==typeof e?{name:e}:e||{name:"null"}}function Ne(e,t){t=Me(t)
var r=Oo[t.name]
if(!r)return Ne(e,"text/plain")
var n=r(e,t)
if(zo.hasOwnProperty(t.name)){var i=zo[t.name]
for(var o in i)i.hasOwnProperty(o)&&(n.hasOwnProperty(o)&&(n["_"+o]=n[o]),n[o]=i[o])}if(n.name=t.name,t.helperType&&(n.helperType=t.helperType),t.modeProps)for(var a in t.modeProps)n[a]=t.modeProps[a]
return n}function Ae(e,t){c(t,zo.hasOwnProperty(e)?zo[e]:zo[e]={})}function Oe(e,t){if(!0===t)return t
if(e.copyState)return e.copyState(t)
var r={}
for(var n in t){var i=t[n]
i instanceof Array&&(i=i.concat([])),r[n]=i}return r}function We(e,t){for(var r;e.innerMode&&(r=e.innerMode(t))&&r.mode!=e;)t=r.state,e=r.mode
return r||{mode:e,state:t}}function ze(e,t,r){return!e.startState||e.startState(t,r)}function De(e,t,r,n){var i=[e.state.modeGen],o={}
je(e,t.text,e.doc.mode,r,function(e,t){return i.push(e,t)},o,n)
for(var a=r.state,l=function(n){r.baseTokens=i
var l=e.state.overlays[n],s=1,u=0
r.state=!0,je(e,t.text,l.mode,r,function(e,t){for(var r=s;u<e;){var n=i[s]
n>e&&i.splice(s,1,e,i[s+1],n),s+=2,u=Math.min(e,n)}if(t)if(l.opaque)i.splice(r,s-r,e,"overlay "+t),s=r+2
else for(;r<s;r+=2){var o=i[r+1]
i[r+1]=(o?o+" ":"")+"overlay "+t}},o),r.state=a,r.baseTokens=null,r.baseTokenPos=1},s=0;s<e.state.overlays.length;++s)l(s)
return{styles:i,classes:o.bgClass||o.textClass?o:null}}function Pe(e,t,r){if(!t.styles||t.styles[0]!=e.state.modeGen){var n=He(e,A(t)),i=t.text.length>e.options.maxHighlightLength&&Oe(e.doc.mode,n.state),o=De(e,t,n)
i&&(n.state=i),t.stateAfter=n.save(!i),t.styles=o.styles,o.classes?t.styleClasses=o.classes:t.styleClasses&&(t.styleClasses=null),r===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return t.styles}function He(e,t,r){var n=e.doc,i=e.display
if(!n.mode.startState)return new Ho(n,!0,t)
var o=function(e,t,r){for(var n,i,o=e.doc,a=r?-1:t-(e.doc.mode.innerMode?1e3:100),l=t;l>a;--l){if(l<=o.first)return o.first
var s=L(o,l-1),u=s.stateAfter
if(u&&(!r||l+(u instanceof Po?u.lookAhead:0)<=o.modeFrontier))return l
var c=d(s.text,null,e.options.tabSize);(null==i||n>c)&&(i=l-1,n=c)}return i}(e,t,r),a=o>n.first&&L(n,o-1).stateAfter,l=a?Ho.fromSaved(n,a,o):new Ho(n,ze(n.mode),o)
return n.iter(o,t,function(r){Ee(e,r.text,l)
var n=l.line
r.stateAfter=n==t-1||n%5==0||n>=i.viewFrom&&n<i.viewTo?l.save():null,l.nextLine()}),r&&(n.modeFrontier=l.line),l}function Ee(e,t,r,n){var i=e.doc.mode,o=new Do(t,e.options.tabSize,r)
for(o.start=o.pos=n||0,""==t&&Ie(i,r.state);!o.eol();)Fe(i,o,r.state),o.start=o.pos}function Ie(e,t){if(e.blankLine)return e.blankLine(t)
if(e.innerMode){var r=We(e,t)
return r.mode.blankLine?r.mode.blankLine(r.state):void 0}}function Fe(e,t,r,n){for(var i=0;i<10;i++){n&&(n[0]=We(e,r).mode)
var o=e.token(t,r)
if(t.pos>t.start)return o}throw new Error("Mode "+e.name+" failed to advance stream.")}function Re(e,t,r,n){var i,o,a=e.doc,l=a.mode,s=L(a,(t=B(a,t)).line),u=He(e,t.line,r),c=new Do(s.text,e.options.tabSize,u)
for(n&&(o=[]);(n||c.pos<t.ch)&&!c.eol();)c.start=c.pos,i=Fe(l,c,u.state),n&&o.push(new Eo(c,i,Oe(a.mode,u.state)))
return n?o:new Eo(c,i,u.state)}function Be(e,t){if(e)for(;;){var r=e.match(/(?:^|\s+)line-(background-)?(\S+)/)
if(!r)break
e=e.slice(0,r.index)+e.slice(r.index+r[0].length)
var n=r[1]?"bgClass":"textClass"
null==t[n]?t[n]=r[2]:new RegExp("(?:^|s)"+r[2]+"(?:$|s)").test(t[n])||(t[n]+=" "+r[2])}return e}function je(e,t,r,n,i,o,a){var l=r.flattenSpans
null==l&&(l=e.options.flattenSpans)
var s,u=0,c=null,d=new Do(t,e.options.tabSize,n),f=e.options.addModeClass&&[null]
for(""==t&&Be(Ie(r,n.state),o);!d.eol();){if(d.pos>e.options.maxHighlightLength?(l=!1,a&&Ee(e,t,n,d.pos),d.pos=t.length,s=null):s=Be(Fe(r,d,n.state,f),o),f){var h=f[0].name
h&&(s="m-"+(s?h+" "+s:h))}if(!l||c!=s){for(;u<d.start;)i(u=Math.min(d.start,u+5e3),c)
c=s}d.start=d.pos}for(;u<d.pos;){var p=Math.min(d.pos,u+5e3)
i(p,c),u=p}}function Ve(e){e.parent=null,$(e)}function Ke(e,t){if(!e||/^\s*$/.test(e))return null
var r=t.addModeClass?Bo:Ro
return r[e]||(r[e]=e.replace(/\S+/g,"cm-$&"))}function Ge(e,t){var r=i("span",null,null,Vi?"padding-right: .1px":null),n={pre:i("pre",[r],"CodeMirror-line"),content:r,col:0,pos:0,cm:e,trailingSpace:!1,splitSpaces:(Bi||Vi)&&e.getOption("lineWrapping")}
t.measure={}
for(var o=0;o<=(t.rest?t.rest.length:0);o++){var a=o?t.rest[o-1]:t.line,l=void 0
n.pos=0,n.addToken=qe,Te(e.display.measure)&&(l=de(a,e.doc.direction))&&(n.addToken=function(e,t){return function(r,n,i,o,a,l,s){i=i?i+" cm-force-border":"cm-force-border"
for(var u=r.pos,c=u+n.length;;){for(var d=void 0,f=0;f<t.length&&!((d=t[f]).to>u&&d.from<=u);f++);if(d.to>=c)return e(r,n,i,o,a,l,s)
e(r,n.slice(0,d.to-u),i,o,null,l,s),o=null,n=n.slice(d.to-u),u=d.to}}}(n.addToken,l)),n.map=[],!function(e,t,r){var n=e.markedSpans,i=e.text,o=0
if(n)for(var a,l,s,u,c,d,f,h=i.length,p=0,g=1,m="",v=0;;){if(v==p){s=u=c=d=l="",f=null,v=1/0
for(var y=[],b=void 0,w=0;w<n.length;++w){var x=n[w],k=x.marker
"bookmark"==k.type&&x.from==p&&k.widgetNode?y.push(k):x.from<=p&&(null==x.to||x.to>p||k.collapsed&&x.to==p&&x.from==p)?(null!=x.to&&x.to!=p&&v>x.to&&(v=x.to,u=""),k.className&&(s+=" "+k.className),k.css&&(l=(l?l+";":"")+k.css),k.startStyle&&x.from==p&&(c+=" "+k.startStyle),k.endStyle&&x.to==v&&(b||(b=[])).push(k.endStyle,x.to),k.title&&!d&&(d=k.title),k.collapsed&&(!f||Z(f.marker,k)<0)&&(f=x)):x.from>p&&v>x.from&&(v=x.from)}if(b)for(var C=0;C<b.length;C+=2)b[C+1]==v&&(u+=" "+b[C])
if(!f||f.from==p)for(var S=0;S<y.length;++S)$e(t,0,y[S])
if(f&&(f.from||0)==p){if($e(t,(null==f.to?h+1:f.to)-p,f.marker,null==f.from),null==f.to)return
f.to==p&&(f=!1)}}if(p>=h)break
for(var L=Math.min(h,v);;){if(m){var T=p+m.length
if(!f){var M=T>L?m.slice(0,L-p):m
t.addToken(t,M,a?a+s:s,c,p+M.length==v?u:"",d,l)}if(T>=L){m=m.slice(L-p),p=L
break}p=T,c=""}m=i.slice(o,o=r[g++]),a=Ke(r[g++],t.cm.options)}}else for(var N=1;N<r.length;N+=2)t.addToken(t,i.slice(o,o=r[N]),Ke(r[N+1],t.cm.options))}(a,n,Pe(e,a,t!=e.display.externalMeasured&&A(a))),a.styleClasses&&(a.styleClasses.bgClass&&(n.bgClass=s(a.styleClasses.bgClass,n.bgClass||"")),a.styleClasses.textClass&&(n.textClass=s(a.styleClasses.textClass,n.textClass||""))),0==n.map.length&&n.map.push(0,0,n.content.appendChild(Le(e.display.measure))),0==o?(t.measure.map=n.map,t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(n.map),(t.measure.caches||(t.measure.caches=[])).push({}))}if(Vi){var u=n.content.lastChild;(/\bcm-tab\b/.test(u.className)||u.querySelector&&u.querySelector(".cm-tab"))&&(n.content.className="cm-tab-wrap-hack")}return pe(e,"renderLine",e,t.line,n.pre),n.pre.className&&(n.textClass=s(n.pre.className,n.textClass||"")),n}function Ue(e){var t=n("span","•","cm-invalidchar")
return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t}function qe(e,t,r,i,o,a,l){if(t){var s,u=e.splitSpaces?function(e,t){if(e.length>1&&!/  /.test(e))return e
for(var r=t,n="",i=0;i<e.length;i++){var o=e.charAt(i)
" "!=o||!r||i!=e.length-1&&32!=e.charCodeAt(i+1)||(o=" "),n+=o,r=" "==o}return n}(t,e.trailingSpace):t,c=e.cm.state.specialChars,d=!1
if(c.test(t)){s=document.createDocumentFragment()
for(var f=0;;){c.lastIndex=f
var h=c.exec(t),g=h?h.index-f:t.length-f
if(g){var m=document.createTextNode(u.slice(f,f+g))
Bi&&ji<9?s.appendChild(n("span",[m])):s.appendChild(m),e.map.push(e.pos,e.pos+g,m),e.col+=g,e.pos+=g}if(!h)break
f+=g+1
var v=void 0
if("\t"==h[0]){var y=e.cm.options.tabSize,b=y-e.col%y;(v=s.appendChild(n("span",p(b),"cm-tab"))).setAttribute("role","presentation"),v.setAttribute("cm-text","\t"),e.col+=b}else"\r"==h[0]||"\n"==h[0]?((v=s.appendChild(n("span","\r"==h[0]?"␍":"␤","cm-invalidchar"))).setAttribute("cm-text",h[0]),e.col+=1):((v=e.cm.options.specialCharPlaceholder(h[0])).setAttribute("cm-text",h[0]),Bi&&ji<9?s.appendChild(n("span",[v])):s.appendChild(v),e.col+=1)
e.map.push(e.pos,e.pos+1,v),e.pos++}}else e.col+=t.length,s=document.createTextNode(u),e.map.push(e.pos,e.pos+t.length,s),Bi&&ji<9&&(d=!0),e.pos+=t.length
if(e.trailingSpace=32==u.charCodeAt(t.length-1),r||i||o||d||l){var w=r||""
i&&(w+=i),o&&(w+=o)
var x=n("span",[s],w,l)
return a&&(x.title=a),e.content.appendChild(x)}e.content.appendChild(s)}}function $e(e,t,r,n){var i=!n&&r.widgetNode
i&&e.map.push(e.pos,e.pos+t,i),!n&&e.cm.display.input.needsContentAttribute&&(i||(i=e.content.appendChild(document.createElement("span"))),i.setAttribute("cm-marker",r.id)),i&&(e.cm.display.input.setUneditable(i),e.content.appendChild(i)),e.pos+=t,e.trailingSpace=!1}function _e(e,t,r){this.line=t,this.rest=function(e){for(var t,r;t=ee(e);)e=t.find(1,!0).line,(r||(r=[])).push(e)
return r}(t),this.size=this.rest?A(g(this.rest))-r+1:1,this.node=this.text=null,this.hidden=oe(e,t)}function Xe(e,t,r){for(var n,i=[],o=t;o<r;o=n){var a=new _e(e.doc,L(e.doc,o),o)
n=o+a.size,i.push(a)}return i}function Ye(e,t){var r=fe(e,t)
if(r.length){var n,i=Array.prototype.slice.call(arguments,2)
jo?n=jo.delayedCallbacks:Vo?n=Vo:(n=Vo=[],setTimeout(Ze,0))
for(var o=function(e){n.push(function(){return r[e].apply(null,i)})},a=0;a<r.length;++a)o(a)}}function Ze(){var e=Vo
Vo=null
for(var t=0;t<e.length;++t)e[t]()}function Qe(e,t,r,n){for(var i=0;i<t.changes.length;i++){var o=t.changes[i]
"text"==o?function(e,t){var r=t.text.className,n=et(e,t)
t.text==t.node&&(t.node=n.pre),t.text.parentNode.replaceChild(n.pre,t.text),t.text=n.pre,n.bgClass!=t.bgClass||n.textClass!=t.textClass?(t.bgClass=n.bgClass,t.textClass=n.textClass,tt(e,t)):r&&(t.text.className=r)}(e,t):"gutter"==o?rt(e,t,r,n):"class"==o?tt(e,t):"widget"==o&&function(e,t,r){t.alignable&&(t.alignable=null)
for(var n=t.node.firstChild,i=void 0;n;n=i)i=n.nextSibling,"CodeMirror-linewidget"==n.className&&t.node.removeChild(n)
it(e,t,r)}(e,t,n)}t.changes=null}function Je(e){return e.node==e.text&&(e.node=n("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),Bi&&ji<8&&(e.node.style.zIndex=2)),e.node}function et(e,t){var r=e.display.externalMeasured
return r&&r.line==t.line?(e.display.externalMeasured=null,t.measure=r.measure,r.built):Ge(e,t)}function tt(e,t){!function(e,t){var r=t.bgClass?t.bgClass+" "+(t.line.bgClass||""):t.line.bgClass
if(r&&(r+=" CodeMirror-linebackground"),t.background)r?t.background.className=r:(t.background.parentNode.removeChild(t.background),t.background=null)
else if(r){var i=Je(t)
t.background=i.insertBefore(n("div",null,r),i.firstChild),e.display.input.setUneditable(t.background)}}(e,t),t.line.wrapClass?Je(t).className=t.line.wrapClass:t.node!=t.text&&(t.node.className="")
var r=t.textClass?t.textClass+" "+(t.line.textClass||""):t.line.textClass
t.text.className=r||""}function rt(e,t,r,i){if(t.gutter&&(t.node.removeChild(t.gutter),t.gutter=null),t.gutterBackground&&(t.node.removeChild(t.gutterBackground),t.gutterBackground=null),t.line.gutterClass){var o=Je(t)
t.gutterBackground=n("div",null,"CodeMirror-gutter-background "+t.line.gutterClass,"left: "+(e.options.fixedGutter?i.fixedPos:-i.gutterTotalWidth)+"px; width: "+i.gutterTotalWidth+"px"),e.display.input.setUneditable(t.gutterBackground),o.insertBefore(t.gutterBackground,t.text)}var a=t.line.gutterMarkers
if(e.options.lineNumbers||a){var l=Je(t),s=t.gutter=n("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?i.fixedPos:-i.gutterTotalWidth)+"px")
if(e.display.input.setUneditable(s),l.insertBefore(s,t.text),t.line.gutterClass&&(s.className+=" "+t.line.gutterClass),!e.options.lineNumbers||a&&a["CodeMirror-linenumbers"]||(t.lineNumber=s.appendChild(n("div",z(e.options,r),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+i.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),a)for(var u=0;u<e.options.gutters.length;++u){var c=e.options.gutters[u],d=a.hasOwnProperty(c)&&a[c]
d&&s.appendChild(n("div",[d],"CodeMirror-gutter-elt","left: "+i.gutterLeft[c]+"px; width: "+i.gutterWidth[c]+"px"))}}}function nt(e,t,r,n){var i=et(e,t)
return t.text=t.node=i.pre,i.bgClass&&(t.bgClass=i.bgClass),i.textClass&&(t.textClass=i.textClass),tt(e,t),rt(e,t,r,n),it(e,t,n),t.node}function it(e,t,r){if(ot(e,t.line,t,r,!0),t.rest)for(var n=0;n<t.rest.length;n++)ot(e,t.rest[n],t,r,!1)}function ot(e,t,r,i,o){if(t.widgets)for(var a=Je(r),l=0,s=t.widgets;l<s.length;++l){var u=s[l],c=n("div",[u.node],"CodeMirror-linewidget")
u.handleMouseEvents||c.setAttribute("cm-ignore-events","true"),function(e,t,r,n){if(e.noHScroll){(r.alignable||(r.alignable=[])).push(t)
var i=n.wrapperWidth
t.style.left=n.fixedPos+"px",e.coverGutter||(i-=n.gutterTotalWidth,t.style.paddingLeft=n.gutterTotalWidth+"px"),t.style.width=i+"px"}e.coverGutter&&(t.style.zIndex=5,t.style.position="relative",e.noHScroll||(t.style.marginLeft=-n.gutterTotalWidth+"px"))}(u,c,r,i),e.display.input.setUneditable(c),o&&u.above?a.insertBefore(c,r.gutter||r.text):a.appendChild(c),Ye(u,"redraw")}}function at(e){if(null!=e.height)return e.height
var t=e.doc.cm
if(!t)return 0
if(!o(document.body,e.node)){var i="position: relative;"
e.coverGutter&&(i+="margin-left: -"+t.display.gutters.offsetWidth+"px;"),e.noHScroll&&(i+="width: "+t.display.wrapper.clientWidth+"px;"),r(t.display.measure,n("div",[e.node],null,i))}return e.height=e.node.parentNode.offsetHeight}function lt(e,t){for(var r=Ce(t);r!=e.wrapper;r=r.parentNode)if(!r||1==r.nodeType&&"true"==r.getAttribute("cm-ignore-events")||r.parentNode==e.sizer&&r!=e.mover)return!0}function st(e){return e.lineSpace.offsetTop}function ut(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function ct(e){if(e.cachedPaddingH)return e.cachedPaddingH
var t=r(e.measure,n("pre","x")),i=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,o={left:parseInt(i.paddingLeft),right:parseInt(i.paddingRight)}
return isNaN(o.left)||isNaN(o.right)||(e.cachedPaddingH=o),o}function dt(e){return co-e.display.nativeBarWidth}function ft(e){return e.display.scroller.clientWidth-dt(e)-e.display.barWidth}function ht(e){return e.display.scroller.clientHeight-dt(e)-e.display.barHeight}function pt(e,t,r){if(e.line==t)return{map:e.measure.map,cache:e.measure.cache}
for(var n=0;n<e.rest.length;n++)if(e.rest[n]==t)return{map:e.measure.maps[n],cache:e.measure.caches[n]}
for(var i=0;i<e.rest.length;i++)if(A(e.rest[i])>r)return{map:e.measure.maps[i],cache:e.measure.caches[i],before:!0}}function gt(e,t,r,n){return yt(e,vt(e,t),r,n)}function mt(e,t){if(t>=e.display.viewFrom&&t<e.display.viewTo)return e.display.view[Kt(e,t)]
var r=e.display.externalMeasured
return r&&t>=r.lineN&&t<r.lineN+r.size?r:void 0}function vt(e,t){var n=A(t),i=mt(e,n)
i&&!i.text?i=null:i&&i.changes&&(Qe(e,i,n,Ft(e)),e.curOp.forceUpdate=!0),i||(i=function(e,t){var n=A(t=re(t)),i=e.display.externalMeasured=new _e(e.doc,t,n)
i.lineN=n
var o=i.built=Ge(e,i)
return i.text=o.pre,r(e.display.lineMeasure,o.pre),i}(e,t))
var o=pt(i,t,n)
return{line:t,view:i,rect:null,map:o.map,cache:o.cache,before:o.before,hasHeights:!1}}function yt(e,t,i,o,a){t.before&&(i=-1)
var l,s=i+(o||"")
return t.cache.hasOwnProperty(s)?l=t.cache[s]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()),t.hasHeights||(function(e,t,r){var n=e.options.lineWrapping,i=n&&ft(e)
if(!t.measure.heights||n&&t.measure.width!=i){var o=t.measure.heights=[]
if(n){t.measure.width=i
for(var a=t.text.firstChild.getClientRects(),l=0;l<a.length-1;l++){var s=a[l],u=a[l+1]
Math.abs(s.bottom-u.bottom)>2&&o.push((s.bottom+u.top)/2-r.top)}}o.push(r.bottom-r.top)}}(e,t.view,t.rect),t.hasHeights=!0),(l=function(e,t,i,o){var a,l=bt(t.map,i,o),s=l.node,u=l.start,c=l.end,d=l.collapse
if(3==s.nodeType){for(var f=0;f<4;f++){for(;u&&k(t.line.text.charAt(l.coverStart+u));)--u
for(;l.coverStart+c<l.coverEnd&&k(t.line.text.charAt(l.coverStart+c));)++c
if((a=Bi&&ji<9&&0==u&&c==l.coverEnd-l.coverStart?s.parentNode.getBoundingClientRect():function(e,t){var r=Ko
if("left"==t)for(var n=0;n<e.length&&(r=e[n]).left==r.right;n++);else for(var i=e.length-1;i>=0&&(r=e[i]).left==r.right;i--);return r}(ro(s,u,c).getClientRects(),o)).left||a.right||0==u)break
c=u,u-=1,d="right"}Bi&&ji<11&&(a=function(e,t){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!function(e){if(null!=Ao)return Ao
var t=r(e,n("span","x")),i=t.getBoundingClientRect(),o=ro(t,0,1).getBoundingClientRect()
return Ao=Math.abs(i.left-o.left)>1}(e))return t
var i=screen.logicalXDPI/screen.deviceXDPI,o=screen.logicalYDPI/screen.deviceYDPI
return{left:t.left*i,right:t.right*i,top:t.top*o,bottom:t.bottom*o}}(e.display.measure,a))}else{u>0&&(d=o="right")
var h
a=e.options.lineWrapping&&(h=s.getClientRects()).length>1?h["right"==o?h.length-1:0]:s.getBoundingClientRect()}if(Bi&&ji<9&&!u&&(!a||!a.left&&!a.right)){var p=s.parentNode.getClientRects()[0]
a=p?{left:p.left,right:p.left+It(e.display),top:p.top,bottom:p.bottom}:Ko}for(var g=a.top-t.rect.top,m=a.bottom-t.rect.top,v=(g+m)/2,y=t.view.measure.heights,b=0;b<y.length-1&&!(v<y[b]);b++);var w=b?y[b-1]:0,x=y[b],C={left:("right"==d?a.right:a.left)-t.rect.left,right:("left"==d?a.left:a.right)-t.rect.left,top:w,bottom:x}
return a.left||a.right||(C.bogus=!0),e.options.singleCursorHeightPerLine||(C.rtop=g,C.rbottom=m),C}(e,t,i,o)).bogus||(t.cache[s]=l)),{left:l.left,right:l.right,top:a?l.rtop:l.top,bottom:a?l.rbottom:l.bottom}}function bt(e,t,r){for(var n,i,o,a,l,s,u=0;u<e.length;u+=3)if(l=e[u],s=e[u+1],t<l?(i=0,o=1,a="left"):t<s?o=1+(i=t-l):(u==e.length-3||t==s&&e[u+3]>t)&&(i=(o=s-l)-1,t>=s&&(a="right")),null!=i){if(n=e[u+2],l==s&&r==(n.insertLeft?"left":"right")&&(a=r),"left"==r&&0==i)for(;u&&e[u-2]==e[u-3]&&e[u-1].insertLeft;)n=e[2+(u-=3)],a="left"
if("right"==r&&i==s-l)for(;u<e.length-3&&e[u+3]==e[u+4]&&!e[u+5].insertLeft;)n=e[(u+=3)+2],a="right"
break}return{node:n,start:i,end:o,collapse:a,coverStart:l,coverEnd:s}}function wt(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var t=0;t<e.rest.length;t++)e.measure.caches[t]={}}function xt(e){e.display.externalMeasure=null,t(e.display.lineMeasure)
for(var r=0;r<e.display.view.length;r++)wt(e.display.view[r])}function kt(e){xt(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function Ct(){return Gi&&Yi?-(document.body.getBoundingClientRect().left-parseInt(getComputedStyle(document.body).marginLeft)):window.pageXOffset||(document.documentElement||document.body).scrollLeft}function St(){return Gi&&Yi?-(document.body.getBoundingClientRect().top-parseInt(getComputedStyle(document.body).marginTop)):window.pageYOffset||(document.documentElement||document.body).scrollTop}function Lt(e){var t=0
if(e.widgets)for(var r=0;r<e.widgets.length;++r)e.widgets[r].above&&(t+=at(e.widgets[r]))
return t}function Tt(e,t,r,n,i){if(!i){var o=Lt(t)
r.top+=o,r.bottom+=o}if("line"==n)return r
n||(n="local")
var a=le(t)
if("local"==n?a+=st(e.display):a-=e.display.viewOffset,"page"==n||"window"==n){var l=e.display.lineSpace.getBoundingClientRect()
a+=l.top+("window"==n?0:St())
var s=l.left+("window"==n?0:Ct())
r.left+=s,r.right+=s}return r.top+=a,r.bottom+=a,r}function Mt(e,t,r){if("div"==r)return t
var n=t.left,i=t.top
if("page"==r)n-=Ct(),i-=St()
else if("local"==r||!r){var o=e.display.sizer.getBoundingClientRect()
n+=o.left,i+=o.top}var a=e.display.lineSpace.getBoundingClientRect()
return{left:n-a.left,top:i-a.top}}function Nt(e,t,r,n,i){return n||(n=L(e.doc,t.line)),Tt(e,n,gt(e,n,t.ch,i),r)}function At(e,t,r,n,i,o){function a(t,a){var l=yt(e,i,t,a?"right":"left",o)
return a?l.left=l.right:l.right=l.left,Tt(e,n,l,r)}function l(e,t,r){var n=1==s[t].level
return a(r?e-1:e,n!=r)}n=n||L(e.doc,t.line),i||(i=vt(e,n))
var s=de(n,e.doc.direction),u=t.ch,c=t.sticky
if(u>=n.text.length?(u=n.text.length,c="before"):u<=0&&(u=0,c="after"),!s)return a("before"==c?u-1:u,"before"==c)
var d=ce(s,u,c),f=xo,h=l(u,d,"before"==c)
return null!=f&&(h.other=l(u,f,"before"!=c)),h}function Ot(e,t){var r=0
t=B(e.doc,t),e.options.lineWrapping||(r=It(e.display)*t.ch)
var n=L(e.doc,t.line),i=le(n)+st(e.display)
return{left:r,right:r,top:i,bottom:i+n.height}}function Wt(e,t,r,n,i){var o=D(e,t,r)
return o.xRel=i,n&&(o.outside=!0),o}function zt(e,t,r){var n=e.doc
if((r+=e.display.viewOffset)<0)return Wt(n.first,0,null,!0,-1)
var i=O(n,r),o=n.first+n.size-1
if(i>o)return Wt(n.first+n.size-1,L(n,o).text.length,null,!0,1)
t<0&&(t=0)
for(var a=L(n,i);;){var l=function(e,t,r,n,i){i-=le(t)
var o=vt(e,t),a=Lt(t),l=0,s=t.text.length,u=!0,c=de(t,e.doc.direction)
if(c){var d=(e.options.lineWrapping?function(e,t,r,n,i,o,a){var l=Dt(e,t,n,a),s=l.begin,u=l.end;/\s/.test(t.text.charAt(u-1))&&u--
for(var c=null,d=null,f=0;f<i.length;f++){var h=i[f]
if(!(h.from>=u||h.to<=s)){var p=yt(e,n,1!=h.level?Math.min(u,h.to)-1:Math.max(s,h.from)).right,g=p<o?o-p+1e9:p-o;(!c||d>g)&&(c=h,d=g)}}return c||(c=i[i.length-1]),c.from<s&&(c={from:s,to:c.to,level:c.level}),c.to>u&&(c={from:c.from,to:u,level:c.level}),c}:function(e,t,r,n,i,o,a){var l=S(function(l){var s=i[l],u=1!=s.level
return Ht(At(e,D(r,u?s.to:s.from,u?"before":"after"),"line",t,n),o,a,!0)},0,i.length-1),s=i[l]
if(l>0){var u=1!=s.level,c=At(e,D(r,u?s.from:s.to,u?"after":"before"),"line",t,n)
Ht(c,o,a,!0)&&c.top>a&&(s=i[l-1])}return s})(e,t,r,o,c,n,i)
l=(u=1!=d.level)?d.from:d.to-1,s=u?d.to:d.from-1}var f,h,p=null,g=null,m=S(function(t){var r=yt(e,o,t)
return r.top+=a,r.bottom+=a,!!Ht(r,n,i,!1)&&(r.top<=i&&r.left<=n&&(p=t,g=r),!0)},l,s),v=!1
if(g){var y=n-g.left<g.right-n,b=y==u
m=p+(b?0:1),h=b?"after":"before",f=y?g.left:g.right}else{u||m!=s&&m!=l||m++,h=0==m?"after":m==t.text.length?"before":yt(e,o,m-(u?1:0)).bottom+a<=i==u?"after":"before"
var w=At(e,D(r,m,h),"line",t,o)
f=w.left,v=i<w.top||i>=w.bottom}return m=C(t.text,m,1),Wt(r,m,h,v,n-f)}(e,a,i,t,r),s=ee(a),u=s&&s.find(0,!0)
if(!s||!(l.ch>u.from.ch||l.ch==u.from.ch&&l.xRel>0))return l
i=A(a=u.to.line)}}function Dt(e,t,r,n){n-=Lt(t)
var i=t.text.length,o=S(function(t){return yt(e,r,t-1).bottom<=n},i,0)
return i=S(function(t){return yt(e,r,t).top>n},o,i),{begin:o,end:i}}function Pt(e,t,r,n){return r||(r=vt(e,t)),Dt(e,t,r,Tt(e,t,yt(e,r,n),"line").top)}function Ht(e,t,r,n){return!(e.bottom<=r)&&(e.top>r||(n?e.left:e.right)>t)}function Et(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight
if(null==Fo){Fo=n("pre")
for(var i=0;i<49;++i)Fo.appendChild(document.createTextNode("x")),Fo.appendChild(n("br"))
Fo.appendChild(document.createTextNode("x"))}r(e.measure,Fo)
var o=Fo.offsetHeight/50
return o>3&&(e.cachedTextHeight=o),t(e.measure),o||1}function It(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth
var t=n("span","xxxxxxxxxx"),i=n("pre",[t])
r(e.measure,i)
var o=t.getBoundingClientRect(),a=(o.right-o.left)/10
return a>2&&(e.cachedCharWidth=a),a||10}function Ft(e){for(var t=e.display,r={},n={},i=t.gutters.clientLeft,o=t.gutters.firstChild,a=0;o;o=o.nextSibling,++a)r[e.options.gutters[a]]=o.offsetLeft+o.clientLeft+i,n[e.options.gutters[a]]=o.clientWidth
return{fixedPos:Rt(t),gutterTotalWidth:t.gutters.offsetWidth,gutterLeft:r,gutterWidth:n,wrapperWidth:t.wrapper.clientWidth}}function Rt(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function Bt(e){var t=Et(e.display),r=e.options.lineWrapping,n=r&&Math.max(5,e.display.scroller.clientWidth/It(e.display)-3)
return function(i){if(oe(e.doc,i))return 0
var o=0
if(i.widgets)for(var a=0;a<i.widgets.length;a++)i.widgets[a].height&&(o+=i.widgets[a].height)
return r?o+(Math.ceil(i.text.length/n)||1)*t:o+t}}function jt(e){var t=e.doc,r=Bt(e)
t.iter(function(e){var t=r(e)
t!=e.height&&N(e,t)})}function Vt(e,t,r,n){var i=e.display
if(!r&&"true"==Ce(t).getAttribute("cm-not-content"))return null
var o,a,l=i.lineSpace.getBoundingClientRect()
try{o=t.clientX-l.left,a=t.clientY-l.top}catch(t){return null}var s,u=zt(e,o,a)
if(n&&1==u.xRel&&(s=L(e.doc,u.line).text).length==u.ch){var c=d(s,s.length,e.options.tabSize)-s.length
u=D(u.line,Math.max(0,Math.round((o-ct(e.display).left)/It(e.display))-c))}return u}function Kt(e,t){if(t>=e.display.viewTo)return null
if((t-=e.display.viewFrom)<0)return null
for(var r=e.display.view,n=0;n<r.length;n++)if((t-=r[n].size)<0)return n}function Gt(e){e.display.input.showSelection(e.display.input.prepareSelection())}function Ut(e,t){void 0===t&&(t=!0)
for(var r=e.doc,i={},o=i.cursors=document.createDocumentFragment(),a=i.selection=document.createDocumentFragment(),l=0;l<r.sel.ranges.length;l++)if(t||l!=r.sel.primIndex){var s=r.sel.ranges[l]
if(!(s.from().line>=e.display.viewTo||s.to().line<e.display.viewFrom)){var u=s.empty();(u||e.options.showCursorWhenSelecting)&&qt(e,s.head,o),u||function(e,t,r){function i(e,t,r,i){t<0&&(t=0),t=Math.round(t),i=Math.round(i),s.appendChild(n("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px;\n                             top: "+t+"px; width: "+(null==r?d-e:r)+"px;\n                             height: "+(i-t)+"px"))}function o(t,r,n){function o(r,n){return Nt(e,D(t,r),"div",h,n)}function a(t,r,n){var i=Pt(e,h,null,t),a="ltr"==r==("after"==n)?"left":"right"
return o("after"==n?i.begin:i.end-(/\s/.test(h.text.charAt(i.end-1))?2:1),a)[a]}var s,u,h=L(l,t),p=h.text.length,g=de(h,l.direction)
return function(e,t,r,n){if(!e)return n(t,r,"ltr",0)
for(var i=!1,o=0;o<e.length;++o){var a=e[o];(a.from<r&&a.to>t||t==r&&a.to==t)&&(n(Math.max(a.from,t),Math.min(a.to,r),1==a.level?"rtl":"ltr",o),i=!0)}i||n(t,r,"ltr")}(g,r||0,null==n?p:n,function(e,t,l,h){var m="ltr"==l,v=o(e,m?"left":"right"),y=o(t-1,m?"right":"left"),b=null==r&&0==e,w=null==n&&t==p,x=0==h,k=!g||h==g.length-1
if(y.top-v.top<=3){var C=(f?w:b)&&k,S=(f?b:w)&&x?c:(m?v:y).left,L=C?d:(m?y:v).right
i(S,v.top,L-S,v.bottom)}else{var T,M,N,A
m?(T=f&&b&&x?c:v.left,M=f?d:a(e,l,"before"),N=f?c:a(t,l,"after"),A=f&&w&&k?d:y.right):(T=f?a(e,l,"before"):c,M=!f&&b&&x?d:v.right,N=!f&&w&&k?c:y.left,A=f?a(t,l,"after"):d),i(T,v.top,M-T,v.bottom),v.bottom<y.top&&i(c,v.bottom,null,y.top),i(N,y.top,A-N,y.bottom)}(!s||$t(v,s)<0)&&(s=v),$t(y,s)<0&&(s=y),(!u||$t(v,u)<0)&&(u=v),$t(y,u)<0&&(u=y)}),{start:s,end:u}}var a=e.display,l=e.doc,s=document.createDocumentFragment(),u=ct(e.display),c=u.left,d=Math.max(a.sizerWidth,ft(e)-a.sizer.offsetLeft)-u.right,f="ltr"==l.direction,h=t.from(),p=t.to()
if(h.line==p.line)o(h.line,h.ch,p.ch)
else{var g=L(l,h.line),m=L(l,p.line),v=re(g)==re(m),y=o(h.line,h.ch,v?g.text.length+1:null).end,b=o(p.line,v?0:null,p.ch).start
v&&(y.top<b.top-2?(i(y.right,y.top,null,y.bottom),i(c,b.top,b.left,b.bottom)):i(y.right,y.top,b.left-y.right,y.bottom)),y.bottom<b.top&&i(c,y.bottom,null,b.top)}r.appendChild(s)}(e,s,a)}}return i}function qt(e,t,r){var i=At(e,t,"div",null,null,!e.options.singleCursorHeightPerLine),o=r.appendChild(n("div"," ","CodeMirror-cursor"))
if(o.style.left=i.left+"px",o.style.top=i.top+"px",o.style.height=Math.max(0,i.bottom-i.top)*e.options.cursorHeight+"px",i.other){var a=r.appendChild(n("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"))
a.style.display="",a.style.left=i.other.left+"px",a.style.top=i.other.top+"px",a.style.height=.85*(i.other.bottom-i.other.top)+"px"}}function $t(e,t){return e.top-t.top||e.left-t.left}function _t(e){if(e.state.focused){var t=e.display
clearInterval(t.blinker)
var r=!0
t.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?t.blinker=setInterval(function(){return t.cursorDiv.style.visibility=(r=!r)?"":"hidden"},e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility="hidden")}}function Xt(e){e.state.focused||(e.display.input.focus(),Zt(e))}function Yt(e){e.state.delayingBlurEvent=!0,setTimeout(function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,Qt(e))},100)}function Zt(e,t){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(pe(e,"focus",e,t),e.state.focused=!0,l(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),Vi&&setTimeout(function(){return e.display.input.reset(!0)},20)),e.display.input.receivedFocus()),_t(e))}function Qt(e,t){e.state.delayingBlurEvent||(e.state.focused&&(pe(e,"blur",e,t),e.state.focused=!1,oo(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout(function(){e.state.focused||(e.display.shift=!1)},150))}function Jt(e){for(var t=e.display,r=t.lineDiv.offsetTop,n=0;n<t.view.length;n++){var i=t.view[n],o=void 0
if(!i.hidden){if(Bi&&ji<8){var a=i.node.offsetTop+i.node.offsetHeight
o=a-r,r=a}else{var l=i.node.getBoundingClientRect()
o=l.bottom-l.top}var s=i.line.height-o
if(o<2&&(o=Et(t)),(s>.005||s<-.005)&&(N(i.line,o),er(i.line),i.rest))for(var u=0;u<i.rest.length;u++)er(i.rest[u])}}}function er(e){if(e.widgets)for(var t=0;t<e.widgets.length;++t){var r=e.widgets[t],n=r.node.parentNode
n&&(r.height=n.offsetHeight)}}function tr(e,t,r){var n=r&&null!=r.top?Math.max(0,r.top):e.scroller.scrollTop
n=Math.floor(n-st(e))
var i=r&&null!=r.bottom?r.bottom:n+e.wrapper.clientHeight,o=O(t,n),a=O(t,i)
if(r&&r.ensure){var l=r.ensure.from.line,s=r.ensure.to.line
l<o?(o=l,a=O(t,le(L(t,l))+e.wrapper.clientHeight)):Math.min(s,t.lastLine())>=a&&(o=O(t,le(L(t,s))-e.wrapper.clientHeight),a=s)}return{from:o,to:Math.max(a,o+1)}}function rr(e){var t=e.display,r=t.view
if(t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter){for(var n=Rt(t)-t.scroller.scrollLeft+e.doc.scrollLeft,i=t.gutters.offsetWidth,o=n+"px",a=0;a<r.length;a++)if(!r[a].hidden){e.options.fixedGutter&&(r[a].gutter&&(r[a].gutter.style.left=o),r[a].gutterBackground&&(r[a].gutterBackground.style.left=o))
var l=r[a].alignable
if(l)for(var s=0;s<l.length;s++)l[s].style.left=o}e.options.fixedGutter&&(t.gutters.style.left=n+i+"px")}}function nr(e){if(!e.options.lineNumbers)return!1
var t=e.doc,r=z(e.options,t.first+t.size-1),i=e.display
if(r.length!=i.lineNumChars){var o=i.measure.appendChild(n("div",[n("div",r)],"CodeMirror-linenumber CodeMirror-gutter-elt")),a=o.firstChild.offsetWidth,l=o.offsetWidth-a
return i.lineGutter.style.width="",i.lineNumInnerWidth=Math.max(a,i.lineGutter.offsetWidth-l)+1,i.lineNumWidth=i.lineNumInnerWidth+l,i.lineNumChars=i.lineNumInnerWidth?r.length:-1,i.lineGutter.style.width=i.lineNumWidth+"px",Dr(e),!0}return!1}function ir(e,t){var r=e.display,n=Et(e.display)
t.top<0&&(t.top=0)
var i=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:r.scroller.scrollTop,o=ht(e),a={}
t.bottom-t.top>o&&(t.bottom=t.top+o)
var l=e.doc.height+ut(r),s=t.top<n,u=t.bottom>l-n
if(t.top<i)a.scrollTop=s?0:t.top
else if(t.bottom>i+o){var c=Math.min(t.top,(u?l:t.bottom)-o)
c!=i&&(a.scrollTop=c)}var d=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:r.scroller.scrollLeft,f=ft(e)-(e.options.fixedGutter?r.gutters.offsetWidth:0),h=t.right-t.left>f
return h&&(t.right=t.left+f),t.left<10?a.scrollLeft=0:t.left<d?a.scrollLeft=Math.max(0,t.left-(h?0:10)):t.right>f+d-3&&(a.scrollLeft=t.right+(h?0:10)-f),a}function or(e,t){null!=t&&(sr(e),e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+t)}function ar(e){sr(e)
var t=e.getCursor()
e.curOp.scrollToPos={from:t,to:t,margin:e.options.cursorScrollMargin}}function lr(e,t,r){null==t&&null==r||sr(e),null!=t&&(e.curOp.scrollLeft=t),null!=r&&(e.curOp.scrollTop=r)}function sr(e){var t=e.curOp.scrollToPos
t&&(e.curOp.scrollToPos=null,ur(e,Ot(e,t.from),Ot(e,t.to),t.margin))}function ur(e,t,r,n){var i=ir(e,{left:Math.min(t.left,r.left),top:Math.min(t.top,r.top)-n,right:Math.max(t.right,r.right),bottom:Math.max(t.bottom,r.bottom)+n})
lr(e,i.scrollLeft,i.scrollTop)}function cr(e,t){Math.abs(e.doc.scrollTop-t)<2||(Ei||zr(e,{top:t}),dr(e,t,!0),Ei&&zr(e),Nr(e,100))}function dr(e,t,r){t=Math.min(e.display.scroller.scrollHeight-e.display.scroller.clientHeight,t),(e.display.scroller.scrollTop!=t||r)&&(e.doc.scrollTop=t,e.display.scrollbars.setScrollTop(t),e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t))}function fr(e,t,r,n){t=Math.min(t,e.display.scroller.scrollWidth-e.display.scroller.clientWidth),(r?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)&&!n||(e.doc.scrollLeft=t,rr(e),e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t),e.display.scrollbars.setScrollLeft(t))}function hr(e){var t=e.display,r=t.gutters.offsetWidth,n=Math.round(e.doc.height+ut(e.display))
return{clientHeight:t.scroller.clientHeight,viewHeight:t.wrapper.clientHeight,scrollWidth:t.scroller.scrollWidth,clientWidth:t.scroller.clientWidth,viewWidth:t.wrapper.clientWidth,barLeft:e.options.fixedGutter?r:0,docHeight:n,scrollHeight:n+dt(e)+t.barHeight,nativeBarWidth:t.nativeBarWidth,gutterWidth:r}}function pr(e,t){t||(t=hr(e))
var r=e.display.barWidth,n=e.display.barHeight
gr(e,t)
for(var i=0;i<4&&r!=e.display.barWidth||n!=e.display.barHeight;i++)r!=e.display.barWidth&&e.options.lineWrapping&&Jt(e),gr(e,hr(e)),r=e.display.barWidth,n=e.display.barHeight}function gr(e,t){var r=e.display,n=r.scrollbars.update(t)
r.sizer.style.paddingRight=(r.barWidth=n.right)+"px",r.sizer.style.paddingBottom=(r.barHeight=n.bottom)+"px",r.heightForcer.style.borderBottom=n.bottom+"px solid transparent",n.right&&n.bottom?(r.scrollbarFiller.style.display="block",r.scrollbarFiller.style.height=n.bottom+"px",r.scrollbarFiller.style.width=n.right+"px"):r.scrollbarFiller.style.display="",n.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(r.gutterFiller.style.display="block",r.gutterFiller.style.height=n.bottom+"px",r.gutterFiller.style.width=t.gutterWidth+"px"):r.gutterFiller.style.display=""}function mr(e){e.display.scrollbars&&(e.display.scrollbars.clear(),e.display.scrollbars.addClass&&oo(e.display.wrapper,e.display.scrollbars.addClass)),e.display.scrollbars=new qo[e.options.scrollbarStyle](function(t){e.display.wrapper.insertBefore(t,e.display.scrollbarFiller),So(t,"mousedown",function(){e.state.focused&&setTimeout(function(){return e.display.input.focus()},0)}),t.setAttribute("cm-not-content","true")},function(t,r){"horizontal"==r?fr(e,t):cr(e,t)},e),e.display.scrollbars.addClass&&l(e.display.wrapper,e.display.scrollbars.addClass)}function vr(e){e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:null,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++$o},function(e){jo?jo.ops.push(e):e.ownsGroup=jo={ops:[e],delayedCallbacks:[]}}(e.curOp)}function yr(e){!function(e,t){var r=e.ownsGroup
if(r)try{!function(e){var t=e.delayedCallbacks,r=0
do{for(;r<t.length;r++)t[r].call(null)
for(var n=0;n<e.ops.length;n++){var i=e.ops[n]
if(i.cursorActivityHandlers)for(;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++].call(null,i.cm)}}while(r<t.length)}(r)}finally{jo=null,function(e){for(var t=0;t<e.ops.length;t++)e.ops[t].cm.curOp=null
!function(e){for(var t=e.ops,r=0;r<t.length;r++)!function(e){var t=e.cm,r=t.display;(function(e){var t=e.display
!t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth,t.heightForcer.style.height=dt(e)+"px",t.sizer.style.marginBottom=-t.nativeBarWidth+"px",t.sizer.style.borderRightWidth=dt(e)+"px",t.scrollbarsClipped=!0)})(t),e.updateMaxLine&&ue(t),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<r.viewFrom||e.scrollToPos.to.line>=r.viewTo)||r.maxLineChanged&&t.options.lineWrapping,e.update=e.mustUpdate&&new _o(t,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}(t[r])
for(var i=0;i<t.length;i++)!function(e){e.updatedDisplay=e.mustUpdate&&Or(e.cm,e.update)}(t[i])
for(var o=0;o<t.length;o++)!function(e){var t=e.cm,r=t.display
e.updatedDisplay&&Jt(t),e.barMeasure=hr(t),r.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=gt(t,r.maxLine,r.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(r.scroller.clientWidth,r.sizer.offsetLeft+e.adjustWidthTo+dt(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,r.sizer.offsetLeft+e.adjustWidthTo-ft(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=r.input.prepareSelection())}(t[o])
for(var l=0;l<t.length;l++)!function(e){var t=e.cm
null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&fr(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1)
var r=e.focus&&e.focus==a()
e.preparedSelection&&t.display.input.showSelection(e.preparedSelection,r),(e.updatedDisplay||e.startHeight!=t.doc.height)&&pr(t,e.barMeasure),e.updatedDisplay&&Pr(t,e.barMeasure),e.selectionChanged&&_t(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),r&&Xt(e.cm)}(t[l])
for(var s=0;s<t.length;s++)!function(e){var t=e.cm,r=t.display,i=t.doc
if(e.updatedDisplay&&Wr(t,e.update),null==r.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(r.wheelStartX=r.wheelStartY=null),null!=e.scrollTop&&dr(t,e.scrollTop,e.forceScroll),null!=e.scrollLeft&&fr(t,e.scrollLeft,!0,!0),e.scrollToPos){var o=function(e,t,r,n){null==n&&(n=0)
var i
e.options.lineWrapping||t!=r||(r="before"==(t=t.ch?D(t.line,"before"==t.sticky?t.ch-1:t.ch,"after"):t).sticky?D(t.line,t.ch+1,"before"):t)
for(var o=0;o<5;o++){var a=!1,l=At(e,t),s=r&&r!=t?At(e,r):l,u=ir(e,i={left:Math.min(l.left,s.left),top:Math.min(l.top,s.top)-n,right:Math.max(l.left,s.left),bottom:Math.max(l.bottom,s.bottom)+n}),c=e.doc.scrollTop,d=e.doc.scrollLeft
if(null!=u.scrollTop&&(cr(e,u.scrollTop),Math.abs(e.doc.scrollTop-c)>1&&(a=!0)),null!=u.scrollLeft&&(fr(e,u.scrollLeft),Math.abs(e.doc.scrollLeft-d)>1&&(a=!0)),!a)break}return i}(t,B(i,e.scrollToPos.from),B(i,e.scrollToPos.to),e.scrollToPos.margin)
!function(e,t){if(!ge(e,"scrollCursorIntoView")){var r=e.display,i=r.sizer.getBoundingClientRect(),o=null
if(t.top+i.top<0?o=!0:t.bottom+i.top>(window.innerHeight||document.documentElement.clientHeight)&&(o=!1),null!=o&&!_i){var a=n("div","​",null,"position: absolute;\n                         top: "+(t.top-r.viewOffset-st(e.display))+"px;\n                         height: "+(t.bottom-t.top+dt(e)+r.barHeight)+"px;\n                         left: "+t.left+"px; width: "+Math.max(2,t.right-t.left)+"px;")
e.display.lineSpace.appendChild(a),a.scrollIntoView(o),e.display.lineSpace.removeChild(a)}}}(t,o)}var a=e.maybeHiddenMarkers,l=e.maybeUnhiddenMarkers
if(a)for(var s=0;s<a.length;++s)a[s].lines.length||pe(a[s],"hide")
if(l)for(var u=0;u<l.length;++u)l[u].lines.length&&pe(l[u],"unhide")
r.wrapper.offsetHeight&&(i.scrollTop=t.display.scroller.scrollTop),e.changeObjs&&pe(t,"changes",t,e.changeObjs),e.update&&e.update.finish()}(t[s])}(e)}(r)}}(e.curOp)}function br(e,t){if(e.curOp)return t()
vr(e)
try{return t()}finally{yr(e)}}function wr(e,t){return function(){if(e.curOp)return t.apply(e,arguments)
vr(e)
try{return t.apply(e,arguments)}finally{yr(e)}}}function xr(e){return function(){if(this.curOp)return e.apply(this,arguments)
vr(this)
try{return e.apply(this,arguments)}finally{yr(this)}}}function kr(e){return function(){var t=this.cm
if(!t||t.curOp)return e.apply(this,arguments)
vr(t)
try{return e.apply(this,arguments)}finally{yr(t)}}}function Cr(e,t,r,n){null==t&&(t=e.doc.first),null==r&&(r=e.doc.first+e.doc.size),n||(n=0)
var i=e.display
if(n&&r<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>t)&&(i.updateLineNumbers=t),e.curOp.viewChanged=!0,t>=i.viewTo)wo&&ne(e.doc,t)<i.viewTo&&Lr(e)
else if(r<=i.viewFrom)wo&&ie(e.doc,r+n)>i.viewFrom?Lr(e):(i.viewFrom+=n,i.viewTo+=n)
else if(t<=i.viewFrom&&r>=i.viewTo)Lr(e)
else if(t<=i.viewFrom){var o=Tr(e,r,r+n,1)
o?(i.view=i.view.slice(o.index),i.viewFrom=o.lineN,i.viewTo+=n):Lr(e)}else if(r>=i.viewTo){var a=Tr(e,t,t,-1)
a?(i.view=i.view.slice(0,a.index),i.viewTo=a.lineN):Lr(e)}else{var l=Tr(e,t,t,-1),s=Tr(e,r,r+n,1)
l&&s?(i.view=i.view.slice(0,l.index).concat(Xe(e,l.lineN,s.lineN)).concat(i.view.slice(s.index)),i.viewTo+=n):Lr(e)}var u=i.externalMeasured
u&&(r<u.lineN?u.lineN+=n:t<u.lineN+u.size&&(i.externalMeasured=null))}function Sr(e,t,r){e.curOp.viewChanged=!0
var n=e.display,i=e.display.externalMeasured
if(i&&t>=i.lineN&&t<i.lineN+i.size&&(n.externalMeasured=null),!(t<n.viewFrom||t>=n.viewTo)){var o=n.view[Kt(e,t)]
if(null!=o.node){var a=o.changes||(o.changes=[]);-1==f(a,r)&&a.push(r)}}}function Lr(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function Tr(e,t,r,n){var i,o=Kt(e,t),a=e.display.view
if(!wo||r==e.doc.first+e.doc.size)return{index:o,lineN:r}
for(var l=e.display.viewFrom,s=0;s<o;s++)l+=a[s].size
if(l!=t){if(n>0){if(o==a.length-1)return null
i=l+a[o].size-t,o++}else i=l-t
t+=i,r+=i}for(;ne(e.doc,r)!=r;){if(o==(n<0?0:a.length-1))return null
r+=n*a[o-(n<0?1:0)].size,o+=n}return{index:o,lineN:r}}function Mr(e){for(var t=e.display.view,r=0,n=0;n<t.length;n++){var i=t[n]
i.hidden||i.node&&!i.changes||++r}return r}function Nr(e,t){e.doc.highlightFrontier<e.display.viewTo&&e.state.highlight.set(t,u(Ar,e))}function Ar(e){var t=e.doc
if(!(t.highlightFrontier>=e.display.viewTo)){var r=+new Date+e.options.workTime,n=He(e,t.highlightFrontier),i=[]
t.iter(n.line,Math.min(t.first+t.size,e.display.viewTo+500),function(o){if(n.line>=e.display.viewFrom){var a=o.styles,l=o.text.length>e.options.maxHighlightLength?Oe(t.mode,n.state):null,s=De(e,o,n,!0)
l&&(n.state=l),o.styles=s.styles
var u=o.styleClasses,c=s.classes
c?o.styleClasses=c:u&&(o.styleClasses=null)
for(var d=!a||a.length!=o.styles.length||u!=c&&(!u||!c||u.bgClass!=c.bgClass||u.textClass!=c.textClass),f=0;!d&&f<a.length;++f)d=a[f]!=o.styles[f]
d&&i.push(n.line),o.stateAfter=n.save(),n.nextLine()}else o.text.length<=e.options.maxHighlightLength&&Ee(e,o.text,n),o.stateAfter=n.line%5==0?n.save():null,n.nextLine()
if(+new Date>r)return Nr(e,e.options.workDelay),!0}),t.highlightFrontier=n.line,t.modeFrontier=Math.max(t.modeFrontier,n.line),i.length&&br(e,function(){for(var t=0;t<i.length;t++)Sr(e,i[t],"text")})}}function Or(e,r){var n=e.display,i=e.doc
if(r.editorIsHidden)return Lr(e),!1
if(!r.force&&r.visible.from>=n.viewFrom&&r.visible.to<=n.viewTo&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo)&&n.renderedView==n.view&&0==Mr(e))return!1
nr(e)&&(Lr(e),r.dims=Ft(e))
var l=i.first+i.size,s=Math.max(r.visible.from-e.options.viewportMargin,i.first),u=Math.min(l,r.visible.to+e.options.viewportMargin)
n.viewFrom<s&&s-n.viewFrom<20&&(s=Math.max(i.first,n.viewFrom)),n.viewTo>u&&n.viewTo-u<20&&(u=Math.min(l,n.viewTo)),wo&&(s=ne(e.doc,s),u=ie(e.doc,u))
var c=s!=n.viewFrom||u!=n.viewTo||n.lastWrapHeight!=r.wrapperHeight||n.lastWrapWidth!=r.wrapperWidth
!function(e,t,r){var n=e.display
0==n.view.length||t>=n.viewTo||r<=n.viewFrom?(n.view=Xe(e,t,r),n.viewFrom=t):(n.viewFrom>t?n.view=Xe(e,t,n.viewFrom).concat(n.view):n.viewFrom<t&&(n.view=n.view.slice(Kt(e,t))),n.viewFrom=t,n.viewTo<r?n.view=n.view.concat(Xe(e,n.viewTo,r)):n.viewTo>r&&(n.view=n.view.slice(0,Kt(e,r)))),n.viewTo=r}(e,s,u),n.viewOffset=le(L(e.doc,n.viewFrom)),e.display.mover.style.top=n.viewOffset+"px"
var d=Mr(e)
if(!c&&0==d&&!r.force&&n.renderedView==n.view&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo))return!1
var h=function(e){if(e.hasFocus())return null
var t=a()
if(!t||!o(e.display.lineDiv,t))return null
var r={activeElt:t}
if(window.getSelection){var n=window.getSelection()
n.anchorNode&&n.extend&&o(e.display.lineDiv,n.anchorNode)&&(r.anchorNode=n.anchorNode,r.anchorOffset=n.anchorOffset,r.focusNode=n.focusNode,r.focusOffset=n.focusOffset)}return r}(e)
return d>4&&(n.lineDiv.style.display="none"),function(e,r,n){function i(t){var r=t.nextSibling
return Vi&&Qi&&e.display.currentWheelTarget==t?t.style.display="none":t.parentNode.removeChild(t),r}for(var o=e.display,a=e.options.lineNumbers,l=o.lineDiv,s=l.firstChild,u=o.view,c=o.viewFrom,d=0;d<u.length;d++){var h=u[d]
if(h.hidden);else if(h.node&&h.node.parentNode==l){for(;s!=h.node;)s=i(s)
var p=a&&null!=r&&r<=c&&h.lineNumber
h.changes&&(f(h.changes,"gutter")>-1&&(p=!1),Qe(e,h,c,n)),p&&(t(h.lineNumber),h.lineNumber.appendChild(document.createTextNode(z(e.options,c)))),s=h.node.nextSibling}else{var g=nt(e,h,c,n)
l.insertBefore(g,s)}c+=h.size}for(;s;)s=i(s)}(e,n.updateLineNumbers,r.dims),d>4&&(n.lineDiv.style.display=""),n.renderedView=n.view,function(e){if(e&&e.activeElt&&e.activeElt!=a()&&(e.activeElt.focus(),e.anchorNode&&o(document.body,e.anchorNode)&&o(document.body,e.focusNode))){var t=window.getSelection(),r=document.createRange()
r.setEnd(e.anchorNode,e.anchorOffset),r.collapse(!1),t.removeAllRanges(),t.addRange(r),t.extend(e.focusNode,e.focusOffset)}}(h),t(n.cursorDiv),t(n.selectionDiv),n.gutters.style.height=n.sizer.style.minHeight=0,c&&(n.lastWrapHeight=r.wrapperHeight,n.lastWrapWidth=r.wrapperWidth,Nr(e,400)),n.updateLineNumbers=null,!0}function Wr(e,t){for(var r=t.viewport,n=!0;(n&&e.options.lineWrapping&&t.oldDisplayWidth!=ft(e)||(r&&null!=r.top&&(r={top:Math.min(e.doc.height+ut(e.display)-ht(e),r.top)}),t.visible=tr(e.display,e.doc,r),!(t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo)))&&Or(e,t);n=!1){Jt(e)
var i=hr(e)
Gt(e),pr(e,i),Pr(e,i),t.force=!1}t.signal(e,"update",e),e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(t.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function zr(e,t){var r=new _o(e,t)
if(Or(e,r)){Jt(e),Wr(e,r)
var n=hr(e)
Gt(e),pr(e,n),Pr(e,n),r.finish()}}function Dr(e){var t=e.display.gutters.offsetWidth
e.display.sizer.style.marginLeft=t+"px"}function Pr(e,t){e.display.sizer.style.minHeight=t.docHeight+"px",e.display.heightForcer.style.top=t.docHeight+"px",e.display.gutters.style.height=t.docHeight+e.display.barHeight+dt(e)+"px"}function Hr(e){var r=e.display.gutters,i=e.options.gutters
t(r)
for(var o=0;o<i.length;++o){var a=i[o],l=r.appendChild(n("div",null,"CodeMirror-gutter "+a))
"CodeMirror-linenumbers"==a&&(e.display.lineGutter=l,l.style.width=(e.display.lineNumWidth||1)+"px")}r.style.display=o?"":"none",Dr(e)}function Er(e){var t=f(e.gutters,"CodeMirror-linenumbers");-1==t&&e.lineNumbers?e.gutters=e.gutters.concat(["CodeMirror-linenumbers"]):t>-1&&!e.lineNumbers&&(e.gutters=e.gutters.slice(0),e.gutters.splice(t,1))}function Ir(e){var t=e.wheelDeltaX,r=e.wheelDeltaY
return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail),null==r&&e.detail&&e.axis==e.VERTICAL_AXIS?r=e.detail:null==r&&(r=e.wheelDelta),{x:t,y:r}}function Fr(e){var t=Ir(e)
return t.x*=Yo,t.y*=Yo,t}function Rr(e,t){var r=Ir(t),n=r.x,i=r.y,o=e.display,a=o.scroller,l=a.scrollWidth>a.clientWidth,s=a.scrollHeight>a.clientHeight
if(n&&l||i&&s){if(i&&Qi&&Vi)e:for(var u=t.target,c=o.view;u!=a;u=u.parentNode)for(var d=0;d<c.length;d++)if(c[d].node==u){e.display.currentWheelTarget=u
break e}if(n&&!Ei&&!Ui&&null!=Yo)return i&&s&&cr(e,Math.max(0,a.scrollTop+i*Yo)),fr(e,Math.max(0,a.scrollLeft+n*Yo)),(!i||i&&s)&&be(t),void(o.wheelStartX=null)
if(i&&null!=Yo){var f=i*Yo,h=e.doc.scrollTop,p=h+o.wrapper.clientHeight
f<0?h=Math.max(0,h+f-50):p=Math.min(e.doc.height,p+f+50),zr(e,{top:h,bottom:p})}Xo<20&&(null==o.wheelStartX?(o.wheelStartX=a.scrollLeft,o.wheelStartY=a.scrollTop,o.wheelDX=n,o.wheelDY=i,setTimeout(function(){if(null!=o.wheelStartX){var e=a.scrollLeft-o.wheelStartX,t=a.scrollTop-o.wheelStartY,r=t&&o.wheelDY&&t/o.wheelDY||e&&o.wheelDX&&e/o.wheelDX
o.wheelStartX=o.wheelStartY=null,r&&(Yo=(Yo*Xo+r)/(Xo+1),++Xo)}},200)):(o.wheelDX+=n,o.wheelDY+=i))}}function Br(e,t){var r=e[t]
e.sort(function(e,t){return P(e.from(),t.from())}),t=f(e,r)
for(var n=1;n<e.length;n++){var i=e[n],o=e[n-1]
if(P(o.to(),i.from())>=0){var a=F(o.from(),i.from()),l=I(o.to(),i.to()),s=o.empty()?i.from()==i.head:o.from()==o.head
n<=t&&--t,e.splice(--n,2,new Qo(s?l:a,s?a:l))}}return new Zo(e,t)}function jr(e,t){return new Zo([new Qo(e,t||e)],0)}function Vr(e){return e.text?D(e.from.line+e.text.length-1,g(e.text).length+(1==e.text.length?e.from.ch:0)):e.to}function Kr(e,t){if(P(e,t.from)<0)return e
if(P(e,t.to)<=0)return Vr(t)
var r=e.line+t.text.length-(t.to.line-t.from.line)-1,n=e.ch
return e.line==t.to.line&&(n+=Vr(t).ch-t.to.ch),D(r,n)}function Gr(e,t){for(var r=[],n=0;n<e.sel.ranges.length;n++){var i=e.sel.ranges[n]
r.push(new Qo(Kr(i.anchor,t),Kr(i.head,t)))}return Br(r,e.sel.primIndex)}function Ur(e,t,r){return e.line==t.line?D(r.line,e.ch-t.ch+r.ch):D(r.line+(e.line-t.line),e.ch)}function qr(e){e.doc.mode=Ne(e.options,e.doc.modeOption),$r(e)}function $r(e){e.doc.iter(function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)}),e.doc.modeFrontier=e.doc.highlightFrontier=e.doc.first,Nr(e,100),e.state.modeGen++,e.curOp&&Cr(e)}function _r(e,t){return 0==t.from.ch&&0==t.to.ch&&""==g(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function Xr(e,t,r,n){function i(e){return r?r[e]:null}function o(e,r,i){!function(e,t,r,n){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),$(e),_(e,r)
var i=n?n(e):1
i!=e.height&&N(e,i)}(e,r,i,n),Ye(e,"change",e,t)}function a(e,t){for(var r=[],o=e;o<t;++o)r.push(new Io(u[o],i(o),n))
return r}var l=t.from,s=t.to,u=t.text,c=L(e,l.line),d=L(e,s.line),f=g(u),h=i(u.length-1),p=s.line-l.line
if(t.full)e.insert(0,a(0,u.length)),e.remove(u.length,e.size-u.length)
else if(_r(e,t)){var m=a(0,u.length-1)
o(d,d.text,h),p&&e.remove(l.line,p),m.length&&e.insert(l.line,m)}else if(c==d)if(1==u.length)o(c,c.text.slice(0,l.ch)+f+c.text.slice(s.ch),h)
else{var v=a(1,u.length-1)
v.push(new Io(f+c.text.slice(s.ch),h,n)),o(c,c.text.slice(0,l.ch)+u[0],i(0)),e.insert(l.line+1,v)}else if(1==u.length)o(c,c.text.slice(0,l.ch)+u[0]+d.text.slice(s.ch),i(0)),e.remove(l.line+1,p)
else{o(c,c.text.slice(0,l.ch)+u[0],i(0)),o(d,f+d.text.slice(s.ch),h)
var y=a(1,u.length-1)
p>1&&e.remove(l.line+1,p-1),e.insert(l.line+1,y)}Ye(e,"change",e,t)}function Yr(e,t,r){function n(e,i,o){if(e.linked)for(var a=0;a<e.linked.length;++a){var l=e.linked[a]
if(l.doc!=i){var s=o&&l.sharedHist
r&&!s||(t(l.doc,s),n(l.doc,e,s))}}}n(e,null,!0)}function Zr(e,t){if(t.cm)throw new Error("This document is already in use.")
e.doc=t,t.cm=e,jt(e),qr(e),Qr(e),e.options.lineWrapping||ue(e),e.options.mode=t.modeOption,Cr(e)}function Qr(e){("rtl"==e.doc.direction?l:oo)(e.display.lineDiv,"CodeMirror-rtl")}function Jr(e){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e||1}function en(e,t){var r={from:E(t.from),to:Vr(t),text:T(e,t.from,t.to)}
return on(e,r,t.from.line,t.to.line+1),Yr(e,function(e){return on(e,r,t.from.line,t.to.line+1)},!0),r}function tn(e){for(;e.length&&g(e).ranges;)e.pop()}function rn(e,t,r,n){var i=e.history
i.undone.length=0
var o,a,l=+new Date
if((i.lastOp==n||i.lastOrigin==t.origin&&t.origin&&("+"==t.origin.charAt(0)&&e.cm&&i.lastModTime>l-e.cm.options.historyEventDelay||"*"==t.origin.charAt(0)))&&(o=function(e,t){return i.lastOp==n?(tn(e.done),g(e.done)):e.done.length&&!g(e.done).ranges?g(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),g(e.done)):void 0}(i)))a=g(o.changes),0==P(t.from,t.to)&&0==P(t.from,a.to)?a.to=Vr(t):o.changes.push(en(e,t))
else{var s=g(i.done)
for(s&&s.ranges||nn(e.sel,i.done),o={changes:[en(e,t)],generation:i.generation},i.done.push(o);i.done.length>i.undoDepth;)i.done.shift(),i.done[0].ranges||i.done.shift()}i.done.push(r),i.generation=++i.maxGeneration,i.lastModTime=i.lastSelTime=l,i.lastOp=i.lastSelOp=n,i.lastOrigin=i.lastSelOrigin=t.origin,a||pe(e,"historyAdded")}function nn(e,t){var r=g(t)
r&&r.ranges&&r.equals(e)||t.push(e)}function on(e,t,r,n){var i=t["spans_"+e.id],o=0
e.iter(Math.max(e.first,r),Math.min(e.first+e.size,n),function(r){r.markedSpans&&((i||(i=t["spans_"+e.id]={}))[o]=r.markedSpans),++o})}function an(e){if(!e)return null
for(var t,r=0;r<e.length;++r)e[r].marker.explicitlyCleared?t||(t=e.slice(0,r)):t&&t.push(e[r])
return t?t.length?t:null:e}function ln(e,t){var r=function(e,t){var r=t["spans_"+e.id]
if(!r)return null
for(var n=[],i=0;i<t.text.length;++i)n.push(an(r[i]))
return n}(e,t),n=U(e,t)
if(!r)return n
if(!n)return r
for(var i=0;i<r.length;++i){var o=r[i],a=n[i]
if(o&&a)e:for(var l=0;l<a.length;++l){for(var s=a[l],u=0;u<o.length;++u)if(o[u].marker==s.marker)continue e
o.push(s)}else a&&(r[i]=a)}return r}function sn(e,t,r){for(var n=[],i=0;i<e.length;++i){var o=e[i]
if(o.ranges)n.push(r?Zo.prototype.deepCopy.call(o):o)
else{var a=o.changes,l=[]
n.push({changes:l})
for(var s=0;s<a.length;++s){var u=a[s],c=void 0
if(l.push({from:u.from,to:u.to,text:u.text}),t)for(var d in u)(c=d.match(/^spans_(\d+)$/))&&f(t,Number(c[1]))>-1&&(g(l)[d]=u[d],delete u[d])}}}return n}function un(e,t,r,n){if(n){var i=e.anchor
if(r){var o=P(t,i)<0
o!=P(r,i)<0?(i=t,t=r):o!=P(t,r)<0&&(t=r)}return new Qo(i,t)}return new Qo(r||t,t)}function cn(e,t,r,n,i){null==i&&(i=e.cm&&(e.cm.display.shift||e.extend)),gn(e,new Zo([un(e.sel.primary(),t,r,i)],0),n)}function dn(e,t,r){for(var n=[],i=e.cm&&(e.cm.display.shift||e.extend),o=0;o<e.sel.ranges.length;o++)n[o]=un(e.sel.ranges[o],t[o],null,i)
gn(e,Br(n,e.sel.primIndex),r)}function fn(e,t,r,n){var i=e.sel.ranges.slice(0)
i[t]=r,gn(e,Br(i,e.sel.primIndex),n)}function hn(e,t,r,n){gn(e,jr(t,r),n)}function pn(e,t,r){var n=e.history.done,i=g(n)
i&&i.ranges?(n[n.length-1]=t,mn(e,t,r)):gn(e,t,r)}function gn(e,t,r){mn(e,t,r),function(e,t,r,n){var i=e.history,o=n&&n.origin
r==i.lastSelOp||o&&i.lastSelOrigin==o&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==o||function(e,t,r,n){var i=t.charAt(0)
return"*"==i||"+"==i&&r.ranges.length==n.ranges.length&&r.somethingSelected()==n.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}(e,o,g(i.done),t))?i.done[i.done.length-1]=t:nn(t,i.done),i.lastSelTime=+new Date,i.lastSelOrigin=o,i.lastSelOp=r,n&&!1!==n.clearRedo&&tn(i.undone)}(e,e.sel,e.cm?e.cm.curOp.id:NaN,r)}function mn(e,t,r){(ve(e,"beforeSelectionChange")||e.cm&&ve(e.cm,"beforeSelectionChange"))&&(t=function(e,t,r){var n={ranges:t.ranges,update:function(t){var r=this
this.ranges=[]
for(var n=0;n<t.length;n++)r.ranges[n]=new Qo(B(e,t[n].anchor),B(e,t[n].head))},origin:r&&r.origin}
return pe(e,"beforeSelectionChange",e,n),e.cm&&pe(e.cm,"beforeSelectionChange",e.cm,n),n.ranges!=t.ranges?Br(n.ranges,n.ranges.length-1):t}(e,t,r)),vn(e,bn(e,t,r&&r.bias||(P(t.primary().head,e.sel.primary().head)<0?-1:1),!0)),r&&!1===r.scroll||!e.cm||ar(e.cm)}function vn(e,t){t.equals(e.sel)||(e.sel=t,e.cm&&(e.cm.curOp.updateInput=e.cm.curOp.selectionChanged=!0,me(e.cm)),Ye(e,"cursorActivity",e))}function yn(e){vn(e,bn(e,e.sel,null,!1))}function bn(e,t,r,n){for(var i,o=0;o<t.ranges.length;o++){var a=t.ranges[o],l=t.ranges.length==e.sel.ranges.length&&e.sel.ranges[o],s=xn(e,a.anchor,l&&l.anchor,r,n),u=xn(e,a.head,l&&l.head,r,n);(i||s!=a.anchor||u!=a.head)&&(i||(i=t.ranges.slice(0,o)),i[o]=new Qo(s,u))}return i?Br(i,t.primIndex):t}function wn(e,t,r,n,i){var o=L(e,t.line)
if(o.markedSpans)for(var a=0;a<o.markedSpans.length;++a){var l=o.markedSpans[a],s=l.marker
if((null==l.from||(s.inclusiveLeft?l.from<=t.ch:l.from<t.ch))&&(null==l.to||(s.inclusiveRight?l.to>=t.ch:l.to>t.ch))){if(i&&(pe(s,"beforeCursorEnter"),s.explicitlyCleared)){if(o.markedSpans){--a
continue}break}if(!s.atomic)continue
if(r){var u=s.find(n<0?1:-1),c=void 0
if((n<0?s.inclusiveRight:s.inclusiveLeft)&&(u=kn(e,u,-n,u&&u.line==t.line?o:null)),u&&u.line==t.line&&(c=P(u,r))&&(n<0?c<0:c>0))return wn(e,u,t,n,i)}var d=s.find(n<0?-1:1)
return(n<0?s.inclusiveLeft:s.inclusiveRight)&&(d=kn(e,d,n,d.line==t.line?o:null)),d?wn(e,d,t,n,i):null}}return t}function xn(e,t,r,n,i){var o=n||1
return wn(e,t,r,o,i)||!i&&wn(e,t,r,o,!0)||wn(e,t,r,-o,i)||!i&&wn(e,t,r,-o,!0)||(e.cantEdit=!0,D(e.first,0))}function kn(e,t,r,n){return r<0&&0==t.ch?t.line>e.first?B(e,D(t.line-1)):null:r>0&&t.ch==(n||L(e,t.line)).text.length?t.line<e.first+e.size-1?D(t.line+1,0):null:new D(t.line,t.ch+r)}function Cn(e){e.setSelection(D(e.firstLine(),0),D(e.lastLine()),ho)}function Sn(e,t,r){var n={canceled:!1,from:t.from,to:t.to,text:t.text,origin:t.origin,cancel:function(){return n.canceled=!0}}
return r&&(n.update=function(t,r,i,o){t&&(n.from=B(e,t)),r&&(n.to=B(e,r)),i&&(n.text=i),void 0!==o&&(n.origin=o)}),pe(e,"beforeChange",e,n),e.cm&&pe(e.cm,"beforeChange",e.cm,n),n.canceled?null:{from:n.from,to:n.to,text:n.text,origin:n.origin}}function Ln(e,t,r){if(e.cm){if(!e.cm.curOp)return wr(e.cm,Ln)(e,t,r)
if(e.cm.state.suppressEdits)return}if(!(ve(e,"beforeChange")||e.cm&&ve(e.cm,"beforeChange"))||(t=Sn(e,t,!0))){var n=bo&&!r&&function(e,t,r){var n=null
if(e.iter(t.line,r.line+1,function(e){if(e.markedSpans)for(var t=0;t<e.markedSpans.length;++t){var r=e.markedSpans[t].marker
!r.readOnly||n&&-1!=f(n,r)||(n||(n=[])).push(r)}}),!n)return null
for(var i=[{from:t,to:r}],o=0;o<n.length;++o)for(var a=n[o],l=a.find(0),s=0;s<i.length;++s){var u=i[s]
if(!(P(u.to,l.from)<0||P(u.from,l.to)>0)){var c=[s,1],d=P(u.from,l.from),h=P(u.to,l.to);(d<0||!a.inclusiveLeft&&!d)&&c.push({from:u.from,to:l.from}),(h>0||!a.inclusiveRight&&!h)&&c.push({from:l.to,to:u.to}),i.splice.apply(i,c),s+=c.length-3}}return i}(e,t.from,t.to)
if(n)for(var i=n.length-1;i>=0;--i)Tn(e,{from:n[i].from,to:n[i].to,text:i?[""]:t.text,origin:t.origin})
else Tn(e,t)}}function Tn(e,t){if(1!=t.text.length||""!=t.text[0]||0!=P(t.from,t.to)){var r=Gr(e,t)
rn(e,t,r,e.cm?e.cm.curOp.id:NaN),An(e,t,r,U(e,t))
var n=[]
Yr(e,function(e,r){r||-1!=f(n,e.history)||(Dn(e.history,t),n.push(e.history)),An(e,t,null,U(e,t))})}}function Mn(e,t,r){if(!e.cm||!e.cm.state.suppressEdits||r){for(var n,i=e.history,o=e.sel,a="undo"==t?i.done:i.undone,l="undo"==t?i.undone:i.done,s=0;s<a.length&&(n=a[s],r?!n.ranges||n.equals(e.sel):n.ranges);s++);if(s!=a.length){for(i.lastOrigin=i.lastSelOrigin=null;(n=a.pop()).ranges;){if(nn(n,l),r&&!n.equals(e.sel))return void gn(e,n,{clearRedo:!1})
o=n}var u=[]
nn(o,l),l.push({changes:u,generation:i.generation}),i.generation=n.generation||++i.maxGeneration
for(var c=ve(e,"beforeChange")||e.cm&&ve(e.cm,"beforeChange"),d=function(r){var i=n.changes[r]
if(i.origin=t,c&&!Sn(e,i,!1))return a.length=0,{}
u.push(en(e,i))
var o=r?Gr(e,i):g(a)
An(e,i,o,ln(e,i)),!r&&e.cm&&e.cm.scrollIntoView({from:i.from,to:Vr(i)})
var l=[]
Yr(e,function(e,t){t||-1!=f(l,e.history)||(Dn(e.history,i),l.push(e.history)),An(e,i,null,ln(e,i))})},h=n.changes.length-1;h>=0;--h){var p=d(h)
if(p)return p.v}}}}function Nn(e,t){if(0!=t&&(e.first+=t,e.sel=new Zo(m(e.sel.ranges,function(e){return new Qo(D(e.anchor.line+t,e.anchor.ch),D(e.head.line+t,e.head.ch))}),e.sel.primIndex),e.cm)){Cr(e.cm,e.first,e.first-t,t)
for(var r=e.cm.display,n=r.viewFrom;n<r.viewTo;n++)Sr(e.cm,n,"gutter")}}function An(e,t,r,n){if(e.cm&&!e.cm.curOp)return wr(e.cm,An)(e,t,r,n)
if(t.to.line<e.first)Nn(e,t.text.length-1-(t.to.line-t.from.line))
else if(!(t.from.line>e.lastLine())){if(t.from.line<e.first){var i=t.text.length-1-(e.first-t.from.line)
Nn(e,i),t={from:D(e.first,0),to:D(t.to.line+i,t.to.ch),text:[g(t.text)],origin:t.origin}}var o=e.lastLine()
t.to.line>o&&(t={from:t.from,to:D(o,L(e,o).text.length),text:[t.text[0]],origin:t.origin}),t.removed=T(e,t.from,t.to),r||(r=Gr(e,t)),e.cm?function(e,t,r){var n=e.doc,i=e.display,o=t.from,a=t.to,l=!1,s=o.line
e.options.lineWrapping||(s=A(re(L(n,o.line))),n.iter(s,a.line+1,function(e){if(e==i.maxLine)return l=!0,!0})),n.sel.contains(t.from,t.to)>-1&&me(e),Xr(n,t,r,Bt(e)),e.options.lineWrapping||(n.iter(s,o.line+t.text.length,function(e){var t=se(e)
t>i.maxLineLength&&(i.maxLine=e,i.maxLineLength=t,i.maxLineChanged=!0,l=!1)}),l&&(e.curOp.updateMaxLine=!0)),function(e,t){if(e.modeFrontier=Math.min(e.modeFrontier,t),!(e.highlightFrontier<t-10)){for(var r=e.first,n=t-1;n>r;n--){var i=L(e,n).stateAfter
if(i&&(!(i instanceof Po)||n+i.lookAhead<t)){r=n+1
break}}e.highlightFrontier=Math.min(e.highlightFrontier,r)}}(n,o.line),Nr(e,400)
var u=t.text.length-(a.line-o.line)-1
t.full?Cr(e):o.line!=a.line||1!=t.text.length||_r(e.doc,t)?Cr(e,o.line,a.line+1,u):Sr(e,o.line,"text")
var c=ve(e,"changes"),d=ve(e,"change")
if(d||c){var f={from:o,to:a,text:t.text,removed:t.removed,origin:t.origin}
d&&Ye(e,"change",e,f),c&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(f)}e.display.selForContextMenu=null}(e.cm,t,n):Xr(e,t,n),mn(e,r,ho)}}function On(e,t,r,n,i){if(n||(n=r),P(n,r)<0){var o
r=(o=[n,r])[0],n=o[1]}"string"==typeof t&&(t=e.splitLines(t)),Ln(e,{from:r,to:n,text:t,origin:i})}function Wn(e,t,r,n){r<e.line?e.line+=n:t<e.line&&(e.line=t,e.ch=0)}function zn(e,t,r,n){for(var i=0;i<e.length;++i){var o=e[i],a=!0
if(o.ranges){o.copied||((o=e[i]=o.deepCopy()).copied=!0)
for(var l=0;l<o.ranges.length;l++)Wn(o.ranges[l].anchor,t,r,n),Wn(o.ranges[l].head,t,r,n)}else{for(var s=0;s<o.changes.length;++s){var u=o.changes[s]
if(r<u.from.line)u.from=D(u.from.line+n,u.from.ch),u.to=D(u.to.line+n,u.to.ch)
else if(t<=u.to.line){a=!1
break}}a||(e.splice(0,i+1),i=0)}}}function Dn(e,t){var r=t.from.line,n=t.to.line,i=t.text.length-(n-r)-1
zn(e.done,r,n,i),zn(e.undone,r,n,i)}function Pn(e,t,r,n){var i=t,o=t
return"number"==typeof t?o=L(e,R(e,t)):i=A(t),null==i?null:(n(o,i)&&e.cm&&Sr(e.cm,i,r),o)}function Hn(e){var t=this
this.lines=e,this.parent=null
for(var r=0,n=0;n<e.length;++n)e[n].parent=t,r+=e[n].height
this.height=r}function En(e){var t=this
this.children=e
for(var r=0,n=0,i=0;i<e.length;++i){var o=e[i]
r+=o.chunkSize(),n+=o.height,o.parent=t}this.size=r,this.height=n,this.parent=null}function In(e,t,r){le(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&or(e,r)}function Fn(e,t,r,n,o){if(n&&n.shared)return function(e,t,r,n,i){(n=c(n)).shared=!1
var o=[Fn(e,t,r,n,i)],a=o[0],l=n.widgetNode
return Yr(e,function(e){l&&(n.widgetNode=l.cloneNode(!0)),o.push(Fn(e,B(e,t),B(e,r),n,i))
for(var s=0;s<e.linked.length;++s)if(e.linked[s].isParent)return
a=g(o)}),new ra(o,a)}(e,t,r,n,o)
if(e.cm&&!e.cm.curOp)return wr(e.cm,Fn)(e,t,r,n,o)
var a=new ta(e,o),l=P(t,r)
if(n&&c(n,a,!1),l>0||0==l&&!1!==a.clearWhenEmpty)return a
if(a.replacedWith&&(a.collapsed=!0,a.widgetNode=i("span",[a.replacedWith],"CodeMirror-widget"),n.handleMouseEvents||a.widgetNode.setAttribute("cm-ignore-events","true"),n.insertLeft&&(a.widgetNode.insertLeft=!0)),a.collapsed){if(te(e,t.line,t,r,a)||t.line!=r.line&&te(e,r.line,t,r,a))throw new Error("Inserting collapsed marker partially overlapping an existing one")
wo=!0}a.addToHistory&&rn(e,{from:t,to:r,origin:"markText"},e.sel,NaN)
var s,u=t.line,d=e.cm
if(e.iter(u,r.line+1,function(e){d&&a.collapsed&&!d.options.lineWrapping&&re(e)==d.display.maxLine&&(s=!0),a.collapsed&&u!=t.line&&N(e,0),function(e,t){e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t],t.marker.attachLine(e)}(e,new V(a,u==t.line?t.ch:null,u==r.line?r.ch:null)),++u}),a.collapsed&&e.iter(t.line,r.line+1,function(t){oe(e,t)&&N(t,0)}),a.clearOnEnter&&So(a,"beforeCursorEnter",function(){return a.clear()}),a.readOnly&&(bo=!0,(e.history.done.length||e.history.undone.length)&&e.clearHistory()),a.collapsed&&(a.id=++ea,a.atomic=!0),d){if(s&&(d.curOp.updateMaxLine=!0),a.collapsed)Cr(d,t.line,r.line+1)
else if(a.className||a.title||a.startStyle||a.endStyle||a.css)for(var f=t.line;f<=r.line;f++)Sr(d,f,"text")
a.atomic&&yn(d.doc),Ye(d,"markerAdded",d,a)}return a}function Rn(e){return e.findMarks(D(e.first,0),e.clipPos(D(e.lastLine())),function(e){return e.parent})}function Bn(e){for(var t=function(t){var r=e[t],n=[r.primary.doc]
Yr(r.primary.doc,function(e){return n.push(e)})
for(var i=0;i<r.markers.length;i++){var o=r.markers[i];-1==f(n,o.doc)&&(o.parent=null,r.markers.splice(i--,1))}},r=0;r<e.length;r++)t(r)}function jn(e){var t=this
if(Vn(t),!ge(t,e)&&!lt(t.display,e)){be(e),Bi&&(oa=+new Date)
var r=Vt(t,e,!0),n=e.dataTransfer.files
if(r&&!t.isReadOnly())if(n&&n.length&&window.FileReader&&window.File)for(var i=n.length,o=Array(i),a=0,l=function(e,n){if(!t.options.allowDropFileTypes||-1!=f(t.options.allowDropFileTypes,e.type)){var l=new FileReader
l.onload=wr(t,function(){var e=l.result
if(/[\x00-\x08\x0e-\x1f]{2}/.test(e)&&(e=""),o[n]=e,++a==i){var s={from:r=B(t.doc,r),to:r,text:t.doc.splitLines(o.join(t.doc.lineSeparator())),origin:"paste"}
Ln(t.doc,s),pn(t.doc,jr(r,Vr(s)))}}),l.readAsText(e)}},s=0;s<i;++s)l(n[s],s)
else{if(t.state.draggingText&&t.doc.sel.contains(r)>-1)return t.state.draggingText(e),void setTimeout(function(){return t.display.input.focus()},20)
try{var u=e.dataTransfer.getData("Text")
if(u){var c
if(t.state.draggingText&&!t.state.draggingText.copy&&(c=t.listSelections()),mn(t.doc,jr(r,r)),c)for(var d=0;d<c.length;++d)On(t.doc,"",c[d].anchor,c[d].head,"drag")
t.replaceSelection(u,"around","paste"),t.display.input.focus()}}catch(e){}}}}function Vn(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function Kn(e){if(document.getElementsByClassName)for(var t=document.getElementsByClassName("CodeMirror"),r=0;r<t.length;r++){var n=t[r].CodeMirror
n&&e(n)}}function Gn(e){var t=e.display
t.lastWrapHeight==t.wrapper.clientHeight&&t.lastWrapWidth==t.wrapper.clientWidth||(t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null,t.scrollbarsClipped=!1,e.setSize())}function Un(e){var t=e.split(/-(?!$)/)
e=t[t.length-1]
for(var r,n,i,o,a=0;a<t.length-1;a++){var l=t[a]
if(/^(cmd|meta|m)$/i.test(l))o=!0
else if(/^a(lt)?$/i.test(l))r=!0
else if(/^(c|ctrl|control)$/i.test(l))n=!0
else{if(!/^s(hift)?$/i.test(l))throw new Error("Unrecognized modifier name: "+l)
i=!0}}return r&&(e="Alt-"+e),n&&(e="Ctrl-"+e),o&&(e="Cmd-"+e),i&&(e="Shift-"+e),e}function qn(e){var t={}
for(var r in e)if(e.hasOwnProperty(r)){var n=e[r]
if(/^(name|fallthrough|(de|at)tach)$/.test(r))continue
if("..."==n){delete e[r]
continue}for(var i=m(r.split(" "),Un),o=0;o<i.length;o++){var a=void 0,l=void 0
o==i.length-1?(l=i.join(" "),a=n):(l=i.slice(0,o+1).join(" "),a="...")
var s=t[l]
if(s){if(s!=a)throw new Error("Inconsistent bindings for "+l)}else t[l]=a}delete e[r]}for(var u in t)e[u]=t[u]
return e}function $n(e,t,r,n){var i=(t=Zn(t)).call?t.call(e,n):t[e]
if(!1===i)return"nothing"
if("..."===i)return"multi"
if(null!=i&&r(i))return"handled"
if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return $n(e,t.fallthrough,r,n)
for(var o=0;o<t.fallthrough.length;o++){var a=$n(e,t.fallthrough[o],r,n)
if(a)return a}}}function _n(e){var t="string"==typeof e?e:la[e.keyCode]
return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t}function Xn(e,t,r){var n=e
return t.altKey&&"Alt"!=n&&(e="Alt-"+e),(no?t.metaKey:t.ctrlKey)&&"Ctrl"!=n&&(e="Ctrl-"+e),(no?t.ctrlKey:t.metaKey)&&"Cmd"!=n&&(e="Cmd-"+e),!r&&t.shiftKey&&"Shift"!=n&&(e="Shift-"+e),e}function Yn(e,t){if(Ui&&34==e.keyCode&&e.char)return!1
var r=la[e.keyCode]
return null!=r&&!e.altGraphKey&&Xn(r,e,t)}function Zn(e){return"string"==typeof e?da[e]:e}function Qn(e,t){for(var r=e.doc.sel.ranges,n=[],i=0;i<r.length;i++){for(var o=t(r[i]);n.length&&P(o.from,g(n).to)<=0;){var a=n.pop()
if(P(a.from,o.from)<0){o.from=a.from
break}}n.push(o)}br(e,function(){for(var t=n.length-1;t>=0;t--)On(e.doc,"",n[t].from,n[t].to,"+delete")
ar(e)})}function Jn(e,t,r){var n=C(e.text,t+r,r)
return n<0||n>e.text.length?null:n}function ei(e,t,r){var n=Jn(e,t.ch,r)
return null==n?null:new D(t.line,n,r<0?"after":"before")}function ti(e,t,r,n,i){if(e){var o=de(r,t.doc.direction)
if(o){var a,l=i<0?g(o):o[0],s=i<0==(1==l.level)?"after":"before"
if(l.level>0||"rtl"==t.doc.direction){var u=vt(t,r)
a=i<0?r.text.length-1:0
var c=yt(t,u,a).top
a=S(function(e){return yt(t,u,e).top==c},i<0==(1==l.level)?l.from:l.to-1,a),"before"==s&&(a=Jn(r,a,1))}else a=i<0?l.to:l.from
return new D(n,a,s)}}return new D(n,i<0?r.text.length:0,i<0?"before":"after")}function ri(e,t){var r=L(e.doc,t),n=re(r)
return n!=r&&(t=A(n)),ti(!0,e,n,t,1)}function ni(e,t){var r=ri(e,t.line),n=L(e.doc,r.line),i=de(n,e.doc.direction)
if(!i||0==i[0].level){var o=Math.max(0,n.text.search(/\S/)),a=t.line==r.line&&t.ch<=o&&t.ch
return D(r.line,a?0:o,r.sticky)}return r}function ii(e,t,r){if("string"==typeof t&&!(t=fa[t]))return!1
e.display.input.ensurePolled()
var n=e.display.shift,i=!1
try{e.isReadOnly()&&(e.state.suppressEdits=!0),r&&(e.display.shift=!1),i=t(e)!=fo}finally{e.display.shift=n,e.state.suppressEdits=!1}return i}function oi(e,t,r,n){var i=e.state.keySeq
if(i){if(_n(t))return"handled"
if(/\'$/.test(t)?e.state.keySeq=null:ha.set(50,function(){e.state.keySeq==i&&(e.state.keySeq=null,e.display.input.reset())}),ai(e,i+" "+t,r,n))return!0}return ai(e,t,r,n)}function ai(e,t,r,n){var i=function(e,t,r){for(var n=0;n<e.state.keyMaps.length;n++){var i=$n(t,e.state.keyMaps[n],r,e)
if(i)return i}return e.options.extraKeys&&$n(t,e.options.extraKeys,r,e)||$n(t,e.options.keyMap,r,e)}(e,t,n)
return"multi"==i&&(e.state.keySeq=t),"handled"==i&&Ye(e,"keyHandled",e,t,r),"handled"!=i&&"multi"!=i||(be(r),_t(e)),!!i}function li(e,t){var r=Yn(t,!0)
return!!r&&(t.shiftKey&&!e.state.keySeq?oi(e,"Shift-"+r,t,function(t){return ii(e,t,!0)})||oi(e,r,t,function(t){if("string"==typeof t?/^go[A-Z]/.test(t):t.motion)return ii(e,t)}):oi(e,r,t,function(t){return ii(e,t)}))}function si(e){var t=this
if(t.curOp.focus=a(),!ge(t,e)){Bi&&ji<11&&27==e.keyCode&&(e.returnValue=!1)
var r=e.keyCode
t.display.shift=16==r||e.shiftKey
var n=li(t,e)
Ui&&(pa=n?r:null,!n&&88==r&&!No&&(Qi?e.metaKey:e.ctrlKey)&&t.replaceSelection("",null,"cut")),18!=r||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||function(e){function t(e){18!=e.keyCode&&e.altKey||(oo(r,"CodeMirror-crosshair"),he(document,"keyup",t),he(document,"mouseover",t))}var r=e.display.lineDiv
l(r,"CodeMirror-crosshair"),So(document,"keyup",t),So(document,"mouseover",t)}(t)}}function ui(e){16==e.keyCode&&(this.doc.sel.shift=!1),ge(this,e)}function ci(e){var t=this
if(!(lt(t.display,e)||ge(t,e)||e.ctrlKey&&!e.altKey||Qi&&e.metaKey)){var r=e.keyCode,n=e.charCode
if(Ui&&r==pa)return pa=null,void be(e)
if(!Ui||e.which&&!(e.which<10)||!li(t,e)){var i=String.fromCharCode(null==n?r:n)
"\b"!=i&&(function(e,t,r){return oi(e,"'"+i+"'",t,function(t){return ii(e,t,!0)})}(t,e)||t.display.input.onKeyPress(e))}}}function di(e){var t=this,r=t.display
if(!(ge(t,e)||r.activeTouch&&r.input.supportsTouch()))if(r.input.ensurePolled(),r.shift=e.shiftKey,lt(r,e))Vi||(r.scroller.draggable=!1,setTimeout(function(){return r.scroller.draggable=!0},100))
else if(!pi(t,e)){var n=Vt(t,e),i=Se(e),o=n?function(e,t){var r=+new Date
return va&&va.compare(r,e,t)?(ma=va=null,"triple"):ma&&ma.compare(r,e,t)?(va=new ga(r,e,t),ma=null,"double"):(ma=new ga(r,e,t),va=null,"single")}(n,i):"single"
window.focus(),1==i&&t.state.selectingText&&t.state.selectingText(e),n&&function(e,t,r,n,i){var o="Click"
return"double"==n?o="Double"+o:"triple"==n&&(o="Triple"+o),o=(1==t?"Left":2==t?"Middle":"Right")+o,oi(e,Xn(o,i),i,function(t){if("string"==typeof t&&(t=fa[t]),!t)return!1
var n=!1
try{e.isReadOnly()&&(e.state.suppressEdits=!0),n=t(e,r)!=fo}finally{e.state.suppressEdits=!1}return n})}(t,i,n,o,e)||(1==i?n?function(e,t,r,n){Bi?setTimeout(u(Xt,e),0):e.curOp.focus=a()
var i,o=function(e,t,r){var n=e.getOption("configureMouse"),i=n?n(e,t,r):{}
if(null==i.unit){var o=Ji?r.shiftKey&&r.metaKey:r.altKey
i.unit=o?"rectangle":"single"==t?"char":"double"==t?"word":"line"}return(null==i.extend||e.doc.extend)&&(i.extend=e.doc.extend||r.shiftKey),null==i.addNew&&(i.addNew=Qi?r.metaKey:r.ctrlKey),null==i.moveOnDrag&&(i.moveOnDrag=!(Qi?r.altKey:r.ctrlKey)),i}(e,r,n),l=e.doc.sel
e.options.dragDrop&&Lo&&!e.isReadOnly()&&"single"==r&&(i=l.contains(t))>-1&&(P((i=l.ranges[i]).from(),t)<0||t.xRel>0)&&(P(i.to(),t)>0||t.xRel<0)?function(e,t,r,n){var i=e.display,o=!1,a=wr(e,function(t){Vi&&(i.scroller.draggable=!1),e.state.draggingText=!1,he(document,"mouseup",a),he(document,"mousemove",l),he(i.scroller,"dragstart",s),he(i.scroller,"drop",a),o||(be(t),n.addNew||cn(e.doc,r,null,null,n.extend),Vi||Bi&&9==ji?setTimeout(function(){document.body.focus(),i.input.focus()},20):i.input.focus())}),l=function(e){o=o||Math.abs(t.clientX-e.clientX)+Math.abs(t.clientY-e.clientY)>=10},s=function(){return o=!0}
Vi&&(i.scroller.draggable=!0),e.state.draggingText=a,a.copy=!n.moveOnDrag,i.scroller.dragDrop&&i.scroller.dragDrop(),So(document,"mouseup",a),So(document,"mousemove",l),So(i.scroller,"dragstart",s),So(i.scroller,"drop",a),Yt(e),setTimeout(function(){return i.input.focus()},20)}(e,n,t,o):function(e,t,r,n){function i(t){if(0!=P(v,t))if(v=t,"rectangle"==n.unit){for(var i=[],o=e.options.tabSize,a=d(L(u,r.line).text,r.ch,o),l=d(L(u,t.line).text,t.ch,o),s=Math.min(a,l),g=Math.max(a,l),m=Math.min(r.line,t.line),y=Math.min(e.lastLine(),Math.max(r.line,t.line));m<=y;m++){var b=L(u,m).text,w=h(b,s,o)
s==g?i.push(new Qo(D(m,w),D(m,w))):b.length>w&&i.push(new Qo(D(m,w),D(m,h(b,g,o))))}i.length||i.push(new Qo(r,r)),gn(u,Br(p.ranges.slice(0,f).concat(i),f),{origin:"*mouse",scroll:!1}),e.scrollIntoView(t)}else{var x,k=c,C=fi(e,t,n.unit),S=k.anchor
P(C.anchor,S)>0?(x=C.head,S=F(k.from(),C.anchor)):(x=C.anchor,S=I(k.to(),C.head))
var T=p.ranges.slice(0)
T[f]=function(e,t){var r=t.anchor,n=t.head,i=L(e.doc,r.line)
if(0==P(r,n)&&r.sticky==n.sticky)return t
var o=de(i)
if(!o)return t
var a=ce(o,r.ch,r.sticky),l=o[a]
if(l.from!=r.ch&&l.to!=r.ch)return t
var s=a+(l.from==r.ch==(1!=l.level)?0:1)
if(0==s||s==o.length)return t
var u
if(n.line!=r.line)u=(n.line-r.line)*("ltr"==e.doc.direction?1:-1)>0
else{var c=ce(o,n.ch,n.sticky),d=c-a||(n.ch-r.ch)*(1==l.level?-1:1)
u=c==s-1||c==s?d<0:d>0}var f=o[s+(u?-1:0)],h=u==(1==f.level),p=h?f.from:f.to,g=h?"after":"before"
return r.ch==p&&r.sticky==g?t:new Qo(new D(r.line,p,g),n)}(e,new Qo(B(u,S),x)),gn(u,Br(T,f),po)}}function o(t){var r=++b,l=Vt(e,t,!0,"rectangle"==n.unit)
if(l)if(0!=P(l,v)){e.curOp.focus=a(),i(l)
var c=tr(s,u);(l.line>=c.to||l.line<c.from)&&setTimeout(wr(e,function(){b==r&&o(t)}),150)}else{var d=t.clientY<y.top?-20:t.clientY>y.bottom?20:0
d&&setTimeout(wr(e,function(){b==r&&(s.scroller.scrollTop+=d,o(t))}),50)}}function l(t){e.state.selectingText=!1,b=1/0,be(t),s.input.focus(),he(document,"mousemove",w),he(document,"mouseup",x),u.history.lastSelOrigin=null}var s=e.display,u=e.doc
be(t)
var c,f,p=u.sel,g=p.ranges
if(n.addNew&&!n.extend?(f=u.sel.contains(r),c=f>-1?g[f]:new Qo(r,r)):(c=u.sel.primary(),f=u.sel.primIndex),"rectangle"==n.unit)n.addNew||(c=new Qo(r,r)),r=Vt(e,t,!0,!0),f=-1
else{var m=fi(e,r,n.unit)
c=n.extend?un(c,m.anchor,m.head,n.extend):m}n.addNew?-1==f?(f=g.length,gn(u,Br(g.concat([c]),f),{scroll:!1,origin:"*mouse"})):g.length>1&&g[f].empty()&&"char"==n.unit&&!n.extend?(gn(u,Br(g.slice(0,f).concat(g.slice(f+1)),0),{scroll:!1,origin:"*mouse"}),p=u.sel):fn(u,f,c,po):(f=0,gn(u,new Zo([c],0),po),p=u.sel)
var v=r,y=s.wrapper.getBoundingClientRect(),b=0,w=wr(e,function(e){Se(e)?o(e):l(e)}),x=wr(e,l)
e.state.selectingText=x,So(document,"mousemove",w),So(document,"mouseup",x)}(e,n,t,o)}(t,n,o,e):Ce(e)==r.scroller&&be(e):2==i?(n&&cn(t.doc,n),setTimeout(function(){return r.input.focus()},20)):3==i&&(io?gi(t,e):Yt(t)))}}function fi(e,t,r){if("char"==r)return new Qo(t,t)
if("word"==r)return e.findWordAt(t)
if("line"==r)return new Qo(D(t.line,0),B(e.doc,D(t.line+1,0)))
var n=r(e,t)
return new Qo(n.from,n.to)}function hi(e,t,r,n){var i,o
if(t.touches)i=t.touches[0].clientX,o=t.touches[0].clientY
else try{i=t.clientX,o=t.clientY}catch(t){return!1}if(i>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1
n&&be(t)
var a=e.display,l=a.lineDiv.getBoundingClientRect()
if(o>l.bottom||!ve(e,r))return xe(t)
o-=l.top-a.viewOffset
for(var s=0;s<e.options.gutters.length;++s){var u=a.gutters.childNodes[s]
if(u&&u.getBoundingClientRect().right>=i)return pe(e,r,e,O(e.doc,o),e.options.gutters[s],t),xe(t)}}function pi(e,t){return hi(e,t,"gutterClick",!0)}function gi(e,t){lt(e.display,t)||function(e,t){return!!ve(e,"gutterContextMenu")&&hi(e,t,"gutterContextMenu",!1)}(e,t)||ge(e,t,"contextmenu")||e.display.input.onContextMenu(t)}function mi(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),kt(e)}function vi(e){Hr(e),Cr(e),rr(e)}function yi(e,t,r){if(!t!=!(r&&r!=ya)){var n=e.display.dragFunctions,i=t?So:he
i(e.display.scroller,"dragstart",n.start),i(e.display.scroller,"dragenter",n.enter),i(e.display.scroller,"dragover",n.over),i(e.display.scroller,"dragleave",n.leave),i(e.display.scroller,"drop",n.drop)}}function bi(e){e.options.lineWrapping?(l(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):(oo(e.display.wrapper,"CodeMirror-wrap"),ue(e)),jt(e),Cr(e),kt(e),setTimeout(function(){return pr(e)},100)}function wi(e,t){var o=this
if(!(this instanceof wi))return new wi(e,t)
this.options=t=t?c(t):{},c(ba,t,!1),Er(t)
var a=t.value
"string"==typeof a&&(a=new ia(a,t.mode,null,t.lineSeparator,t.direction)),this.doc=a
var l=new wi.inputStyles[t.inputStyle](this),s=this.display=new function(e,t,r){var o=this
this.input=r,o.scrollbarFiller=n("div",null,"CodeMirror-scrollbar-filler"),o.scrollbarFiller.setAttribute("cm-not-content","true"),o.gutterFiller=n("div",null,"CodeMirror-gutter-filler"),o.gutterFiller.setAttribute("cm-not-content","true"),o.lineDiv=i("div",null,"CodeMirror-code"),o.selectionDiv=n("div",null,null,"position: relative; z-index: 1"),o.cursorDiv=n("div",null,"CodeMirror-cursors"),o.measure=n("div",null,"CodeMirror-measure"),o.lineMeasure=n("div",null,"CodeMirror-measure"),o.lineSpace=i("div",[o.measure,o.lineMeasure,o.selectionDiv,o.cursorDiv,o.lineDiv],null,"position: relative; outline: none")
var a=i("div",[o.lineSpace],"CodeMirror-lines")
o.mover=n("div",[a],null,"position: relative"),o.sizer=n("div",[o.mover],"CodeMirror-sizer"),o.sizerWidth=null,o.heightForcer=n("div",null,null,"position: absolute; height: "+co+"px; width: 1px;"),o.gutters=n("div",null,"CodeMirror-gutters"),o.lineGutter=null,o.scroller=n("div",[o.sizer,o.heightForcer,o.gutters],"CodeMirror-scroll"),o.scroller.setAttribute("tabIndex","-1"),o.wrapper=n("div",[o.scrollbarFiller,o.gutterFiller,o.scroller],"CodeMirror"),Bi&&ji<8&&(o.gutters.style.zIndex=-1,o.scroller.style.paddingRight=0),Vi||Ei&&Zi||(o.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(o.wrapper):e(o.wrapper)),o.viewFrom=o.viewTo=t.first,o.reportedViewFrom=o.reportedViewTo=t.first,o.view=[],o.renderedView=null,o.externalMeasured=null,o.viewOffset=0,o.lastWrapHeight=o.lastWrapWidth=0,o.updateLineNumbers=null,o.nativeBarWidth=o.barHeight=o.barWidth=0,o.scrollbarsClipped=!1,o.lineNumWidth=o.lineNumInnerWidth=o.lineNumChars=null,o.alignWidgets=!1,o.cachedCharWidth=o.cachedTextHeight=o.cachedPaddingH=null,o.maxLine=null,o.maxLineLength=0,o.maxLineChanged=!1,o.wheelDX=o.wheelDY=o.wheelStartX=o.wheelStartY=null,o.shift=!1,o.selForContextMenu=null,o.activeTouch=null,r.init(o)}(e,a,l)
s.wrapper.CodeMirror=this,Hr(this),mi(this),t.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),mr(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:!1,cutIncoming:!1,selectingText:!1,draggingText:!1,highlight:new lo,keySeq:null,specialChars:null},t.autofocus&&!Zi&&s.input.focus(),Bi&&ji<11&&setTimeout(function(){return o.display.input.reset(!0)},20),function(e){function t(){o.activeTouch&&(a=setTimeout(function(){return o.activeTouch=null},1e3),(l=o.activeTouch).end=+new Date)}function i(e,t){if(null==t.left)return!0
var r=t.left-e.left,n=t.top-e.top
return r*r+n*n>400}var o=e.display
So(o.scroller,"mousedown",wr(e,di)),Bi&&ji<11?So(o.scroller,"dblclick",wr(e,function(t){if(!ge(e,t)){var r=Vt(e,t)
if(r&&!pi(e,t)&&!lt(e.display,t)){be(t)
var n=e.findWordAt(r)
cn(e.doc,n.anchor,n.head)}}})):So(o.scroller,"dblclick",function(t){return ge(e,t)||be(t)}),io||So(o.scroller,"contextmenu",function(t){return gi(e,t)})
var a,l={end:0}
So(o.scroller,"touchstart",function(t){if(!ge(e,t)&&!function(e){if(1!=e.touches.length)return!1
var t=e.touches[0]
return t.radiusX<=1&&t.radiusY<=1}(t)&&!pi(e,t)){o.input.ensurePolled(),clearTimeout(a)
var r=+new Date
o.activeTouch={start:r,moved:!1,prev:r-l.end<=300?l:null},1==t.touches.length&&(o.activeTouch.left=t.touches[0].pageX,o.activeTouch.top=t.touches[0].pageY)}}),So(o.scroller,"touchmove",function(){o.activeTouch&&(o.activeTouch.moved=!0)}),So(o.scroller,"touchend",function(r){var n=o.activeTouch
if(n&&!lt(o,r)&&null!=n.left&&!n.moved&&new Date-n.start<300){var a,l=e.coordsChar(o.activeTouch,"page")
a=!n.prev||i(n,n.prev)?new Qo(l,l):!n.prev.prev||i(n,n.prev.prev)?e.findWordAt(l):new Qo(D(l.line,0),B(e.doc,D(l.line+1,0))),e.setSelection(a.anchor,a.head),e.focus(),be(r)}t()}),So(o.scroller,"touchcancel",t),So(o.scroller,"scroll",function(){o.scroller.clientHeight&&(cr(e,o.scroller.scrollTop),fr(e,o.scroller.scrollLeft,!0),pe(e,"scroll",e))}),So(o.scroller,"mousewheel",function(t){return Rr(e,t)}),So(o.scroller,"DOMMouseScroll",function(t){return Rr(e,t)}),So(o.wrapper,"scroll",function(){return o.wrapper.scrollTop=o.wrapper.scrollLeft=0}),o.dragFunctions={enter:function(t){ge(e,t)||ke(t)},over:function(t){ge(e,t)||(function(e,t){var i=Vt(e,t)
if(i){var o=document.createDocumentFragment()
qt(e,i,o),e.display.dragCursor||(e.display.dragCursor=n("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),r(e.display.dragCursor,o)}}(e,t),ke(t))},start:function(t){return function(e,t){if(Bi&&(!e.state.draggingText||+new Date-oa<100))ke(t)
else if(!ge(e,t)&&!lt(e.display,t)&&(t.dataTransfer.setData("Text",e.getSelection()),t.dataTransfer.effectAllowed="copyMove",t.dataTransfer.setDragImage&&!qi)){var r=n("img",null,null,"position: fixed; left: 0; top: 0;")
r.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",Ui&&(r.width=r.height=1,e.display.wrapper.appendChild(r),r._top=r.offsetTop),t.dataTransfer.setDragImage(r,0,0),Ui&&r.parentNode.removeChild(r)}}(e,t)},drop:wr(e,jn),leave:function(t){ge(e,t)||Vn(e)}}
var s=o.input.getField()
So(s,"keyup",function(t){return ui.call(e,t)}),So(s,"keydown",wr(e,si)),So(s,"keypress",wr(e,ci)),So(s,"focus",function(t){return Zt(e,t)}),So(s,"blur",function(t){return Qt(e,t)})}(this),aa||(function(){var e
So(window,"resize",function(){null==e&&(e=setTimeout(function(){e=null,Kn(Gn)},100))}),So(window,"blur",function(){return Kn(Qt)})}(),aa=!0),vr(this),this.curOp.forceUpdate=!0,Zr(this,a),t.autofocus&&!Zi||this.hasFocus()?setTimeout(u(Zt,this),20):Qt(this)
for(var d in wa)wa.hasOwnProperty(d)&&wa[d](o,t[d],ya)
nr(this),t.finishInit&&t.finishInit(this)
for(var f=0;f<xa.length;++f)xa[f](o)
yr(this),Vi&&t.lineWrapping&&"optimizelegibility"==getComputedStyle(s.lineDiv).textRendering&&(s.lineDiv.style.textRendering="auto")}function xi(e,t,r,n){var i,o=e.doc
null==r&&(r="add"),"smart"==r&&(o.mode.indent?i=He(e,t).state:r="prev")
var a=e.options.tabSize,l=L(o,t),s=d(l.text,null,a)
l.stateAfter&&(l.stateAfter=null)
var u,c=l.text.match(/^\s*/)[0]
if(n||/\S/.test(l.text)){if("smart"==r&&((u=o.mode.indent(i,l.text.slice(c.length),l.text))==fo||u>150)){if(!n)return
r="prev"}}else u=0,r="not"
"prev"==r?u=t>o.first?d(L(o,t-1).text,null,a):0:"add"==r?u=s+e.options.indentUnit:"subtract"==r?u=s-e.options.indentUnit:"number"==typeof r&&(u=s+r),u=Math.max(0,u)
var f="",h=0
if(e.options.indentWithTabs)for(var g=Math.floor(u/a);g;--g)h+=a,f+="\t"
if(h<u&&(f+=p(u-h)),f!=c)return On(o,f,D(t,0),D(t,c.length),"+input"),l.stateAfter=null,!0
for(var m=0;m<o.sel.ranges.length;m++){var v=o.sel.ranges[m]
if(v.head.line==t&&v.head.ch<c.length){var y=D(t,c.length)
fn(o,m,new Qo(y,y))
break}}}function ki(e){ka=e}function Ci(e,t,r,n,i){var o=e.doc
e.display.shift=!1,n||(n=o.sel)
var a=e.state.pasteIncoming||"paste"==i,l=To(t),s=null
if(a&&n.ranges.length>1)if(ka&&ka.text.join("\n")==t){if(n.ranges.length%ka.text.length==0){s=[]
for(var u=0;u<ka.text.length;u++)s.push(o.splitLines(ka.text[u]))}}else l.length==n.ranges.length&&e.options.pasteLinesPerSelection&&(s=m(l,function(e){return[e]}))
for(var c,d=n.ranges.length-1;d>=0;d--){var f=n.ranges[d],h=f.from(),p=f.to()
f.empty()&&(r&&r>0?h=D(h.line,h.ch-r):e.state.overwrite&&!a?p=D(p.line,Math.min(L(o,p.line).text.length,p.ch+g(l).length)):ka&&ka.lineWise&&ka.text.join("\n")==t&&(h=p=D(h.line,0))),c=e.curOp.updateInput
var v={from:h,to:p,text:s?s[d%s.length]:l,origin:i||(a?"paste":e.state.cutIncoming?"cut":"+input")}
Ln(e.doc,v),Ye(e,"inputRead",e,v)}t&&!a&&Li(e,t),ar(e),e.curOp.updateInput=c,e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=!1}function Si(e,t){var r=e.clipboardData&&e.clipboardData.getData("Text")
if(r)return e.preventDefault(),t.isReadOnly()||t.options.disableInput||br(t,function(){return Ci(t,r,0,null,"paste")}),!0}function Li(e,t){if(e.options.electricChars&&e.options.smartIndent)for(var r=e.doc.sel,n=r.ranges.length-1;n>=0;n--){var i=r.ranges[n]
if(!(i.head.ch>100||n&&r.ranges[n-1].head.line==i.head.line)){var o=e.getModeAt(i.head),a=!1
if(o.electricChars){for(var l=0;l<o.electricChars.length;l++)if(t.indexOf(o.electricChars.charAt(l))>-1){a=xi(e,i.head.line,"smart")
break}}else o.electricInput&&o.electricInput.test(L(e.doc,i.head.line).text.slice(0,i.head.ch))&&(a=xi(e,i.head.line,"smart"))
a&&Ye(e,"electricInput",e,i.head.line)}}}function Ti(e){for(var t=[],r=[],n=0;n<e.doc.sel.ranges.length;n++){var i=e.doc.sel.ranges[n].head.line,o={anchor:D(i,0),head:D(i+1,0)}
r.push(o),t.push(e.getRange(o.anchor,o.head))}return{text:t,ranges:r}}function Mi(e,t){e.setAttribute("autocorrect","off"),e.setAttribute("autocapitalize","off"),e.setAttribute("spellcheck",!!t)}function Ni(){var e=n("textarea",null,null,"position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),t=n("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;")
return Vi?e.style.width="1000px":e.setAttribute("wrap","off"),Xi&&(e.style.border="1px solid black"),Mi(e),t}function Ai(e,t,r,n,i){function o(n){var o
if(null==(o=i?function(e,t,r,n){var i=de(t,e.doc.direction)
if(!i)return ei(t,r,n)
r.ch>=t.text.length?(r.ch=t.text.length,r.sticky="before"):r.ch<=0&&(r.ch=0,r.sticky="after")
var o=ce(i,r.ch,r.sticky),a=i[o]
if("ltr"==e.doc.direction&&a.level%2==0&&(n>0?a.to>r.ch:a.from<r.ch))return ei(t,r,n)
var l,s=function(e,r){return Jn(t,e instanceof D?e.ch:e,r)},u=function(r){return e.options.lineWrapping?(l=l||vt(e,t),Pt(e,t,l,r)):{begin:0,end:t.text.length}},c=u("before"==r.sticky?s(r,-1):r.ch)
if("rtl"==e.doc.direction||1==a.level){var d=1==a.level==n<0,f=s(r,d?1:-1)
if(null!=f&&(d?f<=a.to&&f<=c.end:f>=a.from&&f>=c.begin)){var h=d?"before":"after"
return new D(r.line,f,h)}}var p=function(e,t,n){for(var o=function(e,t){return t?new D(r.line,s(e,1),"before"):new D(r.line,e,"after")};e>=0&&e<i.length;e+=t){var a=i[e],l=t>0==(1!=a.level),u=l?n.begin:s(n.end,-1)
if(a.from<=u&&u<a.to)return o(u,l)
if(u=l?a.from:s(a.to,-1),n.begin<=u&&u<n.end)return o(u,l)}},g=p(o+n,n,c)
if(g)return g
var m=n>0?c.end:s(c.begin,-1)
return null==m||n>0&&m==t.text.length||!(g=p(n>0?0:i.length-1,n,u(m)))?null:g}(e.cm,s,t,r):ei(s,t,r))){if(n||!function(){var n=t.line+r
return!(n<e.first||n>=e.first+e.size)&&(t=new D(n,t.ch,t.sticky),s=L(e,n))}())return!1
t=ti(i,e.cm,s,t.line,r)}else t=o
return!0}var a=t,l=r,s=L(e,t.line)
if("char"==n)o()
else if("column"==n)o(!0)
else if("word"==n||"group"==n)for(var u=null,c="group"==n,d=e.cm&&e.cm.getHelper(t,"wordChars"),f=!0;!(r<0)||o(!f);f=!1){var h=s.text.charAt(t.ch)||"\n",p=w(h,d)?"w":c&&"\n"==h?"n":!c||/\s/.test(h)?null:"p"
if(!c||f||p||(p="s"),u&&u!=p){r<0&&(r=1,o(),t.sticky="after")
break}if(p&&(u=p),r>0&&!o(!f))break}var g=xn(e,t,a,l,!0)
return H(a,g)&&(g.hitSide=!0),g}function Oi(e,t,r,n){var i,o=e.doc,a=t.left
if("page"==n){var l=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight),s=Math.max(l-.5*Et(e.display),3)
i=(r>0?t.bottom:t.top)+r*s}else"line"==n&&(i=r>0?t.bottom+3:t.top-3)
for(var u;(u=zt(e,a,i)).outside;){if(r<0?i<=0:i>=o.height){u.hitSide=!0
break}i+=5*r}return u}function Wi(e,t){var r=mt(e,t.line)
if(!r||r.hidden)return null
var n=L(e.doc,t.line),i=pt(r,n,t.line),o=de(n,e.doc.direction),a="left"
o&&(a=ce(o,t.ch)%2?"right":"left")
var l=bt(i.map,t.ch,a)
return l.offset="right"==l.collapse?l.end:l.start,l}function zi(e,t){return t&&(e.bad=!0),e}function Di(e,t,r){var n
if(t==e.display.lineDiv){if(!(n=e.display.lineDiv.childNodes[r]))return zi(e.clipPos(D(e.display.viewTo-1)),!0)
t=null,r=0}else for(n=t;;n=n.parentNode){if(!n||n==e.display.lineDiv)return null
if(n.parentNode&&n.parentNode==e.display.lineDiv)break}for(var i=0;i<e.display.view.length;i++){var a=e.display.view[i]
if(a.node==n)return function(e,t,r){function n(t,r,n){for(var i=-1;i<(d?d.length:0);i++)for(var o=i<0?c.map:d[i],a=0;a<o.length;a+=3){var l=o[a+2]
if(l==t||l==r){var s=A(i<0?e.line:e.rest[i]),u=o[a]+n
return(n<0||l!=t)&&(u=o[a+(n?1:0)]),D(s,u)}}}var i=e.text.firstChild,a=!1
if(!t||!o(i,t))return zi(D(A(e.line),0),!0)
if(t==i&&(a=!0,t=i.childNodes[r],r=0,!t)){var l=e.rest?g(e.rest):e.line
return zi(D(A(l),l.text.length),a)}var s=3==t.nodeType?t:null,u=t
for(s||1!=t.childNodes.length||3!=t.firstChild.nodeType||(s=t.firstChild,r&&(r=s.nodeValue.length));u.parentNode!=i;)u=u.parentNode
var c=e.measure,d=c.maps,f=n(s,u,r)
if(f)return zi(f,a)
for(var h=u.nextSibling,p=s?s.nodeValue.length-r:0;h;h=h.nextSibling){if(f=n(h,h.firstChild,0))return zi(D(f.line,f.ch-p),a)
p+=h.textContent.length}for(var m=u.previousSibling,v=r;m;m=m.previousSibling){if(f=n(m,m.firstChild,-1))return zi(D(f.line,f.ch+v),a)
v+=m.textContent.length}}(a,t,r)}}var Pi=navigator.userAgent,Hi=navigator.platform,Ei=/gecko\/\d/i.test(Pi),Ii=/MSIE \d/.test(Pi),Fi=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(Pi),Ri=/Edge\/(\d+)/.exec(Pi),Bi=Ii||Fi||Ri,ji=Bi&&(Ii?document.documentMode||6:+(Ri||Fi)[1]),Vi=!Ri&&/WebKit\//.test(Pi),Ki=Vi&&/Qt\/\d+\.\d+/.test(Pi),Gi=!Ri&&/Chrome\//.test(Pi),Ui=/Opera\//.test(Pi),qi=/Apple Computer/.test(navigator.vendor),$i=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(Pi),_i=/PhantomJS/.test(Pi),Xi=!Ri&&/AppleWebKit/.test(Pi)&&/Mobile\/\w+/.test(Pi),Yi=/Android/.test(Pi),Zi=Xi||Yi||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(Pi),Qi=Xi||/Mac/.test(Hi),Ji=/\bCrOS\b/.test(Pi),eo=/win/i.test(Hi),to=Ui&&Pi.match(/Version\/(\d*\.\d*)/)
to&&(to=Number(to[1])),to&&to>=15&&(Ui=!1,Vi=!0)
var ro,no=Qi&&(Ki||Ui&&(null==to||to<12.11)),io=Ei||Bi&&ji>=9,oo=function(t,r){var n=t.className,i=e(r).exec(n)
if(i){var o=n.slice(i.index+i[0].length)
t.className=n.slice(0,i.index)+(o?i[1]+o:"")}}
ro=document.createRange?function(e,t,r,n){var i=document.createRange()
return i.setEnd(n||e,r),i.setStart(e,t),i}:function(e,t,r){var n=document.body.createTextRange()
try{n.moveToElementText(e.parentNode)}catch(e){return n}return n.collapse(!0),n.moveEnd("character",r),n.moveStart("character",t),n}
var ao=function(e){e.select()}
Xi?ao=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:Bi&&(ao=function(e){try{e.select()}catch(e){}})
var lo=function(){this.id=null}
lo.prototype.set=function(e,t){clearTimeout(this.id),this.id=setTimeout(t,e)}
var so,uo,co=30,fo={toString:function(){return"CodeMirror.Pass"}},ho={scroll:!1},po={origin:"*mouse"},go={origin:"+move"},mo=[""],vo=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/,yo=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/,bo=!1,wo=!1,xo=null,ko=function(){function e(e){return e<=247?r.charAt(e):1424<=e&&e<=1524?"R":1536<=e&&e<=1785?n.charAt(e-1536):1774<=e&&e<=2220?"r":8192<=e&&e<=8203?"w":8204==e?"b":"L"}function t(e,t,r){this.level=e,this.from=t,this.to=r}var r="bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN",n="nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111",i=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,o=/[stwN]/,a=/[LRr]/,l=/[Lb1n]/,s=/[1n]/
return function(r,n){var u="ltr"==n?"L":"R"
if(0==r.length||"ltr"==n&&!i.test(r))return!1
for(var c=r.length,d=[],f=0;f<c;++f)d.push(e(r.charCodeAt(f)))
for(var h=0,p=u;h<c;++h){var m=d[h]
"m"==m?d[h]=p:p=m}for(var v=0,y=u;v<c;++v){var b=d[v]
"1"==b&&"r"==y?d[v]="n":a.test(b)&&(y=b,"r"==b&&(d[v]="R"))}for(var w=1,x=d[0];w<c-1;++w){var k=d[w]
"+"==k&&"1"==x&&"1"==d[w+1]?d[w]="1":","!=k||x!=d[w+1]||"1"!=x&&"n"!=x||(d[w]=x),x=k}for(var C=0;C<c;++C){var S=d[C]
if(","==S)d[C]="N"
else if("%"==S){var L=void 0
for(L=C+1;L<c&&"%"==d[L];++L);for(var T=C&&"!"==d[C-1]||L<c&&"1"==d[L]?"1":"N",M=C;M<L;++M)d[M]=T
C=L-1}}for(var N=0,A=u;N<c;++N){var O=d[N]
"L"==A&&"1"==O?d[N]="L":a.test(O)&&(A=O)}for(var W=0;W<c;++W)if(o.test(d[W])){var z=void 0
for(z=W+1;z<c&&o.test(d[z]);++z);for(var D="L"==(W?d[W-1]:u),P=D==("L"==(z<c?d[z]:u))?D?"L":"R":u,H=W;H<z;++H)d[H]=P
W=z-1}for(var E,I=[],F=0;F<c;)if(l.test(d[F])){var R=F
for(++F;F<c&&l.test(d[F]);++F);I.push(new t(0,R,F))}else{var B=F,j=I.length
for(++F;F<c&&"L"!=d[F];++F);for(var V=B;V<F;)if(s.test(d[V])){B<V&&I.splice(j,0,new t(1,B,V))
var K=V
for(++V;V<F&&s.test(d[V]);++V);I.splice(j,0,new t(2,K,V)),B=V}else++V
B<F&&I.splice(j,0,new t(1,B,F))}return"ltr"==n&&(1==I[0].level&&(E=r.match(/^\s+/))&&(I[0].from=E[0].length,I.unshift(new t(0,0,E[0].length))),1==g(I).level&&(E=r.match(/\s+$/))&&(g(I).to-=E[0].length,I.push(new t(0,c-E[0].length,c)))),"rtl"==n?I.reverse():I}}(),Co=[],So=function(e,t,r){if(e.addEventListener)e.addEventListener(t,r,!1)
else if(e.attachEvent)e.attachEvent("on"+t,r)
else{var n=e._handlers||(e._handlers={})
n[t]=(n[t]||Co).concat(r)}},Lo=function(){if(Bi&&ji<9)return!1
var e=n("div")
return"draggable"in e||"dragDrop"in e}(),To=3!="\n\nb".split(/\n/).length?function(e){for(var t=0,r=[],n=e.length;t<=n;){var i=e.indexOf("\n",t);-1==i&&(i=e.length)
var o=e.slice(t,"\r"==e.charAt(i-1)?i-1:i),a=o.indexOf("\r");-1!=a?(r.push(o.slice(0,a)),t+=a+1):(r.push(o),t=i+1)}return r}:function(e){return e.split(/\r\n?|\n/)},Mo=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(e){return!1}}:function(e){var t
try{t=e.ownerDocument.selection.createRange()}catch(e){}return!(!t||t.parentElement()!=e)&&0!=t.compareEndPoints("StartToEnd",t)},No=function(){var e=n("div")
return"oncopy"in e||(e.setAttribute("oncopy","return;"),"function"==typeof e.oncopy)}(),Ao=null,Oo={},Wo={},zo={},Do=function(e,t,r){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=r}
Do.prototype.eol=function(){return this.pos>=this.string.length},Do.prototype.sol=function(){return this.pos==this.lineStart},Do.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},Do.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},Do.prototype.eat=function(e){var t=this.string.charAt(this.pos)
if("string"==typeof e?t==e:t&&(e.test?e.test(t):e(t)))return++this.pos,t},Do.prototype.eatWhile=function(e){for(var t=this.pos;this.eat(e););return this.pos>t},Do.prototype.eatSpace=function(){for(var e=this,t=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++e.pos
return this.pos>t},Do.prototype.skipToEnd=function(){this.pos=this.string.length},Do.prototype.skipTo=function(e){var t=this.string.indexOf(e,this.pos)
if(t>-1)return this.pos=t,!0},Do.prototype.backUp=function(e){this.pos-=e},Do.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=d(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?d(this.string,this.lineStart,this.tabSize):0)},Do.prototype.indentation=function(){return d(this.string,null,this.tabSize)-(this.lineStart?d(this.string,this.lineStart,this.tabSize):0)},Do.prototype.match=function(e,t,r){if("string"!=typeof e){var n=this.string.slice(this.pos).match(e)
return n&&n.index>0?null:(n&&!1!==t&&(this.pos+=n[0].length),n)}var i=function(e){return r?e.toLowerCase():e}
if(i(this.string.substr(this.pos,e.length))==i(e))return!1!==t&&(this.pos+=e.length),!0},Do.prototype.current=function(){return this.string.slice(this.start,this.pos)},Do.prototype.hideFirstChars=function(e,t){this.lineStart+=e
try{return t()}finally{this.lineStart-=e}},Do.prototype.lookAhead=function(e){var t=this.lineOracle
return t&&t.lookAhead(e)},Do.prototype.baseToken=function(){var e=this.lineOracle
return e&&e.baseToken(this.pos)}
var Po=function(e,t){this.state=e,this.lookAhead=t},Ho=function(e,t,r,n){this.state=t,this.doc=e,this.line=r,this.maxLookAhead=n||0,this.baseTokens=null,this.baseTokenPos=1}
Ho.prototype.lookAhead=function(e){var t=this.doc.getLine(this.line+e)
return null!=t&&e>this.maxLookAhead&&(this.maxLookAhead=e),t},Ho.prototype.baseToken=function(e){var t=this
if(!this.baseTokens)return null
for(;this.baseTokens[this.baseTokenPos]<=e;)t.baseTokenPos+=2
var r=this.baseTokens[this.baseTokenPos+1]
return{type:r&&r.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-e}},Ho.prototype.nextLine=function(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--},Ho.fromSaved=function(e,t,r){return t instanceof Po?new Ho(e,Oe(e.mode,t.state),r,t.lookAhead):new Ho(e,Oe(e.mode,t),r)},Ho.prototype.save=function(e){var t=!1!==e?Oe(this.doc.mode,this.state):this.state
return this.maxLookAhead>0?new Po(t,this.maxLookAhead):t}
var Eo=function(e,t,r){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=t||null,this.state=r},Io=function(e,t,r){this.text=e,_(this,t),this.height=r?r(this):1}
Io.prototype.lineNo=function(){return A(this)},ye(Io)
var Fo,Ro={},Bo={},jo=null,Vo=null,Ko={left:0,right:0,top:0,bottom:0},Go=function(e,t,r){this.cm=r
var i=this.vert=n("div",[n("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),o=this.horiz=n("div",[n("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar")
e(i),e(o),So(i,"scroll",function(){i.clientHeight&&t(i.scrollTop,"vertical")}),So(o,"scroll",function(){o.clientWidth&&t(o.scrollLeft,"horizontal")}),this.checkedZeroWidth=!1,Bi&&ji<8&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")}
Go.prototype.update=function(e){var t=e.scrollWidth>e.clientWidth+1,r=e.scrollHeight>e.clientHeight+1,n=e.nativeBarWidth
if(r){this.vert.style.display="block",this.vert.style.bottom=t?n+"px":"0"
var i=e.viewHeight-(t?n:0)
this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+i)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0"
if(t){this.horiz.style.display="block",this.horiz.style.right=r?n+"px":"0",this.horiz.style.left=e.barLeft+"px"
var o=e.viewWidth-e.barLeft-(r?n:0)
this.horiz.firstChild.style.width=Math.max(0,e.scrollWidth-e.clientWidth+o)+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0"
return!this.checkedZeroWidth&&e.clientHeight>0&&(0==n&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:r?n:0,bottom:t?n:0}},Go.prototype.setScrollLeft=function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz,"horiz")},Go.prototype.setScrollTop=function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert,"vert")},Go.prototype.zeroWidthHack=function(){var e=Qi&&!$i?"12px":"18px"
this.horiz.style.height=this.vert.style.width=e,this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none",this.disableHoriz=new lo,this.disableVert=new lo},Go.prototype.enableZeroWidthBar=function(e,t,r){function n(){var i=e.getBoundingClientRect();("vert"==r?document.elementFromPoint(i.right-1,(i.top+i.bottom)/2):document.elementFromPoint((i.right+i.left)/2,i.bottom-1))!=e?e.style.pointerEvents="none":t.set(1e3,n)}e.style.pointerEvents="auto",t.set(1e3,n)},Go.prototype.clear=function(){var e=this.horiz.parentNode
e.removeChild(this.horiz),e.removeChild(this.vert)}
var Uo=function(){}
Uo.prototype.update=function(){return{bottom:0,right:0}},Uo.prototype.setScrollLeft=function(){},Uo.prototype.setScrollTop=function(){},Uo.prototype.clear=function(){}
var qo={native:Go,null:Uo},$o=0,_o=function(e,t,r){var n=e.display
this.viewport=t,this.visible=tr(n,e.doc,t),this.editorIsHidden=!n.wrapper.offsetWidth,this.wrapperHeight=n.wrapper.clientHeight,this.wrapperWidth=n.wrapper.clientWidth,this.oldDisplayWidth=ft(e),this.force=r,this.dims=Ft(e),this.events=[]}
_o.prototype.signal=function(e,t){ve(e,t)&&this.events.push(arguments)},_o.prototype.finish=function(){for(var e=this,t=0;t<this.events.length;t++)pe.apply(null,e.events[t])}
var Xo=0,Yo=null
Bi?Yo=-.53:Ei?Yo=15:Gi?Yo=-.7:qi&&(Yo=-1/3)
var Zo=function(e,t){this.ranges=e,this.primIndex=t}
Zo.prototype.primary=function(){return this.ranges[this.primIndex]},Zo.prototype.equals=function(e){var t=this
if(e==this)return!0
if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1
for(var r=0;r<this.ranges.length;r++){var n=t.ranges[r],i=e.ranges[r]
if(!H(n.anchor,i.anchor)||!H(n.head,i.head))return!1}return!0},Zo.prototype.deepCopy=function(){for(var e=this,t=[],r=0;r<this.ranges.length;r++)t[r]=new Qo(E(e.ranges[r].anchor),E(e.ranges[r].head))
return new Zo(t,this.primIndex)},Zo.prototype.somethingSelected=function(){for(var e=this,t=0;t<this.ranges.length;t++)if(!e.ranges[t].empty())return!0
return!1},Zo.prototype.contains=function(e,t){var r=this
t||(t=e)
for(var n=0;n<this.ranges.length;n++){var i=r.ranges[n]
if(P(t,i.from())>=0&&P(e,i.to())<=0)return n}return-1}
var Qo=function(e,t){this.anchor=e,this.head=t}
Qo.prototype.from=function(){return F(this.anchor,this.head)},Qo.prototype.to=function(){return I(this.anchor,this.head)},Qo.prototype.empty=function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch},Hn.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,t){for(var r=this,n=e,i=e+t;n<i;++n){var o=r.lines[n]
r.height-=o.height,Ve(o),Ye(o,"delete")}this.lines.splice(e,t)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,t,r){var n=this
this.height+=r,this.lines=this.lines.slice(0,e).concat(t).concat(this.lines.slice(e))
for(var i=0;i<t.length;++i)t[i].parent=n},iterN:function(e,t,r){for(var n=this,i=e+t;e<i;++e)if(r(n.lines[e]))return!0}},En.prototype={chunkSize:function(){return this.size},removeInner:function(e,t){var r=this
this.size-=t
for(var n=0;n<this.children.length;++n){var i=r.children[n],o=i.chunkSize()
if(e<o){var a=Math.min(t,o-e),l=i.height
if(i.removeInner(e,a),r.height-=l-i.height,o==a&&(r.children.splice(n--,1),i.parent=null),0==(t-=a))break
e=0}else e-=o}if(this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof Hn))){var s=[]
this.collapse(s),this.children=[new Hn(s)],this.children[0].parent=this}},collapse:function(e){for(var t=this,r=0;r<this.children.length;++r)t.children[r].collapse(e)},insertInner:function(e,t,r){var n=this
this.size+=t.length,this.height+=r
for(var i=0;i<this.children.length;++i){var o=n.children[i],a=o.chunkSize()
if(e<=a){if(o.insertInner(e,t,r),o.lines&&o.lines.length>50){for(var l=o.lines.length%25+25,s=l;s<o.lines.length;){var u=new Hn(o.lines.slice(s,s+=25))
o.height-=u.height,n.children.splice(++i,0,u),u.parent=n}o.lines=o.lines.slice(0,l),n.maybeSpill()}break}e-=a}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this
do{var t=new En(e.children.splice(e.children.length-5,5))
if(e.parent){e.size-=t.size,e.height-=t.height
var r=f(e.parent.children,e)
e.parent.children.splice(r+1,0,t)}else{var n=new En(e.children)
n.parent=e,e.children=[n,t],e=n}t.parent=e.parent}while(e.children.length>10)
e.parent.maybeSpill()}},iterN:function(e,t,r){for(var n=this,i=0;i<this.children.length;++i){var o=n.children[i],a=o.chunkSize()
if(e<a){var l=Math.min(t,a-e)
if(o.iterN(e,l,r))return!0
if(0==(t-=l))break
e=0}else e-=a}}}
var Jo=function(e,t,r){var n=this
if(r)for(var i in r)r.hasOwnProperty(i)&&(n[i]=r[i])
this.doc=e,this.node=t}
Jo.prototype.clear=function(){var e=this,t=this.doc.cm,r=this.line.widgets,n=this.line,i=A(n)
if(null!=i&&r){for(var o=0;o<r.length;++o)r[o]==e&&r.splice(o--,1)
r.length||(n.widgets=null)
var a=at(this)
N(n,Math.max(0,n.height-a)),t&&(br(t,function(){In(t,n,-a),Sr(t,i,"widget")}),Ye(t,"lineWidgetCleared",t,this,i))}},Jo.prototype.changed=function(){var e=this,t=this.height,r=this.doc.cm,n=this.line
this.height=null
var i=at(this)-t
i&&(N(n,n.height+i),r&&br(r,function(){r.curOp.forceUpdate=!0,In(r,n,i),Ye(r,"lineWidgetChanged",r,e,A(n))}))},ye(Jo)
var ea=0,ta=function(e,t){this.lines=[],this.type=t,this.doc=e,this.id=++ea}
ta.prototype.clear=function(){var e=this
if(!this.explicitlyCleared){var t=this.doc.cm,r=t&&!t.curOp
if(r&&vr(t),ve(this,"clear")){var n=this.find()
n&&Ye(this,"clear",n.from,n.to)}for(var i=null,o=null,a=0;a<this.lines.length;++a){var l=e.lines[a],s=K(l.markedSpans,e)
t&&!e.collapsed?Sr(t,A(l),"text"):t&&(null!=s.to&&(o=A(l)),null!=s.from&&(i=A(l))),l.markedSpans=G(l.markedSpans,s),null==s.from&&e.collapsed&&!oe(e.doc,l)&&t&&N(l,Et(t.display))}if(t&&this.collapsed&&!t.options.lineWrapping)for(var u=0;u<this.lines.length;++u){var c=re(e.lines[u]),d=se(c)
d>t.display.maxLineLength&&(t.display.maxLine=c,t.display.maxLineLength=d,t.display.maxLineChanged=!0)}null!=i&&t&&this.collapsed&&Cr(t,i,o+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,t&&yn(t.doc)),t&&Ye(t,"markerCleared",t,this,i,o),r&&yr(t),this.parent&&this.parent.clear()}},ta.prototype.find=function(e,t){var r=this
null==e&&"bookmark"==this.type&&(e=1)
for(var n,i,o=0;o<this.lines.length;++o){var a=r.lines[o],l=K(a.markedSpans,r)
if(null!=l.from&&(n=D(t?a:A(a),l.from),-1==e))return n
if(null!=l.to&&(i=D(t?a:A(a),l.to),1==e))return i}return n&&{from:n,to:i}},ta.prototype.changed=function(){var e=this,t=this.find(-1,!0),r=this,n=this.doc.cm
t&&n&&br(n,function(){var i=t.line,o=A(t.line),a=mt(n,o)
if(a&&(wt(a),n.curOp.selectionChanged=n.curOp.forceUpdate=!0),n.curOp.updateMaxLine=!0,!oe(r.doc,i)&&null!=r.height){var l=r.height
r.height=null
var s=at(r)-l
s&&N(i,i.height+s)}Ye(n,"markerChanged",n,e)})},ta.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp
t.maybeHiddenMarkers&&-1!=f(t.maybeHiddenMarkers,this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},ta.prototype.detachLine=function(e){if(this.lines.splice(f(this.lines,e),1),!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;(t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this)}},ye(ta)
var ra=function(e,t){var r=this
this.markers=e,this.primary=t
for(var n=0;n<e.length;++n)e[n].parent=r}
ra.prototype.clear=function(){var e=this
if(!this.explicitlyCleared){this.explicitlyCleared=!0
for(var t=0;t<this.markers.length;++t)e.markers[t].clear()
Ye(this,"clear")}},ra.prototype.find=function(e,t){return this.primary.find(e,t)},ye(ra)
var na=0,ia=function(e,t,r,n,i){if(!(this instanceof ia))return new ia(e,t,r,n,i)
null==r&&(r=0),En.call(this,[new Hn([new Io("",null)])]),this.first=r,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.modeFrontier=this.highlightFrontier=r
var o=D(r,0)
this.sel=jr(o),this.history=new Jr(null),this.id=++na,this.modeOption=t,this.lineSep=n,this.direction="rtl"==i?"rtl":"ltr",this.extend=!1,"string"==typeof e&&(e=this.splitLines(e)),Xr(this,{from:o,to:o,text:e}),gn(this,jr(o),ho)}
ia.prototype=y(En.prototype,{constructor:ia,iter:function(e,t,r){r?this.iterN(e-this.first,t-e,r):this.iterN(this.first,this.first+this.size,e)},insert:function(e,t){for(var r=0,n=0;n<t.length;++n)r+=t[n].height
this.insertInner(e-this.first,t,r)},remove:function(e,t){this.removeInner(e-this.first,t)},getValue:function(e){var t=M(this,this.first,this.first+this.size)
return!1===e?t:t.join(e||this.lineSeparator())},setValue:kr(function(e){var t=D(this.first,0),r=this.first+this.size-1
Ln(this,{from:t,to:D(r,L(this,r).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),this.cm&&lr(this.cm,0,0),gn(this,jr(t),ho)}),replaceRange:function(e,t,r,n){On(this,e,t=B(this,t),r=r?B(this,r):t,n)},getRange:function(e,t,r){var n=T(this,B(this,e),B(this,t))
return!1===r?n:n.join(r||this.lineSeparator())},getLine:function(e){var t=this.getLineHandle(e)
return t&&t.text},getLineHandle:function(e){if(W(this,e))return L(this,e)},getLineNumber:function(e){return A(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=L(this,e)),re(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return B(this,e)},getCursor:function(e){var t=this.sel.primary()
return null==e||"head"==e?t.head:"anchor"==e?t.anchor:"end"==e||"to"==e||!1===e?t.to():t.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:kr(function(e,t,r){hn(this,B(this,"number"==typeof e?D(e,t||0):e),null,r)}),setSelection:kr(function(e,t,r){hn(this,B(this,e),B(this,t||e),r)}),extendSelection:kr(function(e,t,r){cn(this,B(this,e),t&&B(this,t),r)}),extendSelections:kr(function(e,t){dn(this,j(this,e),t)}),extendSelectionsBy:kr(function(e,t){dn(this,j(this,m(this.sel.ranges,e)),t)}),setSelections:kr(function(e,t,r){var n=this
if(e.length){for(var i=[],o=0;o<e.length;o++)i[o]=new Qo(B(n,e[o].anchor),B(n,e[o].head))
null==t&&(t=Math.min(e.length-1,this.sel.primIndex)),gn(this,Br(i,t),r)}}),addSelection:kr(function(e,t,r){var n=this.sel.ranges.slice(0)
n.push(new Qo(B(this,e),B(this,t||e))),gn(this,Br(n,n.length-1),r)}),getSelection:function(e){for(var t,r=this,n=this.sel.ranges,i=0;i<n.length;i++){var o=T(r,n[i].from(),n[i].to())
t=t?t.concat(o):o}return!1===e?t:t.join(e||this.lineSeparator())},getSelections:function(e){for(var t=this,r=[],n=this.sel.ranges,i=0;i<n.length;i++){var o=T(t,n[i].from(),n[i].to())
!1!==e&&(o=o.join(e||t.lineSeparator())),r[i]=o}return r},replaceSelection:function(e,t,r){for(var n=[],i=0;i<this.sel.ranges.length;i++)n[i]=e
this.replaceSelections(n,t,r||"+input")},replaceSelections:kr(function(e,t,r){for(var n=this,i=[],o=this.sel,a=0;a<o.ranges.length;a++){var l=o.ranges[a]
i[a]={from:l.from(),to:l.to(),text:n.splitLines(e[a]),origin:r}}for(var s=t&&"end"!=t&&function(e,t,r){for(var n=[],i=D(e.first,0),o=i,a=0;a<t.length;a++){var l=t[a],s=Ur(l.from,i,o),u=Ur(Vr(l),i,o)
if(i=l.to,o=u,"around"==r){var c=e.sel.ranges[a],d=P(c.head,c.anchor)<0
n[a]=new Qo(d?u:s,d?s:u)}else n[a]=new Qo(s,s)}return new Zo(n,e.sel.primIndex)}(this,i,t),u=i.length-1;u>=0;u--)Ln(n,i[u])
s?pn(this,s):this.cm&&ar(this.cm)}),undo:kr(function(){Mn(this,"undo")}),redo:kr(function(){Mn(this,"redo")}),undoSelection:kr(function(){Mn(this,"undo",!0)}),redoSelection:kr(function(){Mn(this,"redo",!0)}),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,t=0,r=0,n=0;n<e.done.length;n++)e.done[n].ranges||++t
for(var i=0;i<e.undone.length;i++)e.undone[i].ranges||++r
return{undo:t,redo:r}},clearHistory:function(){this.history=new Jr(this.history.maxGeneration)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:sn(this.history.done),undone:sn(this.history.undone)}},setHistory:function(e){var t=this.history=new Jr(this.history.maxGeneration)
t.done=sn(e.done.slice(0),null,!0),t.undone=sn(e.undone.slice(0),null,!0)},setGutterMarker:kr(function(e,t,r){return Pn(this,e,"gutter",function(e){var n=e.gutterMarkers||(e.gutterMarkers={})
return n[t]=r,!r&&x(n)&&(e.gutterMarkers=null),!0})}),clearGutter:kr(function(e){var t=this
this.iter(function(r){r.gutterMarkers&&r.gutterMarkers[e]&&Pn(t,r,"gutter",function(){return r.gutterMarkers[e]=null,x(r.gutterMarkers)&&(r.gutterMarkers=null),!0})})}),lineInfo:function(e){var t
if("number"==typeof e){if(!W(this,e))return null
if(t=e,!(e=L(this,e)))return null}else if(null==(t=A(e)))return null
return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},addLineClass:kr(function(t,r,n){return Pn(this,t,"gutter"==r?"gutter":"class",function(t){var i="text"==r?"textClass":"background"==r?"bgClass":"gutter"==r?"gutterClass":"wrapClass"
if(t[i]){if(e(n).test(t[i]))return!1
t[i]+=" "+n}else t[i]=n
return!0})}),removeLineClass:kr(function(t,r,n){return Pn(this,t,"gutter"==r?"gutter":"class",function(t){var i="text"==r?"textClass":"background"==r?"bgClass":"gutter"==r?"gutterClass":"wrapClass",o=t[i]
if(!o)return!1
if(null==n)t[i]=null
else{var a=o.match(e(n))
if(!a)return!1
var l=a.index+a[0].length
t[i]=o.slice(0,a.index)+(a.index&&l!=o.length?" ":"")+o.slice(l)||null}return!0})}),addLineWidget:kr(function(e,t,r){return function(e,t,r,n){var i=new Jo(e,r,n),o=e.cm
return o&&i.noHScroll&&(o.display.alignWidgets=!0),Pn(e,t,"widget",function(t){var r=t.widgets||(t.widgets=[])
if(null==i.insertAt?r.push(i):r.splice(Math.min(r.length-1,Math.max(0,i.insertAt)),0,i),i.line=t,o&&!oe(e,t)){var n=le(t)<e.scrollTop
N(t,t.height+at(i)),n&&or(o,i.height),o.curOp.forceUpdate=!0}return!0}),Ye(o,"lineWidgetAdded",o,i,"number"==typeof t?t:A(t)),i}(this,e,t,r)}),removeLineWidget:function(e){e.clear()},markText:function(e,t,r){return Fn(this,B(this,e),B(this,t),r,r&&r.type||"range")},setBookmark:function(e,t){var r={replacedWith:t&&(null==t.nodeType?t.widget:t),insertLeft:t&&t.insertLeft,clearWhenEmpty:!1,shared:t&&t.shared,handleMouseEvents:t&&t.handleMouseEvents}
return e=B(this,e),Fn(this,e,e,r,"bookmark")},findMarksAt:function(e){var t=[],r=L(this,(e=B(this,e)).line).markedSpans
if(r)for(var n=0;n<r.length;++n){var i=r[n];(null==i.from||i.from<=e.ch)&&(null==i.to||i.to>=e.ch)&&t.push(i.marker.parent||i.marker)}return t},findMarks:function(e,t,r){e=B(this,e),t=B(this,t)
var n=[],i=e.line
return this.iter(e.line,t.line+1,function(o){var a=o.markedSpans
if(a)for(var l=0;l<a.length;l++){var s=a[l]
null!=s.to&&i==e.line&&e.ch>=s.to||null==s.from&&i!=e.line||null!=s.from&&i==t.line&&s.from>=t.ch||r&&!r(s.marker)||n.push(s.marker.parent||s.marker)}++i}),n},getAllMarks:function(){var e=[]
return this.iter(function(t){var r=t.markedSpans
if(r)for(var n=0;n<r.length;++n)null!=r[n].from&&e.push(r[n].marker)}),e},posFromIndex:function(e){var t,r=this.first,n=this.lineSeparator().length
return this.iter(function(i){var o=i.text.length+n
if(o>e)return t=e,!0
e-=o,++r}),B(this,D(r,t))},indexFromPos:function(e){var t=(e=B(this,e)).ch
if(e.line<this.first||e.ch<0)return 0
var r=this.lineSeparator().length
return this.iter(this.first,e.line,function(e){t+=e.text.length+r}),t},copy:function(e){var t=new ia(M(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep,this.direction)
return t.scrollTop=this.scrollTop,t.scrollLeft=this.scrollLeft,t.sel=this.sel,t.extend=!1,e&&(t.history.undoDepth=this.history.undoDepth,t.setHistory(this.getHistory())),t},linkedDoc:function(e){e||(e={})
var t=this.first,r=this.first+this.size
null!=e.from&&e.from>t&&(t=e.from),null!=e.to&&e.to<r&&(r=e.to)
var n=new ia(M(this,t,r),e.mode||this.modeOption,t,this.lineSep,this.direction)
return e.sharedHist&&(n.history=this.history),(this.linked||(this.linked=[])).push({doc:n,sharedHist:e.sharedHist}),n.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],function(e,t){for(var r=0;r<t.length;r++){var n=t[r],i=n.find(),o=e.clipPos(i.from),a=e.clipPos(i.to)
if(P(o,a)){var l=Fn(e,o,a,n.primary,n.primary.type)
n.markers.push(l),l.parent=n}}}(n,Rn(this)),n},unlinkDoc:function(e){var t=this
if(e instanceof wi&&(e=e.doc),this.linked)for(var r=0;r<this.linked.length;++r)if(t.linked[r].doc==e){t.linked.splice(r,1),e.unlinkDoc(t),Bn(Rn(t))
break}if(e.history==this.history){var n=[e.id]
Yr(e,function(e){return n.push(e.id)},!0),e.history=new Jr(null),e.history.done=sn(this.history.done,n),e.history.undone=sn(this.history.undone,n)}},iterLinkedDocs:function(e){Yr(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):To(e)},lineSeparator:function(){return this.lineSep||"\n"},setDirection:kr(function(e){"rtl"!=e&&(e="ltr"),e!=this.direction&&(this.direction=e,this.iter(function(e){return e.order=null}),this.cm&&function(e){br(e,function(){Qr(e),Cr(e)})}(this.cm))})}),ia.prototype.eachLine=ia.prototype.iter
for(var oa=0,aa=!1,la={3:"Enter",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",127:"Delete",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"},sa=0;sa<10;sa++)la[sa+48]=la[sa+96]=String(sa)
for(var ua=65;ua<=90;ua++)la[ua]=String.fromCharCode(ua)
for(var ca=1;ca<=12;ca++)la[ca+111]=la[ca+63235]="F"+ca
var da={}
da.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},da.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},da.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},da.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},da.default=Qi?da.macDefault:da.pcDefault
var fa={selectAll:Cn,singleSelection:function(e){return e.setSelection(e.getCursor("anchor"),e.getCursor("head"),ho)},killLine:function(e){return Qn(e,function(t){if(t.empty()){var r=L(e.doc,t.head.line).text.length
return t.head.ch==r&&t.head.line<e.lastLine()?{from:t.head,to:D(t.head.line+1,0)}:{from:t.head,to:D(t.head.line,r)}}return{from:t.from(),to:t.to()}})},deleteLine:function(e){return Qn(e,function(t){return{from:D(t.from().line,0),to:B(e.doc,D(t.to().line+1,0))}})},delLineLeft:function(e){return Qn(e,function(e){return{from:D(e.from().line,0),to:e.from()}})},delWrappedLineLeft:function(e){return Qn(e,function(t){var r=e.charCoords(t.head,"div").top+5
return{from:e.coordsChar({left:0,top:r},"div"),to:t.from()}})},delWrappedLineRight:function(e){return Qn(e,function(t){var r=e.charCoords(t.head,"div").top+5,n=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div")
return{from:t.from(),to:n}})},undo:function(e){return e.undo()},redo:function(e){return e.redo()},undoSelection:function(e){return e.undoSelection()},redoSelection:function(e){return e.redoSelection()},goDocStart:function(e){return e.extendSelection(D(e.firstLine(),0))},goDocEnd:function(e){return e.extendSelection(D(e.lastLine()))},goLineStart:function(e){return e.extendSelectionsBy(function(t){return ri(e,t.head.line)},{origin:"+move",bias:1})},goLineStartSmart:function(e){return e.extendSelectionsBy(function(t){return ni(e,t.head)},{origin:"+move",bias:1})},goLineEnd:function(e){return e.extendSelectionsBy(function(t){return function(e,t){var r=L(e.doc,t),n=function(e){for(var t;t=ee(e);)e=t.find(1,!0).line
return e}(r)
return n!=r&&(t=A(n)),ti(!0,e,r,t,-1)}(e,t.head.line)},{origin:"+move",bias:-1})},goLineRight:function(e){return e.extendSelectionsBy(function(t){var r=e.cursorCoords(t.head,"div").top+5
return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:r},"div")},go)},goLineLeft:function(e){return e.extendSelectionsBy(function(t){var r=e.cursorCoords(t.head,"div").top+5
return e.coordsChar({left:0,top:r},"div")},go)},goLineLeftSmart:function(e){return e.extendSelectionsBy(function(t){var r=e.cursorCoords(t.head,"div").top+5,n=e.coordsChar({left:0,top:r},"div")
return n.ch<e.getLine(n.line).search(/\S/)?ni(e,t.head):n},go)},goLineUp:function(e){return e.moveV(-1,"line")},goLineDown:function(e){return e.moveV(1,"line")},goPageUp:function(e){return e.moveV(-1,"page")},goPageDown:function(e){return e.moveV(1,"page")},goCharLeft:function(e){return e.moveH(-1,"char")},goCharRight:function(e){return e.moveH(1,"char")},goColumnLeft:function(e){return e.moveH(-1,"column")},goColumnRight:function(e){return e.moveH(1,"column")},goWordLeft:function(e){return e.moveH(-1,"word")},goGroupRight:function(e){return e.moveH(1,"group")},goGroupLeft:function(e){return e.moveH(-1,"group")},goWordRight:function(e){return e.moveH(1,"word")},delCharBefore:function(e){return e.deleteH(-1,"char")},delCharAfter:function(e){return e.deleteH(1,"char")},delWordBefore:function(e){return e.deleteH(-1,"word")},delWordAfter:function(e){return e.deleteH(1,"word")},delGroupBefore:function(e){return e.deleteH(-1,"group")},delGroupAfter:function(e){return e.deleteH(1,"group")},indentAuto:function(e){return e.indentSelection("smart")},indentMore:function(e){return e.indentSelection("add")},indentLess:function(e){return e.indentSelection("subtract")},insertTab:function(e){return e.replaceSelection("\t")},insertSoftTab:function(e){for(var t=[],r=e.listSelections(),n=e.options.tabSize,i=0;i<r.length;i++){var o=r[i].from(),a=d(e.getLine(o.line),o.ch,n)
t.push(p(n-a%n))}e.replaceSelections(t)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){return br(e,function(){for(var t=e.listSelections(),r=[],n=0;n<t.length;n++)if(t[n].empty()){var i=t[n].head,o=L(e.doc,i.line).text
if(o)if(i.ch==o.length&&(i=new D(i.line,i.ch-1)),i.ch>0)i=new D(i.line,i.ch+1),e.replaceRange(o.charAt(i.ch-1)+o.charAt(i.ch-2),D(i.line,i.ch-2),i,"+transpose")
else if(i.line>e.doc.first){var a=L(e.doc,i.line-1).text
a&&(i=new D(i.line,1),e.replaceRange(o.charAt(0)+e.doc.lineSeparator()+a.charAt(a.length-1),D(i.line-1,a.length-1),i,"+transpose"))}r.push(new Qo(i,i))}e.setSelections(r)})},newlineAndIndent:function(e){return br(e,function(){for(var t=e.listSelections(),r=t.length-1;r>=0;r--)e.replaceRange(e.doc.lineSeparator(),t[r].anchor,t[r].head,"+input")
t=e.listSelections()
for(var n=0;n<t.length;n++)e.indentLine(t[n].from().line,null,!0)
ar(e)})},openLine:function(e){return e.replaceSelection("\n","start")},toggleOverwrite:function(e){return e.toggleOverwrite()}},ha=new lo,pa=null,ga=function(e,t,r){this.time=e,this.pos=t,this.button=r}
ga.prototype.compare=function(e,t,r){return this.time+400>e&&0==P(t,this.pos)&&r==this.button}
var ma,va,ya={toString:function(){return"CodeMirror.Init"}},ba={},wa={}
wi.defaults=ba,wi.optionHandlers=wa
var xa=[]
wi.defineInitHook=function(e){return xa.push(e)}
var ka=null,Ca=function(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new lo,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null}
Ca.prototype.init=function(e){function t(e){if(!ge(i,e)){if(i.somethingSelected())ki({lineWise:!1,text:i.getSelections()}),"cut"==e.type&&i.replaceSelection("",null,"cut")
else{if(!i.options.lineWiseCopyCut)return
var t=Ti(i)
ki({lineWise:!0,text:t.text}),"cut"==e.type&&i.operation(function(){i.setSelections(t.ranges,0,ho),i.replaceSelection("",null,"cut")})}if(e.clipboardData){e.clipboardData.clearData()
var r=ka.text.join("\n")
if(e.clipboardData.setData("Text",r),e.clipboardData.getData("Text")==r)return void e.preventDefault()}var a=Ni(),l=a.firstChild
i.display.lineSpace.insertBefore(a,i.display.lineSpace.firstChild),l.value=ka.text.join("\n")
var s=document.activeElement
ao(l),setTimeout(function(){i.display.lineSpace.removeChild(a),s.focus(),s==o&&n.showPrimarySelection()},50)}}var r=this,n=this,i=n.cm,o=n.div=e.lineDiv
Mi(o,i.options.spellcheck),So(o,"paste",function(e){ge(i,e)||Si(e,i)||ji<=11&&setTimeout(wr(i,function(){return r.updateFromDOM()}),20)}),So(o,"compositionstart",function(e){r.composing={data:e.data,done:!1}}),So(o,"compositionupdate",function(e){r.composing||(r.composing={data:e.data,done:!1})}),So(o,"compositionend",function(e){r.composing&&(e.data!=r.composing.data&&r.readFromDOMSoon(),r.composing.done=!0)}),So(o,"touchstart",function(){return n.forceCompositionEnd()}),So(o,"input",function(){r.composing||r.readFromDOMSoon()}),So(o,"copy",t),So(o,"cut",t)},Ca.prototype.prepareSelection=function(){var e=Ut(this.cm,!1)
return e.focus=this.cm.state.focused,e},Ca.prototype.showSelection=function(e,t){e&&this.cm.display.view.length&&((e.focus||t)&&this.showPrimarySelection(),this.showMultipleSelections(e))},Ca.prototype.showPrimarySelection=function(){var e=window.getSelection(),t=this.cm,r=t.doc.sel.primary(),n=r.from(),i=r.to()
if(t.display.viewTo==t.display.viewFrom||n.line>=t.display.viewTo||i.line<t.display.viewFrom)e.removeAllRanges()
else{var o=Di(t,e.anchorNode,e.anchorOffset),a=Di(t,e.focusNode,e.focusOffset)
if(!o||o.bad||!a||a.bad||0!=P(F(o,a),n)||0!=P(I(o,a),i)){var l=t.display.view,s=n.line>=t.display.viewFrom&&Wi(t,n)||{node:l[0].measure.map[2],offset:0},u=i.line<t.display.viewTo&&Wi(t,i)
if(!u){var c=l[l.length-1].measure,d=c.maps?c.maps[c.maps.length-1]:c.map
u={node:d[d.length-1],offset:d[d.length-2]-d[d.length-3]}}if(s&&u){var f,h=e.rangeCount&&e.getRangeAt(0)
try{f=ro(s.node,s.offset,u.offset,u.node)}catch(e){}f&&(!Ei&&t.state.focused?(e.collapse(s.node,s.offset),f.collapsed||(e.removeAllRanges(),e.addRange(f))):(e.removeAllRanges(),e.addRange(f)),h&&null==e.anchorNode?e.addRange(h):Ei&&this.startGracePeriod()),this.rememberSelection()}else e.removeAllRanges()}}},Ca.prototype.startGracePeriod=function(){var e=this
clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout(function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation(function(){return e.cm.curOp.selectionChanged=!0})},20)},Ca.prototype.showMultipleSelections=function(e){r(this.cm.display.cursorDiv,e.cursors),r(this.cm.display.selectionDiv,e.selection)},Ca.prototype.rememberSelection=function(){var e=window.getSelection()
this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},Ca.prototype.selectionInEditor=function(){var e=window.getSelection()
if(!e.rangeCount)return!1
var t=e.getRangeAt(0).commonAncestorContainer
return o(this.div,t)},Ca.prototype.focus=function(){"nocursor"!=this.cm.options.readOnly&&(this.selectionInEditor()||this.showSelection(this.prepareSelection(),!0),this.div.focus())},Ca.prototype.blur=function(){this.div.blur()},Ca.prototype.getField=function(){return this.div},Ca.prototype.supportsTouch=function(){return!0},Ca.prototype.receivedFocus=function(){function e(){t.cm.state.focused&&(t.pollSelection(),t.polling.set(t.cm.options.pollInterval,e))}var t=this
this.selectionInEditor()?this.pollSelection():br(this.cm,function(){return t.cm.curOp.selectionChanged=!0}),this.polling.set(this.cm.options.pollInterval,e)},Ca.prototype.selectionChanged=function(){var e=window.getSelection()
return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},Ca.prototype.pollSelection=function(){if(null==this.readDOMTimeout&&!this.gracePeriod&&this.selectionChanged()){var e=window.getSelection(),t=this.cm
if(Yi&&Gi&&this.cm.options.gutters.length&&function(e){for(var t=e;t;t=t.parentNode)if(/CodeMirror-gutter-wrapper/.test(t.className))return!0
return!1}(e.anchorNode))return this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),void this.focus()
if(!this.composing){this.rememberSelection()
var r=Di(t,e.anchorNode,e.anchorOffset),n=Di(t,e.focusNode,e.focusOffset)
r&&n&&br(t,function(){gn(t.doc,jr(r,n),ho),(r.bad||n.bad)&&(t.curOp.selectionChanged=!0)})}}},Ca.prototype.pollContent=function(){null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null)
var e=this.cm,t=e.display,r=e.doc.sel.primary(),n=r.from(),i=r.to()
if(0==n.ch&&n.line>e.firstLine()&&(n=D(n.line-1,L(e.doc,n.line-1).length)),i.ch==L(e.doc,i.line).text.length&&i.line<e.lastLine()&&(i=D(i.line+1,0)),n.line<t.viewFrom||i.line>t.viewTo-1)return!1
var o,a,l
n.line==t.viewFrom||0==(o=Kt(e,n.line))?(a=A(t.view[0].line),l=t.view[0].node):(a=A(t.view[o].line),l=t.view[o-1].node.nextSibling)
var s,u,c=Kt(e,i.line)
if(c==t.view.length-1?(s=t.viewTo-1,u=t.lineDiv.lastChild):(s=A(t.view[c+1].line)-1,u=t.view[c+1].node.previousSibling),!l)return!1
for(var d=e.doc.splitLines(function(e,t,r,n,i){function o(){u&&(s+=c,u=!1)}function a(e){e&&(o(),s+=e)}function l(t){if(1==t.nodeType){var r=t.getAttribute("cm-text")
if(null!=r)return void a(r||t.textContent.replace(/\u200b/g,""))
var s,d=t.getAttribute("cm-marker")
if(d){var f=e.findMarks(D(n,0),D(i+1,0),function(e){return function(t){return t.id==e}}(+d))
return void(f.length&&(s=f[0].find(0))&&a(T(e.doc,s.from,s.to).join(c)))}if("false"==t.getAttribute("contenteditable"))return
var h=/^(pre|div|p)$/i.test(t.nodeName)
h&&o()
for(var p=0;p<t.childNodes.length;p++)l(t.childNodes[p])
h&&(u=!0)}else 3==t.nodeType&&a(t.nodeValue)}for(var s="",u=!1,c=e.doc.lineSeparator();l(t),t!=r;)t=t.nextSibling
return s}(e,l,u,a,s)),f=T(e.doc,D(a,0),D(s,L(e.doc,s).text.length));d.length>1&&f.length>1;)if(g(d)==g(f))d.pop(),f.pop(),s--
else{if(d[0]!=f[0])break
d.shift(),f.shift(),a++}for(var h=0,p=0,m=d[0],v=f[0],y=Math.min(m.length,v.length);h<y&&m.charCodeAt(h)==v.charCodeAt(h);)++h
for(var b=g(d),w=g(f),x=Math.min(b.length-(1==d.length?h:0),w.length-(1==f.length?h:0));p<x&&b.charCodeAt(b.length-p-1)==w.charCodeAt(w.length-p-1);)++p
if(1==d.length&&1==f.length&&a==n.line)for(;h&&h>n.ch&&b.charCodeAt(b.length-p-1)==w.charCodeAt(w.length-p-1);)h--,p++
d[d.length-1]=b.slice(0,b.length-p).replace(/^\u200b+/,""),d[0]=d[0].slice(h).replace(/\u200b+$/,"")
var k=D(a,h),C=D(s,f.length?g(f).length-p:0)
return d.length>1||d[0]||P(k,C)?(On(e.doc,d,k,C,"+input"),!0):void 0},Ca.prototype.ensurePolled=function(){this.forceCompositionEnd()},Ca.prototype.reset=function(){this.forceCompositionEnd()},Ca.prototype.forceCompositionEnd=function(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())},Ca.prototype.readFromDOMSoon=function(){var e=this
null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout(function(){if(e.readDOMTimeout=null,e.composing){if(!e.composing.done)return
e.composing=null}e.updateFromDOM()},80))},Ca.prototype.updateFromDOM=function(){var e=this
!this.cm.isReadOnly()&&this.pollContent()||br(this.cm,function(){return Cr(e.cm)})},Ca.prototype.setUneditable=function(e){e.contentEditable="false"},Ca.prototype.onKeyPress=function(e){0!=e.charCode&&(e.preventDefault(),this.cm.isReadOnly()||wr(this.cm,Ci)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0))},Ca.prototype.readOnlyChanged=function(e){this.div.contentEditable=String("nocursor"!=e)},Ca.prototype.onContextMenu=function(){},Ca.prototype.resetPosition=function(){},Ca.prototype.needsContentAttribute=!0
var Sa=function(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new lo,this.hasSelection=!1,this.composing=null}
Sa.prototype.init=function(e){function t(e){if(!ge(i,e)){if(i.somethingSelected())ki({lineWise:!1,text:i.getSelections()})
else{if(!i.options.lineWiseCopyCut)return
var t=Ti(i)
ki({lineWise:!0,text:t.text}),"cut"==e.type?i.setSelections(t.ranges,null,ho):(n.prevInput="",a.value=t.text.join("\n"),ao(a))}"cut"==e.type&&(i.state.cutIncoming=!0)}}var r=this,n=this,i=this.cm,o=this.wrapper=Ni(),a=this.textarea=o.firstChild
e.wrapper.insertBefore(o,e.wrapper.firstChild),Xi&&(a.style.width="0px"),So(a,"input",function(){Bi&&ji>=9&&r.hasSelection&&(r.hasSelection=null),n.poll()}),So(a,"paste",function(e){ge(i,e)||Si(e,i)||(i.state.pasteIncoming=!0,n.fastPoll())}),So(a,"cut",t),So(a,"copy",t),So(e.scroller,"paste",function(t){lt(e,t)||ge(i,t)||(i.state.pasteIncoming=!0,n.focus())}),So(e.lineSpace,"selectstart",function(t){lt(e,t)||be(t)}),So(a,"compositionstart",function(){var e=i.getCursor("from")
n.composing&&n.composing.range.clear(),n.composing={start:e,range:i.markText(e,i.getCursor("to"),{className:"CodeMirror-composing"})}}),So(a,"compositionend",function(){n.composing&&(n.poll(),n.composing.range.clear(),n.composing=null)})},Sa.prototype.prepareSelection=function(){var e=this.cm,t=e.display,r=e.doc,n=Ut(e)
if(e.options.moveInputWithCursor){var i=At(e,r.sel.primary().head,"div"),o=t.wrapper.getBoundingClientRect(),a=t.lineDiv.getBoundingClientRect()
n.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,i.top+a.top-o.top)),n.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,i.left+a.left-o.left))}return n},Sa.prototype.showSelection=function(e){var t=this.cm.display
r(t.cursorDiv,e.cursors),r(t.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},Sa.prototype.reset=function(e){if(!this.contextMenuPending&&!this.composing){var t=this.cm
if(t.somethingSelected()){this.prevInput=""
var r=t.getSelection()
this.textarea.value=r,t.state.focused&&ao(this.textarea),Bi&&ji>=9&&(this.hasSelection=r)}else e||(this.prevInput=this.textarea.value="",Bi&&ji>=9&&(this.hasSelection=null))}},Sa.prototype.getField=function(){return this.textarea},Sa.prototype.supportsTouch=function(){return!1},Sa.prototype.focus=function(){if("nocursor"!=this.cm.options.readOnly&&(!Zi||a()!=this.textarea))try{this.textarea.focus()}catch(e){}},Sa.prototype.blur=function(){this.textarea.blur()},Sa.prototype.resetPosition=function(){this.wrapper.style.top=this.wrapper.style.left=0},Sa.prototype.receivedFocus=function(){this.slowPoll()},Sa.prototype.slowPoll=function(){var e=this
this.pollingFast||this.polling.set(this.cm.options.pollInterval,function(){e.poll(),e.cm.state.focused&&e.slowPoll()})},Sa.prototype.fastPoll=function(){function e(){r.poll()||t?(r.pollingFast=!1,r.slowPoll()):(t=!0,r.polling.set(60,e))}var t=!1,r=this
r.pollingFast=!0,r.polling.set(20,e)},Sa.prototype.poll=function(){var e=this,t=this.cm,r=this.textarea,n=this.prevInput
if(this.contextMenuPending||!t.state.focused||Mo(r)&&!n&&!this.composing||t.isReadOnly()||t.options.disableInput||t.state.keySeq)return!1
var i=r.value
if(i==n&&!t.somethingSelected())return!1
if(Bi&&ji>=9&&this.hasSelection===i||Qi&&/[\uf700-\uf7ff]/.test(i))return t.display.input.reset(),!1
if(t.doc.sel==t.display.selForContextMenu){var o=i.charCodeAt(0)
if(8203!=o||n||(n="​"),8666==o)return this.reset(),this.cm.execCommand("undo")}for(var a=0,l=Math.min(n.length,i.length);a<l&&n.charCodeAt(a)==i.charCodeAt(a);)++a
return br(t,function(){Ci(t,i.slice(a),n.length-a,null,e.composing?"*compose":null),i.length>1e3||i.indexOf("\n")>-1?r.value=e.prevInput="":e.prevInput=i,e.composing&&(e.composing.range.clear(),e.composing.range=t.markText(e.composing.start,t.getCursor("to"),{className:"CodeMirror-composing"}))}),!0},Sa.prototype.ensurePolled=function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},Sa.prototype.onKeyPress=function(){Bi&&ji>=9&&(this.hasSelection=null),this.fastPoll()},Sa.prototype.onContextMenu=function(e){function t(){if(null!=a.selectionStart){var e=i.somethingSelected(),t="​"+(e?a.value:"")
a.value="⇚",a.value=t,n.prevInput=e?"":"​",a.selectionStart=1,a.selectionEnd=t.length,o.selForContextMenu=i.doc.sel}}function r(){if(n.contextMenuPending=!1,n.wrapper.style.cssText=c,a.style.cssText=u,Bi&&ji<9&&o.scrollbars.setScrollTop(o.scroller.scrollTop=s),null!=a.selectionStart){(!Bi||Bi&&ji<9)&&t()
var e=0,r=function(){o.selForContextMenu==i.doc.sel&&0==a.selectionStart&&a.selectionEnd>0&&"​"==n.prevInput?wr(i,Cn)(i):e++<10?o.detectingSelectAll=setTimeout(r,500):(o.selForContextMenu=null,o.input.reset())}
o.detectingSelectAll=setTimeout(r,200)}}var n=this,i=n.cm,o=i.display,a=n.textarea,l=Vt(i,e),s=o.scroller.scrollTop
if(l&&!Ui){i.options.resetSelectionOnContextMenu&&-1==i.doc.sel.contains(l)&&wr(i,gn)(i.doc,jr(l),ho)
var u=a.style.cssText,c=n.wrapper.style.cssText
n.wrapper.style.cssText="position: absolute"
var d=n.wrapper.getBoundingClientRect()
a.style.cssText="position: absolute; width: 30px; height: 30px;\n      top: "+(e.clientY-d.top-5)+"px; left: "+(e.clientX-d.left-5)+"px;\n      z-index: 1000; background: "+(Bi?"rgba(255, 255, 255, .05)":"transparent")+";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);"
var f
if(Vi&&(f=window.scrollY),o.input.focus(),Vi&&window.scrollTo(null,f),o.input.reset(),i.somethingSelected()||(a.value=n.prevInput=" "),n.contextMenuPending=!0,o.selForContextMenu=i.doc.sel,clearTimeout(o.detectingSelectAll),Bi&&ji>=9&&t(),io){ke(e)
var h=function(){he(window,"mouseup",h),setTimeout(r,20)}
So(window,"mouseup",h)}else setTimeout(r,50)}},Sa.prototype.readOnlyChanged=function(e){e||this.reset(),this.textarea.disabled="nocursor"==e},Sa.prototype.setUneditable=function(){},Sa.prototype.needsContentAttribute=!1,function(e){function t(t,n,i,o){e.defaults[t]=n,i&&(r[t]=o?function(e,t,r){r!=ya&&i(e,t,r)}:i)}var r=e.optionHandlers
e.defineOption=t,e.Init=ya,t("value","",function(e,t){return e.setValue(t)},!0),t("mode",null,function(e,t){e.doc.modeOption=t,qr(e)},!0),t("indentUnit",2,qr,!0),t("indentWithTabs",!1),t("smartIndent",!0),t("tabSize",4,function(e){$r(e),kt(e),Cr(e)},!0),t("lineSeparator",null,function(e,t){if(e.doc.lineSep=t,t){var r=[],n=e.doc.first
e.doc.iter(function(e){for(var i=0;;){var o=e.text.indexOf(t,i)
if(-1==o)break
i=o+t.length,r.push(D(n,o))}n++})
for(var i=r.length-1;i>=0;i--)On(e.doc,t,r[i],D(r[i].line,r[i].ch+t.length))}}),t("specialChars",/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff]/g,function(e,t,r){e.state.specialChars=new RegExp(t.source+(t.test("\t")?"":"|\t"),"g"),r!=ya&&e.refresh()}),t("specialCharPlaceholder",Ue,function(e){return e.refresh()},!0),t("electricChars",!0),t("inputStyle",Zi?"contenteditable":"textarea",function(){throw new Error("inputStyle can not (yet) be changed in a running editor")},!0),t("spellcheck",!1,function(e,t){return e.getInputField().spellcheck=t},!0),t("rtlMoveVisually",!eo),t("wholeLineUpdateBefore",!0),t("theme","default",function(e){mi(e),vi(e)},!0),t("keyMap","default",function(e,t,r){var n=Zn(t),i=r!=ya&&Zn(r)
i&&i.detach&&i.detach(e,n),n.attach&&n.attach(e,i||null)}),t("extraKeys",null),t("configureMouse",null),t("lineWrapping",!1,bi,!0),t("gutters",[],function(e){Er(e.options),vi(e)},!0),t("fixedGutter",!0,function(e,t){e.display.gutters.style.left=t?Rt(e.display)+"px":"0",e.refresh()},!0),t("coverGutterNextToScrollbar",!1,function(e){return pr(e)},!0),t("scrollbarStyle","native",function(e){mr(e),pr(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)},!0),t("lineNumbers",!1,function(e){Er(e.options),vi(e)},!0),t("firstLineNumber",1,vi,!0),t("lineNumberFormatter",function(e){return e},vi,!0),t("showCursorWhenSelecting",!1,Gt,!0),t("resetSelectionOnContextMenu",!0),t("lineWiseCopyCut",!0),t("pasteLinesPerSelection",!0),t("readOnly",!1,function(e,t){"nocursor"==t&&(Qt(e),e.display.input.blur()),e.display.input.readOnlyChanged(t)}),t("disableInput",!1,function(e,t){t||e.display.input.reset()},!0),t("dragDrop",!0,yi),t("allowDropFileTypes",null),t("cursorBlinkRate",530),t("cursorScrollMargin",0),t("cursorHeight",1,Gt,!0),t("singleCursorHeightPerLine",!0,Gt,!0),t("workTime",100),t("workDelay",100),t("flattenSpans",!0,$r,!0),t("addModeClass",!1,$r,!0),t("pollInterval",100),t("undoDepth",200,function(e,t){return e.doc.history.undoDepth=t}),t("historyEventDelay",1250),t("viewportMargin",10,function(e){return e.refresh()},!0),t("maxHighlightLength",1e4,$r,!0),t("moveInputWithCursor",!0,function(e,t){t||e.display.input.resetPosition()}),t("tabindex",null,function(e,t){return e.display.input.getField().tabIndex=t||""}),t("autofocus",null),t("direction","ltr",function(e,t){return e.doc.setDirection(t)},!0)}(wi),function(e){var t=e.optionHandlers,r=e.helpers={}
e.prototype={constructor:e,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,r){var n=this.options,i=n[e]
n[e]==r&&"mode"!=e||(n[e]=r,t.hasOwnProperty(e)&&wr(this,t[e])(this,r,i),pe(this,"optionChange",this,e))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](Zn(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,r=0;r<t.length;++r)if(t[r]==e||t[r].name==e)return t.splice(r,1),!0},addOverlay:xr(function(t,r){var n=t.token?t:e.getMode(this.options,t)
if(n.startState)throw new Error("Overlays may not be stateful.")
!function(e,t,r){for(var n=0,i=r(t);n<e.length&&r(e[n])<=i;)n++
e.splice(n,0,t)}(this.state.overlays,{mode:n,modeSpec:t,opaque:r&&r.opaque,priority:r&&r.priority||0},function(e){return e.priority}),this.state.modeGen++,Cr(this)}),removeOverlay:xr(function(e){for(var t=this,r=this.state.overlays,n=0;n<r.length;++n){var i=r[n].modeSpec
if(i==e||"string"==typeof e&&i.name==e)return r.splice(n,1),t.state.modeGen++,void Cr(t)}}),indentLine:xr(function(e,t,r){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),W(this.doc,e)&&xi(this,e,t,r)}),indentSelection:xr(function(e){for(var t=this,r=this.doc.sel.ranges,n=-1,i=0;i<r.length;i++){var o=r[i]
if(o.empty())o.head.line>n&&(xi(t,o.head.line,e,!0),n=o.head.line,i==t.doc.sel.primIndex&&ar(t))
else{var a=o.from(),l=o.to(),s=Math.max(n,a.line)
n=Math.min(t.lastLine(),l.line-(l.ch?0:1))+1
for(var u=s;u<n;++u)xi(t,u,e)
var c=t.doc.sel.ranges
0==a.ch&&r.length==c.length&&c[i].from().ch>0&&fn(t.doc,i,new Qo(a,c[i].to()),ho)}}}),getTokenAt:function(e,t){return Re(this,e,t)},getLineTokens:function(e,t){return Re(this,D(e),t,!0)},getTokenTypeAt:function(e){e=B(this.doc,e)
var t,r=Pe(this,L(this.doc,e.line)),n=0,i=(r.length-1)/2,o=e.ch
if(0==o)t=r[2]
else for(;;){var a=n+i>>1
if((a?r[2*a-1]:0)>=o)i=a
else{if(!(r[2*a+1]<o)){t=r[2*a+2]
break}n=a+1}}var l=t?t.indexOf("overlay "):-1
return l<0?t:0==l?null:t.slice(0,l-1)},getModeAt:function(t){var r=this.doc.mode
return r.innerMode?e.innerMode(r,this.getTokenAt(t).state).mode:r},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var n=this,i=[]
if(!r.hasOwnProperty(t))return i
var o=r[t],a=this.getModeAt(e)
if("string"==typeof a[t])o[a[t]]&&i.push(o[a[t]])
else if(a[t])for(var l=0;l<a[t].length;l++){var s=o[a[t][l]]
s&&i.push(s)}else a.helperType&&o[a.helperType]?i.push(o[a.helperType]):o[a.name]&&i.push(o[a.name])
for(var u=0;u<o._global.length;u++){var c=o._global[u]
c.pred(a,n)&&-1==f(i,c.val)&&i.push(c.val)}return i},getStateAfter:function(e,t){var r=this.doc
return e=R(r,null==e?r.first+r.size-1:e),He(this,e+1,t).state},cursorCoords:function(e,t){var r,n=this.doc.sel.primary()
return r=null==e?n.head:"object"==typeof e?B(this.doc,e):e?n.from():n.to(),At(this,r,t||"page")},charCoords:function(e,t){return Nt(this,B(this.doc,e),t||"page")},coordsChar:function(e,t){return e=Mt(this,e,t||"page"),zt(this,e.left,e.top)},lineAtHeight:function(e,t){return e=Mt(this,{top:e,left:0},t||"page").top,O(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t,r){var n,i=!1
if("number"==typeof e){var o=this.doc.first+this.doc.size-1
e<this.doc.first?e=this.doc.first:e>o&&(e=o,i=!0),n=L(this.doc,e)}else n=e
return Tt(this,n,{top:0,left:0},t||"page",r||i).top+(i?this.doc.height-le(n):0)},defaultTextHeight:function(){return Et(this.display)},defaultCharWidth:function(){return It(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,r,n,i){var o=this.display,a=(e=At(this,B(this.doc,e))).bottom,l=e.left
if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),o.sizer.appendChild(t),"over"==n)a=e.top
else if("above"==n||"near"==n){var s=Math.max(o.wrapper.clientHeight,this.doc.height),u=Math.max(o.sizer.clientWidth,o.lineSpace.clientWidth);("above"==n||e.bottom+t.offsetHeight>s)&&e.top>t.offsetHeight?a=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=s&&(a=e.bottom),l+t.offsetWidth>u&&(l=u-t.offsetWidth)}t.style.top=a+"px",t.style.left=t.style.right="","right"==i?(l=o.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==i?l=0:"middle"==i&&(l=(o.sizer.clientWidth-t.offsetWidth)/2),t.style.left=l+"px"),r&&function(e,t){var r=ir(e,t)
null!=r.scrollTop&&cr(e,r.scrollTop),null!=r.scrollLeft&&fr(e,r.scrollLeft)}(this,{left:l,top:a,right:l+t.offsetWidth,bottom:a+t.offsetHeight})},triggerOnKeyDown:xr(si),triggerOnKeyPress:xr(ci),triggerOnKeyUp:ui,triggerOnMouseDown:xr(di),execCommand:function(e){if(fa.hasOwnProperty(e))return fa[e].call(null,this)},triggerElectric:xr(function(e){Li(this,e)}),findPosH:function(e,t,r,n){var i=this,o=1
t<0&&(o=-1,t=-t)
for(var a=B(this.doc,e),l=0;l<t&&!(a=Ai(i.doc,a,o,r,n)).hitSide;++l);return a},moveH:xr(function(e,t){var r=this
this.extendSelectionsBy(function(n){return r.display.shift||r.doc.extend||n.empty()?Ai(r.doc,n.head,e,t,r.options.rtlMoveVisually):e<0?n.from():n.to()},go)}),deleteH:xr(function(e,t){var r=this.doc.sel,n=this.doc
r.somethingSelected()?n.replaceSelection("",null,"+delete"):Qn(this,function(r){var i=Ai(n,r.head,e,t,!1)
return e<0?{from:i,to:r.head}:{from:r.head,to:i}})}),findPosV:function(e,t,r,n){var i=this,o=1,a=n
t<0&&(o=-1,t=-t)
for(var l=B(this.doc,e),s=0;s<t;++s){var u=At(i,l,"div")
if(null==a?a=u.left:u.left=a,(l=Oi(i,u,o,r)).hitSide)break}return l},moveV:xr(function(e,t){var r=this,n=this.doc,i=[],o=!this.display.shift&&!n.extend&&n.sel.somethingSelected()
if(n.extendSelectionsBy(function(a){if(o)return e<0?a.from():a.to()
var l=At(r,a.head,"div")
null!=a.goalColumn&&(l.left=a.goalColumn),i.push(l.left)
var s=Oi(r,l,e,t)
return"page"==t&&a==n.sel.primary()&&or(r,Nt(r,s,"div").top-l.top),s},go),i.length)for(var a=0;a<n.sel.ranges.length;a++)n.sel.ranges[a].goalColumn=i[a]}),findWordAt:function(e){var t=L(this.doc,e.line).text,r=e.ch,n=e.ch
if(t){var i=this.getHelper(e,"wordChars")
"before"!=e.sticky&&n!=t.length||!r?++n:--r
for(var o=t.charAt(r),a=w(o,i)?function(e){return w(e,i)}:/\s/.test(o)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!w(e)};r>0&&a(t.charAt(r-1));)--r
for(;n<t.length&&a(t.charAt(n));)++n}return new Qo(D(e.line,r),D(e.line,n))},toggleOverwrite:function(e){null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?l(this.display.cursorDiv,"CodeMirror-overwrite"):oo(this.display.cursorDiv,"CodeMirror-overwrite"),pe(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==a()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:xr(function(e,t){lr(this,e,t)}),getScrollInfo:function(){var e=this.display.scroller
return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-dt(this)-this.display.barHeight,width:e.scrollWidth-dt(this)-this.display.barWidth,clientHeight:ht(this),clientWidth:ft(this)}},scrollIntoView:xr(function(e,t){null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:D(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line?function(e,t){sr(e),e.curOp.scrollToPos=t}(this,e):ur(this,e.from,e.to,e.margin)}),setSize:xr(function(e,t){var r=this,n=function(e){return"number"==typeof e||/^\d+$/.test(String(e))?e+"px":e}
null!=e&&(this.display.wrapper.style.width=n(e)),null!=t&&(this.display.wrapper.style.height=n(t)),this.options.lineWrapping&&xt(this)
var i=this.display.viewFrom
this.doc.iter(i,this.display.viewTo,function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){Sr(r,i,"widget")
break}++i}),this.curOp.forceUpdate=!0,pe(this,"refresh",this)}),operation:function(e){return br(this,e)},startOperation:function(){return vr(this)},endOperation:function(){return yr(this)},refresh:xr(function(){var e=this.display.cachedTextHeight
Cr(this),this.curOp.forceUpdate=!0,kt(this),lr(this,this.doc.scrollLeft,this.doc.scrollTop),Dr(this),(null==e||Math.abs(e-Et(this.display))>.5)&&jt(this),pe(this,"refresh",this)}),swapDoc:xr(function(e){var t=this.doc
return t.cm=null,Zr(this,e),kt(this),this.display.input.reset(),lr(this,e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,Ye(this,"swapDoc",this,t),t}),getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},ye(e),e.registerHelper=function(t,n,i){r.hasOwnProperty(t)||(r[t]=e[t]={_global:[]}),r[t][n]=i},e.registerGlobalHelper=function(t,n,i,o){e.registerHelper(t,n,o),r[t]._global.push({pred:i,val:o})}}(wi)
var La="iter insert remove copy getEditor constructor".split(" ")
for(var Ta in ia.prototype)ia.prototype.hasOwnProperty(Ta)&&f(La,Ta)<0&&(wi.prototype[Ta]=function(e){return function(){return e.apply(this.doc,arguments)}}(ia.prototype[Ta]))
return ye(ia),wi.inputStyles={textarea:Sa,contenteditable:Ca},wi.defineMode=function(e){wi.defaults.mode||"null"==e||(wi.defaults.mode=e),function(e,t){arguments.length>2&&(t.dependencies=Array.prototype.slice.call(arguments,2)),Oo[e]=t}.apply(this,arguments)},wi.defineMIME=function(e,t){Wo[e]=t},wi.defineMode("null",function(){return{token:function(e){return e.skipToEnd()}}}),wi.defineMIME("text/plain","null"),wi.defineExtension=function(e,t){wi.prototype[e]=t},wi.defineDocExtension=function(e,t){ia.prototype[e]=t},wi.fromTextArea=function(e,t){function r(){e.value=s.getValue()}if(t=t?c(t):{},t.value=e.value,!t.tabindex&&e.tabIndex&&(t.tabindex=e.tabIndex),!t.placeholder&&e.placeholder&&(t.placeholder=e.placeholder),null==t.autofocus){var n=a()
t.autofocus=n==e||null!=e.getAttribute("autofocus")&&n==document.body}var i
if(e.form&&(So(e.form,"submit",r),!t.leaveSubmitMethodAlone)){var o=e.form
i=o.submit
try{var l=o.submit=function(){r(),o.submit=i,o.submit(),o.submit=l}}catch(e){}}t.finishInit=function(t){t.save=r,t.getTextArea=function(){return e},t.toTextArea=function(){t.toTextArea=isNaN,r(),e.parentNode.removeChild(t.getWrapperElement()),e.style.display="",e.form&&(he(e.form,"submit",r),"function"==typeof e.form.submit&&(e.form.submit=i))}},e.style.display="none"
var s=wi(function(t){return e.parentNode.insertBefore(t,e.nextSibling)},t)
return s},function(e){e.off=he,e.on=So,e.wheelEventPixels=Fr,e.Doc=ia,e.splitLines=To,e.countColumn=d,e.findColumn=h,e.isWordChar=b,e.Pass=fo,e.signal=pe,e.Line=Io,e.changeEnd=Vr,e.scrollbarModel=qo,e.Pos=D,e.cmpPos=P,e.modes=Oo,e.mimeModes=Wo,e.resolveMode=Me,e.getMode=Ne,e.modeExtensions=zo,e.extendMode=Ae,e.copyState=Oe,e.startState=ze,e.innerMode=We,e.commands=fa,e.keyMap=da,e.keyName=Yn,e.isModifierKey=_n,e.lookupKey=$n,e.normalizeKeyMap=qn,e.StringStream=Do,e.SharedTextMarker=ra,e.TextMarker=ta,e.LineWidget=Jo,e.e_preventDefault=be,e.e_stopPropagation=we,e.e_stop=ke,e.addClass=l,e.contains=o,e.rmClass=oo,e.keyNames=la}(wi),wi.version="5.32.0",wi}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict"
function t(e){for(var t={},r=0;r<e.length;++r)t[e[r].toLowerCase()]=!0
return t}function r(e,t){for(var r,n=!1;null!=(r=e.next());){if(n&&"/"==r){t.tokenize=null
break}n="*"==r}return["comment","comment"]}e.defineMode("css",function(t,r){function n(e,t){return h=t,e}function i(e){return function(t,r){for(var i,o=!1;null!=(i=t.next());){if(i==e&&!o){")"==e&&t.backUp(1)
break}o=!o&&"\\"==i}return(i==e||!o&&")"!=e)&&(r.tokenize=null),n("string","string")}}function o(e,t){return e.next(),e.match(/\s*[\"\')]/,!1)?t.tokenize=null:t.tokenize=i(")"),n(null,"(")}function a(e,t,r){this.type=e,this.indent=t,this.prev=r}function l(e,t,r,n){return e.context=new a(r,t.indentation()+(!1===n?0:g),e.context),r}function s(e){return e.context.prev&&(e.context=e.context.prev),e.context.type}function u(e,t,r){return O[r.context.type](e,t,r)}function c(e,t,r,n){for(var i=n||1;i>0;i--)r.context=r.context.prev
return u(e,t,r)}function d(e){var t=e.current().toLowerCase()
p=T.hasOwnProperty(t)?"atom":L.hasOwnProperty(t)?"keyword":"variable"}var f=r.inline
r.propertyKeywords||(r=e.resolveMode("text/css"))
var h,p,g=t.indentUnit,m=r.tokenHooks,v=r.documentTypes||{},y=r.mediaTypes||{},b=r.mediaFeatures||{},w=r.mediaValueKeywords||{},x=r.propertyKeywords||{},k=r.nonStandardPropertyKeywords||{},C=r.fontProperties||{},S=r.counterDescriptors||{},L=r.colorKeywords||{},T=r.valueKeywords||{},M=r.allowNested,N=r.lineComment,A=!0===r.supportsAtComponent,O={}
return O.top=function(e,t,r){if("{"==e)return l(r,t,"block")
if("}"==e&&r.context.prev)return s(r)
if(A&&/@component/.test(e))return l(r,t,"atComponentBlock")
if(/^@(-moz-)?document$/.test(e))return l(r,t,"documentTypes")
if(/^@(media|supports|(-moz-)?document|import)$/.test(e))return l(r,t,"atBlock")
if(/^@(font-face|counter-style)/.test(e))return r.stateArg=e,"restricted_atBlock_before"
if(/^@(-(moz|ms|o|webkit)-)?keyframes$/.test(e))return"keyframes"
if(e&&"@"==e.charAt(0))return l(r,t,"at")
if("hash"==e)p="builtin"
else if("word"==e)p="tag"
else{if("variable-definition"==e)return"maybeprop"
if("interpolation"==e)return l(r,t,"interpolation")
if(":"==e)return"pseudo"
if(M&&"("==e)return l(r,t,"parens")}return r.context.type},O.block=function(e,t,r){if("word"==e){var n=t.current().toLowerCase()
return x.hasOwnProperty(n)?(p="property","maybeprop"):k.hasOwnProperty(n)?(p="string-2","maybeprop"):M?(p=t.match(/^\s*:(?:\s|$)/,!1)?"property":"tag","block"):(p+=" error","maybeprop")}return"meta"==e?"block":M||"hash"!=e&&"qualifier"!=e?O.top(e,t,r):(p="error","block")},O.maybeprop=function(e,t,r){return":"==e?l(r,t,"prop"):u(e,t,r)},O.prop=function(e,t,r){if(";"==e)return s(r)
if("{"==e&&M)return l(r,t,"propBlock")
if("}"==e||"{"==e)return c(e,t,r)
if("("==e)return l(r,t,"parens")
if("hash"!=e||/^#([0-9a-fA-f]{3,4}|[0-9a-fA-f]{6}|[0-9a-fA-f]{8})$/.test(t.current())){if("word"==e)d(t)
else if("interpolation"==e)return l(r,t,"interpolation")}else p+=" error"
return"prop"},O.propBlock=function(e,t,r){return"}"==e?s(r):"word"==e?(p="property","maybeprop"):r.context.type},O.parens=function(e,t,r){return"{"==e||"}"==e?c(e,t,r):")"==e?s(r):"("==e?l(r,t,"parens"):"interpolation"==e?l(r,t,"interpolation"):("word"==e&&d(t),"parens")},O.pseudo=function(e,t,r){return"meta"==e?"pseudo":"word"==e?(p="variable-3",r.context.type):u(e,t,r)},O.documentTypes=function(e,t,r){return"word"==e&&v.hasOwnProperty(t.current())?(p="tag",r.context.type):O.atBlock(e,t,r)},O.atBlock=function(e,t,r){if("("==e)return l(r,t,"atBlock_parens")
if("}"==e||";"==e)return c(e,t,r)
if("{"==e)return s(r)&&l(r,t,M?"block":"top")
if("interpolation"==e)return l(r,t,"interpolation")
if("word"==e){var n=t.current().toLowerCase()
p="only"==n||"not"==n||"and"==n||"or"==n?"keyword":y.hasOwnProperty(n)?"attribute":b.hasOwnProperty(n)?"property":w.hasOwnProperty(n)?"keyword":x.hasOwnProperty(n)?"property":k.hasOwnProperty(n)?"string-2":T.hasOwnProperty(n)?"atom":L.hasOwnProperty(n)?"keyword":"error"}return r.context.type},O.atComponentBlock=function(e,t,r){return"}"==e?c(e,t,r):"{"==e?s(r)&&l(r,t,M?"block":"top",!1):("word"==e&&(p="error"),r.context.type)},O.atBlock_parens=function(e,t,r){return")"==e?s(r):"{"==e||"}"==e?c(e,t,r,2):O.atBlock(e,t,r)},O.restricted_atBlock_before=function(e,t,r){return"{"==e?l(r,t,"restricted_atBlock"):"word"==e&&"@counter-style"==r.stateArg?(p="variable","restricted_atBlock_before"):u(e,t,r)},O.restricted_atBlock=function(e,t,r){return"}"==e?(r.stateArg=null,s(r)):"word"==e?(p="@font-face"==r.stateArg&&!C.hasOwnProperty(t.current().toLowerCase())||"@counter-style"==r.stateArg&&!S.hasOwnProperty(t.current().toLowerCase())?"error":"property","maybeprop"):"restricted_atBlock"},O.keyframes=function(e,t,r){return"word"==e?(p="variable","keyframes"):"{"==e?l(r,t,"top"):u(e,t,r)},O.at=function(e,t,r){return";"==e?s(r):"{"==e||"}"==e?c(e,t,r):("word"==e?p="tag":"hash"==e&&(p="builtin"),"at")},O.interpolation=function(e,t,r){return"}"==e?s(r):"{"==e||";"==e?c(e,t,r):("word"==e?p="variable":"variable"!=e&&"("!=e&&")"!=e&&(p="error"),"interpolation")},{startState:function(e){return{tokenize:null,state:f?"block":"top",stateArg:null,context:new a(f?"block":"top",e||0,null)}},token:function(e,t){if(!t.tokenize&&e.eatSpace())return null
var r=(t.tokenize||function(e,t){var r=e.next()
if(m[r]){var a=m[r](e,t)
if(!1!==a)return a}return"@"==r?(e.eatWhile(/[\w\\\-]/),n("def",e.current())):"="==r||("~"==r||"|"==r)&&e.eat("=")?n(null,"compare"):'"'==r||"'"==r?(t.tokenize=i(r),t.tokenize(e,t)):"#"==r?(e.eatWhile(/[\w\\\-]/),n("atom","hash")):"!"==r?(e.match(/^\s*\w*/),n("keyword","important")):/\d/.test(r)||"."==r&&e.eat(/\d/)?(e.eatWhile(/[\w.%]/),n("number","unit")):"-"!==r?/[,+>*\/]/.test(r)?n(null,"select-op"):"."==r&&e.match(/^-?[_a-z][_a-z0-9-]*/i)?n("qualifier","qualifier"):/[:;{}\[\]\(\)]/.test(r)?n(null,r):"u"==r&&e.match(/rl(-prefix)?\(/)||"d"==r&&e.match("omain(")||"r"==r&&e.match("egexp(")?(e.backUp(1),t.tokenize=o,n("property","word")):/[\w\\\-]/.test(r)?(e.eatWhile(/[\w\\\-]/),n("property","word")):n(null,null):/[\d.]/.test(e.peek())?(e.eatWhile(/[\w.%]/),n("number","unit")):e.match(/^-[\w\\\-]+/)?(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?n("variable-2","variable-definition"):n("variable-2","variable")):e.match(/^\w+-/)?n("meta","meta"):void 0})(e,t)
return r&&"object"==typeof r&&(h=r[1],r=r[0]),p=r,"comment"!=h&&(t.state=O[t.state](h,e,t)),p},indent:function(e,t){var r=e.context,n=t&&t.charAt(0),i=r.indent
return"prop"!=r.type||"}"!=n&&")"!=n||(r=r.prev),r.prev&&("}"!=n||"block"!=r.type&&"top"!=r.type&&"interpolation"!=r.type&&"restricted_atBlock"!=r.type?(")"!=n||"parens"!=r.type&&"atBlock_parens"!=r.type)&&("{"!=n||"at"!=r.type&&"atBlock"!=r.type)||(i=Math.max(0,r.indent-g)):i=(r=r.prev).indent),i},electricChars:"}",blockCommentStart:"/*",blockCommentEnd:"*/",blockCommentContinue:" * ",lineComment:N,fold:"brace"}})
var n=["domain","regexp","url","url-prefix"],i=t(n),o=["all","aural","braille","handheld","print","projection","screen","tty","tv","embossed"],a=t(o),l=["width","min-width","max-width","height","min-height","max-height","device-width","min-device-width","max-device-width","device-height","min-device-height","max-device-height","aspect-ratio","min-aspect-ratio","max-aspect-ratio","device-aspect-ratio","min-device-aspect-ratio","max-device-aspect-ratio","color","min-color","max-color","color-index","min-color-index","max-color-index","monochrome","min-monochrome","max-monochrome","resolution","min-resolution","max-resolution","scan","grid","orientation","device-pixel-ratio","min-device-pixel-ratio","max-device-pixel-ratio","pointer","any-pointer","hover","any-hover"],s=t(l),u=["landscape","portrait","none","coarse","fine","on-demand","hover","interlace","progressive"],c=t(u),d=["align-content","align-items","align-self","alignment-adjust","alignment-baseline","anchor-point","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","appearance","azimuth","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","baseline-shift","binding","bleed","bookmark-label","bookmark-level","bookmark-state","bookmark-target","border","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","color","color-profile","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","content","counter-increment","counter-reset","crop","cue","cue-after","cue-before","cursor","direction","display","dominant-baseline","drop-initial-after-adjust","drop-initial-after-align","drop-initial-before-adjust","drop-initial-before-align","drop-initial-size","drop-initial-value","elevation","empty-cells","fit","fit-position","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","float-offset","flow-from","flow-into","font","font-feature-settings","font-family","font-kerning","font-language-override","font-size","font-size-adjust","font-stretch","font-style","font-synthesis","font-variant","font-variant-alternates","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-weight","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-gap","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-gap","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","inline-box-align","justify-content","justify-items","justify-self","left","letter-spacing","line-break","line-height","line-stacking","line-stacking-ruby","line-stacking-shift","line-stacking-strategy","list-style","list-style-image","list-style-position","list-style-type","margin","margin-bottom","margin-left","margin-right","margin-top","marks","marquee-direction","marquee-loop","marquee-play-count","marquee-speed","marquee-style","max-height","max-width","min-height","min-width","move-to","nav-down","nav-index","nav-left","nav-right","nav-up","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-style","overflow-wrap","overflow-x","overflow-y","padding","padding-bottom","padding-left","padding-right","padding-top","page","page-break-after","page-break-before","page-break-inside","page-policy","pause","pause-after","pause-before","perspective","perspective-origin","pitch","pitch-range","place-content","place-items","place-self","play-during","position","presentation-level","punctuation-trim","quotes","region-break-after","region-break-before","region-break-inside","region-fragment","rendering-intent","resize","rest","rest-after","rest-before","richness","right","rotation","rotation-point","ruby-align","ruby-overhang","ruby-position","ruby-span","shape-image-threshold","shape-inside","shape-margin","shape-outside","size","speak","speak-as","speak-header","speak-numeral","speak-punctuation","speech-rate","stress","string-set","tab-size","table-layout","target","target-name","target-new","target-position","text-align","text-align-last","text-decoration","text-decoration-color","text-decoration-line","text-decoration-skip","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-height","text-indent","text-justify","text-outline","text-overflow","text-shadow","text-size-adjust","text-space-collapse","text-transform","text-underline-position","text-wrap","top","transform","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","user-select","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","z-index","clip-path","clip-rule","mask","enable-background","filter","flood-color","flood-opacity","lighting-color","stop-color","stop-opacity","pointer-events","color-interpolation","color-interpolation-filters","color-rendering","fill","fill-opacity","fill-rule","image-rendering","marker","marker-end","marker-mid","marker-start","shape-rendering","stroke","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke-width","text-rendering","baseline-shift","dominant-baseline","glyph-orientation-horizontal","glyph-orientation-vertical","text-anchor","writing-mode"],f=t(d),h=["scrollbar-arrow-color","scrollbar-base-color","scrollbar-dark-shadow-color","scrollbar-face-color","scrollbar-highlight-color","scrollbar-shadow-color","scrollbar-3d-light-color","scrollbar-track-color","shape-inside","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","zoom"],p=t(h),g=t(["font-family","src","unicode-range","font-variant","font-feature-settings","font-stretch","font-weight","font-style"]),m=t(["additive-symbols","fallback","negative","pad","prefix","range","speak-as","suffix","symbols","system"]),v=["aliceblue","antiquewhite","aqua","aquamarine","azure","beige","bisque","black","blanchedalmond","blue","blueviolet","brown","burlywood","cadetblue","chartreuse","chocolate","coral","cornflowerblue","cornsilk","crimson","cyan","darkblue","darkcyan","darkgoldenrod","darkgray","darkgreen","darkkhaki","darkmagenta","darkolivegreen","darkorange","darkorchid","darkred","darksalmon","darkseagreen","darkslateblue","darkslategray","darkturquoise","darkviolet","deeppink","deepskyblue","dimgray","dodgerblue","firebrick","floralwhite","forestgreen","fuchsia","gainsboro","ghostwhite","gold","goldenrod","gray","grey","green","greenyellow","honeydew","hotpink","indianred","indigo","ivory","khaki","lavender","lavenderblush","lawngreen","lemonchiffon","lightblue","lightcoral","lightcyan","lightgoldenrodyellow","lightgray","lightgreen","lightpink","lightsalmon","lightseagreen","lightskyblue","lightslategray","lightsteelblue","lightyellow","lime","limegreen","linen","magenta","maroon","mediumaquamarine","mediumblue","mediumorchid","mediumpurple","mediumseagreen","mediumslateblue","mediumspringgreen","mediumturquoise","mediumvioletred","midnightblue","mintcream","mistyrose","moccasin","navajowhite","navy","oldlace","olive","olivedrab","orange","orangered","orchid","palegoldenrod","palegreen","paleturquoise","palevioletred","papayawhip","peachpuff","peru","pink","plum","powderblue","purple","rebeccapurple","red","rosybrown","royalblue","saddlebrown","salmon","sandybrown","seagreen","seashell","sienna","silver","skyblue","slateblue","slategray","snow","springgreen","steelblue","tan","teal","thistle","tomato","turquoise","violet","wheat","white","whitesmoke","yellow","yellowgreen"],y=t(v),b=["above","absolute","activeborder","additive","activecaption","afar","after-white-space","ahead","alias","all","all-scroll","alphabetic","alternate","always","amharic","amharic-abegede","antialiased","appworkspace","arabic-indic","armenian","asterisks","attr","auto","auto-flow","avoid","avoid-column","avoid-page","avoid-region","background","backwards","baseline","below","bidi-override","binary","bengali","blink","block","block-axis","bold","bolder","border","border-box","both","bottom","break","break-all","break-word","bullets","button","button-bevel","buttonface","buttonhighlight","buttonshadow","buttontext","calc","cambodian","capitalize","caps-lock-indicator","caption","captiontext","caret","cell","center","checkbox","circle","cjk-decimal","cjk-earthly-branch","cjk-heavenly-stem","cjk-ideographic","clear","clip","close-quote","col-resize","collapse","color","color-burn","color-dodge","column","column-reverse","compact","condensed","contain","content","contents","content-box","context-menu","continuous","copy","counter","counters","cover","crop","cross","crosshair","currentcolor","cursive","cyclic","darken","dashed","decimal","decimal-leading-zero","default","default-button","dense","destination-atop","destination-in","destination-out","destination-over","devanagari","difference","disc","discard","disclosure-closed","disclosure-open","document","dot-dash","dot-dot-dash","dotted","double","down","e-resize","ease","ease-in","ease-in-out","ease-out","element","ellipse","ellipsis","embed","end","ethiopic","ethiopic-abegede","ethiopic-abegede-am-et","ethiopic-abegede-gez","ethiopic-abegede-ti-er","ethiopic-abegede-ti-et","ethiopic-halehame-aa-er","ethiopic-halehame-aa-et","ethiopic-halehame-am-et","ethiopic-halehame-gez","ethiopic-halehame-om-et","ethiopic-halehame-sid-et","ethiopic-halehame-so-et","ethiopic-halehame-ti-er","ethiopic-halehame-ti-et","ethiopic-halehame-tig","ethiopic-numeric","ew-resize","exclusion","expanded","extends","extra-condensed","extra-expanded","fantasy","fast","fill","fixed","flat","flex","flex-end","flex-start","footnotes","forwards","from","geometricPrecision","georgian","graytext","grid","groove","gujarati","gurmukhi","hand","hangul","hangul-consonant","hard-light","hebrew","help","hidden","hide","higher","highlight","highlighttext","hiragana","hiragana-iroha","horizontal","hsl","hsla","hue","icon","ignore","inactiveborder","inactivecaption","inactivecaptiontext","infinite","infobackground","infotext","inherit","initial","inline","inline-axis","inline-block","inline-flex","inline-grid","inline-table","inset","inside","intrinsic","invert","italic","japanese-formal","japanese-informal","justify","kannada","katakana","katakana-iroha","keep-all","khmer","korean-hangul-formal","korean-hanja-formal","korean-hanja-informal","landscape","lao","large","larger","left","level","lighter","lighten","line-through","linear","linear-gradient","lines","list-item","listbox","listitem","local","logical","loud","lower","lower-alpha","lower-armenian","lower-greek","lower-hexadecimal","lower-latin","lower-norwegian","lower-roman","lowercase","ltr","luminosity","malayalam","match","matrix","matrix3d","media-controls-background","media-current-time-display","media-fullscreen-button","media-mute-button","media-play-button","media-return-to-realtime-button","media-rewind-button","media-seek-back-button","media-seek-forward-button","media-slider","media-sliderthumb","media-time-remaining-display","media-volume-slider","media-volume-slider-container","media-volume-sliderthumb","medium","menu","menulist","menulist-button","menulist-text","menulist-textfield","menutext","message-box","middle","min-intrinsic","mix","mongolian","monospace","move","multiple","multiply","myanmar","n-resize","narrower","ne-resize","nesw-resize","no-close-quote","no-drop","no-open-quote","no-repeat","none","normal","not-allowed","nowrap","ns-resize","numbers","numeric","nw-resize","nwse-resize","oblique","octal","opacity","open-quote","optimizeLegibility","optimizeSpeed","oriya","oromo","outset","outside","outside-shape","overlay","overline","padding","padding-box","painted","page","paused","persian","perspective","plus-darker","plus-lighter","pointer","polygon","portrait","pre","pre-line","pre-wrap","preserve-3d","progress","push-button","radial-gradient","radio","read-only","read-write","read-write-plaintext-only","rectangle","region","relative","repeat","repeating-linear-gradient","repeating-radial-gradient","repeat-x","repeat-y","reset","reverse","rgb","rgba","ridge","right","rotate","rotate3d","rotateX","rotateY","rotateZ","round","row","row-resize","row-reverse","rtl","run-in","running","s-resize","sans-serif","saturation","scale","scale3d","scaleX","scaleY","scaleZ","screen","scroll","scrollbar","scroll-position","se-resize","searchfield","searchfield-cancel-button","searchfield-decoration","searchfield-results-button","searchfield-results-decoration","self-start","self-end","semi-condensed","semi-expanded","separate","serif","show","sidama","simp-chinese-formal","simp-chinese-informal","single","skew","skewX","skewY","skip-white-space","slide","slider-horizontal","slider-vertical","sliderthumb-horizontal","sliderthumb-vertical","slow","small","small-caps","small-caption","smaller","soft-light","solid","somali","source-atop","source-in","source-out","source-over","space","space-around","space-between","space-evenly","spell-out","square","square-button","start","static","status-bar","stretch","stroke","sub","subpixel-antialiased","super","sw-resize","symbolic","symbols","system-ui","table","table-caption","table-cell","table-column","table-column-group","table-footer-group","table-header-group","table-row","table-row-group","tamil","telugu","text","text-bottom","text-top","textarea","textfield","thai","thick","thin","threeddarkshadow","threedface","threedhighlight","threedlightshadow","threedshadow","tibetan","tigre","tigrinya-er","tigrinya-er-abegede","tigrinya-et","tigrinya-et-abegede","to","top","trad-chinese-formal","trad-chinese-informal","transform","translate","translate3d","translateX","translateY","translateZ","transparent","ultra-condensed","ultra-expanded","underline","unset","up","upper-alpha","upper-armenian","upper-greek","upper-hexadecimal","upper-latin","upper-norwegian","upper-roman","uppercase","urdu","url","var","vertical","vertical-text","visible","visibleFill","visiblePainted","visibleStroke","visual","w-resize","wait","wave","wider","window","windowframe","windowtext","words","wrap","wrap-reverse","x-large","x-small","xor","xx-large","xx-small"],w=t(b),x=n.concat(o).concat(l).concat(u).concat(d).concat(h).concat(v).concat(b)
e.registerHelper("hintWords","css",x),e.defineMIME("text/css",{documentTypes:i,mediaTypes:a,mediaFeatures:s,mediaValueKeywords:c,propertyKeywords:f,nonStandardPropertyKeywords:p,fontProperties:g,counterDescriptors:m,colorKeywords:y,valueKeywords:w,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=r,r(e,t))}},name:"css"}),e.defineMIME("text/x-scss",{mediaTypes:a,mediaFeatures:s,mediaValueKeywords:c,propertyKeywords:f,nonStandardPropertyKeywords:p,colorKeywords:y,valueKeywords:w,fontProperties:g,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=r,r(e,t)):["operator","operator"]},":":function(e){return!!e.match(/\s*\{/,!1)&&[null,null]},$:function(e){return e.match(/^[\w-]+/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"]},"#":function(e){return!!e.eat("{")&&[null,"interpolation"]}},name:"css",helperType:"scss"}),e.defineMIME("text/x-less",{mediaTypes:a,mediaFeatures:s,mediaValueKeywords:c,propertyKeywords:f,nonStandardPropertyKeywords:p,colorKeywords:y,valueKeywords:w,fontProperties:g,allowNested:!0,lineComment:"//",tokenHooks:{"/":function(e,t){return e.eat("/")?(e.skipToEnd(),["comment","comment"]):e.eat("*")?(t.tokenize=r,r(e,t)):["operator","operator"]},"@":function(e){return e.eat("{")?[null,"interpolation"]:!e.match(/^(charset|document|font-face|import|(-(moz|ms|o|webkit)-)?keyframes|media|namespace|page|supports)\b/,!1)&&(e.eatWhile(/[\w\\\-]/),e.match(/^\s*:/,!1)?["variable-2","variable-definition"]:["variable-2","variable"])},"&":function(){return["atom","atom"]}},name:"css",helperType:"less"}),e.defineMIME("text/x-gss",{documentTypes:i,mediaTypes:a,mediaFeatures:s,propertyKeywords:f,nonStandardPropertyKeywords:p,fontProperties:g,counterDescriptors:m,colorKeywords:y,valueKeywords:w,supportsAtComponent:!0,tokenHooks:{"/":function(e,t){return!!e.eat("*")&&(t.tokenize=r,r(e,t))}},name:"css",helperType:"gss"})}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror"),require("../xml/xml"),require("../javascript/javascript"),require("../css/css")):"function"==typeof define&&define.amd?define(["../../lib/codemirror","../xml/xml","../javascript/javascript","../css/css"],e):e(CodeMirror)}(function(e){"use strict"
function t(e,t){var r=e.match(function(e){return o[e]||(o[e]=new RegExp("\\s+"+e+"\\s*=\\s*('|\")?([^'\"]+)('|\")?\\s*"))}(t))
return r?/^\s*(.*?)\s*$/.exec(r[2])[1]:""}function r(e,t){return new RegExp((t?"^":"")+"</s*"+e+"s*>","i")}function n(e,t){for(var r in e)for(var n=t[r]||(t[r]=[]),i=e[r],o=i.length-1;o>=0;o--)n.unshift(i[o])}var i={script:[["lang",/(javascript|babel)/i,"javascript"],["type",/^(?:text|application)\/(?:x-)?(?:java|ecma)script$|^module$|^$/i,"javascript"],["type",/./,"text/plain"],[null,null,"javascript"]],style:[["lang",/^css$/i,"css"],["type",/^(text\/)?(x-)?(stylesheet|css)$/i,"css"],["type",/./,"text/plain"],[null,null,"css"]]},o={}
e.defineMode("htmlmixed",function(o,a){function l(n,i){var a,c=s.token(n,i.htmlState),d=/\btag\b/.test(c)
if(d&&!/[<>\s\/]/.test(n.current())&&(a=i.htmlState.tagName&&i.htmlState.tagName.toLowerCase())&&u.hasOwnProperty(a))i.inTag=a+" "
else if(i.inTag&&d&&/>$/.test(n.current())){var f=/^([\S]+) (.*)/.exec(i.inTag)
i.inTag=null
var h=">"==n.current()&&function(e,r){for(var n=0;n<e.length;n++){var i=e[n]
if(!i[0]||i[1].test(t(r,i[0])))return i[2]}}(u[f[1]],f[2]),p=e.getMode(o,h),g=r(f[1],!0),m=r(f[1],!1)
i.token=function(e,t){return e.match(g,!1)?(t.token=l,t.localState=t.localMode=null,null):function(e,t,r){var n=e.current(),i=n.search(t)
return i>-1?e.backUp(n.length-i):n.match(/<\/?$/)&&(e.backUp(n.length),e.match(t,!1)||e.match(n)),r}(e,m,t.localMode.token(e,t.localState))},i.localMode=p,i.localState=e.startState(p,s.indent(i.htmlState,""))}else i.inTag&&(i.inTag+=n.current(),n.eol()&&(i.inTag+=" "))
return c}var s=e.getMode(o,{name:"xml",htmlMode:!0,multilineTagIndentFactor:a.multilineTagIndentFactor,multilineTagIndentPastTag:a.multilineTagIndentPastTag}),u={},c=a&&a.tags,d=a&&a.scriptTypes
if(n(i,u),c&&n(c,u),d)for(var f=d.length-1;f>=0;f--)u.script.unshift(["type",d[f].matches,d[f].mode])
return{startState:function(){return{token:l,inTag:null,localMode:null,localState:null,htmlState:e.startState(s)}},copyState:function(t){var r
return t.localState&&(r=e.copyState(t.localMode,t.localState)),{token:t.token,inTag:t.inTag,localMode:t.localMode,localState:r,htmlState:e.copyState(s,t.htmlState)}},token:function(e,t){return t.token(e,t)},indent:function(t,r,n){return!t.localMode||/^\s*<\//.test(r)?s.indent(t.htmlState,r):t.localMode.indent?t.localMode.indent(t.localState,r,n):e.Pass},innerMode:function(e){return{state:e.localState||e.htmlState,mode:e.localMode||s}}}},"xml","javascript","css"),e.defineMIME("text/html","htmlmixed")}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict"
e.defineMode("javascript",function(t,r){function n(e,t,r){return ke=e,Ce=r,t}function i(e,t){var r=e.next()
if('"'==r||"'"==r)return t.tokenize=function(e){return function(t,r){var o,a=!1
if(Te&&"@"==t.peek()&&t.match(ze))return r.tokenize=i,n("jsonld-keyword","meta")
for(;null!=(o=t.next())&&(o!=e||a);)a=!a&&"\\"==o
return a||(r.tokenize=i),n("string","string")}}(r),t.tokenize(e,t)
if("."==r&&e.match(/^\d+(?:[eE][+\-]?\d+)?/))return n("number","number")
if("."==r&&e.match(".."))return n("spread","meta")
if(/[\[\]{}\(\),;\:\.]/.test(r))return n(r)
if("="==r&&e.eat(">"))return n("=>","operator")
if("0"==r&&e.eat(/x/i))return e.eatWhile(/[\da-f]/i),n("number","number")
if("0"==r&&e.eat(/o/i))return e.eatWhile(/[0-7]/i),n("number","number")
if("0"==r&&e.eat(/b/i))return e.eatWhile(/[01]/i),n("number","number")
if(/\d/.test(r))return e.match(/^\d*(?:\.\d*)?(?:[eE][+\-]?\d+)?/),n("number","number")
if("/"==r)return e.eat("*")?(t.tokenize=o,o(e,t)):e.eat("/")?(e.skipToEnd(),n("comment","comment")):xe(e,t,1)?(function(e){for(var t,r=!1,n=!1;null!=(t=e.next());){if(!r){if("/"==t&&!n)return
"["==t?n=!0:n&&"]"==t&&(n=!1)}r=!r&&"\\"==t}}(e),e.match(/^\b(([gimyu])(?![gimyu]*\2))+\b/),n("regexp","string-2")):(e.eat("="),n("operator","operator",e.current()))
if("`"==r)return t.tokenize=a,a(e,t)
if("#"==r)return e.skipToEnd(),n("error","error")
if(We.test(r))return">"==r&&t.lexical&&">"==t.lexical.type||(e.eat("=")?"!"!=r&&"="!=r||e.eat("="):/[<>*+\-]/.test(r)&&(e.eat(r),">"==r&&e.eat(r))),n("operator","operator",e.current())
if(Ae.test(r)){e.eatWhile(Ae)
var l=e.current()
if("."!=t.lastType){if(Oe.propertyIsEnumerable(l)){var s=Oe[l]
return n(s.type,s.style,l)}if("async"==l&&e.match(/^(\s|\/\*.*?\*\/)*[\(\w]/,!1))return n("async","keyword",l)}return n("variable","variable",l)}}function o(e,t){for(var r,o=!1;r=e.next();){if("/"==r&&o){t.tokenize=i
break}o="*"==r}return n("comment","comment")}function a(e,t){for(var r,o=!1;null!=(r=e.next());){if(!o&&("`"==r||"$"==r&&e.eat("{"))){t.tokenize=i
break}o=!o&&"\\"==r}return n("quasi","string-2",e.current())}function l(e,t){t.fatArrowAt&&(t.fatArrowAt=null)
var r=e.string.indexOf("=>",e.start)
if(!(r<0)){if(Ne){var n=/:\s*(?:\w+(?:<[^>]*>|\[\])?|\{[^}]*\})\s*$/.exec(e.string.slice(e.start,r))
n&&(r=n.index)}for(var i=0,o=!1,a=r-1;a>=0;--a){var l=e.string.charAt(a),s=De.indexOf(l)
if(s>=0&&s<3){if(!i){++a
break}if(0==--i){"("==l&&(o=!0)
break}}else if(s>=3&&s<6)++i
else if(Ae.test(l))o=!0
else{if(/["'\/]/.test(l))return
if(o&&!i){++a
break}}}o&&!i&&(t.fatArrowAt=a)}}function s(e,t,r,n,i,o){this.indented=e,this.column=t,this.type=r,this.prev=i,this.info=o,null!=n&&(this.align=n)}function u(e,t){for(n=e.localVars;n;n=n.next)if(n.name==t)return!0
for(var r=e.context;r;r=r.prev)for(var n=r.vars;n;n=n.next)if(n.name==t)return!0}function c(){for(var e=arguments.length-1;e>=0;e--)He.cc.push(arguments[e])}function d(){return c.apply(null,arguments),!0}function f(e){function t(t){for(var r=t;r;r=r.next)if(r.name==e)return!0
return!1}var n=He.state
if(He.marked="def",n.context){if(t(n.localVars))return
n.localVars={name:e,next:n.localVars}}else{if(t(n.globalVars))return
r.globalVars&&(n.globalVars={name:e,next:n.globalVars})}}function h(){He.state.context={prev:He.state.context,vars:He.state.localVars},He.state.localVars=Ee}function p(){He.state.localVars=He.state.context.vars,He.state.context=He.state.context.prev}function g(e,t){var r=function(){var r=He.state,n=r.indented
if("stat"==r.lexical.type)n=r.lexical.indented
else for(var i=r.lexical;i&&")"==i.type&&i.align;i=i.prev)n=i.indented
r.lexical=new s(n,He.stream.column(),e,null,r.lexical,t)}
return r.lex=!0,r}function m(){var e=He.state
e.lexical.prev&&(")"==e.lexical.type&&(e.indented=e.lexical.indented),e.lexical=e.lexical.prev)}function v(e){function t(r){return r==e?d():";"==e?c():d(t)}return t}function y(e,t){return"var"==e?d(g("vardef",t.length),X,v(";"),m):"keyword a"==e?d(g("form"),x,y,m):"keyword b"==e?d(g("form"),y,m):"keyword d"==e?He.stream.match(/^\s*$/,!1)?d():d(g("stat"),C,v(";"),m):"debugger"==e?d(v(";")):"{"==e?d(g("}"),I,m):";"==e?d():"if"==e?("else"==He.state.lexical.info&&He.state.cc[He.state.cc.length-1]==m&&He.state.cc.pop()(),d(g("form"),x,y,m,ee)):"function"==e?d(ae):"for"==e?d(g("form"),te,y,m):"variable"==e?Ne&&"type"==t?(He.marked="keyword",d(j,v("operator"),j,v(";"))):Ne&&"declare"==t?(He.marked="keyword",d(y)):Ne&&("module"==t||"enum"==t)&&He.stream.match(/^\s*\w/,!1)?(He.marked="keyword",d(g("form"),Y,v("{"),g("}"),I,m,m)):d(g("stat"),O):"switch"==e?d(g("form"),x,v("{"),g("}","switch"),I,m,m):"case"==e?d(b,v(":")):"default"==e?d(v(":")):"catch"==e?d(g("form"),h,v("("),le,v(")"),y,m,p):"class"==e?d(g("form"),ue,m):"export"==e?d(g("stat"),he,m):"import"==e?d(g("stat"),ge,m):"async"==e?d(y):"@"==t?d(b,y):c(g("stat"),b,v(";"),m)}function b(e){return k(e,!1)}function w(e){return k(e,!0)}function x(e){return"("!=e?c():d(g(")"),b,v(")"),m)}function k(e,t){if(He.state.fatArrowAt==He.stream.start){var r=t?A:N
if("("==e)return d(h,g(")"),H(le,")"),m,v("=>"),r,p)
if("variable"==e)return c(h,Y,v("=>"),r,p)}var n=t?L:S
return Pe.hasOwnProperty(e)?d(n):"function"==e?d(ae,n):"class"==e?d(g("form"),se,m):"keyword c"==e||"async"==e?d(t?w:b):"("==e?d(g(")"),C,v(")"),m,n):"operator"==e||"spread"==e?d(t?w:b):"["==e?d(g("]"),we,m,n):"{"==e?E(z,"}",null,n):"quasi"==e?c(T,n):"new"==e?d(function(e){return function(t){return"."==t?d(e?function(e,t){if("target"==t)return He.marked="keyword",d(L)}:function(e,t){if("target"==t)return He.marked="keyword",d(S)}):"variable"==t&&Ne?d(q,e?L:S):c(e?w:b)}}(t)):d()}function C(e){return e.match(/[;\}\)\],]/)?c():c(b)}function S(e,t){return","==e?d(b):L(e,t,!1)}function L(e,t,r){var n=0==r?S:L,i=0==r?b:w
return"=>"==e?d(h,r?A:N,p):"operator"==e?/\+\+|--/.test(t)||Ne&&"!"==t?d(n):Ne&&"<"==t&&He.stream.match(/^([^>]|<.*?>)*>\s*\(/,!1)?d(g(">"),H(j,">"),m,n):"?"==t?d(b,v(":"),i):d(i):"quasi"==e?c(T,n):";"!=e?"("==e?E(w,")","call",n):"."==e?d(W,n):"["==e?d(g("]"),C,v("]"),m,n):Ne&&"as"==t?(He.marked="keyword",d(j,n)):"regexp"==e?(He.state.lastType=He.marked="operator",He.stream.backUp(He.stream.pos-He.stream.start-1),d(i)):void 0:void 0}function T(e,t){return"quasi"!=e?c():"${"!=t.slice(t.length-2)?d(T):d(b,M)}function M(e){if("}"==e)return He.marked="string-2",He.state.tokenize=a,d(T)}function N(e){return l(He.stream,He.state),c("{"==e?y:b)}function A(e){return l(He.stream,He.state),c("{"==e?y:w)}function O(e){return":"==e?d(m,y):c(S,v(";"),m)}function W(e){if("variable"==e)return He.marked="property",d()}function z(e,t){if("async"==e)return He.marked="property",d(z)
if("variable"==e||"keyword"==He.style){if(He.marked="property","get"==t||"set"==t)return d(D)
var r
return Ne&&He.state.fatArrowAt==He.stream.start&&(r=He.stream.match(/^\s*:\s*/,!1))&&(He.state.fatArrowAt=He.stream.pos+r[0].length),d(P)}return"number"==e||"string"==e?(He.marked=Te?"property":He.style+" property",d(P)):"jsonld-keyword"==e?d(P):"modifier"==e?d(z):"["==e?d(b,v("]"),P):"spread"==e?d(w,P):"*"==t?(He.marked="keyword",d(z)):":"==e?c(P):void 0}function D(e){return"variable"!=e?c(P):(He.marked="property",d(ae))}function P(e){return":"==e?d(w):"("==e?c(ae):void 0}function H(e,t,r){function n(i,o){if(r?r.indexOf(i)>-1:","==i){var a=He.state.lexical
return"call"==a.info&&(a.pos=(a.pos||0)+1),d(function(r,n){return r==t||n==t?c():c(e)},n)}return i==t||o==t?d():d(v(t))}return function(r,i){return r==t||i==t?d():c(e,n)}}function E(e,t,r){for(var n=3;n<arguments.length;n++)He.cc.push(arguments[n])
return d(g(t,r),H(e,t),m)}function I(e){return"}"==e?d():c(y,I)}function F(e,t){if(Ne){if(":"==e)return d(j)
if("?"==t)return d(F)}}function R(e){if(Ne&&":"==e)return He.stream.match(/^\s*\w+\s+is\b/,!1)?d(b,B,j):d(j)}function B(e,t){if("is"==t)return He.marked="keyword",d()}function j(e,t){return"variable"==e||"void"==t?"keyof"==t?(He.marked="keyword",d(j)):(He.marked="type",d(U)):"string"==e||"number"==e||"atom"==e?d(U):"["==e?d(g("]"),H(j,"]",","),m,U):"{"==e?d(g("}"),H(K,"}",",;"),m,U):"("==e?d(H(G,")"),V):void 0}function V(e){if("=>"==e)return d(j)}function K(e,t){return"variable"==e||"keyword"==He.style?(He.marked="property",d(K)):"?"==t?d(K):":"==e?d(j):"["==e?d(b,F,v("]"),K):void 0}function G(e){return"variable"==e?d(G):":"==e?d(j):void 0}function U(e,t){return"<"==t?d(g(">"),H(j,">"),m,U):"|"==t||"."==e?d(j):"["==e?d(v("]"),U):"extends"==t?d(j):void 0}function q(e,t){if("<"==t)return d(g(">"),H(j,">"),m,U)}function $(){return c(j,_)}function _(e,t){if("="==t)return d(j)}function X(){return c(Y,F,Q,J)}function Y(e,t){return"modifier"==e?d(Y):"variable"==e?(f(t),d()):"spread"==e?d(Y):"["==e?E(Y,"]"):"{"==e?E(Z,"}"):void 0}function Z(e,t){return"variable"!=e||He.stream.match(/^\s*:/,!1)?("variable"==e&&(He.marked="property"),"spread"==e?d(Y):"}"==e?c():d(v(":"),Y,Q)):(f(t),d(Q))}function Q(e,t){if("="==t)return d(w)}function J(e){if(","==e)return d(X)}function ee(e,t){if("keyword b"==e&&"else"==t)return d(g("form","else"),y,m)}function te(e){if("("==e)return d(g(")"),re,v(")"),m)}function re(e){return"var"==e?d(X,v(";"),ie):";"==e?d(ie):"variable"==e?d(ne):c(b,v(";"),ie)}function ne(e,t){return"in"==t||"of"==t?(He.marked="keyword",d(b)):d(S,ie)}function ie(e,t){return";"==e?d(oe):"in"==t||"of"==t?(He.marked="keyword",d(b)):c(b,v(";"),oe)}function oe(e){")"!=e&&d(b)}function ae(e,t){return"*"==t?(He.marked="keyword",d(ae)):"variable"==e?(f(t),d(ae)):"("==e?d(h,g(")"),H(le,")"),m,R,y,p):Ne&&"<"==t?d(g(">"),H($,">"),m,ae):void 0}function le(e,t){return"@"==t&&d(b,le),"spread"==e||"modifier"==e?d(le):c(Y,F,Q)}function se(e,t){return"variable"==e?ue(e,t):ce(e,t)}function ue(e,t){if("variable"==e)return f(t),d(ce)}function ce(e,t){return"<"==t?d(g(">"),H($,">"),m,ce):"extends"==t||"implements"==t||Ne&&","==e?d(Ne?j:b,ce):"{"==e?d(g("}"),de,m):void 0}function de(e,t){return"modifier"==e||"async"==e||"variable"==e&&("static"==t||"get"==t||"set"==t)&&He.stream.match(/^\s+[\w$\xa1-\uffff]/,!1)?(He.marked="keyword",d(de)):"variable"==e||"keyword"==He.style?(He.marked="property",d(Ne?fe:ae,de)):"["==e?d(b,v("]"),Ne?fe:ae,de):"*"==t?(He.marked="keyword",d(de)):";"==e?d(de):"}"==e?d():"@"==t?d(b,de):void 0}function fe(e,t){return"?"==t?d(fe):":"==e?d(j,Q):"="==t?d(w):c(ae)}function he(e,t){return"*"==t?(He.marked="keyword",d(be,v(";"))):"default"==t?(He.marked="keyword",d(b,v(";"))):"{"==e?d(H(pe,"}"),be,v(";")):c(y)}function pe(e,t){return"as"==t?(He.marked="keyword",d(v("variable"))):"variable"==e?c(w,pe):void 0}function ge(e){return"string"==e?d():c(me,ve,be)}function me(e,t){return"{"==e?E(me,"}"):("variable"==e&&f(t),"*"==t&&(He.marked="keyword"),d(ye))}function ve(e){if(","==e)return d(me,ve)}function ye(e,t){if("as"==t)return He.marked="keyword",d(me)}function be(e,t){if("from"==t)return He.marked="keyword",d(b)}function we(e){return"]"==e?d():c(H(w,"]"))}function xe(e,t,r){return t.tokenize==i&&/^(?:operator|sof|keyword [bcd]|case|new|export|default|spread|[\[{}\(,;:]|=>)$/.test(t.lastType)||"quasi"==t.lastType&&/\{\s*$/.test(e.string.slice(0,e.pos-(r||0)))}var ke,Ce,Se=t.indentUnit,Le=r.statementIndent,Te=r.jsonld,Me=r.json||Te,Ne=r.typescript,Ae=r.wordCharacters||/[\w$\xa1-\uffff]/,Oe=function(){function e(e){return{type:e,style:"keyword"}}var t=e("keyword a"),r=e("keyword b"),n=e("keyword c"),i=e("keyword d"),o=e("operator"),a={type:"atom",style:"atom"},l={if:e("if"),while:t,with:t,else:r,do:r,try:r,finally:r,return:i,break:i,continue:i,new:e("new"),delete:n,void:n,throw:n,debugger:e("debugger"),var:e("var"),const:e("var"),let:e("var"),function:e("function"),catch:e("catch"),for:e("for"),switch:e("switch"),case:e("case"),default:e("default"),in:o,typeof:o,instanceof:o,true:a,false:a,null:a,undefined:a,NaN:a,Infinity:a,this:e("this"),class:e("class"),super:e("atom"),yield:n,export:e("export"),import:e("import"),extends:n,await:n}
if(Ne){var s={type:"variable",style:"type"},u={interface:e("class"),implements:n,namespace:n,public:e("modifier"),private:e("modifier"),protected:e("modifier"),abstract:e("modifier"),readonly:e("modifier"),string:s,number:s,boolean:s,any:s}
for(var c in u)l[c]=u[c]}return l}(),We=/[+\-*&%=<>!?|~^@]/,ze=/^@(context|id|value|language|type|container|list|set|reverse|index|base|vocab|graph)"/,De="([{}])",Pe={atom:!0,number:!0,variable:!0,string:!0,regexp:!0,this:!0,"jsonld-keyword":!0},He={state:null,column:null,marked:null,cc:null},Ee={name:"this",next:{name:"arguments"}}
return m.lex=!0,{startState:function(e){var t={tokenize:i,lastType:"sof",cc:[],lexical:new s((e||0)-Se,0,"block",!1),localVars:r.localVars,context:r.localVars&&{vars:r.localVars},indented:e||0}
return r.globalVars&&"object"==typeof r.globalVars&&(t.globalVars=r.globalVars),t},token:function(e,t){if(e.sol()&&(t.lexical.hasOwnProperty("align")||(t.lexical.align=!1),t.indented=e.indentation(),l(e,t)),t.tokenize!=o&&e.eatSpace())return null
var r=t.tokenize(e,t)
return"comment"==ke?r:(t.lastType="operator"!=ke||"++"!=Ce&&"--"!=Ce?ke:"incdec",function(e,t,r,n,i){var o=e.cc
for(He.state=e,He.stream=i,He.marked=null,He.cc=o,He.style=t,e.lexical.hasOwnProperty("align")||(e.lexical.align=!0);;)if((o.length?o.pop():Me?b:y)(r,n)){for(;o.length&&o[o.length-1].lex;)o.pop()()
return He.marked?He.marked:"variable"==r&&u(e,n)?"variable-2":t}}(t,r,ke,Ce,e))},indent:function(t,n){if(t.tokenize==o)return e.Pass
if(t.tokenize!=i)return 0
var a,l=n&&n.charAt(0),s=t.lexical
if(!/^\s*else\b/.test(n))for(var u=t.cc.length-1;u>=0;--u){var c=t.cc[u]
if(c==m)s=s.prev
else if(c!=ee)break}for(;("stat"==s.type||"form"==s.type)&&("}"==l||(a=t.cc[t.cc.length-1])&&(a==S||a==L)&&!/^[,\.=+\-*:?[\(]/.test(n));)s=s.prev
Le&&")"==s.type&&"stat"==s.prev.type&&(s=s.prev)
var d=s.type,f=l==d
return"vardef"==d?s.indented+("operator"==t.lastType||","==t.lastType?s.info+1:0):"form"==d&&"{"==l?s.indented:"form"==d?s.indented+Se:"stat"==d?s.indented+(function(e,t){return"operator"==e.lastType||","==e.lastType||We.test(t.charAt(0))||/[,.]/.test(t.charAt(0))}(t,n)?Le||Se:0):"switch"!=s.info||f||0==r.doubleIndentSwitch?s.align?s.column+(f?0:1):s.indented+(f?0:Se):s.indented+(/^(?:case|default)\b/.test(n)?Se:2*Se)},electricInput:/^\s*(?:case .*?:|default:|\{|\})$/,blockCommentStart:Me?null:"/*",blockCommentEnd:Me?null:"*/",blockCommentContinue:Me?null:" * ",lineComment:Me?null:"//",fold:"brace",closeBrackets:"()[]{}''\"\"``",helperType:Me?"json":"javascript",jsonldMode:Te,jsonMode:Me,expressionAllowed:xe,skipExpression:function(e){var t=e.cc[e.cc.length-1]
t!=b&&t!=w||e.cc.pop()}}}),e.registerHelper("wordChars","javascript",/[\w$]/),e.defineMIME("text/javascript","javascript"),e.defineMIME("text/ecmascript","javascript"),e.defineMIME("application/javascript","javascript"),e.defineMIME("application/x-javascript","javascript"),e.defineMIME("application/ecmascript","javascript"),e.defineMIME("application/json",{name:"javascript",json:!0}),e.defineMIME("application/x-json",{name:"javascript",json:!0}),e.defineMIME("application/ld+json",{name:"javascript",jsonld:!0}),e.defineMIME("text/typescript",{name:"javascript",typescript:!0}),e.defineMIME("application/typescript",{name:"javascript",typescript:!0})}),function(e){"object"==typeof exports&&"object"==typeof module?e(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],e):e(CodeMirror)}(function(e){"use strict"
var t={autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0},r={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,caseFold:!1}
e.defineMode("xml",function(n,i){function o(e,t){function r(r){return t.tokenize=r,r(e,t)}var n=e.next()
return"<"==n?e.eat("!")?e.eat("[")?e.match("CDATA[")?r(l("atom","]]>")):null:e.match("--")?r(l("comment","--\x3e")):e.match("DOCTYPE",!0,!0)?(e.eatWhile(/[\w\._\-]/),r(s(1))):null:e.eat("?")?(e.eatWhile(/[\w\._\-]/),t.tokenize=l("meta","?>"),"meta"):(k=e.eat("/")?"closeTag":"openTag",t.tokenize=a,"tag bracket"):"&"==n?(e.eat("#")?e.eat("x")?e.eatWhile(/[a-fA-F\d]/)&&e.eat(";"):e.eatWhile(/[\d]/)&&e.eat(";"):e.eatWhile(/[\w\.\-:]/)&&e.eat(";"))?"atom":"error":(e.eatWhile(/[^&<]/),null)}function a(e,t){var r=e.next()
if(">"==r||"/"==r&&e.eat(">"))return t.tokenize=o,k=">"==r?"endTag":"selfcloseTag","tag bracket"
if("="==r)return k="equals",null
if("<"==r){t.tokenize=o,t.state=d,t.tagName=t.tagStart=null
var n=t.tokenize(e,t)
return n?n+" tag error":"tag error"}return/[\'\"]/.test(r)?(t.tokenize=function(e){var t=function(t,r){for(;!t.eol();)if(t.next()==e){r.tokenize=a
break}return"string"}
return t.isInAttribute=!0,t}(r),t.stringStartCol=e.column(),t.tokenize(e,t)):(e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function l(e,t){return function(r,n){for(;!r.eol();){if(r.match(t)){n.tokenize=o
break}r.next()}return e}}function s(e){return function(t,r){for(var n;null!=(n=t.next());){if("<"==n)return r.tokenize=s(e+1),r.tokenize(t,r)
if(">"==n){if(1==e){r.tokenize=o
break}return r.tokenize=s(e-1),r.tokenize(t,r)}}return"meta"}}function u(e){e.context&&(e.context=e.context.prev)}function c(e,t){for(var r;;){if(!e.context)return
if(r=e.context.tagName,!b.contextGrabbers.hasOwnProperty(r)||!b.contextGrabbers[r].hasOwnProperty(t))return
u(e)}}function d(e,t,r){return"openTag"==e?(r.tagStart=t.column(),f):"closeTag"==e?function(e,t,r){if("word"==e){var n=t.current()
return r.context&&r.context.tagName!=n&&b.implicitlyClosed.hasOwnProperty(r.context.tagName)&&u(r),r.context&&r.context.tagName==n||!1===b.matchClosing?(C="tag",h):(C="tag error",p)}return C="error",p}:d}function f(e,t,r){return"word"==e?(r.tagName=t.current(),C="tag",g):(C="error",f)}function h(e,t,r){return"endTag"!=e?(C="error",h):(u(r),d)}function p(e,t,r){return C="error",h(e,0,r)}function g(e,t,r){if("word"==e)return C="attribute",function(e,t,r){return"equals"==e?m:(b.allowMissing||(C="error"),g(e,0,r))}
if("endTag"==e||"selfcloseTag"==e){var n=r.tagName,i=r.tagStart
return r.tagName=r.tagStart=null,"selfcloseTag"==e||b.autoSelfClosers.hasOwnProperty(n)?c(r,n):(c(r,n),r.context=new function(e,t,r){this.prev=e.context,this.tagName=t,this.indent=e.indented,this.startOfLine=r,(b.doNotIndent.hasOwnProperty(t)||e.context&&e.context.noIndent)&&(this.noIndent=!0)}(r,n,i==r.indented)),d}return C="error",g}function m(e,t,r){return"string"==e?v:"word"==e&&b.allowUnquoted?(C="string",g):(C="error",g(e,0,r))}function v(e,t,r){return"string"==e?v:g(e,0,r)}var y=n.indentUnit,b={},w=i.htmlMode?t:r
for(var x in w)b[x]=w[x]
for(var x in i)b[x]=i[x]
var k,C
return o.isInText=!0,{startState:function(e){var t={tokenize:o,state:d,indented:e||0,tagName:null,tagStart:null,context:null}
return null!=e&&(t.baseIndent=e),t},token:function(e,t){if(!t.tagName&&e.sol()&&(t.indented=e.indentation()),e.eatSpace())return null
k=null
var r=t.tokenize(e,t)
return(r||k)&&"comment"!=r&&(C=null,t.state=t.state(k||r,e,t),C&&(r="error"==C?r+" error":C)),r},indent:function(t,r,n){var i=t.context
if(t.tokenize.isInAttribute)return t.tagStart==t.indented?t.stringStartCol+1:t.indented+y
if(i&&i.noIndent)return e.Pass
if(t.tokenize!=a&&t.tokenize!=o)return n?n.match(/^(\s*)/)[0].length:0
if(t.tagName)return!1!==b.multilineTagIndentPastTag?t.tagStart+t.tagName.length+2:t.tagStart+y*(b.multilineTagIndentFactor||1)
if(b.alignCDATA&&/<!\[CDATA\[/.test(r))return 0
var l=r&&/^<(\/)?([\w_:\.-]*)/.exec(r)
if(l&&l[1])for(;i;){if(i.tagName==l[2]){i=i.prev
break}if(!b.implicitlyClosed.hasOwnProperty(i.tagName))break
i=i.prev}else if(l)for(;i;){var s=b.contextGrabbers[i.tagName]
if(!s||!s.hasOwnProperty(l[2]))break
i=i.prev}for(;i&&i.prev&&!i.startOfLine;)i=i.prev
return i?i.indent+y:t.baseIndent||0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"\x3c!--",blockCommentEnd:"--\x3e",configuration:b.htmlMode?"html":"xml",helperType:b.htmlMode?"html":"xml",skipAttribute:function(e){e.state==m&&(e.state=g)}}}),e.defineMIME("text/xml","xml"),e.defineMIME("application/xml","xml"),e.mimeModes.hasOwnProperty("text/html")||e.defineMIME("text/html",{name:"xml",htmlMode:!0})})
