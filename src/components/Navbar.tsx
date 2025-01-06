import React from 'react';
import { Link } from 'react-router-dom';

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
  return (
    <nav className="fixed w-full z-50 bg-[#0B0F19]/80 backdrop-blur-xl border-b border-gray-800/50">
      <div className="container mx-auto px-6 py-6 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <SubbyLogo />
        </Link>
        
        <div className="flex items-center gap-8">
          <Link 
            to="/dashboard" 
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Dashboard
          </Link>
          <Link 
            to="/family" 
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Familie
          </Link>
          <Link 
            to="/subscriptions" 
            className="text-gray-300 hover:text-white transition-colors font-medium"
          >
            Abos
          </Link>
          <Link 
            to="/contact" 
            className="bg-white text-[#0B0F19] px-4 py-2 rounded-full font-medium hover:bg-gray-100 transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </nav>
  );
}; 