import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, Users, FileText, CheckCircle, BarChart3,
  Play, Pause, ChevronRight
} from 'lucide-react';
import DemoLoader from '@/components/demo/components/DemoLoader';
import DemoComponentWrapper from '@/components/demo/components/DemoComponentWrapper';
import DemoDashboard from '@/components/demo/components/DemoDashboard';
import DemoClients from '@/components/demo/components/DemoClients';
import DemoProjects from '@/components/demo/components/DemoProjects';
import DemoInvoices from '@/components/demo/components/DemoInvoices';
import DemoSuccessAnimation from '@/components/demo/components/DemoSuccessAnimation';

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
        return <DemoSuccessAnimation pageVariants={pageVariants} pageTransition={pageTransition} />;
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