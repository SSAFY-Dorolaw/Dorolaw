import React, { useEffect, useState } from 'react';
import { useUpdateLawyerProfile } from '@/entities/lawyers/model/mutations';
import {
  Career,
  Education,
  LawyerProfileUpdate,
  LawyerSpeciality,
} from '@/entities/lawyers/model/types';
import { useLawyerMyProfile } from '@/entities/lawyers/model/queries';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/entities/auth/model/store';
import apiClient from '@/shared/api/api-client';

const LawyerAuthenticationForm: React.FC = () => {
  const navigate = useNavigate();
  const updateProfileMutation = useUpdateLawyerProfile();
  const { data: lawyerProfile, isLoading } = useLawyerMyProfile();
  const { clientId, role } = useAuthStore.getState();

  // 기본 빈 폼 데이터로 초기화
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
    specialties: [],
    phoneConsultationPrice: 0,
    videoConsultationPrice: 0,
    visitConsultationPrice: 0,
    bankName: '',
    accountNumber: '',
    lawyerLicenseNumber: '',
    lawyerLicenseExam: '',
  });

  // 프로필 데이터가 로드되면 폼 데이터 업데이트
  useEffect(() => {
    console.log(lawyerProfile);
    if (lawyerProfile) {
      const specialties: LawyerSpeciality[] = [];

      if (lawyerProfile.lawyerTags && lawyerProfile.lawyerTags.length > 0) {
        // lawyerTags 배열에서 lawyer_specialties 필드를 추출하고
        // LawyerSpeciality enum으로 변환
        lawyerProfile.lawyerTags.forEach((tag) => {
          // 열거형 값으로 안전하게 변환
          const specialty = tag.lawyer_specialties as LawyerSpeciality;
          if (Object.values(LawyerSpeciality).includes(specialty)) {
            specialties.push(specialty);
          }
        });
      }

      // 필요한 모든 필드에 대해 기존 데이터로 초기화
      setFormData({
        phoneNumber: lawyerProfile.phoneNumber || '',
        profileImage: lawyerProfile.profileImage || '',
        officeName: lawyerProfile.officeName || '',
        officePhoneNumber: lawyerProfile.officePhoneNumber || '',
        officeAddress: lawyerProfile.officeAddress || '',
        gender: lawyerProfile.gender || '',
        oneLineIntro: lawyerProfile.oneLineIntro || '',
        greetingMessage: lawyerProfile.greetingMessage || '',
        introVideo: lawyerProfile.introVideo || '',
        // 기존 교육 데이터가 있으면 사용, 없으면 기본값
        educations: lawyerProfile.educations?.length
          ? lawyerProfile.educations
          : [{ school: '', degree: '', graduationYear: 2024 }],
        // 기존 경력 데이터가 있으면 사용, 없으면 기본값
        careers: lawyerProfile.careers?.length
          ? lawyerProfile.careers
          : [{ company: '', position: '', years: '' }],
        specialties: specialties, // ?
        phoneConsultationPrice: lawyerProfile.phoneConsultationPrice || 0,
        videoConsultationPrice: lawyerProfile.videoConsultationPrice || 0,
        visitConsultationPrice: lawyerProfile.visitConsultationPrice || 0,
        bankName: lawyerProfile.bankName || '',
        accountNumber: lawyerProfile.accountNumber || '',
        lawyerLicenseNumber: lawyerProfile.lawyerLicenseNumber || '',
        lawyerLicenseExam: lawyerProfile.lawyerLicenseExam || '', // null 허용됨
      });
    }
  }, [lawyerProfile]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

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

    console.log(finalData);

    // Send the PATCH request
    updateProfileMutation.mutate(finalData, {
      onSuccess: () => {
        console.log(role);
        if (role === 'LAWYER') {
          apiClient
            .post('/members/lawyer-verification', {
              memberId: clientId,
            })
            .then((response) => {
              if (response.status === 200) {
                useAuthStore.setState({ role: 'CERTIFIED_LAWYER' });
                alert('변호사 인증이 성공적으로 완료되었습니다.');
                void navigate('/lawyer');
              }
            })
            .catch((error) => {
              console.error('변호사 인증 요청 중 오류가 발생했습니다:', error);
              alert(
                '변호사 인증 요청 중 오류가 발생했습니다. 다시 시도해주세요.',
              );
            });
        } else {
          void navigate('/lawyer');
        }
      },
      onError: (error) => {
        console.error('변호사 프로필 업데이트 중 오류가 발생했습니다:', error);
        alert(
          '변호사 프로필 업데이트 중 오류가 발생했습니다. 다시 시도해주세요.',
        );
      },
    });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center p-8">
        데이터를 불러오는 중입니다...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl p-4">
      <h1 className="mb-6 text-2xl font-bold">
        {role === 'LAWYER' ? '변호사 인증 요청' : '변호사 프로필 수정'}
      </h1>

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
              >
                <option value="">선택하세요</option>
                <option value="MALE">남성</option>
                <option value="FEMALE">여성</option>
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
              <label className="mb-1 block">사무실 전화번호</label>
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
              <label className="mb-1 block">사무실 주소</label>
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
          <h2 className="mb-4 text-xl font-semibold">전문분야 및 소개</h2>

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

        {/* 자격 정보 */}
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
        </div>

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
                onFocus={(e) => e.target.select()}
                className="w-full rounded border p-2"
                min="0"
                step="1000"
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
                onFocus={(e) => e.target.select()}
                className="w-full rounded border p-2"
                min="0"
                step="1000"
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
                onFocus={(e) => e.target.select()}
                className="w-full rounded border p-2"
                min="0"
                step="1000"
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
            {role === 'LAWYER' ? '변호사 인증하기' : '수정하기'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LawyerAuthenticationForm;
