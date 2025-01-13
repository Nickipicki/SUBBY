import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/contexts/AuthContext';
import ClientLayout from '@/components/ClientLayout';
import { Analytics } from '@vercel/analytics/react';
import Script from 'next/script';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Subby - Dein Abo-Manager',
  description: 'Verwalte all deine Abonnements an einem Ort',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-SQQPE0578L"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-SQQPE0578L');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        {/* Beta Banner */}
        <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-center py-1 text-sm font-medium z-50">
          🚧 Subby befindet sich noch in der Beta-Phase 🚧
        </div>
        <AuthProvider>
          <ClientLayout>
            {children}
          </ClientLayout>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  );
} 