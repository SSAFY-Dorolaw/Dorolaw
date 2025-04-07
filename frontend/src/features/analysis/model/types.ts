// AI 분석 게시글 업로드 인터페이스
export interface ReportInfoRequest {
  title: string;
  fileName: string;
  isPublic?: boolean;
}

// AI 분석 리포트 인터페이스
export interface AIReport {
  reportId: number;
  faultAnalysisId: number;
  createAt: string;
  updatedAt: string;
  accidentObject: string;
  accidentLocation: string;
  accidentLocationCharacteristics: string;
  directionOfA: string;
  directionOfB: string;
  faultRatioA: number;
  faultRatioB: number;
  accidentType: number;
}

// 분석 게시글 상세 데이터 인터페이스
export interface AnalysisDetailResponse {
  faultAnalysisId: number;
  memberId: string | number;
  title: string;
  fileName: string;
  isPublic: boolean;
  aiReport: AIReport;
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
