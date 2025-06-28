
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'ne';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    clientManagement: 'Client Management',
    projectManagement: 'Project Management',
    invoiceManagement: 'Invoice Management',
    
    // Dashboard
    welcome: 'Welcome to Your Freelance Dashboard',
    dashboardSubtitle: 'Track your clients, projects, and invoices all in one place',
    totalClients: 'Total Clients',
    totalProjects: 'Total Projects',
    monthlyIncome: 'Monthly Income',
    pendingInvoices: 'Pending Invoices',
    
    // Client Management
    managementDesc: 'Manage your client relationships and contact information',
    addClient: 'Add Client',
    noClientsYet: 'No clients yet',
    addFirstClientDesc: 'Add your first client to start managing your relationships',
    addFirstClient: 'Add First Client',
    
    // Project Management
    trackDesc: 'Track your projects and their progress',
    newProject: 'New Project',
    noProjectsYet: 'No projects yet',
    createFirstProject: 'Create your first project to start tracking your work',
    createFirstProjectDesc: 'Create First Project',
    
    // Invoice Management
    generateDesc: 'Generate and manage your invoices',
    createInvoice: 'Create Invoice',
    noInvoicesYet: 'No invoices yet',
    createFirstInvoice: 'Create your first invoice to start billing',
    createFirstInvoiceDesc: 'Create First Invoice',
    
    // Forms
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    company: 'Company',
    notes: 'Notes',
    cancel: 'Cancel',
    save: 'Save',
    delete: 'Delete',
    edit: 'Edit',
    actions: 'Actions',
    
    // Modals
    addNewClient: 'Add New Client',
    addNewClientDesc: 'Fill in the details to add a new client to your database',
    createNewProject: 'Create New Project',
    createNewProjectDesc: 'Start a new project for your client',
    
    // Project fields
    projectName: 'Project Name',
    client: 'Client',
    selectClient: 'Select a client',
    description: 'Description',
    deadline: 'Deadline',
    status: 'Status',
    paymentStatus: 'Payment Status',
    
    // Status values
    pending: 'Pending',
    inProgress: 'In Progress',
    completed: 'Completed',
    notPaid: 'Not Paid',
    partial: 'Partial',
    paid: 'Paid',
    unpaid: 'Unpaid',
    
    // Invoice fields
    project: 'Project',
    selectProject: 'Select a project',
    amount: 'Amount',
    issueDate: 'Issue Date',
    dueDate: 'Due Date',
    paymentLink: 'Payment Link',
    invoiceNumber: 'Invoice Number',
    
    // Statistics
    paidThisMonth: 'Paid This Month',
    overdue: 'Overdue',
    totalInvoices: 'Total Invoices',
    
    // Actions and Messages
    adding: 'Adding...',
    creating: 'Creating...',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    
    // Success messages
    clientAdded: 'Client Added',
    hasBeenAddedSuccessfully: 'has been added successfully',
    projectCreated: 'Project Created',
    hasBeenCreatedSuccessfully: 'has been created successfully',
    invoiceCreated: 'Invoice Created',
    invoiceFor: 'Invoice for',
    
    // Error messages
    failedToLoadClients: 'Failed to load clients',
    failedToAddClient: 'Failed to add client',
    failedToLoadProjects: 'Failed to load projects',
    failedToCreateProject: 'Failed to create project',
    failedToLoadInvoices: 'Failed to load invoices',
    failedToCreateInvoice: 'Failed to create invoice',
    
    // Delete confirmations
    confirmDeleteClient: 'Are you sure you want to delete this client?',
    confirmDeleteProject: 'Are you sure you want to delete this project?',
    confirmDeleteInvoice: 'Are you sure you want to delete this invoice?',
    
    // Delete success messages
    clientDeleted: 'Client Deleted',
    clientDeletedSuccessfully: 'Client has been deleted successfully',
    projectDeleted: 'Project Deleted',
    projectDeletedSuccessfully: 'Project has been deleted successfully',
    invoiceDeleted: 'Invoice Deleted',
    invoiceDeletedSuccessfully: 'Invoice has been deleted successfully',
    
    // Delete error messages
    failedToDeleteClient: 'Failed to delete client',
    failedToDeleteProject: 'Failed to delete project',
    failedToDeleteInvoice: 'Failed to delete invoice',
    
    // Plan limits
    planLimitReached: 'Plan Limit Reached',
    freePlanLimit: 'Free plan allows up to 3 clients',
    upgradeToAddMore: 'Upgrade to Pro to add more clients',
    contactSupport: 'Contact support for assistance',
    
    // Invoice updates
    invoiceUpdated: 'Invoice Updated',
    invoiceMarkedAs: 'Invoice marked as',
    failedToUpdateInvoice: 'Failed to update invoice',
    
    // Language
    language: 'Language',
    english: 'English',
    nepali: 'नेपाली',
  },
  ne: {
    // Navigation
    dashboard: 'ड्यासबोर्ड',
    clientManagement: 'ग्राहक व्यवस्थापन',
    projectManagement: 'परियोजना व्यवस्थापन',
    invoiceManagement: 'बिल व्यवस्थापन',
    
    // Dashboard
    welcome: 'तपाईंको फ्रीलान्स ड्यासबोर्डमा स्वागत छ',
    dashboardSubtitle: 'आफ्ना ग्राहकहरू, परियोजनाहरू, र बिलहरू एकै ठाउँमा ट्र्याक गर्नुहोस्',
    totalClients: 'कुल ग्राहकहरू',
    totalProjects: 'कुल परियोजनाहरू',
    monthlyIncome: 'मासिक आम्दानी',
    pendingInvoices: 'बाँकी बिलहरू',
    
    // Client Management
    managementDesc: 'आफ्ना ग्राहक सम्बन्ध र सम्पर्क जानकारी व्यवस्थापन गर्नुहोस्',
    addClient: 'ग्राहक थप्नुहोस्',
    noClientsYet: 'अहिलेसम्म कुनै ग्राहक छैन',
    addFirstClientDesc: 'आफ्नो सम्बन्ध व्यवस्थापन सुरु गर्न पहिलो ग्राहक थप्नुहोस्',
    addFirstClient: 'पहिलो ग्राहक थप्नुहोस्',
    
    // Project Management
    trackDesc: 'आफ्ना परियोजनाहरू र तिनीहरूको प्रगति ट्र्याक गर्नुहोस्',
    newProject: 'नयाँ परियोजना',
    noProjectsYet: 'अहिलेसम्म कुनै परियोजना छैन',
    createFirstProject: 'आफ्नो काम ट्र्याक गर्न सुरु गर्न पहिलो परियोजना सिर्जना गर्नुहोस्',
    createFirstProjectDesc: 'पहिलो परियोजना सिर्जना गर्नुहोस्',
    
    // Invoice Management
    generateDesc: 'आफ्ना बिलहरू उत्पन्न र व्यवस्थापन गर्नुहोस्',
    createInvoice: 'बिल सिर्जना गर्नुहोस्',
    noInvoicesYet: 'अहिलेसम्म कुनै बिल छैन',
    createFirstInvoice: 'बिलिङ सुरु गर्न आफ्नो पहिलो बिल सिर्जना गर्नुहोस्',
    createFirstInvoiceDesc: 'पहिलो बिल सिर्जना गर्नुहोस्',
    
    // Forms
    name: 'नाम',
    email: 'इमेल',
    phone: 'फोन',
    company: 'कम्पनी',
    notes: 'टिप्पणीहरू',
    cancel: 'रद्द गर्नुहोस्',
    save: 'सेभ गर्नुहोस्',
    delete: 'मेटाउनुहोस्',
    edit: 'सम्पादन गर्नुहोस्',
    actions: 'कार्यहरू',
    
    // Modals
    addNewClient: 'नयाँ ग्राहक थप्नुहोस्',
    addNewClientDesc: 'आफ्नो डाटाबेसमा नयाँ ग्राहक थप्न विवरणहरू भर्नुहोस्',
    createNewProject: 'नयाँ परियोजना सिर्जना गर्नुहोस्',
    createNewProjectDesc: 'आफ्नो ग्राहकको लागि नयाँ परियोजना सुरु गर्नुहोस्',
    
    // Project fields
    projectName: 'परियोजना नाम',
    client: 'ग्राहक',
    selectClient: 'ग्राहक छान्नुहोस्',
    description: 'विवरण',
    deadline: 'समयसीमा',
    status: 'स्थिति',
    paymentStatus: 'भुक्तानी स्थिति',
    
    // Status values
    pending: 'पेन्डिङ',
    inProgress: 'प्रगतिमा',
    completed: 'पूरा भएको',
    notPaid: 'भुक्तानी नभएको',
    partial: 'आंशिक',
    paid: 'भुक्तानी भएको',
    unpaid: 'भुक्तानी नभएको',
    
    // Invoice fields
    project: 'परियोजना',
    selectProject: 'परियोजना छान्नुहोस्',
    amount: 'रकम',
    issueDate: 'जारी मिति',
    dueDate: 'भुक्तानी मिति',
    paymentLink: 'भुक्तानी लिङ्क',
    invoiceNumber: 'बिल नम्बर',
    
    // Statistics
    paidThisMonth: 'यो महिना भुक्तानी',
    overdue: 'बाँकी',
    totalInvoices: 'कुल बिलहरू',
    
    // Actions and Messages
    adding: 'थप्दै...',
    creating: 'सिर्जना गर्दै...',
    loading: 'लोड गर्दै...',
    error: 'त्रुटि',
    success: 'सफल',
    
    // Success messages
    clientAdded: 'ग्राहक थपियो',
    hasBeenAddedSuccessfully: 'सफलतापूर्वक थपियो',
    projectCreated: 'परियोजना सिर्जना भयो',
    hasBeenCreatedSuccessfully: 'सफलतापूर्वक सिर्जना भयो',
    invoiceCreated: 'बिल सिर्जना भयो',
    invoiceFor: 'बिल रकम',
    
    // Error messages
    failedToLoadClients: 'ग्राहकहरू लोड गर्न असफल',
    failedToAddClient: 'ग्राहक थप्न असफल',
    failedToLoadProjects: 'परियोजनाहरू लोड गर्न असफल',
    failedToCreateProject: 'परियोजना सिर्जना गर्न असफल',
    failedToLoadInvoices: 'बिलहरू लोड गर्न असफल',
    failedToCreateInvoice: 'बिल सिर्जना गर्न असफल',
    
    // Delete confirmations
    confirmDeleteClient: 'के तपाईं यो ग्राहक मेटाउन निश्चित हुनुहुन्छ?',
    confirmDeleteProject: 'के तपाईं यो परियोजना मेटाउन निश्चित हुनुहुन्छ?',
    confirmDeleteInvoice: 'के तपाईं यो बिल मेटाउन निश्चित हुनुहुन्छ?',
    
    // Delete success messages
    clientDeleted: 'ग्राहक मेटाइयो',
    clientDeletedSuccessfully: 'ग्राहक सफलतापूर्वक मेटाइयो',
    projectDeleted: 'परियोजना मेटाइयो',
    projectDeletedSuccessfully: 'परियोजना सफलतापूर्वक मेटाइयो',
    invoiceDeleted: 'बिल मेटाइयो',
    invoiceDeletedSuccessfully: 'बिल सफलतापूर्वक मेटाइयो',
    
    // Delete error messages
    failedToDeleteClient: 'ग्राहक मेटाउन असफल',
    failedToDeleteProject: 'परियोजना मेटाउन असफल',
    failedToDeleteInvoice: 'बिल मेटाउन असफल',
    
    // Plan limits
    planLimitReached: 'प्लान सीमा पुग्यो',
    freePlanLimit: 'निःशुल्क प्लानमा ३ जना ग्राहकसम्म मात्र',
    upgradeToAddMore: 'थप ग्राहक थप्न प्रो मा अपग्रेड गर्नुहोस्',
    contactSupport: 'सहायताको लागि सम्पर्क गर्नुहोस्',
    
    // Invoice updates
    invoiceUpdated: 'बिल अपडेट भयो',
    invoiceMarkedAs: 'बिललाई चिन्ह लगाइयो',
    failedToUpdateInvoice: 'बिल अपडेट गर्न असफल',
    
    // Language
    language: 'भाषा',
    english: 'English',
    nepali: 'नेपाली',
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

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
