'use client';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from 'framer-motion';

const COLORS = ['#FF4B91', '#645CBB', '#A084DC', '#BFACE2'];

export function CostDistributionChart({ services }: { services: any[] }) {
  const data = services.map(service => ({
    name: service.name,
    value: parseFloat(service.price.replace(',', '.').replace('€', '')),
    color: service.color
  }));

  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Card className="bg-gray-800/20 backdrop-blur-lg border-gray-700/50">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-blue-300">Kostenverteilung</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]}
                    className="hover:opacity-80 transition-opacity cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip 
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-gray-800 border border-gray-700 rounded-lg p-3 shadow-xl">
                        <p className="text-gray-300 font-medium">{data.name}</p>
                        <p className="text-blue-300">
                          {data.value.toLocaleString('de-CH', { style: 'currency', currency: 'CHF' })}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {((data.value / total) * 100).toFixed(1)}% der Gesamtkosten
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                verticalAlign="bottom" 
                height={36}
                content={({ payload }) => (
                  <div className="flex flex-wrap justify-center gap-4 mt-4">
                    {payload?.map((entry: any, index: number) => (
                      <div key={`legend-${index}`} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-sm text-gray-300">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-gray-400 text-sm">Durchschnittliche Kosten</p>
            <p className="text-xl font-bold text-blue-300">
              {(total / data.length).toLocaleString('de-CH', { style: 'currency', currency: 'CHF' })}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400 text-sm">Gesamtkosten</p>
            <p className="text-xl font-bold text-blue-300">
              {total.toLocaleString('de-CH', { style: 'currency', currency: 'CHF' })}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 