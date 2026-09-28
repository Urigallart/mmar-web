import Hero from "@/components/home/Hero";
import Manifesto from "@/components/home/Manifesto";
import ServiceFork from "@/components/home/ServiceFork";
import AboutSection from "@/components/home/AboutSection";
import ContactSection from "@/components/home/ContactSection";

export default function Home() {
  return (
    <>
      <Hero />
      <Manifesto />
      <ServiceFork />
      <AboutSection />
      <ContactSection />
    </>
  );
}
