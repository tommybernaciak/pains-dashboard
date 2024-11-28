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

function Connect() {
  const { supportedWallets, connectWallet, isAvailable } = useWalletContext();
  return (
    <div className="bg-[#F6F5FF] items-center justify-items-center min-h-screen p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Card className="bg-white">
          <CardHeader>
            <CardTitle className="font-[family-name:var(--font-monument)] uppercase text-2xl font-bold">
              Connect wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 grid-rows-4 gap-4">
            {supportedWallets.map((wallet) => (
              <Button
                key={wallet}
                className={cn(
                  "bg-[#9C3390] text-white flex flex-col justify-center items-center px-4 py-5 rounded-md",
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
          </CardContent>
          <CardFooter>
            <p>Card Footer</p>
          </CardFooter>
        </Card>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <p>Pains footer</p>
      </footer>
    </div>
  );
}

export default Connect;
