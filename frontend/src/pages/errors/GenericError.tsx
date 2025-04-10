import React from 'react';
import { Link } from 'react-router-dom';

interface GenericErrorProps {
  error: unknown;
}

const GenericError: React.FC<GenericErrorProps> = ({ error }) => {
  // 에러 메시지 추출
  let errorMessage = '알 수 없는 오류가 발생했습니다.';

  if (error instanceof Error) {
    errorMessage = error.message;
  } else if (typeof error === 'string') {
    errorMessage = error;
  } else if (error && typeof error === 'object' && 'message' in error) {
    errorMessage = String((error as { message: unknown }).message);
  }

  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-bold text-p5">오류</h1>
        <h2 className="mb-8 text-3xl font-semibold">문제가 발생했습니다</h2>
        <div className="mb-8">
          <p className="text-gray-600">
            요청을 처리하는 동안 오류가 발생했습니다.
          </p>
          <p className="mt-2 max-w-md text-sm text-red-500">{errorMessage}</p>
        </div>
        <div className="flex justify-center space-x-4">
          <Link
            to="/"
            className="rounded-md bg-p5 px-6 py-3 text-white transition hover:bg-p4"
          >
            메인으로 돌아가기
          </Link>
          <button
            onClick={() => window.history.back()}
            className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            이전 페이지로
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenericError;
