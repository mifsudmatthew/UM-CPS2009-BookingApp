if(!self.define){let e,i={};const n=(n,s)=>(n=new URL(n+".js",s).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let t={};const l=e=>n(e,o),c={module:{uri:o},exports:t,require:l};i[o]=Promise.all(s.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-HE3Peb27.js",revision:null},{url:"assets/index-JSjSPim8.css",revision:null},{url:"assets/workbox-window.prod.es5-DFjpnwFp.js",revision:null},{url:"index.html",revision:"bc1098aab470f673da5aaba55287fecf"},{url:"icon-192x192.png",revision:"ec1eb9d24a208681427986f181567fbd"},{url:"icon-512x512.png",revision:"a659f4da6782afa6f70ebfaefd6e0c92"},{url:"icon-maskable-512x512.png",revision:"9c8ca50366466ba0e58627fb570a5810"},{url:"manifest.webmanifest",revision:"ca70a3e310f9b8cbe99d08ce13ee8ae5"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
