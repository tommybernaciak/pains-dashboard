export type NFTMetadata = { name?: string; image?: string; website?: string };
export type NFT = {
  policyId: string;
  assetName: string;
  metadata: NFTMetadata;
  imageUrl?: string | null;
};
