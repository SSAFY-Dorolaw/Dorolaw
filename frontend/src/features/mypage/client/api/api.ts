import {
  Analyses,
  ClientConsultations,
  ClientRequests,
} from '@/features/mypage/client/model/types';
import apiClient from '@/shared/api/api-client';

// 상담 조회
export const clientMypageApi = {
  getMyConsultations: async (): Promise<ClientConsultations[]> => {
    const { data } = await apiClient.get<ClientConsultations[]>(
      '/mypage/conosultations',
    );
    return data;
  },
  getMyRequests: async (): Promise<ClientRequests[]> => {
    const { data } = await apiClient.get<ClientRequests[]>('/mypage/requests');
    return data;
  },
  getMyAnalyses: async (): Promise<Analyses[]> => {
    const { data } = await apiClient.get<Analyses[]>('/mypage/clients/reports');
    return data;
  },
};
