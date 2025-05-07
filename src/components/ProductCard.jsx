import { motion } from 'framer-motion';
import { useCart } from '../contexts/CartContext';
import { BsStarFill, BsCart3 } from 'react-icons/bs';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full shadow-md">
          <span className="flex items-center gap-1 text-yellow-500">
            <BsStarFill />
            {product.rating}
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="flex flex-wrap gap-1 mt-2">
          {product.tags.map(tag => (
            <span
              key={tag}
              className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-lg font-bold text-gray-800">${product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded hover:bg-secondary transition-colors"
          >
            <BsCart3 />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
}