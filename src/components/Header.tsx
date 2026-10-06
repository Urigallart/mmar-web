"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import clsx from "clsx";
import { LanguageSwitcher } from "./LanguageSwitcher";

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    setMenuOpen(false);
    if (href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const targetPath = href.split("#")[0] || "/";
    const changesPage = targetPath !== pathname;
    const main = document.querySelector("main");
    const modified = e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
    if (!changesPage || !main || modified || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    e.preventDefault();
    main.classList.add("page-leaving");
    window.setTimeout(() => router.push(href), 400);
    window.setTimeout(() => main.classList.remove("page-leaving"), 3000);
  };

  const NAV_LINKS = [
    { href: "/", label: t("inici") },
    { href: "/coaching", label: t("coaching") },
    { href: "/psicopedagogia", label: t("psicopedagogia") },
    { href: "/#sobre-mi", label: t("sobreMi") },
    { href: "/#contacte", label: t("contacte") },
  ];

  const [homeSection, setHomeSection] = useState<"inici" | "sobre-mi" | "contacte">("inici");

  useEffect(() => {
    if (pathname !== "/") return;
    const visible = new Set<string>();
    const update = () =>
      setHomeSection(visible.has("contacte") ? "contacte" : visible.has("sobre-mi") ? "sobre-mi" : "inici");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) visible.add(entry.target.id);
          else visible.delete(entry.target.id);
        });
        update();
      },
      { rootMargin: "-40% 0px -59% 0px" }
    );
    ["sobre-mi", "contacte"].forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && homeSection === "inici";
    if (href === "/#sobre-mi") return pathname === "/" && homeSection === "sobre-mi";
    if (href === "/#contacte") return pathname === "/" && homeSection === "contacte";
    return pathname === href;
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = menuOpen ? "hidden" : "";
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-3 pt-2.5 sm:px-4 sm:pt-5">
        <div
          className={clsx(
            "flex w-full max-w-[1240px] items-center justify-between gap-3 rounded-full border border-border bg-paper/85 px-2 py-1.5 sm:gap-4 sm:px-3 sm:py-2.5 shadow-[0_10px_30px_-16px_rgba(32,43,40,0.3)] backdrop-blur-md transition-all duration-500 sm:px-4",
            (scrolled || menuOpen) &&
              "border-border-strong shadow-[0_10px_40px_-14px_rgba(32,43,40,0.25)]"
          )}
        >
          <Link
            href="/"
            aria-label="Mª del Mar"
            className="flex items-center gap-2 rounded-full px-1 py-0 sm:px-2 sm:py-1 text-[0.95rem] font-semibold tracking-tight text-ink"
            onClick={() => setMenuOpen(false)}
          >
            <span className="relative h-10 w-10 flex-shrink-0 sm:h-14 sm:w-14 overflow-hidden rounded-full">
              <Image src="/images/logo-mark.png" alt="" fill sizes="56px" className="scale-[1.08] object-cover" />
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={clsx(
                  "rounded-full px-4 py-2 text-base font-medium transition-colors duration-300 hover:bg-white hover:text-ink",
                  isActive(link.href)
                    ? "text-ink underline decoration-green-deep decoration-2 underline-offset-[6px]"
                    : "text-ink-dim"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <LanguageSwitcher className="hidden sm:flex" />
            <Link
              href="/#contacte"
              className="btn btn-primary hidden !px-3.5 !py-2 text-[0.78rem] sm:inline-flex sm:!px-5 sm:!py-2.5 sm:text-[0.85rem]"
            >
              {t("parlemNe")}
            </Link>
            <button
              type="button"
              aria-label={menuOpen ? t("tancarMenu") : t("obrirMenu")}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className="relative grid h-9 w-9 flex-shrink-0 place-items-center rounded-full border border-border-strong sm:h-10 sm:w-10 lg:hidden"
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
        role="dialog"
        aria-modal="true"
        aria-hidden={!menuOpen}
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
              onClick={(e) => handleNavClick(e, link.href)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={clsx(
                "text-3xl font-medium text-ink transition-all duration-400",
                isActive(link.href) && "underline decoration-green-deep decoration-2 underline-offset-[8px]"
              )}
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
