import LoginButton from '@/features/login/LoginButtons';
import LoginTab from '@/features/login/LoginTab';
import { useState } from 'react';

const Login = () => {
  const [isLawyerTab, setIsLawyerTab] = useState<boolean>(false);
  const role = isLawyerTab ? 'LAWYER' : 'GENERAL';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white shadow">
        <header>
          <LoginTab isLawyerTab={isLawyerTab} setIsLawyerTab={setIsLawyerTab} />
        </header>
        <div className="px-8 pb-8">
          <h1 className="text-center text-2xl font-bold">로그인</h1>
          <div className="text-center">
            <p className="mt-2 text-gray-600">
              소셜 계정으로 간편하게 로그인하세요
            </p>
          </div>
          <div className="my-6 flex justify-center">
            <LoginButton role={role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
