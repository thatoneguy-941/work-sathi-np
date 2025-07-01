
import React from 'react';
import { TrendingUp, Users, Calendar, Clock } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import StatCard from '@/components/shared/StatCard';

interface DashboardStatsProps {
  stats: any;
  onTabChange?: (tab: string) => void;
}

const DashboardStats = ({ stats, onTabChange }: DashboardStatsProps) => {
  const { t } = useLanguage();

  const dashboardStats = [
    {
      title: t('totalIncome'),
      value: `Rs. ${stats?.totalIncome?.toLocaleString() || '0'}`,
      trend: stats?.incomeGrowth || '+0%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: t('activeClients'),
      value: stats?.totalClients?.toString() || '0',
      trend: `${stats?.totalProjects || 0} projects`,
      icon: Users,
      color: 'text-blue-600',
      onClick: () => onTabChange?.('clients')
    },
    {
      title: t('thisMonth'),
      value: `Rs. ${stats?.monthlyIncome?.toLocaleString() || '0'}`,
      trend: stats?.incomeGrowth || '+0%',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: t('pending'),
      value: `Rs. ${stats?.totalPending?.toLocaleString() || '0'}`,
      trend: `${stats?.unpaidInvoicesCount || 0} invoices`,
      icon: Clock,
      color: 'text-orange-600',
      onClick: () => onTabChange?.('invoices')
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {dashboardStats.map((stat, index) => (
        <StatCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default DashboardStats;
