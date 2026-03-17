const CACHE_NAME = 'lga-cache-v58';
const ASSETS = [
  '/',
  '/index.html',
  '/Aufgabe 2.html',
  '/Aufgabe 3.html',
  '/Aufgabe 4.html',
  '/Stimmung 2.html',
  '/style.css',
  '/main.js',
  '/script.js',
  '/aufgabe2.js',
  '/translations.js',
  '/manifest.json',
  '/mascot.png',
  '/icon-192.png',
  '/icon-512.png',
  '/DE.png',
  '/EN.jpg',
  '/PL.png',
  '/ES.png',
  '/HOLZ HINTERGRUND CLEAN 1080x1920.png',
  '/Little Guitar Academy HOME PAGE 2 .png',
  '/Stimmung 2..png'
];

// Install: Cache alle wichtigen Assets
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Sofortige Aktivierung
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

// Activate: Alte Caches löschen
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // Sofortige Kontrolle
  );
});

// Fetch: Cache-First Strategie (Offline-fähig!)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).then((fetchResponse) => {
        // Dynamisches Caching für nicht-gecachte Requests
        return caches.open(CACHE_NAME).then((cache) => {
          // Nur gleiche Origin-Requests cachen
          if (event.request.url.startsWith(self.location.origin)) {
            cache.put(event.request, fetchResponse.clone());
          }
          return fetchResponse;
        });
      });
    }).catch(() => {
      // Offline-Fallback: Wenn alles fehlschlägt, zeige die gecachte index.html
      if (event.request.mode === 'navigate') {
        return caches.match('/index.html');
      }
    })
  );
});
