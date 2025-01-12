'use client';

import React, { useState, useEffect } from 'react';
import { CreditCard, Users, Receipt, Bell, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DatabaseService } from '@/services/database';
import { motion } from 'framer-motion';
import { Subscription } from '@/types';

// Logos für die Slideshow
const services = [
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
  },
  {
    name: 'Disney+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
  },
  {
    name: 'Amazon Prime',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f1/Prime_Video.svg',
  },
  {
    name: 'Apple TV+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg',
  },
  // Weitere Dienste hier hinzufügen
];

const StatCard = ({ icon: Icon, value, label, trend }: { icon: any, value: string, label: string, trend?: string }) => (
  <div className="bg-gray-800/50 rounded-xl p-3 sm:p-4 cursor-pointer hover:bg-gray-800/70 transition-all">
    <div className="flex items-center gap-2 sm:gap-3 mb-2">
      <div className="p-1.5 sm:p-2 bg-indigo-500/20 rounded-lg">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-400" />
      </div>
      <span className="text-sm sm:text-base text-gray-400">{label}</span>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-xl sm:text-2xl font-bold text-white">{value}</span>
      {trend && <span className="text-xs sm:text-sm text-emerald-400">+{trend}%</span>}
    </div>
  </div>
);

export const Dashboard = () => {
  const router = useRouter();
  const { user } = useAuth();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const data = await DatabaseService.getSubscriptions();
        setSubscriptions(data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleNavigation = () => {
    router.push('/subscriptions');
  };

  return (
    <div className="w-full max-w-[2560px] mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="bg-[#0D1117]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-3 sm:p-6 shadow-2xl">
        {/* Dashboard Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 sm:mb-8 border-b border-gray-800/50 pb-4 sm:pb-6 gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <h2 className="text-lg sm:text-xl font-bold text-white">Dashboard</h2>
          </div>
          <div className="flex-1 w-full sm:mx-8">
            <div className="bg-gray-800/50 rounded-lg px-3 sm:px-4 py-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Suche nach Abonnements..." 
                className="bg-transparent border-none outline-none text-gray-400 w-full text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gray-800 cursor-pointer" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div onClick={handleNavigation}>
            <StatCard 
              icon={CreditCard} 
              value="8" 
              label="Aktive Abos" 
              trend="2" 
            />
          </div>
          <div onClick={() => router.push('/family')}>
            <StatCard 
              icon={Users} 
              value="3" 
              label="Familienmitglieder" 
            />
          </div>
          <StatCard 
            icon={Receipt} 
            value="89,99 €" 
            label="Monatliche Kosten" 
          />
          <StatCard 
            icon={Bell} 
            value="2" 
            label="Anstehende Zahlungen" 
          />
        </div>

        {/* Upcoming Payments */}
        <div className="bg-gray-800/50 rounded-xl p-4 sm:p-6">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4">Nächste Abbuchungen</h3>
          <div className="space-y-3 sm:space-y-4">
            {[
              { name: 'Netflix', date: '15. März 2024', amount: '17,99 €' },
              { name: 'Spotify Family', date: '20. März 2024', amount: '14,99 €' },
            ].map((payment, i) => (
              <div key={i} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-700/50">
                <div>
                  <h4 className="text-white font-medium text-sm sm:text-base">{payment.name}</h4>
                  <p className="text-gray-400 text-xs sm:text-sm">{payment.date}</p>
                </div>
                <span className="text-white font-medium text-sm sm:text-base">{payment.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Slideshow */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-gray-800/50">
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Unterstützte Dienste</h3>
          <div className="relative overflow-hidden w-full">
            <div className="flex animate-slide">
              {services.map((service, i) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 w-32 sm:w-48 mx-6 sm:mx-12 filter grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img 
                    src={service.logo} 
                    alt={service.name}
                    className="w-full h-12 sm:h-16 object-contain"
                  />
                </div>
              ))}
              {services.map((service, i) => (
                <div 
                  key={`repeat-${i}`} 
                  className="flex-shrink-0 w-32 sm:w-48 mx-6 sm:mx-12 filter grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img 
                    src={service.logo} 
                    alt={service.name}
                    className="w-full h-12 sm:h-16 object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 