import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";
import { SectionHeading } from "@/components/SectionHeading";

type FaqItem = { q: string; a: string };

export default function FaqSection() {
  const t = useTranslations("home.faq");
  const items = t.raw("items") as FaqItem[];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <section className="py-[var(--section-pad)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container className="max-w-3xl">
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />
        <div className="mt-10 flex flex-col gap-3">
          {items.map((item) => (
            <details key={item.q} className="group rounded-2xl border border-border bg-white px-6 py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-ink [&::-webkit-details-marker]:hidden">
                {item.q}
                <span
                  aria-hidden
                  className="grid h-7 w-7 flex-shrink-0 place-items-center rounded-full border border-border-strong text-ink-dim transition-transform duration-300 group-open:rotate-45"
                >
                  +
                </span>
              </summary>
              <p className="mt-3 leading-relaxed text-ink-dim">{item.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
