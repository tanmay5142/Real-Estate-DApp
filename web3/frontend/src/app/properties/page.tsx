'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Navbar, PropertyCard } from '@/components';
import { useContractRead } from '@/hooks';
import { Search, Filter, Grid, List } from 'lucide-react';

const categories = ['All', 'Apartment', 'House', 'Villa', 'Commercial', 'Land'];

export default function PropertiesPage() {
  const { allProperties, isLoadingProperties, refetchProperties } = useContractRead();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredProperties = useMemo(() => {
    if (!allProperties) return [];

    return allProperties.filter((property) => {
      const matchesSearch =
        property.propertyTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.propertyAddress.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory =
        selectedCategory === 'All' ||
        property.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [allProperties, searchQuery, selectedCategory]);

  return (
    <main className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-24 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="font-display text-4xl sm:text-5xl font-bold mb-4">
              <span className="text-white">Property </span>
              <span className="text-gradient">Marketplace</span>
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Browse verified properties from around the world. Each listing is
              secured by Ethereum smart contracts.
            </p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-4 mb-8"
          >
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search properties by title, address, or description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl bg-card border border-border text-white placeholder-gray-500 focus:outline-none focus:border-primary-500/50 transition-colors"
                />
              </div>

              {/* View Mode */}
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'bg-card text-gray-400 hover:text-white'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-colors ${
                    viewMode === 'list'
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'bg-card text-gray-400 hover:text-white'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mt-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-primary-500/20 text-primary-400 border border-primary-500/30'
                      : 'bg-card text-gray-400 hover:text-white border border-border'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Results */}
          {isLoadingProperties ? (
            <div className="flex items-center justify-center h-64">
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredProperties.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-card flex items-center justify-center">
                <Filter className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                No properties found
              </h3>
              <p className="text-gray-400">
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className={
                viewMode === 'grid'
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-4'
              }
            >
              {filteredProperties.map((property, index) => (
                <PropertyCard
                  key={property.productId.toString()}
                  property={property}
                  index={index}
                />
              ))}
            </motion.div>
          )}

          {/* Stats */}
          {filteredProperties.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4"
            >
              <div className="glass-card rounded-xl p-6 text-center">
                <p className="font-display text-3xl font-bold text-primary-400">
                  {filteredProperties.length}
                </p>
                <p className="text-gray-400 text-sm mt-1">Properties Listed</p>
              </div>
              <div className="glass-card rounded-xl p-6 text-center">
                <p className="font-display text-3xl font-bold text-accent-400">
                  {new Set(filteredProperties.map((p) => p.owner)).size}
                </p>
                <p className="text-gray-400 text-sm mt-1">Unique Owners</p>
              </div>
              <div className="glass-card rounded-xl p-6 text-center">
                <p className="font-display text-3xl font-bold text-green-400">
                  {categories.length - 1}
                </p>
                <p className="text-gray-400 text-sm mt-1">Categories</p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  );
}