import RequestItem from '@/features/mypage/RequestItem';
import { useMyRequests } from '@/features/mypage/client/model/queries';
import { useNavigate } from 'react-router-dom';

function RequestList() {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useMyRequests();
  console.log(data);
  if (isPending) return <h2>로딩 중...</h2>;
  if (isError)
    return <h2>에러가 발생했습니다: {error?.message || '알 수 없는 에러'}</h2>;

  return (
    <div className="my-10 space-y-4">
      {data?.requests.map((request) => (
        <RequestItem
          key={request.requestId}
          requestId={request.requestId}
          title={request.title}
          status={request.status}
          faultRatioA={request.faultRatioA}
          faultRatioB={request.faultRatioB}
          createdAt={request.createdAt}
          onClick={() => void navigate(`/consultation/${request.requestId}`)}
        />
      ))}
      {}
    </div>
  );
}

export default RequestList;
