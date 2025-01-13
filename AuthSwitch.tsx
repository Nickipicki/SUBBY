'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AuthSwitch = () => {
  const pathname = usePathname();
  const isRegister = pathname === '/register';

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-lg p-0.5 shadow-lg shadow-purple-500/10">
      <div className="relative flex">
        <motion.div 
          className="absolute bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-1/2 rounded-md"
          initial={false}
          animate={{
            x: isRegister ? '100%' : '0%'
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
        <Link
          href="/login"
          className={`relative px-6 py-2 rounded-md text-sm font-medium z-10 transition-all duration-300 ${
            !isRegister ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Anmelden
        </Link>
        <Link
          href="/register"
          className={`relative px-6 py-2 rounded-md text-sm font-medium z-10 transition-all duration-300 ${
            isRegister ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Registrieren
        </Link>
      </div>
    </div>
  );
}; 