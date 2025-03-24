import { Outlet } from "react-router-dom";
import Header from "./Header";
import NavBar from "./NavBar";

function Layout() {
  return (
    <div>
      <Header />
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;