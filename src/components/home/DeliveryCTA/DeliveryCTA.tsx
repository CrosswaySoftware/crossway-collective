import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { SITE } from "@/config/site";
import styles from "./DeliveryCTA.module.scss";

export function DeliveryCTA() {
  const t = useTranslations("Home.finalCta");

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.card}>
          <span className={styles.pattern} aria-hidden />
          <div className={styles.content}>
            <span className={`cc-eyebrow ${styles.eyebrow}`}>{t("eyebrow")}</span>
            <h2 className={styles.title}>{t("title")}</h2>
            <p className={styles.text}>{t("text")}</p>
            <div className={styles.actions}>
              <a href={SITE.order.swiggy} target="_blank" rel="noopener noreferrer" className={styles.btnSwiggy}>
                Swiggy
              </a>
              <a href={SITE.order.zomato} target="_blank" rel="noopener noreferrer" className={styles.btnZomato}>
                Zomato
              </a>
            </div>
            <p className={styles.fresh}>{t("fresh")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
