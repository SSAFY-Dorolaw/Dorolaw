import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useClientProfile } from '@/entities/clients/model/queries';
import { useAuthStore } from '@/entities/auth/model/store';
import { authApi } from '@/entities/auth/api';
import { useLawyerMyProfile } from '@/entities/lawyers/model/queries';

function LoginRedirect() {
  const navigate = useNavigate();
  const setClientId = useAuthStore((state) => state.setClientId);
  const setRole = useAuthStore((state) => state.setRole);
  const login = useAuthStore((state) => state.login);
  const [roleLoading, setRoleLoading] = useState(true);
  const [roleError, setRoleError] = useState(false);

  const token = new URL(window.location.toString()).searchParams.get('token');
  console.log(token);
  useEffect(() => {
    if (!token) {
      void navigate('/login', { state: { error: '인가 코드 없음' } });
    } else {
      localStorage.setItem('token', token);
      login(token);
    }

    const fetchRole = async () => {
      try {
        const memberRole = await authApi.getRole();
        setRole(memberRole.role);
      } catch (error) {
        console.error('Failed to fetch user role:', error);
        setRoleError(true);
      } finally {
        setRoleLoading(false);
      }
    };

    void fetchRole();
  }, [token, navigate, login, setRole]);

  const clientProfileQuery = useClientProfile();
  const lawyerProfileQuery = useLawyerMyProfile();

  const { role } = useAuthStore.getState();

  document.cookie = 'role=' + role + '; path=/';

  const { data, isLoading, isError, isSuccess } =
    role === 'LAWYER' || role === 'CERTIFIED_LAWYER'
      ? lawyerProfileQuery
      : clientProfileQuery;

  useEffect(() => {
    if (isError) {
      void navigate('/login');
    }
  }, [isError, navigate]);

  useEffect(() => {
    if (isSuccess && data) {
      if (role === 'LAWYER' || role === 'CERTIFIED_LAWYER') {
        // LawyerProfile 타입에 있는 속성 사용
        if ('lawyerId' in data) {
          setClientId(data.lawyerId);
        }
      } else {
        // ClientProfile 타입에 있는 속성 사용
        if ('clientId' in data) {
          setClientId(data.clientId);
        }
      }

      // 저장된 리다이렉트 경로가 있으면 해당 경로로 이동
      // if not, 메인페이지로
      const redirectPath = localStorage.getItem('redirectAfterLogin') ?? '/';
      localStorage.removeItem('redirectAfterLogin'); // 사용 후 제거
      void navigate(redirectPath);
    }
  }, [isSuccess, navigate, data, setClientId, role]);

  if (roleLoading) {
    return (
      <div>
        <h2>사용자 정보 확인 중...</h2>
      </div>
    );
  }

  if (roleError) {
    return (
      <div>
        <h2>사용자 정보를 가져오는데 실패했습니다.</h2>
      </div>
    );
  }

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
