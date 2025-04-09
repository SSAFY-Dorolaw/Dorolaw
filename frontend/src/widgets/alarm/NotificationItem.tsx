import React from 'react';
import { Notification } from './types';
import { formatTimeAgo, getNotificationStyle } from './notificationData';
import { useNotificationStore } from './notificationStore';
import { useAuthStore } from '@/entities/auth/model/store';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const { clientId } = useAuthStore();
  const { markAsRead } = useNotificationStore();

  // 알림 내용을 분석하여 타입 추측
  const detectType = (content: string): string => {
    if (content.includes('상담')) return 'SCHEDULE';
    if (content.includes('분석')) return 'REQUEST';
    if (content.includes('답변')) return 'ANSWER';
    return ''; // 기본 타입
  };

  // notification.type이 없으면 내용을 기반으로 타입 추측
  const notificationType =
    notification.type ?? detectType(notification.content);
  const { icon, bgColor } = getNotificationStyle(notificationType);

  // 알림 클릭 시 읽음 처리
  const handleClick = () => {
    if (!notification.isRead && clientId) {
      void markAsRead(notification.alarmId, Number(clientId));
    }
  };

  return (
    <div
      className={`py-3 ${notification.isRead ? 'opacity-70' : ''} cursor-pointer hover:bg-gray-50`}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        {/* 알림 타입 아이콘 */}
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${bgColor}`}
        >
          <span className="text-lg">{icon}</span>
        </div>

        {/* 알림 내용과 시간 */}
        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-800">{notification.content}</p>
          <p className="mt-1 text-xs text-gray-500">
            {formatTimeAgo(notification.createdAt)}
          </p>
        </div>

        {/* 읽지 않은 알림 표시 */}
        {!notification.isRead && (
          <div className="shrink-0">
            <span className="inline-block size-2 rounded-full bg-red-500"></span>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationItem;
