// import { Edit } from 'lucide-react';
import { TodayConsultations } from '@/entities/lawyers/model/types';
import Fee from '@/features/consultation/Fee';
import LawyerImg from '@/shared/assets/images/sskim.png';
import { useNavigate } from 'react-router-dom';

interface ProfileCardProps {
  name: string;
  officeName: string | null;
  profileImage: string;
  todayConsultations: TodayConsultations[]; // 수정
  phoneConsultationPrice: number | null;
  videoConsultationPrice: number | null;
  visitConsultationPrice: number | null;
}

const ProfileCard = ({
  name,
  officeName,
  profileImage,
  todayConsultations,
  phoneConsultationPrice,
  videoConsultationPrice,
  visitConsultationPrice,
}: ProfileCardProps) => {
  const navigate = useNavigate();

  const goToEdit = () => {
    void navigate('/lawyer/edit');
  };

  return (
    <div>
      {/* 프로필 헤더 */}
      <div className="rounded-t-[10px] bg-p5 p-4 text-p1">
        <h2 className="my-1 ml-3 text-h2 font-bold text-p1">{name} 변호사</h2>
        <div className="flex justify-between">
          <p className="ml-3 text-bodysmall text-p1">{officeName}</p>
        </div>
      </div>

      {/* 프로필 카드 */}
      <div>
        {/* 프로필 이미지 */}
        <div className="flex h-[300px] justify-center rounded-b-[10px] bg-white">
          <img
            src={profileImage}
            alt="변호사 프로필 이미지"
            className="h-full object-cover"
          />
        </div>

        {/* 비용 */}
        <Fee />

        {/* 내 일정 */}
        <div>
          <p>일정 표시</p>
        </div>

        {/* 정보 수정 버튼 */}
        <div className="rounded-[10px] bg-p5 p-4">
          <button
            onClick={goToEdit}
            className="w-full bg-p5 text-body text-white"
          >
            정보 수정하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
