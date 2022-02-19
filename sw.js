const STATIC_CHACHE = "static-v1";
const DYNAMIC_CACHE = "dynamic-v1";
const INMUTABLE_CHACHE = "inmutable-v1";

const APP_SHELL = ["/", "index.html", "css/style.css", "js/app.js"];

const APP_SHELL_INMUTABLE = [
  "https://fonts.googleapis.com/css2?family=Titan+One&display=swap",
];

self.addEventListener("install", (e) => {});

self.addEventListener("activate", async (e) => {
  const respuesta = caches.keys().then((keys) => {
    keys.forEach((key) => {
      if (key !== STATIC_CHACHE && key.includes("static")) {
        return caches.delete(key);
      }
    });
  });
});
self.addEventListener("fetch", function (event) {
  event.respondWith(
    caches.open(DYNAMIC_CACHE).then(function (cache) {
      return cache.match(event.request).then(function (response) {
        var fetchPromise = fetch(event.request).then(function (
          networkResponse
        ) {
          if (
            event.request.method == "GET" &&
            !event.request.url.includes("maps.google") &&
            !event.request.url.includes("maps.gstatic") &&
            !event.request.url.includes("chrome-extension") &&
            !event.request.url.includes("eview") //quitar estooo
            //&& !event.request.url.includes(process.env.REACT_APP_API_ENDPOINT)
          )
            cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
        return response || fetchPromise;
      });
    })
  );
});