// 비디오 업로드 인터페이스
export interface VideoUploadRequest {
  file: File;
}

// 변호사 의뢰글 업로드 인터페이스
export interface ConsultInfoRequest {
  title: string;
  fileName: string;
  insuranceFaultRatio?: string;
  description?: string;
  question?: string;
  isPublic?: boolean;
}

// 영상 업로드 성공 응답 인터페이스
export interface SuccessResponse {
  fileName: string;
}

// 의뢰 게시 성공 응답 인터페이스
export interface ConsultSuccessResponse {
  requestId: number;
}

// 에러 응답 인터페이스
export interface ErrorResponse {
  errorCode: string;
  message: string;
}
