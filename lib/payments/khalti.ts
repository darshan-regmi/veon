export interface KhaltiConfig {
  publicKey: string;
  baseUrl: string;
}

export const initializeKhalti = (amount: number, orderId: string, onSuccess: (token: string) => void) => {
  const config: KhaltiConfig = {
    publicKey: process.env.NEXT_PUBLIC_KHALTI_PUBLIC_KEY || '',
    baseUrl: process.env.NEXT_PUBLIC_KHALTI_BASE_URL || 'https://khalti.com/api/v2/',
  };

  // Load Khalti script dynamically
  const script = document.createElement('script');
  script.src = 'https://khalti.s3.ap-south-1.amazonaws.com/KPG/dist/2020.12.17.0.0.0/khalti-checkout.iffe.js';
  script.onload = () => {
    const khaltiConfig = {
      publicKey: config.publicKey,
      productIdentity: orderId,
      productName: 'E-Book Purchase',
      productUrl: window.location.origin,
      paymentPreference: [
        'KHALTI',
        'EBANKING',
        'MOBILE_BANKING',
        'CONNECT_IPS',
        'SCT',
      ],
      eventHandler: {
        onSuccess: (payload: any) => {
          onSuccess(payload.token);
        },
        onError: (error: any) => {
          console.error('Khalti payment error:', error);
        },
        onClose: () => {
          console.log('Khalti widget closed');
        },
      },
    };

    // @ts-ignore
    const checkout = new KhaltiCheckout(khaltiConfig);
    checkout.show({ amount: amount * 100 }); // Amount in paisa
  };

  document.head.appendChild(script);
};

export const verifyKhaltiPayment = async (token: string, amount: number) => {
  const response = await fetch('/api/payments/khalti/verify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token,
      amount: amount * 100, // Amount in paisa
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to verify Khalti payment');
  }

  return response.json();
};