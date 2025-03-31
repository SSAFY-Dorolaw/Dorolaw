import ReservationList from '@/features/mypage/ReservationList';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const MyReservations = () => {
  return (
    <div className="flex max-w-[1200px] flex-col gap-4 xl:w-[1200px]">
      <header>
        <h2>나의 상담내역</h2>
      </header>
      <main>
        <ReservationList />
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
};

export default MyReservations;
