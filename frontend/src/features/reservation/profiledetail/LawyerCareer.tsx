import star from '@/shared/assets/images/star.png';

const LawyerCareer = () => {
  return (
    // 변호사 이력
    <div className="mx-[50px] mb-8 flex justify-between">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <h3 className="m-0 text-h3 font-bold">김승소 변호사</h3>
          <div className="flex items-center">
            <img src={star} alt="별점" className="ml-6 size-4" />
            <span className="ml-2 text-caption text-g4">4.8</span>
          </div>
        </div>
        <p className="mt-2 text-bodysmall text-gray-500">로로 법률사무소</p>
        <p className="text-caption text-gray-500">
          서울특별시 강남구 테헤란로 212 14층 1401호
        </p>
      </div>

      <div className="mt-2 flex flex-col">
        <div className="mb-2 flex">
          <span className="w-16 text-sm text-g4">분야</span>
          <span className="text-sm font-medium">접촉사고, 뺑소니</span>
        </div>
        <div className="mb-2 flex">
          <span className="w-16 text-sm text-g4">자격</span>
          <span className="text-sm font-medium">42회 사법시험 (2000)</span>
        </div>
        <div className="mb-2 flex">
          <span className="w-16 text-sm text-g4">학력</span>
          <span className="text-sm font-medium">
            서울대학교 법학대학원 박사
          </span>
        </div>
      </div>
    </div>
  );
};

export default LawyerCareer;
