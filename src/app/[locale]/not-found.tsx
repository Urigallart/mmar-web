import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/Container";

export default async function NotFound() {
  const t = await getTranslations("notFound");

  return (
    <section className="pt-40 pb-[var(--section-pad)]">
      <Container className="max-w-3xl">
        <p className="eyebrow mb-5">404</p>
        <h1
          className="text-balance font-semibold tracking-tight text-ink"
          style={{ fontSize: "var(--fs-hero)", lineHeight: 1.08 }}
        >
          {t("title")}
        </h1>
        <p className="mt-6 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
          {t("text")}
        </p>
        <Link href="/" className="btn btn-primary mt-10 w-fit">
          {t("cta")}
        </Link>
      </Container>
    </section>
  );
}
