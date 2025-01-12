'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Protected } from '@/components/Protected';
import { Footer } from '@/components/Footer';
import ClientOnly from '@/components/ClientOnly';

export function CancellationPageContent() {
  const { user } = useAuth();

  return (
    <Protected>
      <ClientOnly>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24">
          <main className="flex-1 p-6 space-y-8 overflow-auto">
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400">
                Kündigungsassistent
              </h1>
            </motion.div>
            {/* Add cancellation assistant content here */}
          </main>
        </div>
      </ClientOnly>
    </Protected>
  );
} 