import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, FileText, CheckCircle, BarChart3,
  Play, Pause, ChevronRight, X
} from 'lucide-react';
import { DemoAuthProvider } from '@/contexts/DemoContext';
import DashboardStats from '@/components/dashboard/DashboardStats';
import { Card, CardContent } from '@/components/ui/card';

// Mock data - same as RealAppDemo
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

// Demo components
const DemoDashboard = () => (
  <DemoAuthProvider>
    <div className="space-y-8 p-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Welcome back! Here's your business overview.</p>
      </div>
      <DashboardStats stats={mockStats} />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-lg">Recent Activity</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Invoice INV-2024-003 paid</span>
                <span className="text-green-600 font-semibold">Rs. 65,000</span>
              </div>
              <div className="flex justify-between">
                <span>New project started</span>
                <span className="text-blue-600 font-semibold">Website Redesign</span>
              </div>
              <div className="flex justify-between">
                <span>Client added</span>
                <span className="text-purple-600 font-semibold">E-commerce Store</span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4 text-lg">Upcoming Deadlines</h3>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Mobile App Development</span>
                <span className="text-orange-600 font-semibold">2 days</span>
              </div>
              <div className="flex justify-between">
                <span>SEO Optimization</span>
                <span className="text-red-600 font-semibold">5 days</span>
              </div>
              <div className="flex justify-between">
                <span>Website Redesign</span>
                <span className="text-blue-600 font-semibold">1 week</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  </DemoAuthProvider>
);

const DemoClients = () => (
  <DemoAuthProvider>
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Clients</h1>
        <Button size="lg">Add Client</Button>
      </div>
      <div className="grid gap-6">
        {mockClients.map((client) => (
          <Card key={client.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-xl">{client.name}</h3>
                  <p className="text-muted-foreground mt-1">{client.email}</p>
                  <p className="text-muted-foreground">{client.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-lg">{client.company}</p>
                  <Button size="lg" variant="outline" className="mt-3">View Details</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DemoAuthProvider>
);

const DemoProjects = () => (
  <DemoAuthProvider>
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Projects</h1>
        <Button size="lg">New Project</Button>
      </div>
      <div className="grid gap-6">
        {mockProjects.map((project) => (
          <Card key={project.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="font-semibold text-xl">{project.project_name}</h3>
                  <p className="text-muted-foreground mt-2 text-lg">{project.description}</p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-2 rounded-full text-sm font-medium ${
                    project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                    project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                    'bg-yellow-100 text-yellow-800'
                  }`}>
                    {project.status}
                  </span>
                  <Button size="lg" variant="outline" className="mt-3 ml-3">View Project</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </DemoAuthProvider>
);

const DemoInvoices = () => (
  <DemoAuthProvider>
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold">Invoices</h1>
        <Button size="lg">Create Invoice</Button>
      </div>
      <div className="grid gap-6">
        {mockInvoices.map((invoice) => (
          <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-xl">{invoice.invoice_number}</h3>
                  <p className="text-muted-foreground mt-1">Due: {invoice.due_date}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-2xl">Rs. {invoice.amount.toLocaleString()}</p>
                  <span className={`px-3 py-2 rounded-full text-sm font-medium ${
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
  </DemoAuthProvider>
);

interface FullScreenDemoProps {
  isOpen: boolean;
  onClose: () => void;
}

const FullScreenDemo = ({ isOpen, onClose }: FullScreenDemoProps) => {
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
    if (!isAnimating || !isOpen) return;
    
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % demoSteps.length);
    }, demoSteps[currentStep]?.duration || 4000);

    return () => clearInterval(timer);
  }, [isAnimating, currentStep, demoSteps, isOpen]);

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
            className="flex items-center justify-center h-full"
          >
            <motion.div 
              className="text-center space-y-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 150 }}
            >
              <motion.div
                initial={{ rotate: -180, scale: 0 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
              >
                <CheckCircle className="w-24 h-24 text-green-600 mx-auto" />
              </motion.div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-green-700">Payment Received!</div>
                <div className="text-xl text-green-600">Invoice INV-2024-004 - Rs. 65,000</div>
                <div className="text-lg text-gray-500">via eSewa • Just now</div>
              </div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="bg-green-100 p-8 rounded-xl"
              >
                <div className="text-3xl font-bold text-green-800">
                  Total Revenue: Rs. 3,10,000
                </div>
                <div className="text-xl text-green-600">+Rs. 65,000 this month</div>
              </motion.div>
            </motion.div>
          </motion.div>
        );
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[95vw] max-h-[95vh] w-full h-full p-0">
        <div className="bg-white rounded-xl shadow-2xl border overflow-hidden h-full flex flex-col">
          {/* Demo Header */}
          <motion.div 
            className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 flex-shrink-0"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div 
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                </motion.div>
                <span className="text-white font-semibold text-lg">Worksathi Demo</span>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex space-x-2">
                  {[0, 1, 2].map((index) => (
                    <motion.div
                      key={index}
                      className={`w-4 h-4 rounded-full ${
                        index === 0 ? 'bg-red-400' : index === 1 ? 'bg-yellow-400' : 'bg-green-400'
                      }`}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    />
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onClose}
                  className="text-white hover:bg-white/20"
                >
                  <X className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Demo Navigation */}
          <div className="bg-gray-50 px-6 py-3 border-b flex-shrink-0">
            <div className="flex justify-between items-center">
              <div className="flex space-x-6">
                {demoSteps.slice(0, 4).map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div 
                      key={index}
                      className={`flex items-center space-x-2 transition-all duration-500 cursor-pointer ${
                        index === currentStep 
                          ? 'text-blue-600 font-medium' 
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                      onClick={() => setCurrentStep(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{step.title}</span>
                      {index === currentStep && (
                        <motion.div
                          className="w-2 h-2 bg-blue-600 rounded-full"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ duration: 0.2 }}
                        />
                      )}
                    </motion.div>
                  );
                })}
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          {/* Demo Content */}
          <div className="relative flex-1 overflow-hidden bg-gray-50">
            <AnimatePresence mode="wait">
              <motion.div 
                key={currentStep}
                variants={pageVariants}
                initial="initial"
                animate="in"
                exit="out"
                transition={pageTransition}
                className="absolute inset-0 overflow-auto"
              >
                <div className="bg-background min-h-full p-6">
                  {renderComponent()}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Live Demo Indicator */}
            <motion.div 
              className="absolute top-4 right-4 bg-red-500 text-white px-3 py-2 rounded-full text-sm font-medium flex items-center space-x-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1, duration: 0.3 }}
            >
              <motion.div
                className="w-3 h-3 bg-white rounded-full"
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span>LIVE DEMO</span>
            </motion.div>
          </div>

          {/* Demo Controls */}
          <motion.div 
            className="bg-gray-50 p-4 border-t flex-shrink-0"
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
                    className={`w-3 h-3 rounded-full transition-all duration-300 ${
                      index === currentStep ? 'bg-blue-500 w-8' : 'bg-gray-300 hover:bg-gray-400'
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
                  className="text-sm"
                >
                  {isAnimating ? (
                    <>
                      <Pause className="w-4 h-4 mr-2" />
                      Pause
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Play
                    </>
                  )}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenDemo;