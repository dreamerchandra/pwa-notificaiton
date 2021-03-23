self.addEventListener('install', (e) => {
  console.log('intall event')
  e.waitUntil(
    caches.open('fox-store').then((cache) => cache.addAll([
      './index.html',
      './index1.js',
      './style.css',
      './images/fox1.jpg',
      './images/fox2.jpg',
      './images/fox3.jpg',
      './images/fox4.jpg',
    ])),
  );
});

async function getUnreadCount () {
  const notification = await self.registration.getNotifications()
  return notification.length
}

self.addEventListener('fetch', (e) => {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request)),
  );
});
self.addEventListener('push', async function (e) {
  console.log('incoming notification', e)
  const count = await getUnreadCount() + 1;
  navigator.setAppBadge(count)
});
self.addEventListener('notificationclose', function (e) {
  console.log('notificationclose', e)
  console.log('test', e)
  navigator.clearAppBadge()
});
self.addEventListener('notificationclick', function (e) {
  console.log('notificationclick', e)
  navigator.clearAppBadge()
});