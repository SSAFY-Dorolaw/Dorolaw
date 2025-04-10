import { lawyerMypageApi } from '@/features/mypage/lawyer/api/api';
import { Consultations, Requests } from '@/features/mypage/lawyer/model/types';
import { useQuery } from '@tanstack/react-query';

export const lawyerMypageKeys = {
  myRequests: ['lawyer', 'myRequests'] as const,
  myConsultations: ['lawyer', 'myConsultations'] as const,
};

export const useLawyerMyRequests = () => {
  return useQuery<Requests[]>({
    queryKey: lawyerMypageKeys.myRequests,
    queryFn: lawyerMypageApi.getMyRequests,
  });
};

export const useLawyerMyConsultations = () => {
  return useQuery<Consultations[]>({
    queryKey: lawyerMypageKeys.myConsultations,
    queryFn: lawyerMypageApi.getMyConsultations,
  });
};
