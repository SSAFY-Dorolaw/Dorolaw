import logo from '@/shared/assets/images/logo.svg';

function Header() {
  return (
    <header className="w-full h-[80px]">
      <div className="w-[1200px] h-full flex justify-start mx-auto">
        <img src={logo} className="h-full items-center" alt="logo" />
        <div className="flex items-end">
          <span className="logotext text-5xl text-p5">DOROLAW</span>
        </div>
      </div>
    </header>
  );
}

export default Header;
