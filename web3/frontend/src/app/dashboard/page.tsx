'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar, PropertyCard } from '@/components';
import { useWallet, useContractRead, useContractWrite, useTransaction } from '@/hooks';
import { CHAIN_ID, config } from '@/config/web3';
import { waitForTransactionReceipt } from '@wagmi/core';
import { formatEther } from 'viem';
import toast from 'react-hot-toast';
import {
  Wallet,
  Building,
  TrendingUp,
  Clock,
  Plus,
  Loader2,
  Copy,
  ExternalLink,
  LogOut,
} from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const { address, isConnected, balance, disconnectWallet, chainId, switchToNetwork } = useWallet();
  const { userProperties, isLoadingUserProperties, refetchUserProperties, refetchProperties } = useContractRead();
  const { listProperty, hash } = useContractWrite();
  const { isConfirming } = useTransaction(hash);
  const [isListing, setIsListing] = useState(false);
  const [showListModal, setShowListModal] = useState(false);
  const [formData, setFormData] = useState({
    price: '',
    propertyTitle: '',
    category: 'Apartment',
    images: '',
    propertyAddress: '',
    description: '',
  });

  const handleListProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    setIsListing(true);
    try {
      if (chainId !== CHAIN_ID) {
        toast.error(`Please switch to the correct network (Chain ID: ${CHAIN_ID})`);
        await switchToNetwork(CHAIN_ID);
      }

      const txHash = await listProperty(formData);
      toast.loading('Waiting for transaction confirmation...', { id: 'list-property' });

      await waitForTransactionReceipt(config, { hash: txHash });

      toast.success('Property listed successfully!', { id: 'list-property' });
      setShowListModal(false);
      setFormData({
        price: '',
        propertyTitle: '',
        category: 'Apartment',
        images: '',
        propertyAddress: '',
        description: '',
      });
      await Promise.all([refetchUserProperties(), refetchProperties()]);
    } catch (err: unknown) {
      toast.dismiss('list-property');
      const errorMessage = err instanceof Error ? err.message : 'Failed to list property';
      toast.error(errorMessage);
    } finally {
      setIsListing(false);
    }
  };

  if (!isConnected) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center min-h-screen">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center glass-card rounded-2xl p-12 max-w-md"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
              <Wallet className="w-10 h-10 text-white" />
            </div>
            <h2 className="font-display text-2xl font-bold text-white mb-3">
              Connect Your Wallet
            </h2>
            <p className="text-gray-400 mb-6">
              Connect your wallet to view your properties, transaction history, and
              manage your listings.
            </p>
          </motion.div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8"
          >
            <div>
              <h1 className="font-display text-3xl font-bold text-white">Dashboard</h1>
              <p className="text-gray-400">Manage your properties and activity</p>
            </div>
            <button
              onClick={() => setShowListModal(true)}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>List Property</span>
            </button>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-primary-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm">Wallet Balance</p>
              <p className="font-display text-2xl font-bold text-white">
                {balance ? parseFloat(balance.formatted).toFixed(4) : '0'} {balance?.symbol || 'ETH'}
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center">
                  <Building className="w-5 h-5 text-accent-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm">My Properties</p>
              <p className="font-display text-2xl font-bold text-white">
                {userProperties?.length || 0}
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-green-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm">Total Value</p>
              <p className="font-display text-2xl font-bold text-white">
                {userProperties
                  ? parseFloat(
                      formatEther(
                        userProperties.reduce((acc, p) => acc + p.price, BigInt(0))
                      )
                    ).toFixed(4)
                  : '0'}{' '}
                ETH
              </p>
            </div>

            <div className="glass-card rounded-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-yellow-400" />
                </div>
              </div>
              <p className="text-gray-400 text-sm">Pending Tx</p>
              <p className="font-display text-2xl font-bold text-white">
                {isConfirming ? 1 : 0}
              </p>
            </div>
          </motion.div>

          {/* Wallet Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card rounded-xl p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                  <Wallet className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Connected Wallet</p>
                  <div className="flex items-center space-x-2">
                    <p className="font-mono text-white">{address}</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(address || '');
                        toast.success('Address copied!');
                      }}
                      className="p-1 hover:bg-card rounded transition-colors"
                    >
                      <Copy className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
              <button
                onClick={disconnectWallet}
                className="px-4 py-2 rounded-lg bg-card border border-border text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
              >
                <LogOut className="w-4 h-4" />
                <span>Disconnect</span>
              </button>
            </div>
          </motion.div>

          {/* My Properties */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="font-display text-xl font-semibold text-white mb-4">
              My Properties
            </h2>
            {isLoadingUserProperties ? (
              <div className="flex items-center justify-center h-32">
                <Loader2 className="w-6 h-6 text-primary-500 animate-spin" />
              </div>
            ) : userProperties && userProperties.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userProperties.map((property, index) => (
                  <PropertyCard key={property.productId.toString()} property={property} index={index} />
                ))}
              </div>
            ) : (
              <div className="glass-card rounded-xl p-12 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card flex items-center justify-center">
                  <Building className="w-8 h-8 text-gray-500" />
                </div>
                <h3 className="font-semibold text-white mb-2">No Properties Yet</h3>
                <p className="text-gray-400 mb-4">
                  You haven&apos;t listed any properties yet.
                </p>
                <Link
                  href="/properties"
                  className="inline-flex items-center space-x-2 text-primary-400 hover:text-primary-300"
                >
                  <span>Browse Properties</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* List Property Modal */}
      {showListModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
          onClick={() => setShowListModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="glass-card rounded-2xl p-6 max-w-lg w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="font-display text-2xl font-bold text-white mb-6">
              List New Property
            </h2>
            <form onSubmit={handleListProperty} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Property Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.propertyTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyTitle: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50"
                  placeholder="Modern Downtown Apartment"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-white focus:outline-none focus:border-primary-500/50"
                  >
                    <option value="Apartment">Apartment</option>
                    <option value="House">House</option>
                    <option value="Villa">Villa</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Land">Land</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Price (ETH)</label>
                  <input
                    type="text"
                    required
                    value={formData.price}
                    onChange={(e) =>
                      setFormData({ ...formData, price: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-card border border-border text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50"
                    placeholder="0.5"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Property Address
                </label>
                <input
                  type="text"
                  required
                  value={formData.propertyAddress}
                  onChange={(e) =>
                    setFormData({ ...formData, propertyAddress: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50"
                  placeholder="123 Main St, City, Country"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Description
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-card border border-border text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 resize-none"
                  placeholder="Describe your property..."
                />
              </div>

              <div className="flex space-x-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowListModal(false)}
                  className="flex-1 py-3 rounded-xl bg-card border border-border text-gray-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isListing}
                  className="flex-1 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center"
                >
                  {isListing ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin mr-2" />
                      Listing...
                    </>
                  ) : (
                    'List Property'
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </main>
  );
}