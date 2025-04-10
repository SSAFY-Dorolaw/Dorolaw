import { useState } from 'react';
import { useConsultListQuery } from '@/features/board/api';
import ConsultList from '@/features/board/ConsultList';
import CreateArticleButton from '@/features/board/CreateArticleButton';
import Pagenation from '@/widgets/Pagenation';

const ConsultationBoard = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // 의뢰글 데이터 fetch
  const { data, isLoading } = useConsultListQuery(currentPage, true);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <div className="flex flex-col p-4 text-center">
          <h1 className="decoration-3 text-2xl font-bold underline underline-offset-[0.5em]">
            법률 상담 게시판
          </h1>
          <CreateArticleButton isConsultTab={true} />
        </div>
      </header>

      <main>
        <div className="max-h-full">
          {isLoading ? (
            <div className="flex justify-center py-10">로딩 중...</div>
          ) : (
            <ConsultList data={data} />
          )}
        </div>
      </main>

      <nav>
        {data &&
          'number' in data &&
          'totalPages' in data &&
          'first' in data &&
          'last' in data && (
            <Pagenation
              pageInfo={{
                number: data.number,
                totalPages: data.totalPages,
                first: data.first,
                last: data.last,
              }}
              onPageChange={handlePageChange}
            />
          )}
      </nav>
    </div>
  );
};

export default ConsultationBoard;
