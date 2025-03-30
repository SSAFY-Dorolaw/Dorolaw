import { useState } from 'react';
import SelectConsultingType from '@/features/reservation/profilecard/SelectConsultingType';
import SelectDate from './profilecard/SelectDate';
import SelectTime from './profilecard/SelectTime';

interface BookingPlanProps {
  onClose: () => void;
}

const BookingPlan = ({ onClose }: BookingPlanProps) => {
  const [selectConsulting, setSelectConsulting] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [, setSelectedTime] = useState<string | null>(null);
  const [isConsultingOpen, setIsConsultingOpen] = useState(true);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);

  const handleSelectConsulting = (option: string) => {
    setSelectConsulting(option);

    // 상담 유형이 선택되면
    setIsConsultingOpen(false); // 상담 토글 닫고

    if (option && option.trim() !== '') {
      setIsDateOpen(true); // 날짜 선택 토글 열기
    }
  };

  const toggleConsulting = () => {
    setIsConsultingOpen(!isConsultingOpen);
  };

  const toggleDate = () => {
    setIsDateOpen(!isDateOpen);
  };

  const selectDate = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);

    // 날짜가 선택되면
    setIsDateOpen(false); // 날짜 선택 토글 닫고
    setIsTimeOpen(true); // 시간 선택 토글 열기
  };

  const toggleTime = () => {
    setIsTimeOpen(!isTimeOpen);
  };

  const isConsultingTypeSelected = selectConsulting !== '';

  return (
    <div>
      <div className="bg-white p-4">
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
          isOpen={isConsultingOpen}
          onToggle={toggleConsulting}
        />

        {/* 날짜 선택 */}
        <SelectDate
          isOpen={isDateOpen}
          onToggle={toggleDate}
          disabled={!selectConsulting}
          selectedDate={selectedDate}
          onSelectedDate={selectDate}
        />

        {/* 시간 선택 */}
        <SelectTime
          isOpen={isTimeOpen}
          onToggle={toggleTime}
          selectedDate={selectedDate}
          consultingTypeSelected={isConsultingTypeSelected}
        />
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

export default BookingPlan;
