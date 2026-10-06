import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lede,
}: {
  eyebrow: string;
  title: string;
  lede: string;
}) {
  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container className="max-w-3xl">
        <Reveal y={16}>
          <p className="eyebrow mb-5">{eyebrow}</p>
        </Reveal>
        <Reveal y={24} delay={0.06}>
          <h1
            className="text-balance font-semibold tracking-tight text-ink"
            style={{ fontSize: "var(--fs-hero)", lineHeight: 1.08 }}
          >
            {title}
          </h1>
        </Reveal>
        <Reveal y={20} delay={0.14}>
          <p className="mt-6 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            {lede}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
