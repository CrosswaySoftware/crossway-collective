# Crossway Collective

The dining family of **Crossway** — a multilingual (English / العربية / Français) Next.js
website for the collection of restaurants and cafés under the Crossway Collective brand:

- **Mirea Cafe** — All-day café & patisserie
- **The Saddle Room** — Grill, bar & steakhouse (Madras Race Club)
- **Pucca South** — Best of South Indian cuisine
- **Svanna** — Global Indian cuisine

> Cooked with love. Served with passion.

## Tech

- **Next.js 14** (App Router, RSC)
- **next-intl** for i18n with `[locale]` routing (`en`, `ar`, `fr`, RTL-aware)
- **Sass modules** with a bespoke "midnight navy + burnished gold" culinary design system
- **framer-motion** scroll reveals
- Full SEO: per-page metadata, Open Graph, localized sitemap, robots, web manifest

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000 — you'll be redirected to `/en`.

## Scripts

| Script          | Description                  |
| --------------- | ---------------------------- |
| `npm run dev`   | Start the dev server         |
| `npm run build` | Production build             |
| `npm run start` | Serve the production build   |
| `npm run lint`  | Run ESLint                   |

## Structure

```
src/
  app/
    [locale]/            # Localized pages (home, brands, brands/[slug], menus, about, contact)
    robots.ts | sitemap.ts | manifest.ts | icon.svg
  components/            # layout, home sections, brand cards, UI primitives
  config/                # brands.ts (brand data + menus), site.ts
  i18n/                  # routing, navigation, request (next-intl)
  messages/              # en.json, ar.json, fr.json
  styles/                # _tokens.scss, globals.scss
public/logos/            # Brand logos
```

## Editing content

- **Brand details & menus:** `src/config/brands.ts`
- **Translatable copy (UI, marketing, brand taglines/intros):** `src/messages/*.json`
- **Design tokens (colours, type, spacing):** `src/styles/_tokens.scss`
