import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";
import { JoinForm } from "./join-form";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("join");
  return { title: t("title") };
}

export default async function JoinPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("join");

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />
      <section className="container-page py-14 md:py-20 max-w-2xl">
        <div className="bg-surface border border-border rounded-xl p-7">
          <JoinForm />
        </div>
      </section>
    </>
  );
}
