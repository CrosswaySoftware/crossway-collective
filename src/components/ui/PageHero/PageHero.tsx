import type { ReactNode } from "react";
import styles from "./PageHero.module.scss";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
};

export function PageHero({ eyebrow, title, subtitle }: Props) {
  return (
    <section className={styles.hero}>
      <span className={styles.glow} aria-hidden />
      <div className={styles.inner}>
        {eyebrow ? (
          <span className={`cc-eyebrow ${styles.eyebrow}`}>
            <span className={styles.tick} aria-hidden />
            {eyebrow}
          </span>
        ) : null}
        <h1 className={styles.title}>{title}</h1>
        {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
      </div>
    </section>
  );
}
