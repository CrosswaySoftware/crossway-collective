import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import { OrderPlatformLinks } from "@/components/ui/OrderPlatformLinks/OrderPlatformLinks";
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
              <OrderPlatformLinks variant="button" />
            </div>
            <p className={styles.fresh}>{t("fresh")}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
