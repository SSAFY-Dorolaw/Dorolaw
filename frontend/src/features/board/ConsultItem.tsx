import { statusConverter } from '@/shared/lib/utils/statusConverter';

interface ConsultItemProps {
  requestId: number;
  title: string;
  status: string;
  memberId: number;
  createdAt: string;
  onClick?: () => void;
}

function ConsultItem({
  requestId,
  title,
  status,
  memberId,
  createdAt,
  onClick,
}: ConsultItemProps) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between gap-2 py-2 text-center hover:bg-white"
      onClick={onClick}
    >
      <div className="w-12 shrink-0 text-center">
        <p>{requestId}</p>
      </div>
      <div className="grow truncate px-2 text-left">
        <p className="truncate">{title}</p>
      </div>
      <div className="w-20 shrink-0 text-center">
        <p>{statusConverter(status)}</p>
      </div>
      <div className="w-24 shrink-0 text-center">
        <p>의뢰인{memberId}</p>
      </div>
      <div className="w-24 shrink-0 text-center">
        <p>{new Date(createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}
export default ConsultItem;
