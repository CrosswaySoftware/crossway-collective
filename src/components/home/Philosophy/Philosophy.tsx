import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Philosophy.module.scss";

const ICONS: Record<string, React.ReactNode> = {
  quality: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 3c4 3 4 8 0 11-4-3-4-8 0-11Z" />
      <path d="M12 14v7M9 18h6" strokeLinecap="round" />
    </svg>
  ),
  brands: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  ),
  delivery: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 7h11v9H3zM14 10h4l3 3v3h-7" strokeLinejoin="round" />
      <circle cx="7" cy="18" r="1.6" />
      <circle cx="17.5" cy="18" r="1.6" />
    </svg>
  ),
  taste: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z" />
      <path d="m8.5 12.5 2.5 2.5 4.5-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  ordering: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="5" y="3" width="14" height="18" rx="2.5" />
      <path d="M9 7h6M12 17h.01" strokeLinecap="round" />
    </svg>
  ),
};

const KEYS = ["quality", "brands", "delivery", "taste", "ordering"] as const;

export function Philosophy() {
  const t = useTranslations("Home.why");

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <div className={styles.grid}>
          {KEYS.map((key, i) => (
            <Reveal key={key} delay={i * 0.06} className={styles.card} as="article">
              <span className={styles.icon}>{ICONS[key]}</span>
              <h3 className={styles.cardTitle}>{t(`items.${key}.title`)}</h3>
              <p className={styles.cardDesc}>{t(`items.${key}.desc`)}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
