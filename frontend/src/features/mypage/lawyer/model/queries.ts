import { lawyerMypageApi } from '@/features/mypage/lawyer/api/api';
import { Requests } from '@/features/mypage/lawyer/model/types';
import { useQuery } from '@tanstack/react-query';

export const lawyerMypageKeys = {
  myRequests: ['lawyer', 'myRequests'] as const,
};

export const useLawyerRequests = () => {
  return useQuery<Requests[]>({
    queryKey: lawyerMypageKeys.myRequests,
    queryFn: lawyerMypageApi.getMyRequests,
  });
};
