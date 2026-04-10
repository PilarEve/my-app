"use client";

import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useStore } from '@/store/useStore';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icons missing in leaflet/webpack setups
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons
const createCustomIcon = (color: string, isCitizen: boolean) => {
  const bgColor = color === 'high' ? 'bg-warn-red' 
                : color === 'medium' ? 'bg-warn-yellow' 
                : 'bg-warn-green';
  const shape = isCitizen ? 'rounded-full' : 'rounded-md';
  const html = `<div class="w-4 h-4 shadow-md border-2 border-white ${bgColor} ${shape}"></div>`;
  
  return L.divIcon({
    html,
    className: 'custom-leaflet-icon',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });
};

export default function MapComponent() {
  const { dataPoints, filters } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="w-full h-full bg-sand-100 animate-pulse rounded-xl" />;

  const filteredData = dataPoints.filter((dp) => {
    if (dp.source === 'sensor' && !filters.showSensors) return false;
    if (dp.source === 'citizen' && !filters.showCitizens) return false;
    if (!filters.severity.includes(dp.severity)) return false;
    return true;
  });

  return (
    <MapContainer 
      center={[-25.2865, -57.6366]} 
      zoom={13} 
      className="w-full h-full rounded-xl z-0"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
      />
      {filteredData.map((dp) => (
        <Marker 
          key={dp.id} 
          position={[dp.lat, dp.lng]} 
          icon={createCustomIcon(dp.severity, dp.source === 'citizen')}
        >
          <Popup className="rounded-xl">
            <div className="p-1">
              <h4 className="font-bold text-sand-900 mb-2 capitalize text-sm border-b pb-1">
                {dp.source === 'sensor' ? 'Sensor IoT' : 'Reporte Ciudadano'}
              </h4>
              <div className="space-y-1 text-xs text-sand-700">
                <p><span className="font-semibold">Severidad:</span> {
                  dp.severity === 'high' ? 'Alta (Rojo)' 
                  : dp.severity === 'medium' ? 'Media (Amarillo)' 
                  : 'Baja (Verde)'
                }</p>
                {dp.waterLevel !== undefined && (
                  <p><span className="font-semibold">Nivel de Agua:</span> {dp.waterLevel} cm</p>
                )}
                {dp.rainfall !== undefined && (
                  <p><span className="font-semibold">Precipitación:</span> {dp.rainfall} mm</p>
                )}
                {dp.description && (
                  <p className="italic bg-sand-50 p-2 rounded mt-2 border border-sand-100">"{dp.description}"</p>
                )}
                <p className="text-gray-400 mt-2 text-[10px]">
                  {format(new Date(dp.timestamp), "dd/MM/yyyy HH:mm", { locale: es })}
                </p>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
