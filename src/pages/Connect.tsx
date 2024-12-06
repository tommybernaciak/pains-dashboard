import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useWalletContext } from "@/providers/WalletProvider";
import Logo from "../assets/pains-logo-lg.png";

function Connect() {
  const { supportedWallets, connectWallet, isAvailable } = useWalletContext();

  return (
    <div className="items-center justify-items-center p-20">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="logo" className="h-[65px] mb-28" />
        <Card className="bg-white w-[420px] px-10">
          <CardHeader>
            <CardTitle className="text-2xl font-bold uppercase py-6 text-center">
              Connect wallet
            </CardTitle>
          </CardHeader>
          <CardContent>
            {supportedWallets.map((wallet) => (
              <Button
                key={wallet}
                className={cn(
                  "bg-[#9C3390] text-white flex flex-col justify-center items-center px-4 py-5 rounded-md w-full",
                  isAvailable(wallet)
                    ? "cursor-pointer hover:bg-[#CC3366] hover:text-white"
                    : "cursor-not-allowed"
                )}
                variant="outline"
                disabled={!isAvailable(wallet)}
                onClick={() => connectWallet(wallet)}
              >
                <p>{wallet}</p>
                <p>{isAvailable(wallet) ? "" : "(Not available)"}</p>
              </Button>
            ))}

            <div className="text-accent">Go back to main page</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Connect;
