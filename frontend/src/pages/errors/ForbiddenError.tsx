import React from 'react';
import { Link } from 'react-router-dom';

const ForbiddenError: React.FC = () => {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-bold text-p5">403</h1>
        <h2 className="mb-8 text-3xl font-semibold">접근 금지</h2>
        <p className="mb-8 text-gray-600">
          이 페이지에 접근할 권한이 없습니다. <br />
          권한이 필요하거나 접근이 제한된 페이지입니다.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="rounded-md bg-p5 px-6 py-3 text-white transition hover:bg-p4"
          >
            메인으로 돌아가기
          </Link>
          <Link
            to="/login"
            className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            로그인하기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForbiddenError;
