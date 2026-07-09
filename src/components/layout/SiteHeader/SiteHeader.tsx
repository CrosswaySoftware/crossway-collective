"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LocaleSwitcher } from "@/components/layout/LocaleSwitcher/LocaleSwitcher";
import styles from "./SiteHeader.module.scss";

const NAV = [
  { href: "/", key: "home" as const },
  { href: "/brands", key: "brands" as const },
  { href: "/about", key: "about" as const },
  { href: "/contact", key: "contact" as const },
];

export function SiteHeader() {
  const t = useTranslations("Nav");
  const pathname = usePathname() ?? "/";
  const isHome = pathname === "/" || pathname === "";
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const solid = true;

  const isActive = (href: string) => {
    if (href === "/") return isHome;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header className={`${styles.header} ${solid ? styles.solid : ""} ${open ? styles.menuOpen : ""}`}>
      <div className={styles.inner}>
        <Link href="/" className={styles.brand} onClick={() => setOpen(false)} aria-label={t("brandName")}>
          <Image
            src="/logos/crossway-collective.png"
            alt={t("brandName")}
            width={300}
            height={213}
            priority
            className={styles.logo}
          />
        </Link>

        <nav className={styles.nav} aria-label="Primary">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`${styles.link} ${isActive(item.href) ? styles.linkActive : ""}`}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className={styles.actions}>
          <div className={styles.localeWrap}>
            <LocaleSwitcher variant={solid ? "light" : "dark"} />
          </div>
          <Link href="/brands" className={styles.orderBtn}>
            {t("orderNow")}
          </Link>
          <button
            type="button"
            className={styles.burger}
            aria-expanded={open}
            aria-label={open ? t("menuClose") : t("menuToggle")}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.burgerLines} ${open ? styles.burgerOpen : ""}`}>
              <span />
              <span />
              <span />
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <>
          <button type="button" className={styles.backdrop} aria-label={t("menuClose")} onClick={() => setOpen(false)} />
          <div className={styles.sheet} role="dialog" aria-modal="true" aria-label={t("menuTitle")}>
            <nav className={styles.sheetNav}>
              {NAV.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.sheetLink} ${isActive(item.href) ? styles.sheetLinkActive : ""}`}
                  onClick={() => setOpen(false)}
                >
                  {t(item.key)}
                </Link>
              ))}
            </nav>
            <Link href="/brands" className={styles.sheetOrder} onClick={() => setOpen(false)}>
              {t("orderNow")}
            </Link>
            <div className={styles.sheetFoot}>
              <LocaleSwitcher variant="light" />
              <a href={`mailto:${t("mailUs")}`} className={styles.sheetMail}>
                {t("mailUs")}
              </a>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
