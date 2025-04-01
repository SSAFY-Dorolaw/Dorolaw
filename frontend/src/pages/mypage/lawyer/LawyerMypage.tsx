import ProfileCard from './ProfileCard';
import ProfileDetail from './ProfileDetail';

const LawyerMypage = () => {
  return (
    <div className="flex w-[1200px]">
      {/* 변호사 프로필 카드 */}
      <aside className="mr-[50px] w-full max-w-[450px]">
        <ProfileCard />
      </aside>

      {/* 변호사 프로필 목록 */}
      <section className="w-[700px] text-h3 font-bold">
        <ProfileDetail />
      </section>
    </div>
  );
};

export default LawyerMypage;
