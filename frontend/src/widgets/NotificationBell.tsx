import { useState, useEffect } from 'react';
import { X, RotateCw } from 'lucide-react';
import NotificationItem from './alarm/NotificationItem';
import { useNotificationStore } from './alarm/notificationStore';
import { useAuthStore } from '@/entities/auth/model/store';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { clientId } = useAuthStore();

  const { notifications, unreadCount, isLoading, error, fetchNotifications } =
    useNotificationStore();

  // 컴포넌트 마운트 시 알림 조회
  useEffect(() => {
    if (clientId) {
      void fetchNotifications(Number(clientId));
    }
  }, [clientId, fetchNotifications]);

  // 알림창이 열릴 때마다 알림 목록 갱신
  useEffect(() => {
    if (isOpen && clientId) {
      void fetchNotifications(Number(clientId));
    }
  }, [isOpen, clientId, fetchNotifications]);

  // 알림 새로고침
  const handleRefresh = async () => {
    if (clientId) {
      await fetchNotifications(Number(clientId));
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="relative rounded-full bg-violet-700 p-3 text-white shadow-lg hover:bg-violet-800"
        >
          <svg
            className="size-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
            />
          </svg>
          {/* 읽지 않은 알림 개수 표시 */}
          {unreadCount > 0 && (
            <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold">알림</h2>
                <button
                  onClick={handleRefresh}
                  className="text-gray-500 hover:text-gray-700"
                  title="새로고침"
                >
                  <RotateCw className="size-4" />
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="size-6" />
                </button>
              </div>
            </div>
            <div className="max-h-96 overflow-y-auto p-4">
              {isLoading ? (
                <div className="flex items-center justify-center py-6 text-gray-500">
                  <svg className="mr-2 size-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  알림을 불러오는 중...
                </div>
              ) : error ? (
                <div className="py-6 text-center text-red-500">{error}</div>
              ) : notifications.length > 0 ? (
                notifications.map((notification, index) => (
                  <div key={notification.alarmId}>
                    <NotificationItem notification={notification} />
                    {/* 마지막 항목이 아니면 구분선 추가 */}
                    {index < notifications.length - 1 && (
                      <div className="my-1 border-t border-gray-200"></div>
                    )}
                  </div>
                ))
              ) : (
                <div className="py-6 text-center text-gray-500">
                  알림이 없습니다.
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationBell;
