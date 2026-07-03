'use client';

import { useAccount, useDisconnect, useChainId, useSwitchChain, useBalance, useConnect } from 'wagmi';
import { useCallback } from 'react';

export function useWallet() {
  const { address, isConnected, chainId, status } = useAccount();
  const { disconnect } = useDisconnect();
  const { connect } = useConnect();
  const currentChainId = useChainId();
  const { switchChain } = useSwitchChain();

  const { data: balance } = useBalance({
    address,
    query: {
      enabled: !!address,
    },
  });

  const connectWallet = useCallback(async () => {
    // This will use the default connector from RainbowKit
    // The actual connection is handled by the ConnectButton component
    try {
      // For custom connection logic, we'd use the connectors directly
      // But RainbowKit handles most of this
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  }, []);

  const disconnectWallet = useCallback(() => {
    disconnect();
  }, [disconnect]);

  const switchToNetwork = useCallback(async (targetChainId: number) => {
    try {
      await switchChain({ chainId: targetChainId });
    } catch (error) {
      console.error('Failed to switch network:', error);
    }
  }, [switchChain]);

  return {
    address,
    isConnected,
    chainId: currentChainId,
    status,
    balance,
    connectWallet,
    disconnectWallet,
    switchToNetwork,
  };
}