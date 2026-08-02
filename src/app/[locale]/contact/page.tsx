import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { OrderPlatformLinks } from "@/components/ui/OrderPlatformLinks/OrderPlatformLinks";
import { SITE } from "@/config/site";
import styles from "./contact.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Contact.meta" });
  return { title: t("title"), description: t("description") };
}

export default function ContactPage() {
  const t = useTranslations("Contact");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />

      <section className={styles.section}>
        <div className={styles.inner}>
          <div className={styles.cards}>
            <Reveal className={styles.card} as="div">
              <span className={styles.cardLabel}>{t("emailLabel")}</span>
              <a href={`mailto:${SITE.email}`} className={styles.cardValue}>
                {SITE.email}
              </a>
            </Reveal>
            <Reveal delay={0.05} className={styles.card} as="div">
              <span className={styles.cardLabel}>{t("phoneLabel")}</span>
              <a href={`tel:${SITE.phoneHref}`} className={styles.cardValue}>
                {SITE.phone}
              </a>
            </Reveal>
            <Reveal delay={0.1} className={styles.card} as="div">
              <span className={styles.cardLabel}>{t("cityLabel")}</span>
              <p className={styles.cardText}>{SITE.city}</p>
            </Reveal>
          </div>

          <Reveal delay={0.1} className={styles.delivery}>
            <div className={styles.deliveryText}>
              <span className="cc-eyebrow">{t("orderLabel")}</span>
              <p>{t("orderText")}</p>
            </div>
            <div className={styles.orderBtns}>
              <OrderPlatformLinks variant="button" />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
