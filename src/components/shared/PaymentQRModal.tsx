
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { QrCode, Copy, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  generateEsewaPayment, 
  generateKhaltiPayment, 
  processEsewaPayment, 
  processKhaltiPayment,
  generatePaymentQR,
  type PaymentRequest 
} from '@/lib/payment-utils';

interface PaymentQRModalProps {
  children: React.ReactNode;
  amount: number;
  invoiceNumber: string;
  paymentLink?: string;
  clientEmail?: string;
  clientPhone?: string;
}

const PaymentQRModal = ({ 
  children, 
  amount, 
  invoiceNumber, 
  paymentLink,
  clientEmail,
  clientPhone 
}: PaymentQRModalProps) => {
  const { toast } = useToast();
  const { t } = useLanguage();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: 'Copied!',
        description: 'Payment link copied to clipboard',
      });
    } catch (err) {
      toast({
        title: 'Error',
        description: 'Failed to copy to clipboard',
        variant: "destructive",
      });
    }
  };

  const handleEsewaPayment = () => {
    const paymentRequest: PaymentRequest = {
      amount,
      invoiceNumber,
      clientEmail,
      clientPhone,
      description: `Payment for Invoice ${invoiceNumber}`
    };
    
    const paymentData = generateEsewaPayment(paymentRequest);
    processEsewaPayment(paymentData);
  };

  const handleKhaltiPayment = () => {
    const paymentRequest: PaymentRequest = {
      amount,
      invoiceNumber,
      clientEmail,
      clientPhone,
      description: `Payment for Invoice ${invoiceNumber}`
    };
    
    const paymentData = generateKhaltiPayment(paymentRequest);
    processKhaltiPayment(paymentData);
  };

  const esewaQR = paymentLink || generatePaymentQR(amount, invoiceNumber);
  const manualPaymentInfo = `Invoice: ${invoiceNumber}\nAmount: Rs. ${amount.toLocaleString()}\neSewa ID: 9841234567\nKhalti ID: 9841234567`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Payment Options - Rs. {amount.toLocaleString()}
          </DialogTitle>
          <DialogDescription>
            Choose your preferred payment method for Invoice {invoiceNumber}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* eSewa Section */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-600 flex items-center gap-2">
                <img src="/placeholder.svg" alt="eSewa" className="h-6 w-6" />
                eSewa Payment
              </h3>
              <Button 
                onClick={handleEsewaPayment}
                className="bg-green-600 hover:bg-green-700"
                size="sm"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with eSewa
              </Button>
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm font-mono break-all mb-3">
              {esewaQR}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => copyToClipboard(esewaQR)}
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy eSewa QR Link
            </Button>
          </div>

          {/* Khalti Section */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-purple-600 flex items-center gap-2">
                <img src="/placeholder.svg" alt="Khalti" className="h-6 w-6" />
                Khalti Payment
              </h3>
              <Button 
                onClick={handleKhaltiPayment}
                className="bg-purple-600 hover:bg-purple-700"
                size="sm"
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Pay with Khalti
              </Button>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              Pay using Khalti wallet, mobile banking, or connect IPS
            </p>
          </div>

          {/* Manual Payment Instructions */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-600 mb-2">Manual Payment Instructions</h3>
            <div className="bg-gray-50 p-3 rounded text-sm mb-3 whitespace-pre-line">
              {manualPaymentInfo}
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Send payment screenshot to confirm payment
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => copyToClipboard(manualPaymentInfo)}
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Payment Details
            </Button>
          </div>
        </div>

        <div className="text-xs text-gray-500 text-center">
          * Test environment - Use test credentials for payments
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentQRModal;
