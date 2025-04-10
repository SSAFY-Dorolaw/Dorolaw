import React from 'react';
import { Notification } from './types';
import { formatTimeAgo, getNotificationStyle } from './notificationData';
import { useNotificationStore } from './notificationStore';
import { useAuthStore } from '@/entities/auth/model/store';

interface NotificationItemProps {
  notification: Notification;
  onNavigate?: () => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onNavigate,
}) => {
  const { clientId } = useAuthStore();
  const { markAsRead } = useNotificationStore();

  // 알림 메시지에서 ID 추출하는 함수
  const extractIdFromContent = (content: string): number | null => {
    // 괄호 안의 숫자 추출 정규식
    const idMatch = content.match(/\((\d+)\)$/);
    if (idMatch && idMatch[1]) {
      return parseInt(idMatch[1], 10);
    }
    return null;
  };

  // 알림 내용에서 ID 부분 제거하기
  const getDisplayContent = (content: string): string => {
    // 끝에 있는 괄호와 숫자 제거
    return content.replace(/\(\d+\)$/, '').trim();
  };

  // 알림 내용을 분석하여 타입 추측
  const detectType = (content: string): string => {
    if (content.includes('상담 일정이 확정')) return 'SCHEDULE';
    if (content.includes('상담 예약이 완료')) return 'RESERVATION';
    if (content.includes('과실비율 분석') && content.includes('완료'))
      return 'ANALYSIS_COMPLETE';
    if (content.includes('답변이 등록')) return 'ANSWER';
    if (content.includes('의뢰') && content.includes('등록')) return 'REQUEST';
    return '';
  };

  // 알림 타입에 따라 적절한 경로 결정
  const getRouteByType = (type: string, id: number | null): string | null => {
    if (!id) return null;

    switch (type) {
      case 'REQUEST':
        return `/board/consultation/${id}`;
      case 'RESERVATION':
        return `/board/consultation/${id}`;
      case 'SCHEDULE':
        return `/client/consultations`; // 또는 특정 상담 페이지
      case 'ANSWER':
        return `/board/consultation/${id}`;
      case 'ANALYSIS_COMPLETE':
        return `/board/analysis/${id}`;
      default:
        if (notification.content.includes('과실비율 분석')) {
          return `/board/analysis/${id}`;
        } else if (notification.content.includes('의뢰')) {
          return `/board/consultation/${id}`;
        }
        return null;
    }
  };

  // notification.type이 없으면 내용을 기반으로 타입 추측
  const notificationType =
    notification.type ?? detectType(notification.content);
  const { icon, bgColor } = getNotificationStyle(notificationType);

  // 알림 클릭 시 읽음 처리와 라우팅 수행
  const handleClick = async () => {
    if (clientId) {
      // 1. 읽지 않은 알림일 경우에만 읽음 처리
      if (!notification.isRead) {
        await markAsRead(notification.alarmId, Number(clientId));
      }

      // 2. 알림 내용에서 ID 추출
      const extractedId = extractIdFromContent(notification.content);
      console.log('추출된 ID:', extractedId);

      // 3. 알림창 닫기
      if (onNavigate) {
        onNavigate();
      }

      // 4. 추출된 ID와 알림 타입에 따라 경로 결정하고 페이지 이동
      const route = getRouteByType(notificationType, extractedId);
      console.log('라우팅 경로:', route);

      if (route) {
        window.location.href = route;
        return;
      }

      // 알림 타입 기반 라우팅 (ID 추출 실패 시 대체 로직)
      if (notification.content.includes('과실비율 분석')) {
        window.location.href = '/board/analysis';
      } else if (
        notification.content.includes('상담') ||
        notification.content.includes('의뢰')
      ) {
        window.location.href = '/board/consultation';
      }
    }
  };

  // 화면에 표시할 내용 (ID 제거)
  const displayContent = getDisplayContent(notification.content);

  return (
    <div
      className={`py-3 ${notification.isRead ? 'opacity-70' : ''} cursor-pointer hover:bg-gray-50`}
      onClick={handleClick}
    >
      <div className="flex items-start space-x-3">
        <div
          className={`flex size-10 shrink-0 items-center justify-center rounded-full ${bgColor}`}
        >
          <span className="text-lg">{icon}</span>
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm text-gray-800">{displayContent}</p>
          <p className="mt-1 text-xs text-gray-500">
            {formatTimeAgo(notification.createdAt)}
          </p>
        </div>
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
