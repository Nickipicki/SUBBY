import React from 'react';
import { motion } from 'framer-motion';

interface StepProps {
  number: string;
  title: string;
  description: string;
  icon: string;
  isActive: boolean;
}

export const Step = ({ number, title, description, icon, isActive }: StepProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className={`p-6 rounded-xl transition-colors ${
        isActive ? 'bg-gray-800/50' : 'bg-gray-800/20'
      }`}
    >
      <div className="flex items-center gap-4 mb-4">
        <span className="text-4xl">{icon}</span>
        <span className="text-sm text-gray-400">{number}</span>
      </div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  );
}; 