import LawyerProfileCard from '@/features/reservation/LawyerProfileCard';
import LawyerProfileDetail from '@/features/reservation/LawyerProfileDetail';

const Reservation = () => {
  return (
    <div className="flex w-[1200px]">
      {/* 변호사 프로필 카드 */}
      <aside className="mr-[50px] w-full max-w-[450px]">
        <LawyerProfileCard />
      </aside>

      {/* 변호사 프로필 목록 */}
      <section className="w-[700px] text-h3 font-bold">
        <LawyerProfileDetail />
      </section>
    </div>
  );
};

export default Reservation;
