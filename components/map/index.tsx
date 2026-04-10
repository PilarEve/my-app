"use client";

import dynamic from 'next/dynamic';

export const DynamicMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-nature-100 animate-pulse rounded-xl flex items-center justify-center text-nature-500 text-sm">Cargando mapa...</div>
});
