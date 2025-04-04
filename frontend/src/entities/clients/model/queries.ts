import { useQuery } from '@tanstack/react-query';
import { clientApi } from '../api/clientApi';

// 쿼리 키 상수
export const CLIENT_QUERY_KEYS = {
  profile: ['client', 'profile'],
  detail: (id: string) => ['client', 'detail', id],
};

// 프로필 데이터 조회 쿼리 훅
export const useClientProfile = () => {
  return useQuery({
    queryKey: CLIENT_QUERY_KEYS.profile,
    queryFn: clientApi.getProfile,
  });
};
