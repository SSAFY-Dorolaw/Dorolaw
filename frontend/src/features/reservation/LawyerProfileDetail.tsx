import LawyerSlogan from '@/features/reservation/profiledetail/LawyerSlogan';
import LawyerCareer from '@/features/reservation/profiledetail/LawyerCareer';
import LawyerExpert from '@/features/reservation/profiledetail/LawyerExpert';
import LawyerConsult from '@/features/reservation/profiledetail/LawyerConsult';
import LawyerReview from '@/features/reservation/profiledetail/LawyerReview';
import LawyerMap from '@/features/reservation/profiledetail/LawyerMap';

const LawyerProfileDetail = () => {
  return (
    <div>
      {/* 헤더 섹션 */}
      <LawyerSlogan />

      {/* 프로필 정보 */}
      <div>
        <LawyerCareer />
        <hr />

        {/* 관심 태그 */}
        <LawyerExpert />
        <hr />

        {/* 최근 상담 */}
        <LawyerConsult />
        <hr />

        {/* 상담 후기 */}
        <LawyerReview />
        <hr />

        {/* 지도 */}
        <LawyerMap />
      </div>
    </div>
  );
};

export default LawyerProfileDetail;
