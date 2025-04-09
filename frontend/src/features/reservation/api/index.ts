import { Consultations, Requests } from '@/features/mypage/lawyer/model/types';
import apiClient from '@/shared/api/api-client';

export const lawyerProfileApi = {
  getLawyerRequests: async (lawyerId: number): Promise<Requests[]> => {
    const { data } = await apiClient.get<Requests[]>(
      `/counseling/recent-requests/${lawyerId}`,
    );
    return data;
  },
};
