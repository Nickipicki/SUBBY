import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#0B0F19]/80 backdrop-blur-xl border-t border-gray-800/50">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Logo & Description */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <img 
                src="/images/logo.svg"
                alt="Subby Logo"
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold text-white">subby</span>
            </Link>
            <p className="text-gray-400 max-w-md">
              Verwalte und teile deine Abonnements smart und einfach. 
              Spare Geld durch gemeinsame Familien-Accounts.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              {[
                { to: '/dashboard', label: 'Dashboard' },
                { to: '/family', label: 'Familie' },
                { to: '/subscriptions', label: 'Abonnements' },
                { to: '/contact', label: 'Kontakt' }
              ].map(link => (
                <li key={link.to}>
                  <Link 
                    to={link.to}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Social */}
          <div>
            <h3 className="text-white font-semibold mb-4">Connect</h3>
            <div className="flex gap-4 mb-6">
              {[
                { icon: Github, href: '#', label: 'Github' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Mail, href: 'mailto:contact@subby.app', label: 'Email' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
            <p className="text-gray-400">
              contact@subby.app
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800/50 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Subby. Alle Rechte vorbehalten.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Datenschutz', to: '/privacy' },
              { label: 'AGB', to: '/terms' },
              { label: 'Impressum', to: '/imprint' }
            ].map(link => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}; 