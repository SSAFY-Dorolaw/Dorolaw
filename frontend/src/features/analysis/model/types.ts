// AI 분석 게시글 업로드 인터페이스
export interface ReportInfoRequest {
  title: string;
  fileName: string;
  isPublic?: boolean;
}

// 분석 게시 성공 응답 인터페이스
export interface SuccessResponse {
  faultAnalysisId: number;
  fileName: string;
  memberId: string;
}

// 에러 응답 인터페이스
export interface ErrorResponse {
  errorCode: string;
  message: string;
}
