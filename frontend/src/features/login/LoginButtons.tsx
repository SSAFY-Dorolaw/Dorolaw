import { useMutation } from '@tanstack/react-query';
import loginButton from '@/shared/assets/images/kakao_login.svg';
// import { useClientProfile } from '@/entities/clients/model/queries';
// import { useLawyerMyProfile } from '@/entities/lawyers/model/queries';
// import { useNavigate } from 'react-router-dom';
// import { useAuthStore } from '@/entities/auth/model/store';

interface LoginButtonProps {
  role: string;
}

const LoginButton = ({ role }: LoginButtonProps) => {
  // const navigate = useNavigate();
  // const { setClientId, login } = useAuthStore();

  // const clientProfileQuery = useClientProfile();
  // const lawyerProfileQuery = useLawyerMyProfile();

  const handleNormalLogin = () => {
    // 쿠키 설정
    document.cookie = `role=${role}; path=/`;

    // 카카오 로그인과 동일한 방식으로 리디렉션 URL로 이동
    const redirectUrl = `${import.meta.env.VITE_API_URL}/superAdmin/${role === 'GENERAL' ? 'general' : 'lawyer'}`;
    window.location.href = redirectUrl;
  };

  // const handleLogin = async () => {
  //   try {
  //     // 쿼리를 리패치하여 새로운 데이터를 가져옵니다
  //     if (role === 'LAWYER') {
  //       document.cookie = 'role=LAWYER; path=/; max-age=86400'; // 24시간 유효한 쿠키

  //       // refetch 전에 쿠키 설정이 적용되도록 함
  //       await new Promise((resolve) => setTimeout(resolve, 100));
  //       await lawyerProfileQuery.refetch();
  //       if (lawyerProfileQuery.isSuccess && lawyerProfileQuery.data) {
  //         console.log('변호사로그인');
  //         setClientId(lawyerProfileQuery.data.lawyerId);
  //       }
  //     } else {
  //       await clientProfileQuery.refetch();
  //       if (clientProfileQuery.isSuccess && clientProfileQuery.data) {
  //         console.log('일반로그인');
  //         setClientId(clientProfileQuery.data.clientId);
  //       }
  //     }

  //     // 리다이렉트 처리
  //     const redirectPath = localStorage.getItem('redirectAfterLogin') ?? '/';
  //     localStorage.removeItem('redirectAfterLogin');
  //     navigate('/');
  //   } catch (e) {
  //     alert('로그인 실패');
  //     console.log(e);
  //   }
  // };

  const { mutate: kakaoLogin } = useMutation({
    mutationFn: () => {
      document.cookie = `role=${role}; path=/`;
      window.location.href = `${import.meta.env.VITE_KAKAO_REDIRECT_URI}?role=${encodeURIComponent(role)}`;

      // 리디렉트되기 전에 mutationFn이 Promise를 반환하도록 함
      return Promise.resolve();
    },
  });

  return (
    <div>
      <button
        className="mb-2 w-full rounded-lg bg-p5 p-4 text-center text-white"
        onClick={handleNormalLogin}
      >
        로그인
      </button>
      <img
        src={loginButton}
        alt="카카오 로그인"
        onClick={() => void kakaoLogin()}
        className="cursor-pointer"
      />
    </div>
  );
};

export default LoginButton;
