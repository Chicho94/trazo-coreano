const CACHE = 'trazo-topik-v13';
const CORE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './data/topik-content.js',
  './data/svg-vocabulary.js',
  './manifest.webmanifest',
  './favicon.svg',
  './laboratorio-anatomy.html',
  './laboratorio-anatomy-oscuro.html',
  './assets/anatomy/hangul-compositor.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE).then(cache => cache.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET' || new URL(event.request.url).origin !== self.location.origin) return;
  event.respondWith(
    caches.match(event.request).then(cached => cached || fetch(event.request).then(response => {
      if (response.ok) caches.open(CACHE).then(cache => cache.put(event.request,response.clone()));
      return response;
    }))
  );
});
