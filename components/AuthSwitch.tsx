'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const AuthSwitch = () => {
  const pathname = usePathname();
  const isRegister = pathname === '/register';

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-1">
      <div className="relative flex">
        <motion.div 
          className="absolute bg-purple-500 h-full w-1/2 rounded-lg"
          initial={false}
          animate={{
            x: isRegister ? '100%' : '0%'
          }}
          transition={{
            type: "tween",
            duration: 0.3,
            ease: "easeInOut"
          }}
        />
        <Link
          href="/login"
          className={`relative px-8 py-3 rounded-lg font-medium z-10 transition-all duration-300 ${
            !isRegister ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Anmelden
        </Link>
        <Link
          href="/register"
          className={`relative px-8 py-3 rounded-lg font-medium z-10 transition-all duration-300 ${
            isRegister ? 'text-white' : 'text-gray-400 hover:text-white'
          }`}
        >
          Registrieren
        </Link>
      </div>
    </div>
  );
}; 