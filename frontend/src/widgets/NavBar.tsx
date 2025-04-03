import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { FaUserCircle } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ClientProfile } from '@/entities/clients/model/types';
import { clientApi } from '@/entities/clients/api/clientApi';

function NavBar() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  // 캐시된 client 프로필 데이터 읽기
  const { data: clientProfile } = useQuery<ClientProfile>({
    queryKey: ['client', 'profile'],
    queryFn: clientApi.getProfile,
    enabled: !!token,
  });

  const handleLogout = () => {
    // 로그아웃 처리: 토큰 삭제(예: localStorage에 저장한 경우) 및 프로필 캐시 제거
    // localStorage.removeItem('token'); // 토큰을 저장한 방식에 따라 필요하면 사용
    queryClient.removeQueries({ queryKey: ['client', 'profile'] });
    localStorage.clear();
    // 로그아웃 후 로그인 페이지로 이동하거나 메인 페이지로 이동
    void navigate('/');
  };

  const AuthComponent = () => {
    return clientProfile ? (
      <div className="flex items-center gap-6">
        <NavLink to="/client">
          <div className="flex items-center gap-2">
            {clientProfile ? (
              <img
                src={clientProfile?.profileImage}
                className="size-[36px] rounded-full"
                alt="profile image"
              />
            ) : (
              <FaUserCircle size={36} />
            )}
            <div>{clientProfile?.name} 님</div>
          </div>
        </NavLink>
        <LogOut
          strokeWidth={3}
          className="cursor-pointer"
          onClick={handleLogout}
        />
      </div>
    ) : (
      <Link
        to="/login"
        className="flex items-center gap-2"
        onClick={() => void navigate('/login')}
      >
        로그인
      </Link>
    );
  };

  return (
    <nav className="sticky top-0 z-10 flex h-[48px] w-screen items-center justify-between bg-p5 text-xl text-p1">
      <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-20 font-semibold xl:w-[1200px]">
        <div className="flex justify-between gap-20">
          <NavLink to="/report">AI 과실비율 측정</NavLink>
          <NavLink to="/consultation">변호사 상담신청</NavLink>
          <NavLink to="/board">게시판</NavLink>
        </div>
        <AuthComponent />
      </div>
    </nav>
  );
}

export default NavBar;
