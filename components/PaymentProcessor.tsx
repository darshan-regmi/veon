'use client';

import { useState } from 'react';
import { PaymentMethod } from './PaymentMethods';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader as Loader2, ArrowLeft } from 'lucide-react';

// Import payment handlers
import { createStripePaymentIntent, getStripe } from '@/lib/payments/stripe';
import { createPayPalOrder, capturePayPalOrder } from '@/lib/payments/paypal';
import { redirectToEsewa } from '@/lib/payments/esewa';
import { initializeKhalti, verifyKhaltiPayment } from '@/lib/payments/khalti';
import { initiateRazorpayPayment } from '@/lib/payments/razorpay';

interface PaymentProcessorProps {
  method: PaymentMethod;
  amount: number;
  onBack: () => void;
  onSuccess: (paymentData: any) => void;
  onError: (error: string) => void;
}

export default function PaymentProcessor({
  method,
  amount,
  onBack,
  onSuccess,
  onError
}: PaymentProcessorProps) {
  const { user } = useAuth();
  const { items, clearCart } = useCart();
  const [processing, setProcessing] = useState(false);
  const [paymentData, setPaymentData] = useState<any>(null);

  const processPayment = async () => {
    if (!user) {
      onError('Please log in to continue');
      return;
    }

    setProcessing(true);

    try {
      switch (method) {
        case 'stripe':
          await handleStripePayment();
          break;
        case 'paypal':
          await handlePayPalPayment();
          break;
        case 'esewa':
          await handleEsewaPayment();
          break;
        case 'khalti':
          await handleKhaltiPayment();
          break;
        case 'razorpay':
          await handleRazorpayPayment();
          break;
        case 'googlepay':
          await handleGooglePayPayment();
          break;
        case 'applepay':
          await handleApplePayPayment();
          break;
        default:
          throw new Error('Payment method not implemented');
      }
    } catch (error) {
      console.error('Payment error:', error);
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setProcessing(false);
    }
  };

  const handleStripePayment = async () => {
    const stripe = await getStripe();
    if (!stripe) throw new Error('Stripe not loaded');

    const { clientSecret } = await createStripePaymentIntent(amount);
    
    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: {
          // This would be replaced with actual card element
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    if (paymentIntent?.status === 'succeeded') {
      onSuccess({ method: 'stripe', transactionId: paymentIntent.id });
    }
  };

  const handlePayPalPayment = async () => {
    // PayPal integration would use their SDK
    // This is a simplified version
    const order = await createPayPalOrder(amount);
    
    // In real implementation, this would open PayPal checkout
    // For demo, we'll simulate success
    setTimeout(() => {
      onSuccess({ method: 'paypal', transactionId: order.id });
    }, 2000);
  };

  const handleEsewaPayment = async () => {
    const orderId = `order_${Date.now()}`;
    redirectToEsewa(amount, orderId);
  };

  const handleKhaltiPayment = async () => {
    const orderId = `order_${Date.now()}`;
    
    initializeKhalti(amount, orderId, async (token: string) => {
      try {
        const verification = await verifyKhaltiPayment(token, amount);
        onSuccess({ method: 'khalti', transactionId: verification.idx });
      } catch (error) {
        onError('Khalti payment verification failed');
      }
    });
  };

  const handleRazorpayPayment = async () => {
    const orderId = `order_${Date.now()}`;
    
    await initiateRazorpayPayment(
      amount,
      orderId,
      user.email || '',
      (response: any) => {
        onSuccess({ method: 'razorpay', transactionId: response.razorpay_payment_id });
      },
      (error: any) => {
        onError('Razorpay payment failed');
      }
    );
  };

  const handleGooglePayPayment = async () => {
    if (!window.PaymentRequest) {
      throw new Error('Google Pay not supported');
    }

    const paymentRequest = new PaymentRequest(
      [
        {
          supportedMethods: 'https://google.com/pay',
          data: {
            apiVersion: 2,
            apiVersionMinor: 0,
            merchantInfo: {
              merchantName: 'BookStore',
            },
            allowedPaymentMethods: [
              {
                type: 'CARD',
                parameters: {
                  allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                  allowedCardNetworks: ['MASTERCARD', 'VISA'],
                },
              },
            ],
          },
        },
      ],
      {
        total: {
          label: 'Total',
          amount: {
            currency: 'USD',
            value: amount.toFixed(2),
          },
        },
      }
    );

    const paymentResponse = await paymentRequest.show();
    await paymentResponse.complete('success');
    
    onSuccess({ method: 'googlepay', transactionId: `gp_${Date.now()}` });
  };

  const handleApplePayPayment = async () => {
    if (!window.ApplePaySession) {
      throw new Error('Apple Pay not supported');
    }

    const session = new ApplePaySession(3, {
      countryCode: 'US',
      currencyCode: 'USD',
      supportedNetworks: ['visa', 'masterCard', 'amex'],
      merchantCapabilities: ['supports3DS'],
      total: {
        label: 'BookStore',
        amount: amount.toFixed(2),
      },
    });

    session.onvalidatemerchant = (event) => {
      // Validate merchant session
    };

    session.onpaymentauthorized = (event) => {
      session.completePayment(ApplePaySession.STATUS_SUCCESS);
      onSuccess({ method: 'applepay', transactionId: `ap_${Date.now()}` });
    };

    session.begin();
  };

  const getMethodName = (method: PaymentMethod) => {
    const names = {
      stripe: 'Credit/Debit Card',
      paypal: 'PayPal',
      esewa: 'eSewa',
      khalti: 'Khalti',
      razorpay: 'Razorpay',
      googlepay: 'Google Pay',
      applepay: 'Apple Pay',
    };
    return names[method];
  };

  return (
    <Card className="max-w-md mx-auto">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm" onClick={onBack}>
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <CardTitle>Complete Payment</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg font-semibold">{getMethodName(method)}</h3>
          <p className="text-2xl font-bold text-primary">${amount.toFixed(2)}</p>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium">Order Summary</h4>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.title} × {item.quantity}</span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t pt-2 flex justify-between font-semibold">
            <span>Total</span>
            <span>${amount.toFixed(2)}</span>
          </div>
        </div>

        {method === 'stripe' && (
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Card Details</p>
              {/* Stripe Elements would go here */}
              <div className="bg-gray-100 p-3 rounded text-center text-sm text-gray-500">
                Stripe Card Element (Demo)
              </div>
            </div>
          </div>
        )}

        <Button 
          onClick={processPayment} 
          disabled={processing}
          className="w-full"
          size="lg"
        >
          {processing ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            `Pay $${amount.toFixed(2)}`
          )}
        </Button>

        <p className="text-xs text-gray-500 text-center">
          By completing this payment, you agree to our Terms of Service and Privacy Policy.
        </p>
      </CardContent>
    </Card>
  );
}