// 알림 타입 정의
export interface Notification {
  alarmId: number;
  receiveMemberId: number;
  content: string;
  isRead: boolean;
  createdAt: string;
}

// API 응답 타입 (서버 응답 구조 변경)
export type AlarmsResponse = Notification[];

// API 에러 응답 타입
export interface ErrorResponse {
  errorCode: string;
  message: string;
}
