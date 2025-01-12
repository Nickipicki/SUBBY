'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface MouseGlowProps {
  children: React.ReactNode;
}

export const MouseGlow = ({ children }: MouseGlowProps) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      className="relative overflow-hidden rounded-2xl"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Glow Effekt */}
      <motion.div
        className="absolute pointer-events-none"
        animate={{
          x: mousePosition.x - 400,
          y: mousePosition.y - 400,
          opacity: isHovered ? 0.5 : 0,
          scale: isHovered ? 1 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      >
        <div className="w-[800px] h-[800px] bg-gradient-to-r from-purple-500/30 to-indigo-500/30 rounded-full blur-[100px]" />
      </motion.div>

      {/* Eigentlicher Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}; 