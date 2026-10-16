"use client";

import { useTranslations } from "next-intl";
import { Container } from "@/components/Container";

export default function ErrorPage({ reset }: { error: Error; reset: () => void }) {
  const t = useTranslations("errorPage");

  return (
    <section className="pt-40 pb-[var(--section-pad)]">
      <Container className="max-w-3xl">
        <h1
          className="text-balance font-semibold tracking-tight text-ink"
          style={{ fontSize: "var(--fs-hero)", lineHeight: 1.08 }}
        >
          {t("title")}
        </h1>
        <p className="mt-6 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.6 }}>
          {t("text")}
        </p>
        <button type="button" onClick={reset} className="btn btn-primary mt-10 w-fit">
          {t("cta")}
        </button>
      </Container>
    </section>
  );
}
