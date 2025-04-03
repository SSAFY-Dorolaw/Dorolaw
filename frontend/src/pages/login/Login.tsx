import LoginButton from '@/features/login/LoginButtons';
import LoginTab from '@/features/login/LoginTab';
import { useState } from 'react';

const Login = () => {
  const [isLawyerTab, setIsLawyerTab] = useState<boolean>(false);
  const role = isLawyerTab ? 'LAWYER' : 'GENERAL';

  return (
    <div className="my-auto flex flex-col items-center justify-center bg-gray-100">
      <div className="w-full max-w-md space-y-8 rounded-lg bg-white shadow">
        <header>
          <LoginTab isLawyerTab={isLawyerTab} setIsLawyerTab={setIsLawyerTab} />
        </header>
        <div className="px-8 pb-8">
          {isLawyerTab ? (
            <>
              <h1 className="text-center text-2xl font-bold">
                변호사이신가요?
              </h1>
              <div className="text-center">
                <p className="mt-2 text-gray-600">
                  로그인하고 사건 의뢰를 확인해보세요
                </p>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-center text-2xl font-bold">
                빠른 과실비율 예측과 <br />
                전문 법률 상담을 경험하세요
              </h1>
              <div className="text-center">
                <p className="mt-2 text-gray-600">
                  소셜 계정으로 간편하게 로그인하세요
                </p>
              </div>
            </>
          )}
          <div className="my-6 flex justify-center">
            <LoginButton role={role} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
