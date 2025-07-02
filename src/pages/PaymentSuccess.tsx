
import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowLeft, Receipt } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { updatePaymentStatus } from '@/lib/database';

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(true);
  
  const gateway = searchParams.get('gateway');
  const invoiceNumber = searchParams.get('invoice');
  const token = searchParams.get('token');
  const amount = searchParams.get('amount');

  useEffect(() => {
    const processPayment = async () => {
      if (invoiceNumber) {
        try {
          // Update payment status in database
          await updatePaymentStatus(invoiceNumber, 'Paid');
          
          toast({
            title: "Payment Successful!",
            description: `Invoice ${invoiceNumber} has been marked as paid.`,
          });
        } catch (error) {
          console.error('Error updating payment status:', error);
          toast({
            title: "Payment Received",
            description: "Payment was successful, but there was an issue updating the status. Please contact support.",
            variant: "destructive",
          });
        }
      }
      setProcessing(false);
    };

    processPayment();
  }, [invoiceNumber, toast]);

  const getGatewayName = () => {
    switch (gateway) {
      case 'esewa': return 'eSewa';
      case 'khalti': return 'Khalti';
      default: return 'Payment Gateway';
    }
  };

  if (processing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Processing your payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-600">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-gray-600">
              Your payment via {getGatewayName()} has been processed successfully.
            </p>
            {invoiceNumber && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Invoice Number</p>
                <p className="font-mono font-semibold">{invoiceNumber}</p>
              </div>
            )}
            {amount && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Amount Paid</p>
                <p className="font-semibold text-lg">
                  Rs. {gateway === 'khalti' ? (parseInt(amount) / 100).toLocaleString() : amount}
                </p>
              </div>
            )}
            {token && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Transaction ID</p>
                <p className="font-mono text-sm">{token}</p>
              </div>
            )}
          </div>
          
          <div className="flex flex-col gap-3 pt-4">
            <Button onClick={() => navigate('/invoices')} className="w-full">
              <Receipt className="w-4 h-4 mr-2" />
              View Invoices
            </Button>
            <Button variant="outline" onClick={() => navigate('/')} className="w-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentSuccess;
