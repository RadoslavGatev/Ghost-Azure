/**
 * simplemde v1.11.2
 * Copyright Next Step Webs, Inc.
 * @link https://github.com/NextStepWebs/simplemde-markdown-editor
 * @license MIT
 */
!function(e){"object"==typeof exports&&"undefined"!=typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):("undefined"!=typeof window?window:"undefined"!=typeof global?global:"undefined"!=typeof self?self:this).SimpleMDE=e()}((function(){return function e(t,n,r){function i(a,l){if(!n[a]){if(!t[a]){var s="function"==typeof require&&require
if(!l&&s)return s(a,!0)
if(o)return o(a,!0)
var u=new Error("Cannot find module '"+a+"'")
throw u.code="MODULE_NOT_FOUND",u}var c=n[a]={exports:{}}
t[a][0].call(c.exports,(function(e){return i(t[a][1][e]||e)}),c,c.exports,e,t,n,r)}return n[a].exports}for(var o="function"==typeof require&&require,a=0;a<r.length;a++)i(r[a])
return i}({1:[function(e,t,n){"use strict"
n.byteLength=function(e){return 3*e.length/4-u(e)},n.toByteArray=function(e){var t,n,r,a,l,s=e.length
a=u(e),l=new o(3*s/4-a),n=a>0?s-4:s
var c=0
for(t=0;t<n;t+=4)r=i[e.charCodeAt(t)]<<18|i[e.charCodeAt(t+1)]<<12|i[e.charCodeAt(t+2)]<<6|i[e.charCodeAt(t+3)],l[c++]=r>>16&255,l[c++]=r>>8&255,l[c++]=255&r
return 2===a?(r=i[e.charCodeAt(t)]<<2|i[e.charCodeAt(t+1)]>>4,l[c++]=255&r):1===a&&(r=i[e.charCodeAt(t)]<<10|i[e.charCodeAt(t+1)]<<4|i[e.charCodeAt(t+2)]>>2,l[c++]=r>>8&255,l[c++]=255&r),l},n.fromByteArray=function(e){for(var t,n=e.length,i=n%3,o="",a=[],l=16383,s=0,u=n-i;s<u;s+=l)a.push(c(e,s,s+l>u?u:s+l))
return 1===i?(t=e[n-1],o+=r[t>>2],o+=r[t<<4&63],o+="=="):2===i&&(t=(e[n-2]<<8)+e[n-1],o+=r[t>>10],o+=r[t>>4&63],o+=r[t<<2&63],o+="="),a.push(o),a.join("")}
for(var r=[],i=[],o="undefined"!=typeof Uint8Array?Uint8Array:Array,a="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",l=0,s=a.length;l<s;++l)r[l]=a[l],i[a.charCodeAt(l)]=l
function u(e){var t=e.length
if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4")
return"="===e[t-2]?2:"="===e[t-1]?1:0}function c(e,t,n){for(var i,o,a=[],l=t;l<n;l+=3)i=(e[l]<<16)+(e[l+1]<<8)+e[l+2],a.push(r[(o=i)>>18&63]+r[o>>12&63]+r[o>>6&63]+r[63&o])
return a.join("")}i["-".charCodeAt(0)]=62,i["_".charCodeAt(0)]=63},{}],2:[function(e,t,n){},{}],3:[function(e,t,n){
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
"use strict"
var r=e("base64-js"),i=e("ieee754")
n.Buffer=l,n.SlowBuffer=function(e){return+e!=e&&(e=0),l.alloc(+e)},n.INSPECT_MAX_BYTES=50
var o=2147483647
function a(e){if(e>o)throw new RangeError("Invalid typed array length")
var t=new Uint8Array(e)
return t.__proto__=l.prototype,t}function l(e,t,n){if("number"==typeof e){if("string"==typeof t)throw new Error("If encoding is specified then the first argument must be a string")
return c(e)}return s(e,t,n)}function s(e,t,n){if("number"==typeof e)throw new TypeError('"value" argument must not be a number')
return j(e)?function(e,t,n){if(t<0||e.byteLength<t)throw new RangeError("'offset' is out of bounds")
if(e.byteLength<t+(n||0))throw new RangeError("'length' is out of bounds")
var r
return(r=void 0===t&&void 0===n?new Uint8Array(e):void 0===n?new Uint8Array(e,t):new Uint8Array(e,t,n)).__proto__=l.prototype,r}(e,t,n):"string"==typeof e?function(e,t){if("string"==typeof t&&""!==t||(t="utf8"),!l.isEncoding(t))throw new TypeError('"encoding" must be a valid string encoding')
var n=0|h(e,t),r=a(n),i=r.write(e,t)
return i!==n&&(r=r.slice(0,i)),r}(e,t):function(e){if(l.isBuffer(e)){var t=0|d(e.length),n=a(t)
return 0===n.length||e.copy(n,0,0,t),n}if(e){if(_(e)||"length"in e)return"number"!=typeof e.length||U(e.length)?a(0):f(e)
if("Buffer"===e.type&&Array.isArray(e.data))return f(e.data)}throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.")}(e)}function u(e){if("number"!=typeof e)throw new TypeError('"size" argument must be a number')
if(e<0)throw new RangeError('"size" argument must not be negative')}function c(e){return u(e),a(e<0?0:0|d(e))}function f(e){for(var t=e.length<0?0:0|d(e.length),n=a(t),r=0;r<t;r+=1)n[r]=255&e[r]
return n}function d(e){if(e>=o)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+o.toString(16)+" bytes")
return 0|e}function h(e,t){if(l.isBuffer(e))return e.length
if(_(e)||j(e))return e.byteLength
"string"!=typeof e&&(e=""+e)
var n=e.length
if(0===n)return 0
for(var r=!1;;)switch(t){case"ascii":case"latin1":case"binary":return n
case"utf8":case"utf-8":case void 0:return P(e).length
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return 2*n
case"hex":return n>>>1
case"base64":return R(e).length
default:if(r)return P(e).length
t=(""+t).toLowerCase(),r=!0}}function p(e,t,n){var r=!1
if((void 0===t||t<0)&&(t=0),t>this.length)return""
if((void 0===n||n>this.length)&&(n=this.length),n<=0)return""
if((n>>>=0)<=(t>>>=0))return""
for(e||(e="utf8");;)switch(e){case"hex":return N(this,t,n)
case"utf8":case"utf-8":return L(this,t,n)
case"ascii":return M(this,t,n)
case"latin1":case"binary":return A(this,t,n)
case"base64":return S(this,t,n)
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return E(this,t,n)
default:if(r)throw new TypeError("Unknown encoding: "+e)
e=(e+"").toLowerCase(),r=!0}}function m(e,t,n){var r=e[t]
e[t]=e[n],e[n]=r}function g(e,t,n,r,i){if(0===e.length)return-1
if("string"==typeof n?(r=n,n=0):n>2147483647?n=2147483647:n<-2147483648&&(n=-2147483648),U(n=+n)&&(n=i?0:e.length-1),n<0&&(n=e.length+n),n>=e.length){if(i)return-1
n=e.length-1}else if(n<0){if(!i)return-1
n=0}if("string"==typeof t&&(t=l.from(t,r)),l.isBuffer(t))return 0===t.length?-1:v(e,t,n,r,i)
if("number"==typeof t)return t&=255,"function"==typeof Uint8Array.prototype.indexOf?i?Uint8Array.prototype.indexOf.call(e,t,n):Uint8Array.prototype.lastIndexOf.call(e,t,n):v(e,[t],n,r,i)
throw new TypeError("val must be string, number or Buffer")}function v(e,t,n,r,i){var o,a=1,l=e.length,s=t.length
if(void 0!==r&&("ucs2"===(r=String(r).toLowerCase())||"ucs-2"===r||"utf16le"===r||"utf-16le"===r)){if(e.length<2||t.length<2)return-1
a=2,l/=2,s/=2,n/=2}function u(e,t){return 1===a?e[t]:e.readUInt16BE(t*a)}if(i){var c=-1
for(o=n;o<l;o++)if(u(e,o)===u(t,-1===c?0:o-c)){if(-1===c&&(c=o),o-c+1===s)return c*a}else-1!==c&&(o-=o-c),c=-1}else for(n+s>l&&(n=l-s),o=n;o>=0;o--){for(var f=!0,d=0;d<s;d++)if(u(e,o+d)!==u(t,d)){f=!1
break}if(f)return o}return-1}function y(e,t,n,r){n=Number(n)||0
var i=e.length-n
r?(r=Number(r))>i&&(r=i):r=i
var o=t.length
if(o%2!=0)throw new TypeError("Invalid hex string")
r>o/2&&(r=o/2)
for(var a=0;a<r;++a){var l=parseInt(t.substr(2*a,2),16)
if(U(l))return a
e[n+a]=l}return a}function x(e,t,n,r){return z(P(t,e.length-n),e,n,r)}function b(e,t,n,r){return z(function(e){for(var t=[],n=0;n<e.length;++n)t.push(255&e.charCodeAt(n))
return t}(t),e,n,r)}function w(e,t,n,r){return b(e,t,n,r)}function C(e,t,n,r){return z(R(t),e,n,r)}function k(e,t,n,r){return z(function(e,t){for(var n,r,i,o=[],a=0;a<e.length&&!((t-=2)<0);++a)r=(n=e.charCodeAt(a))>>8,i=n%256,o.push(i),o.push(r)
return o}(t,e.length-n),e,n,r)}function S(e,t,n){return 0===t&&n===e.length?r.fromByteArray(e):r.fromByteArray(e.slice(t,n))}function L(e,t,n){n=Math.min(e.length,n)
for(var r=[],i=t;i<n;){var o,a,l,s,u=e[i],c=null,f=u>239?4:u>223?3:u>191?2:1
if(i+f<=n)switch(f){case 1:u<128&&(c=u)
break
case 2:128==(192&(o=e[i+1]))&&(s=(31&u)<<6|63&o)>127&&(c=s)
break
case 3:o=e[i+1],a=e[i+2],128==(192&o)&&128==(192&a)&&(s=(15&u)<<12|(63&o)<<6|63&a)>2047&&(s<55296||s>57343)&&(c=s)
break
case 4:o=e[i+1],a=e[i+2],l=e[i+3],128==(192&o)&&128==(192&a)&&128==(192&l)&&(s=(15&u)<<18|(63&o)<<12|(63&a)<<6|63&l)>65535&&s<1114112&&(c=s)}null===c?(c=65533,f=1):c>65535&&(c-=65536,r.push(c>>>10&1023|55296),c=56320|1023&c),r.push(c),i+=f}return function(e){var t=e.length
if(t<=T)return String.fromCharCode.apply(String,e)
for(var n="",r=0;r<t;)n+=String.fromCharCode.apply(String,e.slice(r,r+=T))
return n}(r)}n.kMaxLength=o,l.TYPED_ARRAY_SUPPORT=function(){try{var e=new Uint8Array(1)
return e.__proto__={__proto__:Uint8Array.prototype,foo:function(){return 42}},42===e.foo()}catch(e){return!1}}(),l.TYPED_ARRAY_SUPPORT||"undefined"==typeof console||"function"!=typeof console.error||console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support."),"undefined"!=typeof Symbol&&Symbol.species&&l[Symbol.species]===l&&Object.defineProperty(l,Symbol.species,{value:null,configurable:!0,enumerable:!1,writable:!1}),l.poolSize=8192,l.from=function(e,t,n){return s(e,t,n)},l.prototype.__proto__=Uint8Array.prototype,l.__proto__=Uint8Array,l.alloc=function(e,t,n){return function(e,t,n){return u(e),e<=0?a(e):void 0!==t?"string"==typeof n?a(e).fill(t,n):a(e).fill(t):a(e)}(e,t,n)},l.allocUnsafe=function(e){return c(e)},l.allocUnsafeSlow=function(e){return c(e)},l.isBuffer=function(e){return null!=e&&!0===e._isBuffer},l.compare=function(e,t){if(!l.isBuffer(e)||!l.isBuffer(t))throw new TypeError("Arguments must be Buffers")
if(e===t)return 0
for(var n=e.length,r=t.length,i=0,o=Math.min(n,r);i<o;++i)if(e[i]!==t[i]){n=e[i],r=t[i]
break}return n<r?-1:r<n?1:0},l.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0
default:return!1}},l.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers')
if(0===e.length)return l.alloc(0)
var n
if(void 0===t)for(t=0,n=0;n<e.length;++n)t+=e[n].length
var r=l.allocUnsafe(t),i=0
for(n=0;n<e.length;++n){var o=e[n]
if(!l.isBuffer(o))throw new TypeError('"list" argument must be an Array of Buffers')
o.copy(r,i),i+=o.length}return r},l.byteLength=h,l.prototype._isBuffer=!0,l.prototype.swap16=function(){var e=this.length
if(e%2!=0)throw new RangeError("Buffer size must be a multiple of 16-bits")
for(var t=0;t<e;t+=2)m(this,t,t+1)
return this},l.prototype.swap32=function(){var e=this.length
if(e%4!=0)throw new RangeError("Buffer size must be a multiple of 32-bits")
for(var t=0;t<e;t+=4)m(this,t,t+3),m(this,t+1,t+2)
return this},l.prototype.swap64=function(){var e=this.length
if(e%8!=0)throw new RangeError("Buffer size must be a multiple of 64-bits")
for(var t=0;t<e;t+=8)m(this,t,t+7),m(this,t+1,t+6),m(this,t+2,t+5),m(this,t+3,t+4)
return this},l.prototype.toString=function(){var e=this.length
return 0===e?"":0===arguments.length?L(this,0,e):p.apply(this,arguments)},l.prototype.equals=function(e){if(!l.isBuffer(e))throw new TypeError("Argument must be a Buffer")
return this===e||0===l.compare(this,e)},l.prototype.inspect=function(){var e="",t=n.INSPECT_MAX_BYTES
return this.length>0&&(e=this.toString("hex",0,t).match(/.{2}/g).join(" "),this.length>t&&(e+=" ... ")),"<Buffer "+e+">"},l.prototype.compare=function(e,t,n,r,i){if(!l.isBuffer(e))throw new TypeError("Argument must be a Buffer")
if(void 0===t&&(t=0),void 0===n&&(n=e?e.length:0),void 0===r&&(r=0),void 0===i&&(i=this.length),t<0||n>e.length||r<0||i>this.length)throw new RangeError("out of range index")
if(r>=i&&t>=n)return 0
if(r>=i)return-1
if(t>=n)return 1
if(this===e)return 0
for(var o=(i>>>=0)-(r>>>=0),a=(n>>>=0)-(t>>>=0),s=Math.min(o,a),u=this.slice(r,i),c=e.slice(t,n),f=0;f<s;++f)if(u[f]!==c[f]){o=u[f],a=c[f]
break}return o<a?-1:a<o?1:0},l.prototype.includes=function(e,t,n){return-1!==this.indexOf(e,t,n)},l.prototype.indexOf=function(e,t,n){return g(this,e,t,n,!0)},l.prototype.lastIndexOf=function(e,t,n){return g(this,e,t,n,!1)},l.prototype.write=function(e,t,n,r){if(void 0===t)r="utf8",n=this.length,t=0
else if(void 0===n&&"string"==typeof t)r=t,n=this.length,t=0
else{if(!isFinite(t))throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported")
t>>>=0,isFinite(n)?(n>>>=0,void 0===r&&(r="utf8")):(r=n,n=void 0)}var i=this.length-t
if((void 0===n||n>i)&&(n=i),e.length>0&&(n<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds")
r||(r="utf8")
for(var o=!1;;)switch(r){case"hex":return y(this,e,t,n)
case"utf8":case"utf-8":return x(this,e,t,n)
case"ascii":return b(this,e,t,n)
case"latin1":case"binary":return w(this,e,t,n)
case"base64":return C(this,e,t,n)
case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return k(this,e,t,n)
default:if(o)throw new TypeError("Unknown encoding: "+r)
r=(""+r).toLowerCase(),o=!0}},l.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}}
var T=4096
function M(e,t,n){var r=""
n=Math.min(e.length,n)
for(var i=t;i<n;++i)r+=String.fromCharCode(127&e[i])
return r}function A(e,t,n){var r=""
n=Math.min(e.length,n)
for(var i=t;i<n;++i)r+=String.fromCharCode(e[i])
return r}function N(e,t,n){var r=e.length;(!t||t<0)&&(t=0),(!n||n<0||n>r)&&(n=r)
for(var i="",o=t;o<n;++o)i+=W(e[o])
return i}function E(e,t,n){for(var r=e.slice(t,n),i="",o=0;o<r.length;o+=2)i+=String.fromCharCode(r[o]+256*r[o+1])
return i}function D(e,t,n){if(e%1!=0||e<0)throw new RangeError("offset is not uint")
if(e+t>n)throw new RangeError("Trying to access beyond buffer length")}function F(e,t,n,r,i,o){if(!l.isBuffer(e))throw new TypeError('"buffer" argument must be a Buffer instance')
if(t>i||t<o)throw new RangeError('"value" argument is out of bounds')
if(n+r>e.length)throw new RangeError("Index out of range")}function O(e,t,n,r,i,o){if(n+r>e.length)throw new RangeError("Index out of range")
if(n<0)throw new RangeError("Index out of range")}function I(e,t,n,r,o){return t=+t,n>>>=0,o||O(e,0,n,4),i.write(e,t,n,r,23,4),n+4}function B(e,t,n,r,o){return t=+t,n>>>=0,o||O(e,0,n,8),i.write(e,t,n,r,52,8),n+8}l.prototype.slice=function(e,t){var n=this.length;(e=~~e)<0?(e+=n)<0&&(e=0):e>n&&(e=n),(t=void 0===t?n:~~t)<0?(t+=n)<0&&(t=0):t>n&&(t=n),t<e&&(t=e)
var r=this.subarray(e,t)
return r.__proto__=l.prototype,r},l.prototype.readUIntLE=function(e,t,n){e>>>=0,t>>>=0,n||D(e,t,this.length)
for(var r=this[e],i=1,o=0;++o<t&&(i*=256);)r+=this[e+o]*i
return r},l.prototype.readUIntBE=function(e,t,n){e>>>=0,t>>>=0,n||D(e,t,this.length)
for(var r=this[e+--t],i=1;t>0&&(i*=256);)r+=this[e+--t]*i
return r},l.prototype.readUInt8=function(e,t){return e>>>=0,t||D(e,1,this.length),this[e]},l.prototype.readUInt16LE=function(e,t){return e>>>=0,t||D(e,2,this.length),this[e]|this[e+1]<<8},l.prototype.readUInt16BE=function(e,t){return e>>>=0,t||D(e,2,this.length),this[e]<<8|this[e+1]},l.prototype.readUInt32LE=function(e,t){return e>>>=0,t||D(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+16777216*this[e+3]},l.prototype.readUInt32BE=function(e,t){return e>>>=0,t||D(e,4,this.length),16777216*this[e]+(this[e+1]<<16|this[e+2]<<8|this[e+3])},l.prototype.readIntLE=function(e,t,n){e>>>=0,t>>>=0,n||D(e,t,this.length)
for(var r=this[e],i=1,o=0;++o<t&&(i*=256);)r+=this[e+o]*i
return r>=(i*=128)&&(r-=Math.pow(2,8*t)),r},l.prototype.readIntBE=function(e,t,n){e>>>=0,t>>>=0,n||D(e,t,this.length)
for(var r=t,i=1,o=this[e+--r];r>0&&(i*=256);)o+=this[e+--r]*i
return o>=(i*=128)&&(o-=Math.pow(2,8*t)),o},l.prototype.readInt8=function(e,t){return e>>>=0,t||D(e,1,this.length),128&this[e]?-1*(255-this[e]+1):this[e]},l.prototype.readInt16LE=function(e,t){e>>>=0,t||D(e,2,this.length)
var n=this[e]|this[e+1]<<8
return 32768&n?4294901760|n:n},l.prototype.readInt16BE=function(e,t){e>>>=0,t||D(e,2,this.length)
var n=this[e+1]|this[e]<<8
return 32768&n?4294901760|n:n},l.prototype.readInt32LE=function(e,t){return e>>>=0,t||D(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},l.prototype.readInt32BE=function(e,t){return e>>>=0,t||D(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},l.prototype.readFloatLE=function(e,t){return e>>>=0,t||D(e,4,this.length),i.read(this,e,!0,23,4)},l.prototype.readFloatBE=function(e,t){return e>>>=0,t||D(e,4,this.length),i.read(this,e,!1,23,4)},l.prototype.readDoubleLE=function(e,t){return e>>>=0,t||D(e,8,this.length),i.read(this,e,!0,52,8)},l.prototype.readDoubleBE=function(e,t){return e>>>=0,t||D(e,8,this.length),i.read(this,e,!1,52,8)},l.prototype.writeUIntLE=function(e,t,n,r){e=+e,t>>>=0,n>>>=0,r||F(this,e,t,n,Math.pow(2,8*n)-1,0)
var i=1,o=0
for(this[t]=255&e;++o<n&&(i*=256);)this[t+o]=e/i&255
return t+n},l.prototype.writeUIntBE=function(e,t,n,r){e=+e,t>>>=0,n>>>=0,r||F(this,e,t,n,Math.pow(2,8*n)-1,0)
var i=n-1,o=1
for(this[t+i]=255&e;--i>=0&&(o*=256);)this[t+i]=e/o&255
return t+n},l.prototype.writeUInt8=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,1,255,0),this[t]=255&e,t+1},l.prototype.writeUInt16LE=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,2,65535,0),this[t]=255&e,this[t+1]=e>>>8,t+2},l.prototype.writeUInt16BE=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=255&e,t+2},l.prototype.writeUInt32LE=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=255&e,t+4},l.prototype.writeUInt32BE=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},l.prototype.writeIntLE=function(e,t,n,r){if(e=+e,t>>>=0,!r){var i=Math.pow(2,8*n-1)
F(this,e,t,n,i-1,-i)}var o=0,a=1,l=0
for(this[t]=255&e;++o<n&&(a*=256);)e<0&&0===l&&0!==this[t+o-1]&&(l=1),this[t+o]=(e/a>>0)-l&255
return t+n},l.prototype.writeIntBE=function(e,t,n,r){if(e=+e,t>>>=0,!r){var i=Math.pow(2,8*n-1)
F(this,e,t,n,i-1,-i)}var o=n-1,a=1,l=0
for(this[t+o]=255&e;--o>=0&&(a*=256);)e<0&&0===l&&0!==this[t+o+1]&&(l=1),this[t+o]=(e/a>>0)-l&255
return t+n},l.prototype.writeInt8=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=255&e,t+1},l.prototype.writeInt16LE=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,2,32767,-32768),this[t]=255&e,this[t+1]=e>>>8,t+2},l.prototype.writeInt16BE=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=255&e,t+2},l.prototype.writeInt32LE=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,4,2147483647,-2147483648),this[t]=255&e,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},l.prototype.writeInt32BE=function(e,t,n){return e=+e,t>>>=0,n||F(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=255&e,t+4},l.prototype.writeFloatLE=function(e,t,n){return I(this,e,t,!0,n)},l.prototype.writeFloatBE=function(e,t,n){return I(this,e,t,!1,n)},l.prototype.writeDoubleLE=function(e,t,n){return B(this,e,t,!0,n)},l.prototype.writeDoubleBE=function(e,t,n){return B(this,e,t,!1,n)},l.prototype.copy=function(e,t,n,r){if(n||(n=0),r||0===r||(r=this.length),t>=e.length&&(t=e.length),t||(t=0),r>0&&r<n&&(r=n),r===n)return 0
if(0===e.length||0===this.length)return 0
if(t<0)throw new RangeError("targetStart out of bounds")
if(n<0||n>=this.length)throw new RangeError("sourceStart out of bounds")
if(r<0)throw new RangeError("sourceEnd out of bounds")
r>this.length&&(r=this.length),e.length-t<r-n&&(r=e.length-t+n)
var i,o=r-n
if(this===e&&n<t&&t<r)for(i=o-1;i>=0;--i)e[i+t]=this[i+n]
else if(o<1e3)for(i=0;i<o;++i)e[i+t]=this[i+n]
else Uint8Array.prototype.set.call(e,this.subarray(n,n+o),t)
return o},l.prototype.fill=function(e,t,n,r){if("string"==typeof e){if("string"==typeof t?(r=t,t=0,n=this.length):"string"==typeof n&&(r=n,n=this.length),1===e.length){var i=e.charCodeAt(0)
i<256&&(e=i)}if(void 0!==r&&"string"!=typeof r)throw new TypeError("encoding must be a string")
if("string"==typeof r&&!l.isEncoding(r))throw new TypeError("Unknown encoding: "+r)}else"number"==typeof e&&(e&=255)
if(t<0||this.length<t||this.length<n)throw new RangeError("Out of range index")
if(n<=t)return this
var o
if(t>>>=0,n=void 0===n?this.length:n>>>0,e||(e=0),"number"==typeof e)for(o=t;o<n;++o)this[o]=e
else{var a=l.isBuffer(e)?e:new l(e,r),s=a.length
for(o=0;o<n-t;++o)this[o+t]=a[o%s]}return this}
var H=/[^+/0-9A-Za-z-_]/g
function W(e){return e<16?"0"+e.toString(16):e.toString(16)}function P(e,t){var n
t=t||1/0
for(var r=e.length,i=null,o=[],a=0;a<r;++a){if((n=e.charCodeAt(a))>55295&&n<57344){if(!i){if(n>56319){(t-=3)>-1&&o.push(239,191,189)
continue}if(a+1===r){(t-=3)>-1&&o.push(239,191,189)
continue}i=n
continue}if(n<56320){(t-=3)>-1&&o.push(239,191,189),i=n
continue}n=65536+(i-55296<<10|n-56320)}else i&&(t-=3)>-1&&o.push(239,191,189)
if(i=null,n<128){if((t-=1)<0)break
o.push(n)}else if(n<2048){if((t-=2)<0)break
o.push(n>>6|192,63&n|128)}else if(n<65536){if((t-=3)<0)break
o.push(n>>12|224,n>>6&63|128,63&n|128)}else{if(!(n<1114112))throw new Error("Invalid code point")
if((t-=4)<0)break
o.push(n>>18|240,n>>12&63|128,n>>6&63|128,63&n|128)}}return o}function R(e){return r.toByteArray(function(e){if((e=e.trim().replace(H,"")).length<2)return""
for(;e.length%4!=0;)e+="="
return e}(e))}function z(e,t,n,r){for(var i=0;i<r&&!(i+n>=t.length||i>=e.length);++i)t[i+n]=e[i]
return i}function j(e){return e instanceof ArrayBuffer||null!=e&&null!=e.constructor&&"ArrayBuffer"===e.constructor.name&&"number"==typeof e.byteLength}function _(e){return"function"==typeof ArrayBuffer.isView&&ArrayBuffer.isView(e)}function U(e){return e!=e}},{"base64-js":1,ieee754:15}],4:[function(e,t,n){"use strict"
var r=e("typo-js")
function i(e){"function"==typeof(e=e||{}).codeMirrorInstance&&"function"==typeof e.codeMirrorInstance.defineMode?(String.prototype.includes||(String.prototype.includes=function(){return-1!==String.prototype.indexOf.apply(this,arguments)}),e.codeMirrorInstance.defineMode("spell-checker",(function(t){if(!i.aff_loading){i.aff_loading=!0
var n=new XMLHttpRequest
n.open("GET","https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.aff",!0),n.onload=function(){4===n.readyState&&200===n.status&&(i.aff_data=n.responseText,i.num_loaded++,2==i.num_loaded&&(i.typo=new r("en_US",i.aff_data,i.dic_data,{platform:"any"})))},n.send(null)}if(!i.dic_loading){i.dic_loading=!0
var o=new XMLHttpRequest
o.open("GET","https://cdn.jsdelivr.net/codemirror.spell-checker/latest/en_US.dic",!0),o.onload=function(){4===o.readyState&&200===o.status&&(i.dic_data=o.responseText,i.num_loaded++,2==i.num_loaded&&(i.typo=new r("en_US",i.aff_data,i.dic_data,{platform:"any"})))},o.send(null)}var a='!"#$%&()*+,-./:;<=>?@[\\]^_`{|}~ ',l={token:function(e){var t=e.peek(),n=""
if(a.includes(t))return e.next(),null
for(;null!=(t=e.peek())&&!a.includes(t);)n+=t,e.next()
return i.typo&&!i.typo.check(n)?"spell-error":null}},s=e.codeMirrorInstance.getMode(t,t.backdrop||"text/plain")
return e.codeMirrorInstance.overlayMode(s,l,!0)}))):console.log("CodeMirror Spell Checker: You must provide an instance of CodeMirror via the option `codeMirrorInstance`")}i.num_loaded=0,i.aff_loading=!1,i.dic_loading=!1,i.aff_data="",i.dic_data="",i.typo,t.exports=i},{"typo-js":16}],5:[function(e,t,n){(function(e){"use strict"
e.defineOption("fullScreen",!1,(function(t,n,r){r==e.Init&&(r=!1),!r!=!n&&(n?function(e){var t=e.getWrapperElement()
e.state.fullScreenRestore={scrollTop:window.pageYOffset,scrollLeft:window.pageXOffset,width:t.style.width,height:t.style.height},t.style.width="",t.style.height="auto",t.className+=" CodeMirror-fullscreen",document.documentElement.style.overflow="hidden",e.refresh()}(t):function(e){var t=e.getWrapperElement()
t.className=t.className.replace(/\s*CodeMirror-fullscreen\b/,""),document.documentElement.style.overflow=""
var n=e.state.fullScreenRestore
t.style.width=n.width,t.style.height=n.height,window.scrollTo(n.scrollLeft,n.scrollTop),e.refresh()}(t))}))})("object"==typeof n&&"object"==typeof t?e("../../lib/codemirror"):CodeMirror)},{"../../lib/codemirror":10}],6:[function(e,t,n){(function(e){function t(e){e.state.placeholder&&(e.state.placeholder.parentNode.removeChild(e.state.placeholder),e.state.placeholder=null)}function n(e){t(e)
var n=e.state.placeholder=document.createElement("pre")
n.style.cssText="height: 0; overflow: visible",n.style.direction=e.getOption("direction"),n.className="CodeMirror-placeholder"
var r=e.getOption("placeholder")
"string"==typeof r&&(r=document.createTextNode(r)),n.appendChild(r),e.display.lineSpace.insertBefore(n,e.display.lineSpace.firstChild)}function r(e){o(e)&&n(e)}function i(e){var r=e.getWrapperElement(),i=o(e)
r.className=r.className.replace(" CodeMirror-empty","")+(i?" CodeMirror-empty":""),i?n(e):t(e)}function o(e){return 1===e.lineCount()&&""===e.getLine(0)}e.defineOption("placeholder","",(function(n,o,a){var l=a&&a!=e.Init
if(o&&!l)n.on("blur",r),n.on("change",i),n.on("swapDoc",i),i(n)
else if(!o&&l){n.off("blur",r),n.off("change",i),n.off("swapDoc",i),t(n)
var s=n.getWrapperElement()
s.className=s.className.replace(" CodeMirror-empty","")}o&&!n.hasFocus()&&r(n)}))})("object"==typeof n&&"object"==typeof t?e("../../lib/codemirror"):CodeMirror)},{"../../lib/codemirror":10}],7:[function(e,t,n){(function(e){"use strict"
var t=/^(\s*)(>[> ]*|[*+-] \[[x ]\]\s|[*+-]\s|(\d+)([.)]))(\s*)/,n=/^(\s*)(>[> ]*|[*+-] \[[x ]\]|[*+-]|(\d+)[.)])(\s*)$/,r=/[*+-]\s/
function i(e,n){var r=n.line,i=0,o=0,a=t.exec(e.getLine(r)),l=a[1]
do{var s=r+(i+=1),u=e.getLine(s),c=t.exec(u)
if(c){var f=c[1],d=parseInt(a[3],10)+i-o,h=parseInt(c[3],10),p=h
if(l!==f||isNaN(h)){if(l.length>f.length)return
if(l.length<f.length&&1===i)return
o+=1}else d===h&&(p=h+1),d>h&&(p=d+1),e.replaceRange(u.replace(t,f+p+c[4]+c[5]),{line:s,ch:0},{line:s,ch:u.length})}}while(c)}e.commands.newlineAndIndentContinueMarkdownList=function(o){if(o.getOption("disableInput"))return e.Pass
for(var a=o.listSelections(),l=[],s=0;s<a.length;s++){var u=a[s].head,c=o.getStateAfter(u.line),f=e.innerMode(o.getMode(),c)
if("markdown"!==f.mode.name)return void o.execCommand("newlineAndIndent")
var d=!1!==(c=f.state).list,h=0!==c.quote,p=o.getLine(u.line),m=t.exec(p),g=/^\s*$/.test(p.slice(0,u.ch))
if(!a[s].empty()||!d&&!h||!m||g)return void o.execCommand("newlineAndIndent")
if(n.test(p))/>\s*$/.test(p)||o.replaceRange("",{line:u.line,ch:0},{line:u.line,ch:u.ch+1}),l[s]="\n"
else{var v=m[1],y=m[5],x=!(r.test(m[2])||m[2].indexOf(">")>=0),b=x?parseInt(m[3],10)+1+m[4]:m[2].replace("x"," ")
l[s]="\n"+v+b+y,x&&i(o,u)}}o.replaceSelections(l)}})("object"==typeof n&&"object"==typeof t?e("../../lib/codemirror"):CodeMirror)},{"../../lib/codemirror":10}],8:[function(e,t,n){(function(e){"use strict"
e.overlayMode=function(t,n,r){return{startState:function(){return{base:e.startState(t),overlay:e.startState(n),basePos:0,baseCur:null,overlayPos:0,overlayCur:null,streamSeen:null}},copyState:function(r){return{base:e.copyState(t,r.base),overlay:e.copyState(n,r.overlay),basePos:r.basePos,baseCur:null,overlayPos:r.overlayPos,overlayCur:null}},token:function(e,i){return(e!=i.streamSeen||Math.min(i.basePos,i.overlayPos)<e.start)&&(i.streamSeen=e,i.basePos=i.overlayPos=e.start),e.start==i.basePos&&(i.baseCur=t.token(e,i.base),i.basePos=e.pos),e.start==i.overlayPos&&(e.pos=e.start,i.overlayCur=n.token(e,i.overlay),i.overlayPos=e.pos),e.pos=Math.min(i.basePos,i.overlayPos),null==i.overlayCur?i.baseCur:null!=i.baseCur&&i.overlay.combineTokens||r&&null==i.overlay.combineTokens?i.baseCur+" "+i.overlayCur:i.overlayCur},indent:t.indent&&function(e,n,r){return t.indent(e.base,n,r)},electricChars:t.electricChars,innerMode:function(e){return{state:e.base,mode:t}},blankLine:function(e){var i,o
return t.blankLine&&(i=t.blankLine(e.base)),n.blankLine&&(o=n.blankLine(e.overlay)),null==o?i:r&&null!=i?i+" "+o:o}}}})("object"==typeof n&&"object"==typeof t?e("../../lib/codemirror"):CodeMirror)},{"../../lib/codemirror":10}],9:[function(e,t,n){(function(e){"use strict"
function t(e){e.state.markedSelection&&e.operation((function(){!function(e){if(!e.somethingSelected())return l(e)
if(e.listSelections().length>1)return s(e)
var t=e.getCursor("start"),n=e.getCursor("end"),i=e.state.markedSelection
if(!i.length)return a(e,t,n)
var u=i[0].find(),c=i[i.length-1].find()
if(!u||!c||n.line-t.line<=r||o(t,c.to)>=0||o(n,u.from)<=0)return s(e)
for(;o(t,u.from)>0;)i.shift().clear(),u=i[0].find()
for(o(t,u.from)<0&&(u.to.line-t.line<r?(i.shift().clear(),a(e,t,u.to,0)):a(e,t,u.from,0));o(n,c.to)<0;)i.pop().clear(),c=i[i.length-1].find()
o(n,c.to)>0&&(n.line-c.from.line<r?(i.pop().clear(),a(e,c.from,n)):a(e,c.to,n))}(e)}))}function n(e){e.state.markedSelection&&e.state.markedSelection.length&&e.operation((function(){l(e)}))}e.defineOption("styleSelectedText",!1,(function(r,i,o){var a=o&&o!=e.Init
i&&!a?(r.state.markedSelection=[],r.state.markedSelectionStyle="string"==typeof i?i:"CodeMirror-selectedtext",s(r),r.on("cursorActivity",t),r.on("change",n)):!i&&a&&(r.off("cursorActivity",t),r.off("change",n),l(r),r.state.markedSelection=r.state.markedSelectionStyle=null)}))
var r=8,i=e.Pos,o=e.cmpPos
function a(e,t,n,a){if(0!=o(t,n))for(var l=e.state.markedSelection,s=e.state.markedSelectionStyle,u=t.line;;){var c=u==t.line?t:i(u,0),f=u+r,d=f>=n.line,h=d?n:i(f,0),p=e.markText(c,h,{className:s})
if(null==a?l.push(p):l.splice(a++,0,p),d)break
u=f}}function l(e){for(var t=e.state.markedSelection,n=0;n<t.length;++n)t[n].clear()
t.length=0}function s(e){l(e)
for(var t=e.listSelections(),n=0;n<t.length;n++)a(e,t[n].from(),t[n].to())}})("object"==typeof n&&"object"==typeof t?e("../../lib/codemirror"):CodeMirror)},{"../../lib/codemirror":10}],10:[function(e,t,n){!function(e,r){"object"==typeof n&&void 0!==t?t.exports=r():e.CodeMirror=r()}(this,(function(){"use strict"
var e=navigator.userAgent,t=navigator.platform,n=/gecko\/\d/i.test(e),r=/MSIE \d/.test(e),i=/Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(e),o=/Edge\/(\d+)/.exec(e),a=r||i||o,l=a&&(r?document.documentMode||6:+(o||i)[1]),s=!o&&/WebKit\//.test(e),u=s&&/Qt\/\d+\.\d+/.test(e),c=!o&&/Chrome\//.test(e),f=/Opera\//.test(e),d=/Apple Computer/.test(navigator.vendor),h=/Mac OS X 1\d\D([8-9]|\d\d)\D/.test(e),p=/PhantomJS/.test(e),m=!o&&/AppleWebKit/.test(e)&&/Mobile\/\w+/.test(e),g=/Android/.test(e),v=m||g||/webOS|BlackBerry|Opera Mini|Opera Mobi|IEMobile/i.test(e),y=m||/Mac/.test(t),x=/\bCrOS\b/.test(e),b=/win/i.test(t),w=f&&e.match(/Version\/(\d*\.\d*)/)
w&&(w=Number(w[1])),w&&w>=15&&(f=!1,s=!0)
var C=y&&(u||f&&(null==w||w<12.11)),k=n||a&&l>=9
function S(e){return new RegExp("(^|\\s)"+e+"(?:$|\\s)\\s*")}var L,T=function(e,t){var n=e.className,r=S(t).exec(n)
if(r){var i=n.slice(r.index+r[0].length)
e.className=n.slice(0,r.index)+(i?r[1]+i:"")}}
function M(e){for(var t=e.childNodes.length;t>0;--t)e.removeChild(e.firstChild)
return e}function A(e,t){return M(e).appendChild(t)}function N(e,t,n,r){var i=document.createElement(e)
if(n&&(i.className=n),r&&(i.style.cssText=r),"string"==typeof t)i.appendChild(document.createTextNode(t))
else if(t)for(var o=0;o<t.length;++o)i.appendChild(t[o])
return i}function E(e,t,n,r){var i=N(e,t,n,r)
return i.setAttribute("role","presentation"),i}function D(e,t){if(3==t.nodeType&&(t=t.parentNode),e.contains)return e.contains(t)
do{if(11==t.nodeType&&(t=t.host),t==e)return!0}while(t=t.parentNode)}function F(){var e
try{e=document.activeElement}catch(t){e=document.body||null}for(;e&&e.shadowRoot&&e.shadowRoot.activeElement;)e=e.shadowRoot.activeElement
return e}function O(e,t){var n=e.className
S(t).test(n)||(e.className+=(n?" ":"")+t)}function I(e,t){for(var n=e.split(" "),r=0;r<n.length;r++)n[r]&&!S(n[r]).test(t)&&(t+=" "+n[r])
return t}L=document.createRange?function(e,t,n,r){var i=document.createRange()
return i.setEnd(r||e,n),i.setStart(e,t),i}:function(e,t,n){var r=document.body.createTextRange()
try{r.moveToElementText(e.parentNode)}catch(e){return r}return r.collapse(!0),r.moveEnd("character",n),r.moveStart("character",t),r}
var B=function(e){e.select()}
function H(e){var t=Array.prototype.slice.call(arguments,1)
return function(){return e.apply(null,t)}}function W(e,t,n){for(var r in t||(t={}),e)!e.hasOwnProperty(r)||!1===n&&t.hasOwnProperty(r)||(t[r]=e[r])
return t}function P(e,t,n,r,i){null==t&&-1==(t=e.search(/[^\s\u00a0]/))&&(t=e.length)
for(var o=r||0,a=i||0;;){var l=e.indexOf("\t",o)
if(l<0||l>=t)return a+(t-o)
a+=l-o,a+=n-a%n,o=l+1}}m?B=function(e){e.selectionStart=0,e.selectionEnd=e.value.length}:a&&(B=function(e){try{e.select()}catch(e){}})
var R=function(){this.id=null}
function z(e,t){for(var n=0;n<e.length;++n)if(e[n]==t)return n
return-1}R.prototype.set=function(e,t){clearTimeout(this.id),this.id=setTimeout(t,e)}
var j=30,_={toString:function(){return"CodeMirror.Pass"}},U={scroll:!1},q={origin:"*mouse"},G={origin:"+move"}
function V(e,t,n){for(var r=0,i=0;;){var o=e.indexOf("\t",r);-1==o&&(o=e.length)
var a=o-r
if(o==e.length||i+a>=t)return r+Math.min(a,t-i)
if(i+=o-r,r=o+1,(i+=n-i%n)>=t)return r}}var $=[""]
function X(e){for(;$.length<=e;)$.push(K($)+" ")
return $[e]}function K(e){return e[e.length-1]}function Y(e,t){for(var n=[],r=0;r<e.length;r++)n[r]=t(e[r],r)
return n}function Z(){}function Q(e,t){var n
return Object.create?n=Object.create(e):(Z.prototype=e,n=new Z),t&&W(t,n),n}var J=/[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/
function ee(e){return/\w/.test(e)||e>""&&(e.toUpperCase()!=e.toLowerCase()||J.test(e))}function te(e,t){return t?!!(t.source.indexOf("\\w")>-1&&ee(e))||t.test(e):ee(e)}function ne(e){for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1
return!0}var re=/[\u0300-\u036f\u0483-\u0489\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u065e\u0670\u06d6-\u06dc\u06de-\u06e4\u06e7\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0900-\u0902\u093c\u0941-\u0948\u094d\u0951-\u0955\u0962\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2\u09e3\u0a01\u0a02\u0a3c\u0a41\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a70\u0a71\u0a75\u0a81\u0a82\u0abc\u0ac1-\u0ac5\u0ac7\u0ac8\u0acd\u0ae2\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb\u0ebc\u0ec8-\u0ecd\u0f18\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86\u0f87\u0f90-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039\u103a\u103d\u103e\u1058\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085\u1086\u108d\u109d\u135f\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927\u1928\u1932\u1939-\u193b\u1a17\u1a18\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80\u1b81\u1ba2-\u1ba5\u1ba8\u1ba9\u1c2c-\u1c33\u1c36\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1dc0-\u1de6\u1dfd-\u1dff\u200c\u200d\u20d0-\u20f0\u2cef-\u2cf1\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua66f-\ua672\ua67c\ua67d\ua6f0\ua6f1\ua802\ua806\ua80b\ua825\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\uaa29-\uaa2e\uaa31\uaa32\uaa35\uaa36\uaa43\uaa4c\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uabe5\uabe8\uabed\udc00-\udfff\ufb1e\ufe00-\ufe0f\ufe20-\ufe26\uff9e\uff9f]/
function ie(e){return e.charCodeAt(0)>=768&&re.test(e)}function oe(e,t,n){for(;(n<0?t>0:t<e.length)&&ie(e.charAt(t));)t+=n
return t}function ae(e,t,n){for(var r=t>n?-1:1;;){if(t==n)return t
var i=(t+n)/2,o=r<0?Math.ceil(i):Math.floor(i)
if(o==t)return e(o)?t:n
e(o)?n=o:t=o+r}}var le=null
function se(e,t,n){var r
le=null
for(var i=0;i<e.length;++i){var o=e[i]
if(o.from<t&&o.to>t)return i
o.to==t&&(o.from!=o.to&&"before"==n?r=i:le=i),o.from==t&&(o.from!=o.to&&"before"!=n?r=i:le=i)}return null!=r?r:le}var ue=function(){var e=/[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac]/,t=/[stwN]/,n=/[LRr]/,r=/[Lb1n]/,i=/[1n]/
function o(e,t,n){this.level=e,this.from=t,this.to=n}return function(a,l){var s="ltr"==l?"L":"R"
if(0==a.length||"ltr"==l&&!e.test(a))return!1
for(var u,c=a.length,f=[],d=0;d<c;++d)f.push((u=a.charCodeAt(d))<=247?"bbbbbbbbbtstwsbbbbbbbbbbbbbbssstwNN%%%NNNNNN,N,N1111111111NNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNNNLLLLLLLLLLLLLLLLLLLLLLLLLLNNNNbbbbbbsbbbbbbbbbbbbbbbbbbbbbbbbbb,N%%%%NNNNLNNNNN%%11NLNNN1LNNNNNLLLLLLLLLLLLLLLLLLLLLLLNLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLLN".charAt(u):1424<=u&&u<=1524?"R":1536<=u&&u<=1785?"nnnnnnNNr%%r,rNNmmmmmmmmmmmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmmmmmmmmmmmmmmmnnnnnnnnnn%nnrrrmrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrmmmmmmmnNmmmmmmrrmmNmmmmrr1111111111".charAt(u-1536):1774<=u&&u<=2220?"r":8192<=u&&u<=8203?"w":8204==u?"b":"L")
for(var h=0,p=s;h<c;++h){var m=f[h]
"m"==m?f[h]=p:p=m}for(var g=0,v=s;g<c;++g){var y=f[g]
"1"==y&&"r"==v?f[g]="n":n.test(y)&&(v=y,"r"==y&&(f[g]="R"))}for(var x=1,b=f[0];x<c-1;++x){var w=f[x]
"+"==w&&"1"==b&&"1"==f[x+1]?f[x]="1":","!=w||b!=f[x+1]||"1"!=b&&"n"!=b||(f[x]=b),b=w}for(var C=0;C<c;++C){var k=f[C]
if(","==k)f[C]="N"
else if("%"==k){var S=void 0
for(S=C+1;S<c&&"%"==f[S];++S);for(var L=C&&"!"==f[C-1]||S<c&&"1"==f[S]?"1":"N",T=C;T<S;++T)f[T]=L
C=S-1}}for(var M=0,A=s;M<c;++M){var N=f[M]
"L"==A&&"1"==N?f[M]="L":n.test(N)&&(A=N)}for(var E=0;E<c;++E)if(t.test(f[E])){var D=void 0
for(D=E+1;D<c&&t.test(f[D]);++D);for(var F="L"==(E?f[E-1]:s),O=F==("L"==(D<c?f[D]:s))?F?"L":"R":s,I=E;I<D;++I)f[I]=O
E=D-1}for(var B,H=[],W=0;W<c;)if(r.test(f[W])){var P=W
for(++W;W<c&&r.test(f[W]);++W);H.push(new o(0,P,W))}else{var R=W,z=H.length
for(++W;W<c&&"L"!=f[W];++W);for(var j=R;j<W;)if(i.test(f[j])){R<j&&H.splice(z,0,new o(1,R,j))
var _=j
for(++j;j<W&&i.test(f[j]);++j);H.splice(z,0,new o(2,_,j)),R=j}else++j
R<W&&H.splice(z,0,new o(1,R,W))}return"ltr"==l&&(1==H[0].level&&(B=a.match(/^\s+/))&&(H[0].from=B[0].length,H.unshift(new o(0,0,B[0].length))),1==K(H).level&&(B=a.match(/\s+$/))&&(K(H).to-=B[0].length,H.push(new o(0,c-B[0].length,c)))),"rtl"==l?H.reverse():H}}()
function ce(e,t){var n=e.order
return null==n&&(n=e.order=ue(e.text,t)),n}var fe=[],de=function(e,t,n){if(e.addEventListener)e.addEventListener(t,n,!1)
else if(e.attachEvent)e.attachEvent("on"+t,n)
else{var r=e._handlers||(e._handlers={})
r[t]=(r[t]||fe).concat(n)}}
function he(e,t){return e._handlers&&e._handlers[t]||fe}function pe(e,t,n){if(e.removeEventListener)e.removeEventListener(t,n,!1)
else if(e.detachEvent)e.detachEvent("on"+t,n)
else{var r=e._handlers,i=r&&r[t]
if(i){var o=z(i,n)
o>-1&&(r[t]=i.slice(0,o).concat(i.slice(o+1)))}}}function me(e,t){var n=he(e,t)
if(n.length)for(var r=Array.prototype.slice.call(arguments,2),i=0;i<n.length;++i)n[i].apply(null,r)}function ge(e,t,n){return"string"==typeof t&&(t={type:t,preventDefault:function(){this.defaultPrevented=!0}}),me(e,n||t.type,e,t),Ce(t)||t.codemirrorIgnore}function ve(e){var t=e._handlers&&e._handlers.cursorActivity
if(t)for(var n=e.curOp.cursorActivityHandlers||(e.curOp.cursorActivityHandlers=[]),r=0;r<t.length;++r)-1==z(n,t[r])&&n.push(t[r])}function ye(e,t){return he(e,t).length>0}function xe(e){e.prototype.on=function(e,t){de(this,e,t)},e.prototype.off=function(e,t){pe(this,e,t)}}function be(e){e.preventDefault?e.preventDefault():e.returnValue=!1}function we(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0}function Ce(e){return null!=e.defaultPrevented?e.defaultPrevented:0==e.returnValue}function ke(e){be(e),we(e)}function Se(e){return e.target||e.srcElement}function Le(e){var t=e.which
return null==t&&(1&e.button?t=1:2&e.button?t=3:4&e.button&&(t=2)),y&&e.ctrlKey&&1==t&&(t=3),t}var Te,Me,Ae=function(){if(a&&l<9)return!1
var e=N("div")
return"draggable"in e||"dragDrop"in e}()
function Ne(e){if(null==Te){var t=N("span","​")
A(e,N("span",[t,document.createTextNode("x")])),0!=e.firstChild.offsetHeight&&(Te=t.offsetWidth<=1&&t.offsetHeight>2&&!(a&&l<8))}var n=Te?N("span","​"):N("span"," ",null,"display: inline-block; width: 1px; margin-right: -1px")
return n.setAttribute("cm-text",""),n}function Ee(e){if(null!=Me)return Me
var t=A(e,document.createTextNode("AخA")),n=L(t,0,1).getBoundingClientRect(),r=L(t,1,2).getBoundingClientRect()
return M(e),!(!n||n.left==n.right)&&(Me=r.right-n.right<3)}var De,Fe=3!="\n\nb".split(/\n/).length?function(e){for(var t=0,n=[],r=e.length;t<=r;){var i=e.indexOf("\n",t);-1==i&&(i=e.length)
var o=e.slice(t,"\r"==e.charAt(i-1)?i-1:i),a=o.indexOf("\r");-1!=a?(n.push(o.slice(0,a)),t+=a+1):(n.push(o),t=i+1)}return n}:function(e){return e.split(/\r\n?|\n/)},Oe=window.getSelection?function(e){try{return e.selectionStart!=e.selectionEnd}catch(e){return!1}}:function(e){var t
try{t=e.ownerDocument.selection.createRange()}catch(e){}return!(!t||t.parentElement()!=e)&&0!=t.compareEndPoints("StartToEnd",t)},Ie="oncopy"in(De=N("div"))||(De.setAttribute("oncopy","return;"),"function"==typeof De.oncopy),Be=null,He={},We={}
function Pe(e,t){arguments.length>2&&(t.dependencies=Array.prototype.slice.call(arguments,2)),He[e]=t}function Re(e){if("string"==typeof e&&We.hasOwnProperty(e))e=We[e]
else if(e&&"string"==typeof e.name&&We.hasOwnProperty(e.name)){var t=We[e.name]
"string"==typeof t&&(t={name:t}),(e=Q(t,e)).name=t.name}else{if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+xml$/.test(e))return Re("application/xml")
if("string"==typeof e&&/^[\w\-]+\/[\w\-]+\+json$/.test(e))return Re("application/json")}return"string"==typeof e?{name:e}:e||{name:"null"}}function ze(e,t){t=Re(t)
var n=He[t.name]
if(!n)return ze(e,"text/plain")
var r=n(e,t)
if(je.hasOwnProperty(t.name)){var i=je[t.name]
for(var o in i)i.hasOwnProperty(o)&&(r.hasOwnProperty(o)&&(r["_"+o]=r[o]),r[o]=i[o])}if(r.name=t.name,t.helperType&&(r.helperType=t.helperType),t.modeProps)for(var a in t.modeProps)r[a]=t.modeProps[a]
return r}var je={}
function _e(e,t){W(t,je.hasOwnProperty(e)?je[e]:je[e]={})}function Ue(e,t){if(!0===t)return t
if(e.copyState)return e.copyState(t)
var n={}
for(var r in t){var i=t[r]
i instanceof Array&&(i=i.concat([])),n[r]=i}return n}function qe(e,t){for(var n;e.innerMode&&(n=e.innerMode(t))&&n.mode!=e;)t=n.state,e=n.mode
return n||{mode:e,state:t}}function Ge(e,t,n){return!e.startState||e.startState(t,n)}var Ve=function(e,t,n){this.pos=this.start=0,this.string=e,this.tabSize=t||8,this.lastColumnPos=this.lastColumnValue=0,this.lineStart=0,this.lineOracle=n}
function $e(e,t){if((t-=e.first)<0||t>=e.size)throw new Error("There is no line "+(t+e.first)+" in the document.")
for(var n=e;!n.lines;)for(var r=0;;++r){var i=n.children[r],o=i.chunkSize()
if(t<o){n=i
break}t-=o}return n.lines[t]}function Xe(e,t,n){var r=[],i=t.line
return e.iter(t.line,n.line+1,(function(e){var o=e.text
i==n.line&&(o=o.slice(0,n.ch)),i==t.line&&(o=o.slice(t.ch)),r.push(o),++i})),r}function Ke(e,t,n){var r=[]
return e.iter(t,n,(function(e){r.push(e.text)})),r}function Ye(e,t){var n=t-e.height
if(n)for(var r=e;r;r=r.parent)r.height+=n}function Ze(e){if(null==e.parent)return null
for(var t=e.parent,n=z(t.lines,e),r=t.parent;r;t=r,r=r.parent)for(var i=0;r.children[i]!=t;++i)n+=r.children[i].chunkSize()
return n+t.first}function Qe(e,t){var n=e.first
e:do{for(var r=0;r<e.children.length;++r){var i=e.children[r],o=i.height
if(t<o){e=i
continue e}t-=o,n+=i.chunkSize()}return n}while(!e.lines)
for(var a=0;a<e.lines.length;++a){var l=e.lines[a].height
if(t<l)break
t-=l}return n+a}function Je(e,t){return t>=e.first&&t<e.first+e.size}function et(e,t){return String(e.lineNumberFormatter(t+e.firstLineNumber))}function tt(e,t,n){if(void 0===n&&(n=null),!(this instanceof tt))return new tt(e,t,n)
this.line=e,this.ch=t,this.sticky=n}function nt(e,t){return e.line-t.line||e.ch-t.ch}function rt(e,t){return e.sticky==t.sticky&&0==nt(e,t)}function it(e){return tt(e.line,e.ch)}function ot(e,t){return nt(e,t)<0?t:e}function at(e,t){return nt(e,t)<0?e:t}function lt(e,t){return Math.max(e.first,Math.min(t,e.first+e.size-1))}function st(e,t){if(t.line<e.first)return tt(e.first,0)
var n=e.first+e.size-1
return t.line>n?tt(n,$e(e,n).text.length):function(e,t){var n=e.ch
return null==n||n>t?tt(e.line,t):n<0?tt(e.line,0):e}(t,$e(e,t.line).text.length)}function ut(e,t){for(var n=[],r=0;r<t.length;r++)n[r]=st(e,t[r])
return n}Ve.prototype.eol=function(){return this.pos>=this.string.length},Ve.prototype.sol=function(){return this.pos==this.lineStart},Ve.prototype.peek=function(){return this.string.charAt(this.pos)||void 0},Ve.prototype.next=function(){if(this.pos<this.string.length)return this.string.charAt(this.pos++)},Ve.prototype.eat=function(e){var t=this.string.charAt(this.pos)
if("string"==typeof e?t==e:t&&(e.test?e.test(t):e(t)))return++this.pos,t},Ve.prototype.eatWhile=function(e){for(var t=this.pos;this.eat(e););return this.pos>t},Ve.prototype.eatSpace=function(){for(var e=this.pos;/[\s\u00a0]/.test(this.string.charAt(this.pos));)++this.pos
return this.pos>e},Ve.prototype.skipToEnd=function(){this.pos=this.string.length},Ve.prototype.skipTo=function(e){var t=this.string.indexOf(e,this.pos)
if(t>-1)return this.pos=t,!0},Ve.prototype.backUp=function(e){this.pos-=e},Ve.prototype.column=function(){return this.lastColumnPos<this.start&&(this.lastColumnValue=P(this.string,this.start,this.tabSize,this.lastColumnPos,this.lastColumnValue),this.lastColumnPos=this.start),this.lastColumnValue-(this.lineStart?P(this.string,this.lineStart,this.tabSize):0)},Ve.prototype.indentation=function(){return P(this.string,null,this.tabSize)-(this.lineStart?P(this.string,this.lineStart,this.tabSize):0)},Ve.prototype.match=function(e,t,n){if("string"!=typeof e){var r=this.string.slice(this.pos).match(e)
return r&&r.index>0?null:(r&&!1!==t&&(this.pos+=r[0].length),r)}var i=function(e){return n?e.toLowerCase():e}
if(i(this.string.substr(this.pos,e.length))==i(e))return!1!==t&&(this.pos+=e.length),!0},Ve.prototype.current=function(){return this.string.slice(this.start,this.pos)},Ve.prototype.hideFirstChars=function(e,t){this.lineStart+=e
try{return t()}finally{this.lineStart-=e}},Ve.prototype.lookAhead=function(e){var t=this.lineOracle
return t&&t.lookAhead(e)},Ve.prototype.baseToken=function(){var e=this.lineOracle
return e&&e.baseToken(this.pos)}
var ct=function(e,t){this.state=e,this.lookAhead=t},ft=function(e,t,n,r){this.state=t,this.doc=e,this.line=n,this.maxLookAhead=r||0,this.baseTokens=null,this.baseTokenPos=1}
function dt(e,t,n,r){var i=[e.state.modeGen],o={}
wt(e,t.text,e.doc.mode,n,(function(e,t){return i.push(e,t)}),o,r)
for(var a=n.state,l=function(r){n.baseTokens=i
var l=e.state.overlays[r],s=1,u=0
n.state=!0,wt(e,t.text,l.mode,n,(function(e,t){for(var n=s;u<e;){var r=i[s]
r>e&&i.splice(s,1,e,i[s+1],r),s+=2,u=Math.min(e,r)}if(t)if(l.opaque)i.splice(n,s-n,e,"overlay "+t),s=n+2
else for(;n<s;n+=2){var o=i[n+1]
i[n+1]=(o?o+" ":"")+"overlay "+t}}),o),n.state=a,n.baseTokens=null,n.baseTokenPos=1},s=0;s<e.state.overlays.length;++s)l(s)
return{styles:i,classes:o.bgClass||o.textClass?o:null}}function ht(e,t,n){if(!t.styles||t.styles[0]!=e.state.modeGen){var r=pt(e,Ze(t)),i=t.text.length>e.options.maxHighlightLength&&Ue(e.doc.mode,r.state),o=dt(e,t,r)
i&&(r.state=i),t.stateAfter=r.save(!i),t.styles=o.styles,o.classes?t.styleClasses=o.classes:t.styleClasses&&(t.styleClasses=null),n===e.doc.highlightFrontier&&(e.doc.modeFrontier=Math.max(e.doc.modeFrontier,++e.doc.highlightFrontier))}return t.styles}function pt(e,t,n){var r=e.doc,i=e.display
if(!r.mode.startState)return new ft(r,!0,t)
var o=function(e,t,n){for(var r,i,o=e.doc,a=n?-1:t-(e.doc.mode.innerMode?1e3:100),l=t;l>a;--l){if(l<=o.first)return o.first
var s=$e(o,l-1),u=s.stateAfter
if(u&&(!n||l+(u instanceof ct?u.lookAhead:0)<=o.modeFrontier))return l
var c=P(s.text,null,e.options.tabSize);(null==i||r>c)&&(i=l-1,r=c)}return i}(e,t,n),a=o>r.first&&$e(r,o-1).stateAfter,l=a?ft.fromSaved(r,a,o):new ft(r,Ge(r.mode),o)
return r.iter(o,t,(function(n){mt(e,n.text,l)
var r=l.line
n.stateAfter=r==t-1||r%5==0||r>=i.viewFrom&&r<i.viewTo?l.save():null,l.nextLine()})),n&&(r.modeFrontier=l.line),l}function mt(e,t,n,r){var i=e.doc.mode,o=new Ve(t,e.options.tabSize,n)
for(o.start=o.pos=r||0,""==t&&gt(i,n.state);!o.eol();)vt(i,o,n.state),o.start=o.pos}function gt(e,t){if(e.blankLine)return e.blankLine(t)
if(e.innerMode){var n=qe(e,t)
return n.mode.blankLine?n.mode.blankLine(n.state):void 0}}function vt(e,t,n,r){for(var i=0;i<10;i++){r&&(r[0]=qe(e,n).mode)
var o=e.token(t,n)
if(t.pos>t.start)return o}throw new Error("Mode "+e.name+" failed to advance stream.")}ft.prototype.lookAhead=function(e){var t=this.doc.getLine(this.line+e)
return null!=t&&e>this.maxLookAhead&&(this.maxLookAhead=e),t},ft.prototype.baseToken=function(e){if(!this.baseTokens)return null
for(;this.baseTokens[this.baseTokenPos]<=e;)this.baseTokenPos+=2
var t=this.baseTokens[this.baseTokenPos+1]
return{type:t&&t.replace(/( |^)overlay .*/,""),size:this.baseTokens[this.baseTokenPos]-e}},ft.prototype.nextLine=function(){this.line++,this.maxLookAhead>0&&this.maxLookAhead--},ft.fromSaved=function(e,t,n){return t instanceof ct?new ft(e,Ue(e.mode,t.state),n,t.lookAhead):new ft(e,Ue(e.mode,t),n)},ft.prototype.save=function(e){var t=!1!==e?Ue(this.doc.mode,this.state):this.state
return this.maxLookAhead>0?new ct(t,this.maxLookAhead):t}
var yt=function(e,t,n){this.start=e.start,this.end=e.pos,this.string=e.current(),this.type=t||null,this.state=n}
function xt(e,t,n,r){var i,o,a=e.doc,l=a.mode,s=$e(a,(t=st(a,t)).line),u=pt(e,t.line,n),c=new Ve(s.text,e.options.tabSize,u)
for(r&&(o=[]);(r||c.pos<t.ch)&&!c.eol();)c.start=c.pos,i=vt(l,c,u.state),r&&o.push(new yt(c,i,Ue(a.mode,u.state)))
return r?o:new yt(c,i,u.state)}function bt(e,t){if(e)for(;;){var n=e.match(/(?:^|\s+)line-(background-)?(\S+)/)
if(!n)break
e=e.slice(0,n.index)+e.slice(n.index+n[0].length)
var r=n[1]?"bgClass":"textClass"
null==t[r]?t[r]=n[2]:new RegExp("(?:^|s)"+n[2]+"(?:$|s)").test(t[r])||(t[r]+=" "+n[2])}return e}function wt(e,t,n,r,i,o,a){var l=n.flattenSpans
null==l&&(l=e.options.flattenSpans)
var s,u=0,c=null,f=new Ve(t,e.options.tabSize,r),d=e.options.addModeClass&&[null]
for(""==t&&bt(gt(n,r.state),o);!f.eol();){if(f.pos>e.options.maxHighlightLength?(l=!1,a&&mt(e,t,r,f.pos),f.pos=t.length,s=null):s=bt(vt(n,f,r.state,d),o),d){var h=d[0].name
h&&(s="m-"+(s?h+" "+s:h))}if(!l||c!=s){for(;u<f.start;)i(u=Math.min(f.start,u+5e3),c)
c=s}f.start=f.pos}for(;u<f.pos;){var p=Math.min(f.pos,u+5e3)
i(p,c),u=p}}var Ct=!1,kt=!1
function St(e,t,n){this.marker=e,this.from=t,this.to=n}function Lt(e,t){if(e)for(var n=0;n<e.length;++n){var r=e[n]
if(r.marker==t)return r}}function Tt(e,t){for(var n,r=0;r<e.length;++r)e[r]!=t&&(n||(n=[])).push(e[r])
return n}function Mt(e,t){if(t.full)return null
var n=Je(e,t.from.line)&&$e(e,t.from.line).markedSpans,r=Je(e,t.to.line)&&$e(e,t.to.line).markedSpans
if(!n&&!r)return null
var i=t.from.ch,o=t.to.ch,a=0==nt(t.from,t.to),l=function(e,t,n){var r
if(e)for(var i=0;i<e.length;++i){var o=e[i],a=o.marker
if(null==o.from||(a.inclusiveLeft?o.from<=t:o.from<t)||o.from==t&&"bookmark"==a.type&&(!n||!o.marker.insertLeft)){var l=null==o.to||(a.inclusiveRight?o.to>=t:o.to>t);(r||(r=[])).push(new St(a,o.from,l?null:o.to))}}return r}(n,i,a),s=function(e,t,n){var r
if(e)for(var i=0;i<e.length;++i){var o=e[i],a=o.marker
if(null==o.to||(a.inclusiveRight?o.to>=t:o.to>t)||o.from==t&&"bookmark"==a.type&&(!n||o.marker.insertLeft)){var l=null==o.from||(a.inclusiveLeft?o.from<=t:o.from<t);(r||(r=[])).push(new St(a,l?null:o.from-t,null==o.to?null:o.to-t))}}return r}(r,o,a),u=1==t.text.length,c=K(t.text).length+(u?i:0)
if(l)for(var f=0;f<l.length;++f){var d=l[f]
if(null==d.to){var h=Lt(s,d.marker)
h?u&&(d.to=null==h.to?null:h.to+c):d.to=i}}if(s)for(var p=0;p<s.length;++p){var m=s[p]
null!=m.to&&(m.to+=c),null==m.from?Lt(l,m.marker)||(m.from=c,u&&(l||(l=[])).push(m)):(m.from+=c,u&&(l||(l=[])).push(m))}l&&(l=At(l)),s&&s!=l&&(s=At(s))
var g=[l]
if(!u){var v,y=t.text.length-2
if(y>0&&l)for(var x=0;x<l.length;++x)null==l[x].to&&(v||(v=[])).push(new St(l[x].marker,null,null))
for(var b=0;b<y;++b)g.push(v)
g.push(s)}return g}function At(e){for(var t=0;t<e.length;++t){var n=e[t]
null!=n.from&&n.from==n.to&&!1!==n.marker.clearWhenEmpty&&e.splice(t--,1)}return e.length?e:null}function Nt(e){var t=e.markedSpans
if(t){for(var n=0;n<t.length;++n)t[n].marker.detachLine(e)
e.markedSpans=null}}function Et(e,t){if(t){for(var n=0;n<t.length;++n)t[n].marker.attachLine(e)
e.markedSpans=t}}function Dt(e){return e.inclusiveLeft?-1:0}function Ft(e){return e.inclusiveRight?1:0}function Ot(e,t){var n=e.lines.length-t.lines.length
if(0!=n)return n
var r=e.find(),i=t.find(),o=nt(r.from,i.from)||Dt(e)-Dt(t)
return o?-o:nt(r.to,i.to)||Ft(e)-Ft(t)||t.id-e.id}function It(e,t){var n,r=kt&&e.markedSpans
if(r)for(var i=void 0,o=0;o<r.length;++o)(i=r[o]).marker.collapsed&&null==(t?i.from:i.to)&&(!n||Ot(n,i.marker)<0)&&(n=i.marker)
return n}function Bt(e){return It(e,!0)}function Ht(e){return It(e,!1)}function Wt(e,t){var n,r=kt&&e.markedSpans
if(r)for(var i=0;i<r.length;++i){var o=r[i]
o.marker.collapsed&&(null==o.from||o.from<t)&&(null==o.to||o.to>t)&&(!n||Ot(n,o.marker)<0)&&(n=o.marker)}return n}function Pt(e,t,n,r,i){var o=$e(e,t),a=kt&&o.markedSpans
if(a)for(var l=0;l<a.length;++l){var s=a[l]
if(s.marker.collapsed){var u=s.marker.find(0),c=nt(u.from,n)||Dt(s.marker)-Dt(i),f=nt(u.to,r)||Ft(s.marker)-Ft(i)
if(!(c>=0&&f<=0||c<=0&&f>=0)&&(c<=0&&(s.marker.inclusiveRight&&i.inclusiveLeft?nt(u.to,n)>=0:nt(u.to,n)>0)||c>=0&&(s.marker.inclusiveRight&&i.inclusiveLeft?nt(u.from,r)<=0:nt(u.from,r)<0)))return!0}}}function Rt(e){for(var t;t=Bt(e);)e=t.find(-1,!0).line
return e}function zt(e,t){var n=$e(e,t),r=Rt(n)
return n==r?t:Ze(r)}function jt(e,t){if(t>e.lastLine())return t
var n,r=$e(e,t)
if(!_t(e,r))return t
for(;n=Ht(r);)r=n.find(1,!0).line
return Ze(r)+1}function _t(e,t){var n=kt&&t.markedSpans
if(n)for(var r=void 0,i=0;i<n.length;++i)if((r=n[i]).marker.collapsed){if(null==r.from)return!0
if(!r.marker.widgetNode&&0==r.from&&r.marker.inclusiveLeft&&Ut(e,t,r))return!0}}function Ut(e,t,n){if(null==n.to){var r=n.marker.find(1,!0)
return Ut(e,r.line,Lt(r.line.markedSpans,n.marker))}if(n.marker.inclusiveRight&&n.to==t.text.length)return!0
for(var i=void 0,o=0;o<t.markedSpans.length;++o)if((i=t.markedSpans[o]).marker.collapsed&&!i.marker.widgetNode&&i.from==n.to&&(null==i.to||i.to!=n.from)&&(i.marker.inclusiveLeft||n.marker.inclusiveRight)&&Ut(e,t,i))return!0}function qt(e){for(var t=0,n=(e=Rt(e)).parent,r=0;r<n.lines.length;++r){var i=n.lines[r]
if(i==e)break
t+=i.height}for(var o=n.parent;o;o=(n=o).parent)for(var a=0;a<o.children.length;++a){var l=o.children[a]
if(l==n)break
t+=l.height}return t}function Gt(e){if(0==e.height)return 0
for(var t,n=e.text.length,r=e;t=Bt(r);){var i=t.find(0,!0)
r=i.from.line,n+=i.from.ch-i.to.ch}for(r=e;t=Ht(r);){var o=t.find(0,!0)
n-=r.text.length-o.from.ch,n+=(r=o.to.line).text.length-o.to.ch}return n}function Vt(e){var t=e.display,n=e.doc
t.maxLine=$e(n,n.first),t.maxLineLength=Gt(t.maxLine),t.maxLineChanged=!0,n.iter((function(e){var n=Gt(e)
n>t.maxLineLength&&(t.maxLineLength=n,t.maxLine=e)}))}var $t=function(e,t,n){this.text=e,Et(this,t),this.height=n?n(this):1}
function Xt(e){e.parent=null,Nt(e)}$t.prototype.lineNo=function(){return Ze(this)},xe($t)
var Kt={},Yt={}
function Zt(e,t){if(!e||/^\s*$/.test(e))return null
var n=t.addModeClass?Yt:Kt
return n[e]||(n[e]=e.replace(/\S+/g,"cm-$&"))}function Qt(e,t){var n=E("span",null,null,s?"padding-right: .1px":null),r={pre:E("pre",[n],"CodeMirror-line"),content:n,col:0,pos:0,cm:e,trailingSpace:!1,splitSpaces:e.getOption("lineWrapping")}
t.measure={}
for(var i=0;i<=(t.rest?t.rest.length:0);i++){var o=i?t.rest[i-1]:t.line,a=void 0
r.pos=0,r.addToken=en,Ee(e.display.measure)&&(a=ce(o,e.doc.direction))&&(r.addToken=tn(r.addToken,a)),r.map=[],rn(o,r,ht(e,o,t!=e.display.externalMeasured&&Ze(o))),o.styleClasses&&(o.styleClasses.bgClass&&(r.bgClass=I(o.styleClasses.bgClass,r.bgClass||"")),o.styleClasses.textClass&&(r.textClass=I(o.styleClasses.textClass,r.textClass||""))),0==r.map.length&&r.map.push(0,0,r.content.appendChild(Ne(e.display.measure))),0==i?(t.measure.map=r.map,t.measure.cache={}):((t.measure.maps||(t.measure.maps=[])).push(r.map),(t.measure.caches||(t.measure.caches=[])).push({}))}if(s){var l=r.content.lastChild;(/\bcm-tab\b/.test(l.className)||l.querySelector&&l.querySelector(".cm-tab"))&&(r.content.className="cm-tab-wrap-hack")}return me(e,"renderLine",e,t.line,r.pre),r.pre.className&&(r.textClass=I(r.pre.className,r.textClass||"")),r}function Jt(e){var t=N("span","•","cm-invalidchar")
return t.title="\\u"+e.charCodeAt(0).toString(16),t.setAttribute("aria-label",t.title),t}function en(e,t,n,r,i,o,s){if(t){var u,c=e.splitSpaces?function(e,t){if(e.length>1&&!/  /.test(e))return e
for(var n=t,r="",i=0;i<e.length;i++){var o=e.charAt(i)
" "!=o||!n||i!=e.length-1&&32!=e.charCodeAt(i+1)||(o=" "),r+=o,n=" "==o}return r}(t,e.trailingSpace):t,f=e.cm.state.specialChars,d=!1
if(f.test(t)){u=document.createDocumentFragment()
for(var h=0;;){f.lastIndex=h
var p=f.exec(t),m=p?p.index-h:t.length-h
if(m){var g=document.createTextNode(c.slice(h,h+m))
a&&l<9?u.appendChild(N("span",[g])):u.appendChild(g),e.map.push(e.pos,e.pos+m,g),e.col+=m,e.pos+=m}if(!p)break
h+=m+1
var v=void 0
if("\t"==p[0]){var y=e.cm.options.tabSize,x=y-e.col%y;(v=u.appendChild(N("span",X(x),"cm-tab"))).setAttribute("role","presentation"),v.setAttribute("cm-text","\t"),e.col+=x}else"\r"==p[0]||"\n"==p[0]?((v=u.appendChild(N("span","\r"==p[0]?"␍":"␤","cm-invalidchar"))).setAttribute("cm-text",p[0]),e.col+=1):((v=e.cm.options.specialCharPlaceholder(p[0])).setAttribute("cm-text",p[0]),a&&l<9?u.appendChild(N("span",[v])):u.appendChild(v),e.col+=1)
e.map.push(e.pos,e.pos+1,v),e.pos++}}else e.col+=t.length,u=document.createTextNode(c),e.map.push(e.pos,e.pos+t.length,u),a&&l<9&&(d=!0),e.pos+=t.length
if(e.trailingSpace=32==c.charCodeAt(t.length-1),n||r||i||d||o){var b=n||""
r&&(b+=r),i&&(b+=i)
var w=N("span",[u],b,o)
if(s)for(var C in s)s.hasOwnProperty(C)&&"style"!=C&&"class"!=C&&w.setAttribute(C,s[C])
return e.content.appendChild(w)}e.content.appendChild(u)}}function tn(e,t){return function(n,r,i,o,a,l,s){i=i?i+" cm-force-border":"cm-force-border"
for(var u=n.pos,c=u+r.length;;){for(var f=void 0,d=0;d<t.length&&!((f=t[d]).to>u&&f.from<=u);d++);if(f.to>=c)return e(n,r,i,o,a,l,s)
e(n,r.slice(0,f.to-u),i,o,null,l,s),o=null,r=r.slice(f.to-u),u=f.to}}}function nn(e,t,n,r){var i=!r&&n.widgetNode
i&&e.map.push(e.pos,e.pos+t,i),!r&&e.cm.display.input.needsContentAttribute&&(i||(i=e.content.appendChild(document.createElement("span"))),i.setAttribute("cm-marker",n.id)),i&&(e.cm.display.input.setUneditable(i),e.content.appendChild(i)),e.pos+=t,e.trailingSpace=!1}function rn(e,t,n){var r=e.markedSpans,i=e.text,o=0
if(r)for(var a,l,s,u,c,f,d,h=i.length,p=0,m=1,g="",v=0;;){if(v==p){s=u=c=l="",d=null,f=null,v=1/0
for(var y=[],x=void 0,b=0;b<r.length;++b){var w=r[b],C=w.marker
if("bookmark"==C.type&&w.from==p&&C.widgetNode)y.push(C)
else if(w.from<=p&&(null==w.to||w.to>p||C.collapsed&&w.to==p&&w.from==p)){if(null!=w.to&&w.to!=p&&v>w.to&&(v=w.to,u=""),C.className&&(s+=" "+C.className),C.css&&(l=(l?l+";":"")+C.css),C.startStyle&&w.from==p&&(c+=" "+C.startStyle),C.endStyle&&w.to==v&&(x||(x=[])).push(C.endStyle,w.to),C.title&&((d||(d={})).title=C.title),C.attributes)for(var k in C.attributes)(d||(d={}))[k]=C.attributes[k]
C.collapsed&&(!f||Ot(f.marker,C)<0)&&(f=w)}else w.from>p&&v>w.from&&(v=w.from)}if(x)for(var S=0;S<x.length;S+=2)x[S+1]==v&&(u+=" "+x[S])
if(!f||f.from==p)for(var L=0;L<y.length;++L)nn(t,0,y[L])
if(f&&(f.from||0)==p){if(nn(t,(null==f.to?h+1:f.to)-p,f.marker,null==f.from),null==f.to)return
f.to==p&&(f=!1)}}if(p>=h)break
for(var T=Math.min(h,v);;){if(g){var M=p+g.length
if(!f){var A=M>T?g.slice(0,T-p):g
t.addToken(t,A,a?a+s:s,c,p+A.length==v?u:"",l,d)}if(M>=T){g=g.slice(T-p),p=T
break}p=M,c=""}g=i.slice(o,o=n[m++]),a=Zt(n[m++],t.cm.options)}}else for(var N=1;N<n.length;N+=2)t.addToken(t,i.slice(o,o=n[N]),Zt(n[N+1],t.cm.options))}function on(e,t,n){this.line=t,this.rest=function(e){for(var t,n;t=Ht(e);)e=t.find(1,!0).line,(n||(n=[])).push(e)
return n}(t),this.size=this.rest?Ze(K(this.rest))-n+1:1,this.node=this.text=null,this.hidden=_t(e,t)}function an(e,t,n){for(var r,i=[],o=t;o<n;o=r){var a=new on(e.doc,$e(e.doc,o),o)
r=o+a.size,i.push(a)}return i}var ln=null,sn=null
function un(e,t){var n=he(e,t)
if(n.length){var r,i=Array.prototype.slice.call(arguments,2)
ln?r=ln.delayedCallbacks:sn?r=sn:(r=sn=[],setTimeout(cn,0))
for(var o=function(e){r.push((function(){return n[e].apply(null,i)}))},a=0;a<n.length;++a)o(a)}}function cn(){var e=sn
sn=null
for(var t=0;t<e.length;++t)e[t]()}function fn(e,t,n,r){for(var i=0;i<t.changes.length;i++){var o=t.changes[i]
"text"==o?pn(e,t):"gutter"==o?gn(e,t,n,r):"class"==o?mn(e,t):"widget"==o&&vn(e,t,r)}t.changes=null}function dn(e){return e.node==e.text&&(e.node=N("div",null,null,"position: relative"),e.text.parentNode&&e.text.parentNode.replaceChild(e.node,e.text),e.node.appendChild(e.text),a&&l<8&&(e.node.style.zIndex=2)),e.node}function hn(e,t){var n=e.display.externalMeasured
return n&&n.line==t.line?(e.display.externalMeasured=null,t.measure=n.measure,n.built):Qt(e,t)}function pn(e,t){var n=t.text.className,r=hn(e,t)
t.text==t.node&&(t.node=r.pre),t.text.parentNode.replaceChild(r.pre,t.text),t.text=r.pre,r.bgClass!=t.bgClass||r.textClass!=t.textClass?(t.bgClass=r.bgClass,t.textClass=r.textClass,mn(e,t)):n&&(t.text.className=n)}function mn(e,t){!function(e,t){var n=t.bgClass?t.bgClass+" "+(t.line.bgClass||""):t.line.bgClass
if(n&&(n+=" CodeMirror-linebackground"),t.background)n?t.background.className=n:(t.background.parentNode.removeChild(t.background),t.background=null)
else if(n){var r=dn(t)
t.background=r.insertBefore(N("div",null,n),r.firstChild),e.display.input.setUneditable(t.background)}}(e,t),t.line.wrapClass?dn(t).className=t.line.wrapClass:t.node!=t.text&&(t.node.className="")
var n=t.textClass?t.textClass+" "+(t.line.textClass||""):t.line.textClass
t.text.className=n||""}function gn(e,t,n,r){if(t.gutter&&(t.node.removeChild(t.gutter),t.gutter=null),t.gutterBackground&&(t.node.removeChild(t.gutterBackground),t.gutterBackground=null),t.line.gutterClass){var i=dn(t)
t.gutterBackground=N("div",null,"CodeMirror-gutter-background "+t.line.gutterClass,"left: "+(e.options.fixedGutter?r.fixedPos:-r.gutterTotalWidth)+"px; width: "+r.gutterTotalWidth+"px"),e.display.input.setUneditable(t.gutterBackground),i.insertBefore(t.gutterBackground,t.text)}var o=t.line.gutterMarkers
if(e.options.lineNumbers||o){var a=dn(t),l=t.gutter=N("div",null,"CodeMirror-gutter-wrapper","left: "+(e.options.fixedGutter?r.fixedPos:-r.gutterTotalWidth)+"px")
if(e.display.input.setUneditable(l),a.insertBefore(l,t.text),t.line.gutterClass&&(l.className+=" "+t.line.gutterClass),!e.options.lineNumbers||o&&o["CodeMirror-linenumbers"]||(t.lineNumber=l.appendChild(N("div",et(e.options,n),"CodeMirror-linenumber CodeMirror-gutter-elt","left: "+r.gutterLeft["CodeMirror-linenumbers"]+"px; width: "+e.display.lineNumInnerWidth+"px"))),o)for(var s=0;s<e.display.gutterSpecs.length;++s){var u=e.display.gutterSpecs[s].className,c=o.hasOwnProperty(u)&&o[u]
c&&l.appendChild(N("div",[c],"CodeMirror-gutter-elt","left: "+r.gutterLeft[u]+"px; width: "+r.gutterWidth[u]+"px"))}}}function vn(e,t,n){t.alignable&&(t.alignable=null)
for(var r=t.node.firstChild,i=void 0;r;r=i)i=r.nextSibling,"CodeMirror-linewidget"==r.className&&t.node.removeChild(r)
xn(e,t,n)}function yn(e,t,n,r){var i=hn(e,t)
return t.text=t.node=i.pre,i.bgClass&&(t.bgClass=i.bgClass),i.textClass&&(t.textClass=i.textClass),mn(e,t),gn(e,t,n,r),xn(e,t,r),t.node}function xn(e,t,n){if(bn(e,t.line,t,n,!0),t.rest)for(var r=0;r<t.rest.length;r++)bn(e,t.rest[r],t,n,!1)}function bn(e,t,n,r,i){if(t.widgets)for(var o=dn(n),a=0,l=t.widgets;a<l.length;++a){var s=l[a],u=N("div",[s.node],"CodeMirror-linewidget")
s.handleMouseEvents||u.setAttribute("cm-ignore-events","true"),wn(s,u,n,r),e.display.input.setUneditable(u),i&&s.above?o.insertBefore(u,n.gutter||n.text):o.appendChild(u),un(s,"redraw")}}function wn(e,t,n,r){if(e.noHScroll){(n.alignable||(n.alignable=[])).push(t)
var i=r.wrapperWidth
t.style.left=r.fixedPos+"px",e.coverGutter||(i-=r.gutterTotalWidth,t.style.paddingLeft=r.gutterTotalWidth+"px"),t.style.width=i+"px"}e.coverGutter&&(t.style.zIndex=5,t.style.position="relative",e.noHScroll||(t.style.marginLeft=-r.gutterTotalWidth+"px"))}function Cn(e){if(null!=e.height)return e.height
var t=e.doc.cm
if(!t)return 0
if(!D(document.body,e.node)){var n="position: relative;"
e.coverGutter&&(n+="margin-left: -"+t.display.gutters.offsetWidth+"px;"),e.noHScroll&&(n+="width: "+t.display.wrapper.clientWidth+"px;"),A(t.display.measure,N("div",[e.node],null,n))}return e.height=e.node.parentNode.offsetHeight}function kn(e,t){for(var n=Se(t);n!=e.wrapper;n=n.parentNode)if(!n||1==n.nodeType&&"true"==n.getAttribute("cm-ignore-events")||n.parentNode==e.sizer&&n!=e.mover)return!0}function Sn(e){return e.lineSpace.offsetTop}function Ln(e){return e.mover.offsetHeight-e.lineSpace.offsetHeight}function Tn(e){if(e.cachedPaddingH)return e.cachedPaddingH
var t=A(e.measure,N("pre","x")),n=window.getComputedStyle?window.getComputedStyle(t):t.currentStyle,r={left:parseInt(n.paddingLeft),right:parseInt(n.paddingRight)}
return isNaN(r.left)||isNaN(r.right)||(e.cachedPaddingH=r),r}function Mn(e){return j-e.display.nativeBarWidth}function An(e){return e.display.scroller.clientWidth-Mn(e)-e.display.barWidth}function Nn(e){return e.display.scroller.clientHeight-Mn(e)-e.display.barHeight}function En(e,t,n){if(e.line==t)return{map:e.measure.map,cache:e.measure.cache}
for(var r=0;r<e.rest.length;r++)if(e.rest[r]==t)return{map:e.measure.maps[r],cache:e.measure.caches[r]}
for(var i=0;i<e.rest.length;i++)if(Ze(e.rest[i])>n)return{map:e.measure.maps[i],cache:e.measure.caches[i],before:!0}}function Dn(e,t,n,r){return In(e,On(e,t),n,r)}function Fn(e,t){if(t>=e.display.viewFrom&&t<e.display.viewTo)return e.display.view[fr(e,t)]
var n=e.display.externalMeasured
return n&&t>=n.lineN&&t<n.lineN+n.size?n:void 0}function On(e,t){var n=Ze(t),r=Fn(e,n)
r&&!r.text?r=null:r&&r.changes&&(fn(e,r,n,ar(e)),e.curOp.forceUpdate=!0),r||(r=function(e,t){var n=Ze(t=Rt(t)),r=e.display.externalMeasured=new on(e.doc,t,n)
r.lineN=n
var i=r.built=Qt(e,r)
return r.text=i.pre,A(e.display.lineMeasure,i.pre),r}(e,t))
var i=En(r,t,n)
return{line:t,view:r,rect:null,map:i.map,cache:i.cache,before:i.before,hasHeights:!1}}function In(e,t,n,r,i){t.before&&(n=-1)
var o,s=n+(r||"")
return t.cache.hasOwnProperty(s)?o=t.cache[s]:(t.rect||(t.rect=t.view.text.getBoundingClientRect()),t.hasHeights||(function(e,t,n){var r=e.options.lineWrapping,i=r&&An(e)
if(!t.measure.heights||r&&t.measure.width!=i){var o=t.measure.heights=[]
if(r){t.measure.width=i
for(var a=t.text.firstChild.getClientRects(),l=0;l<a.length-1;l++){var s=a[l],u=a[l+1]
Math.abs(s.bottom-u.bottom)>2&&o.push((s.bottom+u.top)/2-n.top)}}o.push(n.bottom-n.top)}}(e,t.view,t.rect),t.hasHeights=!0),o=function(e,t,n,r){var i,o=Wn(t.map,n,r),s=o.node,u=o.start,c=o.end,f=o.collapse
if(3==s.nodeType){for(var d=0;d<4;d++){for(;u&&ie(t.line.text.charAt(o.coverStart+u));)--u
for(;o.coverStart+c<o.coverEnd&&ie(t.line.text.charAt(o.coverStart+c));)++c
if((i=a&&l<9&&0==u&&c==o.coverEnd-o.coverStart?s.parentNode.getBoundingClientRect():Pn(L(s,u,c).getClientRects(),r)).left||i.right||0==u)break
c=u,u-=1,f="right"}a&&l<11&&(i=function(e,t){if(!window.screen||null==screen.logicalXDPI||screen.logicalXDPI==screen.deviceXDPI||!function(e){if(null!=Be)return Be
var t=A(e,N("span","x")),n=t.getBoundingClientRect(),r=L(t,0,1).getBoundingClientRect()
return Be=Math.abs(n.left-r.left)>1}(e))return t
var n=screen.logicalXDPI/screen.deviceXDPI,r=screen.logicalYDPI/screen.deviceYDPI
return{left:t.left*n,right:t.right*n,top:t.top*r,bottom:t.bottom*r}}(e.display.measure,i))}else{var h
u>0&&(f=r="right"),i=e.options.lineWrapping&&(h=s.getClientRects()).length>1?h["right"==r?h.length-1:0]:s.getBoundingClientRect()}if(a&&l<9&&!u&&(!i||!i.left&&!i.right)){var p=s.parentNode.getClientRects()[0]
i=p?{left:p.left,right:p.left+or(e.display),top:p.top,bottom:p.bottom}:Hn}for(var m=i.top-t.rect.top,g=i.bottom-t.rect.top,v=(m+g)/2,y=t.view.measure.heights,x=0;x<y.length-1&&!(v<y[x]);x++);var b=x?y[x-1]:0,w=y[x],C={left:("right"==f?i.right:i.left)-t.rect.left,right:("left"==f?i.left:i.right)-t.rect.left,top:b,bottom:w}
return i.left||i.right||(C.bogus=!0),e.options.singleCursorHeightPerLine||(C.rtop=m,C.rbottom=g),C}(e,t,n,r),o.bogus||(t.cache[s]=o)),{left:o.left,right:o.right,top:i?o.rtop:o.top,bottom:i?o.rbottom:o.bottom}}var Bn,Hn={left:0,right:0,top:0,bottom:0}
function Wn(e,t,n){for(var r,i,o,a,l,s,u=0;u<e.length;u+=3)if(l=e[u],s=e[u+1],t<l?(i=0,o=1,a="left"):t<s?o=1+(i=t-l):(u==e.length-3||t==s&&e[u+3]>t)&&(i=(o=s-l)-1,t>=s&&(a="right")),null!=i){if(r=e[u+2],l==s&&n==(r.insertLeft?"left":"right")&&(a=n),"left"==n&&0==i)for(;u&&e[u-2]==e[u-3]&&e[u-1].insertLeft;)r=e[2+(u-=3)],a="left"
if("right"==n&&i==s-l)for(;u<e.length-3&&e[u+3]==e[u+4]&&!e[u+5].insertLeft;)r=e[(u+=3)+2],a="right"
break}return{node:r,start:i,end:o,collapse:a,coverStart:l,coverEnd:s}}function Pn(e,t){var n=Hn
if("left"==t)for(var r=0;r<e.length&&(n=e[r]).left==n.right;r++);else for(var i=e.length-1;i>=0&&(n=e[i]).left==n.right;i--);return n}function Rn(e){if(e.measure&&(e.measure.cache={},e.measure.heights=null,e.rest))for(var t=0;t<e.rest.length;t++)e.measure.caches[t]={}}function zn(e){e.display.externalMeasure=null,M(e.display.lineMeasure)
for(var t=0;t<e.display.view.length;t++)Rn(e.display.view[t])}function jn(e){zn(e),e.display.cachedCharWidth=e.display.cachedTextHeight=e.display.cachedPaddingH=null,e.options.lineWrapping||(e.display.maxLineChanged=!0),e.display.lineNumChars=null}function _n(){return c&&g?-(document.body.getBoundingClientRect().left-parseInt(getComputedStyle(document.body).marginLeft)):window.pageXOffset||(document.documentElement||document.body).scrollLeft}function Un(){return c&&g?-(document.body.getBoundingClientRect().top-parseInt(getComputedStyle(document.body).marginTop)):window.pageYOffset||(document.documentElement||document.body).scrollTop}function qn(e){var t=0
if(e.widgets)for(var n=0;n<e.widgets.length;++n)e.widgets[n].above&&(t+=Cn(e.widgets[n]))
return t}function Gn(e,t,n,r,i){if(!i){var o=qn(t)
n.top+=o,n.bottom+=o}if("line"==r)return n
r||(r="local")
var a=qt(t)
if("local"==r?a+=Sn(e.display):a-=e.display.viewOffset,"page"==r||"window"==r){var l=e.display.lineSpace.getBoundingClientRect()
a+=l.top+("window"==r?0:Un())
var s=l.left+("window"==r?0:_n())
n.left+=s,n.right+=s}return n.top+=a,n.bottom+=a,n}function Vn(e,t,n){if("div"==n)return t
var r=t.left,i=t.top
if("page"==n)r-=_n(),i-=Un()
else if("local"==n||!n){var o=e.display.sizer.getBoundingClientRect()
r+=o.left,i+=o.top}var a=e.display.lineSpace.getBoundingClientRect()
return{left:r-a.left,top:i-a.top}}function $n(e,t,n,r,i){return r||(r=$e(e.doc,t.line)),Gn(e,r,Dn(e,r,t.ch,i),n)}function Xn(e,t,n,r,i,o){function a(t,a){var l=In(e,i,t,a?"right":"left",o)
return a?l.left=l.right:l.right=l.left,Gn(e,r,l,n)}r=r||$e(e.doc,t.line),i||(i=On(e,r))
var l=ce(r,e.doc.direction),s=t.ch,u=t.sticky
if(s>=r.text.length?(s=r.text.length,u="before"):s<=0&&(s=0,u="after"),!l)return a("before"==u?s-1:s,"before"==u)
function c(e,t,n){return a(n?e-1:e,1==l[t].level!=n)}var f=se(l,s,u),d=le,h=c(s,f,"before"==u)
return null!=d&&(h.other=c(s,d,"before"!=u)),h}function Kn(e,t){var n=0
t=st(e.doc,t),e.options.lineWrapping||(n=or(e.display)*t.ch)
var r=$e(e.doc,t.line),i=qt(r)+Sn(e.display)
return{left:n,right:n,top:i,bottom:i+r.height}}function Yn(e,t,n,r,i){var o=tt(e,t,n)
return o.xRel=i,r&&(o.outside=!0),o}function Zn(e,t,n){var r=e.doc
if((n+=e.display.viewOffset)<0)return Yn(r.first,0,null,!0,-1)
var i=Qe(r,n),o=r.first+r.size-1
if(i>o)return Yn(r.first+r.size-1,$e(r,o).text.length,null,!0,1)
t<0&&(t=0)
for(var a=$e(r,i);;){var l=tr(e,a,i,t,n),s=Wt(a,l.ch+(l.xRel>0?1:0))
if(!s)return l
var u=s.find(1)
if(u.line==i)return u
a=$e(r,i=u.line)}}function Qn(e,t,n,r){r-=qn(t)
var i=t.text.length,o=ae((function(t){return In(e,n,t-1).bottom<=r}),i,0)
return{begin:o,end:i=ae((function(t){return In(e,n,t).top>r}),o,i)}}function Jn(e,t,n,r){return n||(n=On(e,t)),Qn(e,t,n,Gn(e,t,In(e,n,r),"line").top)}function er(e,t,n,r){return!(e.bottom<=n)&&(e.top>n||(r?e.left:e.right)>t)}function tr(e,t,n,r,i){i-=qt(t)
var o=On(e,t),a=qn(t),l=0,s=t.text.length,u=!0,c=ce(t,e.doc.direction)
if(c){var f=(e.options.lineWrapping?rr:nr)(e,t,n,o,c,r,i)
l=(u=1!=f.level)?f.from:f.to-1,s=u?f.to:f.from-1}var d,h,p=null,m=null,g=ae((function(t){var n=In(e,o,t)
return n.top+=a,n.bottom+=a,!!er(n,r,i,!1)&&(n.top<=i&&n.left<=r&&(p=t,m=n),!0)}),l,s),v=!1
if(m){var y=r-m.left<m.right-r,x=y==u
g=p+(x?0:1),h=x?"after":"before",d=y?m.left:m.right}else{u||g!=s&&g!=l||g++,h=0==g?"after":g==t.text.length?"before":In(e,o,g-(u?1:0)).bottom+a<=i==u?"after":"before"
var b=Xn(e,tt(n,g,h),"line",t,o)
d=b.left,v=i<b.top||i>=b.bottom}return Yn(n,g=oe(t.text,g,1),h,v,r-d)}function nr(e,t,n,r,i,o,a){var l=ae((function(l){var s=i[l],u=1!=s.level
return er(Xn(e,tt(n,u?s.to:s.from,u?"before":"after"),"line",t,r),o,a,!0)}),0,i.length-1),s=i[l]
if(l>0){var u=1!=s.level,c=Xn(e,tt(n,u?s.from:s.to,u?"after":"before"),"line",t,r)
er(c,o,a,!0)&&c.top>a&&(s=i[l-1])}return s}function rr(e,t,n,r,i,o,a){var l=Qn(e,t,r,a),s=l.begin,u=l.end;/\s/.test(t.text.charAt(u-1))&&u--
for(var c=null,f=null,d=0;d<i.length;d++){var h=i[d]
if(!(h.from>=u||h.to<=s)){var p=In(e,r,1!=h.level?Math.min(u,h.to)-1:Math.max(s,h.from)).right,m=p<o?o-p+1e9:p-o;(!c||f>m)&&(c=h,f=m)}}return c||(c=i[i.length-1]),c.from<s&&(c={from:s,to:c.to,level:c.level}),c.to>u&&(c={from:c.from,to:u,level:c.level}),c}function ir(e){if(null!=e.cachedTextHeight)return e.cachedTextHeight
if(null==Bn){Bn=N("pre")
for(var t=0;t<49;++t)Bn.appendChild(document.createTextNode("x")),Bn.appendChild(N("br"))
Bn.appendChild(document.createTextNode("x"))}A(e.measure,Bn)
var n=Bn.offsetHeight/50
return n>3&&(e.cachedTextHeight=n),M(e.measure),n||1}function or(e){if(null!=e.cachedCharWidth)return e.cachedCharWidth
var t=N("span","xxxxxxxxxx"),n=N("pre",[t])
A(e.measure,n)
var r=t.getBoundingClientRect(),i=(r.right-r.left)/10
return i>2&&(e.cachedCharWidth=i),i||10}function ar(e){for(var t=e.display,n={},r={},i=t.gutters.clientLeft,o=t.gutters.firstChild,a=0;o;o=o.nextSibling,++a){var l=e.display.gutterSpecs[a].className
n[l]=o.offsetLeft+o.clientLeft+i,r[l]=o.clientWidth}return{fixedPos:lr(t),gutterTotalWidth:t.gutters.offsetWidth,gutterLeft:n,gutterWidth:r,wrapperWidth:t.wrapper.clientWidth}}function lr(e){return e.scroller.getBoundingClientRect().left-e.sizer.getBoundingClientRect().left}function sr(e){var t=ir(e.display),n=e.options.lineWrapping,r=n&&Math.max(5,e.display.scroller.clientWidth/or(e.display)-3)
return function(i){if(_t(e.doc,i))return 0
var o=0
if(i.widgets)for(var a=0;a<i.widgets.length;a++)i.widgets[a].height&&(o+=i.widgets[a].height)
return n?o+(Math.ceil(i.text.length/r)||1)*t:o+t}}function ur(e){var t=e.doc,n=sr(e)
t.iter((function(e){var t=n(e)
t!=e.height&&Ye(e,t)}))}function cr(e,t,n,r){var i=e.display
if(!n&&"true"==Se(t).getAttribute("cm-not-content"))return null
var o,a,l=i.lineSpace.getBoundingClientRect()
try{o=t.clientX-l.left,a=t.clientY-l.top}catch(t){return null}var s,u=Zn(e,o,a)
if(r&&1==u.xRel&&(s=$e(e.doc,u.line).text).length==u.ch){var c=P(s,s.length,e.options.tabSize)-s.length
u=tt(u.line,Math.max(0,Math.round((o-Tn(e.display).left)/or(e.display))-c))}return u}function fr(e,t){if(t>=e.display.viewTo)return null
if((t-=e.display.viewFrom)<0)return null
for(var n=e.display.view,r=0;r<n.length;r++)if((t-=n[r].size)<0)return r}function dr(e,t,n,r){null==t&&(t=e.doc.first),null==n&&(n=e.doc.first+e.doc.size),r||(r=0)
var i=e.display
if(r&&n<i.viewTo&&(null==i.updateLineNumbers||i.updateLineNumbers>t)&&(i.updateLineNumbers=t),e.curOp.viewChanged=!0,t>=i.viewTo)kt&&zt(e.doc,t)<i.viewTo&&pr(e)
else if(n<=i.viewFrom)kt&&jt(e.doc,n+r)>i.viewFrom?pr(e):(i.viewFrom+=r,i.viewTo+=r)
else if(t<=i.viewFrom&&n>=i.viewTo)pr(e)
else if(t<=i.viewFrom){var o=mr(e,n,n+r,1)
o?(i.view=i.view.slice(o.index),i.viewFrom=o.lineN,i.viewTo+=r):pr(e)}else if(n>=i.viewTo){var a=mr(e,t,t,-1)
a?(i.view=i.view.slice(0,a.index),i.viewTo=a.lineN):pr(e)}else{var l=mr(e,t,t,-1),s=mr(e,n,n+r,1)
l&&s?(i.view=i.view.slice(0,l.index).concat(an(e,l.lineN,s.lineN)).concat(i.view.slice(s.index)),i.viewTo+=r):pr(e)}var u=i.externalMeasured
u&&(n<u.lineN?u.lineN+=r:t<u.lineN+u.size&&(i.externalMeasured=null))}function hr(e,t,n){e.curOp.viewChanged=!0
var r=e.display,i=e.display.externalMeasured
if(i&&t>=i.lineN&&t<i.lineN+i.size&&(r.externalMeasured=null),!(t<r.viewFrom||t>=r.viewTo)){var o=r.view[fr(e,t)]
if(null!=o.node){var a=o.changes||(o.changes=[]);-1==z(a,n)&&a.push(n)}}}function pr(e){e.display.viewFrom=e.display.viewTo=e.doc.first,e.display.view=[],e.display.viewOffset=0}function mr(e,t,n,r){var i,o=fr(e,t),a=e.display.view
if(!kt||n==e.doc.first+e.doc.size)return{index:o,lineN:n}
for(var l=e.display.viewFrom,s=0;s<o;s++)l+=a[s].size
if(l!=t){if(r>0){if(o==a.length-1)return null
i=l+a[o].size-t,o++}else i=l-t
t+=i,n+=i}for(;zt(e.doc,n)!=n;){if(o==(r<0?0:a.length-1))return null
n+=r*a[o-(r<0?1:0)].size,o+=r}return{index:o,lineN:n}}function gr(e){for(var t=e.display.view,n=0,r=0;r<t.length;r++){var i=t[r]
i.hidden||i.node&&!i.changes||++n}return n}function vr(e){e.display.input.showSelection(e.display.input.prepareSelection())}function yr(e,t){void 0===t&&(t=!0)
for(var n=e.doc,r={},i=r.cursors=document.createDocumentFragment(),o=r.selection=document.createDocumentFragment(),a=0;a<n.sel.ranges.length;a++)if(t||a!=n.sel.primIndex){var l=n.sel.ranges[a]
if(!(l.from().line>=e.display.viewTo||l.to().line<e.display.viewFrom)){var s=l.empty();(s||e.options.showCursorWhenSelecting)&&xr(e,l.head,i),s||wr(e,l,o)}}return r}function xr(e,t,n){var r=Xn(e,t,"div",null,null,!e.options.singleCursorHeightPerLine),i=n.appendChild(N("div"," ","CodeMirror-cursor"))
if(i.style.left=r.left+"px",i.style.top=r.top+"px",i.style.height=Math.max(0,r.bottom-r.top)*e.options.cursorHeight+"px",r.other){var o=n.appendChild(N("div"," ","CodeMirror-cursor CodeMirror-secondarycursor"))
o.style.display="",o.style.left=r.other.left+"px",o.style.top=r.other.top+"px",o.style.height=.85*(r.other.bottom-r.other.top)+"px"}}function br(e,t){return e.top-t.top||e.left-t.left}function wr(e,t,n){var r=e.display,i=e.doc,o=document.createDocumentFragment(),a=Tn(e.display),l=a.left,s=Math.max(r.sizerWidth,An(e)-r.sizer.offsetLeft)-a.right,u="ltr"==i.direction
function c(e,t,n,r){t<0&&(t=0),t=Math.round(t),r=Math.round(r),o.appendChild(N("div",null,"CodeMirror-selected","position: absolute; left: "+e+"px;\n                             top: "+t+"px; width: "+(null==n?s-e:n)+"px;\n                             height: "+(r-t)+"px"))}function f(t,n,r){var o,a,f=$e(i,t),d=f.text.length
function h(n,r){return $n(e,tt(t,n),"div",f,r)}function p(t,n,r){var i=Jn(e,f,null,t),o="ltr"==n==("after"==r)?"left":"right"
return h("after"==r?i.begin:i.end-(/\s/.test(f.text.charAt(i.end-1))?2:1),o)[o]}var m=ce(f,i.direction)
return function(e,t,n,r){if(!e)return r(t,n,"ltr",0)
for(var i=!1,o=0;o<e.length;++o){var a=e[o];(a.from<n&&a.to>t||t==n&&a.to==t)&&(r(Math.max(a.from,t),Math.min(a.to,n),1==a.level?"rtl":"ltr",o),i=!0)}i||r(t,n,"ltr")}(m,n||0,null==r?d:r,(function(e,t,i,f){var g="ltr"==i,v=h(e,g?"left":"right"),y=h(t-1,g?"right":"left"),x=null==n&&0==e,b=null==r&&t==d,w=0==f,C=!m||f==m.length-1
if(y.top-v.top<=3){var k=(u?b:x)&&C,S=(u?x:b)&&w?l:(g?v:y).left,L=k?s:(g?y:v).right
c(S,v.top,L-S,v.bottom)}else{var T,M,A,N
g?(T=u&&x&&w?l:v.left,M=u?s:p(e,i,"before"),A=u?l:p(t,i,"after"),N=u&&b&&C?s:y.right):(T=u?p(e,i,"before"):l,M=!u&&x&&w?s:v.right,A=!u&&b&&C?l:y.left,N=u?p(t,i,"after"):s),c(T,v.top,M-T,v.bottom),v.bottom<y.top&&c(l,v.bottom,null,y.top),c(A,y.top,N-A,y.bottom)}(!o||br(v,o)<0)&&(o=v),br(y,o)<0&&(o=y),(!a||br(v,a)<0)&&(a=v),br(y,a)<0&&(a=y)})),{start:o,end:a}}var d=t.from(),h=t.to()
if(d.line==h.line)f(d.line,d.ch,h.ch)
else{var p=$e(i,d.line),m=$e(i,h.line),g=Rt(p)==Rt(m),v=f(d.line,d.ch,g?p.text.length+1:null).end,y=f(h.line,g?0:null,h.ch).start
g&&(v.top<y.top-2?(c(v.right,v.top,null,v.bottom),c(l,y.top,y.left,y.bottom)):c(v.right,v.top,y.left-v.right,v.bottom)),v.bottom<y.top&&c(l,v.bottom,null,y.top)}n.appendChild(o)}function Cr(e){if(e.state.focused){var t=e.display
clearInterval(t.blinker)
var n=!0
t.cursorDiv.style.visibility="",e.options.cursorBlinkRate>0?t.blinker=setInterval((function(){return t.cursorDiv.style.visibility=(n=!n)?"":"hidden"}),e.options.cursorBlinkRate):e.options.cursorBlinkRate<0&&(t.cursorDiv.style.visibility="hidden")}}function kr(e){e.state.focused||(e.display.input.focus(),Lr(e))}function Sr(e){e.state.delayingBlurEvent=!0,setTimeout((function(){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1,Tr(e))}),100)}function Lr(e,t){e.state.delayingBlurEvent&&(e.state.delayingBlurEvent=!1),"nocursor"!=e.options.readOnly&&(e.state.focused||(me(e,"focus",e,t),e.state.focused=!0,O(e.display.wrapper,"CodeMirror-focused"),e.curOp||e.display.selForContextMenu==e.doc.sel||(e.display.input.reset(),s&&setTimeout((function(){return e.display.input.reset(!0)}),20)),e.display.input.receivedFocus()),Cr(e))}function Tr(e,t){e.state.delayingBlurEvent||(e.state.focused&&(me(e,"blur",e,t),e.state.focused=!1,T(e.display.wrapper,"CodeMirror-focused")),clearInterval(e.display.blinker),setTimeout((function(){e.state.focused||(e.display.shift=!1)}),150))}function Mr(e){for(var t=e.display,n=t.lineDiv.offsetTop,r=0;r<t.view.length;r++){var i=t.view[r],o=e.options.lineWrapping,s=void 0,u=0
if(!i.hidden){if(a&&l<8){var c=i.node.offsetTop+i.node.offsetHeight
s=c-n,n=c}else{var f=i.node.getBoundingClientRect()
s=f.bottom-f.top,!o&&i.text.firstChild&&(u=i.text.firstChild.getBoundingClientRect().right-f.left-1)}var d=i.line.height-s
if((d>.005||d<-.005)&&(Ye(i.line,s),Ar(i.line),i.rest))for(var h=0;h<i.rest.length;h++)Ar(i.rest[h])
if(u>e.display.sizerWidth){var p=Math.ceil(u/or(e.display))
p>e.display.maxLineLength&&(e.display.maxLineLength=p,e.display.maxLine=i.line,e.display.maxLineChanged=!0)}}}}function Ar(e){if(e.widgets)for(var t=0;t<e.widgets.length;++t){var n=e.widgets[t],r=n.node.parentNode
r&&(n.height=r.offsetHeight)}}function Nr(e,t,n){var r=n&&null!=n.top?Math.max(0,n.top):e.scroller.scrollTop
r=Math.floor(r-Sn(e))
var i=n&&null!=n.bottom?n.bottom:r+e.wrapper.clientHeight,o=Qe(t,r),a=Qe(t,i)
if(n&&n.ensure){var l=n.ensure.from.line,s=n.ensure.to.line
l<o?(o=l,a=Qe(t,qt($e(t,l))+e.wrapper.clientHeight)):Math.min(s,t.lastLine())>=a&&(o=Qe(t,qt($e(t,s))-e.wrapper.clientHeight),a=s)}return{from:o,to:Math.max(a,o+1)}}function Er(e,t){var n=e.display,r=ir(e.display)
t.top<0&&(t.top=0)
var i=e.curOp&&null!=e.curOp.scrollTop?e.curOp.scrollTop:n.scroller.scrollTop,o=Nn(e),a={}
t.bottom-t.top>o&&(t.bottom=t.top+o)
var l=e.doc.height+Ln(n),s=t.top<r,u=t.bottom>l-r
if(t.top<i)a.scrollTop=s?0:t.top
else if(t.bottom>i+o){var c=Math.min(t.top,(u?l:t.bottom)-o)
c!=i&&(a.scrollTop=c)}var f=e.curOp&&null!=e.curOp.scrollLeft?e.curOp.scrollLeft:n.scroller.scrollLeft,d=An(e)-(e.options.fixedGutter?n.gutters.offsetWidth:0),h=t.right-t.left>d
return h&&(t.right=t.left+d),t.left<10?a.scrollLeft=0:t.left<f?a.scrollLeft=Math.max(0,t.left-(h?0:10)):t.right>d+f-3&&(a.scrollLeft=t.right+(h?0:10)-d),a}function Dr(e,t){null!=t&&(Ir(e),e.curOp.scrollTop=(null==e.curOp.scrollTop?e.doc.scrollTop:e.curOp.scrollTop)+t)}function Fr(e){Ir(e)
var t=e.getCursor()
e.curOp.scrollToPos={from:t,to:t,margin:e.options.cursorScrollMargin}}function Or(e,t,n){null==t&&null==n||Ir(e),null!=t&&(e.curOp.scrollLeft=t),null!=n&&(e.curOp.scrollTop=n)}function Ir(e){var t=e.curOp.scrollToPos
t&&(e.curOp.scrollToPos=null,Br(e,Kn(e,t.from),Kn(e,t.to),t.margin))}function Br(e,t,n,r){var i=Er(e,{left:Math.min(t.left,n.left),top:Math.min(t.top,n.top)-r,right:Math.max(t.right,n.right),bottom:Math.max(t.bottom,n.bottom)+r})
Or(e,i.scrollLeft,i.scrollTop)}function Hr(e,t){Math.abs(e.doc.scrollTop-t)<2||(n||ui(e,{top:t}),Wr(e,t,!0),n&&ui(e),ii(e,100))}function Wr(e,t,n){t=Math.min(e.display.scroller.scrollHeight-e.display.scroller.clientHeight,t),(e.display.scroller.scrollTop!=t||n)&&(e.doc.scrollTop=t,e.display.scrollbars.setScrollTop(t),e.display.scroller.scrollTop!=t&&(e.display.scroller.scrollTop=t))}function Pr(e,t,n,r){t=Math.min(t,e.display.scroller.scrollWidth-e.display.scroller.clientWidth),(n?t==e.doc.scrollLeft:Math.abs(e.doc.scrollLeft-t)<2)&&!r||(e.doc.scrollLeft=t,di(e),e.display.scroller.scrollLeft!=t&&(e.display.scroller.scrollLeft=t),e.display.scrollbars.setScrollLeft(t))}function Rr(e){var t=e.display,n=t.gutters.offsetWidth,r=Math.round(e.doc.height+Ln(e.display))
return{clientHeight:t.scroller.clientHeight,viewHeight:t.wrapper.clientHeight,scrollWidth:t.scroller.scrollWidth,clientWidth:t.scroller.clientWidth,viewWidth:t.wrapper.clientWidth,barLeft:e.options.fixedGutter?n:0,docHeight:r,scrollHeight:r+Mn(e)+t.barHeight,nativeBarWidth:t.nativeBarWidth,gutterWidth:n}}var zr=function(e,t,n){this.cm=n
var r=this.vert=N("div",[N("div",null,null,"min-width: 1px")],"CodeMirror-vscrollbar"),i=this.horiz=N("div",[N("div",null,null,"height: 100%; min-height: 1px")],"CodeMirror-hscrollbar")
r.tabIndex=i.tabIndex=-1,e(r),e(i),de(r,"scroll",(function(){r.clientHeight&&t(r.scrollTop,"vertical")})),de(i,"scroll",(function(){i.clientWidth&&t(i.scrollLeft,"horizontal")})),this.checkedZeroWidth=!1,a&&l<8&&(this.horiz.style.minHeight=this.vert.style.minWidth="18px")}
zr.prototype.update=function(e){var t=e.scrollWidth>e.clientWidth+1,n=e.scrollHeight>e.clientHeight+1,r=e.nativeBarWidth
if(n){this.vert.style.display="block",this.vert.style.bottom=t?r+"px":"0"
var i=e.viewHeight-(t?r:0)
this.vert.firstChild.style.height=Math.max(0,e.scrollHeight-e.clientHeight+i)+"px"}else this.vert.style.display="",this.vert.firstChild.style.height="0"
if(t){this.horiz.style.display="block",this.horiz.style.right=n?r+"px":"0",this.horiz.style.left=e.barLeft+"px"
var o=e.viewWidth-e.barLeft-(n?r:0)
this.horiz.firstChild.style.width=Math.max(0,e.scrollWidth-e.clientWidth+o)+"px"}else this.horiz.style.display="",this.horiz.firstChild.style.width="0"
return!this.checkedZeroWidth&&e.clientHeight>0&&(0==r&&this.zeroWidthHack(),this.checkedZeroWidth=!0),{right:n?r:0,bottom:t?r:0}},zr.prototype.setScrollLeft=function(e){this.horiz.scrollLeft!=e&&(this.horiz.scrollLeft=e),this.disableHoriz&&this.enableZeroWidthBar(this.horiz,this.disableHoriz,"horiz")},zr.prototype.setScrollTop=function(e){this.vert.scrollTop!=e&&(this.vert.scrollTop=e),this.disableVert&&this.enableZeroWidthBar(this.vert,this.disableVert,"vert")},zr.prototype.zeroWidthHack=function(){var e=y&&!h?"12px":"18px"
this.horiz.style.height=this.vert.style.width=e,this.horiz.style.pointerEvents=this.vert.style.pointerEvents="none",this.disableHoriz=new R,this.disableVert=new R},zr.prototype.enableZeroWidthBar=function(e,t,n){e.style.pointerEvents="auto",t.set(1e3,(function r(){var i=e.getBoundingClientRect();("vert"==n?document.elementFromPoint(i.right-1,(i.top+i.bottom)/2):document.elementFromPoint((i.right+i.left)/2,i.bottom-1))!=e?e.style.pointerEvents="none":t.set(1e3,r)}))},zr.prototype.clear=function(){var e=this.horiz.parentNode
e.removeChild(this.horiz),e.removeChild(this.vert)}
var jr=function(){}
function _r(e,t){t||(t=Rr(e))
var n=e.display.barWidth,r=e.display.barHeight
Ur(e,t)
for(var i=0;i<4&&n!=e.display.barWidth||r!=e.display.barHeight;i++)n!=e.display.barWidth&&e.options.lineWrapping&&Mr(e),Ur(e,Rr(e)),n=e.display.barWidth,r=e.display.barHeight}function Ur(e,t){var n=e.display,r=n.scrollbars.update(t)
n.sizer.style.paddingRight=(n.barWidth=r.right)+"px",n.sizer.style.paddingBottom=(n.barHeight=r.bottom)+"px",n.heightForcer.style.borderBottom=r.bottom+"px solid transparent",r.right&&r.bottom?(n.scrollbarFiller.style.display="block",n.scrollbarFiller.style.height=r.bottom+"px",n.scrollbarFiller.style.width=r.right+"px"):n.scrollbarFiller.style.display="",r.bottom&&e.options.coverGutterNextToScrollbar&&e.options.fixedGutter?(n.gutterFiller.style.display="block",n.gutterFiller.style.height=r.bottom+"px",n.gutterFiller.style.width=t.gutterWidth+"px"):n.gutterFiller.style.display=""}jr.prototype.update=function(){return{bottom:0,right:0}},jr.prototype.setScrollLeft=function(){},jr.prototype.setScrollTop=function(){},jr.prototype.clear=function(){}
var qr={native:zr,null:jr}
function Gr(e){e.display.scrollbars&&(e.display.scrollbars.clear(),e.display.scrollbars.addClass&&T(e.display.wrapper,e.display.scrollbars.addClass)),e.display.scrollbars=new qr[e.options.scrollbarStyle]((function(t){e.display.wrapper.insertBefore(t,e.display.scrollbarFiller),de(t,"mousedown",(function(){e.state.focused&&setTimeout((function(){return e.display.input.focus()}),0)})),t.setAttribute("cm-not-content","true")}),(function(t,n){"horizontal"==n?Pr(e,t):Hr(e,t)}),e),e.display.scrollbars.addClass&&O(e.display.wrapper,e.display.scrollbars.addClass)}var Vr=0
function $r(e){var t
e.curOp={cm:e,viewChanged:!1,startHeight:e.doc.height,forceUpdate:!1,updateInput:0,typing:!1,changeObjs:null,cursorActivityHandlers:null,cursorActivityCalled:0,selectionChanged:!1,updateMaxLine:!1,scrollLeft:null,scrollTop:null,scrollToPos:null,focus:!1,id:++Vr},t=e.curOp,ln?ln.ops.push(t):t.ownsGroup=ln={ops:[t],delayedCallbacks:[]}}function Xr(e){var t=e.curOp
t&&function(e,t){var n=e.ownsGroup
if(n)try{!function(e){var t=e.delayedCallbacks,n=0
do{for(;n<t.length;n++)t[n].call(null)
for(var r=0;r<e.ops.length;r++){var i=e.ops[r]
if(i.cursorActivityHandlers)for(;i.cursorActivityCalled<i.cursorActivityHandlers.length;)i.cursorActivityHandlers[i.cursorActivityCalled++].call(null,i.cm)}}while(n<t.length)}(n)}finally{ln=null,function(e){for(var t=0;t<e.ops.length;t++)e.ops[t].cm.curOp=null
!function(e){for(var t=e.ops,n=0;n<t.length;n++)Kr(t[n])
for(var r=0;r<t.length;r++)Yr(t[r])
for(var i=0;i<t.length;i++)Zr(t[i])
for(var o=0;o<t.length;o++)Qr(t[o])
for(var a=0;a<t.length;a++)Jr(t[a])}(e)}(n)}}(t)}function Kr(e){var t=e.cm,n=t.display
!function(e){var t=e.display
!t.scrollbarsClipped&&t.scroller.offsetWidth&&(t.nativeBarWidth=t.scroller.offsetWidth-t.scroller.clientWidth,t.heightForcer.style.height=Mn(e)+"px",t.sizer.style.marginBottom=-t.nativeBarWidth+"px",t.sizer.style.borderRightWidth=Mn(e)+"px",t.scrollbarsClipped=!0)}(t),e.updateMaxLine&&Vt(t),e.mustUpdate=e.viewChanged||e.forceUpdate||null!=e.scrollTop||e.scrollToPos&&(e.scrollToPos.from.line<n.viewFrom||e.scrollToPos.to.line>=n.viewTo)||n.maxLineChanged&&t.options.lineWrapping,e.update=e.mustUpdate&&new ai(t,e.mustUpdate&&{top:e.scrollTop,ensure:e.scrollToPos},e.forceUpdate)}function Yr(e){e.updatedDisplay=e.mustUpdate&&li(e.cm,e.update)}function Zr(e){var t=e.cm,n=t.display
e.updatedDisplay&&Mr(t),e.barMeasure=Rr(t),n.maxLineChanged&&!t.options.lineWrapping&&(e.adjustWidthTo=Dn(t,n.maxLine,n.maxLine.text.length).left+3,t.display.sizerWidth=e.adjustWidthTo,e.barMeasure.scrollWidth=Math.max(n.scroller.clientWidth,n.sizer.offsetLeft+e.adjustWidthTo+Mn(t)+t.display.barWidth),e.maxScrollLeft=Math.max(0,n.sizer.offsetLeft+e.adjustWidthTo-An(t))),(e.updatedDisplay||e.selectionChanged)&&(e.preparedSelection=n.input.prepareSelection())}function Qr(e){var t=e.cm
null!=e.adjustWidthTo&&(t.display.sizer.style.minWidth=e.adjustWidthTo+"px",e.maxScrollLeft<t.doc.scrollLeft&&Pr(t,Math.min(t.display.scroller.scrollLeft,e.maxScrollLeft),!0),t.display.maxLineChanged=!1)
var n=e.focus&&e.focus==F()
e.preparedSelection&&t.display.input.showSelection(e.preparedSelection,n),(e.updatedDisplay||e.startHeight!=t.doc.height)&&_r(t,e.barMeasure),e.updatedDisplay&&fi(t,e.barMeasure),e.selectionChanged&&Cr(t),t.state.focused&&e.updateInput&&t.display.input.reset(e.typing),n&&kr(e.cm)}function Jr(e){var t=e.cm,n=t.display,r=t.doc
if(e.updatedDisplay&&si(t,e.update),null==n.wheelStartX||null==e.scrollTop&&null==e.scrollLeft&&!e.scrollToPos||(n.wheelStartX=n.wheelStartY=null),null!=e.scrollTop&&Wr(t,e.scrollTop,e.forceScroll),null!=e.scrollLeft&&Pr(t,e.scrollLeft,!0,!0),e.scrollToPos){var i=function(e,t,n,r){var i
null==r&&(r=0),e.options.lineWrapping||t!=n||(n="before"==(t=t.ch?tt(t.line,"before"==t.sticky?t.ch-1:t.ch,"after"):t).sticky?tt(t.line,t.ch+1,"before"):t)
for(var o=0;o<5;o++){var a=!1,l=Xn(e,t),s=n&&n!=t?Xn(e,n):l,u=Er(e,i={left:Math.min(l.left,s.left),top:Math.min(l.top,s.top)-r,right:Math.max(l.left,s.left),bottom:Math.max(l.bottom,s.bottom)+r}),c=e.doc.scrollTop,f=e.doc.scrollLeft
if(null!=u.scrollTop&&(Hr(e,u.scrollTop),Math.abs(e.doc.scrollTop-c)>1&&(a=!0)),null!=u.scrollLeft&&(Pr(e,u.scrollLeft),Math.abs(e.doc.scrollLeft-f)>1&&(a=!0)),!a)break}return i}(t,st(r,e.scrollToPos.from),st(r,e.scrollToPos.to),e.scrollToPos.margin)
!function(e,t){if(!ge(e,"scrollCursorIntoView")){var n=e.display,r=n.sizer.getBoundingClientRect(),i=null
if(t.top+r.top<0?i=!0:t.bottom+r.top>(window.innerHeight||document.documentElement.clientHeight)&&(i=!1),null!=i&&!p){var o=N("div","​",null,"position: absolute;\n                         top: "+(t.top-n.viewOffset-Sn(e.display))+"px;\n                         height: "+(t.bottom-t.top+Mn(e)+n.barHeight)+"px;\n                         left: "+t.left+"px; width: "+Math.max(2,t.right-t.left)+"px;")
e.display.lineSpace.appendChild(o),o.scrollIntoView(i),e.display.lineSpace.removeChild(o)}}}(t,i)}var o=e.maybeHiddenMarkers,a=e.maybeUnhiddenMarkers
if(o)for(var l=0;l<o.length;++l)o[l].lines.length||me(o[l],"hide")
if(a)for(var s=0;s<a.length;++s)a[s].lines.length&&me(a[s],"unhide")
n.wrapper.offsetHeight&&(r.scrollTop=t.display.scroller.scrollTop),e.changeObjs&&me(t,"changes",t,e.changeObjs),e.update&&e.update.finish()}function ei(e,t){if(e.curOp)return t()
$r(e)
try{return t()}finally{Xr(e)}}function ti(e,t){return function(){if(e.curOp)return t.apply(e,arguments)
$r(e)
try{return t.apply(e,arguments)}finally{Xr(e)}}}function ni(e){return function(){if(this.curOp)return e.apply(this,arguments)
$r(this)
try{return e.apply(this,arguments)}finally{Xr(this)}}}function ri(e){return function(){var t=this.cm
if(!t||t.curOp)return e.apply(this,arguments)
$r(t)
try{return e.apply(this,arguments)}finally{Xr(t)}}}function ii(e,t){e.doc.highlightFrontier<e.display.viewTo&&e.state.highlight.set(t,H(oi,e))}function oi(e){var t=e.doc
if(!(t.highlightFrontier>=e.display.viewTo)){var n=+new Date+e.options.workTime,r=pt(e,t.highlightFrontier),i=[]
t.iter(r.line,Math.min(t.first+t.size,e.display.viewTo+500),(function(o){if(r.line>=e.display.viewFrom){var a=o.styles,l=o.text.length>e.options.maxHighlightLength?Ue(t.mode,r.state):null,s=dt(e,o,r,!0)
l&&(r.state=l),o.styles=s.styles
var u=o.styleClasses,c=s.classes
c?o.styleClasses=c:u&&(o.styleClasses=null)
for(var f=!a||a.length!=o.styles.length||u!=c&&(!u||!c||u.bgClass!=c.bgClass||u.textClass!=c.textClass),d=0;!f&&d<a.length;++d)f=a[d]!=o.styles[d]
f&&i.push(r.line),o.stateAfter=r.save(),r.nextLine()}else o.text.length<=e.options.maxHighlightLength&&mt(e,o.text,r),o.stateAfter=r.line%5==0?r.save():null,r.nextLine()
if(+new Date>n)return ii(e,e.options.workDelay),!0})),t.highlightFrontier=r.line,t.modeFrontier=Math.max(t.modeFrontier,r.line),i.length&&ei(e,(function(){for(var t=0;t<i.length;t++)hr(e,i[t],"text")}))}}var ai=function(e,t,n){var r=e.display
this.viewport=t,this.visible=Nr(r,e.doc,t),this.editorIsHidden=!r.wrapper.offsetWidth,this.wrapperHeight=r.wrapper.clientHeight,this.wrapperWidth=r.wrapper.clientWidth,this.oldDisplayWidth=An(e),this.force=n,this.dims=ar(e),this.events=[]}
function li(e,t){var n=e.display,r=e.doc
if(t.editorIsHidden)return pr(e),!1
if(!t.force&&t.visible.from>=n.viewFrom&&t.visible.to<=n.viewTo&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo)&&n.renderedView==n.view&&0==gr(e))return!1
hi(e)&&(pr(e),t.dims=ar(e))
var i=r.first+r.size,o=Math.max(t.visible.from-e.options.viewportMargin,r.first),a=Math.min(i,t.visible.to+e.options.viewportMargin)
n.viewFrom<o&&o-n.viewFrom<20&&(o=Math.max(r.first,n.viewFrom)),n.viewTo>a&&n.viewTo-a<20&&(a=Math.min(i,n.viewTo)),kt&&(o=zt(e.doc,o),a=jt(e.doc,a))
var l=o!=n.viewFrom||a!=n.viewTo||n.lastWrapHeight!=t.wrapperHeight||n.lastWrapWidth!=t.wrapperWidth
!function(e,t,n){var r=e.display
0==r.view.length||t>=r.viewTo||n<=r.viewFrom?(r.view=an(e,t,n),r.viewFrom=t):(r.viewFrom>t?r.view=an(e,t,r.viewFrom).concat(r.view):r.viewFrom<t&&(r.view=r.view.slice(fr(e,t))),r.viewFrom=t,r.viewTo<n?r.view=r.view.concat(an(e,r.viewTo,n)):r.viewTo>n&&(r.view=r.view.slice(0,fr(e,n)))),r.viewTo=n}(e,o,a),n.viewOffset=qt($e(e.doc,n.viewFrom)),e.display.mover.style.top=n.viewOffset+"px"
var u=gr(e)
if(!l&&0==u&&!t.force&&n.renderedView==n.view&&(null==n.updateLineNumbers||n.updateLineNumbers>=n.viewTo))return!1
var c=function(e){if(e.hasFocus())return null
var t=F()
if(!t||!D(e.display.lineDiv,t))return null
var n={activeElt:t}
if(window.getSelection){var r=window.getSelection()
r.anchorNode&&r.extend&&D(e.display.lineDiv,r.anchorNode)&&(n.anchorNode=r.anchorNode,n.anchorOffset=r.anchorOffset,n.focusNode=r.focusNode,n.focusOffset=r.focusOffset)}return n}(e)
return u>4&&(n.lineDiv.style.display="none"),function(e,t,n){var r=e.display,i=e.options.lineNumbers,o=r.lineDiv,a=o.firstChild
function l(t){var n=t.nextSibling
return s&&y&&e.display.currentWheelTarget==t?t.style.display="none":t.parentNode.removeChild(t),n}for(var u=r.view,c=r.viewFrom,f=0;f<u.length;f++){var d=u[f]
if(d.hidden);else if(d.node&&d.node.parentNode==o){for(;a!=d.node;)a=l(a)
var h=i&&null!=t&&t<=c&&d.lineNumber
d.changes&&(z(d.changes,"gutter")>-1&&(h=!1),fn(e,d,c,n)),h&&(M(d.lineNumber),d.lineNumber.appendChild(document.createTextNode(et(e.options,c)))),a=d.node.nextSibling}else{var p=yn(e,d,c,n)
o.insertBefore(p,a)}c+=d.size}for(;a;)a=l(a)}(e,n.updateLineNumbers,t.dims),u>4&&(n.lineDiv.style.display=""),n.renderedView=n.view,function(e){if(e&&e.activeElt&&e.activeElt!=F()&&(e.activeElt.focus(),e.anchorNode&&D(document.body,e.anchorNode)&&D(document.body,e.focusNode))){var t=window.getSelection(),n=document.createRange()
n.setEnd(e.anchorNode,e.anchorOffset),n.collapse(!1),t.removeAllRanges(),t.addRange(n),t.extend(e.focusNode,e.focusOffset)}}(c),M(n.cursorDiv),M(n.selectionDiv),n.gutters.style.height=n.sizer.style.minHeight=0,l&&(n.lastWrapHeight=t.wrapperHeight,n.lastWrapWidth=t.wrapperWidth,ii(e,400)),n.updateLineNumbers=null,!0}function si(e,t){for(var n=t.viewport,r=!0;(r&&e.options.lineWrapping&&t.oldDisplayWidth!=An(e)||(n&&null!=n.top&&(n={top:Math.min(e.doc.height+Ln(e.display)-Nn(e),n.top)}),t.visible=Nr(e.display,e.doc,n),!(t.visible.from>=e.display.viewFrom&&t.visible.to<=e.display.viewTo)))&&li(e,t);r=!1){Mr(e)
var i=Rr(e)
vr(e),_r(e,i),fi(e,i),t.force=!1}t.signal(e,"update",e),e.display.viewFrom==e.display.reportedViewFrom&&e.display.viewTo==e.display.reportedViewTo||(t.signal(e,"viewportChange",e,e.display.viewFrom,e.display.viewTo),e.display.reportedViewFrom=e.display.viewFrom,e.display.reportedViewTo=e.display.viewTo)}function ui(e,t){var n=new ai(e,t)
if(li(e,n)){Mr(e),si(e,n)
var r=Rr(e)
vr(e),_r(e,r),fi(e,r),n.finish()}}function ci(e){var t=e.gutters.offsetWidth
e.sizer.style.marginLeft=t+"px"}function fi(e,t){e.display.sizer.style.minHeight=t.docHeight+"px",e.display.heightForcer.style.top=t.docHeight+"px",e.display.gutters.style.height=t.docHeight+e.display.barHeight+Mn(e)+"px"}function di(e){var t=e.display,n=t.view
if(t.alignWidgets||t.gutters.firstChild&&e.options.fixedGutter){for(var r=lr(t)-t.scroller.scrollLeft+e.doc.scrollLeft,i=t.gutters.offsetWidth,o=r+"px",a=0;a<n.length;a++)if(!n[a].hidden){e.options.fixedGutter&&(n[a].gutter&&(n[a].gutter.style.left=o),n[a].gutterBackground&&(n[a].gutterBackground.style.left=o))
var l=n[a].alignable
if(l)for(var s=0;s<l.length;s++)l[s].style.left=o}e.options.fixedGutter&&(t.gutters.style.left=r+i+"px")}}function hi(e){if(!e.options.lineNumbers)return!1
var t=e.doc,n=et(e.options,t.first+t.size-1),r=e.display
if(n.length!=r.lineNumChars){var i=r.measure.appendChild(N("div",[N("div",n)],"CodeMirror-linenumber CodeMirror-gutter-elt")),o=i.firstChild.offsetWidth,a=i.offsetWidth-o
return r.lineGutter.style.width="",r.lineNumInnerWidth=Math.max(o,r.lineGutter.offsetWidth-a)+1,r.lineNumWidth=r.lineNumInnerWidth+a,r.lineNumChars=r.lineNumInnerWidth?n.length:-1,r.lineGutter.style.width=r.lineNumWidth+"px",ci(e.display),!0}return!1}function pi(e,t){for(var n=[],r=!1,i=0;i<e.length;i++){var o=e[i],a=null
if("string"!=typeof o&&(a=o.style,o=o.className),"CodeMirror-linenumbers"==o){if(!t)continue
r=!0}n.push({className:o,style:a})}return t&&!r&&n.push({className:"CodeMirror-linenumbers",style:null}),n}function mi(e){var t=e.gutters,n=e.gutterSpecs
M(t),e.lineGutter=null
for(var r=0;r<n.length;++r){var i=n[r],o=i.className,a=i.style,l=t.appendChild(N("div",null,"CodeMirror-gutter "+o))
a&&(l.style.cssText=a),"CodeMirror-linenumbers"==o&&(e.lineGutter=l,l.style.width=(e.lineNumWidth||1)+"px")}t.style.display=n.length?"":"none",ci(e)}function gi(e){mi(e.display),dr(e),di(e)}function vi(e,t,r,i){var o=this
this.input=r,o.scrollbarFiller=N("div",null,"CodeMirror-scrollbar-filler"),o.scrollbarFiller.setAttribute("cm-not-content","true"),o.gutterFiller=N("div",null,"CodeMirror-gutter-filler"),o.gutterFiller.setAttribute("cm-not-content","true"),o.lineDiv=E("div",null,"CodeMirror-code"),o.selectionDiv=N("div",null,null,"position: relative; z-index: 1"),o.cursorDiv=N("div",null,"CodeMirror-cursors"),o.measure=N("div",null,"CodeMirror-measure"),o.lineMeasure=N("div",null,"CodeMirror-measure"),o.lineSpace=E("div",[o.measure,o.lineMeasure,o.selectionDiv,o.cursorDiv,o.lineDiv],null,"position: relative; outline: none")
var u=E("div",[o.lineSpace],"CodeMirror-lines")
o.mover=N("div",[u],null,"position: relative"),o.sizer=N("div",[o.mover],"CodeMirror-sizer"),o.sizerWidth=null,o.heightForcer=N("div",null,null,"position: absolute; height: "+j+"px; width: 1px;"),o.gutters=N("div",null,"CodeMirror-gutters"),o.lineGutter=null,o.scroller=N("div",[o.sizer,o.heightForcer,o.gutters],"CodeMirror-scroll"),o.scroller.setAttribute("tabIndex","-1"),o.wrapper=N("div",[o.scrollbarFiller,o.gutterFiller,o.scroller],"CodeMirror"),a&&l<8&&(o.gutters.style.zIndex=-1,o.scroller.style.paddingRight=0),s||n&&v||(o.scroller.draggable=!0),e&&(e.appendChild?e.appendChild(o.wrapper):e(o.wrapper)),o.viewFrom=o.viewTo=t.first,o.reportedViewFrom=o.reportedViewTo=t.first,o.view=[],o.renderedView=null,o.externalMeasured=null,o.viewOffset=0,o.lastWrapHeight=o.lastWrapWidth=0,o.updateLineNumbers=null,o.nativeBarWidth=o.barHeight=o.barWidth=0,o.scrollbarsClipped=!1,o.lineNumWidth=o.lineNumInnerWidth=o.lineNumChars=null,o.alignWidgets=!1,o.cachedCharWidth=o.cachedTextHeight=o.cachedPaddingH=null,o.maxLine=null,o.maxLineLength=0,o.maxLineChanged=!1,o.wheelDX=o.wheelDY=o.wheelStartX=o.wheelStartY=null,o.shift=!1,o.selForContextMenu=null,o.activeTouch=null,o.gutterSpecs=pi(i.gutters,i.lineNumbers),mi(o),r.init(o)}ai.prototype.signal=function(e,t){ye(e,t)&&this.events.push(arguments)},ai.prototype.finish=function(){for(var e=0;e<this.events.length;e++)me.apply(null,this.events[e])}
var yi=0,xi=null
function bi(e){var t=e.wheelDeltaX,n=e.wheelDeltaY
return null==t&&e.detail&&e.axis==e.HORIZONTAL_AXIS&&(t=e.detail),null==n&&e.detail&&e.axis==e.VERTICAL_AXIS?n=e.detail:null==n&&(n=e.wheelDelta),{x:t,y:n}}function wi(e){var t=bi(e)
return t.x*=xi,t.y*=xi,t}function Ci(e,t){var r=bi(t),i=r.x,o=r.y,a=e.display,l=a.scroller,u=l.scrollWidth>l.clientWidth,c=l.scrollHeight>l.clientHeight
if(i&&u||o&&c){if(o&&y&&s)e:for(var d=t.target,h=a.view;d!=l;d=d.parentNode)for(var p=0;p<h.length;p++)if(h[p].node==d){e.display.currentWheelTarget=d
break e}if(i&&!n&&!f&&null!=xi)return o&&c&&Hr(e,Math.max(0,l.scrollTop+o*xi)),Pr(e,Math.max(0,l.scrollLeft+i*xi)),(!o||o&&c)&&be(t),void(a.wheelStartX=null)
if(o&&null!=xi){var m=o*xi,g=e.doc.scrollTop,v=g+a.wrapper.clientHeight
m<0?g=Math.max(0,g+m-50):v=Math.min(e.doc.height,v+m+50),ui(e,{top:g,bottom:v})}yi<20&&(null==a.wheelStartX?(a.wheelStartX=l.scrollLeft,a.wheelStartY=l.scrollTop,a.wheelDX=i,a.wheelDY=o,setTimeout((function(){if(null!=a.wheelStartX){var e=l.scrollLeft-a.wheelStartX,t=l.scrollTop-a.wheelStartY,n=t&&a.wheelDY&&t/a.wheelDY||e&&a.wheelDX&&e/a.wheelDX
a.wheelStartX=a.wheelStartY=null,n&&(xi=(xi*yi+n)/(yi+1),++yi)}}),200)):(a.wheelDX+=i,a.wheelDY+=o))}}a?xi=-.53:n?xi=15:c?xi=-.7:d&&(xi=-1/3)
var ki=function(e,t){this.ranges=e,this.primIndex=t}
ki.prototype.primary=function(){return this.ranges[this.primIndex]},ki.prototype.equals=function(e){if(e==this)return!0
if(e.primIndex!=this.primIndex||e.ranges.length!=this.ranges.length)return!1
for(var t=0;t<this.ranges.length;t++){var n=this.ranges[t],r=e.ranges[t]
if(!rt(n.anchor,r.anchor)||!rt(n.head,r.head))return!1}return!0},ki.prototype.deepCopy=function(){for(var e=[],t=0;t<this.ranges.length;t++)e[t]=new Si(it(this.ranges[t].anchor),it(this.ranges[t].head))
return new ki(e,this.primIndex)},ki.prototype.somethingSelected=function(){for(var e=0;e<this.ranges.length;e++)if(!this.ranges[e].empty())return!0
return!1},ki.prototype.contains=function(e,t){t||(t=e)
for(var n=0;n<this.ranges.length;n++){var r=this.ranges[n]
if(nt(t,r.from())>=0&&nt(e,r.to())<=0)return n}return-1}
var Si=function(e,t){this.anchor=e,this.head=t}
function Li(e,t,n){var r=e&&e.options.selectionsMayTouch,i=t[n]
t.sort((function(e,t){return nt(e.from(),t.from())})),n=z(t,i)
for(var o=1;o<t.length;o++){var a=t[o],l=t[o-1],s=nt(l.to(),a.from())
if(r&&!a.empty()?s>0:s>=0){var u=at(l.from(),a.from()),c=ot(l.to(),a.to()),f=l.empty()?a.from()==a.head:l.from()==l.head
o<=n&&--n,t.splice(--o,2,new Si(f?c:u,f?u:c))}}return new ki(t,n)}function Ti(e,t){return new ki([new Si(e,t||e)],0)}function Mi(e){return e.text?tt(e.from.line+e.text.length-1,K(e.text).length+(1==e.text.length?e.from.ch:0)):e.to}function Ai(e,t){if(nt(e,t.from)<0)return e
if(nt(e,t.to)<=0)return Mi(t)
var n=e.line+t.text.length-(t.to.line-t.from.line)-1,r=e.ch
return e.line==t.to.line&&(r+=Mi(t).ch-t.to.ch),tt(n,r)}function Ni(e,t){for(var n=[],r=0;r<e.sel.ranges.length;r++){var i=e.sel.ranges[r]
n.push(new Si(Ai(i.anchor,t),Ai(i.head,t)))}return Li(e.cm,n,e.sel.primIndex)}function Ei(e,t,n){return e.line==t.line?tt(n.line,e.ch-t.ch+n.ch):tt(n.line+(e.line-t.line),e.ch)}function Di(e){e.doc.mode=ze(e.options,e.doc.modeOption),Fi(e)}function Fi(e){e.doc.iter((function(e){e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null)})),e.doc.modeFrontier=e.doc.highlightFrontier=e.doc.first,ii(e,100),e.state.modeGen++,e.curOp&&dr(e)}function Oi(e,t){return 0==t.from.ch&&0==t.to.ch&&""==K(t.text)&&(!e.cm||e.cm.options.wholeLineUpdateBefore)}function Ii(e,t,n,r){function i(e){return n?n[e]:null}function o(e,n,i){!function(e,t,n,r){e.text=t,e.stateAfter&&(e.stateAfter=null),e.styles&&(e.styles=null),null!=e.order&&(e.order=null),Nt(e),Et(e,n)
var i=r?r(e):1
i!=e.height&&Ye(e,i)}(e,n,i,r),un(e,"change",e,t)}function a(e,t){for(var n=[],o=e;o<t;++o)n.push(new $t(u[o],i(o),r))
return n}var l=t.from,s=t.to,u=t.text,c=$e(e,l.line),f=$e(e,s.line),d=K(u),h=i(u.length-1),p=s.line-l.line
if(t.full)e.insert(0,a(0,u.length)),e.remove(u.length,e.size-u.length)
else if(Oi(e,t)){var m=a(0,u.length-1)
o(f,f.text,h),p&&e.remove(l.line,p),m.length&&e.insert(l.line,m)}else if(c==f)if(1==u.length)o(c,c.text.slice(0,l.ch)+d+c.text.slice(s.ch),h)
else{var g=a(1,u.length-1)
g.push(new $t(d+c.text.slice(s.ch),h,r)),o(c,c.text.slice(0,l.ch)+u[0],i(0)),e.insert(l.line+1,g)}else if(1==u.length)o(c,c.text.slice(0,l.ch)+u[0]+f.text.slice(s.ch),i(0)),e.remove(l.line+1,p)
else{o(c,c.text.slice(0,l.ch)+u[0],i(0)),o(f,d+f.text.slice(s.ch),h)
var v=a(1,u.length-1)
p>1&&e.remove(l.line+1,p-1),e.insert(l.line+1,v)}un(e,"change",e,t)}function Bi(e,t,n){!function e(r,i,o){if(r.linked)for(var a=0;a<r.linked.length;++a){var l=r.linked[a]
if(l.doc!=i){var s=o&&l.sharedHist
n&&!s||(t(l.doc,s),e(l.doc,r,s))}}}(e,null,!0)}function Hi(e,t){if(t.cm)throw new Error("This document is already in use.")
e.doc=t,t.cm=e,ur(e),Di(e),Wi(e),e.options.lineWrapping||Vt(e),e.options.mode=t.modeOption,dr(e)}function Wi(e){("rtl"==e.doc.direction?O:T)(e.display.lineDiv,"CodeMirror-rtl")}function Pi(e){this.done=[],this.undone=[],this.undoDepth=1/0,this.lastModTime=this.lastSelTime=0,this.lastOp=this.lastSelOp=null,this.lastOrigin=this.lastSelOrigin=null,this.generation=this.maxGeneration=e||1}function Ri(e,t){var n={from:it(t.from),to:Mi(t),text:Xe(e,t.from,t.to)}
return Ui(e,n,t.from.line,t.to.line+1),Bi(e,(function(e){return Ui(e,n,t.from.line,t.to.line+1)}),!0),n}function zi(e){for(;e.length&&K(e).ranges;)e.pop()}function ji(e,t,n,r){var i=e.history
i.undone.length=0
var o,a,l=+new Date
if((i.lastOp==r||i.lastOrigin==t.origin&&t.origin&&("+"==t.origin.charAt(0)&&i.lastModTime>l-(e.cm?e.cm.options.historyEventDelay:500)||"*"==t.origin.charAt(0)))&&(o=function(e,t){return t?(zi(e.done),K(e.done)):e.done.length&&!K(e.done).ranges?K(e.done):e.done.length>1&&!e.done[e.done.length-2].ranges?(e.done.pop(),K(e.done)):void 0}(i,i.lastOp==r)))a=K(o.changes),0==nt(t.from,t.to)&&0==nt(t.from,a.to)?a.to=Mi(t):o.changes.push(Ri(e,t))
else{var s=K(i.done)
for(s&&s.ranges||_i(e.sel,i.done),o={changes:[Ri(e,t)],generation:i.generation},i.done.push(o);i.done.length>i.undoDepth;)i.done.shift(),i.done[0].ranges||i.done.shift()}i.done.push(n),i.generation=++i.maxGeneration,i.lastModTime=i.lastSelTime=l,i.lastOp=i.lastSelOp=r,i.lastOrigin=i.lastSelOrigin=t.origin,a||me(e,"historyAdded")}function _i(e,t){var n=K(t)
n&&n.ranges&&n.equals(e)||t.push(e)}function Ui(e,t,n,r){var i=t["spans_"+e.id],o=0
e.iter(Math.max(e.first,n),Math.min(e.first+e.size,r),(function(n){n.markedSpans&&((i||(i=t["spans_"+e.id]={}))[o]=n.markedSpans),++o}))}function qi(e){if(!e)return null
for(var t,n=0;n<e.length;++n)e[n].marker.explicitlyCleared?t||(t=e.slice(0,n)):t&&t.push(e[n])
return t?t.length?t:null:e}function Gi(e,t){var n=function(e,t){var n=t["spans_"+e.id]
if(!n)return null
for(var r=[],i=0;i<t.text.length;++i)r.push(qi(n[i]))
return r}(e,t),r=Mt(e,t)
if(!n)return r
if(!r)return n
for(var i=0;i<n.length;++i){var o=n[i],a=r[i]
if(o&&a)e:for(var l=0;l<a.length;++l){for(var s=a[l],u=0;u<o.length;++u)if(o[u].marker==s.marker)continue e
o.push(s)}else a&&(n[i]=a)}return n}function Vi(e,t,n){for(var r=[],i=0;i<e.length;++i){var o=e[i]
if(o.ranges)r.push(n?ki.prototype.deepCopy.call(o):o)
else{var a=o.changes,l=[]
r.push({changes:l})
for(var s=0;s<a.length;++s){var u=a[s],c=void 0
if(l.push({from:u.from,to:u.to,text:u.text}),t)for(var f in u)(c=f.match(/^spans_(\d+)$/))&&z(t,Number(c[1]))>-1&&(K(l)[f]=u[f],delete u[f])}}}return r}function $i(e,t,n,r){if(r){var i=e.anchor
if(n){var o=nt(t,i)<0
o!=nt(n,i)<0?(i=t,t=n):o!=nt(t,n)<0&&(t=n)}return new Si(i,t)}return new Si(n||t,t)}function Xi(e,t,n,r,i){null==i&&(i=e.cm&&(e.cm.display.shift||e.extend)),Ji(e,new ki([$i(e.sel.primary(),t,n,i)],0),r)}function Ki(e,t,n){for(var r=[],i=e.cm&&(e.cm.display.shift||e.extend),o=0;o<e.sel.ranges.length;o++)r[o]=$i(e.sel.ranges[o],t[o],null,i)
Ji(e,Li(e.cm,r,e.sel.primIndex),n)}function Yi(e,t,n,r){var i=e.sel.ranges.slice(0)
i[t]=n,Ji(e,Li(e.cm,i,e.sel.primIndex),r)}function Zi(e,t,n,r){Ji(e,Ti(t,n),r)}function Qi(e,t,n){var r=e.history.done,i=K(r)
i&&i.ranges?(r[r.length-1]=t,eo(e,t,n)):Ji(e,t,n)}function Ji(e,t,n){eo(e,t,n),function(e,t,n,r){var i=e.history,o=r&&r.origin
n==i.lastSelOp||o&&i.lastSelOrigin==o&&(i.lastModTime==i.lastSelTime&&i.lastOrigin==o||function(e,t,n,r){var i=t.charAt(0)
return"*"==i||"+"==i&&n.ranges.length==r.ranges.length&&n.somethingSelected()==r.somethingSelected()&&new Date-e.history.lastSelTime<=(e.cm?e.cm.options.historyEventDelay:500)}(e,o,K(i.done),t))?i.done[i.done.length-1]=t:_i(t,i.done),i.lastSelTime=+new Date,i.lastSelOrigin=o,i.lastSelOp=n,r&&!1!==r.clearRedo&&zi(i.undone)}(e,e.sel,e.cm?e.cm.curOp.id:NaN,n)}function eo(e,t,n){(ye(e,"beforeSelectionChange")||e.cm&&ye(e.cm,"beforeSelectionChange"))&&(t=function(e,t,n){var r={ranges:t.ranges,update:function(t){this.ranges=[]
for(var n=0;n<t.length;n++)this.ranges[n]=new Si(st(e,t[n].anchor),st(e,t[n].head))},origin:n&&n.origin}
return me(e,"beforeSelectionChange",e,r),e.cm&&me(e.cm,"beforeSelectionChange",e.cm,r),r.ranges!=t.ranges?Li(e.cm,r.ranges,r.ranges.length-1):t}(e,t,n))
var r=n&&n.bias||(nt(t.primary().head,e.sel.primary().head)<0?-1:1)
to(e,ro(e,t,r,!0)),n&&!1===n.scroll||!e.cm||Fr(e.cm)}function to(e,t){t.equals(e.sel)||(e.sel=t,e.cm&&(e.cm.curOp.updateInput=1,e.cm.curOp.selectionChanged=!0,ve(e.cm)),un(e,"cursorActivity",e))}function no(e){to(e,ro(e,e.sel,null,!1))}function ro(e,t,n,r){for(var i,o=0;o<t.ranges.length;o++){var a=t.ranges[o],l=t.ranges.length==e.sel.ranges.length&&e.sel.ranges[o],s=oo(e,a.anchor,l&&l.anchor,n,r),u=oo(e,a.head,l&&l.head,n,r);(i||s!=a.anchor||u!=a.head)&&(i||(i=t.ranges.slice(0,o)),i[o]=new Si(s,u))}return i?Li(e.cm,i,t.primIndex):t}function io(e,t,n,r,i){var o=$e(e,t.line)
if(o.markedSpans)for(var a=0;a<o.markedSpans.length;++a){var l=o.markedSpans[a],s=l.marker,u="selectLeft"in s?!s.selectLeft:s.inclusiveLeft,c="selectRight"in s?!s.selectRight:s.inclusiveRight
if((null==l.from||(u?l.from<=t.ch:l.from<t.ch))&&(null==l.to||(c?l.to>=t.ch:l.to>t.ch))){if(i&&(me(s,"beforeCursorEnter"),s.explicitlyCleared)){if(o.markedSpans){--a
continue}break}if(!s.atomic)continue
if(n){var f=s.find(r<0?1:-1),d=void 0
if((r<0?c:u)&&(f=ao(e,f,-r,f&&f.line==t.line?o:null)),f&&f.line==t.line&&(d=nt(f,n))&&(r<0?d<0:d>0))return io(e,f,t,r,i)}var h=s.find(r<0?-1:1)
return(r<0?u:c)&&(h=ao(e,h,r,h.line==t.line?o:null)),h?io(e,h,t,r,i):null}}return t}function oo(e,t,n,r,i){var o=r||1
return io(e,t,n,o,i)||!i&&io(e,t,n,o,!0)||io(e,t,n,-o,i)||!i&&io(e,t,n,-o,!0)||(e.cantEdit=!0,tt(e.first,0))}function ao(e,t,n,r){return n<0&&0==t.ch?t.line>e.first?st(e,tt(t.line-1)):null:n>0&&t.ch==(r||$e(e,t.line)).text.length?t.line<e.first+e.size-1?tt(t.line+1,0):null:new tt(t.line,t.ch+n)}function lo(e){e.setSelection(tt(e.firstLine(),0),tt(e.lastLine()),U)}function so(e,t,n){var r={canceled:!1,from:t.from,to:t.to,text:t.text,origin:t.origin,cancel:function(){return r.canceled=!0}}
return n&&(r.update=function(t,n,i,o){t&&(r.from=st(e,t)),n&&(r.to=st(e,n)),i&&(r.text=i),void 0!==o&&(r.origin=o)}),me(e,"beforeChange",e,r),e.cm&&me(e.cm,"beforeChange",e.cm,r),r.canceled?(e.cm&&(e.cm.curOp.updateInput=2),null):{from:r.from,to:r.to,text:r.text,origin:r.origin}}function uo(e,t,n){if(e.cm){if(!e.cm.curOp)return ti(e.cm,uo)(e,t,n)
if(e.cm.state.suppressEdits)return}if(!(ye(e,"beforeChange")||e.cm&&ye(e.cm,"beforeChange"))||(t=so(e,t,!0))){var r=Ct&&!n&&function(e,t,n){var r=null
if(e.iter(t.line,n.line+1,(function(e){if(e.markedSpans)for(var t=0;t<e.markedSpans.length;++t){var n=e.markedSpans[t].marker
!n.readOnly||r&&-1!=z(r,n)||(r||(r=[])).push(n)}})),!r)return null
for(var i=[{from:t,to:n}],o=0;o<r.length;++o)for(var a=r[o],l=a.find(0),s=0;s<i.length;++s){var u=i[s]
if(!(nt(u.to,l.from)<0||nt(u.from,l.to)>0)){var c=[s,1],f=nt(u.from,l.from),d=nt(u.to,l.to);(f<0||!a.inclusiveLeft&&!f)&&c.push({from:u.from,to:l.from}),(d>0||!a.inclusiveRight&&!d)&&c.push({from:l.to,to:u.to}),i.splice.apply(i,c),s+=c.length-3}}return i}(e,t.from,t.to)
if(r)for(var i=r.length-1;i>=0;--i)co(e,{from:r[i].from,to:r[i].to,text:i?[""]:t.text,origin:t.origin})
else co(e,t)}}function co(e,t){if(1!=t.text.length||""!=t.text[0]||0!=nt(t.from,t.to)){var n=Ni(e,t)
ji(e,t,n,e.cm?e.cm.curOp.id:NaN),po(e,t,n,Mt(e,t))
var r=[]
Bi(e,(function(e,n){n||-1!=z(r,e.history)||(yo(e.history,t),r.push(e.history)),po(e,t,null,Mt(e,t))}))}}function fo(e,t,n){var r=e.cm&&e.cm.state.suppressEdits
if(!r||n){for(var i,o=e.history,a=e.sel,l="undo"==t?o.done:o.undone,s="undo"==t?o.undone:o.done,u=0;u<l.length&&(i=l[u],n?!i.ranges||i.equals(e.sel):i.ranges);u++);if(u!=l.length){for(o.lastOrigin=o.lastSelOrigin=null;;){if(!(i=l.pop()).ranges){if(r)return void l.push(i)
break}if(_i(i,s),n&&!i.equals(e.sel))return void Ji(e,i,{clearRedo:!1})
a=i}var c=[]
_i(a,s),s.push({changes:c,generation:o.generation}),o.generation=i.generation||++o.maxGeneration
for(var f=ye(e,"beforeChange")||e.cm&&ye(e.cm,"beforeChange"),d=function(n){var r=i.changes[n]
if(r.origin=t,f&&!so(e,r,!1))return l.length=0,{}
c.push(Ri(e,r))
var o=n?Ni(e,r):K(l)
po(e,r,o,Gi(e,r)),!n&&e.cm&&e.cm.scrollIntoView({from:r.from,to:Mi(r)})
var a=[]
Bi(e,(function(e,t){t||-1!=z(a,e.history)||(yo(e.history,r),a.push(e.history)),po(e,r,null,Gi(e,r))}))},h=i.changes.length-1;h>=0;--h){var p=d(h)
if(p)return p.v}}}}function ho(e,t){if(0!=t&&(e.first+=t,e.sel=new ki(Y(e.sel.ranges,(function(e){return new Si(tt(e.anchor.line+t,e.anchor.ch),tt(e.head.line+t,e.head.ch))})),e.sel.primIndex),e.cm)){dr(e.cm,e.first,e.first-t,t)
for(var n=e.cm.display,r=n.viewFrom;r<n.viewTo;r++)hr(e.cm,r,"gutter")}}function po(e,t,n,r){if(e.cm&&!e.cm.curOp)return ti(e.cm,po)(e,t,n,r)
if(t.to.line<e.first)ho(e,t.text.length-1-(t.to.line-t.from.line))
else if(!(t.from.line>e.lastLine())){if(t.from.line<e.first){var i=t.text.length-1-(e.first-t.from.line)
ho(e,i),t={from:tt(e.first,0),to:tt(t.to.line+i,t.to.ch),text:[K(t.text)],origin:t.origin}}var o=e.lastLine()
t.to.line>o&&(t={from:t.from,to:tt(o,$e(e,o).text.length),text:[t.text[0]],origin:t.origin}),t.removed=Xe(e,t.from,t.to),n||(n=Ni(e,t)),e.cm?function(e,t,n){var r=e.doc,i=e.display,o=t.from,a=t.to,l=!1,s=o.line
e.options.lineWrapping||(s=Ze(Rt($e(r,o.line))),r.iter(s,a.line+1,(function(e){if(e==i.maxLine)return l=!0,!0}))),r.sel.contains(t.from,t.to)>-1&&ve(e),Ii(r,t,n,sr(e)),e.options.lineWrapping||(r.iter(s,o.line+t.text.length,(function(e){var t=Gt(e)
t>i.maxLineLength&&(i.maxLine=e,i.maxLineLength=t,i.maxLineChanged=!0,l=!1)})),l&&(e.curOp.updateMaxLine=!0)),function(e,t){if(e.modeFrontier=Math.min(e.modeFrontier,t),!(e.highlightFrontier<t-10)){for(var n=e.first,r=t-1;r>n;r--){var i=$e(e,r).stateAfter
if(i&&(!(i instanceof ct)||r+i.lookAhead<t)){n=r+1
break}}e.highlightFrontier=Math.min(e.highlightFrontier,n)}}(r,o.line),ii(e,400)
var u=t.text.length-(a.line-o.line)-1
t.full?dr(e):o.line!=a.line||1!=t.text.length||Oi(e.doc,t)?dr(e,o.line,a.line+1,u):hr(e,o.line,"text")
var c=ye(e,"changes"),f=ye(e,"change")
if(f||c){var d={from:o,to:a,text:t.text,removed:t.removed,origin:t.origin}
f&&un(e,"change",e,d),c&&(e.curOp.changeObjs||(e.curOp.changeObjs=[])).push(d)}e.display.selForContextMenu=null}(e.cm,t,r):Ii(e,t,r),eo(e,n,U)}}function mo(e,t,n,r,i){var o
r||(r=n),nt(r,n)<0&&(n=(o=[r,n])[0],r=o[1]),"string"==typeof t&&(t=e.splitLines(t)),uo(e,{from:n,to:r,text:t,origin:i})}function go(e,t,n,r){n<e.line?e.line+=r:t<e.line&&(e.line=t,e.ch=0)}function vo(e,t,n,r){for(var i=0;i<e.length;++i){var o=e[i],a=!0
if(o.ranges){o.copied||((o=e[i]=o.deepCopy()).copied=!0)
for(var l=0;l<o.ranges.length;l++)go(o.ranges[l].anchor,t,n,r),go(o.ranges[l].head,t,n,r)}else{for(var s=0;s<o.changes.length;++s){var u=o.changes[s]
if(n<u.from.line)u.from=tt(u.from.line+r,u.from.ch),u.to=tt(u.to.line+r,u.to.ch)
else if(t<=u.to.line){a=!1
break}}a||(e.splice(0,i+1),i=0)}}}function yo(e,t){var n=t.from.line,r=t.to.line,i=t.text.length-(r-n)-1
vo(e.done,n,r,i),vo(e.undone,n,r,i)}function xo(e,t,n,r){var i=t,o=t
return"number"==typeof t?o=$e(e,lt(e,t)):i=Ze(t),null==i?null:(r(o,i)&&e.cm&&hr(e.cm,i,n),o)}function bo(e){this.lines=e,this.parent=null
for(var t=0,n=0;n<e.length;++n)e[n].parent=this,t+=e[n].height
this.height=t}function wo(e){this.children=e
for(var t=0,n=0,r=0;r<e.length;++r){var i=e[r]
t+=i.chunkSize(),n+=i.height,i.parent=this}this.size=t,this.height=n,this.parent=null}Si.prototype.from=function(){return at(this.anchor,this.head)},Si.prototype.to=function(){return ot(this.anchor,this.head)},Si.prototype.empty=function(){return this.head.line==this.anchor.line&&this.head.ch==this.anchor.ch},bo.prototype={chunkSize:function(){return this.lines.length},removeInner:function(e,t){for(var n=e,r=e+t;n<r;++n){var i=this.lines[n]
this.height-=i.height,Xt(i),un(i,"delete")}this.lines.splice(e,t)},collapse:function(e){e.push.apply(e,this.lines)},insertInner:function(e,t,n){this.height+=n,this.lines=this.lines.slice(0,e).concat(t).concat(this.lines.slice(e))
for(var r=0;r<t.length;++r)t[r].parent=this},iterN:function(e,t,n){for(var r=e+t;e<r;++e)if(n(this.lines[e]))return!0}},wo.prototype={chunkSize:function(){return this.size},removeInner:function(e,t){var n=this
this.size-=t
for(var r=0;r<this.children.length;++r){var i=n.children[r],o=i.chunkSize()
if(e<o){var a=Math.min(t,o-e),l=i.height
if(i.removeInner(e,a),n.height-=l-i.height,o==a&&(n.children.splice(r--,1),i.parent=null),0==(t-=a))break
e=0}else e-=o}if(this.size-t<25&&(this.children.length>1||!(this.children[0]instanceof bo))){var s=[]
this.collapse(s),this.children=[new bo(s)],this.children[0].parent=this}},collapse:function(e){for(var t=0;t<this.children.length;++t)this.children[t].collapse(e)},insertInner:function(e,t,n){var r=this
this.size+=t.length,this.height+=n
for(var i=0;i<this.children.length;++i){var o=r.children[i],a=o.chunkSize()
if(e<=a){if(o.insertInner(e,t,n),o.lines&&o.lines.length>50){for(var l=o.lines.length%25+25,s=l;s<o.lines.length;){var u=new bo(o.lines.slice(s,s+=25))
o.height-=u.height,r.children.splice(++i,0,u),u.parent=r}o.lines=o.lines.slice(0,l),r.maybeSpill()}break}e-=a}},maybeSpill:function(){if(!(this.children.length<=10)){var e=this
do{var t=new wo(e.children.splice(e.children.length-5,5))
if(e.parent){e.size-=t.size,e.height-=t.height
var n=z(e.parent.children,e)
e.parent.children.splice(n+1,0,t)}else{var r=new wo(e.children)
r.parent=e,e.children=[r,t],e=r}t.parent=e.parent}while(e.children.length>10)
e.parent.maybeSpill()}},iterN:function(e,t,n){for(var r=0;r<this.children.length;++r){var i=this.children[r],o=i.chunkSize()
if(e<o){var a=Math.min(t,o-e)
if(i.iterN(e,a,n))return!0
if(0==(t-=a))break
e=0}else e-=o}}}
var Co=function(e,t,n){if(n)for(var r in n)n.hasOwnProperty(r)&&(this[r]=n[r])
this.doc=e,this.node=t}
function ko(e,t,n){qt(t)<(e.curOp&&e.curOp.scrollTop||e.doc.scrollTop)&&Dr(e,n)}Co.prototype.clear=function(){var e=this.doc.cm,t=this.line.widgets,n=this.line,r=Ze(n)
if(null!=r&&t){for(var i=0;i<t.length;++i)t[i]==this&&t.splice(i--,1)
t.length||(n.widgets=null)
var o=Cn(this)
Ye(n,Math.max(0,n.height-o)),e&&(ei(e,(function(){ko(e,n,-o),hr(e,r,"widget")})),un(e,"lineWidgetCleared",e,this,r))}},Co.prototype.changed=function(){var e=this,t=this.height,n=this.doc.cm,r=this.line
this.height=null
var i=Cn(this)-t
i&&(_t(this.doc,r)||Ye(r,r.height+i),n&&ei(n,(function(){n.curOp.forceUpdate=!0,ko(n,r,i),un(n,"lineWidgetChanged",n,e,Ze(r))})))},xe(Co)
var So=0,Lo=function(e,t){this.lines=[],this.type=t,this.doc=e,this.id=++So}
function To(e,t,n,r,i){if(r&&r.shared)return function(e,t,n,r,i){(r=W(r)).shared=!1
var o=[To(e,t,n,r,i)],a=o[0],l=r.widgetNode
return Bi(e,(function(e){l&&(r.widgetNode=l.cloneNode(!0)),o.push(To(e,st(e,t),st(e,n),r,i))
for(var s=0;s<e.linked.length;++s)if(e.linked[s].isParent)return
a=K(o)})),new Mo(o,a)}(e,t,n,r,i)
if(e.cm&&!e.cm.curOp)return ti(e.cm,To)(e,t,n,r,i)
var o=new Lo(e,i),a=nt(t,n)
if(r&&W(r,o,!1),a>0||0==a&&!1!==o.clearWhenEmpty)return o
if(o.replacedWith&&(o.collapsed=!0,o.widgetNode=E("span",[o.replacedWith],"CodeMirror-widget"),r.handleMouseEvents||o.widgetNode.setAttribute("cm-ignore-events","true"),r.insertLeft&&(o.widgetNode.insertLeft=!0)),o.collapsed){if(Pt(e,t.line,t,n,o)||t.line!=n.line&&Pt(e,n.line,t,n,o))throw new Error("Inserting collapsed marker partially overlapping an existing one")
kt=!0}o.addToHistory&&ji(e,{from:t,to:n,origin:"markText"},e.sel,NaN)
var l,s=t.line,u=e.cm
if(e.iter(s,n.line+1,(function(e){u&&o.collapsed&&!u.options.lineWrapping&&Rt(e)==u.display.maxLine&&(l=!0),o.collapsed&&s!=t.line&&Ye(e,0),function(e,t){e.markedSpans=e.markedSpans?e.markedSpans.concat([t]):[t],t.marker.attachLine(e)}(e,new St(o,s==t.line?t.ch:null,s==n.line?n.ch:null)),++s})),o.collapsed&&e.iter(t.line,n.line+1,(function(t){_t(e,t)&&Ye(t,0)})),o.clearOnEnter&&de(o,"beforeCursorEnter",(function(){return o.clear()})),o.readOnly&&(Ct=!0,(e.history.done.length||e.history.undone.length)&&e.clearHistory()),o.collapsed&&(o.id=++So,o.atomic=!0),u){if(l&&(u.curOp.updateMaxLine=!0),o.collapsed)dr(u,t.line,n.line+1)
else if(o.className||o.startStyle||o.endStyle||o.css||o.attributes||o.title)for(var c=t.line;c<=n.line;c++)hr(u,c,"text")
o.atomic&&no(u.doc),un(u,"markerAdded",u,o)}return o}Lo.prototype.clear=function(){var e=this
if(!this.explicitlyCleared){var t=this.doc.cm,n=t&&!t.curOp
if(n&&$r(t),ye(this,"clear")){var r=this.find()
r&&un(this,"clear",r.from,r.to)}for(var i=null,o=null,a=0;a<this.lines.length;++a){var l=e.lines[a],s=Lt(l.markedSpans,e)
t&&!e.collapsed?hr(t,Ze(l),"text"):t&&(null!=s.to&&(o=Ze(l)),null!=s.from&&(i=Ze(l))),l.markedSpans=Tt(l.markedSpans,s),null==s.from&&e.collapsed&&!_t(e.doc,l)&&t&&Ye(l,ir(t.display))}if(t&&this.collapsed&&!t.options.lineWrapping)for(var u=0;u<this.lines.length;++u){var c=Rt(e.lines[u]),f=Gt(c)
f>t.display.maxLineLength&&(t.display.maxLine=c,t.display.maxLineLength=f,t.display.maxLineChanged=!0)}null!=i&&t&&this.collapsed&&dr(t,i,o+1),this.lines.length=0,this.explicitlyCleared=!0,this.atomic&&this.doc.cantEdit&&(this.doc.cantEdit=!1,t&&no(t.doc)),t&&un(t,"markerCleared",t,this,i,o),n&&Xr(t),this.parent&&this.parent.clear()}},Lo.prototype.find=function(e,t){var n,r
null==e&&"bookmark"==this.type&&(e=1)
for(var i=0;i<this.lines.length;++i){var o=this.lines[i],a=Lt(o.markedSpans,this)
if(null!=a.from&&(n=tt(t?o:Ze(o),a.from),-1==e))return n
if(null!=a.to&&(r=tt(t?o:Ze(o),a.to),1==e))return r}return n&&{from:n,to:r}},Lo.prototype.changed=function(){var e=this,t=this.find(-1,!0),n=this,r=this.doc.cm
t&&r&&ei(r,(function(){var i=t.line,o=Ze(t.line),a=Fn(r,o)
if(a&&(Rn(a),r.curOp.selectionChanged=r.curOp.forceUpdate=!0),r.curOp.updateMaxLine=!0,!_t(n.doc,i)&&null!=n.height){var l=n.height
n.height=null
var s=Cn(n)-l
s&&Ye(i,i.height+s)}un(r,"markerChanged",r,e)}))},Lo.prototype.attachLine=function(e){if(!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp
t.maybeHiddenMarkers&&-1!=z(t.maybeHiddenMarkers,this)||(t.maybeUnhiddenMarkers||(t.maybeUnhiddenMarkers=[])).push(this)}this.lines.push(e)},Lo.prototype.detachLine=function(e){if(this.lines.splice(z(this.lines,e),1),!this.lines.length&&this.doc.cm){var t=this.doc.cm.curOp;(t.maybeHiddenMarkers||(t.maybeHiddenMarkers=[])).push(this)}},xe(Lo)
var Mo=function(e,t){this.markers=e,this.primary=t
for(var n=0;n<e.length;++n)e[n].parent=this}
function Ao(e){return e.findMarks(tt(e.first,0),e.clipPos(tt(e.lastLine())),(function(e){return e.parent}))}function No(e){for(var t=function(t){var n=e[t],r=[n.primary.doc]
Bi(n.primary.doc,(function(e){return r.push(e)}))
for(var i=0;i<n.markers.length;i++){var o=n.markers[i];-1==z(r,o.doc)&&(o.parent=null,n.markers.splice(i--,1))}},n=0;n<e.length;n++)t(n)}Mo.prototype.clear=function(){if(!this.explicitlyCleared){this.explicitlyCleared=!0
for(var e=0;e<this.markers.length;++e)this.markers[e].clear()
un(this,"clear")}},Mo.prototype.find=function(e,t){return this.primary.find(e,t)},xe(Mo)
var Eo=0,Do=function(e,t,n,r,i){if(!(this instanceof Do))return new Do(e,t,n,r,i)
null==n&&(n=0),wo.call(this,[new bo([new $t("",null)])]),this.first=n,this.scrollTop=this.scrollLeft=0,this.cantEdit=!1,this.cleanGeneration=1,this.modeFrontier=this.highlightFrontier=n
var o=tt(n,0)
this.sel=Ti(o),this.history=new Pi(null),this.id=++Eo,this.modeOption=t,this.lineSep=r,this.direction="rtl"==i?"rtl":"ltr",this.extend=!1,"string"==typeof e&&(e=this.splitLines(e)),Ii(this,{from:o,to:o,text:e}),Ji(this,Ti(o),U)}
Do.prototype=Q(wo.prototype,{constructor:Do,iter:function(e,t,n){n?this.iterN(e-this.first,t-e,n):this.iterN(this.first,this.first+this.size,e)},insert:function(e,t){for(var n=0,r=0;r<t.length;++r)n+=t[r].height
this.insertInner(e-this.first,t,n)},remove:function(e,t){this.removeInner(e-this.first,t)},getValue:function(e){var t=Ke(this,this.first,this.first+this.size)
return!1===e?t:t.join(e||this.lineSeparator())},setValue:ri((function(e){var t=tt(this.first,0),n=this.first+this.size-1
uo(this,{from:t,to:tt(n,$e(this,n).text.length),text:this.splitLines(e),origin:"setValue",full:!0},!0),this.cm&&Or(this.cm,0,0),Ji(this,Ti(t),U)})),replaceRange:function(e,t,n,r){mo(this,e,t=st(this,t),n=n?st(this,n):t,r)},getRange:function(e,t,n){var r=Xe(this,st(this,e),st(this,t))
return!1===n?r:r.join(n||this.lineSeparator())},getLine:function(e){var t=this.getLineHandle(e)
return t&&t.text},getLineHandle:function(e){if(Je(this,e))return $e(this,e)},getLineNumber:function(e){return Ze(e)},getLineHandleVisualStart:function(e){return"number"==typeof e&&(e=$e(this,e)),Rt(e)},lineCount:function(){return this.size},firstLine:function(){return this.first},lastLine:function(){return this.first+this.size-1},clipPos:function(e){return st(this,e)},getCursor:function(e){var t=this.sel.primary()
return null==e||"head"==e?t.head:"anchor"==e?t.anchor:"end"==e||"to"==e||!1===e?t.to():t.from()},listSelections:function(){return this.sel.ranges},somethingSelected:function(){return this.sel.somethingSelected()},setCursor:ri((function(e,t,n){Zi(this,st(this,"number"==typeof e?tt(e,t||0):e),null,n)})),setSelection:ri((function(e,t,n){Zi(this,st(this,e),st(this,t||e),n)})),extendSelection:ri((function(e,t,n){Xi(this,st(this,e),t&&st(this,t),n)})),extendSelections:ri((function(e,t){Ki(this,ut(this,e),t)})),extendSelectionsBy:ri((function(e,t){Ki(this,ut(this,Y(this.sel.ranges,e)),t)})),setSelections:ri((function(e,t,n){if(e.length){for(var r=[],i=0;i<e.length;i++)r[i]=new Si(st(this,e[i].anchor),st(this,e[i].head))
null==t&&(t=Math.min(e.length-1,this.sel.primIndex)),Ji(this,Li(this.cm,r,t),n)}})),addSelection:ri((function(e,t,n){var r=this.sel.ranges.slice(0)
r.push(new Si(st(this,e),st(this,t||e))),Ji(this,Li(this.cm,r,r.length-1),n)})),getSelection:function(e){for(var t,n=this.sel.ranges,r=0;r<n.length;r++){var i=Xe(this,n[r].from(),n[r].to())
t=t?t.concat(i):i}return!1===e?t:t.join(e||this.lineSeparator())},getSelections:function(e){for(var t=[],n=this.sel.ranges,r=0;r<n.length;r++){var i=Xe(this,n[r].from(),n[r].to())
!1!==e&&(i=i.join(e||this.lineSeparator())),t[r]=i}return t},replaceSelection:function(e,t,n){for(var r=[],i=0;i<this.sel.ranges.length;i++)r[i]=e
this.replaceSelections(r,t,n||"+input")},replaceSelections:ri((function(e,t,n){for(var r=[],i=this.sel,o=0;o<i.ranges.length;o++){var a=i.ranges[o]
r[o]={from:a.from(),to:a.to(),text:this.splitLines(e[o]),origin:n}}for(var l=t&&"end"!=t&&function(e,t,n){for(var r=[],i=tt(e.first,0),o=i,a=0;a<t.length;a++){var l=t[a],s=Ei(l.from,i,o),u=Ei(Mi(l),i,o)
if(i=l.to,o=u,"around"==n){var c=e.sel.ranges[a],f=nt(c.head,c.anchor)<0
r[a]=new Si(f?u:s,f?s:u)}else r[a]=new Si(s,s)}return new ki(r,e.sel.primIndex)}(this,r,t),s=r.length-1;s>=0;s--)uo(this,r[s])
l?Qi(this,l):this.cm&&Fr(this.cm)})),undo:ri((function(){fo(this,"undo")})),redo:ri((function(){fo(this,"redo")})),undoSelection:ri((function(){fo(this,"undo",!0)})),redoSelection:ri((function(){fo(this,"redo",!0)})),setExtending:function(e){this.extend=e},getExtending:function(){return this.extend},historySize:function(){for(var e=this.history,t=0,n=0,r=0;r<e.done.length;r++)e.done[r].ranges||++t
for(var i=0;i<e.undone.length;i++)e.undone[i].ranges||++n
return{undo:t,redo:n}},clearHistory:function(){this.history=new Pi(this.history.maxGeneration)},markClean:function(){this.cleanGeneration=this.changeGeneration(!0)},changeGeneration:function(e){return e&&(this.history.lastOp=this.history.lastSelOp=this.history.lastOrigin=null),this.history.generation},isClean:function(e){return this.history.generation==(e||this.cleanGeneration)},getHistory:function(){return{done:Vi(this.history.done),undone:Vi(this.history.undone)}},setHistory:function(e){var t=this.history=new Pi(this.history.maxGeneration)
t.done=Vi(e.done.slice(0),null,!0),t.undone=Vi(e.undone.slice(0),null,!0)},setGutterMarker:ri((function(e,t,n){return xo(this,e,"gutter",(function(e){var r=e.gutterMarkers||(e.gutterMarkers={})
return r[t]=n,!n&&ne(r)&&(e.gutterMarkers=null),!0}))})),clearGutter:ri((function(e){var t=this
this.iter((function(n){n.gutterMarkers&&n.gutterMarkers[e]&&xo(t,n,"gutter",(function(){return n.gutterMarkers[e]=null,ne(n.gutterMarkers)&&(n.gutterMarkers=null),!0}))}))})),lineInfo:function(e){var t
if("number"==typeof e){if(!Je(this,e))return null
if(t=e,!(e=$e(this,e)))return null}else if(null==(t=Ze(e)))return null
return{line:t,handle:e,text:e.text,gutterMarkers:e.gutterMarkers,textClass:e.textClass,bgClass:e.bgClass,wrapClass:e.wrapClass,widgets:e.widgets}},addLineClass:ri((function(e,t,n){return xo(this,e,"gutter"==t?"gutter":"class",(function(e){var r="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass"
if(e[r]){if(S(n).test(e[r]))return!1
e[r]+=" "+n}else e[r]=n
return!0}))})),removeLineClass:ri((function(e,t,n){return xo(this,e,"gutter"==t?"gutter":"class",(function(e){var r="text"==t?"textClass":"background"==t?"bgClass":"gutter"==t?"gutterClass":"wrapClass",i=e[r]
if(!i)return!1
if(null==n)e[r]=null
else{var o=i.match(S(n))
if(!o)return!1
var a=o.index+o[0].length
e[r]=i.slice(0,o.index)+(o.index&&a!=i.length?" ":"")+i.slice(a)||null}return!0}))})),addLineWidget:ri((function(e,t,n){return function(e,t,n,r){var i=new Co(e,n,r),o=e.cm
return o&&i.noHScroll&&(o.display.alignWidgets=!0),xo(e,t,"widget",(function(t){var n=t.widgets||(t.widgets=[])
if(null==i.insertAt?n.push(i):n.splice(Math.min(n.length-1,Math.max(0,i.insertAt)),0,i),i.line=t,o&&!_t(e,t)){var r=qt(t)<e.scrollTop
Ye(t,t.height+Cn(i)),r&&Dr(o,i.height),o.curOp.forceUpdate=!0}return!0})),o&&un(o,"lineWidgetAdded",o,i,"number"==typeof t?t:Ze(t)),i}(this,e,t,n)})),removeLineWidget:function(e){e.clear()},markText:function(e,t,n){return To(this,st(this,e),st(this,t),n,n&&n.type||"range")},setBookmark:function(e,t){var n={replacedWith:t&&(null==t.nodeType?t.widget:t),insertLeft:t&&t.insertLeft,clearWhenEmpty:!1,shared:t&&t.shared,handleMouseEvents:t&&t.handleMouseEvents}
return To(this,e=st(this,e),e,n,"bookmark")},findMarksAt:function(e){var t=[],n=$e(this,(e=st(this,e)).line).markedSpans
if(n)for(var r=0;r<n.length;++r){var i=n[r];(null==i.from||i.from<=e.ch)&&(null==i.to||i.to>=e.ch)&&t.push(i.marker.parent||i.marker)}return t},findMarks:function(e,t,n){e=st(this,e),t=st(this,t)
var r=[],i=e.line
return this.iter(e.line,t.line+1,(function(o){var a=o.markedSpans
if(a)for(var l=0;l<a.length;l++){var s=a[l]
null!=s.to&&i==e.line&&e.ch>=s.to||null==s.from&&i!=e.line||null!=s.from&&i==t.line&&s.from>=t.ch||n&&!n(s.marker)||r.push(s.marker.parent||s.marker)}++i})),r},getAllMarks:function(){var e=[]
return this.iter((function(t){var n=t.markedSpans
if(n)for(var r=0;r<n.length;++r)null!=n[r].from&&e.push(n[r].marker)})),e},posFromIndex:function(e){var t,n=this.first,r=this.lineSeparator().length
return this.iter((function(i){var o=i.text.length+r
if(o>e)return t=e,!0
e-=o,++n})),st(this,tt(n,t))},indexFromPos:function(e){var t=(e=st(this,e)).ch
if(e.line<this.first||e.ch<0)return 0
var n=this.lineSeparator().length
return this.iter(this.first,e.line,(function(e){t+=e.text.length+n})),t},copy:function(e){var t=new Do(Ke(this,this.first,this.first+this.size),this.modeOption,this.first,this.lineSep,this.direction)
return t.scrollTop=this.scrollTop,t.scrollLeft=this.scrollLeft,t.sel=this.sel,t.extend=!1,e&&(t.history.undoDepth=this.history.undoDepth,t.setHistory(this.getHistory())),t},linkedDoc:function(e){e||(e={})
var t=this.first,n=this.first+this.size
null!=e.from&&e.from>t&&(t=e.from),null!=e.to&&e.to<n&&(n=e.to)
var r=new Do(Ke(this,t,n),e.mode||this.modeOption,t,this.lineSep,this.direction)
return e.sharedHist&&(r.history=this.history),(this.linked||(this.linked=[])).push({doc:r,sharedHist:e.sharedHist}),r.linked=[{doc:this,isParent:!0,sharedHist:e.sharedHist}],function(e,t){for(var n=0;n<t.length;n++){var r=t[n],i=r.find(),o=e.clipPos(i.from),a=e.clipPos(i.to)
if(nt(o,a)){var l=To(e,o,a,r.primary,r.primary.type)
r.markers.push(l),l.parent=r}}}(r,Ao(this)),r},unlinkDoc:function(e){var t=this
if(e instanceof La&&(e=e.doc),this.linked)for(var n=0;n<this.linked.length;++n)if(t.linked[n].doc==e){t.linked.splice(n,1),e.unlinkDoc(t),No(Ao(t))
break}if(e.history==this.history){var r=[e.id]
Bi(e,(function(e){return r.push(e.id)}),!0),e.history=new Pi(null),e.history.done=Vi(this.history.done,r),e.history.undone=Vi(this.history.undone,r)}},iterLinkedDocs:function(e){Bi(this,e)},getMode:function(){return this.mode},getEditor:function(){return this.cm},splitLines:function(e){return this.lineSep?e.split(this.lineSep):Fe(e)},lineSeparator:function(){return this.lineSep||"\n"},setDirection:ri((function(e){var t
"rtl"!=e&&(e="ltr"),e!=this.direction&&(this.direction=e,this.iter((function(e){return e.order=null})),this.cm&&ei(t=this.cm,(function(){Wi(t),dr(t)})))}))}),Do.prototype.eachLine=Do.prototype.iter
var Fo=0
function Oo(e){var t=this
if(Io(t),!ge(t,e)&&!kn(t.display,e)){be(e),a&&(Fo=+new Date)
var n=cr(t,e,!0),r=e.dataTransfer.files
if(n&&!t.isReadOnly())if(r&&r.length&&window.FileReader&&window.File)for(var i=r.length,o=Array(i),l=0,s=function(e,r){if(!t.options.allowDropFileTypes||-1!=z(t.options.allowDropFileTypes,e.type)){var a=new FileReader
a.onload=ti(t,(function(){var e=a.result
if(/[\x00-\x08\x0e-\x1f]{2}/.test(e)&&(e=""),o[r]=e,++l==i){var s={from:n=st(t.doc,n),to:n,text:t.doc.splitLines(o.join(t.doc.lineSeparator())),origin:"paste"}
uo(t.doc,s),Qi(t.doc,Ti(n,Mi(s)))}})),a.readAsText(e)}},u=0;u<i;++u)s(r[u],u)
else{if(t.state.draggingText&&t.doc.sel.contains(n)>-1)return t.state.draggingText(e),void setTimeout((function(){return t.display.input.focus()}),20)
try{var c=e.dataTransfer.getData("Text")
if(c){var f
if(t.state.draggingText&&!t.state.draggingText.copy&&(f=t.listSelections()),eo(t.doc,Ti(n,n)),f)for(var d=0;d<f.length;++d)mo(t.doc,"",f[d].anchor,f[d].head,"drag")
t.replaceSelection(c,"around","paste"),t.display.input.focus()}}catch(e){}}}}function Io(e){e.display.dragCursor&&(e.display.lineSpace.removeChild(e.display.dragCursor),e.display.dragCursor=null)}function Bo(e){if(document.getElementsByClassName){for(var t=document.getElementsByClassName("CodeMirror"),n=[],r=0;r<t.length;r++){var i=t[r].CodeMirror
i&&n.push(i)}n.length&&n[0].operation((function(){for(var t=0;t<n.length;t++)e(n[t])}))}}var Ho=!1
function Wo(e){var t=e.display
t.cachedCharWidth=t.cachedTextHeight=t.cachedPaddingH=null,t.scrollbarsClipped=!1,e.setSize()}for(var Po={3:"Pause",8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause",20:"CapsLock",27:"Esc",32:"Space",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",44:"PrintScrn",45:"Insert",46:"Delete",59:";",61:"=",91:"Mod",92:"Mod",93:"Mod",106:"*",107:"=",109:"-",110:".",111:"/",145:"ScrollLock",173:"-",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'",63232:"Up",63233:"Down",63234:"Left",63235:"Right",63272:"Delete",63273:"Home",63275:"End",63276:"PageUp",63277:"PageDown",63302:"Insert"},Ro=0;Ro<10;Ro++)Po[Ro+48]=Po[Ro+96]=String(Ro)
for(var zo=65;zo<=90;zo++)Po[zo]=String.fromCharCode(zo)
for(var jo=1;jo<=12;jo++)Po[jo+111]=Po[jo+63235]="F"+jo
var _o={}
function Uo(e){var t,n,r,i,o=e.split(/-(?!$)/)
e=o[o.length-1]
for(var a=0;a<o.length-1;a++){var l=o[a]
if(/^(cmd|meta|m)$/i.test(l))i=!0
else if(/^a(lt)?$/i.test(l))t=!0
else if(/^(c|ctrl|control)$/i.test(l))n=!0
else{if(!/^s(hift)?$/i.test(l))throw new Error("Unrecognized modifier name: "+l)
r=!0}}return t&&(e="Alt-"+e),n&&(e="Ctrl-"+e),i&&(e="Cmd-"+e),r&&(e="Shift-"+e),e}function qo(e){var t={}
for(var n in e)if(e.hasOwnProperty(n)){var r=e[n]
if(/^(name|fallthrough|(de|at)tach)$/.test(n))continue
if("..."==r){delete e[n]
continue}for(var i=Y(n.split(" "),Uo),o=0;o<i.length;o++){var a=void 0,l=void 0
o==i.length-1?(l=i.join(" "),a=r):(l=i.slice(0,o+1).join(" "),a="...")
var s=t[l]
if(s){if(s!=a)throw new Error("Inconsistent bindings for "+l)}else t[l]=a}delete e[n]}for(var u in t)e[u]=t[u]
return e}function Go(e,t,n,r){var i=(t=Ko(t)).call?t.call(e,r):t[e]
if(!1===i)return"nothing"
if("..."===i)return"multi"
if(null!=i&&n(i))return"handled"
if(t.fallthrough){if("[object Array]"!=Object.prototype.toString.call(t.fallthrough))return Go(e,t.fallthrough,n,r)
for(var o=0;o<t.fallthrough.length;o++){var a=Go(e,t.fallthrough[o],n,r)
if(a)return a}}}function Vo(e){var t="string"==typeof e?e:Po[e.keyCode]
return"Ctrl"==t||"Alt"==t||"Shift"==t||"Mod"==t}function $o(e,t,n){var r=e
return t.altKey&&"Alt"!=r&&(e="Alt-"+e),(C?t.metaKey:t.ctrlKey)&&"Ctrl"!=r&&(e="Ctrl-"+e),(C?t.ctrlKey:t.metaKey)&&"Cmd"!=r&&(e="Cmd-"+e),!n&&t.shiftKey&&"Shift"!=r&&(e="Shift-"+e),e}function Xo(e,t){if(f&&34==e.keyCode&&e.char)return!1
var n=Po[e.keyCode]
return null!=n&&!e.altGraphKey&&(3==e.keyCode&&e.code&&(n=e.code),$o(n,e,t))}function Ko(e){return"string"==typeof e?_o[e]:e}function Yo(e,t){for(var n=e.doc.sel.ranges,r=[],i=0;i<n.length;i++){for(var o=t(n[i]);r.length&&nt(o.from,K(r).to)<=0;){var a=r.pop()
if(nt(a.from,o.from)<0){o.from=a.from
break}}r.push(o)}ei(e,(function(){for(var t=r.length-1;t>=0;t--)mo(e.doc,"",r[t].from,r[t].to,"+delete")
Fr(e)}))}function Zo(e,t,n){var r=oe(e.text,t+n,n)
return r<0||r>e.text.length?null:r}function Qo(e,t,n){var r=Zo(e,t.ch,n)
return null==r?null:new tt(t.line,r,n<0?"after":"before")}function Jo(e,t,n,r,i){if(e){var o=ce(n,t.doc.direction)
if(o){var a,l=i<0?K(o):o[0],s=i<0==(1==l.level)?"after":"before"
if(l.level>0||"rtl"==t.doc.direction){var u=On(t,n)
a=i<0?n.text.length-1:0
var c=In(t,u,a).top
a=ae((function(e){return In(t,u,e).top==c}),i<0==(1==l.level)?l.from:l.to-1,a),"before"==s&&(a=Zo(n,a,1))}else a=i<0?l.to:l.from
return new tt(r,a,s)}}return new tt(r,i<0?n.text.length:0,i<0?"before":"after")}_o.basic={Left:"goCharLeft",Right:"goCharRight",Up:"goLineUp",Down:"goLineDown",End:"goLineEnd",Home:"goLineStartSmart",PageUp:"goPageUp",PageDown:"goPageDown",Delete:"delCharAfter",Backspace:"delCharBefore","Shift-Backspace":"delCharBefore",Tab:"defaultTab","Shift-Tab":"indentAuto",Enter:"newlineAndIndent",Insert:"toggleOverwrite",Esc:"singleSelection"},_o.pcDefault={"Ctrl-A":"selectAll","Ctrl-D":"deleteLine","Ctrl-Z":"undo","Shift-Ctrl-Z":"redo","Ctrl-Y":"redo","Ctrl-Home":"goDocStart","Ctrl-End":"goDocEnd","Ctrl-Up":"goLineUp","Ctrl-Down":"goLineDown","Ctrl-Left":"goGroupLeft","Ctrl-Right":"goGroupRight","Alt-Left":"goLineStart","Alt-Right":"goLineEnd","Ctrl-Backspace":"delGroupBefore","Ctrl-Delete":"delGroupAfter","Ctrl-S":"save","Ctrl-F":"find","Ctrl-G":"findNext","Shift-Ctrl-G":"findPrev","Shift-Ctrl-F":"replace","Shift-Ctrl-R":"replaceAll","Ctrl-[":"indentLess","Ctrl-]":"indentMore","Ctrl-U":"undoSelection","Shift-Ctrl-U":"redoSelection","Alt-U":"redoSelection",fallthrough:"basic"},_o.emacsy={"Ctrl-F":"goCharRight","Ctrl-B":"goCharLeft","Ctrl-P":"goLineUp","Ctrl-N":"goLineDown","Alt-F":"goWordRight","Alt-B":"goWordLeft","Ctrl-A":"goLineStart","Ctrl-E":"goLineEnd","Ctrl-V":"goPageDown","Shift-Ctrl-V":"goPageUp","Ctrl-D":"delCharAfter","Ctrl-H":"delCharBefore","Alt-D":"delWordAfter","Alt-Backspace":"delWordBefore","Ctrl-K":"killLine","Ctrl-T":"transposeChars","Ctrl-O":"openLine"},_o.macDefault={"Cmd-A":"selectAll","Cmd-D":"deleteLine","Cmd-Z":"undo","Shift-Cmd-Z":"redo","Cmd-Y":"redo","Cmd-Home":"goDocStart","Cmd-Up":"goDocStart","Cmd-End":"goDocEnd","Cmd-Down":"goDocEnd","Alt-Left":"goGroupLeft","Alt-Right":"goGroupRight","Cmd-Left":"goLineLeft","Cmd-Right":"goLineRight","Alt-Backspace":"delGroupBefore","Ctrl-Alt-Backspace":"delGroupAfter","Alt-Delete":"delGroupAfter","Cmd-S":"save","Cmd-F":"find","Cmd-G":"findNext","Shift-Cmd-G":"findPrev","Cmd-Alt-F":"replace","Shift-Cmd-Alt-F":"replaceAll","Cmd-[":"indentLess","Cmd-]":"indentMore","Cmd-Backspace":"delWrappedLineLeft","Cmd-Delete":"delWrappedLineRight","Cmd-U":"undoSelection","Shift-Cmd-U":"redoSelection","Ctrl-Up":"goDocStart","Ctrl-Down":"goDocEnd",fallthrough:["basic","emacsy"]},_o.default=y?_o.macDefault:_o.pcDefault
var ea={selectAll:lo,singleSelection:function(e){return e.setSelection(e.getCursor("anchor"),e.getCursor("head"),U)},killLine:function(e){return Yo(e,(function(t){if(t.empty()){var n=$e(e.doc,t.head.line).text.length
return t.head.ch==n&&t.head.line<e.lastLine()?{from:t.head,to:tt(t.head.line+1,0)}:{from:t.head,to:tt(t.head.line,n)}}return{from:t.from(),to:t.to()}}))},deleteLine:function(e){return Yo(e,(function(t){return{from:tt(t.from().line,0),to:st(e.doc,tt(t.to().line+1,0))}}))},delLineLeft:function(e){return Yo(e,(function(e){return{from:tt(e.from().line,0),to:e.from()}}))},delWrappedLineLeft:function(e){return Yo(e,(function(t){var n=e.charCoords(t.head,"div").top+5
return{from:e.coordsChar({left:0,top:n},"div"),to:t.from()}}))},delWrappedLineRight:function(e){return Yo(e,(function(t){var n=e.charCoords(t.head,"div").top+5,r=e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:n},"div")
return{from:t.from(),to:r}}))},undo:function(e){return e.undo()},redo:function(e){return e.redo()},undoSelection:function(e){return e.undoSelection()},redoSelection:function(e){return e.redoSelection()},goDocStart:function(e){return e.extendSelection(tt(e.firstLine(),0))},goDocEnd:function(e){return e.extendSelection(tt(e.lastLine()))},goLineStart:function(e){return e.extendSelectionsBy((function(t){return ta(e,t.head.line)}),{origin:"+move",bias:1})},goLineStartSmart:function(e){return e.extendSelectionsBy((function(t){return na(e,t.head)}),{origin:"+move",bias:1})},goLineEnd:function(e){return e.extendSelectionsBy((function(t){return function(e,t){var n=$e(e.doc,t),r=function(e){for(var t;t=Ht(e);)e=t.find(1,!0).line
return e}(n)
return r!=n&&(t=Ze(r)),Jo(!0,e,n,t,-1)}(e,t.head.line)}),{origin:"+move",bias:-1})},goLineRight:function(e){return e.extendSelectionsBy((function(t){var n=e.cursorCoords(t.head,"div").top+5
return e.coordsChar({left:e.display.lineDiv.offsetWidth+100,top:n},"div")}),G)},goLineLeft:function(e){return e.extendSelectionsBy((function(t){var n=e.cursorCoords(t.head,"div").top+5
return e.coordsChar({left:0,top:n},"div")}),G)},goLineLeftSmart:function(e){return e.extendSelectionsBy((function(t){var n=e.cursorCoords(t.head,"div").top+5,r=e.coordsChar({left:0,top:n},"div")
return r.ch<e.getLine(r.line).search(/\S/)?na(e,t.head):r}),G)},goLineUp:function(e){return e.moveV(-1,"line")},goLineDown:function(e){return e.moveV(1,"line")},goPageUp:function(e){return e.moveV(-1,"page")},goPageDown:function(e){return e.moveV(1,"page")},goCharLeft:function(e){return e.moveH(-1,"char")},goCharRight:function(e){return e.moveH(1,"char")},goColumnLeft:function(e){return e.moveH(-1,"column")},goColumnRight:function(e){return e.moveH(1,"column")},goWordLeft:function(e){return e.moveH(-1,"word")},goGroupRight:function(e){return e.moveH(1,"group")},goGroupLeft:function(e){return e.moveH(-1,"group")},goWordRight:function(e){return e.moveH(1,"word")},delCharBefore:function(e){return e.deleteH(-1,"char")},delCharAfter:function(e){return e.deleteH(1,"char")},delWordBefore:function(e){return e.deleteH(-1,"word")},delWordAfter:function(e){return e.deleteH(1,"word")},delGroupBefore:function(e){return e.deleteH(-1,"group")},delGroupAfter:function(e){return e.deleteH(1,"group")},indentAuto:function(e){return e.indentSelection("smart")},indentMore:function(e){return e.indentSelection("add")},indentLess:function(e){return e.indentSelection("subtract")},insertTab:function(e){return e.replaceSelection("\t")},insertSoftTab:function(e){for(var t=[],n=e.listSelections(),r=e.options.tabSize,i=0;i<n.length;i++){var o=n[i].from(),a=P(e.getLine(o.line),o.ch,r)
t.push(X(r-a%r))}e.replaceSelections(t)},defaultTab:function(e){e.somethingSelected()?e.indentSelection("add"):e.execCommand("insertTab")},transposeChars:function(e){return ei(e,(function(){for(var t=e.listSelections(),n=[],r=0;r<t.length;r++)if(t[r].empty()){var i=t[r].head,o=$e(e.doc,i.line).text
if(o)if(i.ch==o.length&&(i=new tt(i.line,i.ch-1)),i.ch>0)i=new tt(i.line,i.ch+1),e.replaceRange(o.charAt(i.ch-1)+o.charAt(i.ch-2),tt(i.line,i.ch-2),i,"+transpose")
else if(i.line>e.doc.first){var a=$e(e.doc,i.line-1).text
a&&(i=new tt(i.line,1),e.replaceRange(o.charAt(0)+e.doc.lineSeparator()+a.charAt(a.length-1),tt(i.line-1,a.length-1),i,"+transpose"))}n.push(new Si(i,i))}e.setSelections(n)}))},newlineAndIndent:function(e){return ei(e,(function(){for(var t=e.listSelections(),n=t.length-1;n>=0;n--)e.replaceRange(e.doc.lineSeparator(),t[n].anchor,t[n].head,"+input")
t=e.listSelections()
for(var r=0;r<t.length;r++)e.indentLine(t[r].from().line,null,!0)
Fr(e)}))},openLine:function(e){return e.replaceSelection("\n","start")},toggleOverwrite:function(e){return e.toggleOverwrite()}}
function ta(e,t){var n=$e(e.doc,t),r=Rt(n)
return r!=n&&(t=Ze(r)),Jo(!0,e,r,t,1)}function na(e,t){var n=ta(e,t.line),r=$e(e.doc,n.line),i=ce(r,e.doc.direction)
if(!i||0==i[0].level){var o=Math.max(0,r.text.search(/\S/)),a=t.line==n.line&&t.ch<=o&&t.ch
return tt(n.line,a?0:o,n.sticky)}return n}function ra(e,t,n){if("string"==typeof t&&!(t=ea[t]))return!1
e.display.input.ensurePolled()
var r=e.display.shift,i=!1
try{e.isReadOnly()&&(e.state.suppressEdits=!0),n&&(e.display.shift=!1),i=t(e)!=_}finally{e.display.shift=r,e.state.suppressEdits=!1}return i}var ia=new R
function oa(e,t,n,r){var i=e.state.keySeq
if(i){if(Vo(t))return"handled"
if(/\'$/.test(t)?e.state.keySeq=null:ia.set(50,(function(){e.state.keySeq==i&&(e.state.keySeq=null,e.display.input.reset())})),aa(e,i+" "+t,n,r))return!0}return aa(e,t,n,r)}function aa(e,t,n,r){var i=function(e,t,n){for(var r=0;r<e.state.keyMaps.length;r++){var i=Go(t,e.state.keyMaps[r],n,e)
if(i)return i}return e.options.extraKeys&&Go(t,e.options.extraKeys,n,e)||Go(t,e.options.keyMap,n,e)}(e,t,r)
return"multi"==i&&(e.state.keySeq=t),"handled"==i&&un(e,"keyHandled",e,t,n),"handled"!=i&&"multi"!=i||(be(n),Cr(e)),!!i}function la(e,t){var n=Xo(t,!0)
return!!n&&(t.shiftKey&&!e.state.keySeq?oa(e,"Shift-"+n,t,(function(t){return ra(e,t,!0)}))||oa(e,n,t,(function(t){if("string"==typeof t?/^go[A-Z]/.test(t):t.motion)return ra(e,t)})):oa(e,n,t,(function(t){return ra(e,t)})))}var sa=null
function ua(e){var t=this
if(t.curOp.focus=F(),!ge(t,e)){a&&l<11&&27==e.keyCode&&(e.returnValue=!1)
var n=e.keyCode
t.display.shift=16==n||e.shiftKey
var r=la(t,e)
f&&(sa=r?n:null,r||88!=n||Ie||!(y?e.metaKey:e.ctrlKey)||t.replaceSelection("",null,"cut")),18!=n||/\bCodeMirror-crosshair\b/.test(t.display.lineDiv.className)||function(e){var t=e.display.lineDiv
function n(e){18!=e.keyCode&&e.altKey||(T(t,"CodeMirror-crosshair"),pe(document,"keyup",n),pe(document,"mouseover",n))}O(t,"CodeMirror-crosshair"),de(document,"keyup",n),de(document,"mouseover",n)}(t)}}function ca(e){16==e.keyCode&&(this.doc.sel.shift=!1),ge(this,e)}function fa(e){var t=this
if(!(kn(t.display,e)||ge(t,e)||e.ctrlKey&&!e.altKey||y&&e.metaKey)){var n=e.keyCode,r=e.charCode
if(f&&n==sa)return sa=null,void be(e)
if(!f||e.which&&!(e.which<10)||!la(t,e)){var i=String.fromCharCode(null==r?n:r)
"\b"!=i&&(function(e,t,n){return oa(e,"'"+n+"'",t,(function(t){return ra(e,t,!0)}))}(t,e,i)||t.display.input.onKeyPress(e))}}}var da,ha,pa=function(e,t,n){this.time=e,this.pos=t,this.button=n}
function ma(e){var t=this,n=t.display
if(!(ge(t,e)||n.activeTouch&&n.input.supportsTouch()))if(n.input.ensurePolled(),n.shift=e.shiftKey,kn(n,e))s||(n.scroller.draggable=!1,setTimeout((function(){return n.scroller.draggable=!0}),100))
else if(!ya(t,e)){var r=cr(t,e),i=Le(e),o=r?function(e,t){var n=+new Date
return ha&&ha.compare(n,e,t)?(da=ha=null,"triple"):da&&da.compare(n,e,t)?(ha=new pa(n,e,t),da=null,"double"):(da=new pa(n,e,t),ha=null,"single")}(r,i):"single"
window.focus(),1==i&&t.state.selectingText&&t.state.selectingText(e),r&&function(e,t,n,r,i){var o="Click"
return"double"==r?o="Double"+o:"triple"==r&&(o="Triple"+o),oa(e,$o(o=(1==t?"Left":2==t?"Middle":"Right")+o,i),i,(function(t){if("string"==typeof t&&(t=ea[t]),!t)return!1
var r=!1
try{e.isReadOnly()&&(e.state.suppressEdits=!0),r=t(e,n)!=_}finally{e.state.suppressEdits=!1}return r}))}(t,i,r,o,e)||(1==i?r?function(e,t,n,r){a?setTimeout(H(kr,e),0):e.curOp.focus=F()
var i,o=function(e,t,n){var r=e.getOption("configureMouse"),i=r?r(e,t,n):{}
if(null==i.unit){var o=x?n.shiftKey&&n.metaKey:n.altKey
i.unit=o?"rectangle":"single"==t?"char":"double"==t?"word":"line"}return(null==i.extend||e.doc.extend)&&(i.extend=e.doc.extend||n.shiftKey),null==i.addNew&&(i.addNew=y?n.metaKey:n.ctrlKey),null==i.moveOnDrag&&(i.moveOnDrag=!(y?n.altKey:n.ctrlKey)),i}(e,n,r),u=e.doc.sel
e.options.dragDrop&&Ae&&!e.isReadOnly()&&"single"==n&&(i=u.contains(t))>-1&&(nt((i=u.ranges[i]).from(),t)<0||t.xRel>0)&&(nt(i.to(),t)>0||t.xRel<0)?function(e,t,n,r){var i=e.display,o=!1,u=ti(e,(function(t){s&&(i.scroller.draggable=!1),e.state.draggingText=!1,pe(i.wrapper.ownerDocument,"mouseup",u),pe(i.wrapper.ownerDocument,"mousemove",c),pe(i.scroller,"dragstart",f),pe(i.scroller,"drop",u),o||(be(t),r.addNew||Xi(e.doc,n,null,null,r.extend),s||a&&9==l?setTimeout((function(){i.wrapper.ownerDocument.body.focus(),i.input.focus()}),20):i.input.focus())})),c=function(e){o=o||Math.abs(t.clientX-e.clientX)+Math.abs(t.clientY-e.clientY)>=10},f=function(){return o=!0}
s&&(i.scroller.draggable=!0),e.state.draggingText=u,u.copy=!r.moveOnDrag,i.scroller.dragDrop&&i.scroller.dragDrop(),de(i.wrapper.ownerDocument,"mouseup",u),de(i.wrapper.ownerDocument,"mousemove",c),de(i.scroller,"dragstart",f),de(i.scroller,"drop",u),Sr(e),setTimeout((function(){return i.input.focus()}),20)}(e,r,t,o):function(e,t,n,r){var i=e.display,o=e.doc
be(t)
var a,l,s=o.sel,u=s.ranges
if(r.addNew&&!r.extend?(l=o.sel.contains(n),a=l>-1?u[l]:new Si(n,n)):(a=o.sel.primary(),l=o.sel.primIndex),"rectangle"==r.unit)r.addNew||(a=new Si(n,n)),n=cr(e,t,!0,!0),l=-1
else{var c=ga(e,n,r.unit)
a=r.extend?$i(a,c.anchor,c.head,r.extend):c}r.addNew?-1==l?(l=u.length,Ji(o,Li(e,u.concat([a]),l),{scroll:!1,origin:"*mouse"})):u.length>1&&u[l].empty()&&"char"==r.unit&&!r.extend?(Ji(o,Li(e,u.slice(0,l).concat(u.slice(l+1)),0),{scroll:!1,origin:"*mouse"}),s=o.sel):Yi(o,l,a,q):(l=0,Ji(o,new ki([a],0),q),s=o.sel)
var f=n
function d(t){if(0!=nt(f,t))if(f=t,"rectangle"==r.unit){for(var i=[],u=e.options.tabSize,c=P($e(o,n.line).text,n.ch,u),d=P($e(o,t.line).text,t.ch,u),h=Math.min(c,d),p=Math.max(c,d),m=Math.min(n.line,t.line),g=Math.min(e.lastLine(),Math.max(n.line,t.line));m<=g;m++){var v=$e(o,m).text,y=V(v,h,u)
h==p?i.push(new Si(tt(m,y),tt(m,y))):v.length>y&&i.push(new Si(tt(m,y),tt(m,V(v,p,u))))}i.length||i.push(new Si(n,n)),Ji(o,Li(e,s.ranges.slice(0,l).concat(i),l),{origin:"*mouse",scroll:!1}),e.scrollIntoView(t)}else{var x,b=a,w=ga(e,t,r.unit),C=b.anchor
nt(w.anchor,C)>0?(x=w.head,C=at(b.from(),w.anchor)):(x=w.anchor,C=ot(b.to(),w.head))
var k=s.ranges.slice(0)
k[l]=function(e,t){var n=t.anchor,r=t.head,i=$e(e.doc,n.line)
if(0==nt(n,r)&&n.sticky==r.sticky)return t
var o=ce(i)
if(!o)return t
var a=se(o,n.ch,n.sticky),l=o[a]
if(l.from!=n.ch&&l.to!=n.ch)return t
var s,u=a+(l.from==n.ch==(1!=l.level)?0:1)
if(0==u||u==o.length)return t
if(r.line!=n.line)s=(r.line-n.line)*("ltr"==e.doc.direction?1:-1)>0
else{var c=se(o,r.ch,r.sticky),f=c-a||(r.ch-n.ch)*(1==l.level?-1:1)
s=c==u-1||c==u?f<0:f>0}var d=o[u+(s?-1:0)],h=s==(1==d.level),p=h?d.from:d.to,m=h?"after":"before"
return n.ch==p&&n.sticky==m?t:new Si(new tt(n.line,p,m),r)}(e,new Si(st(o,C),x)),Ji(o,Li(e,k,l),q)}}var h=i.wrapper.getBoundingClientRect(),p=0
function m(t){var n=++p,a=cr(e,t,!0,"rectangle"==r.unit)
if(a)if(0!=nt(a,f)){e.curOp.focus=F(),d(a)
var l=Nr(i,o);(a.line>=l.to||a.line<l.from)&&setTimeout(ti(e,(function(){p==n&&m(t)})),150)}else{var s=t.clientY<h.top?-20:t.clientY>h.bottom?20:0
s&&setTimeout(ti(e,(function(){p==n&&(i.scroller.scrollTop+=s,m(t))})),50)}}function g(t){e.state.selectingText=!1,p=1/0,t&&(be(t),i.input.focus()),pe(i.wrapper.ownerDocument,"mousemove",v),pe(i.wrapper.ownerDocument,"mouseup",y),o.history.lastSelOrigin=null}var v=ti(e,(function(e){0!==e.buttons&&Le(e)?m(e):g(e)})),y=ti(e,g)
e.state.selectingText=y,de(i.wrapper.ownerDocument,"mousemove",v),de(i.wrapper.ownerDocument,"mouseup",y)}(e,r,t,o)}(t,r,o,e):Se(e)==n.scroller&&be(e):2==i?(r&&Xi(t.doc,r),setTimeout((function(){return n.input.focus()}),20)):3==i&&(k?t.display.input.onContextMenu(e):Sr(t)))}}function ga(e,t,n){if("char"==n)return new Si(t,t)
if("word"==n)return e.findWordAt(t)
if("line"==n)return new Si(tt(t.line,0),st(e.doc,tt(t.line+1,0)))
var r=n(e,t)
return new Si(r.from,r.to)}function va(e,t,n,r){var i,o
if(t.touches)i=t.touches[0].clientX,o=t.touches[0].clientY
else try{i=t.clientX,o=t.clientY}catch(t){return!1}if(i>=Math.floor(e.display.gutters.getBoundingClientRect().right))return!1
r&&be(t)
var a=e.display,l=a.lineDiv.getBoundingClientRect()
if(o>l.bottom||!ye(e,n))return Ce(t)
o-=l.top-a.viewOffset
for(var s=0;s<e.display.gutterSpecs.length;++s){var u=a.gutters.childNodes[s]
if(u&&u.getBoundingClientRect().right>=i)return me(e,n,e,Qe(e.doc,o),e.display.gutterSpecs[s].className,t),Ce(t)}}function ya(e,t){return va(e,t,"gutterClick",!0)}function xa(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),jn(e)}pa.prototype.compare=function(e,t,n){return this.time+400>e&&0==nt(t,this.pos)&&n==this.button}
var ba={toString:function(){return"CodeMirror.Init"}},wa={},Ca={}
function ka(e,t,n){if(!t!=!(n&&n!=ba)){var r=e.display.dragFunctions,i=t?de:pe
i(e.display.scroller,"dragstart",r.start),i(e.display.scroller,"dragenter",r.enter),i(e.display.scroller,"dragover",r.over),i(e.display.scroller,"dragleave",r.leave),i(e.display.scroller,"drop",r.drop)}}function Sa(e){e.options.lineWrapping?(O(e.display.wrapper,"CodeMirror-wrap"),e.display.sizer.style.minWidth="",e.display.sizerWidth=null):(T(e.display.wrapper,"CodeMirror-wrap"),Vt(e)),ur(e),dr(e),jn(e),setTimeout((function(){return _r(e)}),100)}function La(e,t){var n=this
if(!(this instanceof La))return new La(e,t)
this.options=t=t?W(t):{},W(wa,t,!1)
var r=t.value
"string"==typeof r?r=new Do(r,t.mode,null,t.lineSeparator,t.direction):t.mode&&(r.modeOption=t.mode),this.doc=r
var i=new La.inputStyles[t.inputStyle](this),o=this.display=new vi(e,r,i,t)
for(var u in o.wrapper.CodeMirror=this,xa(this),t.lineWrapping&&(this.display.wrapper.className+=" CodeMirror-wrap"),Gr(this),this.state={keyMaps:[],overlays:[],modeGen:0,overwrite:!1,delayingBlurEvent:!1,focused:!1,suppressEdits:!1,pasteIncoming:-1,cutIncoming:-1,selectingText:!1,draggingText:!1,highlight:new R,keySeq:null,specialChars:null},t.autofocus&&!v&&o.input.focus(),a&&l<11&&setTimeout((function(){return n.display.input.reset(!0)}),20),function(e){var t=e.display
de(t.scroller,"mousedown",ti(e,ma)),de(t.scroller,"dblclick",a&&l<11?ti(e,(function(t){if(!ge(e,t)){var n=cr(e,t)
if(n&&!ya(e,t)&&!kn(e.display,t)){be(t)
var r=e.findWordAt(n)
Xi(e.doc,r.anchor,r.head)}}})):function(t){return ge(e,t)||be(t)}),de(t.scroller,"contextmenu",(function(t){return function(e,t){kn(e.display,t)||function(e,t){return!!ye(e,"gutterContextMenu")&&va(e,t,"gutterContextMenu",!1)}(e,t)||ge(e,t,"contextmenu")||k||e.display.input.onContextMenu(t)}(e,t)}))
var n,r={end:0}
function i(){t.activeTouch&&(n=setTimeout((function(){return t.activeTouch=null}),1e3),(r=t.activeTouch).end=+new Date)}function o(e,t){if(null==t.left)return!0
var n=t.left-e.left,r=t.top-e.top
return n*n+r*r>400}de(t.scroller,"touchstart",(function(i){if(!ge(e,i)&&!function(e){if(1!=e.touches.length)return!1
var t=e.touches[0]
return t.radiusX<=1&&t.radiusY<=1}(i)&&!ya(e,i)){t.input.ensurePolled(),clearTimeout(n)
var o=+new Date
t.activeTouch={start:o,moved:!1,prev:o-r.end<=300?r:null},1==i.touches.length&&(t.activeTouch.left=i.touches[0].pageX,t.activeTouch.top=i.touches[0].pageY)}})),de(t.scroller,"touchmove",(function(){t.activeTouch&&(t.activeTouch.moved=!0)})),de(t.scroller,"touchend",(function(n){var r=t.activeTouch
if(r&&!kn(t,n)&&null!=r.left&&!r.moved&&new Date-r.start<300){var a,l=e.coordsChar(t.activeTouch,"page")
a=!r.prev||o(r,r.prev)?new Si(l,l):!r.prev.prev||o(r,r.prev.prev)?e.findWordAt(l):new Si(tt(l.line,0),st(e.doc,tt(l.line+1,0))),e.setSelection(a.anchor,a.head),e.focus(),be(n)}i()})),de(t.scroller,"touchcancel",i),de(t.scroller,"scroll",(function(){t.scroller.clientHeight&&(Hr(e,t.scroller.scrollTop),Pr(e,t.scroller.scrollLeft,!0),me(e,"scroll",e))})),de(t.scroller,"mousewheel",(function(t){return Ci(e,t)})),de(t.scroller,"DOMMouseScroll",(function(t){return Ci(e,t)})),de(t.wrapper,"scroll",(function(){return t.wrapper.scrollTop=t.wrapper.scrollLeft=0})),t.dragFunctions={enter:function(t){ge(e,t)||ke(t)},over:function(t){ge(e,t)||(function(e,t){var n=cr(e,t)
if(n){var r=document.createDocumentFragment()
xr(e,n,r),e.display.dragCursor||(e.display.dragCursor=N("div",null,"CodeMirror-cursors CodeMirror-dragcursors"),e.display.lineSpace.insertBefore(e.display.dragCursor,e.display.cursorDiv)),A(e.display.dragCursor,r)}}(e,t),ke(t))},start:function(t){return function(e,t){if(a&&(!e.state.draggingText||+new Date-Fo<100))ke(t)
else if(!ge(e,t)&&!kn(e.display,t)&&(t.dataTransfer.setData("Text",e.getSelection()),t.dataTransfer.effectAllowed="copyMove",t.dataTransfer.setDragImage&&!d)){var n=N("img",null,null,"position: fixed; left: 0; top: 0;")
n.src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==",f&&(n.width=n.height=1,e.display.wrapper.appendChild(n),n._top=n.offsetTop),t.dataTransfer.setDragImage(n,0,0),f&&n.parentNode.removeChild(n)}}(e,t)},drop:ti(e,Oo),leave:function(t){ge(e,t)||Io(e)}}
var s=t.input.getField()
de(s,"keyup",(function(t){return ca.call(e,t)})),de(s,"keydown",ti(e,ua)),de(s,"keypress",ti(e,fa)),de(s,"focus",(function(t){return Lr(e,t)})),de(s,"blur",(function(t){return Tr(e,t)}))}(this),function(){var e
Ho||(de(window,"resize",(function(){null==e&&(e=setTimeout((function(){e=null,Bo(Wo)}),100))})),de(window,"blur",(function(){return Bo(Tr)})),Ho=!0)}(),$r(this),this.curOp.forceUpdate=!0,Hi(this,r),t.autofocus&&!v||this.hasFocus()?setTimeout(H(Lr,this),20):Tr(this),Ca)Ca.hasOwnProperty(u)&&Ca[u](n,t[u],ba)
hi(this),t.finishInit&&t.finishInit(this)
for(var c=0;c<Ta.length;++c)Ta[c](n)
Xr(this),s&&t.lineWrapping&&"optimizelegibility"==getComputedStyle(o.lineDiv).textRendering&&(o.lineDiv.style.textRendering="auto")}La.defaults=wa,La.optionHandlers=Ca
var Ta=[]
function Ma(e,t,n,r){var i,o=e.doc
null==n&&(n="add"),"smart"==n&&(o.mode.indent?i=pt(e,t).state:n="prev")
var a=e.options.tabSize,l=$e(o,t),s=P(l.text,null,a)
l.stateAfter&&(l.stateAfter=null)
var u,c=l.text.match(/^\s*/)[0]
if(r||/\S/.test(l.text)){if("smart"==n&&((u=o.mode.indent(i,l.text.slice(c.length),l.text))==_||u>150)){if(!r)return
n="prev"}}else u=0,n="not"
"prev"==n?u=t>o.first?P($e(o,t-1).text,null,a):0:"add"==n?u=s+e.options.indentUnit:"subtract"==n?u=s-e.options.indentUnit:"number"==typeof n&&(u=s+n),u=Math.max(0,u)
var f="",d=0
if(e.options.indentWithTabs)for(var h=Math.floor(u/a);h;--h)d+=a,f+="\t"
if(d<u&&(f+=X(u-d)),f!=c)return mo(o,f,tt(t,0),tt(t,c.length),"+input"),l.stateAfter=null,!0
for(var p=0;p<o.sel.ranges.length;p++){var m=o.sel.ranges[p]
if(m.head.line==t&&m.head.ch<c.length){var g=tt(t,c.length)
Yi(o,p,new Si(g,g))
break}}}La.defineInitHook=function(e){return Ta.push(e)}
var Aa=null
function Na(e){Aa=e}function Ea(e,t,n,r,i){var o=e.doc
e.display.shift=!1,r||(r=o.sel)
var a=+new Date-200,l="paste"==i||e.state.pasteIncoming>a,s=Fe(t),u=null
if(l&&r.ranges.length>1)if(Aa&&Aa.text.join("\n")==t){if(r.ranges.length%Aa.text.length==0){u=[]
for(var c=0;c<Aa.text.length;c++)u.push(o.splitLines(Aa.text[c]))}}else s.length==r.ranges.length&&e.options.pasteLinesPerSelection&&(u=Y(s,(function(e){return[e]})))
for(var f=e.curOp.updateInput,d=r.ranges.length-1;d>=0;d--){var h=r.ranges[d],p=h.from(),m=h.to()
h.empty()&&(n&&n>0?p=tt(p.line,p.ch-n):e.state.overwrite&&!l?m=tt(m.line,Math.min($e(o,m.line).text.length,m.ch+K(s).length)):l&&Aa&&Aa.lineWise&&Aa.text.join("\n")==t&&(p=m=tt(p.line,0)))
var g={from:p,to:m,text:u?u[d%u.length]:s,origin:i||(l?"paste":e.state.cutIncoming>a?"cut":"+input")}
uo(e.doc,g),un(e,"inputRead",e,g)}t&&!l&&Fa(e,t),Fr(e),e.curOp.updateInput<2&&(e.curOp.updateInput=f),e.curOp.typing=!0,e.state.pasteIncoming=e.state.cutIncoming=-1}function Da(e,t){var n=e.clipboardData&&e.clipboardData.getData("Text")
if(n)return e.preventDefault(),t.isReadOnly()||t.options.disableInput||ei(t,(function(){return Ea(t,n,0,null,"paste")})),!0}function Fa(e,t){if(e.options.electricChars&&e.options.smartIndent)for(var n=e.doc.sel,r=n.ranges.length-1;r>=0;r--){var i=n.ranges[r]
if(!(i.head.ch>100||r&&n.ranges[r-1].head.line==i.head.line)){var o=e.getModeAt(i.head),a=!1
if(o.electricChars){for(var l=0;l<o.electricChars.length;l++)if(t.indexOf(o.electricChars.charAt(l))>-1){a=Ma(e,i.head.line,"smart")
break}}else o.electricInput&&o.electricInput.test($e(e.doc,i.head.line).text.slice(0,i.head.ch))&&(a=Ma(e,i.head.line,"smart"))
a&&un(e,"electricInput",e,i.head.line)}}}function Oa(e){for(var t=[],n=[],r=0;r<e.doc.sel.ranges.length;r++){var i=e.doc.sel.ranges[r].head.line,o={anchor:tt(i,0),head:tt(i+1,0)}
n.push(o),t.push(e.getRange(o.anchor,o.head))}return{text:t,ranges:n}}function Ia(e,t,n,r){e.setAttribute("autocorrect",n?"":"off"),e.setAttribute("autocapitalize",r?"":"off"),e.setAttribute("spellcheck",!!t)}function Ba(){var e=N("textarea",null,null,"position: absolute; bottom: -1em; padding: 0; width: 1px; height: 1em; outline: none"),t=N("div",[e],null,"overflow: hidden; position: relative; width: 3px; height: 0px;")
return s?e.style.width="1000px":e.setAttribute("wrap","off"),m&&(e.style.border="1px solid black"),Ia(e),t}function Ha(e,t,n,r,i){var o=t,a=n,l=$e(e,t.line)
function s(r){var o,a
if(o=i?function(e,t,n,r){var i=ce(t,e.doc.direction)
if(!i)return Qo(t,n,r)
n.ch>=t.text.length?(n.ch=t.text.length,n.sticky="before"):n.ch<=0&&(n.ch=0,n.sticky="after")
var o=se(i,n.ch,n.sticky),a=i[o]
if("ltr"==e.doc.direction&&a.level%2==0&&(r>0?a.to>n.ch:a.from<n.ch))return Qo(t,n,r)
var l,s=function(e,n){return Zo(t,e instanceof tt?e.ch:e,n)},u=function(n){return e.options.lineWrapping?(l=l||On(e,t),Jn(e,t,l,n)):{begin:0,end:t.text.length}},c=u("before"==n.sticky?s(n,-1):n.ch)
if("rtl"==e.doc.direction||1==a.level){var f=1==a.level==r<0,d=s(n,f?1:-1)
if(null!=d&&(f?d<=a.to&&d<=c.end:d>=a.from&&d>=c.begin)){var h=f?"before":"after"
return new tt(n.line,d,h)}}var p=function(e,t,r){for(var o=function(e,t){return t?new tt(n.line,s(e,1),"before"):new tt(n.line,e,"after")};e>=0&&e<i.length;e+=t){var a=i[e],l=t>0==(1!=a.level),u=l?r.begin:s(r.end,-1)
if(a.from<=u&&u<a.to)return o(u,l)
if(u=l?a.from:s(a.to,-1),r.begin<=u&&u<r.end)return o(u,l)}},m=p(o+r,r,c)
if(m)return m
var g=r>0?c.end:s(c.begin,-1)
return null==g||r>0&&g==t.text.length||!(m=p(r>0?0:i.length-1,r,u(g)))?null:m}(e.cm,l,t,n):Qo(l,t,n),null==o){if(r||(a=t.line+n)<e.first||a>=e.first+e.size||(t=new tt(a,t.ch,t.sticky),!(l=$e(e,a))))return!1
t=Jo(i,e.cm,l,t.line,n)}else t=o
return!0}if("char"==r)s()
else if("column"==r)s(!0)
else if("word"==r||"group"==r)for(var u=null,c="group"==r,f=e.cm&&e.cm.getHelper(t,"wordChars"),d=!0;!(n<0)||s(!d);d=!1){var h=l.text.charAt(t.ch)||"\n",p=te(h,f)?"w":c&&"\n"==h?"n":!c||/\s/.test(h)?null:"p"
if(!c||d||p||(p="s"),u&&u!=p){n<0&&(n=1,s(),t.sticky="after")
break}if(p&&(u=p),n>0&&!s(!d))break}var m=oo(e,t,o,a,!0)
return rt(o,m)&&(m.hitSide=!0),m}function Wa(e,t,n,r){var i,o,a=e.doc,l=t.left
if("page"==r){var s=Math.min(e.display.wrapper.clientHeight,window.innerHeight||document.documentElement.clientHeight),u=Math.max(s-.5*ir(e.display),3)
i=(n>0?t.bottom:t.top)+n*u}else"line"==r&&(i=n>0?t.bottom+3:t.top-3)
for(;(o=Zn(e,l,i)).outside;){if(n<0?i<=0:i>=a.height){o.hitSide=!0
break}i+=5*n}return o}var Pa=function(e){this.cm=e,this.lastAnchorNode=this.lastAnchorOffset=this.lastFocusNode=this.lastFocusOffset=null,this.polling=new R,this.composing=null,this.gracePeriod=!1,this.readDOMTimeout=null}
function Ra(e,t){var n=Fn(e,t.line)
if(!n||n.hidden)return null
var r=$e(e.doc,t.line),i=En(n,r,t.line),o=ce(r,e.doc.direction),a="left"
o&&(a=se(o,t.ch)%2?"right":"left")
var l=Wn(i.map,t.ch,a)
return l.offset="right"==l.collapse?l.end:l.start,l}function za(e,t){return t&&(e.bad=!0),e}function ja(e,t,n){var r
if(t==e.display.lineDiv){if(!(r=e.display.lineDiv.childNodes[n]))return za(e.clipPos(tt(e.display.viewTo-1)),!0)
t=null,n=0}else for(r=t;;r=r.parentNode){if(!r||r==e.display.lineDiv)return null
if(r.parentNode&&r.parentNode==e.display.lineDiv)break}for(var i=0;i<e.display.view.length;i++){var o=e.display.view[i]
if(o.node==r)return _a(o,t,n)}}function _a(e,t,n){var r=e.text.firstChild,i=!1
if(!t||!D(r,t))return za(tt(Ze(e.line),0),!0)
if(t==r&&(i=!0,t=r.childNodes[n],n=0,!t)){var o=e.rest?K(e.rest):e.line
return za(tt(Ze(o),o.text.length),i)}var a=3==t.nodeType?t:null,l=t
for(a||1!=t.childNodes.length||3!=t.firstChild.nodeType||(a=t.firstChild,n&&(n=a.nodeValue.length));l.parentNode!=r;)l=l.parentNode
var s=e.measure,u=s.maps
function c(t,n,r){for(var i=-1;i<(u?u.length:0);i++)for(var o=i<0?s.map:u[i],a=0;a<o.length;a+=3){var l=o[a+2]
if(l==t||l==n){var c=Ze(i<0?e.line:e.rest[i]),f=o[a]+r
return(r<0||l!=t)&&(f=o[a+(r?1:0)]),tt(c,f)}}}var f=c(a,l,n)
if(f)return za(f,i)
for(var d=l.nextSibling,h=a?a.nodeValue.length-n:0;d;d=d.nextSibling){if(f=c(d,d.firstChild,0))return za(tt(f.line,f.ch-h),i)
h+=d.textContent.length}for(var p=l.previousSibling,m=n;p;p=p.previousSibling){if(f=c(p,p.firstChild,-1))return za(tt(f.line,f.ch+m),i)
m+=p.textContent.length}}Pa.prototype.init=function(e){var t=this,n=this,r=n.cm,i=n.div=e.lineDiv
function o(e){if(!ge(r,e)){if(r.somethingSelected())Na({lineWise:!1,text:r.getSelections()}),"cut"==e.type&&r.replaceSelection("",null,"cut")
else{if(!r.options.lineWiseCopyCut)return
var t=Oa(r)
Na({lineWise:!0,text:t.text}),"cut"==e.type&&r.operation((function(){r.setSelections(t.ranges,0,U),r.replaceSelection("",null,"cut")}))}if(e.clipboardData){e.clipboardData.clearData()
var o=Aa.text.join("\n")
if(e.clipboardData.setData("Text",o),e.clipboardData.getData("Text")==o)return void e.preventDefault()}var a=Ba(),l=a.firstChild
r.display.lineSpace.insertBefore(a,r.display.lineSpace.firstChild),l.value=Aa.text.join("\n")
var s=document.activeElement
B(l),setTimeout((function(){r.display.lineSpace.removeChild(a),s.focus(),s==i&&n.showPrimarySelection()}),50)}}Ia(i,r.options.spellcheck,r.options.autocorrect,r.options.autocapitalize),de(i,"paste",(function(e){ge(r,e)||Da(e,r)||l<=11&&setTimeout(ti(r,(function(){return t.updateFromDOM()})),20)})),de(i,"compositionstart",(function(e){t.composing={data:e.data,done:!1}})),de(i,"compositionupdate",(function(e){t.composing||(t.composing={data:e.data,done:!1})})),de(i,"compositionend",(function(e){t.composing&&(e.data!=t.composing.data&&t.readFromDOMSoon(),t.composing.done=!0)})),de(i,"touchstart",(function(){return n.forceCompositionEnd()})),de(i,"input",(function(){t.composing||t.readFromDOMSoon()})),de(i,"copy",o),de(i,"cut",o)},Pa.prototype.prepareSelection=function(){var e=yr(this.cm,!1)
return e.focus=this.cm.state.focused,e},Pa.prototype.showSelection=function(e,t){e&&this.cm.display.view.length&&((e.focus||t)&&this.showPrimarySelection(),this.showMultipleSelections(e))},Pa.prototype.getSelection=function(){return this.cm.display.wrapper.ownerDocument.getSelection()},Pa.prototype.showPrimarySelection=function(){var e=this.getSelection(),t=this.cm,r=t.doc.sel.primary(),i=r.from(),o=r.to()
if(t.display.viewTo==t.display.viewFrom||i.line>=t.display.viewTo||o.line<t.display.viewFrom)e.removeAllRanges()
else{var a=ja(t,e.anchorNode,e.anchorOffset),l=ja(t,e.focusNode,e.focusOffset)
if(!a||a.bad||!l||l.bad||0!=nt(at(a,l),i)||0!=nt(ot(a,l),o)){var s=t.display.view,u=i.line>=t.display.viewFrom&&Ra(t,i)||{node:s[0].measure.map[2],offset:0},c=o.line<t.display.viewTo&&Ra(t,o)
if(!c){var f=s[s.length-1].measure,d=f.maps?f.maps[f.maps.length-1]:f.map
c={node:d[d.length-1],offset:d[d.length-2]-d[d.length-3]}}if(u&&c){var h,p=e.rangeCount&&e.getRangeAt(0)
try{h=L(u.node,u.offset,c.offset,c.node)}catch(e){}h&&(!n&&t.state.focused?(e.collapse(u.node,u.offset),h.collapsed||(e.removeAllRanges(),e.addRange(h))):(e.removeAllRanges(),e.addRange(h)),p&&null==e.anchorNode?e.addRange(p):n&&this.startGracePeriod()),this.rememberSelection()}else e.removeAllRanges()}}},Pa.prototype.startGracePeriod=function(){var e=this
clearTimeout(this.gracePeriod),this.gracePeriod=setTimeout((function(){e.gracePeriod=!1,e.selectionChanged()&&e.cm.operation((function(){return e.cm.curOp.selectionChanged=!0}))}),20)},Pa.prototype.showMultipleSelections=function(e){A(this.cm.display.cursorDiv,e.cursors),A(this.cm.display.selectionDiv,e.selection)},Pa.prototype.rememberSelection=function(){var e=this.getSelection()
this.lastAnchorNode=e.anchorNode,this.lastAnchorOffset=e.anchorOffset,this.lastFocusNode=e.focusNode,this.lastFocusOffset=e.focusOffset},Pa.prototype.selectionInEditor=function(){var e=this.getSelection()
if(!e.rangeCount)return!1
var t=e.getRangeAt(0).commonAncestorContainer
return D(this.div,t)},Pa.prototype.focus=function(){"nocursor"!=this.cm.options.readOnly&&(this.selectionInEditor()||this.showSelection(this.prepareSelection(),!0),this.div.focus())},Pa.prototype.blur=function(){this.div.blur()},Pa.prototype.getField=function(){return this.div},Pa.prototype.supportsTouch=function(){return!0},Pa.prototype.receivedFocus=function(){var e=this
this.selectionInEditor()?this.pollSelection():ei(this.cm,(function(){return e.cm.curOp.selectionChanged=!0})),this.polling.set(this.cm.options.pollInterval,(function t(){e.cm.state.focused&&(e.pollSelection(),e.polling.set(e.cm.options.pollInterval,t))}))},Pa.prototype.selectionChanged=function(){var e=this.getSelection()
return e.anchorNode!=this.lastAnchorNode||e.anchorOffset!=this.lastAnchorOffset||e.focusNode!=this.lastFocusNode||e.focusOffset!=this.lastFocusOffset},Pa.prototype.pollSelection=function(){if(null==this.readDOMTimeout&&!this.gracePeriod&&this.selectionChanged()){var e=this.getSelection(),t=this.cm
if(g&&c&&this.cm.display.gutterSpecs.length&&function(e){for(var t=e;t;t=t.parentNode)if(/CodeMirror-gutter-wrapper/.test(t.className))return!0
return!1}(e.anchorNode))return this.cm.triggerOnKeyDown({type:"keydown",keyCode:8,preventDefault:Math.abs}),this.blur(),void this.focus()
if(!this.composing){this.rememberSelection()
var n=ja(t,e.anchorNode,e.anchorOffset),r=ja(t,e.focusNode,e.focusOffset)
n&&r&&ei(t,(function(){Ji(t.doc,Ti(n,r),U),(n.bad||r.bad)&&(t.curOp.selectionChanged=!0)}))}}},Pa.prototype.pollContent=function(){null!=this.readDOMTimeout&&(clearTimeout(this.readDOMTimeout),this.readDOMTimeout=null)
var e,t,n,r=this.cm,i=r.display,o=r.doc.sel.primary(),a=o.from(),l=o.to()
if(0==a.ch&&a.line>r.firstLine()&&(a=tt(a.line-1,$e(r.doc,a.line-1).length)),l.ch==$e(r.doc,l.line).text.length&&l.line<r.lastLine()&&(l=tt(l.line+1,0)),a.line<i.viewFrom||l.line>i.viewTo-1)return!1
a.line==i.viewFrom||0==(e=fr(r,a.line))?(t=Ze(i.view[0].line),n=i.view[0].node):(t=Ze(i.view[e].line),n=i.view[e-1].node.nextSibling)
var s,u,c=fr(r,l.line)
if(c==i.view.length-1?(s=i.viewTo-1,u=i.lineDiv.lastChild):(s=Ze(i.view[c+1].line)-1,u=i.view[c+1].node.previousSibling),!n)return!1
for(var f=r.doc.splitLines(function(e,t,n,r,i){var o="",a=!1,l=e.doc.lineSeparator(),s=!1
function u(){a&&(o+=l,s&&(o+=l),a=s=!1)}function c(e){e&&(u(),o+=e)}function f(t){if(1==t.nodeType){var n=t.getAttribute("cm-text")
if(n)return void c(n)
var o,d=t.getAttribute("cm-marker")
if(d){var h=e.findMarks(tt(r,0),tt(i+1,0),function(e){return function(t){return t.id==e}}(+d))
return void(h.length&&(o=h[0].find(0))&&c(Xe(e.doc,o.from,o.to).join(l)))}if("false"==t.getAttribute("contenteditable"))return
var p=/^(pre|div|p|li|table|br)$/i.test(t.nodeName)
if(!/^br$/i.test(t.nodeName)&&0==t.textContent.length)return
p&&u()
for(var m=0;m<t.childNodes.length;m++)f(t.childNodes[m]);/^(pre|p)$/i.test(t.nodeName)&&(s=!0),p&&(a=!0)}else 3==t.nodeType&&c(t.nodeValue.replace(/\u200b/g,"").replace(/\u00a0/g," "))}for(;f(t),t!=n;)t=t.nextSibling,s=!1
return o}(r,n,u,t,s)),d=Xe(r.doc,tt(t,0),tt(s,$e(r.doc,s).text.length));f.length>1&&d.length>1;)if(K(f)==K(d))f.pop(),d.pop(),s--
else{if(f[0]!=d[0])break
f.shift(),d.shift(),t++}for(var h=0,p=0,m=f[0],g=d[0],v=Math.min(m.length,g.length);h<v&&m.charCodeAt(h)==g.charCodeAt(h);)++h
for(var y=K(f),x=K(d),b=Math.min(y.length-(1==f.length?h:0),x.length-(1==d.length?h:0));p<b&&y.charCodeAt(y.length-p-1)==x.charCodeAt(x.length-p-1);)++p
if(1==f.length&&1==d.length&&t==a.line)for(;h&&h>a.ch&&y.charCodeAt(y.length-p-1)==x.charCodeAt(x.length-p-1);)h--,p++
f[f.length-1]=y.slice(0,y.length-p).replace(/^\u200b+/,""),f[0]=f[0].slice(h).replace(/\u200b+$/,"")
var w=tt(t,h),C=tt(s,d.length?K(d).length-p:0)
return f.length>1||f[0]||nt(w,C)?(mo(r.doc,f,w,C,"+input"),!0):void 0},Pa.prototype.ensurePolled=function(){this.forceCompositionEnd()},Pa.prototype.reset=function(){this.forceCompositionEnd()},Pa.prototype.forceCompositionEnd=function(){this.composing&&(clearTimeout(this.readDOMTimeout),this.composing=null,this.updateFromDOM(),this.div.blur(),this.div.focus())},Pa.prototype.readFromDOMSoon=function(){var e=this
null==this.readDOMTimeout&&(this.readDOMTimeout=setTimeout((function(){if(e.readDOMTimeout=null,e.composing){if(!e.composing.done)return
e.composing=null}e.updateFromDOM()}),80))},Pa.prototype.updateFromDOM=function(){var e=this
!this.cm.isReadOnly()&&this.pollContent()||ei(this.cm,(function(){return dr(e.cm)}))},Pa.prototype.setUneditable=function(e){e.contentEditable="false"},Pa.prototype.onKeyPress=function(e){0==e.charCode||this.composing||(e.preventDefault(),this.cm.isReadOnly()||ti(this.cm,Ea)(this.cm,String.fromCharCode(null==e.charCode?e.keyCode:e.charCode),0))},Pa.prototype.readOnlyChanged=function(e){this.div.contentEditable=String("nocursor"!=e)},Pa.prototype.onContextMenu=function(){},Pa.prototype.resetPosition=function(){},Pa.prototype.needsContentAttribute=!0
var Ua=function(e){this.cm=e,this.prevInput="",this.pollingFast=!1,this.polling=new R,this.hasSelection=!1,this.composing=null}
Ua.prototype.init=function(e){var t=this,n=this,r=this.cm
this.createField(e)
var i=this.textarea
function o(e){if(!ge(r,e)){if(r.somethingSelected())Na({lineWise:!1,text:r.getSelections()})
else{if(!r.options.lineWiseCopyCut)return
var t=Oa(r)
Na({lineWise:!0,text:t.text}),"cut"==e.type?r.setSelections(t.ranges,null,U):(n.prevInput="",i.value=t.text.join("\n"),B(i))}"cut"==e.type&&(r.state.cutIncoming=+new Date)}}e.wrapper.insertBefore(this.wrapper,e.wrapper.firstChild),m&&(i.style.width="0px"),de(i,"input",(function(){a&&l>=9&&t.hasSelection&&(t.hasSelection=null),n.poll()})),de(i,"paste",(function(e){ge(r,e)||Da(e,r)||(r.state.pasteIncoming=+new Date,n.fastPoll())})),de(i,"cut",o),de(i,"copy",o),de(e.scroller,"paste",(function(t){if(!kn(e,t)&&!ge(r,t)){if(!i.dispatchEvent)return r.state.pasteIncoming=+new Date,void n.focus()
var o=new Event("paste")
o.clipboardData=t.clipboardData,i.dispatchEvent(o)}})),de(e.lineSpace,"selectstart",(function(t){kn(e,t)||be(t)})),de(i,"compositionstart",(function(){var e=r.getCursor("from")
n.composing&&n.composing.range.clear(),n.composing={start:e,range:r.markText(e,r.getCursor("to"),{className:"CodeMirror-composing"})}})),de(i,"compositionend",(function(){n.composing&&(n.poll(),n.composing.range.clear(),n.composing=null)}))},Ua.prototype.createField=function(e){this.wrapper=Ba(),this.textarea=this.wrapper.firstChild},Ua.prototype.prepareSelection=function(){var e=this.cm,t=e.display,n=e.doc,r=yr(e)
if(e.options.moveInputWithCursor){var i=Xn(e,n.sel.primary().head,"div"),o=t.wrapper.getBoundingClientRect(),a=t.lineDiv.getBoundingClientRect()
r.teTop=Math.max(0,Math.min(t.wrapper.clientHeight-10,i.top+a.top-o.top)),r.teLeft=Math.max(0,Math.min(t.wrapper.clientWidth-10,i.left+a.left-o.left))}return r},Ua.prototype.showSelection=function(e){var t=this.cm.display
A(t.cursorDiv,e.cursors),A(t.selectionDiv,e.selection),null!=e.teTop&&(this.wrapper.style.top=e.teTop+"px",this.wrapper.style.left=e.teLeft+"px")},Ua.prototype.reset=function(e){if(!this.contextMenuPending&&!this.composing){var t=this.cm
if(t.somethingSelected()){this.prevInput=""
var n=t.getSelection()
this.textarea.value=n,t.state.focused&&B(this.textarea),a&&l>=9&&(this.hasSelection=n)}else e||(this.prevInput=this.textarea.value="",a&&l>=9&&(this.hasSelection=null))}},Ua.prototype.getField=function(){return this.textarea},Ua.prototype.supportsTouch=function(){return!1},Ua.prototype.focus=function(){if("nocursor"!=this.cm.options.readOnly&&(!v||F()!=this.textarea))try{this.textarea.focus()}catch(e){}},Ua.prototype.blur=function(){this.textarea.blur()},Ua.prototype.resetPosition=function(){this.wrapper.style.top=this.wrapper.style.left=0},Ua.prototype.receivedFocus=function(){this.slowPoll()},Ua.prototype.slowPoll=function(){var e=this
this.pollingFast||this.polling.set(this.cm.options.pollInterval,(function(){e.poll(),e.cm.state.focused&&e.slowPoll()}))},Ua.prototype.fastPoll=function(){var e=!1,t=this
t.pollingFast=!0,t.polling.set(20,(function n(){t.poll()||e?(t.pollingFast=!1,t.slowPoll()):(e=!0,t.polling.set(60,n))}))},Ua.prototype.poll=function(){var e=this,t=this.cm,n=this.textarea,r=this.prevInput
if(this.contextMenuPending||!t.state.focused||Oe(n)&&!r&&!this.composing||t.isReadOnly()||t.options.disableInput||t.state.keySeq)return!1
var i=n.value
if(i==r&&!t.somethingSelected())return!1
if(a&&l>=9&&this.hasSelection===i||y&&/[\uf700-\uf7ff]/.test(i))return t.display.input.reset(),!1
if(t.doc.sel==t.display.selForContextMenu){var o=i.charCodeAt(0)
if(8203!=o||r||(r="​"),8666==o)return this.reset(),this.cm.execCommand("undo")}for(var s=0,u=Math.min(r.length,i.length);s<u&&r.charCodeAt(s)==i.charCodeAt(s);)++s
return ei(t,(function(){Ea(t,i.slice(s),r.length-s,null,e.composing?"*compose":null),i.length>1e3||i.indexOf("\n")>-1?n.value=e.prevInput="":e.prevInput=i,e.composing&&(e.composing.range.clear(),e.composing.range=t.markText(e.composing.start,t.getCursor("to"),{className:"CodeMirror-composing"}))})),!0},Ua.prototype.ensurePolled=function(){this.pollingFast&&this.poll()&&(this.pollingFast=!1)},Ua.prototype.onKeyPress=function(){a&&l>=9&&(this.hasSelection=null),this.fastPoll()},Ua.prototype.onContextMenu=function(e){var t=this,n=t.cm,r=n.display,i=t.textarea
t.contextMenuPending&&t.contextMenuPending()
var o=cr(n,e),u=r.scroller.scrollTop
if(o&&!f){n.options.resetSelectionOnContextMenu&&-1==n.doc.sel.contains(o)&&ti(n,Ji)(n.doc,Ti(o),U)
var c,d=i.style.cssText,h=t.wrapper.style.cssText,p=t.wrapper.offsetParent.getBoundingClientRect()
if(t.wrapper.style.cssText="position: static",i.style.cssText="position: absolute; width: 30px; height: 30px;\n      top: "+(e.clientY-p.top-5)+"px; left: "+(e.clientX-p.left-5)+"px;\n      z-index: 1000; background: "+(a?"rgba(255, 255, 255, .05)":"transparent")+";\n      outline: none; border-width: 0; outline: none; overflow: hidden; opacity: .05; filter: alpha(opacity=5);",s&&(c=window.scrollY),r.input.focus(),s&&window.scrollTo(null,c),r.input.reset(),n.somethingSelected()||(i.value=t.prevInput=" "),t.contextMenuPending=v,r.selForContextMenu=n.doc.sel,clearTimeout(r.detectingSelectAll),a&&l>=9&&g(),k){ke(e)
var m=function(){pe(window,"mouseup",m),setTimeout(v,20)}
de(window,"mouseup",m)}else setTimeout(v,50)}function g(){if(null!=i.selectionStart){var e=n.somethingSelected(),o="​"+(e?i.value:"")
i.value="⇚",i.value=o,t.prevInput=e?"":"​",i.selectionStart=1,i.selectionEnd=o.length,r.selForContextMenu=n.doc.sel}}function v(){if(t.contextMenuPending==v&&(t.contextMenuPending=!1,t.wrapper.style.cssText=h,i.style.cssText=d,a&&l<9&&r.scrollbars.setScrollTop(r.scroller.scrollTop=u),null!=i.selectionStart)){(!a||a&&l<9)&&g()
var e=0,o=function(){r.selForContextMenu==n.doc.sel&&0==i.selectionStart&&i.selectionEnd>0&&"​"==t.prevInput?ti(n,lo)(n):e++<10?r.detectingSelectAll=setTimeout(o,500):(r.selForContextMenu=null,r.input.reset())}
r.detectingSelectAll=setTimeout(o,200)}}},Ua.prototype.readOnlyChanged=function(e){e||this.reset(),this.textarea.disabled="nocursor"==e},Ua.prototype.setUneditable=function(){},Ua.prototype.needsContentAttribute=!1,function(e){var t=e.optionHandlers
function n(n,r,i,o){e.defaults[n]=r,i&&(t[n]=o?function(e,t,n){n!=ba&&i(e,t,n)}:i)}e.defineOption=n,e.Init=ba,n("value","",(function(e,t){return e.setValue(t)}),!0),n("mode",null,(function(e,t){e.doc.modeOption=t,Di(e)}),!0),n("indentUnit",2,Di,!0),n("indentWithTabs",!1),n("smartIndent",!0),n("tabSize",4,(function(e){Fi(e),jn(e),dr(e)}),!0),n("lineSeparator",null,(function(e,t){if(e.doc.lineSep=t,t){var n=[],r=e.doc.first
e.doc.iter((function(e){for(var i=0;;){var o=e.text.indexOf(t,i)
if(-1==o)break
i=o+t.length,n.push(tt(r,o))}r++}))
for(var i=n.length-1;i>=0;i--)mo(e.doc,t,n[i],tt(n[i].line,n[i].ch+t.length))}})),n("specialChars",/[\u0000-\u001f\u007f-\u009f\u00ad\u061c\u200b-\u200f\u2028\u2029\ufeff\ufff9-\ufffc]/g,(function(e,t,n){e.state.specialChars=new RegExp(t.source+(t.test("\t")?"":"|\t"),"g"),n!=ba&&e.refresh()})),n("specialCharPlaceholder",Jt,(function(e){return e.refresh()}),!0),n("electricChars",!0),n("inputStyle",v?"contenteditable":"textarea",(function(){throw new Error("inputStyle can not (yet) be changed in a running editor")}),!0),n("spellcheck",!1,(function(e,t){return e.getInputField().spellcheck=t}),!0),n("autocorrect",!1,(function(e,t){return e.getInputField().autocorrect=t}),!0),n("autocapitalize",!1,(function(e,t){return e.getInputField().autocapitalize=t}),!0),n("rtlMoveVisually",!b),n("wholeLineUpdateBefore",!0),n("theme","default",(function(e){xa(e),gi(e)}),!0),n("keyMap","default",(function(e,t,n){var r=Ko(t),i=n!=ba&&Ko(n)
i&&i.detach&&i.detach(e,r),r.attach&&r.attach(e,i||null)})),n("extraKeys",null),n("configureMouse",null),n("lineWrapping",!1,Sa,!0),n("gutters",[],(function(e,t){e.display.gutterSpecs=pi(t,e.options.lineNumbers),gi(e)}),!0),n("fixedGutter",!0,(function(e,t){e.display.gutters.style.left=t?lr(e.display)+"px":"0",e.refresh()}),!0),n("coverGutterNextToScrollbar",!1,(function(e){return _r(e)}),!0),n("scrollbarStyle","native",(function(e){Gr(e),_r(e),e.display.scrollbars.setScrollTop(e.doc.scrollTop),e.display.scrollbars.setScrollLeft(e.doc.scrollLeft)}),!0),n("lineNumbers",!1,(function(e,t){e.display.gutterSpecs=pi(e.options.gutters,t),gi(e)}),!0),n("firstLineNumber",1,gi,!0),n("lineNumberFormatter",(function(e){return e}),gi,!0),n("showCursorWhenSelecting",!1,vr,!0),n("resetSelectionOnContextMenu",!0),n("lineWiseCopyCut",!0),n("pasteLinesPerSelection",!0),n("selectionsMayTouch",!1),n("readOnly",!1,(function(e,t){"nocursor"==t&&(Tr(e),e.display.input.blur()),e.display.input.readOnlyChanged(t)})),n("disableInput",!1,(function(e,t){t||e.display.input.reset()}),!0),n("dragDrop",!0,ka),n("allowDropFileTypes",null),n("cursorBlinkRate",530),n("cursorScrollMargin",0),n("cursorHeight",1,vr,!0),n("singleCursorHeightPerLine",!0,vr,!0),n("workTime",100),n("workDelay",100),n("flattenSpans",!0,Fi,!0),n("addModeClass",!1,Fi,!0),n("pollInterval",100),n("undoDepth",200,(function(e,t){return e.doc.history.undoDepth=t})),n("historyEventDelay",1250),n("viewportMargin",10,(function(e){return e.refresh()}),!0),n("maxHighlightLength",1e4,Fi,!0),n("moveInputWithCursor",!0,(function(e,t){t||e.display.input.resetPosition()})),n("tabindex",null,(function(e,t){return e.display.input.getField().tabIndex=t||""})),n("autofocus",null),n("direction","ltr",(function(e,t){return e.doc.setDirection(t)}),!0),n("phrases",null)}(La),function(e){var t=e.optionHandlers,n=e.helpers={}
e.prototype={constructor:e,focus:function(){window.focus(),this.display.input.focus()},setOption:function(e,n){var r=this.options,i=r[e]
r[e]==n&&"mode"!=e||(r[e]=n,t.hasOwnProperty(e)&&ti(this,t[e])(this,n,i),me(this,"optionChange",this,e))},getOption:function(e){return this.options[e]},getDoc:function(){return this.doc},addKeyMap:function(e,t){this.state.keyMaps[t?"push":"unshift"](Ko(e))},removeKeyMap:function(e){for(var t=this.state.keyMaps,n=0;n<t.length;++n)if(t[n]==e||t[n].name==e)return t.splice(n,1),!0},addOverlay:ni((function(t,n){var r=t.token?t:e.getMode(this.options,t)
if(r.startState)throw new Error("Overlays may not be stateful.")
!function(e,t,n){for(var r=0,i=n(t);r<e.length&&n(e[r])<=i;)r++
e.splice(r,0,t)}(this.state.overlays,{mode:r,modeSpec:t,opaque:n&&n.opaque,priority:n&&n.priority||0},(function(e){return e.priority})),this.state.modeGen++,dr(this)})),removeOverlay:ni((function(e){for(var t=this.state.overlays,n=0;n<t.length;++n){var r=t[n].modeSpec
if(r==e||"string"==typeof e&&r.name==e)return t.splice(n,1),this.state.modeGen++,void dr(this)}})),indentLine:ni((function(e,t,n){"string"!=typeof t&&"number"!=typeof t&&(t=null==t?this.options.smartIndent?"smart":"prev":t?"add":"subtract"),Je(this.doc,e)&&Ma(this,e,t,n)})),indentSelection:ni((function(e){for(var t=this,n=this.doc.sel.ranges,r=-1,i=0;i<n.length;i++){var o=n[i]
if(o.empty())o.head.line>r&&(Ma(t,o.head.line,e,!0),r=o.head.line,i==t.doc.sel.primIndex&&Fr(t))
else{var a=o.from(),l=o.to(),s=Math.max(r,a.line)
r=Math.min(t.lastLine(),l.line-(l.ch?0:1))+1
for(var u=s;u<r;++u)Ma(t,u,e)
var c=t.doc.sel.ranges
0==a.ch&&n.length==c.length&&c[i].from().ch>0&&Yi(t.doc,i,new Si(a,c[i].to()),U)}}})),getTokenAt:function(e,t){return xt(this,e,t)},getLineTokens:function(e,t){return xt(this,tt(e),t,!0)},getTokenTypeAt:function(e){e=st(this.doc,e)
var t,n=ht(this,$e(this.doc,e.line)),r=0,i=(n.length-1)/2,o=e.ch
if(0==o)t=n[2]
else for(;;){var a=r+i>>1
if((a?n[2*a-1]:0)>=o)i=a
else{if(!(n[2*a+1]<o)){t=n[2*a+2]
break}r=a+1}}var l=t?t.indexOf("overlay "):-1
return l<0?t:0==l?null:t.slice(0,l-1)},getModeAt:function(t){var n=this.doc.mode
return n.innerMode?e.innerMode(n,this.getTokenAt(t).state).mode:n},getHelper:function(e,t){return this.getHelpers(e,t)[0]},getHelpers:function(e,t){var r=[]
if(!n.hasOwnProperty(t))return r
var i=n[t],o=this.getModeAt(e)
if("string"==typeof o[t])i[o[t]]&&r.push(i[o[t]])
else if(o[t])for(var a=0;a<o[t].length;a++){var l=i[o[t][a]]
l&&r.push(l)}else o.helperType&&i[o.helperType]?r.push(i[o.helperType]):i[o.name]&&r.push(i[o.name])
for(var s=0;s<i._global.length;s++){var u=i._global[s]
u.pred(o,this)&&-1==z(r,u.val)&&r.push(u.val)}return r},getStateAfter:function(e,t){var n=this.doc
return pt(this,(e=lt(n,null==e?n.first+n.size-1:e))+1,t).state},cursorCoords:function(e,t){var n=this.doc.sel.primary()
return Xn(this,null==e?n.head:"object"==typeof e?st(this.doc,e):e?n.from():n.to(),t||"page")},charCoords:function(e,t){return $n(this,st(this.doc,e),t||"page")},coordsChar:function(e,t){return Zn(this,(e=Vn(this,e,t||"page")).left,e.top)},lineAtHeight:function(e,t){return e=Vn(this,{top:e,left:0},t||"page").top,Qe(this.doc,e+this.display.viewOffset)},heightAtLine:function(e,t,n){var r,i=!1
if("number"==typeof e){var o=this.doc.first+this.doc.size-1
e<this.doc.first?e=this.doc.first:e>o&&(e=o,i=!0),r=$e(this.doc,e)}else r=e
return Gn(this,r,{top:0,left:0},t||"page",n||i).top+(i?this.doc.height-qt(r):0)},defaultTextHeight:function(){return ir(this.display)},defaultCharWidth:function(){return or(this.display)},getViewport:function(){return{from:this.display.viewFrom,to:this.display.viewTo}},addWidget:function(e,t,n,r,i){var o,a,l=this.display,s=(e=Xn(this,st(this.doc,e))).bottom,u=e.left
if(t.style.position="absolute",t.setAttribute("cm-ignore-events","true"),this.display.input.setUneditable(t),l.sizer.appendChild(t),"over"==r)s=e.top
else if("above"==r||"near"==r){var c=Math.max(l.wrapper.clientHeight,this.doc.height),f=Math.max(l.sizer.clientWidth,l.lineSpace.clientWidth);("above"==r||e.bottom+t.offsetHeight>c)&&e.top>t.offsetHeight?s=e.top-t.offsetHeight:e.bottom+t.offsetHeight<=c&&(s=e.bottom),u+t.offsetWidth>f&&(u=f-t.offsetWidth)}t.style.top=s+"px",t.style.left=t.style.right="","right"==i?(u=l.sizer.clientWidth-t.offsetWidth,t.style.right="0px"):("left"==i?u=0:"middle"==i&&(u=(l.sizer.clientWidth-t.offsetWidth)/2),t.style.left=u+"px"),n&&(null!=(a=Er(o=this,{left:u,top:s,right:u+t.offsetWidth,bottom:s+t.offsetHeight})).scrollTop&&Hr(o,a.scrollTop),null!=a.scrollLeft&&Pr(o,a.scrollLeft))},triggerOnKeyDown:ni(ua),triggerOnKeyPress:ni(fa),triggerOnKeyUp:ca,triggerOnMouseDown:ni(ma),execCommand:function(e){if(ea.hasOwnProperty(e))return ea[e].call(null,this)},triggerElectric:ni((function(e){Fa(this,e)})),findPosH:function(e,t,n,r){var i=1
t<0&&(i=-1,t=-t)
for(var o=st(this.doc,e),a=0;a<t&&!(o=Ha(this.doc,o,i,n,r)).hitSide;++a);return o},moveH:ni((function(e,t){var n=this
this.extendSelectionsBy((function(r){return n.display.shift||n.doc.extend||r.empty()?Ha(n.doc,r.head,e,t,n.options.rtlMoveVisually):e<0?r.from():r.to()}),G)})),deleteH:ni((function(e,t){var n=this.doc.sel,r=this.doc
n.somethingSelected()?r.replaceSelection("",null,"+delete"):Yo(this,(function(n){var i=Ha(r,n.head,e,t,!1)
return e<0?{from:i,to:n.head}:{from:n.head,to:i}}))})),findPosV:function(e,t,n,r){var i=1,o=r
t<0&&(i=-1,t=-t)
for(var a=st(this.doc,e),l=0;l<t;++l){var s=Xn(this,a,"div")
if(null==o?o=s.left:s.left=o,(a=Wa(this,s,i,n)).hitSide)break}return a},moveV:ni((function(e,t){var n=this,r=this.doc,i=[],o=!this.display.shift&&!r.extend&&r.sel.somethingSelected()
if(r.extendSelectionsBy((function(a){if(o)return e<0?a.from():a.to()
var l=Xn(n,a.head,"div")
null!=a.goalColumn&&(l.left=a.goalColumn),i.push(l.left)
var s=Wa(n,l,e,t)
return"page"==t&&a==r.sel.primary()&&Dr(n,$n(n,s,"div").top-l.top),s}),G),i.length)for(var a=0;a<r.sel.ranges.length;a++)r.sel.ranges[a].goalColumn=i[a]})),findWordAt:function(e){var t=$e(this.doc,e.line).text,n=e.ch,r=e.ch
if(t){var i=this.getHelper(e,"wordChars")
"before"!=e.sticky&&r!=t.length||!n?++r:--n
for(var o=t.charAt(n),a=te(o,i)?function(e){return te(e,i)}:/\s/.test(o)?function(e){return/\s/.test(e)}:function(e){return!/\s/.test(e)&&!te(e)};n>0&&a(t.charAt(n-1));)--n
for(;r<t.length&&a(t.charAt(r));)++r}return new Si(tt(e.line,n),tt(e.line,r))},toggleOverwrite:function(e){null!=e&&e==this.state.overwrite||((this.state.overwrite=!this.state.overwrite)?O(this.display.cursorDiv,"CodeMirror-overwrite"):T(this.display.cursorDiv,"CodeMirror-overwrite"),me(this,"overwriteToggle",this,this.state.overwrite))},hasFocus:function(){return this.display.input.getField()==F()},isReadOnly:function(){return!(!this.options.readOnly&&!this.doc.cantEdit)},scrollTo:ni((function(e,t){Or(this,e,t)})),getScrollInfo:function(){var e=this.display.scroller
return{left:e.scrollLeft,top:e.scrollTop,height:e.scrollHeight-Mn(this)-this.display.barHeight,width:e.scrollWidth-Mn(this)-this.display.barWidth,clientHeight:Nn(this),clientWidth:An(this)}},scrollIntoView:ni((function(e,t){null==e?(e={from:this.doc.sel.primary().head,to:null},null==t&&(t=this.options.cursorScrollMargin)):"number"==typeof e?e={from:tt(e,0),to:null}:null==e.from&&(e={from:e,to:null}),e.to||(e.to=e.from),e.margin=t||0,null!=e.from.line?function(e,t){Ir(e),e.curOp.scrollToPos=t}(this,e):Br(this,e.from,e.to,e.margin)})),setSize:ni((function(e,t){var n=this,r=function(e){return"number"==typeof e||/^\d+$/.test(String(e))?e+"px":e}
null!=e&&(this.display.wrapper.style.width=r(e)),null!=t&&(this.display.wrapper.style.height=r(t)),this.options.lineWrapping&&zn(this)
var i=this.display.viewFrom
this.doc.iter(i,this.display.viewTo,(function(e){if(e.widgets)for(var t=0;t<e.widgets.length;t++)if(e.widgets[t].noHScroll){hr(n,i,"widget")
break}++i})),this.curOp.forceUpdate=!0,me(this,"refresh",this)})),operation:function(e){return ei(this,e)},startOperation:function(){return $r(this)},endOperation:function(){return Xr(this)},refresh:ni((function(){var e=this.display.cachedTextHeight
dr(this),this.curOp.forceUpdate=!0,jn(this),Or(this,this.doc.scrollLeft,this.doc.scrollTop),ci(this.display),(null==e||Math.abs(e-ir(this.display))>.5)&&ur(this),me(this,"refresh",this)})),swapDoc:ni((function(e){var t=this.doc
return t.cm=null,this.state.selectingText&&this.state.selectingText(),Hi(this,e),jn(this),this.display.input.reset(),Or(this,e.scrollLeft,e.scrollTop),this.curOp.forceScroll=!0,un(this,"swapDoc",this,t),t})),phrase:function(e){var t=this.options.phrases
return t&&Object.prototype.hasOwnProperty.call(t,e)?t[e]:e},getInputField:function(){return this.display.input.getField()},getWrapperElement:function(){return this.display.wrapper},getScrollerElement:function(){return this.display.scroller},getGutterElement:function(){return this.display.gutters}},xe(e),e.registerHelper=function(t,r,i){n.hasOwnProperty(t)||(n[t]=e[t]={_global:[]}),n[t][r]=i},e.registerGlobalHelper=function(t,r,i,o){e.registerHelper(t,r,o),n[t]._global.push({pred:i,val:o})}}(La)
var qa="iter insert remove copy getEditor constructor".split(" ")
for(var Ga in Do.prototype)Do.prototype.hasOwnProperty(Ga)&&z(qa,Ga)<0&&(La.prototype[Ga]=function(e){return function(){return e.apply(this.doc,arguments)}}(Do.prototype[Ga]))
return xe(Do),La.inputStyles={textarea:Ua,contenteditable:Pa},La.defineMode=function(e){La.defaults.mode||"null"==e||(La.defaults.mode=e),Pe.apply(this,arguments)},La.defineMIME=function(e,t){We[e]=t},La.defineMode("null",(function(){return{token:function(e){return e.skipToEnd()}}})),La.defineMIME("text/plain","null"),La.defineExtension=function(e,t){La.prototype[e]=t},La.defineDocExtension=function(e,t){Do.prototype[e]=t},La.fromTextArea=function(e,t){if((t=t?W(t):{}).value=e.value,!t.tabindex&&e.tabIndex&&(t.tabindex=e.tabIndex),!t.placeholder&&e.placeholder&&(t.placeholder=e.placeholder),null==t.autofocus){var n=F()
t.autofocus=n==e||null!=e.getAttribute("autofocus")&&n==document.body}function r(){e.value=l.getValue()}var i
if(e.form&&(de(e.form,"submit",r),!t.leaveSubmitMethodAlone)){var o=e.form
i=o.submit
try{var a=o.submit=function(){r(),o.submit=i,o.submit(),o.submit=a}}catch(e){}}t.finishInit=function(t){t.save=r,t.getTextArea=function(){return e},t.toTextArea=function(){t.toTextArea=isNaN,r(),e.parentNode.removeChild(t.getWrapperElement()),e.style.display="",e.form&&(pe(e.form,"submit",r),"function"==typeof e.form.submit&&(e.form.submit=i))}},e.style.display="none"
var l=La((function(t){return e.parentNode.insertBefore(t,e.nextSibling)}),t)
return l},function(e){e.off=pe,e.on=de,e.wheelEventPixels=wi,e.Doc=Do,e.splitLines=Fe,e.countColumn=P,e.findColumn=V,e.isWordChar=ee,e.Pass=_,e.signal=me,e.Line=$t,e.changeEnd=Mi,e.scrollbarModel=qr,e.Pos=tt,e.cmpPos=nt,e.modes=He,e.mimeModes=We,e.resolveMode=Re,e.getMode=ze,e.modeExtensions=je,e.extendMode=_e,e.copyState=Ue,e.startState=Ge,e.innerMode=qe,e.commands=ea,e.keyMap=_o,e.keyName=Xo,e.isModifierKey=Vo,e.lookupKey=Go,e.normalizeKeyMap=qo,e.StringStream=Ve,e.SharedTextMarker=Mo,e.TextMarker=Lo,e.LineWidget=Co,e.e_preventDefault=be,e.e_stopPropagation=we,e.e_stop=ke,e.addClass=O,e.contains=D,e.rmClass=T,e.keyNames=Po}(La),La.version="5.48.0",La}))},{}],11:[function(e,t,n){var r
r=function(e){"use strict"
var t=/^((?:(?:aaas?|about|acap|adiumxtra|af[ps]|aim|apt|attachment|aw|beshare|bitcoin|bolo|callto|cap|chrome(?:-extension)?|cid|coap|com-eventbrite-attendee|content|crid|cvs|data|dav|dict|dlna-(?:playcontainer|playsingle)|dns|doi|dtn|dvb|ed2k|facetime|feed|file|finger|fish|ftp|geo|gg|git|gizmoproject|go|gopher|gtalk|h323|hcp|https?|iax|icap|icon|im|imap|info|ipn|ipp|irc[6s]?|iris(?:\.beep|\.lwz|\.xpc|\.xpcs)?|itms|jar|javascript|jms|keyparc|lastfm|ldaps?|magnet|mailto|maps|market|message|mid|mms|ms-help|msnim|msrps?|mtqp|mumble|mupdate|mvn|news|nfs|nih?|nntp|notes|oid|opaquelocktoken|palm|paparazzi|platform|pop|pres|proxy|psyc|query|res(?:ource)?|rmi|rsync|rtmp|rtsp|secondlife|service|session|sftp|sgn|shttp|sieve|sips?|skype|sm[bs]|snmp|soap\.beeps?|soldat|spotify|ssh|steam|svn|tag|teamspeak|tel(?:net)?|tftp|things|thismessage|tip|tn3270|tv|udp|unreal|urn|ut2004|vemmi|ventrilo|view-source|webcal|wss?|wtai|wyciwyg|xcon(?:-userid)?|xfire|xmlrpc\.beeps?|xmpp|xri|ymsgr|z39\.50[rs]?):(?:\/{1,3}|[a-z0-9%])|www\d{0,3}[.]|[a-z0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]|\([^\s()<>]*\))+(?:\([^\s()<>]*\)|[^\s`*!()\[\]{};:'".,<>?«»“”‘’]))/i
e.defineMode("gfm",(function(n,r){var i=0,o={startState:function(){return{code:!1,codeBlock:!1,ateSpace:!1}},copyState:function(e){return{code:e.code,codeBlock:e.codeBlock,ateSpace:e.ateSpace}},token:function(e,n){if(n.combineTokens=null,n.codeBlock)return e.match(/^```+/)?(n.codeBlock=!1,null):(e.skipToEnd(),null)
if(e.sol()&&(n.code=!1),e.sol()&&e.match(/^```+/))return e.skipToEnd(),n.codeBlock=!0,null
if("`"===e.peek()){e.next()
var o=e.pos
e.eatWhile("`")
var a=1+e.pos-o
return n.code?a===i&&(n.code=!1):(i=a,n.code=!0),null}if(n.code)return e.next(),null
if(e.eatSpace())return n.ateSpace=!0,null
if((e.sol()||n.ateSpace)&&(n.ateSpace=!1,!1!==r.gitHubSpice)){if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+@)?(?=.{0,6}\d)(?:[a-f0-9]{7,40}\b)/))return n.combineTokens=!0,"link"
if(e.match(/^(?:[a-zA-Z0-9\-_]+\/)?(?:[a-zA-Z0-9\-_]+)?#[0-9]+\b/))return n.combineTokens=!0,"link"}return e.match(t)&&"]("!=e.string.slice(e.start-2,e.start)&&(0==e.start||/\W/.test(e.string.charAt(e.start-1)))?(n.combineTokens=!0,"link"):(e.next(),null)},blankLine:function(e){return e.code=!1,null}},a={taskLists:!0,strikethrough:!0,emoji:!0}
for(var l in r)a[l]=r[l]
return a.name="markdown",e.overlayMode(e.getMode(n,a),o)}),"markdown"),e.defineMIME("text/x-gfm","gfm")},"object"==typeof n&&"object"==typeof t?r(e("../../lib/codemirror"),e("../markdown/markdown"),e("../../addon/mode/overlay")):r(CodeMirror)},{"../../addon/mode/overlay":8,"../../lib/codemirror":10,"../markdown/markdown":12}],12:[function(e,t,n){var r
r=function(e){"use strict"
e.defineMode("markdown",(function(t,n){var r=e.getMode(t,"text/html"),i="null"==r.name
void 0===n.highlightFormatting&&(n.highlightFormatting=!1),void 0===n.maxBlockquoteDepth&&(n.maxBlockquoteDepth=0),void 0===n.taskLists&&(n.taskLists=!1),void 0===n.strikethrough&&(n.strikethrough=!1),void 0===n.emoji&&(n.emoji=!1),void 0===n.fencedCodeBlockHighlighting&&(n.fencedCodeBlockHighlighting=!0),void 0===n.xml&&(n.xml=!0),void 0===n.tokenTypeOverrides&&(n.tokenTypeOverrides={})
var o={header:"header",code:"comment",quote:"quote",list1:"variable-2",list2:"variable-3",list3:"keyword",hr:"hr",image:"image",imageAltText:"image-alt-text",imageMarker:"image-marker",formatting:"formatting",linkInline:"link",linkEmail:"link",linkText:"link",linkHref:"string",em:"em",strong:"strong",strikethrough:"strikethrough",emoji:"builtin"}
for(var a in o)o.hasOwnProperty(a)&&n.tokenTypeOverrides[a]&&(o[a]=n.tokenTypeOverrides[a])
var l=/^([*\-_])(?:\s*\1){2,}\s*$/,s=/^(?:[*\-+]|^[0-9]+([.)]))\s+/,u=/^\[(x| )\](?=\s)/i,c=n.allowAtxHeaderWithoutSpace?/^(#+)/:/^(#+)(?: |$)/,f=/^ *(?:\={1,}|-{1,})\s*$/,d=/^[^#!\[\]*_\\<>` "'(~:]+/,h=/^(~~~+|```+)[ \t]*([\w+#-]*)[^\n`]*$/,p=/^\s*\[[^\]]+?\]:.*$/,m=/[!"#$%&'()*+,\-.\/:;<=>?@\[\\\]^_`{|}~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u0AF0\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166D\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E42\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]|\uD800[\uDD00-\uDD02\uDF9F\uDFD0]|\uD801\uDD6F|\uD802[\uDC57\uDD1F\uDD3F\uDE50-\uDE58\uDE7F\uDEF0-\uDEF6\uDF39-\uDF3F\uDF99-\uDF9C]|\uD804[\uDC47-\uDC4D\uDCBB\uDCBC\uDCBE-\uDCC1\uDD40-\uDD43\uDD74\uDD75\uDDC5-\uDDC9\uDDCD\uDDDB\uDDDD-\uDDDF\uDE38-\uDE3D\uDEA9]|\uD805[\uDCC6\uDDC1-\uDDD7\uDE41-\uDE43\uDF3C-\uDF3E]|\uD809[\uDC70-\uDC74]|\uD81A[\uDE6E\uDE6F\uDEF5\uDF37-\uDF3B\uDF44]|\uD82F\uDC9F|\uD836[\uDE87-\uDE8B]/
function g(e,t,n){return t.f=t.inline=n,n(e,t)}function v(e,t,n){return t.f=t.block=n,n(e,t)}function y(t){if(t.linkTitle=!1,t.linkHref=!1,t.linkText=!1,t.em=!1,t.strong=!1,t.strikethrough=!1,t.quote=0,t.indentedCode=!1,t.f==b){var n=i
if(!n){var o=e.innerMode(r,t.htmlState)
n="xml"==o.mode.name&&null===o.state.tagStart&&!o.state.context&&o.state.tokenize.isInText}n&&(t.f=S,t.block=x,t.htmlState=null)}return t.trailingSpace=0,t.trailingSpaceNewLine=!1,t.prevLine=t.thisLine,t.thisLine={stream:null},null}function x(r,i){var a,d=r.column()===i.indentation,m=!(a=i.prevLine.stream)||!/\S/.test(a.string),v=i.indentedCode,y=i.prevLine.hr,x=!1!==i.list,b=(i.listStack[i.listStack.length-1]||0)+3
i.indentedCode=!1
var k=i.indentation
if(null===i.indentationDiff&&(i.indentationDiff=i.indentation,x)){for(i.em=!1,i.strong=!1,i.code=!1,i.strikethrough=!1,i.list=null;k<i.listStack[i.listStack.length-1];)i.listStack.pop(),i.listStack.length?i.indentation=i.listStack[i.listStack.length-1]:i.list=!1
!1!==i.list&&(i.indentationDiff=k-i.listStack[i.listStack.length-1])}var S=!(m||y||i.prevLine.header||x&&v||i.prevLine.fencedCodeEnd),L=(!1===i.list||y||m)&&i.indentation<=b&&r.match(l),T=null
if(i.indentationDiff>=4&&(v||i.prevLine.fencedCodeEnd||i.prevLine.header||m))return r.skipToEnd(),i.indentedCode=!0,o.code
if(r.eatSpace())return null
if(d&&i.indentation<=b&&(T=r.match(c))&&T[1].length<=6)return i.quote=0,i.header=T[1].length,i.thisLine.header=!0,n.highlightFormatting&&(i.formatting="header"),i.f=i.inline,C(i)
if(i.indentation<=b&&r.eat(">"))return i.quote=d?1:i.quote+1,n.highlightFormatting&&(i.formatting="quote"),r.eatSpace(),C(i)
if(!L&&!i.setext&&d&&i.indentation<=b&&(T=r.match(s))){var M=T[1]?"ol":"ul"
return i.indentation=k+r.current().length,i.list=!0,i.quote=0,i.listStack.push(i.indentation),n.taskLists&&r.match(u,!1)&&(i.taskList=!0),i.f=i.inline,n.highlightFormatting&&(i.formatting=["list","list-"+M]),C(i)}return d&&i.indentation<=b&&(T=r.match(h,!0))?(i.quote=0,i.fencedEndRE=new RegExp(T[1]+"+ *$"),i.localMode=n.fencedCodeBlockHighlighting&&function(n){if(e.findModeByName){var r=e.findModeByName(n)
r&&(n=r.mime||r.mimes[0])}var i=e.getMode(t,n)
return"null"==i.name?null:i}(T[2]),i.localMode&&(i.localState=e.startState(i.localMode)),i.f=i.block=w,n.highlightFormatting&&(i.formatting="code-block"),i.code=-1,C(i)):i.setext||!(S&&x||i.quote||!1!==i.list||i.code||L||p.test(r.string))&&(T=r.lookAhead(1))&&(T=T.match(f))?(i.setext?(i.header=i.setext,i.setext=0,r.skipToEnd(),n.highlightFormatting&&(i.formatting="header")):(i.header="="==T[0].charAt(0)?1:2,i.setext=i.header),i.thisLine.header=!0,i.f=i.inline,C(i)):L?(r.skipToEnd(),i.hr=!0,i.thisLine.hr=!0,o.hr):"["===r.peek()?g(r,i,A):g(r,i,i.inline)}function b(t,n){var o=r.token(t,n.htmlState)
if(!i){var a=e.innerMode(r,n.htmlState);("xml"==a.mode.name&&null===a.state.tagStart&&!a.state.context&&a.state.tokenize.isInText||n.md_inside&&t.current().indexOf(">")>-1)&&(n.f=S,n.block=x,n.htmlState=null)}return o}function w(e,t){var r,i=t.listStack[t.listStack.length-1]||0,a=t.indentation<i,l=i+3
return t.fencedEndRE&&t.indentation<=l&&(a||e.match(t.fencedEndRE))?(n.highlightFormatting&&(t.formatting="code-block"),a||(r=C(t)),t.localMode=t.localState=null,t.block=x,t.f=S,t.fencedEndRE=null,t.code=0,t.thisLine.fencedCodeEnd=!0,a?v(e,t,t.block):r):t.localMode?t.localMode.token(e,t.localState):(e.skipToEnd(),o.code)}function C(e){var t=[]
if(e.formatting){t.push(o.formatting),"string"==typeof e.formatting&&(e.formatting=[e.formatting])
for(var r=0;r<e.formatting.length;r++)t.push(o.formatting+"-"+e.formatting[r]),"header"===e.formatting[r]&&t.push(o.formatting+"-"+e.formatting[r]+"-"+e.header),"quote"===e.formatting[r]&&(!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=e.quote?t.push(o.formatting+"-"+e.formatting[r]+"-"+e.quote):t.push("error"))}if(e.taskOpen)return t.push("meta"),t.length?t.join(" "):null
if(e.taskClosed)return t.push("property"),t.length?t.join(" "):null
if(e.linkHref?t.push(o.linkHref,"url"):(e.strong&&t.push(o.strong),e.em&&t.push(o.em),e.strikethrough&&t.push(o.strikethrough),e.emoji&&t.push(o.emoji),e.linkText&&t.push(o.linkText),e.code&&t.push(o.code),e.image&&t.push(o.image),e.imageAltText&&t.push(o.imageAltText,"link"),e.imageMarker&&t.push(o.imageMarker)),e.header&&t.push(o.header,o.header+"-"+e.header),e.quote&&(t.push(o.quote),!n.maxBlockquoteDepth||n.maxBlockquoteDepth>=e.quote?t.push(o.quote+"-"+e.quote):t.push(o.quote+"-"+n.maxBlockquoteDepth)),!1!==e.list){var i=(e.listStack.length-1)%3
i?1===i?t.push(o.list2):t.push(o.list3):t.push(o.list1)}return e.trailingSpaceNewLine?t.push("trailing-space-new-line"):e.trailingSpace&&t.push("trailing-space-"+(e.trailingSpace%2?"a":"b")),t.length?t.join(" "):null}function k(e,t){if(e.match(d,!0))return C(t)}function S(t,i){var a=i.text(t,i)
if(void 0!==a)return a
if(i.list)return i.list=null,C(i)
if(i.taskList)return" "===t.match(u,!0)[1]?i.taskOpen=!0:i.taskClosed=!0,n.highlightFormatting&&(i.formatting="task"),i.taskList=!1,C(i)
if(i.taskOpen=!1,i.taskClosed=!1,i.header&&t.match(/^#+$/,!0))return n.highlightFormatting&&(i.formatting="header"),C(i)
var l=t.next()
if(i.linkTitle){i.linkTitle=!1
var s=l
"("===l&&(s=")")
var c="^\\s*(?:[^"+(s=(s+"").replace(/([.?*+^\[\]\\(){}|-])/g,"\\$1"))+"\\\\]+|\\\\\\\\|\\\\.)"+s
if(t.match(new RegExp(c),!0))return o.linkHref}if("`"===l){var f=i.formatting
n.highlightFormatting&&(i.formatting="code"),t.eatWhile("`")
var d=t.current().length
if(0!=i.code||i.quote&&1!=d){if(d==i.code){var h=C(i)
return i.code=0,h}return i.formatting=f,C(i)}return i.code=d,C(i)}if(i.code)return C(i)
if("\\"===l&&(t.next(),n.highlightFormatting)){var p=C(i),g=o.formatting+"-escape"
return p?p+" "+g:g}if("!"===l&&t.match(/\[[^\]]*\] ?(?:\(|\[)/,!1))return i.imageMarker=!0,i.image=!0,n.highlightFormatting&&(i.formatting="image"),C(i)
if("["===l&&i.imageMarker&&t.match(/[^\]]*\](\(.*?\)| ?\[.*?\])/,!1))return i.imageMarker=!1,i.imageAltText=!0,n.highlightFormatting&&(i.formatting="image"),C(i)
if("]"===l&&i.imageAltText){n.highlightFormatting&&(i.formatting="image")
p=C(i)
return i.imageAltText=!1,i.image=!1,i.inline=i.f=T,p}if("["===l&&!i.image)return i.linkText&&t.match(/^.*?\]/)||(i.linkText=!0,n.highlightFormatting&&(i.formatting="link")),C(i)
if("]"===l&&i.linkText){n.highlightFormatting&&(i.formatting="link")
p=C(i)
return i.linkText=!1,i.inline=i.f=t.match(/\(.*?\)| ?\[.*?\]/,!1)?T:S,p}if("<"===l&&t.match(/^(https?|ftps?):\/\/(?:[^\\>]|\\.)+>/,!1))return i.f=i.inline=L,n.highlightFormatting&&(i.formatting="link"),(p=C(i))?p+=" ":p="",p+o.linkInline
if("<"===l&&t.match(/^[^> \\]+@(?:[^\\>]|\\.)+>/,!1))return i.f=i.inline=L,n.highlightFormatting&&(i.formatting="link"),(p=C(i))?p+=" ":p="",p+o.linkEmail
if(n.xml&&"<"===l&&t.match(/^(!--|\?|!\[CDATA\[|[a-z][a-z0-9-]*(?:\s+[a-z_:.\-]+(?:\s*=\s*[^>]+)?)*\s*(?:>|$))/i,!1)){var y=t.string.indexOf(">",t.pos)
if(-1!=y){var x=t.string.substring(t.start,y);/markdown\s*=\s*('|"){0,1}1('|"){0,1}/.test(x)&&(i.md_inside=!0)}return t.backUp(1),i.htmlState=e.startState(r),v(t,i,b)}if(n.xml&&"<"===l&&t.match(/^\/\w*?>/))return i.md_inside=!1,"tag"
if("*"===l||"_"===l){for(var w=1,k=1==t.pos?" ":t.string.charAt(t.pos-2);w<3&&t.eat(l);)w++
var M=t.peek()||" ",A=!/\s/.test(M)&&(!m.test(M)||/\s/.test(k)||m.test(k)),N=!/\s/.test(k)&&(!m.test(k)||/\s/.test(M)||m.test(M)),E=null,D=null
if(w%2&&(i.em||!A||"*"!==l&&N&&!m.test(k)?i.em!=l||!N||"*"!==l&&A&&!m.test(M)||(E=!1):E=!0),w>1&&(i.strong||!A||"*"!==l&&N&&!m.test(k)?i.strong!=l||!N||"*"!==l&&A&&!m.test(M)||(D=!1):D=!0),null!=D||null!=E)return n.highlightFormatting&&(i.formatting=null==E?"strong":null==D?"em":"strong em"),!0===E&&(i.em=l),!0===D&&(i.strong=l),h=C(i),!1===E&&(i.em=!1),!1===D&&(i.strong=!1),h}else if(" "===l&&(t.eat("*")||t.eat("_"))){if(" "===t.peek())return C(i)
t.backUp(1)}if(n.strikethrough)if("~"===l&&t.eatWhile(l)){if(i.strikethrough)return n.highlightFormatting&&(i.formatting="strikethrough"),h=C(i),i.strikethrough=!1,h
if(t.match(/^[^\s]/,!1))return i.strikethrough=!0,n.highlightFormatting&&(i.formatting="strikethrough"),C(i)}else if(" "===l&&t.match(/^~~/,!0)){if(" "===t.peek())return C(i)
t.backUp(2)}if(n.emoji&&":"===l&&t.match(/^(?:[a-z_\d+][a-z_\d+-]*|\-[a-z_\d+][a-z_\d+-]*):/)){i.emoji=!0,n.highlightFormatting&&(i.formatting="emoji")
var F=C(i)
return i.emoji=!1,F}return" "===l&&(t.match(/^ +$/,!1)?i.trailingSpace++:i.trailingSpace&&(i.trailingSpaceNewLine=!0)),C(i)}function L(e,t){if(">"===e.next()){t.f=t.inline=S,n.highlightFormatting&&(t.formatting="link")
var r=C(t)
return r?r+=" ":r="",r+o.linkInline}return e.match(/^[^>]+/,!0),o.linkInline}function T(e,t){if(e.eatSpace())return null
var r,i=e.next()
return"("===i||"["===i?(t.f=t.inline=(r="("===i?")":"]",function(e,t){if(e.next()===r){t.f=t.inline=S,n.highlightFormatting&&(t.formatting="link-string")
var i=C(t)
return t.linkHref=!1,i}return e.match(M[r]),t.linkHref=!0,C(t)}),n.highlightFormatting&&(t.formatting="link-string"),t.linkHref=!0,C(t)):"error"}var M={")":/^(?:[^\\\(\)]|\\.|\((?:[^\\\(\)]|\\.)*\))*?(?=\))/,"]":/^(?:[^\\\[\]]|\\.|\[(?:[^\\\[\]]|\\.)*\])*?(?=\])/}
function A(e,t){return e.match(/^([^\]\\]|\\.)*\]:/,!1)?(t.f=N,e.next(),n.highlightFormatting&&(t.formatting="link"),t.linkText=!0,C(t)):g(e,t,S)}function N(e,t){if(e.match(/^\]:/,!0)){t.f=t.inline=E,n.highlightFormatting&&(t.formatting="link")
var r=C(t)
return t.linkText=!1,r}return e.match(/^([^\]\\]|\\.)+/,!0),o.linkText}function E(e,t){return e.eatSpace()?null:(e.match(/^[^\s]+/,!0),void 0===e.peek()?t.linkTitle=!0:e.match(/^(?:\s+(?:"(?:[^"\\]|\\\\|\\.)+"|'(?:[^'\\]|\\\\|\\.)+'|\((?:[^)\\]|\\\\|\\.)+\)))?/,!0),t.f=t.inline=S,o.linkHref+" url")}var D={startState:function(){return{f:x,prevLine:{stream:null},thisLine:{stream:null},block:x,htmlState:null,indentation:0,inline:S,text:k,formatting:!1,linkText:!1,linkHref:!1,linkTitle:!1,code:0,em:!1,strong:!1,header:0,setext:0,hr:!1,taskList:!1,list:!1,listStack:[],quote:0,trailingSpace:0,trailingSpaceNewLine:!1,strikethrough:!1,emoji:!1,fencedEndRE:null}},copyState:function(t){return{f:t.f,prevLine:t.prevLine,thisLine:t.thisLine,block:t.block,htmlState:t.htmlState&&e.copyState(r,t.htmlState),indentation:t.indentation,localMode:t.localMode,localState:t.localMode?e.copyState(t.localMode,t.localState):null,inline:t.inline,text:t.text,formatting:!1,linkText:t.linkText,linkTitle:t.linkTitle,linkHref:t.linkHref,code:t.code,em:t.em,strong:t.strong,strikethrough:t.strikethrough,emoji:t.emoji,header:t.header,setext:t.setext,hr:t.hr,taskList:t.taskList,list:t.list,listStack:t.listStack.slice(0),quote:t.quote,indentedCode:t.indentedCode,trailingSpace:t.trailingSpace,trailingSpaceNewLine:t.trailingSpaceNewLine,md_inside:t.md_inside,fencedEndRE:t.fencedEndRE}},token:function(e,t){if(t.formatting=!1,e!=t.thisLine.stream){if(t.header=0,t.hr=!1,e.match(/^\s*$/,!0))return y(t),null
if(t.prevLine=t.thisLine,t.thisLine={stream:e},t.taskList=!1,t.trailingSpace=0,t.trailingSpaceNewLine=!1,!t.localState&&(t.f=t.block,t.f!=b)){var n=e.match(/^\s*/,!0)[0].replace(/\t/g,"    ").length
if(t.indentation=n,t.indentationDiff=null,n>0)return null}}return t.f(e,t)},innerMode:function(e){return e.block==b?{state:e.htmlState,mode:r}:e.localState?{state:e.localState,mode:e.localMode}:{state:e,mode:D}},indent:function(t,n,i){return t.block==b&&r.indent?r.indent(t.htmlState,n,i):t.localState&&t.localMode.indent?t.localMode.indent(t.localState,n,i):e.Pass},blankLine:y,getType:C,blockCommentStart:"\x3c!--",blockCommentEnd:"--\x3e",closeBrackets:"()[]{}''\"\"``",fold:"markdown"}
return D}),"xml"),e.defineMIME("text/markdown","markdown"),e.defineMIME("text/x-markdown","markdown")},"object"==typeof n&&"object"==typeof t?r(e("../../lib/codemirror"),e("../xml/xml"),e("../meta")):r(CodeMirror)},{"../../lib/codemirror":10,"../meta":13,"../xml/xml":14}],13:[function(e,t,n){(function(e){"use strict"
e.modeInfo=[{name:"APL",mime:"text/apl",mode:"apl",ext:["dyalog","apl"]},{name:"PGP",mimes:["application/pgp","application/pgp-encrypted","application/pgp-keys","application/pgp-signature"],mode:"asciiarmor",ext:["asc","pgp","sig"]},{name:"ASN.1",mime:"text/x-ttcn-asn",mode:"asn.1",ext:["asn","asn1"]},{name:"Asterisk",mime:"text/x-asterisk",mode:"asterisk",file:/^extensions\.conf$/i},{name:"Brainfuck",mime:"text/x-brainfuck",mode:"brainfuck",ext:["b","bf"]},{name:"C",mime:"text/x-csrc",mode:"clike",ext:["c","h","ino"]},{name:"C++",mime:"text/x-c++src",mode:"clike",ext:["cpp","c++","cc","cxx","hpp","h++","hh","hxx"],alias:["cpp"]},{name:"Cobol",mime:"text/x-cobol",mode:"cobol",ext:["cob","cpy"]},{name:"C#",mime:"text/x-csharp",mode:"clike",ext:["cs"],alias:["csharp","cs"]},{name:"Clojure",mime:"text/x-clojure",mode:"clojure",ext:["clj","cljc","cljx"]},{name:"ClojureScript",mime:"text/x-clojurescript",mode:"clojure",ext:["cljs"]},{name:"Closure Stylesheets (GSS)",mime:"text/x-gss",mode:"css",ext:["gss"]},{name:"CMake",mime:"text/x-cmake",mode:"cmake",ext:["cmake","cmake.in"],file:/^CMakeLists.txt$/},{name:"CoffeeScript",mimes:["application/vnd.coffeescript","text/coffeescript","text/x-coffeescript"],mode:"coffeescript",ext:["coffee"],alias:["coffee","coffee-script"]},{name:"Common Lisp",mime:"text/x-common-lisp",mode:"commonlisp",ext:["cl","lisp","el"],alias:["lisp"]},{name:"Cypher",mime:"application/x-cypher-query",mode:"cypher",ext:["cyp","cypher"]},{name:"Cython",mime:"text/x-cython",mode:"python",ext:["pyx","pxd","pxi"]},{name:"Crystal",mime:"text/x-crystal",mode:"crystal",ext:["cr"]},{name:"CSS",mime:"text/css",mode:"css",ext:["css"]},{name:"CQL",mime:"text/x-cassandra",mode:"sql",ext:["cql"]},{name:"D",mime:"text/x-d",mode:"d",ext:["d"]},{name:"Dart",mimes:["application/dart","text/x-dart"],mode:"dart",ext:["dart"]},{name:"diff",mime:"text/x-diff",mode:"diff",ext:["diff","patch"]},{name:"Django",mime:"text/x-django",mode:"django"},{name:"Dockerfile",mime:"text/x-dockerfile",mode:"dockerfile",file:/^Dockerfile$/},{name:"DTD",mime:"application/xml-dtd",mode:"dtd",ext:["dtd"]},{name:"Dylan",mime:"text/x-dylan",mode:"dylan",ext:["dylan","dyl","intr"]},{name:"EBNF",mime:"text/x-ebnf",mode:"ebnf"},{name:"ECL",mime:"text/x-ecl",mode:"ecl",ext:["ecl"]},{name:"edn",mime:"application/edn",mode:"clojure",ext:["edn"]},{name:"Eiffel",mime:"text/x-eiffel",mode:"eiffel",ext:["e"]},{name:"Elm",mime:"text/x-elm",mode:"elm",ext:["elm"]},{name:"Embedded Javascript",mime:"application/x-ejs",mode:"htmlembedded",ext:["ejs"]},{name:"Embedded Ruby",mime:"application/x-erb",mode:"htmlembedded",ext:["erb"]},{name:"Erlang",mime:"text/x-erlang",mode:"erlang",ext:["erl"]},{name:"Esper",mime:"text/x-esper",mode:"sql"},{name:"Factor",mime:"text/x-factor",mode:"factor",ext:["factor"]},{name:"FCL",mime:"text/x-fcl",mode:"fcl"},{name:"Forth",mime:"text/x-forth",mode:"forth",ext:["forth","fth","4th"]},{name:"Fortran",mime:"text/x-fortran",mode:"fortran",ext:["f","for","f77","f90","f95"]},{name:"F#",mime:"text/x-fsharp",mode:"mllike",ext:["fs"],alias:["fsharp"]},{name:"Gas",mime:"text/x-gas",mode:"gas",ext:["s"]},{name:"Gherkin",mime:"text/x-feature",mode:"gherkin",ext:["feature"]},{name:"GitHub Flavored Markdown",mime:"text/x-gfm",mode:"gfm",file:/^(readme|contributing|history).md$/i},{name:"Go",mime:"text/x-go",mode:"go",ext:["go"]},{name:"Groovy",mime:"text/x-groovy",mode:"groovy",ext:["groovy","gradle"],file:/^Jenkinsfile$/},{name:"HAML",mime:"text/x-haml",mode:"haml",ext:["haml"]},{name:"Haskell",mime:"text/x-haskell",mode:"haskell",ext:["hs"]},{name:"Haskell (Literate)",mime:"text/x-literate-haskell",mode:"haskell-literate",ext:["lhs"]},{name:"Haxe",mime:"text/x-haxe",mode:"haxe",ext:["hx"]},{name:"HXML",mime:"text/x-hxml",mode:"haxe",ext:["hxml"]},{name:"ASP.NET",mime:"application/x-aspx",mode:"htmlembedded",ext:["aspx"],alias:["asp","aspx"]},{name:"HTML",mime:"text/html",mode:"htmlmixed",ext:["html","htm","handlebars","hbs"],alias:["xhtml"]},{name:"HTTP",mime:"message/http",mode:"http"},{name:"IDL",mime:"text/x-idl",mode:"idl",ext:["pro"]},{name:"Pug",mime:"text/x-pug",mode:"pug",ext:["jade","pug"],alias:["jade"]},{name:"Java",mime:"text/x-java",mode:"clike",ext:["java"]},{name:"Java Server Pages",mime:"application/x-jsp",mode:"htmlembedded",ext:["jsp"],alias:["jsp"]},{name:"JavaScript",mimes:["text/javascript","text/ecmascript","application/javascript","application/x-javascript","application/ecmascript"],mode:"javascript",ext:["js"],alias:["ecmascript","js","node"]},{name:"JSON",mimes:["application/json","application/x-json"],mode:"javascript",ext:["json","map"],alias:["json5"]},{name:"JSON-LD",mime:"application/ld+json",mode:"javascript",ext:["jsonld"],alias:["jsonld"]},{name:"JSX",mime:"text/jsx",mode:"jsx",ext:["jsx"]},{name:"Jinja2",mime:"text/jinja2",mode:"jinja2",ext:["j2","jinja","jinja2"]},{name:"Julia",mime:"text/x-julia",mode:"julia",ext:["jl"]},{name:"Kotlin",mime:"text/x-kotlin",mode:"clike",ext:["kt"]},{name:"LESS",mime:"text/x-less",mode:"css",ext:["less"]},{name:"LiveScript",mime:"text/x-livescript",mode:"livescript",ext:["ls"],alias:["ls"]},{name:"Lua",mime:"text/x-lua",mode:"lua",ext:["lua"]},{name:"Markdown",mime:"text/x-markdown",mode:"markdown",ext:["markdown","md","mkd"]},{name:"mIRC",mime:"text/mirc",mode:"mirc"},{name:"MariaDB SQL",mime:"text/x-mariadb",mode:"sql"},{name:"Mathematica",mime:"text/x-mathematica",mode:"mathematica",ext:["m","nb"]},{name:"Modelica",mime:"text/x-modelica",mode:"modelica",ext:["mo"]},{name:"MUMPS",mime:"text/x-mumps",mode:"mumps",ext:["mps"]},{name:"MS SQL",mime:"text/x-mssql",mode:"sql"},{name:"mbox",mime:"application/mbox",mode:"mbox",ext:["mbox"]},{name:"MySQL",mime:"text/x-mysql",mode:"sql"},{name:"Nginx",mime:"text/x-nginx-conf",mode:"nginx",file:/nginx.*\.conf$/i},{name:"NSIS",mime:"text/x-nsis",mode:"nsis",ext:["nsh","nsi"]},{name:"NTriples",mimes:["application/n-triples","application/n-quads","text/n-triples"],mode:"ntriples",ext:["nt","nq"]},{name:"Objective-C",mime:"text/x-objectivec",mode:"clike",ext:["m","mm"],alias:["objective-c","objc"]},{name:"OCaml",mime:"text/x-ocaml",mode:"mllike",ext:["ml","mli","mll","mly"]},{name:"Octave",mime:"text/x-octave",mode:"octave",ext:["m"]},{name:"Oz",mime:"text/x-oz",mode:"oz",ext:["oz"]},{name:"Pascal",mime:"text/x-pascal",mode:"pascal",ext:["p","pas"]},{name:"PEG.js",mime:"null",mode:"pegjs",ext:["jsonld"]},{name:"Perl",mime:"text/x-perl",mode:"perl",ext:["pl","pm"]},{name:"PHP",mimes:["text/x-php","application/x-httpd-php","application/x-httpd-php-open"],mode:"php",ext:["php","php3","php4","php5","php7","phtml"]},{name:"Pig",mime:"text/x-pig",mode:"pig",ext:["pig"]},{name:"Plain Text",mime:"text/plain",mode:"null",ext:["txt","text","conf","def","list","log"]},{name:"PLSQL",mime:"text/x-plsql",mode:"sql",ext:["pls"]},{name:"PostgreSQL",mime:"text/x-pgsql",mode:"sql"},{name:"PowerShell",mime:"application/x-powershell",mode:"powershell",ext:["ps1","psd1","psm1"]},{name:"Properties files",mime:"text/x-properties",mode:"properties",ext:["properties","ini","in"],alias:["ini","properties"]},{name:"ProtoBuf",mime:"text/x-protobuf",mode:"protobuf",ext:["proto"]},{name:"Python",mime:"text/x-python",mode:"python",ext:["BUILD","bzl","py","pyw"],file:/^(BUCK|BUILD)$/},{name:"Puppet",mime:"text/x-puppet",mode:"puppet",ext:["pp"]},{name:"Q",mime:"text/x-q",mode:"q",ext:["q"]},{name:"R",mime:"text/x-rsrc",mode:"r",ext:["r","R"],alias:["rscript"]},{name:"reStructuredText",mime:"text/x-rst",mode:"rst",ext:["rst"],alias:["rst"]},{name:"RPM Changes",mime:"text/x-rpm-changes",mode:"rpm"},{name:"RPM Spec",mime:"text/x-rpm-spec",mode:"rpm",ext:["spec"]},{name:"Ruby",mime:"text/x-ruby",mode:"ruby",ext:["rb"],alias:["jruby","macruby","rake","rb","rbx"]},{name:"Rust",mime:"text/x-rustsrc",mode:"rust",ext:["rs"]},{name:"SAS",mime:"text/x-sas",mode:"sas",ext:["sas"]},{name:"Sass",mime:"text/x-sass",mode:"sass",ext:["sass"]},{name:"Scala",mime:"text/x-scala",mode:"clike",ext:["scala"]},{name:"Scheme",mime:"text/x-scheme",mode:"scheme",ext:["scm","ss"]},{name:"SCSS",mime:"text/x-scss",mode:"css",ext:["scss"]},{name:"Shell",mimes:["text/x-sh","application/x-sh"],mode:"shell",ext:["sh","ksh","bash"],alias:["bash","sh","zsh"],file:/^PKGBUILD$/},{name:"Sieve",mime:"application/sieve",mode:"sieve",ext:["siv","sieve"]},{name:"Slim",mimes:["text/x-slim","application/x-slim"],mode:"slim",ext:["slim"]},{name:"Smalltalk",mime:"text/x-stsrc",mode:"smalltalk",ext:["st"]},{name:"Smarty",mime:"text/x-smarty",mode:"smarty",ext:["tpl"]},{name:"Solr",mime:"text/x-solr",mode:"solr"},{name:"SML",mime:"text/x-sml",mode:"mllike",ext:["sml","sig","fun","smackspec"]},{name:"Soy",mime:"text/x-soy",mode:"soy",ext:["soy"],alias:["closure template"]},{name:"SPARQL",mime:"application/sparql-query",mode:"sparql",ext:["rq","sparql"],alias:["sparul"]},{name:"Spreadsheet",mime:"text/x-spreadsheet",mode:"spreadsheet",alias:["excel","formula"]},{name:"SQL",mime:"text/x-sql",mode:"sql",ext:["sql"]},{name:"SQLite",mime:"text/x-sqlite",mode:"sql"},{name:"Squirrel",mime:"text/x-squirrel",mode:"clike",ext:["nut"]},{name:"Stylus",mime:"text/x-styl",mode:"stylus",ext:["styl"]},{name:"Swift",mime:"text/x-swift",mode:"swift",ext:["swift"]},{name:"sTeX",mime:"text/x-stex",mode:"stex"},{name:"LaTeX",mime:"text/x-latex",mode:"stex",ext:["text","ltx","tex"],alias:["tex"]},{name:"SystemVerilog",mime:"text/x-systemverilog",mode:"verilog",ext:["v","sv","svh"]},{name:"Tcl",mime:"text/x-tcl",mode:"tcl",ext:["tcl"]},{name:"Textile",mime:"text/x-textile",mode:"textile",ext:["textile"]},{name:"TiddlyWiki ",mime:"text/x-tiddlywiki",mode:"tiddlywiki"},{name:"Tiki wiki",mime:"text/tiki",mode:"tiki"},{name:"TOML",mime:"text/x-toml",mode:"toml",ext:["toml"]},{name:"Tornado",mime:"text/x-tornado",mode:"tornado"},{name:"troff",mime:"text/troff",mode:"troff",ext:["1","2","3","4","5","6","7","8","9"]},{name:"TTCN",mime:"text/x-ttcn",mode:"ttcn",ext:["ttcn","ttcn3","ttcnpp"]},{name:"TTCN_CFG",mime:"text/x-ttcn-cfg",mode:"ttcn-cfg",ext:["cfg"]},{name:"Turtle",mime:"text/turtle",mode:"turtle",ext:["ttl"]},{name:"TypeScript",mime:"application/typescript",mode:"javascript",ext:["ts"],alias:["ts"]},{name:"TypeScript-JSX",mime:"text/typescript-jsx",mode:"jsx",ext:["tsx"],alias:["tsx"]},{name:"Twig",mime:"text/x-twig",mode:"twig"},{name:"Web IDL",mime:"text/x-webidl",mode:"webidl",ext:["webidl"]},{name:"VB.NET",mime:"text/x-vb",mode:"vb",ext:["vb"]},{name:"VBScript",mime:"text/vbscript",mode:"vbscript",ext:["vbs"]},{name:"Velocity",mime:"text/velocity",mode:"velocity",ext:["vtl"]},{name:"Verilog",mime:"text/x-verilog",mode:"verilog",ext:["v"]},{name:"VHDL",mime:"text/x-vhdl",mode:"vhdl",ext:["vhd","vhdl"]},{name:"Vue.js Component",mimes:["script/x-vue","text/x-vue"],mode:"vue",ext:["vue"]},{name:"XML",mimes:["application/xml","text/xml"],mode:"xml",ext:["xml","xsl","xsd","svg"],alias:["rss","wsdl","xsd"]},{name:"XQuery",mime:"application/xquery",mode:"xquery",ext:["xy","xquery"]},{name:"Yacas",mime:"text/x-yacas",mode:"yacas",ext:["ys"]},{name:"YAML",mimes:["text/x-yaml","text/yaml"],mode:"yaml",ext:["yaml","yml"],alias:["yml"]},{name:"Z80",mime:"text/x-z80",mode:"z80",ext:["z80"]},{name:"mscgen",mime:"text/x-mscgen",mode:"mscgen",ext:["mscgen","mscin","msc"]},{name:"xu",mime:"text/x-xu",mode:"mscgen",ext:["xu"]},{name:"msgenny",mime:"text/x-msgenny",mode:"mscgen",ext:["msgenny"]}]
for(var t=0;t<e.modeInfo.length;t++){var n=e.modeInfo[t]
n.mimes&&(n.mime=n.mimes[0])}e.findModeByMIME=function(t){t=t.toLowerCase()
for(var n=0;n<e.modeInfo.length;n++){var r=e.modeInfo[n]
if(r.mime==t)return r
if(r.mimes)for(var i=0;i<r.mimes.length;i++)if(r.mimes[i]==t)return r}return/\+xml$/.test(t)?e.findModeByMIME("application/xml"):/\+json$/.test(t)?e.findModeByMIME("application/json"):void 0},e.findModeByExtension=function(t){for(var n=0;n<e.modeInfo.length;n++){var r=e.modeInfo[n]
if(r.ext)for(var i=0;i<r.ext.length;i++)if(r.ext[i]==t)return r}},e.findModeByFileName=function(t){for(var n=0;n<e.modeInfo.length;n++){var r=e.modeInfo[n]
if(r.file&&r.file.test(t))return r}var i=t.lastIndexOf("."),o=i>-1&&t.substring(i+1,t.length)
if(o)return e.findModeByExtension(o)},e.findModeByName=function(t){t=t.toLowerCase()
for(var n=0;n<e.modeInfo.length;n++){var r=e.modeInfo[n]
if(r.name.toLowerCase()==t)return r
if(r.alias)for(var i=0;i<r.alias.length;i++)if(r.alias[i].toLowerCase()==t)return r}}})("object"==typeof n&&"object"==typeof t?e("../lib/codemirror"):CodeMirror)},{"../lib/codemirror":10}],14:[function(e,t,n){(function(e){"use strict"
var t={autoSelfClosers:{area:!0,base:!0,br:!0,col:!0,command:!0,embed:!0,frame:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0,menuitem:!0},implicitlyClosed:{dd:!0,li:!0,optgroup:!0,option:!0,p:!0,rp:!0,rt:!0,tbody:!0,td:!0,tfoot:!0,th:!0,tr:!0},contextGrabbers:{dd:{dd:!0,dt:!0},dt:{dd:!0,dt:!0},li:{li:!0},option:{option:!0,optgroup:!0},optgroup:{optgroup:!0},p:{address:!0,article:!0,aside:!0,blockquote:!0,dir:!0,div:!0,dl:!0,fieldset:!0,footer:!0,form:!0,h1:!0,h2:!0,h3:!0,h4:!0,h5:!0,h6:!0,header:!0,hgroup:!0,hr:!0,menu:!0,nav:!0,ol:!0,p:!0,pre:!0,section:!0,table:!0,ul:!0},rp:{rp:!0,rt:!0},rt:{rp:!0,rt:!0},tbody:{tbody:!0,tfoot:!0},td:{td:!0,th:!0},tfoot:{tbody:!0},th:{td:!0,th:!0},thead:{tbody:!0,tfoot:!0},tr:{tr:!0}},doNotIndent:{pre:!0},allowUnquoted:!0,allowMissing:!0,caseFold:!0},n={autoSelfClosers:{},implicitlyClosed:{},contextGrabbers:{},doNotIndent:{},allowUnquoted:!1,allowMissing:!1,allowMissingTagName:!1,caseFold:!1}
e.defineMode("xml",(function(r,i){var o,a,l=r.indentUnit,s={},u=i.htmlMode?t:n
for(var c in u)s[c]=u[c]
for(var c in i)s[c]=i[c]
function f(e,t){function n(n){return t.tokenize=n,n(e,t)}var r=e.next()
return"<"==r?e.eat("!")?e.eat("[")?e.match("CDATA[")?n(h("atom","]]>")):null:e.match("--")?n(h("comment","--\x3e")):e.match("DOCTYPE",!0,!0)?(e.eatWhile(/[\w\._\-]/),n(p(1))):null:e.eat("?")?(e.eatWhile(/[\w\._\-]/),t.tokenize=h("meta","?>"),"meta"):(o=e.eat("/")?"closeTag":"openTag",t.tokenize=d,"tag bracket"):"&"==r?(e.eat("#")?e.eat("x")?e.eatWhile(/[a-fA-F\d]/)&&e.eat(";"):e.eatWhile(/[\d]/)&&e.eat(";"):e.eatWhile(/[\w\.\-:]/)&&e.eat(";"))?"atom":"error":(e.eatWhile(/[^&<]/),null)}function d(e,t){var n,r,i=e.next()
if(">"==i||"/"==i&&e.eat(">"))return t.tokenize=f,o=">"==i?"endTag":"selfcloseTag","tag bracket"
if("="==i)return o="equals",null
if("<"==i){t.tokenize=f,t.state=y,t.tagName=t.tagStart=null
var a=t.tokenize(e,t)
return a?a+" tag error":"tag error"}return/[\'\"]/.test(i)?(t.tokenize=(n=i,r=function(e,t){for(;!e.eol();)if(e.next()==n){t.tokenize=d
break}return"string"},r.isInAttribute=!0,r),t.stringStartCol=e.column(),t.tokenize(e,t)):(e.match(/^[^\s\u00a0=<>\"\']*[^\s\u00a0=<>\"\'\/]/),"word")}function h(e,t){return function(n,r){for(;!n.eol();){if(n.match(t)){r.tokenize=f
break}n.next()}return e}}function p(e){return function(t,n){for(var r;null!=(r=t.next());){if("<"==r)return n.tokenize=p(e+1),n.tokenize(t,n)
if(">"==r){if(1==e){n.tokenize=f
break}return n.tokenize=p(e-1),n.tokenize(t,n)}}return"meta"}}function m(e,t,n){this.prev=e.context,this.tagName=t,this.indent=e.indented,this.startOfLine=n,(s.doNotIndent.hasOwnProperty(t)||e.context&&e.context.noIndent)&&(this.noIndent=!0)}function g(e){e.context&&(e.context=e.context.prev)}function v(e,t){for(var n;;){if(!e.context)return
if(n=e.context.tagName,!s.contextGrabbers.hasOwnProperty(n)||!s.contextGrabbers[n].hasOwnProperty(t))return
g(e)}}function y(e,t,n){return"openTag"==e?(n.tagStart=t.column(),x):"closeTag"==e?b:y}function x(e,t,n){return"word"==e?(n.tagName=t.current(),a="tag",k):s.allowMissingTagName&&"endTag"==e?(a="tag bracket",k(e,0,n)):(a="error",x)}function b(e,t,n){if("word"==e){var r=t.current()
return n.context&&n.context.tagName!=r&&s.implicitlyClosed.hasOwnProperty(n.context.tagName)&&g(n),n.context&&n.context.tagName==r||!1===s.matchClosing?(a="tag",w):(a="tag error",C)}return s.allowMissingTagName&&"endTag"==e?(a="tag bracket",w(e,0,n)):(a="error",C)}function w(e,t,n){return"endTag"!=e?(a="error",w):(g(n),y)}function C(e,t,n){return a="error",w(e,0,n)}function k(e,t,n){if("word"==e)return a="attribute",S
if("endTag"==e||"selfcloseTag"==e){var r=n.tagName,i=n.tagStart
return n.tagName=n.tagStart=null,"selfcloseTag"==e||s.autoSelfClosers.hasOwnProperty(r)?v(n,r):(v(n,r),n.context=new m(n,r,i==n.indented)),y}return a="error",k}function S(e,t,n){return"equals"==e?L:(s.allowMissing||(a="error"),k(e,0,n))}function L(e,t,n){return"string"==e?T:"word"==e&&s.allowUnquoted?(a="string",k):(a="error",k(e,0,n))}function T(e,t,n){return"string"==e?T:k(e,0,n)}return f.isInText=!0,{startState:function(e){var t={tokenize:f,state:y,indented:e||0,tagName:null,tagStart:null,context:null}
return null!=e&&(t.baseIndent=e),t},token:function(e,t){if(!t.tagName&&e.sol()&&(t.indented=e.indentation()),e.eatSpace())return null
o=null
var n=t.tokenize(e,t)
return(n||o)&&"comment"!=n&&(a=null,t.state=t.state(o||n,e,t),a&&(n="error"==a?n+" error":a)),n},indent:function(t,n,r){var i=t.context
if(t.tokenize.isInAttribute)return t.tagStart==t.indented?t.stringStartCol+1:t.indented+l
if(i&&i.noIndent)return e.Pass
if(t.tokenize!=d&&t.tokenize!=f)return r?r.match(/^(\s*)/)[0].length:0
if(t.tagName)return!1!==s.multilineTagIndentPastTag?t.tagStart+t.tagName.length+2:t.tagStart+l*(s.multilineTagIndentFactor||1)
if(s.alignCDATA&&/<!\[CDATA\[/.test(n))return 0
var o=n&&/^<(\/)?([\w_:\.-]*)/.exec(n)
if(o&&o[1])for(;i;){if(i.tagName==o[2]){i=i.prev
break}if(!s.implicitlyClosed.hasOwnProperty(i.tagName))break
i=i.prev}else if(o)for(;i;){var a=s.contextGrabbers[i.tagName]
if(!a||!a.hasOwnProperty(o[2]))break
i=i.prev}for(;i&&i.prev&&!i.startOfLine;)i=i.prev
return i?i.indent+l:t.baseIndent||0},electricInput:/<\/[\s\w:]+>$/,blockCommentStart:"\x3c!--",blockCommentEnd:"--\x3e",configuration:s.htmlMode?"html":"xml",helperType:s.htmlMode?"html":"xml",skipAttribute:function(e){e.state==L&&(e.state=k)}}})),e.defineMIME("text/xml","xml"),e.defineMIME("application/xml","xml"),e.mimeModes.hasOwnProperty("text/html")||e.defineMIME("text/html",{name:"xml",htmlMode:!0})})("object"==typeof n&&"object"==typeof t?e("../../lib/codemirror"):CodeMirror)},{"../../lib/codemirror":10}],15:[function(e,t,n){n.read=function(e,t,n,r,i){var o,a,l=8*i-r-1,s=(1<<l)-1,u=s>>1,c=-7,f=n?i-1:0,d=n?-1:1,h=e[t+f]
for(f+=d,o=h&(1<<-c)-1,h>>=-c,c+=l;c>0;o=256*o+e[t+f],f+=d,c-=8);for(a=o&(1<<-c)-1,o>>=-c,c+=r;c>0;a=256*a+e[t+f],f+=d,c-=8);if(0===o)o=1-u
else{if(o===s)return a?NaN:1/0*(h?-1:1)
a+=Math.pow(2,r),o-=u}return(h?-1:1)*a*Math.pow(2,o-r)},n.write=function(e,t,n,r,i,o){var a,l,s,u=8*o-i-1,c=(1<<u)-1,f=c>>1,d=23===i?Math.pow(2,-24)-Math.pow(2,-77):0,h=r?0:o-1,p=r?1:-1,m=t<0||0===t&&1/t<0?1:0
for(t=Math.abs(t),isNaN(t)||t===1/0?(l=isNaN(t)?1:0,a=c):(a=Math.floor(Math.log(t)/Math.LN2),t*(s=Math.pow(2,-a))<1&&(a--,s*=2),(t+=a+f>=1?d/s:d*Math.pow(2,1-f))*s>=2&&(a++,s/=2),a+f>=c?(l=0,a=c):a+f>=1?(l=(t*s-1)*Math.pow(2,i),a+=f):(l=t*Math.pow(2,f-1)*Math.pow(2,i),a=0));i>=8;e[n+h]=255&l,h+=p,l/=256,i-=8);for(a=a<<i|l,u+=i;u>0;e[n+h]=255&a,h+=p,a/=256,u-=8);e[n+h-p]|=128*m}},{}],16:[function(e,t,n){(function(n,r){var i
!function(){"use strict";(i=function(e,t,n,i){i=i||{},this.dictionary=null,this.rules={},this.dictionaryTable={},this.compoundRules=[],this.compoundRuleCodes={},this.replacementTable=[],this.flags=i.flags||{},this.memoized={},this.loaded=!1
var o,a,l,s,u,c=this
function f(e,t){var n=c._readFile(e,null,i.asyncLoad)
i.asyncLoad?n.then((function(e){t(e)})):t(n)}function d(e){t=e,n&&p()}function h(e){n=e,t&&p()}function p(){for(c.rules=c._parseAFF(t),c.compoundRuleCodes={},a=0,s=c.compoundRules.length;a<s;a++){var e=c.compoundRules[a]
for(l=0,u=e.length;l<u;l++)c.compoundRuleCodes[e[l]]=[]}for(a in"ONLYINCOMPOUND"in c.flags&&(c.compoundRuleCodes[c.flags.ONLYINCOMPOUND]=[]),c.dictionaryTable=c._parseDIC(n),c.compoundRuleCodes)0===c.compoundRuleCodes[a].length&&delete c.compoundRuleCodes[a]
for(a=0,s=c.compoundRules.length;a<s;a++){var r=c.compoundRules[a],o=""
for(l=0,u=r.length;l<u;l++){var f=r[l]
f in c.compoundRuleCodes?o+="("+c.compoundRuleCodes[f].join("|")+")":o+=f}c.compoundRules[a]=new RegExp(o,"i")}c.loaded=!0,i.asyncLoad&&i.loadedCallback&&i.loadedCallback(c)}return e&&(c.dictionary=e,t&&n?p():"undefined"!=typeof window&&"chrome"in window&&"extension"in window.chrome&&"getURL"in window.chrome.extension?(o=i.dictionaryPath?i.dictionaryPath:"typo/dictionaries",t||f(chrome.extension.getURL(o+"/"+e+"/"+e+".aff"),d),n||f(chrome.extension.getURL(o+"/"+e+"/"+e+".dic"),h)):(o=i.dictionaryPath?i.dictionaryPath:void 0!==r?r+"/dictionaries":"./dictionaries",t||f(o+"/"+e+"/"+e+".aff",d),n||f(o+"/"+e+"/"+e+".dic",h))),this}).prototype={load:function(e){for(var t in e)e.hasOwnProperty(t)&&(this[t]=e[t])
return this},_readFile:function(t,r,i){if(r=r||"utf8","undefined"!=typeof XMLHttpRequest){var o,a=new XMLHttpRequest
return a.open("GET",t,i),i&&(o=new Promise((function(e,t){a.onload=function(){200===a.status?e(a.responseText):t(a.statusText)},a.onerror=function(){t(a.statusText)}}))),a.overrideMimeType&&a.overrideMimeType("text/plain; charset="+r),a.send(null),i?o:a.responseText}if(void 0!==e){var l=e("fs")
try{if(l.existsSync(t)){var s=l.statSync(t),u=l.openSync(t,"r"),c=new n(s.size)
return l.readSync(u,c,0,c.length,null),c.toString(r,0,c.length)}console.log("Path "+t+" does not exist.")}catch(e){return console.log(e),""}}},_parseAFF:function(e){var t,n,r,i,o,a,l,s={},u=(e=this._removeAffixComments(e)).split("\n")
for(i=0,a=u.length;i<a;i++){var c=(t=u[i]).split(/\s+/),f=c[0]
if("PFX"==f||"SFX"==f){var d=c[1],h=c[2],p=[]
for(o=i+1,l=i+1+(n=parseInt(c[3],10));o<l;o++){var m=(r=u[o].split(/\s+/))[2],g=r[3].split("/"),v=g[0]
"0"===v&&(v="")
var y=this.parseRuleCodes(g[1]),x=r[4],b={}
b.add=v,y.length>0&&(b.continuationClasses=y),"."!==x&&(b.match="SFX"===f?new RegExp(x+"$"):new RegExp("^"+x)),"0"!=m&&(b.remove="SFX"===f?new RegExp(m+"$"):m),p.push(b)}s[d]={type:f,combineable:"Y"==h,entries:p},i+=n}else if("COMPOUNDRULE"===f){for(o=i+1,l=i+1+(n=parseInt(c[1],10));o<l;o++)r=(t=u[o]).split(/\s+/),this.compoundRules.push(r[1])
i+=n}else"REP"===f?3===(r=t.split(/\s+/)).length&&this.replacementTable.push([r[1],r[2]]):this.flags[f]=c[1]}return s},_removeAffixComments:function(e){return(e=(e=(e=e.replace(/^\s*#.*$/gm,"")).replace(/^\s\s*/m,"").replace(/\s\s*$/m,"")).replace(/\n{2,}/g,"\n")).replace(/^\s\s*/,"").replace(/\s\s*$/,"")},_parseDIC:function(e){var t=(e=this._removeDicComments(e)).split("\n"),n={}
function r(e,t){n.hasOwnProperty(e)||(n[e]=null),t.length>0&&(null===n[e]&&(n[e]=[]),n[e].push(t))}for(var i=1,o=t.length;i<o;i++){var a=t[i].split("/",2),l=a[0]
if(a.length>1){var s=this.parseRuleCodes(a[1])
"NEEDAFFIX"in this.flags&&-1!=s.indexOf(this.flags.NEEDAFFIX)||r(l,s)
for(var u=0,c=s.length;u<c;u++){var f=s[u],d=this.rules[f]
if(d)for(var h=this._applyRule(l,d),p=0,m=h.length;p<m;p++){var g=h[p]
if(r(g,[]),d.combineable)for(var v=u+1;v<c;v++){var y=s[v],x=this.rules[y]
if(x&&x.combineable&&d.type!=x.type)for(var b=this._applyRule(g,x),w=0,C=b.length;w<C;w++)r(b[w],[])}}f in this.compoundRuleCodes&&this.compoundRuleCodes[f].push(l)}}else r(l.trim(),[])}return n},_removeDicComments:function(e){return e.replace(/^\t.*$/gm,"")},parseRuleCodes:function(e){if(!e)return[]
if(!("FLAG"in this.flags))return e.split("")
if("long"===this.flags.FLAG){for(var t=[],n=0,r=e.length;n<r;n+=2)t.push(e.substr(n,2))
return t}return"num"===this.flags.FLAG?e.split(","):void 0},_applyRule:function(e,t){for(var n=t.entries,r=[],i=0,o=n.length;i<o;i++){var a=n[i]
if(!a.match||e.match(a.match)){var l=e
if(a.remove&&(l=l.replace(a.remove,"")),"SFX"===t.type?l+=a.add:l=a.add+l,r.push(l),"continuationClasses"in a)for(var s=0,u=a.continuationClasses.length;s<u;s++){var c=this.rules[a.continuationClasses[s]]
c&&(r=r.concat(this._applyRule(l,c)))}}}return r},check:function(e){if(!this.loaded)throw"Dictionary not loaded."
var t=e.replace(/^\s\s*/,"").replace(/\s\s*$/,"")
if(this.checkExact(t))return!0
if(t.toUpperCase()===t){var n=t[0]+t.substring(1).toLowerCase()
if(this.hasFlag(n,"KEEPCASE"))return!1
if(this.checkExact(n))return!0}var r=t.toLowerCase()
if(r!==t){if(this.hasFlag(r,"KEEPCASE"))return!1
if(this.checkExact(r))return!0}return!1},checkExact:function(e){if(!this.loaded)throw"Dictionary not loaded."
var t,n,r=this.dictionaryTable[e]
if(void 0===r){if("COMPOUNDMIN"in this.flags&&e.length>=this.flags.COMPOUNDMIN)for(t=0,n=this.compoundRules.length;t<n;t++)if(e.match(this.compoundRules[t]))return!0}else{if(null===r)return!0
if("object"==typeof r)for(t=0,n=r.length;t<n;t++)if(!this.hasFlag(e,"ONLYINCOMPOUND",r[t]))return!0}return!1},hasFlag:function(e,t,n){if(!this.loaded)throw"Dictionary not loaded."
return!(!(t in this.flags)||(void 0===n&&(n=Array.prototype.concat.apply([],this.dictionaryTable[e])),!n||-1===n.indexOf(this.flags[t])))},alphabet:"",suggest:function(e,t){if(!this.loaded)throw"Dictionary not loaded."
if(t=t||5,this.memoized.hasOwnProperty(e)){var n=this.memoized[e].limit
if(t<=n||this.memoized[e].suggestions.length<n)return this.memoized[e].suggestions.slice(0,t)}if(this.check(e))return[]
for(var r=0,i=this.replacementTable.length;r<i;r++){var o=this.replacementTable[r]
if(-1!==e.indexOf(o[0])){var a=e.replace(o[0],o[1])
if(this.check(a))return[a]}}var l=this
function s(e){var t,n,r,i,o,a,s=[]
for(t=0,i=e.length;t<i;t++){var u=e[t]
for(n=0,o=u.length+1;n<o;n++){var c=[u.substring(0,n),u.substring(n)]
if(c[1]&&s.push(c[0]+c[1].substring(1)),c[1].length>1&&c[1][1]!==c[1][0]&&s.push(c[0]+c[1][1]+c[1][0]+c[1].substring(2)),c[1])for(r=0,a=l.alphabet.length;r<a;r++)l.alphabet[r]!=c[1].substring(0,1)&&s.push(c[0]+l.alphabet[r]+c[1].substring(1))
if(c[1])for(r=0,a=l.alphabet.length;r<a;r++)s.push(c[0]+l.alphabet[r]+c[1])}}return s}return l.alphabet="abcdefghijklmnopqrstuvwxyz",this.memoized[e]={suggestions:function(e){var n,r,i=s([e]),o=s(i),a=function(e){for(var t=[],n=0,r=e.length;n<r;n++)l.check(e[n])&&t.push(e[n])
return t}(i.concat(o)),u={}
for(n=0,r=a.length;n<r;n++)a[n]in u?u[a[n]]+=1:u[a[n]]=1
var c=[]
for(n in u)u.hasOwnProperty(n)&&c.push([n,u[n]])
c.sort((function(e,t){return e[1]<t[1]?-1:1})).reverse()
var f=[],d="lowercase"
for(e.toUpperCase()===e?d="uppercase":e.substr(0,1).toUpperCase()+e.substr(1).toLowerCase()===e&&(d="capitalized"),n=0,r=Math.min(t,c.length);n<r;n++)"uppercase"===d?c[n][0]=c[n][0].toUpperCase():"capitalized"===d&&(c[n][0]=c[n][0].substr(0,1).toUpperCase()+c[n][0].substr(1)),l.hasFlag(c[n][0],"NOSUGGEST")||f.push(c[n][0])
return f}(e),limit:t},this.memoized[e].suggestions}}}(),void 0!==t&&(t.exports=i)}).call(this,e("buffer").Buffer,"/node_modules/typo-js")},{buffer:3,fs:2}],17:[function(e,t,n){var r=e("codemirror")
r.commands.tabAndIndentMarkdownList=function(e){var t=e.listSelections()[0].head
if(!1!==e.getStateAfter(t.line).list)e.execCommand("indentMore")
else if(e.options.indentWithTabs)e.execCommand("insertTab")
else{var n=Array(e.options.tabSize+1).join(" ")
e.replaceSelection(n)}},r.commands.shiftTabAndUnindentMarkdownList=function(e){var t=e.listSelections()[0].head
if(!1!==e.getStateAfter(t.line).list)e.execCommand("indentLess")
else if(e.options.indentWithTabs)e.execCommand("insertTab")
else{var n=Array(e.options.tabSize+1).join(" ")
e.replaceSelection(n)}}},{codemirror:10}],18:[function(e,t,n){"use strict"
var r=e("codemirror")
e("codemirror/addon/edit/continuelist.js"),e("./codemirror/tablist"),e("codemirror/addon/display/fullscreen.js"),e("codemirror/mode/markdown/markdown.js"),e("codemirror/addon/mode/overlay.js"),e("codemirror/addon/display/placeholder.js"),e("codemirror/addon/selection/mark-selection.js"),e("codemirror/mode/gfm/gfm.js"),e("codemirror/mode/xml/xml.js")
var i=e("codemirror-spell-checker"),o=navigator.userAgent,a=navigator.platform,l=!/Edge\/(\d+)/.exec(o)&&/AppleWebKit/.test(o)&&/Mobile\/\w+/.test(o)||/Mac/.test(a),s=/win/i.test(a),u={toggleBold:y,toggleItalic:x,drawLink:D,toggleHeadingSmaller:k,toggleHeadingBigger:S,drawImage:F,toggleBlockquote:C,toggleOrderedList:N,toggleUnorderedList:A,toggleCodeBlock:w,togglePreview:P,toggleStrikethrough:b,toggleHeading1:L,toggleHeading2:T,toggleHeading3:M,cleanBlock:E,drawTable:O,drawHorizontalRule:I,undo:B,redo:H,toggleSideBySide:W,toggleFullScreen:v},c={toggleBold:"Cmd-B",toggleItalic:"Cmd-I",drawLink:"Cmd-K",toggleHeadingSmaller:"Cmd-H",toggleHeadingBigger:"Shift-Cmd-H",cleanBlock:"Cmd-E",drawImage:"Cmd-Alt-I",toggleBlockquote:"Cmd-'",toggleOrderedList:"Cmd-Alt-L",toggleUnorderedList:"Cmd-L",toggleCodeBlock:"Cmd-Alt-C",togglePreview:"Cmd-P",toggleSideBySide:"F9",toggleFullScreen:"F11"},f=function(e){for(var t in u)if(u[t]===e)return t
return null}
function d(e){return l?e.replace("Ctrl","Cmd"):e.replace("Cmd","Ctrl")}function h(e,t,n){e=e||{}
var r=document.createElement("a")
return t=null==t||t,e.title&&t&&(r.title=function(e,t,n){var r,i=e
return t&&n[r=f(t)]&&(i+=" ("+d(n[r])+")"),i}(e.title,e.action,n),l&&!e.useCtrlOnMac&&(r.title=r.title.replace("Ctrl","⌘")),l&&(r.title=r.title.replace("Alt","⌥"))),r.tabIndex=-1,r.className=e.className,r}function p(){var e=document.createElement("i")
return e.className="separator",e.innerHTML="|",e}function m(e,t){t=t||e.getCursor("start")
var n=e.getTokenAt(t)
if(!n.type)return{}
for(var r,i,o=n.type.split(" "),a={},l=0;l<o.length;l++)"strong"===(r=o[l])?a.bold=!0:"variable-2"===r?(i=e.getLine(t.line),/^\s*\d+\.\s/.test(i)?a["ordered-list"]=!0:a["unordered-list"]=!0):"atom"===r?a.quote=!0:"em"===r?a.italic=!0:"quote"===r?a.quote=!0:"strikethrough"===r?a.strikethrough=!0:"comment"===r?a.code=!0:"link"===r?a.link=!0:"tag"===r?a.image=!0:r.match(/^header(\-[1-6])?$/)&&(a[r.replace("header","heading")]=!0)
return a}var g=""
function v(e){var t=e.codemirror
t.setOption("fullScreen",!t.getOption("fullScreen")),t.getOption("fullScreen")?(g=document.body.style.overflow,document.body.style.overflow="hidden"):document.body.style.overflow=g
var n=t.getWrapperElement();/fullscreen/.test(n.previousSibling.className)?n.previousSibling.className=n.previousSibling.className.replace(/\s*fullscreen\b/,""):n.previousSibling.className+=" fullscreen"
var r=e.toolbarElements.fullscreen;/active/.test(r.className)?r.className=r.className.replace(/\s*active\s*/g,""):r.className+=" active"
var i=t.getWrapperElement().nextSibling;/editor-preview-active-side/.test(i.className)&&W(e)}function y(e){_(e,"bold",e.options.blockStyles.bold)}function x(e){_(e,"italic",e.options.blockStyles.italic)}function b(e){_(e,"strikethrough","~~")}function w(e){var t=e.options.blockStyles.code
function n(e){if("object"!=typeof e)throw"fencing_line() takes a 'line' object (not a line number, or line text).  Got: "+typeof e+": "+e
return e.styles&&e.styles[2]&&-1!==e.styles[2].indexOf("formatting-code-block")}function r(e){return e.state.base.base||e.state.base}function i(e,t,i,o,a){i=i||e.getLineHandle(t),o=o||e.getTokenAt({line:t,ch:1}),a=a||!!i.text&&e.getTokenAt({line:t,ch:i.text.length-1})
var l=o.type?o.type.split(" "):[]
return a&&r(a).indentedCode?"indented":-1!==l.indexOf("comment")&&(r(o).fencedChars||r(a).fencedChars||n(i)?"fenced":"single")}var o,a,l,s=e.codemirror,u=s.getCursor("start"),c=s.getCursor("end"),f=s.getTokenAt({line:u.line,ch:u.ch||1}),d=s.getLineHandle(u.line),h=i(s,u.line,d,f)
if("single"===h){var p=d.text.slice(0,u.ch).replace("`",""),m=d.text.slice(u.ch).replace("`","")
s.replaceRange(p+m,{line:u.line,ch:0},{line:u.line,ch:99999999999999}),u.ch--,u!==c&&c.ch--,s.setSelection(u,c),s.focus()}else if("fenced"===h)if(u.line!==c.line||u.ch!==c.ch){for(o=u.line;o>=0&&!n(d=s.getLineHandle(o));o--);var g,v,y,x,b=r(s.getTokenAt({line:o,ch:1})).fencedChars
n(s.getLineHandle(u.line))?(g="",v=u.line):n(s.getLineHandle(u.line-1))?(g="",v=u.line-1):(g=b+"\n",v=u.line),n(s.getLineHandle(c.line))?(y="",x=c.line,0===c.ch&&(x+=1)):0!==c.ch&&n(s.getLineHandle(c.line+1))?(y="",x=c.line+1):(y=b+"\n",x=c.line+1),0===c.ch&&(x-=1),s.operation((function(){s.replaceRange(y,{line:x,ch:0},{line:x+(y?0:1),ch:0}),s.replaceRange(g,{line:v,ch:0},{line:v+(g?0:1),ch:0})})),s.setSelection({line:v+(g?1:0),ch:0},{line:x+(g?1:-1),ch:0}),s.focus()}else{var w=u.line
if(n(s.getLineHandle(u.line))&&("fenced"===i(s,u.line+1)?(o=u.line,w=u.line+1):(a=u.line,w=u.line-1)),void 0===o)for(o=w;o>=0&&!n(d=s.getLineHandle(o));o--);if(void 0===a)for(l=s.lineCount(),a=w;a<l&&!n(d=s.getLineHandle(a));a++);s.operation((function(){s.replaceRange("",{line:o,ch:0},{line:o+1,ch:0}),s.replaceRange("",{line:a-1,ch:0},{line:a,ch:0})})),s.focus()}else if("indented"===h){if(u.line!==c.line||u.ch!==c.ch)o=u.line,a=c.line,0===c.ch&&a--
else{for(o=u.line;o>=0;o--)if(!(d=s.getLineHandle(o)).text.match(/^\s*$/)&&"indented"!==i(s,o,d)){o+=1
break}for(l=s.lineCount(),a=u.line;a<l;a++)if(!(d=s.getLineHandle(a)).text.match(/^\s*$/)&&"indented"!==i(s,a,d)){a-=1
break}}var C=s.getLineHandle(a+1),k=C&&s.getTokenAt({line:a+1,ch:C.text.length-1})
k&&r(k).indentedCode&&s.replaceRange("\n",{line:a+1,ch:0})
for(var S=o;S<=a;S++)s.indentLine(S,"subtract")
s.focus()}else{var L=u.line===c.line&&u.ch===c.ch&&0===u.ch,T=u.line!==c.line
L||T?function(e,t,n,r){var i=t.line+1,o=n.line+1,a=t.line!==n.line,l=r+"\n",s="\n"+r
a&&o++,a&&0===n.ch&&(s=r+"\n",o--),R(e,!1,[l,s]),e.setSelection({line:i,ch:0},{line:o,ch:0})}(s,u,c,t):R(s,!1,["`","`"])}}function C(e){j(e.codemirror,"quote")}function k(e){z(e.codemirror,"smaller")}function S(e){z(e.codemirror,"bigger")}function L(e){z(e.codemirror,void 0,1)}function T(e){z(e.codemirror,void 0,2)}function M(e){z(e.codemirror,void 0,3)}function A(e){j(e.codemirror,"unordered-list")}function N(e){j(e.codemirror,"ordered-list")}function E(e){!function(e){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className))for(var t,n=e.getCursor("start"),r=e.getCursor("end"),i=n.line;i<=r.line;i++)t=(t=e.getLine(i)).replace(/^[ ]*([# ]+|\*|\-|[> ]+|[0-9]+(.|\)))[ ]*/,""),e.replaceRange(t,{line:i,ch:0},{line:i,ch:99999999999999})}(e.codemirror)}function D(e){var t=e.codemirror,n=m(t),r=e.options,i="http://"
if(r.promptURLs&&!(i=prompt(r.promptTexts.link)))return!1
R(t,n.link,r.insertTexts.link,i)}function F(e){var t=e.codemirror,n=m(t),r=e.options,i="http://"
if(r.promptURLs&&!(i=prompt(r.promptTexts.image)))return!1
R(t,n.image,r.insertTexts.image,i)}function O(e){var t=e.codemirror,n=m(t),r=e.options
R(t,n.table,r.insertTexts.table)}function I(e){var t=e.codemirror,n=m(t),r=e.options
R(t,n.image,r.insertTexts.horizontalRule)}function B(e){var t=e.codemirror
t.undo(),t.focus()}function H(e){var t=e.codemirror
t.redo(),t.focus()}function W(e){var t=e.codemirror,n=t.getWrapperElement(),r=n.nextSibling,i=e.toolbarElements["side-by-side"],o=!1;/editor-preview-active-side/.test(r.className)?(r.className=r.className.replace(/\s*editor-preview-active-side\s*/g,""),i.className=i.className.replace(/\s*active\s*/g,""),n.className=n.className.replace(/\s*CodeMirror-sided\s*/g," ")):(setTimeout((function(){t.getOption("fullScreen")||v(e),r.className+=" editor-preview-active-side"}),1),i.className+=" active",n.className+=" CodeMirror-sided",o=!0)
var a=n.lastChild
if(/editor-preview-active/.test(a.className)){a.className=a.className.replace(/\s*editor-preview-active\s*/g,"")
var l=e.toolbarElements.preview,s=n.previousSibling
l.className=l.className.replace(/\s*active\s*/g,""),s.className=s.className.replace(/\s*disabled-for-preview*/g,"")}t.sideBySideRenderingFunction||(t.sideBySideRenderingFunction=function(){r.innerHTML=e.options.previewRender(e.value(),r)}),o?(r.innerHTML=e.options.previewRender(e.value(),r),t.on("update",t.sideBySideRenderingFunction)):t.off("update",t.sideBySideRenderingFunction),t.refresh()}function P(e){var t=e.codemirror,n=t.getWrapperElement(),r=n.previousSibling,i=!!e.options.toolbar&&e.toolbarElements.preview,o=n.lastChild
o&&/editor-preview/.test(o.className)||((o=document.createElement("div")).className="editor-preview",n.appendChild(o)),/editor-preview-active/.test(o.className)?(o.className=o.className.replace(/\s*editor-preview-active\s*/g,""),i&&(i.className=i.className.replace(/\s*active\s*/g,""),r.className=r.className.replace(/\s*disabled-for-preview*/g,""))):(setTimeout((function(){o.className+=" editor-preview-active"}),1),i&&(i.className+=" active",r.className+=" disabled-for-preview")),o.innerHTML=e.options.previewRender(e.value(),o)
var a=t.getWrapperElement().nextSibling;/editor-preview-active-side/.test(a.className)&&W(e)}function R(e,t,n,r){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){var i,o=n[0],a=n[1],l=e.getCursor("start"),s=e.getCursor("end")
r&&(a=a.replace("#url#",r)),t?(o=(i=e.getLine(l.line)).slice(0,l.ch),a=i.slice(l.ch),e.replaceRange(o+a,{line:l.line,ch:0})):(i=e.getSelection(),e.replaceSelection(o+i+a),l.ch+=o.length,l!==s&&(s.ch+=o.length)),e.setSelection(l,s),e.focus()}}function z(e,t,n){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){for(var r=e.getCursor("start"),i=e.getCursor("end"),o=r.line;o<=i.line;o++)!function(r){var i=e.getLine(r),o=i.search(/[^#]/)
i=void 0!==t?o<=0?"bigger"==t?"###### "+i:"# "+i:6==o&&"smaller"==t?i.substr(7):1==o&&"bigger"==t?i.substr(2):"bigger"==t?i.substr(1):"#"+i:1==n?o<=0?"# "+i:o==n?i.substr(o+1):"# "+i.substr(o+1):2==n?o<=0?"## "+i:o==n?i.substr(o+1):"## "+i.substr(o+1):o<=0?"### "+i:o==n?i.substr(o+1):"### "+i.substr(o+1),e.replaceRange(i,{line:r,ch:0},{line:r,ch:99999999999999})}(o)
e.focus()}}function j(e,t){if(!/editor-preview-active/.test(e.getWrapperElement().lastChild.className)){for(var n=m(e),r=e.getCursor("start"),i=e.getCursor("end"),o={quote:/^(\s*)\>\s+/,"unordered-list":/^(\s*)(\*|\-|\+)\s+/,"ordered-list":/^(\s*)\d+\.\s+/},a={quote:"> ","unordered-list":"* ","ordered-list":"1. "},l=r.line;l<=i.line;l++)!function(r){var i=e.getLine(r)
i=n[t]?i.replace(o[t],"$1"):a[t]+i,e.replaceRange(i,{line:r,ch:0},{line:r,ch:99999999999999})}(l)
e.focus()}}function _(e,t,n,r){if(!/editor-preview-active/.test(e.codemirror.getWrapperElement().lastChild.className)){r=void 0===r?n:r
var i,o=e.codemirror,a=m(o),l=n,s=r,u=o.getCursor("start"),c=o.getCursor("end")
a[t]?(l=(i=o.getLine(u.line)).slice(0,u.ch),s=i.slice(u.ch),"bold"==t?(l=l.replace(/(\*\*|__)(?![\s\S]*(\*\*|__))/,""),s=s.replace(/(\*\*|__)/,"")):"italic"==t?(l=l.replace(/(\*|_)(?![\s\S]*(\*|_))/,""),s=s.replace(/(\*|_)/,"")):"strikethrough"==t&&(l=l.replace(/(\*\*|~~)(?![\s\S]*(\*\*|~~))/,""),s=s.replace(/(\*\*|~~)/,"")),o.replaceRange(l+s,{line:u.line,ch:0},{line:u.line,ch:99999999999999}),"bold"==t||"strikethrough"==t?(u.ch-=2,u!==c&&(c.ch-=2)):"italic"==t&&(u.ch-=1,u!==c&&(c.ch-=1))):(i=o.getSelection(),"bold"==t?i=(i=i.split("**").join("")).split("__").join(""):"italic"==t?i=(i=i.split("*").join("")).split("_").join(""):"strikethrough"==t&&(i=i.split("~~").join("")),o.replaceSelection(l+i+s),u.ch+=n.length,c.ch=u.ch+i.length),o.setSelection(u,c),o.focus()}}function U(e,t){for(var n in t)t.hasOwnProperty(n)&&(t[n]instanceof Array?e[n]=t[n].concat(e[n]instanceof Array?e[n]:[]):null!==t[n]&&"object"==typeof t[n]&&t[n].constructor===Object?e[n]=U(e[n]||{},t[n]):e[n]=t[n])
return e}function q(e){for(var t=1;t<arguments.length;t++)e=U(e,arguments[t])
return e}function G(e){var t=e.match(/[a-zA-Z0-9_\u0392-\u03c9\u0410-\u04F9]+|[\u4E00-\u9FFF\u3400-\u4dbf\uf900-\ufaff\u3040-\u309f\uac00-\ud7af]+/g),n=0
if(null===t)return n
for(var r=0;r<t.length;r++)t[r].charCodeAt(0)>=19968?n+=t[r].length:n+=1
return n}var V={bold:{name:"bold",action:y,className:"fa fa-bold",title:"Bold",default:!0},italic:{name:"italic",action:x,className:"fa fa-italic",title:"Italic",default:!0},strikethrough:{name:"strikethrough",action:b,className:"fa fa-strikethrough",title:"Strikethrough"},heading:{name:"heading",action:k,className:"fa fa-header",title:"Heading",default:!0},"heading-smaller":{name:"heading-smaller",action:k,className:"fa fa-header fa-header-x fa-header-smaller",title:"Smaller Heading"},"heading-bigger":{name:"heading-bigger",action:S,className:"fa fa-header fa-header-x fa-header-bigger",title:"Bigger Heading"},"heading-1":{name:"heading-1",action:L,className:"fa fa-header fa-header-x fa-header-1",title:"Big Heading"},"heading-2":{name:"heading-2",action:T,className:"fa fa-header fa-header-x fa-header-2",title:"Medium Heading"},"heading-3":{name:"heading-3",action:M,className:"fa fa-header fa-header-x fa-header-3",title:"Small Heading"},"separator-1":{name:"separator-1"},code:{name:"code",action:w,className:"fa fa-code",title:"Code"},quote:{name:"quote",action:C,className:"fa fa-quote-left",title:"Quote",default:!0},"unordered-list":{name:"unordered-list",action:A,className:"fa fa-list-ul",title:"Generic List",default:!0},"ordered-list":{name:"ordered-list",action:N,className:"fa fa-list-ol",title:"Numbered List",default:!0},"clean-block":{name:"clean-block",action:E,className:"fa fa-eraser fa-clean-block",title:"Clean block"},"separator-2":{name:"separator-2"},link:{name:"link",action:D,className:"fa fa-link",title:"Create Link",default:!0},image:{name:"image",action:F,className:"fa fa-picture-o",title:"Insert Image",default:!0},table:{name:"table",action:O,className:"fa fa-table",title:"Insert Table"},"horizontal-rule":{name:"horizontal-rule",action:I,className:"fa fa-minus",title:"Insert Horizontal Line"},"separator-3":{name:"separator-3"},preview:{name:"preview",action:P,className:"fa fa-eye no-disable",title:"Toggle Preview",default:!0},"side-by-side":{name:"side-by-side",action:W,className:"fa fa-columns no-disable no-mobile",title:"Toggle Side by Side",default:!0},fullscreen:{name:"fullscreen",action:v,className:"fa fa-arrows-alt no-disable no-mobile",title:"Toggle Fullscreen",default:!0},"separator-4":{name:"separator-4"},guide:{name:"guide",action:"https://simplemde.com/markdown-guide",className:"fa fa-question-circle",title:"Markdown Guide",default:!0},"separator-5":{name:"separator-5"},undo:{name:"undo",action:B,className:"fa fa-undo no-disable",title:"Undo"},redo:{name:"redo",action:H,className:"fa fa-repeat no-disable",title:"Redo"}},$={link:["[","](#url#)"],image:["![](","#url#)"],table:["","\n\n| Column 1 | Column 2 | Column 3 |\n| -------- | -------- | -------- |\n| Text     | Text     | Text     |\n\n"],horizontalRule:["","\n\n-----\n\n"]},X={link:"URL for the link:",image:"URL of the image:"},K={bold:"**",code:"```",italic:"*"}
function Y(e){(e=e||{}).parent=this
var t=!0
if(!1===e.autoDownloadFontAwesome&&(t=!1),!0!==e.autoDownloadFontAwesome)for(var n=document.styleSheets,r=0;r<n.length;r++)n[r].href&&n[r].href.indexOf("//maxcdn.bootstrapcdn.com/font-awesome/")>-1&&(t=!1)
if(t){var i=document.createElement("link")
i.rel="stylesheet",i.href="https://maxcdn.bootstrapcdn.com/font-awesome/latest/css/font-awesome.min.css",document.getElementsByTagName("head")[0].appendChild(i)}if(e.element)this.element=e.element
else if(null===e.element)return void console.log("SimpleMDE: Error. No element was found.")
if(void 0===e.toolbar)for(var o in e.toolbar=[],V)V.hasOwnProperty(o)&&(-1!=o.indexOf("separator-")&&e.toolbar.push("|"),(!0===V[o].default||e.showIcons&&e.showIcons.constructor===Array&&-1!=e.showIcons.indexOf(o))&&e.toolbar.push(o))
e.hasOwnProperty("status")||(e.status=["autosave","lines","words","cursor"]),e.previewRender||(e.previewRender=function(e){return this.parent.markdown(e)}),e.parsingConfig=q({highlightFormatting:!0},e.parsingConfig||{}),e.insertTexts=q({},$,e.insertTexts||{}),e.promptTexts=X,e.blockStyles=q({},K,e.blockStyles||{}),e.shortcuts=q({},c,e.shortcuts||{}),null!=e.autosave&&null!=e.autosave.unique_id&&""!=e.autosave.unique_id&&(e.autosave.uniqueId=e.autosave.unique_id),this.options=e,this.render(),!e.initialValue||this.options.autosave&&!0===this.options.autosave.foundSavedValue||this.value(e.initialValue)}function Z(){if("object"!=typeof localStorage)return!1
try{localStorage.setItem("smde_localStorage",1),localStorage.removeItem("smde_localStorage")}catch(e){return!1}return!0}Y.prototype.markdown=function(e){},Y.prototype.render=function(e){if(e||(e=this.element||document.getElementsByTagName("textarea")[0]),!this._rendered||this._rendered!==e){this.element=e
var t,n,o=this.options,a=this,l={}
for(var c in o.shortcuts)null!==o.shortcuts[c]&&null!==u[c]&&function(e){l[d(o.shortcuts[e])]=function(){u[e](a)}}(c)
if(l.Enter="newlineAndIndentContinueMarkdownList",l.Tab="tabAndIndentMarkdownList",l["Shift-Tab"]="shiftTabAndUnindentMarkdownList",l.Esc=function(e){e.getOption("fullScreen")&&v(a)},s&&(l.Home="goLineLeftSmart",l.End="goLineRight"),document.addEventListener("keydown",(function(e){27==(e=e||window.event).keyCode&&a.codemirror.getOption("fullScreen")&&v(a)}),!1),!1!==o.spellChecker?(t="spell-checker",(n=o.parsingConfig).name="gfm",n.gitHubSpice=!1,i({codeMirrorInstance:r})):((t=o.parsingConfig).name="gfm",t.gitHubSpice=!1),this.codemirror=r.fromTextArea(e,{mode:t,backdrop:n,theme:"paper",tabSize:null!=o.tabSize?o.tabSize:2,indentUnit:null!=o.tabSize?o.tabSize:2,indentWithTabs:!1!==o.indentWithTabs,lineNumbers:!1,autofocus:!0===o.autofocus,extraKeys:l,lineWrapping:!1!==o.lineWrapping,allowDropFileTypes:["text/plain"],placeholder:o.placeholder||e.getAttribute("placeholder")||"",styleSelectedText:null==o.styleSelectedText||o.styleSelectedText}),!0===o.forceSync){var f=this.codemirror
f.on("change",(function(){f.save()}))}this.gui={},!1!==o.toolbar&&(this.gui.toolbar=this.createToolbar()),!1!==o.status&&(this.gui.statusbar=this.createStatusbar()),null!=o.autosave&&!0===o.autosave.enabled&&this.autosave(),this.gui.sideBySide=this.createSideBySide(),this._rendered=this.element
var h=this.codemirror
setTimeout(function(){h.refresh()}.bind(h),0)}},Y.prototype.autosave=function(){if(Z()){var e=this
if(null==this.options.autosave.uniqueId||""==this.options.autosave.uniqueId)return void console.log("SimpleMDE: You must set a uniqueId to use the autosave feature")
null!=e.element.form&&null!=e.element.form&&e.element.form.addEventListener("submit",(function(){localStorage.removeItem("smde_"+e.options.autosave.uniqueId)})),!0!==this.options.autosave.loaded&&("string"==typeof localStorage.getItem("smde_"+this.options.autosave.uniqueId)&&""!=localStorage.getItem("smde_"+this.options.autosave.uniqueId)&&(this.codemirror.setValue(localStorage.getItem("smde_"+this.options.autosave.uniqueId)),this.options.autosave.foundSavedValue=!0),this.options.autosave.loaded=!0),localStorage.setItem("smde_"+this.options.autosave.uniqueId,e.value())
var t=document.getElementById("autosaved")
if(null!=t&&null!=t&&""!=t){var n=new Date,r=n.getHours(),i=n.getMinutes(),o="am",a=r
a>=12&&(a=r-12,o="pm"),0==a&&(a=12),i=i<10?"0"+i:i,t.innerHTML="Autosaved: "+a+":"+i+" "+o}this.autosaveTimeoutId=setTimeout((function(){e.autosave()}),this.options.autosave.delay||1e4)}else console.log("SimpleMDE: localStorage not available, cannot autosave")},Y.prototype.clearAutosavedValue=function(){if(Z()){if(null==this.options.autosave||null==this.options.autosave.uniqueId||""==this.options.autosave.uniqueId)return void console.log("SimpleMDE: You must set a uniqueId to clear the autosave value")
localStorage.removeItem("smde_"+this.options.autosave.uniqueId)}else console.log("SimpleMDE: localStorage not available, cannot autosave")},Y.prototype.createSideBySide=function(){var e=this.codemirror,t=e.getWrapperElement(),n=t.nextSibling
n&&/editor-preview-side/.test(n.className)||((n=document.createElement("div")).className="editor-preview-side",t.parentNode.insertBefore(n,t.nextSibling))
var r=!1,i=!1
return e.on("scroll",(function(e){if(r)r=!1
else{i=!0
var t=e.getScrollInfo().height-e.getScrollInfo().clientHeight,o=parseFloat(e.getScrollInfo().top)/t,a=(n.scrollHeight-n.clientHeight)*o
n.scrollTop=a}})),n.onscroll=function(){if(i)i=!1
else{r=!0
var t=n.scrollHeight-n.clientHeight,o=parseFloat(n.scrollTop)/t,a=(e.getScrollInfo().height-e.getScrollInfo().clientHeight)*o
e.scrollTo(0,a)}},n},Y.prototype.createToolbar=function(e){if((e=e||this.options.toolbar)&&0!==e.length){var t
for(t=0;t<e.length;t++)null!=V[e[t]]&&(e[t]=V[e[t]])
var n=document.createElement("div")
n.className="editor-toolbar"
var r,i,o=this,a={}
for(o.toolbar=e,t=0;t<e.length;t++)if(("guide"!=e[t].name||!1!==o.options.toolbarGuideIcon)&&!(o.options.hideIcons&&-1!=o.options.hideIcons.indexOf(e[t].name)||("fullscreen"==e[t].name||"side-by-side"==e[t].name)&&(r=void 0,i=void 0,i=!1,r=navigator.userAgent||navigator.vendor||window.opera,(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(r)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(r.substr(0,4)))&&(i=!0),i))){if("|"===e[t]){for(var l=!1,s=t+1;s<e.length;s++)"|"===e[s]||o.options.hideIcons&&-1!=o.options.hideIcons.indexOf(e[s].name)||(l=!0)
if(!l)continue}!function(e){var t
t="|"===e?p():h(e,o.options.toolbarTips,o.options.shortcuts),e.action&&("function"==typeof e.action?t.onclick=function(t){t.preventDefault(),e.action(o)}:"string"==typeof e.action&&(t.href=e.action,t.target="_blank")),a[e.name||e]=t,n.appendChild(t)}(e[t])}o.toolbarElements=a
var u=this.codemirror
u.on("cursorActivity",(function(){var e=m(u)
for(var t in a)!function(t){var n=a[t]
e[t]?n.className+=" active":"fullscreen"!=t&&"side-by-side"!=t&&"spellcheck"!=t&&"hemmingway"!=t&&(n.className=n.className.replace(/\s*active\s*/g,""))}(t)}))
var c=u.getWrapperElement()
return c.parentNode.insertBefore(n,c),n}},Y.prototype.createStatusbar=function(e){e=e||this.options.status
var t=this.options,n=this.codemirror
if(e&&0!==e.length){var r,i,o,a=[]
for(r=0;r<e.length;r++)if(i=void 0,o=void 0,"object"==typeof e[r])a.push({className:e[r].className,defaultValue:e[r].defaultValue,onUpdate:e[r].onUpdate})
else{var l=e[r]
"words"===l?(o=function(e){e.innerHTML=G(n.getValue())},i=function(e){e.innerHTML=G(n.getValue())}):"lines"===l?(o=function(e){e.innerHTML=n.lineCount()},i=function(e){e.innerHTML=n.lineCount()}):"cursor"===l?(o=function(e){e.innerHTML="0:0"},i=function(e){var t=n.getCursor()
e.innerHTML=t.line+":"+t.ch}):"autosave"===l&&(o=function(e){null!=t.autosave&&!0===t.autosave.enabled&&e.setAttribute("id","autosaved")}),a.push({className:l,defaultValue:o,onUpdate:i})}var s=document.createElement("div")
for(s.className="editor-statusbar",r=0;r<a.length;r++){var u=a[r],c=document.createElement("span")
c.className=u.className,"function"==typeof u.defaultValue&&u.defaultValue(c),"function"==typeof u.onUpdate&&this.codemirror.on("update",function(e,t){return function(){t.onUpdate(e)}}(c,u)),s.appendChild(c)}var f=this.codemirror.getWrapperElement()
return f.parentNode.insertBefore(s,f.nextSibling),s}},Y.prototype.value=function(e){return void 0===e?this.codemirror.getValue():(this.codemirror.getDoc().setValue(e),this)},Y.toggleBold=y,Y.toggleItalic=x,Y.toggleStrikethrough=b,Y.toggleBlockquote=C,Y.toggleHeadingSmaller=k,Y.toggleHeadingBigger=S,Y.toggleHeading1=L,Y.toggleHeading2=T,Y.toggleHeading3=M,Y.toggleCodeBlock=w,Y.toggleUnorderedList=A,Y.toggleOrderedList=N,Y.cleanBlock=E,Y.drawLink=D,Y.drawImage=F,Y.drawTable=O,Y.drawHorizontalRule=I,Y.undo=B,Y.redo=H,Y.togglePreview=P,Y.toggleSideBySide=W,Y.toggleFullScreen=v,Y.prototype.toggleBold=function(){y(this)},Y.prototype.toggleItalic=function(){x(this)},Y.prototype.toggleStrikethrough=function(){b(this)},Y.prototype.toggleBlockquote=function(){C(this)},Y.prototype.toggleHeadingSmaller=function(){k(this)},Y.prototype.toggleHeadingBigger=function(){S(this)},Y.prototype.toggleHeading1=function(){L(this)},Y.prototype.toggleHeading2=function(){T(this)},Y.prototype.toggleHeading3=function(){M(this)},Y.prototype.toggleCodeBlock=function(){w(this)},Y.prototype.toggleUnorderedList=function(){A(this)},Y.prototype.toggleOrderedList=function(){N(this)},Y.prototype.cleanBlock=function(){E(this)},Y.prototype.drawLink=function(){D(this)},Y.prototype.drawImage=function(){F(this)},Y.prototype.drawTable=function(){O(this)},Y.prototype.drawHorizontalRule=function(){I(this)},Y.prototype.undo=function(){B(this)},Y.prototype.redo=function(){H(this)},Y.prototype.togglePreview=function(){P(this)},Y.prototype.toggleSideBySide=function(){W(this)},Y.prototype.toggleFullScreen=function(){v(this)},Y.prototype.isPreviewActive=function(){var e=this.codemirror.getWrapperElement().lastChild
return/editor-preview-active/.test(e.className)},Y.prototype.isSideBySideActive=function(){var e=this.codemirror.getWrapperElement().nextSibling
return/editor-preview-active-side/.test(e.className)},Y.prototype.isFullscreenActive=function(){return this.codemirror.getOption("fullScreen")},Y.prototype.getState=function(){return m(this.codemirror)},Y.prototype.toTextArea=function(){var e=this.codemirror,t=e.getWrapperElement()
t.parentNode&&(this.gui.toolbar&&t.parentNode.removeChild(this.gui.toolbar),this.gui.statusbar&&t.parentNode.removeChild(this.gui.statusbar),this.gui.sideBySide&&t.parentNode.removeChild(this.gui.sideBySide)),e.toTextArea(),this.autosaveTimeoutId&&(clearTimeout(this.autosaveTimeoutId),this.autosaveTimeoutId=void 0,this.clearAutosavedValue())},t.exports=Y},{"./codemirror/tablist":17,codemirror:10,"codemirror-spell-checker":4,"codemirror/addon/display/fullscreen.js":5,"codemirror/addon/display/placeholder.js":6,"codemirror/addon/edit/continuelist.js":7,"codemirror/addon/mode/overlay.js":8,"codemirror/addon/selection/mark-selection.js":9,"codemirror/mode/gfm/gfm.js":11,"codemirror/mode/markdown/markdown.js":12,"codemirror/mode/xml/xml.js":14}]},{},[18])(18)}))

//# sourceMappingURL=simplemde-9cd5549b68db674742d6ec2ecd72ac30.map