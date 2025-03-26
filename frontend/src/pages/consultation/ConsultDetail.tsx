import ConsultInfo from '@/features/consultation/ConsultInfo';
import ConsultationCard from '@/features/consultation/ConsultationCard';

function ConsultDetail() {
  return (
    <div className="grid w-full grid-cols-12 gap-6">
      <ConsultInfo />
      <ConsultationCard />
    </div>
  );
}

export default ConsultDetail;
