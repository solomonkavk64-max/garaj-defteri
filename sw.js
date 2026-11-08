const CACHE_NAME = 'garajdefteri-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/icon.png',
  '/manifest.json'
];

// Kurulum aşamasında dosyaları önbelleğe al
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  console.log('[Service Worker] Installed & Cached');
});

// İstekleri yakala ve önbellekten sun
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      return response || fetch(e.request);
    })
  );
});
