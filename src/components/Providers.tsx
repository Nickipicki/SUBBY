'use client';

import { AuthProvider } from '@/contexts/AuthContext';
import { AnimatePresence } from 'framer-motion';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AnimatePresence mode="wait">
        {children}
      </AnimatePresence>
    </AuthProvider>
  );
} 