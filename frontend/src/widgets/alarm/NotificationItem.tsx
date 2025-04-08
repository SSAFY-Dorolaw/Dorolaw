import React from 'react';
import { Notification } from './types';
import { formatTimeAgo, getNotificationStyle } from './notificationData';

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  const { icon, bgColor } = getNotificationStyle(notification.type);

  return (
    <div className={`py-3 ${notification.isRead ? 'opacity-70' : ''}`}>
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
