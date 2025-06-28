
import React, { useState, useEffect } from 'react';
import { Plus, FileText, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddInvoiceModal from '@/components/modals/AddInvoiceModal';
import EditInvoiceModal from '@/components/modals/EditInvoiceModal';
import StatCard from '@/components/shared/StatCard';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { getInvoices, deleteInvoice, updateInvoice, type Invoice } from '@/lib/database';

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
      await updateInvoice(invoiceId, { status: newStatus as any });
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

  const getStatusBadge = (status: string) => {
    const variants: { [key: string]: "default" | "secondary" | "destructive" | "outline" } = {
      'Unpaid': 'destructive',
      'Paid': 'default'
    };
    return <Badge variant={variants[status] || 'outline'}>{t(status.toLowerCase())}</Badge>;
  };

  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  
  const paidThisMonth = invoices
    .filter(inv => {
      const issueDate = new Date(inv.issue_date);
      return inv.status === 'Paid' && 
             issueDate.getMonth() === currentMonth && 
             issueDate.getFullYear() === currentYear;
    })
    .reduce((sum, inv) => sum + inv.amount, 0);

  const pending = invoices
    .filter(inv => inv.status === 'Unpaid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const overdue = invoices
    .filter(inv => inv.status === 'Unpaid' && new Date(inv.due_date) < new Date())
    .reduce((sum, inv) => sum + inv.amount, 0);

  const stats = [
    { title: t('paidThisMonth'), value: `Rs. ${paidThisMonth.toLocaleString()}`, icon: FileText, color: 'text-green-600' },
    { title: t('pending'), value: `Rs. ${pending.toLocaleString()}`, icon: FileText, color: 'text-yellow-600' },
    { title: t('overdue'), value: `Rs. ${overdue.toLocaleString()}`, icon: FileText, color: 'text-red-600' },
    { title: t('totalInvoices'), value: invoices.length.toString(), icon: FileText, color: 'text-blue-600' }
  ];

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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

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
                      onClick={() => handleTogglePaymentStatus(invoice.id, invoice.status)}
                      className="cursor-pointer"
                    >
                      {getStatusBadge(invoice.status)}
                    </button>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditInvoiceModal invoice={invoice} onInvoiceUpdated={handleInvoiceUpdated}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </EditInvoiceModal>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteInvoice(invoice.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default InvoiceGeneration;
