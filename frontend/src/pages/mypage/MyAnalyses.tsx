import AnalysisItem from '@/features/mypage/AnalysisItem';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

interface analysis {
  reportId: number;
  title: string;
  thumbnailImageUrl: null;
  accidentalNegligenceRateA: number;
  accidentalNegligenceRateB: number;
  accidentPlaceType: number;
  isPublic: boolean;
  createdAt: string;
}

function MyAnalyses() {
  const analysisList: analysis[] = [
    {
      reportId: 1,
      title: '끔찍한 사고고',
      thumbnailImageUrl: null,
      accidentalNegligenceRateA: 60,
      accidentalNegligenceRateB: 40,
      accidentPlaceType: 2,
      isPublic: true,
      createdAt: '2025-03-27T14:32:01',
    },
    {
      reportId: 1,
      title: '끔찍한 사고고',
      thumbnailImageUrl: null,
      accidentalNegligenceRateA: 60,
      accidentalNegligenceRateB: 40,
      accidentPlaceType: 2,
      isPublic: true,
      createdAt: '2025-03-27T14:32:01',
    },
    {
      reportId: 1,
      title: '끔찍한 사고고',
      thumbnailImageUrl: null,
      accidentalNegligenceRateA: 60,
      accidentalNegligenceRateB: 40,
      accidentPlaceType: 2,
      isPublic: true,
      createdAt: '2025-03-27T14:32:01',
    },
    {
      reportId: 1,
      title: '끔찍한 사고고',
      thumbnailImageUrl: null,
      accidentalNegligenceRateA: 60,
      accidentalNegligenceRateB: 40,
      accidentPlaceType: 2,
      isPublic: true,
      createdAt: '2025-03-27T14:32:01',
    },
    {
      reportId: 1,
      title: '끔찍한 사고고',
      thumbnailImageUrl: null,
      accidentalNegligenceRateA: 60,
      accidentalNegligenceRateB: 40,
      accidentPlaceType: 2,
      isPublic: true,
      createdAt: '2025-03-27T14:32:01',
    },
    {
      reportId: 1,
      title: '끔찍한 사고고',
      thumbnailImageUrl: null,
      accidentalNegligenceRateA: 60,
      accidentalNegligenceRateB: 40,
      accidentPlaceType: 2,
      isPublic: true,
      createdAt: '2025-03-27T14:32:01',
    },
    {
      reportId: 1,
      title: '끔찍한 사고고고고',
      thumbnailImageUrl: null,
      accidentalNegligenceRateA: 60,
      accidentalNegligenceRateB: 40,
      accidentPlaceType: 2,
      isPublic: true,
      createdAt: '2025-03-27T14:32:01',
    },
  ];
  return (
    <div className="flex flex-col items-start">
      <header>
        <h2>과실비율 분석 내역</h2>
      </header>
      <main>
        <div className="mb-10 grid w-screen max-w-[1200px] grid-cols-4 justify-between gap-4 text-center">
          {analysisList.map((analysis) => (
            <AnalysisItem
              key={analysis.reportId}
              reportId={analysis.reportId}
              title={analysis.title}
              thumbnailImageUrl={analysis.thumbnailImageUrl}
              accidentalNegligenceRateA={analysis.accidentalNegligenceRateA}
              accidentalNegligenceRateB={analysis.accidentalNegligenceRateB}
              accidentPlaceType={analysis.accidentPlaceType}
              isPublic={analysis.isPublic}
              createdAt={analysis.createdAt}
            />
          ))}
        </div>
      </main>
      <nav>
        <div className="mx-auto my-10 flex items-center justify-center gap-4">
          <IoChevronBack size={12} />
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <IoChevronForward size={12} />
        </div>
      </nav>
    </div>
  );
}

export default MyAnalyses;
