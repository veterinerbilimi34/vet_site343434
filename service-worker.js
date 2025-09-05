const CACHE_NAME = 'vetinfo-cache-v1';
const ASSETS = [
  'index.html','about.html','info.html','blog.html','blog-distemper.html','notice.html',
  'assets/style.css','assets/script.js','manifest.webmanifest'
];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.map(k => k !== CACHE_NAME && caches.delete(k))))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then(resp => resp || fetch(e.request).then(fetchResp => {
      const copy = fetchResp.clone();
      caches.open(CACHE_NAME).then(cache => cache.put(e.request, copy)).catch(()=>{});
      return fetchResp;
    }).catch(()=>caches.match('index.html')))
  );
});
