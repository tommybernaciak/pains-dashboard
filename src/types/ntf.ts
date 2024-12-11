export type NFT = {
  policyId: string;
  assetName: string;
  metadata: AssetMetadata;
  imageUrl?: string | null;
  unit: string;
};

export interface WalletAddressResponse {
  address: string;
  adaAmount: number;
  nfts: NFT[];
}

export interface AssetMetadata {
  asset: string;
  policy_id: string;
  asset_name: string;
  fingerprint: string;
  quantity: string;
  onchain_metadata: Partial<OnchainMetadata>;
  onchain_metadata_standard: string;
}

interface OnchainMetadata {
  Body: string;
  Eyes: string;
  Hair: string;
  name: string;
  Mouth: string;
  files: MetadataFile[];
  image: string;
  Extras: string;
  Clothes: string;
  website: string;
  Eyebrows: string;
  mediaType: string;
  Background: string;
  Accessories: string;
}

interface MetadataFile {
  src: string;
  name: string;
  mediaType: string;
}
