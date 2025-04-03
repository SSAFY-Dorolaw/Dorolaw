import ConsultationItem from '@/features/mypage/ConsultationItem';
import { useNavigate } from 'react-router-dom';
import { useMyConsultations } from './client/model/queries';
// import { ClientConsultations } from './client/model/types';

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
  //       requestId: 1,
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
  //       requestId: 1,
  //       requestTitle: 'Sample Request asdf',
  //     },
  //   ],
  // };

  const { data, isPending, error } = useMyConsultations();

  if (isPending) return <div>로딩중..</div>;
  if (error) return <div>정보를 불러오는데 실패했습니다!</div>;

  return (
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
          onClick={() => void navigate('/consultation/detail')}
        />
      ))}
    </div>
  );
}

export default ConsultationList;
