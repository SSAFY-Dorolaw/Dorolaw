import { RouterProvider } from 'react-router-dom';
import router from '@/app/routes';
import { useEffect } from 'react';
import useFCM from '@/firebase/useFCM';

function App() {
  // FCM 초기화
  const { token, notificationPermission, error } = useFCM();

  useEffect(() => {
    // FCM 초기화 결과 로그
    if (token) {
      console.log('FCM이 성공적으로 초기화되었습니다.');
    }

    if (error) {
      console.error('FCM 초기화 중 오류가 발생했습니다:', error);
    }
  }, [token, error]);

  return <RouterProvider router={router} />;
}

export default App;
