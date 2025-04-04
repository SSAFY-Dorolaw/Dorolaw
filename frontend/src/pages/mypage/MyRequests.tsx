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
          <div className="flex gap-2">
            {/* 추후 dropdown으로 */}
            <button className="rounded-[10px] bg-p5 px-12 py-2 text-p1">
              필터1
            </button>
            <button className="rounded-[10px] bg-p5 px-12 py-2 text-p1">
              필터2
            </button>
          </div>
          <RequestList />
        </div>
      </main>
    </div>
  );
}

export default MyRequests;
