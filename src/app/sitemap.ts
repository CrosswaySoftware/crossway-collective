import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { BRAND_SLUGS } from "@/config/brands";
import { SITE } from "@/config/site";

const STATIC_PATHS = ["", "/brands", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.url.replace(/\/$/, "");
  const paths = [...STATIC_PATHS, ...BRAND_SLUGS.map((slug) => `/brands/${slug}`)];
  const now = new Date();

  return routing.locales.flatMap((locale) =>
    paths.map((path) => {
      const isHome = path === "";
      return {
        url: `${base}/${locale}${path}`,
        lastModified: now,
        changeFrequency: "monthly" as const,
        priority: isHome ? 1 : 0.7,
        alternates: {
          languages: Object.fromEntries(routing.locales.map((l) => [l, `${base}/${l}${path}`])),
        },
      };
    }),
  );
}
