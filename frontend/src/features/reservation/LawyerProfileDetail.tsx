import LawyerSlogan from '@/features/reservation/LawyerSlogan';
import LawyerCareer from '@/features/reservation/LawyerCareer';
import LawyerExpert from '@/features/reservation/LawyerExpert';
import LawyerConsult from '@/features/reservation/LawyerConsult';
import LawyerReview from '@/features/reservation/LawyerReview';
import LawyerMap from '@/features/reservation/LawyerMap';

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
