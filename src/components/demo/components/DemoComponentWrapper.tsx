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
    className={`w-full h-full overflow-hidden ${
      isActive ? 'pointer-events-auto' : 'pointer-events-none'
    }`}
  >
    <div 
      className="bg-background origin-top-left"
      style={{
        transform: 'scale(0.3)',
        transformOrigin: 'top left',
        width: '333.33%', // 100% / 0.3 
        height: '333.33%', // 100% / 0.3
        minHeight: '100vh'
      }}
    >
      <DemoAuthProvider>
        {children}
      </DemoAuthProvider>
    </div>
  </motion.div>
));

DemoComponentWrapper.displayName = 'DemoComponentWrapper';

export default DemoComponentWrapper;