import { useNavigate } from 'react-router-dom';
import logo from '@/shared/assets/images/logo.svg';
import LawyerConsultationItem from '@/features/mypage/lawyer/LawyerConsultationItem';
import { useLawyerMyConsultations } from '@/features/mypage/lawyer/model/queries';

function LawyerConsultationList() {
  const navigate = useNavigate();

  const { data, isPending, isError, error } = useLawyerMyConsultations();
  console.log(data);
  if (isPending) return <h2>로딩 중...</h2>;
  if (isError)
    return <h2>에러가 발생했습니다: {error?.message || '알 수 없는 에러'}</h2>;

  //   const data = [
  //     {
  //       consultationId: 1,
  //       clientName: '한동민',
  //       requestId: 1,
  //       requestTitle: '사고 처리 요청',
  //       requestContent: '차량 접촉 사고가 발생했습니다.',
  //       additionalQuestion: '추가 질문 사항이 있습니다.',
  //       consultationStatus: 'SCHEDULED',
  //       consultationDate: '2025-04-10',
  //       consultationTime: '14:00:00',
  //       consultationType: 'VISIT',
  //     },
  //     {
  //       consultationId: 2,
  //       clientName: '한동민',
  //       requestId: 2,
  //       requestTitle: '사고 처리 요청',
  //       requestContent: '차량 접촉 사고가 발생했습니다.',
  //       additionalQuestion: '추가 질문 사항이 있습니다.',
  //       consultationStatus: 'COMPLETED',
  //       consultationDate: '2025-04-10',
  //       consultationTime: '14:00:00',
  //       consultationType: 'WEBMEET',
  //     },
  //   ];

  return (
    <>
      {data.length ? (
        <div className="my-10 space-y-4">
          {data?.map((consultation) => (
            <LawyerConsultationItem
              key={consultation.consultationId}
              consultationId={consultation.consultationId}
              clientName={consultation.clientName}
              requestId={consultation.requestId}
              requestTitle={consultation.requestTitle}
              requestContent={consultation.requestContent}
              additionalQuestion={consultation.additionalQuestion}
              consultationStatus={consultation.consultationStatus}
              consultationDate={consultation.consultationDate}
              consultationTime={consultation.consultationTime}
              consultationType={consultation.consultationType}
              onClick={() =>
                void navigate(`/consultation/${consultation.requestId}`)
              }
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center rounded-lg border border-gray-200 bg-gray-50 p-16 shadow-sm">
          <img src={logo} className="h-full items-center" alt="logo" />
          <h2 className="mb-3 text-2xl font-bold">
            아직 의뢰받은 상담 신청이 없습니다!
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

export default LawyerConsultationList;
