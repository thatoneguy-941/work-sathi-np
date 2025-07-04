import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { DemoAuthProvider } from '@/contexts/DemoContext';

interface DemoComponentWrapperProps {
  children: React.ReactNode;
  isActive: boolean;
}

const DemoComponentWrapper = memo(({ children, isActive }: DemoComponentWrapperProps) => (
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

export default DemoComponentWrapper;