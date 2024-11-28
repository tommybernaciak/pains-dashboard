import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useWalletContext } from "../providers/WalletProvider";

function Dashboard() {
  const navigate = useNavigate();
  const { connectedWallet, getWalletBalance } = useWalletContext();
  const [balance, setBalance] = useState<string | null>(null);

  useEffect(() => {
    if (!connectedWallet) {
      navigate("/connect");
    }
  }, [connectedWallet, navigate]);

  const fetchBalance = useCallback(async () => {
    const walletBalance = await getWalletBalance();
    setBalance(walletBalance);
  }, [getWalletBalance]);

  useEffect(() => {
    fetchBalance();
  }, [fetchBalance]);

  if (!connectedWallet) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <main className="flex flex-col">Pains</main>
      <p>Connected: {connectedWallet}</p>
      <p>Balance: {balance || "-"}</p>
    </div>
  );
}

export default Dashboard;
