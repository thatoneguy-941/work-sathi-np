import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Users, FileText, Plus, Calendar, DollarSign, Clock, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import AddClientModal from '@/components/modals/AddClientModal';
import AddProjectModal from '@/components/modals/AddProjectModal';
import AddInvoiceModal from '@/components/modals/AddInvoiceModal';
import PaymentReminders from '@/components/enhanced/PaymentReminders';
import MonthlyIncomeChart from '@/components/shared/MonthlyIncomeChart';
import StatCard from '@/components/shared/StatCard';
import EmptyState from '@/components/shared/EmptyState';
import QuickActionCard from '@/components/shared/QuickActionCard';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import { getDashboardStats } from '@/lib/database';

interface DashboardProps {
  onTabChange?: (tab: string) => void;
}

const Dashboard = ({ onTabChange }: DashboardProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const dashboardStats = await getDashboardStats();
      setStats(dashboardStats);
    } catch (error) {
      console.error('Error loading dashboard stats:', error);
      toast({
        title: t('error'),
        description: 'Failed to load dashboard statistics',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  const dashboardStats = [
    {
      title: t('totalIncome'),
      value: `Rs. ${stats?.totalIncome?.toLocaleString() || '0'}`,
      trend: stats?.incomeGrowth || '+0%',
      icon: TrendingUp,
      color: 'text-green-600'
    },
    {
      title: t('activeClients'),
      value: stats?.totalClients?.toString() || '0',
      trend: `${stats?.totalProjects || 0} projects`,
      icon: Users,
      color: 'text-blue-600',
      onClick: () => onTabChange?.('clients')
    },
    {
      title: t('thisMonth'),
      value: `Rs. ${stats?.monthlyIncome?.toLocaleString() || '0'}`,
      trend: stats?.incomeGrowth || '+0%',
      icon: Calendar,
      color: 'text-purple-600'
    },
    {
      title: t('pending'),
      value: `Rs. ${stats?.totalPending?.toLocaleString() || '0'}`,
      trend: `${stats?.unpaidInvoicesCount || 0} invoices`,
      icon: Clock,
      color: 'text-orange-600',
      onClick: () => onTabChange?.('invoices')
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-xl">
        <h1 className="text-3xl font-semibold mb-3">{t('welcomeBack')}</h1>
        <p className="text-blue-100 text-lg font-normal">{t('dashboardSubtitle')}</p>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 bg-white p-1 rounded-lg border w-fit">
        <button
          onClick={() => setActiveView('overview')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'overview' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Overview
        </button>
        <button
          onClick={() => setActiveView('reminders')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'reminders' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Payment Reminders
        </button>
        <button
          onClick={() => setActiveView('analytics')}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            activeView === 'analytics' 
              ? 'bg-blue-600 text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          Analytics
        </button>
      </div>

      {activeView === 'overview' && (
        <>
          {/* Statistics Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {dashboardStats.map((stat, index) => (
              <StatCard key={index} {...stat} />
            ))}
          </div>

          {/* Additional Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Invoice Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Invoice Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Invoices</span>
                    <span className="font-semibold">{stats?.totalInvoices || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Paid</span>
                    <span className="font-semibold text-green-600">{stats?.paidInvoicesCount || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Unpaid</span>
                    <span className="font-semibold text-orange-600">{stats?.unpaidInvoicesCount || 0}</span>
                  </div>
                  {stats?.totalOverdue > 0 && (
                    <div className="flex justify-between items-center border-t pt-3">
                      <span className="text-sm text-red-600 flex items-center gap-1">
                        <AlertTriangle className="w-4 h-4" />
                        Overdue
                      </span>
                      <span className="font-semibold text-red-600">
                        Rs. {stats.totalOverdue.toLocaleString()}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Project Status Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Project Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Projects</span>
                    <span className="font-semibold">{stats?.totalProjects || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">In Progress</span>
                    <span className="font-semibold text-blue-600">{stats?.inProgressProjects || 0}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Completed</span>
                    <span className="font-semibold text-green-600">{stats?.completedProjects || 0}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-medium">{t('quickActions')}</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <AddClientModal onClientAdded={loadDashboardStats}>
                  <QuickActionCard icon={Plus} label={t('addClient')} />
                </AddClientModal>
                <AddProjectModal onProjectAdded={loadDashboardStats}>
                  <QuickActionCard icon={Plus} label={t('newProject')} />
                </AddProjectModal>
                <AddInvoiceModal onInvoiceAdded={loadDashboardStats}>
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
                <AddClientModal onClientAdded={loadDashboardStats}>
                  <QuickActionCard icon={Plus} label={t('addFirstClient')} />
                </AddClientModal>
              }
            />
          )}
        </>
      )}

      {activeView === 'reminders' && <PaymentReminders />}
      
      {activeView === 'analytics' && <MonthlyIncomeChart />}
    </div>
  );
};

export default Dashboard;
