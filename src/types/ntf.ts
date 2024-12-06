export type NFTMetadata = { name?: string; image?: string; website?: string };
export type NFT = {
  policyId: string;
  assetName: string;
  metadata: NFTMetadata;
  imageUrl?: string | null;
};

export interface WalletAddressResponse {
  address: string;
  adaAmount: number;
  nfts: {
    metadata: any;
    imageUrl: string | null;
    policyId: string;
    assetName: string;
    unit: string;
  }[];
}
