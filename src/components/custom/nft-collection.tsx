import { useWalletContext } from "@/providers/WalletProvider";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import NftImage from "./nft-image";

function NftCollection() {
  const { connectedWallet } = useWalletContext();

  if (!connectedWallet) {
    return null;
  }

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle className="text-2xl font-semibold font-clash">
          Your pains:
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 grid-rows-4 gap-4">
        {connectedWallet.nfts.map((nft, index) => (
          <NftImage key={index} nft={nft} />
        ))}
      </CardContent>
    </Card>
  );
}

export default NftCollection;
