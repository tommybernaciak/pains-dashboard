"use client";

import { WalletHelper } from "@/lib/WalletHelper";
import { WalletAddressResponse } from "@/types/ntf";
import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { createGenericContext } from "./useGenericContext";
import { SupportedWallets } from "@/types/wallets";

interface IWalletContext {
  supportedWallets: SupportedWallets;
  connectedWalletName: string | null;
  connectedWallet: WalletAddressResponse | null;
  connectWallet: (wallet: string) => void;
  isAvailable: (wallet: string) => boolean;
  removeWallet: () => void;
}

const [useWalletContext, WalletContextProvider] =
  createGenericContext<IWalletContext>();

const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const navigate = useNavigate();
  const [availableWallets, setAvailableWallets] = useState<string[]>([]);
  const [connectedWalletName, setConnectedWalletName] = useState<string | null>(
    null
  );
  const [connectedWallet, setConnectedWallet] =
    useState<WalletAddressResponse | null>(null);

  const walletHelper = useMemo(() => new WalletHelper(), []);

  useEffect(() => {
    setAvailableWallets(walletHelper.checkForWallets());
  }, [walletHelper]);

  const connectWallet = async (wallet: string) => {
    const walletInfo = await walletHelper.connectWallet(wallet);
    if (walletInfo) {
      setConnectedWalletName(wallet);
      setConnectedWallet(walletInfo);
      navigate("/");
    }
  };

  const isAvailable = (wallet: string) => availableWallets.includes(wallet);

  const removeWallet = () => {
    setConnectedWalletName(null);
    setConnectedWallet(null);
  };

  return (
    <WalletContextProvider
      value={{
        supportedWallets: walletHelper.SUPPORTED_WALLETS,
        isAvailable,
        connectedWalletName,
        connectedWallet,
        connectWallet,
        removeWallet,
      }}
    >
      {children}
    </WalletContextProvider>
  );
};

export { useWalletContext, WalletProvider };
