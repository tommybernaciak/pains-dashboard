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
        <Card className="bg-white w-[420px] px-6">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold uppercase py-4 text-center">
              Connect wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 items-center">
            {Object.entries(supportedWallets).map(([key, wallet]) => (
              <Button
                key={key}
                style={{ backgroundColor: wallet.color }}
                className={cn(
                  ` text-white flex flex-col justify-center items-center px-4 py-5 rounded-xl w-full h-12`,
                  isAvailable(key)
                    ? "cursor-pointer hover:bg-[#CC3366] hover:text-white"
                    : "cursor-not-allowed"
                )}
                variant="outline"
                disabled={!isAvailable(key)}
                onClick={() => connectWallet(key)}
              >
                <p>{wallet.label}</p>
                <p>{isAvailable(key) ? "" : "(Not available)"}</p>
              </Button>
            ))}

            <Button className="text-accent font-semibold" variant={"link"}>
              Go back to main page
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Connect;
