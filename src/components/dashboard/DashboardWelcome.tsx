
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card } from '@/components/ui/card';

const DashboardWelcome = () => {
  const { t } = useLanguage();

  return (
    <Card variant="premium" className="p-8 relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-heading mb-4">{t('welcomeBack')}</h1>
        <p className="text-body opacity-90">{t('dashboardSubtitle')}</p>
      </div>
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-white/10 rounded-full blur-xl"></div>
      <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-white/5 rounded-full blur-lg"></div>
    </Card>
  );
};

export default DashboardWelcome;
