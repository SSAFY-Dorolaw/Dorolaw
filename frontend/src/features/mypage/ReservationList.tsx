import ReservationItem from '@/features/mypage/ReservationItem';
import { useNavigate } from 'react-router-dom';

interface reservation {
  consultationId: number;
  scheduledDate: string;
  status: string;
  consultationMethod: string;
  clientId: number;
  clientName: string;
  lawyerId: number;
  lawyerName: string;
  requestId: number;
  requestTitle: string;
}

function ReservationList() {
  const navigate = useNavigate();
  const reservationList: reservation[] = [
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
    {
      consultationId: 1,
      scheduledDate: '2025-03-27 14:28:32',
      status: 'PENDING',
      consultationMethod: 'VISIT',
      clientId: 1,
      clientName: '한동민',
      lawyerId: 1,
      lawyerName: '한동민',
      requestId: 1,
      requestTitle: '교통사고 의뢰',
    },
  ];

  return (
    <div className="mt-10 space-y-4">
      {reservationList.map((reservation) => (
        <ReservationItem
          key={reservation.consultationId}
          scheduledDate={reservation.scheduledDate}
          status={reservation.status}
          consultationMethod={reservation.consultationMethod}
          consultationId={reservation.consultationId}
          clientId={reservation.clientId}
          clientName={reservation.clientName}
          lawyerId={reservation.lawyerId}
          lawyerName={reservation.lawyerName}
          requestId={reservation.requestId}
          requestTitle={reservation.requestTitle}
          onClick={() => void navigate('/consultation/detail')}
        />
      ))}
    </div>
  );
}

export default ReservationList;
