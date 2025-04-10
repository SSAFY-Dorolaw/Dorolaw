import { Consultations, Requests } from '@/features/mypage/lawyer/model/types';
import apiClient from '@/shared/api/api-client';

export const lawyerMypageApi = {
  getMyRequests: async (): Promise<Requests[]> => {
    const { data } = await apiClient.get<Requests[]>('/mypage/lawyer/requests');
    return data;
  },
  getMyConsultations: async (): Promise<Consultations[]> => {
    const { data } = await apiClient.get<Consultations[]>(
      '/mypage/lawyer/consultation',
    );
    return data;
  },
};
