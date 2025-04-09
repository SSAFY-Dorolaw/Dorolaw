import { Requests } from '@/features/mypage/lawyer/model/types';
import { lawyerProfileApi } from '@/features/reservation/api';
import { useQuery } from '@tanstack/react-query';

export const lawyerProfileKeys = {
  requests: ['lawyer', 'profile', 'request '] as const,
};

export const useLawyerRequests = (lawyerId: number) => {
  return useQuery<Requests[]>({
    queryKey: lawyerProfileKeys.requests,
    queryFn: () => lawyerProfileApi.getLawyerRequests(lawyerId),
  });
};
