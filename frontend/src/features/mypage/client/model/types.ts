// 상담 내역 조회 시 사용
export interface ClientConsultations {
  consultationId: number; //상담 id
  scheduledDate: string; // 상담 날짜와 시간
  consultationMethod: string; // 상담 형태
  status: string; // 상담 상태
  clientId: number; // 의뢰인 id
  clientName: string; // 의뢰인 이름
  lawyerId: number; // 변호사 id
  lawyerName: string; // 변호사 이름
  requestId: number; // 의뢰 id
  requestTitle: string; // 의뢰 제목
}

// 의뢰목록 조회 시 사용
export interface ClientRequests {
  requestId: number; // 의뢰 id
  title: string; // 의뢰 제목
  status: string; // 상담 상태
  faultRatioA: number; // A의 과실비율
  faultRatioB: number; // B의 과실비율
  createdAt: string; // 의뢰한 날짜
}

// 과실비율 분석 조회 시 사용
export interface Analyses {
  faultRatioId: number; // 분석결과 id
  fileName: string; // 영상 파일 이름
  falutRatioA: number; // A의 과실비율
  faultRatioB: number; // B의 과실비율
}
