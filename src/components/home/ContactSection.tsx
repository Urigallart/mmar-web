import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";
import { HomeContactButtons } from "./HomeContactButtons";

export default function ContactSection() {
  const t = useTranslations("home.contact");

  return (
    <section id="contacte" className="py-[var(--section-pad)]">
      <Container>
        <div className="dark-surface relative overflow-hidden rounded-[calc(var(--radius-card)+8px)] bg-ink px-8 py-16 sm:px-16 sm:py-20">
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
            style={{ background: "radial-gradient(circle, var(--color-green), transparent 70%)" }}
          />
          <div className="relative grid gap-14 lg:grid-cols-[1.2fr_1fr] lg:items-center">
            <Reveal y={28}>
              <p className="eyebrow mb-5" style={{ color: "var(--color-green-pale)" }}>
                {t("eyebrow")}
              </p>
              <h2
                className="text-balance font-semibold tracking-tight text-paper"
                style={{ fontSize: "var(--fs-h2)", lineHeight: 1.15 }}
              >
                {t("title")}
              </h2>
              <p className="mt-5 max-w-lg text-white/65" style={{ fontSize: "var(--fs-lede)" }}>
                {t("lede")}
              </p>
              <HomeContactButtons whatsappLabel={t("ctaWhatsapp")} />
            </Reveal>

            <Reveal y={28} delay={0.1}>
              <div className="flex flex-col gap-5 border-t border-white/15 pt-8 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                <ContactRow label={t("locationLabel")} value={t("locationValue")} />
                <ContactRow label={t("modalityLabel")} value={t("modalityValue")} />
                <ContactRow label={t("phoneLabel")} value={t("phoneValue")} href="tel:+34629392949" />
                <ContactRow label={t("emailLabel")} value={t("emailValue")} href="mailto:mmarserracanta@gmail.com" />
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ContactRow({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4 text-sm">
      <span className="text-white/50">{label}</span>
      {href ? (
        <a href={href} className="font-medium !text-white underline-offset-4">
          {value}
        </a>
      ) : (
        <span className="font-medium text-paper">{value}</span>
      )}
    </div>
  );
}
