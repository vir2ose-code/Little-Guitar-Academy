const CACHE_NAME = 'lga-cache-v57';
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
  '/translations.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

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
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
