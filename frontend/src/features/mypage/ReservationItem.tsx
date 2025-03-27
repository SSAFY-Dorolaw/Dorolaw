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
    <div
      className="flex cursor-pointer items-center justify-between rounded-[10px] border border-p2 bg-white p-4"
      onClick={onClick}
    >
      <div className="mt-2">
        <div className="flex">
          <p>{new Date(scheduledDate).toLocaleDateString()}</p>
          <p>{new Date(scheduledDate).toLocaleTimeString()}</p>
        </div>
        <div className="flex">
          <div>{lawyerName} 변호사</div>
          <div>{consultationMethod}</div>
        </div>
        <div className="flex">
          <div>{status}</div>
          <div>후기쓰기</div>
        </div>
      </div>
      <div>의뢰내용 보기</div>
    </div>
  );
}
export default ReservationItem;
