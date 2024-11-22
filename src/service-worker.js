import { buildId } from './client';

const CACHE_NAME = `react-pwa-skeleton-${buildId}`;

// The static resources that the app needs to function.
const APP_STATIC_RESOURCES = [
  '/',
  '/index.html',
  '/index.js',
  '/index.css',
  '/offline'
];

// Cache static files on intall
self.addEventListener('install', (event) => {
  event.waitUntil(async function onInstallServiceWorker() {
    const cache = await caches.open(CACHE_NAME);
    cache.addAll(APP_STATIC_RESOURCES);
  });
});

// Try to fetch the given resource and responde with the cached offline site if backend is not available
self.addEventListener('fetch', (event) => {
  event.waitUntil(async function onFetchResource() {
    try {
      // Try to load the page from the network.
      const response = await fetch(event.request);

      return response;
    } catch (error) {
      const cache = await caches.open(CACHE_NAME);
      const response = await cache.match('/offline');

      return response;
    }
  });
});

// Remove old cached on activate
self.addEventListener('activate', (event) => {
  event.waitUntil(async function onActivateServiceWorker() {
    const keys = await caches.keys();
    return Promise.all(keys.map((key) => {
      if (key === CACHE_NAME) {
        return Promise.resolve();
      }

      return caches.delete(key);
    }));
  });
});
