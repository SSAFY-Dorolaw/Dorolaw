import { useState } from 'react';

interface LoginTabProps {
  isLawyerTab: boolean;
  setIsLawyerTab: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginTab = ({ isLawyerTab, setIsLawyerTab }: LoginTabProps) => {
  return (
    <header className="flex w-full rounded-t-[10px]">
      <div
        className="w-full cursor-pointer rounded-t-[10px] text-center"
        onClick={() => setIsLawyerTab(false)}
      >
        <h3
          className={`${isLawyerTab ? 'text-p3' : 'underline decoration-2 underline-offset-[calc(0.75em+2px)]'}`}
        >
          일반 계정
        </h3>
        <hr />
      </div>
      <div
        className="w-full cursor-pointer rounded-t-[10px] text-center"
        onClick={() => setIsLawyerTab(true)}
      >
        <h3
          className={`${isLawyerTab ? 'underline decoration-2 underline-offset-[calc(0.75em+2px)]' : 'text-p3'}`}
        >
          변호사 계정
        </h3>
        <hr />
      </div>
    </header>
  );
};

export default LoginTab;
