import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { Reveal, RevealGroup } from "@/components/Reveal";

type CredentialItem = {
  title: string;
  org: string;
  years: string;
};

export default function CredentialsSection() {
  const t = useTranslations("home.credentials");
  const items = t.raw("items") as CredentialItem[];

  return (
    <section className="py-[var(--section-pad)]">
      <Container>
        <div className="max-w-2xl">
          <Reveal y={16}>
            <p className="eyebrow mb-4">{t("eyebrow")}</p>
          </Reveal>
          <Reveal y={24} delay={0.05}>
            <h2
              className="font-semibold tracking-tight text-balance text-ink"
              style={{ fontSize: "var(--fs-h2)", lineHeight: 1.15 }}
            >
              {t("title")}
            </h2>
          </Reveal>
          <Reveal y={20} delay={0.1}>
            <p className="mt-4 text-ink-dim" style={{ fontSize: "var(--fs-lede)" }}>
              {t("lede")}
            </p>
          </Reveal>
        </div>

        <RevealGroup className="mt-12 grid gap-4 sm:grid-cols-2" stagger={0.08}>
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-[var(--radius-card)] border border-border bg-white px-6 py-5"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-deep">{item.years}</p>
              <p className="mt-2 font-medium text-ink">{item.title}</p>
              <p className="mt-1 text-sm text-ink-dim">{item.org}</p>
            </div>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}
