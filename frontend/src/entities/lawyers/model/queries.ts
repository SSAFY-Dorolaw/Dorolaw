import { useQuery } from '@tanstack/react-query';
import { lawyerApi } from '../api/lawyerApi';

// 쿼리 키 상수
export const LAWYER_QUERY_KEYS = {
  profile: ['laywer', 'profile'],
  detail: (memberId: number) => ['lawyer', 'detail', memberId],
};

// 프로필 데이터 조회 쿼리 훅
export const useLawyerMyProfile = () => {
  return useQuery({
    queryKey: LAWYER_QUERY_KEYS.profile,
    queryFn: lawyerApi.getMyProfile,
  });
};

export const useLawyerProfile = (memberId: number) => {
  return useQuery({
    queryKey: LAWYER_QUERY_KEYS.detail(memberId),
    queryFn: () => lawyerApi.getProfile(memberId),
  });
};
