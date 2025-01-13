'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import { AuthSwitch } from '@/components/AuthSwitch';
import { ParticleBackground } from '@/components/ParticleBackground';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { signUp, signInWithGoogle, signInWithGithub } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwörter stimmen nicht überein');
      return;
    }
    try {
      await signUp(email, password);
      router.push('/dashboard');
    } catch (err) {
      setError('Fehler bei der Registrierung. Bitte versuche es erneut.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await signInWithGoogle();
      router.push('/dashboard');
    } catch (err) {
      setError('Fehler bei der Google-Anmeldung');
    }
  };

  const handleGithubLogin = async () => {
    try {
      await signInWithGithub();
      router.push('/dashboard');
    } catch (err) {
      setError('Fehler bei der GitHub-Anmeldung');
    }
  };

  return (
    <div className="min-h-screen flex flex-row-reverse bg-[#0B0F19] relative overflow-hidden justify-center gap-32">
      <ParticleBackground />
      
      {/* Rechte Seite mit Logo */}
      <motion.div 
        className="hidden lg:flex w-[600px] items-center justify-start relative"
        initial={{ x: "100%", opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: "-100%", opacity: 0, scale: 0.8 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <motion.div
          className="relative w-96 h-96"
          initial={{ rotate: 180 }}
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
        </motion.div>
      </motion.div>

      {/* Auth Switch */}
      <div className="hidden lg:flex absolute left-1/2 top-[5%] -translate-x-1/2 z-10 scale-90">
        <AuthSwitch />
      </div>

      {/* Linke Seite mit Registrierungsformular */}
      <motion.div 
        className="w-full lg:w-[600px] flex items-center justify-end relative pt-20"
        initial={{ x: "-100%", opacity: 0, scale: 0.8 }}
        animate={{ x: 0, opacity: 1, scale: 1 }}
        exit={{ x: "100%", opacity: 0, scale: 0.8 }}
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

            <h2 className="text-4xl font-bold text-white mb-2 text-center">Konto erstellen</h2>
            <p className="text-gray-400 text-center mb-8">Erstelle dein Konto und starte mit Subby</p>

            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-red-500/10 border border-red-500/20 text-red-400 px-4 py-3 rounded-lg mb-6"
              >
                {error}
              </motion.div>
            )}

            {/* Social Login Buttons */}
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

            {/* Trennlinie */}
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

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-300 mb-2">
                  Passwort bestätigen
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500/50 text-white transition-all duration-300"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-xl font-medium hover:from-purple-600 hover:to-indigo-600 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
              >
                Konto erstellen
              </button>
            </form>

            <p className="mt-8 text-center text-gray-400">
              Bereits ein Konto?{' '}
              <Link 
                href="/login" 
                className="text-purple-400 hover:text-purple-300 transition-colors font-medium hover:underline"
              >
                Jetzt anmelden
              </Link>
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
} 