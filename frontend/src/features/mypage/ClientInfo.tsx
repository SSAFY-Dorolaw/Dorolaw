import { Mail, Smartphone } from 'lucide-react';

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
  return (
    <div className="border-gray mx-auto mb-8 max-w-[996px] items-center rounded-[10px] border p-10 text-xl">
      <div className="flex items-center">
        <img
          src={profileImage}
          alt="프로필사진"
          className="mx-10 size-[100px] rounded-full bg-black"
        />
        <div>
          <h3>{name} 님 </h3>
          <h4>의뢰인_{clientId}</h4>
        </div>
      </div>
      <hr className="mt-10" />
      <div>
        <div className="mt-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Smartphone />
            <p>{phoneNumber}</p>
          </div>
          <button className="typo-button-small rounded-[10px] bg-p2 p-1 px-4">
            수정
          </button>
        </div>
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
