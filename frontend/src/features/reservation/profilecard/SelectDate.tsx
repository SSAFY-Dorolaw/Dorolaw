import { Calendar } from '@/components/ui/calendar';
import { CalendarDays, ChevronUp, ChevronDown } from 'lucide-react';
import { useState } from 'react';

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
  const [date, setDate] = useState<Date | undefined>();

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
        <div className="w-full  px-8">
          <div className="flex gap-x-2">
            <div className="size-full flex-1">
              <Calendar
                classNames={{
                  months:
                    'flex w-full flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 flex-1',
                  month: 'space-y-4 w-full flex flex-col',
                  table: 'w-full h-full border-collapse space-y-1',
                  head_row: '',
                  row: 'w-full mt-2',
                }}
                mode="single"
                selected={date}
                onSelect={(newDate) => {
                  if (newDate) {
                    setDate(newDate);
                    onSelectedDate(newDate);
                  }
                }}
                disabled={(day: Date) => {
                  const today = new Date();
                  today.setHours(0, 0, 0, 0);
                  // 어제보다 이전 날짜를 비활성화합니다.
                  return day < today;
                }}
                initialFocus
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SelectDate;
