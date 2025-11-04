'use client';

import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';

declare global {
  interface Window {
    ethereum?: any;
  }
}

export function SimpleWalletConnect() {
  const [account, setAccount] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        }
      } catch (error) {
        console.log('Error checking connection:', error);
      }
    }
  };

  const connectWallet = async () => {
    if (typeof window === 'undefined' || !window.ethereum) {
      alert('Please install MetaMask or another Web3 wallet');
      return;
    }

    setIsConnecting(true);
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      setAccount(accounts[0]);
    } catch (error) {
      console.error('Error connecting wallet:', error);
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  if (!mounted) {
    return (
      <Button variant="secondary" className="glow-hover whitespace-nowrap">
        Connect
      </Button>
    );
  }

  if (account) {
    return (
      <Button
        onClick={disconnectWallet}
        variant="secondary"
        className="glow-hover whitespace-nowrap"
      >
        <span className="mono text-xs">
          {formatAddress(account)}
        </span>
      </Button>
    );
  }

  return (
    <Button
      onClick={connectWallet}
      disabled={isConnecting}
      variant="secondary"
      className="glow-hover whitespace-nowrap"
    >
      {isConnecting ? 'Connecting...' : 'Connect'}
    </Button>
  );
}