import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

interface LoginButtonProps {
  role: string;
}

const LoginButton = ({ role }: LoginButtonProps) => {
  const { mutate } = useMutation({
    mutationFn: () => {
      document.cookie = `role=${role}; path=/`;
      window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';

      // 리다이렉트되기 전에 mutationFn이 Promise를 반환하도록 함
      return Promise.resolve();
    },
  });

  return (
    <div>
      <button
        onClick={() => void mutate()}
        className="rounded-md bg-yellow-400 px-4 py-2 font-medium text-black transition-colors hover:bg-yellow-500"
      >
        카카오 로그인
      </button>
    </div>
  );
};

export default LoginButton;
