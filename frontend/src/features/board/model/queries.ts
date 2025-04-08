import axios, { AxiosResponse } from 'axios';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  SuccessResponse,
  BoardInfoRequest,
  ConsultSuccessResponse,
  ErrorResponse,
} from '@/features/board/model/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuthStore, getTokenFromStorage } from '@/entities/auth/model/store';

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
 * 게시글 정보를 서버에 제출하는 함수
 * @param data 게시글 정보
 * @param endpoint API 엔드포인트
 * @returns 제출 결과 응답
 */

export const submitBoardInfo = async (
  data: BoardInfoRequest,
  endpoint = '/requests',
): Promise<ConsultSuccessResponse | ErrorResponse> => {
  try {
    // 인증 토큰 가져오기 - 스토어와 로컬 스토리지 모두 확인
    const { accessToken } = useAuthStore.getState();
    // 스토어에 토큰이 없으면 로컬 스토리지에서 직접 가져옴
    const token = accessToken ?? getTokenFromStorage();

    // 디버깅
    console.log('토큰상태: ', token ? '토큰 존재' : '토큰 없음');
    console.log('전송할 데이터: ', data);

    // axios 요청
    const response: AxiosResponse<ConsultSuccessResponse> = await axios.post(
      `${API_URL}${endpoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          // 토큰이 있는 경우 인증 헤더 추가
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      },
    );

    // 성공 응답 확인
    console.log('응답 상태: ', response.status);
    console.log('응답 데이터: ', response.data);

    return response.data;
  } catch (error) {
    console.error('게시글 정보 전송 중 에러 발생');
    if (axios.isAxiosError(error) && error.response?.data) {
      console.log('서버 에러 응답: ', error.response.data);
      return error.response.data as ErrorResponse;
    }
    // 기타 에러
    return {
      errorCode: 'UNKNOWN_ERROR',
      message: '알 수 없는 오류가 발생했습니다.',
    };
  }
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
    staleTime: 0, // 신선 -> 오래됨으로 전환되는 시간 (이 시간 이후 조회 요청이 발생)
    refetchInterval: 30000, // 컴포넌트가 마운트 된 상태에서 업데이트 하는 주기 (30초로 설정)
    placeholderData: keepPreviousData, // 페이지 전환 시 이전 데이터 유지
  });
};

/**
 * 게시글 등록 mutation 훅
 * @param endpoint API 엔드포인트 (기본값: '/requests')
 * @returns mutation 객체
 */
export const useSubmitBoardMutation = (endpoint = '/requests') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: BoardInfoRequest) => submitBoardInfo(data, endpoint),
    onSuccess: () => {
      // 게시글 등록 성공 시 게시판 목록 쿼리 무효화
      void queryClient.invalidateQueries({ queryKey: ['boardList'] });
      console.log('게시판 목록 쿼리 캐시 무효화 완료');
    },
  });
};
