import { useNavigate } from 'react-router-dom';
import { useMyAnalyses } from './client/model/queries';
import AnalysisItem from './AnalysisItem';

const AnalysisList = () => {
  const navigate = useNavigate();

  //   const { data, isPending, isError, error } = useMyAnalyses();

  //   console.log(data);
  //   if (isPending) return <h2>로딩 중...</h2>;
  //   if (isError)
  //     return <h2>에러가 발생했습니다: {error?.message || '알 수 없는 에러'}</h2>;

  const data = [
    {
      reportId: 3,
      fileName: 'video003.mp4',
      faultRatioA: 40,
      faultRatioB: 60,
      reportCreatedAt: '2025-04-03T10:30:00',
      isPublic: true,
    },
    {
      reportId: 2,
      fileName: 'video002.mp4',
      faultRatioA: 80,
      faultRatioB: 20,
      reportCreatedAt: '2025-04-02T15:00:00',
      isPublic: false,
    },
    {
      reportId: 1,
      fileName: 'video001.mp4',
      faultRatioA: 70,
      faultRatioB: 30,
      reportCreatedAt: '2025-04-01T11:00:00',
      isPublic: true,
    },
  ];

  return (
    <div className="mb-10 grid w-screen max-w-[1200px] grid-cols-4 justify-between gap-4 text-center">
      {data.map((analysis) => (
        <AnalysisItem
          key={analysis.reportId}
          reportId={analysis.reportId}
          fileName={analysis.fileName}
          faultRatioA={analysis.faultRatioA}
          faultRatioB={analysis.faultRatioB}
          reportCreatedAt={analysis.reportCreatedAt}
          isPublic={analysis.isPublic}
          onClick={() => void navigate(`/report/detail`)}
        />
      ))}
    </div>
  );
};

export default AnalysisList;
