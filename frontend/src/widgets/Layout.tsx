import { Outlet } from 'react-router-dom';
import Header from '@/widgets/Header';
import NavBar from '@/widgets/NavBar';
import Footer from '@/widgets/Footer';
import NotificationBell from './NotificationBell';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-p1">
      <Header></Header>
      <NavBar></NavBar>
      <main className="full mx-auto mt-10 flex w-[1200px] grow flex-col items-center">
        <Outlet />
      </main>
      <Footer></Footer>
      <NotificationBell />
    </div>
  );
}

export default Layout;
