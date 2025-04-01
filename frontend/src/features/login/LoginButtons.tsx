import { useState } from 'react';

interface LoginButtonProps {
  role: string;
}

const LoginButton = ({ role }: LoginButtonProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleKakaoLogin = (role: string) => {
    setIsLoading(true);
    // 쿠키에 역할 정보 저장
    document.cookie = 'role=' + role + '; path=/';
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';
    setIsLoading(false);
  };

  return (
    <div>
      <button
        onClick={() => void handleKakaoLogin(role)}
        disabled={isLoading}
        className={`rounded-md px-4 py-2 font-medium transition-colors ${
          isLoading
            ? 'cursor-not-allowed bg-gray-300 text-gray-500'
            : 'bg-yellow-400 text-black hover:bg-yellow-500'
        }`}
      >
        {isLoading ? (
          <span className="flex items-center">
            <svg
              className="-ml-1 mr-2 size-4 animate-spin text-black"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            로그인 중...
          </span>
        ) : (
          '카카오 로그인'
        )}
      </button>
    </div>
  );
};

export default LoginButton;
