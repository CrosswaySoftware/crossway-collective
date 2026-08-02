import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/motion/Reveal";
import { BRANDS, BRAND_SLUGS, getBrand } from "@/config/brands";
import { routing } from "@/i18n/routing";
import { OrderPlatformLinks } from "@/components/ui/OrderPlatformLinks/OrderPlatformLinks";
import styles from "./brandDetail.module.scss";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) => BRAND_SLUGS.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const brand = getBrand(slug);
  if (!brand) return {};
  const t = await getTranslations({ locale, namespace: "Brands" });
  const tD = await getTranslations({ locale, namespace: "BrandDetail" });
  return {
    title: `${brand.name} ${brand.byline} — ${t(`${brand.key}.heading`)}`,
    description: t(`${brand.key}.description`),
    alternates: { canonical: `/${locale}/brands/${slug}` },
    openGraph: {
      title: `${brand.name} | ${tD("metaSuffix")}`,
      description: t(`${brand.key}.description`),
      images: [{ url: brand.images[0] }],
    },
  };
}

export default async function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const brand = getBrand(slug);
  if (!brand) notFound();
  return <BrandDetailView slug={slug} />;
}

function BrandDetailView({ slug }: { slug: string }) {
  const brand = getBrand(slug)!;
  const t = useTranslations("Brands");
  const tD = useTranslations("BrandDetail");
  const others = BRANDS.filter((b) => b.slug !== brand.slug);
  const perfectFor = t.raw(`${brand.key}.perfectFor`) as string[];
  const galleryImages = brand.images.slice(1);

  const cssVars = {
    "--brand-accent": brand.accent,
    "--brand-accent-soft": brand.accentSoft,
    "--brand-ink": brand.ink,
  } as React.CSSProperties;

  return (
    <div style={cssVars}>
      <section className={styles.hero}>
        <div className={styles.heroImage}>
          <Image src={brand.images[0]} alt={brand.name} fill priority sizes="100vw" className={styles.heroImg} />
          <span className={styles.heroShade} aria-hidden />
        </div>
        <div className={styles.heroInner}>
          <Link href="/brands" className={styles.back}>
            <span aria-hidden>←</span> {tD("backToBrands")}
          </Link>
          {brand.logo ? (
            <div className={`${styles.logoPlate} ${brand.logoOnDark ? styles.onDark : ""}`}>
              <Image src={brand.logo} alt={`${brand.name} ${brand.byline}`} width={280} height={200} className={styles.logo} />
            </div>
          ) : null}
          <span className={styles.heading}>{t(`${brand.key}.heading`)}</span>
          <h1 className={styles.name}>{brand.name}</h1>
          <p className={styles.byline}>{brand.byline}</p>
          <p className={styles.tagline}>{t(`${brand.key}.tagline`)}</p>
        </div>
      </section>

      <section className={styles.about}>
        <div className={styles.aboutInner}>
          <div className={styles.aboutBody}>
            <p className={styles.description}>{t(`${brand.key}.description`)}</p>
            <div className={styles.order}>
              <span className={styles.orderLabel}>{tD("availableLabel")}</span>
              <div className={styles.orderBtns}>
                <OrderPlatformLinks variant="button" />
              </div>
            </div>
          </div>
          <aside className={styles.facts}>
            <span className={styles.factsLabel}>{tD("perfectForLabel")}</span>
            <ul className={styles.perfectList}>
              {perfectFor.map((item) => (
                <li key={item}>
                  <span className={styles.tick} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <section className={styles.gallery}>
        <div className={styles.galleryInner}>
          <Reveal className={styles.galleryHead}>
            <span className="cc-eyebrow">{tD("galleryLabel")}</span>
            <h2 className={styles.galleryTitle}>{brand.name}</h2>
          </Reveal>
          <div className={styles.galleryGrid}>
            {galleryImages.map((src, i) => (
              <Reveal key={src} delay={(i % 3) * 0.06} className={styles.galleryCell} as="div">
                <Image src={src} alt={`${brand.name} ${i + 1}`} fill sizes="(max-width: 700px) 50vw, 33vw" className={styles.galleryImg} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.others}>
        <div className={styles.othersInner}>
          <h2 className={styles.othersTitle}>{tD("otherBrands")}</h2>
          <div className={styles.othersGrid}>
            {others.map((b) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}`}
                className={styles.otherCard}
                style={{ "--brand-accent": b.accent } as React.CSSProperties}
              >
                <Image src={b.images[0]} alt={b.name} fill sizes="(max-width: 700px) 50vw, 25vw" className={styles.otherImg} />
                <span className={styles.otherShade} aria-hidden />
                <span className={styles.otherName}>
                  {b.name}
                  <span className={styles.otherHeading}>{t(`${b.key}.heading`)}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
