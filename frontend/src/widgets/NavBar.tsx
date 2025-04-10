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

// 향상된 NavBar 스타일
const navStyles = `
  .nav-link {
    position: relative;
    padding: 0.75rem 1.5rem;  /* 좌우 패딩 증가 */
    transition: color 0.3s ease;
    text-align: center;  /* 텍스트 중앙 정렬 */
    display: inline-block;  /* 너비 적용을 위해 변경 */
  }

  .nav-link::after {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 50%;
    width: 0;
    height: 2px;
    background-color: #ffe000;
    transition: width 0.3s ease, left 0.3s ease;
    transform-origin: center;
  }

  .nav-link:hover {
    color: #ffe000;
  }

  .nav-link.active {
    color: #ffe000;
  }

  .nav-link.active::after {
    width: 100%;
    left: 0;
  }
`;

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
          queryKey: ['lawyer', 'profile'],
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
    void navigate('/');
  };

  const AuthComponent = () => {
    return isLogin && profile ? (
      <div className="flex items-center gap-6">
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger className="hover:text-y5">
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
          className="cursor-pointer transition-colors hover:text-y5"
          onClick={handleLogout}
        />
      </div>
    ) : (
      <Link
        to="/login"
        className="transition-colors hover:text-y5"
        onClick={() => void navigate('/login')}
      >
        로그인
      </Link>
    );
  };

  return (
    <>
      <style>{navStyles}</style>
      <nav className="sticky top-0 z-20 flex h-[48px] w-screen items-center justify-between bg-p5 text-xl text-p1 shadow-[0_3px_10px_rgba(0,0,0,0.5)]">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between xl:w-[1200px]">
          <div className="flex">
            <NavLink to="/" className="nav-link">
              홈
            </NavLink>
            <NavLink to="/upload/report" className="nav-link">
              AI 과실비율 측정
            </NavLink>
            <NavLink to="/upload/consultation" className="nav-link">
              변호사 상담신청
            </NavLink>
            <NavLink to="/board/analysis" className="nav-link">
              AI 분석 게시판
            </NavLink>
            <NavLink to="/board/consultation" className="nav-link">
              법률상담 게시판
            </NavLink>
          </div>
          <AuthComponent />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
