import React, { useState } from 'react';
import {
  AvailabilityData,
  TodayConsultations,
} from '@/entities/lawyers/model/types';
import Fee from '@/features/consultation/Fee';
import { FaUserEdit, FaClock, FaTimes } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSetBusinessHours } from '@/entities/lawyers/model/mutations';

interface ProfileCardProps {
  name: string;
  officeName: string | null;
  profileImage: string;
  todayConsultations: TodayConsultations[];
  phoneConsultationPrice: number | null;
  videoConsultationPrice: number | null;
  visitConsultationPrice: number | null;
}

const ProfileCard = ({
  name,
  officeName,
  profileImage,
  todayConsultations,
  phoneConsultationPrice,
  videoConsultationPrice,
  visitConsultationPrice,
}: ProfileCardProps) => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [availabilityData, setAvailabilityData] = useState<AvailabilityData>({
    monday_start_time: '09:00',
    monday_end_time: '18:00',
    tuesday_start_time: '09:00',
    tuesday_end_time: '18:00',
    wednesday_start_time: '09:00',
    wednesday_end_time: '18:00',
    thursday_start_time: '09:00',
    thursday_end_time: '18:00',
    friday_start_time: '09:00',
    friday_end_time: '18:00',
    saturday_start_time: '00:00',
    saturday_end_time: '00:00',
    sunday_start_time: '00:00',
    sunday_end_time: '00:00',
  });

  const setBusinessHourMutation = useSetBusinessHours();

  const goToEdit = () => {
    void navigate('/lawyer/authentication');
  };

  const openModal = () => {
    setIsModalOpen(true);
    setMessage('');
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setMessage('');
  };

  const handleTimeChange = (
    day: string,
    type: 'start' | 'end',
    value: string,
  ) => {
    setAvailabilityData({
      ...availabilityData,
      [`${day}_${type}_time`]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    setBusinessHourMutation.mutate(availabilityData, {
      onSuccess: () => {
        setMessage('상담 가능 시간이 성공적으로 설정되었습니다!');

        // 성공 후 3초 뒤에 모달 닫기 (선택적)
        setTimeout(() => {
          closeModal();
        }, 3000);
        void navigate('/lawyer');
      },

      onError: (error) => {
        setMessage('상담 가능 시간 설정 중 오류가 발생했습니다.');
      },
    });
    setIsLoading(false);
  };

  // 오늘의 상담 가능 시간을 포맷팅하는 함수
  // const formatConsultationTimes = () => {
  //   if (!todayConsultations || todayConsultations.length === 0) {
  //     return '오늘 예약 가능한 상담이 없습니다.';
  //   }

  //   return todayConsultations.map((slot, index) => (
  //     <div key={index} className="text-bodysemibold mb-1 flex items-center">
  //       <span className="mr-2 inline-block w-16">{slot.startTime}</span>
  //       <span className="mx-1">-</span>
  //       <span className="ml-2">{slot.endTime}</span>
  //       <span className="ml-4 rounded bg-blue-100 px-2 py-1 text-bodysmall text-blue-600">
  //         {slot.isBooked ? '예약됨' : '예약 가능'}
  //       </span>
  //     </div>
  //   ));
  // };

  const days = [
    { id: 'monday', label: '월요일' },
    { id: 'tuesday', label: '화요일' },
    { id: 'wednesday', label: '수요일' },
    { id: 'thursday', label: '목요일' },
    { id: 'friday', label: '금요일' },
    { id: 'saturday', label: '토요일' },
    { id: 'sunday', label: '일요일' },
  ];

  return (
    <div>
      {/* 프로필 헤더 */}
      <header className="rounded-t-[10px] bg-p5 p-4 text-p1">
        <div className="flex items-center justify-between">
          <h2 className="my-1 ml-3 text-h2 font-bold text-p1">{name} 변호사</h2>
          <FaUserEdit size={28} className="cursor-pointer" onClick={goToEdit} />
        </div>
        <div className="flex justify-between">
          <p className="ml-3 text-bodysmall text-p1">{officeName}</p>
        </div>
      </header>

      {/* 프로필 카드 */}
      <div>
        {/* 프로필 이미지 */}
        <div className="flex h-[300px] justify-center rounded-b-[10px] bg-white">
          <img
            src={profileImage}
            alt="변호사 프로필 이미지"
            className="h-full object-cover"
          />
        </div>

        {/* 비용 */}
        <Fee
          phoneConsultationPrice={phoneConsultationPrice}
          videoConsultationPrice={videoConsultationPrice}
          visitConsultationPrice={visitConsultationPrice}
        />

        {/* 상담 가능시간
        <div className="mb-4 mt-6 rounded-[10px] bg-white p-5 shadow-md">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center">
              <FaClock className="mr-2 text-p5" />
              <h3 className="text-h3 font-semibold">오늘의 상담 가능 시간</h3>
            </div>
            <button
              onClick={openModal}
              className="rounded-md bg-p5 px-3 py-1 text-bodysmall text-white transition hover:bg-p4"
            >
              시간 수정
            </button>
          </div>
        </div> */}

        {/* 정보 수정 버튼 */}
        <div className="mb-40 rounded-[10px] bg-p5">
          <button
            onClick={openModal}
            className="w-full rounded-md py-3 text-body font-medium text-white transition hover:bg-p3"
          >
            상담 가능 시간 설정
          </button>
        </div>
      </div>

      {/* 모달 팝업 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="max-h-[90vh] w-full max-w-md overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-h3 font-bold">상담 가능 시간 설정</h3>
              <button
                onClick={closeModal}
                className="rounded-full p-1 hover:bg-gray-200"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                {days.map((day) => (
                  <div key={day.id} className="mb-3 border-b pb-3">
                    <div className="mb-2 font-medium">{day.label}</div>
                    <div className="flex items-center space-x-4">
                      <div className="flex flex-1 flex-col">
                        <label className="mb-1 text-bodysmall text-gray-600">
                          시작 시간
                        </label>
                        <input
                          type="time"
                          value={
                            availabilityData[
                              `${day.id}_start_time` as keyof AvailabilityData
                            ]
                          }
                          onChange={(e) =>
                            handleTimeChange(day.id, 'start', e.target.value)
                          }
                          className="rounded border border-gray-300 px-2 py-1"
                        />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <label className="mb-1 text-bodysmall text-gray-600">
                          종료 시간
                        </label>
                        <input
                          type="time"
                          value={
                            availabilityData[
                              `${day.id}_end_time` as keyof AvailabilityData
                            ]
                          }
                          onChange={(e) =>
                            handleTimeChange(day.id, 'end', e.target.value)
                          }
                          className="rounded border border-gray-300 px-2 py-1"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {message && (
                <div
                  className={`mb-4 rounded p-3 ${message.includes('오류') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                >
                  {message}
                </div>
              )}

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-md border border-gray-300 py-2 text-gray-700 hover:bg-gray-100"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 rounded-md bg-p5 py-2 text-white hover:bg-p4 disabled:bg-gray-400"
                >
                  {isLoading ? '처리 중...' : '저장하기'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileCard;
