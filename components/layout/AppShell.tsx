"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { Menu, X, Database } from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-full min-h-screen bg-nature-50/50 text-slate-800 font-sans">
      {/* Desktop Sidebar */}
      <div className="hidden md:flex md:flex-shrink-0 relative z-50">
        <Sidebar className="w-72 shadow-[4px_0_24px_rgba(0,0,0,0.02)] border-r border-nature-200/60 bg-white/80 backdrop-blur-xl" />
      </div>

      {/* Mobile Top Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-nature-200 z-50 flex items-center justify-between px-4 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="bg-nature-700 text-white p-1.5 rounded-md">
            <Database size={20} />
          </div>
          <h1 className="font-heading font-bold text-lg text-nature-900 leading-tight">
            Floodcasting<span className="text-nature-500">XAI</span>
          </h1>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-nature-50 rounded-md text-nature-700 hover:bg-nature-100 transition-colors"
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          <div 
            className="fixed inset-0 bg-nature-900/20 backdrop-blur-sm transition-opacity" 
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-2xl pt-16">
             <Sidebar className="w-full h-full" onMobileItemClick={() => setIsMobileMenuOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-x-hidden pt-16 md:pt-0 bg-nature-50/30 flex flex-col h-full relative">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/60 via-transparent to-transparent pointer-events-none" />
        <div className="flex-1 relative z-10 w-full overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
