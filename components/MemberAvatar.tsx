'use client';

import { motion } from 'framer-motion';

interface MemberAvatarProps {
  name: string;
  index: number;
}

const getInitials = (name: string) => {
  return name.charAt(0).toUpperCase();
};

const getRandomColor = (name: string) => {
  const colors = [
    'from-pink-500 to-rose-500',
    'from-purple-500 to-indigo-500',
    'from-blue-500 to-cyan-500',
    'from-emerald-500 to-green-500',
    'from-amber-500 to-orange-500'
  ];
  return colors[name.length % colors.length];
};

export function MemberAvatar({ name, index }: MemberAvatarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`relative group`}
    >
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRandomColor(name)} flex items-center justify-center text-white font-medium text-sm shadow-lg`}>
        {getInitials(name)}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileHover={{ opacity: 1, y: 0 }}
        className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-10"
      >
        {name}
      </motion.div>
    </motion.div>
  );
} 