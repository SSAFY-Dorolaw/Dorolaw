import { Outlet } from 'react-router-dom';
import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-p1">
      <Header></Header>
      <NavBar></NavBar>
      <main>
        <Outlet />
      </main>
      <Footer></Footer>
    </div>
  );
}

export default Layout;
