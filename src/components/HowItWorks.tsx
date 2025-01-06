import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Step } from './Step';
import { StepIndicator } from './StepIndicator';

const steps = [
  {
    number: '01',
    title: 'Abos hinzufügen',
    description: 'Füge deine bestehenden Abonnements hinzu und behalte den Überblick über alle Kosten.',
    icon: '📱'
  },
  {
    number: '02',
    title: 'Familie einladen',
    description: 'Lade Familienmitglieder oder Freunde ein und teile die Kosten fair auf.',
    icon: '👥'
  },
  {
    number: '03',
    title: 'Kosten sparen',
    description: 'Optimiere deine Ausgaben und spare durch gemeinsame Familien-Abos.',
    icon: '💰'
  }
];

export const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="relative py-32">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            So funktioniert's
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Verwalte deine Abonnements in drei einfachen Schritten
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 relative">
          <AnimatePresence mode="wait">
            {steps.map((step, index) => (
              <Step
                key={step.number}
                {...step}
                isActive={index === activeStep}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="mt-12 flex flex-col items-center gap-6">
          <div className="flex items-center gap-4">
            {steps.map((_, index) => (
              <StepIndicator
                key={index}
                index={index}
                isActive={index === activeStep}
                onClick={() => setActiveStep(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}; 