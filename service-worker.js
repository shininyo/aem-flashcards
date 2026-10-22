// Sürüm numarasını (v1) içerik değiştirdiğinde artır; eski önbellek otomatik silinir.
const CACHE="aem-flashcards-v1";
const FILES=[
 "./",
 "index.html",
 "manifest.json",
 "icons/icon-192.png",
 "icons/icon-512.png",
 "icons/icon-maskable-512.png",
 "img/01.jpg",
 "img/02.jpg",
 "img/03.jpg",
 "img/04.jpg",
 "img/05.jpg",
 "img/06.jpg",
 "img/07.jpg",
 "img/08.jpg",
 "img/09.jpg",
 "img/10.jpg",
 "img/11.jpg",
 "img/12.jpg",
 "img/13.jpg",
 "img/14.jpg",
 "img/15.jpg",
 "img/16.jpg",
 "img/17.jpg",
 "img/18.jpg",
 "img/19.jpg",
 "img/20.jpg",
 "img/21.jpg",
 "img/22.jpg",
 "img/23.jpg"
];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting()))});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==CACHE).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
// Önce önbellek (internetsiz çalışır), yoksa ağdan al ve önbelleğe ekle
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET")return;
  e.respondWith(caches.match(e.request).then(r=>r||fetch(e.request).then(n=>{
    if(n.ok&&new URL(e.request.url).origin===location.origin){const cp=n.clone();caches.open(CACHE).then(c=>c.put(e.request,cp))}
    return n}).catch(()=>caches.match("index.html"))));
});
