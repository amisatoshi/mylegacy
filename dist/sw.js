// My Legacy — Service Worker
// Cache-first strategy: all assets served from cache after first install
// Update: bump CACHE_VERSION when deploying a new build

const CACHE_VERSION = 'ml-v3-29bb2a06';
const CACHE_NAME = CACHE_VERSION;

// All assets to precache on install
const PRECACHE_ASSETS = [
  './',
  './index.html',
  './app.js',
  './manifest.json',
  './mylegacylogo.png',
  // CDN assets — cached on first fetch, served from cache thereafter
  'https://unpkg.com/react@18/umd/react.production.min.js',
  'https://unpkg.com/react-dom@18/umd/react-dom.production.min.js',
  'https://unpkg.com/prop-types@15.8.1/prop-types.min.js',
  'https://unpkg.com/recharts@2.8.0/umd/Recharts.js',
  'https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800;900&display=swap',
];

// ── INSTALL: precache all assets ──────────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Cache local assets strictly; CDN assets best-effort
      const local  = PRECACHE_ASSETS.filter(u => u.startsWith('.') || u.startsWith('/'));
      const remote = PRECACHE_ASSETS.filter(u => u.startsWith('http'));

      return cache.addAll(local).then(() =>
        Promise.allSettled(remote.map(url =>
          fetch(url, { mode: 'cors' })
            .then(r => r.ok ? cache.put(url, r) : null)
            .catch(() => null) // don't fail install if CDN is offline
        ))
      );
    }).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: remove old caches ───────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: cache-first, network fallback ──────────────────────────────────────
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  // Skip non-http(s) requests (chrome-extension etc.)
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      // Not in cache — fetch from network and cache for next time
      return fetch(event.request).then(response => {
        if (!response || response.status !== 200) return response;

        // Only cache same-origin and CORS responses
        const type = response.type;
        if (type !== 'basic' && type !== 'cors') return response;

        const clone = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});

// ── MESSAGE: force update from UI ─────────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});
