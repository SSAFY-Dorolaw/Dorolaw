interface AnalysisItemProps {
  faultAnalysisId: number;
  title: string;
  status: string;
  memberId: number;
  createdAt: string;
  onClick?: () => void;
}

function AnalysisItem({
  faultAnalysisId,
  title,
  status,
  memberId,
  createdAt,
  onClick,
}: AnalysisItemProps) {
  return (
    <div
      className="flex cursor-pointer items-center justify-between gap-2 py-2 text-center hover:bg-white"
      onClick={onClick}
    >
      <div className="w-12 shrink-0 text-center">
        <p>{faultAnalysisId}</p>
      </div>
      <div className="grow truncate px-2 text-left">
        <p className="truncate">{title}</p>
      </div>
      <div className="w-20 shrink-0 text-center">
        <p>{status}</p>
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
export default AnalysisItem;
