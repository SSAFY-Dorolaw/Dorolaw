import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5분 동안 데이터 신선도 유지
      retry: 2, // 실패 시 최대 2번 재시도
      refetchOnWindowFocus: false, // 창 포커스 시 자동 리패치 비활성화
    },
  },
});
