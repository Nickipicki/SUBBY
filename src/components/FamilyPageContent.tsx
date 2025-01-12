'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Protected } from '@/components/Protected';
import { FamilyManagement } from '@/components/FamilyManagement';
import { Footer } from '@/components/Footer';
import ClientOnly from '@/components/ClientOnly';

export function FamilyPageContent() {
  const { user } = useAuth();

  return (
    <Protected>
      <ClientOnly>
        <div className="min-h-screen bg-[#0B0F19] text-white p-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <h1 className="text-4xl font-bold mb-2">
                Familienmanagement
              </h1>
              <p className="text-gray-400">
                Verwalte deine Familiengruppen und teile Abonnements
              </p>
            </motion.div>
            <FamilyManagement />
          </div>
          <Footer />
        </div>
      </ClientOnly>
    </Protected>
  );
} 