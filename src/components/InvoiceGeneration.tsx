
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus, FileText } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const InvoiceGeneration = () => {
  const { t } = useLanguage();
  const [invoices] = useState([]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">{t('invoiceManagement')}</h2>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          {t('createInvoice')}
        </Button>
      </div>

      {/* Invoice Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-green-600">Rs. 0</p>
            <p className="text-sm text-gray-600">{t('paidThisMonth')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-yellow-600">Rs. 0</p>
            <p className="text-sm text-gray-600">{t('pending')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-red-600">Rs. 0</p>
            <p className="text-sm text-gray-600">{t('overdue')}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-sm text-gray-600">{t('totalInvoices')}</p>
          </CardContent>
        </Card>
      </div>

      {/* Empty State */}
      <Card>
        <CardContent className="p-12">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('noInvoicesYet')}</h3>
            <p className="text-gray-600 mb-4">{t('createFirstInvoice')}</p>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              {t('createFirstInvoiceButton')}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InvoiceGeneration;
