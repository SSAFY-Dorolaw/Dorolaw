import { useAuthStore } from '@/entities/auth/model/store';
import RequestList from '@/features/mypage/RequestList';
import LawyerRequestList from '@/pages/mypage/lawyer/LawyerRequestList';

function MyRequests() {
  const { role } = useAuthStore.getState();

  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <div className="flex flex-col">
          <h2>{role === 'GENERAL' ? '나의 의뢰내역' : '나의 답변내역'}</h2>
        </div>
      </header>
      <main>
        <div className="mb-10 max-h-full">
          {role === 'GENERAL' ? <RequestList /> : <LawyerRequestList />}
        </div>
      </main>
    </div>
  );
}

export default MyRequests;
