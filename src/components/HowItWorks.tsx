import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, CreditCard, PieChart, ArrowRight, Plus } from 'lucide-react';

const mockData = {
  expenses: [
    { month: 'Jan', amount: 45 },
    { month: 'Feb', amount: 45 },
    { month: 'Mär', amount: 65 },
    { month: 'Apr', amount: 45 },
    { month: 'Mai', amount: 85 },
    { month: 'Jun', amount: 65 },
  ],
  subscriptions: [
    { 
      name: 'Netflix',
      price: 17.99,
      members: 4,
      pricePerMember: 4.50,
      savings: 13.49,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg'
    },
    { 
      name: 'Spotify Family',
      price: 14.99,
      members: 6,
      pricePerMember: 2.50,
      savings: 12.49,
      icon: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg'
    }
  ]
};

// Definieren der erlaubten Service-Namen als Type
type ServiceName = 'Netflix' | 'Spotify' | 'Disney+' | 'Prime';

// Service-Logos mit dem korrekten Typ
const serviceLogos: Record<ServiceName, string> = {
  'Netflix': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  'Spotify': 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
  'Disney+': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
  'Prime': 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg'
};

// Die Services als konstantes Array mit dem korrekten Typ
const services: ServiceName[] = ['Netflix', 'Spotify', 'Disney+', 'Prime'];

export const HowItWorks = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'add' | 'share'>('overview');
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="py-32 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            So einfach geht's
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Teste selbst, wie du deine Abonnements verwalten und Kosten teilen kannst
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Interactive Demo Dashboard */}
          <motion.div 
            className="bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            {/* Navigation Tabs */}
            <div className="flex gap-4 mb-8">
              {[
                { id: 'overview', label: 'Übersicht', icon: PieChart },
                { id: 'add', label: 'Abo hinzufügen', icon: Plus },
                { id: 'share', label: 'Kosten teilen', icon: Users }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all
                    ${activeTab === tab.id 
                      ? 'bg-white/10 text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                >
                  <tab.icon className="w-4 h-4" />
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Content Area */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="min-h-[400px]"
              >
                {activeTab === 'overview' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Expense Chart */}
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">Monatliche Ausgaben</h3>
                      <div className="h-[200px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={mockData.expenses}>
                            <XAxis dataKey="month" stroke="#6b7280" />
                            <YAxis stroke="#6b7280" />
                            <Tooltip 
                              contentStyle={{ 
                                background: '#1f2937', 
                                border: 'none',
                                borderRadius: '8px',
                                boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                              }}
                            />
                            <Line 
                              type="monotone" 
                              dataKey="amount" 
                              stroke="#8b5cf6" 
                              strokeWidth={2}
                              dot={{ fill: '#8b5cf6' }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Subscriptions List */}
                    <div className="space-y-4">
                      {mockData.subscriptions.map(sub => (
                        <motion.div
                          key={sub.name}
                          className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors cursor-pointer"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="flex items-center gap-4">
                            <img src={sub.icon} alt={sub.name} className="w-10 h-10" />
                            <div className="flex-1">
                              <h4 className="text-white font-medium">{sub.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-gray-400">
                                <Users className="w-4 h-4" />
                                {sub.members} Mitglieder
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-white font-medium">
                                {sub.pricePerMember.toFixed(2)}€ /Monat
                              </div>
                              <div className="text-green-400 text-sm">
                                {sub.savings.toFixed(2)}€ gespart
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'add' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">Neues Abo hinzufügen</h3>
                      <form className="space-y-4">
                        <input 
                          type="text" 
                          placeholder="Name des Abonnements"
                          className="w-full bg-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <div className="grid grid-cols-2 gap-4">
                          <input 
                            type="number" 
                            placeholder="Preis"
                            className="bg-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                          />
                          <select className="bg-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-500">
                            <option>Monatlich</option>
                            <option>Jährlich</option>
                          </select>
                        </div>
                        <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity">
                          Hinzufügen
                        </button>
                      </form>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">Vorgeschlagene Abos</h3>
                      <div className="grid grid-cols-2 gap-4">
                        {services.map(service => (
                          <motion.div
                            key={service}
                            className="bg-white/10 rounded-lg p-4 cursor-pointer flex items-center gap-3"
                            whileHover={{ scale: 1.05 }}
                          >
                            <img 
                              src={serviceLogos[service]} 
                              alt={service}
                              className="h-6 w-auto object-contain"
                            />
                            <div>
                              <div className="text-white font-medium">{service}</div>
                              <div className="text-gray-400 text-sm">Beliebtes Abo</div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'share' && (
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">Kostenteilung</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-white/10 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <Users className="w-5 h-5 text-purple-400" />
                            <div>
                              <div className="text-white">Familie (4)</div>
                              <div className="text-sm text-gray-400">Aktiv</div>
                            </div>
                          </div>
                          <button className="text-purple-400 hover:text-purple-300">
                            Details
                          </button>
                        </div>
                        <button className="w-full flex items-center justify-center gap-2 bg-white/10 rounded-lg p-4 text-gray-400 hover:text-white hover:bg-white/20 transition-colors">
                          <Plus className="w-5 h-5" />
                          Neue Gruppe erstellen
                        </button>
                      </div>
                    </div>
                    <div className="bg-white/5 rounded-xl p-6">
                      <h3 className="text-white font-semibold mb-4">Automatische Abrechnung</h3>
                      <div className="space-y-4">
                        <div className="bg-white/10 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-white">Nächste Abrechnung</div>
                            <div className="text-purple-400">01.05.2024</div>
                          </div>
                          <div className="text-sm text-gray-400">
                            Alle Mitglieder werden automatisch benachrichtigt
                          </div>
                        </div>
                        <button className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity">
                          Jetzt abrechnen
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 