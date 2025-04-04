import { Mail, Smartphone } from 'lucide-react';
import { FormEvent, useState } from 'react';
import { useUpdateProfile } from '@/features/mypage/client/model/mutations';

interface ClientInfoProps {
  clientId?: number;
  name?: string;
  phoneNumber?: string;
  email?: string;
  profileImage?: string;
}

function ClientInfo({
  clientId,
  name,
  phoneNumber,
  email,
  profileImage,
}: ClientInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [phone, setPhone] = useState(phoneNumber ?? '');

  const updateProfileMutation = useUpdateProfile();

  // 수정 버튼 클릭 시 편집 모드 전환
  const handleEdit = () => {
    setIsEditing(true);
  };

  // 취소 버튼 클릭 시 원래 전화번호로 복원 후 편집 모드 종료
  const handleCancel = () => {
    setIsEditing(false);
    setPhone(phoneNumber ?? '');
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    updateProfileMutation.mutate(
      {
        phoneNumber: phone,
      },
      {
        onSuccess: () => {
          setIsEditing(false);
        },
      },
    );
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
          <form onSubmit={handleSubmit} className="mt-10">
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
