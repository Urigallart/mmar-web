import type { Metadata } from "next";
import { Onest } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mmarcocaching.vercel.app"),
  title: {
    default: "Mª del Mar — Psicopedagoga i Coach",
    template: "%s — Mª del Mar",
  },
  description:
    "Facilitadora de la teva pròpia evolució. Coaching i consultes puntuals per a joves i adults, i intervenció psicopedagògica per a infants i adolescents, a Barcelona.",
  openGraph: {
    title: "Mª del Mar — Psicopedagoga i Coach",
    description:
      "Facilitadora de la teva pròpia evolució. Coaching i intervenció psicopedagògica a Barcelona.",
    locale: "ca_ES",
    type: "website",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="ca" className={`${onest.variable} h-full`}>
      <body className="flex min-h-full flex-col overflow-x-clip antialiased">
        <div className="grain" />
        <SmoothScroll>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
