const CACHE_NAME = 'SITE_CONTENT_V1';

const urlsToCache = [
            // /root
            // '/lollykrown',
            '/lollykrown/index.html',
            '/lollykrown/favicon.ico',
            '/lollykrown/package.json',
            '/lollykrown/offline.html',
            '/lollykrown/index.js',
        
            '/lollykrown/public/css/grayscale.css',
            '/lollykrown/public/css/grayscale.min.css',
            '/lollykrown/public/img/bg-header.jpg',
            '/lollykrown/public/img/bg-masthead.jpg',
            '/lollykrown/public/img/bg-signup.jpg',
            '/lollykrown/public/img/demo-image-01.jpg',
            '/lollykrown/public/img/demo-image-02.jpg',
            '/lollykrown/public/img/ipad-size.png',
            '/lollykrown/public/img/mobi_health.png',
            '/lollykrown/public/img/other_facts.jpg',
            '/lollykrown/public/img/placeholder.jpg',
            '/lollykrown/public/img/placeholder2.jpg',
            '/lollykrown/public/img/rccgdc.png',
            '/lollykrown/public/img/what_i_do.jpg',
            '/lollykrown/public/js/grayscale.js',
            '/lollykrown/public/js/grayscale.min.js',
            '/lollykrown/public/js/jquery.easing.compatibility.js',
            '/lollykrown/public/js/jquery.easing.js',
            '/lollykrown/public/js/jquery.easing.min.js',
            '/lollykrown/public/vendor/bootstrap/css/bootstrap.css',
            '/lollykrown/public/vendor/bootstrap/css/bootstrap.min.css',
            '/lollykrown/public/vendor/bootstrap/js/bootstrap.js',
            '/lollykrown/public/vendor/bootstrap/js/bootstrap.min.js'
        ];

self.addEventListener('install', installer  => {
    console.log('Installing');

    const done = async () => {
        const cache = await caches.open(CACHE_NAME);
        return cache.addAll(urlsToCache);
    };

    installer.waitUntil(done());
});

self.addEventListener('fetch', fetchEvent => {
    // respond to fetch request with a match from the cache
    // if not in cache, then request from network and cache
    // if there is a server error, show the offline page
    const url = fetchEvent.request.url;

    console.log(`Fetching: ${url}`);

    const getResponse = async (request) => {
        let response;

        response = await caches.match(request);
        if(response && response.status === 200) {
            console.log('File in cache. Returning cached version.');
            return response;
        }

        try {
            response = await fetch(request);
            if(response && response.status === 404) {
                return caches.match('/lollykrown/404.html');
            }
        } catch (e) {
            return caches.match('/lollykrown/offline.html')
        }

        const clone = response.clone();
        const cache = await caches.open(CACHE_NAME);
        cache.put(url, clone);
        return response;
    };

    fetchEvent.respondWith(getResponse(fetchEvent.request));
});

self.addEventListener('activate', activator => {
    console.log('Activating');

    const currentCaches = [CACHE_NAME];
    const done = async () => {
        const names = await caches.keys();
        return Promise.all(names.map(name => {
            if(!currentCaches.includes(name)) {
                return caches.delete(name);
            }
        }));
    };

    activator.waitUntil(done());
});
