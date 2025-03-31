import { Link, NavLink } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { useState } from 'react';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  const toggleLogin = () => {
    setIsLoggedIn((prev) => !prev);
    console.log(isLoggedIn);
  };

  const AuthComponent = () => {
    return isLoggedIn ? (
      <div className="flex items-center gap-6">
        <NavLink to="/mypage">
          <div className="flex items-center gap-2">
            <FaUserCircle size={36} />
            <div>의뢰인1234님</div>
          </div>
        </NavLink>
        <LogOut
          strokeWidth={3}
          className="cursor-pointer"
          onClick={toggleLogin}
        />
      </div>
    ) : (
      <Link
        to="/login"
        className="flex items-center gap-2"
        onClick={toggleLogin}
      >
        로그인
      </Link>
    );
  };

  return (
    <nav className="flex h-[48px] w-screen items-center justify-between bg-p5 text-xl text-p1">
      <div className="mx-auto flex w-[1200px] items-center justify-between gap-20 font-semibold">
        <div className="flex justify-between gap-20">
          <NavLink to="/upload">AI 과실비율 측정</NavLink>
          <NavLink to="/consultation">변호사 상담신청</NavLink>
          <NavLink to="/board">게시판</NavLink>
        </div>
        <AuthComponent />
      </div>
    </nav>
  );
}

export default NavBar;
