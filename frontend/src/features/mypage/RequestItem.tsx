import { Request } from '@/features/mypage/client/model/types';
import { statusConverter } from '@/shared/lib/utils/statusConverter';
import { FaGavel } from 'react-icons/fa';

interface RequestItemProps extends Request {
  onClick: () => void;
}

function RequestItem({
  requestId,
  title,
  status,
  faultRatioA,
  faultRatioB,
  createdAt,
  onClick,
}: RequestItemProps) {
  return (
    <div
      className="cursor-pointer rounded-[10px] border border-p2 bg-white px-6 py-4 hover:bg-p1"
      onClick={onClick}
    >
      <div className="flex items-end gap-2">
        <h3>{title}</h3>
        <span className="mb-3 text-p3">• {createdAt}</span>
      </div>
      <div className="flex items-center gap-2 font-bold">
        <FaGavel />
        <span>
          AI 과실비율 • {faultRatioA}:{faultRatioB}
        </span>
        <span></span>
      </div>
      <div className="mb-2 mt-4 flex gap-2">
        <div className="rounded-full border-2 border-p4 px-3">
          {statusConverter(status)}
        </div>
        {status === 'COMPLETED' ? (
          <button className="rounded-full bg-p5 px-4 text-p1">후기작성</button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
export default RequestItem;
