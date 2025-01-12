'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Protected } from '@/components/Protected';
import ClientOnly from '@/components/ClientOnly';
import { PageTitle } from './PageTitle';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Demo data with categories
const subscriptionData = {
  entertainment: {
    name: 'Unterhaltung',
    color: '#FF6B6B',
    total: 44.96,
    subscriptions: [
      { name: 'Netflix', price: 17.99, cycle: 'monthly' },
      { name: 'Spotify', price: 9.99, cycle: 'monthly' },
      { name: 'Disney+', price: 8.99, cycle: 'monthly' },
      { name: 'Amazon Prime', price: 7.99, cycle: 'monthly' },
    ]
  },
  productivity: {
    name: 'Produktivität',
    color: '#4ECDC4',
    total: 29.98,
    subscriptions: [
      { name: 'Microsoft 365', price: 9.99, cycle: 'monthly' },
      { name: 'Adobe Creative Cloud', price: 19.99, cycle: 'monthly' },
    ]
  },
  fitness: {
    name: 'Fitness',
    color: '#45B7D1',
    total: 24.99,
    subscriptions: [
      { name: 'Fitness Studio', price: 24.99, cycle: 'monthly' },
    ]
  },
  other: {
    name: 'Sonstiges',
    color: '#96CEB4',
    total: 14.99,
    subscriptions: [
      { name: 'Dropbox', price: 9.99, cycle: 'monthly' },
      { name: 'Notion', price: 5.00, cycle: 'monthly' },
    ]
  }
};

const pieData = Object.values(subscriptionData).map(category => ({
  name: category.name,
  value: category.total,
  color: category.color
}));

// Add new demo data for savings
const savingsData = {
  alternatives: [
    {
      current: 'Spotify Premium Individual',
      suggestion: 'Spotify Premium Family',
      saving: 7.50,
      description: 'Teile dir Spotify Premium mit bis zu 6 Familienmitgliedern.'
    },
    {
      current: 'Netflix Premium',
      suggestion: 'Netflix Standard',
      saving: 5.00,
      description: 'Wenn du kein 4K benötigst, spare mit dem Standard-Plan.'
    }
  ],
  unusedSubscriptions: [
    {
      name: 'Adobe Creative Cloud',
      lastUsed: '3 Monate',
      price: 19.99,
      description: 'Keine Nutzung in den letzten 3 Monaten festgestellt.'
    }
  ],
  currentDeals: [
    {
      service: 'YouTube Premium',
      deal: '3 Monate kostenlos',
      saving: 35.97,
      validUntil: '31. März 2024'
    },
    {
      service: 'Apple TV+',
      deal: '6 Monate gratis',
      saving: 41.94,
      validUntil: '15. April 2024'
    }
  ]
};

// Add new demo data for notifications
const notificationsData = {
  upcomingRenewals: [
    {
      name: 'Netflix',
      date: '15. Februar 2024',
      price: 17.99,
      daysLeft: 3
    },
    {
      name: 'Spotify',
      date: '1. Februar 2024',
      price: 9.99,
      daysLeft: 7
    }
  ],
  priceChanges: [
    {
      name: 'Disney+',
      oldPrice: 8.99,
      newPrice: 11.99,
      effectiveDate: '1. März 2024',
      percentageIncrease: 33
    },
    {
      name: 'Adobe Creative Cloud',
      oldPrice: 19.99,
      newPrice: 24.99,
      effectiveDate: '15. März 2024',
      percentageIncrease: 25
    }
  ]
};

export function AnalysisContent() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const totalCost = Object.values(subscriptionData).reduce((sum, category) => sum + category.total, 0);

  const handlePieClick = (data: any) => {
    const categoryKey = Object.keys(subscriptionData).find(
      key => subscriptionData[key as keyof typeof subscriptionData].name === data.name
    );
    setSelectedCategory(categoryKey || null);
  };

  return (
    <Protected>
      <ClientOnly>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24">
          <main className="flex-1 p-6 space-y-8">
            <PageTitle>Kostenanalyse</PageTitle>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Pie Chart Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="space-y-6">
                  <Card className="border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-blue-300">Kategorienaufteilung</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[400px] w-full flex flex-col">
                        <div className="flex-1">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieData}
                                cx="50%"
                                cy="45%"
                                innerRadius={80}
                                outerRadius={120}
                                paddingAngle={2}
                                dataKey="value"
                                onClick={handlePieClick}
                                cursor="pointer"
                              >
                                {pieData.map((entry, index) => (
                                  <Cell 
                                    key={`cell-${index}`} 
                                    fill={entry.color}
                                    style={{
                                      filter: selectedCategory === Object.keys(subscriptionData)[index] 
                                        ? 'brightness(1.2)' 
                                        : selectedCategory 
                                          ? 'brightness(0.7)' 
                                          : 'brightness(1)'
                                    }}
                                  />
                                ))}
                              </Pie>
                              <Tooltip 
                                content={({ payload }) => {
                                  if (payload && payload.length > 0) {
                                    const data = payload[0].payload;
                                    return (
                                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-2">
                                        <p className="text-sm font-medium text-white">{data.name}</p>
                                        <p className="text-sm text-gray-300">
                                          {data.value.toLocaleString('de-CH', { 
                                            style: 'currency', 
                                            currency: 'CHF' 
                                          })}
                                        </p>
                                      </div>
                                    );
                                  }
                                  return null;
                                }}
                              />
                              <Legend 
                                verticalAlign="bottom" 
                                height={36}
                                content={({ payload }) => (
                                  <div className="flex justify-center gap-4">
                                    {payload?.map((entry: any, index) => (
                                      <div 
                                        key={`legend-${index}`}
                                        className="flex items-center gap-2 cursor-pointer"
                                        onClick={() => handlePieClick(entry.payload)}
                                      >
                                        <div 
                                          className="w-3 h-3 rounded-full"
                                          style={{ backgroundColor: entry.color }}
                                        />
                                        <span className="text-sm text-gray-300">{entry.value}</span>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="text-center mt-2">
                          <p className="text-sm text-gray-400">Gesamtkosten pro Monat</p>
                          <p className="text-2xl font-bold text-white">
                            {totalCost.toLocaleString('de-CH', { 
                              style: 'currency', 
                              currency: 'CHF' 
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* New Notifications Card */}
                  <Card className="border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
                    <CardHeader>
                      <CardTitle className="text-xl font-bold text-orange-300">Benachrichtigungen & Warnungen</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {/* Upcoming Renewals */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Baldige Verlängerungen</h3>
                          <div className="space-y-2">
                            {notificationsData.upcomingRenewals.map((renewal, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
                              >
                                <div className="flex items-center gap-3">
                                  <div className="w-2 h-2 rounded-full bg-orange-400 animate-pulse" />
                                  <div>
                                    <p className="font-medium text-white">{renewal.name}</p>
                                    <p className="text-sm text-gray-400">Verlängerung am {renewal.date}</p>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="text-orange-300 font-medium">
                                    {renewal.price.toLocaleString('de-CH', { 
                                      style: 'currency', 
                                      currency: 'CHF' 
                                    })}
                                  </p>
                                  <p className="text-sm text-orange-300/70">in {renewal.daysLeft} Tagen</p>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>

                        {/* Price Changes */}
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-3">Preisänderungen</h3>
                          <div className="space-y-2">
                            {notificationsData.priceChanges.map((change, index) => (
                              <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="p-3 rounded-lg bg-gray-800/50 border border-red-500/30 space-y-2"
                              >
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-white">{change.name}</p>
                                    <p className="text-sm text-gray-400">Ab {change.effectiveDate}</p>
                                  </div>
                                  <div className="px-2 py-1 bg-red-500/20 text-red-300 rounded-full text-sm">
                                    +{change.percentageIncrease}%
                                  </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm">
                                  <span className="text-gray-400 line-through">
                                    {change.oldPrice.toLocaleString('de-CH', { 
                                      style: 'currency', 
                                      currency: 'CHF' 
                                    })}
                                  </span>
                                  <span className="text-red-300">→</span>
                                  <span className="text-white font-medium">
                                    {change.newPrice.toLocaleString('de-CH', { 
                                      style: 'currency', 
                                      currency: 'CHF' 
                                    })}
                                  </span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              {/* Category Details Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="border-gray-700/50 bg-gray-800/30 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-blue-300">
                      {selectedCategory 
                        ? subscriptionData[selectedCategory as keyof typeof subscriptionData].name
                        : 'Alle Kategorien'}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {(selectedCategory 
                        ? [subscriptionData[selectedCategory as keyof typeof subscriptionData]]
                        : Object.values(subscriptionData)
                      ).map((category, index) => (
                        <motion.div
                          key={category.name}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="space-y-4"
                        >
                          {!selectedCategory && (
                            <div className="flex items-center gap-2 mb-2">
                              <div 
                                className="w-3 h-3 rounded-full"
                                style={{ backgroundColor: category.color }}
                              />
                              <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                            </div>
                          )}
                          <div className="space-y-2">
                            {category.subscriptions.map((sub, subIndex) => (
                              <motion.div
                                key={sub.name}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: (index * 0.1) + (subIndex * 0.05) }}
                                className="flex justify-between items-center p-3 rounded-lg bg-gray-800/50 border border-gray-700/50"
                              >
                                <span className="text-gray-300">{sub.name}</span>
                                <div className="text-right">
                                  <span className="text-white font-medium">
                                    {sub.price.toLocaleString('de-CH', { 
                                      style: 'currency', 
                                      currency: 'CHF' 
                                    })}
                                  </span>
                                  <span className="text-sm text-gray-400 ml-1">/ Monat</span>
                                </div>
                              </motion.div>
                            ))}
                          </div>
                          <div className="flex justify-between pt- border-t border-gray-700/50">
                            <span className="text-gray-400">Gesamt</span>
                            <span className="text-white font-semibold">
                              {category.total.toLocaleString('de-CH', { 
                                style: 'currency', 
                                currency: 'CHF' 
                              })}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            {/* New Savings Potential Section */}
            <div className="grid gap-6 md:grid-cols-3">
              {/* Alternative Plans Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <Card className="border-gray-700/50 bg-gray-800/30 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-green-300">Günstigere Alternativen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savingsData.alternatives.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-sm text-gray-400">Aktuell</p>
                              <p className="text-white font-medium">{item.current}</p>
                            </div>
                            <div className="px-2 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                              -{item.saving.toLocaleString('de-CH', { 
                                style: 'currency', 
                                currency: 'CHF' 
                              })}/Monat
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-400">Vorschlag</p>
                            <p className="text-white">{item.suggestion}</p>
                          </div>
                          <p className="text-sm text-gray-400">{item.description}</p>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Unused Subscriptions Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Card className="border-gray-700/50 bg-gray-800/30 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-yellow-300">Ungenutzte Abos</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savingsData.unusedSubscriptions.map((item, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 space-y-2"
                        >
                          <div className="flex justify-between items-start">
                            <div>
                              <p className="text-white font-medium">{item.name}</p>
                              <p className="text-sm text-yellow-300">Nicht genutzt seit {item.lastUsed}</p>
                            </div>
                            <div className="px-2 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-sm">
                              {item.price.toLocaleString('de-CH', { 
                                style: 'currency', 
                                currency: 'CHF' 
                              })}/Monat
                            </div>
                          </div>
                          <p className="text-sm text-gray-400">{item.description}</p>
                          <button className="w-full mt-2 px-3 py-2 rounded-lg text-red-300 border border-red-500/30 hover:bg-red-500/20 transition-colors text-sm">
                            Abo kündigen
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Current Deals Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <Card className="border-gray-700/50 bg-gray-800/30 backdrop-blur-sm h-full">
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-purple-300">Aktuelle Angebote</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {savingsData.currentDeals.map((deal, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className="p-4 rounded-lg bg-gray-800/50 border border-gray-700/50 space-y-2 relative overflow-hidden group"
                        >
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <div className="relative">
                            <div className="flex justify-between items-start">
                              <div>
                                <p className="text-white font-medium">{deal.service}</p>
                                <p className="text-purple-300 font-medium">{deal.deal}</p>
                              </div>
                              <div className="px-2 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
                                Spare {deal.saving.toLocaleString('de-CH', { 
                                  style: 'currency', 
                                  currency: 'CHF' 
                                })}
                              </div>
                            </div>
                            <p className="text-sm text-gray-400 mt-2">Gültig bis {deal.validUntil}</p>
                            <button className="w-full mt-3 px-3 py-2 rounded-lg text-white bg-gradient-to-r from-purple-500 to-indigo-500 hover:opacity-90 transition-opacity text-sm">
                              Angebot einlösen
                            </button>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </main>
        </div>
      </ClientOnly>
    </Protected>
  );
} 