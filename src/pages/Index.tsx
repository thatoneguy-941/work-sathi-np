
import React, { useState, useCallback, lazy, Suspense, memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ProfilePage from '@/components/ProfilePage';
import SettingsPage from '@/components/SettingsPage';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, FileText, Star, CheckCircle, Loader2 } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

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

const Index = memo(() => {
  const { user, loading, signOut } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const { t } = useLanguage();

  const handleTabChange = useCallback((tab: string) => {
    setActiveTab(tab);
  }, []);

  const handleAuthClick = useCallback(() => {
    window.location.href = '/auth';
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  // Landing Page Component for non-authenticated users
  const LandingPage = memo(() => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header isLoggedIn={false} onLogin={handleAuthClick} />
      
      {/* Hero Section */}
      <section className="symmetric-container symmetric-section text-center">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-heading mb-6">
            {t('heroTitle')}
            <span className="block text-subheading text-muted-foreground mt-4">
              {t('heroSubtitle')}
            </span>
          </h1>
          <p className="text-body max-w-3xl mx-auto mb-12">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" className="text-lg px-10 py-4 min-w-[200px]" onClick={() => window.location.href = '/auth'}>
              {t('startTrial')}
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-10 py-4 min-w-[200px]">
              {t('watchDemo')}
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="symmetric-container symmetric-section">
        <h2 className="text-subheading text-center mb-16">
          {t('featuresTitle')}
        </h2>
        <div className="symmetric-grid grid-cols-1 md:grid-cols-3">
          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="pt-8 space-y-6">
              <Users className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">{t('clientManagement')}</h3>
              <p className="text-body text-muted-foreground">
                {t('clientManagementDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="pt-8 space-y-6">
              <TrendingUp className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">{t('projectTracking')}</h3>
              <p className="text-body text-muted-foreground">
                {t('projectTrackingDesc')}
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 h-full">
            <CardContent className="pt-8 space-y-6">
              <FileText className="w-16 h-16 text-primary mx-auto" />
              <h3 className="text-xl font-semibold">{t('smartInvoicing')}</h3>
              <p className="text-body text-muted-foreground">
                {t('smartInvoicingDesc')}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="symmetric-container symmetric-section">
        <h2 className="text-subheading text-center mb-16">{t('pricingTitle')}</h2>
        <div className="symmetric-grid grid-cols-1 md:grid-cols-3 max-w-6xl mx-auto">
          <Card className="p-6 border-2">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">{t('freePlan')}</h3>
              <p className="text-gray-600 mb-4">{t('freePlanDesc')}</p>
              <div className="text-3xl font-bold mb-6">Rs. 0<span className="text-lg text-gray-600">{t('month')}</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Up to 3 {t('clients').toLowerCase()}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Manual invoicing</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Basic project tracking</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Static QR codes</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Local language support</li>
              </ul>
              <Button className="w-full" onClick={() => window.location.href = '/auth'}>{t('getStartedFree')}</Button>
            </CardContent>
          </Card>

          <Card className="p-6 border-2 border-blue-600 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm flex items-center">
                <Star className="w-4 h-4 mr-1" />
                {t('mostPopular')}
              </span>
            </div>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">Pro Monthly</h3>
              <p className="text-gray-600 mb-4">Perfect for active freelancers</p>
              <div className="text-3xl font-bold mb-6">Rs. 399<span className="text-lg text-gray-600">{t('month')}</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Unlimited {t('clients').toLowerCase()}</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Branded PDF invoices</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Dynamic QR codes</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Payment reminders</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Income + TDS dashboard</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Priority support</li>
              </ul>
              <Button className="w-full" onClick={() => window.location.href = '/auth'}>{t('upgradeToPro')}</Button>
            </CardContent>
          </Card>

          <Card className="p-6 border-2 border-green-600 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-green-600 text-white px-4 py-1 rounded-full text-sm">
                Save 27%
              </span>
            </div>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">Pro Yearly</h3>
              <p className="text-gray-600 mb-4">Best value for professionals</p>
              <div className="text-3xl font-bold mb-2">Rs. 3,499<span className="text-lg text-gray-600">/year</span></div>
              <p className="text-sm text-green-600 mb-4">Rs. 291/month (save Rs. 1,289)</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Everything in Pro Monthly</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Contract templates</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Tax calculation tips</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />WhatsApp integration</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Advanced analytics</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />27% savings</li>
              </ul>
              <Button className="w-full" onClick={() => window.location.href = '/auth'}>Choose Yearly</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Worksathi. {t('footerText')}</p>
        </div>
      </footer>
    </div>
  ));

  LandingPage.displayName = 'LandingPage';

  // Main App Component for authenticated users
  const MainApp = memo(() => {
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

  return user ? <MainApp /> : <LandingPage />;
});

Index.displayName = 'Index';

export default Index;
