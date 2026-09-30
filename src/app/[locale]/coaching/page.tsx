import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckList } from "@/components/CheckList";
import { ProcessTimeline, type ProcessStep } from "@/components/ProcessTimeline";
import { ContactCta } from "@/components/ContactCta";
import { Reveal } from "@/components/Reveal";
import { PhotoBand } from "@/components/PhotoBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "coaching.meta" });
  return { title: t("title"), description: t("description") };
}

export default async function CoachingPage() {
  const t = await getTranslations("coaching");
  const tCommon = await getTranslations("common");
  const situations = t.raw("situations.items") as string[];
  const areas = t.raw("areas.items") as string[];
  const steps = t.raw("process.steps") as ProcessStep[];

  return (
    <>
      <PageHero
        eyebrow={t("hero.eyebrow")}
        title={t("hero.title")}
        lede={t("hero.lede")}
        backLabel={tCommon("backToHome")}
      />

      <section className="pb-[var(--section-pad-sm)]">
        <Container className="max-w-3xl">
          <Reveal y={20}>
            <div className="flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
              <p>{t("intro.p1")}</p>
              <p>{t("intro.p2")}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <PhotoBand src="/images/group-session.png" alt={t("photoAlt")} ratio="16/9" />

      <section className="border-y border-border bg-white py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={t("who.eyebrow")} title={t("who.title")} />
          <div className="mt-8 flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            <Reveal y={16}>
              <p>{t("who.p1")}</p>
            </Reveal>
            <Reveal y={16} delay={0.08}>
              <p>{t("who.p2")}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad)]">
        <Container>
          <SectionHeading
            eyebrow={t("situations.eyebrow")}
            title={t("situations.title")}
            lede={t("situations.lede")}
          />
          <div className="mt-10 rounded-[var(--radius-card)] bg-green-pale p-6 sm:p-10">
            <CheckList items={situations} columns={2} />
          </div>
          <Reveal y={16} delay={0.1}>
            <p className="mt-10 max-w-2xl border-l-2 border-green-deep/30 pl-5 italic text-ink-dim">
              {t("situations.note")}
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="border-y border-border bg-white py-[var(--section-pad)]">
        <Container>
          <SectionHeading eyebrow={t("areas.eyebrow")} title={t("areas.title")} lede={t("areas.lede")} />
          <div className="mt-10 rounded-[var(--radius-card)] bg-green-pale p-6 sm:p-10">
            <CheckList items={areas} columns={2} />
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading
            eyebrow={t("process.eyebrow")}
            title={t("process.title")}
            lede={t("process.lede")}
          />
          <div className="mt-12">
            <ProcessTimeline steps={steps} />
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad-sm)]">
        <Container className="grid gap-6 sm:grid-cols-2">
          <Reveal y={24}>
            <div className="h-full rounded-2xl border border-border bg-white p-7 sm:p-8">
              <h3 className="font-semibold text-ink" style={{ fontSize: "var(--fs-h3)" }}>
                {t("punctual.title")}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-dim">{t("punctual.desc")}</p>
            </div>
          </Reveal>
          <Reveal y={24} delay={0.1}>
            <div className="h-full rounded-2xl border border-border bg-white p-7 sm:p-8">
              <h3 className="font-semibold text-ink" style={{ fontSize: "var(--fs-h3)" }}>
                {t("vsPsychology.title")}
              </h3>
              <p className="mt-3 leading-relaxed text-ink-dim">{t("vsPsychology.desc")}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="border-t border-border bg-white py-[var(--section-pad-sm)]">
        <Container className="max-w-3xl">
          <Reveal y={20}>
            <p className="eyebrow mb-4">{t("modality.label")}</p>
            <p className="text-ink-dim" style={{ fontSize: "var(--fs-lede)" }}>
              {t("modality.text")}
            </p>
          </Reveal>
        </Container>
      </section>

      <ContactCta variant="coaching" />
    </>
  );
}
