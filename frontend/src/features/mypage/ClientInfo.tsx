import { Mail, Smartphone } from 'lucide-react';
import { useState } from 'react';
import apiClient from '@/shared/api/api-client';

interface ClientInfoProps {
  clientId: number | undefined;
  name: string | undefined;
  phoneNumber: string | undefined;
  email: string | undefined;
  profileImage: string | undefined;
}

function ClientInfo({
  clientId,
  name,
  phoneNumber,
  email,
  profileImage,
}: ClientInfoProps) {

  // 마아페이지 작업업
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(phoneNumber ?? '');

  // 수정 버튼 클릭 시 편집 모드 전환
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 취소 버튼 클릭 시 원래 전화번호로 복원 후 편집 모드 종료
  const handleCancel = () => {
    setIsEditing(false);
    setPhone(phoneNumber ?? '');
  };

  // 폼 제출 시 PUT 요청으로 전화번호 업데이트
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const updatedData = { phoneNumber: phone, profileImage: profileImage };
      const { data } = await apiClient.put('/members/profile', updatedData);
      console.log('전화번호 업데이트 성공:', data);
      setIsEditing(false);
      // 필요 시 전역 상태나 캐시 업데이트 처리
    } catch (error) {
      console.error('전화번호 업데이트 실패:', error);
    }
  };

  return (
    <div className="border-gray mx-auto mb-8 max-w-[996px] items-center rounded-[10px] border p-10 text-xl">
      <div className="flex items-center">
        <img
          src={profileImage}
          alt="프로필사진"
          className="mx-10 size-[100px] rounded-full bg-black"
        />
        <div>
          <h3>{name} 님</h3>
          <h4>의뢰인_{clientId}</h4>
        </div>
      </div>
      <hr className="mt-10" />
      <div>
        {!isEditing ? (
          <div className="mt-10 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Smartphone />
              <p>{phoneNumber}</p>
            </div>
            <button
              className="typo-button-small rounded-[10px] bg-p2 p-1 px-4"
              onClick={handleEdit}
            >
              수정
            </button>
          </div>
        ) : (
          <form onSubmit={void handleSubmit} className="mt-10">
            <label className="flex items-center gap-4">
              <Smartphone />
              <input
                type="text"
                name="phoneNumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="rounded border p-1 text-xl"
              />
            </label>
            <div className="mt-4 flex gap-4">
              <button
                type="submit"
                className="typo-button-small rounded-[10px] bg-p2 p-1 px-4"
              >
                확인
              </button>
              <button
                type="button"
                className="typo-button-small rounded-[10px] bg-gray-300 p-1 px-4"
                onClick={handleCancel}
              >
                취소
              </button>
            </div>
          </form>
        )}
        <hr className="mt-10" />
        <div className="mt-10 flex items-center gap-4">
          <Mail />
          <p>{email}</p>
        </div>
      </div>
    </div>
  );
}

export default ClientInfo;
