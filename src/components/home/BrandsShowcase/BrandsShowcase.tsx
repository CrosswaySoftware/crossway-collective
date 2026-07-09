import { useTranslations } from "next-intl";
import { SectionHeading } from "@/components/ui/SectionHeading/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { BrandCard } from "@/components/brand/BrandCard/BrandCard";
import { BRANDS } from "@/config/brands";
import styles from "./BrandsShowcase.module.scss";

export function BrandsShowcase() {
  const t = useTranslations("Home.brands");

  return (
    <section id="our-brands" className={styles.section}>
      <div className={styles.inner}>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} subtitle={t("intro")} />

        <div className={styles.grid}>
          {BRANDS.map((brand, i) => (
            <Reveal key={brand.slug} delay={i * 0.06} className={styles.cell}>
              <BrandCard brand={brand} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
