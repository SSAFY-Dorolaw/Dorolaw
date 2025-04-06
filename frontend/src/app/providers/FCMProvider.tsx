import React from 'react';
import useFCM from '@/firebase/useFCM';

interface FCMProviderProps {
  children: React.ReactNode;
}

const FCMProvider: React.FC<FCMProviderProps> = ({ children }) => {
  // FCM 초기화
  useFCM();

  // 이 컴포넌트는 설정용이므로 자식만 반환
  return <>{children}</>;
};

export default FCMProvider;
