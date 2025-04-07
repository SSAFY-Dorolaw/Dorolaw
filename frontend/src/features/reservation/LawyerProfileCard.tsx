import Fee from '@/features/consultation/Fee';
import LawyerImg from '@/shared/assets/images/sskim.png';
import BookingPlan from '@/features/reservation/profilecard/BookingPlan';
import { useState } from 'react';

const LawyerProfileCard = () => {
  const [showBooking, setShowBooking] = useState(false);

  const openBooking = () => {
    setShowBooking(true);
  };

  const closeBooking = () => {
    setShowBooking(false);
  };

  return (
    <div>
      {/* 프로필 헤더 */}
      <div className="rounded-t-[10px] bg-p5 p-4 text-p1">
        <h2 className="my-1 ml-3 text-h2 font-bold text-p1">김승소 변호사</h2>
        <p className="ml-3 text-bodysmall text-p1">로로 법률사무소</p>
      </div>

      {/* 예약 여부에 따라 UI 변경 */}
      {showBooking ? (
        <BookingPlan onClose={closeBooking} />
      ) : (
        <div>
          {/* 프로필 이미지 */}
          <div className="flex h-[300px] justify-center rounded-b-[10px] bg-white">
            <img
              src={LawyerImg}
              alt="변호사 프로필 이미지"
              className="h-full object-cover"
            />
          </div>

          {/* 요금 정보 */}
          {/* <Fee /> */}

          {/* 예약 버튼 */}
          <div className="rounded-[10px] bg-p5 p-4">
            <button
              onClick={openBooking}
              className="w-full bg-p5 text-body text-white"
            >
              상담 예약하기
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LawyerProfileCard;
