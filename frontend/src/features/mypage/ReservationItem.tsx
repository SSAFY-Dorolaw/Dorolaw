import { IoChevronForward } from 'react-icons/io5';

interface ReservationItemProps {
  consultationId: number;
  scheduledDate: string;
  status: string;
  consultationMethod: string;
  clientId: number;
  clientName: string;
  lawyerId: number;
  lawyerName: string;
  requestId: number;
  requestTitle: string;
  onClick?: () => void;
}

function ReservationItem({
  consultationId,
  scheduledDate,
  status,
  consultationMethod,
  clientId,
  clientName,
  lawyerId,
  lawyerName,
  requestId,
  requestTitle,
  onClick,
}: ReservationItemProps) {
  return (
    <div className="flex items-center justify-between rounded-[10px] border border-p2 bg-white p-4 hover:bg-p1">
      <div className="mt-2">
        <div className="flex items-center gap-2 font-bold">
          <p className="text-lg">
            {new Date(scheduledDate).toLocaleDateString()}
          </p>
          {' | '}
          <p>{new Date(scheduledDate).toLocaleTimeString()}</p>
        </div>
        <div className="flex items-center gap-2">
          <div>{lawyerName} 변호사</div>
          <div className="text-sm">{consultationMethod}</div>
        </div>
        <div className="mt-2 flex gap-4">
          <div className="rounded-full border border-p5 px-4">{status}</div>
          <button className="rounded-full border border-p5 px-4">
            후기쓰기
          </button>
        </div>
      </div>
      <button className="flex items-center gap-2" onClick={onClick}>
        의뢰내용 보기 <IoChevronForward size={10} />
      </button>
    </div>
  );
}
export default ReservationItem;
