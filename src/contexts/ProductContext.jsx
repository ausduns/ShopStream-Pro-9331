import { createContext, useContext, useState } from 'react';

const products = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 29.99,
    category: "clothing",
    rating: 4.5,
    stock: 50,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Premium cotton classic fit t-shirt",
    tags: ["casual", "cotton", "summer"]
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 79.99,
    category: "clothing",
    rating: 4.8,
    stock: 30,
    image: "https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Comfortable slim-fit denim jeans",
    tags: ["denim", "casual", "everyday"]
  },
  {
    id: 3,
    name: "Running Shoes",
    price: 99.99,
    category: "footwear",
    rating: 4.7,
    stock: 25,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "High-performance running shoes",
    tags: ["sports", "running", "athletic"]
  },
  {
    id: 4,
    name: "Leather Wallet",
    price: 49.99,
    category: "accessories",
    rating: 4.6,
    stock: 40,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Genuine leather bifold wallet",
    tags: ["leather", "accessories", "minimal"]
  },
  {
    id: 5,
    name: "Smartwatch",
    price: 199.99,
    category: "electronics",
    rating: 4.4,
    stock: 15,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    description: "Feature-rich smartwatch with health tracking",
    tags: ["tech", "fitness", "smart"]
  }
];

const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [filters, setFilters] = useState({
    category: '',
    minPrice: '',
    maxPrice: '',
    rating: 0,
    searchQuery: ''
  });

  const [sortBy, setSortBy] = useState('featured');

  const getFilteredProducts = () => {
    let filtered = [...products];

    // Apply search query
    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query) ||
        product.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (filters.category) {
      filtered = filtered.filter(product => 
        product.category === filters.category
      );
    }

    // Apply price range filter
    if (filters.minPrice) {
      filtered = filtered.filter(product => 
        product.price >= parseFloat(filters.minPrice)
      );
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(product => 
        product.price <= parseFloat(filters.maxPrice)
      );
    }

    // Apply rating filter
    if (filters.rating > 0) {
      filtered = filtered.filter(product => 
        product.rating >= filters.rating
      );
    }

    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default: // 'featured'
        filtered.sort((a, b) => b.rating * b.stock - a.rating * a.stock);
    }

    return filtered;
  };

  const categories = [...new Set(products.map(product => product.category))];
  const priceRange = {
    min: Math.min(...products.map(p => p.price)),
    max: Math.max(...products.map(p => p.price))
  };

  return (
    <ProductContext.Provider value={{
      products: getFilteredProducts(),
      categories,
      priceRange,
      filters,
      setFilters,
      sortBy,
      setSortBy
    }}>
      {children}
    </ProductContext.Provider>
  );
}

export const useProducts = () => useContext(ProductContext);