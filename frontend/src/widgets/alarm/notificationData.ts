// 알림 아이템 타입 정의
export interface NotificationType {
  id: string;
  avatar: string;
  content: string;
  timestamp: Date;
}

// 더미 데이터
export const dummyNotifications: NotificationType[] = [
  {
    id: '1',
    avatar: '/api/placeholder/80/80',
    content: '김민준님이 회원님의 게시글에 댓글을 남겼습니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5분 전
  },
  {
    id: '2',
    avatar: '/api/placeholder/80/80',
    content: '이지은님이 회원님을 팔로우하기 시작했습니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 34), // 34분 전
  },
  {
    id: '3',
    avatar: '/api/placeholder/80/80',
    content: '박서준님이 회원님의 사진을 좋아합니다.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2시간 전
  },
  {
    id: '4',
    avatar: '/api/placeholder/80/80',
    content: '새로운 이벤트가 등록되었습니다. 지금 확인해보세요!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1일 전
  },
  {
    id: '5',
    avatar: '/api/placeholder/80/80',
    content: '최신 업데이트가 있습니다. 앱을 최신 버전으로 업데이트하세요.',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3), // 3일 전
  },
];

// 시간 포맷팅 함수
export const formatTimeAgo = (dateString: string): string => {
  const date = new Date(dateString);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds}초 전`;
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60);
  if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  }

  const diffInHours = Math.floor(diffInMinutes / 60);
  if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  }

  const diffInDays = Math.floor(diffInHours / 24);
  if (diffInDays < 30) {
    return `${diffInDays}일 전`;
  }

  const diffInMonths = Math.floor(diffInDays / 30);
  if (diffInMonths < 12) {
    return `${diffInMonths}개월 전`;
  }

  const diffInYears = Math.floor(diffInMonths / 12);
  return `${diffInYears}년 전`;
};

// 알림 타입에 따른 아이콘 및 배경색 결정
export const getNotificationStyle = (type: string) => {
  switch (type) {
    case 'REQUEST':
      return {
        icon: '📝',
        bgColor: 'bg-blue-100',
      };
    case 'SCHEDULE':
      return {
        icon: '📅',
        bgColor: 'bg-green-100',
      };
    case 'ANSWER':
      return {
        icon: '💬',
        bgColor: 'bg-purple-100',
      };
    default:
      return {
        icon: '🔔',
        bgColor: 'bg-gray-100',
      };
  }
};
