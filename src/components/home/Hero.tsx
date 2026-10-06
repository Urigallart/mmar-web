"use client";

import { useEffect, useRef, useState } from "react";
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
};

const MOBILE_STICKERS: MobileStickerSpec[] = [
  { src: "/images/icons-green/mente-creativa.png", alt: "", size: 42, rotate: -8, opacity: 0.5 },
  { src: "/images/icons-green/liderazgo.png", alt: "", size: 38, rotate: 6, opacity: 0.4 },
  { src: "/images/icons-green/familia.png", alt: "", size: 40, rotate: -5, opacity: 0.35 },
];

function MobileSticker({ spec }: { spec: MobileStickerSpec }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none relative"
      style={{
        width: spec.size,
        height: spec.size,
        rotate: `${spec.rotate}deg`,
        opacity: spec.opacity,
      }}
    >
      <Image src={spec.src} alt="" fill sizes={`${spec.size}px`} className="object-contain" />
    </div>
  );
}

export default function Hero() {
  const t = useTranslations("home.hero");
  const tAbout = useTranslations("home.about");
  const rootRef = useRef<HTMLDivElement>(null);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [aboutVisible, setAboutVisible] = useState(false);

  const openAbout = () => {
    setAboutOpen(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setAboutVisible(true)));
  };

  const closeAbout = () => {
    setAboutVisible(false);
    window.setTimeout(() => setAboutOpen(false), 280);
  };

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

      gsap.fromTo(".hero-media img", { yPercent: 0, scale: 1.06 }, {
        yPercent: 3,
        scale: 1.06,
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

      <Container className="relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        <div>
          <div className="mb-6 mt-2 flex items-center justify-between gap-4 lg:mb-6 lg:mt-4 lg:block [@media(max-height:800px)]:lg:mt-1">
            <p className="hero-kicker eyebrow">{t("kicker")}</p>
            <button
              type="button"
              onClick={openAbout}
              aria-label={tAbout("eyebrow")}
              className="hero-kicker relative h-16 w-16 shrink-0 overflow-hidden rounded-full ring-4 ring-white shadow-[0_10px_30px_-10px_rgba(32,43,40,0.45)] transition-transform active:scale-95 lg:hidden"
            >
              <Image src="/images/hero-photo-v3.webp" alt="" fill sizes="64px" className="object-cover object-[50%_20%]" />
            </button>
          </div>
          <div className="flex items-center gap-3">
            <h1
              className="hero-line flex-1 font-semibold tracking-tight text-balance"
              style={{ fontSize: "var(--fs-display)", lineHeight: 1.08, color: "#1a2e29" }}
            >
              {t("titleMain")}
              {t("titleAccent")}
            </h1>
            <div className="hero-kicker flex shrink-0 flex-col items-center gap-4 lg:hidden">
              {MOBILE_STICKERS.map((spec) => (
                <MobileSticker key={spec.src} spec={spec} />
              ))}
            </div>
          </div>
          <p className="hero-lede mt-7 font-medium text-ink" style={{ fontSize: "var(--fs-lede)" }}>
            {t("linesLabel")}
          </p>
          <ul className="hero-lede mt-3 flex max-w-lg flex-col gap-2 text-ink-dim" style={{ fontSize: "var(--fs-lede)", lineHeight: 1.5 }}>
            <li>
              <span className="text-ink">{t("linePsicoBold")}</span> — {t("linePsicoRest")}
            </li>
            <li>
              <span className="text-ink">{t("lineCoachBold")}</span> — {t("lineCoachRest")}
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

        <div className="relative lg:-mt-16">
          <div className="hero-media relative aspect-[4/5] w-full overflow-hidden rounded-[var(--radius-card)] bg-paper-deep sm:max-w-lg lg:ml-auto lg:h-[68vh] lg:w-auto lg:max-w-full">
            <Image
              src="/images/hero-photo-v3.webp"
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

      {aboutOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-8 backdrop-blur-md transition-opacity duration-300 lg:hidden ${aboutVisible ? "bg-ink/70 opacity-100" : "bg-ink/0 opacity-0"}`}
          onClick={closeAbout}
        >
          <div
            className={`relative flex w-full max-w-xs flex-col items-center transition-all duration-300 ease-out ${aboutVisible ? "translate-y-0 scale-100 opacity-100" : "translate-y-3 scale-95 opacity-0"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeAbout}
              aria-label="Tancar"
              className="absolute -top-2 right-0 grid h-9 w-9 place-items-center rounded-full bg-white text-ink-dim shadow-md"
            >
              ✕
            </button>
            <div className="relative h-28 w-28 overflow-hidden rounded-full ring-4 ring-white shadow-[0_20px_50px_-15px_rgba(20,28,26,0.55)]">
              <Image src="/images/hero-photo-v3.webp" alt="" fill sizes="112px" className="object-cover object-[50%_20%]" />
            </div>
            <p className="mt-5 font-semibold text-white">Mª del Mar</p>
            <p className="text-sm text-white/80">{tAbout("role")}</p>
            <p className="mt-4 text-center text-sm italic leading-relaxed text-white/90">{tAbout("quote")}</p>
            <Link
              href="/#sobre-mi"
              onClick={closeAbout}
              className="btn btn-primary mt-6 w-full justify-center"
            >
              {tAbout("eyebrow")}
              <ArrowIcon />
            </Link>
          </div>
        </div>
      )}
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
