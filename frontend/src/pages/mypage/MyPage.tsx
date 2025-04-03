import { useQuery } from '@tanstack/react-query';
import { ClientProfile } from '@/entities/clients/model/types';
import ClientInfo from '@/features/mypage/ClientInfo';
import { clientApi } from '@/entities/clients/api/clientApi';

const MyPage = () => {
  // 마이페이지 작업
  const {
    data: clientProfile,
    isLoading,
    error,
  } = useQuery<ClientProfile>({
    queryKey: ['client', 'profile'],
    queryFn: clientApi.getProfile,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error occurred</div>;
  if (!clientProfile) return <div>No client data available.</div>;

  return (
    <div className="w-full">
      <header>
        <h2>마이 페이지</h2>
      </header>
      <main>
        <ClientInfo
          clientId={clientProfile.clientId}
          name={clientProfile.name}
          phoneNumber={clientProfile.phoneNumber}
          email={clientProfile.email}
          profileImage={clientProfile.profileImage}
        />
      </main>
    </div>
  );
};

export default MyPage;
