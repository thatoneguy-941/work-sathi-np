
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddClientModal from '@/components/modals/AddClientModal';
import AddProjectModal from '@/components/modals/AddProjectModal';
import AddInvoiceModal from '@/components/modals/AddInvoiceModal';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';

interface DashboardQuickActionsProps {
  stats: any;
  onStatsReload: () => void;
}

const DashboardQuickActions = ({ stats, onStatsReload }: DashboardQuickActionsProps) => {
  const { t } = useLanguage();

  return (
    <>
      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl font-medium">{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <AddClientModal onClientAdded={onStatsReload}>
              <QuickActionCard icon={Plus} label={t('addClient')} />
            </AddClientModal>
            <AddProjectModal onProjectAdded={onStatsReload}>
              <QuickActionCard icon={Plus} label={t('newProject')} />
            </AddProjectModal>
            <AddInvoiceModal onInvoiceAdded={onStatsReload}>
              <QuickActionCard icon={FileText} label={t('createInvoice')} />
            </AddInvoiceModal>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Guide - Only show if no data */}
      {(!stats || stats.totalClients === 0) && (
        <EmptyState
          icon={Users}
          title={t('noDataYet')}
          description={t('startByAddingClient')}
          action={
            <AddClientModal onClientAdded={onStatsReload}>
              <QuickActionCard icon={Plus} label={t('addFirstClient')} />
            </AddClientModal>
          }
        />
      )}
    </>
  );
};

export default DashboardQuickActions;
