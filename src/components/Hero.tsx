import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useHistory } from 'react-router-dom';
import { HowItWorks } from './HowItWorks';
import { Benefits } from './Benefits';

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
  }
];

export const Hero = () => {
  const history = useHistory();

  return (
    <>
      <div className="relative">
        <div className="relative container mx-auto px-4 pt-32 pb-20 text-center">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              <span className="flex items-center justify-center gap-2 mb-4">
                subby
              </span>
              Verwalte deine<br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 text-transparent bg-clip-text">
                Abonnements smart
              </span>
            </h1>
          </div>
          
          <p className="text-gray-400 text-xl md:text-2xl max-w-3xl mx-auto mb-12">
            Behalte den Überblick über deine Abos und teile die Kosten 
            einfach mit Familie und Freunden.
          </p>

          <button 
            onClick={() => history.push('/dashboard')}
            className="bg-gradient-to-r from-purple-500 to-indigo-500 px-8 py-4 rounded-full font-semibold text-lg text-white hover:opacity-90 transition-opacity inline-flex items-center gap-2"
          >
            Jetzt starten
            <ArrowRight className="w-5 h-5" />
          </button>

          {/* Logo Slideshow */}
          <div className="mt-24">
            <div className="relative overflow-hidden mx-auto max-w-5xl">
              <div className="flex animate-slide">
                {/* Erste Gruppe */}
                {services.map((service, i) => (
                  <div 
                    key={i} 
                    className="flex-shrink-0 w-32 mx-8"
                  >
                    <img 
                      src={service.logo} 
                      alt={service.name}
                      className={`w-full h-12 object-contain ${
                        service.darkLogo ? 'brightness-0 invert' : 'brightness-200'
                      }`}
                    />
                  </div>
                ))}
                {/* Zweite Gruppe für nahtloses Looping */}
                {services.map((service, i) => (
                  <div 
                    key={`repeat-${i}`} 
                    className="flex-shrink-0 w-32 mx-8"
                  >
                    <img 
                      src={service.logo} 
                      alt={service.name}
                      className={`w-full h-12 object-contain ${
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
    </>
  );
} 