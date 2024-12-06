import { Wallet } from "@/types/cardano";
import { NFT, WalletAddressResponse } from "@/types/ntf";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-asmjs";

export class WalletHelper {
  public SUPPORTED_WALLETS = ["nami", "eternl", "nufi", "begin", "vespr"];
  private PAINS_POLICY_ID =
    "12efb6c78a821bfc8ab8b8dc6814aff9a695019ededa872df1b652bf";

  public checkForWallets(count = 0): string[] {
    console.log("Checking for Cardano wallets...");
    let foundWallets: string[] = [];
    if (typeof window !== "undefined" && window.cardano) {
      foundWallets = Object.keys(window.cardano).filter((key) => {
        return window.cardano && window.cardano[key]?.enable;
      });
      console.log("Available Cardano wallets:", foundWallets);
      if (foundWallets.length === 0 && count < 3) {
        setTimeout(() => {
          this.checkForWallets(count + 1);
        }, 1000);
      } else {
        return foundWallets;
      }
    }
    return foundWallets;
  }

  public async connectWallet(
    wallet: string
  ): Promise<WalletAddressResponse | null> {
    if (window.cardano && window.cardano[wallet]?.enable) {
      try {
        const walletApi = await window.cardano[wallet].enable();
        console.log("Connected wallet:", wallet);

        const addresses = await walletApi.getUsedAddresses();
        console.log("Addresses:", addresses);
        const decoded = this.decodeAddress(addresses[0]);
        console.log("Decoded Address:", decoded);
        if (!decoded) {
          return null;
        }

        const walletResponse = await this.decodeWallet(decoded);
        console.log("Wallet data:", walletResponse);
        return walletResponse;
      } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
      }
    }
    return null;
  }

  // public async getWalletBalance(
  //   connectedWallet: Wallet
  // ): Promise<string | null> {
  //   try {
  //     const rawBalance = await this.getRawBalance(connectedWallet);
  //     if (!rawBalance) {
  //       return null;
  //     }

  //     const balanceValue = this.decodeBalance(rawBalance);
  //     if (!balanceValue) {
  //       return null;
  //     }
  //     const adaAmount = balanceValue.coin().to_str();
  //     console.log("Ada Balance:", adaAmount);
  //     return adaAmount;
  //   } catch (error) {
  //     console.error("Error fetching wallet balance:", error);
  //     return null;
  //   }
  // }

  // public async getWalletNFTs(connectedWallet: Wallet): Promise<NFT[] | null> {
  //   if (!connectedWallet) {
  //     return null;
  //   }
  //   try {
  //     const rawBalance = await this.getRawBalance(connectedWallet);
  //     if (!rawBalance) {
  //       return null;
  //     }
  //     const balanceValue = this.decodeBalance(rawBalance);
  //     if (!balanceValue) {
  //       return null;
  //     }

  //     const multiAssets = balanceValue.multiasset();
  //     const foundAssets = this.findAssets(multiAssets);
  //     console.log("Found NFTs:", foundAssets);

  //     const nftData = await Promise.all(
  //       foundAssets.map(async (nft) => {
  //         const metadata = await this.fetchMetadata(
  //           nft.policyId,
  //           nft.assetName
  //         );
  //         console.log(metadata);
  //         return {
  //           ...nft,
  //           metadata,
  //           imageUrl: this.resolveIpfsUri(metadata?.image),
  //         };
  //       })
  //     );

  //     return nftData;
  //   } catch (error) {
  //     console.error("Error fetching NFTs:", error);
  //     return [];
  //   }
  // }

  // private async getRawBalance(connectedWallet: Wallet): Promise<string | null> {
  //   try {
  //     console.log("WALLET API:", connectedWallet);

  //     const rawBalance = await connectedWallet.getBalance();
  //     console.log("Raw balance:", rawBalance);
  //     return rawBalance;
  //   } catch (error) {
  //     console.error("Wallet API error:", error);
  //     if (error instanceof Error) {
  //       console.error("Error Message:", error.message);
  //     }
  //     return null;
  //   }
  // }

  // private decodeBalance(
  //   rawBalance: string
  // ): CardanoSerializationLib.Value | null {
  //   if (!CardanoSerializationLib) {
  //     console.error("CardanoSerializationLib not loaded!");
  //     return null;
  //   }

  //   try {
  //     const bytes = this.convertHexStringToBytes(rawBalance);
  //     const balanceValue = CardanoSerializationLib.Value.from_bytes(bytes);
  //     return balanceValue;
  //   } catch (error) {
  //     console.error("Error decoding balance:", error);
  //     return null;
  //   }
  // }

  private decodeAddress = (hexAddress: string): string | null => {
    try {
      if (!CardanoSerializationLib) {
        console.error("CardanoSerializationLib not loaded!");
        return null;
      }

      const addressBytes = this.convertHexStringToBytes(hexAddress);
      const address = CardanoSerializationLib.Address.from_bytes(addressBytes);
      return address.to_bech32();
    } catch (error) {
      console.error("Failed to decode address:", error);
      return "";
    }
  };

  private convertHexStringToBytes = (hexString: string): Uint8Array => {
    const bytes = Uint8Array.from(
      hexString.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
    );
    return bytes;
  };

  // private findAssets = (
  //   multiAssets: CardanoSerializationLib.MultiAsset | undefined
  // ): { policyId: string; assetName: string }[] => {
  //   const nfts: { policyId: string; assetName: string }[] = [];

  //   if (multiAssets) {
  //     const policies = multiAssets.keys();
  //     for (let i = 0; i < policies.len(); i++) {
  //       const policyId = policies.get(i).to_hex();
  //       if (!policyId) {
  //         console.log("Policy ID not found in asset");
  //         continue;
  //       }
  //       if (policyId !== this.PAINS_POLICY_ID) {
  //         console.log("Not a PAINS NFT");
  //         continue;
  //       }
  //       const assets = multiAssets.get(policies.get(i));
  //       if (!assets) {
  //         console.log("Assets not found");
  //         continue;
  //       }
  //       const assetNames = assets.keys();

  //       for (let j = 0; j < assetNames.len(); j++) {
  //         const assetName = assetNames.get(j);
  //         if (!assetName) {
  //           console.log("Asset name not found");
  //           continue;
  //         }
  //         const asset = assets.get(assetName);
  //         if (!asset) {
  //           console.log("Asset not found");
  //           continue;
  //         }

  //         const assetQuantity = asset.to_str();

  //         // Check if it's an NTF
  //         if (assetQuantity === "1") {
  //           nfts.push({
  //             policyId,
  //             assetName: new TextDecoder("utf-8").decode(assetName.name()),
  //           });
  //         }
  //       }
  //     }
  //   }

  //   return nfts;
  // };

  // private resolveIpfsUri = (ipfsUri: string): string | null => {
  //   if (ipfsUri.startsWith("ipfs://")) {
  //     return `https://ipfs.io/ipfs/${ipfsUri.split("ipfs://")[1]}`;
  //   }
  //   return ipfsUri || null;
  // };

  private decodeWallet = async (
    address: string
  ): Promise<WalletAddressResponse | null> => {
    try {
      const response = await fetch(
        `http://localhost:3000/decode-wallet?wallet_address=${address}`
      );
      const data: WalletAddressResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      return null;
    }
  };

  // private fetchWalletBalance = async (address: string) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/wallet-balance?wallet_address=${address}`
  //     );
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching wallet balance:", error);
  //     return null;
  //   }
  // };

  // private fetchMetadata = async (policyId: string, assetName: string) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/nft-metadata?policy_id=${policyId}&asset_name=${assetName}`
  //     );
  //     const data = await response.json();
  //     return data;
  //   } catch (error) {
  //     console.error("Error fetching metadata via blockfrost:", error);
  //     return null;
  //   }
  // };
}
