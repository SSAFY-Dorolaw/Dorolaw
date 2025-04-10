import { Link, useRouteError, isRouteErrorResponse } from 'react-router-dom';

// 에러 로깅 함수
const logError = (error: unknown) => {
  // 개발 환경에서는 콘솔에 출력
  if (import.meta.env.DEV) {
    console.error('라우트 에러 발생:', error);
  } else {
    // 프로덕션 환경에서는 에러 수집 서비스로 전송
    // 예: Sentry, LogRocket 등
    // Sentry.captureException(error);
  }
};

const ErrorPage = () => {
  const error = useRouteError();

  // 에러 로깅
  logError(error);

  // 에러 타입에 따라 적절한 메시지와 상태 코드 표시
  let errorMessage = '알 수 없는 오류가 발생했습니다.';
  let statusCode = '오류';

  if (isRouteErrorResponse(error)) {
    // 라우터 에러인 경우
    statusCode = error.status.toString();

    if (error.status === 404) {
      errorMessage = '요청하신 페이지를 찾을 수 없습니다.';
    } else if (error.status === 401) {
      errorMessage = '접근 권한이 없습니다. 로그인이 필요합니다.';
    } else if (error.status === 403) {
      errorMessage = '이 페이지에 접근할 권한이 없습니다.';
    } else if (error.status === 500) {
      errorMessage = '서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.';
    }
  } else if (error instanceof Error) {
    errorMessage = error.message;
  }

  return (
    <div className="flex h-[70vh] w-full flex-col items-center justify-center">
      <div className="text-center">
        <h1 className="mb-4 text-7xl font-bold text-p5">{statusCode}</h1>
        <h2 className="mb-8 text-3xl font-semibold">오류가 발생했습니다</h2>
        <p className="mb-8 text-gray-600">{errorMessage}</p>
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

export default ErrorPage;
