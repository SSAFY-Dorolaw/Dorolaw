// 상담 일정 조회 시 사용
export interface Consultations {
  consultationId: number; // 상담 id
  scheduledDate: string; // 상담신청일
  clientName: string; // 상담 신청한 유저 id
  requestId: number; // 의뢰 id
  requestTitle: string; // 의뢰 제목
  requestContent: string; // 의뢰 내용
  additionalQuestion: string; // 상담 신청하면서 하는 추가 질문
  consultationMethod: string; // 상담 형태
  status: string; // 상담 상태
}

// 의뢰 답변 조회 시 사용
export interface Requests {
  requestId: number; // 의뢰 id
  requestTitle: string; // 의뢰 제목
  memberId: number; // 작성자 id
  answer: string; // 해당 변호사가 답변한 내용
}
