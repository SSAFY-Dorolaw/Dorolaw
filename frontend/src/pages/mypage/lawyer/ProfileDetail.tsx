import MyCareer from '@/features/mypage/lawyer/profiledetail/MyCareer';
import MyConsult from '@/features/mypage/lawyer/profiledetail/MyConsult';
import MyExpert from '@/features/mypage/lawyer/profiledetail/MyExpert';
import MyOffice from '@/features/mypage/lawyer/profiledetail/MyOffice';
import MyReview from '@/features/mypage/lawyer/profiledetail/MyReview';
import MySlogan from '@/features/mypage/lawyer/profiledetail/MySlogan';

const ProfileDetail = () => {
  return (
    <div>
      {/* 헤더 섹션 */}
      <MySlogan />

      {/* 프로필 정보 */}
      <div>
        <MyCareer />
        <hr />

        {/* 관심 태그 */}
        <MyExpert />
        <hr />

        {/* 최근 상담 */}
        <MyConsult />
        <hr />

        {/* 상담 후기 */}
        <MyReview />
        <hr />

        {/* 지도 */}
        <MyOffice />
      </div>
    </div>
  );
};

export default ProfileDetail;
