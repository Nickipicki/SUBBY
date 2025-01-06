import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, PiggyBank, Users, Receipt } from 'lucide-react';

const stats = [
  {
    icon: Receipt,
    value: '250€',
    label: 'Durchschnittliche monatliche Ausgaben für Abos',
    color: 'from-blue-500 to-cyan-400'
  },
  {
    icon: PiggyBank,
    value: '35%',
    label: 'Mögliche Ersparnis durch Familien-Abos',
    color: 'from-green-500 to-emerald-400'
  },
  {
    icon: Users,
    value: '4.2',
    label: 'Durchschnittliche Familiengröße',
    color: 'from-purple-500 to-indigo-400'
  },
  {
    icon: TrendingUp,
    value: '85€',
    label: 'Monatliche Ersparnis pro Familie',
    color: 'from-pink-500 to-rose-400'
  }
];

export const Benefits = () => {
  return (
    <div className="py-32">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Deine Vorteile
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Spare Geld und behalte den Überblick
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative group"
            >
              {/* Hintergrund mit Hover-Effekt */}
              <div className="absolute inset-0 bg-gray-800/50 rounded-2xl backdrop-blur-sm group-hover:bg-gray-800/80 transition-all duration-300" />
              
              {/* Gradient Glow */}
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-2xl bg-gradient-to-r ${stat.color}`} />
              
              {/* Content */}
              <div className="relative p-8">
                <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${stat.color} mb-4`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-3xl font-bold text-white mb-2">
                  {stat.value}
                </h3>
                
                <p className="text-gray-400">
                  {stat.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-16"
        >
          
          <button className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity">
            Kostenlos starten
          </button>
        </motion.div>
      </div>
    </div>
  );
}; 