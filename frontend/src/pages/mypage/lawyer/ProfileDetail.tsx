import { Career, Education, LawyerTags } from '@/entities/lawyers/model/types';
import MyCareer from '@/features/mypage/lawyer/profiledetail/MyCareer';
import MyConsult from '@/features/mypage/lawyer/profiledetail/MyConsult';
import MyExpert from '@/features/mypage/lawyer/profiledetail/MyExpert';
import MyOffice from '@/features/mypage/lawyer/profiledetail/MyOffice';
import MyReview from '@/features/mypage/lawyer/profiledetail/MyReview';
import MySlogan from '@/features/mypage/lawyer/profiledetail/MySlogan';

interface ProfileDetailProps {
  name: string;
  officeName: string;
  oneLineIntro: string;
  greetingMessage: string;
  averageRating: number;
  officeAddress: string;
  lawyerTags: LawyerTags[];
  lawyerLicenseNumber: string;
  lawyerLicenseExam: string;
  education: Education[];
  career: Career[];
}

const ProfileDetail = ({
  name,
  officeName,
  oneLineIntro,
  greetingMessage,
  averageRating,
  officeAddress,
  lawyerTags,
  lawyerLicenseNumber,
  lawyerLicenseExam,
  education,
  career,
}: ProfileDetailProps) => {
  return (
    <div>
      {/* 헤더 섹션 */}
      <MySlogan oneLineIntro={oneLineIntro} />

      {/* 프로필 정보 */}
      <div>
        <MyCareer
          name={name}
          officeName={officeName}
          averageRating={averageRating}
          officeAddress={officeAddress}
          lawyerTags={lawyerTags}
          greetingMessage={greetingMessage}
          education={education}
          career={career}
          lawyerLicenseNumber={lawyerLicenseNumber}
          lawyerLicenseExam={lawyerLicenseExam}
        />
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
