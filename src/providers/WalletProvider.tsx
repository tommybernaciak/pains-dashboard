"use client";

import { WalletHelper } from "@/lib/WalletHelper";
import { Wallet } from "@/types/cardano";
import * as CardanoSerializationLib from "@emurgo/cardano-serialization-lib-asmjs";
import { PropsWithChildren, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { createGenericContext } from "./useGenericContext";

const PAINS_POLICY_ID =
  "12efb6c78a821bfc8ab8b8dc6814aff9a695019ededa872df1b652bf";

interface IWalletContext {
  supportedWallets: string[];
  connectedWalletName: string | null;
  connectWallet: (wallet: string) => void;
  isAvailable: (wallet: string) => boolean;
  getWalletBalance: () => Promise<string | null>;
  getWalletNFTs: () => Promise<
    { policyId: string; assetName: string }[] | null
  >;
  fetchMetadata: (policyId: string, assetName: string) => Promise<any>;
  resolveIpfsUri: (ipfsUri: string) => string | null;
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

  useEffect(() => {
    setAvailableWallets(WalletHelper.checkForWallets());
  }, []);

  useEffect(() => {
    if (connectedWallet) {
      console.log("Connected wallet:", connectedWallet);
      navigate("/");
    }
  }, [connectedWallet, navigate]);

  const connectWallet = async (wallet: string) => {
    const walletApi = await WalletHelper.connectWallet(wallet);
    if (walletApi) {
      console.log("Connected wallet:", wallet);
      setConnectedWalletName(wallet);
      setConnectedWallet(walletApi);
    }
  };

  const isAvailable = (wallet: string) => availableWallets.includes(wallet);

  const getWalletBalance = async () => {
    if (!connectedWallet) {
      return null;
    }
    try {
      console.log("WALLET API:", connectedWallet);
      const rawBalance = await connectedWallet.getBalance();
      console.log("Raw balance:", rawBalance);

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

  const getWalletNFTs = async (): Promise<
    { policyId: string; assetName: string }[] | null
  > => {
    if (!connectedWallet) {
      return null;
    }

    try {
      const rawBalance = await connectedWallet.getBalance();

      // Decode the balance using CardanoSerializationLib
      const buffer = new Uint8Array(
        rawBalance.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16))
      );
      const balanceValue = CardanoSerializationLib.Value.from_bytes(buffer);

      const multiAssets = balanceValue.multiasset();
      const nfts: { policyId: string; assetName: string }[] = [];

      if (multiAssets) {
        const policies = multiAssets.keys();
        for (let i = 0; i < policies.len(); i++) {
          const policyId = policies.get(i).to_hex();
          if (!policyId) {
            console.log("Policy ID not found");
            continue;
          }
          if (policyId !== PAINS_POLICY_ID) {
            console.log("Not a PAINS NFT");
            continue;
          }
          const assets = multiAssets.get(policies.get(i));
          if (!assets) {
            console.log("Assets not found");
            continue;
          }
          const assetNames = assets.keys();

          for (let j = 0; j < assetNames.len(); j++) {
            const assetName = assetNames.get(j);
            if (!assetName) {
              console.log("Asset name not found");
              continue;
            }
            const asset = assets.get(assetName);
            if (!asset) {
              console.log("Asset not found");
              continue;
            }

            const assetQuantity = asset.to_str();

            // Check if it's an NTF
            if (assetQuantity === "1") {
              nfts.push({
                policyId,
                assetName: new TextDecoder("utf-8").decode(assetName.name()),
              });
            }
          }
        }
      }

      return nfts;
    } catch (error) {
      console.error("Error fetching NFTs:", error);
      return [];
    }
  };

  const resolveIpfsUri = (ipfsUri: string): string | null => {
    if (ipfsUri.startsWith("ipfs://")) {
      return `https://ipfs.io/ipfs/${ipfsUri.split("ipfs://")[1]}`;
    }
    return ipfsUri || null;
  };

  // const fetchNFT = async (
  //   policyId: string,
  //   assetName: string
  // ): Promise<string | null> => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:3000/nft-metadata?asset_policy=${policyId}`
  //     );
  //     const data = await response.json();
  //     const asset = data.find(
  //       (a: { asset_name?: string }) => a?.asset_name === assetName
  //     );

  //     const imageUri = asset?.metadata?.image;
  //     return resolveIpfsUri(imageUri);
  //   } catch (error) {
  //     console.error("Error fetching metadata via Koios:", error);
  //     return null;
  //   }
  // };

  const fetchMetadata = async (policyId: string, assetName: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/nft-metadata-blockfrost?policy_id=${policyId}&asset_name=${assetName}`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching metadata via blockfrost:", error);
      return null;
    }
  };

  return (
    <WalletContextProvider
      value={{
        supportedWallets: WalletHelper.SUPPORTED_WALLETS,
        connectedWalletName,
        connectWallet,
        isAvailable,
        getWalletBalance,
        getWalletNFTs,
        fetchMetadata,
        resolveIpfsUri,
      }}
    >
      {children}
    </WalletContextProvider>
  );
};

export { useWalletContext, WalletProvider };
