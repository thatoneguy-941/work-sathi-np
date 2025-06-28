
import React, { useState, useEffect } from 'react';
import { Plus, Users, Edit, Trash2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddClientModal from '@/components/modals/AddClientModal';
import EditClientModal from '@/components/modals/EditClientModal';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getClients, deleteClient, type Client } from '@/lib/database';

const ClientManagement = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      const clientsData = await getClients();
      setClients(clientsData);
    } catch (error) {
      console.error('Error loading clients:', error);
      toast({
        title: t('error'),
        description: t('failedToLoadClients'),
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleClientAdded = (newClient: Client) => {
    setClients(prev => [newClient, ...prev]);
  };

  const handleClientUpdated = (updatedClient: Client) => {
    setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  };

  const handleDeleteClient = async (clientId: string) => {
    if (!confirm(t('confirmDeleteClient'))) return;
    
    try {
      await deleteClient(clientId);
      setClients(prev => prev.filter(c => c.id !== clientId));
      toast({
        title: t('clientDeleted'),
        description: t('clientDeletedSuccessfully'),
      });
    } catch (error) {
      console.error('Error deleting client:', error);
      toast({
        title: t('error'),
        description: t('failedToDeleteClient'),
        variant: "destructive",
      });
    }
  };

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="flex justify-between items-start gap-6">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-semibold text-gray-900 mb-2">{t('clientManagement')}</h1>
            <p className="text-gray-600">{t('managementDesc')}</p>
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
          <h1 className="text-3xl font-semibold text-gray-900 mb-2">{t('clientManagement')}</h1>
          <p className="text-gray-600">{t('managementDesc')}</p>
        </div>
        <div className="flex-shrink-0">
          <AddClientModal onClientAdded={handleClientAdded}>
            <QuickActionCard icon={Plus} label={t('addClient')} />
          </AddClientModal>
        </div>
      </div>

      {clients.length === 0 ? (
        <EmptyState
          icon={Users}
          title={t('noClientsYet')}
          description={t('addFirstClientDesc')}
          action={
            <AddClientModal onClientAdded={handleClientAdded}>
              <QuickActionCard icon={Plus} label={t('addFirstClient')} />
            </AddClientModal>
          }
        />
      ) : (
        <div className="bg-white rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t('name')}</TableHead>
                <TableHead>{t('email')}</TableHead>
                <TableHead>{t('company')}</TableHead>
                <TableHead>{t('phone')}</TableHead>
                <TableHead>{t('actions')}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clients.map((client) => (
                <TableRow key={client.id}>
                  <TableCell className="font-medium">{client.name}</TableCell>
                  <TableCell>{client.email}</TableCell>
                  <TableCell>{client.company || '-'}</TableCell>
                  <TableCell>{client.phone || '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <EditClientModal client={client} onClientUpdated={handleClientUpdated}>
                        <Button size="sm" variant="outline">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </EditClientModal>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDeleteClient(client.id)}
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

export default ClientManagement;
