import { useState, useEffect, useRef } from 'react';
import { getToken, onMessage } from 'firebase/messaging';
import { messagingPromise } from './config';
import { registerServiceWorker } from './serviceWorker';
import apiClient from '@/shared/api/api-client'; // apiClient 임포트

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
    console.log('🔍 registerTokenToServer 함수 호출됨', fcmToken);
    try {
      console.log('🔍 API 요청 시작:', fcmToken.substring(0, 10) + '...');

      // 이 줄에서 직접 axios를 사용해봅니다
      const response = await apiClient.post('fcm-tokens', { token: fcmToken });

      console.log('✅ FCM 토큰이 서버에 등록되었습니다:', response.status);

      // 토큰을 로컬 스토리지에 저장
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
        console.log('FCM 토큰:', fcmToken);

        // 5. 백엔드에 토큰 전송
        const storedToken = localStorage.getItem('fcmToken');
        console.log(
          '🔍 현재 저장된 토큰:',
          storedToken?.substring(0, 10) + '...',
        );
        console.log('🔍 새 토큰:', fcmToken.substring(0, 10) + '...');
        console.log('🔍 토큰 비교:', storedToken !== fcmToken);

        // 조건 체크를 더 명확하게 합니다
        if (!storedToken) {
          console.log('🔍 저장된 토큰이 없어 새로 등록합니다');
          await registerTokenToServer(fcmToken);
        } else if (storedToken !== fcmToken) {
          console.log('🔍 토큰이 변경되어 새로 등록합니다');
          await registerTokenToServer(fcmToken);
        } else {
          console.log('🔍 토큰이 동일하여 등록을 생략합니다');
        }

        // 6. 포그라운드 메시지 핸들러 설정
        if (!unsubscribeRef.current) {
          unsubscribeRef.current = onMessage(messaging, (payload) => {
            console.log('📩 포그라운드 메시지 수신:', payload);

            const { title, body } = payload.notification || {};
            if (title && body) {
              new Notification(title, {
                body,
                icon: payload.notification?.icon || '/notification-icon.png',
              });
            }
          });
        }

        // 7. 서비스 워커로부터 메시지 수신 설정
        navigator.serviceWorker.addEventListener('message', (event) => {
          if (event.data && event.data.type === 'PUSH_NOTIFICATION_RECEIVED') {
            console.log('서비스 워커로부터 알림 수신:', event.data.payload);
            // 여기서 알림 처리 또는 상태 업데이트 가능
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
