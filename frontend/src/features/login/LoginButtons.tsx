import { requestKakaoAuth } from '@/shared/api/login';
import axios from 'axios';
import { useState } from 'react';

const LoginButton = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;

  // const fetchUser = async () => {
  //   try {
  //     const res = await axios.get(
  //       'http://localhost:8080/oauth2/authorization/kakao',
  //     );

  //     return res;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const handleKakaoLogin = async () => {
  //   // window.location.href = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`;
  //   // window.location.href = REDIRECT_URI;

  //   try {
  //     setIsLoading(true);
  //     const response = await requestKakaoAuth();
  //     return response;
  //   } catch (e) {
  //     console.log(e);
  //   }

  //   setIsLoading(false);
  // };

  const handleKakaoLogin = (role) => {
    // 쿠키에 역할 정보 저장
    document.cookie = 'role=' + role + '; path=/';
    window.location.href = 'http://localhost:8080/oauth2/authorization/kakao';

    // axios를 사용하여 GET 요청 보내기
    // withCredentials: true로 쿠키를 함께 전송
    // axios
    //   .get('http://localhost:8080/oauth2/authorization/kakao', {
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     // OAuth 서비스는 일반적으로 리다이렉트하므로
    //     // 응답에 리다이렉트 URL이 있으면 이동

    //     // 직접 리다이렉트하지 않는 경우 응답 데이터 처리
    //     console.log('OAuth 응답:', response.data);
    //   })
    //   .catch((error) => {
    //     console.error('로그인 과정에서 오류가 발생했습니다:', error);
    //   });
  };

  return (
    <button
      onClick={handleKakaoLogin}
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
  );
};

export default LoginButton;
