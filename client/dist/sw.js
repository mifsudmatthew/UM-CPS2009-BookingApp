if(!self.define){let e,i={};const n=(n,r)=>(n=new URL(n+".js",r).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(r,s)=>{const o=e||("document"in self?document.currentScript.src:"")||location.href;if(i[o])return;let c={};const f=e=>n(e,o),l={module:{uri:o},exports:c,require:f};i[o]=Promise.all(r.map((e=>l[e]||f(e)))).then((e=>(s(...e),c)))}}define(["./workbox-3e911b1d"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"f80ace7cd209f343cf2c7d7ce2b0f631"},{url:"assets/index-C6QPWQKH.css",revision:null},{url:"assets/index-DSVcM-sZ.js",revision:null},{url:"assets/logo-CuQNDwzK.png",revision:null},{url:"assets/racket-Dl6xEiXo.png",revision:null},{url:"favicon-16x16.png",revision:"0fbf0870ae2dfe132c317905119d6151"},{url:"favicon-32x32.png",revision:"e651e3754ffc252e2b73047e23a70a5f"},{url:"icon-192x192.png",revision:"ec1eb9d24a208681427986f181567fbd"},{url:"icon-512x512.png",revision:"a659f4da6782afa6f70ebfaefd6e0c92"},{url:"icon-maskable-512x512.png",revision:"9c8ca50366466ba0e58627fb570a5810"},{url:"index.html",revision:"c2fedf2f537220b9e79409e331360ad3"},{url:"logo.png",revision:"5fffc4d6691817194286bb889eed1b05"},{url:"original-tennis-ball.png",revision:"1cee5dfbe9fdfd3c464fbc85e91b40bb"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icon-192x192.png",revision:"ec1eb9d24a208681427986f181567fbd"},{url:"icon-512x512.png",revision:"a659f4da6782afa6f70ebfaefd6e0c92"},{url:"icon-maskable-512x512.png",revision:"9c8ca50366466ba0e58627fb570a5810"},{url:"manifest.webmanifest",revision:"6ed3b022c21a6ea6b41a0d1cda65fc7d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
