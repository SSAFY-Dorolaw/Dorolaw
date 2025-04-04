import React, { useState } from 'react';
import useFCM from '@/firebase/useFCM';

const FCMTester = () => {
  const { token, notificationPermission } = useFCM();
  const [copied, setCopied] = useState(false);
  const [showLocalNotification, setShowLocalNotification] = useState(false);

  const copyToken = () => {
    if (token) {
      void navigator.clipboard.writeText(token);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const testLocalNotification = () => {
    if (Notification.permission === 'granted') {
      new Notification('테스트 알림', {
        body: '이것은 로컬 테스트 알림입니다.',
        icon: '/notification-icon.png',
      });
      setShowLocalNotification(true);
      setTimeout(() => setShowLocalNotification(false), 2000);
    }
  };

  return (
    <div
      style={{
        padding: '20px',
        maxWidth: '600px',
        margin: '0 auto',
        border: '1px solid #eee',
        borderRadius: '8px',
      }}
    >
      <h2>FCM 테스트</h2>

      <div style={{ marginBottom: '16px' }}>
        <p>
          <strong>알림 권한:</strong> {notificationPermission || '로딩 중...'}
        </p>
      </div>

      <div style={{ marginBottom: '16px' }}>
        <h3>FCM 토큰</h3>
        <textarea
          readOnly
          value={token ?? '토큰을 가져오는 중...'}
          style={{
            width: '100%',
            minHeight: '80px',
            padding: '8px',
            marginBottom: '10px',
          }}
        />
        <button onClick={copyToken} disabled={!token}>
          {copied ? '복사됨!' : '토큰 복사'}
        </button>
      </div>

      <div>
        <h3>알림 테스트</h3>
        <button
          onClick={testLocalNotification}
          disabled={notificationPermission !== 'granted'}
        >
          {showLocalNotification ? '알림 표시됨!' : '로컬 알림 테스트'}
        </button>
      </div>
    </div>
  );
};

export default FCMTester;
