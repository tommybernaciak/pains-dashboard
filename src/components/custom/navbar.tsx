import Logo from "/assets/pains-logo.png";
import { Badge } from "@/components/ui/badge";
import wallet from "/icons/wallet.svg";

function Navbar({ address }: { address?: string }) {
  return (
    <div className="w-full h-[72px] flex justify-between items-center px-4 py-2">
      <img src={Logo} alt="logo" />

      {address && (
        <Badge
          variant="secondary"
          className="w-36 h-10 bg-[#344054] hover:bg-[#344054]/90 flex gap-2 items-center justify-center"
        >
          <img src={wallet} />
          <p className="text-ellipsis overflow-hidden w-20 font-clash font-semibold text-sm">
            {address}
          </p>
        </Badge>
      )}
    </div>
  );
}

export default Navbar;
