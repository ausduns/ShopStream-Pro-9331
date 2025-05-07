import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BsFilter } from 'react-icons/bs';
import { useProducts } from '../contexts/ProductContext';
import ProductCard from '../components/ProductCard';
import ProductFilters from '../components/ProductFilters';
import SearchBar from '../components/SearchBar';
import ProductSort from '../components/ProductSort';

export default function Products() {
  const { products } = useProducts();
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col gap-6">
          {/* Search and Sort Bar */}
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="w-full sm:w-2/3">
              <SearchBar />
            </div>
            <div className="w-full sm:w-1/3 flex justify-between items-center">
              <ProductSort />
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="sm:hidden flex items-center gap-2 text-gray-600"
              >
                <BsFilter />
                Filters
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Filters - Desktop */}
            <div className="hidden sm:block w-1/4">
              <ProductFilters />
            </div>

            {/* Filters - Mobile */}
            <AnimatePresence>
              {showFilters && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="sm:hidden w-full"
                >
                  <ProductFilters />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Product Grid */}
            <div className="w-full sm:w-3/4">
              {products.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No products found</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {products.map(product => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}