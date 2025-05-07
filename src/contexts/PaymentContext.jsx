import { createContext, useContext, useState } from 'react';

const PaymentContext = createContext();

export function PaymentProvider({ children }) {
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState(null);

  const processPayment = async (amount, paymentDetails) => {
    setProcessing(true);
    setError(null);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Validate card number (basic Luhn algorithm)
      if (!isValidCardNumber(paymentDetails.cardNumber)) {
        throw new Error('Invalid card number');
      }

      return {
        success: true,
        transactionId: `tr_${Date.now()}`,
        amount,
        last4: paymentDetails.cardNumber.slice(-4)
      };
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setProcessing(false);
    }
  };

  const isValidCardNumber = (number) => {
    const digits = number.replace(/\D/g, '');
    let sum = 0;
    let isEven = false;
    
    for (let i = digits.length - 1; i >= 0; i--) {
      let digit = parseInt(digits[i], 10);
      
      if (isEven) {
        digit *= 2;
        if (digit > 9) {
          digit -= 9;
        }
      }
      
      sum += digit;
      isEven = !isEven;
    }
    
    return sum % 10 === 0;
  };

  return (
    <PaymentContext.Provider value={{
      paymentMethod,
      setPaymentMethod,
      processing,
      error,
      processPayment
    }}>
      {children}
    </PaymentContext.Provider>
  );
}

export const usePayment = () => useContext(PaymentContext);