
import React, { useState } from 'react';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ClientManagement from '@/components/ClientManagement';
import ProjectManagement from '@/components/ProjectManagement';
import InvoiceGeneration from '@/components/InvoiceGeneration';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Users, FileText, Star, CheckCircle } from 'lucide-react';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Landing Page Component
  const LandingPage = () => (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <Header isLoggedIn={isLoggedIn} onLogin={() => setIsLoggedIn(true)} />
      
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Worksathi
            <span className="block text-2xl md:text-3xl text-gray-600 mt-2">
              वर्कसाथी - Your Freelance Partner
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            The complete CRM solution designed specifically for Nepali freelancers. 
            Manage clients, track projects, and generate invoices with eSewa & Khalti integration.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg px-8 py-3" onClick={() => setIsLoggedIn(true)}>
              Start Free Trial
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 py-3">
              Watch Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything You Need to Manage Your Freelance Business
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Client Management</h3>
              <p className="text-gray-600">ग्राहक व्यवस्थापन</p>
              <p className="text-gray-600 mt-2">
                Keep track of all your clients, their contact information, and project history in one place.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <TrendingUp className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Project Tracking</h3>
              <p className="text-gray-600">प्रोजेक्ट ट्र्याकिङ</p>
              <p className="text-gray-600 mt-2">
                Monitor project progress, deadlines, and milestones with our intuitive dashboard.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center p-6 hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <FileText className="w-12 h-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Smart Invoicing</h3>
              <p className="text-gray-600">स्मार्ट बिलिङ</p>
              <p className="text-gray-600 mt-2">
                Generate professional invoices with eSewa and Khalti QR codes for easy payments.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Simple, Transparent Pricing</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <Card className="p-6 border-2">
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">Free Plan</h3>
              <p className="text-gray-600 mb-4">Perfect for getting started</p>
              <div className="text-3xl font-bold mb-6">Rs. 0<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Up to 5 clients</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Basic invoicing</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Project tracking</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />eSewa/Khalti QR codes</li>
              </ul>
              <Button className="w-full">Get Started Free</Button>
            </CardContent>
          </Card>

          <Card className="p-6 border-2 border-blue-600 relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm flex items-center">
                <Star className="w-4 h-4 mr-1" />
                Most Popular
              </span>
            </div>
            <CardContent className="pt-6">
              <h3 className="text-2xl font-bold mb-2">Pro Plan</h3>
              <p className="text-gray-600 mb-4">For serious freelancers</p>
              <div className="text-3xl font-bold mb-6">Rs. 999<span className="text-lg text-gray-600">/month</span></div>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Unlimited clients</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Advanced invoicing</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Payment reminders</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Analytics & reports</li>
                <li className="flex items-center"><CheckCircle className="w-5 h-5 text-green-600 mr-2" />Priority support</li>
              </ul>
              <Button className="w-full">Upgrade to Pro</Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2024 Worksathi. Made with ❤️ for Nepali freelancers.</p>
        </div>
      </footer>
    </div>
  );

  // Main App Component
  const MainApp = () => {
    const renderContent = () => {
      switch (activeTab) {
        case 'clients':
          return <ClientManagement />;
        case 'projects':
          return <ProjectManagement />;
        case 'invoices':
          return <InvoiceGeneration />;
        case 'profile':
          return <div className="p-8 text-center text-gray-600">Profile settings coming soon...</div>;
        case 'settings':
          return <div className="p-8 text-center text-gray-600">Settings panel coming soon...</div>;
        default:
          return <Dashboard />;
      }
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <Header 
          isLoggedIn={isLoggedIn} 
          onLogout={() => setIsLoggedIn(false)} 
        />
        <div className="flex h-[calc(100vh-64px)]">
          <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="flex-1 overflow-auto p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    );
  };

  return isLoggedIn ? <MainApp /> : <LandingPage />;
};

export default Index;
