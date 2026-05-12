import type { Metadata } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Nav from "@/components/Nav";
import ScrollGuide from "@/components/ScrollGuide";
import { I18nProvider } from "@/context/I18nContext";

export const metadata: Metadata = {
  title: "Gustavo Soares // Arquitetura Estratégica",
  description: "Portfólio 2026 - Gestor de T.I. & Engenheiro de IA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="antialiased" suppressHydrationWarning>
      <body className="bg-[#000814] text-white font-jakarta">
        <I18nProvider>
          <SmoothScroll>
            <Nav />
            <ScrollGuide />
            {children}
          </SmoothScroll>
        </I18nProvider>
      </body>
    </html>
  );
}