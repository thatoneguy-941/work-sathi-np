
import React, { useState, useEffect } from 'react';
import { Plus, Users, Edit, Trash2, Eye } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import AddClientModal from '@/components/modals/AddClientModal';
import EditClientModal from '@/components/modals/EditClientModal';
import ClientDetailView from '@/components/detailed-views/ClientDetailView';
import SearchAndFilters from '@/components/shared/SearchAndFilters';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getClients, deleteClient, type Client } from '@/lib/database';

const EnhancedClientManagement = () => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [clients, setClients] = useState<Client[]>([]);
  const [filteredClients, setFilteredClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('created_at');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  useEffect(() => {
    loadClients();
  }, []);

  useEffect(() => {
    filterAndSortClients();
  }, [clients, searchTerm, sortBy, sortOrder]);

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

  const filterAndSortClients = () => {
    let filtered = clients.filter(client =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (client.company && client.company.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    filtered.sort((a, b) => {
      let aValue = a[sortBy as keyof Client];
      let bValue = b[sortBy as keyof Client];
      
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    setFilteredClients(filtered);
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

  const sortOptions = [
    { value: 'name', label: t('name') },
    { value: 'email', label: t('email') },
    { value: 'company', label: t('company') },
    { value: 'created_at', label: t('dateAdded') }
  ];

  if (selectedClient) {
    return (
      <ClientDetailView 
        client={selectedClient} 
        onBack={() => setSelectedClient(null)} 
      />
    );
  }

  if (loading) {
    return <LoadingSpinner text={t('loadingClients')} />;
  }

  return (
    <div className="space-y-6">
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
        <>
          <SearchAndFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            sortBy={sortBy}
            onSortChange={setSortBy}
            sortOrder={sortOrder}
            onSortOrderChange={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
            sortOptions={sortOptions}
            placeholder={t('searchClients')}
          />

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
                {filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell className="font-medium">{client.name}</TableCell>
                    <TableCell>{client.email}</TableCell>
                    <TableCell>{client.company || '-'}</TableCell>
                    <TableCell>{client.phone || '-'}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => setSelectedClient(client)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
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

          {filteredClients.length === 0 && searchTerm && (
            <div className="text-center py-8">
              <p className="text-gray-500">{t('noClientsFound')}</p>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default EnhancedClientManagement;
