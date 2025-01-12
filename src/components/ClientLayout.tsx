'use client';

import dynamic from 'next/dynamic';

const DynamicNavbar = dynamic(() => import('@/components/Navbar'), {
  ssr: false
});

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <DynamicNavbar />
      <main>
        {children}
      </main>
    </>
  );
} 