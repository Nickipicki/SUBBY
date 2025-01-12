'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const services = [
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    price: '17,99 €',
    status: 'Aktiv',
    nextPayment: '15. Februar 2024',
    members: ['Max', 'Anna', 'Tom'],
    plan: 'Premium 4K'
  },
  {
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
    price: '9,99 €',
    status: 'Aktiv',
    nextPayment: '1. Februar 2024',
    members: ['Max'],
    plan: 'Premium Individual'
  },
  {
    name: 'Amazon Prime',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg',
    price: '7,99 €',
    status: 'Aktiv',
    nextPayment: '20. Februar 2024',
    members: ['Max', 'Lisa'],
    plan: 'Prime'
  },
  {
    name: 'Disney+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    price: '8,99 €',
    status: 'Aktiv',
    nextPayment: '5. Februar 2024',
    members: ['Max', 'Anna', 'Tom', 'Lisa'],
    plan: 'Premium'
  }
];

export function SubscriptionList() {
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  return (
    <motion.div layout className="space-y-4">
      {services.map((service) => (
        <motion.div 
          key={service.name} 
          layout
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="border border-gray-700/50 rounded-lg overflow-hidden bg-gray-800/30"
        >
          <motion.div 
            className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-700/50 transition-all cursor-pointer"
            onClick={() => setExpandedSub(expandedSub === service.name ? null : service.name)}
          >
            <div className="flex items-center space-x-4">
              <img 
                src={service.logo} 
                alt={service.name}
                className="h-8 w-auto object-contain filter brightness-200"
              />
              <div>
                <h3 className="font-semibold text-gray-200">{service.name}</h3>
                <p className="text-sm text-gray-400">{service.price} / Monat</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <span className={`text-sm px-2 py-1 rounded-full ${
                service.status === 'Aktiv' 
                  ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
                  : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
              }`}>
                {service.status}
              </span>
              {expandedSub === service.name ? <ChevronUp className="h-4 w-4 text-gray-400" /> : <ChevronDown className="h-4 w-4 text-gray-400" />}
            </div>
          </motion.div>
          {expandedSub === service.name && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 space-y-3 border-t border-gray-700/50 bg-gray-800/20"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-400">Plan</p>
                  <p className="text-sm text-gray-200">{service.plan}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-400">Nächste Abbuchung</p>
                  <p className="text-sm text-gray-200">{service.nextPayment}</p>
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Mitglieder</p>
                <div className="flex flex-wrap gap-2">
                  {service.members.map((member) => (
                    <span 
                      key={member}
                      className="text-xs px-2 py-1 rounded-full bg-gray-700/50 text-gray-300 border border-gray-600/50"
                    >
                      {member}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex space-x-2 pt-2">
                <Button variant="outline" size="sm" className="bg-gray-700/30 text-gray-200 hover:bg-gray-700/50 border-gray-600/50">
                  Verwalten
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-700/30 text-red-300 hover:bg-red-500/20 border-red-500/30">
                  Kündigen
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
} 