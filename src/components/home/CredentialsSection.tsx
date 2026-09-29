"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { Container } from "@/components/Container";
import { Reveal } from "@/components/Reveal";

type CredentialItem = {
  title: string;
  org: string;
  years: string;
};

export default function CredentialsSection() {
  const t = useTranslations("home.credentials");
  const items = t.raw("items") as CredentialItem[];
  const listRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    const line = lineRef.current;
    if (!list || !line) return;

    if (prefersReducedMotion()) {
      gsap.set(line, { scaleY: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: list,
            start: "top 72%",
            end: "bottom 85%",
            scrub: 0.4,
          },
        }
      );
    }, list);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-[var(--section-pad)]">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <Reveal y={30}>
          <div className="relative aspect-[4/5] w-full max-w-sm overflow-hidden rounded-[var(--radius-card)] bg-paper-deep lg:sticky lg:top-28">
            <Image
              src="/images/desk-detail.png"
              alt={t("photoAlt")}
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <div>
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

          <div ref={listRef} className="relative mt-12">
            <div
              aria-hidden
              className="absolute left-[19px] top-1 bottom-1 w-px bg-border"
            />
            <div
              ref={lineRef}
              aria-hidden
              className="absolute left-[19px] top-1 bottom-1 w-px origin-top bg-green-deep"
              style={{ transform: "scaleY(0)" }}
            />
            <ul className="flex flex-col gap-9">
              {items.map((item, i) => (
                <Reveal
                  as="li"
                  key={item.title}
                  y={20}
                  delay={i * 0.05}
                  className="relative flex gap-5 pl-12"
                >
                  <span className="absolute left-0 top-0.5 grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-border bg-white text-xs font-semibold text-green-deep">
                    {i + 1}
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-green-deep">{item.years}</p>
                    <p className="mt-1 font-medium text-ink">{item.title}</p>
                    <p className="mt-1 text-sm text-ink-dim">{item.org}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}
