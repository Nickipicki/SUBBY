'use client';

import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="relative z-10 bg-[#0B0F19]/95 backdrop-blur-lg py-12 border-t border-gray-800/20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo und Beschreibung */}
          <div className="col-span-1">
            <img src="/images/logo.svg" alt="Subby Logo" className="h-8 w-auto mb-4" />
            <p className="text-gray-400 text-sm">
              Verwalte und teile deine Abonnements mit Familie und Freunden
            </p>
          </div>

          {/* Rechtliches */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4"></h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  
                </a>
              </li>
            </ul>
          </div>

          {/* Kontakt */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Kontakt</h3>
            <ul className="space-y-2">
              <li>
                <a href="mailto:info@subby.ch" className="text-gray-400 hover:text-white transition-colors">
                  info@subby.ch
                </a>
              </li>
              <li className="text-gray-400">
                Schweiz
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="col-span-1">
            <h3 className="text-white font-medium mb-4">Social Media</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaGithub className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaTwitter className="w-6 h-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <FaLinkedin className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} Subby. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}; 