import ConsultationList from '@/features/mypage/ConsultationList';

const MyConsultations = () => {
  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <h2>나의 상담내역</h2>
      </header>
      <main>
        <ConsultationList />
      </main>
    </div>
  );
};

export default MyConsultations;
