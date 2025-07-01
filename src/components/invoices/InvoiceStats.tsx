
import React from 'react';
import { FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import StatCard from '@/components/shared/StatCard';
import type { Invoice } from '@/lib/database';

interface InvoiceStatsProps {
  invoices: Invoice[];
}

const InvoiceStats = ({ invoices }: InvoiceStatsProps) => {
  const { t } = useLanguage();

  // Calculate statistics
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default InvoiceStats;
