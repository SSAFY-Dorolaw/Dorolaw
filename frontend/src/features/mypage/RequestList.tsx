import RequestItem from '@/features/mypage/RequestItem';
import { useMyRequests } from '@/features/mypage/client/model/queries';
import { useNavigate } from 'react-router-dom';

function RequestList() {
  const navigate = useNavigate();

  const { data, isLoading, error } = useMyRequests();

  if (isLoading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  return (
    <div className="mt-10 space-y-4">
      {data?.map((request) => (
        <RequestItem
          key={request.requestId}
          requestId={request.requestId}
          title={request.title}
          status={request.status}
          faultRatioA={request.faultRatioA}
          faultRatioB={request.faultRatioB}
          createdAt={request.createdAt}
          onClick={() => void navigate('/consultation/detail')}
        />
      ))}
    </div>
  );
}

export default RequestList;
