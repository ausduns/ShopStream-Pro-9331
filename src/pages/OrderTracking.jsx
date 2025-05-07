import { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { useOrder } from '../contexts/OrderContext';
import TrackingTimeline from '../components/TrackingTimeline';

export default function OrderTracking() {
  const [trackingId, setTrackingId] = useState('');
  const [searchedOrder, setSearchedOrder] = useState(null);
  const { getOrder } = useOrder();

  const handleTrackOrder = (e) => {
    e.preventDefault();
    const order = getOrder(trackingId);
    setSearchedOrder(order);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-900 mb-8">Track Your Order</h2>
        
        <form onSubmit={handleTrackOrder} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your order ID"
              className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-secondary transition-colors"
            >
              Track
            </button>
          </div>
        </form>

        {searchedOrder ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6"
          >
            <div className="border-b pb-4 mb-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold">Order {searchedOrder.id}</h3>
                  <p className="text-gray-600">
                    Placed on {format(searchedOrder.date, 'MMM d, yyyy')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">Estimated Delivery</p>
                  <p className="text-gray-600">
                    {format(searchedOrder.estimatedDelivery, 'MMM d, yyyy')}
                  </p>
                </div>
              </div>
              <div className="inline-block px-3 py-1 rounded-full text-sm font-medium capitalize"
                style={{
                  backgroundColor: searchedOrder.status === 'delivered' ? '#dcfce7' : '#f3f4f6',
                  color: searchedOrder.status === 'delivered' ? '#166534' : '#374151'
                }}
              >
                {searchedOrder.status}
              </div>
            </div>

            <TrackingTimeline steps={searchedOrder.trackingSteps} />

            <div className="mt-6 border-t pt-4">
              <h4 className="font-semibold mb-3">Order Summary</h4>
              {searchedOrder.items.map(item => (
                <div key={item.id} className="flex justify-between items-center mb-2">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              ))}
              <div className="border-t mt-4 pt-4">
                <div className="flex justify-between items-center font-semibold">
                  <span>Total</span>
                  <span>${searchedOrder.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        ) : trackingId && (
          <p className="text-red-500 text-center">No order found with this ID</p>
        )}
      </div>
    </div>
  );
}