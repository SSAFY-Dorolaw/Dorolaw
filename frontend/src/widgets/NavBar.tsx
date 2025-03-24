import { LogOut } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';

function NavBar() {
  return (
    <nav className="flex justify-between bg-p5 text-xl text-p1 w-screen h-[48px] items-center">
      <div className="flex w-[1200px] font-semibold justify-between gap-20 mx-auto items-center">
        <div className="flex font-semibold justify-between gap-20">
          <div>AI 과실비율 측정</div>
          <div>의뢰하기</div>
          <div>게시판</div>
        </div>
        <div className="flex gap-6 items-center">
          <FaUserCircle size={36} />
          <div>의뢰인1234님</div>
          <LogOut strokeWidth={3} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
