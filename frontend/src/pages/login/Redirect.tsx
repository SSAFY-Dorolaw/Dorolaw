import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { useClientProfile } from '@/entities/clients/model/queries';

function LoginRedirect() {
  const navigate = useNavigate();
  const token = new URL(window.location.toString()).searchParams.get('token');

  useEffect(() => {
    if (!token) {
      void navigate('/login', { state: { error: '인가 코드 없음' } });
    }
  }, [token, navigate]);

  const { data, isLoading, isError } = useClientProfile();

  useEffect(() => {
    if (isError) {
      void navigate('/login');
    }
  }, [isError, navigate]);

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
