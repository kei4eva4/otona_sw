
let urlsToCache = [
    '/',
];

for(let i=1;i<=100;i++){
    urlsToCache.push(`https://robohash.org/${i}.png?size=100x100`)
}

// インストール
self.addEventListener('install', function (e) {
    console.info('install', e);
    e.waitUntil(
        caches.open('v1').then((cache) => {
            // 画像をキャッシュ対象に追加
            cache.addAll(urlsToCache)
        })
    )
});

// アクティベート
self.addEventListener('activate', function (e) {
    console.info('activate', e);
});

// フェッチ
self.addEventListener('fetch', function (e) {
    console.info('fetch', e);

    if (e.request.url.indexOf('test') != -1) {
        e.respondWith(new Response('Hello world'));
    }

    e.respondWith(
        caches.match(e.request)
            .then(function (response) {
                    // キャッシュがあったのでそのレスポンスを返す
                    if (response) {
                        console.info(`Using cache: ${e.request.url}`);
                        return response;
                    }
                    return fetch(e.request);
                }
            )
    );

});