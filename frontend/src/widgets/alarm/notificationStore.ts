import { create } from 'zustand';
import { Notification } from './types';
import {
  fetchUserAlarms,
  markAlarmAsRead,
  markAllAlarmsAsRead,
} from './notificationApi';

interface NotificationStore {
  notifications: Notification[];
  isLoading: boolean;
  error: string | null;
  unreadCount: number;
  fetchNotifications: (memberId: number) => Promise<void>;
  markAsRead: (alarmId: number, memberId: number) => Promise<void>;
  markAllAsRead: (memberId: number) => Promise<void>;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
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

  // 단일 알림 읽음 처리
  markAsRead: async (alarmId: number, memberId: number) => {
    try {
      await markAlarmAsRead(alarmId);

      // 현재 상태에서 읽음 처리된 알림 업데이트
      const { notifications } = get();
      const updatedNotifications = notifications.map((notification) =>
        notification.alarmId === alarmId
          ? { ...notification, isRead: true }
          : notification,
      );

      // 읽지 않은 알림 수 계산
      const unreadCount = updatedNotifications.filter(
        (notification) => !notification.isRead,
      ).length;

      set({ notifications: updatedNotifications, unreadCount });
    } catch (error) {
      console.error('알림 읽음 처리 실패:', error);
      // 실패 시 알림 목록 다시 불러오기
      await get().fetchNotifications(memberId);
    }
  },

  // 모든 알림 읽음 처리
  markAllAsRead: async (memberId: number) => {
    try {
      await markAllAlarmsAsRead();

      // 모든 알림을 읽음 처리
      const { notifications } = get();
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));

      set({ notifications: updatedNotifications, unreadCount: 0 });
    } catch (error) {
      console.error('모든 알림 읽음 처리 실패:', error);
      // 실패 시 알림 목록 다시 불러오기
      await get().fetchNotifications(memberId);
    }
  },
}));
