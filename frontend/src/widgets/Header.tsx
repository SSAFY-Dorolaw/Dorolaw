import logo from '@/shared/assets/images/logo.svg';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="h-[80px] w-full">
      <div className="mx-auto flex h-full w-[1200px] justify-start">
        <Link to="/">
          <img src={logo} className="h-full items-center" alt="logo" />
        </Link>
        <Link to="/" className="logotext self-end text-5xl text-p5">
          DOROLAW
        </Link>
      </div>
    </header>
  );
}

export default Header;
