// 임시 작성

import axios from 'axios';
import {
  AnalysisRequestPayload,
  AnalysisResponse,
} from '@/entities/videoupload/model/types';

// 비디오 분석 요청 API 함수
export const submitVideoAnalysis = async (
  data: AnalysisRequestPayload,
): Promise<AnalysisResponse> => {
  // FormData 객체 생성
  const formData = new FormData();

  // FormData에 필드 추가
  formData.append('title', data.title);
  formData.append('videoFile', data.videoFile);
  formData.append('isPublic', String(data.isPublic));

  try {
    // Axios로 API 요청 전송
    const response = await axios.post<AnalysisResponse>(
      '/api/video-analysis',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    // 응답 데이터 반환
    return response.data;
  } catch (error) {
    // 에러 처리
    if (axios.isAxiosError(error) && error.response) {
      console.log('Error: ', error);
    }
    throw new Error('네트워크 오류가 발생했습니다.');
  }
};
