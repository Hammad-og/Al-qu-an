// App-shell cache so the app installs and works offline —
// but HTML/manifest always use NETWORK-FIRST so updates show up immediately,
// with cache only as an offline fallback. Ayah/audio data always comes fresh
// from the network (Quran APIs & mp3quran.net) — never cached here.
const CACHE_NAME = 'al-quran-app-v2';
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

// Files that must always be fetched fresh first (so edits show up right away)
const NETWORK_FIRST_FILES = ['/', '/index.html', '/manifest.json'];

self.addEventListener('fetch', (event) => {
  const req = event.request;
  const url = new URL(req.url);
  const isSameOrigin = url.origin === self.location.origin;
  if (!isSameOrigin || req.method !== 'GET') return; // let cross-origin (APIs, audio, fonts) pass through untouched

  const isNetworkFirst =
    req.mode === 'navigate' ||
    NETWORK_FIRST_FILES.some((f) => url.pathname === f || url.pathname.endsWith(f));

  if (isNetworkFirst) {
    // NETWORK FIRST: always try to get the latest page; fall back to cache only if offline
    event.respondWith(
      fetch(req)
        .then((res) => {
          const resClone = res.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(req, resClone));
          return res;
        })
        .catch(() => caches.match(req))
    );
    return;
  }

  // CACHE FIRST for static assets (icons etc.) — fine for them to be a little stale
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
});
