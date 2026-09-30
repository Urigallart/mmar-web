import { getTranslations } from "next-intl/server";
import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import ServiceFork from "@/components/home/ServiceFork";
import AboutSection from "@/components/home/AboutSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import ContactSection from "@/components/home/ContactSection";
import { CtaBanner } from "@/components/CtaBanner";

export default async function Home() {
  const t = await getTranslations("home.offer");

  return (
    <>
      <Hero />
      <Manifesto />
      <ServiceFork />
      <AboutSection />
      <TestimonialsSection />
      <CtaBanner title={t("title")} lede={t("lede")} ctaLabel={t("ctaLabel")} />
      <ContactSection />
    </>
  );
}
