import { initializeApp } from 'firebase/app';
import { getMessaging, isSupported } from 'firebase/messaging';

// Firebase 구성 정보
export const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY as string,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN as string,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID as string,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET as string,
  messagingSenderId: import.meta.env
    .VITE_FIREBASE_MESSAGING_SENDER_ID as string,
  appId: import.meta.env.VITE_FIREBASE_APP_ID as string,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID as string,
};

// Firebase 앱 초기화
export const app = initializeApp(firebaseConfig);

// 메시징 지원 여부 확인 및 인스턴스 가져오기
export const messagingPromise = isSupported().then((supported) => {
  if (supported) {
    return getMessaging(app);
  } else {
    console.warn('이 브라우저에서는 Firebase 메시징이 지원되지 않습니다');
    return null;
  }
});
