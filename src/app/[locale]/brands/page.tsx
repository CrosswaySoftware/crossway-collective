import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { BrandCard } from "@/components/brand/BrandCard/BrandCard";
import { Reveal } from "@/components/motion/Reveal";
import { BRANDS } from "@/config/brands";
import styles from "./brands.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "BrandsPage.meta" });
  return { title: t("title"), description: t("description") };
}

export default function BrandsPage() {
  const t = useTranslations("BrandsPage");

  return (
    <>
      <PageHero eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <section className={styles.section}>
        <div className={styles.grid}>
          {BRANDS.map((brand, i) => (
            <Reveal key={brand.slug} delay={i * 0.06} className={styles.cell}>
              <BrandCard brand={brand} />
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
