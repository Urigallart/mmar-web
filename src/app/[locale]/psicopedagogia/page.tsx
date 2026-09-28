import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Container } from "@/components/Container";
import { PageHero } from "@/components/PageHero";
import { SectionHeading } from "@/components/SectionHeading";
import { CheckList } from "@/components/CheckList";
import { InfoBlockGrid, type InfoBlock } from "@/components/InfoBlockGrid";
import { ProcessTimeline, type ProcessStep } from "@/components/ProcessTimeline";
import { CtaBanner } from "@/components/CtaBanner";
import { Reveal } from "@/components/Reveal";
import { PhotoBand } from "@/components/PhotoBand";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "psicopedagogia.meta" });
  return { title: t("title"), description: t("description") };
}


export default async function PsicopedagogiaPage() {
  const t = await getTranslations("psicopedagogia");
  const tCommon = await getTranslations("common");
  const audience = t.raw("audience.items") as string[];
  const blocks = t.raw("workSection.blocks") as InfoBlock[];
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

      <PhotoBand src="/images/psicopedagogia-session.png" alt={t("photoAlt")} ratio="16/9" />

      <section className="border-y border-border bg-white py-[var(--section-pad)]">
        <Container>
          <SectionHeading
            eyebrow={t("audience.eyebrow")}
            title={t("audience.title")}
            lede={t("audience.lede")}
          />
          <div className="mt-10">
            <CheckList items={audience} columns={2} />
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={t("workSection.eyebrow")} title={t("workSection.title")} />
          <div className="mt-8 flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            <Reveal y={16}>
              <p>{t("workSection.p1")}</p>
            </Reveal>
            <Reveal y={16} delay={0.08}>
              <p>{t("workSection.p2")}</p>
            </Reveal>
          </div>
          <div className="mt-12">
            <InfoBlockGrid items={blocks} />
          </div>
        </Container>
      </section>

      <section className="border-y border-border bg-white py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={t("methodology.eyebrow")} title={t("methodology.title")} />
          <div className="mt-8 flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            <Reveal y={16}>
              <p>{t("methodology.p1")}</p>
            </Reveal>
            <Reveal y={16} delay={0.08}>
              <p>{t("methodology.p2")}</p>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="py-[var(--section-pad)]">
        <Container className="max-w-3xl">
          <SectionHeading eyebrow={t("process.eyebrow")} title={t("process.title")} />
          <div className="mt-12">
            <ProcessTimeline steps={steps} />
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-white py-[var(--section-pad-sm)]">
        <Container className="max-w-3xl">
          <Reveal y={20}>
            <p className="eyebrow mb-4">{t("modality.label")}</p>
            <div className="flex flex-col gap-3 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
              <p>{t("modality.p1")}</p>
              <p>{t("modality.p2")}</p>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner title={t("cta.title")} lede={t("cta.lede")} ctaLabel={tCommon("writeUs")} />
    </>
  );
}
