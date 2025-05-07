import { useProducts } from '../contexts/ProductContext';
import { motion } from 'framer-motion';

export default function ProductFilters() {
  const { categories, priceRange, filters, setFilters } = useProducts();

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-4">Filters</h3>
      
      {/* Category Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Category
        </label>
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md"
        >
          <option value="">All Categories</option>
          {categories.map(category => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
      </div>

      {/* Price Range Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Price Range
        </label>
        <div className="flex gap-2">
          <input
            type="number"
            value={filters.minPrice}
            onChange={(e) => handleFilterChange('minPrice', e.target.value)}
            placeholder={`Min $${priceRange.min}`}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
          <input
            type="number"
            value={filters.maxPrice}
            onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
            placeholder={`Max $${priceRange.max}`}
            className="w-1/2 p-2 border border-gray-300 rounded-md"
          />
        </div>
      </div>

      {/* Rating Filter */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Minimum Rating
        </label>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 4, 5].map(rating => (
            <button
              key={rating}
              onClick={() => handleFilterChange('rating', rating === filters.rating ? 0 : rating)}
              className={`p-2 rounded-md ${
                rating <= filters.rating
                  ? 'bg-primary text-white'
                  : 'bg-gray-100'
              }`}
            >
              {rating}★
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      <button
        onClick={() => setFilters({
          category: '',
          minPrice: '',
          maxPrice: '',
          rating: 0,
          searchQuery: filters.searchQuery
        })}
        className="w-full mt-2 p-2 text-primary border border-primary rounded-md hover:bg-primary hover:text-white transition-colors"
      >
        Clear Filters
      </button>
    </motion.div>
  );
}