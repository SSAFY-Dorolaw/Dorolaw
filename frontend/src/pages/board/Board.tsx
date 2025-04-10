import { useState } from 'react';
import AnalysisList from '@/features/board/AnalysisList';
import { useAnalysisListQuery } from '@/features/board/api';
import CreateArticleButton from '@/features/board/CreateArticleButton';
import Pagenation from '@/widgets/Pagenation';

const Board = () => {
  const [currentPage, setCurrentPage] = useState(0);

  // 분석글 데이터 fetch
  const { data: analysisData, isLoading } = useAnalysisListQuery(currentPage);

  // 페이지 변경 핸들러
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <div className="flex flex-col p-4 text-center">
          <h1 className="decoration-3 text-2xl font-bold underline underline-offset-[0.5em]">
            AI 과실분석 게시판
          </h1>
          <CreateArticleButton isConsultTab={false} />
        </div>
      </header>

      <main>
        <div className="max-h-full">
          {isLoading ? (
            <div className="flex justify-center py-10">로딩 중...</div>
          ) : (
            <AnalysisList data={analysisData} />
          )}
        </div>
      </main>

      <nav>
        {analysisData &&
          'number' in analysisData &&
          'totalPages' in analysisData &&
          'first' in analysisData &&
          'last' in analysisData && (
            <Pagenation
              pageInfo={{
                number: analysisData.number,
                totalPages: analysisData.totalPages,
                first: analysisData.first,
                last: analysisData.last,
              }}
              onPageChange={handlePageChange}
            />
          )}
      </nav>
    </div>
  );
};

export default Board;
