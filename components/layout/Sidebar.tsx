"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Map, FilePlus, Database, Layers, CheckCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Inicio", href: "/", icon: Home },
  { name: "Dashboard", href: "/dashboard", icon: Map },
  { name: "Reportar Evento", href: "/reportar", icon: FilePlus },
  { name: "Validación", href: "/validacion", icon: CheckCircle },
  { name: "Arquitectura", href: "/metodologia", icon: Layers },
];

export default function Sidebar({ className, onMobileItemClick }: { className?: string; onMobileItemClick?: () => void }) {
  const pathname = usePathname();

  return (
    <aside className={cn("bg-white flex flex-col h-full z-50", className)}>
      <div className="p-6 border-b border-sand-100 flex items-center gap-3">
        <div className="bg-sand-700 text-white p-2 rounded-lg">
          <Database size={24} />
        </div>
        <h1 className="font-heading font-bold text-lg text-sand-900 leading-tight">
          Floodcasting<span className="text-sand-500">XAI</span>
        </h1>
      </div>
      
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="px-4 text-xs font-semibold text-sand-400 uppercase tracking-wider mb-2 mt-4">
          Menú Principal
        </p>
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              onClick={onMobileItemClick}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sand-100 text-sand-900"
                  : "text-sand-600 hover:bg-sand-50 hover:text-sand-800"
              )}
            >
              <item.icon size={18} className={cn(isActive ? "text-sand-700" : "text-sand-400")} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-sand-200">
        <div className="bg-sand-50 rounded-lg p-4">
          <p className="text-xs text-sand-600 mb-1">Estado del Sistema</p>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-warn-green opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-warn-green"></span>
            </span>
            <span className="text-sm font-medium text-sand-900">En línea</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
