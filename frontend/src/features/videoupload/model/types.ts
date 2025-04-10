// 비디오 업로드 인터페이스
export interface VideoUploadRequest {
  file: File;
}

// 영상 업로드 성공 응답 인터페이스
export interface SuccessResponse {
  fileName: string;
}

// 에러 응답 인터페이스
export interface ErrorResponse {
  errorCode: string;
  message: string;
}
