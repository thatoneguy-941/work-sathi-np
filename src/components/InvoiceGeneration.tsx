
import React, { useState } from 'react';
import { Plus, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddInvoiceModal from '@/components/modals/AddInvoiceModal';
import StatCard from '@/components/shared/StatCard';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';

const InvoiceGeneration = () => {
  const { t } = useLanguage();
  const [invoices] = useState([]);

  const stats = [
    { title: t('paidThisMonth'), value: 'Rs. 0', icon: FileText, color: 'text-green-600' },
    { title: t('pending'), value: 'Rs. 0', icon: FileText, color: 'text-yellow-600' },
    { title: t('overdue'), value: 'Rs. 0', icon: FileText, color: 'text-red-600' },
    { title: t('totalInvoices'), value: '0', icon: FileText, color: 'text-blue-600' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold font-sans">{t('invoiceManagement')}</h2>
        </div>
        <AddInvoiceModal>
          <QuickActionCard icon={Plus} label={t('createInvoice')} />
        </AddInvoiceModal>
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <EmptyState
        icon={FileText}
        title={t('noInvoicesYet')}
        description={t('createFirstInvoice')}
        action={
          <AddInvoiceModal>
            <QuickActionCard icon={Plus} label={t('createFirstInvoiceButton')} />
          </AddInvoiceModal>
        }
      />
    </div>
  );
};

export default InvoiceGeneration;
