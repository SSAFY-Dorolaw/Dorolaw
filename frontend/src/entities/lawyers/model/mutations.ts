import { useMutation, useQueryClient } from '@tanstack/react-query';
import apiClient from '@/shared/api/api-client';
import {
  AvailabilityData,
  LawyerProfile,
  LawyerProfileUpdate,
} from '@/entities/lawyers/model/types';
import { AxiosResponse } from 'axios';

// 마이페이지 - 정보 수정
export function useUpdateLawyerProfile() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse<LawyerProfile>, Error, LawyerProfileUpdate>({
    mutationFn: async (updatedData) => {
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

// 마이페이지 - 상담예약 가능 시간 설정

export function useSetBusinessHours() {
  const queryClient = useQueryClient();

  return useMutation<AxiosResponse, Error, AvailabilityData>({
    mutationFn: async (updatedData) => {
      const response = await apiClient.post<AvailabilityData>(
        '/members/business-hours',
        updatedData,
      );
      return response;
    },
  });
}
