'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CreditCard, Smartphone, Globe, Wallet, CircleCheck as CheckCircle, CircleAlert as AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth';
import { useCart } from '@/lib/cart';

export type PaymentMethod = 
  | 'stripe' 
  | 'paypal' 
  | 'esewa' 
  | 'khalti' 
  | 'razorpay' 
  | 'googlepay' 
  | 'applepay';

interface PaymentMethodsProps {
  totalAmount: number;
  onPaymentSelect: (method: PaymentMethod) => void;
  loading?: boolean;
  selectedMethod?: PaymentMethod;
}

export default function PaymentMethods({ 
  totalAmount, 
  onPaymentSelect, 
  loading = false,
  selectedMethod 
}: PaymentMethodsProps) {
  const { user } = useAuth();
  const { totalItems } = useCart();

  const paymentMethods = [
    {
      id: 'stripe' as PaymentMethod,
      name: 'Credit/Debit Card',
      description: 'Visa, Mastercard, American Express',
      icon: CreditCard,
      color: 'bg-blue-500',
      available: true,
      fees: '2.9% + $0.30',
      regions: ['Global'],
    },
    {
      id: 'paypal' as PaymentMethod,
      name: 'PayPal',
      description: 'Pay with your PayPal account',
      icon: Wallet,
      color: 'bg-blue-600',
      available: true,
      fees: '2.9% + $0.30',
      regions: ['Global'],
    },
    {
      id: 'googlepay' as PaymentMethod,
      name: 'Google Pay',
      description: 'Quick payment with Google Pay',
      icon: Smartphone,
      color: 'bg-green-500',
      available: typeof window !== 'undefined' && 'PaymentRequest' in window,
      fees: '2.9%',
      regions: ['Global'],
    },
    {
      id: 'applepay' as PaymentMethod,
      name: 'Apple Pay',
      description: 'Pay with Touch ID or Face ID',
      icon: Smartphone,
      color: 'bg-gray-800',
      available: typeof window !== 'undefined' && 'ApplePaySession' in window,
      fees: '2.9%',
      regions: ['Global'],
    },
    {
      id: 'esewa' as PaymentMethod,
      name: 'eSewa',
      description: 'Nepal\'s digital wallet',
      icon: Wallet,
      color: 'bg-green-600',
      available: true,
      fees: '1.5%',
      regions: ['Nepal'],
    },
    {
      id: 'khalti' as PaymentMethod,
      name: 'Khalti',
      description: 'Digital wallet for Nepal',
      icon: Wallet,
      color: 'bg-purple-600',
      available: true,
      fees: '1.5%',
      regions: ['Nepal'],
    },
    {
      id: 'razorpay' as PaymentMethod,
      name: 'Razorpay',
      description: 'UPI, Cards, Net Banking',
      icon: CreditCard,
      color: 'bg-blue-700',
      available: true,
      fees: '2%',
      regions: ['India'],
    },
  ];

  const getRegionBadgeColor = (regions: string[]) => {
    if (regions.includes('Global')) return 'bg-green-100 text-green-800';
    if (regions.includes('Nepal')) return 'bg-orange-100 text-orange-800';
    if (regions.includes('India')) return 'bg-blue-100 text-blue-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Payment Method</h2>
        <p className="text-gray-600">
          Total: <span className="font-semibold">${totalAmount.toFixed(2)}</span> for {totalItems} item{totalItems !== 1 ? 's' : ''}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <Card 
            key={method.id}
            className={`cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedMethod === method.id 
                ? 'ring-2 ring-primary border-primary' 
                : method.available 
                  ? 'hover:border-gray-300' 
                  : 'opacity-50 cursor-not-allowed'
            }`}
            onClick={() => method.available && onPaymentSelect(method.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${method.color} text-white`}>
                    <method.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{method.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {method.description}
                    </CardDescription>
                  </div>
                </div>
                {selectedMethod === method.id && (
                  <CheckCircle className="w-6 h-6 text-primary" />
                )}
                {!method.available && (
                  <AlertCircle className="w-6 h-6 text-gray-400" />
                )}
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  {method.regions.map((region) => (
                    <Badge 
                      key={region}
                      variant="secondary" 
                      className={`text-xs ${getRegionBadgeColor(method.regions)}`}
                    >
                      {region}
                    </Badge>
                  ))}
                </div>
                <span className="text-sm text-gray-500">
                  {method.fees}
                </span>
              </div>
              {!method.available && (
                <p className="text-xs text-gray-500 mt-2">
                  Not available on this device/browser
                </p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-4">
        <div className="flex items-start space-x-2">
          <Globe className="w-5 h-5 text-gray-400 mt-0.5" />
          <div>
            <h3 className="font-medium text-gray-900">Secure Payment</h3>
            <p className="text-sm text-gray-600">
              All payments are processed securely using industry-standard encryption. 
              Your payment information is never stored on our servers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}