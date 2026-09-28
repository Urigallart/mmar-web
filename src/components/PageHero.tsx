import { Link } from "@/i18n/navigation";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function PageHero({
  eyebrow,
  title,
  lede,
  backLabel,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  backLabel: string;
}) {
  return (
    <section className="pt-32 pb-16 sm:pt-40 sm:pb-20">
      <Container className="max-w-3xl">
        <Reveal y={12}>
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-ink-dim transition-colors hover:text-ink"
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <path
                d="M12.5 8H3.5M3.5 8L7.5 4M3.5 8L7.5 12"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {backLabel}
          </Link>
        </Reveal>
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
