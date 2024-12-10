import { NFT } from "@/types/ntf";

function NftImage({ nft }: { nft: NFT }) {
  return (
    <>
      {nft.imageUrl ? (
        <img
          src={nft.imageUrl}
          alt={nft.metadata?.name}
          style={{ maxWidth: "200px", maxHeight: "200px" }}
        />
      ) : (
        <p>No image available</p>
      )}
    </>
  );
}

export default NftImage;
