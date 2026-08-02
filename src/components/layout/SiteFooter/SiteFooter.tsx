import Image from "next/image";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { BRANDS } from "@/config/brands";
import { SITE } from "@/config/site";
import { OrderPlatformLinks } from "@/components/ui/OrderPlatformLinks/OrderPlatformLinks";
import styles from "./SiteFooter.module.scss";

export function SiteFooter() {
  const t = useTranslations("Footer");
  const year = new Date().getFullYear();

  const explore = [
    { href: "/", key: "home" as const },
    { href: "/brands", key: "brands" as const },
    { href: "/about", key: "about" as const },
    { href: "/contact", key: "contact" as const },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brandCol}>
          <Image
            src="/logos/crossway-collective.png"
            alt="Crossway Collective"
            width={220}
            height={156}
            className={styles.logo}
          />
          <p className={styles.tagline}>{t("tagline")}</p>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>{t("brandsHeading")}</h3>
          <ul className={styles.list}>
            {BRANDS.map((b) => (
              <li key={b.slug}>
                <Link href={`/brands/${b.slug}`}>
                  {b.name} <span className={styles.byline}>{b.byline}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>{t("exploreHeading")}</h3>
          <ul className={styles.list}>
            {explore.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{t(item.key)}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.col}>
          <h3 className={styles.heading}>{t("orderHeading")}</h3>
          <OrderPlatformLinks variant="inline" className={styles.orderLogos} />
          <h3 className={`${styles.heading} ${styles.headingGap}`}>{t("contactHeading")}</h3>
          <ul className={styles.list}>
            <li>
              <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
            </li>
            <li>
              <a href={`tel:${SITE.phoneHref}`}>{SITE.phone}</a>
            </li>
            <li className={styles.address}>{SITE.city}</li>
          </ul>
        </div>
      </div>

      <div className={styles.bar}>
        <p>{t("copyright", { year })}</p>
        <p className={styles.partOf}>
          <a href={SITE.parentUrl} target="_blank" rel="noopener noreferrer">
            {t("partOf")}
          </a>
        </p>
      </div>
    </footer>
  );
}
