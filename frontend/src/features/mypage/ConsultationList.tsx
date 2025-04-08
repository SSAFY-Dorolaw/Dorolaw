import ConsultationItem from '@/features/mypage/ConsultationItem';
import { useNavigate } from 'react-router-dom';
import { useMyConsultations } from './client/model/queries';
import logo from '@/shared/assets/images/logo.svg';

function ConsultationList() {
  const navigate = useNavigate();
  // const data: ClientConsultations = {
  //   consultations: [
  //     {
  //       consultationId: 1,
  //       scheduledDate: '2025-04-03 10:00',
  //       consultationMethod: 'VISIT',
  //       status: 'SCHEDULED',
  //       clientId: 1,
  //       clientName: '한동민',
  //       lawyerId: 1,
  //       lawyerName: '한동민',
  //       requestId: 1,
  //       requestTitle: 'Sample Request Title',
  //     },
  //     {
  //       consultationId: 2,
  //       scheduledDate: '2025-04-03 10:00',
  //       consultationMethod: 'VISIT',
  //       status: 'COMPLETED',
  //       clientId: 1,
  //       clientName: '한동민',
  //       lawyerId: 1,
  //       lawyerName: '한동민',
  //       requestId: 2,
  //       requestTitle: 'Sample Request ww',
  //     },
  //     {
  //       consultationId: 3,
  //       scheduledDate: '2025-04-03 10:00',
  //       consultationMethod: 'VISIT',
  //       status: 'SCHEDULED',
  //       clientId: 1,
  //       clientName: '한동민',
  //       lawyerId: 1,
  //       lawyerName: '한동민',
  //       requestId: 3,
  //       requestTitle: 'Sample Request asdf',
  //     },
  //   ],
  // };

  const { data, isPending, error } = useMyConsultations();

  if (isPending) return <div>로딩중..</div>;
  if (error) return <div>정보를 불러오는데 실패했습니다!</div>;

  return (
    <>
      {data.consultations.length ? (
        <div className="my-10 space-y-4">
          {data?.consultations.map((consultation) => (
            <ConsultationItem
              key={consultation.consultationId}
              consultationId={consultation.consultationId}
              scheduledDate={consultation.scheduledDate}
              consultationMethod={consultation.consultationMethod}
              status={consultation.status}
              clientId={consultation.clientId}
              clientName={consultation.clientName}
              lawyerId={consultation.lawyerId}
              lawyerName={consultation.lawyerName}
              requestId={consultation.requestId}
              requestTitle={consultation.requestTitle}
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
            아직 신청한 상담이 없습니다!
          </h2>
          <p className="mb-6 text-gray-600">
            영상과 함께 사건을 의뢰하고 교통사고 전문 변호사에게 상담을
            받아보세요.
          </p>
          <button
            onClick={() => void navigate('/client/requests')}
            className="hover:opacity980 rounded-lg bg-p5 px-6 py-3 font-medium text-p1 transition hover:text-y5"
          >
            나의 의뢰내역 조회하기
          </button>
        </div>
      )}
    </>
  );
}

export default ConsultationList;
