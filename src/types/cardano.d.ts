export {};

export interface Wallet {
  getBalance: () => Promise<string>;
  getUsedAddresses: () => Promise<string[]>;
}

interface Cardano {
  [key: string]: {
    enable?: () => Promise<Wallet>;
  };
}

declare global {
  interface Window {
    cardano?: Cardano;
  }
}
