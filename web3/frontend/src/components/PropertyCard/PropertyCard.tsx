'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Building, User } from 'lucide-react';
import { formatEther } from 'viem';
import type { Property } from '@/hooks';

interface PropertyCardProps {
  property: Property;
  index?: number;
}

export function PropertyCard({ property, index = 0 }: PropertyCardProps) {
  const formatPrice = (price: bigint) => {
    try {
      return parseFloat(formatEther(price)).toFixed(4);
    } catch {
      return '0';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <Link href={`/properties/${Number(property.productId)}`}>
        <div className="group glass-card rounded-2xl overflow-hidden hover:border-primary-500/50 transition-all duration-300">
          {/* Image */}
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-accent-900" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Building className="w-16 h-16 text-primary-500/30 group-hover:scale-110 transition-transform duration-300" />
            </div>
            <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs font-medium text-primary-400">
              {property.category}
            </div>
          </div>

          {/* Content */}
          <div className="p-5">
            <h3 className="font-display font-semibold text-lg text-white mb-2 group-hover:text-primary-400 transition-colors">
              {property.propertyTitle}
            </h3>

            <div className="flex items-center space-x-1 text-gray-400 text-sm mb-3">
              <MapPin className="w-4 h-4" />
              <span className="truncate">{property.propertyAddress}</span>
            </div>

            <p className="text-gray-400 text-sm line-clamp-2 mb-4">
              {property.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-full bg-primary-500/20 flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-400" />
                </div>
                <span className="text-xs text-gray-400">
                  {property.owner.slice(0, 6)}...{property.owner.slice(-4)}
                </span>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 mb-0.5">Price</p>
                <p className="font-display font-bold text-primary-400">
                  {formatPrice(property.price)} ETH
                </p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}