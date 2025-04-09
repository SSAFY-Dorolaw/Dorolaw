import { create } from 'zustand';
import { Notification } from './types';
import { fetchUserAlarms } from './notificationApi';

interface NotificationStore {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  fetchNotifications: (memberId: number) => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  isLoading: false,
  error: null,
  unreadCount: 0,

  // 알림 목록 조회
  fetchNotifications: async (memberId: number) => {
    set({ isLoading: true, error: null });
    try {
      const notifications = await fetchUserAlarms(memberId);
      const unreadCount = notifications.filter(
        (notification) => !notification.isRead,
      ).length;

      set({
        notifications,
        unreadCount,
        isLoading: false,
      });
    } catch (error) {
      console.error('알림 조회 실패:', error);
      set({
        error: '알림을 불러오는 중 오류가 발생했습니다.',
        isLoading: false,
      });
    }
  },
}));
