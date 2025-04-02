import { ClientProfile } from '@/entities/clients/model/types';
import ClientInfo from '@/features/mypage/ClientInfo';
import { queryClient } from '@/shared/libs/query/queryClient';

const MyPage = () => {
  const client = queryClient.getQueryData<ClientProfile>(['client', 'profile']);

  return (
    <div className="w-full">
      <header>
        <h2>마이 페이지</h2>
      </header>
      <main>
        <ClientInfo
          clientId={client?.clientId}
          name={client?.name}
          phoneNumber={client?.phoneNumber}
          email={client?.email}
          profileImage={client?.profileImage}
        />
      </main>
    </div>
  );
};

export default MyPage;
