import { useConsultListQuery } from '@/features/board/api';
import ConsultList from '@/features/board/ConsultList';
import CreateArticleButton from '@/features/board/CreateArticleButton';
import Pagenation from '@/widgets/Pagenation';
import { useState } from 'react';

const Board = () => {
  const [isConsultTab, setIsConsultTab] = useState<boolean>(false);
  const [consultPage, setConsultPage] = useState<number>(0);
  const [analysisPage, setAnalysisPage] = useState<number>(0);

  // Tanstack Query로 데이터 가져오기
  const { data, isLoading } = useConsultListQuery(currentPage);

  // 페이지 변경 핸들러
  const pageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <div className="flex flex-col">
          <h1>게시판</h1>
          <CreateArticleButton isConsultTab={isConsultTab} />
        </div>
      </header>
      <main>
        <nav>
          <div className="max-h-full">
            <header className="flex w-full rounded-t-[10px]">
              <div
                className="mx-20 w-full cursor-pointer rounded-t-[10px] text-center"
                onClick={() => setIsConsultTab(false)}
              >
                <h3
                  className={`${isConsultTab ? 'text-p3' : 'underline decoration-2 underline-offset-[calc(0.75em+2px)]'}`}
                >
                  AI 분석 게시판
                </h3>
                <hr />
              </div>
              <div
                className="mx-20 w-full cursor-pointer rounded-t-[10px] text-center"
                onClick={() => setIsConsultTab(true)}
              >
                <h3
                  className={`${isConsultTab ? 'underline decoration-2 underline-offset-[calc(0.75em+2px)]' : 'text-p3'}`}
                >
                  의뢰 게시판
                </h3>
                <hr />
              </div>
            </header>
            {isLoading ? (
              <div className="flex justify-center py-10">로딩 중...</div>
            ) : (
              <ConsultList currentPage={currentPage} />
            )}
          </div>
        </nav>
      </main>
      <nav>
        {data && (
          <Pagenation
            pageInfo={{
              number: data.number,
              totalPages: data.totalPages,
              first: data.first,
              last: data.last,
            }}
            onPageChange={pageChange}
          />
        )}
      </nav>
    </div>
  );
};

export default Board;
