import { Career, Education, LawyerTag } from '@/entities/lawyers/model/types';
import MyCareer from '@/features/mypage/lawyer/profiledetail/MyCareer';
import MyConsult from '@/features/mypage/lawyer/profiledetail/MyConsult';
import MyExpert from '@/features/mypage/lawyer/profiledetail/MyExpert';
import MyOffice from '@/features/mypage/lawyer/profiledetail/MyOffice';
import MyReview from '@/features/mypage/lawyer/profiledetail/MyReview';
import MySlogan from '@/features/mypage/lawyer/profiledetail/MySlogan';

interface ProfileDetailProps {
  name: string;
  lawyerId: number;
  officeName: string;
  oneLineIntro: string;
  greetingMessage: string;
  averageRating: number | null;
  officeAddress: string;
  officePhoneNumber: string;
  lawyerTags: LawyerTag[];
  lawyerLicenseNumber: string | null;
  lawyerLicenseExam: string | null;
  educations: Education[];
  careers: Career[];
  completedConsultationCount: number;
}

const ProfileDetail = ({
  name,
  lawyerId,
  officeName,
  oneLineIntro,
  greetingMessage,
  averageRating,
  officeAddress,
  officePhoneNumber,
  lawyerTags,
  lawyerLicenseNumber,
  lawyerLicenseExam,
  educations,
  careers,
  completedConsultationCount,
}: ProfileDetailProps) => {
  return (
    <div className="rounded-lg bg-white p-10 drop-shadow-[0_0_2px_rgba(0,0,0,0.25)]">
      {/* 헤더 섹션 */}
      <MySlogan oneLineIntro={oneLineIntro} />

      {/* 프로필 정보 */}
      <div>
        <MyCareer
          name={name}
          officeName={officeName}
          averageRating={averageRating}
          officeAddress={officeAddress}
          officePhoneNumber={officePhoneNumber}
          lawyerTags={lawyerTags}
          educations={educations}
          careers={careers}
          lawyerLicenseNumber={lawyerLicenseNumber}
          lawyerLicenseExam={lawyerLicenseExam}
        />
        <hr />

        {/* 관심 태그 */}
        <MyExpert greetingMessage={greetingMessage} lawyerTags={lawyerTags} />
        <hr />

        {/* 최근 상담 */}
        <MyConsult
          completedConsultationCount={completedConsultationCount}
          lawyerId={lawyerId}
        />
        {/* <hr /> */}

        {/* 상담 후기 */}
        {/* <MyReview />
        <hr /> */}

        {/* 지도 */}
        {/* <MyOffice /> */}
      </div>
    </div>
  );
};

export default ProfileDetail;
