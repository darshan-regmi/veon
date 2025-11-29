import CryptoJS from 'crypto-js';

export interface EsewaConfig {
  merchantId: string;
  secretKey: string;
  baseUrl: string;
}

export const createEsewaPayment = (
  amount: number,
  orderId: string,
  config: EsewaConfig
) => {
  const totalAmount = amount.toFixed(2);
  const productCode = 'EPAYTEST'; // Use 'EPAYTEST' for testing
  
  // Create signature for eSewa
  const message = `total_amount=${totalAmount},transaction_uuid=${orderId},product_code=${productCode}`;
  const signature = CryptoJS.HmacSHA256(message, config.secretKey).toString();

  const formData = {
    amount: totalAmount,
    tax_amount: '0',
    total_amount: totalAmount,
    transaction_uuid: orderId,
    product_code: productCode,
    product_service_charge: '0',
    product_delivery_charge: '0',
    success_url: `${window.location.origin}/payment/success`,
    failure_url: `${window.location.origin}/payment/failure`,
    signed_field_names: 'total_amount,transaction_uuid,product_code',
    signature,
  };

  return {
    url: config.baseUrl,
    formData,
  };
};

export const redirectToEsewa = (amount: number, orderId: string) => {
  const config: EsewaConfig = {
    merchantId: process.env.NEXT_PUBLIC_ESEWA_MERCHANT_ID || '',
    secretKey: process.env.NEXT_PUBLIC_ESEWA_SECRET_KEY || '',
    baseUrl: process.env.NEXT_PUBLIC_ESEWA_BASE_URL || 'https://uat.esewa.com.np/epay/main',
  };

  const { url, formData } = createEsewaPayment(amount, orderId, config);

  // Create and submit form
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = url;

  Object.entries(formData).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value.toString();
    form.appendChild(input);
  });

  document.body.appendChild(form);
  form.submit();
};