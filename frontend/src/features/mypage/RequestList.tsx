import RequestItem from '@/features/mypage/RequestItem';
import { useMyRequests } from '@/features/mypage/client/model/queries';
import { useNavigate } from 'react-router-dom';

function RequestList() {
  const navigate = useNavigate();

  const { data, isPending, error } = useMyRequests();

  if (isPending) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다: {error.message}</div>;

  // const data = {
  //   requests: [
  //     {
  //       requestId: 1,
  //       title: 'Sample Request Title',
  //       status: 'PENDING',
  //       faultRatioA: 60,
  //       faultRatioB: 40,
  //       createdAt: '2025-04-03 16:54',
  //     },
  //     {
  //       requestId: 2,
  //       title: 'Sample Request Title',
  //       status: 'COMPLETED',
  //       faultRatioA: 60,
  //       faultRatioB: 40,
  //       createdAt: '2025-04-03 16:54',
  //     },
  //   ],
  // };

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
