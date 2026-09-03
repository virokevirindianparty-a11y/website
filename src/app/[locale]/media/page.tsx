import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { MediaTabs } from "./media-tabs";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("media");
  return { title: t("title") };
}

export default async function MediaPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("media");

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />
      <section className="container-page py-14 md:py-20">
        <MediaTabs
          printLabel={t("printTab")}
          electronicLabel={t("electronicTab")}
          legalLabel={t("legalTab")}
          election2024Label={t("election2024Tab")}
        />
      </section>
    </>
  );
}
