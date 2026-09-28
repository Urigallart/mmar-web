import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function BioSection({
  eyebrow = "Sobre mi",
  image,
  imageAlt,
  paragraphs,
}: {
  eyebrow?: string;
  image: string;
  imageAlt: string;
  paragraphs: string[];
}) {
  return (
    <section className="border-t border-border bg-white py-[var(--section-pad)]">
      <Container className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr] lg:items-center lg:gap-16">
        <Reveal y={30}>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] bg-paper-deep">
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 380px, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>
        <div>
          <Reveal y={16}>
            <p className="eyebrow mb-4">{eyebrow}</p>
          </Reveal>
          <div className="flex flex-col gap-5 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
            {paragraphs.map((p, i) => (
              <Reveal key={i} y={20} delay={i * 0.07}>
                <p>{p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
