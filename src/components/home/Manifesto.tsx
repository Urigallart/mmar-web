"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { Container } from "@/components/Container";

export default function Manifesto() {
  const text = useTranslations("home")("manifesto");
  const pRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const p = pRef.current;
    if (!p) return;

    if (prefersReducedMotion()) {
      gsap.set(p.querySelectorAll(".word"), { color: "var(--color-ink)" });
      return;
    }

    const ctx = gsap.context(() => {
      const words = p.querySelectorAll(".word");
      gsap.to(words, {
        color: "var(--color-ink)",
        stagger: 0.06,
        ease: "none",
        scrollTrigger: {
          trigger: p,
          start: "top 75%",
          end: "bottom 40%",
          scrub: 0.4,
        },
      });
    }, p);

    return () => ctx.revert();
  }, []);

  const words = text.split(" ");

  return (
    <section className="py-[var(--section-pad)]">
      <Container className="max-w-4xl">
        <p
          ref={pRef}
          className="font-medium tracking-tight text-balance"
          style={{ fontSize: "var(--fs-h2)", lineHeight: 1.35 }}
        >
          {words.map((w, i) => (
            <span key={i} className="word" style={{ color: "var(--color-border-strong)" }}>
              {w}{" "}
            </span>
          ))}
        </p>
      </Container>
    </section>
  );
}
