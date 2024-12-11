import { useWalletContext } from "@/providers/WalletProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NftImage from "./nft-image";

function NftCollection() {
  const { connectedWallet } = useWalletContext();

  if (!connectedWallet) {
    return null;
  }

  const nfts = connectedWallet.nfts;
  const gridClass = nfts.length > 6 ? "grid-cols-3" : "grid-cols-2";

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold font-clash">
          Your pains:
        </CardTitle>
      </CardHeader>
      <CardContent className={`grid ${gridClass} gap-4`}>
        {nfts.map((nft, index) => (
          <NftImage key={index} nft={nft} />
        ))}
      </CardContent>
    </Card>
  );
}

export default NftCollection;
