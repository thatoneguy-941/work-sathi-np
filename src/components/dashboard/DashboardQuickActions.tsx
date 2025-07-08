
import React, { memo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Users, Zap } from 'lucide-react';
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

const DashboardQuickActions = memo(({ stats, onStatsReload }: DashboardQuickActionsProps) => {
  const { t } = useLanguage();

  const quickActions = [
    {
      modal: AddClientModal,
      icon: Plus,
      label: t('addClient'),
      description: 'Add new clients to your portfolio'
    },
    {
      modal: AddProjectModal,
      icon: Zap,
      label: t('newProject'),
      description: 'Start a new project'
    },
    {
      modal: AddInvoiceModal,
      icon: FileText,
      label: t('createInvoice'),
      description: 'Generate professional invoices'
    }
  ];

  return (
    <>
      {/* Quick Actions */}
      <Card variant="elevated" className="interactive-hover">
        <CardHeader className="pb-6">
          <CardTitle className="text-subheading flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            Quick actions
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="dashboard-stats-grid">
            {quickActions.map((action, index) => {
              const ModalComponent = action.modal;
              return (
                <ModalComponent key={index} onClientAdded={onStatsReload} onProjectAdded={onStatsReload} onInvoiceAdded={onStatsReload}>
                  <div className="group">
                    <QuickActionCard 
                      icon={action.icon} 
                      label={action.label} 
                      variant="elevated" 
                    />
                    <p className="text-xs text-muted-foreground mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                      {action.description}
                    </p>
                  </div>
                </ModalComponent>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Guide - Only show if no data */}
      {(!stats || stats.totalClients === 0) && (
        <Card variant="glass" className="p-8 text-center">
          <div className="max-w-md mx-auto">
            <div className="p-4 rounded-full bg-primary/10 w-fit mx-auto mb-4">
              <Users className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-subheading mb-2">{t('noDataYet')}</h3>
            <p className="text-caption mb-6">{t('startByAddingClient')}</p>
            <AddClientModal onClientAdded={onStatsReload}>
              <QuickActionCard icon={Plus} label={t('addFirstClient')} variant="gradient" />
            </AddClientModal>
          </div>
        </Card>
      )}
    </>
  );
});

DashboardQuickActions.displayName = 'DashboardQuickActions';

export default DashboardQuickActions;
