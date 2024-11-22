import client from './client';

const CACHE_NAME = `react-pwa-skeleton-${client.buildId}`;

// The static resources that the app needs to function.
const APP_STATIC_RESOURCES = [
  '/',
  '/index.html',
  `/index-${client.buildId}.js`,
  `/index-${client.buildId}.css`
];

// Cache static files on intall
self.addEventListener('install', (event) => {
  async function cacheStaticResources() {
    console.info(`[Service Worker]: Going to add the following resources to cache ${CACHE_NAME}`, APP_STATIC_RESOURCES);
    const cache = await caches.open(CACHE_NAME);

    return cache.addAll(APP_STATIC_RESOURCES);
  }

  event.waitUntil(cacheStaticResources());
});

// Remove old cached on activate
self.addEventListener('activate', (event) => {
  async function cleanupExpiredCaches() {
    console.info('[Service Worker]: Cleanup current cache');
    const keys = await caches.keys();
    return Promise.all(keys.map((key) => {
      if (key === CACHE_NAME) {
        return Promise.resolve();
      }

      console.info(`[Service Worker]: Going to delete the following cache: ${key}`);

      return caches.delete(key);
    }));
  }

  event.waitUntil(cleanupExpiredCaches());

  return self.clients.claim();
});

// Try to fetch the given resource and responde with the cached offline site if backend is not available
self.addEventListener('fetch', (event) => {
  async function returnCachedOrFetchResource() {
    const cached = await caches.match(event.request);
    if (cached) {
      console.info(`[Service Worker]: Return cached resource: ${event.request.url}`);

      return cached;
    }

    const response = await fetch(event.request);
    const cache = await caches.open(CACHE_NAME);
    console.info(`[Service Worker] Caching new resource: ${event.request.url}`);
    await cache.put(event.request, response.clone());

    return response;
  }

  event.respondWith(returnCachedOrFetchResource());
});
