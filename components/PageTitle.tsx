'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface PageTitleProps {
  children: ReactNode;
  rightContent?: ReactNode;
}

export function PageTitle({ children, rightContent }: PageTitleProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      <motion.h1 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400"
      >
        {children}
      </motion.h1>
      {rightContent && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          {rightContent}
        </motion.div>
      )}
    </div>
  );
} 