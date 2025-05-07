import { useProducts } from '../contexts/ProductContext';
import { BsSortDown } from 'react-icons/bs';

export default function ProductSort() {
  const { sortBy, setSortBy } = useProducts();

  return (
    <div className="flex items-center gap-2">
      <BsSortDown className="text-gray-600" />
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="featured">Featured</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
        <option value="rating">Highest Rated</option>
      </select>
    </div>
  );
}