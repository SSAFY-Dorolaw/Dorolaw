// import { Edit } from 'lucide-react';
import Fee from '@/features/consultation/Fee';
import LawyerImg from '@/shared/assets/images/sskim.png';
import { useNavigate } from 'react-router-dom';

const ProfileCard = () => {
  const navigate = useNavigate();

  const goToEdit = () => {
    void navigate('/lawyer/mypage/edit');
  };

  return (
    <div>
      {/* 프로필 헤더 */}
      <div className="rounded-t-[10px] bg-p5 p-4 text-p1">
        <h2 className="my-1 ml-3 text-h2 font-bold text-p1">김승소 변호사</h2>
        <div className="flex justify-between">
          <p className="ml-3 text-bodysmall text-p1">로로 법률사무소</p>
          {/* <Edit className="mr-2 cursor-pointer" /> */}
        </div>
      </div>

      {/* 프로필 카드 */}
      <div>
        {/* 프로필 이미지 */}
        <div className="flex h-[300px] justify-center rounded-b-[10px] bg-white">
          <img
            src={LawyerImg}
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
