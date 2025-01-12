'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: "Wie funktioniert die Kostenteilung?",
    answer: "Subby berechnet automatisch die Kosten pro Person und versendet monatlich eine Übersicht. Die Abrechnung erfolgt transparent und kann über verschiedene Zahlungsmethoden abgewickelt werden."
  },
  {
    question: "Ist das Teilen von Accounts legal?",
    answer: "Ja, das Teilen von Family-Accounts ist von den meisten Diensten explizit erlaubt. Wir unterstützen nur legale Sharing-Optionen gemäß den AGB der jeweiligen Anbieter."
  },
  {
    question: "Was kostet Subby?",
    answer: "Subby ist in der Basis-Version kostenlos. Für erweiterte Funktionen wie automatische Abrechnung und unbegrenzte Gruppen bieten wir Premium-Features an."
  },
  {
    question: "Wie sicher sind meine Daten?",
    answer: "Sicherheit hat bei uns höchste Priorität. Wir verwenden modernste Verschlüsselungstechnologien und speichern keine sensiblen Zahlungsdaten."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Häufig gestellte Fragen
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Alles was du über Subby wissen musst
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="bg-white/5 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between text-left"
              >
                <span className="text-white font-medium">{faq.question}</span>
                {openIndex === index ? (
                  <Minus className="w-5 h-5 text-purple-400" />
                ) : (
                  <Plus className="w-5 h-5 text-purple-400" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6"
                  >
                    <p className="text-gray-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}; 