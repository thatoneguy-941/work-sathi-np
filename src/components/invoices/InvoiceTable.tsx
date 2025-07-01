
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import InvoiceActions from './InvoiceActions';
import type { Invoice } from '@/lib/database';

interface InvoiceTableProps {
  invoices: Invoice[];
  onInvoiceUpdated: (invoice: Invoice) => void;
  onDeleteInvoice: (invoiceId: string) => void;
  onTogglePaymentStatus: (invoiceId: string, currentStatus: string) => void;
}

const InvoiceTable = ({ 
  invoices, 
  onInvoiceUpdated, 
  onDeleteInvoice, 
  onTogglePaymentStatus 
}: InvoiceTableProps) => {
  const { t } = useLanguage();

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Unpaid': 'destructive',
      'Paid': 'default'
    };
    return <Badge variant={variants[status] || 'outline'}>{t(status.toLowerCase())}</Badge>;
  };

  return (
    <div className="bg-white rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>{t('invoiceNumber')}</TableHead>
            <TableHead>{t('project')}</TableHead>
            <TableHead>{t('client')}</TableHead>
            <TableHead>{t('amount')}</TableHead>
            <TableHead>{t('dueDate')}</TableHead>
            <TableHead>{t('status')}</TableHead>
            <TableHead>{t('actions')}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">{invoice.invoice_number}</TableCell>
              <TableCell>{invoice.project?.project_name || '-'}</TableCell>
              <TableCell>{invoice.project?.client?.name || '-'}</TableCell>
              <TableCell>Rs. {invoice.amount.toLocaleString()}</TableCell>
              <TableCell>{new Date(invoice.due_date).toLocaleDateString()}</TableCell>
              <TableCell>
                <button 
                  onClick={() => onTogglePaymentStatus(invoice.id, invoice.status)}
                  className="cursor-pointer"
                >
                  {getStatusBadge(invoice.status)}
                </button>
              </TableCell>
              <TableCell>
                <InvoiceActions
                  invoice={invoice}
                  onInvoiceUpdated={onInvoiceUpdated}
                  onDeleteInvoice={onDeleteInvoice}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default InvoiceTable;
