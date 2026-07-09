import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { Hero } from "@/components/home/Hero/Hero";
import { Welcome } from "@/components/home/Welcome/Welcome";
import { Motto } from "@/components/home/Motto/Motto";
import { BrandsShowcase } from "@/components/home/BrandsShowcase/BrandsShowcase";
import { Philosophy } from "@/components/home/Philosophy/Philosophy";
import { DeliveryCTA } from "@/components/home/DeliveryCTA/DeliveryCTA";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return {
    title: t("homeTitle"),
    description: t("homeDescription"),
  };
}

export default function HomePage() {
  return (
    <>
      <Hero />
      <Welcome />
      <BrandsShowcase />
      <Philosophy />
      <Motto />
      <DeliveryCTA />
    </>
  );
}
