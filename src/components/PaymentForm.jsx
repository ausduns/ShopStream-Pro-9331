import { useState } from 'react';
import { motion } from 'framer-motion';
import { BsCreditCard, BsPaypal } from 'react-icons/bs';
import { usePayment } from '../contexts/PaymentContext';

export default function PaymentForm({ amount, onSuccess }) {
  const { processPayment, processing, error } = usePayment();
  const [paymentType, setPaymentType] = useState('card');
  const [formData, setFormData] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await processPayment(amount, {
        ...formData,
        type: paymentType
      });
      onSuccess(result);
    } catch (err) {
      // Error is handled by PaymentContext
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    // Format card number with spaces
    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').match(/.{1,4}/g)?.join(' ') || '';
    }
    // Format expiry date
    if (name === 'expiry') {
      formattedValue = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    }
    // Limit CVV to 3-4 digits
    if (name === 'cvv') {
      formattedValue = value.slice(0, 4);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment Method</h3>
        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => setPaymentType('card')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              paymentType === 'card'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-300'
            }`}
          >
            <BsCreditCard />
            Credit Card
          </button>
          <button
            type="button"
            onClick={() => setPaymentType('paypal')}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
              paymentType === 'paypal'
                ? 'border-primary bg-primary/10 text-primary'
                : 'border-gray-300'
            }`}
          >
            <BsPaypal />
            PayPal
          </button>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded">
          {error}
        </div>
      )}

      {paymentType === 'card' ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Card Number
            </label>
            <input
              type="text"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleChange}
              placeholder="4242 4242 4242 4242"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              maxLength="19"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Cardholder Name
            </label>
            <input
              type="text"
              name="cardName"
              value={formData.cardName}
              onChange={handleChange}
              placeholder="John Doe"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Expiry Date
              </label>
              <input
                type="text"
                name="expiry"
                value={formData.expiry}
                onChange={handleChange}
                placeholder="MM/YY"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                maxLength="5"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CVV
              </label>
              <input
                type="text"
                name="cvv"
                value={formData.cvv}
                onChange={handleChange}
                placeholder="123"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary"
                maxLength="4"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={processing}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-secondary transition-colors disabled:bg-gray-400"
          >
            {processing ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
          </button>
        </form>
      ) : (
        <div className="text-center py-4">
          <button
            onClick={() => window.location.href = '#'}
            className="bg-[#0070BA] text-white py-2 px-6 rounded-md hover:bg-[#003087] transition-colors"
          >
            Pay with PayPal
          </button>
        </div>
      )}

      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Your payment information is secure and encrypted</p>
      </div>
    </motion.div>
  );
}