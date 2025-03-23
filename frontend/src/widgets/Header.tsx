import logo from '@/shared/assets/images/logo.svg';

function Header() {
  return (
    <header className="flex w-full">
      <img src={logo} className="logo" alt="logo" />
      <div className="text-7xl text-p5 logotext">DOROLAW</div>
    </header>
  );
}

export default Header;
