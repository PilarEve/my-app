"use client";

import { DynamicMap } from "@/components/map";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { useStore, SeverityLevel } from "@/store/useStore";
import { Check, Activity, Users, BarChart3, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { DynamicChart } from "@/components/ui/DashboardChart";

export default function DashboardPage() {
  const { dataPoints, filters, toggleFilter, toggleSeverityFilter } = useStore();

  const totalEvents = dataPoints.length;
  const highRisk = dataPoints.filter(dp => dp.severity === 'high').length;
  
  // Real-time chart data simulation based on current events count
  const chartData = [
    { time: '10:00', level: 15 },
    { time: '11:00', level: 20 },
    { time: '12:00', level: 45 },
    { time: '13:00', level: 80 },
    { time: '14:00', level: 110 },
    { time: '15:00', level: 125 },
    { time: '16:00', level: 115 },
  ];
  
  const FilterButton = ({ label, active, onClick, colorClass }: { label: string, active: boolean, onClick: () => void, colorClass?: string }) => (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all border",
        active ? "bg-white shadow-sm border-sand-300 text-sand-900" : "bg-transparent border-transparent text-sand-500 hover:bg-sand-100"
      )}
    >
      <div className={cn("w-3 h-3 rounded-full flex items-center justify-center", active ? (colorClass || "bg-sand-700") : "bg-sand-200")}>
        {active && <Check size={8} className="text-white" />}
      </div>
      {label}
    </button>
  );

  return (
    <div className="h-full flex flex-col">
      {/* Header Panel */}
      <div className="bg-white border-b border-sand-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-heading font-bold text-sand-900">Dashboard de Monitoreo</h2>
          <p className="text-sm text-sand-600">Visualización en tiempo real del nivel de agua y reportes ciudadanos.</p>
        </div>
        
        {/* Key metrics */}
        <div className="flex gap-4">
          <div className="bg-sand-50 px-4 py-2 rounded-lg border border-sand-100 flex items-center gap-3">
            <div className="bg-white p-1.5 rounded shadow-sm text-sand-700"><Activity size={18} /></div>
            <div>
              <p className="text-xs text-sand-500 font-medium">Eventos</p>
              <p className="font-bold text-sand-900 leading-none">{totalEvents}</p>
            </div>
          </div>
          <div className="bg-warn-red/10 px-4 py-2 rounded-lg border border-warn-red/20 flex items-center gap-3">
            <div className="bg-white p-1.5 rounded shadow-sm text-warn-red"><BarChart3 size={18} /></div>
            <div>
              <p className="text-xs text-warn-red font-medium">Alta Severidad</p>
              <p className="font-bold text-warn-red leading-none">{highRisk}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row p-6 gap-6 overflow-hidden">
        {/* Sidebar Controls & Stats */}
        <div className="w-full lg:w-80 flex flex-col gap-6 overflow-y-auto pr-2">
          {/* Filters */}
          <Card>
            <CardHeader>
              <CardTitle>Filtros de Mapa</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <p className="text-xs font-semibold text-sand-500 uppercase">Fuentes de Datos</p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton label="Sensores IoT" active={filters.showSensors} onClick={() => toggleFilter('showSensors')} colorClass="bg-blue-500" />
                  <FilterButton label="Reportes Ciudadanos" active={filters.showCitizens} onClick={() => toggleFilter('showCitizens')} colorClass="bg-purple-500" />
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-xs font-semibold text-sand-500 uppercase">Nivel de Riesgo</p>
                <div className="flex flex-wrap gap-2">
                  <FilterButton label="Alto" active={filters.severity.includes('high')} onClick={() => toggleSeverityFilter('high')} colorClass="bg-warn-red" />
                  <FilterButton label="Medio" active={filters.severity.includes('medium')} onClick={() => toggleSeverityFilter('medium')} colorClass="bg-warn-yellow" />
                  <FilterButton label="Bajo" active={filters.severity.includes('low')} onClick={() => toggleSeverityFilter('low')} colorClass="bg-warn-green" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* List preview combined with Graph */}
          <Card className="flex-1 min-h-0 flex flex-col">
            <CardHeader className="pb-2">
              <div className="flex items-center gap-2">
                <TrendingUp size={18} className="text-sand-600" />
                <CardTitle>Tendencia Nivel (cm)</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="h-32 min-h-[128px] w-full pb-0 mb-4 border-b border-sand-100">
              <DynamicChart data={chartData} />
            </CardContent>
            <CardHeader className="pt-0 pb-2">
              <CardTitle>Últimos Eventos</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto space-y-3 pb-6">
              {dataPoints.slice().reverse().map(dp => (
                <div key={dp.id} className="p-3 bg-sand-50 rounded-lg border border-sand-100 flex gap-3 text-sm">
                  <div className={cn(
                    "w-2 h-auto rounded-full shrink-0",
                    dp.severity === 'high' ? 'bg-warn-red' : 
                    dp.severity === 'medium' ? 'bg-warn-yellow' : 'bg-warn-green'
                  )} />
                  <div className="flex-1">
                    <p className="font-semibold text-sand-900 capitalize flex items-center gap-1">
                      {dp.source === 'sensor' ? <Activity size={14} className="text-sand-500"/> : <Users size={14} className="text-sand-500"/>}
                      {dp.source}
                    </p>
                    {dp.description && <p className="text-sand-600 text-xs mt-1 line-clamp-2">{dp.description}</p>}
                    <p className="text-[10px] text-sand-400 mt-2">{new Date(dp.timestamp).toLocaleTimeString()}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Map Container */}
        <div className="flex-1 bg-white rounded-xl shadow-sm border border-sand-200 overflow-hidden relative">
          <DynamicMap />
          
          {/* Map Legend Overlay */}
          <div className="absolute bottom-6 right-6 z-[1000] bg-white/90 backdrop-blur p-4 rounded-lg shadow-lg border border-sand-100 text-xs text-sand-700">
            <p className="font-semibold text-sand-900 mb-2">Leyenda</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-warn-red rounded-sm border border-black/10"></div> Riesgo Alto</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-warn-yellow rounded-sm border border-black/10"></div> Riesgo Medio</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 bg-warn-green rounded-sm border border-black/10"></div> Riesgo Bajo</div>
              <div className="h-px bg-sand-200 my-2"></div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-sand-500 rounded-sm"></div> Sensor IoT</div>
              <div className="flex items-center gap-2"><div className="w-3 h-3 border-2 border-sand-500 rounded-full"></div> Ciudadano</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
