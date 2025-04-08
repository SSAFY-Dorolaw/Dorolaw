// 임시 데이터
export interface Notification {
  id: number;
  user: {
    name: string;
    avatar: string;
  };
  message: string;
  timestamp: string;
  isRead: boolean;
}

export interface NotificationResponse {
  notificationId: number;
  receiverId: number;
  senderId: number;
  content: string;
  profileImage: string;
  nickname: string;
  createdAt: string;
  read: boolean;
}
