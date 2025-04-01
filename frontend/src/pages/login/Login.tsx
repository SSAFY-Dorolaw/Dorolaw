import LoginButton from '@/features/login/LoginButtons';

const Login = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white p-8 shadow">
        <div className="text-center">
          <h1 className="text-2xl font-bold">로그인</h1>
          <p className="mt-2 text-gray-600">
            소셜 계정으로 간편하게 로그인하세요
          </p>
        </div>

        <div className="mt-6 flex justify-center">
          <LoginButton />
        </div>
      </div>
    </div>
  );
};

export default Login;
