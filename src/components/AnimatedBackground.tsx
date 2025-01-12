'use client';

import { motion } from 'framer-motion';

export const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 z-0">
      <motion.div 
        className="absolute top-0 -left-4 w-1/3 h-1/2 bg-gradient-to-br from-purple-500/20 via-transparent to-transparent transform -rotate-45"
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-0 -right-4 w-1/3 h-1/2 bg-gradient-to-tl from-indigo-500/20 via-transparent to-transparent transform rotate-45"
        animate={{
          opacity: [0.2, 0.3, 0.2],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute top-1/4 right-0 w-1/4 h-1/2 bg-gradient-to-l from-purple-500/10 via-transparent to-transparent"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          x: [0, 20, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-0 w-1/4 h-1/2 bg-gradient-to-r from-indigo-500/10 via-transparent to-transparent"
        animate={{
          opacity: [0.1, 0.2, 0.1],
          x: [0, -20, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}; 