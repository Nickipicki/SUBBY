'use client';

import React, { useState, useEffect } from 'react';
import { motion, useAnimate } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { AuthSwitch } from '@/components/AuthSwitch';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signIn, signInWithGoogle, signInWithGithub } = useAuth();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const showConfetti = async () => {
      // Warte auf die Logo-Drehung
      await new Promise(resolve => setTimeout(resolve, 1300));

      // Erstelle 20 Konfetti-Partikel
      const confetti = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        x: Math.random() * 60 - 30, // -30px bis +30px
        y: Math.random() * -60 - 20, // -20px bis -80px
        rotation: Math.random() * 360,
        scale: Math.random() * 0.5 + 0.5,
      }));

      // Animiere jedes Konfetti
      confetti.forEach(particle => {
        animate(
          `[data-confetti="${particle.id}"]`,
          {
            x: [0, particle.x],
            y: [0, particle.y],
            rotate: [0, particle.rotation],
            scale: [0, particle.scale, 0],
            opacity: [0, 1, 0],
          },
          {
            duration: 1,
            ease: "easeOut",
          }
        );
      });
    };

    showConfetti();
  }, [animate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      setError('Ungültige E-Mail oder Passwort');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
    } catch (err) {
      setError('Fehler bei der Google-Anmeldung');
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
    } catch (err) {
      setError('Fehler bei der GitHub-Anmeldung');
    }
  };

  return (
    <div className="min-h-screen flex bg-[#0B0F19] relative overflow-hidden justify-center gap-32">
      <ParticleBackground />
      
      {/* Linke Seite mit Logo */}
      <motion.div 
        className="hidden lg:flex w-[600px] items-center justify-end relative"
        initial={{ x: "-100%", opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: "100%", opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          ref={scope}
          className="relative w-96 h-96"
          initial={{ rotate: -180 }}
          animate={{ rotate: 0 }}
          transition={{
            duration: 1,
            ease: [0.16, 1, 0.3, 1],
            delay: 0.3
          }}
        >
          <img
            src="/images/logo.svg"
            alt="Subby Logo"
            className="w-full h-full object-contain"
          />
          {/* Konfetti */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              data-confetti={i}
              className="absolute left-1/2 top-1/2 w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500"
              initial={{ x: 0, y: 0, scale: 0, opacity: 0 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Auth Switch */}
      <div className="hidden lg:flex absolute left-1/2 top-[8%] -translate-x-1/2 z-10">
        <AuthSwitch />
      </div>

      {/* Rechte Seite mit Login-Formular */}
      <motion.div 
        className="w-full lg:w-[600px] flex items-center justify-start relative pt-20"
        initial={{ x: "100%", opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: "-100%", opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full max-w-md p-8 rounded-2xl relative backdrop-blur-sm bg-white/5 border border-white/10"
        >
          <div className="relative z-10">
            {/* Logo nur auf mobilen Geräten */}
            <div className="flex lg:hidden justify-center mb-8">
              <motion.img
                src="/images/logo.svg"
                alt="Subby Logo"
                className="h-16 w-auto"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
            </div>

            <h2 className="text-4xl font-bold text-white mb-2 text-center">Willkommen zurück</h2>
            <p className="text-gray-400 text-center mb-8">Melde dich an und verwalte deine Abonnements</p>
            
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6"
              >
                {error}
              </motion.div>
            )}

            {/* Social Login Buttons mit verbesserten Hover-Effekten */}
            <div className="space-y-4 mb-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-white flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <FaGoogle className="w-5 h-5 text-red-500" />
                <span>Mit Google fortfahren</span>
              </button>

              <button
                onClick={handleGithubLogin}
                className="w-full py-3 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium text-white flex items-center justify-center space-x-3 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                <FaGithub className="w-5 h-5" />
                <span>Mit GitHub fortfahren</span>
              </button>
            </div>

            {/* Verbesserte Trennlinie */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-[#0B0F19] text-gray-400">oder mit E-Mail</span>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  E-Mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Passwort
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                Anmelden
              </button>
            </form>

            <p className="mt-8 text-center text-gray-400">
              Noch kein Konto?{' '}
              <Link 
                href="/register" 
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium hover:underline"
              >
                Jetzt registrieren
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 