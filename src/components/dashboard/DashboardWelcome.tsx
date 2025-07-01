
import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

const DashboardWelcome = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white p-8 rounded-xl">
      <h1 className="text-3xl font-semibold mb-3">{t('welcomeBack')}</h1>
      <p className="text-blue-100 text-lg font-normal">{t('dashboardSubtitle')}</p>
    </div>
  );
};

export default DashboardWelcome;
