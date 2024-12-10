import { WalletAddressResponse } from "@/types/ntf";
import { SupportedWallets } from "@/types/wallets";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-asmjs";
import { API_URL } from "./utils";

export class WalletHelper {
  public SUPPORTED_WALLETS: SupportedWallets = {
    nami: {
      label: "Nami",
      color: "#349EA3",
    },
    eternl: {
      label: "Eternl",
      color: "#131825",
    },
    nufi: {
      label: "NuFi",
      color: "#212121",
    },
    begin: {
      label: "Begin",
      color: "#3414FC",
    },
    vespr: {
      label: "VESPR",
      color: "#131A26",
    },
  };

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

  private decodeWallet = async (
    address: string
  ): Promise<WalletAddressResponse | null> => {
    try {
      const response = await fetch(
        `${API_URL}/decode-wallet?wallet_address=${address}`
      );
      const data: WalletAddressResponse = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      return null;
    }
  };
}
