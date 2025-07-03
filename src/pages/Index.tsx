
import React, { memo } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import LandingPage from '@/components/landing/LandingPage';
import MainApp from '@/components/app/MainApp';
import { Loader2 } from 'lucide-react';

const Index = memo(() => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return user ? <MainApp /> : <LandingPage />;
});

Index.displayName = 'Index';

export default Index;
