'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Globe, Zap, Users } from 'lucide-react';
import Link from 'next/link';
import { ConnectButton } from '@rainbow-me/rainbowkit';

const features = [
  {
    icon: Shield,
    title: 'Secure Transactions',
    description: 'Smart contracts ensure safe and transparent property transfers',
  },
  {
    icon: Globe,
    title: 'Global Access',
    description: 'Buy and sell properties from anywhere in the world',
  },
  {
    icon: Zap,
    title: 'Instant Settlement',
    description: 'No intermediaries - transactions complete in seconds',
  },
  {
    icon: Users,
    title: 'Verified Ownership',
    description: 'Blockchain-verified property ownership records',
  },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent-500/20 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-primary-500/10 text-primary-400 border border-primary-500/20 mb-6">
              Decentralized Real Estate Marketplace
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">Buy & Sell Properties</span>
            <br />
            <span className="text-gradient">On The Blockchain</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-400 max-w-2xl mx-auto mb-8"
          >
            Experience the future of real estate with secure, transparent, and
            instant property transactions powered by Ethereum smart contracts.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <ConnectButton.Custom>
              {({ account, chain, openAccountModal, openChainModal, mounted }) => {
                const ready = mounted;
                const connected = ready && account && chain;

                if (!connected) {
                  return (
                    <button className="px-8 py-3 rounded-xl bg-gradient-to-r from-primary-500 to-accent-500 text-white font-semibold hover:opacity-90 transition-opacity flex items-center space-x-2">
                      <span>Connect Wallet</span>
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  );
                }

                return (
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={openChainModal}
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg glass border border-border"
                    >
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                      <span className="text-sm text-gray-300">
                        {chain.name}
                      </span>
                    </button>
                    <Link
                      href="/properties"
                      className="px-6 py-2 rounded-lg bg-primary-500/20 text-primary-400 font-medium hover:bg-primary-500/30 transition-colors"
                    >
                      Browse Properties
                    </Link>
                  </div>
                );
              }}
            </ConnectButton.Custom>

            <Link
              href="/properties"
              className="px-8 py-3 rounded-xl bg-card border border-border text-white font-semibold hover:border-primary-500/50 transition-all flex items-center space-x-2"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="glass-card rounded-xl p-6 hover:border-primary-500/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500/20 to-accent-500/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-primary-400" />
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-400">{feature.description}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}