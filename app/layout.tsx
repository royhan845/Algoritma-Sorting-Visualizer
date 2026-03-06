import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Algo-Visualizer 3D",
  description: "Visualisasi Algoritma Interaktif bergaya Retro Neo-Brutalism.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body 
        className="antialiased font-mono text-[#0f172a]"
        style={{
          backgroundColor: "#e2e8f0",
          backgroundImage: "linear-gradient(rgba(148, 163, 184, 0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.25) 1px, transparent 1px)",
          backgroundSize: "24px 24px"
        }}
      >
        {children}
      </body>
    </html>
  );
}