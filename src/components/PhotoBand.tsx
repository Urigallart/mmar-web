import Image from "next/image";
import { Container } from "./Container";
import { Reveal } from "./Reveal";

export function PhotoBand({
  src,
  alt,
  caption,
  ratio = "21/9",
}: {
  src: string;
  alt: string;
  caption?: string;
  ratio?: string;
}) {
  return (
    <section className="py-[var(--section-pad-sm)]">
      <Container>
        <Reveal y={30}>
          <div
            className="relative w-full overflow-hidden rounded-[var(--radius-card)] bg-paper-deep"
            style={{ aspectRatio: ratio }}
          >
            <Image
              src={src}
              alt={alt}
              fill
              sizes="(min-width: 1240px) 1240px, 100vw"
              className="object-cover"
            />
          </div>
          {caption && <p className="mt-4 text-sm text-ink-dim">{caption}</p>}
        </Reveal>
      </Container>
    </section>
  );
}
