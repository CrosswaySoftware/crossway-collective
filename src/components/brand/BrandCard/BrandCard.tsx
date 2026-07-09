import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { Brand } from "@/config/brands";
import styles from "./BrandCard.module.scss";

export function BrandCard({ brand }: { brand: Brand }) {
  const t = useTranslations("Brands");
  const tHome = useTranslations("Home.brands");

  return (
    <article
      className={styles.card}
      style={
        {
          "--brand-accent": brand.accent,
          "--brand-accent-soft": brand.accentSoft,
          "--brand-ink": brand.ink,
        } as React.CSSProperties
      }
    >
      <Link href={`/brands/${brand.slug}`} className={styles.media} aria-label={brand.name}>
        <Image
          src={brand.images[0]}
          alt={`${brand.name} — ${t(`${brand.key}.heading`)}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw"
          className={styles.img}
        />
        <span className={styles.shade} aria-hidden />
        <span className={styles.badge}>{tHome("availability")}</span>
      </Link>

      <div className={styles.body}>
        <span className={styles.heading}>{t(`${brand.key}.heading`)}</span>
        <h3 className={styles.name}>
          {brand.name} <span className={styles.byline}>{brand.byline}</span>
        </h3>
        <p className={styles.tagline}>{t(`${brand.key}.tagline`)}</p>
        <Link href={`/brands/${brand.slug}`} className={styles.cta}>
          {tHome("viewBrand")}
          <span aria-hidden>→</span>
        </Link>
      </div>
    </article>
  );
}
