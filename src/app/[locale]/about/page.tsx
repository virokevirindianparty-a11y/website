import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const dynamic = "force-static";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("about");
  return { title: t("title") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");
  const founding = t.raw("foundingBody") as string[];

  return (
    <>
      <PageHero eyebrow="VVIP" title={t("title")} subtitle={t("intro")} />

      <section className="container-page py-14 md:py-20 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="font-heading font-bold text-2xl text-navy mb-4">
            {t("foundingTitle")}
          </h2>
          <div className="space-y-4 text-muted leading-relaxed">
            {founding.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>
        <div className="relative h-72 md:h-full min-h-[280px] rounded-xl overflow-hidden shadow-sm">
          <Image src="/images/about-team.webp" alt="" fill className="object-cover" />
        </div>
      </section>

      <section className="bg-cream border-y border-border py-14 md:py-20">
        <div className="container-page grid md:grid-cols-2 gap-10">
          <div className="bg-surface border border-border rounded-xl p-7">
            <h2 className="font-heading font-bold text-xl text-navy mb-3">
              {t("nameTitle")}
            </h2>
            <p className="text-muted leading-relaxed">{t("nameBody")}</p>
          </div>
          <div className="bg-surface border border-border rounded-xl p-7">
            <h2 className="font-heading font-bold text-xl text-navy mb-3">
              {t("missionTitle")}
            </h2>
            <p className="text-muted leading-relaxed">{t("missionBody")}</p>
          </div>
        </div>
      </section>

      <section className="container-page py-14 md:py-20 text-center">
        <p className="text-xs font-semibold tracking-widest uppercase text-saffron-dark mb-3">
          {t("mottoTitle")}
        </p>
        <p className="font-heading font-bold text-2xl md:text-3xl text-navy max-w-2xl mx-auto">
          {t("mottoBody")}
        </p>
      </section>
    </>
  );
}
