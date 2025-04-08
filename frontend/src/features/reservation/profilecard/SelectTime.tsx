import { useState, useEffect } from 'react';
import { Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiClient from '@/shared/api/api-client';

interface AvailableTimesResponse {
  lawyerId: number;
  availableTimes: [
    {
      date: string;
      times: string[];
    },
  ];
}

interface SelectTimeProps {
  isOpen: boolean;
  onToggle: () => void;
  selectedDate?: Date | null;
  consultingTypeSelected?: boolean;
  onSelectedTime: (time: string) => void;
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
  onSelectedTime,
}: SelectTimeProps) => {
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableTimeSlots, setAvailableTimeSlots] = useState<TimeSlot[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { lawyerId } = useParams();

  const isDisabled = !consultingTypeSelected || !selectedDate;

  // 날짜 변경 시 해당 날짜의 상담 가능한 시간 불러오는 함수
  useEffect(() => {
    if (selectedDate) {
      void fetchAvailableTimeSlots(selectedDate); // 임시 데이터 사용
    }
  }, [selectedDate]);

  // 날짜별 가능한 시간대 호출하는 함수 (실제로는 API 호출)
  const fetchAvailableTimeSlots = async (date: Date): Promise<TimeSlot[]> => {
    setIsLoading(true);
    setError(null);

    try {
      // 날짜를 YYYY-MM-DD 형식으로 변환
      const consultationDate = date.toISOString().split('T')[0];
      console.log(consultationDate);

      const url = `${import.meta.env.VITE_API_URL}/counseling/${lawyerId}/available-times/${consultationDate}`;

      // API 호출
      const response = await apiClient.get<AvailableTimesResponse>(url);

      if (response.status !== 200) {
        throw new Error(`API 호출 실패: ${response.status}`);
      }

      const availableTimes = response.data.availableTimes;

      // 응답 데이터에서 상담 가능 시간 추출

      const slots: TimeSlot[] = availableTimes[0].times.map(
        (time: string, index: number) => ({
          id: index + 1,
          time: time,
          available: true,
        }),
      );

      console.log('상담 가능 시간 조회 결과:', slots);
      setAvailableTimeSlots(slots);
      return slots;
    } catch (error) {
      console.error('상담 가능 시간을 불러오는 중 오류가 발생했습니다:', error);
      setError('상담 가능 시간을 불러오는 중 오류가 발생했습니다.');

      // 오류 발생 시 빈 배열 반환
      setAvailableTimeSlots([]);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    // 선택된 시간을 부모 컴포넌트에 전달하여 selectedDate를 업데이트
    onSelectedTime(time);
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
                            ? 'bg-p5 text-p1'
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
                <p className="my-10 text-center text-gray-500">
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
