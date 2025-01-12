'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';
import { HowItWorks } from './HowItWorks';
import { Benefits } from './Benefits';
import { Testimonials } from './Testimonials';
import { FAQ } from './FAQ';
import { motion } from 'framer-motion';

// Logos für die Slideshow
const services = [
  {
    name: 'Netflix',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg',
  },
  {
    name: 'Spotify',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Spotify_logo_with_text.svg',
  },
  {
    name: 'Disney+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg',
  },
  {
    name: 'Prime Video',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/1/11/Amazon_Prime_Video_logo.svg',
  },
  {
    name: 'Apple TV+',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/2/28/Apple_TV_Plus_Logo.svg',
  },
  {
    name: 'DAZN',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/0/06/DAZN_Logo_Master.svg',
    darkLogo: true
  },
  {
    name: 'Adobe Creative Cloud',
    logo: '/images/services/adobe.svg',
    darkLogo: true
  },
  {
    name: 'Google',
    logo: '/images/services/google.svg',
    darkLogo: true
  },
  {
    name: 'Microsoft 365',
    logo: '/images/services/microsoft365.svg',
    darkLogo: true
  }
];

const AnimatedLogo = () => {
  return (
    <motion.div
      className="group relative w-126 h-126"
      initial={{ opacity: 0, scale: 0.3, rotate: -180 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ 
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* Glow-Effekt */}
      <div 
        className="absolute inset-0 bg-purple-500/8 rounded-full blur-[110px] 
        transition-all duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)]
        group-hover:bg-purple-500/10 group-hover:blur-[112px]" 
      />
      
      {/* Logo mit sanfter Hover-Animation */}
      <motion.img
        src="/images/logo.svg"
        alt="Subby Logo"
        className="relative w-full h-full object-contain 
        transition-transform duration-[1500ms] ease-[cubic-bezier(0.16,1,0.3,1)] 
        group-hover:scale-[1.015]"
      />
    </motion.div>
  );
};

export const Hero = () => {
  const router = useRouter();
  const { user } = useAuth();

  const handleGetStarted = () => {
    if (user) {
      router.push('/dashboard');
    } else {
      router.push('/login');
    }
  };

  return (
    <>
      <div className="relative">
        <div className="relative container mx-auto px-4 pt-32 pb-20 text-center">
          <div className="flex justify-center mb-12">
            <AnimatedLogo />
          </div>
          
          <div className="space-y-6 mb-12">
            <h1 className="text-6xl md:text-8xl font-bold">
              <span className="text-white">Verwalte deine</span>
              <br />
              <span className="relative">
                <span className="absolute -inset-1 blur-2xl bg-gradient-to-r from-purple-600/30 to-indigo-600/30" />
                <span className="relative bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                  Abonnements smart
                </span>
              </span>
            </h1>
            
            <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed">
              Behalte den <span className="text-white font-medium">Überblick</span> über deine Abos 
              und teile die <span className="text-white font-medium">Kosten</span> einfach mit 
              <span className="relative inline-block px-2">
                <span className="absolute inset-0 bg-gradient-to-r from-purple-400/10 to-indigo-400/10 rounded-lg transform -skew-x-6" />
                <span className="relative text-white font-medium">Familie und Freunden</span>
              </span>
            </p>
          </div>

          <button 
            onClick={handleGetStarted}
            className="group relative px-8 py-4 rounded-full font-semibold text-lg text-white overflow-hidden transition-all duration-300 transform hover:scale-105"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center gap-2">
              {user ? 'Zum Dashboard' : 'Jetzt starten'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </span>
          </button>

          {/* Logo Slideshow */}
          <div className="mt-24">
            <div className="relative overflow-hidden mx-auto max-w-7xl">
              <div className="flex animate-slide">
                {/* Erste Gruppe */}
                {services.map((service, i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 w-28 mx-6"
                  >
                    <img 
                      src={service.logo} 
                      alt={service.name}
                      className={`w-full h-10 object-contain ${
                        service.darkLogo ? 'brightness-0 invert' : 'brightness-200'
                      }`}
                    />
                  </div>
                ))}
                {/* Zweite Gruppe für nahtloses Looping */}
                {services.map((service, i) => (
                  <div 
                    key={`repeat-${i}`} 
                    className="flex-shrink-0 w-28 mx-6"
                  >
                    <img 
                      src={service.logo} 
                      alt={service.name}
                      className={`w-full h-10 object-contain ${
                        service.darkLogo ? 'brightness-0 invert' : 'brightness-200'
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Benefits />
      <HowItWorks />
      <Testimonials />
      <FAQ />
    </>
  );
} 