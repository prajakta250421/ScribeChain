"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { API_ENDPOINTS } from "../config/api";

interface WalletConnection {
  address: string;
  chainId: number;
  isConnected: boolean;
}

interface WalletAuthContextType {
  walletConnection: WalletConnection | null;
  connect: () => Promise<boolean>;
  disconnect: () => void;
  isLoading: boolean;
  isConnected: boolean;
}

const WalletAuthContext = createContext<WalletAuthContextType | undefined>(
  undefined
);

export const useWalletAuth = () => {
  const context = useContext(WalletAuthContext);
  if (context === undefined) {
    throw new Error("useWalletAuth must be used within a WalletAuthProvider");
  }
  return context;
};

export const WalletAuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [walletConnection, setWalletConnection] =
    useState<WalletConnection | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-restore wallet connection on mount
  useEffect(() => {
    const restoreConnection = async () => {
      if (typeof window === "undefined" || !window.ethereum) return;
      try {
        // Check if already connected
        const accounts = await window.ethereum.request({
          method: "eth_accounts",
        });
        if (accounts && accounts.length > 0) {
          const chainId = await window.ethereum.request({
            method: "eth_chainId",
          });
          const chainIdDecimal = parseInt(chainId, 16);
          setWalletConnection({
            address: accounts[0],
            chainId: chainIdDecimal,
            isConnected: true,
          });

          // Check if we need to fetch authToken
          if (!localStorage.getItem("authToken")) {
            try {
              const loginResponse = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  email: accounts[0],
                  password: "wallet-auth-v1",
                }),
              });

              if (loginResponse.ok) {
                const data = await loginResponse.json();
                localStorage.setItem("authToken", data.token);
              }
            } catch {
              // Ignore
            }
          }
        }
      } catch {
        // Ignore
      }
    };
    restoreConnection();
  }, []);

  const connect = async (): Promise<boolean> => {
    if (typeof window === "undefined" || !window.ethereum) {
      console.error("MetaMask not found");
      return false;
    }

    try {
      setIsLoading(true);

      // Request account access
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });

      if (!accounts || accounts.length === 0) {
        throw new Error("No accounts found");
      }

      // Get chain ID
      const chainId = await window.ethereum.request({ method: "eth_chainId" });
      const chainIdDecimal = parseInt(chainId, 16);

      const connection: WalletConnection = {
        address: accounts[0],
        chainId: chainIdDecimal,
        isConnected: true,
      };

      setWalletConnection(connection);

      // Store in localStorage
      localStorage.setItem("walletConnected", "true");
      localStorage.setItem("walletAddress", connection.address);

      // Auto-auth with backend to get authToken
      try {
        const loginResponse = await fetch(API_ENDPOINTS.AUTH.LOGIN, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: connection.address,
            password: "wallet-auth-v1",
          }),
        });

        if (loginResponse.ok) {
          const data = await loginResponse.json();
          localStorage.setItem("authToken", data.token);
        } else {
          // Try to register if login fails
          const registerResponse = await fetch(API_ENDPOINTS.AUTH.REGISTER, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: `User ${connection.address.substring(0, 6)}`,
              email: connection.address,
              password: "wallet-auth-v1",
            }),
          });

          if (registerResponse.ok) {
            const data = await registerResponse.json();
            localStorage.setItem("authToken", data.token);
          }
        }
      } catch (err) {
        console.error("WalletAuthContext: Backend auth failed:", err);
      }

      return true;
    } catch (error) {
      console.error("Wallet connection failed:", error);
      setWalletConnection(null);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const disconnect = () => {
    setWalletConnection(null);
    localStorage.removeItem("walletConnected");
    localStorage.removeItem("walletAddress");
    localStorage.removeItem("authToken");
  };

  const value: WalletAuthContextType = {
    walletConnection,
    connect,
    disconnect,
    isLoading,
    isConnected: !!walletConnection?.isConnected,
  };

  return (
    <WalletAuthContext.Provider value={value}>
      {children}
    </WalletAuthContext.Provider>
  );
};
