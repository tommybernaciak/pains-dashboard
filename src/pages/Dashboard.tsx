import Claim from "@/components/custom/claim";
import Navbar from "@/components/custom/navbar";
import NftCollection from "@/components/custom/nft-collection";
import Upgrade from "@/components/custom/upgrade";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useWalletContext } from "../providers/WalletProvider";
import EmptyPage from "@/components/custom/empty-page";
import { Button } from "@/components/ui/button";
import { BUY_NFTS_URL } from "@/lib/utils";
import arrow from "/icons/arrow-up-right.svg";

function Dashboard() {
  const navigate = useNavigate();
  const { connectedWalletName, connectedWallet } = useWalletContext();

  const redirectToPage = () => {
    window.open(BUY_NFTS_URL, "_blank");
  };

  useEffect(() => {
    if (!connectedWalletName || !connectedWallet) {
      navigate("/connect");
    }
  }, [connectedWallet, connectedWalletName, navigate]);

  if (!connectedWalletName) {
    return <EmptyPage text="Loading..." />;
  }

  if (!connectedWallet) {
    return <EmptyPage text="Error - wallet not connected" />;
  }

  // TODO: fix icon, fix hover color
  if (!connectedWallet.nfts.length) {
    return (
      <EmptyPage text="you don't have any pains yet  ;-( but you can !">
        <Button
          className="bg-accent text-white font-semibold font-clash text-xl hover:!bg-accent/80"
          onClick={redirectToPage}
        >
          Buy NFT’s <img src={arrow} />
        </Button>
      </EmptyPage>
    );
  }

  return (
    <div className="flex flex-col">
      <Navbar address={connectedWallet.address} />
      <div className="justify-items-center w-full py-16 px-20">
        <div className="flex nowrap justify-between items-start gap-5 w-full min-w-[960px]">
          <div className="flex flex-col flex-grow gap-6 min-w-[400px]">
            <Claim />
            <Upgrade />
          </div>
          <div className="block flex-grow-2">
            <NftCollection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
