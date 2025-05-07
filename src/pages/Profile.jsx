import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';
import { format } from 'date-fns';

export default function Profile() {
  const { currentUser, updateProfile, logout } = useAuth();
  const { orders } = useOrder();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditing(false);
    } catch (err) {
      console.error('Failed to update profile:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white shadow rounded-lg"
          >
            {/* Profile Header */}
            <div className="px-4 py-5 sm:px-6 flex justify-between items-center">
              <div>
                <h3 className="text-lg leading-6 font-medium text-gray-900">Profile</h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                  Manage your account settings and view orders
                </p>
              </div>
              <button
                onClick={logout}
                className="text-red-600 hover:text-red-800 font-medium"
              >
                Sign Out
              </button>
            </div>

            {/* Profile Content */}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <div className="flex items-center mb-6">
                  <img
                    src={currentUser?.avatar}
                    alt={currentUser?.name}
                    className="h-20 w-20 rounded-full"
                  />
                  <div className="ml-4">
                    <h4 className="text-xl font-bold">{currentUser?.name}</h4>
                    <p className="text-gray-600">{currentUser?.email}</p>
                  </div>
                </div>

                {editing ? (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Email</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                      />
                    </div>
                    <div className="flex gap-4">
                      <button
                        type="submit"
                        className="bg-primary text-white px-4 py-2 rounded hover:bg-secondary"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditing(false)}
                        className="text-gray-600 hover:text-gray-800"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setEditing(true)}
                    className="text-primary hover:text-secondary font-medium"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Order History */}
            <div className="border-t border-gray-200">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">Order History</h3>
                {orders.length === 0 ? (
                  <p className="text-gray-500">No orders yet</p>
                ) : (
                  <div className="space-y-4">
                    {orders.map(order => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{order.id}</h4>
                            <p className="text-sm text-gray-500">
                              {format(order.date, 'MMM d, yyyy')}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize
                            ${order.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                            {order.status}
                          </span>
                        </div>
                        <div className="mt-2">
                          <p className="text-sm text-gray-600">
                            {order.items.length} items
                          </p>
                          <p className="font-medium">
                            Total: ${order.total.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}