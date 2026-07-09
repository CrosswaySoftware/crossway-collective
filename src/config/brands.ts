export type Brand = {
  slug: string;
  /** i18n message key suffix under the `Brands` namespace */
  key: string;
  name: string;
  byline: string;
  /** Logo file in /public/logos (optional — Reejo Bakes ships without one) */
  logo?: string;
  /** Logo artwork already sits on a dark background → render on dark plate */
  logoOnDark?: boolean;
  /** Per-brand accent colour for cards, buttons, dividers */
  accent: string;
  accentSoft: string;
  /** Deep tone used for hero overlays */
  ink: string;
  /** Gallery images in /public/images/<slug> — first is used as hero + card */
  images: string[];
};

function gallery(slug: string, count: number): string[] {
  return Array.from({ length: count }, (_, i) => `/images/${slug}/${i + 1}.jpg`);
}

export const BRANDS: Brand[] = [
  {
    slug: "svanna",
    key: "svanna",
    name: "Svanna",
    byline: "by Crossway",
    logo: "/logos/svanna.png",
    logoOnDark: true,
    accent: "#c79a3f",
    accentSoft: "#d9b96d",
    ink: "#121a36",
    images: gallery("svanna", 8),
  },
  {
    slug: "pucca-south",
    key: "pucca",
    name: "Pucca South",
    byline: "by Crossway",
    logo: "/logos/pucca-south.png",
    accent: "#c0392b",
    accentSoft: "#e0772f",
    ink: "#5a1a12",
    images: gallery("pucca-south", 6),
  },
  {
    slug: "mirea-cafe",
    key: "mirea",
    name: "Mirea Café",
    byline: "by Crossway",
    logo: "/logos/mirea-cafe.png",
    accent: "#7a4a2b",
    accentSoft: "#b07f57",
    ink: "#2c1a10",
    images: gallery("mirea-cafe", 6),
  },
  {
    slug: "the-saddle-room",
    key: "saddle",
    name: "The Saddle Room",
    byline: "by Crossway",
    logo: "/logos/the-saddle-room.png",
    accent: "#a9702f",
    accentSoft: "#c69455",
    ink: "#241a12",
    images: gallery("the-saddle-room", 7),
  },
  {
    slug: "reejo-bakes",
    key: "reejo",
    name: "Reejo Bakes",
    byline: "by Crossway",
    accent: "#c04f78",
    accentSoft: "#d98aa5",
    ink: "#3a1524",
    images: gallery("reejo-bakes", 6),
  },
];

export function getBrand(slug: string): Brand | undefined {
  return BRANDS.find((b) => b.slug === slug);
}

export const BRAND_SLUGS = BRANDS.map((b) => b.slug);
