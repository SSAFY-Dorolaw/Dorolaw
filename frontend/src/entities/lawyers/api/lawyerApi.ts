import apiClient from '@/shared/api/api-client';
import { LawyerProfile } from '../model/types';

export const lawyerApi = {
  getProfile: async (): Promise<LawyerProfile> => {
    const { data } = await apiClient.get<LawyerProfile>('/members/profile');
    return data;
  },
};
