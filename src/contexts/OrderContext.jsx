import { createContext, useContext, useState } from 'react';

const OrderContext = createContext();

export function OrderProvider({ children }) {
  const [orders, setOrders] = useState([]);

  const createOrder = (cartItems, total) => {
    const newOrder = {
      id: `ORD-${Date.now()}`,
      items: cartItems,
      total,
      status: 'processing',
      date: new Date(),
      estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      trackingSteps: [
        { id: 1, title: 'Order Placed', completed: true },
        { id: 2, title: 'Processing', completed: false },
        { id: 3, title: 'Shipped', completed: false },
        { id: 4, title: 'Out for Delivery', completed: false },
        { id: 5, title: 'Delivered', completed: false }
      ]
    };
    setOrders(prev => [newOrder, ...prev]);
    return newOrder.id;
  };

  const getOrder = (orderId) => {
    return orders.find(order => order.id === orderId);
  };

  const updateOrderStatus = (orderId, newStatus) => {
    setOrders(prev => prev.map(order => {
      if (order.id === orderId) {
        const updatedSteps = order.trackingSteps.map(step => ({
          ...step,
          completed: getStepCompletion(step.title, newStatus)
        }));
        return { ...order, status: newStatus, trackingSteps: updatedSteps };
      }
      return order;
    }));
  };

  const getStepCompletion = (stepTitle, currentStatus) => {
    const statusOrder = ['Order Placed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered'];
    return statusOrder.indexOf(stepTitle) <= statusOrder.indexOf(currentStatus);
  };

  return (
    <OrderContext.Provider value={{ orders, createOrder, getOrder, updateOrderStatus }}>
      {children}
    </OrderContext.Provider>
  );
}

export const useOrder = () => useContext(OrderContext);