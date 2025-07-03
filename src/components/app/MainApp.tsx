import React, { useState, useCallback, lazy, Suspense, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProfilePage from '@/components/ProfilePage';
import SettingsPage from '@/components/SettingsPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Loader2 } from 'lucide-react';

// Lazy load heavy components
const ClientManagement = lazy(() => import('@/components/ClientManagement'));
const ProjectManagement = lazy(() => import('@/components/ProjectManagement'));
const InvoiceGeneration = lazy(() => import('@/components/InvoiceGeneration'));

const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center h-64">
    <Loader2 className="w-8 h-8 animate-spin" />
  </div>
));

LoadingSpinner.displayName = 'LoadingSpinner';

const MainApp = memo(() => {
  const { signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const renderContent = useCallback(() => {
    switch (activeTab) {
      case 'clients':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ClientManagement />
          </Suspense>
        );
      case 'projects':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <ProjectManagement />
          </Suspense>
        );
      case 'invoices':
        return (
          <Suspense fallback={<LoadingSpinner />}>
            <InvoiceGeneration />
          </Suspense>
        );
      case 'profile':
        return <ProfilePage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard onTabChange={handleTabChange} />;
    }
  }, [activeTab]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-background">
        <Header 
          isLoggedIn={true} 
          onLogout={signOut} 
        />
        <div className="flex h-[calc(100vh-64px)]">
          <Sidebar activeTab={activeTab} onTabChange={handleTabChange} />
          <main className="flex-1 overflow-auto symmetric-container py-8">
            {renderContent()}
          </main>
        </div>
      </div>
    </ProtectedRoute>
  );
});

MainApp.displayName = 'MainApp';

export default MainApp;