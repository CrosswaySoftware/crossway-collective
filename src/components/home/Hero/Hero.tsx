"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./Hero.module.scss";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  const t = useTranslations("Home.hero");

  return (
    <section className={styles.hero}>
      <div className={styles.bg} aria-hidden>
        <span className={styles.glowA} />
        <span className={styles.glowB} />
        <span className={styles.grain} />
      </div>

      <div className={styles.inner}>
        <div className={styles.text}>
          <motion.span
            className={`cc-eyebrow ${styles.eyebrow}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
          >
            <span className={styles.tick} />
            {t("eyebrow")}
          </motion.span>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 26 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.08, ease }}
          >
            {t("title")} <span className={styles.accent}>{t("titleAccent")}</span>
          </motion.h1>

          <motion.p
            className={styles.subtitle}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.18, ease }}
          >
            {t("subtitle")}
          </motion.p>

          <motion.div
            className={styles.actions}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.28, ease }}
          >
            <Link href="/brands" className={styles.btnPrimary}>
              {t("cta")}
            </Link>
            <Link href="/brands" className={styles.btnGhost}>
              {t("ctaBrands")}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>

          <motion.p
            className={styles.availability}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.42, ease }}
          >
            <span className={styles.dot} aria-hidden />
            {t("availability")}
          </motion.p>
        </div>

        <motion.div
          className={styles.gallery}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease }}
          aria-hidden
        >
          <div className={styles.imgMain}>
            <Image src="/images/svanna/1.webp" alt="" fill sizes="(max-width: 980px) 90vw, 44vw" priority />
          </div>
          <div className={styles.imgFloat}>
            <Image src="/images/reejo-bakes/1.webp" alt="" fill sizes="220px" />
          </div>
          <div className={styles.imgFloat2}>
            <Image src="/images/pucca-south/1.webp" alt="" fill sizes="200px" />
          </div>
        </motion.div>
      </div>

      <div className={styles.scroll} aria-hidden>
        <span />
      </div>
    </section>
  );
}
