import React, { useState, useEffect, Suspense, memo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, FileText, CheckCircle, BarChart3,
  Play, Pause, ChevronRight, Loader2
} from 'lucide-react';
import DashboardStats from '@/components/dashboard/DashboardStats';
import StatCard from '@/components/shared/StatCard';
import { DemoAuthProvider } from '@/contexts/DemoContext';

// Loading component for the demo
const DemoLoader = memo(() => (
  <div className="flex items-center justify-center h-64">
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    >
      <Loader2 className="w-6 h-6 text-blue-600" />
    </motion.div>
  </div>
));

DemoLoader.displayName = 'DemoLoader';

// Mock data for demo
const mockStats = {
  totalIncome: 450000,
  monthlyIncome: 85000,
  totalClients: 12,
  totalProjects: 8,
  totalPending: 25000,
  incomeGrowth: '+18.5%',
  unpaidInvoicesCount: 3,
  paidInvoicesCount: 15,
  totalInvoices: 18,
  completedProjects: 5,
  inProgressProjects: 3
};

const mockClients = [
  { id: '1', name: 'Tech Solutions Pvt Ltd', email: 'contact@techsolutions.com', company: 'Tech Solutions', phone: '+977-9841234567' },
  { id: '2', name: 'Digital Marketing Co', email: 'info@digitalmarketing.com', company: 'Digital Marketing', phone: '+977-9841234568' },
  { id: '3', name: 'E-commerce Store', email: 'hello@ecomstore.com', company: 'E-commerce', phone: '+977-9841234569' }
];

const mockProjects = [
  { id: '1', project_name: 'Website Redesign', client_id: '1', status: 'In Progress', description: 'Complete website overhaul with modern design' },
  { id: '2', project_name: 'Mobile App Development', client_id: '2', status: 'Completed', description: 'iOS and Android app development' },
  { id: '3', project_name: 'SEO Optimization', client_id: '3', status: 'Pending', description: 'Complete SEO audit and optimization' }
];

const mockInvoices = [
  { id: '1', invoice_number: 'INV-2024-001', amount: 75000, status: 'Paid', due_date: '2024-01-15', project_id: '1' },
  { id: '2', invoice_number: 'INV-2024-002', amount: 45000, status: 'Unpaid', due_date: '2024-01-20', project_id: '2' },
  { id: '3', invoice_number: 'INV-2024-003', amount: 65000, status: 'Paid', due_date: '2024-01-25', project_id: '3' }
];

// Demo components with mock data
const DemoDashboard = () => (
  <div className="space-y-8 p-6">
    <div className="space-y-2">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
    </div>
    <DashboardStats stats={mockStats} />
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Invoice INV-2024-003 paid</span>
              <span className="text-green-600">Rs. 65,000</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>New project started</span>
              <span className="text-blue-600">Website Redesign</span>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-6">
          <h3 className="font-semibold mb-4">Upcoming Deadlines</h3>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Mobile App Development</span>
              <span className="text-orange-600">2 days</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>SEO Optimization</span>
              <span className="text-red-600">5 days</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
);

const DemoClients = () => (
  <div className="space-y-6 p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Clients</h1>
      <Button>Add Client</Button>
    </div>
    <div className="grid gap-4">
      {mockClients.map((client) => (
        <Card key={client.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold">{client.name}</h3>
                <p className="text-sm text-muted-foreground">{client.email}</p>
                <p className="text-sm text-muted-foreground">{client.phone}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{client.company}</p>
                <Button size="sm" variant="outline" className="mt-2">View Details</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const DemoProjects = () => (
  <div className="space-y-6 p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Projects</h1>
      <Button>New Project</Button>
    </div>
    <div className="grid gap-4">
      {mockProjects.map((project) => (
        <Card key={project.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-semibold">{project.project_name}</h3>
                <p className="text-sm text-muted-foreground mt-1">{project.description}</p>
              </div>
              <div className="text-right">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                  project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {project.status}
                </span>
                <Button size="sm" variant="outline" className="mt-2 ml-2">View</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

const DemoInvoices = () => (
  <div className="space-y-6 p-6">
    <div className="flex justify-between items-center">
      <h1 className="text-3xl font-bold">Invoices</h1>
      <Button>Create Invoice</Button>
    </div>
    <div className="grid gap-4">
      {mockInvoices.map((invoice) => (
        <Card key={invoice.id} className="hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{invoice.invoice_number}</h3>
                <p className="text-sm text-muted-foreground">Due: {invoice.due_date}</p>
              </div>
              <div className="text-right">
                <p className="font-semibold">Rs. {invoice.amount.toLocaleString()}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  invoice.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {invoice.status}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

// Demo wrapper component that scales down the real components
const DemoComponentWrapper = memo(({ children, isActive }: { children: React.ReactNode; isActive: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ 
      opacity: isActive ? 1 : 0.7, 
      scale: isActive ? 1 : 0.95,
      filter: isActive ? "blur(0px)" : "blur(1px)"
    }}
    transition={{ duration: 0.5, ease: "easeInOut" }}
    className={`transform origin-top-left transition-all duration-500 ${
      isActive ? 'pointer-events-auto' : 'pointer-events-none'
    }`}
    style={{
      transform: 'scale(0.25)',
      transformOrigin: 'top left',
      width: '400%', // 100% / 0.25 to maintain content width
      height: '400%', // 100% / 0.25 to maintain content height
      overflow: 'hidden'
    }}
  >
    <div className="bg-background min-h-screen overflow-hidden">
      <DemoAuthProvider>
        {children}
      </DemoAuthProvider>
    </div>
  </motion.div>
));

DemoComponentWrapper.displayName = 'DemoComponentWrapper';

const RealAppDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  const demoSteps = [
    { title: 'Dashboard', icon: BarChart3, duration: 5000, component: 'dashboard' },
    { title: 'Clients', icon: Users, duration: 4000, component: 'clients' },
    { title: 'Projects', icon: TrendingUp, duration: 4000, component: 'projects' },
    { title: 'Invoices', icon: FileText, duration: 4000, component: 'invoices' },
    { title: 'Success', icon: CheckCircle, duration: 3000, component: 'success' }
  ];

  useEffect(() => {
    if (!isAnimating) return;
    
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, demoSteps[currentStep]?.duration || 4000);

    return () => clearInterval(timer);
  }, [isAnimating, currentStep, demoSteps]);

  const pageVariants = {
    initial: { opacity: 0, x: 100 },
    in: { opacity: 1, x: 0 },
    out: { opacity: 0, x: -100 }
  };

  const pageTransition = {
    type: "tween" as const,
    ease: "anticipate" as const,
    duration: 0.8
  };

  const renderComponent = () => {
    const stepComponent = demoSteps[currentStep]?.component;
    
    switch (stepComponent) {
      case 'dashboard':
        return <DemoDashboard />;
      case 'clients':
        return <DemoClients />;
      case 'projects':
        return <DemoProjects />;
      case 'invoices':
        return <DemoInvoices />;
      case 'success':
        return (
          <motion.div 
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="flex items-center justify-center h-64"
          >
            <motion.div 
              className="text-center space-y-4"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto" />
              </motion.div>
              <div className="space-y-2">
                <div className="text-xl font-bold text-green-700">Payment Received!</div>
                <div className="text-sm text-green-600">Invoice INV-2024-004 - Rs. 65,000</div>
                <div className="text-xs text-gray-500">via eSewa • Just now</div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="bg-green-100 p-4 rounded-lg"
              >
                <div className="text-lg font-bold text-green-800">
                  Total Revenue: Rs. 4,50,000
                </div>
                <div className="text-sm text-green-600">+Rs. 65,000 this month</div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      default:
        return <DemoLoader />;
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
            {demoSteps.slice(0, 4).map((step, index) => {
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
      <div className="relative h-[280px] overflow-hidden bg-gray-50">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentStep}
            variants={pageVariants}
            initial="initial"
            animate="in"
            exit="out"
            transition={pageTransition}
            className="absolute inset-0"
          >
            <DemoComponentWrapper isActive={true}>
              {renderComponent()}
            </DemoComponentWrapper>
          </motion.div>
        </AnimatePresence>

        {/* Live Demo Indicator */}
        <motion.div 
          className="absolute top-2 right-2 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, duration: 0.3 }}
        >
          <motion.div
            className="w-2 h-2 bg-white rounded-full"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span>LIVE</span>
        </motion.div>
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

export default RealAppDemo;