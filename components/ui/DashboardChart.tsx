"use client";

import dynamic from 'next/dynamic';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export const DynamicChart = dynamic(() => Promise.resolve(({ data }: { data: any[] }) => (
  <ResponsiveContainer width="100%" height={128}>
    <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
      <defs>
        <linearGradient id="colorWaterDashboard" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
        </linearGradient>
      </defs>
      <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
      <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fill: '#64748b'}} />
      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
      <Tooltip contentStyle={{ borderRadius: '8px', fontSize: '12px' }} />
      <Area type="monotone" name="Nivel Promedio (cm)" dataKey="level" stroke="#3b82f6" fillOpacity={1} fill="url(#colorWaterDashboard)" />
    </AreaChart>
  </ResponsiveContainer>
)), { ssr: false, loading: () => <div className="h-full w-full animate-pulse bg-nature-100 rounded-lg"></div> });
