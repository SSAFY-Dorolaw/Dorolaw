import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientProfile } from '@/entities/clients/model/queries';
import { useAuthStore } from '@/entities/auth/model/store';

function LoginRedirect() {
  const navigate = useNavigate();
  const setClientId = useAuthStore((state) => state.setClientId);

  const token = new URL(window.location.toString()).searchParams.get('token');
  useEffect(() => {
    if (!token) {
      void navigate('/login', { state: { error: '인가 코드 없음' } });
    } else {
      localStorage.setItem('token', token);
    }
  }, [token, navigate]);

  const { data, isLoading, isError, isSuccess } = useClientProfile();

  useEffect(() => {
    if (isError) {
      void navigate('/login');
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (isSuccess && data) {
      // 데이터
      setClientId(data.clientId);

      // 로그인 후 리다이렉트할 경로 확인
      const redirectPath = localStorage.getItem('redirectAfterLogin');

      // 리다이렉트 경로 있으면 해당 경로로, 없으면 홈으로
      if (redirectPath) {
        // 리다이렉트 후 로컬 스토리지에서 해당 항목 제거
        localStorage.removeItem('redirectAfterLogin');
        void navigate(redirectPath);
      } else {
        void navigate('/');
      }
    }
  }, [isSuccess, navigate, data, setClientId]);

  if (isLoading) {
    return (
      <div>
        <h2>카카오 로그인 중..</h2>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <h2>로그인에 실패했습니다.</h2>
      </div>
    );
  }

  return null;
}

export default LoginRedirect;
