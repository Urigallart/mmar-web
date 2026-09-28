"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { Container } from "@/components/Container";
import { IconBadge, type IconBadgeSpec } from "@/components/IconBadge";

const LEFT_X = "-4%";
const RIGHT_X = "-4%";

const STICKERS: IconBadgeSpec[] = [
  {
    src: "/images/icons-flat/mente-creativa.png",
    alt: "Ment creativa",
    size: 130,
    rotate: -7,
    style: { left: LEFT_X, top: "-30px" },
  },
  {
    src: "/images/icons-flat/mental.png",
    alt: "Benestar mental",
    size: 110,
    rotate: 6,
    style: { left: LEFT_X, top: "165px" },
  },
  {
    src: "/images/icons-flat/psicologia-2.png",
    alt: "Sessió d'acompanyament",
    size: 125,
    rotate: -6,
    style: { left: LEFT_X, top: "320px" },
  },
  {
    src: "/images/icons-flat/justicia-social.png",
    alt: "Suport i acompanyament",
    size: 125,
    rotate: 7,
    style: { right: RIGHT_X, top: "50px" },
  },
  {
    src: "/images/icons-flat/liderazgo.png",
    alt: "Creixement personal",
    size: 115,
    rotate: -6,
    style: { right: RIGHT_X, top: "225px" },
  },
  {
    src: "/images/icons-flat/familia.png",
    alt: "Família",
    size: 135,
    rotate: 6,
    style: { right: RIGHT_X, top: "380px" },
  },
];

export default function Hero() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(
        ".hero-kicker, .hero-line, .hero-lede, .hero-cta, .hero-media, .hero-scroll-cue, .icon-badge",
        { opacity: 1, y: 0, scale: 1 }
      );
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.fromTo(
        ".hero-kicker",
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.7 },
        0.1
      )
        .fromTo(
          ".hero-line",
          { opacity: 0, y: "100%" },
          { opacity: 1, y: "0%", duration: 1, stagger: 0.1 },
          0.25
        )
        .fromTo(
          ".hero-lede",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.7
        )
        .fromTo(
          ".hero-cta",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          0.82
        )
        .fromTo(
          ".hero-media",
          { opacity: 0, scale: 1.06 },
          { opacity: 1, scale: 1, duration: 1.3, ease: "power2.out" },
          0.35
        )
        .fromTo(
          ".hero-scroll-cue",
          { opacity: 0 },
          { opacity: 1, duration: 0.6 },
          1.2
        )
        .fromTo(
          ".icon-badge",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.7, stagger: 0.09, ease: "back.out(1.8)" },
          0.5
        );

      gsap.to(".icon-badge", {
        yPercent: -10,
        ease: "none",
        stagger: 0.04,
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".hero-media img", {
        yPercent: 8,
        ease: "none",
        scrollTrigger: {
          trigger: root,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, root);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="relative pt-32 pb-20 sm:pt-40 sm:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -top-40 right-[-10%] h-[520px] w-[520px] rounded-full opacity-60 blur-3xl"
          style={{ background: "radial-gradient(circle, var(--color-green-pale), transparent 70%)" }}
        />
      </div>

      <div aria-hidden className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
        <Container className="relative h-full">
          {STICKERS.map((spec) => (
            <IconBadge key={spec.src} spec={spec} />
          ))}
        </Container>
      </div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p className="hero-kicker eyebrow mb-6">Psicopedagoga · Coach · Barcelona</p>
          <h1
            className="font-semibold tracking-tight text-ink"
            style={{ fontSize: "var(--fs-display)", lineHeight: 1.02 }}
          >
            <span className="block overflow-hidden">
              <span className="hero-line block">Facilitadora de</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">la teva pròpia</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block text-green-deep">evolució</span>
            </span>
          </h1>
          <p className="hero-lede mt-7 max-w-md text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.55 }}>
            Dues línies d&apos;acompanyament: coaching i consultes puntuals per a
            joves i adults, i intervenció psicopedagògica per a infants i
            adolescents.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Link href="/coaching" className="hero-cta btn btn-primary">
              Coaching i consultes
              <ArrowIcon />
            </Link>
            <Link href="/psicopedagogia" className="hero-cta btn btn-ghost">
              Psicopedagogia
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="hero-media relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] bg-paper-deep sm:max-w-md lg:ml-auto">
            <Image
              src="/images/hero-photo-existing.jpg"
              alt="Mª del Mar treballant al seu despatx"
              fill
              priority
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-white/90 px-5 py-4 shadow-[0_20px_50px_-20px_rgba(32,43,40,0.35)] backdrop-blur sm:block">
            <p className="text-sm font-semibold text-ink">+15 anys</p>
            <p className="text-xs text-ink-dim">acompanyant persones i famílies</p>
          </div>
        </div>
      </Container>

      <div className="hero-scroll-cue mt-16 flex justify-center opacity-0">
        <div className="flex flex-col items-center gap-2 text-ink-dim">
          <span className="text-[0.7rem] font-medium uppercase tracking-[0.2em]">Descobreix més</span>
          <span className="h-9 w-px animate-pulse bg-border-strong" />
        </div>
      </div>
    </section>
  );
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
