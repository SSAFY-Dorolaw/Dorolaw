import RequestList from '@/features/mypage/RequestList';

function MyRequests() {
  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <div className="flex flex-col">
          <h2>나의 의뢰내역</h2>
        </div>
      </header>
      <main>
        <div className="mb-10 max-h-full">
          <RequestList />
        </div>
      </main>
    </div>
  );
}

export default MyRequests;
