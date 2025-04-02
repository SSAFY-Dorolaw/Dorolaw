import apiClient from '@/shared/api/api-client';
import { ClientProfile } from '../model/types';

export const clientApi = {
  getProfile: async (): Promise<ClientProfile> => {
    const { data } = await apiClient.get<ClientProfile>('/members/profile');
    return data;
  },
};
