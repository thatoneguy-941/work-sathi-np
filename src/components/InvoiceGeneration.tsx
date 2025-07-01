
import React, { useState, useEffect } from 'react';
import { Plus, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddInvoiceModal from '@/components/modals/AddInvoiceModal';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';
import InvoiceStats from '@/components/invoices/InvoiceStats';
import InvoiceTable from '@/components/invoices/InvoiceTable';
import { useToast } from '@/hooks/use-toast';
import { getInvoices, deleteInvoice, updatePaymentStatus, type Invoice } from '@/lib/database';

const InvoiceGeneration = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      const invoicesData = await getInvoices();
      setInvoices(invoicesData);
    } catch (error) {
      console.error('Error loading invoices:', error);
      toast({
        title: t('error'),
        description: t('failedToLoadInvoices'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInvoiceAdded = (newInvoice: Invoice) => {
    setInvoices(prev => [newInvoice, ...prev]);
  };

  const handleInvoiceUpdated = (updatedInvoice: Invoice) => {
    setInvoices(prev => prev.map(i => i.id === updatedInvoice.id ? updatedInvoice : i));
  };

  const handleDeleteInvoice = async (invoiceId: string) => {
    if (!confirm(t('confirmDeleteInvoice'))) return;
    
    try {
      await deleteInvoice(invoiceId);
      setInvoices(prev => prev.filter(i => i.id !== invoiceId));
      toast({
        title: t('invoiceDeleted'),
        description: t('invoiceDeletedSuccessfully'),
      });
    } catch (error) {
      console.error('Error deleting invoice:', error);
      toast({
        title: t('error'),
        description: t('failedToDeleteInvoice'),
        variant: "destructive",
      });
    }
  };

  const handleTogglePaymentStatus = async (invoiceId: string, currentStatus: string) => {
    const newStatus = currentStatus === 'Paid' ? 'Unpaid' : 'Paid';
    
    try {
      await updatePaymentStatus(invoiceId, newStatus as any);
      setInvoices(prev => prev.map(inv => 
        inv.id === invoiceId ? { ...inv, status: newStatus as any } : inv
      ));
      toast({
        title: t('invoiceUpdated'),
        description: `${t('invoiceMarkedAs')} ${t(newStatus.toLowerCase())}`,
      });
    } catch (error) {
      console.error('Error updating invoice:', error);
      toast({
        title: t('error'),
        description: t('failedToUpdateInvoice'),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{t('invoiceManagement')}</h1>
            <p className="text-gray-600">{t('generateDesc')}</p>
          </div>
        </div>
        <div className="text-center py-8">{t('loading')}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{t('invoiceManagement')}</h1>
          <p className="text-gray-600">{t('generateDesc')}</p>
        </div>
        <div className="flex-shrink-0">
          <AddInvoiceModal onInvoiceAdded={handleInvoiceAdded}>
            <QuickActionCard icon={Plus} label={t('createInvoice')} />
          </AddInvoiceModal>
        </div>
      </div>

      {/* Invoice Statistics */}
      <InvoiceStats invoices={invoices} />

      {invoices.length === 0 ? (
        <EmptyState
          icon={FileText}
          title={t('noInvoicesYet')}
          description={t('createFirstInvoice')}
          action={
            <AddInvoiceModal onInvoiceAdded={handleInvoiceAdded}>
              <QuickActionCard icon={Plus} label={t('createFirstInvoiceDesc')} />
            </AddInvoiceModal>
          }
        />
      ) : (
        <InvoiceTable
          invoices={invoices}
          onInvoiceUpdated={handleInvoiceUpdated}
          onDeleteInvoice={handleDeleteInvoice}
          onTogglePaymentStatus={handleTogglePaymentStatus}
        />
      )}
    </div>
  );
};

export default InvoiceGeneration;
