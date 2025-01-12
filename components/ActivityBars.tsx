'use client';

import { BarChart, Bar, ResponsiveContainer } from 'recharts';

export function ActivityBars() {
  // Simulierte Aktivitätsdaten für die letzte Woche
  const data = Array.from({ length: 7 }, () => ({
    value: Math.floor(Math.random() * 60 + 40) // Werte zwischen 40-100
  }));

  return (
    <div className="relative h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Bar
            dataKey="value"
            fill="#F87171"
            radius={[2, 2, 0, 0]}
            maxBarSize={6}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
} 