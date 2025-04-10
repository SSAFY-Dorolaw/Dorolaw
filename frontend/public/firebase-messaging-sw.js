importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/10.8.0/firebase-messaging-compat.js',
);

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('✅ FCM 서비스 워커가 활성화되었습니다.');
});

// 메인 앱에서 Firebase 구성 수신
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SET_FIREBASE_CONFIG') {
    // Firebase 초기화
    self.firebaseConfig = event.data.config;
    firebase.initializeApp(self.firebaseConfig);
    self.messaging = firebase.messaging();

    // 백그라운드 메시지 처리
    self.messaging.onBackgroundMessage((payload) => {
      const notificationTitle = payload.notification?.title || '새로운 알림';
      const notificationOptions = {
        body: payload.notification?.body || '내용 없음',
        icon: payload.notification?.icon || '/notification-icon.png',
      };

      self.registration.showNotification(
        notificationTitle,
        notificationOptions,
      );

      // 열려있는 클라이언트에 메시지 전달
      self.clients
        .matchAll({ type: 'window', includeUncontrolled: true })
        .then((clients) => {
          clients.forEach((client) => {
            client.postMessage({
              type: 'PUSH_NOTIFICATION_RECEIVED',
              payload,
            });
          });
        });
    });
  }
});

// 푸시 이벤트 처리 (웹 푸시 API를 통한 알림)
self.addEventListener('push', function (event) {
  if (!event.data) return;

  try {
    const data = event.data.json();
    const notificationTitle = data.notification?.title || '새로운 알림';
    const notificationOptions = {
      body: data.notification?.body || '내용 없음',
      icon: data.notification?.icon || '/notification-icon.png',
      tag: data.notification?.tag,
    };

    event.waitUntil(
      self.registration
        .showNotification(notificationTitle, notificationOptions)
        .then(() => {
          // 알림 표시 후 모든 클라이언트에 이벤트 전달
          return self.clients
            .matchAll({
              type: 'window',
              includeUncontrolled: true,
            })
            .then((clients) => {
              clients.forEach((client) => {
                client.postMessage({
                  type: 'PUSH_NOTIFICATION_RECEIVED',
                  payload: data,
                });
              });
            });
        }),
    );
  } catch (e) {
    console.error('푸시 알림 처리 중 오류:', e);
  }
});

// 알림 클릭 시 처리
self.addEventListener('notificationclick', function (event) {
  event.notification.close();

  // 알림 클릭 시 특정 URL로 이동
  const urlToOpen = new URL('/', self.location.origin).href;

  event.waitUntil(
    self.clients
      .matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // 이미 열린 탭이 있으면 포커스
        for (const client of clientList) {
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // 아니면 새 탭 열기
        if (self.clients.openWindow) {
          return self.clients.openWindow(urlToOpen);
        }
      }),
  );
});
