import RequestList from '@/features/mypage/RequestList';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

function MyConsultations() {
  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <div className="flex flex-col">
          <h2>나의 의뢰내역</h2>
        </div>
      </header>
      <main>
        <div className="max-h-full">
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
      <nav>
        <div className="mx-auto my-10 flex items-center justify-center gap-4">
          <IoChevronBack size={12} />
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <IoChevronForward size={12} />
        </div>
      </nav>
    </div>
  );
}

export default MyConsultations;
