import { Analysis } from './client/model/types';

interface AnalysisItemProps extends Analysis {
  onClick?: () => void;
}

function AnalysisItem({
  reportId,
  title,
  thumbnailImageUrl,
  accidentalNegligenceRateA,
  accidentalNegligenceRateB,
  accidentPlaceType,
  isPublic,
  createdAt,
}: AnalysisItemProps) {
  return (
    <div className="cursor-pointer rounded-[6px] hover:bg-gray-200">
      <div className="mb-2 aspect-video bg-black"></div>
      <section>
        <div className="mb-2 w-full gap-4 overflow-hidden px-2 text-left">
          <p className="truncate font-semibold">{title}</p>
          <div className="flex gap-1">
            <p>
              {new Date(createdAt).getFullYear()}년{' '}
              {new Date(createdAt).getMonth()}월 {new Date(createdAt).getDate()}
              일
            </p>
            <p>|</p>
            <p>
              {accidentalNegligenceRateA}:{accidentalNegligenceRateB}
            </p>
          </div>
          <p>사고{accidentPlaceType}</p>
        </div>
      </section>
    </div>
  );
}

export default AnalysisItem;
