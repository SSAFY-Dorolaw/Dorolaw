import ClientInfo from '@/features/mypage/ClientInfo';

interface Client {
  clientId: number;
  name: string;
  phoneNumber: string;
  email: string;
  joinDate: string;
  profileImage: string;
}

const MyPage = () => {
  const client: Client = {
    clientId: 1, // long
    name: '한민이', // string
    email: 'han@example.com', // string
    phoneNumber: '010-1234-5678', // string
    joinDate: '2025-03-12 15:00', // string
    profileImage: 'https://example.com/profiles/user123.jpg', // string
  };
  return (
    <div className="w-full">
      <header>
        <h2>마이 페이지</h2>
      </header>
      <main>
        <ClientInfo
          clientId={client.clientId}
          name={client.name}
          phoneNumber={client.phoneNumber}
          email={client.email}
        />
      </main>
    </div>
  );
};

export default MyPage;
