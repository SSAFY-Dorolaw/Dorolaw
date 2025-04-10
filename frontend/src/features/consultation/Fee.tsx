interface FeeProps {
  phoneConsultationPrice: number | null;
  videoConsultationPrice: number | null;
  visitConsultationPrice: number | null;
}

const Fee = ({
  phoneConsultationPrice,
  videoConsultationPrice,
  visitConsultationPrice,
}: FeeProps) => {
  return (
    <div className="grid grid-cols-3 gap-2 divide-x divide-gray-200 bg-white p-4 text-center">
      <div className="flex flex-col">
        <span className="text-caption text-g3">15분 전화상담</span>
        <span className="text-body font-bold">
          {phoneConsultationPrice?.toLocaleString()} 원
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-caption text-g3">20분 화상상담</span>
        <span className="text-body font-bold">
          {videoConsultationPrice?.toLocaleString()} 원
        </span>
      </div>
      <div className="flex flex-col">
        <span className="text-caption text-g3">30분 방문상담</span>
        <span className="text-body font-bold">
          {visitConsultationPrice?.toLocaleString()} 원
        </span>
      </div>
    </div>
  );
};

export default Fee;
