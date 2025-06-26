
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, FileText, Plus, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddClientModal from '@/components/modals/AddClientModal';
import AddProjectModal from '@/components/modals/AddProjectModal';
import AddInvoiceModal from '@/components/modals/AddInvoiceModal';
import StatCard from '@/components/shared/StatCard';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';

interface DashboardProps {
  onTabChange?: (tab: string) => void;
}

const Dashboard = ({ onTabChange }: DashboardProps) => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('totalIncome'),
      value: 'Rs. 0',
      trend: '+0%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: t('activeClients'),
      value: '0',
      trend: '+0',
      icon: Users,
      color: 'text-blue-600',
      onClick: () => onTabChange?.('clients')
    },
    {
      title: t('pendingInvoices'),
      value: '0',
      trend: 'Rs. 0',
      icon: FileText,
      color: 'text-orange-600',
      onClick: () => onTabChange?.('invoices')
    },
    {
      title: t('thisMonth'),
      value: 'Rs. 0',
      trend: '+0%',
      icon: Calendar,
      color: 'text-purple-600'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-xl">
        <h1 className="text-3xl font-medium mb-3">{t('welcomeBack')}</h1>
        <p className="text-blue-100 text-lg">{t('dashboardSubtitle')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium">{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AddClientModal>
              <QuickActionCard icon={Plus} label={t('addClient')} />
            </AddClientModal>
            <AddProjectModal>
              <QuickActionCard icon={Plus} label={t('newProject')} variant="outline" />
            </AddProjectModal>
            <AddInvoiceModal>
              <QuickActionCard icon={FileText} label={t('createInvoice')} variant="outline" />
            </AddInvoiceModal>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Section */}
      <EmptyState
        icon={Users}
        title={t('noDataYet')}
        description={t('startByAdding')}
        action={
          <AddClientModal>
            <QuickActionCard icon={Plus} label={t('addFirstClient')} />
          </AddClientModal>
        }
      />
    </div>
  );
};

export default Dashboard;
