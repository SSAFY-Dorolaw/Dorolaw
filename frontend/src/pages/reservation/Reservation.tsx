import { useLawyerProfile } from '@/entities/lawyers/model/queries';
import LawyerProfileCard from '@/features/reservation/LawyerProfileCard';
import LawyerProfileDetail from '@/features/reservation/LawyerProfileDetail';
import ProfileDetail from '@/pages/mypage/lawyer/ProfileDetail';
import { useParams } from 'react-router-dom';

const Reservation = () => {
  const { lawyerId, requestId } = useParams();

  const {
    data: profileData,
    isPending,
    isError,
  } = useLawyerProfile(Number(lawyerId));

  if (isPending)
    return (
      <div>
        <h2>로딩중..</h2>
      </div>
    );
  if (isError) return <div>에러</div>;

  return (
    <div className="flex w-[1200px]">
      {/* 변호사 프로필 카드 */}
      <aside className="mr-[50px] w-full max-w-[450px]">
        <LawyerProfileCard
          name={profileData.name}
          officeName={profileData.officeName}
          profileImage={profileData.profileImage}
          videoConsultationPrice={profileData.videoConsultationPrice}
          phoneConsultationPrice={profileData.phoneConsultationPrice}
          visitConsultationPrice={profileData.visitConsultationPrice}
        />
      </aside>

      {/* 변호사 프로필 목록 */}
      <section className="w-[700px] text-h3 font-bold">
        <ProfileDetail
          name={profileData.name}
          lawyerId={Number(lawyerId)}
          officeName={profileData?.officeName}
          oneLineIntro={profileData?.oneLineIntro}
          greetingMessage={profileData?.greetingMessage}
          averageRating={profileData?.averageRating}
          officeAddress={profileData?.officeAddress}
          lawyerTags={profileData?.lawyerTags}
          lawyerLicenseNumber={profileData?.lawyerLicenseNumber}
          lawyerLicenseExam={profileData?.lawyerLicenseExam}
          educations={profileData?.educations}
          careers={profileData?.careers}
          completedConsultationCount={profileData.completedConsultationCount}
        />
      </section>
    </div>
  );
};

export default Reservation;
