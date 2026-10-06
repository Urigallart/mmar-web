import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";

export default function Manifesto() {
  const text = useTranslations("home")("manifesto");

  return (
    <section className="py-[var(--section-pad)]">
      <Container className="max-w-4xl">
        <figure className="relative rounded-[var(--radius-card)] bg-green-pale px-7 py-10 sm:px-14 sm:py-14">
          <svg width="48" height="34" viewBox="0 0 28 20" fill="none" aria-hidden className="mb-6">
            <path
              d="M0 20V11.6C0 4.6 4.4 0.6 11.2 0V4.2C7.6 4.8 5.8 6.8 5.6 10H11.2V20H0ZM16.8 20V11.6C16.8 4.6 21.2 0.6 28 0V4.2C24.4 4.8 22.6 6.8 22.4 10H28V20H16.8Z"
              fill="var(--color-green)"
            />
          </svg>
          <blockquote
            className="font-medium tracking-tight text-balance text-ink"
            style={{ fontSize: "var(--fs-h2)", lineHeight: 1.35 }}
          >
            {text}
          </blockquote>
        </figure>
      </Container>
    </section>
  );
}
