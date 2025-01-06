import React from 'react';
import { CreditCard, Users, Receipt, Bell, Search } from 'lucide-react';
import { useHistory } from 'react-router-dom';

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
  <div className="bg-gray-800/50 rounded-xl p-4 cursor-pointer hover:bg-gray-800/70 transition-all">
    <div className="flex items-center gap-3 mb-2">
      <div className="p-2 bg-indigo-500/20 rounded-lg">
        <Icon className="w-5 h-5 text-indigo-400" />
      </div>
      <span className="text-gray-400">{label}</span>
    </div>
    <div className="flex items-end justify-between">
      <span className="text-2xl font-bold text-white">{value}</span>
      {trend && <span className="text-sm text-emerald-400">+{trend}%</span>}
    </div>
  </div>
);

export const Dashboard = () => {
  const history = useHistory();

  return (
    <div className="relative mx-auto max-w-6xl px-4">
      <div className="bg-[#0D1117]/80 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-6 shadow-2xl">
        {/* Dashboard Header */}
        <div className="flex items-center justify-between mb-8 border-b border-gray-800/50 pb-6">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Dashboard</h2>
          </div>
          <div className="flex-1 mx-8">
            <div className="bg-gray-800/50 rounded-lg px-4 py-2 flex items-center gap-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input 
                type="text" 
                placeholder="Suche nach Abonnements..." 
                className="bg-transparent border-none outline-none text-gray-400 w-full"
              />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-gray-400 cursor-pointer hover:text-white transition-colors" />
            <div className="w-10 h-10 rounded-full bg-gray-800 cursor-pointer" />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div onClick={() => history.push('/subscriptions')}>
            <StatCard 
              icon={CreditCard} 
              value="8" 
              label="Aktive Abos" 
              trend="2" 
            />
          </div>
          <div onClick={() => history.push('/family')}>
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
        <div className="bg-gray-800/50 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Nächste Abbuchungen</h3>
          <div className="space-y-4">
            {[
              { name: 'Netflix', date: '15. März 2024', amount: '17,99 €' },
              { name: 'Spotify Family', date: '20. März 2024', amount: '14,99 €' },
            ].map((payment, i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-gray-700/50">
                <div>
                  <h4 className="text-white font-medium">{payment.name}</h4>
                  <p className="text-gray-400 text-sm">{payment.date}</p>
                </div>
                <span className="text-white font-medium">{payment.amount}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Logo Slideshow */}
        <div className="mt-8 pt-8 border-t border-gray-800/50">
          <h3 className="text-lg font-semibold text-white mb-6">Unterstützte Dienste</h3>
          <div className="relative overflow-hidden">
            <div className="flex animate-slide">
              {/* Erste Gruppe */}
              {services.map((service, i) => (
                <div 
                  key={i} 
                  className="flex-shrink-0 w-32 mx-8 filter grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img 
                    src={service.logo} 
                    alt={service.name}
                    className="w-full h-12 object-contain"
                  />
                </div>
              ))}
              {/* Zweite Gruppe für nahtloses Looping */}
              {services.map((service, i) => (
                <div 
                  key={`repeat-${i}`} 
                  className="flex-shrink-0 w-32 mx-8 filter grayscale hover:grayscale-0 transition-all duration-300"
                >
                  <img 
                    src={service.logo} 
                    alt={service.name}
                    className="w-full h-12 object-contain"
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