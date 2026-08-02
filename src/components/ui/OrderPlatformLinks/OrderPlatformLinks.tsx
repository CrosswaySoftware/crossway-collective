import Image from "next/image";
import { SITE } from "@/config/site";
import styles from "./OrderPlatformLinks.module.scss";

type Variant = "button" | "inline" | "badge";

type OrderPlatformLinksProps = {
  variant?: Variant;
  className?: string;
};

const LOGO_HEIGHT: Record<Variant, number> = {
  badge: 16,
  inline: 20,
  button: 24,
};

export function OrderPlatformLinks({ variant = "button", className }: OrderPlatformLinksProps) {
  const h = LOGO_HEIGHT[variant];
  const rootClass = [styles.root, styles[variant], className].filter(Boolean).join(" ");

  return (
    <div className={rootClass} role="group" aria-label="Order on Swiggy and Zomato">
      <a
        href={SITE.order.swiggy}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="Order on Swiggy"
      >
        <Image
          src={SITE.order.logos.swiggy}
          alt="Swiggy"
          width={h * 2}
          height={h}
          className={styles.logo}
          style={{ height: h, width: "auto" }}
        />
      </a>
      <a
        href={SITE.order.zomato}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
        aria-label="Order on Zomato"
      >
        <Image
          src={SITE.order.logos.zomato}
          alt="Zomato"
          width={h * 2}
          height={h}
          className={styles.logo}
          style={{ height: h, width: "auto" }}
        />
      </a>
    </div>
  );
}
