import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Users, FileText, TrendingUp, Plus, CheckCircle, Clock, DollarSign, 
  BarChart3, Calendar, Phone, Mail, Building, Edit, Eye, Download,
  Play, Pause, ChevronRight
} from 'lucide-react';

const AnimatedDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const demoSteps = [
    { title: 'Dashboard Overview', icon: BarChart3, duration: 4000 },
    { title: 'Client Management', icon: Users, duration: 3500 },
    { title: 'Project Creation', icon: Plus, duration: 3000 },
    { title: 'Invoice Generation', icon: FileText, duration: 4000 },
    { title: 'Payment Success', icon: CheckCircle, duration: 3000 }
  ];

  useEffect(() => {
    if (!isAnimating) return;
    
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, demoSteps[currentStep]?.duration || 3500);

    return () => clearInterval(timer);
  }, [isAnimating, currentStep, demoSteps]);

  // Real dashboard data examples
  const dashboardData = {
    stats: [
      { label: 'Total Revenue', value: 'Rs. 2,45,000', change: '+12%', trend: 'up' },
      { label: 'Active Projects', value: '8', change: '+3', trend: 'up' },
      { label: 'Pending Invoices', value: '5', change: '-2', trend: 'down' },
      { label: 'Clients', value: '24', change: '+5', trend: 'up' }
    ],
    recentInvoices: [
      { id: 'INV-2024-001', client: 'Tech Solutions Ltd.', amount: 45000, status: 'Paid', date: '2024-12-15' },
      { id: 'INV-2024-002', client: 'Creative Hub', amount: 32000, status: 'Pending', date: '2024-12-10' },
      { id: 'INV-2024-003', client: 'Digital Agency', amount: 28000, status: 'Overdue', date: '2024-12-05' }
    ],
    monthlyRevenue: [
      { month: 'Jan', amount: 180000 },
      { month: 'Feb', amount: 220000 },
      { month: 'Mar', amount: 195000 },
      { month: 'Apr', amount: 245000 }
    ]
  };

  const clientData = {
    clients: [
      { 
        name: 'Tech Solutions Ltd.', 
        email: 'contact@techsolutions.com.np',
        company: 'Tech Solutions Pvt. Ltd.',
        projects: 3, 
        revenue: 125000, 
        status: 'Active',
        lastProject: '2024-12-10'
      },
      { 
        name: 'Creative Hub Studio', 
        email: 'hello@creativehub.np',
        company: 'Creative Hub Studio',
        projects: 2, 
        revenue: 85000, 
        status: 'Active',
        lastProject: '2024-12-08'
      },
      { 
        name: 'Digital Marketing Co.', 
        email: 'info@digitalmarketing.com.np',
        company: 'Digital Marketing Co.',
        projects: 1, 
        revenue: 35000, 
        status: 'Pending',
        lastProject: '2024-11-25'
      }
    ]
  };

  const projectData = {
    newProject: {
      title: 'E-commerce Website Redesign',
      client: 'Tech Solutions Ltd.',
      deadline: '2024-12-30',
      budget: 65000,
      status: 'In Progress',
      description: 'Complete redesign of the company website with modern UI/UX'
    },
    recentProjects: [
      { name: 'Mobile App Development', client: 'Creative Hub', progress: 85, status: 'In Progress' },
      { name: 'Brand Identity Design', client: 'Digital Marketing', progress: 100, status: 'Completed' },
      { name: 'SEO Optimization', client: 'Tech Solutions', progress: 60, status: 'In Progress' }
    ]
  };

  const invoiceData = {
    newInvoice: {
      number: 'INV-2024-004',
      client: 'Tech Solutions Ltd.',
      project: 'E-commerce Website Redesign',
      amount: 65000,
      dueDate: '2025-01-15',
      items: [
        { description: 'UI/UX Design', quantity: 1, rate: 25000, amount: 25000 },
        { description: 'Frontend Development', quantity: 1, rate: 30000, amount: 30000 },
        { description: 'Testing & Deployment', quantity: 1, rate: 10000, amount: 10000 }
      ]
    }
  };

  const pageVariants = {
    initial: { opacity: 0, x: 50, scale: 0.9 },
    in: { opacity: 1, x: 0, scale: 1 },
    out: { opacity: 0, x: -50, scale: 1.1 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.8
  };

  const renderDashboard = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-4"
    >
      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-2">
        {dashboardData.stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white p-3 rounded-lg border shadow-sm"
          >
            <div className="text-lg font-bold text-gray-800">{stat.value}</div>
            <div className="text-xs text-gray-500">{stat.label}</div>
            <div className={`text-xs ${stat.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
              {stat.change}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Recent Activity */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded-lg border"
      >
        <div className="text-sm font-medium text-gray-800 mb-2">Recent Invoices</div>
        <div className="space-y-2">
          {dashboardData.recentInvoices.slice(0, 2).map((invoice, index) => (
            <div key={index} className="flex justify-between items-center text-xs">
              <span className="text-gray-600">{invoice.id}</span>
              <Badge 
                variant={invoice.status === 'Paid' ? 'default' : invoice.status === 'Pending' ? 'secondary' : 'destructive'}
                className="text-xs px-2 py-0"
              >
                {invoice.status}
              </Badge>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Revenue Chart Simulation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="bg-white p-3 rounded-lg border"
      >
        <div className="text-sm font-medium text-gray-800 mb-2">Monthly Revenue</div>
        <div className="flex items-end space-x-1 h-16">
          {dashboardData.monthlyRevenue.map((month, index) => (
            <motion.div
              key={index}
              initial={{ height: 0 }}
              animate={{ height: `${(month.amount / 250000) * 100}%` }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="bg-gradient-to-t from-blue-500 to-purple-500 rounded-t flex-1 min-h-[4px]"
            />
          ))}
        </div>
      </motion.div>
    </motion.div>
  );

  const renderClientManagement = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-3"
    >
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm font-medium text-gray-700">Client Management</div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
        >
          <Button size="sm" className="h-6 px-2 text-xs">
            <Plus className="w-3 h-3 mr-1" />
            Add Client
          </Button>
        </motion.div>
      </div>
      
      <div className="space-y-2">
        {clientData.clients.map((client, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.15, duration: 0.5 }}
            className="bg-white p-3 rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="font-medium text-sm text-gray-800">{client.name}</div>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <Building className="w-3 h-3 mr-1" />
                  {client.company}
                </div>
                <div className="text-xs text-gray-500 flex items-center mt-1">
                  <Mail className="w-3 h-3 mr-1" />
                  {client.email}
                </div>
              </div>
              <div className="text-right">
                <Badge 
                  variant={client.status === 'Active' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {client.status}
                </Badge>
                <div className="text-xs text-gray-500 mt-1">
                  {client.projects} projects
                </div>
                <div className="text-xs font-medium text-green-600">
                  Rs. {client.revenue.toLocaleString()}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  const renderProjectCreation = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-3"
    >
      <div className="text-sm font-medium text-gray-700 mb-3">Create New Project</div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-2 border-dashed border-green-300"
      >
        <div className="text-center space-y-2">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          >
            <Plus className="w-8 h-8 text-green-600 mx-auto" />
          </motion.div>
          <div className="font-medium text-green-700">{projectData.newProject.title}</div>
          <div className="text-xs text-green-600">Client: {projectData.newProject.client}</div>
          <div className="text-lg font-bold text-green-800">Rs. {projectData.newProject.budget.toLocaleString()}</div>
        </div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-3 space-y-1"
        >
          <div className="h-2 bg-green-200 rounded overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: "25%" }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="h-full bg-green-500"
            />
          </div>
          <div className="text-xs text-center text-green-600">Project Created Successfully!</div>
        </motion.div>
      </motion.div>

      {/* Recent Projects */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="space-y-2"
      >
        <div className="text-xs font-medium text-gray-600">Recent Projects</div>
        {projectData.recentProjects.slice(0, 2).map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
            className="bg-white p-2 rounded border"
          >
            <div className="flex justify-between items-center">
              <div className="text-xs font-medium">{project.name}</div>
              <Badge variant="outline" className="text-xs">{project.status}</Badge>
            </div>
            <div className="mt-1">
              <div className="h-1 bg-gray-200 rounded overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${project.progress}%` }}
                  transition={{ delay: 1.4 + index * 0.1, duration: 0.6 }}
                  className="h-full bg-blue-500"
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">{project.progress}% complete</div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );

  const renderInvoiceGeneration = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-3"
    >
      <div className="text-sm font-medium text-gray-700 mb-3">Generate Invoice</div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="bg-white border-2 border-blue-300 p-4 rounded-lg shadow-lg"
      >
        <div className="text-center space-y-2">
          <motion.div
            initial={{ rotate: -180, scale: 0 }}
            animate={{ rotate: 0, scale: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 150 }}
          >
            <FileText className="w-8 h-8 text-blue-600 mx-auto" />
          </motion.div>
          <div className="font-bold text-blue-700">{invoiceData.newInvoice.number}</div>
          <div className="text-xs text-blue-600">{invoiceData.newInvoice.project}</div>
          <div className="text-lg font-bold text-blue-800">Rs. {invoiceData.newInvoice.amount.toLocaleString()}</div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-3 space-y-2"
        >
          <div className="text-xs font-medium text-gray-600">Invoice Items:</div>
          {invoiceData.newInvoice.items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
              className="flex justify-between text-xs bg-blue-50 p-2 rounded"
            >
              <span className="text-gray-700">{item.description}</span>
              <span className="font-medium text-blue-700">Rs. {item.amount.toLocaleString()}</span>
            </motion.div>
          ))}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="mt-3 flex space-x-2"
        >
          <Button size="sm" className="flex-1 h-6 text-xs">
            <Download className="w-3 h-3 mr-1" />
            Download PDF
          </Button>
          <Button size="sm" variant="outline" className="flex-1 h-6 text-xs">
            <Eye className="w-3 h-3 mr-1" />
            Preview
          </Button>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderPaymentSuccess = () => (
    <motion.div 
      variants={pageVariants}
      initial="initial"
      animate="in"
      exit="out"
      transition={pageTransition}
      className="space-y-3"
    >
      <div className="text-sm font-medium text-gray-700 mb-3">Payment Status</div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 150 }}
        className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-300 p-4 rounded-lg"
      >
        <motion.div 
          className="flex items-center justify-center mb-3"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.4, duration: 0.8, type: "spring", stiffness: 200 }}
        >
          <div className="relative">
            <CheckCircle className="w-12 h-12 text-green-600" />
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1.2, 1] }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="absolute inset-0 rounded-full bg-green-200 opacity-30"
            />
          </div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="text-center space-y-2"
        >
          <div className="font-bold text-green-700">Payment Received!</div>
          <div className="text-sm text-green-600">{invoiceData.newInvoice.number} - Rs. {invoiceData.newInvoice.amount.toLocaleString()}</div>
          <div className="text-xs text-gray-500">via eSewa • Just now</div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          className="mt-4 bg-green-100 p-3 rounded-lg"
        >
          <div className="text-center">
            <div className="text-sm font-medium text-green-800">
              <DollarSign className="w-4 h-4 inline mr-1" />
              Total Revenue Updated
            </div>
            <motion.div 
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ delay: 1.4, duration: 0.4 }}
              className="text-lg font-bold text-green-700"
            >
              Rs. 3,10,000
            </motion.div>
            <div className="text-xs text-green-600">+Rs. 65,000 this month</div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );

  const renderStep = () => {
    switch (currentStep) {
      case 0: return renderDashboard();
      case 1: return renderClientManagement();
      case 2: return renderProjectCreation();
      case 3: return renderInvoiceGeneration();
      case 4: return renderPaymentSuccess();
      default: return renderDashboard();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl border overflow-hidden max-w-md mx-auto">
      {/* Demo Header */}
      <motion.div 
        className="bg-gradient-to-r from-blue-600 to-purple-600 p-3"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <motion.div 
              className="w-8 h-8 bg-white rounded-full flex items-center justify-center"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <TrendingUp className="w-4 h-4 text-blue-600" />
            </motion.div>
            <span className="text-white font-semibold">Worksathi</span>
          </div>
          <div className="flex space-x-1">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index === 0 ? 'bg-red-400' : index === 1 ? 'bg-yellow-400' : 'bg-green-400'
                }`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Demo Navigation */}
      <div className="bg-gray-50 px-3 py-2 border-b">
        <div className="flex justify-between items-center text-xs">
          <div className="flex space-x-3">
            {demoSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={index}
                  className={`flex items-center space-x-1 transition-all duration-500 cursor-pointer ${
                    index === currentStep 
                      ? 'text-blue-600 font-medium' 
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                  onClick={() => setCurrentStep(index)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="w-3 h-3" />
                  <span className="hidden sm:inline">{step.title}</span>
                  {index === currentStep && (
                    <motion.div
                      className="w-1 h-1 bg-blue-600 rounded-full"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </div>
      </div>

      {/* Demo Content */}
      <div className="p-4 min-h-[320px] relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div key={currentStep}>
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Demo Controls */}
      <motion.div 
        className="bg-gray-50 p-3 border-t"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {demoSteps.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => setCurrentStep(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentStep ? 'bg-blue-500 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              />
            ))}
          </div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAnimating(!isAnimating)}
              className="text-xs h-7 px-3"
            >
              {isAnimating ? (
                <>
                  <Pause className="w-3 h-3 mr-1" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 mr-1" />
                  Play
                </>
              )}
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default AnimatedDemo;