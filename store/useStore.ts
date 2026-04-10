import { create } from 'zustand';

export type SeverityLevel = 'low' | 'medium' | 'high';
export type SourceType = 'sensor' | 'citizen';

export interface DataPoint {
  id: string;
  lat: number;
  lng: number;
  severity: SeverityLevel;
  source: SourceType;
  timestamp: string;
  waterLevel?: number; // en cm
  rainfall?: number; // en mm
  description?: string;
}

interface AppState {
  dataPoints: DataPoint[];
  filters: {
    showSensors: boolean;
    showCitizens: boolean;
    severity: SeverityLevel[];
  };
  addCitizenReport: (report: Omit<DataPoint, 'id' | 'timestamp' | 'source'>) => void;
  toggleFilter: (key: keyof AppState['filters']) => void;
  toggleSeverityFilter: (level: SeverityLevel) => void;
}

// Datos de Mburicaó y Asunción ficticios/simulados pero realistas para la demo
const initialData: DataPoint[] = [
  { id: 's1', lat: -25.2865, lng: -57.6366, severity: 'high', source: 'sensor', timestamp: new Date().toISOString(), waterLevel: 120, rainfall: 45 },
  { id: 's2', lat: -25.2921, lng: -57.6180, severity: 'medium', source: 'sensor', timestamp: new Date(Date.now() - 3600000).toISOString(), waterLevel: 65, rainfall: 20 },
  { id: 's3', lat: -25.2750, lng: -57.5900, severity: 'low', source: 'sensor', timestamp: new Date(Date.now() - 7200000).toISOString(), waterLevel: 15, rainfall: 5 },
  { id: 'c1', lat: -25.2890, lng: -57.6250, severity: 'high', source: 'citizen', timestamp: new Date(Date.now() - 1800000).toISOString(), description: 'El agua entra a las casas' },
  { id: 'c2', lat: -25.3000, lng: -57.6000, severity: 'medium', source: 'citizen', timestamp: new Date(Date.now() - 5400000).toISOString(), description: 'Calles inundadas, tránsito parado' },
];

export const useStore = create<AppState>((set) => ({
  dataPoints: initialData,
  filters: {
    showSensors: true,
    showCitizens: true,
    severity: ['low', 'medium', 'high'],
  },
  addCitizenReport: (report) => set((state) => ({
    dataPoints: [
      ...state.dataPoints,
      {
        ...report,
        id: `c${Date.now()}`,
        source: 'citizen',
        timestamp: new Date().toISOString(),
      }
    ]
  })),
  toggleFilter: (key) => set((state) => ({
    filters: {
      ...state.filters,
      [key]: !state.filters[key as keyof AppState['filters']]
    }
  })),
  toggleSeverityFilter: (level) => set((state) => {
    const current = state.filters.severity;
    const isSelected = current.includes(level);
    return {
      filters: {
        ...state.filters,
        severity: isSelected 
          ? current.filter(l => l !== level)
          : [...current, level]
      }
    };
  }),
}));
