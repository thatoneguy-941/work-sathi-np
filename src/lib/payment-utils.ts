
// Enhanced payment utilities for Nepal-specific gateways
export interface PaymentRequest {
  amount: number;
  invoiceNumber: string;
  clientEmail?: string;
  clientPhone?: string;
  description?: string;
}

export interface EsewaPaymentData {
  amt: number;
  pid: string;
  scd: string;
  su: string;
  fu: string;
}

export interface KhaltiPaymentData {
  public_key: string;
  pidx: string;
  amount: number;
  purchase_order_id: string;
  purchase_order_name: string;
  return_url: string;
  website_url: string;
}

// Generate eSewa payment data
export const generateEsewaPayment = (request: PaymentRequest): EsewaPaymentData => {
  return {
    amt: request.amount,
    pid: request.invoiceNumber,
    scd: 'EPAYTEST', // Use 'EPAYTEST' for testing, actual merchant code for production
    su: `${window.location.origin}/payment-success?gateway=esewa&invoice=${request.invoiceNumber}`,
    fu: `${window.location.origin}/payment-failed?gateway=esewa&invoice=${request.invoiceNumber}`
  };
};

// Generate Khalti payment data
export const generateKhaltiPayment = (request: PaymentRequest): KhaltiPaymentData => {
  return {
    public_key: 'test_public_key_dc74e0fd57cb46cd93832aee0a390234', // Test key, replace with actual
    pidx: `KHALTI-${request.invoiceNumber}-${Date.now()}`,
    amount: request.amount * 100, // Khalti uses paisa (amount * 100)
    purchase_order_id: request.invoiceNumber,
    purchase_order_name: `Invoice ${request.invoiceNumber}`,
    return_url: `${window.location.origin}/payment-success?gateway=khalti&invoice=${request.invoiceNumber}`,
    website_url: window.location.origin
  };
};

// Generate eSewa QR code data
export const generatePaymentQR = (amount: number, invoiceNumber?: string): string => {
  const pid = invoiceNumber || `INV-${Date.now()}`;
  return `esewa://pay?amt=${amount}&pid=${pid}&pcd=EPAYTEST`;
};

// Process eSewa payment
export const processEsewaPayment = (paymentData: EsewaPaymentData): void => {
  const form = document.createElement('form');
  form.method = 'POST';
  form.action = 'https://uat.esewa.com.np/epay/main'; // Use production URL for live
  form.target = '_blank';
  
  Object.entries(paymentData).forEach(([key, value]) => {
    const input = document.createElement('input');
    input.type = 'hidden';
    input.name = key;
    input.value = value.toString();
    form.appendChild(input);
  });
  
  document.body.appendChild(form);
  form.submit();
  document.body.removeChild(form);
};

// Process Khalti payment
export const processKhaltiPayment = (paymentData: KhaltiPaymentData): void => {
  // Initialize Khalti checkout
  const checkout = new (window as any).KhaltiCheckout({
    publicKey: paymentData.public_key,
    productIdentity: paymentData.purchase_order_id,
    productName: paymentData.purchase_order_name,
    productUrl: paymentData.website_url,
    paymentPreference: [
      'KHALTI',
      'EBANKING',
      'MOBILE_BANKING',
      'CONNECT_IPS',
      'SCT',
    ],
    eventHandler: {
      onSuccess(payload: any) {
        console.log('Khalti payment successful:', payload);
        // Handle successful payment
        window.location.href = `${paymentData.return_url}&token=${payload.token}&amount=${payload.amount}`;
      },
      onError(error: any) {
        console.error('Khalti payment error:', error);
        // Handle payment error
        window.location.href = `${window.location.origin}/payment-failed?gateway=khalti&error=${error.message}`;
      },
      onClose() {
        console.log('Khalti checkout closed');
      }
    }
  });
  
  checkout.show({ amount: paymentData.amount });
};

// Verify eSewa payment
export const verifyEsewaPayment = async (oid: string, amt: number, refId: string): Promise<boolean> => {
  try {
    const response = await fetch('https://uat.esewa.com.np/epay/transrec', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        amt: amt.toString(),
        scd: 'EPAYTEST',
        rid: refId,
        pid: oid,
      }),
    });
    
    const result = await response.text();
    return result.includes('Success');
  } catch (error) {
    console.error('eSewa verification error:', error);
    return false;
  }
};

// Verify Khalti payment
export const verifyKhaltiPayment = async (token: string, amount: number): Promise<boolean> => {
  try {
    // This should be done on the backend for security
    // Here's a placeholder for the verification logic
    const response = await fetch('/api/verify-khalti-payment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ token, amount }),
    });
    
    const result = await response.json();
    return result.success;
  } catch (error) {
    console.error('Khalti verification error:', error);
    return false;
  }
};
