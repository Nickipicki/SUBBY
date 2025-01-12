'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid, List, Plus, Filter, SlidersHorizontal, ChevronDown, ChevronUp } from 'lucide-react';
import { Protected } from '@/components/Protected';
import ClientOnly from '@/components/ClientOnly';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { PageTitle } from './PageTitle';

type ViewMode = 'grid' | 'list';
type FilterStatus = 'all' | 'active' | 'paused' | 'cancelled';

const services = [
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    price: '17,99 €',
    status: 'Aktiv',
    color: 'from-red-500 to-red-600',
    nextPayment: '15. Februar 2024',
    members: ['Max', 'Anna', 'Tom'],
    plan: 'Premium 4K',
    usage: 85
  },
  {
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
    price: '9,99 €',
    status: 'Aktiv',
    color: 'from-green-500 to-green-600',
    nextPayment: '1. Februar 2024',
    members: ['Max'],
    plan: 'Premium Individual',
    usage: 95
  },
  {
    name: 'Amazon Prime',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg',
    price: '7,99 €',
    status: 'Aktiv',
    color: 'from-blue-500 to-blue-600',
    nextPayment: '20. Februar 2024',
    members: ['Max', 'Lisa'],
    plan: 'Prime',
    usage: 65
  },
  {
    name: 'Disney+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
    price: '8,99 €',
    status: 'Aktiv',
    color: 'from-purple-500 to-purple-600',
    nextPayment: '5. Februar 2024',
    members: ['Max', 'Anna', 'Tom', 'Lisa'],
    plan: 'Premium',
    usage: 45
  }
];

export function SubscriptionsContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSub, setExpandedSub] = useState<string | null>(null);

  // Filter subscriptions based on search query and status
  const filteredServices = services.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === 'all' || service.status.toLowerCase() === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <Protected>
      <ClientOnly>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24">
          <main className="flex-1 p-6 space-y-8">
            <PageTitle
              rightContent={
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Neues Abo
                </Button>
              }
            >
              Abonnements
            </PageTitle>

            {/* Search and Filters Row */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Suche nach Abonnements..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-gray-800/50 border-gray-700 text-gray-200 placeholder-gray-400 w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="bg-gray-800/50 border-gray-700">
                  <Filter className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="icon" className="bg-gray-800/50 border-gray-700">
                  <SlidersHorizontal className="w-5 h-5" />
                </Button>
                <div className="border-l border-gray-700 mx-2" />
                <Button 
                  variant="outline" 
                  size="icon"
                  className={`bg-gray-800/50 border-gray-700 ${viewMode === 'grid' ? 'text-purple-400' : 'text-gray-400'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-5 h-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className={`bg-gray-800/50 border-gray-700 ${viewMode === 'list' ? 'text-purple-400' : 'text-gray-400'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-5 h-5" />
                </Button>
              </div>
            </motion.div>

            {/* Filter Chips */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-2"
            >
              {[
                { id: 'all', label: 'Alle' },
                { id: 'active', label: 'Aktiv' },
                { id: 'paused', label: 'Pausiert' },
                { id: 'cancelled', label: 'Gekündigt' }
              ].map((status) => (
                <Button
                  key={status.id}
                  variant="outline"
                  size="sm"
                  className={`
                    bg-gray-800/50 border-gray-700
                    ${filterStatus === status.id ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' : 'text-gray-300'}
                  `}
                  onClick={() => setFilterStatus(status.id as FilterStatus)}
                >
                  {status.label}
                </Button>
              ))}
            </motion.div>

            {/* Subscriptions Grid/List View */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="mt-8"
            >
              {viewMode === 'grid' ? (
                // Grid View
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={{
                    hidden: {},
                    show: {
                      transition: {
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {filteredServices.map((service) => (
                    <motion.div
                      key={service.name}
                      variants={{
                        hidden: { 
                          opacity: 0,
                          y: 20
                        },
                        show: { 
                          opacity: 1,
                          y: 0,
                          transition: {
                            type: "spring",
                            stiffness: 100,
                            damping: 15
                          }
                        }
                      }}
                      className="bg-gray-800/30 rounded-xl border border-gray-700/50 overflow-hidden hover:border-gray-600/50 transition-all group hover:translate-y-[-2px] hover:shadow-xl duration-300"
                    >
                      <div className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <img 
                            src={service.logo} 
                            alt={service.name}
                            className="h-8 w-auto object-contain filter brightness-200"
                          />
                          <span className={`text-sm px-2 py-1 rounded-full ${
                            service.status === 'Aktiv' 
                              ? 'bg-green-500/10 text-green-300 border border-green-500/20' 
                              : 'bg-yellow-500/10 text-yellow-300 border border-yellow-500/20'
                          }`}>
                            {service.status}
                          </span>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                            <p className="text-2xl font-bold text-gray-200 mt-1">{service.price}</p>
                            <p className="text-sm text-gray-400">pro Monat</p>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Plan:</span>
                              <span className="text-gray-200">{service.plan}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-gray-400">Nächste Zahlung:</span>
                              <span className="text-gray-200">{service.nextPayment}</span>
                            </div>
                          </div>

                          <div className="pt-4 flex flex-wrap gap-2">
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

                        <div className="flex gap-2 mt-6">
                          <Button variant="outline" size="sm" className="flex-1 bg-gray-700/30 text-gray-200 hover:bg-gray-700/50 border-gray-600/50">
                            Verwalten
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1 bg-gray-700/30 text-red-300 hover:bg-red-500/20 border-red-500/30">
                            Kündigen
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                // List View
                <div className="space-y-4">
                  {filteredServices.map((service) => (
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
                          className="p-4 space-y-4 border-t border-gray-700/50 bg-gray-800/20"
                        >
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p className="text-sm text-gray-400">Plan</p>
                              <p className="text-sm text-gray-200">{service.plan}</p>
                            </div>
                            <div>
                              <p className="text-sm text-gray-400 mb-2">Nächste Abbuchung</p>
                              <div className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                                <p className="text-sm text-gray-200">{service.nextPayment}</p>
                              </div>
                            </div>
                          </div>

                          <div>
                            <p className="text-sm text-gray-400 mb-2">Mitglieder</p>
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
                </div>
              )}
            </motion.div>
          </main>
        </div>
      </ClientOnly>
    </Protected>
  );
} 