import { Consultations } from '@/features/mypage/lawyer/model/types';
import {
  FaGavel,
  FaUserAlt,
  FaCalendarAlt,
  FaClock,
  FaPhoneAlt,
  FaVideo,
  FaBuilding,
} from 'react-icons/fa';
import { MdQuestionAnswer } from 'react-icons/md';

interface ConsultationItemProps extends Consultations {
  onClick: () => void;
}

function LawyerConsultationItem({
  consultationId,
  clientName,
  requestId,
  requestTitle,
  requestContent,
  additionalQuestion,
  consultationStatus,
  consultationDate,
  consultationTime,
  consultationType,
  onClick,
}: ConsultationItemProps) {
  // 상담 유형에 따른 아이콘 선택
  const getConsultationIcon = () => {
    switch (consultationType) {
      case 'PHONE':
        return <FaPhoneAlt className="text-blue-500" />;
      case 'WEBMEET':
        return <FaVideo className="text-green-500" />;
      case 'VISIT':
        return <FaBuilding className="text-purple-500" />;
      default:
        return <FaPhoneAlt className="text-blue-500" />;
    }
  };

  // 상담 상태에 따른 스타일 설정
  const statusStyle =
    consultationStatus === 'SCHEDULED'
      ? 'border-blue-400 bg-blue-50 text-blue-600'
      : 'border-green-400 bg-green-50 text-green-600';

  return (
    <div
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
      onClick={onClick}
    >
      {/* 상단 정보: 상담 상태 및 날짜/시간 */}
      <div className="mb-3 flex items-center justify-between">
        <div
          className={`rounded-full border px-3 py-1 text-sm font-medium ${statusStyle}`}
        >
          {consultationStatus === 'SCHEDULED' ? '상담예정' : '상담완료'}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <FaCalendarAlt />
          <span>{consultationDate}</span>
          <FaClock />
          <span>{consultationTime}</span>
        </div>
      </div>

      {/* 의뢰인 정보 */}
      <div className="mb-2 flex items-center gap-2 text-gray-700">
        <FaUserAlt className="text-gray-500" />
        <span className="font-medium">의뢰인: {clientName}</span>
      </div>

      {/* 상담 방식 */}
      <div className="mb-3 flex items-center gap-2 text-gray-700">
        {getConsultationIcon()}
        <span className="font-medium">{consultationType}</span>
      </div>

      {/* 의뢰 제목 및 내용 */}
      <div className="mb-2 border-t border-gray-100 pt-3">
        <h3 className="mb-1 font-bold text-gray-800">{requestTitle}</h3>
        <p className="line-clamp-2 text-sm text-gray-600">{requestContent}</p>
      </div>

      {/* 추가 질문 (있을 경우만 표시) */}
      {additionalQuestion && (
        <div className="mt-2 rounded-md bg-gray-50 p-2">
          <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
            <MdQuestionAnswer className="text-orange-500" />
            <span>추가 질문:</span>
          </div>
          <p className="mt-1 line-clamp-2 text-sm text-gray-600">
            {additionalQuestion}
          </p>
        </div>
      )}

      {/* 상담 아이콘 */}
      <div className="mt-3 flex justify-end">
        <div className="rounded-full bg-blue-100 p-2">
          <FaGavel className="text-blue-700" />
        </div>
      </div>
    </div>
  );
}

export default LawyerConsultationItem;
