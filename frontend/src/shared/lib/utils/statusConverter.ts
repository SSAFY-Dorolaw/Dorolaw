export const statusConverter = (status: string | undefined) => {
  switch (status) {
    case 'PENDING':
      return '분석완료';
    case 'SCHEDULED':
      return '상담예정';
    case 'COMPLETED':
      return '상담완료';
    default:
      return '알수없음';
  }
};
