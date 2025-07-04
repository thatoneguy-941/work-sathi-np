import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface DemoSuccessAnimationProps {
  pageVariants: any;
  pageTransition: any;
}

const DemoSuccessAnimation = ({ pageVariants, pageTransition }: DemoSuccessAnimationProps) => (
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

export default DemoSuccessAnimation;