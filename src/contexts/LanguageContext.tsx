import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'en' | 'np';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    heroTitle: 'Worksathi',
    heroSubtitle: 'Smart Freelancer CRM for Nepal',
    heroDescription: 'Manage your clients, projects, and invoices with ease. Built specifically for Nepali freelancers with support for eSewa and Khalti payments.',
    startTrial: 'Start Free Trial',
    watchDemo: 'Watch Demo',
    featuresTitle: 'Everything You Need to Succeed',
    clientManagement: 'Client Management',
    clientManagementDesc: 'Keep track of all your clients, their contact information, and project history in one organized place.',
    projectTracking: 'Project Tracking',
    projectTrackingDesc: 'Monitor project progress, deadlines, and milestones to ensure timely delivery.',
    smartInvoicing: 'Smart Invoicing',
    smartInvoicingDesc: 'Generate professional invoices with eSewa and Khalti QR codes for instant payments.',
    pricingTitle: 'Simple, Transparent Pricing',
    freePlan: 'Free Plan',
    freePlanDesc: 'Perfect for getting started',
    month: '/month',
    clients: 'Clients',
    getStartedFree: 'Get Started Free',
    proPlan: 'Pro Plan',
    proPlanDesc: 'For growing freelancers',
    mostPopular: 'Most Popular',
    upgradeToPro: 'Upgrade to Pro',
    footerText: 'All rights reserved.',
    menu: 'Menu',
    dashboard: 'Dashboard',
    projects: 'Projects',
    invoices: 'Invoices',
    profile: 'Profile',
    settings: 'Settings',
    welcome: 'Welcome back!',
    login: 'Login',
    logout: 'Logout',
    upgradeTitle: 'Upgrade to Pro',
    upgradeDesc: 'Unlock all features and unlimited clients',
    upgradeNow: 'Upgrade Now',
    upgradeRequired: 'Upgrade Required',
    upgradeFeatureMessage: 'The {feature} feature is only available in our Pro plan.',
    maybeLater: 'Maybe Later'
  },
  np: {
    heroTitle: 'वर्कसाथी',
    heroSubtitle: 'नेपालका लागि स्मार्ट फ्रीलान्सर CRM',
    heroDescription: 'आफ्ना ग्राहकहरू, परियोजनाहरू र बिलहरू सजिलैसँग व्यवस्थापन गर्नुहोस्। eSewa र Khalti भुक्तानी सहयोगको साथ नेपाली फ्रीलान्सरहरूका लागि विशेष रूपमा निर्मित।',
    startTrial: 'निःशुल्क ट्रायल सुरु गर्नुहोस्',
    watchDemo: 'डेमो हेर्नुहोस्',
    featuresTitle: 'सफल हुनका लागि आवश्यक सबै कुरा',
    clientManagement: 'ग्राहक व्यवस्थापन',
    clientManagementDesc: 'आफ्ना सबै ग्राहकहरू, तिनीहरूको सम्पर्क जानकारी र परियोजना इतिहासलाई एकै ठाउँमा व्यवस्थित राख्नुहोस्।',
    projectTracking: 'परियोजना ट्रयाकिङ',
    projectTrackingDesc: 'समयमै डेलिभरी सुनिश्चित गर्न परियोजना प्रगति, म्याद र माइलस्टोनहरूको निगरानी गर्नुहोस्।',
    smartInvoicing: 'स्मार्ट बिलिङ',
    smartInvoicingDesc: 'तत्काल भुक्तानीका लागि eSewa र Khalti QR कोडसहित व्यावसायिक बिलहरू उत्पन्न गर्नुहोस्।',
    pricingTitle: 'सरल, पारदर्शी मूल्य निर्धारण',
    freePlan: 'निःशुल्क योजना',
    freePlanDesc: 'सुरुवात गर्नका लागि उत्तम',
    month: '/महिना',
    clients: 'ग्राहकहरू',
    getStartedFree: 'निःशुल्क सुरु गर्नुहोस्',
    proPlan: 'प्रो योजना',
    proPlanDesc: 'बढ्दो फ्रीलान्सरहरूका लागि',
    mostPopular: 'सबैभन्दा लोकप्रिय',
    upgradeToPro: 'प्रोमा अपग्रेड गर्नुहोस्',
    footerText: 'सबै अधिकार सुरक्षित।',
    menu: 'मेनु',
    dashboard: 'ड्यासबोर्ड',
    projects: 'परियोजनाहरू',
    invoices: 'बिलहरू',
    profile: 'प्रोफाइल',
    settings: 'सेटिङहरू',
    welcome: 'फिर्ता स्वागत छ!',
    login: 'लगइन',
    logout: 'लगआउट',
    upgradeTitle: 'प्रोमा अपग्रेड गर्नुहोस्',
    upgradeDesc: 'सबै सुविधाहरू र असीमित ग्राहकहरू अनलक गर्नुहोस्',
    upgradeNow: 'अहिले अपग्रेड गर्नुहोस्',
    upgradeRequired: 'अपग्रेड आवश्यक',
    upgradeFeatureMessage: '{feature} सुविधा हाम्रो प्रो योजनामा मात्र उपलब्ध छ।',
    maybeLater: 'सायद पछि'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('worksathi-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('worksathi-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
