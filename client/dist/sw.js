if(!self.define){let e,n={};const i=(i,o)=>(i=new URL(i+".js",o).href,n[i]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=n,document.head.appendChild(e)}else e=i,importScripts(i),n()})).then((()=>{let e=n[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(o,s)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(n[r])return;let l={};const f=e=>i(e,r),c={module:{uri:r},exports:l,require:f};n[r]=Promise.all(o.map((e=>c[e]||f(e)))).then((e=>(s(...e),l)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"f80ace7cd209f343cf2c7d7ce2b0f631"},{url:"assets/index-C29oQh5i.js",revision:null},{url:"assets/index-NoN9h9B5.css",revision:null},{url:"assets/logo-CuQNDwzK.png",revision:null},{url:"assets/racket-Dl6xEiXo.png",revision:null},{url:"assets/workbox-window.prod.es5-DFjpnwFp.js",revision:null},{url:"favicon-16x16.png",revision:"0fbf0870ae2dfe132c317905119d6151"},{url:"favicon-32x32.png",revision:"e651e3754ffc252e2b73047e23a70a5f"},{url:"icon-192x192.png",revision:"ec1eb9d24a208681427986f181567fbd"},{url:"icon-512x512.png",revision:"a659f4da6782afa6f70ebfaefd6e0c92"},{url:"icon-maskable-512x512.png",revision:"9c8ca50366466ba0e58627fb570a5810"},{url:"index.html",revision:"250f1e9ab054764c26d962e8116a9490"},{url:"logo.png",revision:"5fffc4d6691817194286bb889eed1b05"},{url:"original-tennis-ball.png",revision:"1cee5dfbe9fdfd3c464fbc85e91b40bb"},{url:"icon-192x192.png",revision:"ec1eb9d24a208681427986f181567fbd"},{url:"icon-512x512.png",revision:"a659f4da6782afa6f70ebfaefd6e0c92"},{url:"icon-maskable-512x512.png",revision:"9c8ca50366466ba0e58627fb570a5810"},{url:"manifest.webmanifest",revision:"6ed3b022c21a6ea6b41a0d1cda65fc7d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
