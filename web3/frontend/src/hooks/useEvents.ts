'use client';

import { useWatchContractEvent } from 'wagmi';
import toast from 'react-hot-toast';
import { REAL_STATE_ABI, CONTRACT_ADDRESS } from '@/config/abi';

export function useEventListeners() {
  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: REAL_STATE_ABI,
    eventName: 'PropertyListed',
    onLogs(logs) {
      for (const log of logs) {
        const { id, price } = log.args;
        toast.success(`Property #${id?.toString()} listed for ${price?.toString()} ETH!`);
      }
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: REAL_STATE_ABI,
    eventName: 'PropertySold',
    onLogs(logs) {
      for (const log of logs) {
        const { id, price } = log.args;
        toast.success(`Property #${id?.toString()} sold for ${price?.toString()} ETH!`);
      }
    },
  });

  useWatchContractEvent({
    address: CONTRACT_ADDRESS,
    abi: REAL_STATE_ABI,
    eventName: 'ReviewAdded',
    onLogs(logs) {
      for (const log of logs) {
        const { productId, rating } = log.args;
        toast.success(`New ${rating?.toString()} star review added!`);
      }
    },
  });

  return null;
}
