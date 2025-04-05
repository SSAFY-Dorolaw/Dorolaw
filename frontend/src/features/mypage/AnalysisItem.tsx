import { Analysis } from './client/model/types';

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
            <p>
              {new Date(reportCreatedAt).getFullYear()}년{' '}
              {new Date(reportCreatedAt).getMonth()}월{' '}
              {new Date(reportCreatedAt).getDate()}일
            </p>
            <p>|</p>
            <p>
              {faultRatioA}:{faultRatioB}
            </p>
          </div>
          <p>사고{isPublic}</p>
        </div>
      </section>
    </div>
  );
}

export default AnalysisItem;
