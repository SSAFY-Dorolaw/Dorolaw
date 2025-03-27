const Fee = () => {
  return (
    <div className="grid grid-cols-3 gap-2 bg-p1 p-4 text-center">
      <div className="flex flex-col">
        <span className="text-caption text-g3">15분 전화상담</span>
        <span className="text-body font-bold">20,000원</span>
      </div>
      <div className="flex flex-col">
        <span className="text-caption text-g3">20분 화상상담</span>
        <span className="text-body font-bold">40,000원</span>
      </div>
      <div className="flex flex-col">
        <span className="text-caption text-g3">30분 방문상담</span>
        <span className="text-body font-bold">50,000원</span>
      </div>
    </div>
  );
};

export default Fee;
