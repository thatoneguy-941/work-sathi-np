
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
    { title: 'Paid this month', value: 'Rs. 0', icon: FileText, color: 'text-green-600' },
    { title: 'Pending', value: 'Rs. 0', icon: FileText, color: 'text-yellow-600' },
    { title: 'Overdue', value: 'Rs. 0', icon: FileText, color: 'text-red-600' },
    { title: 'Total invoices', value: '0', icon: FileText, color: 'text-blue-600' }
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-heading mb-2">Invoice management</h1>
          <p className="text-caption">Generate and track your invoices</p>
        </div>
        <div className="flex-shrink-0">
          <AddInvoiceModal>
            <QuickActionCard icon={Plus} label={t('createInvoice')} variant="default" />
          </AddInvoiceModal>
        </div>
      </div>

      {/* Invoice Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <EmptyState
        icon={FileText}
        title="No invoices yet"
        description="Create your first invoice"
        action={
          <AddInvoiceModal>
            <QuickActionCard icon={Plus} label="Create first invoice" variant="default" />
          </AddInvoiceModal>
        }
      />
    </div>
  );
};

export default InvoiceGeneration;
