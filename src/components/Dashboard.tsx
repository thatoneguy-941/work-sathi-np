
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TrendingUp, Users, FileText, Plus, Calendar } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const Dashboard = () => {
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
      color: 'text-blue-600'
    },
    {
      title: t('pendingInvoices'),
      value: '0',
      trend: 'Rs. 0',
      icon: FileText,
      color: 'text-orange-600'
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
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">{t('welcomeBack')}</h2>
        <p className="text-blue-100">{t('dashboardSubtitle')}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.title}</p>
                  <p className="text-2xl font-bold mt-1">{stat.value}</p>
                  <p className={`text-sm ${stat.color}`}>{stat.trend}</p>
                </div>
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>{t('quickActions')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button className="h-20 flex-col">
              <Plus className="w-6 h-6 mb-2" />
              <span>{t('addClient')}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <Plus className="w-6 h-6 mb-2" />
              <span>{t('newProject')}</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col">
              <FileText className="w-6 h-6 mb-2" />
              <span>{t('createInvoice')}</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Getting Started Section */}
      <Card>
        <CardHeader>
          <CardTitle>{t('gettingStarted')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">{t('noDataYet')}</h3>
            <p className="text-gray-600 mb-4">{t('startByAdding')}</p>
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

export default Dashboard;
