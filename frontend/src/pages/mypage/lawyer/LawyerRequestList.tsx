import LawyerRequestItem from '@/features/mypage/lawyer/LawyerRequestItem';
import { useLawyerRequests } from '@/features/mypage/lawyer/model/queries';
import { useNavigate } from 'react-router-dom';

function LawyerRequestList() {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useLawyerRequests();
  console.log(data);
  if (isPending) return <h2>로딩 중...</h2>;
  if (isError)
    return <h2>에러가 발생했습니다: {error?.message || '알 수 없는 에러'}</h2>;

  return (
    <div className="my-10 space-y-4">
      {data?.map((request) => (
        <LawyerRequestItem
          key={request.requestId}
          requestId={request.requestId}
          title={request.title}
          memberId={request.memberId}
          requestAnsweredContent={request.requestAnsweredContent}
          answeredAt={request.answeredAt}
          isSelected={request.isSelected}
          requestStatus={request.requestStatus}
          onClick={() => void navigate(`/consultation/${request.requestId}`)}
        />
      ))}
      {}
    </div>
  );
}

export default LawyerRequestList;
