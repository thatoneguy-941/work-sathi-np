
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, User, Mail, Phone, Building } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientManagement = () => {
  const { t } = useLanguage();
  const [showAddForm, setShowAddForm] = useState(false);
  const [clients, setClients] = useState([
    {
      id: 1,
      name: 'TechCorp Pvt Ltd',
      email: 'contact@techcorp.com',
      phone: '+977-1-4567890',
      projects: 3,
      totalPaid: 'Rs. 2,45,000'
    },
    {
      id: 2,
      name: 'StartupXYZ',
      email: 'hello@startupxyz.com',
      phone: '+977-9876543210',
      projects: 1,
      totalPaid: 'Rs. 45,000'
    },
    {
      id: 3,
      name: 'Local Business',
      email: 'info@localbiz.com',
      phone: '+977-1-2345678',
      projects: 2,
      totalPaid: 'Rs. 85,000'
    }
  ]);

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    // Add client logic here
    setShowAddForm(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('clientManagementTitle')}</h2>
        </div>
        <Button onClick={() => setShowAddForm(true)}>
          <Plus className="w-4 h-4 mr-2" />
          {t('addClient')}
        </Button>
      </div>

      {showAddForm && (
        <Card>
          <CardHeader>
            <CardTitle>{t('addNewClient')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddClient} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="clientName">{t('clientName')}</Label>
                  <Input id="clientName" placeholder={t('clientName')} required />
                </div>
                <div>
                  <Label htmlFor="clientEmail">{t('email')}</Label>
                  <Input id="clientEmail" type="email" placeholder="client@example.com" required />
                </div>
                <div>
                  <Label htmlFor="clientPhone">{t('phone')}</Label>
                  <Input id="clientPhone" placeholder="+977-" />
                </div>
                <div>
                  <Label htmlFor="clientCompany">{t('company')}</Label>
                  <Input id="clientCompany" placeholder={t('company')} />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">{t('addClient')}</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>
                  {t('cancel')}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {clients.map((client) => (
          <Card key={client.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Building className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium">{client.name}</h3>
                    <p className="text-sm text-gray-600">{client.projects} {t('projects')}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-gray-600">
                  <Mail className="w-4 h-4 mr-2" />
                  {client.email}
                </div>
                <div className="flex items-center text-sm text-gray-600">
                  <Phone className="w-4 h-4 mr-2" />
                  {client.phone}
                </div>
              </div>
              
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">{t('totalPaid')}</p>
                <p className="font-medium text-green-600">{client.totalPaid}</p>
              </div>
              
              <div className="mt-4 flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  {t('viewProjects')}
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  {t('edit')}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientManagement;
