export const getRelativeTime = (date: string | Date): string => {
  const now = new Date();
  const targetDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.getTime() - targetDate.getTime()) / 1000,
  );

  const TIME_UNITS = {
    MINUTE: 60,
    HOUR: 3600,
    DAY: 86400,
    WEEK: 604800,
    MONTH: 2592000,
    YEAR: 31536000,
  };

  if (diffInSeconds < TIME_UNITS.MINUTE) {
    return '방금 전';
  }
  if (diffInSeconds < TIME_UNITS.HOUR) {
    return `${Math.floor(diffInSeconds / TIME_UNITS.MINUTE)}분 전`;
  }
  if (diffInSeconds < TIME_UNITS.DAY) {
    return `${Math.floor(diffInSeconds / TIME_UNITS.HOUR)}시간 전`;
  }
  if (diffInSeconds < TIME_UNITS.WEEK) {
    return `${Math.floor(diffInSeconds / TIME_UNITS.DAY)}일 전`;
  }
  if (diffInSeconds < TIME_UNITS.MONTH) {
    return `${Math.floor(diffInSeconds / TIME_UNITS.WEEK)}주 전`;
  }
  if (diffInSeconds < TIME_UNITS.YEAR) {
    return `${Math.floor(diffInSeconds / TIME_UNITS.MONTH)}개월 전`;
  }
  return `${Math.floor(diffInSeconds / TIME_UNITS.YEAR)}년 전`;
};
