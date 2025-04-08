// 단일 게시글 정보 - 의뢰 게시글
export interface Contents {
  requestId: number;
  title: string;
  status: string;
  memberId: number;
  createdAt: string;
}

// 단일 게시글 정보 - 분석 게시글
export interface AnalysisContents {
  faultAnalysisId: number;
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

// 성공 응답 인터페이스 - 의뢰 게시판판
export interface SuccessResponse {
  content: Contents[];
  pageable: PageInfo;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: SortInfo;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

// 성공 응답 인터페이스 - 분석 게시판
export interface AnalysisSuccess {
  content: AnalysisContents[];
  pageable: PageInfo;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
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
