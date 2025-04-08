import { Requests } from '@/features/mypage/lawyer/model/types';
import { FaGavel } from 'react-icons/fa';

interface RequestItemProps extends Requests {
  onClick: () => void;
}

function LawyerRequestItem({
  requestId,
  title,
  memberId,
  requestAnsweredContent,
  answeredAt,
  isSelected,
  requestStatus,
  onClick,
}: RequestItemProps) {
  return (
    <div
      className="cursor-pointer rounded-[10px] border border-p2 bg-white px-6 py-4 hover:bg-p1"
      onClick={onClick}
    >
      <div className="flex items-end gap-2">
        <h3>{title}</h3>
        <span className="mb-3 text-p3">• {answeredAt}</span>
      </div>
      <div className="flex items-center gap-2 font-bold">
        <FaGavel />
        <span>AI 과실비율 • {requestAnsweredContent}</span>
        <span></span>
      </div>
      <div className="mb-2 mt-4 flex gap-2">
        {requestStatus === 'PENDING' ? (
          <div className="rounded-full border-2 border-p4 px-3 py-1">
            의뢰중
          </div>
        ) : (
          <div className="rounded-full border-2 border-p4 px-3">
            {requestStatus === 'SCHEDULED' ? '상담예정' : '상담완료'}
          </div>
        )}
      </div>
    </div>
  );
}
export default LawyerRequestItem;
