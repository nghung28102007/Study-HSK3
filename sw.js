/**
 * Service Worker for HSK 3 Orthographic Lab (Offline App Shell + HanziWriter Stroke Cache)
 */
const CACHE_NAME = 'hsk3-orthographic-lab-v7';
const CORE_ASSETS = [
  './',
  './index.html',
  './styles.css',
  './manifest.json',
  './data/hsk3_vocab.js',
  './js/sound.js',
  './js/storage.js',
  './js/writer.js',
  './js/radicals.js',
  './js/games.js',
  './js/app.js'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(CORE_ASSETS)).catch(() => {})
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// Network-First strategy so updates on Netlify are always visible immediately
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    fetch(event.request)
      .then(networkResp => {
        if (networkResp && networkResp.status === 200) {
          const copy = networkResp.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        }
        return networkResp;
      })
      .catch(() => caches.match(event.request))
  );
});
