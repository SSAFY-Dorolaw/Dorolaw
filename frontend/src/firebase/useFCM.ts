import { useState, useEffect, useRef } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messagingPromise } from './config';
import { registerServiceWorker } from './serviceWorker';
import apiClient from '@/shared/api/api-client';

// 커스텀 이벤트 생성
export const FCM_NOTIFICATION_RECEIVED = 'fcm-notification-received';

const useFCM = () => {
  const [token, setToken] = useState<string | null>(null);
  const [notificationPermission, setNotificationPermission] = useState<
    string | null
  >(null);
  const [error, setError] = useState<Error | null>(null);

  // 구독 해제 함수 저장 ref
  const unsubscribeRef = useRef<(() => void) | null>(null);

  // 알림 권한 요청 함수
  const requestNotificationPermission =
    async (): Promise<NotificationPermission> => {
      try {
        const permission = await Notification.requestPermission();
        setNotificationPermission(permission);
        return permission;
      } catch (err) {
        console.error('알림 권한 요청 실패:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
        return 'denied';
      }
    };

  // FCM 토큰을 API 서버에 등록하는 함수
  const registerTokenToServer = async (fcmToken: string): Promise<void> => {
    try {
      const response = await apiClient.post('fcm-tokens', { token: fcmToken });
      localStorage.setItem('fcmToken', fcmToken);
    } catch (error) {
      console.warn('❌ FCM 토큰 서버 등록 실패:', error);
      throw error;
    }
  };

  useEffect(() => {
    const initFCM = async () => {
      try {
        // 1. 서비스 워커 등록
        await registerServiceWorker();

        // 2. 알림 권한 요청
        const permission = await requestNotificationPermission();
        if (permission !== 'granted') {
          console.log('알림 권한이 거부되었습니다');
          return;
        }

        // 3. 메시징 인스턴스 가져오기
        const messaging = await messagingPromise;
        if (!messaging) {
          throw new Error(
            '이 브라우저에서는 Firebase 메시징이 지원되지 않습니다',
          );
        }

        // 4. FCM 토큰 가져오기
        const vapidKey = import.meta.env.VITE_FIREBASE_VAPID_KEY;
        const fcmToken = await getToken(messaging, { vapidKey });

        if (!fcmToken) {
          throw new Error('FCM 토큰을 가져올 수 없습니다');
        }

        setToken(fcmToken);

        // 5. 백엔드에 토큰 전송
        const storedToken = localStorage.getItem('fcmToken');

        if (!storedToken) {
          await registerTokenToServer(fcmToken);
        } else if (storedToken !== fcmToken) {
          await registerTokenToServer(fcmToken);
        }

        // 6. 포그라운드 메시지 핸들러 설정
        if (!unsubscribeRef.current) {
          unsubscribeRef.current = onMessage(messaging, (payload) => {
            const { title, body } = payload.notification ?? {};
            if (title && body) {
              new Notification(title, {
                body,
                icon: payload.notification?.icon ?? '/notification-icon.png',
              });

              // FCM 알림 수신 이벤트 발행
              document.dispatchEvent(
                new CustomEvent(FCM_NOTIFICATION_RECEIVED, {
                  detail: payload,
                }),
              );
            }
          });
        }

        // 7. 서비스 워커로부터 메시지 수신 설정
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'PUSH_NOTIFICATION_RECEIVED') {
            document.dispatchEvent(
              new CustomEvent(FCM_NOTIFICATION_RECEIVED, {
                detail: event.data.payload,
              }),
            );
          }
        });
      } catch (err) {
        console.error('FCM 설정 오류:', err);
        setError(err instanceof Error ? err : new Error(String(err)));
      }
    };

    void initFCM();

    // 정리 함수
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
        unsubscribeRef.current = null;
      }
    };
  }, []);

  // 토큰 강제 등록 함수 추가 (테스트용)
  const forceRegisterToken = async () => {
    if (token) {
      try {
        await registerTokenToServer(token);
        return true;
      } catch (err) {
        return false;
      }
    }
    return false;
  };

  return { token, notificationPermission, error, forceRegisterToken };
};

export default useFCM;
