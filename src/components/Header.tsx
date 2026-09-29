"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import clsx from "clsx";
import { LanguageSwitcher } from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const NAV_LINKS = [
    { href: "/coaching", label: t("coaching") },
    { href: "/psicopedagogia", label: t("psicopedagogia") },
    { href: "/#sobre-mi", label: t("sobreMi") },
    { href: "/#contacte", label: t("contacte") },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 sm:pt-5">
        <div
          className={clsx(
            "flex w-full max-w-[1240px] items-center justify-between gap-4 rounded-full border border-border bg-paper/85 px-3 py-2.5 shadow-[0_10px_30px_-16px_rgba(32,43,40,0.3)] backdrop-blur-md transition-all duration-500 sm:px-4",
            (scrolled || menuOpen) &&
              "border-border-strong shadow-[0_10px_40px_-14px_rgba(32,43,40,0.25)]"
          )}
        >
          <Link
            href="/"
            className="flex items-center gap-2 rounded-full px-2 py-1 text-[0.95rem] font-semibold tracking-tight text-ink"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative h-7 w-[108px] flex-shrink-0">
              <Image src="/images/logo-mark-black.png" alt="" fill sizes="108px" className="object-contain" />
            </span>
            <span className="hidden sm:inline">Mª del Mar</span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-medium text-ink-dim transition-colors duration-300 hover:bg-white hover:text-ink"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              href="/#contacte"
              className="btn btn-primary hidden !py-2.5 !px-5 text-[0.85rem] sm:inline-flex"
            >
              {t("parlemNe")}
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? t("tancarMenu") : t("obrirMenu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative grid h-10 w-10 flex-shrink-0 place-items-center rounded-full border border-border-strong lg:hidden"
            >
              <span
                className={clsx(
                  "absolute h-[1.5px] w-4 bg-ink transition-all duration-300",
                  menuOpen ? "translate-y-0 rotate-45" : "-translate-y-[3px] rotate-0"
                )}
              />
              <span
                className={clsx(
                  "absolute h-[1.5px] w-4 bg-ink transition-all duration-300",
                  menuOpen ? "translate-y-0 -rotate-45" : "translate-y-[3px] rotate-0"
                )}
              />
            </button>
          </div>
        </div>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-40 flex flex-col justify-center bg-paper px-8 transition-opacity duration-400 lg:hidden",
          menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        )}
      >
        <nav className="flex flex-col items-start gap-2">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-medium text-ink transition-all duration-400"
              style={{
                transitionDelay: menuOpen ? `${80 + i * 60}ms` : "0ms",
                transform: menuOpen ? "translateY(0)" : "translateY(16px)",
                opacity: menuOpen ? 1 : 0,
              }}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher
          className="mt-8 transition-all duration-400"
        />
        <Link
          href="/#contacte"
          onClick={() => setMenuOpen(false)}
          className="btn btn-primary mt-6 w-fit"
          style={{
            transitionDelay: menuOpen ? "320ms" : "0ms",
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            opacity: menuOpen ? 1 : 0,
            transitionProperty: "opacity, transform",
            transitionDuration: "400ms",
          }}
        >
          {t("parlemNe")}
        </Link>
      </div>
    </>
  );
}
