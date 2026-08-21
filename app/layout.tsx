import type { Metadata } from "next";
import "./globals.css";

// A tipografia definitiva (pares de fonte, escala) entra na etapa 10, junto
// com o design da landing page. Por enquanto usamos a stack de sistema para
// não depender de uma fonte externa nesta fase de setup.

export const metadata: Metadata = {
  title: "EVOLUI",
  description: "Registre e acompanhe sua evolução física e esportiva.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans">{children}</body>
    </html>
  );
}
