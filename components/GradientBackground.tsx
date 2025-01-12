'use client';

import React from 'react';
import { motion } from 'framer-motion';

export const GradientBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        {/* Top-left glow */}
        <div className="absolute top-0 left-0 w-[800px] h-[800px] opacity-30">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 blur-[120px]" />
        </div>
        
        {/* Center glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] opacity-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-600 blur-[150px]" />
        </div>
        
        {/* Bottom-right glow */}
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] opacity-20">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 blur-[100px]" />
        </div>
      </motion.div>
    </div>
  );
}; 