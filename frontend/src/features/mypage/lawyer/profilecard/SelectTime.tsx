import { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';

interface SelectTimeProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedDate?: Date | null;
  consultingTypeSelected?: boolean;
}

interface TimeSlot {
  id: number;
  time: string;
  available: boolean;
}

const SelectTime = ({
  isOpen,
  onToggle,
  selectedDate,
  consultingTypeSelected = false,
}: SelectTimeProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);

  const isDisabled = !consultingTypeSelected || !selectedDate;

  // 날짜 변경 시 해당 날짜의 상담 가능한 시간 불러오는 함수
  useEffect(() => {
    if (selectedDate) {
      fetchAvailableTimeSlots(selectedDate); // 임시 데이터 사용
    }
  }, [selectedDate]);

  // 날짜별 가능한 시간대 호출하는 함수 (실제로는 API 호출)
  const fetchAvailableTimeSlots = (date: Date) => {
    const dayOfWeek = date.getDay(); // 예시 데이터 (API 호출 시 변경)
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

    // 기본 시간대 (평일)
    let slots: TimeSlot[] = [
      { id: 1, time: '09:00', available: true },
      { id: 2, time: '10:00', available: true },
      { id: 3, time: '11:00', available: true },
      { id: 4, time: '13:00', available: true },
      { id: 5, time: '14:00', available: true },
      { id: 6, time: '15:00', available: true },
      { id: 7, time: '16:00', available: true },
      { id: 8, time: '17:00', available: true },
    ];

    // 주말인 경우 다른 시간대 제공
    if (isWeekend) {
      slots = [
        { id: 1, time: '10:00', available: true },
        { id: 2, time: '11:00', available: true },
        { id: 3, time: '12:00', available: true },
        { id: 4, time: '13:00', available: false }, // 예약 불가능한 시간 예시
        { id: 5, time: '14:00', available: true },
        { id: 6, time: '15:00', available: true },
      ];
    }

    // 특정 날짜에 대한 특별 케이스 (예: 공휴일)
    const dateString = date.toISOString().split('T')[0];
    if (dateString === '2025-04-01') {
      // 예시 날짜
      slots = [
        { id: 1, time: '10:00', available: false },
        { id: 2, time: '11:00', available: false },
        { id: 3, time: '14:00', available: true },
        { id: 4, time: '15:00', available: true },
        { id: 5, time: '16:00', available: true },
      ];
    }

    setAvailableTimeSlots(slots);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    // 시간 선택 시 추가 로직 구현 가능
  };

  return (
    <div className="border-t border-gray-200 pt-2">
      <div
        className={`flex justify-between ${isDisabled ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        onClick={() => {
          if (!isDisabled) {
            onToggle();
          }
        }}
      >
        <div className="my-5 flex items-center">
          <Clock className="size-6" />
          <p className="ml-5 text-h3 font-bold text-p5">
            {selectedTime ? `${selectedTime}` : '시간 선택'}
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

      {/* 토글 열리면 나타날 부분 */}
      {isOpen && (
        <div className="mb-4 mt-2 rounded-lg border border-gray-200 p-4">
          {!consultingTypeSelected ? (
            <p className="text-center text-gray-500">
              상담 유형을 먼저 선택해 주세요
            </p>
          ) : !selectedDate ? (
            <p className="text-center text-gray-500">
              날짜를 먼저 선택해 주세요
            </p>
          ) : (
            <>
              <p className="mb-3 text-bodysmall text-black">
                {selectedDate.toLocaleDateString('ko-KR', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  weekday: 'long',
                })}
              </p>

              {availableTimeSlots.length > 0 ? (
                <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() =>
                        slot.available && handleTimeSelect(slot.time)
                      }
                      className={`rounded-md px-3 py-2 text-center transition-colors
                        ${
                          selectedTime === slot.time
                            ? 'bg-blue-600 text-white'
                            : slot.available
                              ? 'bg-gray-100 hover:bg-gray-200'
                              : 'cursor-not-allowed bg-gray-100 text-gray-400'
                        }`}
                      disabled={!slot.available}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500">
                  가능한 시간이 없습니다
                </p>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SelectTime;
