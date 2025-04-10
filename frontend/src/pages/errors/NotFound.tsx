import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-bold text-p5">404</h1>
        <h2 className="mb-8 text-3xl font-semibold">
          페이지를 찾을 수 없습니다
        </h2>
        <p className="mb-8 text-gray-600">
          요청하신 페이지가 존재하지 않거나 이동되었을 수 있습니다.
        </p>
        <Link
          to="/"
          className="rounded-md bg-p5 px-6 py-3 text-white transition hover:bg-p4"
        >
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
