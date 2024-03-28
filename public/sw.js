const CACHE_NAME = "topaz-search";
const urlsToCache = [];

self.addEventListener(
  "install",
  (event) => {
    event.waitUntil(
      caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
    );
  },
  { once: true }
);

self.addEventListener(
  "fetch",
  (event) => {
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => response || fetch(event.request))
    );
  },
  { once: true }
);
