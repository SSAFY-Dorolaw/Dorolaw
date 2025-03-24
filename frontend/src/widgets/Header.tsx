import logo from '@/shared/assets/images/logo.svg';

function Header() {
  return (
    <header className="h-[80px] w-full">
      <div className="mx-auto flex h-full w-[1200px] justify-start">
        <img src={logo} className="h-full items-center" alt="logo" />
        <div className="flex items-end">
          <span className="logotext text-5xl text-p5">DOROLAW</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
