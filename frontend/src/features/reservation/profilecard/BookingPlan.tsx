import { useState } from 'react';
import SelectConsultingType from '@/features/reservation/profilecard/SelectConsultingType';
import SelectDate from './SelectDate';
import SelectTime from './SelectTime';
import { useNavigate, useParams } from 'react-router-dom';

interface BookingPlanProps {
  videoConsultationPrice: number | null;
  phoneConsultationPrice: number | null;
  visitConsultationPrice: number | null;
  onClose: () => void;
}

const BookingPlan = ({
  videoConsultationPrice,
  phoneConsultationPrice,
  visitConsultationPrice,
  onClose,
}: BookingPlanProps) => {
  const { lawyerId, requestId } = useParams();
  const [selectConsulting, setSelectConsulting] = useState('');
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isConsultingOpen, setIsConsultingOpen] = useState(true);
  const [isDateOpen, setIsDateOpen] = useState(false);
  const [isTimeOpen, setIsTimeOpen] = useState(false);
  const navigate = useNavigate();

  const getPrice = () => {
    switch (selectConsulting) {
      case '15분 전화상담':
        return phoneConsultationPrice;
      case '20분 화상상담':
        return videoConsultationPrice;
      case '30분 방문상담':
        return visitConsultationPrice;
      default:
        return 0;
    }
  };

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

  const selectTime = (time: string) => {
    if (selectedDate) {
      setSelectedTime(time);
      // "HH:MM" 형식의 문자열을 분해
      const [hours, minutes] = time.split(':').map(Number);
      // 기존의 날짜를 복사하여 선택한 시간으로 업데이트
      const updatedDate = new Date(selectedDate);
      updatedDate.setHours(hours, minutes, 0, 0);
      setSelectedDate(updatedDate);
    }
  };

  const handleMoveToAdditionalInfo = () => {
    console.log({
      lawyerId,
      requestId, // Include the requestId in the navigation state
      scheduledDate: selectedDate,
      scheduledTime: selectedTime,
      consultationType: selectConsulting,
      price: getPrice(),
    });
    // Navigate to additional info page with necessary params
    void navigate('/reservation/additional-question', {
      state: {
        lawyerId,
        requestId, // Include the requestId in the navigation state
        scheduledDate: selectedDate,
        scheduledTime: selectedTime,
        consultationType: selectConsulting,
        price: getPrice(),
      },
    });
  };

  const isConsultingTypeSelected = selectConsulting !== '';

  return (
    <div>
      <div className="bg-white p-4">
        <p
          className="ml-auto mr-3 w-fit cursor-pointer font-bold"
          onClick={onClose}
        >
          ✕
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
          onSelectedTime={selectTime}
        />
      </div>
      {/* 예약 버튼 */}
      <div
        className={`rounded-b-[10px] p-4 ${!selectedDate || !selectedTime ? 'bg-gray-300' : 'bg-p5'}`}
      >
        <button
          disabled={!selectedDate || !selectedTime}
          className="w-full text-body text-white transition hover:text-y5"
          onClick={handleMoveToAdditionalInfo}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default BookingPlan;
