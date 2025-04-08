import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/shared/api/api-client';
import {
  LawyerProfile,
  LawyerProfileUpdate,
} from '@/entities/lawyers/model/types';

// 마이페이지 - 정보 수정
export function useUpdateLawyerProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (updatedData: LawyerProfileUpdate) => {
      const response = await apiClient.patch<LawyerProfile>(
        '/members/profile',
        updatedData,
      );
      return response;
    },
    onSuccess: () => {
      // 프로필 데이터를 사용하는 쿼리 무효화 (캐시 업데이트)
      void queryClient.invalidateQueries({ queryKey: ['lawyer', 'profile'] });
    },
  });
}
