// Simple app-shell cache so the app installs and opens instantly.
// Ayah/audio data still comes fresh from the network (Quran APIs & mp3quran.net).
const CACHE_NAME = 'al-quran-app-v1';
const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)).catch(() => {})
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;

  // Only handle same-origin app-shell files with cache-first.
  // Everything else (Quran text APIs, mp3 audio, fonts) goes straight to network
  // so content always stays fresh and audio streams normally.
  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;

  if (isSameOrigin && req.method === 'GET') {
    event.respondWith(
      caches.match(req).then((cached) => {
        return (
          cached ||
          fetch(req)
            .then((res) => {
              const resClone = res.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
              return res;
            })
            .catch(() => cached)
        );
      })
    );
  }
  // Cross-origin (API + audio) requests: let the browser handle them normally.
});
