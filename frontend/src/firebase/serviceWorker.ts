import { firebaseConfig } from './config';

// 서비스 워커 등록 및 Firebase 구성 전달 함수
export const registerServiceWorker =
  async (): Promise<ServiceWorkerRegistration | null> => {
    if (!('serviceWorker' in navigator)) {
      console.warn('이 브라우저는 서비스 워커를 지원하지 않습니다');
      return null;
    }

    try {
      // 서비스 워커 등록
      const registration = await navigator.serviceWorker.register(
        '/firebase-messaging-sw.js',
      );
      // console.log('FCM 서비스 워커가 등록되었습니다:', registration);

      // 서비스 워커가 활성화될 때까지 기다림
      await navigator.serviceWorker.ready;

      // 활성화된 서비스 워커에 Firebase 구성 전달
      if (registration.active) {
        registration.active.postMessage({
          type: 'SET_FIREBASE_CONFIG',
          config: firebaseConfig,
        });
        // console.log('Firebase 구성이 서비스 워커에 전달되었습니다');
      }

      return registration;
    } catch (error) {
      console.error('FCM 서비스 워커 등록 실패:', error);
      return null;
    }
  };
