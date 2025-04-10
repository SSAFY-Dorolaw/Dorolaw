import { Career, Education, LawyerTag } from '@/entities/lawyers/model/types';
import star from '@/shared/assets/images/star.png';
import { useState } from 'react';

interface CareerProps {
  name: string | null;
  officeName: string | null;
  averageRating: number | null;
  officeAddress: string | null;
  lawyerTags: LawyerTag[];
  // officePhoneNumber: string;
  // oneLineIntro: string;
  educations: Education[];
  careers: Career[];
  lawyerLicenseNumber: string | null;
  lawyerLicenseExam: string | null;
}

const MyCareer = ({
  name,
  officeName,
  averageRating,
  officeAddress,
  lawyerTags,
  educations,
  careers,
  lawyerLicenseNumber,
  lawyerLicenseExam,
}: CareerProps) => {
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
          <h3 className="m-0 text-h3 font-bold">{name} 변호사</h3>
          <div className="flex items-center">
            <img src={star} alt="별점" className="ml-6 size-4" />
            <span className="ml-2 text-caption text-g4">{averageRating}</span>
          </div>
        </div>
        <p className="mt-2 text-bodysmall text-gray-500">{officeName}</p>
        <p className="text-caption text-gray-500">{officeAddress}</p>
      </div>

      <div onClick={careerPopup} className="mt-2 flex cursor-pointer flex-col">
        <div className="mb-2 flex">
          <span className="w-16 text-sm text-g4">분야</span>
          {lawyerTags?.map((elem, index) => (
            <span className="text-sm font-medium" key={index}>
              {elem.lawyer_specialties}
            </span>
          ))}
        </div>
        <div className="mb-2 flex">
          <span className="w-16 text-sm text-g4">자격</span>
          <span className="text-sm font-medium">{lawyerLicenseExam}</span>
        </div>
        <div className="mb-2 flex">
          <span className="w-16 text-sm text-g4">학력</span>
          <span className="text-sm font-medium">
            {educations[0]?.school} {educations[0]?.degree}
          </span>
        </div>
      </div>

      {/* 팝업 */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="mx-4 w-full max-w-md rounded-lg bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-h3 font-bold">{name} 변호사 이력</h3>
              <button
                onClick={closePopup}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-10">
              <div>
                <h4 className="mb-2 text-body">경력</h4>
                <ul className="space-y-2 text-caption">
                  {careers?.map((elem, index) => (
                    <li className="text-sm font-medium" key={index}>
                      {elem.years}: {elem.company} {elem.position}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-2 text-body">자격</h4>
                <p className="text-caption">{lawyerLicenseExam}</p>
              </div>

              <div>
                <h4 className="mb-2 text-body">학력</h4>
                <ul className="space-y-1 text-caption">
                  {educations?.map((elem, index) => (
                    <li key={index}>
                      {elem.school} {elem.degree} {`(${elem.graduationYear})`}
                    </li>
                  ))}
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
