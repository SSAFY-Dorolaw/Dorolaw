import logo from '@/shared/assets/images/logo.svg';

function Header() {
  return (
    <header className="flex w-full">
      <img src={logo} className="logo" alt="logo" />
      <div className="logotext text-7xl text-p5">DOROLAW</div>
    </header>
  );
}

export default Header;
