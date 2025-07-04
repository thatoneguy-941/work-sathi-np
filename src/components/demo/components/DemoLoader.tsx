import React, { memo } from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

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

export default DemoLoader;