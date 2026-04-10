"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Server, Database, MonitorPlay, Wifi, ArrowRight } from "lucide-react";

export default function MethodologyPage() {
  return (
    <div className="p-6 md:p-12 space-y-12 max-w-5xl mx-auto">
      <div>
        <h2 className="text-3xl font-heading font-bold text-sand-900">Arquitectura del Sistema</h2>
        <p className="text-sand-600 mt-2 text-lg">
          FloodcastingXAI combina recolección de datos físicos e interacciones ciudadanas en una única plataforma web escalable, brindando inteligencia en tiempo real.
        </p>
      </div>

      <Card className="bg-sand-50 overflow-hidden border-sand-200">
        <CardContent className="p-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-4 md:w-1/4">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-sand-200 flex items-center justify-center text-sand-600">
                <Wifi size={32} />
              </div>
              <div>
                <h4 className="font-bold text-sand-900">Adquisición</h4>
                <p className="text-xs text-sand-600 mt-1">Sensores IoT (ESP32) + Reportes de la Ciudadanía (Web)</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block text-sand-300" size={32} />

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-4 md:w-1/4">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-sand-200 flex items-center justify-center text-sand-600">
                <Server size={32} />
              </div>
              <div>
                <h4 className="font-bold text-sand-900">Backend / API</h4>
                <p className="text-xs text-sand-600 mt-1">Next.js API Routes, validación y sanitización</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block text-sand-300" size={32} />

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-4 md:w-1/4">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-sm border border-sand-200 flex items-center justify-center text-sand-600">
                <Database size={32} />
              </div>
              <div>
                <h4 className="font-bold text-sand-900">Base de Datos</h4>
                <p className="text-xs text-sand-600 mt-1">Almacenamiento Geoespacial PostGIS (Simulado via Store)</p>
              </div>
            </div>

            <ArrowRight className="hidden md:block text-sand-300" size={32} />

            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-4 md:w-1/4">
              <div className="w-20 h-20 bg-sand-700 rounded-2xl shadow-lg border border-sand-800 flex items-center justify-center text-white">
                <MonitorPlay size={32} />
              </div>
              <div>
                <h4 className="font-bold text-sand-900">Dashboard UI</h4>
                <p className="text-xs text-sand-600 mt-1">Dashboard Interactivo Leaflet + React</p>
              </div>
            </div>
            
          </div>
        </CardContent>
      </Card>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h3 className="text-xl font-heading font-bold text-sand-900 border-b border-sand-200 pb-2">Tecnologías Base</h3>
          <ul className="space-y-4 text-sm text-sand-700">
            <li>
              <strong className="text-sand-900 block mb-1">Frontend (Next.js 15)</strong>
              Utilizamos el App Router para manejar vistas de forma estructurada, usando componentes React y TailwindCSS v4 para asegurar un diseño responsivo y cálido.
            </li>
            <li>
              <strong className="text-sand-900 block mb-1">Mapas e Interacción Geospacial (Leaflet)</strong>
              Integración de mapas open source que no dependen de licencias comerciales estrictas, permitiendo control preciso de capas (marcadores, zonas de riesgo).
            </li>
            <li>
              <strong className="text-sand-900 block mb-1">Estado Global (Zustand)</strong>
              Manejo asíncrono y en tiempo real del estado de los reportes. Su diseño liviano permite sincronizar el ingreso de datos entre el formulario y el mapa.
            </li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <h3 className="text-xl font-heading font-bold text-sand-900 border-b border-sand-200 pb-2">Enfoque</h3>
          <p className="text-sm text-sand-700 leading-relaxed">
            El proyecto no incorpora modelos predictivos de Inteligencia Artificial (IA) avanzados. A pesar del nombre conceptual, el foco primario se encuentra en:
          </p>
          <ul className="list-disc pl-5 mt-2 space-y-2 text-sm text-sand-700 leading-relaxed">
            <li>Robustez en el <strong>monitoreo visual e interactivo</strong> de la cuenca.</li>
            <li><strong>Interfaz intuitiva</strong> orientada a ciudadanos sin conocimiento técnico.</li>
            <li>Integración efectiva de la <strong>ciencia ciudadana</strong>, asumiendo que los ciudadanos suplen las carencias espaciales de los sensores físicos.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
