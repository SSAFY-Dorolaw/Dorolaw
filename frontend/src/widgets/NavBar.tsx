function NavBar() {
  return (
    <nav className="flex justify-between">
      <div className="flex">
        <div>메뉴1</div>
        <div>메뉴2</div>
        <div>홈</div>
      </div>
      <div className="flex">
        <div className="rounded-full bg-p5">프사</div>
      </div>
    </nav>
  );
}

export default NavBar;
