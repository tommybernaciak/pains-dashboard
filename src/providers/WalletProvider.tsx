"use client";

import { PropsWithChildren, useEffect, useMemo, useState } from "react";
import { createGenericContext } from "./useGenericContext";
import { useNavigate } from "react-router";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-asmjs";

interface IWalletContext {
  supportedWallets: string[];
  connectedWallet: string | null;
  connectWallet: (wallet: string) => void;
  isAvailable: (wallet: string) => boolean;
  getWalletBalance: () => Promise<string | null>;
}

const [useWalletContext, WalletContextProvider] =
  createGenericContext<IWalletContext>();

const WalletProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const SUPPORTED_WALLETS = useMemo(
    () => [
      "nami",
      "eternl",
      "yoroi",
      "typhon",
      "gerowallet",
      "nufi",
      "lace",
      "begin",
      "vespr",
    ],
    []
  );
  const navigate = useNavigate();
  const [connectedWallet, setConnectedWallet] = useState<string | null>(null);
  const [wallets, setWallets] = useState<string[]>([]);

  useEffect(() => {
    const checkForWallets = (count = 0) => {
      let availableWallets: string[] = [];
      console.log("Checking for Cardano wallets...");
      if (typeof window !== "undefined" && window.cardano) {
        availableWallets = Object.keys(window.cardano).filter((key) => {
          return window.cardano && window.cardano[key]?.enable;
        });
        console.log("Available Cardano wallets:", availableWallets);
        if (availableWallets.length === 0 && count < 3) {
          setTimeout(() => {
            checkForWallets(count + 1);
          }, 1000);
          return;
        }
      }
      setWallets(availableWallets);
    };
    checkForWallets(0);
  }, []);

  const connectWallet = async (wallet: string) => {
    if (window.cardano && window.cardano[wallet]?.enable) {
      try {
        await window.cardano[wallet].enable();
        setConnectedWallet(wallet);
        console.log("Connected wallet:", wallet);
        navigate("/");
      } catch (error) {
        console.error("Error connecting wallet:", error);
      }
    }
  };

  const isAvailable = (wallet: string) => wallets.includes(wallet);

  const getWalletBalance = async () => {
    if (!connectedWallet) {
      return null;
    }
    try {
      if (!window.cardano || !window.cardano[connectedWallet]?.enable) {
        return null;
      }
      const wallet = await window.cardano[connectedWallet].enable();
      const rawBalance = await wallet.getBalance();

      if (!CardanoSerializationLib) {
        console.error("CardanoSerializationLib not loaded!");
        return null;
      }

      const buffer = new Uint8Array(
        rawBalance.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
      );
      const balanceValue = CardanoSerializationLib.Value.from_bytes(buffer);
      const adaAmount = balanceValue.coin().to_str();
      console.log("Balance:", adaAmount);
      return adaAmount;
    } catch (error) {
      console.error("Error fetching wallet balance:", error);
      return null;
    }
  };

  return (
    <WalletContextProvider
      value={{
        supportedWallets: SUPPORTED_WALLETS,
        connectedWallet,
        connectWallet,
        isAvailable,
        getWalletBalance,
      }}
    >
      {children}
    </WalletContextProvider>
  );
};

export { useWalletContext, WalletProvider };
