import Calendar from 'react-calendar';
import { Value } from 'react-calendar/dist/esm/shared/types.js';
import { CalendarDays, ChevronUp, ChevronDown } from 'lucide-react';

interface DateProps {
  isOpen: boolean;
  onToggle: () => void;
  disabled?: boolean;
  selectedDate: Date | null;
  onSelectedDate: (date: Date) => void;
}

const SelectDate = ({
  isOpen,
  onToggle,
  disabled = false,
  selectedDate: propSelectedDate,
  onSelectedDate,
}: DateProps) => {
  // 날짜 선택 함수
  const dateChange = (value: Value) => {
    if (!value) return; // null이면 바로 리턴

    if (value instanceof Date) {
      onSelectedDate(value);
    } else if (
      Array.isArray(value) &&
      value.length > 0 &&
      value[0] instanceof Date
    ) {
      onSelectedDate(value[0]);
    }
  };

  // 날짜 포매팅 함수
  const formatDate = (date: Date) => {
    const month = date.getMonth() + 1;
    const day = date.getDate();

    // 요일 구하기
    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];

    return `${month}/${day}(${weekday})`;
  };

  return (
    <div>
      <div
        className={`flex justify-between ${disabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        onClick={() => {
          if (!disabled) {
            onToggle();
          }
        }}
      >
        <div className="my-5 flex items-center">
          <CalendarDays className="size-6" />
          <p className="ml-5 text-h3 font-bold text-p5">
            {propSelectedDate ? formatDate(propSelectedDate) : '날짜 선택'}
          </p>
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
        <div className="mb-3 ml-10 mr-5 flex justify-between">
          <Calendar
            onChange={dateChange}
            value={propSelectedDate}
            minDate={new Date()} // 오늘 이후 날짜만 선택 가능
            className="rounded-lg border-2 p-2"
          />
        </div>
      )}
    </div>
  );
};

export default SelectDate;
