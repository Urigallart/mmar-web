"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { FlagIcon } from "./FlagIcon";
import clsx from "clsx";

const LABELS: Record<string, string> = {
  ca: "Català",
  es: "Español",
  en: "English",
};

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className={clsx("flex items-center gap-1.5", className)}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          aria-label={LABELS[loc]}
          aria-current={loc === locale}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={clsx(
            "overflow-hidden rounded-[5px] ring-1 ring-inset transition-all duration-300",
            loc === locale
              ? "ring-ink scale-100 opacity-100"
              : "ring-black/10 scale-[0.9] opacity-55 hover:scale-100 hover:opacity-90"
          )}
        >
          <FlagIcon locale={loc} className="block h-5 w-7" />
        </button>
      ))}
    </div>
  );
}
