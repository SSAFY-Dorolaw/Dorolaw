// 임시 데이터
import { create } from 'zustand';
import { Notification } from './types';

interface NotificationStore {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
  markAsRead: (notificationId: number) => void;
  markAllAsRead: () => void;
}

export const useNotificationStore = create<NotificationStore>((set) => ({
  notifications: [],
  setNotifications: (notifications) => set({ notifications }),
  markAsRead: (notificationId) =>
    set((state) => ({
      notifications: state.notifications.map((notification) =>
        notification.id === notificationId
          ? { ...notification, isRead: true }
          : notification,
      ),
    })),
  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((notification) => ({
        ...notification,
        isRead: true,
      })),
    })),
}));
