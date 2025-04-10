// 상담 일정 조회 시 사용
export interface Consultations {
  consultationId: number;
  clientName: string;
  requestId: number;
  requestTitle: string;
  requestContent: string;
  additionalQuestion: string;
  consultationStatus: string;
  consultationDate: string;
  consultationTime: string;
  consultationType: string;
}

// 의뢰 답변 조회 시 사용
export interface Requests {
  requestId: number; // 의뢰 id
  title: string; // 의뢰 제목
  memberId: number; // 작성자 id
  requestAnsweredContent: string;
  answeredAt: string;
  isSelected: boolean;
  requestStatus: string;
}

export interface Consultations {
  consultationId: number;
  clientName: string;
  requestId: number;
  requestTitle: string;
  requestContent: string;
  additionalQuestion: string;
  consultationStatus: string;
  consultationDate: string;
  consultationTime: string;
  consultationType: string;
}
