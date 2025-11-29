export const loadRazorpay = (): Promise<any> => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => {
      resolve((window as any).Razorpay);
    };
    document.body.appendChild(script);
  });
};

export const createRazorpayOrder = async (amount: number, currency: string = 'INR') => {
  const response = await fetch('/api/payments/razorpay/create-order', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: Math.round(amount * 100), // Amount in paise
      currency,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to create Razorpay order');
  }

  return response.json();
};

export const initiateRazorpayPayment = async (
  amount: number,
  orderId: string,
  userEmail: string,
  onSuccess: (response: any) => void,
  onError: (error: any) => void
) => {
  const Razorpay = await loadRazorpay();
  const order = await createRazorpayOrder(amount);

  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: Math.round(amount * 100),
    currency: 'INR',
    name: 'BookStore',
    description: 'E-Book Purchase',
    order_id: order.id,
    handler: onSuccess,
    prefill: {
      email: userEmail,
    },
    theme: {
      color: '#8B5A3C',
    },
    modal: {
      ondismiss: () => {
        console.log('Razorpay modal closed');
      },
    },
  };

  const razorpay = new Razorpay(options);
  razorpay.on('payment.failed', onError);
  razorpay.open();
};