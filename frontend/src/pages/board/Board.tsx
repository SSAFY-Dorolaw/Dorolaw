import AnalysisList from '@/features/board/AnalysisList';
import {
  useAnalysisListQuery,
  useConsultListQuery,
} from '@/features/board/api';
import ConsultList from '@/features/board/ConsultList';
import CreateArticleButton from '@/features/board/CreateArticleButton';
import Pagenation from '@/widgets/Pagenation';
import { useBoardStore } from '@/features/board/model/store';

const Board = () => {
  // Zustand 스토어에서 상태와 액션 가져오기
  const {
    isConsultTab,
    consultPage,
    analysisPage,
    setIsConsultTab,
    setConsultPage,
    setAnalysisPage,
  } = useBoardStore();

  /* Tanstack Query로 데이터 가져오기 */
  // 의뢰글
  const { data: consultData, isLoading: isConsultLoading } =
    useConsultListQuery(consultPage, isConsultTab);

  // 분석글
  const { data: analysisData, isLoading: isAnalysisLoading } =
    useAnalysisListQuery(analysisPage, !isConsultTab);

  // 현재 탭에 따른 데이터와 로딩 상태
  const data = isConsultTab ? consultData : analysisData;
  const isLoading = isConsultTab ? isConsultLoading : isAnalysisLoading;

  // 페이지 변경 핸들러
  const pageChange = (newPage: number) => {
    if (isConsultTab) {
      setConsultPage(newPage);
    } else {
      setAnalysisPage(newPage);
    }
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
                  className={`${isConsultTab ? 'text-p3 transition hover:text-p5' : 'underline decoration-2 underline-offset-[calc(0.75em+2px)]'}`}
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
            ) : isConsultTab ? (
              <ConsultList data={consultData} />
            ) : (
              <AnalysisList data={analysisData} />
            )}
          </div>
        </nav>
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
              onPageChange={pageChange}
            />
          )}
      </nav>
    </div>
  );
};

export default Board;
