import type { Metadata } from "next";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { useTranslations } from "next-intl";
import { PageHero } from "@/components/ui/PageHero/PageHero";
import { Reveal } from "@/components/motion/Reveal";
import { Link } from "@/i18n/navigation";
import styles from "./about.module.scss";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "About.meta" });
  return { title: t("title"), description: t("description") };
}

const WHY = ["quality", "brands", "delivery", "taste", "ordering"] as const;

export default function AboutPage() {
  const t = useTranslations("About");
  const tWhy = useTranslations("Home.why");
  const tNav = useTranslations("Nav");

  return (
    <>
      <PageHero eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <section className={styles.story}>
        <div className={styles.storyInner}>
          <div className={styles.storyMedia}>
            <Reveal className={styles.mediaMain}>
              <Image src="/images/svanna/3.jpg" alt="" fill sizes="(max-width: 900px) 90vw, 42vw" />
            </Reveal>
            <Reveal delay={0.12} className={styles.mediaFloat}>
              <Image src="/images/reejo-bakes/2.jpg" alt="" fill sizes="180px" />
            </Reveal>
          </div>
          <div className={styles.storyBody}>
            <Reveal delay={0.05}>
              <p className={styles.lead}>{t("story.p1")}</p>
            </Reveal>
            <Reveal delay={0.1}>
              <p>{t("story.p2")}</p>
            </Reveal>
            <Reveal delay={0.15}>
              <p>{t("story.p3")}</p>
            </Reveal>
            <Reveal delay={0.2}>
              <Link href="/brands" className={styles.cta}>
                {tNav("brands")} <span aria-hidden>→</span>
              </Link>
            </Reveal>
          </div>
        </div>
      </section>

      <section className={styles.why}>
        <div className={styles.whyInner}>
          <Reveal className={styles.whyHead}>
            <span className="cc-eyebrow">{tWhy("eyebrow")}</span>
            <h2>{tWhy("title")}</h2>
          </Reveal>
          <div className={styles.grid}>
            {WHY.map((v, i) => (
              <Reveal key={v} delay={i * 0.06} className={styles.card} as="article">
                <span className={styles.num}>{String(i + 1).padStart(2, "0")}</span>
                <h3>{tWhy(`items.${v}.title`)}</h3>
                <p>{tWhy(`items.${v}.desc`)}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
