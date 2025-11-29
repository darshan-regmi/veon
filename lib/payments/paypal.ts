export const createPayPalOrder = async (amount: number, currency: string = 'USD') => {
  const response = await fetch('/api/payments/paypal/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amount.toFixed(2),
      currency,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create PayPal order');
  }

  return response.json();
};

export const capturePayPalOrder = async (orderId: string) => {
  const response = await fetch('/api/payments/paypal/capture-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId }),
  });

  if (!response.ok) {
    throw new Error('Failed to capture PayPal order');
  }

  return response.json();
};