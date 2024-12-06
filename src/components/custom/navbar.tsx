import Logo from "../../assets/pains-logo.png";

function Navbar() {
  return (
    <div className="w-full h-[72px] flex justify-between items-center px-10 py-4">
      <img src={Logo} alt="logo" />
    </div>
  );
}

export default Navbar;
