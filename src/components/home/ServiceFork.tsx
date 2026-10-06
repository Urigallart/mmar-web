import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";

export default function ServiceFork() {
  const t = useTranslations("home.fork");

  const SERVICES = [
    {
      tag: t("line1Tag"),
      href: "/coaching",
      title: t("line1Title"),
      description: t("line1Desc"),
      image: "/images/coaching-session.png",
      imageAlt: t("line1ImageAlt"),
    },
    {
      tag: t("line2Tag"),
      href: "/psicopedagogia",
      title: t("line2Title"),
      description: t("line2Desc"),
      image: "/images/psicopedagogia-session.png",
      imageAlt: t("line2ImageAlt"),
    },
  ];

  return (
    <section id="acompanyament" className="py-[var(--section-pad)]" style={{ background: "var(--color-green)" }}>
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} lede={t("lede")} light />

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
                    className="object-cover transition-transform duration-700 ease-out"
                  />
                </div>
                <div className="flex flex-1 flex-col p-7 sm:p-8">
                  <span className="eyebrow">{service.tag}</span>
                  <h3 className="mt-3 font-semibold text-ink" style={{ fontSize: "var(--fs-h3)" }}>
                    {service.title}
                  </h3>
                  <p className="mt-3 flex-1 leading-relaxed text-ink-dim">{service.description}</p>
                  <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-ink">
                    {t("explore")}
                    <span className="btn-arrow bg-ink text-paper transition-transform duration-500">
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
