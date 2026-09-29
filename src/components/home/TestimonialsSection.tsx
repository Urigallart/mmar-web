import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { Reveal, RevealGroup } from "@/components/Reveal";

type TestimonialItem = {
  quote: string;
  name: string;
  role: string;
};

export default function TestimonialsSection() {
  const t = useTranslations("home.testimonials");
  const items = t.raw("items") as TestimonialItem[];

  return (
    <section className="py-[var(--section-pad)]" style={{ background: "var(--color-paper-deep)" }}>
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

        <RevealGroup className="mt-12 grid gap-6 lg:grid-cols-3" stagger={0.1}>
          {items.map((item) => (
            <figure
              key={item.name}
              className="flex h-full flex-col rounded-[var(--radius-card)] border border-border bg-white px-7 py-8"
            >
              <QuoteMark />
              <blockquote className="mt-4 flex-1 text-ink" style={{ lineHeight: 1.55 }}>
                {item.quote}
              </blockquote>
              <figcaption className="mt-6 border-t border-border pt-4">
                <p className="font-medium text-ink">{item.name}</p>
                <p className="text-sm text-ink-dim">{item.role}</p>
              </figcaption>
            </figure>
          ))}
        </RevealGroup>
      </Container>
    </section>
  );
}

function QuoteMark() {
  return (
    <svg width="28" height="20" viewBox="0 0 28 20" fill="none" aria-hidden>
      <path
        d="M0 20V11.6C0 4.6 4.4 0.6 11.2 0V4.2C7.6 4.8 5.8 6.8 5.6 10H11.2V20H0ZM16.8 20V11.6C16.8 4.6 21.2 0.6 28 0V4.2C24.4 4.8 22.6 6.8 22.4 10H28V20H16.8Z"
        fill="var(--color-green-pale)"
      />
    </svg>
  );
}
