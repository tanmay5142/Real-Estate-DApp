'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { Navbar } from '@/components';
import { useWallet, useProperty, useContractWrite, useTransaction } from '@/hooks';
import { formatEther } from 'viem';
import toast from 'react-hot-toast';
import {
  MapPin,
  Building,
  User,
  Wallet,
  Star,
  Heart,
  ArrowLeft,
  Loader2,
  ExternalLink,
} from 'lucide-react';
import Link from 'next/link';

export default function PropertyDetailPage() {
  const params = useParams();
  const propertyId = parseInt(params.id as string);
  const { isConnected, address } = useWallet();
  const { property, isLoading } = useProperty(propertyId);
  const { buyProperty, hash } = useContractWrite();
  const { isConfirming, isSuccess } = useTransaction(hash);
  const [isBuying, setIsBuying] = useState(false);

  const handleBuy = async () => {
    if (!isConnected) {
      toast.error('Please connect your wallet first');
      return;
    }

    if (!property) return;

    setIsBuying(true);
    try {
      const hash = await buyProperty(propertyId, formatEther(property.price));
      toast.success('Transaction submitted!');
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Transaction failed';
      toast.error(errorMessage);
    } finally {
      setIsBuying(false);
    }
  };

  const isOwner = property?.owner.toLowerCase() === address?.toLowerCase();

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center h-screen">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      </main>
    );
  }

  if (!property) {
    return (
      <main className="min-h-screen bg-background">
        <Navbar />
        <div className="pt-24 flex items-center justify-center h-screen">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-white mb-2">
              Property Not Found
            </h2>
            <Link
              href="/properties"
              className="text-primary-400 hover:text-primary-300"
            >
              Back to Properties
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const formatPrice = (price: bigint) => {
    try {
      return parseFloat(formatEther(price)).toFixed(4);
    } catch {
      return '0';
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <Link
            href="/properties"
            className="inline-flex items-center space-x-2 text-gray-400 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Properties</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-2"
            >
              {/* Image */}
              <div className="relative h-80 rounded-2xl overflow-hidden mb-6">
                <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-accent-900" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <Building className="w-24 h-24 text-primary-500/30" />
                </div>
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button className="p-2 rounded-lg bg-black/50 backdrop-blur-sm hover:bg-black/70 transition-colors">
                    <Heart className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              {/* Details */}
              <div className="glass-card rounded-2xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-primary-500/20 text-primary-400 mb-3">
                      {property.category}
                    </span>
                    <h1 className="font-display text-3xl font-bold text-white">
                      {property.propertyTitle}
                    </h1>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-gray-400 mb-6">
                  <MapPin className="w-5 h-5" />
                  <span>{property.propertyAddress}</span>
                </div>

                <div className="border-t border-border pt-6">
                  <h3 className="font-display font-semibold text-white mb-3">
                    Description
                  </h3>
                  <p className="text-gray-400 leading-relaxed">
                    {property.description}
                  </p>
                </div>

                {/* Property Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-primary-500/20 flex items-center justify-center mx-auto mb-2">
                      <Building className="w-5 h-5 text-primary-400" />
                    </div>
                    <p className="text-sm text-gray-400">Property ID</p>
                    <p className="font-semibold text-white">
                      #{property.productId.toString()}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-accent-500/20 flex items-center justify-center mx-auto mb-2">
                      <User className="w-5 h-5 text-accent-400" />
                    </div>
                    <p className="text-sm text-gray-400">Category</p>
                    <p className="font-semibold text-white">{property.category}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-green-500/20 flex items-center justify-center mx-auto mb-2">
                      <Star className="w-5 h-5 text-green-400" />
                    </div>
                    <p className="text-sm text-gray-400">Rating</p>
                    <p className="font-semibold text-white">4.8 ★</p>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 rounded-lg bg-yellow-500/20 flex items-center justify-center mx-auto mb-2">
                      <ExternalLink className="w-5 h-5 text-yellow-400" />
                    </div>
                    <p className="text-sm text-gray-400">Verified</p>
                    <p className="font-semibold text-white">Yes</p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              {/* Price Card */}
              <div className="glass-card rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-1">Asking Price</p>
                <p className="font-display text-4xl font-bold text-gradient mb-4">
                  {formatPrice(property.price)} ETH
                </p>

                {isOwner ? (
                  <button className="w-full py-3 rounded-xl bg-card border border-border text-gray-400 font-medium cursor-not-allowed">
                    You Own This Property
                  </button>
                ) : (
                  <button
                    onClick={handleBuy}
                    disabled={!isConnected || isBuying || isConfirming}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                  >
                    {isBuying || isConfirming ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>
                          {isConfirming ? 'Confirming...' : 'Processing...'}
                        </span>
                      </>
                    ) : (
                      <>
                        <Wallet className="w-5 h-5" />
                        <span>Buy Now</span>
                      </>
                    )}
                  </button>
                )}

                {!isConnected && (
                  <p className="text-center text-gray-500 text-sm mt-3">
                    Connect wallet to purchase
                  </p>
                )}
              </div>

              {/* Owner Card */}
              <div className="glass-card rounded-2xl p-6">
                <h3 className="font-display font-semibold text-white mb-4">
                  Property Owner
                </h3>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-500 to-accent-500 flex items-center justify-center">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Current Owner</p>
                    <p className="text-sm text-gray-400 font-mono">
                      {property.owner.slice(0, 6)}...
                      {property.owner.slice(-4)}
                    </p>
                  </div>
                </div>
              </div>

              {/* Transaction Success */}
              {isSuccess && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="glass-card rounded-2xl p-6 border-green-500/30"
                >
                  <div className="flex items-center space-x-3 text-green-400">
                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                      <Star className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold">Purchase Complete!</p>
                      <p className="text-sm text-gray-400">
                        You now own this property
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}