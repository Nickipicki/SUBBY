'use client';

import { AnimatePresence } from 'framer-motion';

export default function AuthTemplate({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AnimatePresence mode="wait">
      {children}
    </AnimatePresence>
  );
} 