import { Requests } from '@/features/mypage/lawyer/model/types';
import { useLawyerRequests } from '@/features/reservation/model/queries';
import LawyerRequestItem from '@/features/mypage/lawyer/LawyerRequestItem';
import { useNavigate, useParams } from 'react-router-dom';

const LawyerRequests = () => {
  const navigate = useNavigate();
  // 로그인한 변호사의 ID를 가져옴
  const { lawyerId } = useParams();

  // useLawyerRequests 훅을 사용하여 데이터 fetch
  const { data, isLoading, isError } = useLawyerRequests(Number(lawyerId));

  if (isLoading) {
    return <div className="flex justify-center py-10">로딩 중...</div>;
  }

  if (isError || !data) {
    return (
      <div className="flex justify-center py-10">
        데이터를 불러오는데 실패했습니다.
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] p-4">
      <h1 className="mb-6 text-2xl font-bold">답변 대기 중인 의뢰</h1>
      <ul className="space-y-4">
        {data.map((request: Requests) => (
          <LawyerRequestItem
            key={request.requestId}
            requestId={request.requestId}
            title={request.title}
            memberId={request.memberId}
            requestAnsweredContent={request.requestAnsweredContent}
            answeredAt={request.answeredAt}
            isSelected={request.isSelected}
            requestStatus={request.requestStatus}
            onClick={() =>
              void navigate(`/board/consultation/${request.requestId}`)
            }
          />
        ))}
      </ul>
    </div>
  );
};

export default LawyerRequests;
