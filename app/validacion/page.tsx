"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from 'recharts';
import { CheckCircle2 } from "lucide-react";

// Datos ficticios para el gráfico simulando el arroyo mburicaó
const seriesData = [
  { time: '08:00', waterLevel: 25, rain: 0 },
  { time: '08:30', waterLevel: 30, rain: 5 },
  { time: '09:00', waterLevel: 55, rain: 25 },
  { time: '09:30', waterLevel: 90, rain: 45 },
  { time: '10:00', waterLevel: 140, rain: 35 },
  { time: '10:30', waterLevel: 160, rain: 15 },
  { time: '11:00', waterLevel: 150, rain: 5 },
  { time: '11:30', waterLevel: 120, rain: 0 },
];

const compareData = [
  { name: 'Sensores Físicos', cobertures: 14 },
  { name: 'Reportes Ciudadanos', cobertures: 42 }
];

export default function ValidationPage() {
  return (
    <div className="p-6 md:p-12 space-y-12 max-w-6xl mx-auto">
      <div>
        <h2 className="text-3xl font-heading font-bold text-nature-900">Validación y Casos de Estudio</h2>
        <p className="text-nature-600 mt-2 text-lg">
          Análisis del comportamiento del sistema durante eventos críticos en la Cuenca del Arroyo Mburicaó.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Gráfico 1 */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Nivel de Agua vs. Precipitación</CardTitle>
            <p className="text-xs text-nature-500">Evento de lluvia extrema - Mburicaó (Caso de prueba)</p>
          </CardHeader>
          <CardContent className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={seriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#c08b61" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#c08b61" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#965a41', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#965a41', fontSize: 12}} />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eae1cc" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #eae1cc' }}
                />
                <Area type="monotone" name="Nivel (cm)" dataKey="waterLevel" stroke="#965a41" fillOpacity={1} fill="url(#colorWater)" />
                <Area type="monotone" name="Lluvia (mm)" dataKey="rain" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Gráfico 2 */}
        <Card className="flex flex-col">
          <CardHeader>
            <CardTitle>Aporte de Datos por Fuente</CardTitle>
            <p className="text-xs text-nature-500">Comparativa de densidad de reportes en zona crítica</p>
          </CardHeader>
          <CardContent className="flex-1 min-h-[350px]">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={compareData} layout="vertical" margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#eae1cc" />
                <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#965a41', fontSize: 12}} />
                <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#965a41', fontSize: 12}} width={120} />
                <Tooltip cursor={{fill: '#f6f2e9'}} />
                <Bar dataKey="cobertures" name="Puntos de Dato" fill="#7c4a39" radius={[0, 4, 4, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

      </div>

      <Card className="bg-nature-800 text-white border-transparent">
        <CardContent className="p-8 space-y-4">
          <h3 className="font-heading font-bold text-xl mb-4">Resultados de Validación Piloto</h3>
          <ul className="space-y-3 text-nature-200">
            <li className="flex gap-2 items-start text-sm">
              <CheckCircle2 size={18} className="text-warn-green shrink-0 mt-0.5" />
              <span>El umbral amarillo o rojo en los marcadores concuerda fuertemente con los reportes de calles intransitables.</span>
            </li>
            <li className="flex gap-2 items-start text-sm">
              <CheckCircle2 size={18} className="text-warn-green shrink-0 mt-0.5" />
              <span>La ciencia ciudadana aumenta la cobertura en un 300% frente a la dependencia exclusiva de infraestructura física por su costo.</span>
            </li>
            <li className="flex gap-2 items-start text-sm">
              <CheckCircle2 size={18} className="text-warn-green shrink-0 mt-0.5" />
              <span>El sistema minimiza los tiempos de latencia desde que un evento extremo empieza hasta que es visible en el mapa.</span>
            </li>
          </ul>
        </CardContent>
      </Card>
      
    </div>
  );
}
