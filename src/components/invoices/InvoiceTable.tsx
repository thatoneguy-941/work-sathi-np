
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import InvoiceActions from './InvoiceActions';
import BulkActions from '@/components/shared/BulkActions';
import PaginationControls from '@/components/shared/PaginationControls';
import TableSkeleton from '@/components/shared/TableSkeleton';
import { usePagination } from '@/hooks/usePagination';
import { supabase } from '@/integrations/supabase/client';
import type { Invoice } from '@/lib/database';

interface InvoiceTableProps {
  invoices: Invoice[];
  onInvoiceUpdated: (invoice: Invoice) => void;
  onDeleteInvoice: (invoiceId: string) => void;
  onTogglePaymentStatus: (invoiceId: string, currentStatus: string) => void;
  loading?: boolean;
}

const InvoiceTable = ({ 
  invoices, 
  onInvoiceUpdated, 
  onDeleteInvoice, 
  onTogglePaymentStatus,
  loading = false
}: InvoiceTableProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [selectedInvoices, setSelectedInvoices] = useState<string[]>([]);
  
  const {
    paginatedData,
    currentPage,
    totalPages,
    hasNextPage,
    hasPreviousPage,
    goToNextPage,
    goToPreviousPage,
    goToPage,
  } = usePagination({ data: invoices, itemsPerPage: 10 });

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Unpaid': 'destructive',
      'Paid': 'default'
    };
    return <Badge variant={variants[status] || 'outline'}>{t(status.toLowerCase())}</Badge>;
  };

  const handleSelectInvoice = (invoiceId: string, checked: boolean) => {
    if (checked) {
      setSelectedInvoices(prev => [...prev, invoiceId]);
    } else {
      setSelectedInvoices(prev => prev.filter(id => id !== invoiceId));
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedInvoices(paginatedData.map(invoice => invoice.id));
    } else {
      setSelectedInvoices([]);
    }
  };

  const handleBulkDelete = async () => {
    for (const invoiceId of selectedInvoices) {
      await onDeleteInvoice(invoiceId);
    }
    setSelectedInvoices([]);
    toast({
      title: "Invoices Deleted",
      description: `${selectedInvoices.length} invoices deleted successfully`,
    });
  };

  const handleBulkStatusUpdate = async (status: string) => {
    for (const invoiceId of selectedInvoices) {
      const currentInvoice = paginatedData.find(inv => inv.id === invoiceId);
      if (currentInvoice) {
        await onTogglePaymentStatus(invoiceId, currentInvoice.status === status ? 
          (status === 'Paid' ? 'Unpaid' : 'Paid') : status);
      }
    }
    setSelectedInvoices([]);
    toast({
      title: "Status Updated",
      description: `${selectedInvoices.length} invoices updated to ${status}`,
    });
  };

  const handleBulkEmail = async () => {
    for (const invoiceId of selectedInvoices) {
      const invoice = paginatedData.find(inv => inv.id === invoiceId);
      if (invoice && invoice.project?.client) {
        try {
          await supabase.functions.invoke('send-invoice-email', {
            body: {
              clientEmail: invoice.project.client.email,
              clientName: invoice.project.client.name,
              invoiceNumber: invoice.invoice_number,
              amount: invoice.amount,
              dueDate: invoice.due_date,
              projectName: invoice.project.project_name,
              paymentLink: invoice.payment_link,
            },
          });
        } catch (error) {
          console.error('Failed to send email for invoice:', invoiceId, error);
        }
      }
    }
    setSelectedInvoices([]);
    toast({
      title: "Emails Sent",
      description: `Invoice emails sent to ${selectedInvoices.length} clients`,
    });
  };

  if (loading) {
    return <TableSkeleton rows={10} columns={7} />;
  }

  return (
    <div className="space-y-4">
      <div className="bg-card rounded-lg border">
        <BulkActions
          selectedItems={selectedInvoices}
          totalItems={paginatedData.length}
          onSelectAll={handleSelectAll}
          onBulkDelete={handleBulkDelete}
          onBulkEmail={handleBulkEmail}
          onBulkStatusUpdate={handleBulkStatusUpdate}
          showEmailAction={true}
          showStatusActions={true}
        />
        
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={selectedInvoices.length === paginatedData.length}
                  onCheckedChange={(checked) => handleSelectAll(!!checked)}
                />
              </TableHead>
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
            {paginatedData.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedInvoices.includes(invoice.id)}
                    onCheckedChange={(checked) => handleSelectInvoice(invoice.id, !!checked)}
                  />
                </TableCell>
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
      
      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        hasNextPage={hasNextPage}
        hasPreviousPage={hasPreviousPage}
        onNextPage={goToNextPage}
        onPreviousPage={goToPreviousPage}
        onGoToPage={goToPage}
      />
    </div>
  );
};

export default InvoiceTable;
