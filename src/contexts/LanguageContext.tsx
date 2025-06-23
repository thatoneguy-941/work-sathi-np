
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
    // Header
    welcome: "Welcome",
    login: "Login / Sign Up",
    logout: "Logout",
    
    // Sidebar
    menu: "Menu",
    dashboard: "Dashboard",
    clients: "Clients",
    projects: "Projects",
    invoices: "Invoices",
    profile: "Profile",
    settings: "Settings",
    upgradeTitle: "Upgrade to Pro",
    upgradeDesc: "Unlimited clients and advanced features",
    upgradeNow: "Upgrade Now",
    
    // Landing Page
    heroTitle: "Worksathi",
    heroSubtitle: "Your Freelance Partner",
    heroDescription: "The complete CRM solution designed specifically for Nepali freelancers. Manage clients, track projects, and generate invoices with eSewa & Khalti integration.",
    startTrial: "Start Free Trial",
    watchDemo: "Watch Demo",
    featuresTitle: "Everything You Need to Manage Your Freelance Business",
    
    // Features
    clientManagement: "Client Management",
    projectTracking: "Project Tracking",
    smartInvoicing: "Smart Invoicing",
    clientManagementDesc: "Keep track of all your clients, their contact information, and project history in one place.",
    projectTrackingDesc: "Monitor project progress, deadlines, and milestones with our intuitive dashboard.",
    smartInvoicingDesc: "Generate professional invoices with eSewa and Khalti QR codes for easy payments.",
    
    // Pricing
    pricingTitle: "Simple, Transparent Pricing",
    freePlan: "Free Plan",
    freePlanDesc: "Perfect for getting started",
    proPlan: "Pro Plan",
    proPlanDesc: "For serious freelancers",
    mostPopular: "Most Popular",
    getStartedFree: "Get Started Free",
    upgradeToPro: "Upgrade to Pro",
    
    // Footer
    footerText: "Made with ❤️ for Nepali freelancers.",
    
    // Client Management
    clientManagementTitle: "Client Management",
    addClient: "Add Client",
    addNewClient: "Add New Client",
    clientName: "Client Name",
    email: "Email",
    phone: "Phone",
    company: "Company",
    totalPaid: "Total Paid",
    viewProjects: "View Projects",
    edit: "Edit",
    cancel: "Cancel",
    
    // Common
    month: "/month"
  },
  np: {
    // Header
    welcome: "स्वागतम्",
    login: "लगइन / साइन अप",
    logout: "लगआउट",
    
    // Sidebar
    menu: "मेनु",
    dashboard: "ड्यासबोर्ड",
    clients: "ग्राहकहरू",
    projects: "प्रोजेक्टहरू",
    invoices: "बिलहरू",
    profile: "प्रोफाइल",
    settings: "सेटिङहरू",
    upgradeTitle: "प्रो मा अपग्रेड गर्नुहोस्",
    upgradeDesc: "असीमित ग्राहकहरू र उन्नत सुविधाहरू",
    upgradeNow: "अहिले अपग्रेड गर्नुहोस्",
    
    // Landing Page
    heroTitle: "वर्कसाथी",
    heroSubtitle: "तपाईंको फ्रीलान्स साझेदार",
    heroDescription: "नेपाली फ्रीलान्सरहरूका लागि विशेष रूपमा डिजाइन गरिएको पूर्ण CRM समाधान। eSewa र Khalti एकीकरणको साथ ग्राहकहरू व्यवस्थापन गर्नुहोस्, परियोजनाहरू ट्र्याक गर्नुहोस्, र इनभ्वाइसहरू उत्पन्न गर्नुहोस्।",
    startTrial: "निःशुल्क ट्रायल सुरु गर्नुहोस्",
    watchDemo: "डेमो हेर्नुहोस्",
    featuresTitle: "तपाईंको फ्रीलान्स व्यवसाय व्यवस्थापन गर्न आवश्यक सबै कुरा",
    
    // Features
    clientManagement: "ग्राहक व्यवस्थापन",
    projectTracking: "प्रोजेक्ट ट्र्याकिङ",
    smartInvoicing: "स्मार्ट बिलिङ",
    clientManagementDesc: "आफ्ना सबै ग्राहकहरू, तिनीहरूको सम्पर्क जानकारी, र परियोजना इतिहास एकै ठाउँमा राख्नुहोस्।",
    projectTrackingDesc: "हाम्रो सहज ड्यासबोर्डको साथ परियोजना प्रगति, समयसीमा र माइलस्टोनहरू निगरानी गर्नुहोस्।",
    smartInvoicingDesc: "सजिलो भुक्तानीका लागि eSewa र Khalti QR कोडहरूसहित व्यावसायिक इनभ्वाइसहरू उत्पन्न गर्नुहोस्।",
    
    // Pricing
    pricingTitle: "सरल, पारदर्शी मूल्य निर्धारण",
    freePlan: "निःशुल्क योजना",
    freePlanDesc: "सुरुवात गर्नका लागि उत्तम",
    proPlan: "प्रो योजना",
    proPlanDesc: "गम्भीर फ्रीलान्सरहरूका लागि",
    mostPopular: "सबैभन्दा लोकप्रिय",
    getStartedFree: "निःशुल्क सुरु गर्नुहोस्",
    upgradeToPro: "प्रो मा अपग्रेड गर्नुहोस्",
    
    // Footer
    footerText: "नेपाली फ्रीलान्सरहरूका लागि ❤️ सँग बनाइएको।",
    
    // Client Management
    clientManagementTitle: "ग्राहक व्यवस्थापन",
    addClient: "ग्राहक थप्नुहोस्",
    addNewClient: "नयाँ ग्राहक थप्नुहोस्",
    clientName: "ग्राहकको नाम",
    email: "इमेल",
    phone: "फोन",
    company: "कम्पनी",
    totalPaid: "कुल भुक्तानी",
    viewProjects: "परियोजनाहरू हेर्नुहोस्",
    edit: "सम्पादन गर्नुहोस्",
    cancel: "रद्द गर्नुहोस्",
    
    // Common
    month: "/महिना"
  }
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('worksathi-language');
    return (saved as Language) || 'en';
  });

  useEffect(() => {
    localStorage.setItem('worksathi-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
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
