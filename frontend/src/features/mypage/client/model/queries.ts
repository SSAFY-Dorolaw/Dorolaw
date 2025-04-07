// features/mypage/client/api/queries.ts
import { useQuery } from '@tanstack/react-query';
import {
  Analysis,
  ClientConsultations,
  ClientRequests,
} from '@/features/mypage/client/model/types';
import { clientMypageApi } from '@/features/mypage/client/api/api';

// 쿼리 키 정의
export const clientMypageKeys = {
  myConsultations: ['client', 'myConsultations'] as const,
  myRequests: ['client', 'myRequests'] as const,
  myAnalyses: ['client', 'myAnalyses'] as const,
};

// 상담 조회 쿼리 훅
export const useMyConsultations = () => {
  return useQuery<ClientConsultations>({
    queryKey: clientMypageKeys.myConsultations,
    queryFn: clientMypageApi.getMyConsultations,
  });
};

// 의뢰 조회 쿼리 훅
export const useMyRequests = () => {
  return useQuery<ClientRequests>({
    queryKey: clientMypageKeys.myRequests,
    queryFn: clientMypageApi.getMyRequests,
  });
};

// 분석 보고서 조회 쿼리 훅
export const useMyAnalyses = () => {
  return useQuery<Analysis[]>({
    queryKey: clientMypageKeys.myAnalyses,
    queryFn: clientMypageApi.getMyAnalyses,
  });
};
