'use client';

import { motion } from 'framer-motion';

interface PaymentCountdownProps {
  nextPaymentDate: Date;
}

export function PaymentCountdown({ nextPaymentDate }: PaymentCountdownProps) {
  const getDaysUntilPayment = () => {
    try {
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const paymentDate = new Date(nextPaymentDate);
      paymentDate.setHours(0, 0, 0, 0);
      
      if (isNaN(paymentDate.getTime())) {
        return 0;
      }
      
      const diffTime = paymentDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return Math.max(0, diffDays);
    } catch (error) {
      console.error('Error calculating days until payment:', error);
      return 0;
    }
  };

  const daysLeft = getDaysUntilPayment();
  const percentage = Math.min(100, Math.max(0, (daysLeft / 30) * 100));

  // Berechne die Segmente für den Fortschrittsbalken
  const segments = 12;
  const activeSegments = Math.ceil((percentage / 100) * segments);

  const formatDate = (date: Date) => {
    try {
      if (isNaN(date.getTime())) {
        return '---';
      }
      return date.toLocaleDateString('de-DE', { 
        day: '2-digit',
        month: 'short'
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '---';
    }
  };

  return (
    <div className="relative h-full w-full flex flex-col justify-center">
      {/* Fortschrittsbalken */}
      <div className="flex gap-1 mb-2">
        {Array.from({ length: segments }).map((_, i) => (
          <motion.div
            key={i}
            className={`h-1 rounded-full flex-1 ${
              i < activeSegments ? 'bg-purple-500' : 'bg-gray-700/30'
            }`}
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            transition={{
              delay: i * 0.05,
              duration: 0.2,
              ease: "easeOut"
            }}
          />
        ))}
      </div>
      
      {/* Tage-Anzeige */}
      <div className="flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center gap-1"
        >
          <span className="text-xs font-medium text-purple-300">
            {daysLeft}
          </span>
          <span className="text-[10px] text-gray-400">
            Tage
          </span>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
          className="text-[10px] text-gray-400"
        >
          {formatDate(nextPaymentDate)}
        </motion.div>
      </div>
    </div>
  );
} 