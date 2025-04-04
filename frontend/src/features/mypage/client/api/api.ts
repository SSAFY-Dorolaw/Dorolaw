import {
  Analysis,
  ClientConsultations,
  ClientRequests,
} from '@/features/mypage/client/model/types';
import apiClient from '@/shared/api/api-client';

// 상담 조회
export const clientMypageApi = {
  getMyConsultations: async (): Promise<ClientConsultations> => {
    const { data } = await apiClient.get<ClientConsultations>(
      '/mypage/consultations',
    );
    return data;
  },
  getMyRequests: async (): Promise<ClientRequests> => {
    const { data } = await apiClient.get<ClientRequests>('/mypage/requests');
    return data;
  },
  getMyAnalyses: async (): Promise<Analysis[]> => {
    const { data } = await apiClient.get<Analysis[]>('/mypage/clients/reports');
    return data;
  },
};
