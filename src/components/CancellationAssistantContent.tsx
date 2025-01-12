'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Protected } from '@/components/Protected';
import ClientOnly from '@/components/ClientOnly';
import { PageTitle } from './PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowUpDown, Clock, AlertCircle, CheckCircle2, XCircle, ChevronDown, ChevronUp } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const MotionCard = motion(Card);

// Demo data for cancellable subscriptions
const cancellableSubscriptions = [
  {
    id: 1,
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
    monthlyCost: 17.99,
    cancellationDeadline: '25. Januar 2024',
    status: 'Aktiv',
    lastUsed: '2 Tage',
    cancellationType: 'automatic',
    cancellationSteps: [],
    usageFrequency: 85
  },
  {
    id: 2,
    name: 'Spotify Premium',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
    monthlyCost: 9.99,
    cancellationDeadline: '31. Januar 2024',
    status: 'Nicht genutzt',
    lastUsed: '3 Monate',
    cancellationType: 'semi-automatic',
    cancellationSteps: [
      'Einloggen auf spotify.com',
      'Zu "Konto" navigieren',
      'Auf "Abo verwalten" klicken',
      'Kündigungsformular ausfüllen'
    ],
    usageFrequency: 15
  },
  {
    id: 3,
    name: 'Adobe Creative Cloud',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Adobe_Creative_Cloud_rainbow_icon.svg/640px-Adobe_Creative_Cloud_rainbow_icon.svg.png',
    monthlyCost: 19.99,
    cancellationDeadline: '15. Februar 2024',
    status: 'Testphase',
    lastUsed: '5 Tage',
    cancellationType: 'manual',
    cancellationSteps: [
      'Besuchen Sie adobe.com/manage-account',
      'Melden Sie sich mit Ihrer Adobe ID an',
      'Klicken Sie auf "Pläne"',
      'Wählen Sie "Plan kündigen"',
      'Folgen Sie den Anweisungen auf dem Bildschirm'
    ],
    usageFrequency: 45
  }
];

type SortOption = 'deadline' | 'cost' | 'usage';
type FilterStatus = 'all' | 'active' | 'unused' | 'trial';

export function CancellationAssistantContent() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('deadline');
  const [statusFilter, setStatusFilter] = useState<FilterStatus>('all');
  const [expandedSub, setExpandedSub] = useState<number | null>(null);

  // Filter and sort subscriptions
  const filteredAndSortedSubscriptions = cancellableSubscriptions
    .filter(sub => {
      const matchesSearch = sub.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesStatus = statusFilter === 'all' || 
        (statusFilter === 'active' && sub.status === 'Aktiv') ||
        (statusFilter === 'unused' && sub.status === 'Nicht genutzt') ||
        (statusFilter === 'trial' && sub.status === 'Testphase');
      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'cost':
          return b.monthlyCost - a.monthlyCost;
        case 'usage':
          return b.usageFrequency - a.usageFrequency;
        case 'deadline':
        default:
          return new Date(a.cancellationDeadline.split('.').reverse().join('-')).getTime() -
                 new Date(b.cancellationDeadline.split('.').reverse().join('-')).getTime();
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktiv':
        return 'bg-green-500/10 text-green-300 border-green-500/20';
      case 'Nicht genutzt':
        return 'bg-red-500/10 text-red-300 border-red-500/20';
      case 'Testphase':
        return 'bg-yellow-500/10 text-yellow-300 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-300 border-gray-500/20';
    }
  };

  const getCancellationTypeIcon = (type: string) => {
    switch (type) {
      case 'automatic':
        return <CheckCircle2 className="h-5 w-5 text-green-400" />;
      case 'semi-automatic':
        return <AlertCircle className="h-5 w-5 text-yellow-400" />;
      case 'manual':
        return <XCircle className="h-5 w-5 text-red-400" />;
      default:
        return null;
    }
  };

  const getCancellationTypeText = (type: string) => {
    switch (type) {
      case 'automatic':
        return 'Automatische Kündigung möglich';
      case 'semi-automatic':
        return 'Halbautomatische Kündigung';
      case 'manual':
        return 'Manuelle Kündigung erforderlich';
      default:
        return '';
    }
  };

  return (
    <Protected>
      <ClientOnly>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24">
          <main className="flex-1 p-6 space-y-8">
            <PageTitle>Kündigungsassistent</PageTitle>

            {/* Filter and Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid gap-4 md:grid-cols-3"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10 bg-gray-800/30 border-gray-700/50 text-white placeholder:text-gray-400"
                  placeholder="Abo suchen..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={sortBy} onValueChange={(value: string) => setSortBy(value as SortOption)}>
                <SelectTrigger className="bg-gray-800/30 border-gray-700/50 text-white">
                  <SelectValue placeholder="Sortieren nach..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="deadline">Nach Frist</SelectItem>
                  <SelectItem value="cost">Nach Kosten</SelectItem>
                  <SelectItem value="usage">Nach Nutzung</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={(value: string) => setStatusFilter(value as FilterStatus)}>
                <SelectTrigger className="bg-gray-800/30 border-gray-700/50 text-white">
                  <SelectValue placeholder="Status filtern..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="active">Aktiv</SelectItem>
                  <SelectItem value="unused">Nicht genutzt</SelectItem>
                  <SelectItem value="trial">Testphase</SelectItem>
                </SelectContent>
              </Select>
            </motion.div>

            {/* Subscriptions List */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <MotionCard className="border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-300">Kündbare Abonnements</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredAndSortedSubscriptions.map((subscription) => (
                      <motion.div
                        key={subscription.id}
                        layout
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-700/50 rounded-lg overflow-hidden bg-gray-800/30"
                      >
                        {/* Subscription Header */}
                        <motion.div 
                          className="flex items-center justify-between p-4 bg-gray-800/50 hover:bg-gray-700/50 transition-all cursor-pointer"
                          onClick={() => setExpandedSub(expandedSub === subscription.id ? null : subscription.id)}
                        >
                          <div className="flex items-center space-x-4">
                            <img 
                              src={subscription.logo} 
                              alt={subscription.name}
                              className="h-8 w-auto object-contain filter brightness-200"
                            />
                            <div>
                              <h3 className="font-semibold text-gray-200">{subscription.name}</h3>
                              <p className="text-sm text-gray-400">
                                {subscription.monthlyCost.toLocaleString('de-DE', { 
                                  style: 'currency', 
                                  currency: 'EUR' 
                                })} / Monat
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-3">
                            <span className={`text-sm px-2 py-1 rounded-full border ${getStatusColor(subscription.status)}`}>
                              {subscription.status}
                            </span>
                            {expandedSub === subscription.id ? 
                              <ChevronUp className="h-4 w-4 text-gray-400" /> : 
                              <ChevronDown className="h-4 w-4 text-gray-400" />
                            }
                          </div>
                        </motion.div>

                        {/* Expanded Content */}
                        {expandedSub === subscription.id && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="p-4 space-y-4 border-t border-gray-700/50 bg-gray-800/20"
                          >
                            {/* Cancellation Info */}
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-400">Kündigungsfrist</p>
                                <div className="flex items-center space-x-2 mt-1">
                                  <Clock className="h-4 w-4 text-yellow-400" />
                                  <p className="text-sm text-gray-200">Bis zum {subscription.cancellationDeadline}</p>
                                </div>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Letzte Nutzung</p>
                                <p className="text-sm text-gray-200 mt-1">Vor {subscription.lastUsed}</p>
                              </div>
                            </div>

                            {/* Cancellation Type */}
                            <div className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800/40">
                              {getCancellationTypeIcon(subscription.cancellationType)}
                              <div>
                                <p className="font-medium text-gray-200">
                                  {getCancellationTypeText(subscription.cancellationType)}
                                </p>
                                {subscription.cancellationType === 'automatic' && (
                                  <p className="text-sm text-gray-400">Kündigung wird automatisch durchgeführt</p>
                                )}
                              </div>
                            </div>

                            {/* Cancellation Steps */}
                            {subscription.cancellationSteps.length > 0 && (
                              <div className="space-y-2">
                                <p className="text-sm font-medium text-gray-300">Kündigungsschritte:</p>
                                <div className="space-y-2">
                                  {subscription.cancellationSteps.map((step, index) => (
                                    <div key={index} className="flex items-center space-x-2">
                                      <div className="w-6 h-6 rounded-full bg-gray-700/50 flex items-center justify-center text-sm text-gray-300">
                                        {index + 1}
                                      </div>
                                      <p className="text-sm text-gray-300">{step}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-3 pt-2">
                              {subscription.cancellationType === 'automatic' ? (
                                <Button 
                                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                                >
                                  Jetzt automatisch kündigen
                                </Button>
                              ) : subscription.cancellationType === 'semi-automatic' ? (
                                <>
                                  <Button 
                                    className="flex-1 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white"
                                  >
                                    Kündigungsschreiben erstellen
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    className="flex-1 border-yellow-500/30 text-yellow-300 hover:bg-yellow-500/20"
                                  >
                                    Anleitung anzeigen
                                  </Button>
                                </>
                              ) : (
                                <Button 
                                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white"
                                >
                                  Kündigungscheckliste öffnen
                                </Button>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </MotionCard>
            </motion.div>
          </main>
        </div>
      </ClientOnly>
    </Protected>
  );
} 