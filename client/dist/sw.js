if(!self.define){let e,n={};const i=(i,s)=>(i=new URL(i+".js",s).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(s,r)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(n[o])return;let t={};const l=e=>i(e,o),c={module:{uri:o},exports:t,require:l};n[o]=Promise.all(s.map((e=>c[e]||l(e)))).then((e=>(r(...e),t)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"assets/index-Bc6lwBnC.js",revision:null},{url:"assets/index-Dkke1HlF.css",revision:null},{url:"assets/workbox-window.prod.es5-DFjpnwFp.js",revision:null},{url:"index.html",revision:"1421d5f7d8c1630d1ce8d016a30b7b82"},{url:"icon-192x192.png",revision:"ec1eb9d24a208681427986f181567fbd"},{url:"icon-512x512.png",revision:"a659f4da6782afa6f70ebfaefd6e0c92"},{url:"icon-maskable-512x512.png",revision:"9c8ca50366466ba0e58627fb570a5810"},{url:"manifest.webmanifest",revision:"ca70a3e310f9b8cbe99d08ce13ee8ae5"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
