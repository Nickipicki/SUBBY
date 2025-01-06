import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    name: "Marie Schmidt",
    role: "Netflix Family Account",
    image: "https://i.pravatar.cc/150?img=1",
    text: "Durch Subby spare ich jeden Monat über 30€ bei meinen Streaming-Abos. Die Kostenteilung funktioniert super einfach!"
  },
  {
    name: "Thomas Weber",
    role: "Spotify Family Manager",
    image: "https://i.pravatar.cc/150?img=2",
    text: "Endlich keine Diskussionen mehr über Abrechnungen. Alles läuft automatisch und transparent."
  },
  {
    name: "Lisa Meyer",
    role: "Prime & Disney+ Sharing",
    image: "https://i.pravatar.cc/150?img=3",
    text: "Die Übersicht über alle Abos ist genial. Ich weiß genau, wann welche Zahlung ansteht."
  }
];

export const Testimonials = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Was unsere Nutzer sagen
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Tausende Nutzer sparen bereits Geld mit Subby
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4 mb-4">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div>
                  <h3 className="text-white font-semibold">{testimonial.name}</h3>
                  <p className="text-purple-400 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-purple-400 text-purple-400" />
                ))}
              </div>
              <p className="text-gray-400 leading-relaxed">
                "{testimonial.text}"
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 