import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";

export default function Manifesto() {
  const text = useTranslations("home")("manifesto");

  return (
    <section className="py-[var(--section-pad)]">
      <Container className="max-w-4xl">
        <p
          className="font-medium tracking-tight text-balance text-ink"
          style={{ fontSize: "var(--fs-h2)", lineHeight: 1.35 }}
        >
          {text}
        </p>
      </Container>
    </section>
  );
}
