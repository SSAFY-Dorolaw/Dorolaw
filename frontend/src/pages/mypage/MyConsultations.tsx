import { useAuthStore } from '@/entities/auth/model/store';
import ConsultationList from '@/features/mypage/ConsultationList';
import LawyerConsultationList from '@/pages/mypage/lawyer/LawyerConsultationList';

const MyConsultations = () => {
  const { role } = useAuthStore.getState();
  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <h2>나의 상담내역</h2>
      </header>
      <main>
        {role === 'GENERAL' ? <ConsultationList /> : <LawyerConsultationList />}
      </main>
    </div>
  );
};

export default MyConsultations;
