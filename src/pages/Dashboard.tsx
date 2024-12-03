import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useWalletContext } from "../providers/WalletProvider";
import { NFT } from "@/types/ntf";

function Dashboard() {
  const navigate = useNavigate();
  const { connectedWalletName, getWalletBalance, getWalletNFTs } =
    useWalletContext();
  const [balance, setBalance] = useState<string | null>(null);
  const [nfts, setNFTs] = useState<NFT[] | null>([]);

  useEffect(() => {
    if (!connectedWalletName) {
      navigate("/connect");
    }
  }, [connectedWalletName, navigate]);

  const fetchBalance = useCallback(async () => {
    const walletBalance = await getWalletBalance();
    setBalance(walletBalance);
  }, [getWalletBalance]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  const fetchNFT = useCallback(async () => {
    const nfts = await getWalletNFTs();
    setNFTs(nfts);
  }, [getWalletNFTs]);

  useEffect(() => {
    fetchNFT();
  }, [fetchNFT]);

  if (!connectedWalletName) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <main className="flex flex-col">Pains</main>
      <p>Connected: {connectedWalletName}</p>
      <p>Balance: {balance || "-"}</p>
      <p>NFTs:</p>
      <div>
        {nfts && nfts.length > 0 ? (
          <ul>
            {nfts.map((nft, index) => (
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
    </div>
  );
}

export default Dashboard;
