import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import Connect from "./pages/Connect.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import Claim from "./pages/Claim.tsx";
import { WalletProvider } from "./providers/WalletProvider.tsx";
import Footer from "./components/custom/footer.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <WalletProvider>
        <main className="min-h-screen flex flex-col justify-between">
          <Routes>
            <Route path="/connect" element={<Connect />} />
            <Route path="/" element={<Dashboard />} />
            <Route path="/claim" element={<Claim />} />
          </Routes>
          <Footer />
        </main>
      </WalletProvider>
    </BrowserRouter>
  </StrictMode>
);
