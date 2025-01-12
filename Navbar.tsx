'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import { 
  RiDashboardLine, 
  RiFileListLine,
  RiPieChartLine,
  RiCalendarCheckLine,
  RiTeamLine,
  RiSettings4Line,
  RiLogoutBoxRLine,
  RiMenuLine,
  RiCloseLine,
  RiAddLine
} from 'react-icons/ri';

const menuItems = [
  { href: '/dashboard', label: 'Dashboard', icon: RiDashboardLine },
  { href: '/subscriptions', label: 'Abonnements', icon: RiFileListLine },
  { href: '/analysis', label: 'Kostenanalyse', icon: RiPieChartLine },
  { href: '/cancellation', label: 'Kündigungsassistent', icon: RiCalendarCheckLine },
  { href: '/family', label: 'Familienmanagement', icon: RiTeamLine },
  { href: '/settings', label: 'Einstellungen', icon: RiSettings4Line },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Fehler beim Ausloggen:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-40 bg-[#0B0F19]/30 backdrop-blur-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href={user ? "/dashboard" : "/"} className="flex-shrink-0 flex items-center gap-2 sm:gap-4 -ml-3 sm:-ml-6">
            <img src="/images/logo.svg" alt="Subby Logo" className="h-10 sm:h-14 w-auto" />
            <span className="text-xl sm:text-2xl font-bold text-white">subby</span>
          </Link>

          {user ? (
            <>
              {/* Desktop Navigation für eingeloggte Benutzer */}
              <div className="hidden lg:flex items-center justify-between flex-1 pl-8">
                <div className="flex items-center space-x-4">
                  {menuItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group ${
                          pathname === item.href
                            ? 'text-white bg-white/5'
                            : 'text-gray-300 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <Icon className="w-5 h-5" />
                          <span>{item.label}</span>
                        </div>
                        {pathname === item.href && (
                          <motion.div
                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500"
                            layoutId="navbar-indicator"
                          />
                        )}
                      </Link>
                    );
                  })}

                  {/* Logout Button */}
                  <button
                    onClick={handleLogout}
                    className="px-3 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
                  >
                    <div className="flex items-center space-x-2">
                      <RiLogoutBoxRLine className="w-5 h-5" />
                      <span>Logout</span>
                    </div>
                  </button>
                </div>

                {/* CTA Button */}
                <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-1.5 whitespace-nowrap ml-8 mr-[-1rem]">
                  <RiAddLine className="w-4 h-4" />
                  Neues Abo
                </button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden p-2 rounded-lg text-gray-300 hover:text-white hover:bg-white/5 transition-colors"
              >
                {isOpen ? (
                  <RiCloseLine className="w-6 h-6" />
                ) : (
                  <RiMenuLine className="w-6 h-6" />
                )}
              </button>
            </>
          ) : (
            /* Navigation für nicht eingeloggte Benutzer */
            <div className="flex items-center space-x-2 sm:space-x-4 ml-auto">
              <Link
                href="/login"
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  pathname === '/login'
                    ? 'text-white bg-white/5'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                Anmelden
              </Link>
              <Link
                href="/register"
                className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium bg-gradient-to-r from-purple-500 to-indigo-500 text-white hover:opacity-90 transition-opacity ${
                  pathname === '/register' ? 'opacity-90' : ''
                }`}
              >
                Registrieren
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && user && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-[#0B0F19]/95 border-t border-gray-800/50"
          >
            <div className="px-3 py-2 space-y-1">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm font-medium ${
                      pathname === item.href
                        ? 'text-white bg-white/5'
                        : 'text-gray-300 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                  </Link>
                );
              })}

              {/* Mobile Logout Button */}
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:text-white hover:bg-white/5"
              >
                <div className="flex items-center space-x-3">
                  <RiLogoutBoxRLine className="w-5 h-5" />
                  <span>Logout</span>
                </div>
              </button>

              {/* Mobile CTA Button */}
              <button className="w-full mt-2 px-3 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-lg text-white text-sm font-medium hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-2">
                <RiAddLine className="w-4 h-4" />
                Neues Abo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
} 