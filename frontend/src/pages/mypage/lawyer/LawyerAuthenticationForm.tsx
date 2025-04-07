import React, { useState } from 'react';
import { useUpdateLawyerProfile } from '@/entities/lawyers/model/mutations';
import { Career, Education, LawyerProfileUpdate, LawyerSpeciality } from '@/entities/lawyers/model/types';

const LawyerAuthenticationForm: React.FC = () => {
  const updateProfileMutation = useUpdateLawyerProfile();
  const [formData, setFormData] = useState<LawyerProfileUpdate>({
    phoneNumber: '',
    profileImage: '',
    officeName: '',
    officePhoneNumber: '',
    officeAddress: '',
    gender: '',
    oneLineIntro: '',
    greetingMessage: '',
    introVideo: '',
    educations: [{ school: '', degree: '', graduationYear: 2024 }],
    careers: [{ company: '', position: '', years: '' }],
    // lawyerLicenseNumber: '',
    // lawyerLicenseExam: null,
    specialties: [],
    phoneConsultationPrice: 0,
    videoConsultationPrice: 0,
    visitConsultationPrice: 0,
    bankName: '',
    accountNumber: '',
  });

  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle specialties checkboxes
  const specialtyOptions: LawyerSpeciality[] = [
    LawyerSpeciality.차대차,
    LawyerSpeciality.차대보행자,
    LawyerSpeciality.차대자전거,
    LawyerSpeciality.차대이륜차,
    LawyerSpeciality.고속도로,
  ];

  const handleCheckboxChange = (specialty: LawyerSpeciality) => {
    const currentSpecialties = formData.specialties || [];
    if (currentSpecialties.includes(specialty)) {
      // 이미 선택된 경우 해당 값을 제거
      setFormData({
        ...formData,
        specialties: currentSpecialties.filter((s) => s !== specialty),
      });
    } else {
      // 선택되지 않은 경우 배열에 추가
      setFormData({
        ...formData,
        specialties: [...currentSpecialties, specialty],
      });
    }
  };

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle pricing input changes
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: parseInt(value) || 0 });
  };

  // Handle education changes
  const handleEducationChange = (
    index: number,
    field: keyof Education,
    value: string | number,
  ) => {
    const updatedEducation = [...formData.educations];
    if (field === 'graduationYear') {
      updatedEducation[index][field] = Number(value);
    } else {
      updatedEducation[index][field] = value as string;
    }
    setFormData({ ...formData, educations: updatedEducation });
  };

  // Add education field
  const addEducation = () => {
    setFormData({
      ...formData,
      educations: [
        ...formData.educations,
        { school: '', degree: '', graduationYear: 2024 },
      ],
    });
  };

  // Remove education field
  const removeEducation = (index: number) => {
    if (formData.educations.length > 1) {
      const updatedEducation = formData.educations.filter(
        (_, i) => i !== index,
      );
      setFormData({ ...formData, educations: updatedEducation });
    }
  };

  // Handle career changes
  const handleCareerChange = (
    index: number,
    field: keyof Career,
    value: string,
  ) => {
    const updatedCareer = [...formData.careers];
    updatedCareer[index][field] = value;
    setFormData({ ...formData, careers: updatedCareer });
  };

  // Add career field
  const addCareer = () => {
    setFormData({
      ...formData,
      careers: [...formData.careers, { company: '', position: '', years: '' }],
    });
  };

  // Remove career field
  const removeCareer = (index: number) => {
    if (formData.careers.length > 1) {
      const updatedCareer = formData.careers.filter((_, i) => i !== index);
      setFormData({ ...formData, careers: updatedCareer });
    }
  };

  // Handle image upload
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);

      // For preview purposes, create a temporary URL
      const imageUrl = URL.createObjectURL(e.target.files[0]);
      setFormData({ ...formData, profileImage: imageUrl });
    }
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // First upload the image if there is one
      const finalImageUrl = formData.profileImage;

      // if (imageFile) {
      //   // Create a FormData object to send the image file
      //   const imageFormData = new FormData();
      //   imageFormData.append('image', imageFile);

      //   이미지 url 변환
      //   finalImageUrl = imageUploadResponse.data.imageUrl;
      // }

      // Prepare the final data for submission
      const finalData = {
        ...formData,
        profileImage: finalImageUrl,
      };

      console.log(formData);

      // Send the PATCH request
      const response = await updateProfileMutation.mutateAsync({
        ...finalData,
      });

      if (response.status === 200) {
        alert('변호사 인증 요청이 성공적으로 제출되었습니다.');
      }
    } catch (error) {
      console.error('변호사 인증 요청 중 오류가 발생했습니다:', error);
      alert('변호사 인증 요청 중 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-2xl font-bold">변호사 인증 요청</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 기본 정보 */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-semibold">기본 정보</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block">전화번호</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 010-1234-5678"
                required
              />
            </div>

            <div>
              <label className="mb-1 block">프로필 이미지</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full rounded border p-2"
              />
              {formData.profileImage && (
                <div className="mt-2">
                  <img
                    src={formData.profileImage}
                    alt="프로필 미리보기"
                    className="size-20 rounded-full object-cover"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="mb-1 block">성별</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                required
              >
                <option value="">선택하세요</option>
                <option value="남성">남성</option>
                <option value="여성">여성</option>
                <option value="기타">기타</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block">한줄소개</label>
              <input
                type="text"
                name="oneLineIntro"
                value={formData.oneLineIntro}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 진심을 다해 상담합니다."
                required
              />
            </div>
          </div>
        </div>

        {/* 사무실 정보 */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-semibold">사무실 정보</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block">변호사사무실이름</label>
              <input
                type="text"
                name="officeName"
                value={formData.officeName}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 도로로 법률사무소"
                required
              />
            </div>

            <div>
              <label className="mb-1 block">변호사사무실전화번호</label>
              <input
                type="text"
                name="officePhoneNumber"
                value={formData.officePhoneNumber}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 02-9876-5432"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="mb-1 block">변호사사무실주소</label>
              <input
                type="text"
                name="officeAddress"
                value={formData.officeAddress}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 서울특별시 강남구 테헤란로 123"
                required
              />
            </div>
          </div>
        </div>

        {/* 전문 분야 및 소개 */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-semibold">전문 분야 및 소개</h2>

          <div className="mb-4">
            <label className="mb-2 block">전문분야 (복수 선택 가능)</label>
            <div className="flex flex-wrap gap-4">
              {specialtyOptions.map((option) => (
                <div key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    id={`specialty-${option}`}
                    checked={formData.specialties.includes(option)}
                    onChange={() => handleCheckboxChange(option)}
                    className="mr-2 accent-p5"
                  />
                  <label htmlFor={`specialty-${option}`}>{option}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="mb-1 block">인삿말</label>
            <textarea
              name="greetingMessage"
              value={formData.greetingMessage}
              onChange={handleInputChange}
              className="w-full rounded border p-2"
              rows={4}
              placeholder="예: 안녕하세요. 변호사 김용국입니다. 신뢰를 바탕으로 최선을 다해 도와드리겠습니다."
              required
            />
          </div>

          <div className="mt-4">
            <label className="mb-1 block">소개영상 (유튜브 링크)</label>
            <input
              type="text"
              name="introVideo"
              value={formData.introVideo}
              onChange={handleInputChange}
              className="w-full rounded border p-2"
              placeholder="예: https://youtube.com/watch?v=..."
            />
          </div>
        </div>

        {/* 계좌 정보 */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-semibold">계좌 정보</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block">은행이름</label>
              <input
                type="text"
                name="bankName"
                value={formData.bankName}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 신한은행"
                required
              />
            </div>

            <div>
              <label className="mb-1 block">계좌번호</label>
              <input
                type="text"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 110-123-456789"
                required
              />
            </div>
          </div>
        </div>

        {/* 학력 */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-semibold">학력</h2>

          {formData.educations.map((edu, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-1 gap-4 border-b border-gray-200 pb-4 md:grid-cols-3"
            >
              <div>
                <label className="mb-1 block">학교</label>
                <input
                  type="text"
                  value={edu.school}
                  onChange={(e) =>
                    handleEducationChange(index, 'school', e.target.value)
                  }
                  className="w-full rounded border p-2"
                  placeholder="예: 서울대학교 법과대학"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block">학위</label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    handleEducationChange(index, 'degree', e.target.value)
                  }
                  className="w-full rounded border p-2"
                  placeholder="예: 법학사"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block">졸업년도</label>
                <input
                  type="number"
                  value={edu.graduationYear}
                  onChange={(e) =>
                    handleEducationChange(
                      index,
                      'graduationYear',
                      e.target.value,
                    )
                  }
                  className="w-full rounded border p-2"
                  min="1900"
                  max="2030"
                  required
                />
              </div>

              {formData.educations.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeEducation(index)}
                  className="mt-2 text-red-500"
                >
                  삭제
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addEducation}
            className="mt-2 rounded bg-p5 px-4 py-2 text-p1"
          >
            학력 추가
          </button>
        </div>

        {/* 경력 */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-semibold">경력</h2>

          {formData.careers.map((car, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-1 gap-4 border-b border-gray-200 pb-4 md:grid-cols-3"
            >
              <div>
                <label className="mb-1 block">회사/기관</label>
                <input
                  type="text"
                  value={car.company}
                  onChange={(e) =>
                    handleCareerChange(index, 'company', e.target.value)
                  }
                  className="w-full rounded border p-2"
                  placeholder="예: 법무법인 세종"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block">직위</label>
                <input
                  type="text"
                  value={car.position}
                  onChange={(e) =>
                    handleCareerChange(index, 'position', e.target.value)
                  }
                  className="w-full rounded border p-2"
                  placeholder="예: 변호사"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block">기간</label>
                <input
                  type="text"
                  value={car.years}
                  onChange={(e) =>
                    handleCareerChange(index, 'years', e.target.value)
                  }
                  className="w-full rounded border p-2"
                  placeholder="예: 2015-2018"
                  required
                />
              </div>

              {formData.careers.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeCareer(index)}
                  className="mt-2 text-red-500"
                >
                  삭제
                </button>
              )}
            </div>
          ))}

          <button
            type="button"
            onClick={addCareer}
            className="mt-2 rounded bg-p5 px-4 py-2 text-white"
          >
            경력 추가
          </button>
        </div>

        {/* 자격 정보
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-semibold">자격 정보</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-1 block">변호사자격증번호</label>
              <input
                type="text"
                name="lawyerLicenseNumber"
                value={formData.lawyerLicenseNumber}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 12345"
                required
              />
            </div>

            <div>
              <label className="mb-1 block">변호사자격시험</label>
              <input
                type="text"
                name="lawyerLicenseExam"
                value={formData.lawyerLicenseExam || ''}
                onChange={handleInputChange}
                className="w-full rounded border p-2"
                placeholder="예: 55회 사법고시 합격"
              />
            </div>
          </div>
        </div> */}

        {/* 상담 가격 설정 */}
        <div className="rounded-lg bg-gray-50 p-4">
          <h2 className="mb-4 text-xl font-semibold">상담 가격 설정</h2>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="mb-1 block">전화상담 가격</label>
              <input
                type="number"
                name="phoneConsultationPrice"
                value={formData.phoneConsultationPrice}
                onChange={handlePriceChange}
                className="w-full rounded border p-2"
                min="0"
                required
              />
            </div>

            <div>
              <label className="mb-1 block">화상상담 가격</label>
              <input
                type="number"
                name="videoConsultationPrice"
                value={formData.videoConsultationPrice}
                onChange={handlePriceChange}
                className="w-full rounded border p-2"
                min="0"
                required
              />
            </div>

            <div>
              <label className="mb-1 block">방문상담 가격</label>
              <input
                type="number"
                name="visitConsultationPrice"
                value={formData.visitConsultationPrice}
                onChange={handlePriceChange}
                className="w-full rounded border p-2"
                min="0"
                required
              />
            </div>
          </div>
        </div>

        {/* 제출 버튼 */}
        <div className="text-center">
          <button
            type="submit"
            className="rounded-lg bg-p5 px-6 py-3 font-semibold text-p1 transition hover:text-y5"
          >
            변호사 인증 요청하기
          </button>
        </div>
      </form>
    </div>
  );
};

export default LawyerAuthenticationForm;
