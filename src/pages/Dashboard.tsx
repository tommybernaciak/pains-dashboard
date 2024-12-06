import { Button } from "@/components/ui/button";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useWalletContext } from "../providers/WalletProvider";
import NftCollection from "@/components/custom/nft-collection";
import Upgrade from "@/components/custom/upgrade";
import Navbar from "@/components/custom/navbar";

function Dashboard() {
  const navigate = useNavigate();
  const { connectedWalletName, connectedWallet } = useWalletContext();

  useEffect(() => {
    if (!connectedWalletName || !connectedWallet) {
      navigate("/connect");
    }
  }, [connectedWallet, connectedWalletName, navigate]);

  if (!connectedWalletName) {
    return <p>Loading...</p>;
  }

  if (!connectedWallet) {
    return <p>Error connecting wallet.</p>;
  }

  return (
    <>
      <Navbar />
      <div className="justify-items-center w-full py-4 px-20">
        <div className="flex nowrap justify-between items-start gap-5 w-full min-w-[960px]">
          <div className="block flex-grow flex-shrink basis-auto self-auto order-0">
            <h1>Pains</h1>
            <p>Connected: {connectedWalletName}</p>
            <p>Balance: {connectedWallet?.adaAmount}</p>
            <p>NFTs:</p>
            <Button onClick={() => navigate("/claim")}>Claim</Button>
            <Upgrade />
          </div>
          <div className="block flex-grow-2 flex-shrink basis-auto self-auto order-0">
            <div>
              {connectedWallet.nfts.length ? (
                <ul>
                  {connectedWallet.nfts.map((nft, index) => (
                    <li key={index}>
                      <strong>Policy ID:</strong> {nft.policyId}
                      <br />
                      <strong>Asset:</strong> {nft.assetName}
                      <br />
                      <strong>Asset Name:</strong> {nft.metadata?.name} (
                      {nft.metadata?.website})
                      <br />
                      {nft.imageUrl ? (
                        <img
                          src={nft.imageUrl}
                          alt={nft.metadata?.name}
                          style={{ maxWidth: "200px", maxHeight: "200px" }}
                        />
                      ) : (
                        <p>No image available</p>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No NFTs found.</p>
              )}
            </div>
            <NftCollection />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
