import { useState } from 'react';
import { X } from 'lucide-react';
import NotificationItem from './alarm/NotificationItem';
import { dummyNotifications } from './alarm/notificationData';

const NotificationBell = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          {/* 알림 개수 표시 */}
          <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
            {dummyNotifications.length}
          </span>
        </button>

        {isOpen && (
          <div className="absolute bottom-16 right-0 w-80 rounded-lg bg-white shadow-xl">
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center space-x-4">
                <h2 className="text-lg font-semibold">알림</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X className="size-6" />
              </button>
            </div>
            <div className="max-h-96 overflow-y-auto p-4">
              {dummyNotifications.length > 0 ? (
                dummyNotifications.map((notification, index) => (
                  <div key={notification.id}>
                    <NotificationItem notification={notification} />
                    {/* 마지막 항목이 아니면 구분선 추가 */}
                    {index < dummyNotifications.length - 1 && (
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
