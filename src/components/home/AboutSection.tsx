import Image from "next/image";
import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

export default function AboutSection() {
  const t = useTranslations("home.about");

  return (
    <section id="sobre-mi" className="py-[var(--section-pad)]">
      <Container className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <Reveal y={30}>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] bg-paper-deep">
            <Image
              src="/images/monitor-reflective.png"
              alt={t("photoAlt")}
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="grid h-11 w-11 flex-shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-paper">
              M
            </span>
            <div>
              <p className="font-semibold text-ink">Mª del Mar</p>
              <p className="text-sm text-ink-dim">{t("role")}</p>
              <p className="text-xs text-ink-dim/80">{t("currentCollab")}</p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal y={16}>
            <p className="eyebrow mb-4">{t("eyebrow")}</p>
          </Reveal>
          <Reveal y={24} delay={0.05}>
            <p
              className="font-medium tracking-tight text-balance text-ink"
              style={{ fontSize: "var(--fs-h3)", lineHeight: 1.4 }}
            >
              {t("quote")}
            </p>
          </Reveal>

          <div className="mt-7 flex flex-col gap-6 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            <Reveal y={20} delay={0.1}>
              <p>{t("p1")}</p>
            </Reveal>
            <Reveal y={20} delay={0.16}>
              <p>{t("p2")}</p>
            </Reveal>
            <Reveal y={20} delay={0.22}>
              <p>{t("p3")}</p>
            </Reveal>
            <Reveal y={20} delay={0.28}>
              <p>{t("p4")}</p>
            </Reveal>
          </div>

          <Reveal y={20} delay={0.34}>
            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-8 sm:gap-6">
              <Stat value={t("statYearsValue")} label={t("statYearsLabel")} />
              <Stat value={t("statLinesValue")} label={t("statLinesLabel")} />
              <Stat value={t("statLocationValue")} label={t("statLocationLabel")} />
            </div>
          </Reveal>
        </div>
      </Container>

      <Container className="mt-16">
        <Reveal y={30}>
          <div className="relative overflow-hidden rounded-[var(--radius-card)]">
            <Image
              src="/images/collage.png"
              alt={t("spaceImageAlt")}
              width={1536}
              height={1024}
              sizes="(min-width: 1240px) 1240px, 100vw"
              className="w-full object-cover"
            />
          </div>
          <p className="mt-4 text-sm text-ink-dim">{t("spaceCaption")}</p>
        </Reveal>
      </Container>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="font-semibold text-ink" style={{ fontSize: "1.4rem" }}>
        {value}
      </p>
      <p className="mt-1 text-xs leading-snug text-ink-dim">{label}</p>
    </div>
  );
}
