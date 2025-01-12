'use client';

import { Area, AreaChart, ResponsiveContainer } from 'recharts';
import { Card } from "@/components/ui/card";

interface MonthlyMiniGraphProps {
  services: Array<{
    price: string;
  }>;
}

export function MonthlyMiniGraph({ services }: MonthlyMiniGraphProps) {
  // Generate last 6 months of data
  const generateMonthlyData = () => {
    const baseTotal = services.reduce((sum, service) => {
      return sum + parseFloat(service.price.replace(',', '.').replace('€', ''));
    }, 0);

    return Array.from({ length: 6 }, (_, i) => {
      // Add slight variations to make the graph more interesting
      const variation = Math.random() * 5 - 2.5; // ±2.5€ variation
      return {
        value: baseTotal + variation
      };
    });
  };

  const data = generateMonthlyData();

  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="miniGraphGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#60A5FA" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#60A5FA" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="value"
            stroke="#60A5FA"
            strokeWidth={2}
            fill="url(#miniGraphGradient)"
            isAnimationActive={true}
            animationDuration={1000}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
} 