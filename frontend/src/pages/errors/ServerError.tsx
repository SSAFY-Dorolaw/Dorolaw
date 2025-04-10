import React from 'react';
import { Link } from 'react-router-dom';

const ServerError: React.FC = () => {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-bold text-p5">500</h1>
        <h2 className="mb-8 text-3xl font-semibold">서버 오류</h2>
        <p className="mb-8 text-gray-600">
          죄송합니다. 서버에 문제가 발생했습니다. <br />
          잠시 후 다시 시도해 주세요.
        </p>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="rounded-md bg-p5 px-6 py-3 text-white transition hover:bg-p4"
          >
            메인으로 돌아가기
          </Link>
          <button
            onClick={() => window.location.reload()}
            className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            새로고침
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServerError;
