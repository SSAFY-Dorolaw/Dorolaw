import { useNavigate } from 'react-router-dom';
import { useMyAnalyses } from './client/model/queries';
import AnalysisItem from './AnalysisItem';
import logo from '@/shared/assets/images/logo.svg';

const AnalysisList = () => {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useMyAnalyses();

  if (isPending) return <h2>로딩 중...</h2>;
  if (isError)
    return <h2>에러가 발생했습니다: {error?.message || '알 수 없는 에러'}</h2>;

  // const data = [
  //   {
  //     reportId: 3,
  //     fileName: 'video003.mp4',
  //     faultRatioA: 40,
  //     faultRatioB: 60,
  //     reportCreatedAt: '2025-04-03T10:30:00',
  //     isPublic: true,
  //   },
  //   {
  //     reportId: 2,
  //     fileName: 'video002.mp4',
  //     faultRatioA: 80,
  //     faultRatioB: 20,
  //     reportCreatedAt: '2025-04-02T15:00:00',
  //     isPublic: false,
  //   },
  //   {
  //     reportId: 1,
  //     fileName: 'video001.mp4',
  //     faultRatioA: 70,
  //     faultRatioB: 30,
  //     reportCreatedAt: '2025-04-01T11:00:00',
  //     isPublic: true,
  //   },
  //   {
  //     reportId: 4,
  //     fileName: 'video001.mp4',
  //     faultRatioA: 70,
  //     faultRatioB: 30,
  //     reportCreatedAt: '2025-04-01T11:00:00',
  //     isPublic: true,
  //   },
  //   {
  //     reportId: 5,
  //     fileName: 'video001.mp4',
  //     faultRatioA: 70,
  //     faultRatioB: 30,
  //     reportCreatedAt: '2025-04-01T11:00:00',
  //     isPublic: true,
  //   },
  // ];

  return (
    <div>
      <div className="my-4 w-screen max-w-[1200px] text-center">
        {data.length ? (
          <div className="grid grid-cols-4 justify-between gap-4">
            {data.map((analysis) => (
              <AnalysisItem
                key={analysis.reportId}
                reportId={analysis.reportId}
                fileName={analysis.fileName}
                faultRatioA={analysis.faultRatioA}
                faultRatioB={analysis.faultRatioB}
                reportCreatedAt={analysis.reportCreatedAt}
                isPublic={analysis.isPublic}
                onClick={() =>
                  void navigate(`/board/analysis/${analysis.reportId}`)
                }
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-16 shadow-sm">
            <img src={logo} className="h-full items-center" alt="logo" />
            <h2 className="mb-3 text-2xl font-bold">
              아직 AI 과실비율 분석 데이터가 없습니다!
            </h2>
            <p className="mb-6 text-gray-600">
              간편하게 사고 영상을 업로드하고 과실비율 분석을 시작해보세요.
            </p>
            <button
              onClick={() => void navigate('/report')}
              className="hover:opacity980 rounded-lg bg-p5 px-6 py-3 font-medium text-p1 transition hover:text-y5"
            >
              AI 과실비율 분석 시작하기
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnalysisList;
