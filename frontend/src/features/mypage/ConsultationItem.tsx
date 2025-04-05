import { IoChevronForward } from 'react-icons/io5';
import { Consultation } from './client/model/types';
import { FaBalanceScale, FaFileAlt } from 'react-icons/fa';

interface ConsultationItemProps extends Consultation {
  onClick?: () => void;
}

function ConsultationItem({
  consultationId,
  scheduledDate,
  consultationMethod,
  status,
  clientId,
  clientName,
  lawyerId,
  lawyerName,
  requestId,
  requestTitle,
  onClick,
}: ConsultationItemProps) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-p2 bg-white px-6 py-4 hover:bg-p1">
      <div className="mt-2">
        <div className="flex items-center gap-2 font-bold">
          <span className="text-lg">
            {new Date(scheduledDate).toLocaleDateString()}
          </span>
          {' | '}
          <p>{new Date(scheduledDate).toLocaleTimeString()}</p>
        </div>
        <div className="mt-2">
          <div className="flex items-center gap-2 font-bold">
            <FaBalanceScale />

            <span className="text-md">
              {lawyerName} 변호사 •{' '}
              {consultationMethod === 'VISIT'
                ? '방문상담'
                : consultationMethod === 'PHONE'
                  ? '전화상담'
                  : '화상상담'}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FaFileAlt />
          <span>{requestTitle}</span>
        </div>
        <div className="mb-2 mt-4 flex gap-2">
          <div className="rounded-full border-2 border-p4 px-3">
            {status === 'SCHEDULED' ? '상담예정' : '상담완료'}
          </div>
          {status === 'COMPLETED' ? (
            <button className="rounded-full bg-p5 px-4 text-p1">
              후기작성
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
      <button className="flex items-center gap-2" onClick={onClick}>
        의뢰내용 보기 <IoChevronForward size={10} />
      </button>
    </div>
  );
}
export default ConsultationItem;
