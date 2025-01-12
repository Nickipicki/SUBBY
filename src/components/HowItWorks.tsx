'use client';

import React, { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Area } from 'recharts';
import { Users, CreditCard, PieChart, ArrowRight, Plus, ChevronRight, PiggyBank } from 'lucide-react';

const mockData = {
  expenses: [
    { month: 'Jan', amount: 89 },
    { month: 'Feb', amount: 89 },
    { month: 'Mär', amount: 75 },
    { month: 'Apr', amount: 65 },
    { month: 'Mai', amount: 52 },
    { month: 'Jun', amount: 45 },
    { month: 'Jul', amount: 38 }
  ],
  savings: {
    total: 357,
    percentage: 57
  }
};

// Definieren der erlaubten Service-Namen als Type
type ServiceName = 'Netflix' | 'Spotify' | 'Disney+' | 'Prime';

const services: ServiceName[] = ['Netflix', 'Spotify', 'Disney+', 'Prime'];

const serviceLogos: Record<ServiceName, string> = {
  'Netflix': 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  'Spotify': 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
  'Disney+': 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
  'Prime': 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg'
};

export const HowItWorks = () => {
  const chartRef = useRef(null);
  const isChartInView = useInView(chartRef, { once: true });

  const chartVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <div className="py-20 relative overflow-hidden">
      {/* Sanfterer Übergang von oben */}
   
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-bold text-white/90 mb-6">
            Spare bis zu <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400/90 to-indigo-400/90">57%</span> deiner Kosten
          </h2>
          <p className="text-xl text-gray-400/90 max-w-2xl mx-auto">
            Mit intelligenter Kostenteilung und automatischer Abrechnung
          </p>
        </motion.div>

        <div className="max-w-6xl mx-auto">
          <motion.div 
            className="bg-white/[0.02] backdrop-blur-xl rounded-3xl p-8 border border-white/[0.03] shadow-2xl"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Linke Seite: Chart und Savings */}
              <div className="space-y-8">
                <motion.div
                  ref={chartRef}
                  variants={chartVariants}
                  initial="hidden"
                  animate={isChartInView ? "visible" : "hidden"}
                  className="bg-white/5 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white">Deine Ausgaben</h3>
                    <div className="flex items-center gap-2 text-emerald-400">
                      <span>-{mockData.savings.percentage}%</span>
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="h-[250px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={isChartInView ? mockData.expenses : []}>
                        <defs>
                          <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="month" 
                          stroke="#6b7280"
                          tickLine={false}
                        />
                        <YAxis 
                          stroke="#6b7280"
                          tickLine={false}
                          axisLine={false}
                          domain={['dataMin - 10', 'dataMax + 10']}
                        />
                        <Tooltip 
                          contentStyle={{ 
                            background: '#1f2937', 
                            border: 'none',
                            borderRadius: '8px',
                            boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)'
                          }}
                          formatter={(value: number) => [`${value} CHF`, 'Kosten']}
                          labelStyle={{ color: '#9CA3AF' }}
                        />
                        <Area
                          type="monotone"
                          dataKey="amount"
                          stroke="#8B5CF6"
                          strokeWidth={3}
                          fill="url(#colorGradient)"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="amount" 
                          stroke="#8b5cf6" 
                          strokeWidth={3}
                          dot={{ fill: '#8b5cf6', strokeWidth: 2 }}
                          activeDot={{ 
                            r: 8,
                            stroke: '#8b5cf6',
                            strokeWidth: 2,
                            fill: '#1F2937'
                          }}
                          animationDuration={2000}
                          animationBegin={0}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </motion.div>

                {/* Savings Card */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-gradient-to-br from-purple-500/20 to-indigo-500/20 rounded-2xl p-6 backdrop-blur-sm"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {mockData.savings.total} CHF gespart
                      </h3>
                      <p className="text-gray-400">in den letzten 6 Monaten</p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
                      <PiggyBank className="w-8 h-8 text-emerald-400" />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Rechte Seite: Features */}
              <div className="space-y-6">
                {[
                  {
                    icon: Users,
                    title: "Intelligente Kostenteilung",
                    description: "Teile Abonnements mit Familie und Freunden. Die Kosten werden automatisch fair aufgeteilt.",
                    highlight: "Bis zu 70% sparen"
                  },
                  {
                    icon: CreditCard,
                    title: "Automatische Abrechnung",
                    description: "Vergiss manuelle Überweisungen. Subby kümmert sich um die monatliche Abrechnung.",
                    highlight: "Stressfrei & transparent"
                  },
                  {
                    icon: PieChart,
                    title: "Smarte Übersicht",
                    description: "Behalte alle deine Abonnements im Blick. Erkenne Einsparpotenziale auf einen Blick.",
                    highlight: "Volle Kontrolle"
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="bg-white/5 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300 cursor-pointer group"
                  >
                    <div className="flex gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                        <feature.icon className="w-6 h-6 text-purple-400" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                        <p className="text-gray-400 leading-relaxed mb-2">{feature.description}</p>
                        <span className="inline-block px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm font-medium">
                          {feature.highlight}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}; 