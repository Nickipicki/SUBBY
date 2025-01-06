import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SubbyLogo = () => (
  <div className="flex items-center gap-2">
    <span className="text-2xl font-bold text-white">subby</span>
    <img 
      src="/images/logo.svg"
      alt="Subby Logo"
      className="h-14 w-auto"
    />
  </div>
);

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#0B0F19]/95 backdrop-blur-xl shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link 
          to="/" 
          className="flex items-center transform hover:scale-105 transition-transform group"
        >
          <SubbyLogo />
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-20 transition duration-500" />
        </Link>
        
        <div className="flex items-center gap-8">
          {[
            { path: '/dashboard', label: 'Dashboard' },
            { path: '/family', label: 'Familie' },
            { path: '/subscriptions', label: 'Abos' },
          ].map(({ path, label }) => (
            <Link 
              key={path}
              to={path} 
              className="relative px-2 py-1 text-sm font-medium transition-colors group"
            >
              <span className={`relative z-10 transition-colors ${
                location.pathname === path 
                  ? 'text-white' 
                  : 'text-gray-400 group-hover:text-white'
              }`}>
                {label}
              </span>
              <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-indigo-500 transform origin-left transition-transform duration-300
                ${location.pathname === path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}
              `} />
              <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/20 to-indigo-600/20 rounded-lg blur opacity-0 group-hover:opacity-100 transition duration-500 group-hover:duration-200" />
            </Link>
          ))}
          
          <Link 
            to="/contact" 
            className="relative overflow-hidden px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white text-sm font-medium group
              transform hover:translate-y-[-1px] transition-all duration-300"
          >
            <span className="relative z-10">Contact us</span>
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-0 group-hover:opacity-50 blur-lg transition duration-500 group-hover:duration-200" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-100" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition duration-500" />
          </Link>
        </div>
      </div>
    </nav>
  );
}; 