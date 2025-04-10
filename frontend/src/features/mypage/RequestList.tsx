import RequestItem from '@/features/mypage/RequestItem';
import { useMyRequests } from '@/features/mypage/client/model/queries';
import { useNavigate } from 'react-router-dom';
import logo from '@/shared/assets/images/logo.svg';

function RequestList() {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useMyRequests();
  console.log(data);
  if (isPending) return <h2>로딩 중...</h2>;
  if (isError)
    return <h2>에러가 발생했습니다: {error?.message || '알 수 없는 에러'}</h2>;

  return (
    <>
      {data.requests.length ? (
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
              onClick={() =>
                void navigate(`/board/consultation/${request.requestId}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-16 shadow-sm">
          <img src={logo} className="h-full items-center" alt="logo" />
          <h2 className="mb-3 text-2xl font-bold">
            아직 의뢰한 사건이 없습니다!
          </h2>
          <p className="mb-6 text-gray-600">
            영상과 함께 사건을 의뢰하고 교통사고 전문 변호사에게 상담을
            받아보세요.
          </p>
          <button
            onClick={() => void navigate('/upload/consultation')}
            className="hover:opacity980 rounded-lg bg-p5 px-6 py-3 font-medium text-p1 transition hover:text-y5"
          >
            AI 분석받고 사건 의뢰하기
          </button>
        </div>
      )}
    </>
  );
}

export default RequestList;
