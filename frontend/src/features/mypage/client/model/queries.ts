// features/mypage/client/api/queries.ts
import { useQuery } from '@tanstack/react-query';
import {
  Analyses,
  ClientConsultations,
  ClientRequests,
} from '@/features/mypage/client/model/types';
import { clientMypageApi } from '@/features/mypage/client/api/api';

// 쿼리 키 정의
export const clientMypageKeys = {
  myConsultations: ['myConsultations'] as const,
  myRequests: ['myRequests'] as const,
  myAnalyses: ['myAnalyses'] as const,
};

// 상담 조회 쿼리 훅
export const useMyConsultations = () => {
  return useQuery<ClientConsultations[]>({
    queryKey: clientMypageKeys.myConsultations,
    queryFn: clientMypageApi.getMyConsultations,
  });
};

// 의뢰 조회 쿼리 훅
export const useMyRequests = () => {
  return useQuery<ClientRequests[]>({
    queryKey: clientMypageKeys.myRequests,
    queryFn: clientMypageApi.getMyRequests,
  });
};

// 분석 보고서 조회 쿼리 훅
export const useMyAnalyses = () => {
  return useQuery<Analyses[]>({
    queryKey: clientMypageKeys.myAnalyses,
    queryFn: clientMypageApi.getMyAnalyses,
  });
};
