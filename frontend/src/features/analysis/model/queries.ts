import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
  SuccessResponse,
  ErrorResponse,
  AnalysisDetailResponse,
  ReportInfoRequest,
} from '@/features/analysis/model/types';
import apiClient from '@/shared/api/api-client';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_URL;

// 과실 분석 상세 정보 조회
export const useAnalysisDetail = (faultAnalysisId: number) => {
  return useQuery<AnalysisDetailResponse, AxiosError<ErrorResponse>>({
    queryKey: ['analysisDetail', faultAnalysisId],
    queryFn: async () => {
      const response = await apiClient.get<AnalysisDetailResponse>(
        `${API_URL}/fault-analysis/${faultAnalysisId}`,
      );
      return response.data;
    },
    enabled: !!faultAnalysisId,
  });
};

// 과실 분석 리포트 제출
export const useSubmitAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation<
    SuccessResponse,
    AxiosError<ErrorResponse>,
    { file: File; reportInfo: ReportInfoRequest }
  >({
    mutationFn: async ({ file, reportInfo }) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append(
        'reportInfo',
        new Blob([JSON.stringify(reportInfo)], { type: 'application/json' }),
      );

      const response = await apiClient.post<SuccessResponse>(
        `${API_URL}/fault-analysis`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      return response.data;
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['analysisDetail'] });
    },
  });
};

// 과실 분석 삭제
export const useDeleteAnalysis = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError<ErrorResponse>, number>({
    mutationFn: async (faultAnalysisId) => {
      await apiClient.delete(`${API_URL}/fault-analysis/${faultAnalysisId}`);
    },
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['analysisDetail'] });
    },
  });
};
