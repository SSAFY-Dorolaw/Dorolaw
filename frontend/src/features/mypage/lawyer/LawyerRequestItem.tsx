import { Requests } from '@/features/mypage/lawyer/model/types';
import { FaGavel, FaUser, FaCheck, FaClock } from 'react-icons/fa';
import { BsChatLeftText } from 'react-icons/bs';
import { getRelativeTime } from '@/shared/lib/utils/getRelativeTime';

interface RequestItemProps extends Requests {
  onClick: () => void;
}

function LawyerRequestItem({
  requestId,
  title,
  memberId,
  requestAnsweredContent,
  answeredAt,
  isSelected,
  requestStatus,
  onClick,
}: RequestItemProps) {
  // 상태에 따른 배지 스타일 및 텍스트 결정
  const getStatusBadge = () => {
    switch (requestStatus) {
      case 'PENDING':
        return (
          <div className="flex items-center gap-1 rounded-full border-2 border-amber-400 bg-amber-50 px-3 py-1 text-amber-600">
            <FaClock size={14} />
            <span>상담 전</span>
          </div>
        );
      case 'SCHEDULED':
        return (
          <div className="flex items-center gap-1 rounded-full border-2 border-blue-400 bg-blue-50 px-3 py-1 text-blue-600">
            <FaCheck size={14} />
            <span>상담예정</span>
          </div>
        );
      case 'COMPLETED':
        return (
          <div className="flex items-center gap-1 rounded-full border-2 border-green-400 bg-green-50 px-3 py-1 text-green-600">
            <FaCheck size={14} />
            <span>상담완료</span>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="cursor-pointer rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:bg-gray-50 hover:shadow-md"
      onClick={onClick}
    >
      {/* 의뢰 제목 및 답변 날짜 */}
      <div className="mb-2 flex flex-wrap items-end justify-between gap-2">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <span className="text-sm text-gray-500">
          {getRelativeTime(answeredAt)}
        </span>
      </div>

      {/* 의뢰인 정보 */}
      <div className="mb-3 flex items-center gap-4 text-sm text-gray-600">
        <div className="flex items-center gap-2">
          <FaUser size={14} />
          <span>의뢰인 {memberId}</span>
        </div>

        <div className="flex items-center gap-2">
          <FaGavel className="text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            의뢰번호 #{requestId}
          </span>
        </div>

        {/* 매칭 여부 표시 */}
        {isSelected && (
          <span className="ml-2 rounded-md bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
            매칭됨
          </span>
        )}
      </div>

      {/* 답변 내용 미리보기 */}
      <div className="mb-4 rounded-md bg-gray-50 p-3">
        <div className="mb-1 flex items-center gap-2 font-medium text-gray-700">
          <BsChatLeftText />
          <span>답변 내용</span>
        </div>
        <p className="line-clamp-2 text-sm text-gray-600">
          {requestAnsweredContent}
        </p>
      </div>

      {/* 하단 정보 영역 */}
      <div className="mt-2 flex items-center justify-between">
        {getStatusBadge()}
      </div>
    </div>
  );
}

export default LawyerRequestItem;
