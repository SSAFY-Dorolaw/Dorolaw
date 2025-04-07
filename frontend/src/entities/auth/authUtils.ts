import { redirect, LoaderFunctionArgs } from 'react-router-dom'; // LoaderFunctionArgs: react-router-dom v7에서 제공하는 타입

/**
 * 사용자 인증 상태를 확인하는 함수
 * @returns boolean 사용자가 인증되었는지 여부
 */
export const isAuthenticated = (): boolean => {
  const token = localStorage.getItem('token');
  return !!token;
};

/**
 * 인증이 필요한 라우트에 대한 로더 함수
 * @param loaderArgs 라우터 로더 인자
 * @param requiredRole 필요한 역할 (선택적)
 * @returns 인증되지 않은 경우 리다이렉트, 인증된 경우 null
 */

export const requireAuth = (loaderArgs: LoaderFunctionArgs) => {
  // 인증 체크
  if (!isAuthenticated()) {
    const pathname = new URL(loaderArgs.request.url).pathname;
    return redirect(`/login?redirectTo=${pathname}`);
  }

  return null;
};
