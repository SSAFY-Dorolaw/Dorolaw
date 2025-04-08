import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ClipboardList, LogOut, User } from 'lucide-react';
import { FaBalanceScale, FaUserCircle } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ClientProfile } from '@/entities/clients/model/types';
import { clientApi } from '@/entities/clients/api/clientApi';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BsFiletypeAi } from 'react-icons/bs';
import { useAuthStore } from '@/entities/auth/model/store';
import { LawyerProfile } from '@/entities/lawyers/model/types';
import { lawyerApi } from '@/entities/lawyers/api/lawyerApi';
import { useEffect, useState } from 'react';

function NavBar() {
  const navigate = useNavigate();
  const { role, isLogin, logout } = useAuthStore();
  const [profile, setProfile] = useState<ClientProfile | LawyerProfile | null>(
    null,
  );
  const queryClient = useQueryClient();
  const token = localStorage.getItem('token');

  // 캐시된 client 프로필 데이터 읽기
  const { data: clientProfile } =
    role === 'GENERAL'
      ? useQuery<ClientProfile>({
          queryKey: ['client', 'profile'],
          queryFn: clientApi.getProfile,
          enabled: !!token && isLogin,
        })
      : useQuery<LawyerProfile>({
          queryKey: ['lawyer', 'profile]'],
          queryFn: lawyerApi.getMyProfile,
          enabled: !!token && isLogin,
        });

  useEffect(() => {
    if (clientProfile && isLogin) {
      setProfile(clientProfile);
    } else if (!isLogin) {
      setProfile(null);
    }
  }, [clientProfile, isLogin]);

  const handleLogout = () => {
    queryClient.clear();
    localStorage.clear();
    setProfile(null);
    logout();
    navigate('/');
  };

  const AuthComponent = () => {
    return isLogin && profile ? (
      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="flex items-center gap-2">
              {clientProfile ? (
                <img
                  src={profile.profileImage}
                  className="size-[36px] rounded-full"
                  alt="profile image"
                />
              ) : (
                <FaUserCircle size={36} />
              )}
              <div>
                {`${profile.name} ${role === 'LAWYER' || role === 'CERTIFIED_LAWYER' ? '변호사' : ''}`}
                님
              </div>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="font-bold text-p4">
            <DropdownMenuLabel className="text-p5">
              My Account
            </DropdownMenuLabel>

            <DropdownMenuSeparator />
            {role === 'GENERAL' ? (
              <>
                <DropdownMenuItem onClick={() => void navigate('/client')}>
                  <User />
                  <span>마이페이지</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void navigate('/client/requests')}
                >
                  <ClipboardList />
                  <span>나의 의뢰내역</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void navigate('/client/consultations')}
                >
                  <FaBalanceScale />
                  <span>나의 상담내역</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void navigate('/client/analyses')}
                >
                  <BsFiletypeAi />
                  <span>AI 과실비율 분석내역</span>
                </DropdownMenuItem>
              </>
            ) : (
              <>
                <DropdownMenuItem onClick={() => void navigate('/lawyer')}>
                  <User />
                  <span>마이페이지</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void navigate('/lawyer/requests')}
                >
                  <ClipboardList />
                  <span>나의 답변내역</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => void navigate('/lawyer/consultations')}
                >
                  <FaBalanceScale />
                  <span>나의 상담내역</span>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

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
