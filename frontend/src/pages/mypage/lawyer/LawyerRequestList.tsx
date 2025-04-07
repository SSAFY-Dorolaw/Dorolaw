import LawyerRequestItem from '@/features/mypage/lawyer/LawyerRequestItem';
import logo from '@/shared/assets/images/logo.svg';
import { useLawyerRequests } from '@/features/mypage/lawyer/model/queries';
import { useNavigate } from 'react-router-dom';

function LawyerRequestList() {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useLawyerRequests();
  console.log(data);
  if (isPending) return <h2>로딩 중...</h2>;
  if (isError)
    return <h2>에러가 발생했습니다: {error?.message || '알 수 없는 에러'}</h2>;

  // const data = [
  //   {
  //     requestId: 1,
  //     title: '사고 처리 요청',
  //     memberId: 1,
  //     requestAnsweredContent:
  //       '귀하의 사고에 대해 검토한 결과, 상대방 과실 80%가 인정될 가능성이 높습니다. 따라서 귀하는 차량 수리비의 80%를 상대방 보험사로부터 보상받을 수 있습니다. 추가적으로, 인적 피해가 있다면 위자료 청구도 고려해볼 수 있습니다.',
  //     answeredAt: '2025-04-04T11:19:10',
  //     isSelected: false,
  //     requestStatus: 'PENDING',
  //   },
  //   {
  //     requestId: 1,
  //     title: '사고 처리 요청',
  //     memberId: 1,
  //     requestAnsweredContent:
  //       '귀하의 사고에 대해 검토한 결과, 상대방 과실 80%가 인정될 가능성이 높습니다. 따라서 귀하는 차량 수리비의 80%를 상대방 보험사로부터 보상받을 수 있습니다. 추가적으로, 인적 피해가 있다면 위자료 청구도 고려해볼 수 있습니다.',
  //     answeredAt: '2025-04-04T11:19:10',
  //     isSelected: false,
  //     requestStatus: 'SCHEDULED',
  //   },
  //   {
  //     requestId: 1,
  //     title: '사고 처리 요청',
  //     memberId: 1,
  //     requestAnsweredContent:
  //       '귀하의 사고에 대해 검토한 결과, 상대방 과실 80%가 인정될 가능성이 높습니다. 따라서 귀하는 차량 수리비의 80%를 상대방 보험사로부터 보상받을 수 있습니다. 추가적으로, 인적 피해가 있다면 위자료 청구도 고려해볼 수 있습니다.',
  //     answeredAt: '2025-04-04T11:19:10',
  //     isSelected: false,
  //     requestStatus: 'COMPLETED',
  //   },
  // ];
  return (
    <>
      {data.length ? (
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
              onClick={() =>
                void navigate(`/consultation/${request.requestId}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-16 shadow-sm">
          <img src={logo} className="h-full items-center" alt="logo" />
          <h2 className="mb-3 text-2xl font-bold">
            아직 의뢰에 답변을 남기지 않으셨네요!
          </h2>
          <p className="mb-6 text-gray-600">
            지금 의뢰 게시글에 답변을 달고 의뢰인의 상담을 받아보세요
          </p>
          <button
            onClick={() => void navigate('/board')}
            className="hover:opacity980 rounded-lg bg-p5 px-6 py-3 font-medium text-p1 transition hover:text-y5"
          >
            사건 의뢰 신청 보러가기
          </button>
        </div>
      )}
    </>
  );
}

export default LawyerRequestList;
