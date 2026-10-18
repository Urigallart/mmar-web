import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { NextIntlClientProvider } from "next-intl";
import { getTranslations, getMessages } from "next-intl/server";
import { Onest } from "next/font/google";
import "../globals.css";
import { routing } from "@/i18n/routing";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";

const onest = Onest({
  variable: "--font-onest",
  subsets: ["latin", "latin-ext"],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

const OG_LOCALE: Record<string, string> = {
  ca: "ca_ES",
  es: "es_ES",
  en: "en_US",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "meta" });

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmar-web.vercel.app"),
    title: {
      default: t("title"),
      template: `%s — ${t("siteName")}`,
    },
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("ogDescription"),
      locale: OG_LOCALE[locale] ?? "ca_ES",
      type: "website",
    },
  };
}

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmar-web.vercel.app";

function structuredData(locale: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "Maria del Mar — Psicopedagoga i Coach",
    alternateName: "Mª del Mar",
    url: `${SITE}/${locale}`,
    description:
      locale === "es"
        ? "Psicopedagoga y coach en Barcelona: coaching y consultas puntuales para jóvenes y adultos, e intervención psicopedagógica para niños y adolescentes."
        : "Psicopedagoga i coach a Barcelona: coaching i consultes puntuals per a joves i adults, i intervenció psicopedagògica per a infants i adolescents.",
    areaServed: "Barcelona",
    address: { "@type": "PostalAddress", addressLocality: "Barcelona", addressCountry: "ES" },
    knowsLanguage: ["ca", "es"],
    founder: { "@type": "Person", name: "Maria del Mar", jobTitle: "Psicopedagoga i coach" },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  const messages = await getMessages();

  return (
    <html lang={locale} className={`${onest.variable} h-full`}>
      <body className="flex min-h-full flex-col overflow-x-clip antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData(locale)) }}
        />
        <NextIntlClientProvider locale={locale} messages={messages}>
          <div className="grain" />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </NextIntlClientProvider>
        <Analytics />
      </body>
    </html>
  );
}
