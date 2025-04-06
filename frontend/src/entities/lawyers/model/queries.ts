import { useQuery } from '@tanstack/react-query';
import { lawyerApi } from '../api/lawyerApi';

// 쿼리 키 상수
export const LAWYER_QUERY_KEYS = {
  profile: ['laywer', 'profile'],
  detail: (id: string) => ['lawyer', 'detail', id],
};

// 프로필 데이터 조회 쿼리 훅
export const useLawyerProfile = () => {
  return useQuery({
    queryKey: LAWYER_QUERY_KEYS.profile,
    queryFn: lawyerApi.getProfile,
  });
};
