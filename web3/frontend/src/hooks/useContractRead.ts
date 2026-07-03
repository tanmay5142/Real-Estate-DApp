'use client';

import { useReadContract, useWriteContract, useWaitForTransactionReceipt, useAccount } from 'wagmi';
import { useCallback, useMemo, useState } from 'react';
import { REAL_STATE_ABI, CONTRACT_ADDRESS } from '@/config/abi';
import { CHAIN_ID } from '@/config/web3';
import { parseEther } from 'viem';
import toast from 'react-hot-toast';

export interface Property {
  productId: bigint;
  owner: `0x${string}`;
  price: bigint;
  propertyTitle: string;
  category: string;
  images: string;
  propertyAddress: string;
  description: string;
}

export interface Review {
  reviewer: `0x${string}`;
  productId: bigint;
  rating: bigint;
  comment: string;
  likes: bigint;
}

export function usePropertyData() {
  const { address } = useAccount();

  const { data: propertyIndex, isLoading: isLoadingIndex, refetch: refetchIndex } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: REAL_STATE_ABI,
    functionName: 'propertyIndex',
    chainId: CHAIN_ID,
  });

  const { data: allProperties, isLoading: isLoadingProperties, refetch: refetchProperties } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: REAL_STATE_ABI,
    functionName: 'getAllProperties',
    chainId: CHAIN_ID,
    query: {
      refetchInterval: 5000,
    },
  });

  const { data: userProperties, isLoading: isLoadingUserProperties, refetch: refetchUserProperties } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: REAL_STATE_ABI,
    functionName: 'getUserProperties',
    args: address ? [address] : undefined,
    chainId: CHAIN_ID,
    query: {
      enabled: !!address,
      refetchInterval: 5000,
    },
  });

  const { data: highestRatedProduct, isLoading: isLoadingHighestRated } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: REAL_STATE_ABI,
    functionName: 'getHighestRatedProduct',
    chainId: CHAIN_ID,
  });

  return {
    propertyIndex,
    allProperties: allProperties as unknown as Property[] | undefined,
    userProperties: userProperties as unknown as Property[] | undefined,
    highestRatedProduct,
    isLoadingIndex,
    isLoadingProperties,
    isLoadingUserProperties,
    isLoadingHighestRated,
    refetchIndex,
    refetchProperties,
    refetchUserProperties,
  };
}

export function useContractWrite() {
  const { writeContractAsync, data: hash } = useWriteContract();

  const listProperty = useCallback(async (params: {
    price: string;
    propertyTitle: string;
    category: string;
    images: string;
    propertyAddress: string;
    description: string;
  }) => {
    const { price, propertyTitle, category, images, propertyAddress, description } = params;

    return writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: REAL_STATE_ABI,
      chainId: CHAIN_ID,
      functionName: 'listProperty',
      args: [
        parseEther(price),
        propertyTitle,
        category,
        images,
        propertyAddress,
        description,
      ],
    });
  }, [writeContractAsync]);

  const buyProperty = useCallback(async (productId: number, price: string) => {
    return writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: REAL_STATE_ABI,
      chainId: CHAIN_ID,
      functionName: 'buyProperty',
      args: [BigInt(productId)],
      value: parseEther(price),
    });
  }, [writeContractAsync]);

  const updateProperty = useCallback(async (params: {
    productId: number;
    propertyTitle: string;
    category: string;
    images: string;
    propertyAddress: string;
    description: string;
  }) => {
    const { productId, propertyTitle, category, images, propertyAddress, description } = params;

    return writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: REAL_STATE_ABI,
      chainId: CHAIN_ID,
      functionName: 'updateProperty',
      args: [
        BigInt(productId),
        propertyTitle,
        category,
        images,
        propertyAddress,
        description,
      ],
    });
  }, [writeContractAsync]);

  const updatePrice = useCallback(async (productId: number, price: string) => {
    return writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: REAL_STATE_ABI,
      chainId: CHAIN_ID,
      functionName: 'updatePrice',
      args: [
        BigInt(productId),
        parseEther(price),
      ],
    });
  }, [writeContractAsync]);

  const addReview = useCallback(async (productId: number, rating: number, comment: string) => {
    return writeContractAsync({
      address: CONTRACT_ADDRESS,
      abi: REAL_STATE_ABI,
      chainId: CHAIN_ID,
      functionName: 'addReview',
      args: [BigInt(productId), BigInt(rating), comment],
    });
  }, [writeContractAsync]);

  return {
    listProperty,
    buyProperty,
    updateProperty,
    updatePrice,
    addReview,
    hash,
  };
}

export function useTransaction(hash?: `0x${string}`) {
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
    query: {
      enabled: !!hash,
    },
  });

  return {
    isConfirming,
    isSuccess,
  };
}

export function useProperty(productId: number) {
  const { data, isLoading, error, refetch } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: REAL_STATE_ABI,
    functionName: 'getProperty',
    args: [BigInt(productId)],
    chainId: CHAIN_ID,
  });

  const property = useMemo(() => {
    if (!data) return null;
    const propertyData = data as readonly [bigint, `0x${string}`, bigint, string, string, string, string, string];
    return {
      productId: propertyData[0],
      owner: propertyData[1],
      price: propertyData[2],
      propertyTitle: propertyData[3],
      category: propertyData[4],
      images: propertyData[5],
      propertyAddress: propertyData[6],
      description: propertyData[7],
    };
  }, [data]);

  return { property, isLoading, error, refetch };
}

export const useContractRead = usePropertyData;
