import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import styles from "./not-found.module.scss";

export default function NotFound() {
  const t = useTranslations("Nav");
  return (
    <section className={styles.wrap}>
      <span className={styles.code}>404</span>
      <h1 className={styles.title}>Page not found</h1>
      <p className={styles.text}>The page you are looking for has moved or no longer exists.</p>
      <Link href="/" className={styles.btn}>
        {t("home")}
      </Link>
    </section>
  );
}
