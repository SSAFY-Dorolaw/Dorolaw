import { Outlet, useLocation } from 'react-router-dom';
import Header from '@/widgets/Header';
import NavBar from '@/widgets/NavBar';
import Footer from '@/widgets/Footer';
import NotificationBell from './NotificationBell';

const Layout = () => {
  const location = useLocation();
  const isMainPage = location.pathname === '/'; // 메인 페이지 경로 확인
  const isReportPage = location.pathname === '/report'; // 분석 업로드 경로 확인
  const isConsultingPage = location.pathname === '/consultation'; // 의뢰 업로드 경로 확인

  return (
    <div className="flex min-h-screen flex-col bg-p1">
      <Header></Header>
      <NavBar></NavBar>
      <main
        className={`full mx-auto flex w-[1200px] grow flex-col items-center ${isMainPage || isReportPage || isConsultingPage ? '' : 'mt-10'}`}
      >
        <Outlet />
      </main>
      <Footer></Footer>
      <NotificationBell /> {/* Router 내부에서 렌더링 */}
    </div>
  );
};

export default Layout;
