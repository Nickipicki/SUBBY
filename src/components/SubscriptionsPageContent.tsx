'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { Protected } from '@/components/Protected';
import { SubscriptionList } from '@/components/SubscriptionList';
import { Footer } from '@/components/Footer';
import ClientOnly from '@/components/ClientOnly';

export function SubscriptionsPageContent() {
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
                Meine Abonnements
              </h1>
              <p className="text-gray-400">
                Hier findest du eine Übersicht all deiner aktiven Abonnements
              </p>
            </motion.div>
            <SubscriptionList />
          </div>
          <Footer />
        </div>
      </ClientOnly>
    </Protected>
  );
} 