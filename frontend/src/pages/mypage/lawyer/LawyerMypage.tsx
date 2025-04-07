import { useLawyerMyProfile } from '@/entities/lawyers/model/queries';
import ProfileCard from './ProfileCard';
import ProfileDetail from './ProfileDetail';
// import axios from 'axios';
// import { LawyerProfile } from '@/entities/lawyers/model/types';

const LawyerMypage = () => {
  const { data, isPending, isError } = useLawyerMyProfile();
  console.log(data);

  if (isPending) return <div>로딩중...</div>;
  if (isError) return <div>에러!</div>;

  // const data = async (): Promise<LawyerProfile> => {
  //   try {
  //     const res = await axios.get<LawyerProfile>(
  //       `${import.meta.env.VITE_API_URL}/members/profile`,
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${import.meta.env.VITE_CERTIFICATED_LAWYER_TOKEN}`,
  //         },
  //       },
  //     );
  //     console.log(`Bearer ${import.meta.env.VITE_CERTIFICATED_LAWYER_TOKEN}`);
  //     console.log(res);
  //     return res.data; // 데이터를 반환
  //   } catch (error) {
  //     console.log(error);
  //     throw error;
  //   }
  // };

  return (
    <div className="flex w-[1200px]">
      {/* 변호사 프로필 카드 */}
      <aside className="mr-[50px] w-full max-w-[450px]">
        <ProfileCard
          name={data.name}
          officeName={data?.officeName}
          profileImage={data.profileImage}
          todayConsultations={data?.todayConsultations}
          phoneConsultationPrice={data?.phoneConsultationPrice}
          videoConsultationPrice={data?.videoConsultationPrice}
          visitConsultationPrice={data?.visitConsultationPrice}
        />
      </aside>

      {/* 변호사 프로필 목록 */}
      <section className="w-[700px] text-h3 font-bold">
        <ProfileDetail
          name={data.name}
          officeName={data?.officeName}
          oneLineIntro={data?.oneLineIntro}
          greetingMessage={data?.greetingMessage}
          averageRating={data?.averageRating}
          officeAddress={data?.officeAddress}
          lawyerTags={data?.lawyerTags}
          lawyerLicenseNumber={data?.lawyerLicenseNumber}
          lawyerLicenseExam={data?.lawyerLicenseExam}
          education={data?.education}
          career={data?.career}
          completedConsultationCount={data.completedConsultationCount}
        />
      </section>
    </div>
  );
};

export default LawyerMypage;
