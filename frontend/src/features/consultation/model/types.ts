// AI 리포트 인터페이스
export interface AiReport {
  reportId: number;
  requestId: number; // 분석 돌린 사람 ID
  createdAt: string;
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

// 답변 인터페이스
export interface Answers {
  answerId: number;
  lawyerId: number;
  content: string;
  createdAt: string;
}

// 응답 성공 인터페이스
export interface SuccessResponse {
  requestId: number; // 게시글 고유번호
  memberId: number;
  title: string;
  fileName: string;
  insuranceFaultRatio: string;
  description: string;
  question: string;
  isPublic: boolean;
  aiReport: AiReport;
  answers: Answers[];
}

// 응답 에러 인터페이스
export interface ErrorResponse {
  errorCode: string;
  message: string;
}
