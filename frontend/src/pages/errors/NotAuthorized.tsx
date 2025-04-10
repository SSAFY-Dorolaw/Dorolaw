import { Link } from 'react-router-dom';

const NotAuthorized = () => {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-bold text-p5">401</h1>
        <h2 className="mb-8 text-3xl font-semibold">권한이 없습니다</h2>
        <p className="mb-8 text-gray-600">
          이 페이지에 접근하려면 로그인이 필요합니다.
        </p>
        <div className="space-x-4">
          <Link
            to="/login"
            className="rounded-md bg-p5 px-6 py-3 text-white transition hover:bg-p4"
          >
            로그인하기
          </Link>
          <Link
            to="/"
            className="rounded-md border border-gray-300 px-6 py-3 text-gray-700 transition hover:bg-gray-50"
          >
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotAuthorized;
