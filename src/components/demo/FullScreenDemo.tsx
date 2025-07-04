import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, FileText, CheckCircle, BarChart3,
  Play, Pause, ChevronRight, X
} from 'lucide-react';
import Dashboard from '@/components/Dashboard';
import ClientManagement from '@/components/ClientManagement';
import ProjectManagement from '@/components/ProjectManagement';
import InvoiceGeneration from '@/components/InvoiceGeneration';

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
        return <Dashboard />;
      case 'clients':
        return <ClientManagement />;
      case 'projects':
        return <ProjectManagement />;
      case 'invoices':
        return <InvoiceGeneration />;
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