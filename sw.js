!function(e){var t={};function s(n){if(t[n])return t[n].exports;var a=t[n]={i:n,l:!1,exports:{}};return e[n].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=e,s.c=t,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="assets/dist/",s(s.s=7)}([function(e,t,s){"use strict";try{self["workbox:core:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:precaching:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:routing:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:strategies:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:expiration:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:background-sync:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";try{self["workbox:google-analytics:5.1.3"]&&_()}catch(e){}},function(e,t,s){"use strict";s.r(t);s(0);const n=(e,...t)=>{let s=e;return t.length>0&&(s+=" :: "+JSON.stringify(t)),s};class a extends Error{constructor(e,t){super(n(e,t)),this.name=e,this.details=t}}const r=new Set;const i={googleAnalytics:"googleAnalytics",precache:"precache-v2",prefix:"workbox",runtime:"runtime",suffix:"undefined"!=typeof registration?registration.scope:""},o=e=>[i.prefix,e,i.suffix].filter(e=>e&&e.length>0).join("-"),c=e=>e||o(i.googleAnalytics),u=e=>e||o(i.precache),h=()=>i.prefix,l=e=>e||o(i.runtime),d=()=>i.suffix;const f=e=>new URL(String(e),location.href).href.replace(new RegExp("^"+location.origin),""),p=(e,t)=>e.filter(e=>t in e),m=async({request:e,mode:t,plugins:s=[]})=>{const n=p(s,"cacheKeyWillBeUsed");let a=e;for(const e of n)a=await e.cacheKeyWillBeUsed.call(e,{mode:t,request:a}),"string"==typeof a&&(a=new Request(a));return a},g=async({cacheName:e,request:t,event:s,matchOptions:n,plugins:a=[]})=>{const r=await self.caches.open(e),i=await m({plugins:a,request:t,mode:"read"});let o=await r.match(i,n);for(const t of a)if("cachedResponseWillBeUsed"in t){const a=t.cachedResponseWillBeUsed;o=await a.call(t,{cacheName:e,event:s,matchOptions:n,cachedResponse:o,request:i})}return o},w=async({cacheName:e,request:t,response:s,event:n,plugins:i=[],matchOptions:o})=>{const c=await m({plugins:i,request:t,mode:"write"});if(!s)throw new a("cache-put-with-no-response",{url:f(c.url)});const u=await(async({request:e,response:t,event:s,plugins:n=[]})=>{let a=t,r=!1;for(const t of n)if("cacheWillUpdate"in t){r=!0;const n=t.cacheWillUpdate;if(a=await n.call(t,{request:e,response:a,event:s}),!a)break}return r||(a=a&&200===a.status?a:void 0),a||null})({event:n,plugins:i,response:s,request:c});if(!u)return void 0;const h=await self.caches.open(e),l=p(i,"cacheDidUpdate"),d=l.length>0?await g({cacheName:e,matchOptions:o,request:c}):null;try{await h.put(c,u)}catch(e){throw"QuotaExceededError"===e.name&&await async function(){for(const e of r)await e()}(),e}for(const t of l)await t.cacheDidUpdate.call(t,{cacheName:e,event:n,oldResponse:d,newResponse:u,request:c})},y=g;let _;function q(e){e.then(()=>{})}class R{constructor(e,t,{onupgradeneeded:s,onversionchange:n}={}){this._db=null,this._name=e,this._version=t,this._onupgradeneeded=s,this._onversionchange=n||(()=>this.close())}get db(){return this._db}async open(){if(!this._db)return this._db=await new Promise((e,t)=>{let s=!1;setTimeout(()=>{s=!0,t(new Error("The open request was blocked and timed out"))},this.OPEN_TIMEOUT);const n=indexedDB.open(this._name,this._version);n.onerror=()=>t(n.error),n.onupgradeneeded=e=>{s?(n.transaction.abort(),n.result.close()):"function"==typeof this._onupgradeneeded&&this._onupgradeneeded(e)},n.onsuccess=()=>{const t=n.result;s?t.close():(t.onversionchange=this._onversionchange.bind(this),e(t))}}),this}async getKey(e,t){return(await this.getAllKeys(e,t,1))[0]}async getAll(e,t,s){return await this.getAllMatching(e,{query:t,count:s})}async getAllKeys(e,t,s){return(await this.getAllMatching(e,{query:t,count:s,includeKeys:!0})).map(e=>e.key)}async getAllMatching(e,{index:t,query:s=null,direction:n="next",count:a,includeKeys:r=!1}={}){return await this.transaction([e],"readonly",(i,o)=>{const c=i.objectStore(e),u=t?c.index(t):c,h=[],l=u.openCursor(s,n);l.onsuccess=()=>{const e=l.result;e?(h.push(r?e:e.value),a&&h.length>=a?o(h):e.continue()):o(h)}})}async transaction(e,t,s){return await this.open(),await new Promise((n,a)=>{const r=this._db.transaction(e,t);r.onabort=()=>a(r.error),r.oncomplete=()=>n(),s(r,e=>n(e))})}async _call(e,t,s,...n){return await this.transaction([t],s,(s,a)=>{const r=s.objectStore(t),i=r[e].apply(r,n);i.onsuccess=()=>a(i.result)})}close(){this._db&&(this._db.close(),this._db=null)}}R.prototype.OPEN_TIMEOUT=2e3;const v={readonly:["get","count","getKey","getAll","getAllKeys"],readwrite:["add","put","clear","delete"]};for(const[e,t]of Object.entries(v))for(const s of t)s in IDBObjectStore.prototype&&(R.prototype[s]=async function(t,...n){return await this._call(s,t,e,...n)});const x=async({request:e,fetchOptions:t,event:s,plugins:n=[]})=>{if("string"==typeof e&&(e=new Request(e)),s instanceof FetchEvent&&s.preloadResponse){const e=await s.preloadResponse;if(e)return e}const r=p(n,"fetchDidFail"),i=r.length>0?e.clone():null;try{for(const t of n)if("requestWillFetch"in t){const n=t.requestWillFetch,a=e.clone();e=await n.call(t,{request:a,event:s})}}catch(e){throw new a("plugin-error-request-will-fetch",{thrownError:e})}const o=e.clone();try{let a;a="navigate"===e.mode?await fetch(e):await fetch(e,t);for(const e of n)"fetchDidSucceed"in e&&(a=await e.fetchDidSucceed.call(e,{event:s,request:o,response:a}));return a}catch(e){0;for(const t of r)await t.fetchDidFail.call(t,{error:e,event:s,originalRequest:i.clone(),request:o.clone()});throw e}};const b={get googleAnalytics(){return c()},get precache(){return u()},get prefix(){return h()},get runtime(){return l()},get suffix(){return d()}};async function N(e,t){const s=e.clone(),n={headers:new Headers(s.headers),status:s.status,statusText:s.statusText},a=t?t(n):n,r=function(){if(void 0===_){const e=new Response("");if("body"in e)try{new Response(e.body),_=!0}catch(e){_=!1}_=!1}return _}()?s.body:await s.blob();return new Response(r,a)}s(1);const T=[],E={get:()=>T,add(e){T.push(...e)}};function S(e){if(!e)throw new a("add-to-cache-list-unexpected-type",{entry:e});if("string"==typeof e){const t=new URL(e,location.href);return{cacheKey:t.href,url:t.href}}const{revision:t,url:s}=e;if(!s)throw new a("add-to-cache-list-unexpected-type",{entry:e});if(!t){const e=new URL(s,location.href);return{cacheKey:e.href,url:e.href}}const n=new URL(s,location.href),r=new URL(s,location.href);return n.searchParams.set("__WB_REVISION__",t),{cacheKey:n.href,url:r.href}}class U{constructor(e){this._cacheName=u(e),this._urlsToCacheKeys=new Map,this._urlsToCacheModes=new Map,this._cacheKeysToIntegrities=new Map}addToCacheList(e){const t=[];for(const s of e){"string"==typeof s?t.push(s):s&&void 0===s.revision&&t.push(s.url);const{cacheKey:e,url:n}=S(s),r="string"!=typeof s&&s.revision?"reload":"default";if(this._urlsToCacheKeys.has(n)&&this._urlsToCacheKeys.get(n)!==e)throw new a("add-to-cache-list-conflicting-entries",{firstEntry:this._urlsToCacheKeys.get(n),secondEntry:e});if("string"!=typeof s&&s.integrity){if(this._cacheKeysToIntegrities.has(e)&&this._cacheKeysToIntegrities.get(e)!==s.integrity)throw new a("add-to-cache-list-conflicting-integrities",{url:n});this._cacheKeysToIntegrities.set(e,s.integrity)}if(this._urlsToCacheKeys.set(n,e),this._urlsToCacheModes.set(n,r),t.length>0){const e=`Workbox is precaching URLs without revision info: ${t.join(", ")}\nThis is generally NOT safe. Learn more at https://bit.ly/wb-precache`;console.warn(e)}}}async install({event:e,plugins:t}={}){const s=[],n=[],a=await self.caches.open(this._cacheName),r=await a.keys(),i=new Set(r.map(e=>e.url));for(const[e,t]of this._urlsToCacheKeys)i.has(t)?n.push(e):s.push({cacheKey:t,url:e});const o=s.map(({cacheKey:s,url:n})=>{const a=this._cacheKeysToIntegrities.get(s),r=this._urlsToCacheModes.get(n);return this._addURLToCache({cacheKey:s,cacheMode:r,event:e,integrity:a,plugins:t,url:n})});return await Promise.all(o),{updatedURLs:s.map(e=>e.url),notUpdatedURLs:n}}async activate(){const e=await self.caches.open(this._cacheName),t=await e.keys(),s=new Set(this._urlsToCacheKeys.values()),n=[];for(const a of t)s.has(a.url)||(await e.delete(a),n.push(a.url));return{deletedURLs:n}}async _addURLToCache({cacheKey:e,url:t,cacheMode:s,event:n,plugins:r,integrity:i}){const o=new Request(t,{integrity:i,cache:s,credentials:"same-origin"});let c,u=await x({event:n,plugins:r,request:o});for(const e of r||[])"cacheWillUpdate"in e&&(c=e);if(!(c?await c.cacheWillUpdate({event:n,request:o,response:u}):u.status<400))throw new a("bad-precaching-response",{url:t,status:u.status});u.redirected&&(u=await N(u)),await w({event:n,plugins:r,response:u,request:e===t?o:new Request(e),cacheName:this._cacheName,matchOptions:{ignoreSearch:!0}})}getURLsToCacheKeys(){return this._urlsToCacheKeys}getCachedURLs(){return[...this._urlsToCacheKeys.keys()]}getCacheKeyForURL(e){const t=new URL(e,location.href);return this._urlsToCacheKeys.get(t.href)}async matchPrecache(e){const t=e instanceof Request?e.url:e,s=this.getCacheKeyForURL(t);if(s){return(await self.caches.open(this._cacheName)).match(s)}}createHandler(e=!0){return async({request:t})=>{try{const e=await this.matchPrecache(t);if(e)return e;throw new a("missing-precache-entry",{cacheName:this._cacheName,url:t instanceof Request?t.url:t})}catch(s){if(e)return fetch(t);throw s}}}createHandlerBoundToURL(e,t=!0){if(!this.getCacheKeyForURL(e))throw new a("non-precached-url",{url:e});const s=this.createHandler(t),n=new Request(e);return()=>s({request:n})}}let O;const L=()=>(O||(O=new U),O);const A=(e,t)=>{const s=L().getURLsToCacheKeys();for(const n of function*(e,{ignoreURLParametersMatching:t,directoryIndex:s,cleanURLs:n,urlManipulation:a}={}){const r=new URL(e,location.href);r.hash="",yield r.href;const i=function(e,t=[]){for(const s of[...e.searchParams.keys()])t.some(e=>e.test(s))&&e.searchParams.delete(s);return e}(r,t);if(yield i.href,s&&i.pathname.endsWith("/")){const e=new URL(i.href);e.pathname+=s,yield e.href}if(n){const e=new URL(i.href);e.pathname+=".html",yield e.href}if(a){const e=a({url:r});for(const t of e)yield t.href}}(e,t)){const e=s.get(n);if(e)return e}};let C=!1;function k(e){C||((({ignoreURLParametersMatching:e=[/^utm_/],directoryIndex:t="index.html",cleanURLs:s=!0,urlManipulation:n}={})=>{const a=u();self.addEventListener("fetch",r=>{const i=A(r.request.url,{cleanURLs:s,directoryIndex:t,ignoreURLParametersMatching:e,urlManipulation:n});if(!i)return void 0;let o=self.caches.open(a).then(e=>e.match(i)).then(e=>e||fetch(i));r.respondWith(o)})})(e),C=!0)}const D=e=>{const t=L(),s=E.get();e.waitUntil(t.install({event:e,plugins:s}).catch(e=>{throw e}))},M=e=>{const t=L();e.waitUntil(t.activate())};s(2);const P=e=>e&&"object"==typeof e?e:{handle:e};class K{constructor(e,t,s="GET"){this.handler=P(t),this.match=e,this.method=s}}class j extends K{constructor(e,t,s){super(({url:t})=>{const s=e.exec(t.href);if(s&&(t.origin===location.origin||0===s.index))return s.slice(1)},t,s)}}class I{constructor(){this._routes=new Map}get routes(){return this._routes}addFetchListener(){self.addEventListener("fetch",e=>{const{request:t}=e,s=this.handleRequest({request:t,event:e});s&&e.respondWith(s)})}addCacheListener(){self.addEventListener("message",e=>{if(e.data&&"CACHE_URLS"===e.data.type){const{payload:t}=e.data;0;const s=Promise.all(t.urlsToCache.map(e=>{"string"==typeof e&&(e=[e]);const t=new Request(...e);return this.handleRequest({request:t})}));e.waitUntil(s),e.ports&&e.ports[0]&&s.then(()=>e.ports[0].postMessage(!0))}})}handleRequest({request:e,event:t}){const s=new URL(e.url,location.href);if(!s.protocol.startsWith("http"))return void 0;const{params:n,route:a}=this.findMatchingRoute({url:s,request:e,event:t});let r=a&&a.handler;if(!r&&this._defaultHandler&&(r=this._defaultHandler),!r)return void 0;let i;try{i=r.handle({url:s,request:e,event:t,params:n})}catch(e){i=Promise.reject(e)}return i instanceof Promise&&this._catchHandler&&(i=i.catch(n=>this._catchHandler.handle({url:s,request:e,event:t}))),i}findMatchingRoute({url:e,request:t,event:s}){const n=this._routes.get(t.method)||[];for(const a of n){let n;const r=a.match({url:e,request:t,event:s});if(r)return n=r,(Array.isArray(r)&&0===r.length||r.constructor===Object&&0===Object.keys(r).length||"boolean"==typeof r)&&(n=void 0),{route:a,params:n}}return{}}setDefaultHandler(e){this._defaultHandler=P(e)}setCatchHandler(e){this._catchHandler=P(e)}registerRoute(e){this._routes.has(e.method)||this._routes.set(e.method,[]),this._routes.get(e.method).push(e)}unregisterRoute(e){if(!this._routes.has(e.method))throw new a("unregister-route-but-not-found-with-method",{method:e.method});const t=this._routes.get(e.method).indexOf(e);if(!(t>-1))throw new a("unregister-route-route-not-registered");this._routes.get(e.method).splice(t,1)}}let F;const W=()=>(F||(F=new I,F.addFetchListener(),F.addCacheListener()),F);function H(e,t,s){let n;if("string"==typeof e){const a=new URL(e,location.href);0,n=new K(({url:e})=>e.href===a.href,t,s)}else if(e instanceof RegExp)n=new j(e,t,s);else if("function"==typeof e)n=new K(e,t,s);else{if(!(e instanceof K))throw new a("unsupported-route-type",{moduleName:"workbox-routing",funcName:"registerRoute",paramName:"capture"});n=e}return W().registerRoute(n),n}s(4);const B=e=>{const t=new URL(e,location.href);return t.hash="",t.href};class G{constructor(e){this._cacheName=e,this._db=new R("workbox-expiration",1,{onupgradeneeded:e=>this._handleUpgrade(e)})}_handleUpgrade(e){const t=e.target.result.createObjectStore("cache-entries",{keyPath:"id"});t.createIndex("cacheName","cacheName",{unique:!1}),t.createIndex("timestamp","timestamp",{unique:!1}),(async e=>{await new Promise((t,s)=>{const n=indexedDB.deleteDatabase(e);n.onerror=()=>{s(n.error)},n.onblocked=()=>{s(new Error("Delete blocked"))},n.onsuccess=()=>{t()}})})(this._cacheName)}async setTimestamp(e,t){const s={url:e=B(e),timestamp:t,cacheName:this._cacheName,id:this._getId(e)};await this._db.put("cache-entries",s)}async getTimestamp(e){return(await this._db.get("cache-entries",this._getId(e))).timestamp}async expireEntries(e,t){const s=await this._db.transaction("cache-entries","readwrite",(s,n)=>{const a=s.objectStore("cache-entries").index("timestamp").openCursor(null,"prev"),r=[];let i=0;a.onsuccess=()=>{const s=a.result;if(s){const n=s.value;n.cacheName===this._cacheName&&(e&&n.timestamp<e||t&&i>=t?r.push(s.value):i++),s.continue()}else n(r)}}),n=[];for(const e of s)await this._db.delete("cache-entries",e.id),n.push(e.url);return n}_getId(e){return this._cacheName+"|"+B(e)}}class V{constructor(e,t={}){this._isRunning=!1,this._rerunRequested=!1,this._maxEntries=t.maxEntries,this._maxAgeSeconds=t.maxAgeSeconds,this._cacheName=e,this._timestampModel=new G(e)}async expireEntries(){if(this._isRunning)return void(this._rerunRequested=!0);this._isRunning=!0;const e=this._maxAgeSeconds?Date.now()-1e3*this._maxAgeSeconds:0,t=await this._timestampModel.expireEntries(e,this._maxEntries),s=await self.caches.open(this._cacheName);for(const e of t)await s.delete(e);this._isRunning=!1,this._rerunRequested&&(this._rerunRequested=!1,q(this.expireEntries()))}async updateTimestamp(e){await this._timestampModel.setTimestamp(e,Date.now())}async isURLExpired(e){if(this._maxAgeSeconds){return await this._timestampModel.getTimestamp(e)<Date.now()-1e3*this._maxAgeSeconds}return!1}async delete(){this._rerunRequested=!1,await this._timestampModel.expireEntries(1/0)}}class Q{constructor(e={}){var t;this.cachedResponseWillBeUsed=async({event:e,request:t,cacheName:s,cachedResponse:n})=>{if(!n)return null;const a=this._isResponseDateFresh(n),r=this._getCacheExpiration(s);q(r.expireEntries());const i=r.updateTimestamp(t.url);if(e)try{e.waitUntil(i)}catch(e){0}return a?n:null},this.cacheDidUpdate=async({cacheName:e,request:t})=>{const s=this._getCacheExpiration(e);await s.updateTimestamp(t.url),await s.expireEntries()},this._config=e,this._maxAgeSeconds=e.maxAgeSeconds,this._cacheExpirations=new Map,e.purgeOnQuotaError&&(t=()=>this.deleteCacheAndMetadata(),r.add(t))}_getCacheExpiration(e){if(e===l())throw new a("expire-custom-caches-only");let t=this._cacheExpirations.get(e);return t||(t=new V(e,this._config),this._cacheExpirations.set(e,t)),t}_isResponseDateFresh(e){if(!this._maxAgeSeconds)return!0;const t=this._getDateHeaderTimestamp(e);return null===t||t>=Date.now()-1e3*this._maxAgeSeconds}_getDateHeaderTimestamp(e){if(!e.headers.has("date"))return null;const t=e.headers.get("date"),s=new Date(t).getTime();return isNaN(s)?null:s}async deleteCacheAndMetadata(){for(const[e,t]of this._cacheExpirations)await self.caches.delete(e),await t.delete();this._cacheExpirations=new Map}}s(3);class J{constructor(e={}){this._cacheName=l(e.cacheName),this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){"string"==typeof t&&(t=new Request(t));let s,n=await y({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins});if(n)0;else{0;try{n=await this._getFromNetwork(t,e)}catch(e){s=e}0}if(!n)throw new a("no-response",{url:t.url,error:s});return n}async _getFromNetwork(e,t){const s=await x({request:e,event:t,fetchOptions:this._fetchOptions,plugins:this._plugins}),n=s.clone(),a=w({cacheName:this._cacheName,request:e,response:n,event:t,plugins:this._plugins});if(t)try{t.waitUntil(a)}catch(e){0}return s}}const $={cacheWillUpdate:async({response:e})=>200===e.status||0===e.status?e:null};class z{constructor(e={}){if(this._cacheName=l(e.cacheName),e.plugins){const t=e.plugins.some(e=>!!e.cacheWillUpdate);this._plugins=t?e.plugins:[$,...e.plugins]}else this._plugins=[$];this._networkTimeoutSeconds=e.networkTimeoutSeconds||0,this._fetchOptions=e.fetchOptions,this._matchOptions=e.matchOptions}async handle({event:e,request:t}){const s=[];"string"==typeof t&&(t=new Request(t));const n=[];let r;if(this._networkTimeoutSeconds){const{id:a,promise:i}=this._getTimeoutPromise({request:t,event:e,logs:s});r=a,n.push(i)}const i=this._getNetworkPromise({timeoutId:r,request:t,event:e,logs:s});n.push(i);let o=await Promise.race(n);if(o||(o=await i),!o)throw new a("no-response",{url:t.url});return o}_getTimeoutPromise({request:e,logs:t,event:s}){let n;return{promise:new Promise(t=>{n=setTimeout(async()=>{t(await this._respondFromCache({request:e,event:s}))},1e3*this._networkTimeoutSeconds)}),id:n}}async _getNetworkPromise({timeoutId:e,request:t,logs:s,event:n}){let a,r;try{r=await x({request:t,event:n,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){a=e}if(e&&clearTimeout(e),a||!r)r=await this._respondFromCache({request:t,event:n});else{const e=r.clone(),s=w({cacheName:this._cacheName,request:t,response:e,event:n,plugins:this._plugins});if(n)try{n.waitUntil(s)}catch(e){0}}return r}_respondFromCache({event:e,request:t}){return y({cacheName:this._cacheName,request:t,event:e,matchOptions:this._matchOptions,plugins:this._plugins})}}class X{constructor(e={}){this._plugins=e.plugins||[],this._fetchOptions=e.fetchOptions}async handle({event:e,request:t}){let s,n;"string"==typeof t&&(t=new Request(t));try{n=await x({request:t,event:e,fetchOptions:this._fetchOptions,plugins:this._plugins})}catch(e){s=e}if(!n)throw new a("no-response",{url:t.url,error:s});return n}}s(5);class Y{constructor(e){this._queueName=e,this._db=new R("workbox-background-sync",3,{onupgradeneeded:this._upgradeDb})}async pushEntry(e){delete e.id,e.queueName=this._queueName,await this._db.add("requests",e)}async unshiftEntry(e){const[t]=await this._db.getAllMatching("requests",{count:1});t?e.id=t.id-1:delete e.id,e.queueName=this._queueName,await this._db.add("requests",e)}async popEntry(){return this._removeEntry({direction:"prev"})}async shiftEntry(){return this._removeEntry({direction:"next"})}async getAll(){return await this._db.getAllMatching("requests",{index:"queueName",query:IDBKeyRange.only(this._queueName)})}async deleteEntry(e){await this._db.delete("requests",e)}async _removeEntry({direction:e}){const[t]=await this._db.getAllMatching("requests",{direction:e,index:"queueName",query:IDBKeyRange.only(this._queueName),count:1});if(t)return await this.deleteEntry(t.id),t}_upgradeDb(e){const t=e.target.result;e.oldVersion>0&&e.oldVersion<3&&t.objectStoreNames.contains("requests")&&t.deleteObjectStore("requests"),t.createObjectStore("requests",{autoIncrement:!0,keyPath:"id"}).createIndex("queueName","queueName",{unique:!1})}}const Z=["method","referrer","referrerPolicy","mode","credentials","cache","redirect","integrity","keepalive"];class ee{constructor(e){"navigate"===e.mode&&(e.mode="same-origin"),this._requestData=e}static async fromRequest(e){const t={url:e.url,headers:{}};"GET"!==e.method&&(t.body=await e.clone().arrayBuffer());for(const[s,n]of e.headers.entries())t.headers[s]=n;for(const s of Z)void 0!==e[s]&&(t[s]=e[s]);return new ee(t)}toObject(){const e=Object.assign({},this._requestData);return e.headers=Object.assign({},this._requestData.headers),e.body&&(e.body=e.body.slice(0)),e}toRequest(){return new Request(this._requestData.url,this._requestData)}clone(){return new ee(this.toObject())}}const te=new Set,se=e=>{const t={request:new ee(e.requestData).toRequest(),timestamp:e.timestamp};return e.metadata&&(t.metadata=e.metadata),t};class ne{constructor(e,{onSync:t,maxRetentionTime:s}={}){if(this._syncInProgress=!1,this._requestsAddedDuringSync=!1,te.has(e))throw new a("duplicate-queue-name",{name:e});te.add(e),this._name=e,this._onSync=t||this.replayRequests,this._maxRetentionTime=s||10080,this._queueStore=new Y(this._name),this._addSyncListener()}get name(){return this._name}async pushRequest(e){await this._addRequest(e,"push")}async unshiftRequest(e){await this._addRequest(e,"unshift")}async popRequest(){return this._removeRequest("pop")}async shiftRequest(){return this._removeRequest("shift")}async getAll(){const e=await this._queueStore.getAll(),t=Date.now(),s=[];for(const n of e){const e=60*this._maxRetentionTime*1e3;t-n.timestamp>e?await this._queueStore.deleteEntry(n.id):s.push(se(n))}return s}async _addRequest({request:e,metadata:t,timestamp:s=Date.now()},n){const a={requestData:(await ee.fromRequest(e.clone())).toObject(),timestamp:s};t&&(a.metadata=t),await this._queueStore[n+"Entry"](a),this._syncInProgress?this._requestsAddedDuringSync=!0:await this.registerSync()}async _removeRequest(e){const t=Date.now(),s=await this._queueStore[e+"Entry"]();if(s){const n=60*this._maxRetentionTime*1e3;return t-s.timestamp>n?this._removeRequest(e):se(s)}}async replayRequests(){let e;for(;e=await this.shiftRequest();)try{await fetch(e.request.clone())}catch(t){throw await this.unshiftRequest(e),new a("queue-replay-failed",{name:this._name})}}async registerSync(){if("sync"in self.registration)try{await self.registration.sync.register("workbox-background-sync:"+this._name)}catch(e){0}}_addSyncListener(){"sync"in self.registration?self.addEventListener("sync",e=>{if(e.tag==="workbox-background-sync:"+this._name){0;const t=async()=>{let t;this._syncInProgress=!0;try{await this._onSync({queue:this})}catch(e){throw t=e,t}finally{!this._requestsAddedDuringSync||t&&!e.lastChance||await this.registerSync(),this._syncInProgress=!1,this._requestsAddedDuringSync=!1}};e.waitUntil(t())}}):this._onSync({queue:this})}static get _queueNames(){return te}}class ae{constructor(e,t){this.fetchDidFail=async({request:e})=>{await this._queue.pushRequest({request:e})},this._queue=new ne(e,t)}}s(6);const re=/^\/(\w+\/)?collect/,ie=e=>{const t=({url:e})=>"www.google-analytics.com"===e.hostname&&re.test(e.pathname),s=new X({plugins:[e]});return[new K(t,s,"GET"),new K(t,s,"POST")]},oe=e=>{const t=new z({cacheName:e});return new K(({url:e})=>"www.google-analytics.com"===e.hostname&&"/analytics.js"===e.pathname,t,"GET")},ce=e=>{const t=new z({cacheName:e});return new K(({url:e})=>"www.googletagmanager.com"===e.hostname&&"/gtag/js"===e.pathname,t,"GET")},ue=e=>{const t=new z({cacheName:e});return new K(({url:e})=>"www.googletagmanager.com"===e.hostname&&"/gtm.js"===e.pathname,t,"GET")};var he,le,de=new Q({maxEntries:10,maxAgeSeconds:1296e3}),fe=new Q({maxEntries:5,maxAgeSeconds:15552e3}),pe=new Q({maxEntries:100,maxAgeSeconds:5184e3}),me=new Q({maxEntries:50,maxAgeSeconds:5184e3});self.addEventListener("install",()=>self.skipWaiting()),self.addEventListener("activate",()=>self.clients.claim()),function(e){L().addToCacheList(e),e.length>0&&(self.addEventListener("install",D),self.addEventListener("activate",M))}([{'revision':null,'url':'/favicon.ico'},{'revision':'09bd3ba8fd3d55f79bd55a08ecbc132f','url':'assets/dist/index.blog.8e8a5f42e1ba645e329d.min.js'},{'revision':'96e18e22f611b54edac496c7e2ebf9c7','url':'assets/dist/index.home.8e8a5f42e1ba645e329d.min.js'},{'revision':'a329d792be3e2623288341440462cbde','url':'assets/dist/scene-threejs.07ff06357cb65a12ed09.bundle.js'},{'revision':'3e5b01e8dd4633c1685c1233d4f9e0ce','url':'assets/dist/style.blog.archive.8e8a5f42e1ba645e329d.css'},{'revision':'12220efe0d261ae6a5bebf06950933fe','url':'assets/dist/style.blog.home.8e8a5f42e1ba645e329d.css'},{'revision':'abeaabcf0dc8ef5a6eaa628513eafb22','url':'assets/dist/style.blog.post.8e8a5f42e1ba645e329d.css'},{'revision':'c8dffeb3cb6c7cb857c47c8f50730136','url':'assets/dist/style.blog.tags.8e8a5f42e1ba645e329d.css'},{'revision':'af8b6ebff8a7637f16a46e0b9401b72f','url':'assets/dist/style.cookiepolicy.8e8a5f42e1ba645e329d.css'},{'revision':'656e3ec4715797d5d8233dc7b556f5d0','url':'assets/dist/style.error.8e8a5f42e1ba645e329d.css'},{'revision':'6d9e8409a2beccc3c63f680c9c3a9f43','url':'assets/dist/style.home.8e8a5f42e1ba645e329d.css'},{'revision':'af8b6ebff8a7637f16a46e0b9401b72f','url':'assets/dist/style.privacypolicy.8e8a5f42e1ba645e329d.css'},{'revision':'8405be91e54df2d10b50ea9261e2284c','url':'assets/dist/vendors~scene-threejs.54669b43551d4ca5fb3d.bundle.js'}]),k(he),((e={})=>{const t=c(e.cacheName),s=new ae("workbox-google-analytics",{maxRetentionTime:2880,onSync:(n=e,async({queue:e})=>{let t;for(;t=await e.shiftRequest();){const{request:s,timestamp:a}=t,r=new URL(s.url);try{const e="POST"===s.method?new URLSearchParams(await s.clone().text()):r.searchParams,t=a-(Number(e.get("qt"))||0),i=Date.now()-t;if(e.set("qt",String(i)),n.parameterOverrides)for(const t of Object.keys(n.parameterOverrides)){const s=n.parameterOverrides[t];e.set(t,s)}"function"==typeof n.hitFilter&&n.hitFilter.call(null,e),await fetch(new Request(r.origin+r.pathname,{body:e.toString(),method:"POST",mode:"cors",credentials:"omit",headers:{"Content-Type":"text/plain"}}))}catch(s){throw await e.unshiftRequest(t),s}}})});var n;const a=[ue(t),oe(t),ce(t),...ie(s)],r=new I;for(const e of a)r.registerRoute(e);r.addFetchListener()})(),self.addEventListener("install",(function(e){var t=["/offline.html","/assets/images/no-wifi.png"];e.waitUntil(caches.open("chicio-coding-offline").then((function(e){return e.addAll(t)})))})),H((function(e){var t=e.request;return"style"===t.destination||"script"===t.destination}),new J({cacheName:"chicio-coding-styles-scripts",plugins:[de]})),H((function(e){return"document"===e.request.destination}),new J({cacheName:"chicio-coding-documents",plugins:[me]})),H((function(e){return"font"===e.request.destination}),new J({cacheName:"chicio-coding-fonts",plugins:[fe]})),H((function(e){return"image"===e.request.destination}),new J({cacheName:"chicio-coding-fonts",plugins:[pe]})),le=function(e){return"string"!=typeof e.request&&"document"==e.request.destination?caches.match("/offline.html"):"string"!=typeof e.request&&"image"==e.request.destination&&"/assets/images/no-wifi.png"==e.url.pathname?caches.match("/assets/images/no-wifi.png"):Promise.resolve(Response.error())},W().setCatchHandler(le),self.addEventListener("message",(function(e){(function(e){return"refresh"===e.data.message})(e)&&(console.log(b),Promise.all([pe.deleteCacheAndMetadata(),me.deleteCacheAndMetadata()]).then((function(){return console.log("clean completed")})))}))}]);