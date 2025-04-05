import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import {
  SuccessResponse,
  ErrorResponse,
} from '@/features/consultation/model/types';
import apiClient from '@/shared/api/api-client';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_URL;

/**
 * 특정 게시글 상세 정보를 조회하는 함수
 * @param requestId 조회할 게시글 ID
 * @returns 게시글 상세 정보
 */

const fetchRequestDetail = async (
  requestId: number,
): Promise<SuccessResponse> => {
  const response = await axios.get<SuccessResponse>(
    `${API_URL}/requests/${requestId}`,
  );
  return response.data;
};

/**
 * 게시글 상세 정보를 가져오는 커스텀 훅
 * @param requestId 조회할 게시글 ID
 * @returns useQuery 결과
 */

export const useRequestDetail = (requestId: number) => {
  return useQuery<SuccessResponse, AxiosError<ErrorResponse>>({
    queryKey: ['request', requestId],
    queryFn: () => fetchRequestDetail(requestId),
    enabled: !!requestId, // requestId가 유효한 경우에만 쿼리 실행
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터를 신선한 상태로 유지
    retry: 1, // 실패 시 1번 재시도
  });
};

/**
 * 게시글을 삭제하는 함수
 * @param requestId 삭제할 게시글 ID
 * @returns 삭제 결과
 */

const deleteRequest = async (requestId: number): Promise<void> => {
  try {
    await apiClient.delete(`${API_URL}/requests/${requestId}`);
  } catch (error) {
    console.error('삭제 요청 실패: ', error);
    if (axios.isAxiosError(error) && error.response) {
      console.error('에러 응답 데이터: ', error.response.data);
    }
  }
};

/**
 * 게시글 삭제를 위한 커스텀 훅
 * @returns useMutation 결과
 */

export const useDeleteRequest = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, number>({
    mutationFn: deleteRequest,
    onSuccess: async (_, requestId) => {
      // 삭제 성공 시 쿼리 무효화
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ['request', requestId] }),
        // queryClient.invalidateQueries({ queryKey: ['requests'] }), // 목록 쿼리가 있다면 함께 무효화
      ]);
    },
  });
};
