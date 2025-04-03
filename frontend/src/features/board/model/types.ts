// 단일 게시글 정보
export interface Contents {
  requestId: number;
  title: string;
  status: string;
  memberId: number;
  createdAt: string;
}

// 정렬 정보
export interface SortInfo {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

// 페이지 정보
export interface PageInfo {
  pageNumber: number;
  pageSize: number;
  sort: SortInfo;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

// 성공 응답 인터페이스
export interface SuccessResponse {
  content: Contents[];
  pageable: PageInfo;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number; // 타입스크립트 예약어 사용을 피하기 위해 num으로 작성
  sort: SortInfo;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// 실패 응답 인터페이스
export interface ErrorResponse {
  errorCode: string;
  message: string;
}
