import AnalysisInfo from '@/features/analysis/AnalysisInfo';
import AnalysisCard from '@/features/analysis/AnalysisCard';

function AnalysisDetail() {
  return (
    <div className="grid w-full grid-cols-12 gap-6">
      <AnalysisInfo />
      <AnalysisCard />
    </div>
  );
}

export default AnalysisDetail;
