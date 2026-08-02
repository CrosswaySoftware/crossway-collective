import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { BRANDS } from "@/config/brands";
import { OrderPlatformLinks } from "@/components/ui/OrderPlatformLinks/OrderPlatformLinks";
import styles from "./Motto.module.scss";

export function Motto() {
  const t = useTranslations("Home.serving");

  return (
    <section className={styles.section}>
      <div className={styles.bg} aria-hidden>
        <span className={styles.glow} />
      </div>
      <div className={styles.inner}>
        <Reveal className={styles.head}>
          <span className={`cc-eyebrow ${styles.eyebrow}`}>{t("eyebrow")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
          <p className={styles.text}>{t("text")}</p>
        </Reveal>

        <Reveal delay={0.1} className={styles.searchBox}>
          <span className={styles.searchLabel}>{t("searchLabel")}</span>
          <div className={styles.chips}>
            {BRANDS.map((b) => (
              <span key={b.slug} className={styles.chip}>
                {b.name} <span className={styles.chipByline}>{b.byline}</span>
              </span>
            ))}
          </div>
          <p className={styles.note}>{t("platformNote")}</p>
          <OrderPlatformLinks variant="inline" className={styles.platformLogos} />
        </Reveal>
      </div>
    </section>
  );
}
