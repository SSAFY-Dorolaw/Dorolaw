import { FaBalanceScale } from 'react-icons/fa';
import { Analysis } from './client/model/types';
import { Globe, LockKeyhole } from 'lucide-react';

interface AnalysisItemProps extends Analysis {
  onClick?: () => void;
}

function AnalysisItem({
  reportId,
  fileName,
  faultRatioA,
  faultRatioB,
  reportCreatedAt,
  isPublic,
  onClick,
}: AnalysisItemProps) {
  return (
    <div
      className="cursor-pointer rounded-[6px] hover:bg-gray-200"
      onClick={onClick}
    >
      <div className="mb-2 aspect-video bg-black"></div>
      <section>
        <div className="mb-2 w-full gap-4 overflow-hidden px-2 text-left">
          <p className="truncate font-semibold">{fileName}</p>
          <div className="flex gap-1">
            <div className="t flex items-center gap-1">
              <FaBalanceScale />
              <p>AI 과실비율 •</p>
              {faultRatioA}:{faultRatioB}
            </div>
          </div>
          <div className="flex gap-1 text-p4">
            <p>
              {new Date(reportCreatedAt).getFullYear()}년{' '}
              {new Date(reportCreatedAt).getMonth()}월{' '}
              {new Date(reportCreatedAt).getDate()}일
            </p>
            <p>•</p>
            {isPublic ? (
              <div className="flex items-center gap-1">
                <Globe size={16} />
                <span>공개</span>
              </div>
            ) : (
              <div className="flex items-center gap-1 font-bold text-p4">
                <LockKeyhole size={16} />
                <span>비공개</span>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default AnalysisItem;
