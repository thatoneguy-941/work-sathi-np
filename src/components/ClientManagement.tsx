
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const ClientManagement = () => {
  const { t } = useLanguage();
  const [clients] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('clientManagementTitle')}</h2>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('addClient')}
        </Button>
      </div>

      {/* Empty State */}
      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('noClientsYet')}</h3>
            <p className="text-gray-600 mb-4">{t('addFirstClientDesc')}</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t('addFirstClient')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientManagement;
