import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn, PAINS_URL } from "@/lib/utils";
import { useWalletContext } from "@/providers/WalletProvider";
import Logo from "../assets/pains-logo-lg.png";

function Connect() {
  const { supportedWallets, connectWallet, isAvailable } = useWalletContext();

  const redirectToPage = () => {
    window.open(PAINS_URL, "_blank");
  };

  return (
    <div className="items-center justify-items-center p-20">
      <div className="flex flex-col items-center">
        <img src={Logo} alt="logo" className="h-[65px] mb-28" />
        <Card className="bg-white w-[420px] px-6">
          <CardHeader>
            <CardTitle className="text-2xl font-clash font-semibold uppercase pt-4 text-center">
              Connect wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 items-center">
            {Object.entries(supportedWallets).map(([key, wallet]) => (
              <Button
                key={key}
                style={{ backgroundColor: wallet.color }}
                className={cn(
                  ` text-white flex justify-center hover:justify-between transition-all ease-in-out delay-150 duration-800 items-center align-middle px-10 py-5 rounded-xl w-full h-12 font-bold group`,
                  isAvailable(key)
                    ? "cursor-pointer hover:text-white"
                    : "cursor-not-allowed"
                )}
                variant="outline"
                disabled={!isAvailable(key)}
                onClick={() => connectWallet(key)}
              >
                <div className="flex justify-center items-center align-middle gap-2 transform transition-transform duration-800 translate-x-[20px] group-hover:translate-x-0 ">
                  <img
                    src={`/assets/${key}.png`}
                    alt={`${key}-logo`}
                    className="w-6 h-6"
                  />
                  <p>{wallet.label}</p>
                </div>
                <img
                  src={`/icons/arrow-narrow-right.svg`}
                  alt="arrow-right"
                  className="w-4 h-4 transform transition-transform duration-800 translate-x-[-20px] opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                />
              </Button>
            ))}

            <Button
              className="text-accent font-semibold font-clash"
              variant={"link"}
              onClick={redirectToPage}
            >
              Go back to main page
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Connect;
