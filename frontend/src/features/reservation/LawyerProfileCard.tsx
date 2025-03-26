const LawyerProfileCard = () => {
  return (
    <div>
      {/* 프로필 헤더 */}
      <div className="rounded-[10px] bg-p5 p-4 text-p1">
        <h2 className="my-1 ml-3 text-h2 font-bold text-p1">김승소 변호사</h2>
        <p className="ml-3 text-bodysmall text-p1">로로 법률사무소</p>
      </div>

      {/* 프로필 이미지 */}
      <div className="flex justify-center rounded-[10px] bg-white p-4">
        <img src="" alt="변호사 프로필 이미지" className="h-64 object-cover" />
      </div>

      {/* 요금 정보 */}
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

      {/* 예약 버튼 */}
      <div className="rounded-[10px] bg-p5 p-4">
        <button className="w-full bg-p5 text-body text-white">
          상담 예약하기
        </button>
      </div>
    </div>
  );
};

export default LawyerProfileCard;
