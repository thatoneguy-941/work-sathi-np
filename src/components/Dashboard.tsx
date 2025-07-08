
import React, { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import PaymentReminders from '@/components/enhanced/PaymentReminders';
import MonthlyIncomeChart from '@/components/shared/MonthlyIncomeChart';
import LoadingSpinner from '@/components/shared/LoadingSpinner';
import DashboardWelcome from '@/components/dashboard/DashboardWelcome';
import DashboardViewToggle from '@/components/dashboard/DashboardViewToggle';
import DashboardStats from '@/components/dashboard/DashboardStats';
import DashboardInsights from '@/components/dashboard/DashboardInsights';
import DashboardQuickActions from '@/components/dashboard/DashboardQuickActions';
import AdvancedAnalytics from '@/components/analytics/AdvancedAnalytics';
import { getDashboardStats, getInvoices } from '@/lib/database';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';

interface DashboardProps {
  onTabChange?: (tab: string) => void;
}

const Dashboard = ({ onTabChange }: DashboardProps) => {
  const { t } = useLanguage();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [stats, setStats] = useState<any>(null);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    if (!authLoading && user) {
      loadDashboardStats();
    }
  }, [authLoading, user]);

  const loadDashboardStats = async () => {
    try {
      const [dashboardStats, invoicesData] = await Promise.all([
        getDashboardStats(),
        getInvoices()
      ]);
      setStats(dashboardStats);
      setInvoices(invoicesData);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast({
        title: t('error'),
        description: 'Failed to load dashboard data',
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (!user) {
    return <div>Please sign in to view dashboard</div>;
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Section */}
      <DashboardWelcome />

      {/* View Toggle */}
      <div className="flex justify-center">
        <DashboardViewToggle activeView={activeView} onViewChange={setActiveView} />
      </div>

      {activeView === 'overview' && (
        <div className="space-y-8">
          {/* Statistics Overview */}
          <DashboardStats stats={stats} onTabChange={onTabChange} />

          {/* Content Grid */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="xl:col-span-2 space-y-8">
              <DashboardInsights stats={stats} />
            </div>
            
            {/* Sidebar Content */}
            <div className="space-y-6">
              <DashboardQuickActions stats={stats} onStatsReload={loadDashboardStats} />
            </div>
          </div>
        </div>
      )}

      {activeView === 'reminders' && (
        <div className="max-w-4xl mx-auto">
          <PaymentReminders />
        </div>
      )}
      
      {activeView === 'analytics' && (
        <div className="max-w-6xl mx-auto">
          <AdvancedAnalytics stats={stats} invoices={invoices} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
