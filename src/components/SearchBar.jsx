import { useProducts } from '../contexts/ProductContext';
import { BsSearch } from 'react-icons/bs';

export default function SearchBar() {
  const { filters, setFilters } = useProducts();

  const handleSearch = (e) => {
    setFilters(prev => ({ ...prev, searchQuery: e.target.value }));
  };

  return (
    <div className="relative">
      <input
        type="text"
        value={filters.searchQuery}
        onChange={handleSearch}
        placeholder="Search products..."
        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
      />
      <BsSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
    </div>
  );
}