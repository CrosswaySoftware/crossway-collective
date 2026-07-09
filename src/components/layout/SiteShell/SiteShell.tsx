import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/SiteFooter/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader/SiteHeader";
import styles from "./SiteShell.module.scss";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <SiteHeader />
      <main className={styles.main}>{children}</main>
      <SiteFooter />
    </div>
  );
}
