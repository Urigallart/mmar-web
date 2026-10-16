import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://mmar-web.vercel.app";
const PATHS = ["", "/coaching", "/psicopedagogia"];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) =>
    routing.locales.map((locale) => ({
      url: `${SITE}/${locale}${path}`,
      lastModified: new Date(),
      alternates: {
        languages: Object.fromEntries(routing.locales.map((l) => [l, `${SITE}/${l}${path}`])),
      },
    }))
  );
}
