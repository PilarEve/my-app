import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/layout/AppShell";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FloodcastingXAI | Monitoreo de Inundaciones",
  description: "Sistema Integrado de Monitoreo de Inundaciones Urbanas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${inter.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className={`${inter.variable} ${outfit.variable} h-full antialiased bg-nature-50`}>
        <AppShell>
          {children}
        </AppShell>
      </body>
    </html>
  );
}
