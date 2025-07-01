
import React from 'react';
import { Edit, Trash2, QrCode } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EditInvoiceModal from '@/components/modals/EditInvoiceModal';
import PaymentQRModal from '@/components/shared/PaymentQRModal';
import type { Invoice } from '@/lib/database';

interface InvoiceActionsProps {
  invoice: Invoice;
  onInvoiceUpdated: (invoice: Invoice) => void;
  onDeleteInvoice: (invoiceId: string) => void;
}

const InvoiceActions = ({ invoice, onInvoiceUpdated, onDeleteInvoice }: InvoiceActionsProps) => {
  return (
    <div className="flex space-x-2">
      <PaymentQRModal 
        amount={invoice.amount} 
        invoiceNumber={invoice.invoice_number}
        paymentLink={invoice.payment_link}
      >
        <Button size="sm" variant="outline">
          <QrCode className="w-4 h-4" />
        </Button>
      </PaymentQRModal>
      <EditInvoiceModal invoice={invoice} onInvoiceUpdated={onInvoiceUpdated}>
        <Button size="sm" variant="outline">
          <Edit className="w-4 h-4" />
        </Button>
      </EditInvoiceModal>
      <Button 
        size="sm" 
        variant="outline"
        onClick={() => onDeleteInvoice(invoice.id)}
      >
        <Trash2 className="w-4 h-4" />
      </Button>
    </div>
  );
};

export default InvoiceActions;
