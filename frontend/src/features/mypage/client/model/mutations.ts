import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/shared/api/api-client';
import {
  ClientProfile,
  ClientProfileUpdate,
} from '@/entities/clients/model/types';

// 마이페이지 - 정보 수정
export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: ClientProfileUpdate) => {
      const response = await apiClient.patch<ClientProfile>(
        '/members/profile',
        updatedData,
      );
      return response.data;
    },
    onSuccess: () => {
      // 프로필 데이터를 사용하는 쿼리 무효화 (캐시 업데이트)
      void queryClient.invalidateQueries({ queryKey: ['client', 'profile'] });
    },
  });
}
