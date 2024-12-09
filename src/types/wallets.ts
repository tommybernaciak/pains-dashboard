export interface SupportedWallet {
  label: string;
  color: string;
}

export type SupportedWallets = Record<string, SupportedWallet>;
