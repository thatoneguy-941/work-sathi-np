
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
      <div className="flex justify-between items-start gap-6">
        <div className="flex-1 min-w-0">
          <h1 className="text-heading mb-2">Client management</h1>
          <p className="text-caption">Manage your client relationships and contacts</p>
        </div>
        <div className="flex-shrink-0">
          <AddClientModal>
            <QuickActionCard icon={Plus} label={t('addClient')} variant="default" />
          </AddClientModal>
        </div>
      </div>

      <EmptyState
        icon={Users}
        title="No clients yet"
        description="Add your first client to get started"
        action={
          <AddClientModal>
            <QuickActionCard icon={Plus} label="Add first client" variant="default" />
          </AddClientModal>
        }
      />
    </div>
  );
};

export default ClientManagement;
