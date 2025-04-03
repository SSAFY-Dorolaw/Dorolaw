import {
  Contents,
  SuccessResponse,
  ErrorResponse,
} from '@/features/board/model/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_URL;

/**
 * 게시판 목록을 조회하는 API 함수
 * @param page 페이지 번호
 * @returns API 응답 데이터
 */

export const getConsultList = async (
  page: number,
): Promise<SuccessResponse> => {
  try {
    // API 엔드포인트
    const endpoint = '/requests/list';
    const url = `${API_URL}${endpoint}?page=${page}`;

    const response = await axios.get<SuccessResponse>(url);
    return response.data;
  } catch (error) {
    console.error('API 요청 에러 발생: ', error);
    throw error; // 에러 다시 던져서 상위 컴포넌트에서 처리할 수 있도록 함
  }
};

/**
 * 게시판 목록 조회 쿼리 훅
 * @param page 페이지 번호
 * @returns 쿼리 결과
 */

export const useConsultListQuery = (page: number) => {
  return useQuery({
    queryKey: ['consultList', page],
    queryFn: () => getConsultList(page),
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터 유지
    placeholderData: keepPreviousData, // 페이지 전환 시 이전 데이터 유지
  });
};

// 타입 내보내기
export type { Contents, SuccessResponse, ErrorResponse };
