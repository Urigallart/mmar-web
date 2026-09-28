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
    <div className={clsx("flex items-center gap-1", className)}>
      {routing.locales.map((loc) => (
        <button
          key={loc}
          type="button"
          aria-label={LABELS[loc]}
          aria-current={loc === locale}
          onClick={() => router.replace(pathname, { locale: loc })}
          className={clsx(
            "grid h-7 w-7 place-items-center rounded-full border transition-all duration-300",
            loc === locale
              ? "border-ink"
              : "border-transparent opacity-50 hover:opacity-100"
          )}
        >
          <FlagIcon locale={loc} className="h-3.5 w-5 rounded-[2px] object-cover" />
        </button>
      ))}
    </div>
  );
}
