'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Protected } from '@/components/Protected';
import ClientOnly from '@/components/ClientOnly';
import { PageTitle } from './PageTitle';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Bell,
  User,
  CreditCard,
  Lock,
  Mail,
  Globe,
  Moon,
  Sun,
  Palette,
  BellRing,
  Languages,
  Euro,
  FileText,
  Shield,
  LogOut,
  LucideIcon
} from 'lucide-react';

const MotionCard = motion(Card);

// Demo user data
const userData = {
  name: 'Max Mustermann',
  email: 'max.mustermann@example.com',
  language: 'Deutsch',
  theme: 'System',
  currency: 'EUR',
  notifications: {
    email: true,
    push: true,
    renewals: true,
    priceChanges: true,
    recommendations: false
  },
  privacy: {
    shareUsageData: true,
    allowAnalytics: true
  }
};

type BaseField = {
  label: string;
  type: string;
};

type TextField = BaseField & {
  type: 'text' | 'email';
  value: string;
};

type SelectField = BaseField & {
  type: 'select';
  value?: string;
  options: string[];
};

type ToggleField = BaseField & {
  type: 'toggle';
  value: boolean;
};

type ButtonField = BaseField & {
  type: 'button';
  action: string;
};

type ColorField = BaseField & {
  type: 'color';
  value: string;
};

type SettingsField = TextField | SelectField | ToggleField | ButtonField | ColorField;

type SettingsSection = {
  title: string;
  description: string;
  fields: SettingsField[];
};

type SettingsCategory = {
  id: string;
  title: string;
  icon: LucideIcon;
  content: SettingsSection[];
};

export function SettingsContent() {
  const [activeTab, setActiveTab] = useState('account');

  const settingsSections: SettingsCategory[] = [
    {
      id: 'account',
      title: 'Konto & Profil',
      icon: User,
      content: [
        {
          title: 'Persönliche Informationen',
          description: 'Verwalten Sie Ihre persönlichen Daten und Kontoinformationen.',
          fields: [
            { label: 'Name', value: userData.name, type: 'text' },
            { label: 'E-Mail', value: userData.email, type: 'email' }
          ]
        },
        {
          title: 'Sicherheit',
          description: 'Passwort und Zwei-Faktor-Authentifizierung',
          fields: [
            { label: 'Passwort ändern', type: 'button', action: 'Ändern' }
          ]
        }
      ]
    },
    {
      id: 'payment',
      title: 'Zahlungen & Abrechnung',
      icon: CreditCard,
      content: [
        {
          title: 'Zahlungsmethoden',
          description: 'Verwalten Sie Ihre Zahlungsmethoden und Rechnungseinstellungen.',
          fields: [
            { label: 'Standardzahlungsmethode', type: 'select', options: ['PayPal', 'Kreditkarte', 'SEPA-Lastschrift'] },
            { label: 'Rechnungsadresse', type: 'button', action: 'Bearbeiten' }
          ]
        },
        {
          title: 'Währung',
          description: 'Wählen Sie Ihre bevorzugte Währung.',
          fields: [
            { label: 'Währung', value: 'CHF', type: 'select', options: ['CHF'] }
          ]
        }
      ]
    },
    {
      id: 'notifications',
      title: 'Benachrichtigungen',
      icon: Bell,
      content: [
        {
          title: 'E-Mail-Benachrichtigungen',
          description: 'Legen Sie fest, welche E-Mail-Benachrichtigungen Sie erhalten möchten.',
          fields: [
            { label: 'Verlängerungen', type: 'toggle', value: userData.notifications.renewals },
            { label: 'Preisänderungen', type: 'toggle', value: userData.notifications.priceChanges },
            { label: 'Empfehlungen', type: 'toggle', value: userData.notifications.recommendations }
          ]
        },
        {
          title: 'Push-Benachrichtigungen',
          description: 'Konfigurieren Sie Ihre Push-Benachrichtigungen.',
          fields: [
            { label: 'Push-Benachrichtigungen aktivieren', type: 'toggle', value: userData.notifications.push }
          ]
        }
      ]
    },
    {
      id: 'appearance',
      title: 'Darstellung',
      icon: Palette,
      content: [
        {
          title: 'Design',
          description: 'Passen Sie das Erscheinungsbild der App an.',
          fields: [
            { label: 'Theme', value: userData.theme, type: 'select', options: ['Hell', 'Dunkel', 'System'] },
            { label: 'Akzentfarbe', type: 'color', value: '#0066ff' }
          ]
        },
        {
          title: 'Sprache & Region',
          description: 'Wählen Sie Ihre bevorzugte Sprache und Region.',
          fields: [
            { label: 'Sprache', value: userData.language, type: 'select', options: ['Deutsch', 'English', 'Français', 'Español'] }
          ]
        }
      ]
    },
    {
      id: 'privacy',
      title: 'Datenschutz & Sicherheit',
      icon: Shield,
      content: [
        {
          title: 'Datenschutzeinstellungen',
          description: 'Verwalten Sie Ihre Datenschutzeinstellungen.',
          fields: [
            { label: 'Nutzungsdaten teilen', type: 'toggle', value: userData.privacy.shareUsageData },
            { label: 'Analytics zulassen', type: 'toggle', value: userData.privacy.allowAnalytics }
          ]
        },
        {
          title: 'Datensicherheit',
          description: 'Sicherheitseinstellungen für Ihr Konto.',
          fields: [
            { label: 'Zwei-Faktor-Authentifizierung', type: 'button', action: 'Einrichten' },
            { label: 'Anmeldeverlauf anzeigen', type: 'button', action: 'Anzeigen' }
          ]
        }
      ]
    }
  ];

  return (
    <Protected>
      <ClientOnly>
        <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white pt-24">
          <main className="flex-1 p-6">
            <PageTitle>Einstellungen</PageTitle>

            <div className="grid gap-8 md:grid-cols-[300px_1fr] mt-8">
              {/* Settings Navigation */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="md:sticky md:top-24 h-fit"
              >
                <div className="p-4 space-y-2">
                  {settingsSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveTab(section.id)}
                        className={`w-full flex items-center gap-3 px-6 py-4 rounded-lg transition-all ${
                          activeTab === section.id
                            ? 'bg-blue-500/20 text-blue-300 shadow-lg shadow-blue-500/10'
                            : 'hover:bg-gray-800/50 text-gray-400 hover:text-gray-200'
                        }`}
                      >
                        <Icon className={`h-5 w-5 ${
                          activeTab === section.id
                            ? 'text-blue-300'
                            : 'text-gray-400'
                        }`} />
                        <span className="text-base font-medium whitespace-nowrap">{section.title}</span>
                      </button>
                    );
                  })}

                  {/* Logout Button */}
                  <div className="pt-4 mt-4 border-t border-gray-700/50">
                    <button
                      className="w-full flex items-center gap-3 px-6 py-4 rounded-lg transition-all text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                      <LogOut className="h-5 w-5" />
                      <span className="text-base font-medium">Abmelden</span>
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Settings Content */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-12"
              >
                {settingsSections
                  .find(section => section.id === activeTab)
                  ?.content.map((section, index) => (
                    <motion.div
                      key={section.title}
                      className="space-y-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-blue-300">{section.title}</h2>
                        <p className="text-base text-gray-400">{section.description}</p>
                      </div>
                      <div className="space-y-10 pt-4">
                        {section.fields.map((field, fieldIndex) => (
                          <div key={field.label} className="flex flex-col gap-4">
                            <div className="flex-1">
                              <label className="text-lg font-medium text-gray-300">
                                {field.label}
                              </label>
                            </div>
                            <div className="flex-1">
                              {field.type === 'text' || field.type === 'email' ? (
                                <Input
                                  type={field.type}
                                  value={field.value}
                                  className="w-full h-14 bg-gray-800/50 border-gray-700/50 text-white text-lg px-6"
                                />
                              ) : field.type === 'select' ? (
                                <select className="w-full h-14 bg-gray-800/50 border border-gray-700/50 rounded-md px-6 py-2 text-lg text-white">
                                  {field.options?.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))}
                                </select>
                              ) : field.type === 'toggle' ? (
                                <div
                                  className={`w-16 h-9 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                                    field.value ? 'bg-blue-500' : 'bg-gray-700'
                                  }`}
                                >
                                  <motion.div
                                    className="bg-white w-7 h-7 rounded-full shadow-md"
                                    animate={{
                                      x: field.value ? 28 : 0
                                    }}
                                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                                  />
                                </div>
                              ) : field.type === 'button' ? (
                                <Button
                                  variant="outline"
                                  className="w-full h-14 border-gray-700/50 text-gray-300 hover:bg-gray-700/50 text-lg"
                                >
                                  {field.action}
                                </Button>
                              ) : field.type === 'color' ? (
                                <div className="flex items-center gap-6">
                                  <div
                                    className="w-14 h-14 rounded-lg border border-gray-700/50 shadow-lg"
                                    style={{ backgroundColor: field.value }}
                                  />
                                  <Input
                                    type="color"
                                    value={field.value}
                                    className="w-32 h-14 bg-transparent border-0"
                                  />
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
              </motion.div>
            </div>
          </main>
        </div>
      </ClientOnly>
    </Protected>
  );
} 