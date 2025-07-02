
import React from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { XCircle, ArrowLeft, RefreshCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const PaymentFailed = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const gateway = searchParams.get('gateway');
  const invoiceNumber = searchParams.get('invoice');
  const error = searchParams.get('error');

  const getGatewayName = () => {
    switch (gateway) {
      case 'esewa': return 'eSewa';
      case 'khalti': return 'Khalti';
      default: return 'Payment Gateway';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-red-600">Payment Failed</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="space-y-2">
            <p className="text-gray-600">
              Your payment via {getGatewayName()} could not be processed.
            </p>
            {invoiceNumber && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <p className="text-sm text-gray-500">Invoice Number</p>
                <p className="font-mono font-semibold">{invoiceNumber}</p>
              </div>
            )}
            {error && (
              <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                <p className="text-sm text-red-500">Error Details</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
          
          <div className="space-y-3">
            <p className="text-sm text-gray-500">
              Please try again or contact support if the issue persists.
            </p>
            
            <div className="flex flex-col gap-3 pt-4">
              <Button 
                onClick={() => navigate(`/invoices`)} 
                className="w-full"
              >
                <RefreshCcw className="w-4 h-4 mr-2" />
                Try Payment Again
              </Button>
              <Button variant="outline" onClick={() => navigate('/')} className="w-full">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PaymentFailed;
