import { useRouteError, isRouteErrorResponse } from 'react-router-dom';
import NotFound from './NotFound';
import NotAuthorized from './NotAuthorized';
import ServerError from './ServerError';
import ForbiddenError from './ForbiddenError';
import GenericError from './GenericError';

const ErrorHandler = () => {
  const error = useRouteError();

  // 에러 로깅
  console.error('라우트 에러:', error);

  // 다양한 에러 타입 처리
  if (isRouteErrorResponse(error)) {
    // 라우터에서 발생한 에러 (404, 401, 403, 500 등)
    if (error.status === 404) {
      return <NotFound />;
    }

    if (error.status === 401) {
      return <NotAuthorized />;
    }

    if (error.status === 403) {
      return <ForbiddenError />;
    }

    if (error.status === 500) {
      return <ServerError />;
    }
  }

  // 그 외의 모든 에러
  return <GenericError error={error} />;
};

export default ErrorHandler;
