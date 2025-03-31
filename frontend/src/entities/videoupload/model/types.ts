// src/entities/videoUpload/model/types.ts

// 분석 API 요청 (서버로 보내는 데이터)
export interface AnalysisRequestPayload {
  title: string;
  videoFile: File;
  isPublic: boolean;
}

// 분석 결과 (서버로부터 받는 응답)
export interface AnalysisResult {
  id: string;
  status: 'pending' | 'processing' | 'completed';
  resultUrl?: string;
  createdAt: string;
  updatedAt: string;
}

// 분석 API 응답
export type AnalysisResponse = AnalysisResult;

// 분석 요청 에러
export interface AnalysisError {
  code: string;
  message: string;
  // details?: Record<string, any>;
}
