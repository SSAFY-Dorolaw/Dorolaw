import star from '@/shared/assets/images/star.png';
import { useState } from 'react';

const MyCareer = () => {
  const [showPopup, setShowPopup] = useState(false);

  const careerPopup = () => {
    console.log('팝업 열기');
    setShowPopup(true);
  };

  const closePopup = () => {
    console.log('팝업 열기');
    setShowPopup(false);
  };

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

      <div onClick={careerPopup} className="mt-2 flex cursor-pointer flex-col">
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

      {/* 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-h3 font-bold">김승소 변호사 이력</h3>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                X
              </button>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="mb-2 text-body">경력</h4>
                <ul className="space-y-2 text-caption">
                  <li>2020 ~ 현재: 로로 법률사무소 대표 변호사</li>
                  <li>2015 ~ 2020: 서울중앙지방법원 판사</li>
                  <li>2010 ~ 2015: 대형 로펌 A 변호사</li>
                  <li>2005 ~ 2010: 서울지방검찰청 검사</li>
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-body">자격</h4>
                <p className="text-caption">42회 사법시험 합격 (2000)</p>
                <p className="text-caption">32기 사법연수원 수료 (2003)</p>
              </div>

              <div>
                <h4 className="mb-2 text-body">학력</h4>
                <ul className="space-y-1 text-caption">
                  <li>서울대학교 법학대학원 박사 (2008)</li>
                  <li>서울대학교 법학대학원 석사 (2005)</li>
                  <li>서울대학교 법학과 학사 (1998)</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 text-center">
              <button
                onClick={closePopup}
                className="rounded-lg bg-p5 px-6 py-1 text-body text-white hover:bg-p4"
              >
                확인
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCareer;
