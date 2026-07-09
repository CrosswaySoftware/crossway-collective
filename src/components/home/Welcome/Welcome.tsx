import { useTranslations } from "next-intl";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./Welcome.module.scss";

export function Welcome() {
  const t = useTranslations("Home.about");

  const steps = [t("fresh1"), t("fresh2"), t("fresh3")];

  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <Reveal className={styles.left}>
          <span className="cc-eyebrow">{t("eyebrow")}</span>
          <h2 className={styles.title}>{t("title")}</h2>
        </Reveal>

        <div className={styles.right}>
          <Reveal delay={0.05}>
            <p className={styles.lead}>{t("p1")}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{t("p2")}</p>
          </Reveal>
          <Reveal delay={0.15}>
            <p>{t("p3")}</p>
          </Reveal>
          <Reveal delay={0.2} className={styles.steps}>
            {steps.map((step, i) => (
              <span key={step} className={styles.step}>
                <span className={styles.stepNum}>{i + 1}</span>
                {step}
              </span>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
