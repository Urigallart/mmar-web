"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { gsap } from "@/lib/gsap";
import { prefersReducedMotion } from "@/lib/motion";
import { Container } from "@/components/Container";
import { IconBadge, type IconBadgeSpec } from "@/components/IconBadge";

const LEFT_X = "-4%";

const STICKERS: IconBadgeSpec[] = [
  {
    src: "/images/icons-green/mente-creativa.png",
    alt: "Ment creativa",
    size: 130,
    rotate: -7,
    style: { left: LEFT_X, top: "220px" },
  },
  {
    src: "/images/icons-green/mental.png",
    alt: "Benestar mental",
    size: 110,
    rotate: 6,
    style: { left: LEFT_X, top: "395px" },
  },
  {
    src: "/images/icons-green/psicologia-2.png",
    alt: "Sessió d'acompanyament",
    size: 125,
    rotate: -6,
    style: { left: LEFT_X, top: "550px" },
  },
];

type MobileStickerSpec = {
  src: string;
  alt: string;
  size: number;
  rotate: number;
  opacity: number;
  style: React.CSSProperties;
};

const MOBILE_STICKERS: MobileStickerSpec[] = [
  {
    src: "/images/icons-green/mente-creativa.png",
    alt: "",
    size: 44,
    rotate: -10,
    opacity: 0.4,
    style: { right: "6%", top: "0px" },
  },
  {
    src: "/images/icons-green/liderazgo.png",
    alt: "",
    size: 40,
    rotate: -6,
    opacity: 0.32,
    style: { right: "28%", top: "22px" },
  },
  {
    src: "/images/icons-green/familia.png",
    alt: "",
    size: 38,
    rotate: 8,
    opacity: 0.3,
    style: { right: "0%", top: "38px" },
  },
];

function MobileSticker({ spec }: { spec: MobileStickerSpec }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute"
      style={{
        width: spec.size,
        height: spec.size,
        rotate: `${spec.rotate}deg`,
        opacity: spec.opacity,
        ...spec.style,
      }}
    >
      <Image src={spec.src} alt="" fill sizes={`${spec.size}px`} className="object-contain" />
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("home.hero");
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    if (prefersReducedMotion()) {
      gsap.set(
        ".hero-kicker, .hero-line, .hero-lede, .hero-cta, .hero-media, .icon-badge",
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
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
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
          ".icon-badge",
          { opacity: 0, scale: 0.5 },
          { opacity: 1, scale: 1, duration: 0.7, stagger: 0.09, ease: "back.out(1.8)" },
          0.5
        );

      tl.eventCallback("onComplete", () => {
        gsap.utils.toArray<HTMLElement>(".icon-badge").forEach((el, i) => {
          const isLeft = i < 3;
          const dir = isLeft ? -1 : 1;
          gsap.fromTo(
            el,
            { opacity: 1, scale: 1, x: 0, yPercent: 0 },
            {
              x: dir * (160 + i * 30),
              yPercent: isLeft ? -55 : 55,
              rotate: `+=${dir * 50}`,
              scale: 0.4,
              opacity: 0,
              ease: "none",
              scrollTrigger: {
                trigger: root,
                start: `top top+=${40 + i * 25}`,
                end: "bottom top",
                scrub: true,
              },
            }
          );
        });
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
    <section
      ref={rootRef}
      className="relative pt-36 pb-20 sm:pt-40 sm:pb-28 lg:pt-28 lg:pb-8 [@media(max-height:800px)]:lg:pt-24 [@media(max-height:800px)]:lg:pb-6"
    >
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

      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-40 h-28 overflow-hidden lg:hidden">
        <Container className="relative h-full">
          {MOBILE_STICKERS.map((spec) => (
            <MobileSticker key={spec.src} spec={spec} />
          ))}
        </Container>
      </div>

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <p className="hero-kicker eyebrow mb-6 mt-2 lg:mt-4 [@media(max-height:800px)]:lg:mt-1">{t("kicker")}</p>
          <h1
            className="hero-line font-semibold tracking-tight text-balance text-ink"
            style={{ fontSize: "var(--fs-display)", lineHeight: 1.08 }}
          >
            {t("titleMain")}
            <span style={{ color: "#2c4842" }}>{t("titleAccent")}</span>
          </h1>
          <p className="hero-lede mt-7 font-medium text-ink" style={{ fontSize: "var(--fs-lede)" }}>
            {t("linesLabel")}
          </p>
          <ul className="hero-lede mt-3 flex max-w-lg flex-col gap-2 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.5 }}>
            <li>
              <span className="font-semibold text-ink">{t("linePsicoBold")}</span> — {t("linePsicoRest")}
            </li>
            <li>
              <span className="font-semibold text-ink">{t("lineCoachBold")}</span> — {t("lineCoachRest")}
            </li>
          </ul>
          <div className="mt-9 flex flex-wrap items-center gap-3.5">
            <Link href="/coaching" className="hero-cta btn btn-primary">
              {t("ctaCoaching")}
              <ArrowIcon />
            </Link>
            <Link href="/psicopedagogia" className="hero-cta btn btn-ghost">
              {t("ctaPsico")}
              <ArrowIcon />
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="hero-media relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] bg-paper-deep sm:max-w-lg lg:ml-auto lg:max-h-[68vh]">
            <Image
              src="/images/hero-photo-v2.jpg"
              alt={t("photoAlt")}
              fill
              priority
              sizes="(min-width: 1024px) 520px, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 hidden rounded-2xl border border-border bg-white/90 px-5 py-4 shadow-[0_20px_50px_-20px_rgba(32,43,40,0.35)] backdrop-blur sm:block">
            <p className="text-sm font-semibold text-ink">{t("statValue")}</p>
            <p className="text-xs text-ink-dim">{t("statLabel")}</p>
          </div>
        </div>
      </Container>
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
