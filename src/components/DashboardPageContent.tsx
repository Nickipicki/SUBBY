'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { DatabaseService } from '@/services/database';
import { Subscription } from '@/types';
import { Protected } from '@/components/Protected';
import ClientOnly from '@/components/ClientOnly';
import { YearlyTimeline } from '@/components/YearlyTimeline';
import { MonthlyMiniGraph } from '@/components/MonthlyMiniGraph';
import { SubscriptionRing } from '@/components/SubscriptionRing';
import { ActivityBars } from '@/components/ActivityBars';
import { PaymentCountdown } from '@/components/PaymentCountdown';
import { MemberAvatar } from '@/components/MemberAvatar';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { CreditCard, DollarSign, Users, Activity, ChevronDown, ChevronUp, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PageTitle } from '@/components/PageTitle';

const MotionCard = motion(Card);

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 }
};

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
    usage: 85 // Prozent
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

// Add demo data for cancellations
const cancellationData = {
  pendingCancellations: [
    {
      name: 'Adobe Creative Cloud',
      currentPrice: 19.99,
      cancellationDate: '31. März 2024',
      status: 'Bestätigt',
      savingsPerMonth: 19.99
    },
    {
      name: 'Disney+',
      currentPrice: 8.99,
      cancellationDate: '15. April 2024',
      status: 'In Bearbeitung',
      savingsPerMonth: 8.99
    }
  ],
  plannedCancellations: [
    {
      name: 'Spotify Premium',
      currentPrice: 9.99,
      plannedDate: '1. Mai 2024',
      reason: 'Wechsel zu Family Plan',
      savingsPerMonth: 4.99
    }
  ],
  totalMonthlySavings: 33.97
};

export function DashboardPageContent() {
  const [expandedSub, setExpandedSub] = useState<string | null>(null);
  const { scrollY } = useScroll();
  
  // Parallax und Blur-Effekte
  const backgroundBlur = useTransform(scrollY, [0, 200], [5, 15]);
  const backgroundOpacity = useTransform(scrollY, [0, 200], [0.2, 0.4]);
  const springConfig = { stiffness: 100, damping: 30, bounce: 0 };
  const smoothBackgroundBlur = useSpring(backgroundBlur, springConfig);
  const smoothBackgroundOpacity = useSpring(backgroundOpacity, springConfig);

  const totalSubscriptions = services.length;
  const monthlyTotal = services.reduce((sum, service) => {
    const price = parseFloat(service.price.replace(',', '.').replace('€', ''));
    return sum + price;
  }, 0);

  const parseGermanDate = (dateStr: string) => {
    try {
      if (!dateStr || typeof dateStr !== 'string') {
        return new Date();
      }
      
      const parts = dateStr.trim().split('.');
      if (parts.length !== 3) {
        return new Date();
      }

      const [day, month, year] = parts.map(part => part.trim());
      const fullYear = year.length === 2 ? `20${year}` : year;
      
      const date = new Date(parseInt(fullYear), parseInt(month) - 1, parseInt(day));
      return isNaN(date.getTime()) ? new Date() : date;
    } catch (error) {
      console.error('Error parsing date:', error);
      return new Date();
    }
  };

  const nextPayment = services
    .map(service => ({
      date: parseGermanDate(service.nextPayment),
      service: service
    }))
    .sort((a, b) => a.date.getTime() - b.date.getTime())
    .find(({ date }) => date >= new Date())?.date || new Date();

  return (
    <Protected>
      <ClientOnly>
        <motion.div 
          className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24"
          style={{
            backdropFilter: `blur(${smoothBackgroundBlur}px)`,
            WebkitBackdropFilter: `blur(${smoothBackgroundBlur}px)`,
          }}
        >
          <main className="flex-1 p-6 space-y-8 overflow-auto">
            <PageTitle>Dashboard</PageTitle>

            <motion.div 
              variants={container}
              initial="hidden"
              animate="show"
              className="grid gap-6 md:grid-cols-2 lg:grid-cols-4"
              style={{
                perspective: "1000px"
              }}
            >
              {[
                { 
                  title: 'Aktive Abonnements', 
                  value: `${totalSubscriptions}`, 
                  icon: Users,
                  gradient: 'from-blue-500 via-blue-600 to-blue-700',
                  iconBg: 'bg-blue-500/20',
                  graph: <div className="h-12 mt-2">
                    <SubscriptionRing active={totalSubscriptions} total={10} />
                  </div>
                },
                { 
                  title: 'Monatliche Kosten', 
                  value: monthlyTotal.toLocaleString('de-CH', { style: 'currency', currency: 'CHF' }), 
                  icon: DollarSign,
                  gradient: 'from-green-500 via-green-600 to-green-700',
                  iconBg: 'bg-green-500/20',
                  graph: <div className="h-12 mt-2">
                    <MonthlyMiniGraph services={services} />
                  </div>
                },
                { 
                  title: 'Nächste Abbuchung', 
                  value: nextPayment.toLocaleDateString('de-CH'), 
                  icon: CreditCard,
                  gradient: 'from-purple-500 via-purple-600 to-purple-700',
                  iconBg: 'bg-purple-500/20',
                  graph: <div className="h-12 mt-2">
                    <PaymentCountdown nextPaymentDate={nextPayment} />
                  </div>
                },
                { 
                  title: 'Nutzungsaktivität', 
                  value: '85%', 
                  icon: Activity,
                  gradient: 'from-red-500 via-red-600 to-red-700',
                  iconBg: 'bg-red-500/20',
                  graph: <div className="h-12 mt-2">
                    <ActivityBars />
                  </div>
                },
              ].map((info, index) => (
                <motion.div
                  key={info.title}
                  variants={itemAnimation}
                  whileHover={{
                    scale: 1.02,
                    rotateX: 5,
                    rotateY: 5,
                    transition: { duration: 0.2 }
                  }}
                >
                  <MotionCard 
                    className="relative overflow-hidden border-gray-700/50"
                    style={{
                      background: `rgba(17, 24, 39, ${smoothBackgroundOpacity})`,
                      backdropFilter: 'blur(10px)',
                      WebkitBackdropFilter: 'blur(10px)',
                      boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${info.gradient} opacity-10`} />
                    <div className="absolute inset-0 bg-gray-900/50" />
                    <div className="relative p-6">
                      <div className="flex items-center justify-between">
                        <motion.div 
                          className={`p-4 rounded-2xl ${info.iconBg} backdrop-blur-xl`}
                          animate={{
                            scale: [1, 1.05, 1],
                            rotate: [0, 2, 0]
                          }}
                          transition={{
                            duration: 4,
                            ease: "easeInOut",
                            repeat: Infinity,
                          }}
                          whileHover={{
                            scale: 1.1,
                            rotate: 5,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <motion.div
                            animate={{
                              opacity: [1, 0.7, 1]
                            }}
                            transition={{
                              duration: 2,
                              ease: "easeInOut",
                              repeat: Infinity,
                            }}
                          >
                            <info.icon className="h-8 w-8 text-white" strokeWidth={1.5} />
                          </motion.div>
                        </motion.div>
                        <div className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white via-white to-gray-300">
                          {info.value}
                        </div>
                      </div>
                      <div className="mt-4">
                        <h3 className="text-base font-medium text-gray-300">
                          {info.title}
                        </h3>
                        {info.graph}
                      </div>
                    </div>
                  </MotionCard>
                </motion.div>
              ))}
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <MotionCard 
                className="relative overflow-hidden border-gray-700/50"
                style={{
                  background: `rgba(17, 24, 39, ${smoothBackgroundOpacity})`,
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                }}
              >
                <CardHeader>
                  <CardTitle className="text-xl font-bold text-blue-300">Abonnement-Liste</CardTitle>
                </CardHeader>
                <CardContent>
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
                            className="p-4 space-y-4 border-t border-gray-700/50 bg-gray-800/20"
                          >
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-sm text-gray-400">Plan</p>
                                <p className="text-sm text-gray-200">{service.plan}</p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-400">Nächste Abbuchung</p>
                                <div className="flex items-center space-x-2">
                                  <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.color}`} />
                                  <p className="text-sm text-gray-200">{service.nextPayment}</p>
                                </div>
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between items-center mb-1">
                                <p className="text-sm text-gray-400">Nutzung</p>
                                <span className="text-sm text-gray-300">{service.usage}%</span>
                              </div>
                              <div className="h-2 bg-gray-700/30 rounded-full overflow-hidden">
                                <motion.div
                                  initial={{ width: 0 }}
                                  animate={{ width: `${service.usage}%` }}
                                  transition={{ duration: 0.5, delay: 0.2 }}
                                  className={`h-full rounded-full bg-gradient-to-r ${service.color}`}
                                />
                              </div>
                            </div>

                            <div>
                              <p className="text-sm text-gray-400 mb-2">Mitglieder</p>
                              <div className="flex flex-wrap gap-3">
                                {service.members.map((member, index) => (
                                  <MemberAvatar key={member} name={member} index={index} />
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
                </CardContent>
              </MotionCard>
            </motion.div>

            <motion.div 
              className="grid gap-6 md:grid-cols-2"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6 }}
            >
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <MotionCard 
                  className="relative overflow-hidden border-gray-700/50"
                  style={{
                    background: `rgba(17, 24, 39, ${smoothBackgroundOpacity})`,
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                  }}
                >
                  <CardHeader>
                    <CardTitle className="text-xl font-bold text-red-300">Nächste Kündigungen</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Pending Cancellations */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Bestätigte & Laufende Kündigungen</h3>
                        <div className="space-y-3">
                          {cancellationData.pendingCancellations.map((cancellation, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-red-500/30"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <Trash2 className="h-4 w-4 text-red-400" />
                                  <h4 className="font-medium text-white">{cancellation.name}</h4>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">Kündigung zum {cancellation.cancellationDate}</p>
                              </div>
                              <div className="text-right">
                                <div className="px-2 py-1 rounded-full bg-red-500/10 text-red-300 text-sm border border-red-500/30">
                                  {cancellation.status}
                                </div>
                                <p className="text-sm text-gray-400 mt-1">
                                  {cancellation.currentPrice.toLocaleString('de-CH', { 
                                    style: 'currency', 
                                    currency: 'CHF' 
                                  })} / Monat
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Planned Cancellations */}
                      <div>
                        <h3 className="text-lg font-semibold text-white mb-3">Geplante Kündigungen</h3>
                        <div className="space-y-3">
                          {cancellationData.plannedCancellations.map((cancellation, index) => (
                            <motion.div
                              key={index}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.1 }}
                              className="flex items-center justify-between p-4 rounded-lg bg-gray-800/50 border border-yellow-500/30"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <Trash2 className="h-4 w-4 text-yellow-400" />
                                  <h4 className="font-medium text-white">{cancellation.name}</h4>
                                </div>
                                <p className="text-sm text-gray-400 mt-1">Geplant zum {cancellation.plannedDate}</p>
                                <p className="text-sm text-yellow-300 mt-1">{cancellation.reason}</p>
                              </div>
                              <div className="text-right">
                                <p className="text-sm text-gray-400">
                                  {cancellation.currentPrice.toLocaleString('de-CH', { 
                                    style: 'currency', 
                                    currency: 'CHF' 
                                  })} / Monat
                                </p>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Total Savings */}
                      <div className="pt-4 border-t border-gray-700/50">
                        <div className="flex justify-between items-center">
                          <div>
                            <h3 className="text-lg font-semibold text-white">Geplante Einsparungen</h3>
                            <p className="text-sm text-gray-400">Nach Abschluss aller Kündigungen</p>
                          </div>
                          <div className="text-right">
                            <p className="text-2xl font-bold text-green-400">
                              {cancellationData.totalMonthlySavings.toLocaleString('de-CH', { 
                                style: 'currency', 
                                currency: 'CHF' 
                              })}
                            </p>
                            <p className="text-sm text-gray-400">pro Monat</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </MotionCard>
              </motion.div>
              <motion.div whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <YearlyTimeline services={services} />
              </motion.div>
            </motion.div>
          </main>
        </motion.div>
      </ClientOnly>
    </Protected>
  );
} 