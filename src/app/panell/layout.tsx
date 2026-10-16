import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "../globals.css";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Panell de gestió — Mª del Mar",
  robots: { index: false, follow: false },
};

export default function PanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ca" className={`${onest.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
