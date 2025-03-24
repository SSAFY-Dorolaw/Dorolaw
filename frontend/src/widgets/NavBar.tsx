import { LogOut } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';

function NavBar() {
  return (
    <nav className="flex h-[48px] w-screen items-center justify-between bg-p5 text-xl text-p1">
      <div className="mx-auto flex w-[1200px] items-center justify-between gap-20 font-semibold">
        <div className="flex justify-between gap-20 font-semibold">
          <div>AI 과실비율 측정</div>
          <div>의뢰하기</div>
          <div>게시판</div>
        </div>
        <div className="flex items-center gap-6">
          <FaUserCircle size={36} />
          <div>의뢰인1234님</div>
          <LogOut strokeWidth={3} />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
