import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

const SERVICES = [
  {
    tag: "Línia 1",
    href: "/coaching",
    title: "Coaching & consultes puntuals",
    description:
      "Per a joves, adults, professionals, esportistes, mares i pares que volen guanyar claredat, seguretat i benestar.",
    image: "/images/coaching-session.png",
    imageAlt: "Sessió de coaching amb una persona acompanyada al despatx",
  },
  {
    tag: "Línia 2",
    href: "/psicopedagogia",
    title: "Intervenció psicopedagògica",
    description:
      "Per a infants i adolescents amb dificultats d'atenció, lectoescriptura, organització, motivació o autonomia.",
    image: "/images/psicopedagogia-session.png",
    imageAlt: "Infant treballant l'aprenentatge de manera acompanyada",
  },
];

export default function ServiceFork() {
  return (
    <section id="acompanyament" className="py-[var(--section-pad)]">
      <Container>
        <SectionHeading
          eyebrow="Com t'acompanyo"
          title="Dues línies d'acompanyament, un mateix objectiu"
          lede="Cada procés s'adapta al moment i a les necessitats de la persona. Explora quina línia encaixa amb la teva situació."
        />

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {SERVICES.map((service, i) => (
            <Reveal key={service.href} delay={i * 0.1} y={40}>
              <Link
                href={service.href}
                className="card-hover group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-card)] border border-border bg-white"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden bg-green-pale">
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    sizes="(min-width: 768px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <span className="eyebrow">{service.tag}</span>
                  <h3 className="mt-3 font-semibold text-ink" style={{ fontSize: "var(--fs-h3)" }}>
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-dim">{service.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
                    Explorar
                    <span className="btn-arrow bg-ink text-paper transition-transform duration-500 group-hover:translate-x-1">
                      <svg width="12" height="12" viewBox="0 0 16 16" fill="none">
                        <path
                          d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
                          stroke="currentColor"
                          strokeWidth="1.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
