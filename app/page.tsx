import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Activity, Users, Map as MapIcon, ArrowRight } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-full flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full bg-sand-100/50 py-24 px-6 border-b border-sand-200">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-heading font-extrabold text-sand-900 tracking-tight">
            Sistema Integrado de Monitoreo <br /> de Inundaciones Urbanas
          </h1>
          <p className="text-xl text-sand-700 max-w-2xl mx-auto font-light leading-relaxed">
            Un sistema en tiempo real que integra sensores IoT y ciencia ciudadana para mitigar el impacto de las inundaciones en el Área Metropolitana de Asunción.
          </p>
          <div className="pt-8">
            <Link href="/dashboard">
              <Button className="h-14 px-8 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                Ver mapa en tiempo real
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section className="w-full max-w-6xl mx-auto py-20 px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-heading font-bold text-sand-900">El Problema</h2>
            <p className="text-sand-700 leading-relaxed">
              Asunción se enfrenta a inundaciones urbanas recurrentes debido a la falta de infraestructura pluvial y precipitaciones extremas. Con más de 80 puntos críticos identificados, la falta de información en tiempo real dificulta la toma de decisiones oportunas para los ciudadanos y autoridades.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-sand-200 space-y-8">
            <h3 className="font-heading font-bold text-xl text-sand-900 mb-6">¿Cómo funciona el sistema?</h3>
            <div className="flex gap-4 items-start">
              <div className="bg-sand-100 p-3 rounded-xl text-sand-700"><Activity size={24} /></div>
              <div>
                <h4 className="font-semibold text-sand-900">1. Sensores IoT</h4>
                <p className="text-sm text-sand-600 mt-1">Nodos distribuidos que capturan nivel de agua y precipitación de forma continua.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-sand-100 p-3 rounded-xl text-sand-700"><Users size={24} /></div>
              <div>
                <h4 className="font-semibold text-sand-900">2. Ciencia Ciudadana</h4>
                <p className="text-sm text-sand-600 mt-1">Reportes en tiempo real enviados por los habitantes que amplían la cobertura espacial donde no hay sensores.</p>
              </div>
            </div>
            <div className="flex gap-4 items-start">
              <div className="bg-sand-100 p-3 rounded-xl text-sand-700"><MapIcon size={24} /></div>
              <div>
                <h4 className="font-semibold text-sand-900">3. Plataforma Web</h4>
                <p className="text-sm text-sand-600 mt-1">Dashboard interactivo que integra y visualiza datos para facilitar el monitoreo.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="w-full bg-sand-800 text-sand-50 py-20 px-6 mt-auto">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <h2 className="text-2xl font-heading font-bold">Impacto Esperado</h2>
          <p className="text-sand-200">Mejora en la toma de decisiones, monitoreo urbano en tiempo real y aumento de la participación ciudadana en la gestión del riesgo.</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-8 text-center text-sm text-sand-500 border-t border-sand-200 bg-white">
        <p>Proyecto FloodcastingXAI - Universidad Tecnológica / Facultad de Ingeniería</p>
        <p className="mt-1">Diseñado para Asunción, Paraguay &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
}
