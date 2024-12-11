import { NFT } from "@/types/ntf";

function NftImage({ nft }: { nft: NFT }) {
  return (
    <>
      {nft.imageUrl ? (
        <div>
          <img
            src={nft.imageUrl}
            alt={nft.metadata.onchain_metadata.name}
            className="rounded-xl w-full max-w-96 aspect-square"
          />
          <p className="font-inter font-bold text-primary pt-3">
            {nft.metadata?.onchain_metadata?.name || "No name"}
          </p>
        </div>
      ) : (
        <div>
          <div className="bg-[#d4d5e1] w-full max-w-96 aspect-square rounded-xl"></div>
          <p className="font-inter font-bold text-primary pt-3">
            Image not found!
          </p>
        </div>
      )}
    </>
  );
}

export default NftImage;
