const CACHE_NAME = 'garajdefteri-v2';
const ASSETS = [
  '/garaj-defteri/',
  '/garaj-defteri/index.html',
  '/garaj-defteri/icon-yeni.png', // Eğer yeni ikon adı bu ise buraya yazmalısın
  '/garaj-defteri/manifest.json'
];

// Kurulum aşamasında dosyaları önbelleğe al
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  console.log('[Service Worker] Installed & Cached v2');
  self.skipWaiting();
});

// Eski önbellekleri temizle
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim();
});

// İstekleri yakala ve önbellekten sun
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
