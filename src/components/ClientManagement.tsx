
import React, { useState } from 'react';
import { Plus, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddClientModal from '@/components/modals/AddClientModal';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';

const ClientManagement = () => {
  const { t } = useLanguage();
  const [clients] = useState([]);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center gap-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-3xl font-medium text-foreground capitalize">{t('clientManagementTitle')}</h1>
          <p className="text-muted-foreground mt-2">Manage your client relationships</p>
        </div>
        <div className="flex-shrink-0">
          <AddClientModal>
            <QuickActionCard icon={Plus} label={t('addClient')} />
          </AddClientModal>
        </div>
      </div>

      <EmptyState
        icon={Users}
        title={t('noClientsYet')}
        description={t('addFirstClientDesc')}
        action={
          <AddClientModal>
            <QuickActionCard icon={Plus} label={t('addFirstClient')} />
          </AddClientModal>
        }
      />
    </div>
  );
};

export default ClientManagement;
