import AnswerTab from '@/features/consultation/AnswerTab';
import ReportTab from '@/features/consultation/ReportTab';
import { useState } from 'react';

function ConsultationCard() {
  const [isReportTab, setIsReportTab] = useState(true);

  return (
    <div className="col-span-5 mb-10">
      <div className="col-span-5 max-h-full rounded-[10px] bg-white pb-4 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
        <header className="flex w-full rounded-t-[10px] bg-p1">
          <div
            className={`w-full rounded-t-[10px] text-center ${isReportTab ? 'bg-white' : 'bg-p1'}`}
            onClick={() => setIsReportTab(true)}
          >
            <h3
              className={`${isReportTab ? 'underline decoration-2 underline-offset-[0.75em]' : ''}`}
            >
              분석 리포트
            </h3>
          </div>
          <div
            className={`w-full rounded-t-[10px] text-center ${isReportTab ? 'bg-p1' : 'bg-white'}`}
            onClick={() => setIsReportTab(false)}
          >
            <h3
              className={`${isReportTab ? '' : 'underline decoration-2 underline-offset-[0.75em]'}`}
            >
              변호사 답변
            </h3>
          </div>
        </header>
        {isReportTab ? <ReportTab /> : <AnswerTab />}
      </div>
    </div>
  );
}

export default ConsultationCard;
