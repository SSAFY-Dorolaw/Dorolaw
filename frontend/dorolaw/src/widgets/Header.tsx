import logo from '../assets/images/logo.svg';

function Header() {
  return (
    <header class="flex w-full">
      <img src={logo} class="logo" alt="logo" />
      <div class="text-7xl text-p5 logotext">DOROLAW</div>
    </header>
  );
}

export default Header;
