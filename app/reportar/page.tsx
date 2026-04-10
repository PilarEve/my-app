"use client";

import { useState } from "react";
import { useStore, SeverityLevel } from "@/store/useStore";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { MapPin, Info, CheckCircle2 } from "lucide-react";

export default function ReportPage() {
  const { addCitizenReport } = useStore();
  const [submitted, setSubmitted] = useState(false);
  
  const [severity, setSeverity] = useState<SeverityLevel>('low');
  const [description, setDescription] = useState('');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulando coordenadas aleatorias cerca del centro para el reporte (+- 0.05 grados)
    const lat = -25.2865 + (Math.random() - 0.5) * 0.05;
    const lng = -57.6366 + (Math.random() - 0.5) * 0.05;

    addCitizenReport({
      lat,
      lng,
      severity,
      description
    });
    
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setDescription('');
      setSeverity('low');
    }, 4000);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 md:p-12 space-y-8">
      <div>
        <h2 className="text-3xl font-heading font-bold text-sand-900">Reportar Evento</h2>
        <p className="text-sand-600 mt-2">La participación ciudadana es crucial para identificar zonas de riesgo donde no existen sensores instalados. Su reporte se integrará en tiempo real al mapa.</p>
      </div>

      {submitted ? (
        <Card className="bg-warn-green/10 border-warn-green/20">
          <CardContent className="flex flex-col items-center justify-center p-12 text-center text-green-700">
            <CheckCircle2 size={48} className="mb-4" />
            <h3 className="text-xl font-bold mb-2">¡Reporte Enviado con Éxito!</h3>
            <p>Gracias por contribuir al sistema de alerta temprana de Asunción.</p>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>Formulario de Reporte Ciudadano</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="space-y-3">
                <label className="block text-sm font-semibold text-sand-800">Ubicación</label>
                <div className="bg-sand-50 border border-sand-200 rounded-lg p-4 flex items-center gap-3 text-sm text-sand-600 cursor-not-allowed">
                  <MapPin className="text-sand-400" />
                  Usando ubicación actual del dispositivo (GPS)
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-sand-800">Nivel de Inundación</label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {(['low', 'medium', 'high'] as SeverityLevel[]).map(level => {
                    const active = severity === level;
                    const labels = { low: 'Bajo', medium: 'Medio', high: 'Alto' };
                    const colors = {
                      low: 'border-warn-green text-warn-green bg-warn-green/10',
                      medium: 'border-warn-yellow text-warn-yellow bg-warn-yellow/10',
                      high: 'border-warn-red text-warn-red bg-warn-red/10'
                    };
                    const inactiveClass = 'border-sand-200 text-sand-600 bg-white hover:bg-sand-50';

                    return (
                      <button
                        key={level}
                        type="button"
                        onClick={() => setSeverity(level)}
                        className={`p-4 rounded-xl border-2 transition-all font-medium flex flex-col items-center gap-2 ${active ? colors[level] : inactiveClass}`}
                      >
                        <div className={`w-4 h-4 rounded-full ${active ? colors[level].split(' ')[0].replace('border', 'bg') : 'bg-sand-200'}`} />
                        {labels[level]}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-3">
                <label className="block text-sm font-semibold text-sand-800">
                  Descripción / Observaciones (Opcional)
                </label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Ej. El agua está tapando el cordón de la vereda..."
                  rows={4}
                  className="w-full rounded-lg border border-sand-200 bg-white px-4 py-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-sand-400"
                />
              </div>

              <div className="pt-4 flex items-center justify-between border-t border-sand-100">
                <div className="text-xs text-sand-500 flex items-center gap-1">
                  <Info size={14} /> Los reportes son anónimos.
                </div>
                <Button type="submit" className="px-8">
                  Enviar Reporte
                </Button>
              </div>

            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
