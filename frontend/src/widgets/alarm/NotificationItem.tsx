import React from 'react';
import { NotificationType, formatTimeAgo } from './notificationData';

interface NotificationItemProps {
  notification: NotificationType;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
}) => {
  return (
    <div className="py-3">
      <div className="flex items-start space-x-3">
        {/* 프로필 이미지 */}
        <div className="shrink-0">
          <img
            src={notification.avatar}
            alt="프로필"
            className="size-10 rounded-full object-cover"
          />
        </div>

        {/* 알림 내용과 시간 */}
        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-800">{notification.content}</p>
        </div>

        {/* 시간 표시 */}
        <div className="shrink-0">
          <span className="text-xs text-gray-500">
            {formatTimeAgo(notification.timestamp)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
