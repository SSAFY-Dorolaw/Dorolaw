import { useState } from 'react';
import { CalendarDays, Clock, ChevronDown } from 'lucide-react';
import SelectConsultingType from '@/features/reservation/SelectConsultingType';

interface BookingPlanProps {
  onClose: () => void;
}

const BookingPlan = ({ onClose }: BookingPlanProps) => {
  const [selectConsulting, setSelectConsulting] = useState('');

  const handleSelectConsulting = (option: string) => {
    setSelectConsulting(option);
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
        <SelectConsultingType
          selectedConsulting={selectConsulting}
          onSelectConsulting={handleSelectConsulting}
        />

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
