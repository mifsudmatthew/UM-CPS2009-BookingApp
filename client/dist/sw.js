if(!self.define){let e,i={};const n=(n,c)=>(n=new URL(n+".js",c).href,i[n]||new Promise((i=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=i,document.head.appendChild(e)}else e=n,importScripts(n),i()})).then((()=>{let e=i[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(c,r)=>{const s=e||("document"in self?document.currentScript.src:"")||location.href;if(i[s])return;let o={};const f=e=>n(e,s),l={module:{uri:s},exports:o,require:f};i[s]=Promise.all(c.map((e=>l[e]||f(e)))).then((e=>(r(...e),o)))}}define(["./workbox-7cfec069"],(function(e){"use strict";self.addEventListener("message",(e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()})),e.precacheAndRoute([{url:"apple-touch-icon.png",revision:"f80ace7cd209f343cf2c7d7ce2b0f631"},{url:"assets/index-BhJJM20V.js",revision:null},{url:"assets/index-BVxHvDyF.css",revision:null},{url:"assets/racket-Dl6xEiXo.png",revision:null},{url:"favicon-16x16.png",revision:"0fbf0870ae2dfe132c317905119d6151"},{url:"favicon-32x32.png",revision:"e651e3754ffc252e2b73047e23a70a5f"},{url:"icon-192x192.png",revision:"ec1eb9d24a208681427986f181567fbd"},{url:"icon-512x512.png",revision:"a659f4da6782afa6f70ebfaefd6e0c92"},{url:"icon-maskable-512x512.png",revision:"9c8ca50366466ba0e58627fb570a5810"},{url:"index.html",revision:"abacb403043c711e6760fc264c8cc07c"},{url:"logo.png",revision:"5fffc4d6691817194286bb889eed1b05"},{url:"original-tennis-ball.png",revision:"1cee5dfbe9fdfd3c464fbc85e91b40bb"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"icon-192x192.png",revision:"ec1eb9d24a208681427986f181567fbd"},{url:"icon-512x512.png",revision:"a659f4da6782afa6f70ebfaefd6e0c92"},{url:"icon-maskable-512x512.png",revision:"9c8ca50366466ba0e58627fb570a5810"},{url:"manifest.webmanifest",revision:"6ed3b022c21a6ea6b41a0d1cda65fc7d"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html")))}));
//# sourceMappingURL=sw.js.map
