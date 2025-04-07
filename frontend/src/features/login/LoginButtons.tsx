import { useMutation } from '@tanstack/react-query';
import loginButton from '@/shared/assets/images/kakao_login.svg';

interface LoginButtonProps {
  role: string;
}

const LoginButton = ({ role }: LoginButtonProps) => {
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
