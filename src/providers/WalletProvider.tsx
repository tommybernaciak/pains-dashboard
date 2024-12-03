"use client";

import { WalletHelper } from "@/lib/WalletHelper";
import { Wallet } from "@/types/cardano";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { createGenericContext } from "./useGenericContext";
import { NFT } from "@/types/ntf";

interface IWalletContext {
  supportedWallets: string[];
  connectedWalletName: string | null;
  connectWallet: (wallet: string) => void;
  isAvailable: (wallet: string) => boolean;
  getWalletBalance: () => Promise<string | null>;
  getWalletNFTs: () => Promise<NFT[] | null>;
}

const [useWalletContext, WalletContextProvider] =
  createGenericContext<IWalletContext>();

const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [connectedWalletName, setConnectedWalletName] = useState<string | null>(
    null
  );
  const [connectedWallet, setConnectedWallet] = useState<Wallet | null>(null);
  const walletHelper = useMemo(() => new WalletHelper(), []);

  useEffect(() => {
    setAvailableWallets(walletHelper.checkForWallets());
  }, [walletHelper]);

  const connectWallet = async (wallet: string) => {
    const walletApi = await walletHelper.connectWallet(wallet);
    if (walletApi) {
      setConnectedWalletName(wallet);
      setConnectedWallet(walletApi);
      navigate("/");
    }
  };

  const isAvailable = (wallet: string) => availableWallets.includes(wallet);

  const getWalletBalance = async () => {
    if (!connectedWallet) {
      return null;
    }
    return walletHelper.getWalletBalance(connectedWallet);
  };

  const getWalletNFTs = async (): Promise<
    { policyId: string; assetName: string }[] | null
  > => {
    if (!connectedWallet) {
      return null;
    }
    return walletHelper.getWalletNFTs(connectedWallet);
  };

  return (
    <WalletContextProvider
      value={{
        supportedWallets: walletHelper.SUPPORTED_WALLETS,
        connectedWalletName,
        connectWallet,
        isAvailable,
        getWalletBalance,
        getWalletNFTs,
      }}
    >
      {children}
    </WalletContextProvider>
  );
};

export { useWalletContext, WalletProvider };
