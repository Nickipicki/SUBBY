'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Beispieldaten für die letzten 12 Monate
const generateYearlyData = (services: any[]) => {
  const months = [
    'Jan', 'Feb', 'März', 'Apr', 'Mai', 'Jun',
    'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'
  ];
  
  return months.map((month, index) => {
    const baseTotal = services.reduce((sum, service) => {
      return sum + parseFloat(service.price.replace(',', '.').replace('€', ''));
    }, 0);

    // Simuliere leichte Schwankungen in den Kosten
    const variation = Math.random() * 10 - 5; // ±5€ Variation
    const total = baseTotal + variation;

    return {
      name: month,
      Kosten: total.toFixed(2),
      Abos: services.length + (Math.random() > 0.8 ? 1 : 0) // Manchmal ein Abo mehr
    };
  });
};

export function YearlyTimeline({ services }: { services: any[] }) {
  const data = generateYearlyData(services);

  return (
    <Card className="bg-gray-800/20 backdrop-blur-lg border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-300">Jahresübersicht</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis 
                dataKey="name" 
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
              />
              <YAxis 
                yAxisId="left"
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                label={{ 
                  value: 'Kosten (€)', 
                  angle: -90, 
                  position: 'insideLeft',
                  fill: '#9CA3AF'
                }}
              />
              <YAxis 
                yAxisId="right"
                orientation="right"
                stroke="#9CA3AF"
                tick={{ fill: '#9CA3AF' }}
                label={{ 
                  value: 'Anzahl Abos', 
                  angle: 90, 
                  position: 'insideRight',
                  fill: '#9CA3AF'
                }}
              />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
                        <p className="text-gray-300 font-medium">{label}</p>
                        <p className="text-blue-300">
                          {parseFloat(payload[0].value as string).toLocaleString('de-CH', { 
                            style: 'currency', 
                            currency: 'CHF' 
                          })}
                        </p>
                        <p className="text-purple-300">
                          {payload[1].value} Abonnements
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                yAxisId="left"
                type="monotone"
                dataKey="Kosten"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={{ fill: '#60A5FA', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Abos"
                stroke="#C084FC"
                strokeWidth={2}
                dot={{ fill: '#C084FC', strokeWidth: 2 }}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-gray-400 text-sm">Durchschnittliche Kosten</p>
            <p className="text-xl font-bold text-blue-300">
              {(data.reduce((sum, item) => sum + parseFloat(item.Kosten), 0) / data.length)
                .toLocaleString('de-CH', { style: 'currency', currency: 'CHF' })}
            </p>
          </div>
          <div className="text-center p-4 bg-gray-800/30 rounded-lg border border-gray-700/50">
            <p className="text-gray-400 text-sm">Durchschnittliche Abos</p>
            <p className="text-xl font-bold text-purple-300">
              {(data.reduce((sum, item) => sum + item.Abos, 0) / data.length).toFixed(1)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 