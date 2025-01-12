'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Share2, PiggyBank, Clock, Shield } from 'lucide-react';

const benefits = [
  {
    icon: Share2,
    title: "Teile clever",
    description: "Spare bis zu 70% deiner Abo-Kosten durch gemeinsame Familien-Accounts"
  },
  {
    icon: Clock,
    title: "Alles im Blick",
    description: "Verwalte all deine Abos an einem Ort und verpasse nie wieder eine Zahlung"
  },
  {
    icon: PiggyBank,
    title: "Kosten optimieren",
    description: "Erkenne ungenutztes Potenzial und optimiere deine monatlichen Ausgaben"
  },
  {
    icon: Shield,
    title: "Sicher & Einfach",
    description: "Unkomplizierte Kostenteilung mit automatischer Abrechnung"
  }
];

export const Benefits = () => {
  return (
    <div className="relative py-20">
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-b from-transparent via-[#0B0F19]/10 to-[#0B0F19]/20" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-2xl bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500 backdrop-blur-sm"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/5 to-indigo-600/5 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
              <div className="relative">
                <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-r from-purple-500/20 to-indigo-500/20 flex items-center justify-center">
                  <benefit.icon className="w-6 h-6 text-purple-300" />
                </div>
                <h3 className="text-xl font-bold text-white/90 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-400/90 leading-relaxed">
                  {benefit.description}
                </p>
                <div className="mt-4 flex items-center text-purple-400/90 font-medium">
                  <span className="text-sm">Mehr erfahren</span>
                  <svg 
                    className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-500" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}; 