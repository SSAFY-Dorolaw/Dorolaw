import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface PaginationProps {
  pageInfo: {
    number: number;
    totalPages: number;
    first: boolean;
    last: boolean;
  };
  onPageChange: (page: number) => void;
}

const Pagenation = ({ pageInfo, onPageChange }: PaginationProps) => {
  // 페이지 정보가 없는 경우
  if (!pageInfo) {
    return null; // 기본값 설정
  }

  const { number, totalPages, first, last } = pageInfo;

  // 현재 페이지
  const currentPage = number + 1; // 명세서에 0부터 시작하는 것으로 되어 있으므로 +1 함

  // 페이지 번호에 배열 생성
  const pageNumbers = [];
  if (totalPages <= 0) {
    pageNumbers.push(1);
  } else {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  // 페이지 변경 핸들러
  const pageChange = (pageNumber: number) => {
    onPageChange(pageNumber - 1);
  };

  return (
    <div className="mx-auto my-10 flex items-center justify-center gap-4">
      <button
        onClick={() => !first && pageChange(currentPage - 1)}
        disabled={first}
        className="cursor-pointer disabled:opacity-50"
      >
        <IoChevronBack size={12} />
      </button>

      {pageNumbers.map((pageNum) => (
        <p
          key={pageNum}
          onClick={() => pageChange(pageNum)}
          className={`cursor-pointer ${currentPage === pageNum ? 'font-bold' : ''}`}
        >
          {pageNum}
        </p>
      ))}

      <button
        onClick={() => !last && pageChange(currentPage + 1)}
        disabled={last}
        className="cursor-pointer disabled:opacity-50"
      >
        <IoChevronForward size={12} />
      </button>
    </div>
  );
};

export default Pagenation;
