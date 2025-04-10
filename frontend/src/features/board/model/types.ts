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

// 게시글 업로드 인터페이스
export interface BoardInfoRequest {
  title: string;
  fileName: string;
  insuranceFaultRatio?: string;
  description?: string;
  question?: string;
  isPublic?: boolean;
}

// 의뢰 게시 성공 응답 인터페이스
export interface ConsultSuccessResponse {
  requestId: number;
}

// 성공 응답 인터페이스 - 의뢰 게시판
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
  number: number;
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

// 게시판 탭 상태 인터페이스
export interface BoardStore {
  // 현재 선택된 탭이 의뢰 게시판인지 여부 (true: 의뢰 게시판, false: AI 분석 게시판)
  isConsultTab: boolean;

  // 각 탭의 현재 페이지 번호
  consultPage: number;
  analysisPage: number;

  // 액션: 탭 변경
  setIsConsultTab: (value: boolean) => void;

  // 액션: 페이지 번호 변경
  setConsultPage: (page: number) => void;
  setAnalysisPage: (page: number) => void;
}
