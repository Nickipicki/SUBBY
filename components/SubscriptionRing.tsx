'use client';

import { motion } from 'framer-motion';

interface SubscriptionRingProps {
  active: number;
  total: number;
}

export function SubscriptionRing({ active, total }: SubscriptionRingProps) {
  // Immer 10 Segmente anzeigen
  const maxSegments = 10;

  return (
    <div className="relative h-full w-full flex flex-col justify-center">
      {/* Subscription Segments */}
      <div className="flex gap-1 mb-2">
        {[...Array(maxSegments)].map((_, i: number) => (
          <motion.div
            key={i}
            className={`h-2 rounded-full flex-1 ${
              i < active 
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-[0_0_10px_rgba(59,130,246,0.5)]' 
                : 'bg-gray-700/30'
            }`}
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 1 }}
            transition={{
              delay: i * 0.05,
              duration: 0.3,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Stats */}
      <div className="flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center"
        >
          <span className="text-sm font-medium text-blue-300">
            {active}
          </span>
        </motion.div>
      </div>
    </div>
  );
} 