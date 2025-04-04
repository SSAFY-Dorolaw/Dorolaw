import axios, { AxiosResponse } from 'axios';
import { useAuthStore } from '@/entities/auth/model/store';
import {
  SuccessResponse,
  ConsultSuccessResponse,
  ErrorResponse,
  VideoUploadRequest,
  ConsultInfoRequest,
} from '@/features/videoupload/model/types';

// API 기본 URL
const API_URL = import.meta.env.VITE_API_URL;

// 응답 타입 (성공 또는 에러)
type ApiResponse = SuccessResponse | ConsultSuccessResponse | ErrorResponse;

/**
 * 비디오 파일을 서버에 업로드하는 함수
 * @param data - 비디오 파일
 * @returns 업로드 결과 응답
 */

export const uploadVideo = async (
  data: VideoUploadRequest,
  endpoint = '/videos/upload',
): Promise<ApiResponse> => {
  try {
    // 인증 토큰 가져오기
    const { accessToken } = useAuthStore.getState();
    const token = accessToken;

    // 디버깅
    console.log('스토어 토큰 상태: ', accessToken ? '토큰 존재' : '토큰 없음');
    console.log('사용할 토큰: ', token ? '토큰 존재' : '토큰 없음');

    // 디버깅 - 업로드할 파일 정보
    console.log('업로드할 파일 정보: ', {
      name: data.file.name,
      type: data.file.type,
      size: `${(data.file.size / 1024 / 1024).toFixed(2)}MB`,
    });

    // FormData 객체 생성 및 파일 append
    const formData = new FormData();
    formData.append('file', data.file);

    console.log(data.file);
    console.log('FormData 키: ', Array.from(formData.keys()));

    // axios 요청 설정
    const response: AxiosResponse<SuccessResponse> = await axios.post(
      `${API_URL}${endpoint}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          // 토큰이 있는 경우 인증 헤더 추가
          ...(token && {
            Authorization: `Bearer ${token}`,
          }),
        },
      },
    );

    // 성공 응답 확인
    console.log('응답 상태: ', response.status);
    console.log('응답 데이터: ', response.data);

    return response.data;
  } catch (error) {
    console.error('업로드 중 에러 발생');
    if (axios.isAxiosError(error) && error.response?.data) {
      // 에러 응답 데이터 반환
      return error.response.data as ErrorResponse;
    }
    // 기타 에러 응답 데이터
    return {
      errorCode: 'UNKNOWN_ERROR',
      message: '알 수 없는 오류가 발생했습니다.',
    };
  }
};

export const submitInfo = async (
  data: ConsultInfoRequest,
  endpoint = '/requests',
): Promise<ApiResponse> => {
  try {
    // 인증 토큰 가져오기
    const { accessToken } = useAuthStore.getState();

    // 디버깅
    console.log('토큰상태: ', accessToken ? '토큰 존재' : '토큰 없음');
    console.log('전송할 데이터: ', data);

    // axios 요청
    const response: AxiosResponse<ConsultSuccessResponse> = await axios.post(
      `${API_URL}${endpoint}`,
      data,
      {
        headers: {
          'Content-Type': 'application/json',
          // 토큰이 있는 경우 인증 헤더 추가
          ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
        },
      },
    );

    // 성공 응답 확인
    console.log('응답 상태: ', response.status);
    console.log('응답 데이터: ', response.data);

    return response.data;
  } catch (error) {
    console.error('추가 정보 전송 중 에러 발생');
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
