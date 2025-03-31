import axios, { AxiosResponse } from 'axios';
import { useAuthStore } from '@/entities/auth/model/store';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_LOCAL_URL;

// 비디오 업로드 인터페이스
interface VideoUploadRequest {
  file: File;
}

// 성공 응답 인터페이스
interface SuccessResponse {
  filename: string;
}

// 에러 응답 인터페이스
interface ErrorResponse {
  errorCode: string;
  message: string;
}

// 응답 타입 (성공 또는 에러)
type ApiResponse = SuccessResponse | ErrorResponse;

/**
 * 비디오 파일을 서버에 업로드하는 함수
 * @param data - 비디오 파일
 * @returns 업로드 결과 응답
 */

export const uploadVideo = async (
  data: VideoUploadRequest,
): Promise<ApiResponse> => {
  try {
    // 인증 토큰 가져오기
    const { accessToken } = useAuthStore.getState();

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('file', data.file);

    // axios 요청 설정
    const response: AxiosResponse<SuccessResponse> = await axios.post(
      `${API_URL}/api/videos/upload`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 토큰이 있는 경우 인증 헤더 추가
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
        withCredentials: true, // 쿠키를 포함하여 요청을 보냄
      },
    );

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.data) {
      // 에러 응답 데이터 반환
      return error.response.data as ErrorResponse;
    }
    // 기타 예상치 못한 에러의 경우 기본 에러 객체 반환
    return {
      errorCode: 'UNKNOWN_ERROR',
      message: '알 수 없는 오류가 발생했습니다.',
    };
  }
};
