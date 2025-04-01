import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function LoginRedirect() {
  const navigate = useNavigate();

  useEffect(() => {
    const token: string | null = new URL(
      window.location.toString(),
    ).searchParams.get('token');

    console.log(token);

    const kakaoLoginRequest = async (token: string | null) => {
      try {
        const response = await axios.get(
          'http://localhost:8080/api/members/profile',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        return response;
      } catch (error) {
        console.log(error, '카카오로그인실패');
      }
    };

    const handleKakaoLogin = async (token: string | null) => {
      if (!token) {
        void navigate('/login', { state: { error: '인가 코드 없음' } });
      }

      localStorage.setItem('token', token ?? '');

      try {
        const loginResponse = await kakaoLoginRequest(token);

        if (!token) {
          void navigate('/login', { state: { error: '카카오 로그인 실패' } });
        }
        console.log(loginResponse);

        void navigate('/');
      } catch (e) {
        console.log(e, '요청 실패');
      }
    };

    void handleKakaoLogin(token);
  }, []);

  return (
    <div>
      <h2>카카오 로그인 중..</h2>
    </div>
  );
}
export default LoginRedirect;
