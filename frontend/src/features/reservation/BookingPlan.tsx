import { Phone, CalendarDays, Clock } from 'lucide-react';

interface BookingPlanProps {
  onClose: () => void;
}

const BookingPlan = ({ onClose }: BookingPlanProps) => {
  return (
    <div>
      <div className="rounded-b-[10px] bg-white p-4">
        <p className="ml-auto mr-3 w-fit cursor-pointer" onClick={onClose}>
          X
        </p>
        {/* 전화상담 선택 */}
        <div className="mb-10 flex cursor-pointer items-center">
          <Phone className="size-6" />
          <p className="ml-5 text-h3 font-bold text-p5">전화</p>
        </div>

        {/* 날짜 선택 */}
        <div className="mb-10 flex cursor-pointer items-center">
          <CalendarDays className="size-6" />
          <p className="ml-5 text-h3 font-bold text-p5">3/27 (목)</p>
        </div>

        {/* 시간 선택 */}
        <div className="mb-10 flex cursor-pointer items-center">
          <Clock className="size-6" />
          <p className="ml-5 text-h3 font-bold text-p5">시간</p>
        </div>
      </div>
    </div>
  );
};

export default BookingPlan;
