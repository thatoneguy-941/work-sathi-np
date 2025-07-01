
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
import { QrCode, Copy } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface PaymentQRModalProps {
  children: React.ReactNode;
  amount: number;
  invoiceNumber: string;
  paymentLink?: string;
}

const PaymentQRModal = ({ children, amount, invoiceNumber, paymentLink }: PaymentQRModalProps) => {
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

  const esewaLink = paymentLink || `esewa://pay?amt=${amount}&pid=${invoiceNumber}&pcd=EPAYTEST`;
  const khaltiLink = `https://khalti.com/payment/verify/?pidx=${invoiceNumber}&amount=${amount * 100}`;

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Payment Options
          </DialogTitle>
          <DialogDescription>
            Choose your preferred payment method for Rs. {amount.toLocaleString()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* eSewa Section */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-green-600">eSewa Payment</h3>
              <img src="/placeholder.svg" alt="eSewa" className="h-6" />
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm font-mono break-all mb-3">
              {esewaLink}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => copyToClipboard(esewaLink)}
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy eSewa Link
            </Button>
          </div>

          {/* Khalti Section */}
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-purple-600">Khalti Payment</h3>
              <img src="/placeholder.svg" alt="Khalti" className="h-6" />
            </div>
            <div className="bg-gray-50 p-3 rounded text-sm font-mono break-all mb-3">
              {khaltiLink}
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => copyToClipboard(khaltiLink)}
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Khalti Link
            </Button>
          </div>

          {/* Manual Payment */}
          <div className="border rounded-lg p-4">
            <h3 className="font-semibold text-gray-600 mb-2">Manual Payment</h3>
            <p className="text-sm text-gray-600 mb-3">
              Share invoice number <span className="font-mono bg-gray-100 px-2 py-1 rounded">{invoiceNumber}</span> with your client
            </p>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={() => copyToClipboard(invoiceNumber)}
              className="w-full"
            >
              <Copy className="w-4 h-4 mr-2" />
              Copy Invoice Number
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentQRModal;
