
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
import { getDashboardStats } from '@/lib/database';
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
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState('overview');

  useEffect(() => {
    if (!authLoading && user) {
      loadDashboardStats();
    }
  }, [authLoading, user]);

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

  if (authLoading || loading) {
    return <LoadingSpinner text="Loading dashboard..." />;
  }

  if (!user) {
    return <div>Please sign in to view dashboard</div>;
  }

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <DashboardWelcome />

      {/* View Toggle */}
      <DashboardViewToggle activeView={activeView} onViewChange={setActiveView} />

      {activeView === 'overview' && (
        <>
          {/* Statistics Overview */}
          <DashboardStats stats={stats} onTabChange={onTabChange} />

          {/* Additional Insights */}
          <DashboardInsights stats={stats} />

          {/* Quick Actions and Getting Started */}
          <DashboardQuickActions stats={stats} onStatsReload={loadDashboardStats} />
        </>
      )}

      {activeView === 'reminders' && <PaymentReminders />}
      
      {activeView === 'analytics' && <MonthlyIncomeChart />}
    </div>
  );
};

export default Dashboard;
