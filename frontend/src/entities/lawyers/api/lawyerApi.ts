import apiClient from '@/shared/api/api-client';
import { LawyerProfile } from '../model/types';

export const lawyerApi = {
  getMyProfile: async (): Promise<LawyerProfile> => {
    const { data } = await apiClient.get<LawyerProfile>('/members/profile');
    return data;
  },
  getProfile: async (memberId: number): Promise<LawyerProfile> => {
    const { data } = await apiClient.get<LawyerProfile>(
      `/counseling/lawyer-profile/${memberId}`,
    );
    return data;
  },
};
