import React from 'react';
import AnalysisItem from './AnalysisItem';
import { useNavigate } from 'react-router-dom';
import {
  AnalysisContents,
  AnalysisSuccess,
} from '@/features/board/model/types';

// props 타입 정의
interface AnalysisListProps {
  data?: AnalysisSuccess; // Board에서 전달받은 데이터
}

const AnalysisList = ({ data }: AnalysisListProps) => {
  const navigate = useNavigate();

  // 데이터가 없다면
  if (!data?.content || data.content.length === 0) {
    return (
      <div className="mt-10 py-8 text-center">
        <p>표시할 데이터가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between gap-2 border-b py-2 text-center font-bold">
        <div className="w-12 shrink-0 text-center">No.</div>
        <div className="grow px-2">제목</div>
        <div className="w-20 shrink-0 text-center">상태</div>
        <div className="w-24 shrink-0 text-center">글쓴이</div>
        <div className="w-24 shrink-0 text-center">작성시간</div>
      </div>

      {/* Analysis List */}
      {data.content.map((analysis: AnalysisContents) => (
        <React.Fragment key={analysis.faultAnalysisId}>
          <AnalysisItem
            key={analysis.faultAnalysisId}
            faultAnalysisId={analysis.faultAnalysisId}
            title={analysis.title}
            status={analysis.status}
            memberId={analysis.memberId}
            createdAt={analysis.createdAt}
            onClick={() =>
              void navigate(`/board/analysis/${analysis.faultAnalysisId}`)
            }
          />
          <hr />
        </React.Fragment>
      ))}
    </div>
  );
};

export default AnalysisList;
