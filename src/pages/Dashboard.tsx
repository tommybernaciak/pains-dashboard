import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useWalletContext } from "../providers/WalletProvider";

function Dashboard() {
  const navigate = useNavigate();
  const {
    connectedWalletName,
    getWalletBalance,
    getWalletNFTs,
    fetchMetadata,
    resolveIpfsUri,
  } = useWalletContext();
  const [balance, setBalance] = useState<string | null>(null);
  const [nfts, setNFTs] = useState<
    | {
        policyId: string;
        assetName: string;
        imageUrl?: string | null;
        metadata?: { image: string; name: string; website: string };
      }[]
    | null
  >([]);

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

  // const fetchNFTs = useCallback(async () => {
  //   try {
  //     const nfts = await getWalletNFTs();
  //     if (!nfts) {
  //       return;
  //     }
  //     const nftData = await Promise.all(
  //       nfts.map(async (nft) => {
  //         const imageUrl = await fetchNFT(nft.policyId, nft.assetName);
  //         return { ...nft, imageUrl };
  //       })
  //     );

  //     setNFTs(nftData);
  //   } catch (error) {
  //     console.error("Failed to fetch NFTs:", error);
  //   }
  // }, [fetchNFT, getWalletNFTs]);

  // useEffect(() => {
  //   fetchNFTs();
  // }, [fetchNFTs]);

  const fetchNFTMetadata = useCallback(async () => {
    try {
      const nfts = await getWalletNFTs();
      if (!nfts) {
        return;
      }
      const nftData = await Promise.all(
        nfts.map(async (nft) => {
          const metadata = await fetchMetadata(nft.policyId, nft.assetName);
          console.log(metadata);
          return { ...nft, metadata };
        })
      );

      setNFTs(nftData);
    } catch (error) {
      console.error("Failed to fetch NFTs:", error);
    }
  }, [fetchMetadata, getWalletNFTs]);

  useEffect(() => {
    fetchNFTMetadata();
  }, [fetchNFTMetadata]);

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
                {nft.metadata?.image ? (
                  <img
                    src={resolveIpfsUri(nft.metadata?.image) || ""}
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
