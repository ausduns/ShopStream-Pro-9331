import { Link } from 'react-router-dom';
import { BsCart3, BsBox, BsPerson } from 'react-icons/bs';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';

export default function Navbar() {
  const { cartItems } = useCart();
  const { currentUser } = useAuth();
  
  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-bold text-primary">ShopHub</Link>
          <div className="flex items-center gap-6">
            <Link to="/" className="text-gray-700 hover:text-primary">Home</Link>
            <Link to="/products" className="text-gray-700 hover:text-primary">Products</Link>
            <Link to="/track-order" className="text-gray-700 hover:text-primary">
              <BsBox className="w-6 h-6" />
            </Link>
            <Link to="/cart" className="relative">
              <BsCart3 className="w-6 h-6 text-gray-700 hover:text-primary" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </Link>
            {currentUser ? (
              <Link to="/profile" className="flex items-center gap-2">
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-8 h-8 rounded-full"
                />
              </Link>
            ) : (
              <Link to="/login" className="text-gray-700 hover:text-primary">
                <BsPerson className="w-6 h-6" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}