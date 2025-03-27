import { useState } from 'react';
import {
  Phone,
  CalendarDays,
  Clock,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';

interface BookingPlanProps {
  onClose: () => void;
}

const BookingPlan = ({ onClose }: BookingPlanProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="rounded-b-[10px] bg-white p-4">
        <p
          className="ml-auto mr-3 w-fit cursor-pointer font-bold"
          onClick={onClose}
        >
          X
        </p>
        {/* 전화상담 선택 */}
        <div
          className="flex cursor-pointer justify-between"
          onClick={toggleOpen}
        >
          <div className="my-5 flex items-center">
            <Phone className="size-6" />
            <p className="ml-5 text-h3 font-bold text-p5">상담 종류 선택</p>
          </div>
          <div className="flex items-center">
            {isOpen ? (
              <ChevronUp className="mr-2 mt-1 size-6" />
            ) : (
              <ChevronDown className="mr-2 mt-1 size-6" />
            )}
          </div>
        </div>
        {isOpen && (
          <div className="mb-3 ml-3 mr-5 flex justify-between">
            <button className="rounded-lg bg-g3 px-3 py-1.5 text-white">
              15분 전화상담
            </button>
            <button className="rounded-lg bg-g3 px-3 py-1.5 text-white">
              20분 화상상담
            </button>
            <button className="rounded-lg bg-g3 px-3 py-1.5 text-white">
              30분 방문상담
            </button>
          </div>
        )}

        {/* 날짜 선택 */}
        <div className="flex cursor-pointer justify-between">
          <div className="my-5 flex items-center">
            <CalendarDays className="size-6" />
            <p className="ml-5 text-h3 font-bold text-p5">날짜 선택</p>
          </div>
          <div className="flex items-center">
            <ChevronDown className="mr-2 mt-1 size-6" />
          </div>
        </div>

        {/* 시간 선택 */}
        <div className="flex cursor-pointer justify-between">
          <div className="my-5 flex items-center">
            <Clock className="size-6" />
            <p className="ml-5 text-h3 font-bold text-p5">시간 선택</p>
          </div>
          <div className="flex items-center">
            <ChevronDown className="mr-2 mt-1 size-6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPlan;
