import { useMutation } from '@tanstack/react-query';
import loginButton from '@/shared/assets/images/kakao_login.svg';
import { useClientProfile } from '@/entities/clients/model/queries';
import { useLawyerMyProfile } from '@/entities/lawyers/model/queries';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/auth/model/store';
import axios from 'axios';

interface LoginButtonProps {
  role: string;
}

const LoginButton = ({ role }: LoginButtonProps) => {
  const navigate = useNavigate();
  const { setClientId, login } = useAuthStore();

  const clientProfileQuery = useClientProfile();
  const lawyerProfileQuery = useLawyerMyProfile();

  const getToken = async () => {
    try {
      // 로그인 요청
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/superAdmin/${role === 'GENERAL' ? 'general' : 'lawyer'}`,
      );
      const token = res.data.token;
      console.log(role);
      console.log(token);
      login(token);
    } catch (e) {
      alert('로그인에 실패했습니다.');
      console.log(e);
    }
  };

  const handleLogin = async () => {
    try {
      // 쿼리를 리패치하여 새로운 데이터를 가져옵니다
      if (role === 'LAWYER') {
        document.cookie = 'role=LAWYER; path=/; max-age=86400'; // 24시간 유효한 쿠키

        // refetch 전에 쿠키 설정이 적용되도록 함
        await new Promise((resolve) => setTimeout(resolve, 100));
        await lawyerProfileQuery.refetch();
        if (lawyerProfileQuery.isSuccess && lawyerProfileQuery.data) {
          console.log('변호사로그인');
          setClientId(lawyerProfileQuery.data.lawyerId);
        }
      } else {
        await clientProfileQuery.refetch();
        if (clientProfileQuery.isSuccess && clientProfileQuery.data) {
          console.log('일반로그인');
          setClientId(clientProfileQuery.data.clientId);
        }
      }

      // 리다이렉트 처리
      const redirectPath = localStorage.getItem('redirectAfterLogin') ?? '/';
      localStorage.removeItem('redirectAfterLogin');
      navigate('/');
    } catch (e) {
      alert('로그인 실패');
      console.log(e);
    }
  };

  //   if (isSuccess && data) {
  //     if (role === 'LAWYER' || role === 'CERTIFIED_LAWYER') {
  //       // LawyerProfile 타입에 있는 속성 사용
  //       if ('lawyerId' in data) {
  //         setClientId(data.lawyerId);
  //       }
  //     } else {
  //       // ClientProfile 타입에 있는 속성 사용
  //       if ('clientId' in data) {
  //         setClientId(data.clientId);
  //       }
  //     }
  //     console.log(data);

  //     // 저장된 리다이렉트 경로가 있으면 해당 경로로 이동
  //     // if not, 메인페이지로
  //     const redirectPath = localStorage.getItem('redirectAfterLogin') ?? '/';
  //     localStorage.removeItem('redirectAfterLogin'); // 사용 후 제거
  //     void navigate(redirectPath);
  //   }

  //   if (isError) {
  //     alert('로그인에 실패했습니다.');
  //   }
  // };

  const { mutate } = useMutation({
    mutationFn: () => {
      document.cookie = `role=${role}; path=/`;
      window.location.href = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}?role=${encodeURIComponent(role)}`;

      // 리다이렉트되기 전에 mutationFn이 Promise를 반환하도록 함git
      return Promise.resolve();
    },
  });

  return (
    <div>
      <button
        className="mb-2 w-full rounded-lg bg-p5 p-4 text-center text-white"
        onClick={getToken}
      >
        로그인
      </button>
      <img
        src={loginButton}
        alt="카카오 로그인"
        onClick={() => void mutate()}
        className="cursor-pointer"
      />
    </div>
  );
};

export default LoginButton;
