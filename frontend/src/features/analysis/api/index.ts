import axios, { AxiosResponse } from 'axios';
import { getTokenFromStorage } from '@/entities/auth/model/store';
import {
  ErrorResponse,
  ReportInfoRequest,
  SuccessResponse,
} from '@/features/analysis/model/types';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_URL;

// 응답 타입
type ApiResponse = SuccessResponse | ErrorResponse;

/* 게시글 정보 업로드 */
export const uploadInfo = async (
  data: ReportInfoRequest,
  endpoint: '/fault-analysis',
): Promise<ApiResponse> => {
  try {
    // 인증 토큰 가져오기
    const token = getTokenFromStorage(); // 로컬 스토리지

    // axios 요청
    const response: AxiosResponse<SuccessResponse> = await axios.post(
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
