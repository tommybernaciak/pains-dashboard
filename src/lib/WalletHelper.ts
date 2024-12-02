import { Wallet } from "@/types/cardano";

export class WalletHelper {
  static SUPPORTED_WALLETS = ["nami", "eternl", "nufi", "begin", "vespr"];

  static checkForWallets(count = 0): string[] {
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

  static async connectWallet(wallet: string): Promise<Wallet | null> {
    if (window.cardano && window.cardano[wallet]?.enable) {
      try {
        const walletApi = await window.cardano[wallet].enable();
        console.log("Connected wallet:", wallet);
        return walletApi;
      } catch (error) {
        console.error("Error connecting wallet:", error);
        return null;
      }
    }
    return null;
  }
}
