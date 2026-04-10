"use client";

import dynamic from 'next/dynamic';

export const DynamicMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-sand-100 animate-pulse rounded-xl flex items-center justify-center text-sand-500 text-sm">Cargando mapa...</div>
});
