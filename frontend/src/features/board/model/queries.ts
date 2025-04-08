import { keepPreviousData, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SuccessResponse } from '@/features/board/model/types';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_URL;

/**
 * 게시판 목록을 조회하는 API 함수
 * @param page 페이지 번호
 * @returns API 응답 데이터
 */
export const fetchBoardList = async (
  page: number,
): Promise<SuccessResponse> => {
  const endpoint = '/requests/list';
  const url = `${API_URL}${endpoint}?page=${page}`;

  const response = await axios.get<SuccessResponse>(url);
  return response.data;
};

/**
 * 게시판 목록 조회 쿼리 훅
 * @param page 페이지 번호
 * @returns 쿼리 결과
 */
export const useBoardListQuery = (page: number) => {
  return useQuery({
    queryKey: ['boardList', page],
    queryFn: () => fetchBoardList(page),
    staleTime: 5 * 60 * 1000, // 5분 동안 데이터 유지
    placeholderData: keepPreviousData, // 페이지 전환 시 이전 데이터 유지
  });
};
