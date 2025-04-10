import { MemberRole } from '@/entities/auth/model/types';
import apiClient from '@/shared/api/api-client';

export const authApi = {
  getRole: async (): Promise<MemberRole> => {
    const { data } = await apiClient.get<MemberRole>('/members/claims');
    console.log(data);
    return data;
  },
};
