import type { ReactNode } from "react";
import { Reveal } from "@/components/motion/Reveal";
import styles from "./SectionHeading.module.scss";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
};

export function SectionHeading({ eyebrow, title, subtitle, align = "center", tone = "light" }: Props) {
  return (
    <Reveal className={`${styles.root} ${align === "center" ? styles.center : ""} ${tone === "dark" ? styles.dark : ""}`}>
      {eyebrow ? (
        <span className={`cc-eyebrow ${styles.eyebrow}`}>
          <span className={styles.tick} aria-hidden />
          {eyebrow}
        </span>
      ) : null}
      <h2 className={styles.title}>{title}</h2>
      {subtitle ? <p className={styles.subtitle}>{subtitle}</p> : null}
    </Reveal>
  );
}
