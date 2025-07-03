import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Users, FileText, TrendingUp, Plus, CheckCircle, Clock, DollarSign } from 'lucide-react';

const AnimatedDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const demoSteps = [
    { title: 'Dashboard Overview', icon: TrendingUp },
    { title: 'Add New Client', icon: Users },
    { title: 'Create Project', icon: Plus },
    { title: 'Generate Invoice', icon: FileText },
    { title: 'Payment Received', icon: CheckCircle }
  ];

  useEffect(() => {
    if (!isAnimating) return;
    
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [isAnimating, demoSteps.length]);

  const mockStats = [
    { label: 'Total Revenue', value: 'Rs. 2,45,000', change: '+12%' },
    { label: 'Active Projects', value: '8', change: '+3' },
    { label: 'Pending Invoices', value: '5', change: '-2' }
  ];

  const mockClients = [
    { name: 'Tech Solutions Ltd.', status: 'Active', projects: 3 },
    { name: 'Creative Agency', status: 'Active', projects: 2 },
    { name: 'Startup Hub', status: 'Pending', projects: 1 }
  ];

  const mockInvoices = [
    { id: 'INV-001', client: 'Tech Solutions', amount: 'Rs. 45,000', status: 'Paid' },
    { id: 'INV-002', client: 'Creative Agency', amount: 'Rs. 32,000', status: 'Pending' },
    { id: 'INV-003', client: 'Startup Hub', amount: 'Rs. 28,000', status: 'Overdue' }
  ];

  const renderDashboard = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {mockStats.map((stat, index) => (
          <div key={index} className="bg-white p-3 rounded border text-center">
            <div className="text-lg font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
            <div className="text-xs text-green-600">{stat.change}</div>
          </div>
        ))}
      </div>
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded">
        <div className="text-sm font-medium text-gray-800">Monthly Revenue</div>
        <div className="mt-2 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded opacity-20"></div>
      </div>
    </div>
  );

  const renderClientForm = () => (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 mb-3">Add New Client</div>
      <div className="space-y-3">
        <div className="animate-pulse">
          <div className="h-3 bg-gray-200 rounded w-20 mb-1"></div>
          <div className="h-8 bg-blue-100 rounded border-2 border-blue-300"></div>
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-16 mb-1"></div>
          <div className="h-8 bg-gray-100 rounded"></div>
        </div>
        <div>
          <div className="h-3 bg-gray-200 rounded w-24 mb-1"></div>
          <div className="h-8 bg-gray-100 rounded"></div>
        </div>
        <div className="pt-2">
          <div className="h-8 bg-green-500 rounded text-white flex items-center justify-center text-sm">
            <Plus className="w-4 h-4 mr-1" />
            Add Client
          </div>
        </div>
      </div>
    </div>
  );

  const renderProjectCreation = () => (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 mb-3">Create New Project</div>
      <div className="bg-blue-50 p-3 rounded border">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Website Redesign</span>
          <Badge variant="outline" className="text-xs">In Progress</Badge>
        </div>
        <div className="text-xs text-gray-600 mt-1">Client: Tech Solutions Ltd.</div>
        <div className="text-xs text-gray-600">Deadline: Dec 30, 2024</div>
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="bg-green-100 p-2 rounded text-center">
          <div className="text-xs text-green-800">Completed: 3</div>
        </div>
        <div className="bg-yellow-100 p-2 rounded text-center">
          <div className="text-xs text-yellow-800">Pending: 2</div>
        </div>
      </div>
    </div>
  );

  const renderInvoiceGeneration = () => (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 mb-3">Generate Invoice</div>
      <div className="border-2 border-dashed border-blue-300 p-4 rounded bg-blue-50">
        <div className="text-center">
          <FileText className="w-8 h-8 text-blue-500 mx-auto mb-2" />
          <div className="text-sm font-medium text-blue-700">INV-004</div>
          <div className="text-xs text-blue-600">Website Redesign Project</div>
          <div className="text-lg font-bold text-blue-800 mt-2">Rs. 65,000</div>
        </div>
        <div className="mt-3 space-y-1">
          <div className="h-2 bg-blue-200 rounded"></div>
          <div className="h-2 bg-blue-200 rounded w-3/4"></div>
          <div className="h-2 bg-blue-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );

  const renderPaymentReceived = () => (
    <div className="space-y-3">
      <div className="text-sm font-medium text-gray-700 mb-3">Payment Status</div>
      <div className="bg-green-50 border-2 border-green-200 p-4 rounded">
        <div className="flex items-center justify-center mb-3">
          <CheckCircle className="w-8 h-8 text-green-500" />
        </div>
        <div className="text-center">
          <div className="text-sm font-medium text-green-700">Payment Received!</div>
          <div className="text-xs text-green-600">INV-004 - Rs. 65,000</div>
          <div className="text-xs text-gray-500 mt-1">via eSewa • Just now</div>
        </div>
        <div className="mt-3 bg-green-100 p-2 rounded">
          <div className="text-xs text-green-800 text-center">
            <DollarSign className="w-3 h-3 inline mr-1" />
            Total Revenue: Rs. 3,10,000
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: return renderDashboard();
      case 1: return renderClientForm();
      case 2: return renderProjectCreation();
      case 3: return renderInvoiceGeneration();
      case 4: return renderPaymentReceived();
      default: return renderDashboard();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg border overflow-hidden max-w-md mx-auto">
      {/* Demo Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
              <TrendingUp className="w-3 h-3 text-blue-600" />
            </div>
            <span className="text-white text-sm font-medium">Worksathi</span>
          </div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 bg-red-400 rounded-full"></div>
            <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Demo Navigation */}
      <div className="bg-gray-50 px-3 py-2 border-b">
        <div className="flex space-x-4 text-xs">
          {demoSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index}
                className={`flex items-center space-x-1 transition-all duration-500 ${
                  index === currentStep 
                    ? 'text-blue-600 font-medium' 
                    : 'text-gray-500'
                }`}
              >
                <Icon className="w-3 h-3" />
                <span className="hidden sm:inline">{step.title}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-4 min-h-[300px]">
        <div className="transition-all duration-700 ease-in-out">
          {renderStep()}
        </div>
      </div>

      {/* Demo Controls */}
      <div className="bg-gray-50 p-3 border-t">
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {demoSteps.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-blue-500' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>
          <Button
            size="sm"
            variant="outline"
            onClick={() => setIsAnimating(!isAnimating)}
            className="text-xs h-6 px-2"
          >
            {isAnimating ? 'Pause' : 'Play'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnimatedDemo;