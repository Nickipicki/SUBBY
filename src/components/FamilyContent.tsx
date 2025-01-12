'use client';

import { motion } from 'framer-motion';
import { Protected } from '@/components/Protected';
import ClientOnly from '@/components/ClientOnly';
import { PageTitle } from './PageTitle';

export function FamilyContent() {
  return (
    <Protected>
      <ClientOnly>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24">
          <main className="flex-1 p-6 space-y-8">
            <PageTitle>Familienmanagement</PageTitle>

            {/* Content will be added here */}
            <div className="mt-8">
              {/* Familienmanagement Inhalt kommt hier */}
            </div>
          </main>
        </div>
      </ClientOnly>
    </Protected>
  );
} 