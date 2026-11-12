const CACHE_NAME = 'garajdefteri-v5';
const ASSETS = [
  './',
  './index.html',
  './icon-yeni.png',
  './manifest.json',
  './supabase.js'
];

// 1. Kurulum aşaması
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
  self.skipWaiting();
});

// 2. Etkinleştirme aşaması (Eski önbellekleri temizler)
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

// 3. İstekleri yönetme (Ağ öncelikli strateji)
self.addEventListener('fetch', (e) => {
  // Supabase veya farklı alan adlarındaki API isteklerine asla müdahale etme (Direkt ağa bırak)
  if (!e.request.url.startsWith(location.origin)) {
    return;
  }

  // HTML ve sayfa istekleri için önce AĞI kontrol et (Güncellemelerin anında yansıması için)
  if (e.request.mode === 'navigate' || e.request.url.endsWith('.html') || e.request.url.endsWith('/garaj-defteri/')) {
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(e.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          // İnternet yoksa veya sunucuya ulaşılamazsa önbellekteki son sürümü ver
          return caches.match(e.request);
        })
    );
    return;
  }

  // Diğer statik dosyalar (ikonlar vb.) için standart önbellek kontrolü
  e.respondWith(
    caches.match(e.request).then((cachedResponse) => {
      return cachedResponse || fetch(e.request);
    })
  );
});
