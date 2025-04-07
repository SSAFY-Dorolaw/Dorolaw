import AnalysisList from '@/features/mypage/AnalysisList';

function MyAnalyses() {
  return (
    <div className="flex flex-col items-start">
      <header>
        <h2>AI 과실비율 분석내역</h2>
      </header>
      <main>
        <AnalysisList />
      </main>
    </div>
  );
}

export default MyAnalyses;
